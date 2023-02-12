import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { createArticle } from '../../redux/actions/actions';
import ArticleForm from '../../components/articleForm';

import classes from './newArticle.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function NewArticle() {
  const { isPending } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className={classes.wrap}>
      <Spin indicator={antIcon} spinning={isPending}>
        <ArticleForm type="new" send={(data) => dispatch(createArticle(data))} />
      </Spin>
    </div>
  );
}

export default NewArticle;
