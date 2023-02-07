import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Result } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header';
import ArticlesPage from '../../pages/articlesPage';
import ArticlePage from '../../pages/articlePage';
import SignupPage from '../../pages/signupPage';
import SignInPage from '../../pages/signInPage';
import ProfilePage from '../../pages/profilePage';
import NewArticle from '../../pages/newArticle';
import RequireAuth from '../../hoc/requireAuth';
import { loadSavedUser } from '../../redux/actions/actions';

function App({ user, loadUser, articles }) {
  const { regSuccess, loginSuccess, profileSuccess } = user;
  const { createSuccess, deleteSuccess } = articles;

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
    if (profileSuccess) {
      toast.success('Successful profile update', { delay: 100, toastId: 'profile' });
    }
    if (createSuccess) {
      toast.success('New article successfully created', { delay: 100, toastId: 'new-article' });
    }
    if (deleteSuccess) {
      toast.success('Article successfully deleted', { delay: 100, toastId: 'delete' });
    }
  }, [regSuccess, loginSuccess, profileSuccess, createSuccess, deleteSuccess]);

  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="" element={<ArticlesPage />} />
          <Route
            path="*"
            element={
              <Result
                style={{ paddingTop: '140px' }}
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Link to="/">
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            }
          />
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
          <Route
            path="profile"
            element={
              <RequireAuth page="profile">
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="new-article"
            element={
              <RequireAuth page="new-article">
                <NewArticle />
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
  const { user, articles } = state;
  return { user, articles };
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadSavedUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
