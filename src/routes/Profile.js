import { auth } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        auth.signOut();
        history.push("/");
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;