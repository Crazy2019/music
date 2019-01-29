<template>
	<div class="header-nav">
		<mt-navbar v-model="headNav" class="navbar">
			<mt-tab-item id="header-nav1">新歌</mt-tab-item>
			<mt-tab-item id="header-nav2">排行</mt-tab-item>
			<mt-tab-item id="header-nav3">歌单</mt-tab-item>
			<mt-tab-item id="header-nav4">歌手</mt-tab-item>
		</mt-navbar>
	</div>
</template>

<script>
export default{
	name: 'header-nav',
	data(){
		return {
			
		}
	},
	computed:{
		headNav: {
			get() {
				return this.$store.getters.headNav
			},
			set(nav){
				this.$store.commit("setHeadNav", nav);
				var index = nav.substr(-1);
				this.goRouter(Number(index))
			}
		}
	},
	methods: {
		goRouter(index){
			switch(index){
				case 1:
					this.$router.push({path: '/'});
					break;
				case 2:
					this.$router.push({path: '/rank'});
					break;
				case 3:
					this.$router.push({path: '/plist'});
					break;
				case 4:
					this.$router.push({path: '/singer'});
					break;
			}
		}
	}
	
}
</script>
<style type="text/css">
	.navbar{
		padding: 0 10px;
	}
	.mint-navbar .mint-tab-item.is-selected{
		margin-bottom: 0;
	}
	.mint-tab-item{
		padding: 12px 0 !important;
		color: #000 !important;
	}
	.mint-tab-item-label {
	    font-size: 16px !important;
	}
	.mint-tab-item-label a{
		color: #333;
	}
</style>
