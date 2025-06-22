import { useNote } from "../context/NoteContext"

const ConfirmModal = ({}) => {
  const {setAllNotes, selectedNote} = useNote()
  const {setIsModalOpen, modalData} = useNote()

  const onConfirm = () => {
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-header">
          <img src={modalData.icon} />
          <div className="modal-info">
            <h3>{modalData.title}</h3>
              {modalData.title === 'Archive Note' &&
                <p>Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.</p>
              }
              {modalData.title === 'Restore Note' &&
                <p>Are you sure you want to restore this note? This note will be restored to All Notes section.</p>
              }
              {modalData.title === 'Delete Note' &&
                <p>Are you sure you want to delete this note? This action cannot be undone.</p>
              }
          </div>
        </div>
        <div className="modal-btn-wrapper">
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button onClick={onConfirm}>{modalData.title}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
