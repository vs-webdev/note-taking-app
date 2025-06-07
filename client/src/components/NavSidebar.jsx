import data from '../data.js'
import tagIcon from '../assets/images/icon-tag.svg'
import allNotes from '../assets/images/icon-home.svg'
import archives from '../assets/images/icon-archive.svg'
import logo from '../assets/images/logo.svg'

const NavSidebar = () => {
  return (
    <div className='sidebar-container'>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className='notes-nav'>
        <div className='notes-nav-active'>
          <img src={allNotes} alt="All Notes" />
           All Notes
        </div>
        <div className=''> 
          <img src={archives} alt="Archives" />
          Archived Notes
        </div>
      </div>
      <div className="tags-container">
        <h2>Tags</h2>
        <ul className="tags-lists">
          {
            data.tags.map(tag =>
              <li>
                <img src={tagIcon} alt="Tag Icon" />
                {tag}
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default NavSidebar
