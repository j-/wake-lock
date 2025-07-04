import Typography from '@mui/material/Typography';
import { useEffect, useState, type FC } from 'react';
import { ObjectView } from '.';

export const ObjectViewPromise: FC<{ value: Promise<unknown> }> = ({
  value,
}) => {
  const [promiseState, setPromiseState] = useState('pending');
  const [promiseValue, setPromiseValue] = useState<unknown>();
  const [promiseError, setPromiseError] = useState<unknown>();

  useEffect(() => {
    setPromiseState('pending');
    setPromiseValue(undefined);
    setPromiseError(undefined);
    Promise.resolve(value)
      .then((value) => {
        setPromiseState('fulfilled');
        setPromiseValue(value);
      })
      .catch((error) => {
        setPromiseState('rejected');
        setPromiseError(error);
      });
  }, [value]);

  return (
    <>
      <Typography component="span" color="gray.300" fontFamily="monospace">
        {`Promise(${promiseState}): `}
      </Typography>

      {promiseValue ? (
        <ObjectView value={promiseValue} />
      ) : (
        <ObjectView value={promiseError} />
      )}
    </>
  );
};
