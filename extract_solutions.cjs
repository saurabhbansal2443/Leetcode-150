const fs = require('fs');
const https = require('https');

// Extract URLs from HundredDaysData.js
const fileContent = fs.readFileSync('src/HundredDaysData.js', 'utf8');
const urls = [];
const regex = /day:\s*(\d+).*?codeSolution:\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(fileContent)) !== null) {
  if (match[2].trim() !== '') {
    urls.push({ day: parseInt(match[1]), url: match[2] });
  }
}

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractCode(html, language) {
  // Find "Java Solution" or "Python Solution"
  const langRegex = new RegExp(`>\\s*${language} Solution.*?</code>`, 'is');
  const sectionMatch = html.match(langRegex);
  
  if (!sectionMatch) {
    // try finding by language class inside pre code
    const fallbackRegex = /<code class="language-\w+">([\s\S]*?)<\/code>/g;
    let codes = [];
    let cm;
    while ((cm = fallbackRegex.exec(html)) !== null) {
      codes.push(cm[1]);
    }
    // Very coarse fallback
    if (language === 'Java' && codes.length > 0) return decodeHtml(codes[0]);
    if (language === 'Python' && codes.length > 1) return decodeHtml(codes[1]);
    if (language === 'Python' && codes.length === 1) return decodeHtml(codes[0]);
    return null;
  }
  
  const codeBlockMatch = sectionMatch[0].match(/<code.*?>([\s\S]*?)<\/code>/i);
  if (codeBlockMatch) {
    return decodeHtml(codeBlockMatch[1]);
  }
  return null;
}

function decodeHtml(html) {
  return html.replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&amp;/g, '&')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'")
             .replace(/&nbsp;/g, ' ')
             .replace(/<[^>]*>?/gm, ''); // Remove inline tags if any
}

async function main() {
  const solutions = {};
  
  console.log(`Found ${urls.length} URLs to fetch`);
  
  for (let i = 0; i < urls.length; i++) {
    const { day, url } = urls[i];
    try {
      console.log(`Fetching day ${day}...`);
      const html = await fetchHtml(url);
      
      let java = extractCode(html, 'Java');
      let python = extractCode(html, 'Python');
      
      if (!java && !python) {
        // Just extract all code blocks 
        const allCodes = [...html.matchAll(/<code.*?>([\s\S]*?)<\/code>/gi)];
        if (allCodes.length >= 2) {
          java = decodeHtml(allCodes[0][1]);
          python = decodeHtml(allCodes[1][1]);
        } else if (allCodes.length === 1) {
          java = decodeHtml(allCodes[0][1]);
        }
      }
      
      solutions[day] = {
        java: java ? java.trim() : null,
        python: python ? python.trim() : null
      };
      
    } catch (e) {
      console.error(`Error on day ${day}: ${e.message}`);
    }
    
    // sleep to prevent rate limits
    await new Promise(r => setTimeout(r, 200));
  }
  
  fs.writeFileSync('src/HundredDaysSolutions.json', JSON.stringify(solutions, null, 2));
  console.log('Done mapping solutions');
}

main();
