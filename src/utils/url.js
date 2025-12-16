// Utility helpers for working with URLs displayed in the UI.
export const stripProtocol = (value = '') =>
  value.trim().replace(/^https?:\/\//i, '');

export const isValidUrlLike = (value = '') => {
  if (!value.trim()) return false;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    new URL(withProtocol);
    return true;
  } catch (_) {
    return false;
  }
};

export const normalizeUrlList = (list = []) =>
  list
    .map(stripProtocol)
    .map(item => item.trim())
    .filter(Boolean);

