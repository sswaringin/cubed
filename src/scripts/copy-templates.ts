import * as fs from 'fs';

fs.cpSync('src/templates', 'dist/templates', { recursive: true });
console.log('✓ Templates copied');