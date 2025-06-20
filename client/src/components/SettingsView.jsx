import lightIcon from '../assets/images/icon-sun.svg'
import darkIcon from '../assets/images/icon-moon.svg'
import sansSerifIcon from '../assets/images/icon-font-sans-serif.svg'
import serifIcon from '../assets/images/icon-font-serif.svg'
import monospaceIcon from '../assets/images/icon-font-monospace.svg'
import { useView } from "../context/ViewContext.jsx"
import { useSettings } from "../context/SettingContext.jsx"

const SettingsView = () => {
  const {currentView} = useView()
  const {settings, selectedSetting, setSelectedSetting, selectedTheme, setSelectedTheme, selectedFont, setSelectedFont} = useSettings()
  const themeIcons = [lightIcon, darkIcon]
  const fontIcons = [sansSerifIcon, serifIcon, monospaceIcon]

  const handleOption = (optionIndex) => {
    if (selectedSetting.id === 0){
      setSelectedTheme(settings[0].options[optionIndex])
    } else {
      setSelectedFont(settings[1].options[optionIndex])
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
                {setting.title}
              </li>
            )}
          </ul>}
        </div>
      </div>

      <div className="settings-options-wrapper">
        <header className="setting-header">
          <h2>{selectedSetting.title}</h2>
          <p>{selectedSetting.desc}</p>
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
                <div className="left">
                  {selectedSetting.title === 'Color Theme' ? (
                    <img src={themeIcons[optIndex]} alt="" />
                  ) : (
                    <img src={fontIcons[optIndex]} />
                  )}
                  <div className="text-wrapper">
                    <h4>{option.optionTitle}</h4>
                    <p>{option.optionDesc}</p>
                  </div>
                </div>
                <div className="right"></div>
              </li>
              )}
            )}
          </ul>
      </div>
    </div>
  )
}

export default SettingsView