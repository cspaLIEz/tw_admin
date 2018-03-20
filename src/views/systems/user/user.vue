<style lang="less">
@import "./user.less";
@import "../../../styles/common.less";
</style>
<template>
  <Card class="view-systems-user">
    <div class="view-top margin-bottom-10">
      <Row type="flex">
          <Col span="12" class="handle-top-left">
              <Button type="primary">添加用户</Button>
              <Button type="primary">删除用户</Button>
              <Button type="primary">编辑用户</Button>
              <Button type="primary">用户导入</Button>
              <Button type="primary">用户导出</Button>
          </Col>
          <Col span="12" class="handle-top-right">
              <div class="search-item">
                  <Select v-model="terminalType" style="width:80px">
                      <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
              </div>
              <div class="search-item">
                  <Input v-model="searchLikes" placeholder="模糊查询" clearable style="width: 140px"></Input>
                  <Button type="ghost" shape="circle" icon="ios-search"></Button>
              </div>
              <div class="search-item">
                  <Checkbox v-model="searchInResult">在结果中查询</Checkbox>
              </div>
          </Col>
      </Row>
    </div>
    <Table border  :columns="columns" :data="tableData"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
  </Card>
</template>
<script>
export default {
  data() {
    return {
      terminalType: "all",
      typeList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "name",
          label: "用户名"
        },
        {
          value: "status",
          label: "登录名"
        },
        {
          value: "parent-org",
          label: "所属机构"
        },
        {
          value: "role",
          label: "用户角色"
        }
      ],
      searchLikes: "",
      searchInResult: "",
      columns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "Action",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.register(params.index);
                    }
                  }
                },
                "注册"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods: {
    register(index) {},
    remove(index) {
      this.tableData.splice(index, 1);
    },
    changePage() {
      // this.tableData1 = this.mockTableData1();
    }
  }
};
</script>