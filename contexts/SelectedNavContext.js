import React, { useContext, useState } from "react";

// create custom context
const SelectedNavContext = React.createContext();

const GetSelectedNavContext = React.createContext();

// export useable functions to child
export function useSelectedNav() {
  return useContext(SelectedNavContext);
}

export function useGetSelectedNav() {
  return useContext(GetSelectedNavContext);
}

// export to _app.js
export function SelectedNavProvider({ children }) {
  const [selectedNav, setSelectedNav] = useState("");

  const getSelectNav = (navElement) => {
    setSelectedNav(navElement);
  };

  // being returned for AccountProvider(main) function
  return (
    <SelectedNavContext.Provider value={selectedNav}>
      <GetSelectedNavContext.Provider value={getSelectNav}>
        {children}
      </GetSelectedNavContext.Provider>
    </SelectedNavContext.Provider>
  );
}
