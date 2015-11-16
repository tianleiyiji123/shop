/**
 * Created by Lwang on 2015/11/2.
 */

(function ($) {
    var Pull = function (container, params) {
        if (!(this instanceof Pull)) return new Pull(container, params);
        var s = this;
        var defaultInit = {
            containH: 44
        };

        params = params || {};
        s.mergeObj(params,defaultInit);


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
                pullUpBool = true;      //上拉更新bool控制


            document.getElementById(this.container).addEventListener("touchmove", touchMove, false);         //监听移动
            document.getElementById(this.container).addEventListener("touchstart", touchStart, false);       //监听触摸开始
            document.getElementById(this.container).addEventListener("touchend", touchEnd, false);           //监听触摸结束

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


                //if (y < 0) {
                //    if ($(document).scrollTop() == 0) {
                //        e.preventDefault();
                //        document.removeEventListener("touchmove", function (event) {
                //            event.preventDefault();
                //        }, false);
                //    }
                //} else {
                //    if ($(document).scrollTop() == 0) {
                //        //e.preventDefault();
                //        document.removeEventListener("touchmove", function (event) {
                //            event.preventDefault();
                //        }, false);
                //    }
                //}


                pullDown();
                pullUp();
            }

            /**
             * 触摸结束
             * @param event
             */
            function touchEnd(event) {
                var e = event || window.event;
                $("#" + s.container).animate({
                    "marginTop": -s.params.containH,
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
            }

            /**
             * 下拉刷新实现回弹效果
             *
             */
            function pullDown() {
                if (y > 0) {
                    $("#" + s.container).css("margin-top", y / 3 - s.params.containH);
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
            function pullUp() {
                var winH = $(window).height(),
                    scrollTop = $(document).scrollTop(),
                    domH = $(document).height();
                if (winH + scrollTop == domH) {
                    if (y < 0) {
                        $("#" + s.container).css("margin-bottom", absY / 3);
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
        },
        mergeObj: function (obj1, obj2) {
            if(this.getType(obj1) == "object" && this.getType(obj2) == "object"){
                for(var i in obj2){
                    obj1[i] = obj2[i];
                }
            }
            return obj1;
        }

    };


    window.Pull = Pull;
})(jQuery);
