import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {auth} from "../fBase";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
      <footer>&copy; Jwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
