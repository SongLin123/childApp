<template>
    <div class="tabzb">
        <div class="tabzbItem">带班领导</div>
        <div class="tabzbItem">陈东</div>
        <div class="tabzbItem">日班(值班室)</div>
        <div class="tabzbItem">嵇笑吉、丘周雯</div>
        <div class="tabzbItem">日班(城运)</div>
        <div class="tabzbItem">周佳、刘琦、巢硕</div>
        <div class="tabzbItem">夜班(值班室)</div>
        <div class="tabzbItem">唐亮、蒋杰</div>
        <div class="tabzbItem">夜班(城运)</div>
        <div class="tabzbItem">赵建军、孙纯慧</div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    @Component
    export default class Tabzb extends Vue{
        
    }
</script>

<style lang="stylus" scoped>
.tabzb
    width 100%
    height 100%
    padding 10px 60px
    display grid 
    grid-template-columns 40% 60%
    grid-template-rows  repeat(5,20%)
    background white
    .tabzbItem
        line-height 40px
    .tabzbItem:nth-child(2n-1)
        color #666666
    .tabzbItem:nth-child(2n)
        color #009DE7
</style>