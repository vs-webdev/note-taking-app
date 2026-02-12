import { useApi } from "../../api/axioinstance"
import { useNote } from "../../context/NoteContext"
import styles from "./confirmModal.module.css"

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
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        
        <div className={styles.modalHeader}>
          <img src={modalData.icon} />
          <div className={styles.modalInfo}>
            <h3 className={`text-preset-3 ${styles.modalTitle}`}>{modalDataTitle}</h3>
            <p className={`text-preset-4 ${modalMsg}`}>{getModalMsg(modalDataTitle)}</p>
          </div>
        </div>

        <div className={styles.modalBtnWrapper}>
          <button className={`text-preset-4 ${cancelBtn}`} 
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button 
            className={`text-preset-4 ${
              modalData.title === 'Delete Note' 
                ? deleteBtn
                : archiveBtn
            }`}
            onClick={onConfirm}
          >
            {modalData.title}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
