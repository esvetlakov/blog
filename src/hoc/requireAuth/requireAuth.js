import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children, user, page }) {
  const { isAuth, regSuccess, loginSuccess } = user;

  if (page === 'reg' && isAuth && regSuccess !== true) {
    return <Navigate to="/" />;
    // eslint-disable-next-line
  } else if (page === 'login' && isAuth && loginSuccess !== true) {
    return <Navigate to="/" />;
  } else if ((page === 'profile' || page === 'new-article') && !isAuth) {
    return <Navigate to="/" />;
  }

  return children;
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(RequireAuth);
