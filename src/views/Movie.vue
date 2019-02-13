<template>
    <div class="movie">
        <Table>

        </Table>
    </div>
</template>

<script>
    export default {
        name: "movie",
        data() {
            return {
                lists: [
                    1, 2, 3, 4, 5
                ],
                count: 0,
                msg: 'father'
            }
        },
        created() {
          this.getData()
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