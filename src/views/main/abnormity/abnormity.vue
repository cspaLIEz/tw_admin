<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <div>
        <h1 style="margin:20px 0 0 50px">自动改价异常的饰品</h1>
        <Input v-model="value6" type="textarea" style="width: 350px" :rows="16" placeholder="Enter something..."></Input>
        <p><Button style="margin-top: 20px" type="primary">手动改价</Button></p>
    </div>
</template>

<script>
    import {GetErrorItemList,SaveErrorItemList} from '@/api/api.js';
	import axios from '@/libs/axios';
	export default {
		name: 'abnormity',
        data() {
			return {
				value6: ""
            }
        },
        methods:{
			getList(){
				GetErrorItemList().then((res)=>{
					let data = res.data;
					if(data.success==true){
						for(let i = 0;i<data.data.length;i++){
							this.value6 += data.data[i].name + "," + data.data[i].price + '\n';
                        }
					}
				})
            },

        },
        created:function () {
            this.getList();
		}
	}
</script>