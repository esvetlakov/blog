import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RequireAuth({ children, user, page }) {
  const { isAuth, regSuccess, loginSuccess } = user;
  console.log(page);

  if (page === 'reg' && isAuth && regSuccess !== true) {
    toast.error('You are already logged in', { delay: 20 });
    return <Navigate to="/" />;
    // eslint-disable-next-line
  } else if (page === 'login' && isAuth && loginSuccess !== true) {
    toast.error('You are already logged in', { delay: 20 });
    return <Navigate to="/" />;
  }

  return children;
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(RequireAuth);
