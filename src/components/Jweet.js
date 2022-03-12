import { dbService, storageService } from "fBase";
import { doc, deleteDoc , updateDoc} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Jweet = ({jweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newJweet, setNewJweet] = useState(jweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want delete this jweet?");
        console.log(ok);
        if(ok){
            //delete jweet
            const JweetText = doc(dbService, "jweets", `${jweetObj.id}`)
            await deleteDoc(JweetText);
            if(jweetObj.attachmentUrl){
                const JweetImage = ref(storageService, jweetObj.attachmentUrl);
                await deleteObject(JweetImage);
            }

        }
    }


    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        const JweetTextRef = doc(dbService, "jweets", jweetObj.id);
        await updateDoc(JweetTextRef, {
            text : newJweet
        });
        setEditing(false);

    }
    const onChange = (event) => {
        const {target : {value}} = event;
        setNewJweet(value);
        
    }
  return(
      <div className="jweet">
        {
            editing ?
                <>
                     <form onSubmit={onSubmit} className="container jweetEdit" >
                        <input 
                            type="text" 
                            placeholder="Edit your jweet" 
                            value={newJweet} 
                            onChange={onChange}  
                            required
                            autoFocus
                            className="formInput"
                            />
                        <input 
                            type="submit" 
                            value="Update Jweet"
                            className="formBtn"
                        />
                    </form> 
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                 </> 
                : 
                <> 
                    <h4 style={{wordBreak : "break-all" , margin: 10, marginLeft : 15}}>{jweetObj.text}</h4>
                    {jweetObj.attachmentUrl && <img src={jweetObj.attachmentUrl} />}
                        {isOwner && (
                            <div className="jweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash}/>    
                                </span>
                                <spna onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                </spna>
                            </div>
                        )}
                </>
        }
       </div>
    )
}

export default Jweet;