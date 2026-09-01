import { n as e, t } from "./redirect-DtIAAt0y.js";
import {
  cn as n,
  gt as r,
  lt as i,
  nn as a,
  rn as o,
  sn as s,
  tn as c,
} from "./index-C957XaZb.js";
function l(e) {
  if (Array.isArray(e)) return e.flatMap((e) => l(e));
  if (typeof e != `string`) return [];
  let t = [],
    n = 0,
    r,
    i,
    a,
    o,
    s,
    c = () => {
      for (; n < e.length && /\s/.test(e.charAt(n));) n += 1;
      return n < e.length;
    },
    u = () => ((i = e.charAt(n)), i !== `=` && i !== `;` && i !== `,`);
  for (; n < e.length;) {
    for (r = n, s = !1; c();)
      if (((i = e.charAt(n)), i === `,`)) {
        for (a = n, n += 1, c(), o = n; n < e.length && u();) n += 1;
        n < e.length && e.charAt(n) === `=`
          ? ((s = !0), (n = o), t.push(e.slice(r, a)), (r = n))
          : (n = a + 1);
      } else n += 1;
    (!s || n >= e.length) && t.push(e.slice(r));
  }
  return t;
}
function u(e) {
  return e instanceof Headers
    ? e
    : Array.isArray(e) || typeof e == `object`
      ? new Headers(e)
      : null;
}
function d(...e) {
  return e.reduce((e, t) => {
    let n = u(t);
    if (!n) return e;
    for (let [t, r] of n.entries())
      t === `set-cookie`
        ? l(r).forEach((t) => e.append(`set-cookie`, t))
        : e.set(t, r);
    return e;
  }, new Headers());
}
function f(e) {
  return e !== `__proto__` && e !== `constructor` && e !== `prototype`;
}
function p(e, t) {
  let n = Object.create(null);
  if (e) for (let t of Object.keys(e)) f(t) && (n[t] = e[t]);
  if (t && typeof t == `object`)
    for (let e of Object.keys(t)) f(e) && (n[e] = t[e]);
  return n;
}
function m(e) {
  if (!e) return Object.create(null);
  let t = Object.create(null);
  for (let n of Object.keys(e)) f(n) && (t[n] = e[n]);
  return t;
}
var h = () => {
    throw Error(
      `createServerOnlyFn() functions can only be called on the server!`,
    );
  },
  g = (t, r) => {
    let i = r || t || {};
    i.method === void 0 && (i.method = `GET`);
    let a = (e) => g(void 0, { ...i, validator: e, inputValidator: e });
    return Object.assign((e) => g(void 0, { ...i, ...e }), {
      options: i,
      middleware: (e) => {
        let t = [...(i.middleware || [])];
        e.map((e) => {
          n in e
            ? e.options.middleware && t.push(...e.options.middleware)
            : t.push(e);
        });
        let r = g(void 0, { ...i, middleware: t });
        return ((r[n] = !0), r);
      },
      validator: a,
      inputValidator: a,
      handler: (...t) => {
        let [n, r] = t,
          a = { ...i, extractedFn: n, serverFn: r },
          o = [...(a.middleware || []), b(a)];
        return (
          (n.method = i.method),
          Object.assign(
            async (t) => {
              let r = await _(o, `client`, {
                  ...n,
                  ...a,
                  data: t?.data,
                  headers: t?.headers,
                  signal: t?.signal,
                  fetch: t?.fetch,
                  context: m(),
                }),
                i = e(r.error);
              if (i) throw i;
              if (r.error) throw r.error;
              return r.result;
            },
            {
              ...n,
              method: i.method,
              __executeServer: async (e) => {
                let t = h(),
                  r = t.contextAfterGlobalMiddlewares;
                return await _(o, `server`, {
                  ...n,
                  ...e,
                  serverFnMeta: n.serverFnMeta,
                  context: p(e.context, r),
                  request: t.request,
                }).then((e) => ({
                  result: e.result,
                  error: e.error,
                  context: e.sendContext,
                }));
              },
            },
          )
        );
      },
    });
  };
