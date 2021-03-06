var text = {
    "4172": {
        title: "",
        desc: "it is description"
    }
};
var sliceNum = 10;
var width, height, centerX, centerY, screenWidth, screenHeight, winWidth = 0, winHeight = 0, sortMode = 1, navpage = 1;
var Evt = {};
Evt.imgMouseOver = function (obj) {
    if ($("li").hasClass("focus")) {
        return;
    }
    $("img").addClass("img_unactive");

    $(obj).css({
//		opacity:1
//		"-webkit-transform":"rotate(0deg)",
//		"z-index":5
    }).addClass("img-active");
};

Evt.imgMouseOut = function (obj) {
    if ($("li").hasClass("focus")) {
        return;
    }
    $("img").removeClass("img_unactive");
    $(obj).css({
//		"-webkit-transform" : $(obj).data("transform"),
//		"z-index" : 0
    }).removeClass("img-active");
};

Evt.showPic = function (id) {
    var interval = 500;
    var time = 0;
    $("a.active").removeClass("active");
    $("#nav_" + id + " a").addClass("active");
    if (navpage != id) {
        var tempid = navpage;
        var maxtime = 0;
        $("#gallery_" + tempid + " img").each(function () {
            var tid = $(this).attr("id");
            var itime = 500 * Math.random();
            maxtime = itime > maxtime ? itime : maxtime;
            setTimeout(function () {
                $("#" + tid).css({
                    opacity: 0
                }).addClass("fadeOut");
            }, itime);
        });
        setTimeout(function () {
            $("#gallery_" + tempid).addClass("hidden");
            $("#gallery_" + tempid + " li").addClass("hidden");
            $("#gallery_" + tempid + " img").each(function () {
                $(this).removeClass("fadeOut").css({
                    opacity: 0
                });
            });
        }, maxtime + 1000);
        time = maxtime + 500;
        navpage = id;
    }
    setTimeout(function () {
        if ($("#gallery_" + id).hasClass("hidden")) {
            $("#gallery_" + id).removeClass("hidden");
            $("#gallery_" + id + " li").each(function () {
                var lid = $(this).attr("id");
                this._showPic(lid, 0);
            });
        } else {
            $("#gallery_" + id + " li").each(function () {
                var lid = $(this).attr("id");
                var time = interval + 500 * Math.random();
                setTimeout(function () {
                    Evt._showPic(lid, time);
                }, time);
                interval += 250;
                //		$(this).fadeIn();
            });
        }
    }, time);
};

Evt._showPic = function (lid, time) {
    var translateX = -400 + parseInt(400 * Math.random()),
        translateY = -400 + parseInt(400 * Math.random()),
        rotate = -45 + 90 * Math.random();
    var $id = $("#" + lid);

    $id.removeClass("hidden").css({
        transform: "translate(" + translateX + "px," + translateY + "px) rotate(0deg)",
        opacity: 0
    });

    setTimeout(function () {
        $id.css({
            transform: "rotate(" + rotate + "deg)",
            opacity: 1
        });
    }, time);
};

Evt.sortPic = function (id) {
    Common.resetDimension();
    var lid = $(".focus").attr("id");
    Evt.toggleFocusPic(lid);
    var num = 1;
    var time = 0;
    $("#" + id + " li").each(function () {
        var id = $(this).attr("id");
        setTimeout(function () {
            var angle = -45 + 90 * Math.random();
            var rand = Math.random();
            var left = 0;
            var top = 0;
            left = clientWidth / 2 + (Math.random() < 0.5 ? -1 : 1 ) * width / 8 * (Math.atan(num) + Math.cos(num) * Math.random()) - 150;
            top = winHeight / 2 + (Math.random() < 0.5 ? -1 : 1 ) * height / 8 * (Math.atan(num) + Math.cos(num) * Math.random()) - 150;
            left = left < 0 ? 0 : left;
            top = top < 0 ? 0 : top;
            $("#" + id).data("transform", 'rotate(' + angle + 'deg)').data("left", left).data("top", top);
            $("#" + id).css({
                "-webkit-transform": "rotate(" + angle + "deg)",
                "left": left,
                "top": top
            });
            num += 1.5;
        }, time);
        time += 200 * Math.random();
    });
};

