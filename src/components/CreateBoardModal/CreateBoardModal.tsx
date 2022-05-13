/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import './CreateBoardModal.scss';
import { INewBoardForm } from '../../model/interfaces';
import { useTypedSelector, useAppDispatch } from '../../hooks/hooks';
import { addBoard } from '../../redux/thunks';

type CreateBoardModalType = {
  close: () => void;
};

const CreateBoardModal = (props: CreateBoardModalType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const boards = useTypedSelector((state) => state.boards.boards);
  const { close } = props;

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<INewBoardForm>();

  const onSubmit: SubmitHandler<INewBoardForm> = () => {
    const title = String(getValues('title'));
    const description = String(getValues('description'));
    dispatch(addBoard({ title, description }));
    reset();
    // navigate(`/board/${boards[boards.length]}`); // ?=========================================
  };

  return ReactDOM.createPortal(
    <section className="createBoard-form" onClick={() => close()}>
      <form
        action="#"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="form-title">Create a new Board</h2>
        <input
          className={`form-input input-text ${errors.title ? 'input-error' : null}`}
          placeholder="Title"
          {...register('title', { required: true })}
        />
        <p className={`form-error ${errors.title ? null : 'none'}`}>*Required field</p>

        <input
          className="form-input input-text"
          placeholder="Description"
          {...register('description', { required: false })}
        />
        <button type="submit" className="btn-submit" onClick={() => close()}>
          Create board
        </button>
      </form>
    </section>,
    document.getElementById('modals') as HTMLElement
  );
};

export default CreateBoardModal;
