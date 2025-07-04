import type { FC } from 'react';
import Typography from '@mui/material/Typography';
import { ObjectViewString } from './ObjectViewString';

export const ObjectViewDate: FC<{
  value: Date;
}> = ({ value }) => (
  <Typography component="span" color="textPrimary" fontFamily="monospace">
    {'Date('}
    <ObjectViewString value={value.toISOString()} />
    {')'}
  </Typography>
);
