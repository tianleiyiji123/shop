/**
 * Created by wanglei on 2015/11/1.
 */
var filterId = "";      //点击筛选返回的值，也就是要传个后台的值

$(function(){
    $("#push-all").click(function(event){
        event.stopPropagation();
        $(".push-selection").fadeToggle();
    });

$("#order-con").click(function(){
    alert("aaa");
})

$(".push-selection>a").click(function(){
    var _index = $(this).index();
        if(_index == 0){
        filterId = "0";
    }else if(_index == 1){
       filterId = "1";
    }else if(_index == 2){
       filterId = "2";
    }
    $(".push-selection").fadeOut();
    })
});

      var time_Index;
$(function(){
    $(".activity-tab .nav-tab li,.order-tab .nav-tab li").click(function(){
        var _index = $(this).index(),
            selector="";
        switch (_index){
            case 0: selector = "alerw-1";
                break;
            case 1: selector = "alerw-2";
                break;
            case 2: selector = "alerw-3";
                break;
            case 3: selector = "alerw-4";
                break;
        }
        $(".allAlerw").find("."+selector).fadeToggle().end().find(".alerw").not("."+selector).hide();
    });
    $("#timeOne").change(function(){
        $(".act-sta-t1").find("span").html("").html("起始日期&nbsp;&nbsp;&nbsp;&nbsp;"+ $(this).val());
    });
    $("#timeTwo").change(function(){
        $(".act-end-t1").find("span").html("").html("终止日期&nbsp;&nbsp;&nbsp;&nbsp;"+ $(this).val());
    });
    $("#timeThree").change(function(){
        $(".act-sta-t2").find("span").html("").html("起始日期&nbsp;&nbsp;&nbsp;&nbsp;"+ $(this).val());
    });
    $("#timeFour").change(function(){
        $(".act-end-t2").find("span").html("").html("终止日期&nbsp;&nbsp;&nbsp;&nbsp;"+ $(this).val());
    });
    $("#timeFive").change(function(){
        $(".act-end-t3").find("em").html("").html($(this).val());
    });
    $("#actTime").click(function(){
        $("#time-index li").click(function(){
            time_Index=$(this).index();
            alert(time_Index);
        })
    })
    $("#sub-btn").click(function(){
        $(".check-pop,.act-start-time,.act-end-time,.order-start-time,.order-end-time,.order-num").hide();
    })
    $(".confirm-right").click(function(){
        $(".check-pop").hide();
    })

});


/*获取屏幕高度*/
  function popBg(){
      var domHg=$(window).height();
      $(".check-pop").css("height",domHg).css("display","block");
  }

/*actname*/
$(function(){
    $(".shop-list-info button").click(function(){
        $(".check-btn").css("background","url(\"images/check-2.png\") no-repeat right");
    });
});



