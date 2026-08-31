import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Bot,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Terminal,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assistant/connect")({
  component: ConnectPage,
  head: () => ({
    meta: [
      { title: "Connecter une IA — NACORA" },
      {
        name: "description",
        content:
          "Connectez ChatGPT, Claude ou un autre assistant IA à votre compte NACORA via MCP.",
      },
      { property: "og:title", content: "Connecter une IA à NACORA" },
      {
        property: "og:description",
        content:
          "Guide pas à pas pour relier Claude, ChatGPT ou Cursor à vos données NACORA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function useMcpUrl() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(new URL("/mcp", window.location.origin).toString());
  }, []);
  return url;
}

function normalizeSlug(name: string): string {
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63);
  if (!slug) return "careerly";
  const reserved = [
    "workspace",
    "computer-use",
    "claude-in-chrome",
    "claude-preview",
    "claude-browser",
  ];
  if (reserved.includes(slug)) return `${slug}-app`;
  return slug;
}

function CopyField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copié dans le presse-papiers");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Impossible de copier automatiquement");
    }
  };
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-left transition-colors hover:border-primary/40 hover:bg-card"
      >
        <code className="flex-1 break-all font-mono text-sm text-foreground">
          {value || "Chargement…"}
        </code>
        <span className="shrink-0 rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </span>
      </button>
    </div>
  );
}

function Step({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
        {number}
      </span>
      <span className="text-sm leading-relaxed text-foreground">
        {children}
      </span>
    </li>
  );
}

