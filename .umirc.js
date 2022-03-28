import { defineConfig } from 'umi'
const path = require('path')
import aliyunTheme from './theme.js'
const VersionFile = require('webpack-version-file-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: aliyunTheme,
  hash: true,
  history: {
    type: 'hash'
  },
  ignoreMomentLocale: true,
  favicon: '/favicon.ico',
  define: {
    qrcodeUrlPrefix: 'https://koki-5ghulbfed42032ec-1301619189.tcloudbaseapp.com',
    ICON_FONT_URL: '//at.alicdn.com/t/font_2045500_xll0v0fe66n.js', //icon font url},
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
      },
      'antd-mobile',
    ],
  ],
  chainWebpack(memo) {
    memo.plugin('VersionFile').use(
      new VersionFile({
        packageFile: path.join(__dirname, 'package.json'),
        template: path.join(__dirname, 'version.ejs'),
        outputFile: path.join(__dirname, 'dist', 'version.json'),
      }),
    )
    memo.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin)
  },
  // mfsu: {}
})
