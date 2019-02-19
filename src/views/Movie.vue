<template>
    <div class="movie">
        <Table
                :loading="loading"
                stripe
                :columns="columns"
                :data="data"
                height="700"
        >
        </Table>
        <Modal
                v-model="modal"
                title="Details"
                @on-ok="modal = false"
                @on-cancel="modal = false"
        >
                <p class="detail">电影：{{rowDetails.name}}</p>
                <p class="detail">导演：{{rowDetails.director}}</p>
                <p class="detail">演员：{{rowDetails.actors}}</p>
                <p class="detail" v-if="rowDetails.totalBoxDes">票房：{{parseFloat(rowDetails.totalBoxDes)}}{{rowDetails.totalBoxUnit}}</p>
                <p class="detail">上映时间：{{rowDetails.time}}</p>
                <div class="poster">
                    <img :src="rowDetails.img" alt="" :style="{width: '150px', height: 'auto'}">
                </div>
        </Modal>
    </div>
</template>

<script>
    import lazyload from "../directives/lazyload"
    import city from "./../config/city"

    export default {
        name: "movie",
        data() {
            return {
                loading: true,
                modal: false,
                searchValue: '',
                columns: [
                    {
                        title: 'Movie',
                        key: 'tCn',
                    },
                    {
                        title: 'Actors',
                        key: 'actors'
                    },
                    {
                        title: 'Director',
                        key: 'dN'
                    },
                   /* {
                        title: 'Poster',
                        key: 'img',
                        render: (h, params) => {
                            return h('img', {
                                attrs: {
                                    'v-lazyload': params.row.img
                                },
                                style: {
                                    width: '50px',
                                    height: 'auto',
                                    display: 'block',
                                    margin: '5px 0'
                                }
                            })
                        }
                    },*/
                    {
                        title: 'Type',
                        key: 'movieType'
                    },
                    {
                        title: 'Time',
                        key: 'rd'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.details(params.index)
                                        }
                                    }
                                }, 'Details')
                            ]);
                        }
                    }
                ],
                data: [],
                count: 0,
                rowDetails: {

                },
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
                this.$fetch('/movie/Showtime/LocationMovies.api', {params: {locationId: 974} }, 'get').then(res => {
                    this.loading = false
                    this.data = res.ms
                }).catch(err => {
                    this.loading = false
                })
            },
            details(index) {
                let movieId = this.data[index].movieId
                this.$fetch('/ticket/detail.api', {params: {locationId: 974 , movieId} }, 'get').then(res => {
                    console.log(res, 'res')
                    let actors = []
                    res.data.basic.actors.map((item, index) => {
                        if (index < 5) {
                            actors.push(item.name)
                        }
                        return
                    })
                    this.rowDetails = Object.assign({}, this.rowDetails, {
                        name: res.data.basic.name,
                        director: res.data.basic.director.name,
                        totalBoxDes: res.data.boxOffice.totalBoxDes,
                        totalBoxUnit: res.data.boxOffice.totalBoxUnit.substring(5, 6),
                        img: res.data.basic.img,
                        actors: actors.join('/'),
                        time: res.data.basic.releaseDate
                    })
                    this.modal = true
                })
            },
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
    .detail{
        margin: 10px;
    }
    .poster{
        margin-left: 20px;
    }
</style>