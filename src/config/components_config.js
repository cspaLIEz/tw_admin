const attrconfig = {};
attrconfig.fontFamily = "微软雅黑";//字体
attrconfig.fontSize = "16px";//字体大小
attrconfig.color = "#333";//字体颜色
attrconfig.borderColor = "transparent";//边框颜色
attrconfig.bgColor = "inherit";//
attrconfig.verticalAlign = null;
attrconfig.fontWeight = "normal";
attrconfig.fontStyle = "normal";
attrconfig.align = "inherit";

const config = [];

config[0] = {
    code: '0001',
    name: '文本框',
    ctype: 'input',
    img: '../../images/build/input.png',
    attrs: {
        value:"",
        fontFamily:attrconfig.fontFamily,
        fontSize:attrconfig.fontSize,
        color:attrconfig.color,
        borderColor:attrconfig.borderColor,
        bgColor:attrconfig.bgColor,
        verticalAlign: attrconfig.verticalAlign,
        fontWeight:attrconfig.fontWeight,
        fontStyle:attrconfig.fontStyle,
        align: attrconfig.align
    },
    contextmenu: {
        copy:true,
        cut:true,
        stick:true,
        lock:true,
        unlock:true,
        delete:true,
        moveUp:true,
        moveDown:true
    }
};

config[1] = {
    code: '0002',
    name: '文字',
    ctype: 'text',
    img: '../../images/build/text.png',
    attrs: {
        value:"",
        fontFamily:attrconfig.fontFamily,
        fontSize:attrconfig.fontSize,
        color:attrconfig.color,
        borderColor:attrconfig.borderColor,
        bgColor:attrconfig.bgColor,
        verticalAlign: attrconfig.verticalAlign,
        fontWeight:attrconfig.fontWeight,
        fontStyle:attrconfig.fontStyle,
        align: attrconfig.align
    },
    contextmenu: {
        copy:true,
        cut:true,
        stick:true,
        lock:true,
        unlock:true,
        delete:true,
        moveUp:true,
        moveDown:true
    }
};

export default config;