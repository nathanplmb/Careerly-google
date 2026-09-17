import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  ShieldCheck,
  Users,
  Search,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Briefcase,
  UserCheck,
  Building2,
  Mail,
  Copy,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  Key,
  Database,
  Lock,
  ArrowUpDown,
  Sparkles,
  Info,
  ShieldAlert,
  UserX,
  UserPlus,
  AlertTriangle,
  FileText,
  Contact,
  Power,
  PowerOff,
  LogOut,
  Trash2,
  Loader2,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/integrations/firebase/client";
import {
  fetchAdminUsersList,
  diagnoseUserAccount,
  toggleUserStatus,
  revokeUserSessions,
  setUserAdminRole,
  deleteUserByAdmin,
  waitForAuthUser,
  type AdminUsersResponse,
} from "@/lib/admin-client";
import type { UnifiedUserAccount } from "@/types/admin";
import { getCompteActif } from "@/lib/auth-local";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration & Gestion des Comptes — NACORA" },
      {
        name: "description",
        content:
          "Console d'administration sécurisée des utilisateurs, sessions et données NACORA.",
      },
    ],
  }),
  component: AdminPage,
});

const SUPER_ADMIN_EMAIL = "nathpa1423@gmail.com";

function AdminPage() {
  const navigate = useNavigate();

  // États d'authentification et de rôle
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [hasFirebaseAuthSession, setHasFirebaseAuthSession] = useState(false);
  const [connectingFirebase, setConnectingFirebase] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [currentUid, setCurrentUid] = useState<string | null>(null);

  // Données administrateur
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UnifiedUserAccount[]>([]);
  const [metrics, setMetrics] = useState<AdminUsersResponse["metrics"] | null>(
    null,
  );

  // Filtres et recherche dans la liste
  const [searchFilter, setSearchFilter] = useState("");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "activity" | "created" | "name" | "candidatures"
  >("activity");

  // Outil de diagnostic serveur unitaire
  const [diagnosticQuery, setDiagnosticQuery] = useState("");
  const [diagnosticResult, setDiagnosticResult] =
    useState<UnifiedUserAccount | null>(null);
  const [diagnosticSearched, setDiagnosticSearched] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);

  // Inspection détaillée
  const [selectedUser, setSelectedUser] = useState<UnifiedUserAccount | null>(
    null,
  );

  // Modal d'ajout d'administrateur
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminInput, setNewAdminInput] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);

  // Modal de suppression d'un utilisateur
  const [userToDelete, setUserToDelete] = useState<UnifiedUserAccount | null>(
    null,
  );
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const [deletingUser, setDeletingUser] = useState(false);

  // 1. Évaluation des droits admin
  useEffect(() => {
    let isMounted = true;

    async function checkPermissions() {
      setCheckingAuth(true);
      const fUser = await waitForAuthUser();
      const localUser = getCompteActif();

      const email = (fUser?.email || localUser?.email || "").toLowerCase();
      const uid = fUser?.uid || localUser?.id || "";

      if (!isMounted) return;

      setCurrentEmail(email || null);
      setCurrentUid(uid || null);
      setHasFirebaseAuthSession(Boolean(fUser));

      const isOwner = email === SUPER_ADMIN_EMAIL;
      setIsSuperAdmin(isOwner);

      if (isOwner) {
        setIsAdmin(true);
        setCheckingAuth(false);
        return;
      }

      if (fUser) {
        try {
          const tokenResult = await fUser.getIdTokenResult(true);
          const hasAdminClaim = Boolean(tokenResult.claims["admin"]);
          setIsAdmin(hasAdminClaim);
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setCheckingAuth(false);
    }

    checkPermissions();
    const unsub = auth.onAuthStateChanged((u) => {
      if (isMounted) {
        setHasFirebaseAuthSession(Boolean(u));
        checkPermissions();
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  // 2. Chargement de la liste complète des utilisateurs via l'API Admin
  const loadUsersData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminUsersList();
      setUsers(data.users);
      setMetrics(data.metrics);
      setHasFirebaseAuthSession(true);
    } catch (err: unknown) {
      console.warn("Erreur chargement liste admin:", err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Firebase Auth") || msg.includes("session")) {
        setHasFirebaseAuthSession(false);
      }
      toast.error(`Chargement des utilisateurs : ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectFirebaseAuth = async () => {
    setConnectingFirebase(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const cred = await signInWithPopup(auth, provider);
      if (cred?.user) {
        setHasFirebaseAuthSession(true);
        toast.success(`Session connectée : ${cred.user.email}`);
        await loadUsersData();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Connexion Firebase : ${msg}`);
    } finally {
      setConnectingFirebase(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsersData();
    }
  }, [isAdmin]);

  // 3. Exécuter un diagnostic unitaire côté serveur
  const handleRunDiagnostic = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!diagnosticQuery.trim()) return;

    setDiagnosing(true);
    setDiagnosticSearched(true);
    try {
      const res = await diagnoseUserAccount(diagnosticQuery.trim());
      setDiagnosticResult(res.user);
      if (res.user) {
        toast.success(`Compte trouvé : ${res.user.email || res.user.id}`);
      } else {
        toast.info(
          "Aucun compte trouvé avec cet identifiant ou cette adresse.",
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Erreur diagnostic: ${msg}`);
      setDiagnosticResult(null);
    } finally {
      setDiagnosing(false);
    }
  };

  // 4. Activer / Désactiver un compte
  const handleToggleDisabled = async (user: UnifiedUserAccount) => {
    const targetState = !user.disabled;
    const actionLabel = targetState ? "désactiver" : "réactiver";

    if (user.email === SUPER_ADMIN_EMAIL) {
      toast.error(
        "Impossible de désactiver le compte super-administrateur principal.",
      );
      return;
    }

    try {
      const res = await toggleUserStatus(user.id, targetState);
      toast.success(res.message);
      // Mettre à jour localement l'état
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                disabled: targetState,
                statutDiagnostic: targetState
                  ? "desactive"
                  : u.isAdmin
                    ? "admin"
                    : u.hasFirestoreProfile
                      ? "auth_et_firestore"
                      : "auth_sans_firestore",
                statutLabel: targetState
                  ? "Compte désactivé"
                  : u.isAdmin
                    ? "Compte administrateur"
                    : u.hasFirestoreProfile
                      ? "Compte Auth et profil Firestore présents"
                      : "Compte Auth créé — profil Firestore non initialisé",
              }
            : u,
        ),
      );
      if (selectedUser?.id === user.id) {
        setSelectedUser((prev) =>
          prev ? { ...prev, disabled: targetState } : null,
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Échec ${actionLabel}: ${msg}`);
    }
  };

  // 5. Révoquer les sessions
  const handleRevokeSessions = async (user: UnifiedUserAccount) => {
    try {
      const res = await revokeUserSessions(user.id);
      toast.success(res.message);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Échec révocation sessions: ${msg}`);
    }
  };

  // 6. Promouvoir ou révoquer le rôle administrateur
  const handleToggleAdminRole = async (user: UnifiedUserAccount) => {
    const newAdminState = !user.isAdmin;

    if (user.email === SUPER_ADMIN_EMAIL && !newAdminState) {
      toast.error(
        "Impossible de révoquer les droits du super-administrateur principal.",
      );
      return;
    }

    try {
      const res = await setUserAdminRole(user.id, newAdminState);
      toast.success(res.message);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                isAdmin: newAdminState,
                statutDiagnostic: newAdminState
                  ? "admin"
                  : u.disabled
                    ? "desactive"
                    : u.hasFirestoreProfile
                      ? "auth_et_firestore"
                      : "auth_sans_firestore",
                statutLabel: newAdminState
                  ? "Compte administrateur"
                  : u.disabled
                    ? "Compte désactivé"
                    : u.hasFirestoreProfile
                      ? "Compte Auth et profil Firestore présents"
                      : "Compte Auth créé — profil Firestore non initialisé",
              }
            : u,
        ),
      );
      if (selectedUser?.id === user.id) {
        setSelectedUser((prev) =>
          prev ? { ...prev, isAdmin: newAdminState } : null,
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Échec modification rôle: ${msg}`);
    }
  };

  // 7. Ajouter un administrateur via son UID ou Email
  const handleAddAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminInput.trim()) return;

    setAddingAdmin(true);
    try {
      // Diagnostiquer d'abord le compte
      const diag = await diagnoseUserAccount(newAdminInput.trim());
      if (!diag.user) {
        toast.error(
          "Aucun compte Firebase trouvé avec cet identifiant ou cette adresse e-mail.",
        );
        return;
      }

      await setUserAdminRole(diag.user.id, true);
      toast.success(
        `Le rôle administrateur a été accordé à ${diag.user.email || diag.user.id}.`,
      );
      setShowAddAdminModal(false);
      setNewAdminInput("");
      loadUsersData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Erreur: ${msg}`);
    } finally {
      setAddingAdmin(false);
    }
  };

  // 8. Suppression d'un utilisateur par l'admin
  const handleConfirmAdminDelete = async () => {
    if (!userToDelete) return;

    const expectedConfirm = userToDelete.email || userToDelete.id;
    if (
      deleteConfirmationText.trim().toLowerCase() !==
      expectedConfirm.toLowerCase()
    ) {
      toast.error(
        `Veuillez saisir exactement '${expectedConfirm}' pour confirmer.`,
      );
      return;
    }

    setDeletingUser(true);
    try {
      const res = await deleteUserByAdmin(userToDelete.id);
      toast.success(res.message);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      if (selectedUser?.id === userToDelete.id) {
        setSelectedUser(null);
      }
      setUserToDelete(null);
      setDeleteConfirmationText("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Échec suppression: ${msg}`);
    } finally {
      setDeletingUser(false);
    }
  };

  // Filtrage et tri de la liste
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        // Recherche textuelle
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase();
          const matchEmail = u.email.toLowerCase().includes(q);
          const matchName = (
            u.displayName || `${u.prenom || ""} ${u.nom || ""}`
          )
            .toLowerCase()
            .includes(q);
          const matchUid = u.id.toLowerCase().includes(q);
          if (!matchEmail && !matchName && !matchUid) return false;
        }

        // Filtre de fournisseur
        if (providerFilter !== "all" && u.provider !== providerFilter) {
          return false;
        }

        // Filtre de statut
        if (statusFilter === "disabled" && !u.disabled) return false;
        if (statusFilter === "admin" && !u.isAdmin) return false;
        if (statusFilter === "without_profile" && u.hasFirestoreProfile)
          return false;
        if (statusFilter === "with_profile" && !u.hasFirestoreProfile)
          return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "created") {
          return new Date(b.creeLe).getTime() - new Date(a.creeLe).getTime();
        }
        if (sortBy === "name") {
          return (a.displayName || a.email).localeCompare(
            b.displayName || b.email,
          );
        }
        if (sortBy === "candidatures") {
          return b.stats.candidaturesCount - a.stats.candidaturesCount;
        }
        // Par défaut: activité la plus récente
        return (
          new Date(b.dernierAccesLe).getTime() -
          new Date(a.dernierAccesLe).getTime()
        );
      });
  }, [users, searchFilter, providerFilter, statusFilter, sortBy]);

  // Exportation des données
  const exportUsersJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `nacora_utilisateurs_${new Date().toISOString().split("T")[0]}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Rapport JSON exporté avec succès.");
  };

  const exportUsersCsv = () => {
    if (users.length === 0) return;
    const headers = [
      "UID",
      "Email",
      "Nom",
      "Provider",
      "Statut",
      "Admin",
      "Profil Firestore",
      "Candidatures",
      "Contacts",
      "Entreprises",
      "Documents",
      "Date Creation",
      "Dernier Acces",
    ];
    const rows = users.map((u) => [
      u.id,
      u.email,
      `"${(u.displayName || `${u.prenom || ""} ${u.nom || ""}`).replace(/"/g, '""')}"`,
      u.providerLabel,
      u.statutLabel,
      u.isAdmin ? "OUI" : "NON",
      u.hasFirestoreProfile ? "OUI" : "NON",
      u.stats.candidaturesCount,
      u.stats.contactsCount,
      u.stats.entreprisesCount,
      u.stats.documentsCount,
      u.creeLe,
      u.dernierAccesLe,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `nacora_utilisateurs_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success("Rapport CSV exporté avec succès.");
  };

  // Rendu de l'écran d'attente ou d'accès refusé
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            Vérification des privilèges administrateur...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-md w-full p-8 text-center space-y-5 border-destructive/30"
        >
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <Lock className="size-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-foreground">
              Accès Réservé aux Administrateurs
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Cette console d'administration est strictement restreinte aux
              administrateurs habilités de NACORA.
            </p>
          </div>

          <div className="rounded-xl bg-muted/40 p-4 text-left text-xs space-y-2 border border-border/70">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Votre compte connecté :
              </span>
              <span className="font-mono font-medium text-foreground">
                {currentEmail || "Non connecté"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">UID Firebase :</span>
              <span className="font-mono font-medium text-foreground">
                {currentUid ? `${currentUid.slice(0, 10)}...` : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Statut d'accès :</span>
              <span className="font-semibold text-destructive">
                Non autorisé
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate({ to: "/" })}
            >
              Retour à l'accueil
            </Button>
            <Button
              className="flex-1"
              onClick={() => navigate({ to: "/auth" })}
            >
              Se connecter
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* En-tête de la Console Admin */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight">
                  Console Administrateur NACORA
                </h1>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {isSuperAdmin ? "Super Admin" : "Admin"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Gestion exhaustive des comptes Firebase Auth, profils Firestore
                et sessions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddAdminModal(true)}
              className="gap-1.5 text-xs h-8"
            >
              <UserPlus className="size-3.5" /> Ajouter un admin
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={loadUsersData}
              disabled={loading}
              className="gap-1.5 text-xs h-8"
            >
              <RefreshCw
                className={`size-3.5 ${loading ? "animate-spin" : ""}`}
              />{" "}
              Actualiser
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/" })}
              className="gap-1.5 text-xs h-8"
            >
              Retour à l'app <ChevronRight className="size-3" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Alerte si la session Firebase Auth n'est pas active */}
        {!hasFirebaseAuthSession && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500">
                <AlertCircle className="size-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  Session Firebase Auth non active
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Vous êtes identifié en tant qu'administrateur, mais la session
                  Firebase Auth doit être connectée pour signer les requêtes
                  vers l'annuaire complet.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={handleConnectFirebaseAuth}
              disabled={connectingFirebase}
              className="gap-1.5 text-xs shrink-0"
            >
              {connectingFirebase ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <LogIn className="size-3.5" />
              )}
              Activer la session Google Admin
            </Button>
          </div>
        )}

        {/* Cartes métriques */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="glass-card p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                <Users className="size-3.5 text-primary" /> Total Comptes Auth
              </span>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.totalUsers}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Source Firebase Auth
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-amber-500" /> Google
              </span>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.googleUsers}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Provider google.com
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                <Mail className="size-3.5 text-blue-500" /> E-mail + Mot de
                passe
              </span>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.passwordUsers}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Provider password
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-500" /> Profils
                Firestore
              </span>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.totalUsers - metrics.withoutProfileUsers}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {metrics.withoutProfileUsers} sans profil
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-purple-500" /> Candidatures
              </span>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.totalCandidatures}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {metrics.totalContacts} contacts
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-primary" />{" "}
                Administrateurs
              </span>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {metrics.adminUsers}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {metrics.disabledUsers} désactivés
              </p>
            </div>
          </div>
        )}

        {/* Section Diagnostic & Recherche Unitaire Côté Serveur */}
        <section className="glass-card rounded-2xl p-5 space-y-4 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Search className="size-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">
                  Diagnostic Unitaire de Compte (Server-Side)
                </h2>
                <p className="text-xs text-muted-foreground">
                  Recherchez et diagnostiquez instantanément n'importe quel
                  compte par adresse e-mail ou UID Firebase.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleRunDiagnostic} className="flex gap-2">
            <Input
              value={diagnosticQuery}
              onChange={(e) => setDiagnosticQuery(e.target.value)}
              placeholder="Saisissez une adresse e-mail (ex: nathpa1423@gmail.com) ou un UID Firebase..."
              className="flex-1 text-xs"
            />
            <Button
              type="submit"
              size="sm"
              disabled={diagnosing || !diagnosticQuery.trim()}
              className="gap-2"
            >
              {diagnosing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Search className="size-4" />
              )}
              Diagnostiquer
            </Button>
          </form>

          {/* Résultat du diagnostic unitaire */}
          {diagnosticSearched && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-3 text-xs"
              >
                {diagnosticResult ? (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground">
                            {diagnosticResult.displayName ||
                              diagnosticResult.email ||
                              "Utilisateur sans nom"}
                          </span>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            {diagnosticResult.providerLabel}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground">
                            {diagnosticResult.statutLabel}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          UID : {diagnosticResult.id} • Email :{" "}
                          {diagnosticResult.email}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedUser(diagnosticResult)}
                          className="h-7 text-xs gap-1"
                        >
                          <Eye className="size-3.5" /> Voir détails
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            diagnosticResult.disabled ? "default" : "secondary"
                          }
                          onClick={() => handleToggleDisabled(diagnosticResult)}
                          className="h-7 text-xs gap-1"
                        >
                          {diagnosticResult.disabled ? (
                            <Power className="size-3.5" />
                          ) : (
                            <PowerOff className="size-3.5" />
                          )}
                          {diagnosticResult.disabled
                            ? "Réactiver"
                            : "Désactiver"}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-border/60">
                      <div>
                        <span className="text-muted-foreground text-[10px] block">
                          Créé le :
                        </span>
                        <span className="font-medium">
                          {new Date(diagnosticResult.creeLe).toLocaleDateString(
                            "fr-FR",
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-[10px] block">
                          Dernier accès :
                        </span>
                        <span className="font-medium">
                          {new Date(
                            diagnosticResult.dernierAccesLe,
                          ).toLocaleString("fr-FR")}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-[10px] block">
                          Candidatures & Données :
                        </span>
                        <span className="font-medium">
                          {diagnosticResult.stats.candidaturesCount} cands •{" "}
                          {diagnosticResult.stats.contactsCount} contacts
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-[10px] block">
                          Rôle :
                        </span>
                        <span className="font-semibold text-primary">
                          {diagnosticResult.isAdmin
                            ? "Administrateur"
                            : "Utilisateur Standard"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <AlertCircle className="size-4 text-amber-500" />
                    <span>
                      Aucun compte trouvé correspondant à la requête "
                      {diagnosticQuery}".
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </section>

        {/* Section Liste & Filtres de tous les utilisateurs */}
        <section className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Users className="size-4 text-primary" /> Annuaire des
                Utilisateurs ({filteredUsers.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Tous les comptes inscrits dans Firebase Authentication avec
                enrichissement dynamique Firestore.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={exportUsersCsv}
                className="h-8 text-xs gap-1.5"
              >
                <Download className="size-3.5" /> CSV
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={exportUsersJson}
                className="h-8 text-xs gap-1.5"
              >
                <Download className="size-3.5" /> JSON
              </Button>
            </div>
          </div>

          {/* Barre de filtrage */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
            <div className="relative sm:col-span-1">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filtrer par nom, email ou UID..."
                className="pl-8 text-xs h-8"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground shrink-0">
                Fournisseur :
              </span>
              <select
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs h-8"
              >
                <option value="all">Tous les fournisseurs</option>
                <option value="google">Google (google.com)</option>
                <option value="password">
                  E-mail + mot de passe (password)
                </option>
                <option value="apple">Apple</option>
                <option value="microsoft">Microsoft</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground shrink-0">
                Statut :
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs h-8"
              >
                <option value="all">Tous les statuts</option>
                <option value="with_profile">Avec profil Firestore</option>
                <option value="without_profile">Sans profil Firestore</option>
                <option value="admin">Administrateurs</option>
                <option value="disabled">Comptes désactivés</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground shrink-0">
                Tri :
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs h-8"
              >
                <option value="activity">Dernière activité</option>
                <option value="created">Date de création</option>
                <option value="name">Nom / Email</option>
                <option value="candidatures">Nombre de candidatures</option>
              </select>
            </div>
          </div>

          {/* Tableau des utilisateurs */}
          <div className="overflow-x-auto rounded-xl border border-border/70">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-muted-foreground font-medium">
                  <th className="py-3 px-4">Utilisateur / UID</th>
                  <th className="py-3 px-3">Fournisseur Auth</th>
                  <th className="py-3 px-3">Statut & Profil</th>
                  <th className="py-3 px-3">Candidatures & Données</th>
                  <th className="py-3 px-3">Dates</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="size-6 animate-spin text-primary" />
                        <span>Chargement des comptes Firebase Auth...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      Aucun utilisateur ne correspond aux critères de recherche.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      {/* Utilisateur / UID */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          {u.photoUrl ? (
                            <img
                              src={u.photoUrl}
                              alt=""
                              className="size-7 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[11px] shrink-0">
                              {(u.displayName ||
                                u.email ||
                                "U")[0]?.toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-foreground truncate max-w-[180px]">
                                {u.displayName ||
                                  `${u.prenom || ""} ${u.nom || ""}`.trim() ||
                                  u.email.split("@")[0]}
                              </span>
                              {u.isAdmin && (
                                <span className="rounded bg-primary/15 px-1.5 py-0.2 text-[9px] font-bold text-primary">
                                  {u.isSuperAdmin ? "SUPER ADMIN" : "ADMIN"}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                              {u.email}
                            </p>
                            <p className="font-mono text-[9px] text-muted-foreground/70">
                              {u.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Fournisseur */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                            u.provider === "google"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : u.provider === "password"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {u.providerLabel}
                        </span>
                      </td>

                      {/* Statut & Diagnostic */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              u.disabled
                                ? "bg-destructive/15 text-destructive font-semibold"
                                : u.hasFirestoreProfile
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {u.statutLabel}
                          </span>
                          {u.hasFirestoreProfile && (
                            <p className="text-[10px] text-muted-foreground">
                              Profil rempli à {u.stats.tauxCompletionProfil}%
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Données applicatives */}
                      <td className="py-3 px-3">
                        <div className="text-[11px] space-y-0.5 text-muted-foreground">
                          <p>
                            <strong className="text-foreground">
                              {u.stats.candidaturesCount}
                            </strong>{" "}
                            candidatures
                          </p>
                          <p>
                            <strong className="text-foreground">
                              {u.stats.contactsCount}
                            </strong>{" "}
                            contacts •{" "}
                            <strong className="text-foreground">
                              {u.stats.entreprisesCount}
                            </strong>{" "}
                            entreprises
                          </p>
                        </div>
                      </td>

                      {/* Dates */}
                      <td className="py-3 px-3 text-[11px] text-muted-foreground whitespace-nowrap">
                        <p>
                          Inscrit :{" "}
                          {new Date(u.creeLe).toLocaleDateString("fr-FR")}
                        </p>
                        <p>
                          Vu :{" "}
                          {new Date(u.dernierAccesLe).toLocaleDateString(
                            "fr-FR",
                          )}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 text-muted-foreground hover:text-foreground"
                            title="Inspecter les détails"
                            onClick={() => setSelectedUser(u)}
                          >
                            <Eye className="size-3.5" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className={`size-7 ${u.disabled ? "text-emerald-500 hover:text-emerald-600" : "text-amber-500 hover:text-amber-600"}`}
                            title={
                              u.disabled
                                ? "Réactiver le compte"
                                : "Désactiver le compte"
                            }
                            onClick={() => handleToggleDisabled(u)}
                          >
                            {u.disabled ? (
                              <Power className="size-3.5" />
                            ) : (
                              <PowerOff className="size-3.5" />
                            )}
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 text-destructive hover:bg-destructive/10"
                            title="Supprimer définitivement ce compte"
                            onClick={() => {
                              setUserToDelete(u);
                              setDeleteConfirmationText("");
                            }}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal d'inspection détaillée de l'utilisateur */}
      <Dialog
        open={Boolean(selectedUser)}
        onOpenChange={(open) => !open && setSelectedUser(null)}
      >
        {selectedUser && (
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                {selectedUser.photoUrl ? (
                  <img
                    src={selectedUser.photoUrl}
                    alt=""
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                    {(selectedUser.displayName ||
                      selectedUser.email ||
                      "U")[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <DialogTitle className="text-base font-bold">
                    {selectedUser.displayName ||
                      `${selectedUser.prenom || ""} ${selectedUser.nom || ""}`.trim() ||
                      selectedUser.email}
                  </DialogTitle>
                  <DialogDescription className="text-xs font-mono">
                    UID : {selectedUser.id}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-3 border border-border/70">
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Email :
                  </span>
                  <span className="font-semibold text-foreground">
                    {selectedUser.email}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Fournisseur de connexion :
                  </span>
                  <span className="font-semibold text-primary">
                    {selectedUser.providerLabel}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Date de création :
                  </span>
                  <span>
                    {new Date(selectedUser.creeLe).toLocaleString("fr-FR")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Dernière connexion :
                  </span>
                  <span>
                    {new Date(selectedUser.dernierAccesLe).toLocaleString(
                      "fr-FR",
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Email vérifié :
                  </span>
                  <span>{selectedUser.emailVerified ? "Oui" : "Non"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Profil Firestore :
                  </span>
                  <span>
                    {selectedUser.hasFirestoreProfile
                      ? "Initialisé"
                      : "Non initialisé"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">
                  Actions Administrateur
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedUser.disabled ? "default" : "outline"}
                    onClick={() => handleToggleDisabled(selectedUser)}
                    className="gap-1.5 text-xs"
                  >
                    {selectedUser.disabled ? (
                      <Power className="size-3.5" />
                    ) : (
                      <PowerOff className="size-3.5" />
                    )}
                    {selectedUser.disabled
                      ? "Réactiver le compte"
                      : "Désactiver le compte"}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRevokeSessions(selectedUser)}
                    className="gap-1.5 text-xs"
                  >
                    <LogOut className="size-3.5" /> Révoquer les sessions
                  </Button>

                  <Button
                    size="sm"
                    variant={selectedUser.isAdmin ? "secondary" : "outline"}
                    onClick={() => handleToggleAdminRole(selectedUser)}
                    className="gap-1.5 text-xs"
                  >
                    <ShieldCheck className="size-3.5" />
                    {selectedUser.isAdmin
                      ? "Retirer droits admin"
                      : "Promouvoir admin"}
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUser(null)}
              >
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Modal d'ajout d'administrateur */}
      <Dialog open={showAddAdminModal} onOpenChange={setShowAddAdminModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
              <UserPlus className="size-5" />
            </div>
            <DialogTitle className="text-center text-base font-bold">
              Ajouter un Administrateur
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground">
              Octroyez les privilèges d'administration à un compte inscrit dans
              Firebase Authentication.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleAddAdminSubmit}
            className="space-y-3 py-2 text-xs"
          >
            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Adresse e-mail ou UID Firebase de l'utilisateur :
              </label>
              <Input
                value={newAdminInput}
                onChange={(e) => setNewAdminInput(e.target.value)}
                placeholder="ex: admin@nacora.fr ou 5a7bc89d..."
                className="text-xs"
                autoFocus
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Le rôle sera écrit dans la collection sécurisée{" "}
              <code className="font-mono text-primary">/admins/{`{uid}`}</code>{" "}
              et les Custom Claims Firebase.
            </p>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddAdminModal(false)}
                disabled={addingAdmin}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!newAdminInput.trim() || addingAdmin}
                className="gap-2"
              >
                {addingAdmin ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <ShieldCheck className="size-3.5" />
                )}
                Promouvoir administrateur
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de suppression définitive par l'administrateur */}
      <Dialog
        open={Boolean(userToDelete)}
        onOpenChange={(open) => !open && setUserToDelete(null)}
      >
        {userToDelete && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/15 text-destructive mb-2">
                <AlertTriangle className="size-6" />
              </div>
              <DialogTitle className="text-center text-base font-bold text-destructive">
                Suppression Administrative Définitive
              </DialogTitle>
              <DialogDescription className="text-center text-xs text-muted-foreground">
                Cette suppression efface définitivement le compte Firebase Auth
                et toutes les données Firestore associées.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="rounded-lg bg-muted/40 p-3 space-y-1 border border-border/70">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compte ciblé :</span>
                  <span className="font-semibold text-foreground">
                    {userToDelete.email || userToDelete.displayName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">UID :</span>
                  <span className="font-mono text-[10px] text-foreground">
                    {userToDelete.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fournisseur :</span>
                  <span>{userToDelete.providerLabel}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">
                  Pour confirmer, saisissez exactement l'adresse e-mail ou l'UID
                  du compte :
                </label>
                <Input
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  placeholder={userToDelete.email || userToDelete.id}
                  className="font-mono text-xs"
                  autoFocus
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUserToDelete(null)}
                disabled={deletingUser}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={
                  deleteConfirmationText.trim().toLowerCase() !==
                    (userToDelete.email || userToDelete.id).toLowerCase() ||
                  deletingUser
                }
                onClick={handleConfirmAdminDelete}
                className="gap-2"
              >
                {deletingUser ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" /> Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-3.5" /> Supprimer définitivement
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
