import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fBase";
import {addDoc, collection, getDocs, query, onSnapshot} from "firebase/firestore"
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {v4 as uuid4 } from "uuid";
import Jweet from "components/Jweet";

const Home = ({userObj}) => {
    const [jweet, setJweet] = useState("");
    const [jweets, setJweets] = useState([]);
    const [attachment, setAttachment] =  useState("");
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

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            const attechmentRef = ref(storageService, `${userObj.uid}/${uuid4()}`);
            const response = await uploadString(attechmentRef, attachment, "data_url")
            attachmentUrl = await getDownloadURL(response.ref)
        }
       
        const jweetObj = {
            text : jweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl
        }

        await addDoc(collection(dbService, "jweets"), jweetObj)
        // await addDoc(collection(dbService, "jweets"), {
        //     text : jweet,
        //     createdAt : Date.now(),
        //     creatorId : userObj.uid,
        // })
         setJweet("");
        
       
    }
    const onChange = (event) => {
        const {target : {value}} = event;
        setJweet(value);
    }
   
    const onFileChange = (event) => {
        const {target : {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => {
        setAttachment(null);
    }
    return(
        <div>
            <form>
                <input value={jweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input onClick={onSubmit} type="submit" value="Jweet"/>
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px"/>
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
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