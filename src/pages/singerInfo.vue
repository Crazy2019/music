<template>
	<div class="rank-info-content list-info">
		<div class="rank-banner-wrap" :style="{backgroundImage: `url(${imgUrl})`}"></div>
		<div class="list-info-desc">
			<p class="plist-desc-p" :class="{'plist-desp-hide': hide_desc}">{{desc}}</p>
			<img src="../assets/images/close_icon.png" @click="toggleDesp" v-if="hide_desc" alt="" />
			<img src="../assets/images/open_icon.png" @click="toggleDesp" v-else alt="" />
		</div>
		<div class="list-infoBg"></div>
		<div class="rank-info-list">
			<mt-cell v-for="(item, index) in songList" :title="item.filename" @click.native="playAudio(index)"  :key="index">
				<span class="rank-index" :class="{'rank-list-goods': index<3,'rank-list-first': index == 0,'rank-list-two': index == 1,'rank-list-three': index == 2}">{{index+1}}</span>
				<img src="../assets/images/download_icon.png" width="18" height="18" alt="" />
			</mt-cell>
		</div>
	</div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { PLAY_AUDIO } from '../mixins/index.js'
export default{
	mixins: [PLAY_AUDIO],
	data() {
		return{
			imgUrl: '',
			hide_desc: true,
			songList: [],
			desc: ''
		}
	},
	//进入路由之前执行的函数
	beforeRouteEnter (to, from, next){
		next(vm => {
			vm.$store.commit('showHead', true);
			const singId = vm.$route.params.id;
			vm.singInfo(vm,singId);
			window.onscroll = () => {
				vm.opacity = window.pageYOffset / 250
				vm.$store.commit('setHeadStyle', {background: `rgba(43, 162, 251, ${vm.opacity})`})
			}
		})
	},
	//路由离开之前执行的函数
	beforeRouteLeave (to, from, next){
		this.$store.commit('showHead', false);
		window.onscroll = null
		next();
	},
	methods: {
		toggleDesp(){
			this.hide_desc = !this.hide_desc;
		},
		singInfo(vm,singId){
			console.log(singId)
			Indicator.open({
				text: "加载中...",
				spinnerType: 'snake'
			});
			this.$ajax.get(`/proxy/singer/info/${singId}&json=true`).then(res=>{
				Indicator.close();
				if(res.status == 200){
					this.desc = res.data.info.intro;
					this.imgUrl = res.data.info.imgurl.replace('{size}', '400');
					this.$store.commit('setHeadTitle',res.data.info.singername);
					this.songList = res.data.songs.list;
				}
			}).catch(error=>{})
		}
	}
}
</script>
