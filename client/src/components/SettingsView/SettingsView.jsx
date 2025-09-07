import lightIcon from '../../assets/images/icon-sun.svg'
import darkIcon from '../../assets/images/icon-moon.svg'
import sansSerifIcon from '../../assets/images/icon-font-sans-serif.svg'
import serifIcon from '../../assets/images/icon-font-serif.svg'
import monospaceIcon from '../../assets/images/icon-font-monospace.svg'
import { useView } from "../../context/ViewContext.jsx"
import { useSettings } from "../../context/SettingContext.jsx"
import { useApi } from '../../api/axioinstance.js'
import { useAuth } from '../../context/AuthContext.jsx'
import "./settingsview.css"

const SettingsView = () => {
  const {currentView} = useView()
  const {setIsAuthenticated, setAccessToken} = useAuth()
  const api = useApi()
  const {settings, selectedSetting, setSelectedSetting, selectedTheme, setSelectedTheme, selectedFont, setSelectedFont} = useSettings()
  const themeIcons = [lightIcon, darkIcon]
  const fontIcons = [sansSerifIcon, serifIcon, monospaceIcon]

  const handleOption = (optionIndex) => {
    selectedSetting.id === 0 ?
      setSelectedTheme(settings[0].options[optionIndex]) :
      setSelectedFont(settings[1].options[optionIndex])
  }

  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout")
      if (res.data.success) {
        setIsAuthenticated(false)
        setAccessToken(null)   // also clear the access token
      }
      console.log("Logout success:", res.data)
    } catch (error) {
      console.log("Logout error:", error.message)

      // Even if API fails, force logout locally
      setIsAuthenticated(false)
      setAccessToken(null)
    }
  }

  return (
    <div className="settings-view-wrapper">
      <div className="settings-sidebar-wrapper">
        <div className="settings-list-container">
          {currentView === 'settings' && <ul className="settings-list">
            {settings.map((setting, index) =>
              <li className={`settings-item ${selectedSetting.id === index && 'active-setting'}`} key={index}
                onClick={() => setSelectedSetting(settings[index])}
              >
                <h3 className='text-preset-5'>{setting.title}</h3>
              </li>
            )}
          </ul>}
          <div className="settings-item" onClick={handleLogout}>
            <h3 className='text-preset-5'>Logout</h3>
          </div>
        </div>
      </div>

      <div className="settings-options-wrapper">
        <header className="setting-header">
          <h2 className='text-preset-3'>{selectedSetting.title}</h2>
          <p className='text-preset-5'>{selectedSetting.desc}</p>
        </header>
          <ul className="options-list-container">
            {selectedSetting.options.map((option, optIndex) => {
              const isColorTheme = selectedSetting.title === 'Color Theme'
              const isActive = isColorTheme 
              ? selectedTheme.id === optIndex 
              : selectedFont.id === optIndex

              return (<li className={`option ${isActive && 'active-option'}`} 
                key={optIndex}
                onClick={() => handleOption(optIndex)}
              >
                <div className="option-description">
                  {selectedSetting.title === 'Color Theme' ? (
                    <img src={themeIcons[optIndex]} alt="" />
                  ) : (
                    <img src={fontIcons[optIndex]} />
                  )}
                  <div className="text-wrapper">
                    <h4 className='text-preset-4'>{option.optionTitle}</h4>
                    <p className='text-preset-5'>{option.optionDesc}</p>
                  </div>
                </div>
                <div className="right-icon"></div>
              </li>
              )}
            )}
          </ul>
      </div>
    </div>
  )
}

export default SettingsView