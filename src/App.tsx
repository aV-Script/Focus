import React, { useState } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import AttentionGame from './games/AttentionGame';
import MemoryGame from  './games/MemoryGame';
import ReactionGame from  './games/ReactionGame';
import BreathingGame from  './games/BreathingGame';

type Game = 'attention' | 'memory' | 'reaction' | 'breathing' | null;

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game>(null);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mini-Games per ADHD - Allenamento Cognitivo
      </Typography>
      {!selectedGame ? (
        <Stack spacing={2}>
          <Button variant="contained" onClick={() => setSelectedGame('attention')}>
            Attenzione Sostenuta e Selettiva
          </Button>
          <Button variant="contained" onClick={() => setSelectedGame('memory')}>
            Memoria di Lavoro
          </Button>
          <Button variant="contained" onClick={() => setSelectedGame('reaction')}>
            Velocità di Risposta
          </Button>
          <Button variant="contained" onClick={() => setSelectedGame('breathing')}>
            Autoregolazione Emotiva
          </Button>
        </Stack>
      ) : (
        <>
          <Button variant="outlined" onClick={() => setSelectedGame(null)} sx={{ mb: 2 }}>
            Torna al Menu
          </Button>
          {selectedGame === 'attention' && <AttentionGame />}
          {selectedGame === 'memory' && <MemoryGame />}
          {selectedGame === 'reaction' && <ReactionGame />}
          {selectedGame === 'breathing' && <BreathingGame />}
        </>
      )}
    </Container>
  );
}
