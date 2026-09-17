import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Bell,
  Building2,
  CalendarDays,
  FileText,
  Home,
  Mail,
  MessageSquare,
  Plug,
  Plus,
  Search,
  Settings,
  Sparkles,
  Wand2,
  Target,
  Upload,
  UserRound,
  Users,
  ChevronDown,
  Linkedin,
  ScanLine,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

type Item = {
  label: string;
  icon: typeof Home;
  to?: string;
  sub?: boolean;
};

const MAIN: Item[] = [
  { label: "Accueil", icon: Home, to: "/" },
  { label: "Opportunités", icon: Target, to: "/opportunites" },
  { label: "Entreprises", icon: Building2, to: "/entreprises" },
  { label: "Contacts", icon: Users, to: "/contacts" },
  { label: "Calendrier", icon: CalendarDays, to: "/calendrier" },
  { label: "Documents", icon: FileText, to: "/documents" },
  { label: "Importer", icon: Upload, to: "/import" },
];

const STUDIO: Item[] = [
  { label: "CV Optimizer", icon: ScanLine, to: "/profil", sub: true },
  { label: "Email Assistant", icon: Mail, to: "/contacts", sub: true },
  {
    label: "LinkedIn Assistant",
    icon: Linkedin,
    to: "/assistant/linkedin",
    sub: true,
  },
  {
    label: "Interview Coach",
    icon: MessageSquare,
    to: "/assistant/interview",
    sub: true,
  },
  {
    label: "Connecter une IA",
    icon: Plug,
    to: "/assistant/connect",
    sub: true,
  },
];

const ASSISTANT: Item = {
  label: "NACORA AI (Hub)",
  icon: Wand2,
  to: "/assistant",
};

const bientot = () => toast("Bientôt disponible dans NACORA.");

