<template>
	<div class="singer_list">
		<mt-cell v-for="(sing, index) in singList" :to="`/singer/info/${sing.singerid}`" :title="sing.singername" is-link :key="index">
			<img slot="icon" :src="sing.imgurl.replace('{size}', '400')" width="60" height="60" alt="" />
		</mt-cell>
	</div>
</template>

<script>
import { Indicator } from "mint-ui"
export default{
	data(){
		return {
			singList: []
		}
	},
	//进入路由之前执行函数
	beforeRouteEnter (to, from, next){
		next(vm => {
			vm.$store.commit("showHead",true);
			vm.$store.commit("setHeadStyle", {background: `rgba(43, 162, 251, 1)`});
			vm.getList();
		});
	},
	//离开路由之前执行函数
	beforeRouteLeave (to, from, next){
		this.$store.commit("showHead",false);
		this.$store.commit("setHeadStyle", {background: `rgba(43, 162, 251, 0)`});
		next();
	},
	methods: {
		getList(){
			Indicator.open({
				text: "加载中...",
				spinnerType: 'snake'
			});
			var singId = this.$route.params.id;
			this.$ajax.get(`/proxy/singer/list/${singId}?json=true`).then(res=>{
				Indicator.close();
				if(res.status == 200){
					this.$store.commit('setHeadTitle',res.data.classname);
					this.singList = res.data.singers.list.info;
				}
			}).catch(error=>{})
		}
	}
	
}
</script>

<style>
</style>