import React, {useState} from "react";
import { storageService, dbService } from "fBase";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {v4 as uuid4 } from "uuid";
import {addDoc, collection, getDocs, query, onSnapshot} from "firebase/firestore"


const JweetFactory = ({userObj}) => {
    const [jweet, setJweet] = useState("");
    const [attachment, setAttachment] =  useState("");
    
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

    return (
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
    )
}

export default JweetFactory