import { format, parseISO } from 'date-fns';
import { Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { uid } from 'uid/single';

import LikeButton from '../likeButton';

import classes from './articleCard.module.scss';

const generateTagsList = (tags) =>
  tags.map((el) => {
    if (el !== '') {
      return (
        <Tag className={classes.tag} key={uid(20)}>
          {el.slice(0, 40)}
        </Tag>
      );
    }
    return null;
  });

export default function ArticleCard({ article, isAuth, likeClick }) {
  const { title, description, createdAt, tagList, favorited, favoritesCount, author, slug } = article;
  const { username, image } = author;
  return (
    <div className={classes.card}>
      <div className={classes.mainInfo}>
        <div className={classes.header}>
          <Link className={classes.title} to={`articles/${slug}`}>
            {title.length > 55 ? `${title.slice(0, 55)}...` : title}
          </Link>
          <LikeButton
            favorited={favorited}
            favoritesCount={favoritesCount}
            isAuth={isAuth}
            likeClick={likeClick}
            slug={slug}
          />
        </div>
        <div className={classes.tagList}>{generateTagsList(tagList)}</div>
        <p className={classes.desc}>{description.length > 300 ? `${description.slice(0, 300)}...` : description}</p>
      </div>
      <div className={classes.author}>
        <div className={classes.info}>
          <span className={classes.userName}>{username}</span>
          <span className={classes.date}>{format(parseISO(createdAt), 'MMMM d, R')}</span>
        </div>
        <div className={classes.avatar}>
          <Avatar src={image} size={46} icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  );
}
