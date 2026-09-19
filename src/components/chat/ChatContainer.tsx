import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Sparkles,
  Send,
  Plus,
  Trash2,
  RotateCcw,
  MessageSquare,
  Bot,
  UserCheck,
  FileEdit,
  Compass,
  Coins,
  ChevronRight,
  Sliders,
  PanelLeftClose,
  PanelLeftOpen,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { executeChatTurnServerFn } from "@/ai/chat/chat.server-fn";
import type {
  ChatMessage,
  ChatModelId,
  ChatPersonaId,
  ChatSession,
} from "@/ai/chat/chat.types";
import { PERSONA_PROMPTS } from "@/ai/chat/chat.prompt";
import { ChatPersonaSelector } from "./ChatPersonaSelector";
import { ChatModelSelector } from "./ChatModelSelector";
import { ChatMessageItem } from "./ChatMessageItem";
import { CustomPromptDialog } from "./CustomPromptDialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  type NormalizedCandidateContext,
  normalizeCandidateContext,
} from "@/ai/chat/chat.context";

const STORAGE_KEY = "nacora_gemini_chat_sessions_v1";
const ACTIVE_SESSION_KEY = "nacora_active_chat_session_id";

const SUGGESTIONS_BY_PERSONA: Record<ChatPersonaId, string[]> = {
  general_advisor: [
    "Comment structurer efficacement mes recherches d'emploi cette semaine ?",
    "Quelles sont les compétences les plus recherchées pour mon profil ?",
    "Comment relancer une candidature sans paraître trop insistant ?",
    "Aide-moi à définir mes points forts et axes de différenciation",
  ],
  interview_coach: [
    "Faisons une simulation d'entretien : pose-moi la première question",
    "Comment répondre à la question : 'Parlez-moi d'un échec récent' ?",
    "Quelles questions pertinentes puis-je poser au recruteur en fin d'entretien ?",
    "Entraîne-moi à structurer mes réponses selon la méthode STAR",
  ],
  cv_expert: [
    "Comment transformer mes tâches quotidiennes en accomplissements chiffrés ?",
    "Rédige-moi une phrase d'accroche percutante pour le haut de mon CV",
    "Quels mots-clés ATS intégrer pour un poste de chef de projet / ingénieur ?",
    "Rédige un modèle d'email court et accrocheur pour accompagner ma candidature",
  ],
  job_strategist: [
    "Comment approcher directement des managers opérationnels sur LinkedIn ?",
    "Quelle stratégie adopter pour pénétrer le marché caché de l'emploi ?",
    "Rédige un message d'invitation LinkedIn personnalisé sans faire vendeur",
    "Comment cibler des entreprises qui recrutent avant même la publication d'offres ?",
  ],
  salary_negotiator: [
    "Quelle fourchette de salaire demander pour mon niveau d'expérience ?",
    "Comment réagir si l'offre salariale proposée est inférieure à mes attentes ?",
    "Quels éléments négocier au-delà du salaire fixe (primes, télétravail, congés) ?",
    "Donne-moi un script exact pour aborder la question de la rémunération",
  ],
  custom: [
    "Présente-toi et dis-moi comment tu peux m'aider avec tes consignes actuelles",
    "Propose-moi un plan d'action personnalisé",
  ],
};

interface ChatContainerProps {
  userPrenom?: string;
  candidateProfile?: NormalizedCandidateContext;
  initialPersona?: ChatPersonaId;
}

