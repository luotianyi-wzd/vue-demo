import fetch from './../axios'
export function request(current) {
    return fetch('/api/about/getData', {params: {pageNum: current}}, 'get')
}
