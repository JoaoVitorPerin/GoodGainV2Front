import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.stockflow',
  appName: 'StockFlow',
  webDir: 'dist/good-gain-angular',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
