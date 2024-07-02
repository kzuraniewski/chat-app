const config = {
	port: process.env['PORT'],
	atlasUri: process.env['ATLAS_URI'],
	jwtSecret: process.env['JWT_SECRET'],
};

Object.entries(config).forEach(([key, value]) => {
	if (!value) throw new Error(`Invalid environment variable "${key}"`);
});

export default config as Record<keyof typeof config, string>;
