import fs from 'fs/promises';

export async function readFile(filePath, isParsed) {
  const data = await fs.readFile(filePath, 'utf-8');
  return isParsed ? JSON.parse(data) : data;
}

export async function writeFile(filePath, data, isParsed) {
  if (!filePath || !data) return;
  await fs.writeFile(filePath, isParsed ? JSON.stringify(data) : data);
}