function NavRow({ item, active }: { item: Item; active: boolean }) {
  const inner = (
    <>
      <item.icon className="size-[18px] shrink-0" />
      <span className="truncate">{item.label}</span>
    </>
  );
  const klass = cn(
    "group relative flex w-full items-center gap-3 rounded-xl py-2.5 text-[13.5px] font-medium transition-colors",
    item.sub ? "pl-4 pr-3 text-[13px]" : "px-3",
    active
      ? "bg-primary/15 text-foreground ring-1 ring-primary/35"
      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
  );
  return item.to ? (
    <Link to={item.to} className={klass}>
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
      )}
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={bientot} className={klass}>
      {inner}
    </button>
  );
}

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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [local, setLocal] = useState("");
  const value = searchValue ?? local;
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-background aurora-bg">
      {/* Menu mobile */}
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
            "absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-[82%] max-w-[300px] flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-[68px] shrink-0 items-center justify-between gap-2 px-4">
            <Logo />
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 pb-4">
            <div className="flex flex-col gap-1">
              {MAIN.map((item) => (
                <NavRow
                  key={item.label}
                  item={item}
                  active={item.to === pathname}
                />
              ))}
            </div>

            <div className="my-4 h-px bg-sidebar-border" />

            <p className="mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              NACORA AI <span className="text-primary">✦</span>
            </p>
            <NavRow item={ASSISTANT} active={pathname === "/assistant"} />
            <div className="mt-1 ml-5 flex flex-col gap-1 border-l border-sidebar-border pl-2">
              {STUDIO.map((item) => (
                <NavRow
                  key={item.label}
                  item={item}
                  active={item.to === pathname}
                />
              ))}
            </div>

            <div className="my-4 h-px bg-sidebar-border" />

            <div className="flex flex-col gap-1">
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

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-sidebar-border bg-sidebar/90 backdrop-blur-xl md:flex">
        <div className="flex h-[72px] items-center px-5">
          <Logo />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          <div className="flex flex-col gap-1">
            {MAIN.map((item) => (
              <NavRow
                key={item.label}
                item={item}
                active={item.to === pathname}
              />
            ))}
          </div>

          <div className="my-4 h-px bg-sidebar-border" />

          <p className="mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            NACORA AI <span className="text-primary">✦</span>
          </p>
          <NavRow item={ASSISTANT} active={pathname === "/assistant"} />
          <div className="mt-1 ml-5 flex flex-col gap-1 border-l border-sidebar-border pl-2">
            {STUDIO.map((item) => (
              <NavRow
                key={item.label}
                item={item}
                active={item.to === pathname}
              />
            ))}
          </div>
        </nav>

        <div className="px-3 pb-3">
          <Link
            to="/parametres"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground"
          >
            <Settings className="size-[18px]" /> Paramètres
          </Link>

          <Link
            to="/profil"
            className="mt-2 flex items-center gap-3 rounded-2xl border border-sidebar-border bg-card/70 px-3 py-2.5 transition-colors hover:bg-card"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full gradient-hero text-primary-foreground">
              <UserRound className="size-4" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-[13px] font-semibold">
                Mon compte
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                Voir mon profil
              </span>
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        </div>
      </aside>

      {/* Contenu */}
      <div className="md:pl-[248px]">
        <header className="sticky top-0 z-30 border-b border-border/50 bg-background/75 backdrop-blur-xl">
          <div className="mx-auto flex h-auto max-w-[1200px] flex-wrap items-center gap-3 px-4 py-3.5 sm:px-6 md:h-[72px] md:flex-nowrap md:py-0">
            <div className="flex w-full items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Ouvrir le menu"
                className="press grid size-10 shrink-0 place-items-center rounded-full border border-border/60 bg-card/60 text-foreground"
              >
                <Menu className="size-5" />
              </button>
              <Logo />
              <button
                type="button"
                onClick={bientot}
                aria-label="Notifications"
                className="relative ml-auto grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                <Bell className="size-[18px]" />
                <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  3
                </span>
              </button>
            </div>

            <div className="relative w-full min-w-0 sm:w-auto sm:flex-1 md:mx-auto md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={value}
                onChange={(e) =>
                  onSearch ? onSearch(e.target.value) : setLocal(e.target.value)
                }
                placeholder="Rechercher une offre, une entreprise…"
                className="h-10 w-full rounded-full border border-border/70 bg-card/60 pl-10 pr-4 sm:pr-14 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">
                ⌘K
              </kbd>
            </div>

            <button
              type="button"
              onClick={bientot}
              aria-label="Notifications"
              className="relative hidden md:grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
            >
              <Bell className="size-[18px]" />
              <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                3
              </span>
            </button>

            {onAdd && (
              <button
                type="button"
                onClick={onAdd}
                className="press hidden shrink-0 items-center gap-2 rounded-full gradient-hero px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_var(--color-primary)] sm:inline-flex"
              >
                <Plus className="size-4" /> Ajouter une opportunité
              </button>
            )}

            {actions && (
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        </header>

        <main className="pop-in mx-auto max-w-[1200px] px-4 pb-28 pt-5 sm:px-6 sm:pt-6 md:pb-12">
          {title && (
            <div className="pop-in mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
              <div className="min-w-0">
                {eyebrow && (
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                    {eyebrow}
                  </p>
                )}
                <h1 className="text-[22px] font-extrabold tracking-tight sm:text-[28px]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
              {headerExtra && (
                <div className="flex w-full flex-wrap items-center gap-2 [&>*]:flex-1 sm:w-auto sm:[&>*]:flex-none">
                  {headerExtra}
                </div>
              )}
            </div>
          )}
          {children}
        </main>
      </div>

      {/* Barre inférieure (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <div className="flex items-end justify-around px-2 pt-1.5">
          <MobileTab
            to="/"
            label="Accueil"
            icon={Home}
            active={pathname === "/"}
          />
          <MobileTab
            to="/opportunites"
            label="Opportunités"
            icon={Target}
            active={pathname === "/opportunites"}
          />
          <button
            type="button"
            onClick={onAdd ?? bientot}
            aria-label="Ajouter une opportunité"
            className="press -mt-6 grid size-14 shrink-0 place-items-center self-center rounded-full gradient-hero text-primary-foreground shadow-[0_10px_30px_-10px_var(--color-primary)]"
          >
            <Plus className="size-6" />
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
    "flex flex-1 flex-col items-center gap-1 py-2 text-[10.5px] font-medium transition-colors",
    active ? "text-primary" : "text-muted-foreground",
  );
  const inner = (
    <>
      <Icon className="size-[19px]" />
      {label}
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
