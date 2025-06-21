import { createContext, useContext, useState } from "react";

const views = {
  allNotes: {
    headTitle: 'All Notes',
  },
  archivedNotes: {
    headTitle: 'Archived Notes',
  },
  tagNotes: {
    headTitle: 'Notes Tagged:'
  },
  settings: {
    headTitle: 'Settings',
  }
}

const ViewContext = createContext()

export const useView = () => {
  const context = useContext(ViewContext)
  if (!context) {
    throw new Error('useView must be used within ViewProvider')
  }
  return context
}

export const ViewProvider = ({children}) => {
  const [currentView, setCurrentView] = useState('allNotes')

  return <ViewContext.Provider value={{views, currentView, setCurrentView}}>
    {children}
  </ViewContext.Provider>
}