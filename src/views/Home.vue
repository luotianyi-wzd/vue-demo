<template>
    <div class="wrapper">
        <div class="btn">
            <Button type="success" size="default" @click="handleAdd('edit')" icon="ios-map-outline">编辑</Button>
            <Button type="info" size="default" :style="{margin: '0 20px'}" @click="handleAdd('add')" icon="ios-add">添加
            </Button>
            <Button type="primary" size="default" icon="ios-ionic-outline" @click="handleLook">查看</Button>
        </div>
        <Table
                :loading="loading"
                stripe
                :columns="columns"
                :data="data1"
                ref="currentRowTable"
                highlight-row
                @on-row-click="handleRowClick"
                @on-current-change="handleSelect"
        >
        </Table>
        <div style="margin: 30px 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage" :page-size="10"></Page>
            </div>
        </div>
        <Modal
                v-model="modal1"
                :title="title"
                @on-ok="ok('formInline')"
                @on-cancel="cancel('formInline')">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="right" :label-width="80">
                <FormItem prop="name" label="Name">
                    <Input type="text" v-model="formInline.name" placeholder="name" :maxlength='8'/>
                </FormItem>
                <FormItem prop="age" label="Age">
                    <InputNumber :max="90" :min="16" v-model="formInline.age" placeholder="18"
                                 :active-change="false"></InputNumber>
                </FormItem>
                <FormItem prop="phone" label="Phone">
                    <Input type="text" v-model="formInline.phone" placeholder="phone" :maxlength='11'>
                    </Input>
                </FormItem>
                <FormItem prop="address" label="Adderss">
                    <Input type="text" v-model="formInline.address" placeholder="address">
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button size="large" @click="cancel('formInline')">取消</Button>
                <Button type="primary" size="large" @click="ok('formInline')">确定</Button>
            </div>
        </Modal>
        <Modal
                v-model="modal2"
                title="详情"
                @on-ok="modal2 = false"
                @on-cancel=" modal2 = false">
            <Card class="card">
                <p>name: {{modalData.name}}</p>
                <p>age: {{modalData.age}}</p>
                <p>address: {{modalData.address}}</p>
            </Card>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                loading: true,
                columns: [
                    {
                        width: 60,
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'name',
                        key: 'name'
                    },
                    {
                        title: 'age',
                        key: 'age'
                    },
                    {
                        title: 'phone',
                        key: 'phone'
                    },
                    {
                        title: 'address',
                        key: 'address'
                    },
                ],
                modal1: false,
                modal2: false,
                title: '',
                data1: [],
                formInline: {
                    age: 16
                },
                ruleInline: {
                    name: [{required: true, message: '请输入名字', trigger: 'blur'}],
                    age: [{required: true, message: '请输入年龄'}],
                    phone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {type: 'string', pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}],
                    address: [{required: true, message: '请输入地址', trigger: 'blur'}],
                },
                hasSelect: false,
                total: 0,
                current: 1,
                currentRow: {},
                type: '',
                rowIndex: 1,
                modalData: {}
            }
        },
        created() {
            this.getData(1)
        },
        methods: {
            //获取数据
            getData(current) {
                this.loading = true
                this.hasSelect = false
                this.$fetch('/api/users/getUser', {params: {pageNum: current}}, 'get').then(res => {
                    this.loading = false
                    this.data1 = res.data
                    this.total = res.total
                    this.current = current
                }).catch(err => {
                    this.loading = false
                    // this.$Message.info(err)
                })
            },
            //打开弹窗
            handleAdd(type) {
                this.type = type
                if (type == 'edit' && !this.hasSelect) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请选择一项',
                    })
                    return
                }
                if (type == 'add') {
                    this.title = 'add'
                }
                if (type == 'edit') {
                    this.title = 'edit'
                    this.formInline = {...this.currentRow}
                }
                this.modal1 = true
            },
            //打开详情弹窗
            handleLook() {
                if (!this.hasSelect) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请选择一项',
                    })
                    return
                }
                let index = this.rowIndex
                this.modalData = {...this.data1[index]}
                this.modal2 = true
            },
            //提交数据
            ok(name) {
                let url = this.type == 'add' ? '/api/users/addUser' : '/api/users/updateUser'
                let current = this.type == 'add' ? 1 : this.current
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        return
                    }
                    this.modal1 = false
                    this.$fetch(url, {...this.formInline}, 'post').then(res => {
                        this.getData(current)
                        this.$Message.success(res.msg)
                        this.$nextTick(() => {
                            this.$refs[name].resetFields();       // this.$refs.adduserform.resetFields();
                        });
                    }).catch(err => {
                        this.$Message.info(err.msg)
                    })
                })
            },
            //关闭弹窗
            cancel(name) {
                this.$nextTick(() => {
                    this.$refs[name].resetFields();
                });
                this.modal1 = false
            },
            //选择一行
            handleSelect(currentRow, oldCurrentRow) {
                this.hasSelect = true
                this.currentRow = currentRow
            },
            //获取选中行index
            handleRowClick(row, index) {
                this.rowIndex = index
            },
            //翻页
            changePage(current) {
                this.getData(current)
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        margin-top: 20px;
        padding: 30px;
    }

    .btn {
        margin-bottom: 40px;
    }

    .card {
        margin: 30px 0;
        height: 200px;
    }
</style>