export function ChatContainer({
  userPrenom,
  candidateProfile,
  initialPersona,
}: ChatContainerProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [customPromptModalOpen, setCustomPromptModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync to localStorage
  const saveSessions = useCallback((newSessions: ChatSession[]) => {
    setSessions(newSessions);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
    } catch {
      // ignore
    }
  }, []);

  const currentSession = useMemo(() => {
    return sessions.find((s) => s.id === activeSessionId) || sessions[0];
  }, [sessions, activeSessionId]);

  const handleUpdateCurrentSession = useCallback(
    (patch: Partial<ChatSession>) => {
      if (!currentSession) return;
      const updated = sessions.map((s) =>
        s.id === currentSession.id
          ? { ...s, ...patch, updatedAt: new Date().toISOString() }
          : s,
      );
      saveSessions(updated);
    },
    [currentSession, sessions, saveSessions],
  );

  // Scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Initialize or load sessions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const activeId = localStorage.getItem(ACTIVE_SESSION_KEY);
      let parsedSessions: ChatSession[] = stored ? JSON.parse(stored) : [];

      if (parsedSessions.length === 0) {
        const defaultSession: ChatSession = {
          id: "session_" + Date.now(),
          title: "Nouvelle discussion",
          personaId: initialPersona || "general_advisor",
          modelId: "gemini-3.5-flash",
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        parsedSessions = [defaultSession];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedSessions));
      }

      setSessions(parsedSessions);

      const targetId =
        activeId && parsedSessions.some((s) => s.id === activeId)
          ? activeId
          : parsedSessions[0].id;
      setActiveSessionId(targetId);
    } catch {
      // Fallback in case of parse error
      const defaultSession: ChatSession = {
        id: "session_" + Date.now(),
        title: "Nouvelle discussion",
        personaId: initialPersona || "general_advisor",
        modelId: "gemini-3.5-flash",
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSessions([defaultSession]);
      setActiveSessionId(defaultSession.id);
    }
  }, []);

  // Update persona when changed via URL / sidebar selection
  useEffect(() => {
    if (
      initialPersona &&
      currentSession &&
      currentSession.personaId !== initialPersona
    ) {
      handleUpdateCurrentSession({ personaId: initialPersona });
    }
  }, [initialPersona, currentSession, handleUpdateCurrentSession]);

  useEffect(() => {
    scrollToBottom("auto");
  }, [activeSessionId]);

  useEffect(() => {
    scrollToBottom("smooth");
  }, [currentSession?.messages.length, loading]);

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    localStorage.setItem(ACTIVE_SESSION_KEY, id);
  };

  const handleCreateNewSession = (persona?: ChatPersonaId) => {
    const newSession: ChatSession = {
      id: "session_" + Date.now(),
      title: "Nouvelle discussion",
      personaId: persona || currentSession?.personaId || "general_advisor",
      modelId: currentSession?.modelId || "gemini-3.5-flash",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newSession, ...sessions];
    saveSessions(updated);
    setActiveSessionId(newSession.id);
    localStorage.setItem(ACTIVE_SESSION_KEY, newSession.id);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = sessions.filter((s) => s.id !== id);
    if (filtered.length === 0) {
      const resetSession: ChatSession = {
        id: "session_" + Date.now(),
        title: "Nouvelle discussion",
        personaId: "general_advisor",
        modelId: "gemini-3.5-flash",
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveSessions([resetSession]);
      setActiveSessionId(resetSession.id);
    } else {
      saveSessions(filtered);
      if (activeSessionId === id) {
        setActiveSessionId(filtered[0].id);
      }
    }
    toast.success("Discussion supprimée");
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? inputMessage).trim();
    if (!text || loading || !currentSession) return;

    const userMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...currentSession.messages, userMsg];

    // Generate smart title from first user prompt
    let title = currentSession.title;
    if (currentSession.messages.length === 0) {
      title = text.slice(0, 35) + (text.length > 35 ? "..." : "");
    }

    const updatedCurrent: ChatSession = {
      ...currentSession,
      title,
      messages: newMessages,
      updatedAt: new Date().toISOString(),
    };

    const updatedSessions = sessions.map((s) =>
      s.id === currentSession.id ? updatedCurrent : s,
    );
    saveSessions(updatedSessions);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await executeChatTurnServerFn({
        data: {
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          modelId: currentSession.modelId,
          personaId: currentSession.personaId,
          customSystemInstruction: currentSession.customSystemInstruction,
          candidateContext: normalizeCandidateContext(candidateProfile),
        },
      });

      const assistantMsg: ChatMessage = {
        id: "msg_bot_" + Date.now(),
        role: "assistant",
        content: response.reply,
        timestamp: response.timestamp,
        modelUsed: response.modelUsed,
      };

      const finalMessages = [...newMessages, assistantMsg];
      const finalizedSession = {
        ...updatedCurrent,
        messages: finalMessages,
        updatedAt: new Date().toISOString(),
      };
      saveSessions(
        sessions.map((s) =>
          s.id === currentSession.id ? finalizedSession : s,
        ),
      );
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Erreur lors de la réponse de Gemini.";

      const assistantErrorMsg: ChatMessage = {
        id: "msg_bot_err_" + Date.now(),
        role: "assistant",
        content: `Désolé, une erreur s'est produite : ${errorMsg}`,
        timestamp: new Date().toISOString(),
        isError: true,
      };

      const finalMessages = [...newMessages, assistantErrorMsg];
      saveSessions(
        sessions.map((s) =>
          s.id === currentSession.id
            ? { ...updatedCurrent, messages: finalMessages }
            : s,
        ),
      );
    } finally {
      setLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleRetryLast = () => {
    if (!currentSession || currentSession.messages.length === 0) return;
    const lastUserMsg = [...currentSession.messages]
      .reverse()
      .find((m) => m.role === "user");
    if (!lastUserMsg) return;

    // Filter out trailing error messages
    const trimmed = currentSession.messages.filter((m) => !m.isError);
    handleUpdateCurrentSession({ messages: trimmed });
    handleSendMessage(lastUserMsg.content);
  };

  const handleClearThread = () => {
    if (!currentSession) return;
    handleUpdateCurrentSession({ messages: [], title: "Nouvelle discussion" });
    toast.success("Historique effacé pour cette discussion");
  };

  const suggestions =
    SUGGESTIONS_BY_PERSONA[currentSession?.personaId || "general_advisor"] ||
    [];

  return (
    <TooltipProvider>
      <div className="glass-panel-elevated flex h-[calc(100vh-140px)] min-h-[550px] w-full overflow-hidden rounded-3xl border-white/15 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.25)]">
        {/* Sessions Sidebar */}
        <aside
          className={cn(
            "flex flex-col border-r border-white/12 bg-white/[0.03] backdrop-blur-2xl transition-all duration-300 shrink-0",
            sidebarOpen ? "w-64 sm:w-72" : "w-0 overflow-hidden border-r-0",
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-3.5 bg-white/[0.04] backdrop-blur-md">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Discussions
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCreateNewSession()}
              className="h-8 gap-1.5 rounded-xl border-none bg-white/10 text-xs font-semibold text-foreground hover:bg-white/20 shadow-xs cursor-pointer backdrop-blur-md"
            >
              <Plus className="size-3.5" />
              <span>Nouveau</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.map((sess) => {
              const isActive = sess.id === activeSessionId;
              const personaConfig = PERSONA_PROMPTS[sess.personaId];

              return (
                <div
                  key={sess.id}
                  onClick={() => handleSelectSession(sess.id)}
                  className={cn(
                    "group relative flex items-center justify-between gap-2 rounded-xl p-2.5 text-xs transition-all cursor-pointer",
                    isActive
                      ? "bg-white/15 text-foreground font-semibold shadow-xs backdrop-blur-md"
                      : "text-muted-foreground hover:bg-white/8 hover:text-foreground",
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Bot
                      className={cn(
                        "size-3.5 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "truncate text-xs",
                          isActive
                            ? "font-semibold text-foreground"
                            : "font-normal text-muted-foreground",
                        )}
                      >
                        {sess.title}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground/70 mt-0.5">
                        {personaConfig?.title || "Assistant"} •{" "}
                        {sess.messages.length} msg
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleDeleteSession(sess.id, e)}
                    className="grid size-6 place-items-center rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/15 hover:text-destructive transition-all cursor-pointer"
                    title="Supprimer la discussion"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer Info */}
          <div className="border-t border-white/10 p-3 bg-white/5">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Sparkles className="size-3.5 text-primary shrink-0" />
              <span className="truncate font-medium">
                Propulsé par Google Gemini
              </span>
            </div>
          </div>
        </aside>

        {/* Main Chat Thread */}
        <div className="flex flex-1 min-w-0 flex-col bg-transparent">
          {/* Chat Header Bar */}
          <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/12 px-3 sm:px-5 bg-white/[0.04] backdrop-blur-2xl">
            <div className="flex items-center gap-2 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10"
                title={
                  sidebarOpen ? "Masquer l'historique" : "Afficher l'historique"
                }
              >
                {sidebarOpen ? (
                  <PanelLeftClose className="size-4" />
                ) : (
                  <PanelLeftOpen className="size-4" />
                )}
              </Button>

              <ChatPersonaSelector
                currentPersona={currentSession?.personaId || "general_advisor"}
                onSelectPersona={(pId) =>
                  handleUpdateCurrentSession({ personaId: pId })
                }
                onOpenCustomPromptModal={() => setCustomPromptModalOpen(true)}
              />

              {currentSession?.personaId === "custom" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCustomPromptModalOpen(true)}
                  className="h-8 gap-1 rounded-xl px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10"
                  title="Modifier les consignes personnalisées"
                >
                  <Sliders className="size-3.5" />
                  <span className="hidden sm:inline">Consignes</span>
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ChatModelSelector
                currentModel={currentSession?.modelId || "gemini-3.5-flash"}
                onSelectModel={(mId: ChatModelId) =>
                  handleUpdateCurrentSession({ modelId: mId })
                }
              />

              {currentSession && currentSession.messages.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearThread}
                      className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/15"
                    >
                      <RotateCcw className="size-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs glass-panel">
                    Effacer cette discussion
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </header>

          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2">
            {currentSession?.messages.length === 0 ? (
              /* Welcome Empty State */
              <div className="flex min-h-full flex-col items-center justify-center p-4 text-center max-w-xl mx-auto my-auto animate-in fade-in-50 duration-300">
                <div className="relative mb-4 grid size-14 place-items-center rounded-2xl bg-white/10 text-foreground shadow-lg backdrop-blur-2xl">
                  <Sparkles className="size-7 text-primary drop-shadow-[0_0_12px_rgba(216,26,69,0.6)]" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {PERSONA_PROMPTS[currentSession.personaId]?.title ||
                    "NACORA AI Coach"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-md">
                  {PERSONA_PROMPTS[currentSession.personaId]?.subtitle ||
                    "Posez vos questions ou lancez une simulation pour booster vos candidatures."}
                </p>

                {candidateProfile?.titreVise && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-1 text-xs text-muted-foreground font-medium backdrop-blur-md">
                    <Info className="size-3 text-primary" />
                    Profil ciblé : {candidateProfile.titreVise}
                  </div>
                )}

                {/* Suggestions Cards */}
                <div className="mt-6 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 text-left">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(suggestion)}
                      className="glass-card-interactive group flex items-center justify-between gap-2 p-3.5 text-xs text-muted-foreground transition-all hover:text-foreground cursor-pointer"
                    >
                      <span className="line-clamp-2 leading-snug font-medium">
                        {suggestion}
                      </span>
                      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Message Thread List */
              <>
                {currentSession?.messages.map((msg) => (
                  <ChatMessageItem
                    key={msg.id}
                    message={msg}
                    userPrenom={userPrenom}
                    onRetry={msg.isError ? handleRetryLast : undefined}
                  />
                ))}

                {/* Typing / Generating Indicator */}
                {loading && (
                  <div className="flex w-full gap-3 py-3 px-2 sm:px-4">
                    <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/10 text-primary backdrop-blur-md">
                      <Sparkles className="size-4 animate-spin" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold text-muted-foreground px-1">
                        NACORA AI ({currentSession.modelId})
                      </span>
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs bg-white/8 px-4 py-3 text-xs text-muted-foreground backdrop-blur-xl shadow-xs">
                        <span className="inline-block size-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                        <span className="inline-block size-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                        <span className="inline-block size-2 rounded-full bg-primary animate-bounce" />
                        <span className="ml-2 text-[11px] text-muted-foreground font-medium">
                          Réflexion en cours...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="border-t border-white/12 p-3 sm:p-4 bg-white/[0.03] backdrop-blur-2xl">
            <div className="mx-auto max-w-4xl">
              {/* Quick suggestion chips above input if there are messages */}
              {currentSession &&
                currentSession.messages.length > 0 &&
                !loading && (
                  <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    <span className="text-[11px] font-semibold text-muted-foreground shrink-0">
                      Suggestions :
                    </span>
                    {suggestions.slice(0, 3).map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(s)}
                        className="shrink-0 rounded-full bg-white/8 border border-white/10 backdrop-blur-md px-3 py-1 text-[11px] text-muted-foreground hover:bg-white/15 hover:text-foreground transition-all cursor-pointer shadow-xs"
                      >
                        {s.slice(0, 32)}...
                      </button>
                    ))}
                  </div>
                )}

              <div className="relative flex items-end gap-2 rounded-2xl border border-white/14 bg-white/6 backdrop-blur-2xl px-3.5 py-2 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] focus-within:border-primary/60 focus-within:bg-white/10 transition-all">
                <Textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={
                    currentSession?.personaId === "interview_coach"
                      ? "Répondez à la simulation ou demandez un entraînement..."
                      : currentSession?.personaId === "salary_negotiator"
                        ? "Indiquez l'offre ou la question sur votre rémunération..."
                        : "Posez votre question à NACORA AI (Entrée pour envoyer)..."
                  }
                  rows={1}
                  disabled={loading}
                  className="min-h-[44px] max-h-36 flex-1 resize-none border-0 bg-transparent p-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-0 shadow-none leading-relaxed"
                />

                <Button
                  type="button"
                  size="sm"
                  disabled={!inputMessage.trim() || loading}
                  onClick={() => handleSendMessage()}
                  className="size-9 shrink-0 rounded-xl glass-btn-primary font-semibold disabled:opacity-30 transition-all cursor-pointer"
                >
                  <Send className="size-4" />
                </Button>
              </div>

              <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
                <span className="hidden sm:inline">
                  Maj + Entrée pour retour à la ligne
                </span>
                <span className="flex items-center gap-1">
                  <span>Modèle actif :</span>
                  <strong className="text-foreground font-medium">
                    {currentSession?.modelId}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Prompt Dialog */}
      <CustomPromptDialog
        open={customPromptModalOpen}
        onOpenChange={setCustomPromptModalOpen}
        systemInstruction={currentSession?.customSystemInstruction || ""}
        onSave={(instruction) =>
          handleUpdateCurrentSession({
            customSystemInstruction: instruction,
            personaId: "custom",
          })
        }
      />
    </TooltipProvider>
  );
}
