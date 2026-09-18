globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
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
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"cd6-/12PFoxiRs8X1QZjAfZ8kAMtL+0\"",
		"mtime": "2026-09-18T20:33:58.546Z",
		"size": 3286,
		"path": "../public/favicon.png"
	},
	"/nacora-mark.png": {
		"type": "image/png",
		"etag": "\"3c3c-b/GZKNsE2FKfkHwmFjBMW0K8izo\"",
		"mtime": "2026-09-18T20:33:58.547Z",
		"size": 15420,
		"path": "../public/nacora-mark.png"
	},
	"/nacora-mark.svg": {
		"type": "image/svg+xml",
		"etag": "\"108-Ia4oEl78ws/Pbpc0QIMJ9ST51VM\"",
		"mtime": "2026-09-18T20:33:58.547Z",
		"size": 264,
		"path": "../public/nacora-mark.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-18T20:33:58.547Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-CDL0_vr6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c212-CI5N1Q8K9AAEEYuGmQBxIHe+OBI\"",
		"mtime": "2026-09-18T20:33:56.473Z",
		"size": 115218,
		"path": "../public/assets/AppShell-CDL0_vr6.js"
	},
	"/assets/Combination-ePPL-dQJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f99-7Ml6tnFYcVrQO0UkgeXiSP86NSA\"",
		"mtime": "2026-09-18T20:33:56.473Z",
		"size": 16281,
		"path": "../public/assets/Combination-ePPL-dQJ.js"
	},
	"/assets/_._lovable.oauth.consent-7rEiOhh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"230-fpFDAig76eUEmXnDFoLKwhOUot8\"",
		"mtime": "2026-09-18T20:33:56.474Z",
		"size": 560,
		"path": "../public/assets/_._lovable.oauth.consent-7rEiOhh8.js"
	},
	"/assets/_._lovable.oauth.consent-BW7KKV2R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"835-m+V3wg5PyGiTrdHjCPS1pN6EGLg\"",
		"mtime": "2026-09-18T20:33:56.474Z",
		"size": 2101,
		"path": "../public/assets/_._lovable.oauth.consent-BW7KKV2R.js"
	},
	"/assets/badge-BbwFnKOf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93c-rL9VJGHcVkpobHnQcVPKkXfZ2dw\"",
		"mtime": "2026-09-18T20:33:56.474Z",
		"size": 2364,
		"path": "../public/assets/badge-BbwFnKOf.js"
	},
	"/assets/biometric-BRejXCfS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e3-V7hQuszxBQGt1fPQxgzCsgTQLhA\"",
		"mtime": "2026-09-18T20:33:56.474Z",
		"size": 2019,
		"path": "../public/assets/biometric-BRejXCfS.js"
	},
	"/assets/assistant-2YupVtra.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34f58-DZhHlfMV2gEh8tGH+s4xHpoCmnU\"",
		"mtime": "2026-09-18T20:33:56.474Z",
		"size": 216920,
		"path": "../public/assets/assistant-2YupVtra.js"
	},
	"/assets/calendar-clock-w7hPlL0X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-8SWzg2JzKykvwj3TqXXj8NnGrQc\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 366,
		"path": "../public/assets/calendar-clock-w7hPlL0X.js"
	},
	"/assets/calendrier-Drkt-bGp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2526-QDBQRGDoCIvVxzHAxqmnmduIs4I\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 9510,
		"path": "../public/assets/calendrier-Drkt-bGp.js"
	},
	"/assets/button-Xm6GcO2Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44240-oPVjKMjO1/OjH93bcVdYAMHr5lE\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 279104,
		"path": "../public/assets/button-Xm6GcO2Y.js"
	},
	"/assets/candidatures-BGSDzIMw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d-ARO4z8rAkdfSMXThbuXrjFRvtIE\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 301,
		"path": "../public/assets/candidatures-BGSDzIMw.js"
	},
	"/assets/compass-BTE2Cofq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-MdZLR/EQ0NVizjzuSBM8xcY8KOU\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 239,
		"path": "../public/assets/compass-BTE2Cofq.js"
	},
	"/nacora-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"44a-ghzGy4XBbvygD/ABBXuD5ljDnto\"",
		"mtime": "2026-09-18T20:33:58.547Z",
		"size": 1098,
		"path": "../public/nacora-logo.svg"
	},
	"/assets/documents-Cc94FoYV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1041-brhjFj0sRlDcHxXRaSdQkkLTgvo\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 4161,
		"path": "../public/assets/documents-Cc94FoYV.js"
	},
	"/assets/cv-fichier-vTZsJrca.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109d-YvV92/oDSbAZBtHMzUuRqb6aSeg\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 4253,
		"path": "../public/assets/cv-fichier-vTZsJrca.js"
	},
	"/assets/dist-qJfsWvs8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108b-GixQe2Gr/ERy5mYDjK9aMyVKDmQ\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 4235,
		"path": "../public/assets/dist-qJfsWvs8.js"
	},
	"/assets/download-BIlSi-Xb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-9DCk3jGayHerIxHrQ88Hbl+ezFM\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 220,
		"path": "../public/assets/download-BIlSi-Xb.js"
	},
	"/assets/dist-6OCywl8X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cca-m78ZxObo6cKysMLTyDXu86sKqOg\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 7370,
		"path": "../public/assets/dist-6OCywl8X.js"
	},
	"/assets/auth-Bck3Jz6x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29081-kcjGyUL0D3gEnZkvj4hB3e7SXtw\"",
		"mtime": "2026-09-18T20:33:56.474Z",
		"size": 168065,
		"path": "../public/assets/auth-Bck3Jz6x.js"
	},
	"/nacora-logo.png": {
		"type": "image/png",
		"etag": "\"7d9a-Y6CfjNPKY5xA8HfmFS3r1CohliY\"",
		"mtime": "2026-09-18T20:33:58.547Z",
		"size": 32154,
		"path": "../public/nacora-logo.png"
	},
	"/assets/Logo-BNSUxnj7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a18ea-IJXSzD6d9g9aQW0Zs4jV2yhIBHc\"",
		"mtime": "2026-09-18T20:33:56.474Z",
		"size": 661738,
		"path": "../public/assets/Logo-BNSUxnj7.js"
	},
	"/assets/entreprises-Bq5wA78_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2be-JoZGS5zRg3Zx32gcQ9e3Eve88tg\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 41662,
		"path": "../public/assets/entreprises-Bq5wA78_.js"
	},
	"/assets/globe-CeAg7wD9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-LsqmmMxt3FdMqe97jRuyoVEMMYU\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 230,
		"path": "../public/assets/globe-CeAg7wD9.js"
	},
	"/assets/graduation-cap-CzBiy2EX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-lq7prJ2axh+W1NrK8dk7HRHwX5A\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 320,
		"path": "../public/assets/graduation-cap-CzBiy2EX.js"
	},
	"/assets/heart-Dkdz7Pqq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-ds24MSk1oEkG5FK0ff61opFu3Go\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 246,
		"path": "../public/assets/heart-Dkdz7Pqq.js"
	},
	"/assets/import-DAzT1I3P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b25-SEBqs5yj+/xOZJHQlYvkpaMiRHQ\"",
		"mtime": "2026-09-18T20:33:56.475Z",
		"size": 31525,
		"path": "../public/assets/import-DAzT1I3P.js"
	},
	"/assets/jsx-dev-runtime-BoQDevNy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6305-DS3YeLPJ3TNZxTuV/EML2IIDx+I\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 25349,
		"path": "../public/assets/jsx-dev-runtime-BoQDevNy.js"
	},
	"/assets/log-out-lyETnVAO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-n+fneqp/X4xos9PtG93bre1/Q/E\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 396,
		"path": "../public/assets/log-out-lyETnVAO.js"
	},
	"/assets/opportunites-CsyCzbw8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d3-k+nqCh1xJz1G6GgPYEwcEIs/0DI\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 28883,
		"path": "../public/assets/opportunites-CsyCzbw8.js"
	},
	"/assets/mammoth.browser-D9DJTbPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"781a7-VUenozPpTAte/VICcbi11x6rSb8\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 491943,
		"path": "../public/assets/mammoth.browser-D9DJTbPw.js"
	},
	"/assets/parametres-DVq807bj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d8f-EtI0CHNPpuBgtLa9N5flOLAmII8\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 11663,
		"path": "../public/assets/parametres-DVq807bj.js"
	},
	"/assets/preload-helper-Czpn1I53.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac-sE+5KsaRXTMfwOfrOATQajMSGV4\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 1196,
		"path": "../public/assets/preload-helper-Czpn1I53.js"
	},
	"/assets/pdfjs-DMUsHNVm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a8df-fROfXxXXtZNszpgJimWi3n4ZWNs\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 305375,
		"path": "../public/assets/pdfjs-DMUsHNVm.js"
	},
	"/assets/rolldown-runtime-Dd_uD5pT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"452-sZl5y+VnYZJIxKNwHO0DTqczPH0\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 1106,
		"path": "../public/assets/rolldown-runtime-Dd_uD5pT.js"
	},
	"/assets/rotate-ccw-D0-h81xH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-T0smtI2ZnEcIRv/2WpUMEe+MkA0\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 188,
		"path": "../public/assets/rotate-ccw-D0-h81xH.js"
	},
	"/assets/routes-BfecsTXw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131-uZiu3Y7cNrrgbM88MQOeVNKM5tA\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 305,
		"path": "../public/assets/routes-BfecsTXw.js"
	},
	"/assets/select-BAwHcQkT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e0a-1WlpOQTTeMculwC0BQWQdH6DqwM\"",
		"mtime": "2026-09-18T20:33:56.477Z",
		"size": 24074,
		"path": "../public/assets/select-BAwHcQkT.js"
	},
	"/assets/styles-BF9-aGg_.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3433f-JqDpqRzFMVmvOpKdD5kCw5OzqEs\"",
		"mtime": "2026-09-18T20:33:56.477Z",
		"size": 213823,
		"path": "../public/assets/styles-BF9-aGg_.css"
	},
	"/assets/layers-DPmPOZR9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"199-3+6fj2Y7XEIWHgXK/kfyRXf9veM\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 409,
		"path": "../public/assets/layers-DPmPOZR9.js"
	},
	"/branding/nacora-official-logo.png": {
		"type": "image/png",
		"etag": "\"7d9a-Y6CfjNPKY5xA8HfmFS3r1CohliY\"",
		"mtime": "2026-09-18T20:33:58.546Z",
		"size": 32154,
		"path": "../public/branding/nacora-official-logo.png"
	},
	"/assets/useRouter-vVLsUonb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cb-lzs2gxmcWtCdxSuWZWybQC++C8w\"",
		"mtime": "2026-09-18T20:33:56.477Z",
		"size": 715,
		"path": "../public/assets/useRouter-vVLsUonb.js"
	},
	"/assets/sync-transfert-CDgi-riN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"686-KI+9o0It++JZR1EPa1HDew/ahbI\"",
		"mtime": "2026-09-18T20:33:56.477Z",
		"size": 1670,
		"path": "../public/assets/sync-transfert-CDgi-riN.js"
	},
	"/assets/xlsx-CJPd3IZK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6789c-RUGpsyG2e2O8PfVq9TmMGyUC3k0\"",
		"mtime": "2026-09-18T20:33:56.477Z",
		"size": 424092,
		"path": "../public/assets/xlsx-CJPd3IZK.js"
	},
	"/assets/profil-DpX_-46C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37998-lfPvjzgmQ5x/VYeyRWiihx8gHKs\"",
		"mtime": "2026-09-18T20:33:56.476Z",
		"size": 227736,
		"path": "../public/assets/profil-DpX_-46C.js"
	},
	"/assets/index-wzWMGGy2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c6823-2IEMS92PqXsT6T1lSVZPR52F2/g\"",
		"mtime": "2026-09-18T20:33:56.473Z",
		"size": 813091,
		"path": "../public/assets/index-wzWMGGy2.js"
	},
	"/branding/nacora-official-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"44a-ghzGy4XBbvygD/ABBXuD5ljDnto\"",
		"mtime": "2026-09-18T20:33:58.547Z",
		"size": 1098,
		"path": "../public/branding/nacora-official-logo.svg"
	},
	"/branding/nacora-official-mark.png": {
		"type": "image/png",
		"etag": "\"3c3c-b/GZKNsE2FKfkHwmFjBMW0K8izo\"",
		"mtime": "2026-09-18T20:33:58.546Z",
		"size": 15420,
		"path": "../public/branding/nacora-official-mark.png"
	},
	"/branding/nacora-official-mark.svg": {
		"type": "image/svg+xml",
		"etag": "\"108-Ia4oEl78ws/Pbpc0QIMJ9ST51VM\"",
		"mtime": "2026-09-18T20:33:58.547Z",
		"size": 264,
		"path": "../public/branding/nacora-official-mark.svg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
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
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
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
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
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
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
