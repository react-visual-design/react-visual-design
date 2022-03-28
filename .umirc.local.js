import { defineConfig } from 'umi'
export default defineConfig({
  publicPath: '/',
  proxy: {
  },
  define: { qrcodeUrlPrefix: 'http://192.168.0.104:8000' },
})
