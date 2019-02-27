module.exports = {
  // configureWebpack: {
  //   plugins: [
  //     config => config
  //   ]
  // },
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:5000/graphql',
        ws: true,
        changeOrigin: true
      }
    }
  },
  lintOnSave: 'error',
  productionSourceMap: false
}