import React, { useEffect } from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

export default function AppLoad() {
  const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('./sw_service.js');
    return swRegistration;
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // Permission has been granted
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  };

  useEffect(() => {
    // Initialize when the component mounts
    init();
  }, []);

  const init = async () => {
    // You can trigger these actions in response to a user gesture like a button click
    // For example, you can add a button to the component that calls these functions when clicked.
    // For simplicity, I'm calling them directly here.
    await requestNotificationPermission();
    const swRegistration = await registerServiceWorker();
    // console.log("swRegistration",await swRegistration?.pushManager?.getSubscription()    )
  };

  return (
    <div>
      {/* Add a button or another UI element to trigger the permission request and service worker registration */}
    </div>
  );
}
