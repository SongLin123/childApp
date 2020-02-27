<template>
    <div class="dateZb">
        <q-date
            style="width:100%"
            v-model="date"
            :locale="myLocale"
            minimal
            @input="getDate"
        />
        <div class="dateInfo">
            <tabzb></tabzb>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import tabzb from '@/components/home/tabzb.vue';
    @Component({
        components:{
            tabzb
        }
    })
    export default class DateZb extends Vue{
        date= ''
        myLocale={
            days: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            daysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            firstDayOfWeek: 1
        }
        created(){
            let dates = new Date()
            let month = dates.getMonth()+1 > 9 ? `${dates.getMonth()+1}`:`0${dates.getMonth()+1}`
            let day = dates.getDate()+1 > 9 ? `${dates.getDate()}`:`0${dates.getDate()}`
            this.date = `${dates.getFullYear()}/${month}/${day}`
        }

        getDate(value:String,resson:String,detail:{year:Number,month:Number,day:Number}){
            console.log(detail)
        }
    }
</script>

<style lang="stylus" scoped>
.dateZb
    width 100%
    height 100vh
    background-color #F6F6F6
    padding-top 1px
    .dateInfo
        margin-top 20px
        width 100%
</style>