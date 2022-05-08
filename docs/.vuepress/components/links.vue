<template>
<div>
  <Navbar></Navbar>
  <div id="BgImgs">
    <Bg :class="[
            'bg',
            'bg-box-' + getIndex(bg, bgImgList)
        ]"
        v-for="bg in bgImgList"
        :bg="bg"
        :key="getIndex(bg, bgImgList)"
        :style="{display: 'none'}"/>
  </div>
  <div id="wrap">
    <ul>
        <Atom v-for="atom in linkList"
            :atom="atom"
            :key="getIndex(atom, linkList)"/>
    </ul>
  </div>
</div>
</template>

<script src="./Links/Links.js"></script>

<style lang="stylus">
*
    margin: 0
    padding: 0

body, html
    width: 100%
    height: 100%
    background: url('/images/Wallpapers/06f410821588af29f35165b20631fa5b.jpg') no-repeat center/cover

#wrap 
    position: absolute
    overflow: hidden
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    width: 80%
    height: 512px

    ul
        width: 120%
        list-style: none
        >:nth-child(1)
            background: cross-fade(transparent, url('/bgimg/focus.akasaki.space.jpg'), 80%) no-repeat center/cover
            background: -webkit-cross-fade(transparent, url('/bgimg/focus.akasaki.space.jpg'), 80%) no-repeat center/cover
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg/focus.akasaki.space.jpg') no-repeat center/cover
        >:nth-child(2)
            background: cross-fade(transparent, url('/bgimg/memo.pommespeter.space.png'), 80%) no-repeat center/cover
            background: -webkit-cross-fade(transparent, url('/bgimg/memo.pommespeter.space.png'), 80%) no-repeat center/cover
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg/memo.pommespeter.space.png') no-repeat center/cover
        >:nth-child(3)
            background: cross-fade(transparent, url('/bgimg/blog.keter.top.jpg'), 80%) no-repeat center/cover
            background: -webkit-cross-fade(transparent, url('/bgimg/blog.keter.top.jpg'), 80%) no-repeat center/cover
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg/blog.keter.top.jpg') no-repeat center/cover
        >:nth-child(4)
            background: cross-fade(transparent, url('/bgimg/blog.zerorains.top.png'), 80%) no-repeat center/cover
            background: -webkit-cross-fade(transparent, url('/bgimg/blog.zerorains.top.png'), 80%) no-repeat center/cover
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg/blog.zerorains.top.png') no-repeat center/cover
        >:nth-child(5)
            background: cross-fade(transparent, url('/bgimg/sunning.fit.jpg'), 80%) no-repeat center/cover
            background: -webkit-cross-fade(transparent, url('/bgimg/sunning.fit.jpg'), 80%) no-repeat center/cover
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg/sunning.fit.jpg') no-repeat center/cover
        >:nth-child(6)
            background: cross-fade(transparent, url('/bgimg/fly-pluche.github.io.jpg'), 80%) no-repeat center/cover
            background: -webkit-cross-fade(transparent, url('/bgimg/fly-pluche.github.io.jpg'), 80%) no-repeat center/cover
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg/fly-pluche.github.io.jpg') no-repeat center/cover
        >:nth-child(7)
            background: cross-fade(transparent, url('/bgimg/www.cnblogs.com.whitebunny.png'), 80%) no-repeat center/cover
            background: -webkit-cross-fade(transparent, url('/bgimg/www.cnblogs.com.whitebunny.png'), 80%) no-repeat center/cover
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg/www.cnblogs.com.whitebunny.png') no-repeat center/cover
        >:nth-child(8)
            background: cross-fade(transparent, url('/bgimg/blog.csdn.net.qq_51415601.png'), 80%) no-repeat center/cover
            background: -webkit-cross-fade(transparent, url('/bgimg/blog.csdn.net.qq_51415601.png'), 80%) no-repeat center/cover
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg/blog.csdn.net.qq_51415601.png') no-repeat center/cover

backgroundList = ( '/bgimg/focus.akasaki.space.jpg' '/bgimg/memo.pommespeter.space.png' '/bgimg/blog.keter.top.jpg' '/bgimg/blog.zerorains.top.png' '/bgimg/sunning.fit.jpg' '/bgimg/fly-pluche.github.io.jpg' '/bgimg/www.cnblogs.com.whitebunny.png' '/bgimg/blog.csdn.net.qq_51415601.png' )
for index in (0..7)
    .bg-box-{index}
        background: url(backgroundList[index]) no-repeat center/cover
</style>