<template>
    <div class="wrapper">
        <p>404</p>
        <Button @click="handleRefresh">点击重试</Button>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
        methods: {
            handleRefresh() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        width: 500px;
        height: 500px;
        margin: 100px auto;
        font-size: 50px;
    }
</style>