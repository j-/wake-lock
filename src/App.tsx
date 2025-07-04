import { type FC } from 'react';
import Stack from '@mui/material/Stack';
import { InspectSentinel } from './InspectSentinel';
import { QueryScreenWakeLockPermissionStatus } from './QueryScreenWakeLockPermissionStatus';

export const App: FC = () => (
  <Stack gap={2} p={2} mx='auto'>
    <QueryScreenWakeLockPermissionStatus />
    
    <InspectSentinel />
  </Stack>
);