export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === 'undefined') {
    return '';
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
    return '';
  }
  return localStorage.getItem(key);
};

export const setSessionStorage = (key: string, token: string) => {
  if (!key || typeof window === 'undefined') {
    return '';
  }
  return sessionStorage.setItem(key, token);
};

export const getSessionStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
    return '';
  }
  return sessionStorage.getItem(key);
};
