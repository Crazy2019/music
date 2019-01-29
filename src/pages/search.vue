<template>
	<div class="search">
		<div class="search-panel am-g">
			<div class="search-input am-g">
				<span class="search-icon"></span>
				<input type="text" v-model="keyword" placeholder="歌手/歌名/拼音" v-on:input="inputFun" @keydown.enter="search" />
			</div>
			<a href="javascript:;" @click="search" class="search-btn">搜索</a>
		</div>
		
		<div class="search-hot" v-show="toggleSearchHot">
			<div class="hot-title">最近热门</div>
			<mt-cell v-for="(hot, index) in hotList" :title="hot.keyword" @click.native="replaceInput(index)" :key="index"></mt-cell>
		</div>
		
		<div class="search-list" v-show="!toggleSearchHot">
			<div class="search-total">
				共有{{total}}条搜索结果
			</div>
			<mt-cell v-for="(todo, index) in songList" :title="todo.filename" @click.native="playAudio(index)" :key="index">
				<img src="../assets/images/download_icon.png" width="18" height="18" />
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
		return {
			hotList: [],
			keyword: '',
			toggleSearchHot: true,
			total: null,
			songList: []
		}
	},
	created(){
		this.gteHostlist();
	},
	methods: {
		gteHostlist() {
			Indicator.open({
				text: "加载中...",
				spinnerType: 'snake'
			});
			this.$ajax.get('/aproxy/api/v3/search/hot?format=json&plat=0&count=30').then(res=>{
				Indicator.close();
				if(res.status == 200){
					this.hotList = res.data.data.info;
				}
			}).catch(error=>{});
		},
		replaceInput(index){
			this.keyword = this.hotList[index].keyword;
			this.search();
		},
		inputFun() {
			if(this.keyword == "" || this.keyword == null || this.keyword == undefined){
				this.toggleSearchHot = true;
			}
		},
		search() {
			this.toggleSearchHot = false;
			Indicator.open({
				text: "加载中...",
				spinnerType: 'snake'
			});
			if(this.keyword){
				this.$ajax.get(`/aproxy/api/v3/search/song?format=json&keyword=${this.keyword}&page=1&pagesize=30&showtype=1`).then(data=>{
					if(data.status == 200){
						this.total = data.data.data.total;
						this.songList = data.data.data.info
					}
					Indicator.close();
				}).catch(error=>{})
			}
		}
	}
}
</script>
