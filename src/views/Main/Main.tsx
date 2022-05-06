import './Main.scss';
import BoardPreview from '../../components/BoardPreview/BoardPreview';
import { boardData } from '../../utils/defaultBoardData';

const Main = () => {
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
