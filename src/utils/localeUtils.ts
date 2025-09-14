export const managePath = (path: string, locale: string) => {
  if (path.startsWith(`/${locale}`)) {
    return path;
  } else {
    return `/${locale}${path}`;
  }
};
