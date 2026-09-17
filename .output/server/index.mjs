globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"cd6-/12PFoxiRs8X1QZjAfZ8kAMtL+0\"",
		"mtime": "2026-09-17T19:07:39.744Z",
		"size": 3286,
		"path": "../public/favicon.png"
	},
	"/nacora-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"7c4-6R8uK8ZroZxZSkFo7cwhXzvTJCc\"",
		"mtime": "2026-09-17T19:07:39.744Z",
		"size": 1988,
		"path": "../public/nacora-logo.svg"
	},
	"/nacora-mark.svg": {
		"type": "image/svg+xml",
		"etag": "\"29a-kDeCDcgNGKqZozQ9CZ/EnKnUPC4\"",
		"mtime": "2026-09-17T19:07:39.744Z",
		"size": 666,
		"path": "../public/nacora-mark.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-17T19:07:39.744Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/Combination-B4FHVRRw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7781-yrVXgwmm1oywEI3bQlW/u5eUIls\"",
		"mtime": "2026-09-17T19:07:37.680Z",
		"size": 30593,
		"path": "../public/assets/Combination-B4FHVRRw.js"
	},
	"/assets/Logo-CqPRxF61.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e20-kKZoXX3nJH49UrGt1PVpkvfXs2c\"",
		"mtime": "2026-09-17T19:07:37.680Z",
		"size": 3616,
		"path": "../public/assets/Logo-CqPRxF61.js"
	},
	"/assets/_._lovable.oauth.consent-6uVAV55T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"230-pb536YnLu8/PkrFBSJwuvQIp2o4\"",
		"mtime": "2026-09-17T19:07:37.680Z",
		"size": 560,
		"path": "../public/assets/_._lovable.oauth.consent-6uVAV55T.js"
	},
	"/assets/_._lovable.oauth.consent-Chv582Pk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"857-yZpPR8BQwfWYzLsl5LjrTtUqUUw\"",
		"mtime": "2026-09-17T19:07:37.680Z",
		"size": 2135,
		"path": "../public/assets/_._lovable.oauth.consent-Chv582Pk.js"
	},
	"/assets/admin-C6HNW2UT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2b4-FjWgJKnOKzH1rfI+jNPhBjkxhL8\"",
		"mtime": "2026-09-17T19:07:37.680Z",
		"size": 58036,
		"path": "../public/assets/admin-C6HNW2UT.js"
	},
	"/assets/admin-client-CGjdEloU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4c-rUTND9nIZ6D4H/a/mGM4wu4b7bg\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 7500,
		"path": "../public/assets/admin-client-CGjdEloU.js"
	},
	"/assets/auth-BQpzJMH9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf0e-Tah+nlxa8sH1onIjVAHM1cD8ZYk\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 48910,
		"path": "../public/assets/auth-BQpzJMH9.js"
	},
	"/assets/biometric-_JQPgqiJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"854-Y7T6XGRKN/9lzJmEUespzvS5R6Q\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 2132,
		"path": "../public/assets/biometric-_JQPgqiJ.js"
	},
	"/assets/briefcase-CcdAQaPk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6-2Ptf5FA1HHpSftEZY/R3FajHUeU\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 214,
		"path": "../public/assets/briefcase-CcdAQaPk.js"
	},
	"/assets/badge-BFgnyxbr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a114-SELXFszHFsVH0fBNb295SaENGNg\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 41236,
		"path": "../public/assets/badge-BFgnyxbr.js"
	},
	"/assets/button-BygWqyiy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9735-SPrfKEZM2cJBcfjncJ7WIuX7nJg\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 38709,
		"path": "../public/assets/button-BygWqyiy.js"
	},
	"/assets/calendar-clock-BwJsFM6M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-vOknvBdIKKS1oGmolMZXAWz1YQ4\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 372,
		"path": "../public/assets/calendar-clock-BwJsFM6M.js"
	},
	"/assets/calendrier-D2OvQHn7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a7-zswbOTLJqpz/uUdrtZQYotsTQ4s\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 8615,
		"path": "../public/assets/calendrier-D2OvQHn7.js"
	},
	"/assets/candidatures-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 38,
		"path": "../public/assets/candidatures-DJ7LAi8J.js"
	},
	"/assets/check-BzZEZ4MQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-8shIDdJeV2LDX5jMxrBpo1+MI5s\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 118,
		"path": "../public/assets/check-BzZEZ4MQ.js"
	},
	"/assets/cv-fichier-CdpWkbnG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116b-SC1CXo31xCethJd8l62mX94ZaMU\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 4459,
		"path": "../public/assets/cv-fichier-CdpWkbnG.js"
	},
	"/assets/documents-DH6YfiD_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb6-ooOXHRUmMf5VgJFyGI72Snu5Zfs\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 4022,
		"path": "../public/assets/documents-DH6YfiD_.js"
	},
	"/assets/download-CJsxERj8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-gunwEBKqEPKBOvDJ9ckiqf9EMis\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 226,
		"path": "../public/assets/download-CJsxERj8.js"
	},
	"/assets/client-BOKjhomA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a4f5-BPaRuAj3oILnizuJHQW9+ASY/98\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 238837,
		"path": "../public/assets/client-BOKjhomA.js"
	},
	"/assets/entreprises-DQjjlz6U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ac1-/WtRpaYZ2CXe9X2yB5r5yOiaMGg\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 35521,
		"path": "../public/assets/entreprises-DQjjlz6U.js"
	},
	"/assets/auth-local-DtVv7I0p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93924-0V/PnXmotPYMwTY0xrB7XsFmm/c\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 604452,
		"path": "../public/assets/auth-local-DtVv7I0p.js"
	},
	"/assets/eye-vaGjpfOv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-/JEpO9lh+1FicwhxDJyNS2wA1DE\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 250,
		"path": "../public/assets/eye-vaGjpfOv.js"
	},
	"/assets/graduation-cap-CFnoL3TB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146-H5lspKNHKP862WnImiB5gIGvxh0\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 326,
		"path": "../public/assets/graduation-cap-CFnoL3TB.js"
	},
	"/assets/globe-BAg1ZG5k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-UnNfWUYI7Pmh7NX3K26+wKoPHoM\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 236,
		"path": "../public/assets/globe-BAg1ZG5k.js"
	},
	"/assets/heart-Bxfs6l9W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-5awGZcei/WuIFOseEYllcv4EwRM\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 252,
		"path": "../public/assets/heart-Bxfs6l9W.js"
	},
	"/assets/import-C8ZoZqnq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6dcc-nsR8N92M8kR2RC1I03/gc51KBHc\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 28108,
		"path": "../public/assets/import-C8ZoZqnq.js"
	},
	"/assets/jsx-dev-runtime-C8Mf5bcE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6305-PB2kkAJfHlH2CXENxKrOTPKArCY\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 25349,
		"path": "../public/assets/jsx-dev-runtime-C8Mf5bcE.js"
	},
	"/assets/layers-BnGQwnEL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19f-ITy4dKhmne+oZcVFKRpY2uh/hTc\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 415,
		"path": "../public/assets/layers-BnGQwnEL.js"
	},
	"/assets/log-out-CqAFuWi0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-h43AU6sWkMIQiTb9gmpJvxyDPmI\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 402,
		"path": "../public/assets/log-out-CqAFuWi0.js"
	},
	"/assets/opportunites-DW5Quv19.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b4d-T3GZr0gc9cfoce7KpTe010KKQgs\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 19277,
		"path": "../public/assets/opportunites-DW5Quv19.js"
	},
	"/assets/parametres-CAQBFYTQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4249-IKMtdyks3LeTtYj4I454KCYaqH8\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 16969,
		"path": "../public/assets/parametres-CAQBFYTQ.js"
	},
	"/assets/mammoth.browser-Cylg7AAE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"781a7-TXohfYHHxOPAdvyll3afYr6uNfo\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 491943,
		"path": "../public/assets/mammoth.browser-Cylg7AAE.js"
	},
	"/assets/pdf.worker.min-D7i8o3wR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41-CPhEVVLaZKiiJ9+rrs2oG2wFT7c\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 65,
		"path": "../public/assets/pdf.worker.min-D7i8o3wR.js"
	},
	"/assets/preload-helper-Czpn1I53.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac-sE+5KsaRXTMfwOfrOATQajMSGV4\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 1196,
		"path": "../public/assets/preload-helper-Czpn1I53.js"
	},
	"/assets/profil-sidWgJmt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"380ef-QiCS/E0ZZQeJl52AhdllCAE23hM\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 229615,
		"path": "../public/assets/profil-sidWgJmt.js"
	},
	"/assets/pdf-DV2XDCc3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77225-VTWLwRmyutI5SjurH48mj2QI5JI\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 487973,
		"path": "../public/assets/pdf-DV2XDCc3.js"
	},
	"/assets/rolldown-runtime-W7wSyTde.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d3-FfUwnyaEX0ZYTQfKrzQ4hagCHbI\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 979,
		"path": "../public/assets/rolldown-runtime-W7wSyTde.js"
	},
	"/assets/react-Cp3RxKv8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2c0-dx/Wj0SkuPoZkdHZdkfTocEykbg\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 123584,
		"path": "../public/assets/react-Cp3RxKv8.js"
	},
	"/assets/redirect-DtIAAt0y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1-KhpEIx1LNSnb7dNYxiNI58wV9MY\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 481,
		"path": "../public/assets/redirect-DtIAAt0y.js"
	},
	"/assets/routes-CDkwDnu0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1430d-YTkXVG0/yWKlDUoPpV+NMRzL/xg\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 82701,
		"path": "../public/assets/routes-CDkwDnu0.js"
	},
	"/assets/sync-transfert-CuvYxaOo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"598-ZIZQOyTHSIMXdLoEXH8jbUTSufk\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 1432,
		"path": "../public/assets/sync-transfert-CuvYxaOo.js"
	},
	"/assets/select--YQwNWaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de4e-TMQn8QWkhbQw0hEtVYRgpnZ4iuA\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 56910,
		"path": "../public/assets/select--YQwNWaO.js"
	},
	"/assets/styles-CcoDo_E5.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"28af4-5xRf0tbN4f9iLZpknQxt8AwHCyQ\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 166644,
		"path": "../public/assets/styles-CcoDo_E5.css"
	},
	"/assets/index-CYWjyV6B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b60d4-zOrGOjHMe2ylKAH7s6L+KtEfMpQ\"",
		"mtime": "2026-09-17T19:07:37.680Z",
		"size": 745684,
		"path": "../public/assets/index-CYWjyV6B.js"
	},
	"/assets/useSession-C-r8Qk-y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5946-Zn7RGG6VQ16JJTBlqpxX1XoaRc8\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 22854,
		"path": "../public/assets/useSession-C-r8Qk-y.js"
	},
	"/assets/pdf.worker.min-BmVo14Nb.mjs": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1418aa-Lz7lnu+KQz6qCgkYkL1GAASHcgc\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 1317034,
		"path": "../public/assets/pdf.worker.min-BmVo14Nb.mjs"
	},
	"/assets/user-check-CiYxVwrN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-xEwqjxt7PQuZw2vidNSAQNCmKcQ\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 237,
		"path": "../public/assets/user-check-CiYxVwrN.js"
	},
	"/assets/user-plus-p50-MA6I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130-hTjBGLW3zQZzxcrYyg/gIepnUnA\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 304,
		"path": "../public/assets/user-plus-p50-MA6I.js"
	},
	"/assets/users-CHfW41ga.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"276-uWmBJ0Kk4Bc4dqzVPHY+wMxpKnA\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 630,
		"path": "../public/assets/users-CHfW41ga.js"
	},
	"/assets/xlsx-B6LBHFmH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6783b-CFWWvud0zPgLQcRUhQjJnNrq3yg\"",
		"mtime": "2026-09-17T19:07:37.684Z",
		"size": 423995,
		"path": "../public/assets/xlsx-B6LBHFmH.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_0jRgqU = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0jRgqU
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
