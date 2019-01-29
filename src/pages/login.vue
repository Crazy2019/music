<template>
	<div>
		
		<!--<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
		<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
		
		<div class="login" @click="headLogin">登入</div>-->
		<!--验证邮箱-->
		<input v-validate="'required|email'" v-model="email" name="email" type="text" data-vv-as="email"> 
		<p>{{ errors.first('email') }}</p>
		<!--<p>{{ errors }}</p>-->
		
		
		<input v-validate="'required|min:6'" name="password" v-model="pass" type="password" placeholder="Password" ref="password"><!--密码不低于六位-->
		<p>{{ errors.first('password') }}</p>

		<input v-validate="'required|confirmed:password'" v-model="pass_confirmed" name="password_confirmation" type="password" placeholder="Password, Again" data-vv-as="password">
		<p>{{ errors.first('password_confirmation') }}</p>
		
		<!--<input type="text" v-validate="'date_format:YYYY/DD/MM'" name="date" />	<!--日期-->
		<!--<p>{{ errors.first('date') }}</p>-->
		
		<input type="text" v-validate="'required|alpha'" v-model="alpha" name="alpha" />	<!--只包含数字-->
		<p>{{ errors.first('alpha') }}</p>
		<!--包含数字和字母-->
		<!--<input type="text" v-validate="'alpha_dash'" name="num" />  
		<p>{{ errors.first('num') }}</p>-->
		
		<!--两个时间之间的有效值-->
		
		<!--<input type="text" v-validate="'date_format:DD/MM/YYYY|date_between:10/09/2016,20/09/2016'" name="date_between" />
		<p>{{ errors.first('date_between') }}</p>-->
		
		<!--尺寸图片-->
		<!--<input type="file" v-validate="'dimensions:30,30'" data-vv-as="image" name="dimensions_field" />
		<p>{{ errors.first('dimensions_field') }}</p>-->
		
		<!--只包含数字-->
		<!--<input type="text" v-validate="'numeric'" data-vv-as="field" name="numeric" />
		<p>{{ errors.first('numeric') }}</p>
		-->
				
		<div class="login" @click="headLogin">登入</div>
		
		
		<v-unit v-for="(unit, index) in units" :key="index" :content="unit.text"></v-unit>
		
		
		
		<span>当前位置：{{Current}}</span>
		
	</div>
</template>
<script>
import unit1 from '../components/test/unit1';
import BMap from 'BMap'
export default{
	components: {
		'v-unit': unit1
	},
	data(){
		return{
			email: '',
			pass: '',
			pass_confirmed: '',
			alpha: '',
			units: [
				{text: "张山"},
				{text: "李四"}
			],
			Current: ''
		}
	}
	,
	methods: {
		headLogin(){
			this.$validator.validateAll().then(res=>{
				const dataInfo = {'email': this.email, 'pass': this.pass, 'pass_confirmed': this.pass_confirmed, 'alpha': this.alpha}
				console.log(dataInfo);
			})
		}
	},
	mounted: function(){
		var slef = this;
		var geolocation = new BMap.Geolocation();
		navigator.geolocation.getCurrentPosition(function(position){
			var x = position.coords.longitude;
		    var y = position.coords.latitude;
			console.log(x)
		})
//		geolocation.getCurrentPosition(function(r) {
//			console.log(r)
//			if(this.getStatus() == BMAP_STATUS_SUCCESS){
//				const myGeo = new BMap.Geocoder();
//				myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), res => {
//					if(res.addressComponents){
//						slef.Current = res.addressComponents.province+""+res.addressComponents.city+""+res.addressComponents.district+""+res.addressComponents.street+""+res.addressComponents.streetNumber;
//					}
//				})
//			}
//		})
	},
}
</script>
<style type="text/css">
	input{
		width: 90%;
		height: 36px;
		border: 1px solid #e3e3e3;
		margin: 10px 5% 0;
		padding: 5px;
		border-radius: 3px;
	}
	.login{
		width: calc(100% - 10%);
		height: 40px;
		background: #e3e3e3;
		border-radius: 4px;
		margin: 10px 5% 0;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
	}	
	/*p{
		width: calc(100% - 10%);
		margin: 5px 5% 0;
	}*/
</style>
