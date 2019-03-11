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
            console.log(this.$router.options.routes)
            return {
                lists: this.$router.options.routes[2].children,
            }
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
        overflow-y: scroll;
        padding-bottom: 200px;
    }
    .menu-list::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .menu-list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }
    .menu-list::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(81,90,110,1);
        border-radius: 10px;
        background: #515a6e;
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
