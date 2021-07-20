<template>
	<div>
		<el-dialog title="收货地址" :visible.sync="dialogVisible" @close="cancle">
			<div>{{ currentValue }}</div>
			<div>fatherData {{ fatherData.lang }}</div>
			<el-button type="primary" @click="change">修改</el-button>
			<p>是否影响父类参数{{ ObjectData.lang }}</p>
			<el-table :data="gridData">
				<el-table-column property="date" label="日期" width="150"></el-table-column>
				<el-table-column property="name" label="姓名" width="200"></el-table-column>
				<el-table-column property="address" label="地址"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle">取 消</el-button>
				<el-button type="primary" @click="comfirm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			currentValue: this.value,
			fatherData: Object.assign({}, this.ObjectData), // 父组件传递的引用类型需要深拷贝
			gridData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}
			]
		}
	},
	props: {
		value: [String, Boolean, Number], // 父组件v-model传递过来的值
		ObjectData: {
			type: Object,
			default: () => {
				return {
					lang: ''
				}
			}
		},
		visible: Boolean
	},
	computed: {
		dialogVisible: {
			get: function() {
				return this.visible
			},
			set: function() {
				this.cancle()
			}
		}
	},
	methods: {
		change() {
			this.currentValue = new Date().getTime()
			this.fatherData.lang = new Date().getTime()
		},
		cancle() {
			this.$emit('update:visible', false)
		},
		comfirm() {
			this.$emit('update:visible', false)
			this.$emit('updateObjectData', this.fatherData)
		}
	}
}
</script>
