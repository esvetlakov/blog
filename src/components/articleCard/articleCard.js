import { format, parseISO } from 'date-fns';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import LikeButton from '../likeButton';
import getTags from '../../utils/getTags';

import classes from './articleCard.module.scss';

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
        <div className={classes.tagList}>{getTags(tagList, classes.tag)}</div>
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
