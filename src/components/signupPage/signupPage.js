import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { createUser } from '../../redux/actions/actions';

import classes from './signupPage.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function SignupPage({ user, create }) {
  const navigate = useNavigate();
  const { regPending, usernameErr, emailErr, regSuccess } = user;
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (regSuccess) {
      navigate('/');
    }
  }, [regSuccess, navigate]);

  const onSubmit = (data) => {
    create({ user: { username: data.username, email: data.email, password: data.password } });
  };

  return (
    <div className={classes.wrap}>
      <Spin indicator={antIcon} spinning={regPending}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={classes.title}>Create new account</h2>
          <label className={!errors.usermame ? classes.label : `${classes.label} ${classes.err}`}>
            Username
            <input
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username length should be 3 to 20 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username length should be 3 to 20 characters',
                },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
              })}
            />
            <div className={classes.errMsg}>
              {errors?.usermame && <span>{errors?.usermame?.message || 'Error'}</span>}
              {usernameErr ? <span>Username is already taken</span> : null}
            </div>
          </label>
          <label className={!errors.email ? classes.label : `${classes.label} ${classes.err}`}>
            Email
            <input
              type="email"
              style={{ textTransform: 'lowercase' }}
              placeholder="Email address"
              {...register('email', {
                required: 'Email is required',
              })}
            />
            <div className={classes.errMsg}>
              {errors?.email && <span>{errors?.email?.message || 'Error'}</span>}
              {emailErr ? <span>Email is already taken</span> : null}
            </div>
          </label>
          <label className={!errors.password ? classes.label : `${classes.label} ${classes.err}`}>
            Password
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password length should be 6 to 40 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Password length should be 6 to 40 characters',
                },
              })}
            />
            <div className={classes.errMsg}>
              {errors?.password && <span>{errors?.password?.message || 'Error'}</span>}
            </div>
          </label>
          <label className={!errors.repeatPassword ? classes.label : `${classes.label} ${classes.err}`}>
            Repeat password
            <input
              type="password"
              placeholder="Password"
              {...register('repeatPassword', {
                required: 'Repeat password is required',
                validate: (val) => {
                  if (watch('password') !== val) return 'Passwords must match';
                  return null;
                },
                minLength: {
                  value: 6,
                  message: 'Password length should be 6 to 40 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Password length should be 6 to 40 characters',
                },
              })}
            />
            <div className={classes.errMsg}>
              {errors?.repeatPassword && <span>{errors?.repeatPassword?.message || 'Error'}</span>}
            </div>
          </label>

          <label className={classes.labelCheckBox}>
            <input type="checkbox" className={classes.checkbox} required />
            <span className={classes.checkboxText}>I agree to the processing of my personal information</span>
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
  create: (data) => dispatch(createUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
