import { useState } from 'react';
import './BoardPreview.scss';
import { IBoard } from '../../model/interfaces';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

type BoardPreviewTypes = {
  value: IBoard;
};

const BoardPreview = (props: BoardPreviewTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const { value } = props;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const removeModal = (id: number) => {
    toggleModal();
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
        <p className="board-description">{value.title}</p>
      </div>
      <div className="">
        {isOpen && <ConfirmationModal close={toggleModal} remove={removeModal} id={+value.id} />}
      </div>
    </>
  );
};

export default BoardPreview;
