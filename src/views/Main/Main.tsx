import './Main.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import BoardPreview from '../../components/BoardPreview/BoardPreview';
import BoardCreate from '../../components/BoardCreate/BoardCreate';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getBoardsList } from '../../redux/thunks/boardThunks';

const Main = () => {
  const navigate = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useTypedSelector((state) => state.boards);

  useEffect(() => {
    if (!isAuth) navigate('/');
  }, [isAuth]);

  useEffect(() => {
    dispatch(
      getBoardsList(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1OGM4MzU3YS0yODllLTQ3ZTgtYjI0Ni04MjdjZmY3MGUyNzkiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIzNzY3Mjl9.qSlVZp4Mazgjt003o44VrjvKpaaA8-hWZ8b_pZ8Uzas'
      )
    );
  }, []);

  return (
    <main className="main">
      <div className="board-wrap">
        {isLoading ? (
          <Loading />
        ) : (
          (boards.map((value) => <BoardPreview value={value} key={value.id} />), (<BoardCreate />))
        )}
      </div>
    </main>
  );
};

export default Main;
