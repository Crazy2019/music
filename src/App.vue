<template>
  <div id="app">
  	<v-header></v-header>
  	<div class="main">
  		<router-view></router-view>
  	</div>
  	<audio-footer></audio-footer>
  	<DetailPlay />
  </div>
</template>

<script>
import Head from "./components/header/Head";
import Player from "./components/Player";
import DetailPlay from "./components/detailPlay";
export default {
  name: 'App',
  components: {
  	"v-header": Head,
  	"audio-footer": Player,
  	DetailPlay
  }
}
</script>


