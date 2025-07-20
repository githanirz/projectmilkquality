import PropTypes from "prop-types";

const Modal = ({ id, title, message, onConfirm, onCancel, hideCancel }) => {
  return (
    <div>
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button
                className="btn btn-active btn-success"
                onClick={onConfirm}
              >
                {hideCancel ? "Tutup" : "Yes"}
              </button>
              {!hideCancel && (
                <button className="btn btn-active btn-error" onClick={onCancel}>
                  No
                </button>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  hideCancel: PropTypes.bool,
};

Modal.defaultProps = {
  hideCancel: false,
};

export default Modal;
