//图片资源
import input_png from '../images/build/input.png';
import text_png from '../images/build/text.png';
import img_png from '../images/build/img.png';
//text

const attrconfig = {};
attrconfig.fontFamily = "微软雅黑";//字体
attrconfig.fontSize = "16px";//字体大小
attrconfig.color = "#333";//字体颜色
attrconfig.borderColor = "transparent";//边框颜色
attrconfig.bgColor = "inherit";//
attrconfig.verticalAlign = "normal";
attrconfig.fontWeight = "normal";
attrconfig.fontStyle = "normal";
attrconfig.align = "normal";

const config = [];

config[0] = {
    code: '0001',
    name: '文本框',
    ctype: 'text',
    img: input_png,
    nodeName:"text",
    cloneTag:'文本内容',
    className: 'normal-component',
    styles: {
        "font-family":attrconfig.fontFamily,
        "font-size":attrconfig.fontSize,
        "color":attrconfig.color,
        "border-color":attrconfig.borderColor,
        "background-color":attrconfig.bgColor,
        "align-items": attrconfig.verticalAlign,
        "font-weight":attrconfig.fontWeight,
        "font-style":attrconfig.fontStyle,
        "justify-content": attrconfig.align,
        "width":"auto",
        "height":"auto"
    },
    attrs: {
        innerHtml:"文本内容"
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

// config[1] = {
//     code: '0002',
//     name: '文字',
//     ctype: 'text',
//     img: text_png,
//     nodeName:"label",
//     attrs: {
//         value:"",
//         fontFamily:attrconfig.fontFamily,
//         fontSize:attrconfig.fontSize,
//         color:attrconfig.color,
//         borderColor:attrconfig.borderColor,
//         bgColor:attrconfig.bgColor,
//         verticalAlign: attrconfig.verticalAlign,
//         fontWeight:attrconfig.fontWeight,
//         fontStyle:attrconfig.fontStyle,
//         align: attrconfig.align
//     },
//     contextmenu: {
//         copy:true,
//         cut:true,
//         stick:true,
//         lock:true,
//         unlock:true,
//         delete:true,
//         moveUp:true,
//         moveDown:true
//     }
// };

config[1] = {
    code: '0003',
    name: '图片',
    ctype: 'image',
    img: img_png,
    nodeName:"img",
    cloneTag:'<img src="" alt="图片" />',
    attrs: {
        href:""
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