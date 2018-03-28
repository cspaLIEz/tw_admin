<style lang="less">
    @import '../../styles/common.less';
    @import url('./index.less');
</style>

<template>
    <div class="build-container">
        <div class="build-header">
            <div class="build-header-logo"> 
                <img src="../../images/build/program_build.png" alt="">
            </div>
            <div class="build-header-center">
                <p><span>节目名称：</span>普通节目-1</p>
                <p><span>节目时长：</span>01: 32: 52</p>
                <p><span>节目分辨率：</span>1920*1080</p>
            </div>
            <div class="build-header-right">
                <a href="javascript:;">保存</a>
                <a href="javascript:;">浏览</a>
                <a href="javascript:;">取消</a>
            </div>
        </div>
        <div class="build-main">
            <div class="build-main-left">
                <div class="bml-header">
                    <p></p>
                    <img src="../../images/build/close_left.png" alt="">
                </div>
                <Collapse v-model="leftCollapse">
                    <Panel name="1" class="program-tree bml-group">
                        <div class="group-header">
                            页面
                            <span>
                                <Icon type="plus-round"></Icon>
                            </span>
                        </div>
                        <div slot="content">
                            <Tree :data="programTreeData"></Tree>
                        </div>
                    </Panel>
                    <Panel name="2" class="components-group bml-group">
                        <div class="group-header">
                            组件区
                            <span>
                                <Icon type="plus-round"></Icon>
                            </span>
                        </div>
                        <Collapse slot="content" v-model="componentCollapse" accordion class="component-collapse">
                            <Panel name="1">
                                <div class="component-group-header">
                                    基础组件
                                    <span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </span>
                                </div>
                                <div slot="content">

                                </div>
                            </Panel>
                            <Panel name="2">
                                <div class="component-group-header">
                                    动态组件
                                    <span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </span>
                                </div>
                                <div slot="content">
                                    
                                </div>
                            </Panel>
                            <Panel name="3">
                                <div class="component-group-header">
                                    可视化组件
                                    <span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </span>
                                </div>
                                <div slot="content">
                                    
                                </div>
                            </Panel>
                        </Collapse>
                    </Panel>
                    <Panel name="3" class="template-group bml-group">
                        <div class="group-header">
                            模板区
                            <span>
                                <Icon type="plus-round"></Icon>
                            </span>
                        </div>
                        <div slot="content" class="template-group-box">
                            <Row>
                                <Col span="8" class="template-group-item">
                                    <img src="../../images/build/template.png" alt="">
                                    <p>模板1</p>
                                </Col>
                                <Col span="8" class="template-group-item">
                                    <img src="../../images/build/template.png" alt="">
                                    <p>模板1</p>
                                </Col>
                                <Col span="8" class="template-group-item">
                                    <img src="../../images/build/template.png" alt="">
                                    <p>模板1</p>
                                </Col>
                                <Col span="8" class="template-group-item">
                                    <img src="../../images/build/template.png" alt="">
                                    <p>模板1</p>
                                </Col>
                                <Col span="8" class="template-group-item">
                                    <img src="../../images/build/template.png" alt="">
                                    <p>模板1</p>
                                </Col>
                                <Col span="8" class="template-group-item">
                                    <img src="../../images/build/template.png" alt="">
                                    <p>模板1</p>
                                </Col>
                            </Row>
                        </div>
                    </Panel>
                </Collapse>
            </div>
            <div class="build-main-center">

            </div>
            <div class="build-main-right">
                <div class="bmr-header">
                    <img src="../../images/build/close_right.png" alt="">
                    <p></p>
                </div>
                <div class="bmr-content">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import index from './index';
export default index;
</script>

