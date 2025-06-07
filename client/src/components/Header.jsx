import search from '../assets/images/icon-search.svg'
import settings from '../assets/images/icon-settings.svg'

const Header = () => {
  
  return (
    <div className='header-container'>
      <h1 className='page-title'>All Notes</h1>

      <div className="header-right">
        <div className="search-bar-container">
          <img src={search} alt="" />
          <input
            className='search-bar'
            placeholder='Search by title, content or tags...'
            type="text"
          />
        </div>
        <button className='setting-btn'>
          <img src={settings} alt="Settings" />
        </button>
      </div>
    </div>
  )
}

export default Header
