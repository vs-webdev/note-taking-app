import { useNote } from "../context/NoteContext"

const ConfirmModal = () => {
  const {setAllNotes, selectedNote, setIsModalOpen, modalData} = useNote()

  const onConfirm = () => {
    switch(modalData.title){
      case 'Delete Note':
        setAllNotes(prev => prev.filter(note => note.id !== selectedNote.id))
        break;

      case 'Archive Note':
        setAllNotes(prev => prev.map(note => note.id === selectedNote.id ? ({...note, isArchived: true}) : note))
        break;

      case 'Restore Note':
        setAllNotes(prev => prev.map(note => note.id === selectedNote.id ? ({...note, isArchived: false}) : note))
        break;
      
      default:
        break;
    }
    setIsModalOpen(false)
  }

  const getModalMsg = (title) => {
    switch(title){
      case 'Archive Note':
        return "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
      case 'Restore Note':
        return "Are you sure you want to restore this note? This note will be restored to All Notes section."
      case 'Delete Note':
        return "Are you sure you want to delete this note? This action cannot be undone."
    }
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-header">
          <img src={modalData.icon} />
          <div className="modal-info">
            <h3>{modalData.title}</h3>
            <p>{getModalMsg(modalData.title)}</p>
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
