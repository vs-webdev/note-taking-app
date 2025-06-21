import data from '../data.js'
import tagIcon from '../assets/images/icon-tag.svg'
import allNotes from '../assets/images/icon-home.svg'
import archives from '../assets/images/icon-archive.svg'
import logo from '../assets/images/logo.svg'
import { useView } from '../context/ViewContext.jsx'
import { useNote } from '../context/NoteContext.jsx'
import { useSettings } from '../context/SettingContext.jsx'

const NavSidebar = () => {
  const {setCurrentView} = useView()
  const { setSelectedTag } = useNote()
  const {selectedFont} = useSettings()

  const handleViewNav = (view, tag) => {
    if (view === 'tagNotes'){
      setCurrentView(view)
      setSelectedTag(tag)
      return;
    }
    setCurrentView(view)
  }

  return (
    <nav className='sidebar-container' style={{fontFamily: `${selectedFont.optionTitle}`}}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className='notes-nav'>
        <div className='notes-nav-active' onClick={() => handleViewNav('allNotes')}>
          <img src={allNotes} alt="All Notes" />
           All Notes
        </div>
        <div className='' onClick={() => handleViewNav('archivedNotes')}> 
          <img src={archives} alt="Archives" />
          Archived Notes
        </div>
      </div>
      <div className="tags-container">
        <h2>Tags</h2>
        <ul className="tags-lists">
          {
            data.tags.map(tag =>
              <li onClick={() => handleViewNav('tagNotes', tag)}>
                <img src={tagIcon} alt="Tag Icon" />
                {tag}
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

export default NavSidebar
