import { useView } from "../context/ViewContext"
import iconArchive from '../assets/images/icon-archive.svg'
import iconDelete from '../assets/images/icon-delete.svg'
import iconRestore from '../assets/images/icon-restore.svg'
import { useNote } from "../context/NoteContext"

const ActionButtons = () => {
  const {currentView} = useView()
  const {setModalData, setIsModalOpen, selectedNote} = useNote()

  const handleOnAction = (icon, title) => {
    if (!selectedNote) return;
    setIsModalOpen(true)
    setModalData({
      icon,
      title,
    })
  }

  return (<>
    <div className="action-btns-wrapper">
      {(currentView === 'allNotes' || currentView === 'tagNotes') && <>
        <button onClick={() => handleOnAction(iconArchive, 'Archive Note')}><img src={iconArchive} /> Archive Note</button>
        <button onClick={() => handleOnAction(iconDelete, 'Delete Note')} ><img src={iconDelete} /> Delete Note</button>
      </>} 
      {currentView === 'archivedNotes' && <>
        <button onClick={() => handleOnAction(iconRestore, 'Restore Note')} ><img src={iconRestore} /> Restore Note</button>
        <button onClick={() => handleOnAction(iconDelete, 'Delete Note')} ><img src={iconDelete} /> Delete Note</button>
      </>
      }
    </div>
  </>)
}

export default ActionButtons
