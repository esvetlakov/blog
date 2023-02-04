import { format, parseISO } from 'date-fns';
import { Avatar, Tag } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import classes from './articleCard.module.scss';

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

export default function ArticleCard({ article }) {
  const { title, description, createdAt, tagList, favorited, favoritesCount, author, slug } = article;
  const { username, image } = author;
  return (
    <div className={classes.card}>
      <div className={classes.mainInfo}>
        <div className={classes.header}>
          <Link className={classes.title} to={`articles/${slug}`}>
            {title}
          </Link>
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
  );
}
