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
		"mtime": "2026-08-31T20:33:46.956Z",
		"size": 3286,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-31T20:33:46.956Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AiContextCard-5SLumMq2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1828-GKy+4uY5l1o37kQPL65e4ClO+2k\"",
		"mtime": "2026-08-31T20:33:44.162Z",
		"size": 6184,
		"path": "../public/assets/AiContextCard-5SLumMq2.js"
	},
	"/assets/AppShell-Cl50lntp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d41-js6QII3qblmbiv0vp1Tnr1QDwUY\"",
		"mtime": "2026-08-31T20:33:44.162Z",
		"size": 15681,
		"path": "../public/assets/AppShell-Cl50lntp.js"
	},
	"/assets/CandidatureSheet-COS_fcsn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f18-fAHrYc1NY6BxEv+KzlEUbZGCpP0\"",
		"mtime": "2026-08-31T20:33:44.162Z",
		"size": 12056,
		"path": "../public/assets/CandidatureSheet-COS_fcsn.js"
	},
	"/assets/ImportIaDialog-CuHGph30.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7fa-s9XHZYFs8o5hXN5//TXMMSejHNg\"",
		"mtime": "2026-08-31T20:33:44.162Z",
		"size": 2042,
		"path": "../public/assets/ImportIaDialog-CuHGph30.js"
	},
	"/assets/Logo-Dyno2Qk4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9cd4-fiTtZl+ld7ic3momfof5a+BuVgk\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 40148,
		"path": "../public/assets/Logo-Dyno2Qk4.js"
	},
	"/assets/MatchBadge-B8zIW2OI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e7-FEtLpPzZAmf7FB1YCPgpeTv1KS8\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 743,
		"path": "../public/assets/MatchBadge-B8zIW2OI.js"
	},
	"/assets/MatchPanel-CsSTNxxh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae0-cPZhncPOg8lR2gTO0s2Np4GdBos\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 6880,
		"path": "../public/assets/MatchPanel-CsSTNxxh.js"
	},
	"/assets/UsageIaCard-DrX4Aziy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"285a-xHCkqTx/hONMISsqDxIPq4Xdgq4\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 10330,
		"path": "../public/assets/UsageIaCard-DrX4Aziy.js"
	},
	"/assets/_._lovable.oauth.consent-CdpScWui.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f9-CXkKmgPIyZ7A0vQHXLcfBckCG1I\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 1529,
		"path": "../public/assets/_._lovable.oauth.consent-CdpScWui.js"
	},
	"/assets/_._lovable.oauth.consent-Cr9ks-JT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162-d2jYnbmqDnwMH/ajVsIwPhIyJyw\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 354,
		"path": "../public/assets/_._lovable.oauth.consent-Cr9ks-JT.js"
	},
	"/assets/StatutBadge-DqpCZIH-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a4-WALpGZmdMxrcKznZ7SFGZtfoXKQ\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 676,
		"path": "../public/assets/StatutBadge-DqpCZIH-.js"
	},
	"/assets/accordion-BcqNqApR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c00-f7M0bUcLBjy6ApcRJAd3kXhB3pQ\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 7168,
		"path": "../public/assets/accordion-BcqNqApR.js"
	},
	"/assets/arrow-right-DD5q0sT2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-E1P6xWXrSefvp6Oqf38ntsIXvoU\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 153,
		"path": "../public/assets/arrow-right-DD5q0sT2.js"
	},
	"/assets/assistant-CmKR-oK6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-t+dn22h1a/jlq8yTN0aDdKcZDYk\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 142,
		"path": "../public/assets/assistant-CmKR-oK6.js"
	},
	"/assets/assistant.connect-D73xM8wz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3064-3ratdmDXSZc5c03uN3RmWFstxWg\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 12388,
		"path": "../public/assets/assistant.connect-D73xM8wz.js"
	},
	"/assets/assistant.index-BYfrroAK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a31-1eGmjwO0wA54Re9XeOC8tItyrPY\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 68145,
		"path": "../public/assets/assistant.index-BYfrroAK.js"
	},
	"/assets/assistant.interview-DWCU2xrj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ac-2OayXqHKyuTBzqNiRdKHqs8UN1k\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 5548,
		"path": "../public/assets/assistant.interview-DWCU2xrj.js"
	},
	"/assets/assistant.match-7F4RGk6m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1450-hMF+Mzx6ObAUBk2+XC+qxRrv9gk\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 5200,
		"path": "../public/assets/assistant.match-7F4RGk6m.js"
	},
	"/assets/bot-D5zs0XDW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-t1lK48FQ20nJRgFlPD38vEi1zKU\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 316,
		"path": "../public/assets/bot-D5zs0XDW.js"
	},
	"/assets/briefcase-D0damFXY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-h7mUZmg0KRLl+3Oee3AX4SMR4L8\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 208,
		"path": "../public/assets/briefcase-D0damFXY.js"
	},
	"/assets/button-Fem7RhN8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb19-LL0azh/K4oVW2/EcfaQLyH3Kfpg\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 51993,
		"path": "../public/assets/button-Fem7RhN8.js"
	},
	"/assets/calendar-clock-CbhT8skz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-+v8LAsedQxYnhIMqWrC3TkUft1g\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 366,
		"path": "../public/assets/calendar-clock-CbhT8skz.js"
	},
	"/assets/assistant.linkedin-WpQTwSXc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148f-0iZfixq1ZYNpL4cc9YlhTyC9MLQ\"",
		"mtime": "2026-08-31T20:33:44.163Z",
		"size": 5263,
		"path": "../public/assets/assistant.linkedin-WpQTwSXc.js"
	},
	"/assets/calendrier-DPZdGSlW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170a-PEfHPx0N7ZT3O83Rt37wfTYiu5I\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 5898,
		"path": "../public/assets/calendrier-DPZdGSlW.js"
	},
	"/assets/candidatures-cloud-DNE1nZFi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"774-c19ZPQk+8gCrjtuVS3ohzgHnh0c\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 1908,
		"path": "../public/assets/candidatures-cloud-DNE1nZFi.js"
	},
	"/assets/candidatures-gA99xw8Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3692-CjhTht/kWNNL3cvE692llUj2I/c\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 13970,
		"path": "../public/assets/candidatures-gA99xw8Q.js"
	},
	"/assets/chevron-left-sle9Mx6I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-dE06NC1yoOMqCUYFCsYtIpnSTWc\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 118,
		"path": "../public/assets/chevron-left-sle9Mx6I.js"
	},
	"/assets/chevron-right-C8sZ_urB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-ezM0Kzc9nNCrG7CZtMFG0l0JIUM\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 118,
		"path": "../public/assets/chevron-right-C8sZ_urB.js"
	},
	"/assets/contacts-Bb6I_lE6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"356a-/KK8CWWJXlD3OWvp/GbkNvKjUPI\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 13674,
		"path": "../public/assets/contacts-Bb6I_lE6.js"
	},
	"/assets/contacts-cloud-CF5yT_AQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d0-oqiGj3wZIQlDmSSzrqIGOUcI9N0\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 1232,
		"path": "../public/assets/contacts-cloud-CF5yT_AQ.js"
	},
	"/assets/cv-fichier-u1_8YlYu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8be-YScKyB3qnZaDy5QWcBJsdp8+1eU\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 2238,
		"path": "../public/assets/cv-fichier-u1_8YlYu.js"
	},
	"/assets/dist-hkBRe37y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cba-SCQhMOVg8AGnJi2WNzCcofzIJbo\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 7354,
		"path": "../public/assets/dist-hkBRe37y.js"
	},
	"/assets/download-DFNUF2gv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-JoiffIyEMTgrsC4ZrH5ZtduZdI4\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 220,
		"path": "../public/assets/download-DFNUF2gv.js"
	},
	"/assets/dropdown-menu-CARL9IbZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50ee-Fo7Wgifd0r7jd9ntTjcUVXLIJq8\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 20718,
		"path": "../public/assets/dropdown-menu-CARL9IbZ.js"
	},
	"/assets/entreprises-DleyJW4f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b6d-cpyWrLQM3r1omlz+PTcmiUYWjVg\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 7021,
		"path": "../public/assets/entreprises-DleyJW4f.js"
	},
	"/assets/external-link-Bkf5lH-x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-jy61BxqR94Z2VSsZp2drCCxum2k\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 239,
		"path": "../public/assets/external-link-Bkf5lH-x.js"
	},
	"/assets/import-DMqKSHNh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53f8-je+MlVQMAXRSXPgFCqZkIV7KD0U\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 21496,
		"path": "../public/assets/import-DMqKSHNh.js"
	},
	"/assets/documents-Bkau9_YM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"129a-kxNuX0PDId8RXenzSpE5Eqs+a7s\"",
		"mtime": "2026-08-31T20:33:44.164Z",
		"size": 4762,
		"path": "../public/assets/documents-Bkau9_YM.js"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 961,
		"path": "../public/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/log-out-C8eJBfG-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-ODoOMoGtz7TniSYg1EDWdk67WHc\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 396,
		"path": "../public/assets/log-out-C8eJBfG-.js"
	},
	"/assets/map-pin-r1fx9440.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-sOcnQ+BWtMubHc4doiMp308QJjI\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 247,
		"path": "../public/assets/map-pin-r1fx9440.js"
	},
	"/assets/match-run-C4ilnf3c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1263-Vh1AHkAZaLTNo0x2Lkk2aH5FzBE\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 4707,
		"path": "../public/assets/match-run-C4ilnf3c.js"
	},
	"/assets/message-square-quote-C0oi2Wof.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d-ad9q1R6TIF6FF6/VF8BedAiJ/ZU\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 333,
		"path": "../public/assets/message-square-quote-C0oi2Wof.js"
	},
	"/assets/modal-BO2NizLB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"447-+4atc85fxJwOtOTuFyT4RQFDIcA\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 1095,
		"path": "../public/assets/modal-BO2NizLB.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/opportunites-1dQo-MkC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11f9-DCSWtkCa4ZBI2YdCG0GmPLsHlMg\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 4601,
		"path": "../public/assets/opportunites-1dQo-MkC.js"
	},
	"/assets/lightbulb-LCigR8k1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-61RP2fKl80ukEBWV2LQMNhuhiFU\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 478,
		"path": "../public/assets/lightbulb-LCigR8k1.js"
	},
	"/assets/index-_kt8Kppi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b96d4-FYAQxCNFUFPkwQKvPMiA39XxCsU\"",
		"mtime": "2026-08-31T20:33:44.162Z",
		"size": 759508,
		"path": "../public/assets/index-_kt8Kppi.js"
	},
	"/assets/parametres-nmLfsYL4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a96-8tou2018hgmL3znbRxw1vlfb9MQ\"",
		"mtime": "2026-08-31T20:33:44.165Z",
		"size": 6806,
		"path": "../public/assets/parametres-nmLfsYL4.js"
	},
	"/assets/pdf-BewHWJNF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7721d-Mh8ytY69vkqofzjmf0OFZyJ5JG8\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 487965,
		"path": "../public/assets/pdf-BewHWJNF.js"
	},
	"/assets/pdf.worker.min-D7i8o3wR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41-CPhEVVLaZKiiJ9+rrs2oG2wFT7c\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 65,
		"path": "../public/assets/pdf.worker.min-D7i8o3wR.js"
	},
	"/assets/phone-Cb0sIOx4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-UN+DtStsFRf4D3eKFlO0aAbSBGo\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 310,
		"path": "../public/assets/phone-Cb0sIOx4.js"
	},
	"/assets/profil-cloud-DEXVZR97.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ca0-K41bnCMzUdOM94p5SAvcOVLiYCM\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 7328,
		"path": "../public/assets/profil-cloud-DEXVZR97.js"
	},
	"/assets/redaction.functions-Bdtv2BCI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dc-slH78g33o4XRer3cYPSpx9vuPBg\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 476,
		"path": "../public/assets/redaction.functions-Bdtv2BCI.js"
	},
	"/assets/redirect-DtIAAt0y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1-KhpEIx1LNSnb7dNYxiNI58wV9MY\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 481,
		"path": "../public/assets/redirect-DtIAAt0y.js"
	},
	"/assets/progress-W6bmnUtd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f1-tx4zl4govEm9sol1zQhZJUaI6VI\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 2289,
		"path": "../public/assets/progress-W6bmnUtd.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/rotate-ccw-M0IXxanH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-TlBstHfpSx56ycg5r++leN7kR4Y\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 188,
		"path": "../public/assets/rotate-ccw-M0IXxanH.js"
	},
	"/assets/select-PwxGnBYn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd03-RrDOko0tviN/VBdqhzO+aih2eLQ\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 48387,
		"path": "../public/assets/select-PwxGnBYn.js"
	},
	"/assets/send-D1FlSFUX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-vh9wr1tNOBvS/JygiWHI0xGDBmg\"",
		"mtime": "2026-08-31T20:33:44.167Z",
		"size": 278,
		"path": "../public/assets/send-D1FlSFUX.js"
	},
	"/assets/profil-CGcxOtnP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ecdd-+8UZZICrdn3nRJ9OBZbVuaiXRQI\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 126173,
		"path": "../public/assets/profil-CGcxOtnP.js"
	},
	"/assets/tabs-DOiIhc28.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d6c-SxfzGIF0KIJ15EXv88SeZsnzmAE\"",
		"mtime": "2026-08-31T20:33:44.167Z",
		"size": 7532,
		"path": "../public/assets/tabs-DOiIhc28.js"
	},
	"/assets/triangle-alert-DgmmhZQA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-/0Xvjo6wKn+r7jN51+bJjrcjmgI\"",
		"mtime": "2026-08-31T20:33:44.167Z",
		"size": 253,
		"path": "../public/assets/triangle-alert-DgmmhZQA.js"
	},
	"/assets/useCandidatures-Dmig1626.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"789-sfyBf0fYm/UaIkevTHnrhOHtxDE\"",
		"mtime": "2026-08-31T20:33:44.167Z",
		"size": 1929,
		"path": "../public/assets/useCandidatures-Dmig1626.js"
	},
	"/assets/useProfil-CHadhD9S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-00ghJ7x+9g73aFBxfFQvRtB0DSM\"",
		"mtime": "2026-08-31T20:33:44.167Z",
		"size": 400,
		"path": "../public/assets/useProfil-CHadhD9S.js"
	},
	"/assets/useServerFn-BaYtNX8K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-zjMB5V8rtnINRdXXyegNAfTiRlk\"",
		"mtime": "2026-08-31T20:33:44.167Z",
		"size": 407,
		"path": "../public/assets/useServerFn-BaYtNX8K.js"
	},
	"/assets/useSession-DsXJsQop.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34a-YSk1f7iJLOXvR7roiyZNUggHOj8\"",
		"mtime": "2026-08-31T20:33:44.167Z",
		"size": 842,
		"path": "../public/assets/useSession-DsXJsQop.js"
	},
	"/assets/styles-B3kAja6s.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"263ab-eFskupuwc9C+uGDiB6NMgSsthks\"",
		"mtime": "2026-08-31T20:33:44.169Z",
		"size": 156587,
		"path": "../public/assets/styles-B3kAja6s.css"
	},
	"/assets/routes-CkVNcQP_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87f6-TTE6ooclGFXbr4f/wg20jticBi0\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 34806,
		"path": "../public/assets/routes-CkVNcQP_.js"
	},
	"/assets/profil-completion-Ba1ixaB_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a61-CYLOeRMmlL8z1nv1LqUZC9aJQEo\"",
		"mtime": "2026-08-31T20:33:44.166Z",
		"size": 6753,
		"path": "../public/assets/profil-completion-Ba1ixaB_.js"
	},
	"/assets/useStore-D1ICS8_H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25e1-SURofZbU1M+gIR3BmCjql0b7qfc\"",
		"mtime": "2026-08-31T20:33:44.167Z",
		"size": 9697,
		"path": "../public/assets/useStore-D1ICS8_H.js"
	},
	"/assets/pdf.worker.min-BmVo14Nb.mjs": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1418aa-Lz7lnu+KQz6qCgkYkL1GAASHcgc\"",
		"mtime": "2026-08-31T20:33:44.169Z",
		"size": 1317034,
		"path": "../public/assets/pdf.worker.min-BmVo14Nb.mjs"
	},
	"/assets/xlsx-B6LBHFmH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6783b-CFWWvud0zPgLQcRUhQjJnNrq3yg\"",
		"mtime": "2026-08-31T20:33:44.167Z",
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
