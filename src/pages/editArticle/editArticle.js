import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { updateArticle, getCurrentArticle } from '../../redux/actions/actions';
import ArticleForm from '../../components/articleForm';

import classes from './editArticle.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function EditArticle() {
  const { slug } = useParams();
  const { data } = useSelector((state) => state.articles);
  const { user } = useSelector((state) => state);
  const { isPending } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const article = data[0];
  const author = article?.author?.username;

  useEffect(() => {
    if (article?.slug !== slug) dispatch(getCurrentArticle(slug));
  }, [dispatch, slug, article?.slug]);

  useEffect(() => {
    if (author !== user.username && author !== undefined) {
      toast.error('Access denied', { delay: 100, toastId: 'denied' });
      navigate(`/articles/${slug}`);
    }
  }, [author, user.username, navigate, slug]);

  if (author === user.username) {
    return (
      <div className={classes.wrap}>
        <Spin indicator={antIcon} spinning={isPending}>
          <ArticleForm
            type="edit"
            send={(articleData, articleSlug) => dispatch(updateArticle(articleData, articleSlug))}
            slug={slug}
            oldTitle={article.title}
            oldDesc={article.description}
            oldBody={article.body}
            oldTags={article.tagList.map((el) => ({ name: el }))}
          />
        </Spin>
      </div>
    );
  }
}

export default EditArticle;
