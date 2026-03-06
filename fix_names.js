const fs = require('fs');
const files = [
    'src/pages/TermsOfService.tsx',
    'src/pages/PrivacyPolicy.tsx',
    'src/pages/DataDeletion.tsx',
    'src/components/TransformationPartners.tsx',
    'src/components/Header.tsx',
    'src/components/Footer.tsx',
    'src/components/DashboardPreviewSection.tsx',
    'public/index.html',
    'public/manifest.json'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const newContent = content.replace(/biznavigate/gi, 'BizNavigo');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log(`Updated ${file}`);
    }
});
