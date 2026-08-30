import fs from 'fs';
import path from 'path';

import { CATEGORY_MAPPINGS } from './reclassify';

const filePath = path.join(process.cwd(), 'src/lib/verifiedBooks.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace category values in verifiedBooks.ts based on slug
for (const [slug, newCategory] of Object.entries(CATEGORY_MAPPINGS)) {
  // Regex to find slug: 'slug', ... category: 'old'
  const slugRegex = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?category:\\s*['"])([^'"]+)(['"])`, 'g');
  content = content.replace(slugRegex, `$1${newCategory}$3`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated src/lib/verifiedBooks.ts!');
