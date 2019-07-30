<template>
    <div class="header">
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
              size="24"></Icon>
        <div class="avatar">
            <span class="time">
                {{time}}
            </span>
            <span v-if="!!weather" class="time">
                {{weather}}
            </span>
            <Avatar icon="ios-person" />
            <Dropdown class="info" @on-click="logout">
                <a href="javascript:void(0)" class="a-title">
                    信息
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list" class="list">
                    <DropdownItem name="github"><a href="http://www.github.com" target="_blank">github</a></DropdownItem>
                    <DropdownItem name="info">info</DropdownItem>
                    <DropdownItem name="logout">logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "NavHeader",
        props: {
          isCollapsed: Boolean
        },
        data() {
            return {
                time: this.formatDate(new Date()),
                weather: ''
            }
        },
        mounted() {
            this.clock()
            // this.getWeather()
        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
        },
        methods: {
            ...mapActions(['handleLogout']),
            collapsedSider() {
                this.$emit('collapsedSider')
            },
            logout(name) {
                if (name == 'logout') {
                    window.localStorage.removeItem('username')
                    this.$router.push('/login')
                    
                    this.handleLogout().then(res => {
                        console.log(res)
                        this.$Message.info(res.msg)
                    })
                }
            },
            clock() {
                let self = this
                let timer = setInterval(() => {
                    self.time = self.formatDate(new Date())
                }, 1000)

                // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
                this.$once('hook:beforeDestroy', () => {
                    clearInterval(timer);
                })
            },
            getWeather() {
                let self = this
                this.$fetch({url: '/weather', params:{params:{cityId: 101210101}}, method: 'get'}).then(res => {
                    if (res.today.weatherStart == res.today.weatherEnd) {
                        self.weather = res.today.weatherStart
                    } else {
                        self.weather = res.today.weatherStart + '转' + res.today.weatherEnd
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .avatar{
        margin-right: 30px;
    }
    .info .a-title{
        margin-left: 20px;
        color: #000;
    }
    .list a{
        color: #515a6e;
    }
    .time{
        margin-right: 20px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
</style>