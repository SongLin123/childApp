<template>
    <div class="warningCard">
        <div class="warningInfo">
            <div class="warningInfoItem lineh">事发时间</div>
            <div class="warningInfoItem lineh">2010-1-12  15：30</div>
            <div class="warningInfoItem lineh">所属居委</div>
            <div class="warningInfoItem lineh">云台一居</div>
            <div class="warningInfoItem lineh">事发地点</div>
            <div class="warningInfoItem lineh">周家渡云台一居22号</div>
            <div class="warningInfoItem lineh">突发事件分类</div>
            <div class="warningInfoItem lineh">安全生产</div>
            <div class="warningInfoItem lineh">事件详情</div>
            <div class="warningInfoItem" style="padding:10px 20px">
                12小时平均10级，阵风12级。关注易积水区的受涝和排积水情况，市民注意收听天气预报。街道防汛办及时处理投诉。
            </div>
            <div class="warningInfoItem lineh">人员伤亡</div>
            <div class="warningInfoItem lineh">无</div>
            <div class="warningInfoItem lineh">伤损情况</div>
            <div class="warningInfoItem lineh">无</div>
        </div>
        <div class="warningPer">
            <span style="font-size：18px;font-weight:900">接收人</span>
            <div class="perList">发起人：    张海艳</div>
            <div class="perList">应急分管领导     徐青</div>
            <div class="perList">主要领导     徐青</div>
            <div class="perList">责任领导     徐青</div>
            <div class="perList">社区单位      徐青</div>
        </div>
        <div class="discuss">
            <span style="font-size：18px;font-weight:900">评论列表</span>
            <discussCard></discussCard>
             <q-input outlined rounded v-model="ph" style="margin-top:30px" placeholder="输入回复内容" :dense="dense" />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    import discussCard from '@/components/discuss/discussCard.vue'
    @Component({
        components:{
            discussCard
        }
    })
    export default class WarningCard extends Vue{
         dense= false
         ph=''
        created(){
            console.log((this.$route as any).query)
        } 
    }
</script>

<style lang="stylus" scoped>
.warningCard
    width 100%
    min-height 100vh
    background-color #F6F6F6
    padding-top 1px
    .warningInfo
        width 100%
        display grid 
        grid-template-columns 30% 70%
        grid-template-rows 50px 50px 50px 50px auto 50px 50px
        background white
        .warningInfoItem
            border-bottom 1px solid #E4E4E4
        .warningInfoItem:nth-child(2n-1)
            color #8F8F8F
            text-align center
        .warningInfoItem:nth-child(2n)
            padding 0 20px
        .lineh
            line-height 50px
    .warningPer
        margin-top 20px
        background white
        padding 20px 20px 10px
        .perList
            line-height 40px
            padding-left 50px
    .discuss
        width 100%
        padding 20px 
</style>