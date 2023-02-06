import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { uid } from 'uid/single';

import { loadArticles, changeCurrentPage } from '../../redux/actions/actions';
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

function ArticlesPage({ getArticles, changePage, articles, user }) {
  const { data, articlesCount, currentPage, loading } = articles;
  const { token } = user;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const offset = (currentPage - 1) * 20;
    getArticles(offset, token);
  }, [getArticles, currentPage, token]);

  const createArticlesCards = () => {
    if (data.length === 0) {
      return null;
    }
    const cards = data.map((el) => <ArticleCard article={el} key={uid(20)} />);
    return <div className="">{cards}</div>;
  };

  const onChange = (e) => {
    const offset = (e - 1) * 20;
    getArticles(offset, token);
    changePage(e);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={classes.wrapper}>
      <Spin indicator={antIcon} tip="Loading..." spinning={loading}>
        {createArticlesCards()}
      </Spin>
      <Pagination
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
  getArticles: (offset, token) => dispatch(loadArticles(offset, token)),
  changePage: (page) => dispatch(changeCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
