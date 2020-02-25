<template>
    <div class="addWarning">
        <div class="planCard">
            <p class="planTitle">周家渡街道舆情应对专项应急预案</p>
            <div class="planTxt">
                为有效应对发生在本社区的断水、漏水、爆水管以及停电等突发事件，
                提升周家渡街道供水供电突发事件的应急处置能力，最大限度地减少给居民生活带来的不利影响，
                保障居民的生活质量，提高辖区居民的幸福指数。
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    @Component
    export default class AddWarning extends Vue{
        
    }
</script>

<style lang="stylus" scoped>
.addWarning
    width 100%
    height 100vh
    background-color #F6F6F6
    padding-top 1px
    .planCard
        width 90%
        margin 20px auto 0
        padding 10px
        border-radius 10px
        background white
        .planTitle
            margin-bottom:10px
            font-size 18px 
            font-weight 900
        .planTxt
            color #999999
</style>