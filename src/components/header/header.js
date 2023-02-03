import { Button } from 'antd';
import { Link } from 'react-router-dom';

import classes from './header.module.scss';

export default function Header() {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="articles">
        Realworld Blog
      </Link>
      <div className={classes.btnWrapper}>
        <Button type="signin" ghost className={classes.signin}>
          Sign In
        </Button>
        <Button type="signup" ghost className={classes.signup}>
          Sign Up
        </Button>
      </div>
    </header>
  );
}
