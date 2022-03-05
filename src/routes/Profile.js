import { auth, dbService } from "fBase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect , useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        auth.signOut();
        history.push("/");
    }
    const getMyJweets = async() => {
        const q = query(collection(dbService, "jweets"), where("creatorId", "==", `${userObj.uid}`), orderBy("createdAt"));
        const jweets = await getDocs(q);
        console.log(jweets.docs.map(doc => {console.log(doc.data())}) )
    }
    useEffect(() => {
        getMyJweets()
    }, [])

    const onSubmit = (event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placholder="Display name" value={userObj.displayName}/>
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;