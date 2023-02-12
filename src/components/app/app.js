import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Button, Result } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header';
import ArticlesPage from '../../pages/articlesPage';
import ArticlePage from '../../pages/articlePage';
import SignupPage from '../../pages/signupPage';
import SignInPage from '../../pages/signInPage';
import ProfilePage from '../../pages/profilePage';
import NewArticle from '../../pages/newArticle';
import EditArticle from '../../pages/editArticle';
import RequireAuth from '../../hoc/requireAuth';
import { loadSavedUser } from '../../redux/actions/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSavedUser());
  }, [dispatch]);

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
                    <Button type="primary">Back to main page</Button>
                  </Link>
                }
              />
            }
          />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="articles/:slug/edit" element={<EditArticle />} />
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

export default App;
