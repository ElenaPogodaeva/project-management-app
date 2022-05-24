import './Main.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import BoardPreview from '../../components/BoardPreview/BoardPreview';
import BoardCreate from '../../components/BoardCreate/BoardCreate';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getBoardsList } from '../../redux/thunks/boardThunks';
import CONSTANTS from '../../utils/constants';

const Main = () => {
  const navigate = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useTypedSelector((state) => state.boards);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(
      getBoardsList(
        CONSTANTS.TOKEN
      )
    );
  }, []);

  return (
    <main className="main">
      <div className="board-wrap">
        {isLoading ? (
          <Loading />
        ) : (
          boards.map((value) => <BoardPreview value={value} key={value.id} />)
        )}
        <BoardCreate />
      </div>
    </main>
  );
};

export default Main;
