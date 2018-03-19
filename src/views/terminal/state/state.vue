<style lang="less">
@import "./state.less";
@import "../../../styles/common.less";
</style>
<template>
  <div class="view-terminal-state">
    <div class="view-left">
      <Card>
          <p slot="title">终端列表</p>
          <Tree :data="treeData"></Tree>
      </Card>
    </div>
    <div class="view-right">
        <div class="padding-10">
            <Row type="flex">
                <Col span="4" class="handle-top-left padding-top-8">
                    <Checkbox v-model="autoRefresh">自动刷新</Checkbox>
                </Col>
                <Col span="20" class="handle-top-right">
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
        <Modal v-model="editorModel" width="560">
          <p slot="header" style="color:#f60;text-align:center">
              终端基本信息设置
          </p>
          <div style="text-align:center">
              <Form :model="formItem" :label-width="80">
                <FormItem label="Input">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="Select">
                    <Select v-model="formItem.select">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="DatePicker">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="Radio">
                    <RadioGroup v-model="formItem.radio">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="Checkbox">
                    <CheckboxGroup v-model="formItem.checkbox">
                        <Checkbox label="Eat"></Checkbox>
                        <Checkbox label="Sleep"></Checkbox>
                        <Checkbox label="Run"></Checkbox>
                        <Checkbox label="Movie"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="Switch">
                    <i-switch v-model="formItem.switch" size="large">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>
                </FormItem>
                <FormItem label="Slider">
                    <Slider v-model="formItem.slider" range></Slider>
                </FormItem>
                <FormItem label="Text">
                    <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary">Submit</Button>
                    <Button type="ghost" style="margin-left: 8px">Cancel</Button>
                </FormItem>
            </Form>
          </div>
          <div slot="footer">
              <Button type="primary">保存</Button>
              <Button type="warning" @click="editorModel=false">关闭</Button>
          </div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      autoRefresh: false,
      editorModel: false,
      modal_loading: false,
      treeData: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ],
      terminalType: "all",
      typeList: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "name",
          label: "终端名称"
        },
        {
          value: "status",
          label: "终端状态"
        },
        {
          value: "ip",
          label: "IP"
        },
        {
          value: "分辨率",
          label: "分辨率"
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
                      this.showModel(params.index)
                    }
                  }
                },
                "详情"
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
      ],
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    };
  },
  methods: {
    showModel(index) {
      this.editorModel = true;
    },
    changePage (){
        // this.tableData1 = this.mockTableData1();
    }
  }
};
</script>