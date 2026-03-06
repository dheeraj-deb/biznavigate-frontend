const fs = require('fs');
const path = require('path');

const srcDirs = ['./src/components'];

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    let originalContent = content;
    content = content.replace(/<Grid item([^>]*?)>/g, (match, p1) => {
        let props = p1;
        let sizeStr = '';
        ['xs', 'sm', 'md', 'lg', 'xl'].forEach(bp => {
            const regex = new RegExp(`\\s+${bp}={([^}]+)}`);
            const bpMatch = props.match(regex);
            if (bpMatch) {
                sizeStr += `${bp}: ${bpMatch[1]}, `;
                props = props.replace(regex, '');
            } else {
                const regexStr = new RegExp(`\\s+${bp}="([^"]+)"`);
                const bpMatchStr = props.match(regexStr);
                if (bpMatchStr) {
                    sizeStr += `${bp}: "${bpMatchStr[1]}", `;
                    props = props.replace(regexStr, '');
                }
            }
        });

        if (sizeStr) {
            return `<Grid size={{ ${sizeStr.slice(0, -2)} }}${props}>`;
        }
        return `<Grid${props}>`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content);
        console.log(`Updated ${filepath}`);
    }
}

srcDirs.forEach(dir => {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
    files.forEach(file => {
        processFile(path.join(dir, file));
    });
});
