// src/index.js

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const Host = window.location.origin
      navigator.serviceWorker.register(Host +'/service.js').then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      }, (error) => {
        console.log('Service Worker registration failed:', error);
      });
    });
  }
  