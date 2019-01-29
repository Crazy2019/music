<template>
	<div class="rank-info-content">
		<div class="rank-banner-wrap" :style="{backgroundImage: 'url('+ imgUrl +')'}">
			
			<div class="rank-time">
				上次更新时间：{{getTime()}}
			</div>
		</div>
		<div class="rank-info-list">
			<mt-cell v-for="(item, index) in songList" :title="item.filename" :key="index" @click.native="playAudio(index)">
				<span class="rank-index" :class="{'rank-list-goods' : index<3 , 'rank-list-first': index == 0, 'rank-list-two': index == 1, 'rank-list-three': index == 2}">{{index+1}}</span>
				<img src="../assets/images/download_icon.png" width="18" height="18" alt="" />
			</mt-cell>
		</div>
	</div>
</template>
<script>
import { Indicator } from "mint-ui";
import { PLAY_AUDIO } from '../mixins/index.js'
export default{
	mixins: [PLAY_AUDIO],
	data(){
		return{
			imgUrl: '',
			songList: []
		}
	},
	//进入路由之前执行的函数。
	beforeRouteEnter(to, from, next){
		next(vm => {
			vm.$store.commit('showHead', true);
			vm.getList()
			window.onscroll = () => {
				vm.opacity = window.pageYOffset / 250
				vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
			}
		})
	},
	//离开路由之前执行的函数。
	beforeRouteLeave(to, from, next){
		this.$store.commit('showHead', false)
		window.onscroll = null
		next()
	},
	methods: {
		getTime(){
			var time = new Date();
			var year = time.getFullYear();
			var month = time.getMonth()+1;
			var da = time.getDate();
			return year+"-"+month+"-"+da
		},
		getList(){
			Indicator.open({
				text: "加载中...",
				spinnerType: 'snake'
			});
			var infoId = this.$route.params.id;
			this.$ajax.get(`/proxy/rank/info/?rankid=${infoId}&page=1&json=true`).then(res=>{
				Indicator.close();
				if(res.status == 200){
					var headTitle = res.data.info.rankname;
					this.imgUrl = res.data.info.banner7url.replace('{size}', '400')
					this.$store.commit("setHeadTitle",headTitle);
					this.songList = res.data.songs.list;
				}
			}).catch(error=>{})
		}
	}
}
</script>

<style>
</style>