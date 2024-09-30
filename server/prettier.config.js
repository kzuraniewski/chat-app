// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
export default {
	singleQuote: true,
	semi: true,

	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
	],

	importOrder: [
		'<THIRD_PARTY_MODULES>',
		'',
		'^@/(.*)$',
		'',
		'^[../]',
		'^[./]',
		'',
		'^@/types/(.*)$',
	],
	importOrderParserPlugins: ['typescript'],
	importOrderTypeScriptVersion: '5.0.0',
};
