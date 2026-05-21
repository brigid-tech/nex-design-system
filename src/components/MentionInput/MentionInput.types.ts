import type { EntityType } from "../../tokens/colors"

export type { EntityType }

export interface MentionSuggestion {
  id: string
  handle: string
  name: string
  entityType: EntityType
  fields?: string[]
}

export interface MentionToken {
  id: string
  handle: string
  field?: string
  entityType: EntityType
  resolvedValue?: string
}

export interface MentionInputProps {
  value?: string
  onChange?: (raw: string) => void
  onMentionQuery?: (query: string) => void
  suggestions?: MentionSuggestion[]
  suggestionsLoading?: boolean
  placeholder?: string
  disabled?: boolean
  error?: boolean
  className?: string
  resolvedValues?: Record<string, Record<string, string>>
}
