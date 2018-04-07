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
                <a href="javascript:;" @click="saveProgram">保存</a>
                <a href="javascript:;" @click="preview">预览</a>
                <a href="javascript:;" @click="cancel">取消</a>
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
                            <Tree :data="programTreeData" @on-select-change="onTreeSelectChange"></Tree>
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
                                <div slot="content" class="component-group-box">
                                    <Row>
                                        <Col span="8" class="component-group-item" v-for="item in allComponents">
                                            <div class="component-img-box">
                                                <img :src=item.img alt="" :componentCode=item.code />
                                            </div>
                                            <p>{{item.name}}</p>
                                        </Col>
                                    </Row>
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
                <div class="tool-bar-container">
                    
                </div>
                <div class="build-page-container">
                    <div class="build-page" :style="{'background-color':programTreeData[0].bgColor}" @click="clearNodeActive">
                        <div class="build-page-node ui-widget-content" v-for="item in htmlNodes" :style="item.styles" :class="{'active':item.isActive,'normal-component':item.className=='normal-component'}" @click.stop="checkNode(item)" v-html="item.nodeHtml">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="build-main-right">
                <div class="bmr-header">
                    <img src="../../images/build/close_right.png" alt="">
                    <p></p>
                </div>
                <div class="bmr-content">
                    <div class="program-attr-setbox" v-if="!activeNode">
                        <div class="setbox-item">
                            <span>节目名称</span> <input type="text" v-model="programTreeData[0].title">
                        </div>
                        <div class="setbox-item">
                            <span>节目时长</span> <input type="text" v-model="programTreeData[0].duration">
                        </div>
                        <div class="setbox-item">
                            <span>节目分辨率</span> <input type="text" v-model="programTreeData[0].fbl">
                        </div>
                        <div class="setbox-item">
                            <span>节目类型</span> <input type="text" v-model="programTreeData[0].type">
                        </div>
                        <div class="setbox-item">
                            <span>背景音乐</span> <input type="text" v-model="programTreeData[0].bgAudio">
                        </div>
                        <div class="setbox-item">
                            <span>背景颜色</span> <input type="text" v-model="programTreeData[0].bgColor">
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <div class="component-attr-setbox" v-if="activeNode">
                        <div class="setbox-item" v-show="activeNode.attrs.innerHtml">
                            <span>文本内容</span> <input type="text" v-model="activeNode.attrs.innerHtml" @keyup="componentConentChange">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['font-family']">
                            <span>字体</span> <input type="text" v-model="activeNode.styles['font-family']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['left']">
                            <span>组件位置-x</span> <input type="text" v-model="activeNode.styles['left']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['top']">
                            <span>组件位置-y</span> <input type="text" v-model="activeNode.styles['top']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['width']">
                            <span>组件宽度</span> <input type="text" v-model="activeNode.styles['width']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['height']">
                            <span>组件高度</span> <input type="text" v-model="activeNode.styles['height']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['font-size']">
                            <span>字号</span> <input type="text" v-model="activeNode.styles['font-size']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['font-style']">
                            <span>样式</span> <input type="text" v-model="activeNode.styles['font-style']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['color']">
                            <span>字体颜色</span> <input type="text" v-model="activeNode.styles['color']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['background-color']">
                            <span>组件背景色</span> <input type="text" v-model="activeNode.styles['background-color']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['justify-content']">
                            <span>水平对齐方式</span> <input type="text" v-model="activeNode.styles['justify-content']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['align-items']">
                            <span>垂直对齐方式</span> <input type="text" v-model="activeNode.styles['align-items']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.styles['border-color']">
                            <span>边框颜色</span> <input type="text" v-model="activeNode.styles['border-color']">
                        </div>
                        <div class="setbox-item" v-show="activeNode.attrs['URL']">
                            <span>URL</span> <input type="text" v-model="activeNode.attrs['URL']">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import index from './index';
export default index;
</script>

