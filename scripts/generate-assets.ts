/**
 * Static OG image generation script.
 *
 * The primary OG/Twitter images and favicon are generated dynamically via
 * Next.js Image Generation routes:
 *   - src/app/opengraph-image.tsx  (1200x630)
 *   - src/app/twitter-image.tsx    (1200x600)
 *   - src/app/icon.tsx             (32x32 favicon)
 *
 * To generate static fallback PNGs (e.g., for README or external embeds):
 *   bun run scripts/generate-assets.ts
 *
 * Requires: bun
 */

const OG_URL = "https://agent-stack.crafter.run/opengraph-image";
const TWITTER_URL = "https://agent-stack.crafter.run/twitter-image";
const ICON_URL = "https://agent-stack.crafter.run/icon";

async function download(url: string, path: string) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	const buffer = await res.arrayBuffer();
	await Bun.write(path, buffer);
	console.log(`  ${path} (${Math.round(buffer.byteLength / 1024)}KB)`);
}

async function main() {
	console.log("Generating static brand assets from live routes...\n");

	await download(OG_URL, "public/og.png");
	await download(TWITTER_URL, "public/og-twitter.png");
	await download(ICON_URL, "public/icon.png");

	console.log("\nDone. Assets saved to /public/");
}

main().catch(console.error);
