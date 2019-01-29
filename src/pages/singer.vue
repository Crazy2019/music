<template>
	<div class="singer">
		
		<div class="cell-group">
			<div class="cell-item" @click="goRoute(88)">热门歌手</div>
		</div>
		<div class="cell-group">
			<div class="cell-item" @click="goRoute(1)">华语男歌手</div>
			<div class="cell-item" @click="goRoute(2)">华语女歌手</div>
			<div class="cell-item" @click="goRoute(3)">华语组合</div>
		</div>
		<div class="cell-group">
			<div class="cell-item" @click="goRoute(4)">日韩男歌手</div>
			<div class="cell-item" @click="goRoute(5)">日韩女歌手</div>
			<div class="cell-item" @click="goRoute(6)">日韩组合</div>
		</div>
		<div class="cell-group">
			<div class="cell-item" @click="goRoute(7)">欧美男歌手</div>
			<div class="cell-item" @click="goRoute(8)">欧美女歌手</div>
			<div class="cell-item" @click="goRoute(9)">欧美组合</div>
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
		goRoute(obj){
			this.$router.push({path: `/singer/list/${obj}`})
		}
	}
}
</script>
