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
  define: { qrcodeUrlPrefix: 'http://react-visual-design.kokiy.xyz' },
})
