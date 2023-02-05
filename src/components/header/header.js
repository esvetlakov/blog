import { Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { logOut } from '../../redux/actions/actions';

import classes from './header.module.scss';

function Header({ user, logout }) {
  const { isAuth, username, image } = user;

  const onClickLogout = () => {
    logout();
    toast.success('Successful logout', { delay: 100 });
  };

  const loggedIn = () => {
    if (isAuth) {
      return (
        <>
          <Link to="new-article">
            <Button type="new-article" size="small" ghost className={classes.greenBtn}>
              Create Article
            </Button>
          </Link>
          <Link to="edit-profile" className={classes.user}>
            <span className={classes.username}>{username}</span>
            <Avatar size="large" icon={<UserOutlined />} src={image} />
          </Link>
          <Button type="logout" size="large" ghost className={classes.logout} onClick={onClickLogout}>
            Log out
          </Button>
        </>
      );
    }

    return (
      <>
        <Link to="/signin">
          <Button type="signin" size="large" ghost className={classes.signin}>
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button type="signup" size="large" ghost className={classes.greenBtn}>
            Sign Up
          </Button>
        </Link>
      </>
    );
  };

  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="/">
        Realworld Blog
      </Link>
      <div className={classes.wrapper}>{loggedIn()}</div>
    </header>
  );
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
