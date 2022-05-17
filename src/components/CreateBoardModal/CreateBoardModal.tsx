import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import './CreateBoardModal.scss';
import { INewBoardForm } from '../../types/apiTypes';
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
    reset,
    formState: { errors },
  } = useForm<INewBoardForm>();

  const onSubmit: SubmitHandler<INewBoardForm> = (data) => {
    dispatch(addBoard(data));
    reset();
    close();
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
          name="title"
        />
        <p className={`form-error ${errors.title ? null : 'none'}`}>*Required field</p>
        <button type="submit" className="btn-submit">
          Create board
        </button>
      </form>
    </section>,
    document.getElementById('modals') as HTMLElement
  );
};

export default CreateBoardModal;
