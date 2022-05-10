import './Main.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';

const Main = () => {
  const navigate = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) navigate('/welcome');
  }, [isAuth]);

  return (
    <main className="main">
      <div className="center-container">main</div>
    </main>
  );
};

export default Main;
