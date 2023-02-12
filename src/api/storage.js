const saveTokenToStorage = (token) => {
  const tokenLifetime = Number(new Date()) + 86400000;
  localStorage.setItem('token', token);
  localStorage.setItem('tokenLifetime', tokenLifetime);
};

const tokenCheck = () => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    const tokenLifetime = localStorage.getItem('tokenLifetime');
    if (tokenLifetime < Date.now()) {
      return false;
    }
    return true;
  }
  return false;
};

const loadTokenFromStorage = () => (tokenCheck() ? localStorage.getItem('token') : null);

const clearStorage = () => {
  localStorage.clear();
};

const storage = {
  saveTokenToStorage,
  loadTokenFromStorage,
  tokenCheck,
  clearStorage,
};

export default storage;
