import { c as _enum, d as number, f as object, l as array, p as string, u as boolean } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schema-BG_0AQDk.js
var SourceRefSchema = object({
	text: string().default(""),
	page: number().optional(),
	blockIndex: number().optional()
}).optional();
var ImportWarningSchema = object({
	field: string(),
	message: string(),
	severity: _enum([
		"info",
		"warning",
		"error"
	]).default("warning")
});
var IdentityEntitySchema = object({
	firstName: string().default(""),
	lastName: string().default(""),
	email: string().nullable().default(null),
	phone: string().nullable().default(null),
	city: string().nullable().default(null),
	country: string().nullable().default("France"),
	linkedin: string().nullable().default(null),
	portfolio: string().nullable().default(null),
	github: string().nullable().default(null),
	drivingLicense: string().nullable().default(null),
	mobility: string().nullable().default(null),
	professionalTitle: string().nullable().default(null),
	summary: string().nullable().default(null),
	source: SourceRefSchema
});
var ExperienceEntitySchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	title: string().default(""),
	company: string().default(""),
	location: string().nullable().default(null),
	contractType: string().nullable().default(null),
	startDate: string().nullable().default(null),
	endDate: string().nullable().default(null),
	isCurrent: boolean().default(false),
	responsibilities: array(string()).default([]),
	achievements: array(string()).default([]),
	tools: array(string()).optional().default([]),
	source: SourceRefSchema
});
var EducationEntitySchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	school: string().default(""),
	location: string().nullable().default(null),
	degree: string().default(""),
	specialization: string().nullable().default(null),
	mention: string().nullable().default(null),
	startDate: string().nullable().default(null),
	endDate: string().nullable().default(null),
	isCurrent: boolean().optional().default(false),
	courses: array(string()).optional().default([]),
	source: SourceRefSchema
});
var SkillCategoryEnum = _enum([
	"Commercial",
	"Management",
	"Organisation",
	"Communication",
	"Digital",
	"Outils",
	"Technique",
	"Autre"
]);
var SkillEntitySchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().default(""),
	category: SkillCategoryEnum.default("Autre"),
	level: string().nullable().default(null),
	source: SourceRefSchema
});
var LanguageEntitySchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().default(""),
	level: string().nullable().default(null),
	source: SourceRefSchema
});
var CertificationEntitySchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().default(""),
	score: string().nullable().default(null),
	date: string().nullable().default(null),
	organization: string().nullable().optional().default(null),
	source: SourceRefSchema
});
var ProjectEntitySchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().default(""),
	description: string().default(""),
	type: string().nullable().default(null),
	organization: string().nullable().default(null),
	date: string().nullable().default(null),
	technologies: array(string()).optional().default([]),
	source: SourceRefSchema
});
var InterestEntitySchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().default(""),
	description: string().nullable().default(null),
	source: SourceRefSchema
});
var EngagementEntitySchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	role: string().default(""),
	organization: string().default(""),
	date: string().nullable().default(null),
	description: string().default(""),
	source: SourceRefSchema
});
var CVImportResultSchema = object({
	document: object({
		fileName: string().default("CV"),
		fileSize: number().default(0),
		extractedAt: string().default(() => (/* @__PURE__ */ new Date()).toISOString()),
		totalCharacters: number().default(0)
	}),
	identity: IdentityEntitySchema,
	experiences: array(ExperienceEntitySchema).default([]),
	education: array(EducationEntitySchema).default([]),
	skills: array(SkillEntitySchema).default([]),
	languages: array(LanguageEntitySchema).default([]),
	certifications: array(CertificationEntitySchema).default([]),
	projects: array(ProjectEntitySchema).default([]),
	interests: array(InterestEntitySchema).default([]),
	engagements: array(EngagementEntitySchema).default([]),
	warnings: array(ImportWarningSchema).default([]),
	metadata: object({
		counts: object({
			experiences: number().default(0),
			education: number().default(0),
			skills: number().default(0),
			languages: number().default(0),
			certifications: number().default(0),
			projects: number().default(0),
			interests: number().default(0),
			engagements: number().default(0)
		}),
		hasAmbiguities: boolean().default(false),
		processingTimeMs: number().default(0)
	})
});
//#endregion
export { ExperienceEntitySchema as a, LanguageEntitySchema as c, EngagementEntitySchema as i, ProjectEntitySchema as l, CertificationEntitySchema as n, IdentityEntitySchema as o, EducationEntitySchema as r, InterestEntitySchema as s, CVImportResultSchema as t, SkillEntitySchema as u };
