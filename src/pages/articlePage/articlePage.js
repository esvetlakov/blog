import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Spin, Button, Popconfirm } from 'antd';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';

import LikeButton from '../../components/likeButton';
import { getCurrentArticle, likeArticle, deleteArticle } from '../../redux/actions/actions';
import getTags from '../../utils/getTags';

import classes from './articlePage.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function ArticlePage() {
  const { slug } = useParams();
  const { data } = useSelector((state) => state.articles);
  const { isAuth, username } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = data[0];

  useEffect(() => {
    dispatch(getCurrentArticle(slug));
  }, [dispatch, slug]);

  const onDelete = () => {
    const res = dispatch(deleteArticle(slug));
    if (res) {
      toast.success('Article successfully deleted', { delay: 100 });
      navigate('/');
    }
  };

  const likeClick = (article, checked) => dispatch(likeArticle(article, checked));

  if (data.single) {
    const { title, description, createdAt, tagList, favorited, favoritesCount, author, body } = item;
    const { username: authorName, image } = author;
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
              <div className={classes.tagList}>{getTags(tagList, classes.tag)}</div>
              <p className={classes.desc}>{description}</p>
            </div>
            <div className={classes.author}>
              <div className={classes.authorWrap}>
                <div className={classes.info}>
                  <span className={classes.userName}>{authorName}</span>
                  <span className={classes.date}>{format(parseISO(createdAt), 'MMMM d, R')}</span>
                </div>
                <div className={classes.avatar}>
                  <Avatar src={image} size={46} icon={<UserOutlined />} />
                </div>
              </div>
              {username === authorName && (
                <div className={classes.authorWrap}>
                  <Popconfirm
                    placement="rightTop"
                    title="Delete the article"
                    description="Are you sure to delete this article?"
                    onConfirm={onDelete}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className={classes.delete} size="middle">
                      Delete
                    </Button>
                  </Popconfirm>
                  <Button className={classes.edit} size="middle" onClick={() => navigate(`/articles/${slug}/edit`)}>
                    Edit
                  </Button>
                </div>
              )}
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
      <Spin indicator={antIcon} />
    </div>
  );
}

export default ArticlePage;
