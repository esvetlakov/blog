import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { loadArticles, changeCurrentPage } from '../../redux/actions/actions';
import ArticleCard from '../articleCard';

import classes from './articlesPage.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function ArticlesPage({ getArticles, changePage, articles }) {
  const { data, articlesCount, currentPage, loading } = articles;

  useEffect(() => {
    const offset = (currentPage - 1) * 20;
    getArticles(offset);
  }, [getArticles, currentPage]);

  const createArticlesCards = () => {
    if (data.length === 0) {
      return null;
    }
    const cards = data.map((el) => <ArticleCard article={el} key={el.slug} />);
    return <div className="">{cards}</div>;
  };

  const onChange = (e) => {
    const offset = (e - 1) * 20;
    getArticles(offset);
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
  const { articles } = state;
  return { articles };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: (offset = 0) => dispatch(loadArticles(offset)),
  changePage: (page) => dispatch(changeCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
