import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { updateUser } from '../../redux/actions/actions';

import classes from './profilePage.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function ProfilePage({ user, update }) {
  const { isPending, usernameErr, emailErr, username: oldName, email: oldMail, image: oldImage } = user;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      newUsername: oldName,
      newEmail: oldMail,
      newAvatar: oldImage,
    },
  });

  const onSubmit = ({ newUsername, newEmail, newPassword, newAvatar }) => {
    const sendingData = {};
    if (newUsername === '') {
      sendingData.username = oldName;
    } else {
      sendingData.username = newUsername;
    }
    if (newEmail !== '') sendingData.email = newEmail;
    if (newPassword !== '') sendingData.password = newPassword;
    if (newAvatar !== '') sendingData.image = newAvatar;
    update({ user: sendingData });
  };

  return (
    <div className={classes.wrap}>
      <Spin indicator={antIcon} spinning={isPending}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={classes.title}>Edit profile</h2>
          <label className={!errors.newUsername ? classes.label : `${classes.label} ${classes.err}`}>
            Username
            <input
              type="text"
              placeholder="Username"
              {...register('newUsername', {
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
              {errors?.newUsername && <span>{errors?.newUsername?.message || 'Error'}</span>}
              {usernameErr ? <span>Username is already taken</span> : null}
            </div>
          </label>
          <label className={!errors.newEmail ? classes.label : `${classes.label} ${classes.err}`}>
            Email
            <input type="email" placeholder="Email address" {...register('newEmail')} />
            <div className={classes.errMsg}>
              {errors?.newEmail && <span>{errors?.newEmail?.message || 'Error'}</span>}
              {emailErr ? <span>Email is already taken</span> : null}
            </div>
          </label>
          <label className={!errors.newPassword ? classes.label : `${classes.label} ${classes.err}`}>
            New password
            <input
              type="password"
              placeholder="New password"
              {...register('newPassword', {
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
              {errors?.newPassword && <span>{errors?.newPassword?.message || 'Error'}</span>}
            </div>
          </label>
          <label className={classes.label}>
            Avatar image(url)
            <input type="url" placeholder="Image url" {...register('newAvatar')} />
          </label>

          <input type="submit" className={classes.submit} value="Save" />
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
  update: (data) => dispatch(updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
