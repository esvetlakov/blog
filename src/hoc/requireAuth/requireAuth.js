import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children, page }) {
  const { isAuth, regSuccess, loginSuccess } = useSelector((state) => state.user);

  if (page === 'reg' && isAuth && regSuccess !== true) {
    return <Navigate to="/" />;
  }
  if (page === 'login' && isAuth && loginSuccess !== true) {
    return <Navigate to="/" />;
  }
  if ((page === 'profile' || page === 'new-article') && !isAuth) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireAuth;
