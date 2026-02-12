import { useView } from '../../context/ViewContext.jsx'
import { useNote } from '../../context/NoteContext.jsx'
import { useSettings } from '../../context/SettingContext.jsx'
import tagIcon from '../../assets/images/icon-tag.svg'
import homeIcon from '../../assets/images/icon-home.svg'
import archiveIcon from '../../assets/images/icon-archive.svg'
import logo from '../../assets/images/logo.svg'
import {v4 as uuidv4} from 'uuid'
import styles from './navSidebar.module.css'

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
    <nav className={styles.sidebarContainer} style={{fontFamily: `${selectedFont.optionTitle}`}}>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.notesNav}>
        <div className={`${currentView === 'allNotes' ? styles.notesNavActive : ""}`} 
          onClick={() => handleViewNav('allNotes')}
        >
          <img src={homeIcon} alt="All Notes" />
           <span className='text-preset-5'>All Notes</span>
        </div>
        <div className={`${currentView === 'archivedNotes' && styles.notesNavActive}`} 
          onClick={() => handleViewNav('archivedNotes')}
        > 
          <img src={archiveIcon} alt="Archives" />
          <span className='text-preset-5'>Archived Notes</span>
        </div>
      </div>
      <div className={styles.tagsContainer}>
        <h2 className='text-preset-3'>Tags</h2>
        <ul className={styles.tagsLists}>
          {
            tags.map(tag =>
              <li 
                className={`${(currentView === 'tagNotes' && selectedTag === tag) && styles.notesNavActive}`}
                key={uuidv4()} 
                onClick={() => handleViewNav('tagNotes', tag)}
              >
                <img src={tagIcon} alt="Tag Icon" />
                <span className='text-preset-5'>{tag}</span>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

export default NavSidebar
