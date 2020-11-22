import { defineConfig } from 'umi'
export default defineConfig({
  publicPath: '/',
  proxy: {
    '/bff': {
      target: 'https://api-node.huanbaoyun.cloud',
      changeOrigin: true,
    },
  },
  define: { qrcodeUrlPrefix: 'http://192.168.0.104:8000' },
})
