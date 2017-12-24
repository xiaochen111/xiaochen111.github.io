var myAudio = $("audio")[0];


var player = {
    play:false, //false 暂停  / true 播放
    num:0,// 第几首歌曲
    flagProgress:'',//进度标记 
    flagTime:'',//时间标记 
    singerInfo:[{singer:'任贤齐',song:'情非得已',src:'./file/feeForced.mp3'},{singer:'任贤齐',song:'有梦的人',src:'./file/dream.mp3'}],//歌名 歌手信息
    initSingerInfo:function(){ //初始化歌名 歌手信息
        var num = this.num;
        console.log(num)
        $('audio').attr('src',this.singerInfo[num].src);
        var htmlStr = this.singerInfo[num].singer+"—"+this.singerInfo[num].song
        $('.singer').html(htmlStr);
    },
    playFn:function(obj){ //播放方法
        if(!this.play){
            myAudio.play();
            this.basebarFn();
            $(obj).removeClass('fa-play').addClass('fa-pause');
        }else{
            myAudio.pause();
            clearInterval(this.flagProgress);
            clearInterval(this.flagTime)
            $(obj).removeClass('fa-pause').addClass('fa-play');
        }
        this.play = !this.play;
    },
    progressFn:function(){
        var length = myAudio.currentTime/myAudio.duration;
        $('.progressbar').css('width',length*100+"%");
        if(myAudio.currentTime == myAudio.duration){
            player.nextSongFn();
        }
    },
    nextSongFn:function(){
        this.num++;
        if(this.num==this.singerInfo.length){
            this.num = 0;
        }
        this.initSingerInfo();
        myAudio.play();
        var basebarfn = this.basebarFn;
        setTimeout(basebarfn,100);
        // this.basebarFn();
    },
    upperSong:function(){
        this.num--;
        if(this.num===-1){
            this.num = this.singerInfo.length-1;
        }
        this.initSingerInfo();
        myAudio.play();
        var basebarfn = this.basebarFn;
        setTimeout(basebarfn,100);
    },
    basebarFn:function(){
        var end = parseInt(myAudio.duration);
        var endFormate = player.formate(end)
        $('.end').html(endFormate);
        this.flagProgress = setInterval(this.progressFn,500);//进度条
        this.flagTime = setInterval(this.timeFn,1000)
    },
    timeFn:function(){
        var start = parseInt(myAudio.currentTime);
        var startFormate = player.formate(start);
        $('.start').html(startFormate)
    },
    formate:function(num){ //时间格式化
        var str = '';
        if(num<10){
            str = '00:0'+num;
        }else if(num>=10&&num<60){
            str = '00:'+num;
        }else if(num>=60){
            var s = num%60;
            var m = Math.floor(num/60);
            if(s<10){
                str = '0'+m+':0'+s;
            }else{
                str = '0'+m+':'+s;
            }
        }
        return str
    }
}


player.initSingerInfo();






