import { useEffect, useState } from "react";
import Router from "./components/utils/Router";
import { AppStyle } from "./styleComponent/AppStyle";
import WifiOffIcon from '@mui/icons-material/WifiOff';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnlineStatus() {
      setIsOnline(true);
    }

    function handleOfflineStatus() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  return (
    <AppStyle>
      <div className="App">
        {isOnline ?
          <Router />
          :
          <div className="offline">
            <WifiOffIcon className="icon" />
            <p>Looks like you are offline turn on internet</p>
          </div>
        }
      </div >
    </AppStyle>
  );
}

export default App;
