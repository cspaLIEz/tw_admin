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
                    <a href="javascript:;" @click="alignAction('top')">
                        <img src="../../images/build/align_top.png" alt="">
                        <p>上对其</p>
                    </a>
                    <a href="javascript:;" @click="alignAction('bottom')">
                        <img src="../../images/build/align_down.png" alt="">
                        <p>下对其</p>
                    </a>
                    <a href="javascript:;" @click="alignAction('left')">
                        <img src="../../images/build/align_left.png" alt="">
                        <p>左对其</p>
                    </a>
                    <a href="javascript:;" @click="alignAction('right')">
                        <img src="../../images/build/align_right.png" alt="">
                        <p>右对其</p>
                    </a>
                    <a href="javascript:;" @click="changeIndex('top')">
                        <img src="../../images/build/zindex_top.png" alt="">
                        <p>置顶</p>
                    </a>
                    <a href="javascript:;" @click="changeIndex('bottom')">
                        <img src="../../images/build/zindex_bottom.png" alt="">
                        <p>置底</p>
                    </a>
                    <a href="javascript:;" @click="changeIndex('up')">
                        <img src="../../images/build/zindex_up.png" alt="">
                        <p>上移一层</p>
                    </a>
                    <a href="javascript:;" @click="changeIndex('down')">
                        <img src="../../images/build/zindex_down.png" alt="">
                        <p>下移一层</p>
                    </a>
                    <a href="javascript:;" @click="equilAction('width')">
                        <img src="../../images/build/equal_width.png" alt="">
                        <p>等宽</p>
                    </a>
                    <a href="javascript:;" @click="equilAction('height')">
                        <img src="../../images/build/equal_height.png" alt="">
                        <p>等高</p>
                    </a>
                    <a href="javascript:;" @click="scaleAction('biger')">
                        <img src="../../images/build/scale_up.png" alt="">
                        <p>放大</p>
                    </a>
                    <a href="javascript:;" @click="scaleAction('smaller')">
                        <img src="../../images/build/scale_down.png" alt="">
                        <p>缩小</p>
                    </a>
                    <a href="javascript:;">
                        <img src="../../images/build/lock_close.png" alt="">
                        <p>锁定</p>
                    </a>
                    <a href="javascript:;">
                        <img src="../../images/build/lock_open.png" alt="">
                        <p>解锁</p>
                    </a>
                    <a href="javascript:;" @click="fullPageAction()">
                        <img src="../../images/build/fullscreen.png" alt="">
                        <p>全屏</p>
                    </a>
                    <a href="javascript:;">
                        <img src="../../images/build/trash.png" alt="">
                        <p>清空</p>
                    </a>
                </div>
                <div class="build-page-container" tabindex="0" @focus="containerFocus($event)" ref="buildPageContainer">
                    <div class="build-page" :style="{'background-color':programTreeData[0].bgColor}" @click="clearNodeActive">
                        <div class="build-page-node ui-widget-content" v-for="(item,index) in htmlNodes" :style="item.styles" :class="{'active':item.isActive}" :ref="'compontent'+item.code" @click.stop="checkNode(item,index)">
                            <mz-text v-if="item.ctype == 'text'" :text="item.attrs.innerHtml"></mz-text>
                            <mz-image v-if="item.ctype == 'image'" :style-set="item.styles" :image="item.attrs.srcs"></mz-image>
                            <mz-marquee v-if="item.ctype == 'marquee'" :content="item.attrs.content" :direction="item.attrs.direction"></mz-marquee>
                            <mz-nowdate v-if="item.ctype == 'dateformat'" :pattern="item.attrs.pattern"></mz-nowdate>
                            <mz-timer v-if="item.ctype == 'timer'" :end-time="item.attrs.endTime" :way="item.attrs.way"></mz-timer>
                            <mz-timer v-if="item.ctype == 'video'"></mz-timer>
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
                    <div class="component-attr-setbox" v-if="activeNode && activeNodes.length<=1">
                        <!-- 文本框组件属性 -->
                        <div v-if="activeNode.ctype == 'text'">
                            <div class="setbox-item">
                                <span>文本内容</span>
                                <input type="text" v-model="activeNode.attrs.innerHtml">
                            </div> 
                            <div class="setbox-item">
                                <span>字体</span> <input type="text" v-model="activeNode.styles['font-family']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-x</span> <input type="text" v-model="activeNode.styles['left']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-y</span> <input type="text" v-model="activeNode.styles['top']">
                            </div>
                            <div class="setbox-item">
                                <span>组件宽度</span> <input type="text" v-model="activeNode.styles['width']">
                            </div>
                            <div class="setbox-item">
                                <span>组件高度</span> <input type="text" v-model="activeNode.styles['height']">
                            </div>
                            <div class="setbox-item">
                                <span>字号</span> <input type="text" v-model="activeNode.styles['font-size']">
                            </div>
                            <div class="setbox-item">
                                <span>字体样式</span> <input type="text" v-model="activeNode.styles['font-style']">
                            </div>
                            <div class="setbox-item">
                                <span>字体颜色</span><ColorPicker v-model="activeNode.styles['color']" />
                            </div>
                            <div class="setbox-item">
                                <span>组件背景色</span><ColorPicker v-model="activeNode.styles['background-color']" />
                            </div>
                            <div class="setbox-item">
                                <span>水平对齐方式</span> <input type="text" v-model="activeNode.styles['justify-content']">
                            </div>
                            <div class="setbox-item">
                                <span>垂直对齐方式</span> <input type="text" v-model="activeNode.styles['align-items']">
                            </div>
                            <div class="setbox-item">
                                <span>边框颜色</span> <input type="text" v-model="activeNode.styles['border-color']">
                            </div>
                            <div class="setbox-item">
                                <span>URL</span> <input type="text" v-model="activeNode.attrs['src']">
                            </div>
                        </div>
                        <div v-if="activeNode.ctype == 'image'">
                            <div class="setbox-item">
                                <span>图片选择</span>
                                <Select v-model="activeNode.attrs['srcs']" multiple style="width:160px">
                                    <Option v-for="item in imageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-x</span> <input type="text" v-model="activeNode.styles['left']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-y</span> <input type="text" v-model="activeNode.styles['top']">
                            </div>
                            <div class="setbox-item">
                                <span>组件宽度</span> <input type="text" v-model="activeNode.styles['width']">
                            </div>
                            <div class="setbox-item">
                                <span>组件高度</span> <input type="text" v-model="activeNode.styles['height']">
                            </div>
                            <div class="setbox-item">
                                <span>组件背景色</span><ColorPicker v-model="activeNode.styles['background-color']" />
                            </div>
                        </div>
                        <!-- 滚动文本文本组件属性 -->
                        <div v-if="activeNode.ctype == 'marquee'">
                            <div class="setbox-item">
                                <span>文本内容</span> 
                                <textarea v-model="activeNode.attrs.content"></textarea>
                            </div> 
                            <div class="setbox-item">
                                <span>字体</span> <input type="text" v-model="activeNode.styles['font-family']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-x</span> <input type="text" v-model="activeNode.styles['left']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-y</span> <input type="text" v-model="activeNode.styles['top']">
                            </div>
                            <div class="setbox-item">
                                <span>组件宽度</span> <input type="text" v-model="activeNode.styles['width']">
                            </div>
                            <div class="setbox-item">
                                <span>组件高度</span> <input type="text" v-model="activeNode.styles['height']">
                            </div>
                            <div class="setbox-item">
                                <span>字号</span> <input type="text" v-model="activeNode.styles['font-size']">
                            </div>
                            <div class="setbox-item">
                                <span>字体样式</span> <input type="text" v-model="activeNode.styles['font-style']">
                            </div>
                            <div class="setbox-item">
                                <span>字体颜色</span><ColorPicker v-model="activeNode.styles['color']" />
                            </div>
                            <div class="setbox-item">
                                <span>组件背景色</span><ColorPicker v-model="activeNode.styles['background-color']" />
                            </div>
                            <div class="setbox-item">
                                <span>边框颜色</span> <input type="text" v-model="activeNode.styles['border-color']">
                            </div>
                            <div class="setbox-item">
                                <span>方向</span>
                                <Select v-model="activeNode.attrs['direction']" style="width:160px">
                                    <Option value="left">向左</Option>
                                    <Option value="right">向右</Option>
                                    <Option value="up">向上</Option>
                                    <Option value="down">向下</Option>
                                </Select>
                            </div>
                        </div>
                        <!-- 日期组件属性 -->
                        <div v-if="activeNode.ctype == 'dateformat'">
                           <div class="setbox-item">
                                <span>字体</span> <input type="text" v-model="activeNode.styles['font-family']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-x</span> <input type="text" v-model="activeNode.styles['left']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-y</span> <input type="text" v-model="activeNode.styles['top']">
                            </div>
                            <div class="setbox-item">
                                <span>组件宽度</span> <input type="text" v-model="activeNode.styles['width']">
                            </div>
                            <div class="setbox-item">
                                <span>组件高度</span> <input type="text" v-model="activeNode.styles['height']">
                            </div>
                            <div class="setbox-item">
                                <span>字号</span> <input type="text" v-model="activeNode.styles['font-size']">
                            </div>
                            <div class="setbox-item">
                                <span>字体样式</span> <input type="text" v-model="activeNode.styles['font-style']">
                            </div>
                            <div class="setbox-item">
                                <span>字体颜色</span><ColorPicker v-model="activeNode.styles['color']" />
                            </div>
                            <div class="setbox-item">
                                <span>组件背景色</span><ColorPicker v-model="activeNode.styles['background-color']" />
                            </div>
                            <div class="setbox-item">
                                <span>水平对齐方式</span> <input type="text" v-model="activeNode.styles['justify-content']">
                            </div>
                            <div class="setbox-item">
                                <span>垂直对齐方式</span> <input type="text" v-model="activeNode.styles['align-items']">
                            </div>
                            <div class="setbox-item">
                                <span>边框颜色</span> <input type="text" v-model="activeNode.styles['border-color']">
                            </div>
                            <div class="setbox-item">
                                <span>日期样式</span>
                                <Select v-model="activeNode.attrs['pattern']" style="width:160px">
                                    <Option value="yyyy-MM-dd hh:mm:ss">yyyy-MM-dd hh:mm:ss</Option>
                                    <Option value="yyyy-MM-dd">yyyy-MM-dd</Option>
                                    <Option value="hh:mm:ss">hh:mm:ss</Option>
                                    <Option value="yyyy年MM月dd日 hh:mm:ss">yyyy年MM月dd日 hh:mm:ss</Option>
                                    <Option value="yyyy年MM月dd日">yyyy年MM月dd日</Option>
                                    <Option value="yyyy年MM月dd日 hh:mm:ss e">yyyy年MM月dd日 hh:mm:ss WEEK</Option>
                                    <Option value="yyyy年MM月dd日 e">yyyy年MM月dd日 WEEK</Option>
                                    <Option value="e">WEEK</Option>
                                </Select>
                            </div>
                        </div>
                        <!-- 计时器组件属性 -->
                        <div v-if="activeNode.ctype == 'timer'">
                            <div class="setbox-item">
                                <span>计时方式</span>
                                <Select v-model="activeNode.attrs.way" style="width:160px">
                                    <Option value="1">正计时</Option>
                                    <Option value="2">倒计时</Option>
                                </Select>
                            </div>
                            <div class="setbox-item">
                                <span>结束日期</span>
                                <DatePicker type="datetime" v-model="activeNode.attrs.getTime" style="width: 160px;position:relative;color:#495060" @on-open-change="DatePickerOpenChange"></DatePicker>
                            </div> 
                            <div class="setbox-item">
                                <span>字体</span> <input type="text" v-model="activeNode.styles['font-family']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-x</span> <input type="text" v-model="activeNode.styles['left']">
                            </div>
                            <div class="setbox-item">
                                <span>组件位置-y</span> <input type="text" v-model="activeNode.styles['top']">
                            </div>
                            <div class="setbox-item">
                                <span>组件宽度</span> <input type="text" v-model="activeNode.styles['width']">
                            </div>
                            <div class="setbox-item">
                                <span>组件高度</span> <input type="text" v-model="activeNode.styles['height']">
                            </div>
                            <div class="setbox-item">
                                <span>字号</span> <input type="text" v-model="activeNode.styles['font-size']">
                            </div>
                            <div class="setbox-item">
                                <span>字体样式</span> <input type="text" v-model="activeNode.styles['font-style']">
                            </div>
                            <div class="setbox-item">
                                <span>字体颜色</span><ColorPicker v-model="activeNode.styles['color']" />
                            </div>
                            <div class="setbox-item">
                                <span>组件背景色</span><ColorPicker v-model="activeNode.styles['background-color']" />
                            </div>
                            <div class="setbox-item">
                                <span>水平对齐方式</span> <input type="text" v-model="activeNode.styles['justify-content']">
                            </div>
                            <div class="setbox-item">
                                <span>垂直对齐方式</span> <input type="text" v-model="activeNode.styles['align-items']">
                            </div>
                            <div class="setbox-item">
                                <span>边框颜色</span> <input type="text" v-model="activeNode.styles['border-color']">
                            </div>
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

