import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>
            Yes (Delete Spot)
          </button>
          <button className="cancel-button" onClick={onCancel}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
