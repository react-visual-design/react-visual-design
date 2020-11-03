import { defineConfig } from 'umi'
export default defineConfig({
  publicPath: '/',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  define: { qrcodeUrlPrefix: 'http://192.168.0.104:8000' },
})
