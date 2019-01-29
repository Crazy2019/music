<template>
	<div class="header">
		<header-logo></header-logo>
		<rank-head v-if="head.toggle" :title="head.title" :cStyle="head.style"></rank-head>
		<header-nav v-else></header-nav>
	</div>
</template>

<script>
import headLogo from "./HeadLogo";
import headNav from "./HeadNav";
import rankHead from "./rankHead";
import { mapGetters } from "vuex"
export default{
	components: {
		"header-logo": headLogo,
		"rank-head": rankHead,
		"header-nav": headNav
	},
	data() {
		return {
			
		}
	},
	computed: {
		...mapGetters(['head'])
	}
}

</script>
