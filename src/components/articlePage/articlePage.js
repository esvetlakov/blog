import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Avatar, Tag, Spin } from 'antd';
import { HeartOutlined, HeartFilled, LoadingOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

import { getCurrentArticle } from '../../redux/actions/actions';

import classes from './articlePage.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const generateTagsList = (tags) =>
  tags.map((el) => (
    <Tag className={classes.tag} key={el}>
      {el}
    </Tag>
  ));

const heartIcon = (favorited) =>
  favorited ? (
    <HeartFilled style={{ fontsize: '16px', color: '#FF0707' }} />
  ) : (
    <HeartOutlined style={{ fontsize: '16px' }} />
  );

function ArticlePage({ currentArticle, getArticle }) {
  const { slug } = useParams();

  useEffect(() => {
    getArticle(slug);
  }, [getArticle, slug]);

  if (Object.keys(currentArticle).length !== 0) {
    const { title, description, createdAt, tagList, favorited, favoritesCount, author, body } = currentArticle;
    const { username, image } = author;
    return (
      <div className={classes.wrap}>
        <div className={classes.card}>
          <div className={classes.cardHeader}>
            <div className={classes.mainInfo}>
              <div className={classes.header}>
                <h2 className={classes.title}>{title}</h2>
                <button className={classes.likeBtn} type="button">
                  {heartIcon(favorited)}
                  {favoritesCount}
                </button>
              </div>
              <div className={classes.tagList}>{generateTagsList(tagList)}</div>
              <p className={classes.desc}>{description}</p>
            </div>
            <div className={classes.author}>
              <div className={classes.info}>
                <span className={classes.userName}>{username}</span>
                <span className={classes.date}>{format(parseISO(createdAt), 'MMMM d, R')}</span>
              </div>
              <div className={classes.avatar}>
                <Avatar src={image} size={46} />
              </div>
            </div>
          </div>
          <div className={classes.mainText}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.loading}>
      <Spin indicator={antIcon} tip="Loading..." />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { articles } = state;
  const { currentArticle } = articles;
  return { currentArticle };
};

const mapDispatchToProps = (dispatch) => ({
  getArticle: (slug) => dispatch(getCurrentArticle(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
