<template>
	<div class="rank">
		
		<mt-cell v-for="(item, index) in items" :to="`/rank/info/${item.rankid}`" :title="item.rankname" is-link :key="index">
			<img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60" alt="" />
		</mt-cell>
		
	</div>
</template>

<script>
import { Indicator } from "mint-ui";
export default{
	data(){
		return {
			items: []
		}
	},
	created(){
		this.getList()
	},
	methods: {
		getList() {
			Indicator.open({
				text: "加载中...",
				spinnerType: 'fading-circle'
			});
			this.$ajax.get('/proxy/rank/list&json=true').then(res=>{
				Indicator.close();
				if(res.status == 200){
					this.items = res.data.rank.list;
				}
			}).catch(error=>{
			
			})
		}
	}
}
</script>

<style>
.rank .mint-cell-wrapper{
	padding: 10px 5px;
	font-size: 16px;
}
</style>