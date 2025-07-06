import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

export default function BreathingGame() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [circleSize, setCircleSize] = useState(100);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase === 'inhale') {
      setCircleSize(200);
      timeout = setTimeout(() => setPhase('hold'), 4000);
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('exhale'), 4000);
    } else if (phase === 'exhale') {
      setCircleSize(100);
      timeout = setTimeout(() => setPhase('inhale'), 4000);
    }
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <Box textAlign="center" sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Segui il respiro: {phase.toUpperCase()}
      </Typography>
      <Box
        sx={{
          width: circleSize,
          height: circleSize,
          bgcolor: 'primary.main',
          borderRadius: '50%',
          mx: 'auto',
          transition: 'all 4s ease-in-out',
        }}
      />
      <Typography sx={{ mt: 2 }}>Respira lentamente e segui il cerchio che si espande e si contrae.</Typography>
    </Box>
  );
}
