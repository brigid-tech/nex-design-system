import * as React from "react"
import { Plus } from "lucide-react"
import { cn } from "../../lib/cn"
import { Badge } from "../Badge/Badge"
import { ENTITY_ICONS } from "../Badge/Badge"
import type { EntityType } from "../../tokens/colors"
import type { MentionInputProps, MentionSuggestion } from "./MentionInput.types"

// Inline style constants for entity token colors (used in DOM, not Tailwind)
const ENTITY_TOKEN_STYLES: Record<EntityType, { color: string; bg: string; border: string }> = {
  character: { color: "#8B5CF6", bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.4)" },
  place:     { color: "#10B981", bg: "rgba(16,185,129,0.15)",  border: "rgba(16,185,129,0.4)" },
  faction:   { color: "#F59E0B", bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.4)" },
  item:      { color: "#3B82F6", bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.4)" },
  creature:  { color: "#EF4444", bg: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.4)" },
  event:     { color: "#EC4899", bg: "rgba(236,72,153,0.15)",  border: "rgba(236,72,153,0.4)" },
}

function buildMentionSpan(
  id: string,
  handle: string,
  entityType: EntityType,
  field?: string,
  resolvedValue?: string,
): HTMLSpanElement {
  const colors = ENTITY_TOKEN_STYLES[entityType]
  const span = document.createElement("span")
  span.contentEditable = "false"
  span.dataset.mentionId = id
  span.dataset.mentionHandle = handle
  span.dataset.mentionEntityType = entityType
  if (field) span.dataset.mentionField = field

  Object.assign(span.style, {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "1px 8px",
    borderRadius: "6px",
    fontFamily: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
    fontSize: "13px",
    cursor: "pointer",
    border: `1px solid ${colors.border}`,
    background: colors.bg,
    color: colors.color,
    whiteSpace: "nowrap",
    userSelect: "none",
    margin: "0 1px",
    lineHeight: "1.5",
  })

  const label = field ? `@${handle}.${field}` : `@${handle}`
  span.textContent = label

  if (resolvedValue) {
    const sep = document.createElement("span")
    sep.style.color = "#52566A"
    sep.style.marginLeft = "4px"
    sep.textContent = "= "
    const val = document.createElement("span")
    val.style.color = "#F0F2F8"
    val.textContent = resolvedValue
    span.appendChild(sep)
    span.appendChild(val)
  }

  return span
}

function domToRaw(editor: HTMLElement): string {
  let result = ""
  const walk = (nodes: NodeList) => {
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent ?? ""
      } else if (node instanceof HTMLElement) {
        const mentionId = node.dataset.mentionId
        if (mentionId) {
          const field = node.dataset.mentionField
          result += field ? `[[${mentionId}:${field}]]` : `[[${mentionId}]]`
        } else if (node.tagName === "BR") {
          result += "\n"
        } else {
          walk(node.childNodes)
        }
      }
    })
  }
  walk(editor.childNodes)
  return result
}

// Token pattern: [[id]] or [[id:field]]
const TOKEN_RE = /\[\[([^\]:]+)(?::([^\]]+))?\]\]/g

function rawToNodes(
  raw: string,
  knownMentions: Record<string, MentionSuggestion>,
  resolvedValues: Record<string, Record<string, string>>,
): Array<string | { id: string; handle: string; entityType: EntityType; field?: string; resolvedValue?: string }> {
  const nodes: ReturnType<typeof rawToNodes> = []
  let last = 0
  let match: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0
  while ((match = TOKEN_RE.exec(raw)) !== null) {
    if (match.index > last) nodes.push(raw.slice(last, match.index))
    const id = match[1]
    const field = match[2]
    const known = knownMentions[id]
    const resolvedValue = field
      ? resolvedValues[id]?.[field]
      : resolvedValues[id]?.["name"]
    nodes.push({
      id,
      handle: known?.handle ?? id,
      entityType: known?.entityType ?? "character",
      field,
      resolvedValue,
    })
    last = match.index + match[0].length
  }
  if (last < raw.length) nodes.push(raw.slice(last))
  return nodes
}

