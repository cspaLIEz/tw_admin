<template>
    <section class="home-page-gap">
        <div class="p2-dressup">
            <img src="../../../images/index/p2-des4.png">
        </div>
        <img class="p2-des1 wow mtRotate3 animated" src="../../../images/index/p2-des1.png">
        <img class="p2-des2 wow mtRotate2 animated" src="../../../images/index/p2-des2.png">
        <div class="p2LineBox">
            <ul class="pdList wowList">
                <li class="pt pt1 wow animated">
                    <a href="javascript:;">
                        <span class="u-font"><img src="../../../images/index/group3.png"/></span>
                        <code>Material management</code><code>素材管理</code>
                    </a>
                </li>
                <li class="pt pt2 wow animated">
                    <a href="javascript:;">
                        <span class="u-font"><img src="../../../images/index/group5.png"/></span>
                        <code>Program production</code><code>节目制作</code>
                    </a>
                </li>
                <li class="pt pt3 wow animated">
                    <a href="javascript:;">
                        <span class="u-font"><img src="../../../images/index/group6.png"/></span>
                        <code>Program management</code><code>节目管理</code>
                    </a>
                </li>
                <li class="pt pt5 wow animated">
                    <a href="javascript:;">
                        <span class="u-font"><img src="../../../images/index/group7.png"/></span>
                        <code>Terminal management</code><code>终端管理</code>
                    </a>
                </li>
                <li class="pt pt6 wow animated">
                    <a href="javascript:;">
                        <span class="u-font"><img src="../../../images/index/group8.png"/></span>
                        <code>Quick release</code><code>快速发布</code>
                    </a>
                </li>
                <li class="pt pt7 wow animated">
                    <a href="javascript:;">
                        <span class="u-font"><img src="../../../images/index/group9.png"/></span>
                        <code>Release management</code><code>发布管理</code>
                    </a>
                </li>
            </ul>
            <img class="p2-line3 wow mtRotate1 animated" src="../../../images/index/p2-line3.png">
            <img class="p2-line2 wow mtRotate1 animated" src="../../../images/index/p2-line2.png">
            <img class="p2-line1 wow mtRotate1 animated" src="../../../images/index/p2-line1.png">
        </div>
    </section>
</template>
<style lang="less" scoped>
.home-page-gap{
    position: relative;
    left: 0;
    top: 0;
    z-index: 10;
    padding-top: 11.36%;
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: -16px;
    .wow {
        visibility: hidden;
    }
    img{
        display: block;
        border: 0 none;
        transition: 0.5s;
    }
    .p2-dressup {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        padding-left: 6.2%;
    }
    .p2-des3 {
        position: absolute;
        left: 6.36%;
        top: 17.7%;
        z-index: 1;
        width: 9.886%;
    }
    .p2-des1 {
        position: absolute;
        left: 22.5%;
        bottom: 0;
        z-index: 1;
        width: 55%;
    }
    .p2-des2 {
        position: absolute;
        left: 14.375%;
        bottom: 0;
        z-index: 1;
        width: 71.25%;
    }
    .pt {
        position: absolute;
        z-index: 50;
        a{
            padding: 0 90px;
            float: left;
            font-size: 18px;
            line-height: 60px;
            color: #555050;
            white-space: nowrap;
            code {
                display: block;
                line-height: 20px;
                font-size: 12px;
            }
            .u-font {
                float: left;
                width: 54px;
                height: 54px;
                margin: 0 0 0 -60px;
                font-size: 35px;
                line-height: 60px;
                text-align: center;
                -webkit-border-radius: 50%;
                border-radius: 50%;
            }
        }
    }
    .pt1 {
        right: calc(~"98.5% - 54px");
        bottom: 20%;
        animation-delay: 0.5s;
        visibility: visible;
        animation-duration: 0.5s;
        animation-name: fadeInRight;
    }
    .pt2 {
        right: calc(~"90% - 54px");
        bottom: 56%;
        animation-delay: 1s;
        visibility: visible;
        animation-duration: 0.5s;
        animation-name: fadeInRight;
    }
    .pt3 {
        right: calc(~"73.5% - 54px");
        bottom: 82%;
        animation-delay: 1.5s;
        visibility: visible;
        animation-duration: 0.5s;
        animation-name: fadeInRight;
    }
    .pt1,.pt2,.pt3{
        display: block;
        a {
            .u-font {
                float: right;
                margin: 0 -60px 0 0;
            }
            code{
                text-align: right;
            }
        }
    }
    .pt5 {
        left: calc(~"73.5% - 54px");
        bottom: 82%;
        animation-delay: 2s;
        visibility: visible;
        animation-duration: 0.5s;
        animation-name: fadeInRight;
    }
    .pt6 {
        left: calc(~"90% - 54px");
        bottom: 56%;
        animation-delay: 2.5s;
        visibility: visible;
        animation-duration: 0.5s;
        animation-name: fadeInRight;
    }
    .pt7 {
        left: calc(~"98.5% - 54px");
        bottom: 20%;
        animation-delay: 3s;
        visibility: visible;
        animation-duration: 0.5s;
        animation-name: fadeInRight;
    }
    .pt1:hover,.pt2:hover,.pt3:hover,.pt5:hover,.pt6:hover,.pt7:hover{
        font-weight: bold;
    }
    .pt1:hover img,.pt2:hover img,.pt3:hover img,.pt5:hover img,.pt6:hover img,.pt7:hover img{
        transform: scale(1.1)
    }
    
    .p2LineBox {
        position: relative;
        z-index: 10;
        width: 70%;
        margin: 0 auto;
        
        .p2-line3{
            width: 100%;
            animation-duration: 1s;
        }
        .p2-line2{
            position: absolute;
            bottom: 0;
            z-index: 1;
            width: 100%;
            animation-duration: 1s;
        }
        .p2-line1{
            position: absolute;
            bottom: 0;
            z-index: 2;
            width: 100%;
            animation-duration: 3s;
            animation-delay: 1s;
        }
    }
    //动画
    .mtRotate1{
        transform-origin: center 88.4%;
        animation-fill-mode: forwards;
        transform: rotate(-180deg);
        animation-name: rotate1;
    }
    @keyframes rotate1 {
        0%{transform: rotate(-180deg);visibility: visible;}
        100%{transform: rotate(0deg);visibility: visible;}
    }

    .mtRotate2{
        animation-delay: 1s;
        visibility: visible;
        animation-duration: 1s;
        animation-name: fadeInDown;
    }
    .mtRotate3{
        animation-delay: 2s;
        visibility: visible;
        animation-duration: 1s;
        animation-name: fadeInUp;
    }
}
</style>
