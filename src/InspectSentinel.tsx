import { useCallback, useEffect, useState, type FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { ObjectView } from './ObjectView';
import { theme } from './theme';

export const InspectSentinel: FC = () => {
  const initSentinelPromise = useCallback(async () => {
    return navigator.wakeLock.request('screen');
  }, []);
  
  const [count, setCount] = useState(0);
  
  const [sentinelPromise, setSentinelPromise] = useState<
    Promise<WakeLockSentinel> | null
  >(initSentinelPromise);

  const [sentinelReleasePromise, setSentinelReleasePromise] = useState<
    Promise<void> | null
  >(null);

  const [releaseEvent, setReleaseEvent] = useState<Event | null>(null);
  
  useEffect(() => {
    if (!sentinelPromise) return;

    const callbacks: VoidFunction[] = [];
    let isMounted = true;

    (async () => {
      const handler = (e: Event) => {
        console.count(e.type);
        setReleaseEvent(e);
        if (!isMounted) return;
        setCount((count) => count + 1);
      };

      try {
        const sentinel = await sentinelPromise;
        console.log(sentinel);

        if (!sentinel) return;
        if (!isMounted) return;

        sentinel.addEventListener('release', handler);

        callbacks.push(() => {
          sentinel.removeEventListener('release', handler);
        });
      } catch {}
    })();

    return () => {
      isMounted = false;
      callbacks.forEach((callback) => callback());
    };
  }, [sentinelPromise]);
  
  return (
    <Paper sx={{ p: 2, flex: 1 }}>
      <Stack gap={2}>
        <Stack gap={2} sx={{ alignItems: 'start' }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setSentinelPromise(() => navigator.wakeLock.request());
              setReleaseEvent(null);
              setSentinelReleasePromise(null);
            }}
          >
            <span
              style={{
                color: '#666',
                fontFamily:
                  'Menlo, Cascadia Code, Consolas, Liberation Mono, monospace, Monaco, "Courier New", monospace',
                fontWeight: 'normal',
              }}
            >
              <span style={{ color: '#333' }}>navigator</span>
              <span style={{ color: '#666' }}>.</span>
              <span style={{ color: '#333' }}>wakeLock</span>
              <span style={{ color: '#666' }}>.</span>
              <span style={{ color: '#000' }}>request</span>
              <span style={{ color: '#666' }}>()</span>
            </span>
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setSentinelPromise(() => navigator.wakeLock.request('screen'));
              setReleaseEvent(null);
              setSentinelReleasePromise(null);
            }}
          >
            <span
              style={{
                color: '#666',
                fontFamily:
                  'Menlo, Cascadia Code, Consolas, Liberation Mono, monospace, Monaco, "Courier New", monospace',
                fontWeight: 'normal',
              }}
            >
              <span style={{ color: '#333' }}>navigator</span>
              <span style={{ color: '#666' }}>.</span>
              <span style={{ color: '#333' }}>wakeLock</span>
              <span style={{ color: '#666' }}>.</span>
              <span style={{ color: '#000' }}>request</span>
              <span style={{ color: '#666' }}>(</span>
              <span style={{ color: '#1976d2' }}>"screen"</span>
              <span style={{ color: '#666' }}>)</span>
            </span>
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setSentinelPromise(() => navigator.wakeLock.request('foobar' as 'screen'));
              setReleaseEvent(null);
              setSentinelReleasePromise(null);
            }}
          >
            <span
              style={{
                color: '#666',
                fontFamily:
                  'Menlo, Cascadia Code, Consolas, Liberation Mono, monospace, Monaco, "Courier New", monospace',
                fontWeight: 'normal',
              }}
            >
              <span style={{ color: '#333' }}>navigator</span>
              <span style={{ color: '#666' }}>.</span>
              <span style={{ color: '#333' }}>wakeLock</span>
              <span style={{ color: '#666' }}>.</span>
              <span style={{ color: '#000' }}>request</span>
              <span style={{ color: '#666' }}>(</span>
              <span style={{ color: '#1976d2' }}>"foobar"</span>
              <span style={{ color: '#666' }}>)</span>
            </span>
          </Button>
        </Stack>
  
        <Box sx={{ overflowX: 'auto' }}>
          <ThemeProvider theme={theme}>
            <ObjectView key={count} value={sentinelPromise} />
          </ThemeProvider>
        </Box>

        {releaseEvent && (
          <Box sx={{ overflowX: 'auto' }}>
            <Typography component="h2" variant="h6" mb={2}>Last release event</Typography>
            
            <ThemeProvider theme={theme}>
              <ObjectView key={count} value={releaseEvent} />
            </ThemeProvider>
          </Box>
        )}

        {sentinelPromise && (
          <Stack gap={2} sx={{ alignItems: 'start' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={async () => {
                const sentinel = await sentinelPromise;
                setSentinelReleasePromise(async () => sentinel.release());
              }}
            >
              <span
                style={{
                  color: '#666',
                  fontFamily:
                    'Menlo, Cascadia Code, Consolas, Liberation Mono, monospace, Monaco, "Courier New", monospace',
                  fontWeight: 'normal',
                }}
              >
                <span style={{ color: '#333' }}>sentinel</span>
                <span style={{ color: '#666' }}>.</span>
                <span style={{ color: '#000' }}>release</span>
                <span style={{ color: '#666' }}>()</span>
              </span>
            </Button>
          </Stack>
        )}

        {sentinelReleasePromise && (
          <Box sx={{ overflowX: 'auto' }}>
            <ThemeProvider theme={theme}>
              <ObjectView key={count} value={sentinelReleasePromise} />
            </ThemeProvider>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};
