export default {
    data(){
        return {
            leftCollapse:[1,2,3],
            componentCollapse:[1],
            programTreeData:[
                {
                    title: '节目名',
                    expand: true,
                    children: [
                        {
                            title: '页面1',
                            expand: true,
                            children: [
                                {
                                    title: 'text1'
                                },
                                {
                                    title: 'text2'
                                }
                            ]
                        },
                        {
                            title: '页面2',
                            expand: true,
                            children: [
                                {
                                    title: 'text1'
                                },
                                {
                                    title: 'text2'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}