const fs = require('fs');
let c = fs.readFileSync('src/app/social-welfare/page.tsx', 'utf8');
c = c.replace(
  '<span style={{ color: "#2DD4BF" }}>산후파견업 대표</span>가<br />',
  '<span style={{ background: "#1a1aad", color: "#ffffff", padding: "0 8px" }}>산후파견업 대표</span>가<br />'
);
fs.writeFileSync('src/app/social-welfare/page.tsx', c, 'utf8');
console.log('done');
