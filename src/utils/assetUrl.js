const ABSOLUTE_PATTERN = /^(?:[a-z]+:)?\/\//i;

export function assetUrl(path) {
  if (!path) {
    return path;
  }

  if (ABSOLUTE_PATTERN.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${encodeURI(normalizedPath)}`;
}
