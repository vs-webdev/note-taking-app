import NavSidebar from '../components/NavSidebar.jsx'
import Content from '../components/Content.jsx'
import { ViewProvider } from '../context/ViewContext.jsx'
import { NoteProvider } from '../context/NoteContext.jsx'

const AllNotes = () => {
  
  return (
    <main className="note-app-container">
      <ViewProvider>
        <NoteProvider>
          <NavSidebar />
          <Content />
        </NoteProvider>
      </ViewProvider>
    </main>
  )
}

export default AllNotes