import type { Config } from 'tailwindcss';

// const color = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				md: '2rem',
			},
		},
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			'2xl': '1400px',
		},
		extend: {
			// colors: {
			// 	primary: color('primary'),
			// 	secondary: color('secondary'),
			// 	accent: color('accent'),
			// },
			// textColor: {
			// 	accent: color('accent'),
			// 	'on-primary': color('text-on-primary'),
			// 	'on-secondary': color('text-on-secondary'),
			// 	'on-accent': color('text-on-accent'),
			// 	light: color('text-light'),
			// 	dark: color('text-dark'),
			// },
		},
	},
} satisfies Config;
