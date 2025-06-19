import { useView } from "../context/ViewContext"
import iconArchive from '../assets/images/icon-archive.svg'
import iconDelete from '../assets/images/icon-delete.svg'
import iconRestore from '../assets/images/icon-restore.svg'

const ActionButtons = () => {
  const {currentView} = useView()
  return (
    <div className="action-btns-wrapper">
      {currentView === 'allNotes' && <>
        <button><img src={iconArchive} alt="" /> Archive Note</button>
        <button><img src={iconDelete} alt="" /> Delete Note</button>
      </>} 
      {currentView === 'archivedNotes' && <>
        <button><img src={iconRestore} alt="" /> Restore Note</button>
        <button><img src={iconDelete} alt="" /> Delete Note</button>
      </>
      }
    </div>
  )
}

export default ActionButtons
