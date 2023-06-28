import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

const addAudioElement = (blob: Blob) => {
    console.log('blob');
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    audio.play()
    console.log('here')

};

const ChatInput = () => {
    
    return (
        <div className="absolute bottom-0 right-0 w-full">
            <div className="border-t-2 border-gray-200 card dark:border-gray-600 ">
                <div className="px-2 card-body md:p-none">
                    <div className="join">
                    <div className="relative btn join-item">
                       <AudioRecorder
                           classes={{AudioRecorderClass: "flex items-center justify-center absolute left-0"}}
                            onRecordingComplete={addAudioElement}
                            showVisualizer
                            audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                            }}
                            downloadFileExtension="mp3"
                        />
                       </div>
                        <textarea
                            className="w-full ml-4 textarea-xs textarea textarea-bordered"
                            placeholder="Type your message ...."
                        ></textarea>

                        <button className="btn join-item">Send</button>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
