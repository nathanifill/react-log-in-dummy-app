import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // This will be executed after ever component re-evaluation. If you update state in here, the component will run again but only if the dependencies are changed (or you're running it for the first time)
    // This code below will run exactly once because the dependencies will never change because it doesn't have any dependencies
    useEffect(() => {
      const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  
      if (storedUserLoggedInInformation === "1") {
        setIsLoggedIn(true);
      }
    }, []);
  
    const loginHandler = (email, password) => {
      // We should of course check email and password
      // But it's just a dummy/ demo anyways
      localStorage.setItem("isLoggedIn", "1");
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
