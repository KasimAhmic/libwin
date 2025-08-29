//@ts-check
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const files = readdirSync(join(process.cwd(), 'src'), {
  withFileTypes: true,
  recursive: true,
})
  .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.cpp'))
  .map((dirent) => join(dirent.parentPath, dirent.name).replace(/\\/g, '/'))
  .join(' ');

process.stdout.write(files);
