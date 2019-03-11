<template>
    <div class="picture">
        <!--<Card class="card">
            <i-circle :percent="percent" :stroke-color="isFinish ? '#2db7f5' : '#5cb85c'">
            <span class="demo-Circle-inner">
                <span v-if="isFinish" class="demo-Circle-inner" style="font-size:24px">{{percent}}%</span>
                <Icon v-else type="ios-checkmark" size="50" style="color:#5cb85c"></Icon>
            </span>
            </i-circle>
            <Button @click="handleAdd">add</Button>
        </Card>-->
        <Card class="card">
            <p>{{name}}</p>
            <Button @click="handleName({name: '楚留香'})">换人</Button>
        </Card>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default {
        name: "Picture",
        data() {
            return {
                token: '',
                url: '',
                defaultList: [],
                imgName: '',
                uploadList: [],
                msg: '',
                percent: 0,
                isFinish: true
            }
        },
        created() {

        },
        mounted() {

        },
        computed: {
            name() {
                // return this.$store.state.page1_store.name
                return this.$store.getters.add
            },
        },
        methods: {
            // this.$store.commit('changeName', {name: '叶开'})
            // this.$store.dispatch('changeName', {name: '柳长街'})
            // ...mapActions({
            //     handleName: 'changeStatus'
            // }),
            ...mapActions([
                'changeStatus'
            ]),
            handleName() {
                this.changeStatus({current: 1})
            },
            handleAdd() {
                if (this.percent < 100) {
                    this.percent += 10
                    if (this.percent == 100) {
                        this.$nextTick(() => {
                            this.percent = 100
                            this.isFinish = false
                        })
                    }
                } else {
                    this.isFinish = false
                }
            }
        }
    }
</script>

<style>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
