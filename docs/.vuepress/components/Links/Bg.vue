<template>
    <div>
        <a href="">
            <img class="minibox-img" 
                :src="bg.Avatar" 
                :style="{background: 'url(' + bg.Bgimg + ') no-repeat center/cover'}"/>
        </a>
    </div>
</template>

<script>
export default {
    name: "Bg",
    props: ['bg'],
}
</script>

<style lang="stylus">
.bg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    > a
        position: absolute
        top: 6.5%

.minibox-img
    border-radius: 50%
    height: 95px
    width: 95px
    border: 1px
    border-style: solid
    border-color: grey
</style>