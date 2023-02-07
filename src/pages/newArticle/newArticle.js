import { connect } from 'react-redux';
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
// eslint-disable-next-line
function NewArticle({ isPending, send }) {
  return (
    <div className={classes.wrap}>
      <Spin indicator={antIcon} spinning={isPending}>
        <ArticleForm type="new" send={send} />
      </Spin>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { user } = state;
  return user;
};

const mapDispatchToProps = (dispatch) => ({
  send: (data) => dispatch(createArticle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
