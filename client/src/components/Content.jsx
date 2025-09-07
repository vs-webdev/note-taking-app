import SettingsView from './SettingsView/SettingsView.jsx'
import NotesView from './NotesView.jsx'
import Header from './Header/Header.jsx'
import { useView } from '../context/ViewContext.jsx'
import { useSettings } from '../context/SettingContext.jsx'

const Content = () => {
  const {currentView} = useView()
  const {selectedFont} = useSettings()

  return (
    <section className='content-wrapper' style={{fontFamily: `${selectedFont.optionTitle}`}}>
      <Header />
        {currentView !== 'settings' 
          ? <NotesView /> 
          : <SettingsView />
        }
    </section>
  )
}

export default Content