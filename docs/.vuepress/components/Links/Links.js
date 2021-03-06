import Vue from "vue"
import Navbar from "@theme/components/Navbar/Navbar.vue";
import Atom from "./Atom.vue"
import Bg from "./Bg.vue"
import $ from 'jquery'


export default Vue.extend({
    name: 'links',
    components: {
        Navbar,
        Atom,
        Bg,
    },
    data() {
        var linkList = [
                {
                    Avatar: '/Avatar/akasaki.png',
                    Name: 'Miya Akasaki',
                    Address: 'https://focus.akasaki.space/',
                    Comment: '我的大学学长(同时也确实是同学)，曾担任我社2019级技术副主席，而我是他的接班人，此外他还是科协F4成员之一。他是个非常厉害的大佬，看的东西做的东西都很硬核(各种意义上的)，而且拿奖拿到手软，学院里的老师都很器重他。迄今为止我知道他精通Java、C/C++、React等语言，会并发与异步等高级编程技术，并且懂一些底层的原理，我所学到的底层原理大多都是从他这里来的。他从安卓开发到游戏开发再到机器学习都有所涉猎，而且都有很高水平，现在他在学大前端(React)和深度学习。不只是技术上，他在生活上也很有自己的一套，是一位出色的艺术家。顺便提一下，他的交际圈也很广(超出我理解范围的那种广)，而且他在游戏上也特别能卷。非常感谢他教会我很多东西，不嫌弃我还愿意带我玩。',
                    Quote: 'Rubbish CVer | Poor LaTex speaker | Half stack developer | 键圈躺尸砖家'
                },
                {
                    Avatar: '/Avatar/pommespeter.png',
                    Name: 'Pommes Peter',
                    Address: 'https://memo.pommespeter.space',
                    Comment: '我的大学学长，曾担任我社2019级软件部副部长，科协F4成员之一。他的研究领域是基于深度学习的低照度增强。在他有女朋友之前，他是我交流得最多的学长。在软工学习中我遇到的各种困难凡是实在解决不了的都找他，他总是可以很出色地完成，另外，他有个称号叫“软工之爹”，是个经常翻看Linux系统内核源码的硬核男人。他是我专业学习和方向学习的启蒙导师，就是他启发了我去做各学科各知识点的组装与联系。他还教过我操作系统、异步与并发等很多实用的知识，他甚至可以做到深入浅出让我理解重难点。因为他的口头禅是“啊这”，所以我总是戏称他“谢啊这”。没有他的帮助，也就没有今天的我，感谢他带我玩带我飞，让我体会到了世界的精彩。',
                    Quote: 'Hey Guys! Welcome to my repositories.Hope you guys enjoy it. Blessed with good gredients.'
                },
                {
                    Avatar: '/Avatar/AndSonder.jpg',
                    Name: 'And Sonder',
                    Address: 'https://blog.keter.top',
                    Comment: '我的大学学长，曾担任我社2019级软件部部长，是科协F4成员之一。他专注于研究机器学习的对抗攻击，科研能力特别强，而且技术水平也非常高，大大小小的比赛打了个遍，都拿奖拿到手软，甚至到了人在家中坐，奖从天上来的地步。他是我在机器学习方向上的带路人，每当我陷入迷茫困苦的时候他会点拨我，能给我一个比较好的答案。我和他都是机器学习方向上的领域开拓者，不过他有成果了，我还没有。他是个很阔气的大老板，从我入社到现在已经请过我好几杯奶茶了，每次请奶茶的时候还和我聊未来规划，聊人生，在他有女朋友之前我们还经常这样。在社内我们常称他为卢院士。很感谢他非常看重我，认可我，还经常鼓励我。',
                    Quote: 'life is but a span, I use python'
                },
                {
                    Avatar: '/Avatar/zerorains.png',
                    Name: 'Zero Rains',
                    Address: 'https://blog.zerorains.top',
                    Comment: '我的大学学长，曾担任我社2019级机器学习方向负责人，是科协F4成员之一。他专注于研究计算机视觉的语义分割，他虽然有点凶，但待人确实亚萨西，我有不会的都找他。他的二刺螈浓度已经是登峰造极的境界，甚至是在座各位毕生仅见的程度。',
                    Quote: 'I want to be strong. But it seems so hard.'
                },
                {
                    Avatar: '/Avatar/sunwenxiang133.jpeg',
                    Name: 'sunwenxiang133',
                    Address: 'https://sunning.fit/',
                    Comment: '我的大学同学，是我社2020级组织部成员。他的专业领域是游戏开发（实际上是前端开发(x)）。我们经常在一起玩。因为给人的感觉是憨态可掬，所以大家都亲切地叫他小胖。他除了擅长游戏开发之外，还擅长骑自行车、隐身、跑路和睡大觉等等，说句实话有些“技巧”都是他教我的。他技术比较硬核，学习能力特别强，能做到学两三天前端就手撸出来一个手风琴页面，甚至这个页面的开发与制作他都有指导我。所以总会有人说出这句话：“小胖永远滴神！”顺便提一下，小胖是大家的男神，拒绝一切反驳！',
                    Quote: '遇到困难睡大觉'
                },
                {
                    Avatar: '/Avatar/FlyPluche.jpg',
                    Name: 'Fly Pluche',
                    Address: 'https://fly-pluche.github.io',
                    Comment: '我的大学同学，现担任我社20级软件部部长。他的研究领域是机器学习的对抗攻击领域。他是一个实力很强的大佬，我比较期待他在未来某一天能带我起飞。',
                    Quote: 'The man is too lazy to introduce himself.'
                },
                {
                    Avatar: '/Avatar/whitebunny.jpg',
                    Name: 'Whitebunny',
                    Address: 'https://www.cnblogs.com/whitebunny/',
                    Comment: '我的大学同学，是隔壁学院（材料与科学学院）转来的，平时交流很少，我只知道她在做后端开发。',
                    Quote: 'Return Home海压竹枝低复举，风吹山角晦还明'
                },
                {
                    Avatar: '/Avatar/cwt.jpg',
                    Name: '野er',
                    Address: 'https://blog.csdn.net/qq_51415601',
                    Comment: '我的大学同学，同时也是我的舍友。虽然平时我不在宿舍，但我和他聊天还蛮投缘的。他有志于学习大数据技术，不过有些佛系还有点懒。',
                    Quote: '心有猛虎，细嗅蔷薇'
                },
        ]
        var bgImgList = [
            {                
                Avatar: '/Avatar/akasaki.png',
                Bgimg: '/bgimg/focus.akasaki.space.jpg',
            },
            {                
                Avatar: '/Avatar/pommespeter.png',
                Bgimg: '/bgimg/memo.pommespeter.space.png',
            },
            {                
                Avatar: '/Avatar/AndSonder.jpg',
                Bgimg: '/bgimg/blog.keter.top.jpg',
            },
            {                
                Avatar: '/Avatar/zerorains.png',
                Bgimg: '/bgimg/blog.zerorains.top.png',
            },
            {                
                Avatar: '/Avatar/sunwenxiang133.jpeg',
                Bgimg: '/bgimg/sunning.fit.jpg',
            },
            {                
                Avatar: '/Avatar/FlyPluche.jpg',
                Bgimg: '/bgimg/fly-pluche.github.io.jpg',
            },
            {                
                Avatar: '/Avatar/whitebunny.jpg',
                Bgimg: '/bgimg/www.cnblogs.com.whitebunny.png',
            },
            {                
                Avatar: '/Avatar/cwt.jpg',
                Bgimg: '/bgimg/blog.csdn.net.qq_51415601.png',
            },
        ]
        return {linkList, bgImgList};
    },
    mounted(){
        (function () {
            $('#wrap ul').children('.Atom').mouseover(function () {
                if (!$(this).hasClass('curr')) {
                    $('#wrap ul .Atom').removeClass('curr');
                    $('#wrap ul .Atom').css('position', 'static');
                    $('#wrap ul .Atom .briefInfo').css('display', 'none');
                    $('#wrap ul .Atom .briefInfo').css('position', 'static');
                    $('.Blog').css('display', 'inline');
                    $('.Avatar-lg').css('display', 'none');
                    $('.Comment p').css('display', 'none');
    
                    $(this).addClass('curr');
                    $('#wrap ul div').css('position', 'relative');
                    $(this).children('.briefInfo').css('position', 'absolute');
                    $(this).children('.briefInfo').css('display', 'block');
                    $(this).children('.Blog').css('display', 'none');
                    $(this).find('.Avatar-lg').css('display', 'block');
                    $(this).find('.Comment p').css('display', 'block');

    
                    $('#wrap ul .Atom').each(function (index) {
                        if ($(this).hasClass('curr')) {
                            $('.bg').fadeOut(300);
                            $('.bg:eq(' + index + ')').fadeIn(500);
                        }
                    });
                    $('.curr').stop().animate({
                        width: 800
                    }, 500, 'linear');
                    $('#wrap .Atom').not('.curr').stop().animate({
                        width: 97
                    }, 500, 'linear');
                }
            });
        })();
    },
    methods:{
        getIndex(object, objArr){
            return objArr.indexOf(object);
        },
        // mouseHover(index){
        //     // let item = document.querySelector('.bg-box-'+index);
        //     // this.fadeIn(index,item, 6);
        //     if (!$(this).hasClass('curr')) {
        //         $('#wrap ul .Atom').removeClass('curr');
        //         $('#wrap ul .Atom').css('position', 'static');
        //         $('#wrap ul .Atom .briefInfo').css('display', 'none');
        //         $('#wrap ul .Atom .briefInfo').css('position', 'static');
        //         $('.Blog').css('display', 'inline');
        //         $('.Avatar-lg').css('display', 'none');

        //         $(this).addClass('curr');
        //         $('#wrap ul div').css('position', 'relative');
        //         $(this).children('.briefInfo').css('position', 'absolute');
        //         $(this).children('.briefInfo').css('display', 'block');
        //         $(this).children('.Blog').css('display', 'none');
        //         $(this).find('.Avatar-lg').css('display', 'block');

        //         // 切换背景
        //         $('#wrap ul .Atom').each(function (index) {
        //             if ($(this).hasClass('curr')) {
        //                 $('.bg').fadeOut(300);
        //                 $('.bg:eq(' + index + ')').fadeIn(500);
        //             }
        //         });
        //         $('.curr').stop().animate({
        //             width: 800
        //         }, 500, 'linear');
        //         $('#wrap .Atom').not('.curr').stop().animate({
        //             width: 97
        //         }, 500, 'linear');
        //     }
        // },
        // mouseLeave(index){
        //     // let item = document.querySelector('.bg-box-'+index);
        //     // this.fadeOut(index,item, 20);
        // },

        // fadeIn(index,elemt, speed) { //淡入 0 ~ 1
        //     if(elemt.style.opacity == 0 && elemt.style.opacity != "") {
        //         var speed = speed || 16.6; //默认速度为16.6ms
        //         var num = 0; //累加器
        //         var timer = setInterval(function() {
        //             num++;
        //             // if(index==1){
        //             //     console.log(index+"in"+num);
        //             // }
        //             elemt.style.opacity = num / 20;
        //             if(num >= 20) {
        //                 clearInterval(timer);
        //             }
        //         }, speed);
        //     }
        // },
        // fadeOut(index,elemt, speed) { //淡出 1 ~ 0
        //     if(elemt.style.opacity == 1 || elemt.style.opacity == "") {
        //         var speed = speed || 16.6; //默认速度为16.6ms
        //         var num = 20; //累减器
        //         console.log(this.linkList);
        //         if(!this.fade.get()){
        //             var timer2 = setInterval(function() {
        //                 num--;
        //                 if(index==1){
        //                     console.log(index+"out"+num);
        //                 }
                        
        //                 elemt.style.opacity = num / 20;
        //                 if(num == 0) {
        //                     clearInterval(timer2);
        //                 }
        //             }, speed);
        //         }else{

        //         }
          
        //     }
        // },
        // fadeToggle(elemt, speed) {
        //     var speed = speed || 16.6; //默认速度为16.6ms
        //     if(elemt.style.opacity == 0 && elemt.style.opacity != "") {
        //         var num = 0; //累加器
        //         var timer = setInterval(function() {
        //             num++;
        //             elemt.style.opacity = num / 20;
        //             if(num >= 20) {
        //                 clearInterval(timer);
        //             }
        //         }, speed);
        //     }else if(elemt.style.opacity == 1 || elemt.style.opacity == "") {
        //         var num = 20; //累剪器
        //         var timer = setInterval(function() {
        //             num--;
        //             elemt.style.opacity = num / 20;
        //             if(num == 0) {
        //                 clearInterval(timer);
        //             }
        //         }, speed);
        //     }
        // },

        // fadeOut(el){
        //     el.style.opacity = 1;
          
        //     (function fade() {
        //       if ((el.style.opacity -= .08) < 0) {
        //         el.style.display = "none";
        //       } else {
        //         requestAnimationFrame(fade);
        //       }
        //     })();
        // },
        // fadeIn(el){
        //     el.style.opacity = 0;
        //     el.style.display = "block";
          
        //     (function fade() {
        //       var val = parseFloat(el.style.opacity);
        //       if (!((val += .08) > 1)) {
        //         el.style.opacity = val;
        //         requestAnimationFrame(fade);
        //       }
        //     })();
        // }
    }
})