import styles from "./settingsView.module.css"
import lightIcon from '../../assets/images/icon-sun.svg'
import darkIcon from '../../assets/images/icon-moon.svg'
import sansSerifIcon from '../../assets/images/icon-font-sans-serif.svg'
import serifIcon from '../../assets/images/icon-font-serif.svg'
import monospaceIcon from '../../assets/images/icon-font-monospace.svg'
import { useView } from "../../context/ViewContext.jsx"
import { useSettings } from "../../context/SettingContext.jsx"
import { useApi } from '../../api/axioinstance.js'
import { useAuth } from '../../context/AuthContext.jsx'

const SettingsView = () => {
  const api = useApi()
  const {currentView} = useView()
  const {setIsAuthenticated, setAccessToken} = useAuth()
  const {settings, selectedSetting, setSelectedSetting, selectedTheme, setSelectedTheme, selectedFont, setSelectedFont} = useSettings()
  const themeIcons = [lightIcon, darkIcon]
  const fontIcons = [sansSerifIcon, serifIcon, monospaceIcon]
  
  const handleOption = async (option) => {
    try {
      const fieldMap = {
        theme: {setter: setSelectedTheme},
        font: {setter: setSelectedFont}
      }
      
      const {name} = selectedSetting;
      const {setter} = fieldMap[name]
      const res = await api.put("/user/settings", {[name]: option.optionTitle})
      console.log(res)
      setter(option)
    } catch (error) {
      console.log(error.message)
    }
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
    <div className={styles.settingsViewWrapper}>
      <div className={styles.settingsSidebarWrapper}>
        <div className={styles.settingsListContainer}>
          {currentView === 'settings' && <ul className={styles.settingsList}>
            {settings.map((setting, index) =>
              <li className={`${styles.settingsItem} ${selectedSetting.id === index && activeSetting}`} key={index}
                onClick={() => setSelectedSetting(settings[index])}
              >
                <h3 className='text-preset-5'>{setting.title}</h3>
              </li>
            )}
          </ul>}
          <div className={styles.settingsItem} onClick={handleLogout}>
            <h3 className='text-preset-5'>Logout</h3>
          </div>
        </div>
      </div>

      <div className={styles.settingsOptionsWrapper}>
        <header className={styles.settingHeader}>
          <h2 className='text-preset-3'>{selectedSetting.title}</h2>
          <p className='text-preset-5'>{selectedSetting.desc}</p>
        </header>
          <ul className={styles.optionsListContainer}>
            {selectedSetting.options.map((option, optIndex) => {
              const isColorTheme = selectedSetting.title === 'Color Theme'
              const isActive = isColorTheme 
              ? selectedTheme.id === optIndex 
              : selectedFont.id === optIndex

              return (
              <li className={`${styles.option} ${isActive && styles.activeOption}`} 
                key={optIndex}
                onClick={() => handleOption(option)}
              >
                <div className={styles.optionDescription}>
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
                <div className={styles.rightIcon}></div>
              </li>
              )}
            )}
          </ul>
      </div>
    </div>
  )
}

export default SettingsView