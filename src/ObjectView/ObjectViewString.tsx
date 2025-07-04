import type { FC } from 'react';
import Typography from '@mui/material/Typography';

export const ObjectViewString: FC<{ value: string }> = ({ value }) => (
  <Typography component="span" color="primary" fontFamily="monospace">
    {JSON.stringify(value)}
  </Typography>
);
