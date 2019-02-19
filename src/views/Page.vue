<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <nav-slider :isCollapsed="isCollapsed"></nav-slider>
            </Sider>
            <Layout :style="{minWidth: '900px'}">
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <!--<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>-->
                    <nav-header @collapsedSider="collapsedSider" :isCollapsed="isCollapsed"></nav-header>
                </Header>
                <Content :style="{margin: '10px', background: '#fff', minHeight: '200px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import NavSlider from './../components/NavSlider'
    import NavHeader from '@/components/NavHeader'

    export default {
        name: 'Page',
        data() {
            return {
                isCollapsed: false,
                time: this.formatDate(new Date()),
                list: []
            }
        },
        components: {
            NavSlider, NavHeader
        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
        }
    }
</script>

<style scoped>
    .layout {
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }


</style>
