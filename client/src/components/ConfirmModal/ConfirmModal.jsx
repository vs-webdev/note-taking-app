import { useApi } from "../../api/axioinstance"
import { useNote } from "../../context/NoteContext"
import "./confirmmodal.css"

const ConfirmModal = () => {
  const {setAllNotes, selectedNote, setIsModalOpen, modalData} = useNote()
  const api = useApi()
  
  const onConfirm = async () => {
    switch(modalData.title){
      case 'Delete Note':
        try {
          const res = await api.delete(`/user/notes/${selectedNote._id}`)
          setAllNotes(prev => prev.filter(note => note._id !== selectedNote._id))
          console.log(res.data)
        } catch (error) {
          console.log(error.message)
        }
        break;

      case 'Archive Note':
        try {
          const res = await api.put(`/user/notes/${selectedNote._id}`, {isArchived: true})
          console.log(res)
          setAllNotes(prev => prev.map(note => note._id === selectedNote._id ? ({...note, isArchived: true}) : note))
        } catch (error) {
          console.log(error.message)
        }
        break;

      case 'Restore Note':
        try {
          const res = await api.put(`/user/notes/${selectedNote._id}`, {isArchived: false})
          console.log(res)
          setAllNotes(prev => prev.map(note => note._id === selectedNote._id ? ({...note, isArchived: false}) : note))
        } catch (error) {
          console.log(error.message)
        }
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
            <h3 className="text-preset-3 modal-title">{modalData.title}</h3>
            <p className="text-preset-4 modal-msg">{getModalMsg(modalData.title)}</p>
          </div>
        </div>
        <div className="modal-btn-wrapper">
          <button className="text-preset-4 cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button className={`text-preset-4 ${modalData.title === 'Delete Note' ? 'delete-btn' : 'archive-btn'}`} onClick={onConfirm}>{modalData.title}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
