<template>
    <div class="about">
        <Button @click="show('add')" type="primary" :style="{marginBottom: '10px'}">Add</Button>

        <Table
                :loading="loading"
                border
                :columns="columns"
                :data="data"
        >
        </Table>
        <div style="margin: 30px 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage" :page-size="10"></Page>
            </div>
        </div>
        <Modal
                v-model="modal2"
                :title="type"
                @on-ok="ok"
                @on-cancel=" modal2 = false">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="right" :label-width="80">
                <FormItem prop="name" label="Name">
                    <Input type="text" v-model="formInline.name" placeholder="name" :maxlength='8'/>
                </FormItem>
                <FormItem prop="Description" label="description">
                    <Input type="text" v-model="formInline.description" placeholder="description">
                    </Input>
                </FormItem>
                <FormItem prop="status" label="Status">
                    <i-switch v-model="formInline.status" @on-change="change"></i-switch>
                </FormItem>
                <FormItem prop="picture" label="Picture">
                    <img class="img" :src="formInline.picture" v-model="formInline.picture" alt=""
                         :style="{width: '200px', height: 'auto'}">
                    <a href="javascript:;" class="file" :style="{marginTop: '5px'}">{{type == 'add' ? '添加图片(1M)' : '更改图片(1M)'}}
                        <input id="fileinput" class="fileinput" @change="uploading" type="file" accept="image/*" >
                    </a>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button size="large" @click="cancel('formInline')">取消</Button>
                <Button type="primary" size="large" @click="ok('formInline')" :disabled="addIng">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'about',
        data() {
            return {
                columns: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Description',
                        key: 'description',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    display: 'block',
                                    overflow:'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }
                            }, params.row.description )
                        }
                    },
                    {
                        title: 'Picture',
                        key: 'picture',
                        render: (h, params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row.picture
                                },
                                style: {
                                    width: '100px',
                                    height: '50px',
                                    display: 'block',
                                    margin: '4px auto'
                                }
                            })
                        }
                    },
                    {
                        title: 'Status',
                        key: 'status',
                        render: (h, params) => {
                            return h('span', {}, params.row.status ? '上架' : '下架')
                        }
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
                                            this.show('edit', params.Index)
                                        }
                                    }
                                }, 'Edit'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.Index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                changePic: false,
                data: [],
                modal2: false,
                loading: true,
                type: '',
                ruleInline: {
                    name: [{required: true, message: '请输入名字', trigger: 'blur'}],
                    picture: [
                        {required: true, message: '请上传图片', trigger: 'blur'}],
                    description: [{required: true, message: '请输入描述', trigger: 'blur'}],
                    switch: [{required: true, trigger: 'blur'}],
                },
                formInline: {
                    status: true,
                    picture: ''
                },
                file: '',
                fileSrc: '',
                total: 0,
                current: 1,
                addIng: false
            }
        },
        created() {
          this.getData(1)
        },
        methods: {
            //获取数据
            getData(current) {
                this.loading = true
                this.$fetch('/api/about/getData', {params: {pageNum: current}}, 'get').then(res => {
                    this.loading = false
                    res.data.forEach((item) => {
                        item.status = item.status ? true : false
                    })
                    this.data = res.data
                    this.total = res.total
                    this.current = current
                }).catch(err => {
                    this.loading = false
                    // this.$Message.info(err)
                })
            },
            show(type, index) {
                this.$refs.formInline.resetFields();
                this.modal2 = true
                this.type = type
                if (type === 'add') {
                    this.formInline = {
                        status: true,
                        picture: ''
                    }
                } else {
                    this.formInline = {...this.data[index]}
                }
            },
            remove(index) {
                console.log(this.data[index].id)
                this.$fetch('/api/about/deleteData', {params: {id: this.data[index].id}}, 'get').then(res => {
                    this.current = Math.ceil(res.total/10)
                    this.getData(this.current)
                    this.$Message.success(res.msg)
                }).catch(err => {
                    this.$Message.warning(err.msg)
                })
            },
            ok(name) {
                let url = this.type == 'add' ? '/api/about/addData' : '/api/about/updateData'
                let current = this.type == 'add' ? 1 : this.current
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        return
                    }
                    this.addIng = true
                    let formData = new FormData()
                    formData.append('file', this.file)
                    formData.append('name', this.formInline.name)
                    formData.append('description', this.formInline.description)
                    if (this.type == 'edit'){
                        if (!this.changePic) {
                            formData.append('picture', this.formInline.picture)
                        }
                        formData.append('id', this.formInline.id)
                    }
                    let status = this.formInline.status == true ? 1 : 0
                    formData.append('status', status)
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    this.$fetch(url, formData, 'post', config).then(res => {
                        this.getData(current)
                        this.$Message.success(res.msg)
                        this.modal2 = false
                        this.$nextTick(() => {
                            this.$refs[name].resetFields();       // this.$refs.adduserform.resetFields();
                            this.file = ''
                        });
                        this.addIng = false
                        this.changePic = false
                    }).catch(err => {
                        // this.$Message.warning(err.msg)
                        this.addIng = false
                        this.modal2 = false
                        this.changePic = false
                        this.$nextTick(() => {
                            this.$refs[name].resetFields();       // this.$refs.adduserform.resetFields();
                            this.file = ''
                        });
                    })
                })
            },
            change(status) {
                this.$Message.info(status ? '上架' : '下架')
            },
            uploading(e) {
                this.file = e.target.files[0]
                console.log(this.file.size)
                if (this.file.size/1024000 > 1) {
                    this.$Message.warning('图片太大，小于1M')
                    return
                }
                let windowUrl = window.URL || window.webkitURL
                this.fileSrc = windowUrl.createObjectURL(e.target.files[0])
                this.formInline.picture = this.fileSrc
                this.changePic = true
                this.$refs.formInline.validateField('picture')
                e.target.value=""
            },
            //关闭弹窗
            cancel(name) {
                this.$nextTick(() => {
                    this.$refs[name].resetFields();
                });
                this.modal2 = false
            },
            changePage(current) {
                this.getData(current)
            }
        }
    }
</script>

<style scoped lang="less">
    .about {
        margin-top: 20px;
        padding: 30px;
    }

    .file {
        width: 100px;
        text-align: center;
        position: relative;
        display: block;
        background: #fff;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #515a6e;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        cursor: pointer;
        transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear;
        input {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
        &:hover {
            color: #57a3f3;
            background-color: #fff;
            border-color: #57a3f3;
            cursor: pointer;
        }
    }
</style>
