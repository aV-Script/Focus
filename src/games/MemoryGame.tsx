import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

export default function MemoryGame() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [round, setRound] = useState(1);
  const [showSequence, setShowSequence] = useState(true);

  useEffect(() => {
    generateSequence(round);
  }, [round]);

  const generateSequence = (length: number) => {
    const seq = [];
    for (let i = 0; i < length; i++) {
      seq.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }
    setSequence(seq);
    setShowSequence(true);
    setPlayerInput([]);
    setMessage('Guarda e memorizza la sequenza');
    setTimeout(() => setShowSequence(false), length * 800);
  };

  const handleClick = (color: string) => {
    if (showSequence) return; // non si può cliccare durante la sequenza

    const newInput = [...playerInput, color];
    setPlayerInput(newInput);

    if (sequence[newInput.length - 1] !== color) {
      setMessage('Sbagliato! Riprova il round.');
      setPlayerInput([]);
      setTimeout(() => setMessage('Guarda e memorizza la sequenza'), 1500);
    } else if (newInput.length === sequence.length) {
      setMessage('Bravo! Passi al prossimo round.');
      setTimeout(() => {
        setRound(round + 1);
        setMessage('');
      }, 1500);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Ripeti la sequenza di colori:
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {COLORS.map((color) => (
          <Box
            key={color}
            onClick={() => handleClick(color)}
            sx={{
              width: 50,
              height: 50,
              bgcolor: color,
              opacity: showSequence || playerInput.includes(color) ? 1 : 0.5,
              borderRadius: 1,
              cursor: showSequence ? 'default' : 'pointer',
            }}
          />
        ))}
      </Stack>

      {showSequence && (
        <Typography variant="body1" color="primary">
          Sequenza: {sequence.join(' → ')}
        </Typography>
      )}

      <Typography color={message.startsWith('Bravo') ? 'green' : 'red'}>{message}</Typography>
      <Typography>Round: {round}</Typography>
    </Box>
  );
}
