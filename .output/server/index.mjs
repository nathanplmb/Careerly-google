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
		"mtime": "2026-08-31T21:26:12.098Z",
		"size": 3286,
		"path": "../public/favicon.png"
	},
	"/nacora-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"7c4-6R8uK8ZroZxZSkFo7cwhXzvTJCc\"",
		"mtime": "2026-08-31T21:26:12.098Z",
		"size": 1988,
		"path": "../public/nacora-logo.svg"
	},
	"/nacora-mark.svg": {
		"type": "image/svg+xml",
		"etag": "\"29a-kDeCDcgNGKqZozQ9CZ/EnKnUPC4\"",
		"mtime": "2026-08-31T21:26:12.098Z",
		"size": 666,
		"path": "../public/nacora-mark.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-31T21:26:12.098Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AiContextCard-wbMlPLcA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1828-woTpWhKxSFY48nPWzsO/5BdRz3E\"",
		"mtime": "2026-08-31T21:26:09.331Z",
		"size": 6184,
		"path": "../public/assets/AiContextCard-wbMlPLcA.js"
	},
	"/assets/AppShell-Cmck22UZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d39-9Azh2e/S+o5A/oy/ZdWuA2sIQY4\"",
		"mtime": "2026-08-31T21:26:09.331Z",
		"size": 15673,
		"path": "../public/assets/AppShell-Cmck22UZ.js"
	},
	"/assets/CandidatureSheet-DsJMLdkX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f18-PbU0ybDc71o3QoRL2CSBZASD9Pg\"",
		"mtime": "2026-08-31T21:26:09.331Z",
		"size": 12056,
		"path": "../public/assets/CandidatureSheet-DsJMLdkX.js"
	},
	"/assets/ImportIaDialog-oBY5Zs9N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7fa-KMaH5MH6BlUbRIY/iEQPtJsMJHo\"",
		"mtime": "2026-08-31T21:26:09.331Z",
		"size": 2042,
		"path": "../public/assets/ImportIaDialog-oBY5Zs9N.js"
	},
	"/assets/Logo-BzB7YJf1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a093-o36OGIA/3hA6CciAqAbhmMYVk0c\"",
		"mtime": "2026-08-31T21:26:09.331Z",
		"size": 41107,
		"path": "../public/assets/Logo-BzB7YJf1.js"
	},
	"/assets/MatchBadge-D2M4IRoM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e7-k9pBJNDDsrfRQLOX7WHcyLG/few\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 743,
		"path": "../public/assets/MatchBadge-D2M4IRoM.js"
	},
	"/assets/MatchPanel-C3DF3gwt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae0-QI7uYsiR8inZLuNnudFBJFlGSG0\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 6880,
		"path": "../public/assets/MatchPanel-C3DF3gwt.js"
	},
	"/assets/StatutBadge-DqpCZIH-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a4-WALpGZmdMxrcKznZ7SFGZtfoXKQ\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 676,
		"path": "../public/assets/StatutBadge-DqpCZIH-.js"
	},
	"/assets/UsageIaCard-mt7mQgiJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"285a-Np2htFDYEVoESNSiD57vdCaSKo8\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 10330,
		"path": "../public/assets/UsageIaCard-mt7mQgiJ.js"
	},
	"/assets/_._lovable.oauth.consent-CJ53tM4r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f9-u1fA1tkeSzssSAT24+lLQSZwxuI\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 1529,
		"path": "../public/assets/_._lovable.oauth.consent-CJ53tM4r.js"
	},
	"/assets/_._lovable.oauth.consent-Cr9ks-JT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162-d2jYnbmqDnwMH/ajVsIwPhIyJyw\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 354,
		"path": "../public/assets/_._lovable.oauth.consent-Cr9ks-JT.js"
	},
	"/assets/accordion-8l0yhJsb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c00-MJkkrFGrPzakmsgrQStTvB+GPW4\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 7168,
		"path": "../public/assets/accordion-8l0yhJsb.js"
	},
	"/assets/arrow-right-lKibUqD6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-SaFChodDzrV+GDQlptuZAInUOaM\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 153,
		"path": "../public/assets/arrow-right-lKibUqD6.js"
	},
	"/assets/assistant-CtIaGEjt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-P/khyrvZ7xc7k7TgidHdryZwy5M\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 142,
		"path": "../public/assets/assistant-CtIaGEjt.js"
	},
	"/assets/assistant.connect-BSOBHy7v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"305e-/IMmOWgcOyAjd+PXpAKfPgM3Xig\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 12382,
		"path": "../public/assets/assistant.connect-BSOBHy7v.js"
	},
	"/assets/assistant.index-SojYCkqr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a2d-C5T4aTsZNVG0xPp10EfwLMephsQ\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 68141,
		"path": "../public/assets/assistant.index-SojYCkqr.js"
	},
	"/assets/assistant.interview-DJZWvvkz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15aa-YIDY9Q68PV4BJ+/owwaooSv+YPY\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 5546,
		"path": "../public/assets/assistant.interview-DJZWvvkz.js"
	},
	"/assets/assistant.linkedin-CkClduZH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148d-rTHpVh2JZqZs4b2PhmRTwNVsmC0\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 5261,
		"path": "../public/assets/assistant.linkedin-CkClduZH.js"
	},
	"/assets/assistant.match-CEVqM_g1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144e-0BFhFRUktZHib10bOhiJ4hHAugA\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 5198,
		"path": "../public/assets/assistant.match-CEVqM_g1.js"
	},
	"/assets/bot-DwabmE8k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-L3Y2eKN7o9BaT98aHMkMZlHJRJE\"",
		"mtime": "2026-08-31T21:26:09.332Z",
		"size": 316,
		"path": "../public/assets/bot-DwabmE8k.js"
	},
	"/assets/briefcase--ZdJUC-4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-bBn8HYvTnpKzBkcK3Py2CV8XnEw\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 208,
		"path": "../public/assets/briefcase--ZdJUC-4.js"
	},
	"/assets/button-Fem7RhN8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb19-LL0azh/K4oVW2/EcfaQLyH3Kfpg\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 51993,
		"path": "../public/assets/button-Fem7RhN8.js"
	},
	"/assets/calendar-clock-CoDi51GC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-vcLtkA3JJzAoz4mNtQp48BVos3E\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 366,
		"path": "../public/assets/calendar-clock-CoDi51GC.js"
	},
	"/assets/calendrier-BqNwFASA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170a-EmI+mqmYy/nQgvXdwSzaw6F63Qw\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 5898,
		"path": "../public/assets/calendrier-BqNwFASA.js"
	},
	"/assets/candidatures-C8LNTDxP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3692-/euL632qpSmnpW7DqzzfE5PwFM4\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 13970,
		"path": "../public/assets/candidatures-C8LNTDxP.js"
	},
	"/assets/candidatures-cloud-Bz-3evqO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b3-iNOufjlCiYtoxucrtG2Of1ehJWI\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 1971,
		"path": "../public/assets/candidatures-cloud-Bz-3evqO.js"
	},
	"/assets/chevron-left-BhPYXx2p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-0U1ZuU+IfqMQ486p5Px+lZeWQY8\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 118,
		"path": "../public/assets/chevron-left-BhPYXx2p.js"
	},
	"/assets/chevron-right-DRjUoTJ5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-gBaw/rmCInyv+WH382B49KRhgCs\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 118,
		"path": "../public/assets/chevron-right-DRjUoTJ5.js"
	},
	"/assets/contacts-DUaglYia.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"356a-DQ3AvrtbaGixevwNHancIp0axOI\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 13674,
		"path": "../public/assets/contacts-DUaglYia.js"
	},
	"/assets/contacts-cloud-Ck8LUPeM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"509-QDrNpB9D7CZ00MuWGYlpBJGcBaw\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 1289,
		"path": "../public/assets/contacts-cloud-Ck8LUPeM.js"
	},
	"/assets/cv-fichier-sn65VqGu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8be-nLle99fa5vTn+AhlTqnckDlMP1k\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 2238,
		"path": "../public/assets/cv-fichier-sn65VqGu.js"
	},
	"/assets/dist-CXZujVGt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cba-VUzGA/xTJjUDBI9IaoBhqkurPAk\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 7354,
		"path": "../public/assets/dist-CXZujVGt.js"
	},
	"/assets/documents-8Kb9bwau.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"129a-qlmFan8qHvAJxjHE3eKvPeId4C8\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 4762,
		"path": "../public/assets/documents-8Kb9bwau.js"
	},
	"/assets/download-CmU-iR4-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-lHNsc5R8G9C2QXTGq1DN1HyNxKc\"",
		"mtime": "2026-08-31T21:26:09.333Z",
		"size": 220,
		"path": "../public/assets/download-CmU-iR4-.js"
	},
	"/assets/dropdown-menu-DMQyrZ-I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50ee-EMC8KmLcRrqiOne4rXvFvEAKn2I\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 20718,
		"path": "../public/assets/dropdown-menu-DMQyrZ-I.js"
	},
	"/assets/entreprises-DtT_sQhq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b6d-JnvOiLfcSSVgZQgWwFzufbZKs48\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 7021,
		"path": "../public/assets/entreprises-DtT_sQhq.js"
	},
	"/assets/external-link-Hum5k663.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-O72IsaHrwvZR3Ir/RkOR/l8PNZs\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 239,
		"path": "../public/assets/external-link-Hum5k663.js"
	},
	"/assets/import-xYEi0UvU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53f8-FVIx6FHxDZq+XDNv9yumzhfKWJ0\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 21496,
		"path": "../public/assets/import-xYEi0UvU.js"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 961,
		"path": "../public/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/lightbulb-DPtW-t0j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-4H5swlQHxhMCvXGXDRNwJculKR0\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 478,
		"path": "../public/assets/lightbulb-DPtW-t0j.js"
	},
	"/assets/log-out-Brxkfa6q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-3VGVj4HMi2YVcbjJVVXvvBXSrlM\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 396,
		"path": "../public/assets/log-out-Brxkfa6q.js"
	},
	"/assets/map-pin-BWhu6I70.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-enFOeQkF/moSPzhHqLSNX/rl2Rg\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 247,
		"path": "../public/assets/map-pin-BWhu6I70.js"
	},
	"/assets/match-run-CCn1_Nrs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1263-GpDhZ3hWS8XXfRkVTc/fvoyx0iQ\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 4707,
		"path": "../public/assets/match-run-CCn1_Nrs.js"
	},
	"/assets/message-square-quote-CIEHMFQ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d-p6rOuetNM30OGN9YJNZRBlMmgxU\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 333,
		"path": "../public/assets/message-square-quote-CIEHMFQ_.js"
	},
	"/assets/modal-C5R99SRH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"447-UVB6sgK2dy44mvZjGjfCjOIkE4U\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 1095,
		"path": "../public/assets/modal-C5R99SRH.js"
	},
	"/assets/index-DZFXxDuZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b921b-5Fb9o3UYsZ6I+/2aeVqQ90Z80nk\"",
		"mtime": "2026-08-31T21:26:09.331Z",
		"size": 758299,
		"path": "../public/assets/index-DZFXxDuZ.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/opportunites-ByG9pEQZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11f9-Ttejq+TnHCiGY/uP+dNRf50qCRo\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 4601,
		"path": "../public/assets/opportunites-ByG9pEQZ.js"
	},
	"/assets/parametres-BW49NPIP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a96-quAVNL6n279msuCpky/zLOAWej0\"",
		"mtime": "2026-08-31T21:26:09.334Z",
		"size": 6806,
		"path": "../public/assets/parametres-BW49NPIP.js"
	},
	"/assets/pdf-BHo00ir0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7721d-+nVdqreswZT/X6Z+aoGITRB6Kp8\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 487965,
		"path": "../public/assets/pdf-BHo00ir0.js"
	},
	"/assets/pdf.worker.min-D7i8o3wR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41-CPhEVVLaZKiiJ9+rrs2oG2wFT7c\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 65,
		"path": "../public/assets/pdf.worker.min-D7i8o3wR.js"
	},
	"/assets/profil-cloud-6Wxfcptp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ccd-VpxerdT3qzRDfEnXPTF+d5i9XNI\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 7373,
		"path": "../public/assets/profil-cloud-6Wxfcptp.js"
	},
	"/assets/profil-DH0M_k2c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed81-77G+Hum4wumR+gzAGpepE4UGLkA\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 126337,
		"path": "../public/assets/profil-DH0M_k2c.js"
	},
	"/assets/redaction.functions-B9YibjQT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dc-xdjgTcEC0Nj4aPCEuFzKRmp1Eeg\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 476,
		"path": "../public/assets/redaction.functions-B9YibjQT.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/rotate-ccw-BIzOzO24.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-XyhV3fdXN8KJ9tpVN0yrlXaoXVM\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 188,
		"path": "../public/assets/rotate-ccw-BIzOzO24.js"
	},
	"/assets/redirect-DtIAAt0y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1-KhpEIx1LNSnb7dNYxiNI58wV9MY\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 481,
		"path": "../public/assets/redirect-DtIAAt0y.js"
	},
	"/assets/select-tdZ7gVuq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd03-Do9EAiFv1TfV323Uqmt+fA2U68I\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 48387,
		"path": "../public/assets/select-tdZ7gVuq.js"
	},
	"/assets/send-Zkk9i-1X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-4Uc2w6dUGiKujAMidn+2FwXOMdA\"",
		"mtime": "2026-08-31T21:26:09.336Z",
		"size": 278,
		"path": "../public/assets/send-Zkk9i-1X.js"
	},
	"/assets/styles-IEtdfT5k.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"265d7-4wAej/Heacz8T7q1qcLl9TARdyM\"",
		"mtime": "2026-08-31T21:26:09.338Z",
		"size": 157143,
		"path": "../public/assets/styles-IEtdfT5k.css"
	},
	"/assets/tabs-CrTge2dX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d6c-/IzsnjMvkar86+eiIWMeiEwCjtM\"",
		"mtime": "2026-08-31T21:26:09.336Z",
		"size": 7532,
		"path": "../public/assets/tabs-CrTge2dX.js"
	},
	"/assets/triangle-alert-Eve6ocHQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-AqEEq9xx6Q+pWuJwPlOx4FhheAw\"",
		"mtime": "2026-08-31T21:26:09.336Z",
		"size": 253,
		"path": "../public/assets/triangle-alert-Eve6ocHQ.js"
	},
	"/assets/useCandidatures-BOdgvO68.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"789-lCtiYxBXL/WbroO5e4ZYkoU/QoQ\"",
		"mtime": "2026-08-31T21:26:09.336Z",
		"size": 1929,
		"path": "../public/assets/useCandidatures-BOdgvO68.js"
	},
	"/assets/useProfil-qyIeWCSA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-Q1ky32uABNLFnnV7wXIyuHzNjz0\"",
		"mtime": "2026-08-31T21:26:09.336Z",
		"size": 400,
		"path": "../public/assets/useProfil-qyIeWCSA.js"
	},
	"/assets/useServerFn-BaYtNX8K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-zjMB5V8rtnINRdXXyegNAfTiRlk\"",
		"mtime": "2026-08-31T21:26:09.336Z",
		"size": 407,
		"path": "../public/assets/useServerFn-BaYtNX8K.js"
	},
	"/assets/progress-BJzTy9Wy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f1-6IG3gKicNgpCIjjxuV8W0ApdQO0\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 2289,
		"path": "../public/assets/progress-BJzTy9Wy.js"
	},
	"/assets/routes-CBLYTQHZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87ee-TPSKGYYrGgJES+vKdH3mL+uH0D0\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 34798,
		"path": "../public/assets/routes-CBLYTQHZ.js"
	},
	"/assets/phone-DcfUvp2v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-yCmWm1NlXMGbYhnbX9gVyh50unA\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 310,
		"path": "../public/assets/phone-DcfUvp2v.js"
	},
	"/assets/useSession-DOotVinU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34a-6IjFmj193nitTsYdiWQXQtzdQmM\"",
		"mtime": "2026-08-31T21:26:09.336Z",
		"size": 842,
		"path": "../public/assets/useSession-DOotVinU.js"
	},
	"/assets/profil-completion-Ba1ixaB_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a61-CYLOeRMmlL8z1nv1LqUZC9aJQEo\"",
		"mtime": "2026-08-31T21:26:09.335Z",
		"size": 6753,
		"path": "../public/assets/profil-completion-Ba1ixaB_.js"
	},
	"/assets/pdf.worker.min-BmVo14Nb.mjs": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1418aa-Lz7lnu+KQz6qCgkYkL1GAASHcgc\"",
		"mtime": "2026-08-31T21:26:09.338Z",
		"size": 1317034,
		"path": "../public/assets/pdf.worker.min-BmVo14Nb.mjs"
	},
	"/assets/useStore-D1ICS8_H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25e1-SURofZbU1M+gIR3BmCjql0b7qfc\"",
		"mtime": "2026-08-31T21:26:09.336Z",
		"size": 9697,
		"path": "../public/assets/useStore-D1ICS8_H.js"
	},
	"/assets/xlsx-B6LBHFmH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6783b-CFWWvud0zPgLQcRUhQjJnNrq3yg\"",
		"mtime": "2026-08-31T21:26:09.336Z",
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
