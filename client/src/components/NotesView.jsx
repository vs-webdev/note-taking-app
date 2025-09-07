import ActionButtons from "./ActionButtons/ActionButtons.jsx"
import ConfirmModal from "./ConfirmModal/ConfirmModal.jsx";
import ContentSidebar from "./ContentSidebar/ContentSidebar.jsx"
import NoteContent from "./NoteContent/NoteContent.jsx"
import { useNote } from "../context/NoteContext";
import NewNote from "./NewNote/NewNote.jsx";

const NotesView = () => {
  const {isModalOpen, showNewNote} = useNote()

  const dateFormat = (lastEdited) =>  new Date(lastEdited).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  
  return (
    <div className="notes-detail-wrapper">
      <ContentSidebar
        dateFormat={dateFormat}
      />

      {showNewNote ? 
        <NewNote /> :
        <NoteContent 
          dateFormat={dateFormat}
        />
      }
      
      <ActionButtons />
      {isModalOpen && <ConfirmModal />}
    </div>
  )
}

export default NotesView
