import { memo, useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  Bell,
  Building2,
  CalendarDays,
  FileText,
  Home,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Sparkles,
  Wand2,
  Target,
  Upload,
  UserRound,
  Users,
  Linkedin,
  ScanLine,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { useContactImport } from "@/context/ContactImportContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Item = {
  label: string;
  icon: typeof Home;
  to?: string;
  search?: Record<string, string>;
  sub?: boolean;
};

const MAIN: Item[] = [
  { label: "Accueil", icon: Home, to: "/" },
  { label: "Opportunités", icon: Target, to: "/opportunites" },
  { label: "Calendrier", icon: CalendarDays, to: "/calendrier" },
  { label: "Documents", icon: FileText, to: "/documents" },
  { label: "Contacts", icon: Users, to: "/contacts" },
  { label: "Entreprises", icon: Building2, to: "/entreprises" },
  { label: "Importer", icon: Upload, to: "/import" },
];

const STUDIO: Item[] = [
  {
    label: "Interview Coach",
    icon: MessageSquare,
    to: "/assistant",
    search: { persona: "interview_coach" },
  },
  {
    label: "LinkedIn & Réseau",
    icon: Linkedin,
    to: "/assistant",
    search: { persona: "job_strategist" },
  },
  {
    label: "Expert CV & Lettre",
    icon: ScanLine,
    to: "/assistant",
    search: { persona: "cv_expert" },
  },
  {
    label: "Négociation Salaire",
    icon: Coins,
    to: "/assistant",
    search: { persona: "salary_negotiator" },
  },
];

const ASSISTANT: Item = {
  label: "NACORA AI (Hub)",
  icon: Wand2,
  to: "/assistant",
};

const bientot = () => toast("Bientôt disponible dans NACORA.");

const NavRow = memo(function NavRow({
  item,
  active,
  isCollapsed,
}: {
  item: Item;
  active: boolean;
  isCollapsed?: boolean;
}) {
  const inner = (
    <>
      <item.icon
        className={cn(
          "size-4 shrink-0 transition-all duration-200",
          active
            ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
            : "text-zinc-400 group-hover:text-zinc-100",
        )}
      />
      {!isCollapsed && (
        <span
          className={cn(
            "truncate transition-all duration-200 text-xs leading-tight tracking-tight",
            active
              ? "font-semibold text-white"
              : "font-normal text-zinc-400 group-hover:text-zinc-100",
          )}
        >
          {item.label}
        </span>
      )}
    </>
  );

  const klass = cn(
    "group relative flex items-center rounded-xl transition-all duration-200 cursor-pointer select-none",
    isCollapsed
      ? "justify-center size-9.5 p-0 mx-auto"
      : "w-full gap-2.5 px-3 py-2 min-h-[38px]",
    active
      ? "bg-gradient-to-r from-[#EC0040] to-[#D81A45] text-white font-medium border border-white/20 shadow-[0_4px_16px_rgba(216,26,69,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]"
      : "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-white/8 hover:backdrop-blur-md",
  );

  const buttonOrLink = item.to ? (
    <Link to={item.to} search={item.search} className={klass}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={bientot} className={klass}>
      {inner}
    </button>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{buttonOrLink}</TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-card/90 backdrop-blur-xl text-zinc-100 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] font-medium text-xs px-3 py-1.5 rounded-xl"
        >
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return buttonOrLink;
});

