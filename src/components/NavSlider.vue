<template>
    <Menu :active-name="getActive" theme="dark" width="auto" :class="menuitemClasses" class="menu-list">
        <MenuItem v-for="item in lists" :name="item.name" @click="jumpNav(item.path)" :replace="true"
                  :to="item.path">
            <Icon :type="item.type"></Icon>
            <span>{{item.name}}</span>
        </MenuItem>
    </Menu>
</template>

<script>
    export default {
        name: "NavSlider",
        props: {
            isCollapsed: Boolean
        },
        data() {
            return {
                lists: [
                    {
                        path: '/home',
                        name: 'home',
                        type: 'ios-navigate'
                    },
                    {
                        path: '/users',
                        name: 'users',
                        type: 'ios-book-outline'
                    },
                    {
                        path: '/about',
                        name: 'about',
                        type: 'ios-settings'
                    },
                    {
                        path: '/echart',
                        name: 'echart',
                        type: 'ios-pie-outline'
                    },
                    {
                        path: '/map',
                        name: 'map',
                        type: 'ios-paper-plane-outline'
                    },
                    {
                        path: '/movie',
                        name: 'movie',
                        type: 'ios-camera-outline'
                    },
                    {
                        path: '/picture',
                        name: 'picture',
                        type: 'ios-folder-open-outline'
                    },
                ]
            }
        },
        created(){
        },
        computed: {
            menuitemClasses() {
                return [
                    'menu-item', this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            getActive() {
                let path = this.$route.path.replace('/', '')
                return path == 'page' ? 'home' : path
            },
            handleList() {
            }
        },
        methods: {
            jumpNav(path) {
                this.$router.push({
                    path
                })
            }
        }
    }
</script>

<style scoped>
    .menu-list {
        padding-top: 200px;
        height: 100vh;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>