// Activa / Desactiva autorefresco del frontend
import { useEffect, useState } from "react";

export const useAutoRefresh = () => {
  const [timerActive, setTimerActive] = useState(true);
  const [inactive, setInactive] = useState(false);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
    setInactive(false);
  };

  useEffect(() => {
    let activityTimeout;
    let refreshInterval;

    if (timerActive) {
      activityTimeout = setTimeout(() => {
        setInactive(true);
      }, 5 * 60 * 1000);
    }

    if (inactive && timerActive) {
      refreshInterval = setInterval(() => {
        window.location.reload();
      }, 5 * 60 * 1000);
    }

    return () => {
      clearTimeout(activityTimeout);
      clearInterval(refreshInterval);
    };
  }, [timerActive, inactive]);

  return { timerActive, toggleTimer };
};
