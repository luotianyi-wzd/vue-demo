<template>
    <div class="role">
        <Table
                :loading="loading"
                stripe
                :columns="columns"
                :data="data"
                ref="currentRowTable"
                highlight-row
        >
        </Table>

        <div style="margin: 30px 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage" :page-size="10"></Page>
            </div>
        </div>

        <Modal
                v-model="modal"
                title="修改权限"
                @on-ok="ok"
                @on-cancel="modal = false"
        >
            <Form ref="formInline" :model="formInline"  label-position="right" :label-width="80">
                <FormItem prop="name" label="Name">
                    <Input type="text" v-model="formInline.username" placeholder="name" disabled />
                </FormItem>
                <FormItem prop="role" label="Role">
                    <Select v-model="formInline.role" style="width:200px">
                        <Option :value="0" :key="0">用户</Option>
                        <Option :value="1" :key="1">管理员</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "Role",
        data() {
            return {
                loading: false,
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        render: (h, params) => {
                            return h('span', {}, parseInt(params.row.id))
                        }
                    },
                    {
                        title: 'username',
                        key: 'username'
                    },
                    {
                        title: 'role',
                        key: 'role',
                        render: (h, params) => {
                            return h('span', {}, params.row.role ? '管理员' : '用户')
                        }
                    },
                    {
                        title: 'create-time',
                        key: 'create_time',
                    },
                    {
                        title: 'action',
                        key: 'action',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.changeRole(params.index)
                                    }
                                }
                            }, '修改权限')
                        }
                    },
                ],
                data: [],
                modal: false,
                current: 1,
                formInline: {},
                total: 0,
            }
        },
        created() {
            this.getData(1)
        },
        methods: {
            getData(current) {
                this.loading = true
                this.$fetch('/api/role/getRole', {params: {pageNum: current}}, 'get').then(res => {
                    console.log(res)
                    this.loading = false
                    this.$Message.info(res.msg)
                    this.data = res.data
                    this.total = res.total
                    this.current = current
                }).catch(err => {
                    this.loading = false
                })
            },
            changeRole(index) {
                this.modal  =true
                this.formInline = this.data[index]
            },
            ok() {
                console.log(this.formInline)
                this.$fetch('/api/role/changeRole', {...this.formInline}, 'post').then(res => {
                    this.formInline = {}
                    this.modal =false
                    this.getData(this.current)
                }).catch(err => {
                    this.formInline = {}
                    this.modal =false
                })
            },
            changePage(current) {
                this.getData(current)
            }
        }
    }
</script>

<style lang="less" scoped>
    .role {
        padding: 40px;
        padding-top: 100px;
    }
</style>
