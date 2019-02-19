//Vue 图片懒加载
export default (Vue , options = {})=>{
    if(!Array.prototype.remove){
        Array.prototype.remove = function(item){
            if(!this.length) return;
            var index = this.indexOf(item);
            if(index > -1){
                this.splice(index, 1);
                return this;
            }
        }
    }

    var listenList = [];
    var imageCatcheList = [];

    const isAlredyLoad = (imageSrc) => {
        if(imageCatcheList.indexOf(imageSrc) > -1){
            return true;
        } else {
            return false;
        }
    }
    //检测图片是否可以加载，如果可以则进行加载
    const isCanShow = (item) =>{
        var ele = item.ele;
        var src = item.src;
        //图片距离页面顶部的距离
        var top = ele.getBoundingClientRect().top;
        //页面可视区域的高度
        var windowHeight = window.innerHeight;
        // 已经进入了可视区域下一屏
        if(top - windowHeight < windowHeight){
            var image = new Image();
            image.src = src;
            image.onload = function() {
                ele.src = src;
                ele.style.background = 'none';
                imageCatcheList.push(src);
                listenList.remove(item);
            }
            image.onerror = function() {
                listenList.remove(item);
            }
            return true;
        } else {
            return false;
        }
    };

    const onListenScroll = () =>{
        window.addEventListener('scroll',function(){
            var length = listenList.length;
            for(let i = 0; i < length; i++){
                isCanShow(listenList[i]);
            }
        })
    }
    //Vue 指令最终的方法
    const addListener = (ele,binding) =>{
        //绑定的图片地址
        var imageSrc = binding.value;
        //如果已经加载过，则无需重新加载，直接将src赋值
        if(isAlredyLoad(imageSrc)){
            ele.src = imageSrc;
            return false;
        }
        var item = {
            ele: ele,
            src: imageSrc
        }
        //图片显示默认的图片
        var whr = ele.offsetWidth / ele.offsetHeight;
        var bgSize = whr > 1.4 ? 'auto 31.25%' : '31.25%';
        ele.style.background = '#f8f8f8';
        //再看看是否可以显示此图片
        if(isCanShow(item)){
            return
        }
        //否则将图片地址和元素均放入监听的lisenList里
        listenList.push(item);

        //然后开始监听页面scroll事件
        onListenScroll();
    }

    Vue.directive('lazyload',{
        inserted: addListener,
        updated: addListener
    })
}