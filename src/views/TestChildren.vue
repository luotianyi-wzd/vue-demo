<template>
    <div>
        <p>{{data}}</p>
        <Button type="primary" @click="handleClick">子组件</Button>
    </div>
</template>

<script>
    export default {
        name: "TextChildren",
        props: {
          data: Number
        },
        beforeCreate() {
            console.log('子组件beforeCreate')
        },
        created() {
            console.log('子组件created')
            // this.getData()
        },
        beforeMount() {
            console.log('子组件beforeMount')
        },
        mounted() {
            console.log('子组件mounted')
        },
        beforeDestroy() {
            console.log('子组件beforeDestroy')
        },
        beforeUpdate() {
            console.log('子组件beforeUpdate')
        },
        updated() {
            console.log('子组件updated')
        },
        methods: {
            handleClick() {
                this.$emit('change')
            }
        }
    }
</script>

<style scoped>

</style>