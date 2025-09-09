import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useApi } from "../api/axioinstance";
import data from "../data";

const SettingContext = createContext(null)

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
  const api = useApi()

  useEffect(() => {
    const getInfo = async() => {
      try {
        const res = await api.get("/user/get-info")
        if (res.data.success){
          const {userInfo} = res.data
          console.log(userInfo)
          const theme = data.settings[0].options.find(obj => obj.optionTitle === userInfo.settings.theme)
          const font = data.settings[1].options.find(obj => obj.optionTitle === userInfo.settings.font)
          console.log('theme', theme)
          setSelectedTheme(theme)
          setSelectedFont(font)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    getInfo()
  }, [])

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