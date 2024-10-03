function scrollSection(target, space){
	$('html, body').animate({
        scrollTop: target.offset().top - space
    }, 500);
}

function fixedHeader(){
    if ($(window).scrollTop() > 1) {
        $("header").addClass("fixed");
    } else {
        $("header").removeClass("fixed");
    }
}

function accordion(el){
	el.find(".acr-title").click(function(){
		$(this).next(".acr-content").slideToggle('fast');
		$(".acr-title").parent(".acr-item").not($(this).parent(".acr-item")).removeClass("active");
		$(this).parent(".acr-item").toggleClass("active");
		$(".acr-content").not($(this).next(".acr-content")).slideUp('fast');
	});
}

function tab(el){
	el.each(function(){
		var $active, $content;
		var $links = $(this).find("a");		
		$active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
		$active.addClass("active");		
		$content = $($active[0].hash);
		$content.fadeIn("fast");		
		$links.not($active).each(function () {
			$(this.hash).hide();
		});
		$(this).on('click', 'a', function(i){
			if($(this).hasClass("active")){
				return false;
			}
			$active.removeClass('active');
			$content.hide();
			$active = $(this);
			$content = $(this.hash);
			$active.addClass('active');
			$content.fadeIn("fast");
			i.preventDefault();
		});				
	});
}

function copyAddress(){
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($("#contactAddress").val()).select();
	document.execCommand("copy");
	$temp.remove();
}

$(document).ready(function(){
	fixedHeader();
	
	accordion($(".accordion"));
	
	tab($(".tab-menu"));
	
	$("header .menu-btn a").on("click", function () {
		if($("header .mobile-menu").is(":hidden")) {
			$(this).addClass("active");
			$("header .mobile-menu").fadeIn(200);
		} else {
			$(this).removeClass("active");
			$("header .mobile-menu").fadeOut(200);
		}
	});
	$("header .mobile-menu ul li a").on("click", function () {
		$("header .menu-btn a").removeClass("active");
		$("header .mobile-menu").fadeOut(200);
	});
	
	var timeout;
	$(".intro .contact-address .copy").on("click", function () {
		if($(".intro .contact-address .info").is(":hidden")) {
			$(".intro .contact-address .info").fadeIn(200);
		}
		clearTimeout(timeout);
		timeout = setTimeout(function(){
			$(".intro .contact-address .info").hide();
		}, 2000);
	});
	$(".contact .contact-address .copy").on("click", function () {
		if($(".contact .contact-address .info").is(":hidden")) {
			$(".contact .contact-address .info").fadeIn(200);
		}
		clearTimeout(timeout);
		timeout = setTimeout(function(){
			$(".contact .contact-address .info").hide();
		}, 2000);
	});
});

$(window).scroll(function() {
	fixedHeader();
});

$(window).resize(function() {
	if (window.innerWidth > 991) {
		$("header .mobile-menu").removeAttr("style");
		$("header .menu-btn a").removeClass("active");
	}
});