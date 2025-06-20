import ActionButtons from "./ActionButtons"
import ContentSidebar from "./ContentSidebar"
import NoteContent from "./NoteContent"

const NotesView = () => {
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

      <NoteContent 
        dateFormat={dateFormat}
      />
      
      <ActionButtons />
    </div>
  )
}

export default NotesView
