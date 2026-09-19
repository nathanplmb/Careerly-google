import { c as _enum, d as number, f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contactImport.schema-CabBof2c.js
var ContactToClassifyZodSchema = object({
	id: string(),
	nom: string(),
	entreprise: string(),
	poste: string(),
	notes: string().optional(),
	linkedin: string().optional()
});
var ClassifyContactsBatchInputZodSchema = object({
	contacts: array(ContactToClassifyZodSchema),
	existingCompanies: array(string()).optional(),
	userSchool: string().optional(),
	userTargetSector: string().optional()
});
var ContactClassificationZodSchema = object({
	id: string(),
	normalizedCompany: string(),
	companyMatchedWithExisting: string().optional(),
	normalizedFunction: string(),
	normalizedLevel: string(),
	category: _enum([
		"Recruteur / RH",
		"Alumni",
		"Étudiant / en recherche",
		"Professionnel du secteur ciblé",
		"Professionnel hors secteur ciblé",
		"Autre"
	]),
	categoryConfidence: number().min(0).max(100),
	pastCompanies: array(string()).optional().default([]),
	education: array(string()).optional().default([]),
	companySector: string().optional().default(""),
	explanation: string().optional()
});
object({ classifications: array(ContactClassificationZodSchema) });
//#endregion
export { ClassifyContactsBatchInputZodSchema as t };
