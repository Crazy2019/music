<template>
	<div class="audio-view" :class="{'audio_panel_hide':toggleHide}">
		<div class="audio-panel-control" @click="togglePanel" :class="{'audio-panel-control-loading': getshowLoding}"></div>
		
		<div class="audio-panel am-g">
			<img :src="audio.musicImg" alt="" @click="showDetailPlayer()" />
			<div class="player-status" @click="showDetailPlayer()">
				<p class="player-title ellipsis">{{audio.song_name}}</p>
				<p class="player-singer ellipsis">{{audio.singer}}</p>
			</div>
			<div class="palyer-control am-g">
				<span class="palyer-play"></span>
				<span class="palyer-nextSong" @click="next"></span>
			</div>
		</div>
	</div>
	
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	data() {
		return {
			toggleHide: false
		}
	},
	computed: {
		...mapGetters(['audio','showPlayer','getshowLoding'])
	},
	methods: {
		togglePanel() {
			this.toggleHide = !this.toggleHide;
		},
		showDetailPlayer(){
			if(this.showPlayer){
				this.$store.commit("DETAILPLAYFLAG",true);
			}
		},
		next(){
			this.$store.dispatch("next");
		}
	}
}
</script>
