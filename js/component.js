/**
 * Created by Lwang on 2015/11/2.
 */

(function ($) {
    var Pull = function (container, params) {
        if (!(this instanceof Pull)) return new Pull(container, params);
        var s = this;
        params = params || {};

        s.params = params;

        this.container = container;

        this.execute = function () {
            var x = "",                  //水平移动距离
                y = "",                   //上下移动距离
                startX = "",            //触摸点起始水平坐标
                startY = "",            //触摸点起始y坐标
                absX = "",              //x移动距离绝对值
                absY = "",              //y移动距离绝对值
                refreshBool = true,     //刷新bool控制
                loadBool = true,     //刷新bool控制
                rotateBool = true,      //旋转bool控制
                pullUpBool = true,      //上拉更新bool控制
                topBool = true,        //是否拉倒顶了
                module = document.getElementById(this.container);

            module.addEventListener("touchmove", touchMove, false);         //监听移动
            module.addEventListener("touchstart", touchStart, false);       //监听触摸开始
            module.addEventListener("touchend", touchEnd, false);           //监听触摸结束

            /**
             * 触摸开始
             * @param event
             */
            function touchStart(event) {
                var e = event || window.event,
                    touch = e.touches[0];
                //e.preventDefault();
                e.stopPropagation();
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
                //e.preventDefault();
                e.stopPropagation();
                x = touch.pageX - startX;
                y = touch.pageY - startY;
                absX = Math.abs(x);
                absY = Math.abs(y);
                //if($(window).height()>=$(document).height() - $(document).scrollTop()){
                //    if(y<0){
                //        e.preventDefault();
                //    }
                //}else if($(document).scrollTop() == 0){
                //    if(y>0){
                //        e.preventDefault();
                //    }
                //}
                //if(topBool){
                if ($(document).scrollTop() == 0) {
                    if (y > 0) {
                        //$(".activity-icon-hassign").html(y);
                        e.preventDefault();
                    }
                    setTimeout(function () {
                        pullDown();
                    }, 1)
                }
                //}

            if(y<0){
                pullUp(e);
            }
            }

            /**
             * 触摸结束
             * @param event
             */
            function touchEnd(event) {
                var e = event || window.event;
                e.stopPropagation();
                //$("#" + s.container).animate({
                //    "webkitTransform": "translateY(0px)"
                //    //"marginBottom": 0
                //}, 200, "linear",function(){
                //    $("#" + s.container).removeClass("active");
                //});
                $("#" + s.container).addClass("active").css({
                    "webkitTransform": "translateY("+(0)+"px)"
                });

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
                if (pullUpBool == false) {
                    loadMore();
                }
                //执行刷新的执行方法
                if (rotateBool == false) {
                    refresh();
                }

                //各种判定bool值恢复
                refreshBool = true;
                loadBool = true;
                rotateBool = true;
                pullUpBool = true;
                //topBool = true;
                if ($(document).scrollTop() == 0) {
                    e.preventDefault();
                }
            }

            /**
             * 下拉刷新实现回弹效果
             *
             */
            function pullDown() {
                if (y > 0) {
                    $("#" + s.container).removeClass("active").css("webkitTransform", "translateY("+(y / 3 )+"px)");
                    if (y > 160 && y < 200) {
                        if (rotateBool == true) {
                            rotateBool = false;
                            $(".pullIcon").css({
                                "-webkit-transform": "rotate(180deg)"
                            });
                            $(".pullWord").html("松开开始更新！");
                        }
                    }
                }
            }


            /**
             * 加载更多实现回弹效果
             *
             */
            function pullUp(e) {
                var winH = $(window).height(),
                    scrollTop = $(document).scrollTop(),
                    domH = $(document).height();
                if (winH + scrollTop == domH) {
                    if (y < 0) {
                        e.preventDefault();
                        $("#" + s.container).removeClass("active").css("webkitTransform","translateY("+(-absY / 3)+ "px)");

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
            function refresh() {
                if (refreshBool == true) {
                    s.getType(s.params.refreshCallBack) && s.params.refreshCallBack.call(true);
                }
            }


            function loadMore() {
                if (absY > 90) {
                    if (loadBool == true) {
                        s.getType(s.params.loadCallBack) && s.params.loadCallBack.call(true);
                        loadBool = false;
                    }
                }
            }
        };


        //对象new出来执行execute函数；
        this.execute();

    };
    Pull.prototype = {
        getType: function (obj) {
            return Object.prototype.toString.call(obj).toLocaleLowerCase().replace(/\[|\]/g, "").split(" ")[1];
        }
    };

    window.Pull = Pull;
})(jQuery);
