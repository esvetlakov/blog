import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { uid } from 'uid/single';

import { loadArticles, changeCurrentPage, likeArticle } from '../../redux/actions/actions';
import ArticleCard from '../../components/articleCard';

import classes from './articlesPage.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function ArticlesPage({ getArticles, changePage, articles, user, likeClick }) {
  const { data, articlesCount, currentPage, loading } = articles;
  const { isAuth } = user;

  useEffect(() => {
    const offset = (currentPage - 1) * 20;
    getArticles(offset);
  }, [getArticles, currentPage]);

  const createArticlesCards = () => {
    if (!data.pages) {
      return null;
    }
    const cards = data.map((el) => <ArticleCard article={el} likeClick={likeClick} isAuth={isAuth} key={uid(20)} />);
    return <div className="">{cards}</div>;
  };

  const onChange = (e) => {
    const offset = (e - 1) * 20;
    getArticles(offset);
    changePage(e);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={loading ? classes.loading : classes.wrapper}>
      <Spin indicator={antIcon} spinning={loading}>
        {createArticlesCards()}
      </Spin>
      <Pagination
        className={loading ? classes.pagLoading : null}
        defaultCurrent={1}
        defaultPageSize={20}
        current={currentPage}
        showSizeChanger={false}
        total={articlesCount}
        onChange={onChange}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { articles, user } = state;
  return { articles, user };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: (offset) => dispatch(loadArticles(offset)),
  changePage: (page) => dispatch(changeCurrentPage(page)),
  likeClick: (slug, checked) => dispatch(likeArticle(slug, checked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
