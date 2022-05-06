import { useState } from 'react';
import './BoardPreview.scss';
import { IBoardData, boardData } from '../../utils/defaultBoardData';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

type BoardPreviewTypes = {
  value: IBoardData;
  key: number;
};

const BoardPreview = (props: BoardPreviewTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const { value, key } = props;

  const toggleModal = () => {
    setIsOpen(!isOpen);
    console.log('close');
  };

  const removeModal = (id: number) => {
    setIsOpen(!isOpen);
    console.log(id);
  };
  return (
    <>
      <div className="boardPreview">
        <header className="board-header">
          <h2 className="board-title">{value.title}</h2>
          <button type="button" className="board-delete" onClick={() => toggleModal()}>
            .
          </button>
        </header>
        <p className="board-description">{value.description}</p>
      </div>
      <div className="">
        {isOpen && <ConfirmationModal close={toggleModal} remove={removeModal} id={key} />}
      </div>
    </>
  );
};

export default BoardPreview;
