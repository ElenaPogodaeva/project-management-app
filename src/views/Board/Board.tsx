import './Board.scss';

const Board = () => {
  return (
    <div className="board">
      <div className="center-container">
        <section className="board-header">Board title</section>
        <section className="column-list">
          <div className="column-item">
            <div className="column-title-wrapper">
              <h3 className="column-title">Tasks to Do</h3>
            </div>
            <ul className="card-list">
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
            </ul>
            <button type="button" className="add-card-btn">
              Add a card...
            </button>
          </div>
          <div className="column-item">
            <div className="column-title-wrapper">
              <h3 className="column-title">In progress</h3>
            </div>
            <ul className="card-list">
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
            </ul>
          </div>
          <div className="column-item">
            <div className="column-title-wrapper">
              <h3 className="column-title">Completed Tasks</h3>
            </div>
            <ul className="card-list">
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
              <li className="card-item">Lorem ipsum dolor sit.</li>
            </ul>
          </div>
          <button type="button" className="add-column-btn">
            Add a list...
          </button>
        </section>
      </div>
    </div>
  );
};

export default Board;
