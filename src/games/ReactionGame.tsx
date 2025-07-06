import React, { useState, useEffect } from 'react';
import { Typography, Box} from '@mui/material';

export default function ReactionGame() {
  const [targetVisible, setTargetVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Premi il pulsante rosso il più velocemente possibile quando appare!');
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    scheduleTarget();
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  const scheduleTarget = () => {
    const delay = Math.random() * 3000 + 1000;
    const id = setTimeout(() => {
      setTargetVisible(true);
      setStartTime(Date.now());
    }, delay);
    setTimerId(id);
  };

  const handleClick = () => {
    if (!targetVisible) {
      setMessage('Troppo presto! Aspetta il segnale rosso.');
      setScore(score > 0 ? score - 1 : 0);
      return;
    }
    const reactionTime = Date.now() - startTime;
    setMessage(`Ottimo! Tempo di reazione: ${reactionTime} ms`);
    setScore(score + 1);
    setTargetVisible(false);
    scheduleTarget();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Velocità di risposta
      </Typography>
      <Box
        sx={{
          width: 100,
          height: 100,
          bgcolor: targetVisible ? 'red' : 'grey.400',
          borderRadius: '50%',
          mx: 'auto',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      />
      <Typography>{message}</Typography>
      <Typography>Punteggio: {score}</Typography>
    </Box>
  );
}
