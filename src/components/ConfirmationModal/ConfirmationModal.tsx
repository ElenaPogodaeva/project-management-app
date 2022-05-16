import './ConfirmationModal.scss';

type ConfirmationModalType = {
  id: number;
  close: () => void;
  remove: (id: number) => void;
};
const ConfirmationModal = (props: ConfirmationModalType) => {
  const { close, remove, id } = props;
  return (
    <div className="overlay">
      <div className="modal-window">
        <h3 className="modal-title">Are you shore?</h3>
        <div className="btn-wrap">
          <button type="button" className="btn-success" onClick={() => remove(id)}>
            Yes
          </button>
          <button type="button" className="btn-fail" onClick={() => close()}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
