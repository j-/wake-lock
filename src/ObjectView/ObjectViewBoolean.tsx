import type { FC } from 'react';
import Typography from '@mui/material/Typography';

export const ObjectViewBoolean: FC<{ value: boolean }> = ({ value }) => (
  <Typography
    component="span"
    fontFamily="monospace"
    color="hsl(300, 40%, 40%)"
  >
    {JSON.stringify(value)}
  </Typography>
);
