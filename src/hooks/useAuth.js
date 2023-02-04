import { useSelector } from 'react-redux';

export default function useAuth() {
  const { email, token, username, image, isAuth } = useSelector((state) => state.user);

  return {
    email,
    token,
    username,
    image,
    isAuth,
  };
}
