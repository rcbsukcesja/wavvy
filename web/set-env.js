const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const content = `
export const environment = {
 API_URL: '${process.env.API_URL}',
 KEYCLOAK_URL: '${process.env.KEYCLOAK_URL}',
 KEYCLOAK_REALM: '${process.env.KEYCLOAK_REALM}',
 KEYCLOAK_CLIENT_ID: '${process.env.KEYCLOAK_CLIENT_ID}'
};
`;

// Write the TypeScript export to the environment.ts file
const outputPath = path.join(__dirname, 'src', 'environment.ts');
fs.writeFileSync(outputPath, content);

console.log(`Environment written to ${outputPath}`);
