<template>
	<view class="birthday">
		<u-picker mode="time" v-model="show" :limitTime="limitTimeInit||limitTime" :title="title" :params="params" :start-year="minTime" :end-year="maxTime" :default-time="currentDate" @confirm="onConfirm"></u-picker>
	</view>
</template>

<script>
	import {
		parseTime
	} from '@co/util.js'
	export default {
		name:'datePicker',
		props:{
			title: {
				type: String,
				default: ''
			},
			postType: {
				type: String,
				default: ''
			},
			year: {
				type: Boolean,
				default: true
			},
			month: {
				type: Boolean,
				default: true
			},
			day: {
				type: Boolean,
				default: true
			},
			hour: {
				type: Boolean,
				default: false
			},
			minute: {
				type: Boolean,
				default: false
			},
			second: {
				type: Boolean,
				default: false
			},
			limitTimeInit: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				show:false,
				params: {
					year: this.year,
					month: this.month,
					day: this.day,
					hour: this.hour,
					minute: this.minute,
					second: this.second
				},
				// currentDate: parseTime(new Date().valueOf() - 3600 * 24 * 1000 * 24 * 365).substr(0,4)+'-06',
				currentDate:parseTime(new Date().valueOf() + 3600 * 24 * 1000 * 14).substr(0,10),
				minTime: parseTime(new Date().valueOf()).substr(0,4),
				maxTime: parseTime(new Date().valueOf() + 3600 * 24 * 1000 * 365 *20).substr(0,4),
				limitTime: parseTime(new Date().valueOf()).substr(0,10),
				// maxTime: parseTime(new Date().valueOf()).substr(0,4)
			};
		},
		mounted() {
			// console.log(this.currentDate)
		},
		methods: {
			onConfirm(e) {
				this.$emit('setDate',e.year + '-' + e.month + (this.params.day?('-' + e.day):'') +' 23:59:59')
			},
			showModal() {
				this.show=true
			}
		},
	}
</script>

<style lang="scss">
</style>
