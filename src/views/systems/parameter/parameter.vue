<style lang="less">
@import "./parameter.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-systems-parameter">
    <div class="view-left">
      <Card>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <Card>
          <h3 slot="title">MQTT服务器信息</h3>
          <Form :model="formRight" label-position="right" :label-width="80">
              <FormItem label="IP地址">
                  <Input v-model="formRight.ip"></Input>
              </FormItem>
              <FormItem label="端口">
                  <Input v-model="formRight.port"></Input>
              </FormItem>
              <FormItem label="用户名">
                  <Input v-model="formRight.username"></Input>
              </FormItem>
              <FormItem label="密码">
                  <Input v-model="formRight.pwd"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary">关闭</Button>
                <span class="tip">注意，关闭时判断是否有修改如修改提示用户是否保存</span>
              </FormItem>
          </Form>
        </Card>
    </div>
  </Card>
</template>
<script>
export default {
  data(){
        return {
            treeData:[
                {
                  title: '消息服务器',
                },
                {
                  title: '文件服务器',
                },
                {
                    title: '字典管理',
                    expand: true,
                    children: [
                        {
                            title: '分辨率'
                        },
                        {
                            title: '素材格式'
                        }
                    ]
                },
                {
                  title: '授权管理',
                }
            ],
            formRight: {
                ip: '',
                port: '',
                username: '',
                pwd:''
            }
        }
    },
    methods:{
        register(index){

        },
        remove (index) {
            this.tableData.splice(index, 1);
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        }
    }
}
</script>
