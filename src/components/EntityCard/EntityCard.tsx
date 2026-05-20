import * as React from "react";
import { FileText, Link } from "lucide-react";
import { cn } from "../../lib/cn";
import { Badge } from "../Badge/Badge";
import type { EntityType } from "../../tokens/colors";

export interface EntityField {
  label: string;
  value: React.ReactNode;
  span?: boolean;
}

export interface EntityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  handle: string;
  entity: EntityType;
  fields?: EntityField[];
  articleCount?: number;
  backlinkCount?: number;
  glassMagic?: boolean;
}

const EntityCard = React.forwardRef<HTMLDivElement, EntityCardProps>(
  (
    {
      className,
      name,
      handle,
      entity,
      fields = [],
      articleCount,
      backlinkCount,
      glassMagic = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg border border-nex-border-subtle bg-nex-bg-secondary",
          "p-4 flex flex-col gap-3",
          "transition-colors duration-ui ease-out hover:border-nex-border-default",
          glassMagic && "nex-glass-magic",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-ui text-h3 text-nex-text-primary leading-tight">{name}</h3>
            <div className="font-mono text-caption text-nex-text-tertiary mt-0.5">{handle}</div>
          </div>
          <Badge entity={entity} />
        </div>

        {/* Fields */}
        {fields.length > 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {fields.map((field, i) => (
              <div
                key={i}
                className={cn("flex flex-col gap-0.5", field.span && "col-span-2")}
              >
                <span className="text-[10px] uppercase tracking-[0.08em] text-nex-text-secondary">
                  {field.label}
                </span>
                <span className="text-body-sm text-nex-text-primary font-mono">{field.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {(articleCount !== undefined || backlinkCount !== undefined) && (
          <div className="flex items-center gap-3 pt-2 border-t border-nex-border-subtle">
            {articleCount !== undefined && (
              <span className="flex items-center gap-1 text-caption text-nex-text-tertiary">
                <FileText size={12} />
                {articleCount} artigos
              </span>
            )}
            {backlinkCount !== undefined && (
              <span className="flex items-center gap-1 text-caption text-nex-text-tertiary">
                <Link size={12} />
                {backlinkCount} backlinks
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

EntityCard.displayName = "EntityCard";

export { EntityCard };
