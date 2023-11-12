const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const content = `
export const environment = {
 API_URL: '${process.env.API_URL}'
};
`;

// Write the TypeScript export to the environment.ts file
const outputPath = path.join(__dirname, 'src', 'environment.ts');
fs.writeFileSync(outputPath, content);

console.log(`Environment written to ${outputPath}`);
