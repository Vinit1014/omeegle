import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Room } from "./Room";

export const Landing = ()=>{
    const [name, setName] = useState("");
    const [localVideoTrack,setLocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [localAudioTrack,setLocalAudioTrack] = useState<MediaStreamTrack | null>(null); //this contains the audio of your video track it contains basic functions like mute, increase, decrease the volume accordingly.
    
    const [joined,setJoined] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const getCam = async()=>{
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        //when we write above function we get access to MediaStream
        //and getAudioTracks get access to all audio tracks available there and we are currently accessing only first audio track
        const audioTrack = stream.getAudioTracks()[0];
        const videoTrack = stream.getVideoTracks()[0]; //here mistake can be there
        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        
        videoRef.current.srcObject = new MediaStream([videoTrack]);
        videoRef.current.play();
    }

    useEffect(()=>{
        if (videoRef && videoRef.current) {
            getCam()
        }
    },[videoRef])

    if (!joined) {
        return(
            <div>
                <video autoPlay ref={videoRef}></video>
            <h1>Hello</h1>
            <input type="text" onChange={(e) => {
                setName(e.target.value);
            }}> 
            </input>
            <button onClick={()=>{
                setJoined(true);
            }}>Join</button>
            {/* <Link to={`/room/?name=${name}`}>Join</Link> */}
        </div>
        ) 
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack}/>

}
