import React, {useState} from "react";
import { storageService, dbService } from "fBase";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {v4 as uuid4 } from "uuid";
import {addDoc, collection, getDocs, query, onSnapshot} from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


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
        if(jweet === ""){
            return;
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
        setAttachment("");
    }

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container" >
                <input 
                    className="factoryInput__input"
                    value={jweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120}
                />
                <input 
                    className="factoryInput__arrow"
                    type="submit" 
                    value="&#10140;"
                    onChange={onFileChange}
                />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus}/>
            </label>
            <input 
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img 
                        src={attachment} 
                        width="50px" 
                        height="50px"
                        style={{
                            backgroundImage : attachment,
                        }}
                        alt="attachment"
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
            )}
        </form>
    )
}

export default JweetFactory