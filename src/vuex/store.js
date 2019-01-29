import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import user from "./modules/user"

Vue.use(Vuex)

const store = new Vuex.Store({
//	modules: {
//		user
//	}
	state: {
		headNav: "header-nav1",
		username: '',
		password: '',
		audio: {
			singer: '',
			song_name: '',
			audio_name: '',
			musicImg: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
			songUrl: '',
			songLength: '',
			currentLength: 0,
		},
		head:{
			toggle: false,
			title: '',
			style: {'background': 'rgba(43,162,251,0)'}
		},
		detailPlayerFlag: false,  //音乐播放详情页
		listInfo: {
			songList: [],
			songIndex: 0,
		},
		showPlayer: false,
		listenCount: 0,
		audioLoadding: false
	},
	getters: {
		headNav: state=>state.headNav,
		audio: state=>state.audio,
		head: state=>state.head,
		detailPlayerFlag: state=>state.detailPlayerFlag,
		showPlayer: state => state.showPlayer,
		getshowLoding: state=>state.audioLoadding,
	},
	mutations: {
		showHead(state, flag){
			state.head.toggle = flag
		},
		setHeadTitle(state, title){
			state.head.title = title
		},
		setHeadStyle(state, style){
			state.head.style = style
		},
		setHeadNav(state, nav){
			state.headNav = nav
		},
		login(state, play){
			state.username = play
		},
		DETAILPLAYFLAG(states, flag){
			states.detailPlayerFlag = flag
		},
		setAudio(states, audioState){
			if(!states.listenCount){		
				states.showPlayer = true;		//首次进入应用时不可打开播放详情	
			}
			states.listenCount++;
			states.audio = audioState;
		},
		setListinfo(states, {info, index}){
			states.listInfo.songList = info;
			states.listInfo.songIndex = index;
		},
		toggleAudioLoadding(states, bool){
			states.audioLoadding = bool;
		}
	},
	actions: {
		loginSelete({commit, play}){
			commit('login', play);
		},
		getSong({commit}, hash){
			commit("toggleAudioLoadding",true);
			axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(res=>{
				let singer = res.data.data.audio_name;
				let song_name = res.data.data.song_name;
				let audio_name = res.data.data.audio_name;
				let musicImg = res.data.data.img;
				let songUrl = res.data.data.play_url;
				let songLength = res.data.data.timelength / 1000;
				let currentLength = 0;
				let audioState = {singer, song_name, audio_name, musicImg, songUrl,songLength,currentLength}
				commit("setAudio", audioState);
				commit("toggleAudioLoadding",false);
			}).catch(error=>{})
		},
		next({dispatch, state}){
			if(state.listInfo.songList.list != undefined){
				if(state.listInfo.songIndex == state.listInfo.songList.list.length-1 ){
					state.listInfo.songIndex = 0;
				}else{
					++state.listInfo.songIndex;
				}
				let hash = state.listInfo.songList.list[state.listInfo.songIndex].hash;
				dispatch("getSong", hash);
			}
		},
		prev({dispatch, state}){
			if(state.listInfo.songIndex == 0 ){
				state.listInfo.songIndex = state.listInfo.songList.list.length-1;
			}else{
				state.listInfo.songIndex--
			}
			let hash = state.listInfo.songList.list[state.listInfo.songIndex].hash;
			dispatch("getSong", hash);
		}
	}
});
export default store
