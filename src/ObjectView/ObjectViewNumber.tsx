import type { FC } from 'react';
import Typography from '@mui/material/Typography';

export const ObjectViewNumber: FC<{ value: number }> = ({ value }) => (
  <Typography
    component="span"
    fontFamily="monospace"
    color="hsl(150, 40%, 40%)"
  >
    {JSON.stringify(value)}
  </Typography>
);
