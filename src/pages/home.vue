<template>
	<div>
		<mt-swipe :auto="5000">
			<mt-swipe-item v-for="(banner, index) in banners" :key="index">
				<a :href="banner.extra.tourl">
					<img :src="banner.imgurl" :title="banner.title" />
				</a>
			</mt-swipe-item>
		</mt-swipe>
		
		<mt-cell v-for="(song, index) in songList" :key="index" @click.native="playAudio(index)" :title="song.filename">
			<img src="../assets/images/download_icon.png" width="18" height="auto">
		</mt-cell>
	
	</div>
	
</template>

<script>
import { Indicator } from 'mint-ui';
import { PLAY_AUDIO } from '../mixins/index.js'
export default{
	mixins: [PLAY_AUDIO],
	data() {
		return {
			banners: [],
			songList: []
		}
	},
	created(){
		this.getSongs()
	},
	methods: {
		getSongs(){
			Indicator.open({
				text: "加载中...",
				spinnerType: 'fading-circle'
			});
			this.$ajax.get('/proxy/?json=true').then(res=>{
				Indicator.close()
				if(res.status == 200){
					this.banners = res.data.banner;
					this.songList = res.data.data;
				}
			}).catch(()=>{
		
			})
		}
	}
}
</script>

<style>
.mint-swipe{
	height: 3.5rem;
}
.mint-swipe-indicator{
	opacity: 0.8 !important;
}
</style>