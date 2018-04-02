import allComponents from '../../config/components_config';
import jQuery from 'jquery';
import *as func from 'jquery-ui';
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
        console.log(func)
    },
    methods:{
        onTreeSelectChange(item){
            console.log(item);
        },
        onComponentsReload(){
            setTimeout(() => {
                // jQuery(".component-group-item").draggable();
            }, 100);
        }
    }
}