async function _(e, n, r) {
  let i = v([...(s()?.functionMiddleware || []), ...e]);
  if (n === `server`) {
    let e = h({ throwIfNotFound: !1 });
    e?.executedRequestMiddlewares &&
      (i = i.filter((t) => !e.executedRequestMiddlewares.has(t)));
  }
  let a = async (e) => {
    let r = i.shift();
    if (!r) return e;
    try {
      let i = `validator` in r.options ? r.options.validator : void 0;
      (!i && `inputValidator` in r.options && (i = r.options.inputValidator),
        i && n === `server` && (e.data = await y(i, e.data)));
      let o;
      if (
        (n === `client`
          ? `client` in r.options && (o = r.options.client)
          : `server` in r.options && (o = r.options.server),
        o)
      ) {
        let n = async (t = {}) => {
            let n = await a({
              ...e,
              ...t,
              context: p(e.context, t.context),
              sendContext: p(e.sendContext, t.sendContext),
              headers: d(e.headers, t.headers),
              _callSiteFetch: e._callSiteFetch,
              fetch: e._callSiteFetch ?? t.fetch ?? e.fetch,
              result:
                t.result === void 0
                  ? t instanceof Response
                    ? t
                    : e.result
                  : t.result,
              error: t.error ?? e.error,
            });
            if (n.error) throw n.error;
            return n;
          },
          r = await o({ ...e, next: n });
        if (t(r)) return { ...e, error: r };
        if (r instanceof Response) return { ...e, result: r };
        if (!r)
          throw Error(
            `User middleware returned undefined. You must call next() or return a result in your middlewares.`,
          );
        return r;
      }
      return a(e);
    } catch (t) {
      return { ...e, error: t };
    }
  };
  return a({
    ...r,
    headers: r.headers || {},
    sendContext: r.sendContext || {},
    context: r.context || m(),
    _callSiteFetch: r.fetch,
  });
}
function v(e, t = 100) {
  let n = new Set(),
    r = [],
    i = (e, a) => {
      if (a > t)
        throw Error(
          `Middleware nesting depth exceeded maximum of ${t}. Check for circular references.`,
        );
      e.forEach((e) => {
        (e.options.middleware && i(e.options.middleware, a + 1),
          n.has(e) || (n.add(e), r.push(e)));
      });
    };
  return (i(e, 0), r);
}
async function y(e, t) {
  if (e == null) return {};
  if (`~standard` in e) {
    let n = await e[`~standard`].validate(t);
    if (n.issues) throw Error(JSON.stringify(n.issues, void 0, 2));
    return n.value;
  }
  if (`parse` in e) return e.parse(t);
  if (typeof e == `function`) return e(t);
  throw Error(`Invalid validator type!`);
}
function b(e) {
  return {
    "~types": void 0,
    options: {
      inputValidator: e.validator ?? e.inputValidator,
      client: async ({ next: t, sendContext: n, fetch: r, ...i }) => {
        let a = { ...i, context: n, fetch: r };
        return t(await e.extractedFn?.(a));
      },
      server: async ({ next: t, ...n }) => {
        let r = await e.serverFn?.(n);
        return t({ ...n, result: r });
      },
    },
  };
}
var x = o({ type: `function` });
function S(e) {
  let t = i(),
    n = r(e.cv_structure);
  return {
    ...t,
    prenom: e.prenom ?? ``,
    nom: e.nom ?? ``,
    titre: n.titre || ``,
    formation: e.formation ?? t.formation,
    ecole: e.ecole ?? t.ecole,
    niveau: e.niveau ?? t.niveau,
    localisation: e.localisation ?? ``,
    pays: n.pays || `France`,
    mobilite: e.mobilite ?? ``,
    contrats: e.contrats ?? t.contrats,
    domaines: e.domaines ?? ``,
    metiers: e.metiers ?? ``,
    entreprisesCiblees: e.entreprises_ciblees ?? ``,
    competences: e.competences ?? ``,
    logiciels: e.logiciels ?? ``,
    langues: e.langues ?? ``,
    niveauAnglais: e.niveau_anglais ?? ``,
    experiences: e.experiences ?? ``,
    teletravail: e.teletravail ?? ``,
    modeTravail:
      n.preferences?.teletravailPrefere ||
      (e.teletravail?.includes(`100%`) ? `teletravail` : `hybride`),
    remuneration: e.remuneration ?? ``,
    dateDebut: e.date_debut ?? ``,
    duree: e.duree ?? ``,
    rechercheVraie: n?.rechercheVraie || ``,
    environnements: n?.environnements || [`Grand groupe`, `Scale-up`],
    prioritesRecherche: n?.prioritesRecherche || [
      `Missions apprenantes`,
      `Mentorat / Équipe`,
    ],
    emailContact: n.email || ``,
    telephone: n.telephone || ``,
    linkedin: n.linkedin || ``,
    portfolio: n.portfolio || ``,
    github: n.github || ``,
    permis: n.permis || ``,
    photoUrl: n.photoUrl || ``,
    criteres: e.criteres ?? t.criteres,
    cv: e.cv ?? null,
    cvStructure: n,
    preferences: n.preferences,
    syntheseIa: n.syntheseIa,
  };
}
function C(e, t) {
  let n = r({
    ...e.cvStructure,
    titre: e.titre || e.cvStructure.titre,
    email: e.emailContact || e.cvStructure.email,
    telephone: e.telephone || e.cvStructure.telephone,
    linkedin: e.linkedin || e.cvStructure.linkedin,
    portfolio: e.portfolio || e.cvStructure.portfolio,
    github: e.github || e.cvStructure.github,
    permis: e.permis || e.cvStructure.permis,
    photoUrl: e.photoUrl || e.cvStructure.photoUrl,
    ville: e.localisation || e.cvStructure.ville,
    pays: e.pays || e.cvStructure.pays,
    preferences: {
      ...e.cvStructure.preferences,
      ...e.preferences,
      teletravailPrefere:
        e.modeTravail ||
        e.cvStructure.preferences?.teletravailPrefere ||
        `hybride`,
    },
    syntheseIa: e.syntheseIa || e.cvStructure.syntheseIa,
    ...(e.rechercheVraie ? { rechercheVraie: e.rechercheVraie } : {}),
    ...(e.environnements ? { environnements: e.environnements } : {}),
    ...(e.prioritesRecherche
      ? { prioritesRecherche: e.prioritesRecherche }
      : {}),
  });
  return {
    user_id: t,
    prenom: e.prenom,
    nom: e.nom,
    formation: e.formation,
    ecole: e.ecole,
    niveau: e.niveau,
    localisation: e.localisation,
    mobilite: e.mobilite,
    contrats: e.contrats,
    domaines: e.domaines,
    metiers: e.metiers,
    entreprises_ciblees: e.entreprisesCiblees,
    competences: e.competences,
    logiciels: e.logiciels,
    langues: e.langues,
    niveau_anglais: e.niveauAnglais,
    experiences: e.experiences,
    teletravail: e.teletravail,
    remuneration: e.remuneration,
    date_debut: e.dateDebut || null,
    duree: e.duree,
    criteres: e.criteres,
    cv: e.cv ?? null,
    cv_structure: n,
  };
}
async function w() {
  if (!c()) return null;
  let { data: e, error: t } = await a.from(`profils`).select(`*`).maybeSingle();
  if (t) throw t;
  return e ? S(e) : null;
}
async function T(e, t) {
  if (!c()) return e;
  let { data: n, error: r } = await a
    .from(`profils`)
    .upsert(C(e, t), { onConflict: `user_id` })
    .select()
    .single();
  if (r) throw r;
  return S(n);
}
export { g as i, T as n, x as r, w as t };