Evt.sortPic2 = function (id) {
    Common.resetDimension();
    var lid = $(".focus").attr("id");
    Evt.toggleFocusPic(lid);

    var ileft = parseInt((width - parseInt(width / 300, 10) * 300) / 2, 10);
    var itop = 30;
    var time = 0;

    $("#" + id + " li").each(function () {
        //按照屏幕进行排版
//		var ida = $(this).attr("id");
//		setTimeout(function(){
//			$("#" + ida).css({
//				left : ileft,
//				top : itop,
//				"-webkit-transform" : "rotate(0deg)"
//			}).data("sm2_left",ileft).data("sm2_top",itop);
//			ileft += 300;
//			if(width - ileft < 300){
//				itop =  itop + 250;
//				ileft = parseInt((width - parseInt(width / 300) * 300)/2);
//			}
//		},time);
//		time += (100 + 100 * Math.random());

        //按照底部排版
        var lid = $(this).attr("id");
        $("#" + lid).css({
            left: ileft,
            top: height - 160,
            "-webkit-transform": "perspective(650px) rotateY(40deg) scale(0.7)"
        }).data("sm2_left", ileft).data("sm2_top", itop).find("img").addClass("thumbnail").addClass("shadow");
        ileft += 60;
        $("#" + lid).each(function () {
            $(this).hover(function () {
                $(this).css({
                    "-webkit-transform": "perspective(0) scale(1)"
                });
                $(this).nextAll().css({
                    "left": "+=250px"
                });
            }, function () {
                $(this).css({
                    "-webkit-transform": "perspective(650px) rotateY(40deg) scale(0.7)",
                    "left": $(this).data("sm2_left")
                });
                $(this).nextAll().each(function () {
                    $(this).css({
                        "left": $(this).data("sm2_left")
                    });
                });
            });
        });
    });
};

Evt.toggleFocusPic = function (id) {
    $("img").removeClass("img_unactive");
    $("img").removeClass("img-active");
    var ileft = 0, itop = 0;
    itransform = "";
    switch (sortMode) {
        case 1:
            ileft = $("#" + id).data("left");
            itop = $("#" + id).data("top");
            itransform = $("#" + id).data("transform");
            break;
        case 2:
            ileft = $("#" + id).data("sm2_left");
            itop = $("#" + id).data("sm2_top");
            itransform = "rotate(0deg)";
            break;
    }
    if ($("#" + id).hasClass("focus")) {
        $("#" + id).removeClass("focus").css({
            "-webkit-transform": itransform,
            left: ileft,
            top: itop
        });
        $("#" + id + " img").animate({
            height: 200
        }, 500);
        $("#" + id + " a.arrow").addClass("hidden");
        $("#" + id + " .img_title").removeClass("img_title_show");
    } else {
        var vtime = 0;
        if ($("li").hasClass("focus")) {
            vtime = 1000;
            switch (sortMode) {
                case 1:
                    ileft = $(".focus").data("left");
                    itop = $(".focus").data("top");
                    itransform = $(".focus").data("transform");
                    break;
                case 2:
                    ileft = $(".focus").data("sm2_left");
                    itop = $(".focus").data("sm2_top");
                    itransform = "rotate(0deg)";
                    break;
            }
            var oldid = $(".focus").attr("id");
            $("#" + oldid).css({
                "-webkit-transform": itransform,
                left: ileft,
                top: itop
            });
            $("#" + oldid + " img").animate({
                height: 200
            }, 500);
            $("#" + oldid + " .arrow").addClass("hidden");
            $("#" + oldid + " .img_title_show").removeClass("img_title_show");
            $("#" + oldid).removeClass("focus");

        }
        Common.resetDimension();

        var iHeight = (height * 4 / 5) > 500 ? 500 : (height * 4 / 5);
        setTimeout(function () {
            $("#" + id).addClass("focus").css({
                "-webkit-transform": "rotate(0deg)",
                left: centerX - 200,
                top: centerY - (iHeight / 2)
            });
            $("#" + id + " img").animate({
                height: iHeight,
                rotateX: '+=' + (1 * Math.PI),
                rotateY: '+=' + (1 * Math.PI),
                rotateZ: '+=' + (1 * Math.PI)
            }, 1000);
        }, vtime);

        setTimeout(function () {
            if ($("#" + id).hasClass("focus")) {
//				$("#" + id + " img").addClass("shadow");
                $("#" + id + " a.arrow").removeClass("hidden");
                var uid = $("#" + id).attr("data-id");
                $("#" + id + " .img_title_text").html(text[uid].title);
                $("#" + id + " .img_title").addClass("img_title_show");
            }
        }, 2300);
    }
};

