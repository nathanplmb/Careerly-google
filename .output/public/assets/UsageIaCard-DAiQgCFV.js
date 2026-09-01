import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { a as r } from "./Logo-BzB7YJf1.js";
import { i, r as a } from "./profil-cloud-FShiz7FP.js";
import {
  $t as o,
  At as s,
  Gt as c,
  Ht as l,
  Jt as u,
  Kt as d,
  Qt as f,
  Ut as p,
  Vt as m,
  Wt as h,
  Xt as g,
  Yt as _,
  Zt as v,
  en as y,
  on as b,
  qt as x,
} from "./index-C957XaZb.js";
var S = class extends h {
  #e;
  #t = void 0;
  #n = void 0;
  #r = void 0;
  #i;
  #a;
  #o;
  #s;
  #c;
  #l;
  #u;
  #d;
  #f;
  #p = new Set();
  constructor(e, t) {
    (super(),
      (this.options = t),
      (this.#e = e),
      (this.#o = null),
      this.bindMethods(),
      this.setOptions(t));
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#t.addObserver(this),
      w(this.#t, this.options) ? this.#m() : this.updateResult(),
      this.#y());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return T(this.#t, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return T(this.#t, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()),
      this.#b(),
      this.#x(),
      this.#t.removeObserver(this));
  }
  setOptions(e) {
    let t = this.options,
      n = this.#t;
    if (
      ((this.options = this.#e.defaultQueryOptions(e)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != `boolean` &&
        typeof this.options.enabled != `function` &&
        typeof _(this.options.enabled, this.#t) != `boolean`)
    )
      throw Error(
        `Expected enabled to be a boolean or a callback that returns a boolean`,
      );
    (this.#S(),
      this.#t.setOptions(this.options),
      t._defaulted &&
        !g(this.options, t) &&
        this.#e
          .getQueryCache()
          .notify({
            type: `observerOptionsUpdated`,
            query: this.#t,
            observer: this,
          }));
    let r = this.hasListeners();
    (r && E(this.#t, n, this.options, t) && this.#m(),
      this.updateResult(),
      r &&
        (this.#t !== n ||
          _(this.options.enabled, this.#t) !== _(t.enabled, this.#t) ||
          _(this.options.staleTime, this.#t) !== _(t.staleTime, this.#t)) &&
        this.#g());
    let i = this.#_();
    r &&
      (this.#t !== n ||
        _(this.options.enabled, this.#t) !== _(t.enabled, this.#t) ||
        i !== this.#f) &&
      this.#v(i);
  }
  getOptimisticResult(e) {
    let t = this.#e.getQueryCache().build(this.#e, e),
      n = this.createResult(t, e);
    return (
      g(this.getCurrentResult(), n) ||
        ((this.#r = n), (this.#a = this.options), (this.#i = this.#t.state)),
      n
    );
  }
  getCurrentResult() {
    return this.#r;
  }
  trackResult(e, t) {
    return new Proxy(e, {
      get: (e, n) => (this.trackProp(n), t?.(n), Reflect.get(e, n)),
    });
  }
  trackProp(e) {
    this.#p.add(e);
  }
  getCurrentQuery() {
    return this.#t;
  }
  refetch({ ...e } = {}) {
    return this.fetch({ ...e });
  }
  fetchOptimistic(e) {
    let t = this.#e.defaultQueryOptions(e),
      n = this.#e.getQueryCache().build(this.#e, t),
      r = () => {},
      i,
      a = new Promise((e) => {
        ((i = e),
          (r = this.#e.getQueryCache().subscribe((i) => {
            i.type === `updated` &&
              i.query.queryHash === n.queryHash &&
              n.state.data !== void 0 &&
              (r(), e(this.createResult(n, t)));
          })));
      });
    return Promise.race([
      n
        .fetch()
        .then(() => {
          let e = this.createResult(n, t);
          return (i?.(e), e);
        })
        .finally(() => {
          r();
        }),
      a,
    ]);
  }
  fetch(e) {
    return this.#m({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#r),
    );
  }
  #m(e) {
    this.#S();
    let t = this.#t.fetch(this.options, e);
    return (e?.throwOnError || (t = t.catch(x)), t);
  }
  #h(e) {
    return !c() && _(this.options.enabled, this.#t) !== !1 && d(e);
  }
  #g() {
    this.#b();
    let e = _(this.options.staleTime, this.#t);
    if (this.#r.isStale || !this.#h(e)) return;
    let t = f(this.#r.dataUpdatedAt, e) + 1;
    this.#u = o.setTimeout(() => {
      this.#r.isStale || this.updateResult();
    }, t);
  }
  #_() {
    return (
      (typeof this.options.refetchInterval == `function`
        ? this.options.refetchInterval(this.#t)
        : this.options.refetchInterval) ?? !1
    );
  }
  #v(e) {
    (this.#x(),
      (this.#f = e),
      !(this.#f === 0 || !this.#h(this.#f)) &&
        (this.#d = o.setInterval(() => {
          (this.options.refetchIntervalInBackground || p.isFocused()) &&
            this.#m();
        }, this.#f)));
  }
  #y() {
    (this.#g(), this.#v(this.#_()));
  }
  #b() {
    this.#u !== void 0 && (o.clearTimeout(this.#u), (this.#u = void 0));
  }
  #x() {
    this.#d !== void 0 && (o.clearInterval(this.#d), (this.#d = void 0));
  }
  createResult(e, t) {
    let n = this.#t,
      r = this.options,
      i = this.#r,
      a = this.#i,
      o = this.#a,
      s = e === n ? this.#n : e.state,
      { state: c } = e,
      l = { ...c },
      d = !1,
      f;
    if (t._optimisticResults) {
      let i = this.hasListeners(),
        a = !i && w(e, t),
        o = i && E(e, n, t, r);
      ((a || o) && (l = { ...l, ...m(c.data, e.options) }),
        t._optimisticResults === `isRestoring` && (l.fetchStatus = `idle`));
    }
    let { error: p, errorUpdatedAt: h, status: g } = l;
    f = l.data;
    let v = !1;
    if (t.placeholderData !== void 0 && f === void 0 && g === `pending`) {
      let e;
      (i?.isPlaceholderData && t.placeholderData === o?.placeholderData
        ? ((e = i.data), (v = !0))
        : (e =
            typeof t.placeholderData == `function`
              ? t.placeholderData(this.#l?.state.data, this.#l)
              : t.placeholderData),
        e !== void 0 && ((g = `success`), (f = u(i?.data, e, t)), (d = !0)));
    }
    if (t.select && f !== void 0 && !v) {
      if (i && f === a?.data && t.select === this.#s) f = this.#c;
      else
        try {
          ((this.#s = t.select),
            (f = t.select(f)),
            (f = u(i?.data, f, t)),
            (this.#c = f),
            (this.#o = null));
        } catch (e) {
          this.#o = e;
        }
    } else f === void 0 && (this.#o = null);
    this.#o &&
      ((p = this.#o), (f = this.#c), (h = Date.now()), (g = `error`), (d = !1));
    let y = l.fetchStatus === `fetching`,
      b = g === `pending`,
      x = g === `error`,
      S = b && y,
      C = f !== void 0;
    return {
      status: g,
      fetchStatus: l.fetchStatus,
      isPending: b,
      isSuccess: g === `success`,
      isError: x,
      isInitialLoading: S,
      isLoading: S,
      data: f,
      dataUpdatedAt: l.dataUpdatedAt,
      error: p,
      errorUpdatedAt: h,
      failureCount: l.fetchFailureCount,
      failureReason: l.fetchFailureReason,
      errorUpdateCount: l.errorUpdateCount,
      isFetched: e.isFetched(),
      isFetchedAfterMount:
        l.dataUpdateCount > s.dataUpdateCount ||
        l.errorUpdateCount > s.errorUpdateCount,
      isFetching: y,
      isRefetching: y && !b,
      isLoadingError: x && !C,
      isPaused: l.fetchStatus === `paused`,
      isPlaceholderData: d,
      isRefetchError: x && C,
      isStale: D(e, t),
      refetch: this.refetch,
      isEnabled: _(t.enabled, e) !== !1,
    };
  }
  updateResult() {
    let e = this.#r,
      t = this.createResult(this.#t, this.options);
    if (
      ((this.#i = this.#t.state),
      (this.#a = this.options),
      this.#i.data !== void 0 && (this.#l = this.#t),
      g(t, e))
    )
      return;
    this.#r = t;
    let n = (() => {
      if (!e) return !0;
      let { notifyOnChangeProps: t } = this.options,
        n = typeof t == `function` ? t() : t;
      if (n === `all` || (!n && !this.#p.size)) return !0;
      let r = new Set(n ?? this.#p);
      return (
        this.options.throwOnError && r.add(`error`),
        Object.keys(this.#r).some((t) => {
          let n = t;
          return this.#r[n] !== e[n] && r.has(n);
        })
      );
    })();
    l.batch(() => {
      (n &&
        this.listeners.forEach((e) => {
          e(this.#r);
        }),
        this.#e
          .getQueryCache()
          .notify({ query: this.#t, type: `observerResultsUpdated` }));
    });
  }
  #S() {
    let e = this.#e.getQueryCache().build(this.#e, this.options);
    if (e === this.#t) return;
    let t = this.#t;
    ((this.#t = e),
      (this.#n = e.state),
      this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#y());
  }
};
function C(e, t) {
  return (
    _(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    (e.state.status !== `error` || _(t.retryOnMount, e) !== !1)
  );
}
function w(e, t) {
  return C(e, t) || (e.state.data !== void 0 && T(e, t, t.refetchOnMount));
}
function T(e, t, n) {
  if (_(t.enabled, e) !== !1 && _(t.staleTime, e) !== `static`) {
    let r = typeof n == `function` ? n(e) : n;
    return r === `always` || (r !== !1 && D(e, t));
  }
  return !1;
}
function E(e, t, n, r) {
  return (
    (e !== t || _(r.enabled, e) === !1) &&
    (!n.suspense || e.state.status !== `error`) &&
    D(e, n)
  );
}
function D(e, t) {
  return _(t.enabled, e) !== !1 && e.isStaleByTime(_(t.staleTime, e));
}
var O = e(n(), 1),
  k = O.createContext(!1),
  A = () => O.useContext(k);
k.Provider;
var j = t();
function M() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var N = O.createContext(M()),
  P = () => O.useContext(N),
  F = (e, t, n) => {
    let r =
      n?.state.error && typeof e.throwOnError == `function`
        ? v(e.throwOnError, [n.state.error, n])
        : e.throwOnError;
    (e.suspense || r) && (t.isReset() || (e.retryOnMount = !1));
  },
  I = (e) => {
    O.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  L = ({
    result: e,
    errorResetBoundary: t,
    throwOnError: n,
    query: r,
    suspense: i,
  }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    r &&
    ((i && e.data === void 0) || v(n, [e.error, r])),
  R = (e) => {
    if (e.suspense) {
      let t = 1e3,
        n = (e) => (e === `static` ? e : Math.max(e ?? t, t)),
        r = e.staleTime;
      ((e.staleTime = typeof r == `function` ? (...e) => n(r(...e)) : n(r)),
        typeof e.gcTime == `number` && (e.gcTime = Math.max(e.gcTime, t)));
    }
  },
  z = (e, t) => e?.suspense && t.isPending,
  B = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function V(e, t, n) {
  let r = A(),
    i = P(),
    a = y(n),
    o = a.defaultQueryOptions(e),
    s = a.getQueryCache().get(o.queryHash),
    c = e.subscribed !== !1;
  ((o._optimisticResults = r ? `isRestoring` : c ? `optimistic` : void 0),
    R(o),
    F(o, i, s),
    I(i));
  let [u] = O.useState(() => new t(a, o)),
    d = u.getOptimisticResult(o),
    f = !r && c;
  if (
    (O.useSyncExternalStore(
      O.useCallback(
        (e) => {
          let t = f ? u.subscribe(l.batchCalls(e)) : x;
          return (u.updateResult(), t);
        },
        [u, f],
      ),
      () => u.getCurrentResult(),
      () => u.getCurrentResult(),
    ),
    O.useEffect(() => {
      u.setOptions(o);
    }, [o, u]),
    z(o, d))
  )
    throw B(o, u, i);
  if (
    L({
      result: d,
      errorResetBoundary: i,
      throwOnError: o.throwOnError,
      query: s,
      suspense: o.suspense,
    })
  )
    throw d.error;
  return o.notifyOnChangeProps ? d : u.trackResult(d);
}
function H(e, t) {
  return V(e, S, t);
}
var U = r(`gauge`, [
    [`path`, { d: `m12 14 4-4`, key: `9kzdfg` }],
    [`path`, { d: `M3.34 19a10 10 0 1 1 17.32 0`, key: `19p75a` }],
  ]),
  W = i({ method: `GET` })
    .middleware([a])
    .handler(
      b(`378b207fa4fdee797d916e49b30889c2a21ee687fbe35cec99abc178bc8b5528`),
    ),
  G = {
    brief: `Daily Brief`,
    match: `Match IA`,
    offre: `Analyse d'offre`,
    cv: `Analyse de CV`,
    tri: `Assistant IA`,
    redaction: `Rédaction IA`,
    relance: `Relance IA`,
  };
function K({ ligne: e }) {
  let t = e.limite > 0 ? Math.min(100, (e.utilise / e.limite) * 100) : 0,
    n = Math.max(0, e.limite - e.utilise);
  return (0, j.jsxs)(`div`, {
    children: [
      (0, j.jsxs)(`div`, {
        className: `flex items-center justify-between text-xs`,
        children: [
          (0, j.jsx)(`span`, { children: G[e.outil] ?? e.outil }),
          (0, j.jsxs)(`span`, {
            className: n === 0 ? `text-destructive` : `text-muted-foreground`,
            children: [n, ` restant`, n > 1 ? `s` : ``, ` / `, e.limite],
          }),
        ],
      }),
      (0, j.jsx)(`div`, {
        className: `mt-1 h-1.5 overflow-hidden rounded-full bg-muted`,
        children: (0, j.jsx)(`div`, {
          className: `h-full rounded-full ${t >= 100 ? `bg-destructive` : `bg-primary`}`,
          style: { width: `${t}%` },
        }),
      }),
    ],
  });
}
function q({ connecte: e }) {
  let {
    data: t,
    isLoading: n,
    error: r,
  } = H({
    queryKey: [`usage-ia`],
    queryFn: () => W(),
    enabled: e,
    staleTime: 6e4,
  });
  return (0, j.jsxs)(`section`, {
    className: `glass-card pop-in p-5`,
    children: [
      (0, j.jsxs)(`h2`, {
        className: `flex items-center gap-2 text-sm font-semibold`,
        children: [
          (0, j.jsx)(U, { className: `size-4` }),
          ` Utilisation IA du jour`,
        ],
      }),
      (0, j.jsx)(`p`, {
        className: `mt-1 text-xs text-muted-foreground`,
        children: `Les quotas se réinitialisent chaque jour. Ils protègent le service contre les usages abusifs.`,
      }),
      e
        ? n
          ? (0, j.jsx)(s, { className: `mt-4 size-4 animate-spin opacity-70` })
          : r || !t
            ? (0, j.jsx)(`p`, {
                className: `mt-4 text-xs text-muted-foreground`,
                children: `Usage indisponible pour le moment.`,
              })
            : (0, j.jsxs)(`div`, {
                className: `mt-4 space-y-3`,
                children: [
                  t.lignes.map((e) => (0, j.jsx)(K, { ligne: e }, e.outil)),
                  (0, j.jsxs)(`div`, {
                    className: `border-t border-border/60 pt-3 text-xs text-muted-foreground`,
                    children: [
                      `Total : `,
                      t.total_utilise,
                      ` / `,
                      t.total_limite,
                      ` analyses aujourd'hui · plan `,
                      t.plan,
                    ],
                  }),
                ],
              })
        : (0, j.jsx)(`p`, {
            className: `mt-4 text-xs text-muted-foreground`,
            children: `Connectez-vous pour voir vos quotas IA.`,
          }),
    ],
  });
}
export { U as n, q as t };
