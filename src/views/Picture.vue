<template>
    <div class="picture">
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="http://upload-z2.qiniu.com/"
                :data="{token: token}"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
            <img :src=imgName v-if="visible" style="width: 100%">
        </Modal>

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
                visible: false,
                uploadList: [],
                msg: '',
                percent: 0,
                isFinish: true
            }
        },
        created() {
            this.request()

        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
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
            request() {
                this.$fetch('/api/users/qiniu', {}, 'get').then(res => {
                    console.log(res.data)
                    this.token = res.data.token
                    this.url = res.data.url
                    res.data.list.map(item => {
                        item.name = item.url
                        item.url = this.url + item.url
                    })

                    console.log(this.defaultList)
                })
            },
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess(res, file) {
                console.log(res.key)
                file.url = this.url + res.key;
                file.name = res.key;
                console.log(file.url)
                this.$fetch('/api/users/upload', {params: {key: res.key}}, 'get').then(res => {
                    this.$Message.info(res.msg)
                }).catch(err => {
                    this.$Message.warning((err.msg))
                })
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
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