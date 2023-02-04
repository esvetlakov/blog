import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import classes from './signupPage.module.scss';

function SignupPage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  /*
  const [pwdLengthErr, setPwdLengthErr] = useState(false);
  const [pwdMisMatch, setPwdMisMatch] = useState(false);
*/

  const onChange = (e) => {
    const { target } = e;
    const { value, checked } = target;
    switch (target.name) {
      case 'username':
        setUserName(value);
        break;
      case 'email':
        setEmail(value.toLowerCase());
        break;
      case 'password':
        setPassword(value);
        break;
      case 'repeatPassword':
        setRepeatPassword(value);
        break;
      case 'agreed':
        setAgreed(checked);
        break;
      default:
        return null;
    }
    return null;
  };

  /*
  const onSubmit = () => {

  };
 */
  return (
    <div className={classes.wrap}>
      <form className={classes.form}>
        <h2 className={classes.title}>Create new account</h2>
        <label className={classes.label}>
          Username
          <input type="text" name="username" placeholder="Username" value={userName} onChange={onChange} required />
        </label>
        <label className={classes.label}>
          Email
          <input type="email" name="email" placeholder="Email address" value={email} onChange={onChange} required />
        </label>
        <label className={classes.label}>
          Password
          <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
        </label>
        <label className={classes.label}>
          Repeat password
          <input
            type="password"
            name="repeatPassword"
            placeholder="Password"
            value={repeatPassword}
            onChange={onChange}
            required
          />
        </label>

        <Checkbox className={classes.labelCheckBox} name="agreed" checked={agreed} onChange={onChange} required>
          I agree to the processing of my personal information
        </Checkbox>
        <input type="submit" className={classes.submit} value="Create" />
        <div className={classes.signin}>
          Already have an account?{' '}
          <Link to="/" className={classes.link}>
            Sign In
          </Link>
          .
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
