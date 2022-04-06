import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/userReducer';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(setUser(null));
    router.push('/login');
  });
  return <div></div>;
};

export default Logout;
