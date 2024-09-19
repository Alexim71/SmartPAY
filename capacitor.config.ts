import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SmartPAY',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '175251104865-in8ld55l7q1r9lv6fe1u0bm0gusn7v9g.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
