import allComponents from '../../config/components_config';

export default {
    data(){
        return {
            leftCollapse:[1,2,3],
            componentCollapse:[1],
            programTreeData:[
                {
                    title: '节目名',
                    expand: true,
                    type: 'program',
                    children: [
                        {
                            title: '页面1',
                            expand: true,
                            type: 'page',
                            children: [
                                {
                                    title: 'text1',
                                    type: 'component'
                                },
                                {
                                    title: 'text2',
                                    type: 'component'
                                }
                            ]
                        },
                        {
                            title: '页面2',
                            expand: true,
                            type: 'page',
                            children: [
                                {
                                    title: 'text1',
                                    type: 'component'
                                },
                                {
                                    title: 'text2',
                                    type: 'component'
                                }
                            ]
                        }
                    ]
                }
            ],
            allComponents:allComponents
        }
    },
    watch:{
        allComponents(){
            this.onComponentsReload();
        }
    },
    mounted(){
        this.onComponentsReload();
        $(".build-page").droppable({
            accept: ".component-group-item",
            drop: function( event, ui ) {
                var code = ui.draggable.find("img").attr("componentCode");

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
        }
    }
}