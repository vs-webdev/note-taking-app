import { createContext, useContext, useState } from "react";
import data from "../data";

const SettingContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingContext)
  if (!context){
    throw new Error("useSettings should be used within SettingsProvider")
  }
  return context
}

export const SettingProvider = ({children}) => {
  const [settings, setSettings] = useState(data.settings)
  const [selectedSetting, setSelectedSetting] = useState(settings[0])
  const [selectedTheme, setSelectedTheme] = useState(settings[0].options[0])
  const [selectedFont, setSelectedFont] = useState(settings[1].options[0])

  const value = {
    settings, setSettings,
    selectedSetting, setSelectedSetting,
    selectedTheme, setSelectedTheme,
    selectedFont, setSelectedFont,
  }

  return <SettingContext.Provider value={value}>
    {children}
  </SettingContext.Provider>
} 