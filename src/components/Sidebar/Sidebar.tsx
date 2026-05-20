import * as React from "react";
import {
  Home, BookOpen, Search, Sparkles,
  UserRound, MapPin, Shield, Package, Skull, Calendar,
  Plus, ChevronsUpDown, Settings,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { NavItem } from "../NavItem/NavItem";
import { Avatar } from "../Avatar/Avatar";

export type SidebarSection = "home" | "articles" | "search" | "ai" | "characters" | "places" | "factions" | "items" | "creatures" | "events";

export interface SidebarUniverse {
  name: string;
  entityCount?: number;
}

export interface SidebarUser {
  name: string;
  initials: string;
  plan?: string;
}

export interface SidebarEntityCounts {
  characters?: number;
  places?: number;
  factions?: number;
  items?: number;
  creatures?: number;
  events?: number;
  articles?: number;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  activeSection?: SidebarSection;
  onSectionChange?: (section: SidebarSection) => void;
  universe?: SidebarUniverse;
  user?: SidebarUser;
  counts?: SidebarEntityCounts;
  onAddEntity?: () => void;
  onUniverseClick?: () => void;
  onSettingsClick?: () => void;
  logo?: React.ReactNode;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      activeSection,
      onSectionChange,
      universe,
      user,
      counts,
      onAddEntity,
      onUniverseClick,
      onSettingsClick,
      logo,
      ...props
    },
    ref
  ) => {
    const nav = (section: SidebarSection) => () => onSectionChange?.(section);

    return (
      <aside
        ref={ref}
        className={cn(
          "w-[240px] flex-shrink-0 h-full flex flex-col gap-1",
          "bg-nex-bg-primary border-r border-nex-border-subtle",
          "px-3 py-4",
          className
        )}
        {...props}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2.5 pb-3.5">
          {logo ?? (
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-nex-brand-cyan to-nex-brand-violet flex items-center justify-center" />
          )}
          <span className="font-display text-[14px] font-semibold tracking-[0.04em] text-nex-text-primary">
            Nexus Creator
          </span>
        </div>

        {/* Universe picker */}
        {universe && (
          <div
            onClick={onUniverseClick}
            className={cn(
              "flex items-center justify-between gap-2 px-3 py-2.5 mb-2",
              "rounded-md bg-nex-bg-elevated border border-nex-border-subtle",
              "cursor-pointer hover:border-nex-border-default transition-colors duration-ui"
            )}
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-body-sm font-semibold text-nex-text-primary truncate">
                {universe.name}
              </span>
              {universe.entityCount !== undefined && (
                <span className="text-[10px] uppercase tracking-[0.08em] text-nex-text-tertiary">
                  {universe.entityCount} entidades
                </span>
              )}
            </div>
            <ChevronsUpDown size={14} className="text-nex-text-secondary flex-shrink-0" />
          </div>
        )}

        {/* Main nav */}
        <NavItem icon={<Home size={16} />} label="Início" active={activeSection === "home"} onClick={nav("home")} />
        <NavItem icon={<BookOpen size={16} />} label="Artigos" count={counts?.articles} active={activeSection === "articles"} onClick={nav("articles")} />
        <NavItem icon={<Search size={16} />} label="Buscar" active={activeSection === "search"} onClick={nav("search")} />
        <NavItem icon={<Sparkles size={16} />} label="Arquivista" active={activeSection === "ai"} onClick={nav("ai")} />

        {/* Entities section */}
        <div className="flex justify-between items-center px-3 pt-3 pb-1">
          <span className="text-[10px] uppercase tracking-[0.08em] text-nex-text-tertiary">
            Entidades
          </span>
          <button onClick={onAddEntity} className="text-nex-text-secondary hover:text-nex-text-primary transition-colors">
            <Plus size={12} />
          </button>
        </div>

        <NavItem icon={<UserRound size={16} />} label="Personagens" count={counts?.characters} iconColor="#8B5CF6" active={activeSection === "characters"} onClick={nav("characters")} />
        <NavItem icon={<MapPin size={16} />}    label="Locais"      count={counts?.places}     iconColor="#10B981" active={activeSection === "places"}     onClick={nav("places")} />
        <NavItem icon={<Shield size={16} />}    label="Facções"     count={counts?.factions}   iconColor="#F59E0B" active={activeSection === "factions"}   onClick={nav("factions")} />
        <NavItem icon={<Package size={16} />}   label="Itens"       count={counts?.items}      iconColor="#3B82F6" active={activeSection === "items"}      onClick={nav("items")} />
        <NavItem icon={<Skull size={16} />}     label="Criaturas"   count={counts?.creatures}  iconColor="#EF4444" active={activeSection === "creatures"}  onClick={nav("creatures")} />
        <NavItem icon={<Calendar size={16} />}  label="Eventos"     count={counts?.events}     iconColor="#EC4899" active={activeSection === "events"}     onClick={nav("events")} />

        <div className="h-px bg-nex-border-subtle mx-1 my-3" />

        {/* User footer */}
        {user && (
          <div className="mt-auto flex items-center gap-2.5 p-2 rounded-md hover:bg-nex-bg-hover transition-colors cursor-pointer">
            <Avatar initials={user.initials} size={28} />
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="text-[12px] font-medium text-nex-text-primary truncate">{user.name}</span>
              {user.plan && (
                <span className="w-fit text-[9px] uppercase tracking-[0.06em] px-1.5 py-px rounded-full bg-[rgba(139,92,246,0.15)] text-nex-brand-violet border border-[rgba(139,92,246,0.3)]">
                  {user.plan}
                </span>
              )}
            </div>
            <button
              onClick={onSettingsClick}
              className="text-nex-text-secondary hover:text-nex-text-primary transition-colors"
            >
              <Settings size={14} />
            </button>
          </div>
        )}
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };
