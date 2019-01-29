<template>
	<div class="detalPlay" v-show="detailPlayerFlag">
		<div class="detail_playBg" :style="{'background': `url(${audio.musicImg})`}" style=""></div>
		<div class="detail-play-container">
			<div class="detail-play-title">
				<a class="head-back" @click="hideDetailPlayer"></a>
				<p>{{audio.song_name}}</p>
			</div>
			
			<div class="detail_player-img">
				<img :src="audio.musicImg" alt="" />
			</div>
			<div class="detail_player-lrc">
				<div class="lrc-content">
				</div>
			</div>
			
			<div class="detail_player-range">
				<span class="detail_player-time">{{audio.currentLength | time}}</span>
				<mt-range 
					v-model="audio.currentLength"
					:bar-height="3"
					style="width: 80%"
				>
				</mt-range>
				<span class="detail_player-time ">{{audio.songLength | time}}</span>
				<div style="clear: both;"></div>
			</div>
			
			<div class="detail_player-control">
				<i class="detail_player-btn play-prev" @click="prev()"></i>
				<i class="detail_player-btn play-play"></i>
				<i class="detail_player-btn play-next" @click="next()"></i>
			</div>
			
			
		</div>
		
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
	data(){
		return {
			rangeValue: 10,
		}
	},
	computed: {
		...mapGetters(['detailPlayerFlag','audio'])
	},
	filters: {
		time(value){
			let length = Math.floor(parseInt(value));
			var minute = Math.floor(value / 60);
			if(minute <= 9){
				minute = "0" + minute
			}
			let second = length % 60;
			if(second < 10){
				second = '0' + second;
			}
			return minute + ':' + second
		}
	},
	methods: {
		hideDetailPlayer(){
			this.$store.commit("DETAILPLAYFLAG",false);
		},
		next(){
			this.$store.dispatch("next")
		},
		prev(){
			this.$store.dispatch("prev")
		}
	}
}
</script>
