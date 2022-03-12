import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {auth} from "../fBase";
import { updateProfile } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName :user.displayName,
          uid:user.displayName,
          updateProfile : (args) => updateProfile(user, {
            displayNmae:user.displayNmae
          })
        });
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  },[])
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName :user.displayName,
      uid:user.uid,
      updateProfile : (args) => updateProfile(user, {
        displayNmae:user.displayNmae
      })
    });
  }
  return (
    <>
      <div>{init ? <AppRouter refreshUser={refreshUser}  userObj={userObj}/> : "Initializing..."}</div>
      {/* <footer>&copy; Jwitter {new Date().getFullYear()}</footer> */}
    </>
  );
}

export default App;
