import ActionButtons from "./ActionButtons"
import ConfirmModal from "./ConfirmModal";
import ContentSidebar from "./ContentSidebar"
import NoteContent from "./NoteContent"
import { useNote } from "../context/NoteContext";
import NewNote from "./NewNote";

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
