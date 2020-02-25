
<template>
    <div class="discussCard">
        <div class="discussItem">
            <img :src="require('@/statics/iconList/安全生产.png')" alt="">
        </div>
        <div class="discussItem padl">
            <span style="color:#667DB7">赵小刚</span>&nbsp;&nbsp;
            <span style="color:#999999;font-size:14px">安监所工作人员</span>
            <span style="color:#999999;font-size:14px">22:31</span>
        </div>
        <div class="discussItem padl">
            <span style="color:#666666;font-size:14px">
                今天凌晨3时15分，西宁市人民政府新闻办公室和西宁市应急管理局联合召唤开二次新闻发布会，
                南大街长门医院门前路面坍塌事故，截至目前，经初核查，失联人员由2人上升为10人，事情正在处置中。
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    import discussCard from '@/components/discuss/discussCard.vue'
    @Component
    export default class DiscussCard extends Vue{
       
    }
</script>

<style lang="stylus" scoped>
.discussCard
    width 100%
    height 100%
    background-color white
    border-radius 10px
    display grid
    grid-template-columns 20% 80%
    grid-template-rows 30px auto
    padding 10px 0
    margin-top 10px
    .discussItem:first-child
        grid-column-start 1
        grid-column-end 2
        grid-row-start 1
        grid-row-end 3
        text-align center
        podding-top 10px
        img
            width 80%
    .padl
        line-height 20px
        padding 5px 20px
    .discussItem:nth-child(2)
        display grid
        grid-template-columns 20% 60% 20%
        grid-template-rows 100% 
        
</style>