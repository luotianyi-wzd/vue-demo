<template>
    <div class="login">
        <Form ref="formData" :model="formData" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formData.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formData.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <div class="box">
                    <Button @click="login('formData')" class="btn" type="warning">登陆</Button>
                    <Button @click="register('formData')" class="btn" type="warning">注册</Button>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "loign",
        data() {
            return {
                formData: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '输入账号',trigger: 'blur'},
                        {min: 8, message: '最少8位'}
                    ],
                    password: [
                        {required: true, message: '请输入密码',trigger: 'blur'},
                        {type: 'string',pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message:'至少八个字符，包含数字字母'}
                    ]
                }
            }
        },
        methods: {
            login(name) {
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        return
                    }
                    let username = this.formData.user
                    let password = this.formData.password
                    this.$fetch('/api/users/login', {username, password}, 'post').then(res => {
                        this.$Message.info(res.msg);
                        window.localStorage.username = true
                        this.$router.push({path: '/'})
                    }).catch(err => {
                        this.$Message.info(err.msg)
                    })
                })
            },
            register(name) {
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        return
                    }
                    let username = this.formData.user
                    let password = this.formData.password
                    this.$fetch('/api/users/register', {username, password}, 'post').then(res => {
                        this.$Message.info(res.msg);
                    }).catch(err => {
                        this.$Message.info(err.msg)
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .login{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 400px;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .box{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .btn{
        margin-left: 0;
    }
</style>