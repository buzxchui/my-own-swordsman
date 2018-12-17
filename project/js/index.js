$(document).ready(function () {
	
	//<简介的展开与收起 
	
	var len=180;
	var content=$('.brief-intro span').text();
	var a=$('<a href="javascript:;"></a>');
	var span=$('<span></span>');
	a.text(' ...展开').css({'color':'#6aa826'});
	span.html(content.substring(0,len));
	if (content.length>len) {
		$('.a').hide();
		$('.brief-intro').append(span).append(a);
		a.append('<i>></i>');
		$('.brief-intro i').css({
			display:'inline-block',
			transform:'rotate(90deg) scale(1,1.5)',
			position:'relative',
			left:2,
			top:2,
			fontStyle:'normal'
		});
		a.on('click',function () {
		if(a.html().indexOf("展开")>0){ 
			a.html("收起<i>></i>");
			$(".a").show();
			span.hide();
			$('.brief-intro i').css({
				display:'inline-block',
				transform:'rotate(270deg) scale(1,1.5)',
				position:'relative',
				left:2,
				top:2,
				fontStyle:'normal'
			});
		}else{
			a.html(" ... 展开<i>></i>");
			span.show();
			$('.a').hide();
			$('.brief-intro i').css({
				display:'inline-block',
				transform:'rotate(90deg) scale(1,1.5)',
				position:'relative',
				left:2,
				top:2,
				fontStyle:'normal'
			});
		}
	});
	}
	
	//简介的展开与收起 >
	
	//<轮播图的相关功能 
	
	var img=$(".caro-img");
	var index=0;
	var timer=null;
	$(".caro-img").each(function (i) {
		$(".dot").append('<span class="dot-in"></span>');
	});
	$(".dot-in:first").addClass('current');
	timer=setInterval(function () {
		img.eq(index).animate({
			'left':-500
		});
		index++;
		if (index>img.length-1) {
			index=0;
		};
		img.eq(index).animate({
			'left':500
		},0).animate({
			left:0
		});
		if (index===0) {
			$(".dot-in").eq(img.length-1).removeClass('current');
			$(".dot-in").eq(index).addClass('current');
		}else{
			$(".dot-in").eq(index-1).removeClass('current');
			$(".dot-in").eq(index).addClass('current');
		}
	},4000);
	$(".caro-in").mouseenter(function () {
		clearInterval(timer);
	}).mouseleave(function () {
		timer=setInterval(function () {
		img.eq(index).animate({
			'left':-500
		});
		index++;
		if (index>img.length-1) {
			index=0;
		};
		img.eq(index).animate({
			'left':500
		},0).animate({
			left:0
		});
		if (index===0) {
			$(".dot-in").eq(img.length-1).removeClass('current');
			$(".dot-in").eq(index).addClass('current');
		}else{
			$(".dot-in").eq(index-1).removeClass('current');
			$(".dot-in").eq(index).addClass('current');
		}
	},4000);
	});
	$(".caro-l").on('click',function () {
		img.eq(index).animate({
			'left':500
		});
		index--;
		if (index<0) {
			index=img.length-1;
		};
		img.eq(index).css({
			zIndex:12
		}).animate({
			'left':-500
		},0).animate({
			left:0
		});
		if (index===img.length-1) {
			$(".dot-in").eq(0).removeClass('current');
			$(".dot-in").eq(index).addClass('current');
		}else{
			$(".dot-in").eq(index+1).removeClass('current');
			$(".dot-in").eq(index).addClass('current');
		}
	});
	$(".caro-r").on('click',function () {
		img.eq(index).animate({
			'left':-500
		});
		index++;
		if (index>img.length-1) {
			index=0;
		};
		img.eq(index).animate({
			'left':500
		},0).animate({
			left:0
		});
		if (index===0) {
			$(".dot-in").eq(img.length-1).removeClass('current');
			$(".dot-in").eq(index).addClass('current');
		}else{
			$(".dot-in").eq(index-1).removeClass('current');
			$(".dot-in").eq(index).addClass('current');
		}
	});
	$(".cont-top").find('li:last a').on('click',function () {
		$(".list-l").html(' 分集剧情');
		$(".list-r").hide();
		$(".cont-bottom").hide();
		$(".cont-synopsis").show();
		$(this).parent().addClass('selected').prev().removeClass('selected');
		$(".list-num").show();
		$(".cont-num").hide();
	});
	$(".cont-top").find('li:first a').on('click',function () {
		$(".list-l").html(' 剧集列表 ( 更新至<span>80</span>集/共80集 ) ');
		$(".list-r").show();
		
		$(".cont-synopsis").hide();
		$(this).parent().addClass('selected').next().removeClass('selected');
		$(".list-num").hide();
		if ($(".list-r").find('li:first').hasClass('selected')) {
			$(".cont-num").show();
			$(".cont-pic").show();
		}else{
			$(".cont-bottom").show();
		}
	});

	//轮播图的相关功能 >
	

	//<剧集列表与分集剧情按钮的点击、切换及其下的各类操作
	
	$(".list-num").find('li').each(function () {
		$(this).children('a').on('click',function () {
			var numIndex=$(this).parent().index();
			$(this).parent().siblings('.selected').removeClass('selected');
			$(this).parent().addClass('selected');
			$(".synopsis").find('dl').hide().eq(numIndex).show();
		});
	});
	$(".list-r").find('li:first a').on('click',function () {
		$(".cont-bottom").hide();
		$(".cont-num").show();
		$(".cont-pic").show();
		$(this).parent().addClass('selected').next().removeClass('selected');

	//<数字选集空白部分的图片瀑布流实现 
	
		var c=$(".cont-pic").children();
		var col=parseInt($('.cont-pic').width()/c.eq(0).outerWidth());
		var heightArr=[],minH=0,minI=0;
		setTimeout(function () {
			c.each(function (i) {
				if (i<col) {
					heightArr.push(c.eq(i).innerHeight());
				}else{
					minH = _.min(heightArr);
					minI = getIndex(heightArr,minH);
					c.eq(i).css({
						position:'absolute',
						left:minI*c.eq(0).outerWidth(),
						top:minH
					});
					heightArr[minI]+=c.eq(i).outerHeight();
				}
			});
		},100);

	//数字选集空白部分的图片瀑布流实现 >
	
	});
	$(".list-r").find('li:last a').on('click',function () {
		$(".cont-bottom").show();
		$(".cont-num").hide();
		$(".cont-pic").hide();
		$(this).parent().addClass('selected').prev().removeClass('selected');
	});

	//<模拟播放器播放武林外传的进度条 
	
	var numM=parseInt(45+Math.random()*3);
	var numS=parseInt(Math.random()*60);
	numS=numS<10?'0'+numS:numS;
	$("em:last").html(numM+':'+numS);
	var timer1=null,timer2=null;
	var index1=1;
	var index2=1;
	timer1=setInterval(function () {
		$(".caro-play em:first i:last").html('0'+index1);

		if (index1>59) {
			index1=0;
			$(".caro-play em:first i:last").html('0'+index1);
			if (index2<=9) {
				$(".caro-play em:first i:first").html('0'+index2);
			}else{
				$(".caro-play em:first i:first").html(index2);
			}
			index2++;
		};
		if (index1>9) {
			$(".caro-play em:first i:last").html(index1);
		};
		index1++;
	},1000);
	var index3=parseInt($("li").width()/(numM*60+numS)*100)/100;
	var sum=0;
	timer2=setInterval(function () {
		sum+=index3;
		$(".caro-play li span").css({
			'width':sum
		});
	},1000);

	//模拟播放器播放武林外传的进度条 >
	
	//<吸顶效果 
	
	var scrollH=$(".cont-top").offset().top;
	$(document).scroll(function () {
		if ($(document).scrollTop()>scrollH) {
			$(".cont-top").css({
				position:'fixed',
				right:0,
				top:-20,
				zIndex:100,
				backgroundColor:'#f9f9f9',
				borderBottom: '2px solid #ededed',
			}).children('ul').css({
				borderBottom:'none'
			});
		}else{
			$(".cont-top").css({
				position:'static',
				borderBottom:'none'

			}).children('ul').css({
				borderBottom: '2px solid #ededed'
			});
		}
		if ($(document).scrollTop()>$(window).height()) {
			$(".cont-upto").show();
		}else{
			$(".cont-upto").hide();
		}
	});
	
	//吸顶效果 >
	
	//<返回顶部按钮的动画效果
	
	$(".cont-upto").mouseenter(function () {
		$(this).html('返回顶部').animate({
			width:87,
			paddingLeft:10
		},100)
	}).mouseleave(function () {
		$(this).html('').animate({
			width:40,
			paddingLeft:0
		},100)
	}).on('click',function () {
		$('html,body').animate({scrollTop:0},200);
	});

	//返回顶部按钮的动画效果>
	

	//<ajax调用信息
	
	$(".search-list input").on('keyup',function () {
		var val=parseInt($(this).val());
		$.get('search.json',{'a':val},function (data) {
			for (var i = 0; i < data.length; i++) {
				if (val===data[i][0].a) {
					$('.search-list img').attr("src",data[i][0].results[0].src);
					$(".title").css('fontSize','12px').html(data[i][0].results[0].p);
					$(".episodes").css('fontSize','15px').html(data[i][0].results[0].detail);
				}
			}
		},'json');
	});

	//键盘只能输入数字

	$('body').on('keypress',".search-list input",function (event) {
		if (event.type==='keypress') {
			var keyCode = event.keyCode ? event.keyCode : event.charCode ;

			if (keyCode !== 0 && (keyCode <48 || keyCode >57) && keyCode!==8 && keyCode !==37 && keyCode !==39 && keyCode !==46) {
				return false;
			}
		}
	});
	
	//ajax调用信息>
	
	//获取输入的val值在arr数组中的index
	
	function getIndex(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === val) {
				return i;
			}
		}
	};
	
})