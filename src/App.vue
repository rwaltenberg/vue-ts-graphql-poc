<template lang="pug">
  #app
    h1.logo POC-émon
    router-view
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Dosis:400,700|Roboto:400,700,900');
@import '../node_modules/flexboxgrid/dist/flexboxgrid.css';

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 245px;
}

.logo {
  background-image: url('./assets/logo.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 0;
  height: 218px;
  margin: 0 auto 30px;
  width: 550px;

  @media screen and (max-width: 620px) {
    width: 80%;
    height: 0;
    padding-top: 31.75%;
  }
}
</style>
