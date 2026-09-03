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
		"mtime": "2026-09-02T07:15:55.701Z",
		"size": 3286,
		"path": "../public/favicon.png"
	},
	"/nacora-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"7c4-6R8uK8ZroZxZSkFo7cwhXzvTJCc\"",
		"mtime": "2026-09-02T07:15:55.701Z",
		"size": 1988,
		"path": "../public/nacora-logo.svg"
	},
	"/nacora-mark.svg": {
		"type": "image/svg+xml",
		"etag": "\"29a-kDeCDcgNGKqZozQ9CZ/EnKnUPC4\"",
		"mtime": "2026-09-02T07:15:55.701Z",
		"size": 666,
		"path": "../public/nacora-mark.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-02T07:15:55.701Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/CandidatureSheet-vgKVBDkj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c00-2221Wve9H8jPxJl0eEn6pobY/IA\"",
		"mtime": "2026-09-02T07:15:53.404Z",
		"size": 11264,
		"path": "../public/assets/CandidatureSheet-vgKVBDkj.js"
	},
	"/assets/_._lovable.oauth.consent-6uVAV55T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"230-pb536YnLu8/PkrFBSJwuvQIp2o4\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 560,
		"path": "../public/assets/_._lovable.oauth.consent-6uVAV55T.js"
	},
	"/assets/_._lovable.oauth.consent-thjcx9OM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"857-9P/gfwQK1U4oW+FO+g0s2M1f4ek\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 2135,
		"path": "../public/assets/_._lovable.oauth.consent-thjcx9OM.js"
	},
	"/assets/arrow-right-aMGMFyI_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-vc13BF4+a7lAkgTgkSQaC6v1s6U\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 153,
		"path": "../public/assets/arrow-right-aMGMFyI_.js"
	},
	"/assets/auth-CqSxsYlz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29dfd-rBOHfPAkbvX4F7S+JJcPMCRlUOw\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 171517,
		"path": "../public/assets/auth-CqSxsYlz.js"
	},
	"/assets/biometric-DAo4iYrU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"907-9+PhLQ1NzjXLzupGXumKXQzvD5c\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 2311,
		"path": "../public/assets/biometric-DAo4iYrU.js"
	},
	"/assets/briefcase-CP32_3wh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-vJgxic01z3OqeJDXsMwLk9PbKWM\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 208,
		"path": "../public/assets/briefcase-CP32_3wh.js"
	},
	"/assets/button-C9q4KoLk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d79-XfKlW2TSqdF1RrnTOMBwXKuCMlU\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 32121,
		"path": "../public/assets/button-C9q4KoLk.js"
	},
	"/assets/calendar-clock-Czhm0fqi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-lcIsUiI3ctAH29qhxj4Vhgajagk\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 366,
		"path": "../public/assets/calendar-clock-Czhm0fqi.js"
	},
	"/assets/calendrier-D9qVf-vL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ba-t+zyvBVVOqJHKcDcsLR0+D/RYRg\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 8378,
		"path": "../public/assets/calendrier-D9qVf-vL.js"
	},
	"/assets/candidatures-BkrIAXf1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e29-jlGi3Fg+7I4J+8H/oFYp1P2vS+I\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 7721,
		"path": "../public/assets/candidatures-BkrIAXf1.js"
	},
	"/assets/candidatures-CIp_OYI9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14af-A511lr3SMb6iuvdSqVU1sLWKM10\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 5295,
		"path": "../public/assets/candidatures-CIp_OYI9.js"
	},
	"/assets/candidatures-cloud-DK6wj5ww.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"985-MbQiDAUfT0IKxSSs5eafInh2NUM\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 2437,
		"path": "../public/assets/candidatures-cloud-DK6wj5ww.js"
	},
	"/assets/chevron-left-Cjlll4dT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-DZftR3c78LTfUubpP7oItsMbGi0\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 118,
		"path": "../public/assets/chevron-left-Cjlll4dT.js"
	},
	"/assets/chevron-right-BIfHuDK-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-ceGDJ6hu6yDtM7q9Dehme8F+qWM\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 118,
		"path": "../public/assets/chevron-right-BIfHuDK-.js"
	},
	"/assets/circle-check-GmpM-Xa-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6-XMse9OjAq0SXFx9ZiZ4Sus08wUo\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 166,
		"path": "../public/assets/circle-check-GmpM-Xa-.js"
	},
	"/assets/client-Bs6hN7DW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3be7c-fZxCSXyxiWNyLd6WbQsVzky85Ec\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 245372,
		"path": "../public/assets/client-Bs6hN7DW.js"
	},
	"/assets/contacts-DgI2DP4i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5679-rdRBviMblQZwVbvIfHXcU+qNj48\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 22137,
		"path": "../public/assets/contacts-DgI2DP4i.js"
	},
	"/assets/contacts-TnBQz-RG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51a-arcqH0tmTFwJHQyouq0ba25gAtQ\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 1306,
		"path": "../public/assets/contacts-TnBQz-RG.js"
	},
	"/assets/contacts-cloud-Dq5No0-3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"780-VjXCAzkcBS/een4I0/GBtxaNJCU\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 1920,
		"path": "../public/assets/contacts-cloud-Dq5No0-3.js"
	},
	"/assets/Logo-CrASQVU6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89144-4QXeBELD43C4MSUBsdqJfYftGAo\"",
		"mtime": "2026-09-02T07:15:53.405Z",
		"size": 561476,
		"path": "../public/assets/Logo-CrASQVU6.js"
	},
	"/assets/documents-D782mAzs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f07-HMWevVqNJMbL5CHBrt1SvhTCpOk\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 3847,
		"path": "../public/assets/documents-D782mAzs.js"
	},
	"/assets/entreprises-DJksmRb6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29e7-1rN+beezACH8I7v8Aip7lhoI/8c\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 10727,
		"path": "../public/assets/entreprises-DJksmRb6.js"
	},
	"/assets/es2015-BeGNoCJP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77b1-oj6AZ5+HztBEtGAlO0rr2hRCbMk\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 30641,
		"path": "../public/assets/es2015-BeGNoCJP.js"
	},
	"/assets/external-link-BfNhuIYu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-dtpPwH986zyLBtA0cWF76gFrFpI\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 239,
		"path": "../public/assets/external-link-BfNhuIYu.js"
	},
	"/assets/globe-QFlDznmV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-ZReBA+NL1OOqSPy6aSwLud59QVk\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 230,
		"path": "../public/assets/globe-QFlDznmV.js"
	},
	"/assets/download-qOqrO2yu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-DRSgOp+IfaVwEmwmppM+fRafwWQ\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 220,
		"path": "../public/assets/download-qOqrO2yu.js"
	},
	"/assets/graduation-cap-CNv1IwEC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20b-I8lg71DLfH+nXslfTxDG7UGAgnY\"",
		"mtime": "2026-09-02T07:15:53.407Z",
		"size": 523,
		"path": "../public/assets/graduation-cap-CNv1IwEC.js"
	},
	"/assets/dialog-p_ytDQwx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1afb-zBDTPBYJUFTl8hlYMdCE6vhapfI\"",
		"mtime": "2026-09-02T07:15:53.406Z",
		"size": 6907,
		"path": "../public/assets/dialog-p_ytDQwx.js"
	},
	"/assets/import-BGbYW2nc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79bf-5eqj1ULwREa++y2Dqe3f3u5jKkk\"",
		"mtime": "2026-09-02T07:15:53.407Z",
		"size": 31167,
		"path": "../public/assets/import-BGbYW2nc.js"
	},
	"/assets/jsx-dev-runtime-C8Mf5bcE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6305-PB2kkAJfHlH2CXENxKrOTPKArCY\"",
		"mtime": "2026-09-02T07:15:53.407Z",
		"size": 25349,
		"path": "../public/assets/jsx-dev-runtime-C8Mf5bcE.js"
	},
	"/assets/label-D1PLNW41.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d2-GK1RtuY7w+iB72wbNN0l47lWaMw\"",
		"mtime": "2026-09-02T07:15:53.408Z",
		"size": 1490,
		"path": "../public/assets/label-D1PLNW41.js"
	},
	"/assets/lazyRouteComponent-CpijvBIC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11f1-DGW+t8emx2kvLEm4IbmvVSpsaOc\"",
		"mtime": "2026-09-02T07:15:53.408Z",
		"size": 4593,
		"path": "../public/assets/lazyRouteComponent-CpijvBIC.js"
	},
	"/assets/loader-circle-DAa5NSDG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84-0u+xASANC9dlGSV2H8ljTyE4osI\"",
		"mtime": "2026-09-02T07:15:53.408Z",
		"size": 132,
		"path": "../public/assets/loader-circle-DAa5NSDG.js"
	},
	"/assets/log-out-DWsX00Pd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-15sW93YnnOEGrVx0F9d/HQsgs3w\"",
		"mtime": "2026-09-02T07:15:53.408Z",
		"size": 396,
		"path": "../public/assets/log-out-DWsX00Pd.js"
	},
	"/assets/map-pin-Dhpuw6ZE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-Dk5nlUvu4sonFQ4W9Cwtb735v+A\"",
		"mtime": "2026-09-02T07:15:53.408Z",
		"size": 247,
		"path": "../public/assets/map-pin-Dhpuw6ZE.js"
	},
	"/assets/modal-BEIYTlio.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"622-BR1hZDsEPKTRqYPfQPzjB8xAU50\"",
		"mtime": "2026-09-02T07:15:53.408Z",
		"size": 1570,
		"path": "../public/assets/modal-BEIYTlio.js"
	},
	"/assets/mammoth.browser-Cylg7AAE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"781a7-TXohfYHHxOPAdvyll3afYr6uNfo\"",
		"mtime": "2026-09-02T07:15:53.408Z",
		"size": 491943,
		"path": "../public/assets/mammoth.browser-Cylg7AAE.js"
	},
	"/assets/pdf.worker.min-D7i8o3wR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41-CPhEVVLaZKiiJ9+rrs2oG2wFT7c\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 65,
		"path": "../public/assets/pdf.worker.min-D7i8o3wR.js"
	},
	"/assets/opportunites-xhULM7kG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1809-y4eDjnA4aN4oykWopfwK0liOQ6E\"",
		"mtime": "2026-09-02T07:15:53.408Z",
		"size": 6153,
		"path": "../public/assets/opportunites-xhULM7kG.js"
	},
	"/assets/phone-DnxrrFEK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-6I1gK4tuFZw0Uq2ku2CX121k34Y\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 310,
		"path": "../public/assets/phone-DnxrrFEK.js"
	},
	"/assets/parametres-ECMoKcPm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25a3-qlo1KGEJvLaXftjWrtOGqfxfacQ\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 9635,
		"path": "../public/assets/parametres-ECMoKcPm.js"
	},
	"/assets/preload-helper-Czpn1I53.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac-sE+5KsaRXTMfwOfrOATQajMSGV4\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 1196,
		"path": "../public/assets/preload-helper-Czpn1I53.js"
	},
	"/assets/index-CNLCrcoA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86484-wb0/SWRPmwkgORk1SRvKdGsmtvQ\"",
		"mtime": "2026-09-02T07:15:53.404Z",
		"size": 550020,
		"path": "../public/assets/index-CNLCrcoA.js"
	},
	"/assets/pdf-DV2XDCc3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77225-VTWLwRmyutI5SjurH48mj2QI5JI\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 487973,
		"path": "../public/assets/pdf-DV2XDCc3.js"
	},
	"/assets/pdf.worker.min-BmVo14Nb.mjs": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1418aa-Lz7lnu+KQz6qCgkYkL1GAASHcgc\"",
		"mtime": "2026-09-02T07:15:53.411Z",
		"size": 1317034,
		"path": "../public/assets/pdf.worker.min-BmVo14Nb.mjs"
	},
	"/assets/routes-B1WhGKPP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3bb-us7DzUlMPmMrqDtM+73Dx8hcb6A\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 54203,
		"path": "../public/assets/routes-B1WhGKPP.js"
	},
	"/assets/select-DxjNIH3l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de68-C2E564uuodRpkA4AdwAR9bwYsa8\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 56936,
		"path": "../public/assets/select-DxjNIH3l.js"
	},
	"/assets/sparkles-B9ts9DGd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-qTf1Ix2WLSTxlhZBCi0LCBAfrB0\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 482,
		"path": "../public/assets/sparkles-B9ts9DGd.js"
	},
	"/assets/styles-CyMxtGTZ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2328e-XokzrKr3D+Bla7yiGMOjL3XNoic\"",
		"mtime": "2026-09-02T07:15:53.412Z",
		"size": 144014,
		"path": "../public/assets/styles-CyMxtGTZ.css"
	},
	"/assets/sync-transfert-DbOWR8G7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ca-EYFpd3XsFsgCwdgr/O6xruolA3g\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 1738,
		"path": "../public/assets/sync-transfert-DbOWR8G7.js"
	},
	"/assets/textarea-CFReprG2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a5-Vaehetf+v1sXWwndELS7bDwq9l0\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 677,
		"path": "../public/assets/textarea-CFReprG2.js"
	},
	"/assets/tabs-BB0_fKFq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e9b-DPJ6dc1SJCj5t4q4xfx+zgnvl+A\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 7835,
		"path": "../public/assets/tabs-BB0_fKFq.js"
	},
	"/assets/trash-2-B-bOurS7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f3-OQTLKAGDNYqCa54Ss1V4Cwg+kpg\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 499,
		"path": "../public/assets/trash-2-B-bOurS7.js"
	},
	"/assets/useCandidatures-Ci1JKoPK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"703-D7Vls/oHfIFnLajNODqCLzK+Uxc\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 1795,
		"path": "../public/assets/useCandidatures-Ci1JKoPK.js"
	},
	"/assets/useNavigate-CueQY5dA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111-d+bVDDElopcqmPQGnsagSin89jM\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 273,
		"path": "../public/assets/useNavigate-CueQY5dA.js"
	},
	"/assets/useProfil-gyQgQKw6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-Pu0TTvxxGtPyXIX66qdGrpq2K9g\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 407,
		"path": "../public/assets/useProfil-gyQgQKw6.js"
	},
	"/assets/profil-cloud-B3aQiL2g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cab-RYmy3aOfr0WZH1826i1WilqOaVs\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 3243,
		"path": "../public/assets/profil-cloud-B3aQiL2g.js"
	},
	"/assets/rolldown-runtime-W7wSyTde.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d3-FfUwnyaEX0ZYTQfKrzQ4hagCHbI\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 979,
		"path": "../public/assets/rolldown-runtime-W7wSyTde.js"
	},
	"/assets/useSession-DjQ2y--b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56fc-lJDoynIwS3hO17zKWKiAA6bvwsU\"",
		"mtime": "2026-09-02T07:15:53.410Z",
		"size": 22268,
		"path": "../public/assets/useSession-DjQ2y--b.js"
	},
	"/assets/profil-CS9qUQ4M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24b3c-ug1YeiTo1E4cRgHMFlPkFGyd2Tg\"",
		"mtime": "2026-09-02T07:15:53.409Z",
		"size": 150332,
		"path": "../public/assets/profil-CS9qUQ4M.js"
	},
	"/assets/xlsx-B6LBHFmH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6783b-CFWWvud0zPgLQcRUhQjJnNrq3yg\"",
		"mtime": "2026-09-02T07:15:53.410Z",
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
