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
              <Button type="primary">机构导入</Button>
              <Button type="primary">机构导出</Button>
          </Col>
          <Col span="12" class="handle-top-right">
              <div class="search-item">
                  <Select v-model="terminalType" style="width:80px">
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
            <Page :total="100" :current="1" @on-change="changePage"></Page>
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
  </Card>
</template>
<script>
export default {
  data() {
    return {
	  terminalType: "all",
	  addOrgModal:false,
	  selectSearch:{},
	  formInfo:{
		  superiororganId:'',
		  organName:'',
		  organDescr:'',
		  organLeader:'',
		  organTele:''

	  },
      typeList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "organName",
          label: "机构名称"
        },
        {
          value: "status",
          label: "机构ID"
        },
        {
          value: "parent-org",
          label: "上属机构"
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
      tableData: [
        {
          index:1,
          organId:1345,
          organName: "John Brown",
          superiorOrgan: 18,
          organDescr:"张三",
          organLeader: "New York No. 1 Lake Park",
          organTele: 123456789123
		},
		{
          index:1,
          organId:1345,
          organName: "John Brown",
          superiorOrgan: 18,
          organDescr:"张三",
          organLeader: "New York No. 1 Lake Park",
          organTele: 123456789123
		},
		{
          index:1,
          organId:1345,
          organName: "John Brown",
          superiorOrgan: 18,
          organDescr:"张三",
          organLeader: "New York No. 1 Lake Park",
          organTele: 123456789123
		},
		{
          index:1,
          organId:1345,
          organName: "John Brown",
          superiorOrgan: 18,
          organDescr:"张三",
          organLeader: "New York No. 1 Lake Park",
          organTele: 123456789123
		},
		{
          index:1,
          organId:1345,
          organName: "John Brown",
          superiorOrgan: 18,
          organDescr:"张三",
          organLeader: "New York No. 1 Lake Park",
          organTele: 123456789123
        },
   
      ]
    };
  },
  methods: {
    register(index) {},
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
      this.selectSearch={
        [this.terminalType]:this.searchLikes
      }
      console.log({
        [this.terminalType]:this.searchLikes
      })
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
      console.log(current)
      // this.tableData1 = this.mockTableData1();
    }
  }
};
</script>