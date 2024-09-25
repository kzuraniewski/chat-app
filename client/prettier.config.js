// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
	singleQuote: true,
	semi: true,

	overrides: [
		{
			files: 'css',
			options: {
				singleQuote: false,
			},
		},
	],

	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],

	importOrder: [
		'^@angular/(.*)$',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@/(.*)$',
		'',
		'^[../]',
		'^[./]',
		'',
		'^types$',
		'^@/types/(.*)$',
	],
	importOrderParserPlugins: ['typescript', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.0.0',
};
