export const capitalize = (s: string) => `${s[0].toUpperCase()}${s.slice(1)}`;

export const markdownToTsDoc = (
  markdown: string,
): string => markdown.split('\n').map((str) => {
  if (str.trim() === '') return `*${str}`;

  return `* ${str}`;
}).join('\n');

export const typescriptToTsDoc = (
  code: string,
): string => '* ```\n' + code.split('\n').map((str) => {
  if (str.trim() === '') return `*${str}`;

  return `* ${str}`;
}).join('\n') + '\n* ```';
