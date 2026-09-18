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
		"mtime": "2026-09-18T20:52:34.667Z",
		"size": 3286,
		"path": "../public/favicon.png"
	},
	"/nacora-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"44a-ghzGy4XBbvygD/ABBXuD5ljDnto\"",
		"mtime": "2026-09-18T20:52:34.667Z",
		"size": 1098,
		"path": "../public/nacora-logo.svg"
	},
	"/nacora-logo.png": {
		"type": "image/png",
		"etag": "\"7d9a-Y6CfjNPKY5xA8HfmFS3r1CohliY\"",
		"mtime": "2026-09-18T20:52:34.667Z",
		"size": 32154,
		"path": "../public/nacora-logo.png"
	},
	"/nacora-mark.svg": {
		"type": "image/svg+xml",
		"etag": "\"108-Ia4oEl78ws/Pbpc0QIMJ9ST51VM\"",
		"mtime": "2026-09-18T20:52:34.667Z",
		"size": 264,
		"path": "../public/nacora-mark.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-18T20:52:34.667Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-BouHnhxl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1babc-6dJsa4Qn2/cPZ/gsfLK8Ojr4oeo\"",
		"mtime": "2026-09-18T20:52:32.888Z",
		"size": 113340,
		"path": "../public/assets/AppShell-BouHnhxl.js"
	},
	"/assets/_._lovable.oauth.consent-DaJw69yz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"230-9uPu1KwSCGUGq0yqc4S3K17PiIM\"",
		"mtime": "2026-09-18T20:52:32.888Z",
		"size": 560,
		"path": "../public/assets/_._lovable.oauth.consent-DaJw69yz.js"
	},
	"/assets/Combination-E8f6_xwY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f95-tjpkaOcvYH2RDohDTAeeKuAG6uc\"",
		"mtime": "2026-09-18T20:52:32.888Z",
		"size": 16277,
		"path": "../public/assets/Combination-E8f6_xwY.js"
	},
	"/assets/assistant-dEE49bEb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34f57-6PwEESN3qjvNLk/u7mvjEmszQus\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 216919,
		"path": "../public/assets/assistant-dEE49bEb.js"
	},
	"/assets/badge-Ca1RcJ9Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93c-YtaB/V83qbPlwv9kJLrkzFfylkk\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 2364,
		"path": "../public/assets/badge-Ca1RcJ9Z.js"
	},
	"/nacora-mark.png": {
		"type": "image/png",
		"etag": "\"3c3c-b/GZKNsE2FKfkHwmFjBMW0K8izo\"",
		"mtime": "2026-09-18T20:52:34.667Z",
		"size": 15420,
		"path": "../public/nacora-mark.png"
	},
	"/assets/biometric-DVzHpbfG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e3-XvMz0yhKKmo4DKV6SRpvwOCNWZ8\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 2019,
		"path": "../public/assets/biometric-DVzHpbfG.js"
	},
	"/assets/button-CRyNFFhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42b4b-69jSv/GxeRc7zkfIJAJHmGD12hA\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 273227,
		"path": "../public/assets/button-CRyNFFhF.js"
	},
	"/assets/calendar-clock-Ce_n4edq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-hJwnv5hZexx/1IX2gOeSYi06K+k\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 366,
		"path": "../public/assets/calendar-clock-Ce_n4edq.js"
	},
	"/assets/candidatures-CBwmnkSq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d-5PC8tj3+z3mtNwVLnwkm7UJfYMA\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 301,
		"path": "../public/assets/candidatures-CBwmnkSq.js"
	},
	"/assets/auth-BjYisXRP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"299c4-NkqSNWfICXJI6uKXKtFJ6/Y+Dmo\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 170436,
		"path": "../public/assets/auth-BjYisXRP.js"
	},
	"/assets/_._lovable.oauth.consent-BAWMOweX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"835-A4YFpwWL/wAlQY+BkoLLPnNGztg\"",
		"mtime": "2026-09-18T20:52:32.888Z",
		"size": 2101,
		"path": "../public/assets/_._lovable.oauth.consent-BAWMOweX.js"
	},
	"/assets/compass-Dg_JHost.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-WWuRmNz1QC71FFs/GS2BPnK6HUM\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 239,
		"path": "../public/assets/compass-Dg_JHost.js"
	},
	"/assets/cv-fichier-DVtgNlFP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109d-ONOF/tVCScnDGjfkse2A3yfz0vY\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 4253,
		"path": "../public/assets/cv-fichier-DVtgNlFP.js"
	},
	"/assets/dist-BjC4eDPE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cca-U/MiQ3DLEvx9CCygdy2Dsx3dyfk\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 7370,
		"path": "../public/assets/dist-BjC4eDPE.js"
	},
	"/assets/dist-C93bX1gr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1083-cUsMmAlGE8bM79pTsnUOJBxhrYQ\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 4227,
		"path": "../public/assets/dist-C93bX1gr.js"
	},
	"/assets/documents-K3aGcP7n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1041-lnlfvDr0EKL9/UJQnFOwawxtWXU\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 4161,
		"path": "../public/assets/documents-K3aGcP7n.js"
	},
	"/assets/download-C60_lg9H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-FwYDRKifrLzYegnk2stdgaheE00\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 220,
		"path": "../public/assets/download-C60_lg9H.js"
	},
	"/assets/calendrier-B8uUTw1C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2526-A0miqhNNcsWMtby5SB8ELh1Say0\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 9510,
		"path": "../public/assets/calendrier-B8uUTw1C.js"
	},
	"/assets/Logo-BKWvvm02.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a203f-gHmMYuFbt2k1nropU6fXKsJEURE\"",
		"mtime": "2026-09-18T20:52:32.888Z",
		"size": 663615,
		"path": "../public/assets/Logo-BKWvvm02.js"
	},
	"/assets/globe-B8TcOIJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-D4MzweWf8MIaH1sYZ38d+Cm5L7o\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 230,
		"path": "../public/assets/globe-B8TcOIJM.js"
	},
	"/assets/graduation-cap-Cpgm1SaD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-pNFVAs2F6oh84ZaQ3yunhqLYR00\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 320,
		"path": "../public/assets/graduation-cap-Cpgm1SaD.js"
	},
	"/assets/heart-kvDKtREe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-wNoOIkrOQlfLOx87SSlF5M9pY3o\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 246,
		"path": "../public/assets/heart-kvDKtREe.js"
	},
	"/assets/import-CJZAe2R5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b25-nMxRa9547YibI5r7m+nm/R0pWlE\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 31525,
		"path": "../public/assets/import-CJZAe2R5.js"
	},
	"/assets/jsx-dev-runtime-DNWPJsQO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"666a-lTce1F5JA5J+H/6ELo/j4zuH/nQ\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 26218,
		"path": "../public/assets/jsx-dev-runtime-DNWPJsQO.js"
	},
	"/assets/log-out-Bo6mEPuI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-C3Kmx6P6iMLJqYRYZoaXChJsBRA\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 396,
		"path": "../public/assets/log-out-Bo6mEPuI.js"
	},
	"/assets/opportunites-v-FrkV14.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d3-l1vxa8JaiFMpHVyGNklMLExDG4w\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 28883,
		"path": "../public/assets/opportunites-v-FrkV14.js"
	},
	"/assets/mammoth.browser-DxYSvrvr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78276-tAKD53t3FvX0vE+jNtzEGf86o5o\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 492150,
		"path": "../public/assets/mammoth.browser-DxYSvrvr.js"
	},
	"/assets/preload-helper-BZ1Pz5am.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c2-TG2RYA3IOM/wv9x4QTfIUg356Us\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 1218,
		"path": "../public/assets/preload-helper-BZ1Pz5am.js"
	},
	"/assets/profil-ChfJ2_A6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37998-4sEuBpjcDed6j9pSxHqxvclGb04\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 227736,
		"path": "../public/assets/profil-ChfJ2_A6.js"
	},
	"/assets/rotate-ccw-C90f_qwI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-rMELdCO+S8KjKd3LB2qbfFqfJ7E\"",
		"mtime": "2026-09-18T20:52:32.891Z",
		"size": 188,
		"path": "../public/assets/rotate-ccw-C90f_qwI.js"
	},
	"/assets/layers-CyG2z9w0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"199-7R3W9vyDdQr1jX4ld5X04tjkmAg\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 409,
		"path": "../public/assets/layers-CyG2z9w0.js"
	},
	"/assets/entreprises-DhD-qT9k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2be-I3ZbR+gG77aFiyk9Pt7QW7503Dw\"",
		"mtime": "2026-09-18T20:52:32.889Z",
		"size": 41662,
		"path": "../public/assets/entreprises-DhD-qT9k.js"
	},
	"/assets/routes-btlXWCXA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131-DXuZyU4+b5Hq69bstJQfQSZ/oA8\"",
		"mtime": "2026-09-18T20:52:32.891Z",
		"size": 305,
		"path": "../public/assets/routes-btlXWCXA.js"
	},
	"/assets/styles-BF9-aGg_.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3433f-JqDpqRzFMVmvOpKdD5kCw5OzqEs\"",
		"mtime": "2026-09-18T20:52:32.891Z",
		"size": 213823,
		"path": "../public/assets/styles-BF9-aGg_.css"
	},
	"/branding/nacora-official-logo.png": {
		"type": "image/png",
		"etag": "\"7d9a-Y6CfjNPKY5xA8HfmFS3r1CohliY\"",
		"mtime": "2026-09-18T20:52:34.666Z",
		"size": 32154,
		"path": "../public/branding/nacora-official-logo.png"
	},
	"/assets/rolldown-runtime-Dd_uD5pT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"452-sZl5y+VnYZJIxKNwHO0DTqczPH0\"",
		"mtime": "2026-09-18T20:52:32.891Z",
		"size": 1106,
		"path": "../public/assets/rolldown-runtime-Dd_uD5pT.js"
	},
	"/assets/sync-transfert-CxKZL5mS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"686-rLpAhsBx95yA7vCoHnKHvXyK3zo\"",
		"mtime": "2026-09-18T20:52:32.891Z",
		"size": 1670,
		"path": "../public/assets/sync-transfert-CxKZL5mS.js"
	},
	"/assets/parametres-C6jWYNjX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d8f-iSaofIkn/yBCPy0Sz7Fs34O/BOo\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 11663,
		"path": "../public/assets/parametres-C6jWYNjX.js"
	},
	"/assets/pdfjs-CbIpAE7K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a8d8-lAl03NhMb2Tn/apWl2dgXeqYRYA\"",
		"mtime": "2026-09-18T20:52:32.890Z",
		"size": 305368,
		"path": "../public/assets/pdfjs-CbIpAE7K.js"
	},
	"/assets/useRouter-CG1bFWM5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-RgoVimT2inDqfOdNJ6BbO3uDOcM\"",
		"mtime": "2026-09-18T20:52:32.891Z",
		"size": 329,
		"path": "../public/assets/useRouter-CG1bFWM5.js"
	},
	"/assets/select-CUS7ZVYu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e0a-DCjoEgVKpP3IewfnrQBduOryPJI\"",
		"mtime": "2026-09-18T20:52:32.891Z",
		"size": 24074,
		"path": "../public/assets/select-CUS7ZVYu.js"
	},
	"/branding/nacora-official-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"44a-ghzGy4XBbvygD/ABBXuD5ljDnto\"",
		"mtime": "2026-09-18T20:52:34.667Z",
		"size": 1098,
		"path": "../public/branding/nacora-official-logo.svg"
	},
	"/assets/index-CQh3c94d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d33ad-tL4tbK3RL3uKSMpqeduc5qeezr4\"",
		"mtime": "2026-09-18T20:52:32.888Z",
		"size": 865197,
		"path": "../public/assets/index-CQh3c94d.js"
	},
	"/assets/xlsx-BTnRVny0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6784a-+bcry5CWJZdGJ6DDEVhRKWUX/jM\"",
		"mtime": "2026-09-18T20:52:32.891Z",
		"size": 424010,
		"path": "../public/assets/xlsx-BTnRVny0.js"
	},
	"/branding/nacora-official-mark.png": {
		"type": "image/png",
		"etag": "\"3c3c-b/GZKNsE2FKfkHwmFjBMW0K8izo\"",
		"mtime": "2026-09-18T20:52:34.667Z",
		"size": 15420,
		"path": "../public/branding/nacora-official-mark.png"
	},
	"/branding/nacora-official-mark.svg": {
		"type": "image/svg+xml",
		"etag": "\"108-Ia4oEl78ws/Pbpc0QIMJ9ST51VM\"",
		"mtime": "2026-09-18T20:52:34.667Z",
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
