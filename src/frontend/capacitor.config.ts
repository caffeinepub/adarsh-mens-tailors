import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.caffeine.adarsh.tailors',
  appName: 'Adarsh Mens Tailors',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Allow navigation to Internet Identity domains
    allowNavigation: [
      'identity.ic0.app',
      'identity.internetcomputer.org',
      '*.ic0.app',
      '*.internetcomputer.org'
    ]
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
