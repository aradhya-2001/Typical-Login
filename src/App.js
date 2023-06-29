import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if(isLoggedIn === '1'){
      setIsLoggedIn(true)
    }
  }, [])  /* 1st time the app runs, at last, code inside useEffect func is ran and the dependencies is noted down (here an empty array). Afterwards when the app runs, code inside the func will not run coz the dependencies has'nt changed i.e. it is still an empty array. */

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1") // key value pair. Variable isLoggedIn = '1'
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, onLogout:logoutHandler}}>
      <MainHeader/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider> 
  );
}

export default App;
