<template>
    <div class="movie">
        <p>{{msg}}</p>
        <Button @click="handleClick">点击</Button>
        <!--<Card class="card">-->
            <!--<div class="item" v-for="item in lists">{{item}}</div>-->
        <!--</Card>-->
        <TestChildren :data="count" @change="handleChange"></TestChildren>
    </div>
</template>

<script>
    import TestChildren from './TestChildren'

    export default {
        name: "movie",
        components: {
          TestChildren
        },
        data() {
            return {
                lists: [
                    1, 2, 3, 4, 5
                ],
                count: 0,
                msg: 'father'
            }
        },
        beforeCreate() {
            console.log('父组件beforeCreate')
        },
        created() {
            console.log('父组件created')
            // this.getData()
        },
        beforeMount() {
            console.log('父组件beforeMount')
        },
        mounted() {
            console.log('父组件mounted')
        },
        beforeDestroy() {
            console.log('父组件beforeDestroy')
        },
        beforeUpdate() {
            console.log('父组件beforeUpdate')
        },
        updated() {
            console.log('父组件updated')
        },
        methods: {
            handleClick() {
              this.count += 1
            },
            handleChange() {
                this.msg = 'change father'
            },
            getData() {
                this.$fetch('/movie/Showtime/LocationMovies.api', {params: {locationId: 974, num: 10, pageSize: 2} }, 'get').then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log('err',err)
                })
            }
        }
    }
</script>

<style scoped>
    .movie {
        margin: 50px;
    }

    card {
        width: 100%;

    }

    .item {
        display: inline-block;
        width: 200px;
        height: 300px;
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: 30px;
        border: 1px solid #000;
    }
</style>