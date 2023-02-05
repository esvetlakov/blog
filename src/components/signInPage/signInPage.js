import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { loginUser } from '../../redux/actions/actions';

import classes from './signInPage.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function SignInPage({ user, login }) {
  const navigate = useNavigate();
  const { isPending, loginErr, loginSuccess } = user;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (loginSuccess) {
      navigate('/');
    }
  }, [loginSuccess, navigate]);

  // change to prod fn
  const onSubmit = ({ email: mail, password: pwd }) => {
    login({ user: { email: mail.toLowerCase(), password: pwd } });
  };

  return (
    <div className={classes.wrap}>
      <Spin indicator={antIcon} spinning={isPending}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={classes.title}>Sign In</h2>
          {loginErr ? <span className={classes.loginErr}>Wrong email or password</span> : null}
          <label className={!errors.email ? classes.label : `${classes.label} ${classes.err}`}>
            Email
            <input
              type="email"
              placeholder="Email address"
              {...register('email', {
                required: 'Email is required',
              })}
            />
            <div className={classes.errMsg}>{errors?.email && <span>{errors?.email?.message || 'Error'}</span>}</div>
          </label>
          <label className={!errors.password ? classes.label : `${classes.label} ${classes.err}`}>
            Password
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <div className={classes.errMsg}>
              {errors?.password && <span>{errors?.password?.message || 'Error'}</span>}
            </div>
          </label>

          <input type="submit" className={classes.submit} value="Create" />
          <div className={classes.signin}>
            Already have an account?{' '}
            <Link to="/signin" className={classes.link}>
              Sign In
            </Link>
            .
          </div>
        </form>
      </Spin>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
