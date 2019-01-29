<template>
	<div class="plist">
		
		<mt-cell v-for="(list, index) in lists" :title="list.specialname" 
			:label="String(list.playcount)" :to="`/plist/info/${list.specialid}`" is-link>
			<img slot="icon" :src="list.imgurl.replace('{size}', '400')" width="60" height="60" alt="" />
		</mt-cell>
	</div>
</template>

<script>
import { Indicator } from "mint-ui";
export default{
	data() {
		return {
			lists: []
		}
	},
	created(){
		this.plistList()
	},
	methods: {
		plistList() {
			Indicator.open({
				text: "加载中...",
				spinnerType: 'fading-circle'
			});
			this.$ajax.get("/proxy/plist/index&json=true").then(res=>{
				Indicator.close();
				if(res.status == 200){
					this.lists = res.data.plist.list.info
				}
			}).catch(error=>{
				
			})
		}
	}
}
</script>
