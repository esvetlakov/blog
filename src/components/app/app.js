import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header';
import ArticlesPage from '../articlesPage';
import ArticlePage from '../articlePage';
import SignupPage from '../signupPage';
import SignInPage from '../signInPage/signInPage';
import RequireAuth from '../../hoc/requireAuth';
import { loadSavedUser } from '../../redux/actions/actions';

function App({ user, loadUser }) {
  const { regSuccess, loginSuccess } = user;

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (regSuccess) {
      toast.success('Successful registration', { delay: 100, toastId: 'reg' });
    }
    if (loginSuccess) {
      toast.success('Successful login', { delay: 100, toastId: 'login' });
    }
  }, [regSuccess, loginSuccess]);

  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="" element={<ArticlesPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route
            path="signup"
            element={
              <RequireAuth page="reg">
                <SignupPage />
              </RequireAuth>
            }
          />
          <Route
            path="signin"
            element={
              <RequireAuth page="login">
                <SignInPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-left"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadSavedUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
