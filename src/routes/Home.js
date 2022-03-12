import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fBase";
import {addDoc, collection, getDocs, query, onSnapshot} from "firebase/firestore"
import Jweet from "components/Jweet";
import JweetFactory from "components/JweetFactory";

const Home = ({userObj}) => {
    const [jweets, setJweets] = useState([]);
    const getJweets = async() => {
        const q = query(collection(dbService, "jweets")); 
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(document =>{
            const jweetObject = {
                ...document.data(),
                id : document.id
            }
            setJweets((prev) => [document.data(), ...prev]);
        })

    }
    useEffect(() => {
        getJweets();
        const q = query(collection(dbService, "jweets"));
        onSnapshot(q, (snapshot) => {
            const jweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }))
            setJweets(jweetArray);
        })
    }, [])


    return( 
        <div className="container">
            <JweetFactory userObj={userObj}/>
            <div style={{marginTop : 30}}>
                {jweets.map(jweet => (
                    <Jweet 
                        key={jweet.id} 
                        jweetObj={jweet} 
                        isOwner={jweet.creatorId === userObj.uid}

                    />
                ))}
            </div>
        </div>
    )

}
export default Home;