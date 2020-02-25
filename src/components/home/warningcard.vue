<template>
    <div class="Warningcard">
        <div class="WarningcardItem lineh cardTitle">注意极端天气</div>
        <div class="WarningcardItem lineh fontR">
            <img style="width:30px" :src="require('@/statics/iconList/极端天气.png')" alt="">
        </div>
        <div class="WarningcardItem">
            12小时平均10级，阵风12级。关注易积水区的受涝和排积水情况，
            市民注意收听天气预报。街道防汛办及时处理投诉。
        </div>
        <div class="WarningcardItem lineh">
            <span style="color:#0079FE">相伟 </span> 
            <span style="color:#AAAAAA"> 01月24日 23:30</span>
        </div>
        <div class="WarningcardItem lineh fontR"  style="color:#0079FE" @click.stop='otWarningList'>极端天气</div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    @Component
    export default class Warningcard extends Vue{
        @Prop() private info!:Number
        otWarningList(){
            this.$router.push('/warningCardList')
        }
    }
</script>

<style lang="stylus" scoped>
.Warningcard
    width 100%
    margin 15px 0 0
    padding 10px 20px
    border 1px solid #DEDFDE
    background white
    border-radius 8px
    display grid 
    grid-template-columns 50% 50%
    grid-template-rows 30px auto 30px
    .lineh
        line-height 30px
    .fontR
        text-align right
    .cardTitle
        font-size 16px
        font-weight 800
        color #373737
    .WarningcardItem:nth-child(3)
        padding 10px 0
        color #575757
        grid-column-start 1
        grid-column-end 3
        grid-row-start 2
        grid-row-end 3
</style>