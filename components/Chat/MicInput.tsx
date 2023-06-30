import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export type MicInputProps = {
    startRecording: () => void;
    pauseRecording: () => void;
    stopRecording: () => void;
    recording: boolean;
    speaking: boolean;
    transcribing?: boolean;
    transcript: {
        text?: string;
        blob?: Blob;
    };
};

const MicInput: React.FC<MicInputProps> = ({
    startRecording,
    pauseRecording,
    stopRecording,
    recording,
    speaking,
    transcribing,
    transcript,
}) => {
    const [recordTime, setRecordTime] = useState(0);
    const [currentState, setCurrentState] = useState("stopped");
    const maxRecordSeconds = 60;

    const handleStopClick = () => {
        setRecordTime(0);
        setCurrentState("stopped");
        stopRecording();
    };

    const handleStartClick = () => {
        setCurrentState("recording");
        startRecording();
    };
    const handlePauseClick = () => {
        setCurrentState("paused");
        pauseRecording();
    };

    useEffect(() => {
        if (recording) {
            const interval = setInterval(() => {
                if (recordTime > maxRecordSeconds) {
                    handleStopClick();
                }

                setRecordTime((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [recording, recordTime]);

    return (
        <>
            {!recording && currentState === "stopped" && (
                <button
                    type="button"
                    onClick={handleStartClick}
                    className="btn-success btn btn-circle"
                >
                    <Image
                        src="/images/microphone.svg"
                        alt="Mic"
                        height={25}
                        width={25}
                    ></Image>
                </button>
            )}
            {!recording && currentState === "paused" && (
                <button
                    type="button"
                    onClick={handleStartClick}
                    className="mr-4 btn btn-circle btn-info "
                >
                    <Image
                        src="/images/resume.svg"
                        alt="Mic"
                        height={25}
                        width={25}
                    ></Image>
                </button>
            )}
            {recording && !transcribing && (
                <button
                    className="text-white btn btn-error btn-circle "
                    type="button"
                    onClick={handlePauseClick}
                >
                    <Image
                        src="/images/pause.svg"
                        alt="Mic"
                        height={25}
                        width={25}
                    ></Image>
                </button>
            )}
            {currentState !== "stopped" && !transcribing && (
                <button
                    className="text-white btn btn-primary btn-circle radial-progress"
                    type="button"
                    style={{
                        // @ts-expect-error
                        "--value": `${(recordTime / maxRecordSeconds) * 100}`,
                        "--size": "3rem",
                        "--thickness": "2px",
                    }}
                    onClick={handleStopClick}
                >
                    <Image
                        src="/images/stop.svg"
                        alt="Mic"
                        height={25}
                        width={25}
                    ></Image>
                </button>
            )}
        </>
        // <AudioRecorder
        //     classes={{
        //         AudioRecorderClass:
        //             "flex items-center justify-center absolute left-0",
        //     }}
        //     onRecordingComplete={onRecordComplete}
        //     showVisualizer
        //     audioTrackConstraints={{
        //         noiseSuppression: true,
        //         echoCancellation: true,
        //     }}
        //     recorderControls={recorderControls}
        //     downloadFileExtension="mp3"
        // />
    );
};

export default MicInput;
