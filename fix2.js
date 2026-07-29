const fs = require('fs');
let c = fs.readFileSync('src/app/social-welfare/page.tsx', 'utf8');
c = c.replace(
  '<PracticumMapBg variant="social-worker" />',
  '<div style={{ position: "absolute", inset: 0, zIndex: 0 }}><img src="/images/social-welfare-hero.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /><div style={{ position: "absolute", inset: 0, background: "rgba(10,15,40,0.6)" }} /></div>'
);
fs.writeFileSync('src/app/social-welfare/page.tsx', c, 'utf8');
console.log('done');
