<style lang="less">
@import "./organization.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-systems-organization">
    <div class="view-top margin-bottom-10">
      <Row type="flex">
          <Col span="12" class="handle-top-left">
              <Button type="primary" @click="addOrgModal=true">添加机构</Button>
              <Button type="primary">删除机构</Button>
              <Button type="primary" @click="handleEditOrg">编辑机构</Button>
              <Button type="primary" @click="organupdata=true">机构导入</Button>
              <Button type="primary">机构导出</Button>
          </Col>
          <Col span="12" class="handle-top-right">
              <div class="search-item">
                  <Select v-model="terminalType" style="min-width:180px" filterable multiple>
                      <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
              </div>
              <div class="search-item">
                  <Input v-model="searchLikes" placeholder="模糊查询" clearable style="width: 140px"></Input>
                  <Button type="ghost" shape="circle" icon="ios-search" @click="handleSearch"></Button>
              </div>

          </Col>
      </Row>
    </div>
    <Table border @on-selection-change="hangdleSelect" @on-select="onSelect" @on-select-cancel="selectCancel" @on-select-all="selectAll"  :columns="columns" :data="tableData"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="totalRecord" :current="currentPage" @on-change="changePage" :page-size="pageSize" show-elevator show-total></Page>
        </div>
    </div>
    <!-- 添加机构 -->
	<Modal v-model="addOrgModal" width="360" @on-visible-change="orgModalCancel">
		<p slot="header" style="color:#f60;text-align:center">
			<span>{{formInfo.organName==""?"新建机构":"编辑机构"}}</span>
		</p>
		<div style="text-align:center">
			<Form :model="formInfo" :label-width="80">
				<FormItem label="机构名称">
					<Input v-model="formInfo.organName"></Input>
				</FormItem>
				<FormItem label="上级机构">
					<Select v-model="formInfo.superiororganId">
						<Option value="beijing">总部</Option>
						<Option value="shanghai">湖北公司</Option>
					</Select>
				</FormItem>
				<FormItem label="机构描述">
					<Input v-model="formInfo.organDescr"></Input>
				</FormItem>
				<FormItem label="负责人">
					<Input v-model="formInfo.organLeader"></Input>
				</FormItem>
				<FormItem label="联系电话">
					<Input v-model="formInfo.organTele"></Input>
				</FormItem>
			</Form>
		</div>
		<div slot="footer" class="btn_center_wrap">			
			<Button type="primary" @click="handleAddOrg">确认</Button>
			<Button type="default" @click="addOrgModal=false">取消</Button>
		</div>
	</Modal>
  <Modal v-model="organupdata" width="360" title='机构导入'>
      <Upload action="http://47.95.201.45:8080/mzfb/upload">
          <Button type="ghost" icon="ios-cloud-upload-outline">点击选择文件</Button>
      </Upload>
  </Modal>  
  </Card>
</template>
<script>
import {organizationList} from '@/api/api';
export default {
  data() {
    return {
	  terminalType: [],
	  addOrgModal:false,
    organupdata:false,
    selectSearch:{},
    totalRecord:1,
    totalPage:1,
    pageSize:1,
    currentPage:1,
	  formInfo:{
		  superiororganId:'',
		  organName:'',
		  organDescr:'',
		  organLeader:'',
		  organTele:''

	  },
      typeList: [
        {
          value: "organName",
          label: "机构名称"
        },
        {
          value: "OrganDescr",
          label: "机构描述"
        },
        {
          value: "SuperiororganId",
          label: "上属机构"
        },
        {
          value: "OrganLeader",
          label: "负责人"
        },
        {
          value: "OrganTele",
          label: "联系电话"
        }
      ],
      searchLikes: "",
      searchInResult: "",
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
		  type: 'index',
          title: "序号",
		  key: "index",
        },
        {
          title: "机构ID",
          key: "organId"
        },
        {
          title: "机构名称",
          key: "organName"
        },
        {
          title: "上属机构",
          key: "superiorOrgan",        
        },
        {
          title:"机构描述",
          key:'organDescr'
        },
        {
          title:"负责人",
          key:"organLeader"
        },
        {
          title:"联系电话",
          key:"organTele"
        }
      ],
      tableData: []
    };
  },
  mounted:function(){
    this.getList()
  },
  methods: {
    getList(currentPage=this.currentPage,pageSize=this.pageSize,searchInfo=this.selectSearch){
      let data = {
        pageSize,
        currentPage,
        ...searchInfo
      }
      organizationList(data).then((res)=>{
        if(res.status==0){
          console.log(res)
          this.tableData=res.data.pinfo;
          this.pageSize=pageSize;
          this.currentPage=currentPage;
          this.totalPage=res.data.totalPage;
          this.totalRecord=res.data.totalRecord;
          this.selectSearch=searchInfo;
        }
      })
    },
    onSelect(selection,row){
      console.log(selection)
      console.log(row)
    },
    selectCancel(selection,row){
      console.log(selection)
      console.log(row)
    },
    selectAll(selection){
      console.log(selection)
    },
    hangdleSelect(selection){
      console.log(111)
      console.log(selection)
      console.log(111)
    },
    remove(index) {
      this.tableData.splice(index, 1);
    },
    handleAddOrg(){
      this.addOrgModal=true
    },
    handleSearch(){
      let obj = {}
      this.terminalType.map((item)=>{
        obj[item]=this.searchLikes
      })
      this.getList(1,this.pageSize,obj)
    },
    handleEditOrg(){
      let obj ={
        superiororganId:'shanghai',
        organName:'111',
        organDescr:'222',
        organLeader:'33',
        organTele:'131564564654'
      }
      this.formInfo=obj;
      this.addOrgModal=true;
    },
    orgModalCancel(e){
      if(!e){
        let obj ={
          superiororganId:'',
          organName:'',
          organDescr:'',
          organLeader:'',
          organTele:''
        }
        this.formInfo=obj;
      }
      
    },
    changePage(current) {
      this.getList(current)
    }
  }
};
</script>