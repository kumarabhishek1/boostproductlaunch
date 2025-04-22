import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    base: '/',
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      // Expose env variables to your app
      'process.env.VITE_CONTACT_FORM_SCRIPT_URL': JSON.stringify(env.VITE_CONTACT_FORM_SCRIPT_URL),
      'process.env.VITE_PAYMENT_FORM_SCRIPT_URL': JSON.stringify(env.VITE_PAYMENT_FORM_SCRIPT_URL),
      // 'process.env.VITE_PAYPAL_CLIENT_ID': JSON.stringify(env.VITE_PAYPAL_CLIENT_ID),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers/zod'],
          },
        },
      },
      copyPublicDir: true,
    },
    server: {
      port: 5173,
      host: true
    },
    publicDir: 'public',
  };
});
