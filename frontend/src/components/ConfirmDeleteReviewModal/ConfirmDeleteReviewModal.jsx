import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/review';
import { useModal } from '../../context/Modal';
import './ConfirmDeleteReviewModal.css';

const ConfirmDeleteReviewModal = ({ reviewId, onDeleteSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
   
    try {
      await dispatch(deleteReview(reviewId));
      onDeleteSuccess();
      closeModal(); // Close the modal after successful deletion
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="confirm-delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button className="confirm-delete-button" onClick={handleDelete}>Yes (Delete Review)</button>
      <button className="cancel-delete-button" onClick={() => { onCancel(); closeModal(); }}>No (Keep Review)</button>
    </div>
  );
};

export default ConfirmDeleteReviewModal;
