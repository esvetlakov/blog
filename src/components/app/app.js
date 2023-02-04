import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header';
import ArticlesPage from '../articlesPage';
import ArticlePage from '../articlePage';
import SignupPage from '../signupPage';

function App({ user }) {
  const { regSuccess } = user;

  useEffect(() => {
    if (regSuccess) toast('Registration successful');
  }, [regSuccess]);

  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="" element={<ArticlesPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-left"
        autoClose={10000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
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

export default connect(mapStateToProps)(App);
