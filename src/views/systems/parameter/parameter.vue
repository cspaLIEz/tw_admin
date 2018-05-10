<style lang="less">
@import "./parameter.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-systems-parameter">
    <div class="view-left">
      <Card>
          <Tree :data="treeData" @on-select-change="selectChange"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <Card v-if="selectModel==0||selectModel==1">
          <h3 slot="title">{{selectModel==0?"MQTT服务器信息":"FTP服务器信息"}}</h3>
          <Form :model="formInfo" label-position="right" :label-width="80">
              <FormItem label="IP地址">
                  <Input v-model="formInfo.ip"></Input>
              </FormItem>
              <FormItem label="端口">
                  <Input v-model="formInfo.port"></Input>
              </FormItem>
              <FormItem label="用户名">
                  <Input v-model="formInfo.username"></Input>
              </FormItem>
              <FormItem label="密码">
                  <Input v-model="formInfo.pwd"></Input>
              </FormItem>
              <FormItem label="存放地址" v-if="selectModel==1">
                  <Input v-model="formInfo.address"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary">关闭</Button>
                <span class="tip">注意，关闭时判断是否有修改如修改提示用户是否保存</span>
              </FormItem>
          </Form>
        </Card>
        <Card v-else-if="selectModel==3">
            <div style="margin-bottom:15px">
                <Button type="primary" @click="changeModalVisible=true">添加</Button>
                <Button type="primary">删除</Button>
                <Button type="primary">编辑</Button>
            </div>
            <Table border  :columns="columns" :data="tableData"></Table>
        </Card>
        <Card v-else-if="selectModel==4">
            <div style="margin-bottom:15px">
                <Button type="primary" @click="changeModalVisible=true">添加</Button>
                <Button type="primary">删除</Button>
                <Button type="primary">编辑</Button>
            </div>
            <Table border  :columns="columns" :data="tableData"></Table>
        </Card>
        <Card v-else-if="selectModel==5">
            <Row type="flex" style="margin-bottom:15px;">
                <Col span="20" class="handle-top-left">
                    <h3>授权信息</h3>
                </Col>
                <Col span="4" class="handle-top-right">
                <Button type="default" size="small">导入授权文件</Button>
                </Col>           
            </Row>
            <Table border  :columns="columns" :data="tableData"></Table>
        </Card>
        <Card v-else>
            <div style="margin-bottom:15px">
                <Button type="primary" @click="changeModalVisible=true">添加</Button>
                <Button type="primary">删除</Button>
                <Button type="primary">编辑</Button>
            </div>
            <Table border  :columns="columns" :data="tableData"></Table>
        </Card>
    </div>
    <!-- 添加和编辑角色 -->
    <Modal v-model="changeModalVisible" width="400">
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{"添加"}}</span>
      </p>
      <div style="text-align:center">
        <Form :model="formInfo" :label-width="80">
          <FormItem label="分辨率">
            <Input v-model="formInfo.resolution"></Input>
          </FormItem>       
          <FormItem label="说明">
            <Input v-model="formInfo.desc" type="textarea" :rows="4"></Input>
          </FormItem>
          <FormItem label="是否默认">
            <Input v-model="formInfo.nomol"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="btn_center_wrap">			
        <Button type="primary" @click="changeModalVisible=false">确认</Button>
        <Button type="default" @click="changeModalVisible=false">取消</Button>
      </div>
    </Modal>
  </Card>
</template>
<script>
export default {
  data(){
        return {
            selectModel:0,
            changeModalVisible:false,
            formInfo:{},
            treeData:[
                {
                  title: '消息服务器',
                  selected:true
                },
                {
                  title: '文件服务器',
                },
                {
                    title: '字典管理',
                    expand: true,
                    children: [
                        {
                            title: '分辨率',
                        },
                        {
                            title: '素材格式',
                        }
                    ]
                },
                {
                  title: '授权管理',
                }
            ],
            columns:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title:"分辨率",
                    key:"screen"
                },
                {
                    title:"说明",
                    key:"caption"
                },
                {
                    title:"是否默认",
                    key:"isDefault"
                }
            ],
            tableData:[
                {
                    screen:"1024*768",
                    caption:"sdfsfs",
                    isDefault:"是"
                },
                {
                    screen:"1024*768",
                    caption:"sdfsfs",
                    isDefault:"是"
                },
                {
                    screen:"1024*768",
                    caption:"sdfsfs",
                    isDefault:"是"
                },
            ],
        }
    },
    methods:{
        register(index){

        },
        remove (index) {
            this.tableData.splice(index, 1);
        },
        selectChange(e){
            if(e.length==1){
                console.log(e)
                console.log(e[0].nodeKey)
                if(e[0].nodeKey==2){
                    e[0].expand=true
                }else{
                    this.selectModel=e[0].nodeKey;
                    this.formInfo = {}
                }
                
            }
            
        },
        changePage (){
            // this.tableData1 = this.mockTableData1();
        }
    }
}
</script>
