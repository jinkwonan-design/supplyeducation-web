/**
 * PNG/JPG → WebP 일괄 변환 스크립트
 * 사용법: node scripts/convert-webp.mjs
 * 의존성: npm install --save-dev sharp
 */

import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const TARGET_DIRS = ["public/images", "public/team"];
const QUALITY = 82;

async function convertDir(dir) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    console.warn(`[skip] ${dir} not found`);
    return;
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    const inputPath = join(dir, file);
    const outputPath = join(dir, basename(file, ext) + ".webp");

    const [inputStat] = await Promise.all([stat(inputPath)]);
    const inputKB = (inputStat.size / 1024).toFixed(0);

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputStat = await stat(outputPath);
    const outputKB = (outputStat.size / 1024).toFixed(0);
    const saved = (((inputStat.size - outputStat.size) / inputStat.size) * 100).toFixed(0);

    console.log(`✓ ${file} → ${basename(outputPath)}  ${inputKB}KB → ${outputKB}KB  (-${saved}%)`);
  }
}

for (const dir of TARGET_DIRS) {
  console.log(`\n📁 ${dir}`);
  await convertDir(dir);
}

console.log("\n✅ 변환 완료. Next.js Image 컴포넌트가 자동으로 WebP를 선택합니다.");
console.log("   또는 src 경로를 .webp로 직접 변경하세요.");
