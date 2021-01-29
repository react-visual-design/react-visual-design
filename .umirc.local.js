import { defineConfig } from 'umi'
export default defineConfig({
  publicPath: '/',
  proxy: {
    '/bff': {
      target: 'http://react-visual-design.kokiy.xyz',
      changeOrigin: true,
    },
  },
  define: { qrcodeUrlPrefix: 'http://192.168.0.104:8000' },
})
