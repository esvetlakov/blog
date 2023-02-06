import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Tag, Spin } from 'antd';
import { uid } from 'uid/single';
import ReactMarkdown from 'react-markdown';

import LikeButton from '../../components/likeButton';
import { getCurrentArticle, likeArticle } from '../../redux/actions/actions';

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
    <Tag className={classes.tag} key={uid(20)}>
      {el.slice(0, 40)}
    </Tag>
  ));

function ArticlePage({ data, getArticle, isAuth, likeClick }) {
  const { slug } = useParams();
  const item = data[0];

  useEffect(() => {
    getArticle(slug);
  }, [getArticle, slug]);

  if (data.single) {
    const { title, description, createdAt, tagList, favorited, favoritesCount, author, body } = item;
    const { username, image } = author;
    return (
      <div className={classes.wrap}>
        <div className={classes.card}>
          <div className={classes.cardHeader}>
            <div className={classes.mainInfo}>
              <div className={classes.header}>
                <h2 className={classes.title}>{title}</h2>
                <LikeButton
                  favorited={favorited}
                  favoritesCount={favoritesCount}
                  isAuth={isAuth}
                  likeClick={likeClick}
                  slug={slug}
                />
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
  const { articles, user } = state;
  const { data } = articles;
  const { isAuth } = user;
  return { data, isAuth };
};

const mapDispatchToProps = (dispatch) => ({
  getArticle: (slug) => dispatch(getCurrentArticle(slug)),
  likeClick: (slug, checked) => dispatch(likeArticle(slug, checked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
