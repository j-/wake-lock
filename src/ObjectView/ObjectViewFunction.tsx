import type { FC } from 'react';
import Typography from '@mui/material/Typography';

export const ObjectViewFunction: FC<{
  value: Function;
  onClick?: () => {};
}> = ({ value, onClick }) => (
  <Typography component="span" color="grey.600" fontFamily="monospace">
    {'[function '}

    <Typography
      component="span"
      fontFamily="monospace"
      onClick={onClick}
      // sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
    >
      {value.name}
    </Typography>

    {'()]'}
  </Typography>
);
