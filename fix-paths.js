// fix-paths.mjs
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Path to the built index.html
const indexPath = resolve('dist', 'index.html');

// Read the index.html file
let indexContent = readFileSync(indexPath, 'utf8');

// Replace absolute paths with relative paths
indexContent = indexContent.replace(/src="\//g, 'src="./').replace(/href="\//g, 'href="./');

// Write the updated content back to index.html
writeFileSync(indexPath, indexContent, 'utf8');

