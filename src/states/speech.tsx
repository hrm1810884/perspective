"use client";
import { useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition as usePrimitiveSpeechRecognition,
} from "react-speech-recognition";

export const useSpeechRecognition = () => {
    const [listening, setListening] = useState(false);
    const { transcript, interimTranscript, finalTranscript, resetTranscript } =
        usePrimitiveSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
        setListening(true);
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setListening(false);
        resetTranscript();
    };

    return {
        transcript,
        listening,
        handler: {
            startListening,
            stopListening,
        },
    };
};
