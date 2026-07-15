// Generates public/og-image.png (1200x630) for social sharing.
// Navy brand background + white SE logo (logo2) + tagline.
// Run: node scripts/generate-og.js
const sharp = require("sharp");
const path = require("path");

const W = 1200;
const H = 630;

async function main() {
  // White SE logo, trimmed to tight bounds.
  const logo = await sharp(path.join(__dirname, "../public/images/logo2.png"))
    .trim()
    .toBuffer();
  const logoW = 360;
  const logoH = Math.round((360 * 328) / 523); // preserve aspect (523x328) -> ~226
  const logoResized = await sharp(logo)
    .resize(logoW, logoH, { fit: "fill" })
    .toBuffer();
  const logoX = Math.round((W - logoW) / 2);
  const logoY = 150;

  // Background: deep navy gradient with a soft brand-blue glow behind the logo.
  const bg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="navy" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stop-color="#0c0e33"/>
        <stop offset="55%" stop-color="#111350"/>
        <stop offset="100%" stop-color="#0a0b2b"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="45%">
        <stop offset="0%"   stop-color="#2a2ad6" stop-opacity="0.55"/>
        <stop offset="55%"  stop-color="#1a1aad" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#1a1aad" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#navy)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <!-- brand accent divider above the tagline -->
    <rect x="${W / 2 - 44}" y="440" width="88" height="5" rx="2.5" fill="#5c85ff"/>
    <text x="${W / 2}" y="530"
          font-family="Malgun Gothic, sans-serif" font-size="56" font-weight="bold"
          fill="#ffffff" text-anchor="middle" letter-spacing="2">학점은행제 전문 상담</text>
  </svg>`;

  const base = await sharp(Buffer.from(bg)).png().toBuffer();

  await sharp(base)
    .composite([{ input: logoResized, left: logoX, top: logoY }])
    .png()
    .toFile(path.join(__dirname, "../public/og-image.png"));

  console.log("wrote public/og-image.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
