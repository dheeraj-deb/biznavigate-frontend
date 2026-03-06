const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

const colorMap = {
    '#6200ea': '#2563EB', // Violet to vibrant SaaS Blue
    '#4a00b0': '#1D4ED8', // Dark Violet to deep Hover Blue
    'rgba(98, 0, 234,': 'rgba(37, 99, 235,', // Violet RGB to Blue RGB
    'rgba(98,0,234,': 'rgba(37,99,235,'      // Without spaces
};

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkAndReplace(fullPath);
        } else if (fullPath.match(/\.(tsx|ts|jsx|js|css)$/)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            for (const [violet, blue] of Object.entries(colorMap)) {
                if (content.includes(violet)) {
                    // split and join works like replaceAll
                    content = content.split(violet).join(blue);
                    modified = true;
                }

                // Let's also enforce uppercase variants just in case
                const upperViolet = violet.toUpperCase();
                if (upperViolet !== violet && content.includes(upperViolet)) {
                    content = content.split(upperViolet).join(blue);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated colors in:', fullPath);
            }
        }
    }
}

walkAndReplace(srcPath);
