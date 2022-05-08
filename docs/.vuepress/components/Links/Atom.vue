<template>
    <div class="Atom">
        <div class="Blog">
            <img class="Avatar" :src="atom.Avatar" alt="atom.Name Blog"/>
            <h6 class="Brief">{{ atom.Name }}</h6>
        </div>
        <a :href="atom.Address">
            <img class="Avatar-lg" :src="atom.Avatar" alt="atom.Name Blog"/>
        </a>
        <div class="Comment">
            <p>Comment: {{ atom.Comment }}</p>
        </div>
        <div class="briefInfo">
            <p class="Name">{{ atom.Name }}</p>
            <hr>
            <p class="Quote">{{ atom.Quote }}</p>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
    name: "Atom",
    props: ['atom'],
})
</script>

<style lang="stylus">
.Atom
    float: left
    width: 97px
    height: 512px
    cursor: pointer
    display: flex

    .Blog
        width: 100px
        height: 100%
        background: rgba(0, 0, 0, 0.4)

        .Avatar
            border-radius: 50%
            height: 95px
            width: 95px
            border: 1px
            border-style: solid
            border-color: grey

        .Brief
            text-align: center
            font-size: small
            color: #f2fdff

    a
        .Avatar-lg
            display: none
            position: absolute
            left: 5px
            top: 5px
            width: 256px
            height: 256px
            border: 1px
            border-style: solid
            border-color: grey

    .briefInfo
        width: 433px
        display: none
        left: 267px
    
    .Name
        font-size: 64px
        color: #d6ecf0

    .Quote
        font-size: 25px
        color: #d6ecf0

    .Comment
        overflow: hidden
        position: relative
        margin-top: 261px
        margin-left: 5px
        color: #d6ecf0
        p
            width: 800px
            font-size: large
</style>