import Header from './Header.jsx'
import ContentSidebar from "./ContentSidebar.jsx"
import NoteContent from "./NoteContent.jsx"
import { useView } from '../context/ViewContext.jsx'
import ActionButtons from './ActionButtons.jsx'

const Content = () => {
  const {currentView} = useView()
  
  const dateFormat = (lastEdited) =>  new Date(lastEdited).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className='content-wrapper'>
      <Header />
      <div className="notes-detail-wrapper">
        <ContentSidebar
          dateFormat={dateFormat}
        />

        <NoteContent 
          dateFormat={dateFormat}
        />

        <ActionButtons />
      </div>
    </section>
  )
}

export default Content
