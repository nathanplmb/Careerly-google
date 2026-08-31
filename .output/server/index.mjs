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
		"mtime": "2026-08-31T18:10:11.985Z",
		"size": 3286,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-31T18:10:11.985Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-Cpo-2VWB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3da4-E2CYHF1kyPqCTX6ZTB7u7Sumlfo\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 15780,
		"path": "../public/assets/AppShell-Cpo-2VWB.js"
	},
	"/assets/CandidatureSheet-yexAbhpo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24fd-4ha99N3SrBbCxTA3LqfXWf1/NFw\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 9469,
		"path": "../public/assets/CandidatureSheet-yexAbhpo.js"
	},
	"/assets/ImportIaDialog-8a9Xtak8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"801-dimoSaEnA0bPF6EOb6tfmx1s1O4\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 2049,
		"path": "../public/assets/ImportIaDialog-8a9Xtak8.js"
	},
	"/assets/MatchBadge-BLElbr_K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ed-t9x/7zkEc62MzarelLZCgcNi3Fs\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 749,
		"path": "../public/assets/MatchBadge-BLElbr_K.js"
	},
	"/assets/MatchPanel-DBLKEYRW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae3-Dqnl15NN0mruaXqsO1gq31WbkFI\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 6883,
		"path": "../public/assets/MatchPanel-DBLKEYRW.js"
	},
	"/assets/StatutBadge-DqpCZIH-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a4-WALpGZmdMxrcKznZ7SFGZtfoXKQ\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 676,
		"path": "../public/assets/StatutBadge-DqpCZIH-.js"
	},
	"/assets/_._lovable.oauth.consent-BFhhW1FQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f9-Wba1Ejt1HVWdLY/Tlnf4r63rRys\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 1529,
		"path": "../public/assets/_._lovable.oauth.consent-BFhhW1FQ.js"
	},
	"/assets/_._lovable.oauth.consent-Cr9ks-JT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162-d2jYnbmqDnwMH/ajVsIwPhIyJyw\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 354,
		"path": "../public/assets/_._lovable.oauth.consent-Cr9ks-JT.js"
	},
	"/assets/ai-erreurs-5hNNz0xZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4-KixuvUHCxehM7kUK+xltBexHSmY\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 244,
		"path": "../public/assets/ai-erreurs-5hNNz0xZ.js"
	},
	"/assets/assistant-BLfD1Ivp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-f97IWiWVdkV1+mfF7PiV2OGOpMg\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 142,
		"path": "../public/assets/assistant-BLfD1Ivp.js"
	},
	"/assets/assistant.connect-ByecgQfQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"308b-zFhsHOjo6p4ZENbSVXKstK8K384\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 12427,
		"path": "../public/assets/assistant.connect-ByecgQfQ.js"
	},
	"/assets/assistant.index-Cre8zX0G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36c7-D94inI90WenPCeqCSgDLZVCxdDY\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 14023,
		"path": "../public/assets/assistant.index-Cre8zX0G.js"
	},
	"/assets/assistant.interview-SJJ0XOEr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eeb-x7+dDah8xEfRo5NQa7KjxdbNNRg\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 12011,
		"path": "../public/assets/assistant.interview-SJJ0XOEr.js"
	},
	"/assets/assistant.linkedin-CroYCS9f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"107e-LHOesj0dWfwm/30sJbBHAf5mXWY\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 4222,
		"path": "../public/assets/assistant.linkedin-CroYCS9f.js"
	},
	"/assets/assistant.match-DM2PwuA5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1130-j1ZO80+dg3B23gAch7r519EppaU\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 4400,
		"path": "../public/assets/assistant.match-DM2PwuA5.js"
	},
	"/assets/auth-middleware-DIJT4r9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116e-9gLLZcYIMHudpVTL0GHDlAg9yIE\"",
		"mtime": "2026-08-31T18:10:07.911Z",
		"size": 4462,
		"path": "../public/assets/auth-middleware-DIJT4r9C.js"
	},
	"/assets/bot-DmcKQc5O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-ewpzUsH5AGL4DTH8+gFL5rrX3yE\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 317,
		"path": "../public/assets/bot-DmcKQc5O.js"
	},
	"/assets/briefcase-CeY_WoFi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d1-MMXeffGanLPlmNWkA+9bUildCwo\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 209,
		"path": "../public/assets/briefcase-CeY_WoFi.js"
	},
	"/assets/button-Fem7RhN8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb19-LL0azh/K4oVW2/EcfaQLyH3Kfpg\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 51993,
		"path": "../public/assets/button-Fem7RhN8.js"
	},
	"/assets/calendar-clock-CNRlFi_Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-Phgthr3EEolDWaMjCXtS5aDIUb8\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 367,
		"path": "../public/assets/calendar-clock-CNRlFi_Q.js"
	},
	"/assets/calendrier-CC4rHTWB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1736-fGYz5/VzarArqISMOvw6v8eBBdo\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 5942,
		"path": "../public/assets/calendrier-CC4rHTWB.js"
	},
	"/assets/candidatures-Cr1hZ-va.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"372a-KGOzQnEZrMPO3oMDXuhrr7HErkE\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 14122,
		"path": "../public/assets/candidatures-Cr1hZ-va.js"
	},
	"/assets/candidatures-cloud-RHzi1KQ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196e-g//Qk9+RIQoBiiYr9IXKQP8Dk5k\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 6510,
		"path": "../public/assets/candidatures-cloud-RHzi1KQ2.js"
	},
	"/assets/chevron-left-CAz9Ry8y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-JttrZR3gA8Mo+Fzeb+H0XpEBQzs\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 119,
		"path": "../public/assets/chevron-left-CAz9Ry8y.js"
	},
	"/assets/chevron-right-Dl4dv6NJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-gdbcp1v3611igsf9Hs4mzxXRY8o\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 119,
		"path": "../public/assets/chevron-right-Dl4dv6NJ.js"
	},
	"/assets/contacts-cloud-CIiPqaUX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf7-Wb9GRuFSC+SFfVO0956LCfvEB6E\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 3063,
		"path": "../public/assets/contacts-cloud-CIiPqaUX.js"
	},
	"/assets/contacts-dgDq8znJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35b4-J4qezjC3YPQaJA0vo1VWoMLXF9Y\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 13748,
		"path": "../public/assets/contacts-dgDq8znJ.js"
	},
	"/assets/copy-cy2MFnHv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-riAyB6hV+STXi2uBybQ9sV85WoM\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 225,
		"path": "../public/assets/copy-cy2MFnHv.js"
	},
	"/assets/cv-fichier-CJ8OWWxf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a1-LKBF/A2FMRlI6Q+/GukaF+hlE98\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 2209,
		"path": "../public/assets/cv-fichier-CJ8OWWxf.js"
	},
	"/assets/dialog-yNguBfpZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"194c-NQl/ptDDx5cyMa9UaGwdOyd0qfQ\"",
		"mtime": "2026-08-31T18:10:07.912Z",
		"size": 6476,
		"path": "../public/assets/dialog-yNguBfpZ.js"
	},
	"/assets/dist-BnvhHo5Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ce-JVWtrApt1ltvNNCwtokZ+AJPuxI\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 5326,
		"path": "../public/assets/dist-BnvhHo5Y.js"
	},
	"/assets/dist-DOkyfGbj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a3-sI+v+qJYzBAARV5GkG2FxHKbFgg\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 675,
		"path": "../public/assets/dist-DOkyfGbj.js"
	},
	"/assets/documents-CRU2i0ty.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e6-3lzRPRGHlaBNyMKOs/CYcAWdEDQ\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 4838,
		"path": "../public/assets/documents-CRU2i0ty.js"
	},
	"/assets/download-BxEdWCgW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd-t1xNmJSYoMGJ+AYjr0ni9b9+GcI\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 221,
		"path": "../public/assets/download-BxEdWCgW.js"
	},
	"/assets/dist-B1U6y1zB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ea1-z6zKzu90MN/4ZkQfiU0SVBrKOtc\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 7841,
		"path": "../public/assets/dist-B1U6y1zB.js"
	},
	"/assets/dist-DqZ0nzYF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"700-z7mN64wDbjMDAsDElJv/c+GKHik\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 1792,
		"path": "../public/assets/dist-DqZ0nzYF.js"
	},
	"/assets/entreprises-FzrINX_h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b75-cnvSJUCUNTO609xqOWkiulo0XtY\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 7029,
		"path": "../public/assets/entreprises-FzrINX_h.js"
	},
	"/assets/external-link-Dbnt9xjS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-/Vy0uTqWeDuqMG6m50uQ1PJAICc\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 240,
		"path": "../public/assets/external-link-Dbnt9xjS.js"
	},
	"/assets/import-DjgSHpJ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51a4-I/XaB2KKaL1/JYu+UfBfQ6LcH4I\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 20900,
		"path": "../public/assets/import-DjgSHpJ-.js"
	},
	"/assets/dropdown-menu-wvpQnbWJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5205-Q3tg+qRoi70WCqBZS9NlpjgZys4\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 20997,
		"path": "../public/assets/dropdown-menu-wvpQnbWJ.js"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 961,
		"path": "../public/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/log-out-P7aQk0bc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-QyA4UOr1AC2lt9h6acy4yo0OCYQ\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 397,
		"path": "../public/assets/log-out-P7aQk0bc.js"
	},
	"/assets/map-pin-COUstaO1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-2pbjrATwE1L12WehfrPr+G+0O28\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 248,
		"path": "../public/assets/map-pin-COUstaO1.js"
	},
	"/assets/match-run-AY-gsQqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cd8-sskmBbA9esUPtjEUaYLfpNlSF1A\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 3288,
		"path": "../public/assets/match-run-AY-gsQqf.js"
	},
	"/assets/modal-wi8KlJTW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44d-C4nqWeIiGmzRNszIdvJBIYetsl8\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 1101,
		"path": "../public/assets/modal-wi8KlJTW.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-08-31T18:10:07.913Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/opportunites-CIgikU5y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120a-K09bcGbOoVK7LgL6rS4eV2Fgm7M\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 4618,
		"path": "../public/assets/opportunites-CIgikU5y.js"
	},
	"/assets/index-Ci5lZt-U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b4354-ebcDtoOO+zfXGBZK05iJXbjsNsk\"",
		"mtime": "2026-08-31T18:10:07.910Z",
		"size": 738132,
		"path": "../public/assets/index-Ci5lZt-U.js"
	},
	"/assets/pdf-sdzcr4gH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7721c-V6yvwfcRy4usR62QUw+lhO55wig\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 487964,
		"path": "../public/assets/pdf-sdzcr4gH.js"
	},
	"/assets/pdf.worker.min-D7i8o3wR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41-CPhEVVLaZKiiJ9+rrs2oG2wFT7c\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 65,
		"path": "../public/assets/pdf.worker.min-D7i8o3wR.js"
	},
	"/assets/parametres-DYEFi_LS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38ac-F2D5q9vL+BOWPcyXOL2Qf0HBm1Y\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 14508,
		"path": "../public/assets/parametres-DYEFi_LS.js"
	},
	"/assets/profil-yK2XzXOK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10aac-st4E79Ytj5FO2q0Eh7RkeuZevxs\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 68268,
		"path": "../public/assets/profil-yK2XzXOK.js"
	},
	"/assets/progress-CHccL5Jz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"911-S/u90Kn4xfui8L8jqANmcQgwiG0\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 2321,
		"path": "../public/assets/progress-CHccL5Jz.js"
	},
	"/assets/phone-WqxGXOT9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137-WAcGxyAyxoEQaJNDv85I7YSO/UY\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 311,
		"path": "../public/assets/phone-WqxGXOT9.js"
	},
	"/assets/redirect-DtIAAt0y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1-KhpEIx1LNSnb7dNYxiNI58wV9MY\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 481,
		"path": "../public/assets/redirect-DtIAAt0y.js"
	},
	"/assets/refresh-cw-C0fkKP6K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-rgHPCZUmCY7lWtki4pDUVYAzByk\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 310,
		"path": "../public/assets/refresh-cw-C0fkKP6K.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/redaction.functions-CKQMSDbD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1da-4kcXEhwVizJdDTGSRHL11JXzxQ0\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 474,
		"path": "../public/assets/redaction.functions-CKQMSDbD.js"
	},
	"/assets/routes-SYfYZoT2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8844-5Ikdn0EDXCizVcM+THqGNNeOMLY\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 34884,
		"path": "../public/assets/routes-SYfYZoT2.js"
	},
	"/assets/profil-cloud-Deg6raY9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60f-7LGX2CR8ZYsomW8XGi6xeJ/Vf6w\"",
		"mtime": "2026-08-31T18:10:07.914Z",
		"size": 1551,
		"path": "../public/assets/profil-cloud-Deg6raY9.js"
	},
	"/assets/select-BG_XNJeu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ff8-jpKIVF3A9jc1WwZdGkFA+Xlc+gs\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 69624,
		"path": "../public/assets/select-BG_XNJeu.js"
	},
	"/assets/styles-Lyioz6zY.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1d42e-E6YBNiqGzD1X9w0zVws0lzpqqnc\"",
		"mtime": "2026-08-31T18:10:07.917Z",
		"size": 119854,
		"path": "../public/assets/styles-Lyioz6zY.css"
	},
	"/assets/tabs-Bqjps6GB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1da7-PI4LY1BjQ7T2+pM5fON5MDOVrNk\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 7591,
		"path": "../public/assets/tabs-Bqjps6GB.js"
	},
	"/assets/textarea-DIqWG7E6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-4HK9pNd/GjnNDrxNN7t2cBUc9Fs\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 551,
		"path": "../public/assets/textarea-DIqWG7E6.js"
	},
	"/assets/useProfil-Cw4walh-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18e-LTdLunRwA8YaV2jL4uclSK+QXNw\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 398,
		"path": "../public/assets/useProfil-Cw4walh-.js"
	},
	"/assets/useServerFn-BaYtNX8K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-zjMB5V8rtnINRdXXyegNAfTiRlk\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 407,
		"path": "../public/assets/useServerFn-BaYtNX8K.js"
	},
	"/assets/useSession-nLtZjdJ5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"349-dKWtoyXxKHw1JbLQ1o92gDtPKgk\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 841,
		"path": "../public/assets/useSession-nLtZjdJ5.js"
	},
	"/assets/useStore-D1ICS8_H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25e1-SURofZbU1M+gIR3BmCjql0b7qfc\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 9697,
		"path": "../public/assets/useStore-D1ICS8_H.js"
	},
	"/assets/xlsx-B6LBHFmH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6783b-CFWWvud0zPgLQcRUhQjJnNrq3yg\"",
		"mtime": "2026-08-31T18:10:07.916Z",
		"size": 423995,
		"path": "../public/assets/xlsx-B6LBHFmH.js"
	},
	"/assets/triangle-alert-CdPAXdGK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-6mykn0n29zMgHqnx65FPh7SP2nA\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 254,
		"path": "../public/assets/triangle-alert-CdPAXdGK.js"
	},
	"/assets/useCandidatures-woEtW4Es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"767-iRDY5N9/CO5T3hl3R5ZIDxQreZU\"",
		"mtime": "2026-08-31T18:10:07.915Z",
		"size": 1895,
		"path": "../public/assets/useCandidatures-woEtW4Es.js"
	},
	"/assets/pdf.worker.min-BmVo14Nb.mjs": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1418aa-Lz7lnu+KQz6qCgkYkL1GAASHcgc\"",
		"mtime": "2026-08-31T18:10:07.917Z",
		"size": 1317034,
		"path": "../public/assets/pdf.worker.min-BmVo14Nb.mjs"
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
