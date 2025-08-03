import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0dc4d18a26334e428412a40fd274c022',
  appName: 'mindministry-hub',
  webDir: 'dist',
  server: {
    url: 'https://0dc4d18a-2633-4e42-8412-a40fd274c022.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#1e3a8a",
      showSpinner: true,
      spinnerColor: "#f59e0b"
    }
  }
};

export default config;