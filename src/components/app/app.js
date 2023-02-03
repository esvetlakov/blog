import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../header';
import ArticlesPage from '../articlesPage';

export default function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="" element={<ArticlesPage />} />
          <Route path="articles" element={<ArticlesPage />} />
        </Routes>
      </Router>
    </div>
  );
}
