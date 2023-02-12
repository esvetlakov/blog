import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

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

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPending, loginErr, loginSuccess } = useSelector((state) => state.user);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (loginSuccess) {
      navigate(-1);
    }
  }, [loginSuccess, navigate]);

  const onSubmit = ({ email: mail, password: pwd }) => {
    if (dispatch(loginUser({ user: { email: mail.toLowerCase(), password: pwd } }))) {
      toast.success('Successful login', { delay: 100, toastId: 'login' });
      navigate(-1);
    }
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

          <input type="submit" className={classes.submit} value="Login" />
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

export default SignInPage;
