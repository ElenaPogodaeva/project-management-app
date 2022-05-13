import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.scss';
import BoardPreview from '../../components/BoardPreview/BoardPreview';
import BoardCreate from '../../components/BoardCreate/BoardCreate';
import { useTypedSelector } from '../../hooks/hooks';

const Main = () => {
  const navigate = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.auth);
  const boards = useTypedSelector((state) => state.boards.boards);

  useEffect(() => {
    if (!isAuth) navigate('/');
  }, [isAuth]);

  return (
    <main className="main">
      <div className="board-wrap">
        {boards.length !== 0 &&
          boards.map((value) => <BoardPreview value={value} key={value.id} />)}
        <BoardCreate />
      </div>
    </main>
  );
};

export default Main;
