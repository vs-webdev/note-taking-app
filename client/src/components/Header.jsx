import search from '../assets/images/icon-search.svg'
import settings from '../assets/images/icon-settings.svg'
import { useView } from '../context/ViewContext'

const Header = () => {
  const {views, currentView, setCurrentView} = useView()
  
  return (
    <div className='header-container'>
      <h1 className='page-title'>{views[currentView].headTitle}</h1>

      <div className="header-right">
        <div className="search-bar-container">
          <img src={search} alt="" />
          <input
            className='search-bar'
            placeholder='Search by title, content or tags...'
            type="text"
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
