<template>
	<div class="rank-head" :style="cStyle">
		<a class="head-back" @click="routerBack"></a>
		<p class="dynamic-title">{{title}}</p>
	</div>
	
</template>

<script>
export default{
	props: ["title","cStyle"],
	data(){
		return {
			
		}
	},
	methods: {
		routerBack(){
			this.$router.go(-1);
		}
	}
}
</script>
