import { auth, dbService } from "fBase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect , useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        auth.signOut();
        history.push("/");
        refreshUser();
    }
    const getMyJweets = async() => {
        const q = query(collection(dbService, "jweets"), where("creatorId", "==", `${userObj.uid}`), orderBy("createdAt"));
        const jweets = await getDocs(q);
        console.log(jweets.docs.map(doc => {console.log(doc.data())}) )
    }
    useEffect(() => {
        getMyJweets()
    }, [])

    const onChange = (event) => {
        const {target : {value}} = event;
        console.log(value);
        setNewDisplayName(value);
    }

    const onSubmit = async (event) =>{
        console.log("onSubmit")
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            console.log('??')
            console.log(userObj)
            console.log(auth)
            await updateProfile(auth.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    }

    return (
        <div className="container" >
            <form onSubmit={onSubmit} className="profileForm" >
                <input 
                    type="text" 
                    placholder="Display name" 
                    value={newDisplayName} 
                    onChange={onChange}
                    autoFocus
                    className="formInput"
                />
                <input 
                    type="submit" 
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop : 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                    Logout
            </span>
        </div>
    )
}

export default Profile;