const MentionInput = React.forwardRef<HTMLDivElement, MentionInputProps>(
  (
    {
      value = "",
      onChange,
      onMentionQuery,
      suggestions = [],
      suggestionsLoading = false,
      placeholder,
      disabled = false,
      error = false,
      className,
      resolvedValues = {},
    },
    ref,
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null)
    const lastEmittedRef = React.useRef(value)
    const isInternalChangeRef = React.useRef(false)
    const triggerActiveRef = React.useRef(false)
    const triggerRangeRef = React.useRef<Range | null>(null)

    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [highlightedIdx, setHighlightedIdx] = React.useState(0)
    const [dropdownPos, setDropdownPos] = React.useState({ top: 0, left: 0 })

    // Registry of seen mentions (built as user inserts or on parse)
    const mentionsRegistryRef = React.useRef<Record<string, MentionSuggestion>>({})

    const registerMention = (s: MentionSuggestion) => {
      mentionsRegistryRef.current[s.id] = s
    }

    // Render raw value into editor DOM
    const renderValue = React.useCallback(
      (raw: string) => {
        const editor = editorRef.current
        if (!editor) return
        editor.innerHTML = ""
        const nodes = rawToNodes(raw, mentionsRegistryRef.current, resolvedValues)
        nodes.forEach((node) => {
          if (typeof node === "string") {
            if (node) editor.appendChild(document.createTextNode(node))
          } else {
            const span = buildMentionSpan(
              node.id,
              node.handle,
              node.entityType,
              node.field,
              node.resolvedValue,
            )
            editor.appendChild(span)
          }
        })
      },
      [resolvedValues],
    )

    // Sync external value changes into editor
    React.useEffect(() => {
      if (!isInternalChangeRef.current && value !== lastEmittedRef.current) {
        renderValue(value)
        lastEmittedRef.current = value
      }
      isInternalChangeRef.current = false
    }, [value, renderValue])

    // Update resolved values on existing tokens when resolvedValues changes
    React.useEffect(() => {
      const editor = editorRef.current
      if (!editor) return
      editor.querySelectorAll<HTMLSpanElement>("[data-mention-id]").forEach((span) => {
        const id = span.dataset.mentionId!
        const field = span.dataset.mentionField
        const resolved = field ? resolvedValues[id]?.[field] : resolvedValues[id]?.["name"]
        if (resolved) {
          // Flash animation
          span.style.animation = "none"
          void span.offsetHeight // force reflow to restart animation
          span.style.animation = "nex-mention-flash 300ms ease-in-out"

          // Update display (keep original label, update/add resolved value)
          const handle = span.dataset.mentionHandle!
          const label = field ? `@${handle}.${field}` : `@${handle}`
          span.textContent = label
          const sep = document.createElement("span")
          sep.style.color = "#52566A"
          sep.style.marginLeft = "4px"
          sep.textContent = "= "
          const val = document.createElement("span")
          val.style.color = "#F0F2F8"
          val.textContent = resolved
          span.appendChild(sep)
          span.appendChild(val)
        }
      })
    }, [resolvedValues])

    // Calculate dropdown position from current selection
    const updateDropdownPosition = () => {
      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) return
      const range = selection.getRangeAt(0).cloneRange()
      range.collapse(true)
      const rect = range.getBoundingClientRect()
      const editorRect = editorRef.current?.getBoundingClientRect()
      if (!editorRect) return
      setDropdownPos({
        top: rect.bottom - editorRect.top + 4,
        left: Math.min(rect.left - editorRect.left, editorRect.width - 260),
      })
    }

    const closeDropdown = () => {
      setDropdownOpen(false)
      setQuery("")
      triggerActiveRef.current = false
      triggerRangeRef.current = null
      onMentionQuery?.("")
    }

    const insertMentionSuggestion = (suggestion: MentionSuggestion) => {
      registerMention(suggestion)
      const editor = editorRef.current
      if (!editor) return

      // Delete the @query text that triggered the dropdown
      const selection = window.getSelection()
      if (selection && triggerRangeRef.current) {
        const range = triggerRangeRef.current.cloneRange()
        if (selection.rangeCount) {
          const current = selection.getRangeAt(0)
          range.setEnd(current.endContainer, current.endOffset)
          range.deleteContents()
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }

      const span = buildMentionSpan(suggestion.id, suggestion.handle, suggestion.entityType)
      // Insert a trailing space so user can type after the token
      const space = document.createTextNode(" ")

      const sel = window.getSelection()
      if (sel && sel.rangeCount) {
        const range = sel.getRangeAt(0)
        range.insertNode(space)
        range.insertNode(span)
        range.setStartAfter(space)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
      } else {
        editor.appendChild(span)
        editor.appendChild(space)
      }

      closeDropdown()
      emitChange()
    }

    const emitChange = () => {
      const editor = editorRef.current
      if (!editor) return
      const raw = domToRaw(editor)
      if (raw !== lastEmittedRef.current) {
        isInternalChangeRef.current = true
        lastEmittedRef.current = raw
        onChange?.(raw)
      }
    }

    const handleInput = () => {
      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) return
      const range = selection.getRangeAt(0)
      const node = range.startContainer

      if (node.nodeType !== Node.TEXT_NODE) {
        closeDropdown()
        emitChange()
        return
      }

      const text = node.textContent ?? ""
      const offset = range.startOffset
      const textBefore = text.slice(0, offset)

      // Find last @ before cursor that isn't preceded by a word char
      const atMatch = textBefore.match(/@([\w]*)$/)
      if (atMatch) {
        const q = atMatch[1]
        if (!triggerActiveRef.current) {
          // Save the range at the @ position to later delete @query on insert
          const triggerRange = range.cloneRange()
          triggerRange.setStart(node, offset - q.length - 1)
          triggerRange.collapse(true)
          triggerRangeRef.current = triggerRange
          triggerActiveRef.current = true
        }
        setQuery(q)
        setHighlightedIdx(0)
        setDropdownOpen(true)
        updateDropdownPosition()
        onMentionQuery?.(q)
      } else {
        closeDropdown()
      }

      emitChange()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!dropdownOpen) return

      const allItems = suggestions.length > 0
        ? [...suggestions, null] // null = "create" item
        : [null]

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIdx((i) => Math.min(i + 1, allItems.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault()
        if (highlightedIdx < suggestions.length) {
          insertMentionSuggestion(suggestions[highlightedIdx])
        } else {
          onMentionQuery?.(`create:${query}`)
          closeDropdown()
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        closeDropdown()
      }
    }

    const handleSuggestionClick = (s: MentionSuggestion | null) => {
      if (s) {
        insertMentionSuggestion(s)
      } else {
        onMentionQuery?.(`create:${query}`)
        closeDropdown()
      }
    }

    // Total items in dropdown: suggestions + "create" row
    const totalItems = suggestions.length + 1

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          "rounded-lg border border-nex-border-default bg-nex-bg-secondary",
          "focus-within:border-nex-brand-cyan focus-within:shadow-focus-cyan",
          "transition-all duration-ui ease-out",
          error && "border-nex-error focus-within:shadow-focus-error focus-within:border-nex-error",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
      >
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(closeDropdown, 150)}
          data-placeholder={placeholder}
          className={cn(
            "min-h-[44px] w-full px-3 py-2.5 outline-none",
            "text-body text-nex-text-primary font-ui leading-relaxed",
            "empty:before:content-[attr(data-placeholder)] empty:before:text-nex-text-tertiary",
            "empty:before:pointer-events-none",
          )}
        />

        {dropdownOpen && (
          <div
            className={cn(
              "absolute z-50 w-64 max-h-60 overflow-y-auto",
              "bg-nex-bg-elevated border border-nex-border-default rounded-md shadow-elevation-3",
            )}
            style={{ top: dropdownPos.top, left: dropdownPos.left }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {suggestionsLoading && (
              <div className="px-3 py-2 text-caption text-nex-text-tertiary">
                Buscando…
              </div>
            )}

            {!suggestionsLoading && suggestions.map((s, i) => {
              const Icon = ENTITY_ICONS[s.entityType]
              return (
                <button
                  key={s.id}
                  type="button"
                  data-highlighted={i === highlightedIdx ? "" : undefined}
                  onMouseEnter={() => setHighlightedIdx(i)}
                  onClick={() => handleSuggestionClick(s)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 w-full text-left cursor-pointer",
                    "transition-colors duration-micro",
                    i === highlightedIdx
                      ? "bg-nex-bg-hover"
                      : "hover:bg-nex-bg-hover",
                  )}
                >
                  <Icon
                    size={14}
                    style={{ color: ENTITY_TOKEN_STYLES[s.entityType].color }}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-body-sm text-nex-text-primary truncate">{s.name}</div>
                    <div className="font-mono text-caption text-nex-text-tertiary">@{s.handle}</div>
                  </div>
                  <Badge entity={s.entityType} size="sm" showIcon={false} />
                </button>
              )
            })}

            {/* Create option */}
            <button
              type="button"
              data-highlighted={highlightedIdx === totalItems - 1 ? "" : undefined}
              onMouseEnter={() => setHighlightedIdx(totalItems - 1)}
              onClick={() => handleSuggestionClick(null)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 w-full text-left cursor-pointer",
                "text-body-sm text-nex-brand-cyan transition-colors duration-micro",
                highlightedIdx === totalItems - 1
                  ? "bg-nex-bg-hover"
                  : "hover:bg-nex-bg-hover",
              )}
            >
              <Plus size={14} />
              Criar &ldquo;{query}&rdquo;
            </button>
          </div>
        )}
      </div>
    )
  }
)

MentionInput.displayName = "MentionInput"

export { MentionInput }
