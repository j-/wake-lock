import { useCallback, useEffect, useState, type FC } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { ObjectView } from './ObjectView';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { theme } from './theme';
import Stack from '@mui/material/Stack';

const permissionName = 'screen-wake-lock' as PermissionName;

export const QueryScreenWakeLockPermissionStatus: FC = () => {
  const initQueryPermissionStatus = useCallback(async () => {
    return navigator.permissions.query({ name: permissionName })
  }, []);
  
  const [count, setCount] = useState(0);
  const [permissionStatusPromise, setPermissionStatusPromise] = useState<
    Promise<PermissionStatus> | null
  >(initQueryPermissionStatus);
  
  const queryPermission = useCallback(async () => {
    setPermissionStatusPromise(initQueryPermissionStatus);
  }, []);

  useEffect(() => {
    if (!permissionStatusPromise) return;

    const callbacks: VoidFunction[] = [];
    let isMounted = true;

    (async () => {
      const handler = (e: Event) => {
        console.count(e.type);

        if (!isMounted) return;

        setCount((count) => count + 1);
      };

      try {
        const permissionStatus = await permissionStatusPromise;
        console.log(permissionStatus);

        if (!permissionStatus) return;
        if (!isMounted) return;

        permissionStatus.addEventListener('change', handler);

        callbacks.push(() => {
          permissionStatus.removeEventListener('change', handler);
        });
      } catch {}
    })();

    return () => {
      isMounted = false;
      callbacks.forEach((callback) => callback());
    };
  }, [permissionStatusPromise]);
  
  return (
    <Paper sx={{ p: 2, flex: 1 }}>
      <Stack gap={2}>
        <Stack gap={2} sx={{ alignItems: 'start' }}>
          <Button
            type="button"
            onClick={queryPermission}
            variant="outlined"
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
              <span style={{ color: '#333' }}>permissions</span>
              <span style={{ color: '#666' }}>.</span>
              <span style={{ color: '#000' }}>query</span>
              <span style={{ color: '#666' }}>(&#123; </span>
              <span style={{ color: '#333' }}>name:</span>
              <span style={{ color: '#666' }}> </span>
              <span style={{ color: '#1976d2' }}>{JSON.stringify(permissionName)}</span>
              <span style={{ color: '#666' }}> &#125;)</span>
            </span>
          </Button>
        </Stack>

        <Box sx={{ overflowX: 'auto' }}>
          <ThemeProvider theme={theme}>
            <ObjectView key={count} value={permissionStatusPromise} />
          </ThemeProvider>
        </Box>
      </Stack>
    </Paper>
  );
};