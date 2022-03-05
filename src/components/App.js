import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {auth} from "../fBase";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])

  return (
    <>
      <div>{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}</div>
      {/* <footer>&copy; Jwitter {new Date().getFullYear()}</footer> */}
    </>
  );
}

export default App;
