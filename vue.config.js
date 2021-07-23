module.exports = {
  lintOnSave: false,
  devServer:{
    open: true,
    proxy: {
      "/api": {
        target: "http://39.98.123.211/",
        // pathRewrite: {
        //   // "^/api": ""  //后台不需要这个可以配置删除 ， 这里需要
        // }
        changeOrigin: true,
      }
    }
  }
}
