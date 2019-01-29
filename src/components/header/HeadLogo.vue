<template>
	<div class="logo-container am-g">
		<div class="head-logo">
			<router-link to="/">
				<img src="http://m.kugou.com/v3/static/images/index/logo.png" alt="" />
			</router-link>
			
			<!--<router-link to="/login">立即登入</router-link>-->
			
		</div>
		<div class="head-search" @click="goSearch">
			<img src="http://m.kugou.com/v3/static/images/index/search.png">
		</div>
	</div>
	
</template>

<script>
export default{
	data() {
		return {
			
		}
	},
	methods: {
		goSearch() {
			this.$router.push({path: '/search'})
		}
	}
}
</script>

