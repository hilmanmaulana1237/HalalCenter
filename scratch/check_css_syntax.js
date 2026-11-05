const fs = require('fs');

const css = fs.readFileSync('frontend/src/styles/template-theme.css', 'utf8');

// check brace balance
let openCount = 0;
let lines = css.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let c of line) {
    if (c === '{') openCount++;
    if (c === '}') openCount--;
  }
  if (i > 930 && i < 945) {
    console.log(`Line ${i+1}: openCount=${openCount} | ${line.substring(0, 50)}`);
  }
}

console.log('Final openCount:', openCount);

