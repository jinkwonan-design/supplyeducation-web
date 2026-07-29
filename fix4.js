const fs = require('fs');
let c = fs.readFileSync('src/app/social-welfare/page.tsx', 'utf8');
const idx = c.indexOf('두 과정 소개 섹션');
const insertAt = c.lastIndexOf('{/*', idx);
const newSection = [
  '      {/* \uFF0E\uFF0E \uc0b0\ud6c4\ud30c\uacac\uc5c5 \uc139\uc158 \uFF0E\uFF0E */}',
  '      <section className="w-full bg-white py-20 px-6">',
  '        <div className="mx-auto max-w-4xl">',
  '          <div className="text-center mb-16">',
  '            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">\uc0b0\ud6c4\ud30c\uacac\uc5c5 \ucc3d\uc5c5</span>',
  '            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">\uc65c \uc9c0\uae08 \uc0b0\ud6c4\ud30c\uacac\uc5c5\uc778\uac00\uc694?</h2>',
  '            <p className="text-sm text-gray-500">\uc790\uaca9\uc99d \ud558\ub098\ub85c \ub9cc\ub4e4 \uc218 \uc788\ub294 \uac00\uc7a5 \ud604\uc2e4\uc801\uc778 \uc0ac\uc5c5</p>',
  '          </div>',
  '          <div className="flex flex-col gap-6">',
  '            <div style={{ borderRadius: 20, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 2fr", border: "1px solid #e5e7eb" }}>',
  '              <div style={{ background: "#1a1aad", padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>',
  '                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 600 }}>01</p>',
  '                <p style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", lineHeight: 1.4 }}>\uc815\ubd80\uac00<br />\ub3c8\uc744 \uc90d\ub2c8\ub2e4</p>',
  '              </div>',
  '              <div style={{ padding: "36px 32px", background: "#ffffff" }}>',
  '                <p style={{ fontSize: 15, color: "#333", lineHeight: 1.9, wordBreak: "keep-all" }}>\uc0b0\ubaa8\ub294\uc2e0\uc0dd\uc544 \uac74\uac15\uad00\ub9ac \uc11c\ube44\uc2a4\ub294 <strong>\uc815\ubd80 \ubc14\uc6b0\ucc98</strong>\ub85c \uc6b4\uc601\ub429\ub2c8\ub2e4. \ubc84\ub3c4 \uad11\uace0 \uc5c6\uc774\ub3c4 \uc218\uc694\uac00 \uc788\uace0, \ub9e4\ucd9c\uc758 \uc0c1\ub2f9 \ubd80\ubd84\uc774 \uc815\ubd80 \uc9c0\uc6d0\uae08\uc73c\ub85c \ucc44\uc6cc\uc9d1\ub2c8\ub2e4.</p>',
  '              </div>',
  '            </div>',
  '            <div style={{ borderRadius: 20, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 2fr", border: "1px solid #e5e7eb" }}>',
  '              <div style={{ background: "#0f0f8a", padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>',
  '                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 600 }}>02</p>',
  '                <p style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", lineHeight: 1.4 }}>\uc9c4\uc785 \uc7a5\ubcbd\uc774<br />\ub099\uc2b5\ub2c8\ub2e4</p>',
  '              </div>',
  '              <div style={{ padding: "36px 32px", background: "#ffffff" }}>',
  '                <p style={{ fontSize: 15, color: "#333", lineHeight: 1.9, wordBreak: "keep-all" }}><strong>\uc0ac\ud68c\ubcf5\uc9c0\uc0ac 2\uae09 + \uc0ac\ubb34\uc2e4 3\ud3c9</strong>\uc774\uba74 \ucc3d\uc5c5 \ub4f1\ub85d\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4. \ubcc4\ub3c4 \uc2dc\ud5d8 \uc5c6\uc774 \uacfc\ubaa9 \uc774\uc218\ub9cc\uc73c\ub85c \uc790\uaca9\uc99d\uc744 \ucde8\ub4dd\ud560 \uc218 \uc788\uc5b4\uc694.</p>',
  '              </div>',
  '            </div>',
  '            <div style={{ borderRadius: 20, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 2fr", border: "1px solid #e5e7eb" }}>',
  '              <div style={{ background: "#07076b", padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>',
  '                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 600 }}>03</p>',
  '                <p style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", lineHeight: 1.4 }}>\ucd5c\ub2e8 \uacbd\ub85c\ub97c<br />\ub9cc\ub4e4\uc5b4\ub4dc\ub9bd\ub2c8\ub2e4</p>',
  '              </div>',
  '              <div style={{ padding: "36px 32px", background: "#ffffff" }}>',
  '                <p style={{ fontSize: 15, color: "#333", lineHeight: 1.9, wordBreak: "keep-all" }}>\uc774\uc218\ud558\uae30 \uc2ec\uc6b4 \uad50\uc721\uc6d0 \uc120\ubcc4, \uc2e4\uc2b5 \uc5f0\uacc4\uae4c\uc9c0 <strong>1:1 \ub2f4\ub2f9\uc790</strong>\uac00 \ud568\uaed8\ud569\ub2c8\ub2e4. \uc790\uaca9\uc99d \ucde8\ub4dd \ud6c4 \ucc3d\uc5c5\uae4c\uc9c0 \ub9c9\ud788\ub294 \uc77c \uc5c6\ub3c4\ub85c \uccb4\uc784\ud569\ub2c8\ub2e4.</p>',
  '              </div>',
  '            </div>',
  '          </div>',
  '        </div>',
  '      </section>',
].join('\n');
c = c.slice(0, insertAt) + newSection + '\n\n      ' + c.slice(insertAt);
fs.writeFileSync('src/app/social-welfare/page.tsx', c, 'utf8');
console.log('done');
