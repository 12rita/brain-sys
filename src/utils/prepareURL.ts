export const prepareURL = (url: string): string => {
  let prepared = url.trim();
  if (prepared.startsWith('https://')) {
    prepared = prepared.slice(8) || '';
  }
  return prepared;
};