export function AppShell({
  title,
  subtitle,
  eyebrow,
  headerExtra,
  actions,
  onAdd,
  onSearch,
  searchValue,
  children,
}: {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  headerExtra?: ReactNode;
  actions?: ReactNode;
  onAdd?: () => void;
  onSearch?: (v: string) => void;
  searchValue?: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  const searchPersona = useRouterState({
    select: (s) =>
      (s.location.search as Record<string, string> | undefined)?.persona,
  });

  const importState = useContactImport();

  const isItemActive = (item: Item) => {
    if (!item.to) return false;
    if (item.to === "/assistant") {
      if (item.search?.persona) {
        return (
          pathname === "/assistant" && searchPersona === item.search.persona
        );
      }
      return (
        pathname === "/assistant" &&
        (!searchPersona || searchPersona === "general_advisor")
      );
    }
    return item.to === pathname;
  };

  const [local, setLocal] = useState("");
  const value = searchValue ?? local;
  const [menuOpen, setMenuOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCollapsed = localStorage.getItem("nacora_sidebar_collapsed");
      setIsCollapsed(
        storedCollapsed === null ? true : storedCollapsed === "true",
      );

      const checkContrast = () => {
        const active = localStorage.getItem("nacora_high_contrast") === "true";
        setIsHighContrast(active);
        if (active) {
          document.documentElement.classList.add("high-contrast");
        } else {
          document.documentElement.classList.remove("high-contrast");
        }
      };

      checkContrast();
      window.addEventListener("storage", checkContrast);
      window.addEventListener("nacora_contrast_changed", checkContrast);
      return () => {
        window.removeEventListener("storage", checkContrast);
        window.removeEventListener("nacora_contrast_changed", checkContrast);
      };
    }
  }, []);

  const toggleHighContrast = () => {
    const next = !isHighContrast;
    setIsHighContrast(next);
    localStorage.setItem("nacora_high_contrast", String(next));
    if (next) {
      document.documentElement.classList.add("high-contrast");
      toast.success("Mode Contraste Élevé activé !");
    } else {
      document.documentElement.classList.remove("high-contrast");
      toast.success("Mode Contraste Standard activé !");
    }
    window.dispatchEvent(new Event("nacora_contrast_changed"));
    window.dispatchEvent(new Event("storage"));
  };

  const isVisualCollapsed = isCollapsed;

  const toggleSidebar = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("nacora_sidebar_collapsed", String(next));
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
        {/* Soft, Accelerated Ambient Glow Orbs with zero blur overhead */}
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40 will-change-transform"
          aria-hidden="true"
        >
          <div className="absolute -top-32 left-[12%] h-[500px] w-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.12)_0%,transparent_70%)]" />
          <div className="absolute top-[22%] -right-24 h-[560px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(216,26,69,0.08)_0%,transparent_70%)]" />
          <div className="absolute top-[58%] left-[4%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)]" />
          <div className="absolute -bottom-28 right-[22%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.08)_0%,transparent_70%)]" />
        </div>

        {/* Menu Mobile Slide-over */}
        <div
          className={cn(
            "fixed inset-0 z-50 md:hidden",
            menuOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-200",
              menuOpen ? "opacity-100" : "opacity-0",
            )}
          />
          <aside
            className={cn(
              "absolute inset-y-0 left-0 flex w-[85%] max-w-[300px] flex-col border-r border-white/12 bg-[#0c0f1d]/95 backdrop-blur-xl p-4 transition-transform duration-200 ease-out shadow-[0_24px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]",
              menuOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex h-12 shrink-0 items-center justify-between gap-2 px-1">
              <Logo />
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setMenuOpen(false)}
                className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="mt-4 flex-1 overflow-y-auto space-y-5 pr-1">
              <div>
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Navigation
                </p>
                <div className="flex flex-col gap-1">
                  {MAIN.map((item) => (
                    <NavRow
                      key={item.label}
                      item={item}
                      active={isItemActive(item)}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="mb-2 flex items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>NACORA AI</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Assistant
                  </span>
                </p>
                <div className="flex flex-col gap-1">
                  <NavRow item={ASSISTANT} active={isItemActive(ASSISTANT)} />
                  {STUDIO.map((item) => (
                    <NavRow
                      key={item.label}
                      item={item}
                      active={isItemActive(item)}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-1">
                <NavRow
                  item={{
                    label: "Paramètres",
                    icon: Settings,
                    to: "/parametres",
                  }}
                  active={pathname === "/parametres"}
                />
                <NavRow
                  item={{ label: "Mon profil", icon: UserRound, to: "/profil" }}
                  active={pathname === "/profil"}
                />
              </div>
            </nav>
          </aside>
        </div>

        {/* Sidebar Desktop */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/12 bg-[#0c0f1d]/90 backdrop-blur-xl md:flex transition-[width] duration-200 shadow-[4px_0_35px_rgba(0,0,0,0.45),inset_-1px_0_0_rgba(255,255,255,0.06)]",
            isVisualCollapsed ? "w-[72px]" : "w-[254px]",
          )}
        >
          <div
            className={cn(
              "flex h-[64px] items-center justify-between border-b border-white/10",
              isVisualCollapsed ? "px-2 justify-center" : "px-4",
            )}
          >
            <Logo compact={isVisualCollapsed} />
            <button
              type="button"
              onClick={toggleSidebar}
              className="grid size-7.5 place-items-center rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all cursor-pointer"
              aria-label={
                isVisualCollapsed
                  ? "Agrandir la barre latérale"
                  : "Réduire la barre latérale"
              }
            >
              {isVisualCollapsed ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
            </button>
          </div>

          <nav
            className={cn(
              "flex-1 overflow-y-auto pb-4 space-y-5",
              isVisualCollapsed ? "px-2 pt-3" : "px-3 pt-4",
            )}
          >
            <div>
              {!isVisualCollapsed && (
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                  Navigation
                </p>
              )}
              <div className="flex flex-col gap-1">
                {MAIN.map((item) => (
                  <NavRow
                    key={item.label}
                    item={item}
                    active={isItemActive(item)}
                    isCollapsed={isVisualCollapsed}
                  />
                ))}
              </div>
            </div>

            <div
              className={
                isVisualCollapsed ? "pt-2" : "pt-2 border-t border-white/10"
              }
            >
              {!isVisualCollapsed && (
                <p className="mb-2 flex items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                  <span>NACORA AI</span>
                  <span className="rounded-full bg-primary/15 border border-primary/25 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Hub
                  </span>
                </p>
              )}
              <div className="flex flex-col gap-1">
                <NavRow
                  item={ASSISTANT}
                  active={isItemActive(ASSISTANT)}
                  isCollapsed={isVisualCollapsed}
                />
                {STUDIO.map((item) => (
                  <NavRow
                    key={item.label}
                    item={item}
                    active={isItemActive(item)}
                    isCollapsed={isVisualCollapsed}
                  />
                ))}
              </div>
            </div>
          </nav>

          {/* Pied de Sidebar */}
          <div
            className={cn(
              "p-3 border-t border-white/10 flex flex-col gap-1",
              isVisualCollapsed ? "items-center px-2" : "",
            )}
          >
            <NavRow
              item={{
                label: "Paramètres",
                icon: Settings,
                to: "/parametres",
              }}
              active={pathname === "/parametres"}
              isCollapsed={isVisualCollapsed}
            />
            <NavRow
              item={{
                label: "Mon profil",
                icon: UserRound,
                to: "/profil",
              }}
              active={pathname === "/profil"}
              isCollapsed={isVisualCollapsed}
            />
          </div>
        </aside>

        {/* Contenu Principal */}
        <div
          className={cn(
            "relative z-10 flex flex-col min-h-screen transition-all duration-250",
            isCollapsed ? "md:pl-[72px]" : "md:pl-[254px]",
          )}
        >
          <header className="sticky top-0 z-30 border-b border-white/12 bg-[#060812]/85 backdrop-blur-xl shadow-[0_10px_35px_-5px_rgba(0,0,0,0.4),inset_0_-1px_0_0_rgba(255,255,255,0.06)]">
            <div className="mx-auto flex h-auto max-w-[1360px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 md:h-[64px] md:flex-nowrap md:py-0">
              {/* Header Mobile Top */}
              <div className="flex w-full items-center gap-2.5 md:hidden">
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Ouvrir le menu"
                  className="press grid size-10 shrink-0 place-items-center rounded-xl border border-white/14 bg-white/6 text-foreground backdrop-blur-xl"
                >
                  <Menu className="size-4.5" />
                </button>
                <Logo />
                {importState.isImporting && (
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 px-2 py-1 text-[10px] font-semibold text-indigo-300">
                    <Sparkles className="size-3 text-indigo-400 animate-spin" />
                    <span>
                      {importState.current}/{importState.total} (
                      {importState.percentage}%)
                    </span>
                  </div>
                )}
                <div className="ml-auto flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleHighContrast}
                    aria-label="Améliorer le contraste"
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl border transition-all",
                      isHighContrast
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-white/12 bg-white/6 text-muted-foreground",
                    )}
                  >
                    {isHighContrast ? (
                      <EyeOff className="size-4.5" />
                    ) : (
                      <Eye className="size-4.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={bientot}
                    aria-label="Notifications"
                    className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/6 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Bell className="size-4.5" />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(216,26,69,0.8)]" />
                  </button>
                </div>
              </div>

              {/* Barre de Recherche Épurée Liquid Glass */}
              <div className="relative w-full min-w-0 sm:w-auto sm:flex-1 md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={value}
                  onChange={(e) =>
                    onSearch
                      ? onSearch(e.target.value)
                      : setLocal(e.target.value)
                  }
                  placeholder="Rechercher une offre, une entreprise, un contact…"
                  className="h-10 w-full rounded-2xl border border-white/14 bg-white/6 dark:bg-white/6 pl-10 pr-12 text-sm text-foreground outline-none backdrop-blur-2xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all placeholder:text-muted-foreground/60 focus:border-primary/60 focus:bg-white/10 focus:ring-2 focus:ring-primary/25"
                />
                <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/12 bg-white/10 px-2 py-0.5 text-[10px] font-mono text-muted-foreground sm:block backdrop-blur-md">
                  ⌘K
                </kbd>
              </div>

              {/* Actions Desktop Header */}
              <div className="hidden md:flex items-center gap-2.5 shrink-0">
                {importState.isImporting && (
                  <div
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 px-3 py-1.5 text-xs text-indigo-300 backdrop-blur-xl animate-pulse shadow-sm"
                    title={
                      importState.statusLabel ||
                      "Import et classification IA des contacts en cours..."
                    }
                  >
                    <Sparkles className="size-3.5 text-indigo-400 animate-spin" />
                    <span className="font-semibold text-[11px]">
                      Import IA : {importState.current}/{importState.total} (
                      {importState.percentage}%)
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={toggleHighContrast}
                  aria-label="Améliorer le contraste"
                  title="Améliorer le contraste"
                  className={cn(
                    "grid size-9.5 shrink-0 place-items-center rounded-xl border transition-all cursor-pointer backdrop-blur-md",
                    isHighContrast
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-white/12 bg-white/6 text-muted-foreground hover:text-foreground hover:bg-white/12",
                  )}
                >
                  {isHighContrast ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={bientot}
                  aria-label="Notifications"
                  className="relative grid size-9.5 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/6 text-muted-foreground transition-all hover:text-foreground hover:bg-white/12 backdrop-blur-md cursor-pointer"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(216,26,69,0.8)]" />
                </button>

                {onAdd && (
                  <button
                    type="button"
                    onClick={onAdd}
                    className="press inline-flex h-9.5 items-center gap-2 rounded-xl bg-gradient-to-b from-[#EC0040] to-[#D81A45] px-4 text-xs font-semibold text-white border border-white/30 shadow-[0_6px_20px_rgba(216,26,69,0.45),inset_0_1px_1px_rgba(255,255,255,0.45)] hover:brightness-110 active:brightness-95 transition-all cursor-pointer"
                  >
                    <Plus className="size-4" /> Nouvelle Opportunité
                  </button>
                )}

                {actions && (
                  <div className="flex shrink-0 items-center gap-2">
                    {actions}
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Zone Principale de Contenu */}
          <main className="flex-1 mx-auto w-full max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 pb-24 md:pb-10">
            {title && (
              <div className="mb-5 sm:mb-6 flex flex-wrap items-end justify-between gap-3 pb-3.5 border-b border-white/10">
                <div className="min-w-0 flex-1">
                  {eyebrow && (
                    <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {eyebrow}
                    </p>
                  )}
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                      {subtitle}
                    </p>
                  )}
                </div>
                {headerExtra && (
                  <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                    {headerExtra}
                  </div>
                )}
              </div>
            )}
            {children}
          </main>
        </div>

        {/* Floating AI Assistant shortcut in Liquid Glass */}
        {pathname !== "/assistant" && (
          <Link
            to="/assistant"
            className="fixed bottom-20 right-4 z-30 flex items-center gap-2.5 rounded-full border border-white/20 bg-card/80 backdrop-blur-3xl px-4 py-2.5 text-xs font-semibold text-foreground shadow-[0_12px_36px_rgba(0,0,0,0.55),0_0_24px_rgba(216,26,69,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.4)] transition-all hover:scale-105 hover:border-primary/60 active:scale-95 md:bottom-6 md:right-6"
            title="Ouvrir l'assistant IA Gemini"
          >
            <span className="flex size-2 rounded-full bg-primary animate-pulse" />
            <Sparkles className="size-4 text-primary" />
            <span className="tracking-tight">NACORA AI</span>
          </Link>
        )}

        {/* Barre inférieure mobile Dock Liquid Glass */}
        <nav className="fixed inset-x-3 bottom-3 z-40 rounded-3xl border border-white/16 bg-[#0c0f1d]/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] md:hidden">
          <div className="flex items-center justify-around px-2 py-1.5">
            <MobileTab
              to="/opportunites"
              label="Opportunités"
              icon={Target}
              active={pathname === "/opportunites"}
            />
            <MobileTab
              to="/entreprises"
              label="Entreprises"
              icon={Building2}
              active={pathname === "/entreprises"}
            />
            <button
              type="button"
              onClick={onAdd ?? bientot}
              aria-label="Ajouter une opportunité"
              className="press -mt-5 grid size-11 shrink-0 place-items-center rounded-full bg-primary text-white shadow-sm transition-opacity"
            >
              <Plus className="size-5" />
            </button>
            <MobileTab
              to="/calendrier"
              label="Calendrier"
              icon={CalendarDays}
              active={pathname === "/calendrier"}
            />
            <MobileTab
              to="/profil"
              label="Profil"
              icon={UserRound}
              active={pathname === "/profil"}
            />
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
}

function MobileTab({
  to,
  label,
  icon: Icon,
  active,
}: {
  to?: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  const klass = cn(
    "flex flex-1 flex-col items-center gap-0.5 py-1 text-[10px] font-medium transition-colors select-none",
    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
  );
  const inner = (
    <>
      <Icon className="size-4.5" />
      <span>{label}</span>
    </>
  );
  return to ? (
    <Link to={to} className={klass}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={bientot} className={klass}>
      {inner}
    </button>
  );
}
