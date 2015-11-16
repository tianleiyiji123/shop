/**
 * Created by Lwang on 2015/11/2.
 */

var x = "",                  //水平移动距离
    y = "",                   //上下移动距离
    startX = "",            //触摸点起始水平坐标
    startY = "",            //触摸点起始y坐标
    absX = "",              //x移动距离绝对值
    absY = "",              //y移动距离绝对值
    refreshBool = true,     //刷新bool控制
    loadBool = true,     //刷新bool控制
    rotateBool = true,      //旋转bool控制
    pullUpBool = true;      //上拉更新bool控制


var module = document.getElementById("moveModule");    //模块
document.addEventListener("touchmove", touchMove, false);         //监听移动
document.addEventListener("touchstart", touchStart, false);       //监听触摸开始
document.addEventListener("touchend", touchEnd, false);           //监听触摸结束

/**
 * 触摸开始
 * @param event
 */
function touchStart(event) {
    var e = event || window.event,
        touch = e.touches[0];
    //e.preventDefault();
    startX = touch.pageX;
    startY = touch.pageY;
}

/**
 * 触摸移动
 * @param event
 */
function touchMove(event) {
    var e = event || window.event,
        touch = e.touches[0];
    x = touch.pageX - startX;
    y = touch.pageY - startY;
    absX = Math.abs(x);
    absY = Math.abs(y);
    //console.log(absY);
    if (y > 0) {
        module.style.marginTop = (y / 3 - 44) + "px";
        if (y > 160 && y < 200) {
            if (rotateBool == true) {
                rotateBool = false;
                $(".pullIcon").css({
                    "-webkit-transform": "rotate(180deg)"
                });
                $(".pullWord").html("松开开始更新！");
            }
        }
    } else {

    }
    loadMore();

}

/**
 * 触摸结束
 * @param event
 */
function touchEnd(event) {
    var e = event || window.event;
    $("#moveModule").animate({
        "marginTop": -44,
        "marginBottom": 0
    }, 200, "linear");

    $(".pullIcon").css({
        "webkitTransform": "rotate(0deg)"
    });


    $(".pushIcon").css({
        "webkitTransform": "rotate(-180deg)"
    });
    setTimeout(function () {
        $(".pullWord").html("下拉刷新....");
        $(".pushWord").html("上拉加载更多....");
    }, 200);

    //执行加载更多执行方法
    if(pullUpBool == false){
        loadMoreExecute(callback1);
    }
    //执行刷新的执行方法
    if(rotateBool == false){
        refresh(callback2);
    }

    //各种判定bool值恢复
    refreshBool = true;
    loadBool = true;
    rotateBool = true;
    pullUpBool = true;
}

/**
 * 加载更多
 * callback 回调函数
 */
function loadMore() {
    var winH = $(window).height(),
        scrollTop = $(document).scrollTop(),
        domH = $(document).height();
    if (winH + scrollTop == domH) {
        if (y < 0) {
            module.style.marginBottom = (absY / 3) + "px";
            if (absY > 70) {
                if (pullUpBool == true) {
                    pullUpBool = false;
                    $(".pushIcon").css({
                        "-webkit-transform": "rotate(0deg)"
                    });
                    $(".pushWord").html("松开开始加载更多！");

                }
            }
        }
    }
}

/**
 * 刷新函数
 * callback 回调函数
 */
function refresh(callback) {
    if (refreshBool == true) {
        Util.getType(callback) && callback.call(true);
    }
}


function loadMoreExecute(callback){
    if(absY > 90){
        if (loadBool == true) {
            Util.getType(callback) && callback.call(true);
            loadBool = false;
        }
    }
}


//ajax调用函数写在这里

function callback1(){
    console.log("加载更多！")
}
function callback2(){
    console.log("下拉刷新！")
}