function ClientCard({
  icon: Icon,
  name,
  description,
  active,
  onClick,
}: {
  icon: typeof Bot;
  name: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
        active
          ? "border-primary/50 bg-primary/10 ring-1 ring-primary/30"
          : "border-border/60 bg-card/40 hover:bg-card/70",
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-background">
        <Icon className="size-5 text-primary" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}

function ConnectPage() {
  const mcpUrl = useMcpUrl();
  const [client, setClient] = useState("claude");
  const slug = useMemo(() => normalizeSlug("careerly"), []);

  const claudeConnectUrl = useMemo(() => {
    if (!mcpUrl) return "";
    const params = new URLSearchParams({
      modal: "add-custom-connector",
      connectorName: "NACORA",
      connectorUrl: mcpUrl,
    });
    return `https://claude.ai/customize/connectors?${params.toString()}`;
  }, [mcpUrl]);

  const chatgptConnectUrl =
    "https://chatgpt.com/plugins#settings/Connectors?create-connector=true&redirectAfter=%2Fplugins";

  return (
    <AppShell
      eyebrow="AI Studio"
      title="Connecter une IA"
      subtitle="Liez ChatGPT, Claude ou Cursor à votre compte NACORA en quelques clics."
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header card */}
        <Card className="overflow-hidden border-border/60 bg-card/60">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/15">
                <Sparkles className="size-5 text-primary" />
              </span>
              <div>
                <CardTitle className="text-lg">Serveur MCP NACORA</CardTitle>
                <CardDescription>
                  Votre assistant peut lire et mettre à jour vos candidatures,
                  contacts et profil.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <CopyField value={mcpUrl} label="URL du serveur MCP" />

            <div className="rounded-xl border border-border/60 bg-background/50 p-4">
              <p className="mb-3 text-sm font-medium text-foreground">
                Choisir votre assistant
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <ClientCard
                  icon={Bot}
                  name="Claude (Anthropic)"
                  description="Meilleure expérience via le web ou Claude Code"
                  active={client === "claude"}
                  onClick={() => setClient("claude")}
                />
                <ClientCard
                  icon={MessageSquare}
                  name="ChatGPT"
                  description="Nécessite le mode développeur activé"
                  active={client === "chatgpt"}
                  onClick={() => setClient("chatgpt")}
                />
                <ClientCard
                  icon={Terminal}
                  name="Claude Code"
                  description="En ligne de commande dans votre terminal"
                  active={client === "claude-code"}
                  onClick={() => setClient("claude-code")}
                />
                <ClientCard
                  icon={ExternalLink}
                  name="Autre client MCP"
                  description="Cursor, Windsurf, ou un client personnalisé"
                  active={client === "other"}
                  onClick={() => setClient("other")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <Tabs value={client} onValueChange={setClient} className="w-full">
          <TabsList className="hidden">
            <TabsTrigger value="claude">Claude</TabsTrigger>
            <TabsTrigger value="chatgpt">ChatGPT</TabsTrigger>
            <TabsTrigger value="claude-code">Claude Code</TabsTrigger>
            <TabsTrigger value="other">Autre</TabsTrigger>
          </TabsList>

          <TabsContent value="claude" className="mt-0">
            <Card className="border-border/60 bg-card/60">
              <CardHeader>
                <CardTitle className="text-base">Connecter Claude</CardTitle>
                <CardDescription>
                  Depuis l'interface web de Claude.ai
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3">
                  <Step number={1}>
                    Cliquez sur le bouton ci-dessous pour ouvrir Claude avec les
                    champs pré-remplis.
                  </Step>
                  <Step number={2}>
                    Vérifiez le nom et l'URL, puis cliquez sur "Add".
                  </Step>
                  <Step number={3}>
                    Claude vous redirige vers Careerly pour approuver la
                    connexion.
                  </Step>
                  <Step number={4}>
                    Activez le connecteur depuis le composeur de chat, puis
                    demandez à Claude d'utiliser Careerly.
                  </Step>
                </ol>
                <Button asChild className="w-full gap-2">
                  <a href={claudeConnectUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-4" />
                    Ouvrir Claude avec Careerly pré-rempli
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chatgpt" className="mt-0">
            <Card className="border-border/60 bg-card/60">
              <CardHeader>
                <CardTitle className="text-base">Connecter ChatGPT</CardTitle>
                <CardDescription>
                  Nécessite le mode développeur de ChatGPT
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3">
                  <Step number={1}>
                    Activez le mode développeur dans les paramètres ChatGPT
                    (Advanced &gt; Connectors).
                  </Step>
                  <Step number={2}>
                    Ouvrez le formulaire "New plugin" via le lien ci-dessous.
                  </Step>
                  <Step number={3}>
                    Collez le nom "Careerly" et l'URL MCP affichée en haut de
                    cette page.
                  </Step>
                  <Step number={4}>
                    Cochez la case de confirmation et créez le connecteur.
                  </Step>
                  <Step number={5}>
                    Activez Careerly depuis le composeur, puis demandez à
                    ChatGPT d'interagir avec vos candidatures.
                  </Step>
                </ol>
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href={chatgptConnectUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-4" />
                    Ouvrir le formulaire ChatGPT
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claude-code" className="mt-0">
            <Card className="border-border/60 bg-card/60">
              <CardHeader>
                <CardTitle className="text-base">
                  Connecter Claude Code
                </CardTitle>
                <CardDescription>
                  Dans votre terminal, une seule commande suffit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3">
                  <Step number={1}>
                    Copiez la commande ci-dessous et exécutez-la dans votre
                    terminal.
                  </Step>
                  <Step number={2}>
                    Lancez Claude Code et exécutez{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                      /mcp
                    </code>{" "}
                    pour vérifier la connexion.
                  </Step>
                  <Step number={3}>
                    Authentifiez-vous avec votre compte Careerly quand Claude
                    Code vous le demande.
                  </Step>
                  <Step number={4}>
                    Demandez à Claude Code d'utiliser Careerly.
                  </Step>
                </ol>
                <CopyField
                  value={
                    mcpUrl
                      ? `claude mcp add --scope user --transport http ${slug} '${mcpUrl.replace(/'/g, "'\"'\"'")}'`
                      : ""
                  }
                  label="Commande d'installation"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other" className="mt-0">
            <Card className="border-border/60 bg-card/60">
              <CardHeader>
                <CardTitle className="text-base">Autre client MCP</CardTitle>
                <CardDescription>
                  Cursor, Windsurf, ou un client personnalisé
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3">
                  <Step number={1}>
                    Ouvrez les paramètres MCP / Connecteurs de votre client.
                  </Step>
                  <Step number={2}>
                    Créez un nouveau serveur MCP distant (remote / HTTP).
                  </Step>
                  <Step number={3}>
                    Nommez-le "Careerly" et collez l'URL affichée en haut de
                    cette page.
                  </Step>
                  <Step number={4}>
                    Validez et suivez la fenêtre d'autorisation Careerly.
                  </Step>
                  <Step number={5}>
                    Activez le serveur, puis demandez à l'assistant d'utiliser
                    Careerly.
                  </Step>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Refresh */}
        <Card className="border-border/60 bg-card/60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <RefreshCw className="size-5 text-primary" />
              <CardTitle className="text-base">
                Actualiser après une mise à jour
              </CardTitle>
            </div>
            <CardDescription>
              Les assistants mettent en cache la liste des outils. Après une
              modification de Careerly, actualisez le connecteur.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>Claude :</strong> Connectors &gt; Careerly &gt;
                  Refresh / Update tools. Si l'URL a changé, supprimez le
                  connecteur et recréez-le.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>ChatGPT :</strong> Plugins &gt; Careerly &gt;
                  Information &gt; Refresh. Si l'URL a changé, supprimez l'app
                  et recommencez.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>Claude Code :</strong> Nouvelle session pour recharger
                  les outils. Si l'URL a changé :{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    claude mcp remove {slug}
                  </code>{" "}
                  puis réinstallez avec la commande ci-dessus.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>Autre client :</strong> Rechargez le serveur MCP ou
                  reconnectez-le avec la dernière URL.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" />
          <Link to="/" className="hover:text-foreground hover:underline">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
