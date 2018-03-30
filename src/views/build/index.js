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
    methods:{
        onTreeSelectChange(item){
            console.log(item);
        }
    }
}