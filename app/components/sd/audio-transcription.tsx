import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from "@/app/components/button";
import { AudioHandler } from "@/app/lib/audio";
import { showToast } from "@/app/components/ui-lib";
import styles from "./sd-panel.module.scss";

interface AudioTranscriptionProps {
  onTranscriptionComplete?: (transcription: string) => void;
}

export function AudioTranscription({ onTranscriptionComplete }: AudioTranscriptionProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const audioHandlerRef = useRef<AudioHandler | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Initialize audio handler
    audioHandlerRef.current = new AudioHandler();
    return () => {
      if (audioHandlerRef.current) {
        audioHandlerRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      if (!audioHandlerRef.current) {
        audioHandlerRef.current = new AudioHandler();
      }

      await audioHandlerRef.current.initialize();

      // Start recording using MediaRecorder for transcription
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      showToast('Recording started... Tell your prophet story');
    } catch (error) {
      console.error('Error starting recording:', error);
      showToast('Error starting recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      showToast('Recording stopped. Processing audio...');
    }
  };

  const transcribeAudio = async () => {
    if (!recordedAudio) {
      showToast('No audio recorded');
      return;
    }

    setIsTranscribing(true);
    try {
      // Convert blob to base64 for API
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;

        // Here you would call your transcription API
        // For now, we'll simulate transcription
        await simulateTranscription(base64Audio);
      };
      reader.readAsDataURL(recordedAudio);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      showToast('Error transcribing audio');
      setIsTranscribing(false);
    }
  };

  const simulateTranscription = async (base64Audio: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock transcription result
    const mockTranscription = "This is a sample transcription of a prophet story. In this story, we learn about the life and teachings of Prophet Muhammad (SAW) and his companions.";

    setTranscription(mockTranscription);
    setIsTranscribing(false);

    if (onTranscriptionComplete) {
      onTranscriptionComplete(mockTranscription);
    }

    showToast('Audio transcribed successfully!');
  };

  const clearTranscription = () => {
    setTranscription('');
    setRecordedAudio(null);
    audioChunksRef.current = [];
  };

  return (
    <div className={styles["audio-transcription"]}>
      <div className={styles["transcription-header"]}>
        <h3>Audio Transcription for Prophet Stories</h3>
        <p>Record and transcribe Islamic stories and teachings</p>
      </div>

      <div className={styles["recording-controls"]}>
        {!isRecording ? (
          <IconButton
            text="Start Recording Prophet Story"
            type="primary"
            onClick={startRecording}
            shadow
            disabled={isTranscribing}
          />
        ) : (
          <IconButton
            text="Stop Recording"
            type="danger"
            onClick={stopRecording}
            shadow
          />
        )}

        {recordedAudio && !isRecording && (
          <IconButton
            text={isTranscribing ? "Transcribing..." : "Transcribe Audio"}
            onClick={transcribeAudio}
            shadow
            disabled={isTranscribing}
          />
        )}
      </div>

      {isRecording && (
        <div className={styles["recording-indicator"]}>
          <div className={styles["recording-dot"]}></div>
          <span>Recording... Speak clearly about the prophet story</span>
        </div>
      )}

      {transcription && (
        <div className={styles["transcription-result"]}>
          <h4>Transcription:</h4>
          <div className={styles["transcription-text"]}>
            {transcription}
          </div>
          <div className={styles["transcription-actions"]}>
            <IconButton
              text="Use for Islamic Image"
              onClick={() => {
                if (onTranscriptionComplete) {
                  onTranscriptionComplete(transcription);
                }
              }}
            />
            <IconButton
              text="Clear"
              onClick={clearTranscription}
            />
          </div>
        </div>
      )}

      <div className={styles["transcription-tips"]}>
        <h4>Tips for Recording Prophet Stories:</h4>
        <ul>
          <li>Speak clearly and at a moderate pace</li>
          <li>Include proper Islamic terminology (AS, SAW, RA)</li>
          <li>Focus on educational and spiritual content</li>
          <li>Keep recordings under 2 minutes for best results</li>
          <li>Ensure good microphone quality and quiet environment</li>
        </ul>
      </div>
    </div>
  );
}
