import Header from './Header.jsx'
import { useView } from '../context/ViewContext.jsx'
import SettingsView from './SettingsView.jsx'
import NotesView from './NotesView.jsx'

const Content = () => {
  const {currentView} = useView()

  return (
    <section className='content-wrapper'>
      <Header />
        {currentView !== 'settings' 
          ? <NotesView />
          : <SettingsView />
        }
    </section>
  )
}

export default Content