const mixin = {
    methods: {
        formatDate(date) {
            const Y = date.getFullYear()
            const M = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
            const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

            return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
        }
    }
}

export default mixin