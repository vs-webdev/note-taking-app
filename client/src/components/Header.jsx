import searchIcon from '../assets/images/icon-search.svg'
import settings from '../assets/images/icon-settings.svg'
import { useNote } from '../context/NoteContext'
import { useView } from '../context/ViewContext'

const Header = () => {
  const {views, currentView, setCurrentView} = useView()
  const {selectedTag, setSearchValue, searchValue} = useNote()

  const onSearchChange = e => {
    setCurrentView('searchNotes')
    setSearchValue(e.target.value.trim().toLowerCase())
  }
  
  return (
    <div className='header-container'>
      <h1 className='page-title'>{views[currentView].headTitle} {currentView === 'tagNotes' && selectedTag}</h1>

      <div className="header-right">
        <div className="search-bar-container">
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            className='search-bar'
            placeholder='Search by title, content or tags...'
            value={searchValue}
            onChange={e => onSearchChange(e)}
          />
        </div>
        <button className='setting-btn'
          onClick={() => setCurrentView('settings')}
        >
          <img src={settings} alt="Settings" />
        </button>
      </div>
    </div>
  )
}

export default Header
