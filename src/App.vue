<template>
    <div id="app">
        <keep-alive include="Home, About">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }
    html, body{
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
</style>
