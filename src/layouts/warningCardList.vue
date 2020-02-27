<template>
    <div class="warningCardList">
        <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
        >
            <q-tab name="mails" label="全部" />
            <q-tab name="alarms" label="火灾事故" />
            <q-tab name="movies" label="燃气事故" />
            <q-tab name="photos" label="安全生产事故" />
            <q-tab name="videos" label="大面积停电" />
            <q-tab name="addressbook" label="大面积停水" />
            <q-tab name="photos1" label="食物中毒" />
            <q-tab name="addressbook3" label="危险化学品" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel v-for="item in tabList" :name="item" :key="item" class="q-pa-none">
                <div class="tabContents">
                    <warningcard v-for="item in 2" :key="item" :info='item' @click.native='towarningCard(item)'></warningcard>
                </div>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    import warningcard from '@/components/home/warningcard.vue'
    @Component({
        components:{
            warningcard
        }
    })
    export default class WarningCardList extends Vue{
        tab= 'mails'
        tabList= ['mails','alarms','movies','photos','videos','addressbook','photos1','addressbook3']
    }
</script>

<style lang="stylus" scoped>
.warningCardList
    width 100%
    min-height 100vh
    background-color #F6F6F6
.tabContents
    width 100%
    height auto
    background #F5F6F5
    padding 1px 15px 0
</style>