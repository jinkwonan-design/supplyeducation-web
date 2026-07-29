const fs = require('fs');
let c = fs.readFileSync('src/app/social-welfare/page.tsx', 'utf8');
const start = c.indexOf('두 자격증, 과목이 겹칩니다');
const sectionStart = c.lastIndexOf('<section', start);
const sectionEnd = c.indexOf('</section>', sectionStart) + '</section>'.length;
c = c.slice(0, sectionStart) + c.slice(sectionEnd);
fs.writeFileSync('src/app/social-welfare/page.tsx', c, 'utf8');
console.log('done');
