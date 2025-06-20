import NavSidebar from '../components/NavSidebar.jsx'
import Content from '../components/Content.jsx'
import { ViewProvider } from '../context/ViewContext.jsx'
import { NoteProvider } from '../context/NoteContext.jsx'
import { SettingProvider } from '../context/SettingContext.jsx'
import data from '../data.js'

const AllNotes = () => {
  console.log(data)
  
  return (
    <main className="note-app-container">
      <ViewProvider>
        <SettingProvider>
          <NoteProvider>
            <NavSidebar />
            <Content />
          </NoteProvider>
        </SettingProvider>
      </ViewProvider>
    </main>
  )
}

export default AllNotes