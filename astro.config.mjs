import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	site: 'https://clicker.stats100.xyz',
	prefetch: true,
	integrations: [
		react({
			//experimentalReactChildren: true,
		}),
		robotsTxt({
			sitemap: ['https://clicker.stats100.xyz/sitemap-index.xml'],
		}),
		sitemap(),
	],
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
});