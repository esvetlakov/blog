const day = 86400000; // one day in ms

const saveTokenToStorage = (token) => {
  const tokenLifetime = Number(new Date()) + day;
  localStorage.setItem('token', token);
  localStorage.setItem('tokenLifetime', tokenLifetime);
};

const checkToketValidation = () => {
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

const loadTokenFromStorage = () => (checkToketValidation() ? localStorage.getItem('token') : null);

const clearStorage = () => {
  localStorage.clear();
};

const storage = {
  saveTokenToStorage,
  loadTokenFromStorage,
  checkToketValidation,
  clearStorage,
};

export default storage;
