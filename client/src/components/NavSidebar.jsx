import { useView } from '../context/ViewContext.jsx'
import { useNote } from '../context/NoteContext.jsx'
import { useSettings } from '../context/SettingContext.jsx'
import {v4 as uuidv4} from 'uuid'
import tagIcon from '../assets/images/icon-tag.svg'
import homeIcon from '../assets/images/icon-home.svg'
import archiveIcon from '../assets/images/icon-archive.svg'
import logo from '../assets/images/logo.svg'

const NavSidebar = () => {
  const {setCurrentView, currentView} = useView()
  const {setSelectedTag, selectedTag, tags} = useNote()
  const {selectedFont} = useSettings()

  const handleViewNav = (view, tag) => {
    if (view === 'tagNotes'){
      setSelectedTag(tag)
    }
    setCurrentView(view)
  }

  return (
    <nav className='sidebar-container' style={{fontFamily: `${selectedFont.optionTitle}`}}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className='notes-nav'>
        <div className={`${currentView === 'allNotes' ? "notes-nav-active" : ""}`} onClick={() => handleViewNav('allNotes')}>
          <img src={homeIcon} alt="All Notes" />
           <span>All Notes</span>
        </div>
        <div className={`${currentView === 'archivedNotes' && "notes-nav-active"}`} onClick={() => handleViewNav('archivedNotes')}> 
          <img src={archiveIcon} alt="Archives" />
          <span>Archived Notes</span>
        </div>
      </div>
      <div className="tags-container">
        <h2>Tags</h2>
        <ul className="tags-lists">
          {
            tags.map(tag =>
              <li 
                className={`${(currentView === 'tagNotes' && selectedTag === tag) && "notes-nav-active"}`}
                key={uuidv4()} 
                onClick={() => handleViewNav('tagNotes', tag)}
              >
                <img src={tagIcon} alt="Tag Icon" />
                <span>{tag}</span>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

export default NavSidebar
