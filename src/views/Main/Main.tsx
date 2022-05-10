import './Main.scss';
import BoardPreview from '../../components/BoardPreview/BoardPreview';
import { boardData } from '../../utils/defaultBoardData';
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
      <div className="board-wrap">
        {boardData.map((value) => (
          <BoardPreview value={value} key={value.id} />
        ))}
      </div>
    </main>
  );
};

export default Main;
