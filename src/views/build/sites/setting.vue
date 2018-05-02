<template>
    <div>
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
        <!-- 视频组件属性 -->
        <div v-if="activeNode.ctype == 'video'">
            <div class="setbox-item">
                <span>组件位置-x</span> <input type="text" v-model="activeNode.styles['left']">
            </div>
            <div class="setbox-item">
                <span>组件位置-y</span> <input type="text" v-model="activeNode.styles['top']">
            </div>
            <div class="setbox-item">
                <span>视频地址</span>
                <Select v-model="activeNode.attrs.videosrc" style="width:160px">
                    <Option value="http://jq22com.qiniudn.com/jq22-sp.mp4">视频一</Option>
                    <Option value="http://183.6.222.82/6973FDD846944737D0B444A30/0300080100588B2FCADDE9000000018D2FFC24-6C71-F693-55B7-3CE83844770F.mp4?ccode=050F&duration=536&expire=18000&psid=f49b8fa19c5fb470d6ef67c7662270ee&sp=&ups_client_netip=1b10dd74&ups_ts=1524241207&ups_userid=&utid=UgZpEiiSXxMCAWVRz0Tll%2F1Y&vid=XMjA2NjM4NDk0NA%3D%3D&vkey=Be2e8bd5518d0a06455141fe86e734a36">视频二</Option>
                </Select>
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
            <div class="setbox-item">
                <span>水平对齐方式</span> <input type="text" v-model="activeNode.styles['justify-content']">
            </div>
            <div class="setbox-item">
                <span>垂直对齐方式</span> <input type="text" v-model="activeNode.styles['align-items']">
            </div>
        </div>
        
        <!-- 视频组件属性 -->
        <div v-if="activeNode.ctype == 'iframe'">
            
            <div class="setbox-item">
                <span>网页链接</span>
                <input type="text" v-model="activeNode.attrs.writeurl" @blur="activeNode.attrs.url=activeNode.attrs.writeurl">
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
                <span>水平对齐方式</span> <input type="text" v-model="activeNode.styles['justify-content']">
            </div>
            <div class="setbox-item">
                <span>垂直对齐方式</span> <input type="text" v-model="activeNode.styles['align-items']">
            </div>
        </div>
        <!-- 二维码组件属性 -->
        <div v-if="activeNode.ctype == 'qrcode'">
            <div class="setbox-item">
                <span>内容</span>
                <input type="text" v-model="activeNode.attrs.qrWc" @blur="activeNode.attrs.qrContent=activeNode.attrs.qrWc">
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
                <span>logo</span>
                <Select v-model="activeNode.attrs['logo']" style="width:160px">
                    <Option v-for="item in imageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>
        <!-- 按钮框组件属性 -->
        <div v-if="activeNode.ctype == 'button'">
            <div class="setbox-item">
                <span>按钮文本</span>
                <input type="text" v-model="activeNode.attrs.content">
            </div>
            <div class="setbox-item">
                <span>URL</span><input type="text" v-model="activeNode.attrs['url']">
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

        <!-- 直播组件属性 -->
        <div v-if="activeNode.ctype == 'live'">
            
            <div class="setbox-item">
                <span>组件位置-x</span> <input type="text" v-model="activeNode.styles['left']">
            </div>
            <div class="setbox-item">
                <span>组件位置-y</span> <input type="text" v-model="activeNode.styles['top']">
            </div>
            <div class="setbox-item">
                <span>视频地址</span>
                <Select v-model="activeNode.attrs.url" style="width:160px">
                    <Option value="https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8">直播链接一</Option>
                </Select>
            </div>
            <div class="setbox-item">
                <span>组件宽度</span> <input type="text" v-model="activeNode.styles['width']">
            </div>
            <div class="setbox-item">
                <span>组件高度</span> <input type="text" v-model="activeNode.styles['height']">
            </div>
        </div>

        <!-- 文件组件属性 -->
        <div v-if="activeNode.ctype == 'file'">
            <div class="setbox-item">
                <span>文档选择</span>
                <Select v-model="activeNode.attrs.fileUrl" style="width:160px">
                    <Option value="http://localhost:8080/static/libs/pdfjs/web/compressed.tracemonkey-pldi-09.pdf">文档一</Option>
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
        </div>
    </div>
</template>
<script>
export default {
    props:['curActiveNode'],
    data(){
        return {
            activeNode:{
                code: '',
                title: '',
                ctype: '',
                img: '',
                styles: {
                },
                attrs: {
                },
                contextmenu: {
                }
            }
        }
    },
    watch:{
        curActiveNode:{
            handler(params) {
                this.activeNode = params;
            },
            deep: true
        }
    }
}
</script>
