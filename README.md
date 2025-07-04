* <https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API>
* <https://w3c.github.io/screen-wake-lock/>
* <https://wake-lock-demo.glitch.me/>

```js
let wakeLock = null;

const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', (e) => {
      console.log(e);
      wakeLockCheckbox.checked = false;
      statusDiv.textContent = 'Wake Lock was released';
      console.log('Wake Lock was released');                    
    });
    wakeLockCheckbox.checked = true;
    statusDiv.textContent = 'Wake Lock is active';
    console.log('Wake Lock is active');      
  } catch (e) {      
    wakeLockCheckbox.checked = false;
    statusDiv.textContent = `${e.name}, ${e.message}`;
    console.error(`${e.name}, ${e.message}`);
  } 
};

const handleVisibilityChange = () => {    
  if (wakeLock !== null && document.visibilityState === 'visible') {
    wakeLock = requestWakeLock();
  }
};

document.addEventListener('visibilitychange', handleVisibilityChange);
document.addEventListener('fullscreenchange', handleVisibilityChange);
```

```js
let wakeLock = null;

async function requestWakeLock() {
  // Use navigator.locks to ensure exclusive access
  await navigator.locks.request('wake-lock', async (lock) => {
    try {
      if (!wakeLock) {
        // Request a screen wake lock
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake lock acquired.');

        // Handle the release event
        wakeLock.addEventListener('release', () => {
          console.log('Wake lock released.');
          wakeLock = null;
        });
        // { once: true } ?
      } else {
        console.log('Wake lock already active.');
      }
    } catch (err) {
      console.error(`Failed to acquire wake lock: ${err.name}, ${err.message}`);
    }
  });
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}
```

```js
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !wakeLock) {
    requestWakeLock();
  }
});
```
