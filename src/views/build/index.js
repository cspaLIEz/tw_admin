import allComponents from '../../config/components_config';
import { SaveProgram } from '../../api/api';

export default {
    data(){
        return {
            leftCollapse:[1,2,3],
            componentCollapse:[1],
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
            activeNode:null
        }
    },
    watch:{
        allComponents(){
            this.onComponentsReload();
        },
        htmlNodes(){

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
                console.log(node);
                self.addNodeToView(event, node);
            }
        });
    },
    methods:{
        onTreeSelectChange(item){
            console.log(item);
        },
        onComponentsReload(){
            setTimeout(() => {
                $(".component-group-item").draggable({
                    appendTo: ".build-page",
                    helper: "clone",
                    addClasses: false,
                    drag: function(event, ui){
                        if(ui && ui.position.left>0 && ui.position.top>0){
                            if(ui && ui.position){
                                // ui.position.left = ui.position.left/$(".build-page").css("scale");
                                // ui.position.top=ui.position.top/$(".build-page").css("scale")
                            }
                        }
                        
                    }
                });
            }, 100);
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty'
                        }),
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        append (data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        findComponent(code){
            if(!code) return;
            var node;
            this.allComponents.forEach(function(item){
                if(code==item.code){
                    node = item;
                }
            }.bind(this));
            return node;
        },
        refreshNodeToView(){
            //htmlNodes
            this.htmlNodes.forEach(element => {
                //静态组件
                if(element.nodeName){
                    var node_html = $(element.cloneTag);
                    $(".build-page").append(node_html);
                }
            });
        },
        addNodeToView(event, node){
            if(!node) return;
            //this.htmlNodes.push(node);
            if(node.nodeName){
                let node_html = $(node.cloneTag);
                //$(".build-page").append(node_html);
                // node_html.css({
                //     "position":"absolute"
                // });
                var l = event.clientX-$(".build-page").eq(0).offset().left-node_html.width()/2;
                l = l>0?l:0;
                var w = event.clientY-$(".build-page").eq(0).offset().top-node_html.height()/2;
                w = w>0?w:0;
                
                // node_html.css({
                //     "left":l/$(".build-page").css("scale"),
                //     "top":w/$(".build-page").css("scale")
                // });
                var style = {
                    "position":"absolute",
                    "left":l/$(".build-page").css("scale") +"px",
                    "top":w/$(".build-page").css("scale") +"px"
                }
                style = $.extend({},node.styles,style);
                var attrs = $.extend({},node.attrs);
                var contextmenu = $.extend({},node.contextmenu);
                this.htmlNodes.push({
                    nodeHtml:node.cloneTag,
                    className:node.className,
                    styles:style,
                    attrs:attrs,
                    contextmenu:contextmenu,
                    isActive:false
                });
                this.checkNode(this.htmlNodes[this.htmlNodes.length-1]);
                this.setBuildPageNode();
                // node_html.children().eq(0).click();
                // node_html.draggable({
                //     grid: [ 10, 10 ],
                //     drag: function(event, ui){
                //         window.ui = ui;
                //         if(ui && ui.position){
                //             ui.position.left = ui.position.left/$(".build-page").css("scale");
                //             ui.position.top=ui.position.top/$(".build-page").css("scale")
                //         }
                //     }
                // });
                // node_html.resizable({
                //     handles: "all",
                //     aspectRatio: false
                // });
            }
        },
        checkNode(item){
            this.clearNodeActive();
            item.isActive = true;
            this.activeNode = item;
        },
        clearNodeActive(){
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
                    aspectRatio: false
                });
            },10)
        },
        preview(){
            localStorage.setItem("previewHtml","<div class='build-page'>"+$(".build-page")[0].innerHTML+"</div>");
            // window.open("preview.html");
            // console.log()
            window.open("#/buildpreview")
        },
        saveProgram(){
            let data = {
                progCode:"<div class='build-page'>"+$(".build-page")[0].innerHTML+"</div>",
                progName: this.programTreeData[0].title,
                resolutionCode: 1,
                progTime: "100",
                progSourceCode: 1,
                progDesc: "",
                progTypeCode: "1",
                userCode: '123',
                progId: this.programTreeData[0].id,
            };
            SaveProgram(data).then(function(res){
                console.log(res);
            })
        },
        cancel(){

        }
    }
}