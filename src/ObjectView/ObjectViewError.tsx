import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { ObjectView } from '.';
import { ObjectViewFunction } from './ObjectViewFunction';

function forInKeys<T>(obj: T): (keyof T)[] {
  const keys: (keyof T)[] = [];
  for (const key in obj) {
    keys.push(key);
  }
  return keys;
}

function ownKeys<T>(obj: T): (keyof T)[] {
  return Object.getOwnPropertyNames(obj) as (keyof T)[];
}

function allKeys<T extends object>(obj: T): (keyof T)[] {
  const maybeKeys = [
    'name',
    'type',
    'message',
    'code',
    'cause',
    'stack',
    'column',
    'columnNumber',
    'line',
    'lineNumber',
    'sourceURL',
    'fileName',
  ] as (keyof T)[];
  const keys = new Set<keyof T>();
  for (const key of forInKeys(obj)) keys.add(key);
  for (const key of ownKeys(obj)) keys.add(key);
  for (const key of maybeKeys) if (key in obj) keys.add(key);
  return [...keys.values()];
}

function orderedKeys<T extends object>(obj: T): (keyof T)[] {
  const all = allKeys(obj);
  const fnKeys = all.filter((key) => typeof obj[key] === 'function');
  // Manually compute the difference
  const fnKeySet = new Set(fnKeys);
  const rest = all.filter((key) => !fnKeySet.has(key));

  const restSorted = [...rest].sort();
  const fnSorted = [...fnKeys].sort();

  return [...restSorted, ...fnSorted];
}

const getErrorName = (err: unknown) => {
  try { return Object.getPrototypeOf(err).name; } catch {}
  try { return (err as any).__proto__.name; } catch {}
  try { return (err as Error).name; } catch {}
  return 'Error';
}

export const ObjectViewError: FC<{ value: Record<string, any> }> = ({
  value: parent,
}) => {
  const keys = orderedKeys(parent);

  if (keys.length === 0) {
    return (
      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'{}'}
      </Typography>
    );
  }

  return (
    <>
      <Typography
        component="span"
        fontFamily="monospace"
        fontStyle="italic"
        color="hsl(150, 40%, 40%)"
      >
        {getErrorName(parent)}{' '}
      </Typography>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'{'}
      </Typography>

      <Box component="ul" p={0} m={0} ml="2ch">
        {keys.map((key, i, arr) => [
          <Box
            key={key}
            component="li"
            sx={{ display: 'inline', listStyle: 'none', whiteSpace: 'nowrap' }}
          >
            <Typography
              component="span"
              color={typeof parent[key] === 'function' ? 'textDisabled' : 'textPrimary'}
              fontFamily="monospace"
            >
              {key}
              {': '}
            </Typography>

            {typeof parent[key] === 'function' ? (
              <ObjectViewFunction
                value={parent[key]}
                // onClick={async () => console.log(await parent[key]())}
              />
            ) : (
              <ObjectView value={parent[key]} />
            )}
          </Box>,

          i < arr.length - 1 ? (
            <Typography
              key={i + ','}
              component="span"
              color="gray.300"
              fontFamily="monospace"
            >
              {','}
              <br />
            </Typography>
          ) : null,
        ])}
      </Box>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'}'}
      </Typography>
    </>
  );
};
