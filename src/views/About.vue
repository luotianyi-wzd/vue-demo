<template>
    <div class="about">
        <Card class="card">
            <i-circle :percent="percent" :stroke-color="isFinish ? '#2db7f5' : '#5cb85c'">
            <span class="demo-Circle-inner">
                <span v-if="isFinish" class="demo-Circle-inner" style="font-size:24px">{{percent}}%</span>
                <Icon v-else type="ios-checkmark" size="50" style="color:#5cb85c"></Icon>
            </span>
            </i-circle>
            <Button @click="handleAdd">add</Button>
        </Card>
        <Card class="card">
            <p>{{name}}</p>
            <p>{{anotherName}}</p>
            <Button @click="handleName({name: '楚留香'})">换人</Button>
        </Card>
        <Card class="card"></Card>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'

    export default {
        name: 'about',
        data() {
            return {
                msg: '',
                percent: 0,
                isFinish: true
            }
        },
        mounted() {
            let self = this
            setTimeout(() => {
                self.percent = 80
            }, 100)
        },
        computed: {
            name() {
                // return this.$store.state.page1_store.name
                return this.$store.getters.add
            },
            anotherName() {
                return this.$store.state.page2_store.anotherName
            }
        },
        methods: {
            // this.$store.commit('changeName', {name: '叶开'})
            // this.$store.dispatch('changeName', {name: '柳长街'})
            ...mapActions({
                handleName: 'changeName'
            }),
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

<style scoped>
    .about{
        /*background-color: red;*/
    }
    .card{
        margin: 20px;
        height: 200px;
    }
</style>