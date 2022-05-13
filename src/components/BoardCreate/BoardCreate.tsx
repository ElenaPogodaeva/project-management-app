/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import './BoardCreate.scss';
import CreateBoardModal from '../CreateBoardModal/CreateBoardModal';

const BoardCreate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="boardCreate-wrap">
        <div className="add-board" onClick={() => toggleModal()} />
      </div>
      {isOpen && <CreateBoardModal close={toggleModal} />}
    </>
  );
};

export default BoardCreate;
