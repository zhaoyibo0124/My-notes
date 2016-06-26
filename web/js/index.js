/**
 * 选项卡
 */
window.onload = function () {
    var oBanner = document.getElementById('banner');
    var oImgWrap = oBanner.getElementsByTagName('div')[0];
    var aDiv = oImgWrap.getElementsByTagName('div');
    var aImg = oImgWrap.getElementsByTagName('img');
    var oUl = oBanner.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var oBtnLeft = oBanner.getElementsByTagName('a')[0];
    var oBtnRight = oBanner.getElementsByTagName('a')[1];
    var btnI=document.getElementById("btnI");
    var btnA=document.getElementById("btnA");
    var autoTimer = null;
    var step = 0;
    var interval = 2000;
    getData();
    function getData() {
        var xml = new XMLHttpRequest();
        xml.open('get', 'json/data.txt', false);
        xml.onreadystatechange = function () {
            if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
                data = utils.jsonParse(xml.responseText);
            }
        };
        xml.send(null);
    }

    //2.绑定数据
    bind();
    function bind() {
        var str = '';
        //var str2 = '';
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str += '<div><img src="" realImg="' + curData.imgSrc + '" alt=""/></div>';
            //str2+='<span><i>'+curData.id+'</i><em>/5</em></span>';
        }
        oImgWrap.innerHTML += str;
        //btnI.innerHTML+=str2;
    }

    //3.延迟加载
    lazyImg();
    function lazyImg() {
        for (var i = 0; i < aImg.length; i++) {
            (function (index) {
                var curImg = aImg[index];
                var oImg = new Image;
                oImg.src = curImg.getAttribute('realImg');
                oImg.onload = function () {
                    curImg.src = this.src;
                    oImg = null;
                    //默认先让第一张图片显示
                    utils.css(aDiv[0], 'zIndex', 1);
                    zhufengAnimate(aDiv[0], {opacity: 1}, 1000)
                }
            })(i);
        }
    }

    window.clearInterval(autoTimer);
    autoTimer = setInterval(setMove, interval);
    function setMove() {
        if (step >= aDiv.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < aDiv.length; i++) {
            var curDiv = aDiv[i];
            if (i === step) {
                utils.css(curDiv, 'zIndex', 1);
                zhufengAnimate(oImgWrap, {'left': -step*1903}, 800, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        utils.css(siblings[i], {'opacity': 1,"zIndex":1});
                    }
                });
                continue;
            }
            utils.css(curDiv, 'zIndex', 1)
        }
        //bannerTip();
    }

    function bannerTip(){
        var tmpStep=step>=data.length?0:step;
        for(var i=0; i<=data.length; i++){
            var curLi=data[i];
            if(i===tmpStep){
                btnI.innerHTML=curLi.id;
                btnA.innerHTML='<p>'+curLi["desc"]+'</p><p>'+curLi["author"]+'</p>'
            }
        }
    }
    /*handleChange();
     function handleChange(){
     for(var i=0; i<aLi.length; i++){
     var curLi=aLi[i];
     curLi.index=i;
     curLi.onclick=function(){
     step=this.index;
     setBanner();
     }
     }
     }*/
    oBanner.onmouseover=function(){
        clearInterval(autoTimer);
        oBtnLeft.style.display='block';
        oBtnRight.style.display='block';
    };
    oBanner.onmouseout=function(){
        autoTimer=setInterval(setMove,interval);
        oBtnLeft.style.display='none';
        oBtnRight.style.display='none';
    };
    oBtnRight.onclick = setMove;
    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aDiv.length;
        }
        step--;
        setBanner();
    }
};
/**
 * 二级菜单
 */
(function tab() {
    var community = document.getElementById("community");
    var comList = document.getElementById("comList");
    var oLi = comList.getElementsByTagName("li")[0];
    var hotBox = document.getElementById("hotbox");
    var navLi = document.getElementById("navli8");
    var resUl = document.getElementById("resUl");
    community.onmouseenter = function () {
        comList.style.display = "block";
        oLi.onmouseenter = function () {
            utils.addClass(oLi, "bg");
            hotBox.style.display = "block";
        }
    };
    community.onmouseleave = function () {
        comList.style.display = "none";
        utils.removeClass(oLi, "bg");
        hotBox.style.display = "none";
    };
    oLi.onmouseleave = function () {
        //hotBox.style.display="none";
    };

    navLi.onmouseenter = function () {
        resUl.style.display = "block";
    };
    navLi.onmouseleave = function () {
        resUl.style.display = "none";
    }
})();
/**
 * 搜索菜单
 */
(function searchMenu() {
    var oDiv = document.getElementById("tab");
    var place = oDiv.getElementsByTagName("a")[0];
    var panel = document.getElementById("panel");
    var plan = oDiv.getElementsByTagName("a")[1];
    var panelCenter = document.getElementById("panel-center");
    var z = oDiv.getElementsByTagName("a")[2];
    var panelRight = document.getElementById("panel-right");
    place.onclick = function () {
        zhufengAnimate(panel, {"display": "block"}, 100, 3, function () {
            panelCenter.style.display = "none";
            panelRight.style.display = "none";

        })
    };
    plan.onclick = function () {
        zhufengAnimate(panelCenter, {"display": "block"}, 100, 3, function () {
            panel.style.display = "none";
            panelRight.style.display = "none";
        })
    };
    z.onclick = function () {
        zhufengAnimate(panelRight, {"display": "block"}, 100, 3, function () {
            panel.style.display = "none";
            panelCenter.style.display = "none";

        })
    }
})()
/**
 * 搜索目的地
 */
function search(){
    var placesearch_txt = document.getElementById("placesearch_txt");
    var history = document.getElementById("history");
    document.body.onclick = function (ev) {
        ev = ev || window.event;
        var tar = ev.target || ev.srcElement;
        var id=tar.id;
        if (id&&tar.tagName.toUpperCase()=="INPUT") {
            history.style.display = "block"
        }else{
            history.style.display = "none"
        }
    }
};
search();

function bg (){
    var inner=document.getElementById("inter-inner");
    var oLis=inner.getElementsByTagName("li");
    var imgmasks=utils.getByClass(inner,"imgmask");
    var liClose=utils.getByClass(inner,"close");
    for(var i=0;i<oLis.length;i++){
        oLis[i].index=i;
        oLis[i].onmouseenter=function(){
            liClose[this.index].style.display="block";
            zhufengAnimate(imgmasks[this.index],{"display":"block","width":275,"height":185,"opacity":0.6},100,2)
        };
        oLis[i].onmouseleave=function(){
            liClose[this.index].style.display="none";
            imgmasks[this.index].style.display="none";
        }
    }
}
bg ();