Evt.slideImg = function (groupid) {
    var rand, $li = $("#gallery_" + groupid + " li"), id;

    rand = parseInt($li.size() * Math.random(), 10);
    id = $li.eq(rand).attr("data-id");
    $("#nav_" + groupid + " img.slide_img_hide").attr("src", "images/uk" + id + ".jpg").load(function () {
        $("#nav_" + groupid + " img.slide_img_show").removeClass("slide_img_show shadow").addClass("slide_img_hide");
        $(this).removeClass("slide_img_hide").addClass("slide_img_show");
//        var $showImg = $(this);
//        setTimeout(function () {
//            $showImg.addClass("shadow");
//        }, 1200);
    });

    var interval = 3000 + 6000 * Math.random();
    setTimeout(function () {
        Evt.slideImg(groupid);
    }, interval);
};

Evt.imgloaded = function (domobj) {
    $(domobj).css({
        opacity: 1
    });
};

var gallery = [];

$(document).ready(function () {
    Common.initDimension();
    var lis = [];

    var n = 1;
    var num = 4203 - 4172;

    for (var j = 0; j < num; j++) {
        gallery[n] = {};
        lis = [];
        for (var i = 0; i < sliceNum; i++) {
            var id = 4172 + (n - 1) * sliceNum + i;
            var prevlid = "li_" + (i === 0 ? id : (id - 1));
            var nextlid = "li_" + (i == sliceNum - 1 ? id : (id + 1));
            var li = '<li id="li_' + id + '" data-id="' + id + '" class="hidden"><div class="img_title"><span class="img_title_text"></span></div><a class="prev_arrow hidden arrow" href="javascript:Evt.toggleFocusPic(\'' + prevlid + '\');"></a><a class="next_arrow hidden arrow" href="javascript:Evt.toggleFocusPic(\'' + nextlid + '\');"></a><a href="javascript:;"><img id="img_' + id + '" src="images/uk' + id + '.jpg" alt="" onload="Evt.imgloaded(this)" /></a><span class="img_desc"></span></li>';
            lis.push(li);
            j++;
            if (j >= num) {
                break;
            }
        }
//		alert(lis.join(""));
        $("#gallery_contain").prepend('<ul id="gallery_' + n + '" class="gallery">' + lis.join("") + '</ul>');
        $("#nav").prepend('<li id="nav_' + n + '" class="nav"><a href="javascript:Evt.showPic(' + n + ');"><img class=" slide_img_show" /><img class="slide_img_hide" /></a>' + (sliceNum * (n - 1) + 1) + '-' + (sliceNum * n) + '</li>').data("groupid", n);
        gallery[n].data = '<ul id="gallery_' + n + '" class="gallery">' + lis.join("") + '</ul>';
        gallery[n].nav = '<li id="nav_' + n + '" class="nav"><a href="javascript:Evt.showPic(' + n + ');"><img class=" slide_img_show" /><img class="slide_img_hide" /></a>' + (sliceNum * (n - 1) + 1) + '-' + (sliceNum * n) + '</li>';
        Evt.slideImg(n);
        n++;
    }
    $(".gallery img").mouseover(function () {
        Evt.imgMouseOver(this);
    });

    $(".gallery img").mouseout(function () {
        Evt.imgMouseOut(this);
    });

    $(".gallery li img").click(function () {
        var lid = $(this).parent().parent().attr("id");
        Evt.toggleFocusPic(lid);
    });

//	var num = $('.gallery_1 a').size();
    num = 1;
    $('.gallery li').each(function () {
        //alert(this.innerHTML);
        var angle = -45 + 90 * Math.random();
        var left;
        var top;
        left = centerX + (Math.random() < 0.5 ? -1 : 1 ) * width / 8 * (Math.atan(num) + Math.cos(num) * Math.random()) - 150;
        top = centerY + (Math.random() < 0.5 ? -1 : 1 ) * height / 8 * (Math.atan(num) + Math.cos(num) * Math.random()) - 150;
        left = left < 0 ? 0 : left;
        top = top < 0 ? 0 : top;

        $(this).data("transform", 'rotate(' + angle + 'deg)').data("left", left).data("top", top);
        $(this).css({
            transform: "rotate(" + angle + "deg)",
            "left": left,
            "top": top
        });
        num += 1.5;
    });
    navpage = n - 1;
    Evt.showPic(n - 1);
    window.onresize = function () {
        imgSort(sortMode);
    };
});

function imgSort(id) {
    id = (id === undefined) ? 1 : id;
    switch (id) {
        case 1:
            Evt.sortPic("gallery_" + navpage);
            sortMode = 1;
            break;
        case 2:
            Evt.sortPic2("gallery_" + navpage);
            sortMode = 2;
            break;
    }
}