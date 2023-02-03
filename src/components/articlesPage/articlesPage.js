import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Pagination } from 'antd';

import { loadArticles } from '../../redux/actions/actions';
import ArticleCard from '../articleCard';

import classes from './articlesPage.module.scss';

function ArticlesPage({ getArticles, articles }) {
  const { data, articlesCount } = articles;

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const createArticlesCards = () => {
    if (data.length === 0) {
      return null;
    }
    const cards = data.map((el) => <ArticleCard article={el} key={el.slug} />);
    return <div className="">{cards}</div>;
  };

  return (
    <div className={classes.wrapper}>
      {createArticlesCards()}
      <Pagination pageSize={20} showSizeChanger={false} total={articlesCount} defaultCurrent={1} current={1} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { articles } = state;
  return { articles };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: (offset = 0) => dispatch(loadArticles(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
