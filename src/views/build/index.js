import allComponents from '../../config/components_config';
import { SaveProgram } from '../../api/api';
import { num_random } from '../../libs/helper';

//组件
import MzText from './components/mzText'
import MzImage from './components/mzImage'
import MzMarquee from './components/MzMarquee'
import MzNowdate from './components/MzNowdate'
import MzTimer from './components/MzTimer'
import MzVideo from './components/MzVideo'

export default {
    components:{MzText,MzImage,MzMarquee,MzNowdate,MzTimer,MzVideo},
    data(){
        return {
            leftCollapse:[1,2,3],
            componentCollapse:[1],
            imageList:[{
                value:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523814444032&di=a3052f88ca9a398c0947f7af05d483de&imgtype=0&src=http%3A%2F%2Fimg1.2345.com%2Fduoteimg%2FzixunImg%2Flocal%2F2017%2F02%2F24%2F14878982262042.jpg",
                label:"图片一"
            },{
                value:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523814478386&di=b36b510a20f9d296331d1e2cd17aa425&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0120e658d9bd6ca801219c773855a6.jpg%403000w_1l_2o_100sh.jpg",
                label:"图片二"
            }],
            programTreeData:[
                {
                    title: '节目名',
                    expand: true,
                    type: '普通节目',
                    duration: '',
                    fbl:'1920*1080',
                    bgAudio:'',
                    bgColor:'#fff',
                    nodeType: 'programTitle',
                    children: [
                        {
                            title: '页面1',
                            expand: true,
                            nodeType: 'page',
                            children: [
                                
                            ]
                        }
                    ]
                }
            ],
            allComponents:allComponents,
            htmlNodes:[],
            attrList:[],
            activeNode:null,
            activeNodes:[],
            ctrl_press:false
        }
    },
    watch:{
        allComponents(){
            this.onComponentsReload();
        },
        activeNode:{
            handler(){
                if(this.activeNode && this.activeNode.styles && this.activeNode.styles.left){
                    this.activeNode.styles.left = parseInt(this.activeNode.styles.left) + "px";
                    this.activeNode.styles.top = parseInt(this.activeNode.styles.top) + "px";
                }
            },
            deep:true
        }
    },
    mounted(){
        var self = this;
        this.onComponentsReload();
        $(".build-page").droppable({
            accept: ".component-group-item",
            drop: function( event, ui ) {
                var code = ui.draggable.find("img").attr("componentCode");
                var node = self.findComponent(code);
                self.addNodeToView(event, node);
            }
        });
        $(document).on("keyup",function(event){
            this.ctrl_press = false;
        }.bind(this))
    },
    methods:{
        onTreeSelectChange(item){ //树节点改变选中时
            console.log(item);
        },
        DatePickerOpenChange(res){
            if(res){
                setTimeout(function(){
                    $(".setbox-item .ivu-select-dropdown").css({
                        "left":"auto",
                        "right":0
                    })
                },100)
            } else {
                this.activeNode.attrs.endTime = this.activeNode.attrs.getTime;
            }
        },
        onComponentsReload(){ //组件重新加载
            setTimeout(() => {
                $(".component-group-item").draggable({
                    appendTo: ".build-page",
                    helper: "clone",
                    addClasses: false,
                    drag: function(event, ui){
                        if(ui && ui.position.left>0 && ui.position.top>0){
                            if(ui && ui.position){
                                ui.position.left = ui.position.left/$(".build-page").css("scale");
                                ui.position.top=ui.position.top/$(".build-page").css("scale")
                            }
                        }
                        
                    }
                });
            }, 100);
        },
        findComponent(code){ //查找某个组件
            if(!code) return;
            var node;
            this.allComponents.forEach(function(item){
                if(code==item.code){
                    node = item;
                }
            }.bind(this));
            return node;
        },
        addNodeToView(event, node){ //新增节点到界面
            if(!node) return;
            if(node.code){
                var l = event.clientX-$(".build-page").eq(0).offset().left;
                l = l>0?l:0;
                var w = event.clientY-$(".build-page").eq(0).offset().top;
                w = w>0?w:0;
                
                var style = {
                    "position":"absolute",
                    "left":parseInt(l/$(".build-page").css("scale")) +"px",
                    "top":parseInt(w/$(".build-page").css("scale")) +"px"
                }
                style = $.extend({},node.styles,style);
                var attrs = $.extend({},node.attrs);
                var contextmenu = $.extend({},node.contextmenu);
                let code = num_random(100000,999999);
                this.htmlNodes.push({
                    code:code,
                    ctype:node.ctype,
                    styles:style,
                    attrs:attrs,
                    contextmenu:contextmenu,
                    isActive:false
                });
                
                this.checkNode(this.htmlNodes[this.htmlNodes.length-1]);
                this.setBuildPageNode();
            }
        },
        checkNode(item,index){ //选中节点
            if(this.ctrl_press){
                item.isActive = true;
                this.activeNodes.push(item);
            } else {
                this.clearNodeActive();
                item.isActive = true;
                this.activeNode = item;
                this.activeNodes.length = 0;
                this.activeNodes.push(this.activeNode);
            }
            this.$refs.buildPageContainer.focus();
        },
        clearNodeActive(){ //清除节点
            this.htmlNodes.forEach(function(ele){
                ele.isActive = false;
            })
        },
        setBuildPageNode(){
            var self = this;
            setTimeout(function(){
                $(".build-page-node").draggable({
                    grid: [ 10, 10 ],
                    drag: function(event, ui){
                        window.ui = ui;
                        if(ui && ui.position){
                            ui.position.left = ui.position.left/$(".build-page").css("scale");
                            ui.position.top=ui.position.top/$(".build-page").css("scale")
                        }
                        if(self.activeNode && self.activeNode.styles){
                            self.activeNode.styles.left = ui.position.left+"px";
                            self.activeNode.styles.top = ui.position.top+"px";
                        }
                        
                    }
                });
                $(".build-page-node").resizable({
                    handles: "all",
                    aspectRatio: false,
                    stop: function(event, ui){
                        if(self.activeNode && self.activeNode.styles){
                            if(self.activeNode.styles.width){
                                self.activeNode.styles.width = ui.size.width+"px";
                            }
                            if(self.activeNode.styles.height){
                                self.activeNode.styles.height = ui.size.height+"px";
                            }
                        }
                    }
                });
            },10)
        },
        componentConentChange(){
            $(".build-page-node.active>p").html(this.activeNode.attrs.innerHtml);
        },
        // tool func
        containerFocus(event){
            $(event.target).off("keydown");
            $(event.target).on("keydown",function(evo){
                if(evo.ctrlKey){
                    this.ctrl_press = true;
                }
            }.bind(this))
        },
        alignAction(direction){
            if(this.activeNodes.length>1){
                switch (direction) {
                    case "top" :
                        this.activeNodes.forEach(function(item,index){
                            if(index>0){
                                item.styles.top = this.activeNodes[0].styles.top;
                            }
                        }.bind(this));
                        break;
                    case "bottom" :
                        this.activeNodes.forEach(function(item,index){
                            if(index>0){
                                let top = parseInt(this.activeNodes[0].styles.top)+$(this.$refs['compontent'+this.activeNodes[0].code]).height()-$(this.$refs['compontent'+item.code]).height();
                                item.styles.top = top+"px";
                            }
                        }.bind(this));
                        break;
                    case "left" :
                        this.activeNodes.forEach(function(item,index){
                            if(index>0){
                                item.styles.left = this.activeNodes[0].styles.left;
                            }
                        }.bind(this));
                        break;
                    case "right" :
                        this.activeNodes.forEach(function(item,index){
                            if(index>0){
                                let left = parseInt(this.activeNodes[0].styles.left)+$(this.$refs['compontent'+this.activeNodes[0].code]).width()-$(this.$refs['compontent'+item.code]).width();
                                item.styles.left = left + "px";
                            }
                        }.bind(this));
                        break;
                }
            }
            
        },
        changeIndex(action){
            // var len = this.htmlNodes.length;
            // var lastIndex;
            // for(var i=0;i<len;i++){
            //     console.log(this.htmlNodes[i].index);
            //     if(action == "top"){
            //         if(this.activeNodes[0].code==this.htmlNodes[i].code){
            //             // this.htmlNodes[i].index
            //             // lastIndex = i;
            //             // this.htmlNodes[len] = JSON.parse(JSON.stringify(this.htmlNodes[i]));
            //             // this.$set(this.htmlNodes,len,JSON.parse(JSON.stringify(this.htmlNodes[i])))

            //             // this.htmlNodes.splice(i,1);
            //         } else {
                        
            //         }
            //     }
            // }
            // this.$delete(this.htmlNodes,lastIndex,this.htmlNodes[lastIndex]);
            // this.htmlNodes.splice(lastIndex,1);

            let change_index;
            this.htmlNodes = this.htmlNodes.filter(function(item, index){
                if(item.code==this.activeNodes[0].code){
                    change_index = index;
                    return false;
                } else {
                    return true;
                }
                return true;
            }.bind(this));
            if(action == "top"){
                this.htmlNodes.push(this.activeNodes[0]);
            } else if(action == "bottom"){
                this.htmlNodes.unshift(this.activeNodes[0]);
            } else if(action == "up"){
                let start_index = (change_index+1)>(this.htmlNodes.length-1)?(this.htmlNodes.length):(change_index+1);
                this.htmlNodes.splice(start_index,0,this.activeNodes[0]);
            } else if(action == "down"){
                let start_index = change_index-1<0?0:(change_index-1);
                this.htmlNodes.splice(start_index,0,this.activeNodes[0]);
            }
            // this.setBuildPageNode();
        },
        equilAction(attr){
            this.activeNodes.forEach(function(item,index){
                if(index>0){
                    if(attr == "width"){
                        item.styles.width = $(this.$refs['compontent'+this.activeNodes[0].code]).width()+"px";
                    } else if(attr == "height"){
                        item.styles.height = $(this.$refs['compontent'+this.activeNodes[0].code]).height()+"px";
                    }
                }
            }.bind(this));
        },
        scaleAction(action){
            if(action=="biger"){
                $(".build-page").css({ scale: '+=0.1' });
                if($(".build-page").width()*$(".build-page").css("scale")>$(".build-page").parent().width()){
                    $(".build-page").css("left",($(".build-page").width()*$(".build-page").css("scale")-$(".build-page").parent().width())/2+10)
                    $(".build-page-container").scrollLeft(($(".build-page").width()*$(".build-page").css("scale")-$(".build-page").parent().width())/2+10);
                    
                } else {
                    $(".build-page").css("left",0)
                }
                if($(".build-page").height()*$(".build-page").css("scale")>$(".build-page").parent().height()){
                    $(".build-page").css("top",($(".build-page").height()*$(".build-page").css("scale")-$(".build-page").parent().height())/2+10)
                    $(".build-page-container").scrollTop(($(".build-page").height()*$(".build-page").css("scale")-$(".build-page").parent().height())/2+10);
                    
                } else {
                    $(".build-page").css("top",0)
                }
            } else if(action=="smaller") {
                $(".build-page").css({ scale: '-=0.1' });
                if($(".build-page").width()*$(".build-page").css("scale")>$(".build-page").parent().width()){
                    $(".build-page").css("left",($(".build-page").width()*$(".build-page").css("scale")-$(".build-page").parent().width())/2+10)
                    $(".build-page-container").scrollLeft(($(".build-page").width()*$(".build-page").css("scale")-$(".build-page").parent().width())/2+10);
                } else {
                    $(".build-page").css("left",0)
                }
                if($(".build-page").height()*$(".build-page").css("scale")>$(".build-page").parent().height()){
                    $(".build-page").css("top",($(".build-page").height()*$(".build-page").css("scale")-$(".build-page").parent().height())/2+10)
                    $(".build-page-container").scrollTop(($(".build-page").height()*$(".build-page").css("scale")-$(".build-page").parent().height())/2+10);
                    
                } else {
                    $(".build-page").css("top",0)
                }
            }
            
        },
        fullPageAction(){
            if(this.activeNodes.length>0){
                this.activeNodes[0].styles.width = "100%";
                this.activeNodes[0].styles.height = "100%";
                this.activeNodes[0].styles.left = 0;
                this.activeNodes[0].styles.top = 0;
            }
        },
        preview(){
            localStorage.setItem("previewHtml","<div class='build-page'>"+$(".build-page")[0].innerHTML+"</div>");
            window.open("#/buildpreview")
        },
        saveProgram(){
            var self = this;
            var progCode = `
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <title>麦子科技</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
                </head>
                <body>
                    ${"<div class='build-page'>"+$(".build-page")[0].innerHTML+"</div>"}
                </body>
                </html>
            `;
            let data = {
                progCode:progCode,
                progName: this.programTreeData[0].title,
                resolutionCode: "1",
                progTime: "100",
                progSourceCode: "1",
                progDesc: "",
                progTypeCode: "1",
                userCode: "123",
                progId:this.programTreeData[0].progId,
            };
            SaveProgram(data).then(function(res){
                console.log(res);
                if(res.data && res.data.progId){
                    self.programTreeData[0].progId = res.data.progId;
                }
            })
        },
        cancel(){
            this.$router.go(-1);
        }
    }
}