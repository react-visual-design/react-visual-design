import { defineConfig } from 'umi'
import aliyunTheme from './theme.js'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: aliyunTheme,
  hash: true,
  ignoreMomentLocale: true,
  favicon: '/favicon.ico',
  define: { qrcodeUrlPrefix: 'http://192.168.0.104:8000' },
})
