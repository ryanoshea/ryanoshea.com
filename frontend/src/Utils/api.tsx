export const getUrl = (relativePath: string) => window.location.hostname === 'ryanoshea.com'
  ? relativePath
  : `https://localhost${relativePath}`;
