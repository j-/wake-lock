import type { FC } from 'react';
import Typography from '@mui/material/Typography';

const getName = (value: any) => {
  try { return value.__proto__.constructor.name; } catch {};
  try { return value.constructor.name; } catch {};
  try { return value.name; } catch {};
  return 'Object';
}

export const ObjectViewComplex: FC<{
  value: any;
}> = ({ value }) => (
  <Typography component="span" color="black" fontFamily="monospace">
    {'[object '}

    <Typography
      component="span"
      fontFamily="monospace"
      color="secondary"
    >
      {getName(value)}
    </Typography>

    {']'}
  </Typography>
);
