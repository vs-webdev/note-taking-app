import { useNote } from '../../context/NoteContext'
import { useView } from '../../context/ViewContext'
import searchIcon from '../../assets/images/icon-search.svg'
import settings from '../../assets/images/icon-settings.svg'
import styles from './header.module.css'

const Header = () => {
  const {views, currentView, setCurrentView} = useView()
  const {selectedTag, setSearchValue, searchValue} = useNote()

  const onSearchChange = e => {
    setCurrentView('searchNotes')
    setSearchValue(e.target.value.trim().toLowerCase())
  }
  
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.pageTitle}>{views[currentView].headTitle} {currentView === 'tagNotes' && selectedTag}</h1>

      <div className={styles.headerRight}>
        <div className={styles.searchBarContainer}>
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            className={styles.searchBar}
            placeholder='Search by title, content or tags...'
            value={searchValue}
            onChange={e => onSearchChange(e)}
          />
        </div>
        <button className={styles.settingBtn}
          onClick={() => setCurrentView('settings')}
        >
          <img src={settings} alt="Settings" />
        </button>
      </div>
    </div>
  )
}

export default Header
