import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';

const ITEMS = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍓'];
const TARGET = '🍎';

export default function AttentionGame() {
  const [items, setItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState('');

  // Genera array di oggetti con uno o più target
  const generateItems = (count: number) => {
    const arr: string[] = [];
    for (let i = 0; i < count; i++) {
      // Metà volte target, metà distrattori
      arr.push(Math.random() < 0.5 ? TARGET : ITEMS[Math.floor(Math.random() * ITEMS.length)]);
    }
    return arr;
  };

  useEffect(() => {
    setItems(generateItems(5 + round)); // aumenta difficoltà
    setMessage('');
  }, [round]);

  const handleClick = (item: string) => {
    if (item === TARGET) {
      setScore(score + 1);
      setMessage('Bravo! Hai cliccato il frutto giusto.');
    } else {
      setMessage('Oops, non è il frutto corretto.');
    }
  };

  const nextRound = () => {
    setRound(round + 1);
    setMessage('');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tocca solo i {TARGET} 🍎!
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        {items.map((item, i) => (
          <Button key={i} variant="outlined" onClick={() => handleClick(item)} sx={{ fontSize: 40 }}>
            {item}
          </Button>
        ))}
      </Box>
      <Typography>Punteggio: {score}</Typography>
      <Typography color={message.startsWith('Bravo') ? 'green' : 'red'}>{message}</Typography>
      <Button variant="contained" onClick={nextRound} sx={{ mt: 2 }}>
        Prossimo Round
      </Button>
    </Box>
  );
}
