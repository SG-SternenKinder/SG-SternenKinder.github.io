function openpic(src) {
	$("#bg_pic").fadeIn(400, function () {
		$("#popup").fadeIn(200, function () {
			$("#popup iframe").remove(), $("#popup").append('<img src="' + src + '">');
			resizeStage();
		})
	})
}

function resizeStage() {
	if (typeof (window.innerWidth) == 'number') {
		w = window.innerWidth; h = window.innerHeight;
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		w = document.documentElement.clientWidth; h = document.documentElement.clientHeight;
	} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		w = document.body.clientWidth; h = document.body.clientHeight;
	}
	screenR = w / h;
	if (w >= 1124) {
		bP = 1;
		outW = 1024;
		outP = 50;
		fontS = 16;
		cols = 2;
		outerMarginTop = 54;
		outerMinHeight = 725;
		leftOffset = 40;
		fbRabbitF = 5.5;
		fbRabbitT = -34;
		signT = 28/*12*/;
		signPaddT = 62;
		signBgW = 200;
		wrapperCartoonsT = 42;
		wrapperCartoonsPaddT = 0;
		cartoonP = 62;
		shF = 1;
		shR = 33;
		shT = -82;
		cartoonMarginT = 0;
		contentPaddingT = 157/*167*/;
		socialsW = 48;
		socialsR = 40;
		shirtsL = 85;
		btMenuMobW = 0;
		btMenuMobL = 0;
		btMenuMobT = 0;
		archiveCols = 4;
		videoThW = 200;
	} else if (w < 1124 && w >= 1024) {
		bP = 2;
		outP = 45;
		outW = w - 2 * outP;
		fontS = 15;
		cols = 2;
		outerMarginTop = 50;
		outerMinHeight = 720;
		leftOffset = 35;
		fbRabbitF = 5.5;
		fbRabbitT = 1 - 34;
		signT = 28/*12*/;
		signPaddT = 63;
		signBgW = 200;
		wrapperCartoonsT = 42;
		wrapperCartoonsPaddT = 0;
		cartoonP = 60;
		shF = 1;
		shR = 28;
		shT = -82;
		cartoonMarginT = 0;
		contentPaddingT = 154/*163*/;
		socialsW = 48;
		socialsR = 35;
		shirtsL = 72;
		btMenuMobW = 0;
		btMenuMobL = 0;
		btMenuMobT = 0;
		archiveCols = 4;
		videoThW = 180;
	} else if (w <= 1024 && w >= 760) {
		bP = 3;
		outP = 32;
		outW = w - 2 * outP;
		fontS = 14;
		cols = 1;
		outerMarginTop = 124;
		outerMinHeight = 654;
		leftOffset = 32;
		fbRabbitF = 5.5;
		fbRabbitT = -50;
		signT = -113/*123*/;
		signPaddT = 56;
		signBgW = 180;
		wrapperCartoonsT = 164;
		wrapperCartoonsPaddT = 34;
		cartoonP = 50;
		shF = 2;
		shR = 60;
		shT = -36;
		cartoonMarginT = 0;
		contentPaddingT = 40/*90*/;
		socialsW = 40;
		socialsR = 46;
		shirtsL = 63;
		btMenuMobW = 0;
		btMenuMobL = 0;
		btMenuMobT = 0;
		archiveCols = 3;
		videoThW = 160;
	} else if (w < 760 && w >= 414) {
		bP = 4;
		outP = 20;
		outW = w - 2 * outP;
		fontS = 12.5;
		cols = 1;
		outerMarginTop = 120;
		outerMinHeight = 572;
		leftOffset = 28;
		fbRabbitF = 4.2;
		fbRabbitT = 3;
		signT = -101/*116*/;
		signPaddT = 46;
		signBgW = 150;
		wrapperCartoonsT = 0;
		wrapperCartoonsPaddT = 0;
		cartoonP = 70;
		shF = 1;
		shR = 0;
		shT = -28;
		cartoonMarginT = 0;
		contentPaddingT = 20/*50*/;
		socialsW = 30;
		socialsR = 27;
		shirtsL = 0;
		btMenuMobW = 60/*50*/;
		btMenuMobL = 30;
		btMenuMobT = -111;
		archiveCols = 2;
		videoThW = 200;
	} else {
		bP = 5;
		outP = 12;
		outW = w - 2 * outP;
		fontS = 11;
		cols = 1;
		outerMarginTop = 92;
		outerMinHeight = 525;
		leftOffset = 23;
		fbRabbitF = 1;
		fbRabbitT = 0;
		signT = -83/*93*/;
		signPaddT = 42;
		signBgW = 135;
		wrapperCartoonsT = 0;
		wrapperCartoonsPaddT = 0;
		cartoonP = 68;
		shF = 1.9;
		shR = 32;
		shT = -10;
		cartoonMarginT = 0;
		contentPaddingT = 18/*44*/;
		socialsW = 27;
		socialsR = 18;
		shirtsL = 0;
		btMenuMobW = 50/*45*/;
		btMenuMobL = 21;
		btMenuMobT = -84;
		archiveCols = 2;
		videoThW = 200;
	}
	marginComplete = (w - outW) / 2;

	$('body').css({ 'fontSize': fontS });
	$('#outer').css({ 'width': outW, 'minHeight': outerMinHeight, 'marginTop': outerMarginTop, 'padding': '0 ' + outP + 'px', 'backgroundSize': outW + 'px,' + outW + 'px,' + outW + 'px 100px' });

	wrapperCartoonsW = (outW - 30) / cols;
	if (bP == 3) wrapperCartoonsW = wrapperCartoonsW - 175;
	cartoonW = wrapperCartoonsW - cartoonP <= 425 ? wrapperCartoonsW - cartoonP : 425;
	wrapperCartoonsR = bP < 3 ? outP + 30 : (outW - wrapperCartoonsW) / 2 + outP;
	$('div#wrapper_cartoon').css({ 'width': wrapperCartoonsW, 'top': wrapperCartoonsT, 'right': wrapperCartoonsR });
	$('div#wrapper_cartoon a#link_archive').css({ 'minHeight': cartoonW / 0.695 });
	$('div#wrapper_cartoon a#link_archive img').css({ 'width': cartoonW, 'height': 'auto' });
	if (outW * .12 > 65) { btMenuMobW = 65; btMenuMobL = 34; }

	if (bP < 4) {
		signL = outW / fbRabbitF + outP * 2;
		$('ul#menu').css({ 'display': 'block' });
		$('div#bt_menu_mob').css({ 'display': 'none' });
		$('a.logo').css({ 'display': 'block', 'width': outW / fbRabbitF, 'height': outW / fbRabbitF, 'backgroundSize': outW / fbRabbitF, 'top': fbRabbitT, 'left': outP + leftOffset });
		$('div#wrapper_menu_mob').css({ 'left': -200 });
	} else {
		signL = outP;
		$('ul#menu,a.logo').css({ 'display': 'none' });
		$('div#bt_menu_mob').css({ 'display': 'block', 'width': btMenuMobW, 'height': btMenuMobW / .65, 'backgroundSize': btMenuMobW, 'top': btMenuMobT, 'left': btMenuMobL });
	}
	$('ul#menu').css({ 'top': fbRabbitT + outW / fbRabbitF + 14, 'left': outP + leftOffset + 15 });

	buttonNavOffset = (wrapperCartoonsW - cartoonW) / 2;
	if (bP < 3) {
		signW = outW - outP * 2 - outW / fbRabbitF;
		if (home) signW -= wrapperCartoonsW;
		shW = cartoonW;
		buttonNavOffset += 30;
		contW = signW;
		contentMarginLeft = outW / fbRabbitF + outP;
		$('div#signatur').css({ 'display': 'none', 'width': signW, 'paddingTop': signPaddT, 'top': signT, 'left': signL, 'backgroundSize': signBgW });
		$('a.logo').css({ 'display': 'none' });
		if (home) {
			mitsuL = bP == 1 ? 105 : 95;
			$('a#mitsubishi').css({ 'display': 'block', 'width': 416, 'height': 111, 'left': mitsuL, 'background': 'url(/images/ruthe_faehrt_mitsubishi_2021.jpg) no-repeat center center / 100%' });
		} else {
			mitsuW = bP == 1 ? signW - 50 : contW - 60;
			mitsuL = bP == 1 ? 305 : 290;
			$('a#mitsubishi').css({ 'display': 'block', 'width': mitsuW, 'height': mitsuW / 6.2992, 'left': mitsuL, 'background': 'url(/images/ruthe_faehrt_mitsubishi_large_2022.jpg) no-repeat center center / 100%' });
		}
		$('div#wrapper_cartoon,div#s_h,div#rating,div#aktuell,div#spreadshirts').css({ 'position': 'absolute', 'margin': 0 });
		$('div#s_h').css({ 'width': shW, 'height': shW / 6.21739, 'backgroundSize': shW, 'top': shT, 'right': shR });
		$('ul#socials').css({ 'width': 48, 'background': 'url(/images/bg_socials.png) no-repeat right top' });
		$('a.press1, a.press2, a.press3, a.press4').css({ 'width': 'auto' });
		picsMaxW = '';
	} else if (bP == 3) {
		signW = outW - outP * 2 - outW / fbRabbitF;
		shW = outW / shF;
		buttonNavOffset += 20;
		ratingMargL = (wrapperCartoonsW - 237) / 2 + 175;
		aktuellMargL = (wrapperCartoonsW - 280) / 2 + 175;
		spreadMargL = (wrapperCartoonsW - 170) / 2 + 175;
		contW = signW * .95;
		contentMarginLeft = outP + 155;
		$('div#signatur').css({ 'display': 'block', 'width': signW, 'paddingTop': signPaddT, 'top': signT, 'left': signL, 'backgroundSize': signBgW });
		$('a#mitsubishi').css({ 'display': 'none' });
		$('div#wrapper_cartoon').css({ 'position': 'static', 'margin': cartoonMarginT + 'px 0 0 175px' });
		$('div#s_h').css({ 'position': 'absolute', 'width': cartoonW - 30, 'height': (cartoonW - 30) / 6.21739, 'backgroundSize': cartoonW - 30, 'top': shT, 'right': (wrapperCartoonsW - cartoonW) / 2 + 75 });
		$('div#rating').css({ 'position': 'static', 'margin': '20px 0 0 ' + ratingMargL + 'px' });
		$('div#aktuell').css({ 'position': 'static', 'margin': '20px 0 0 ' + aktuellMargL + 'px' });
		$('div#spreadshirts').css({ 'position': 'static', 'margin': '0 0 0 ' + spreadMargL + 'px' });
		$('ul#socials').css({ 'width': 'auto', 'background': 'transparent' });
		picsMaxW = '';
		$('a.press1, a.press2, a.press3, a.press4').css({ 'width': (contW - 80) / 2 });
	} else {
		signW = outW >= 600 ? outW : outW * .6;
		shW = outW / shF;
		buttonNavOffset += 10;
		contW = outW * .9;
		contentMarginLeft = outW * .05;
		//wrapperCartoonsPaddT = bP == 4 ? (cartoonW-20)/6.21739-25 : (cartoonW-20)/6.21739-10;
		wrapperCartoonsPaddT = bP == 4 ? (cartoonW - 20) / 6.21739 - 75 : (cartoonW - 20) / 6.21739 - 30;
		$('div#signatur').css({ 'display': 'block', 'width': signW, 'paddingTop': signPaddT, 'top': signT, 'left': (outW - signW) / 2 + outP, 'backgroundSize': signBgW });
		$('a#mitsubishi').css({ 'display': 'none' });
		$('div#wrapper_cartoon,div#rating,div#aktuell,div#spreadshirts').css({ 'position': 'static', 'margin': '0 auto' });
		$('div#wrapper_cartoon').css({ 'position': 'static', 'marginTop': cartoonMarginT });
		$('div#s_h').css({ 'position': 'absolute', 'width': cartoonW - 20, 'height': (cartoonW - 20) / 6.21739, 'backgroundSize': cartoonW - 20, 'top': shT, 'right': (wrapperCartoonsW - cartoonW) / 2 + 42 });
		$('div#rating,div#aktuell').css({ 'marginTop': 20 });
		$('ul#socials').css({ 'width': 'auto', 'background': 'transparent' });
		picsMaxW = contW - 60;
		$('a.press1, a.press2, a.press3, a.press4').css({ 'width': contW - 60 });
	}

	$('div#wrapper_cartoon').css({ 'paddingTop': wrapperCartoonsPaddT });
	$('a#n_prev').css({ 'marginLeft': buttonNavOffset });
	$('a#n_next, div#statt_weiter').css({ 'marginRight': buttonNavOffset });

	aktuellW = outW > 340 ? 280 : outW - 4 * outP;
	$('div#rating').css({ 'left': signL });
	$('div#aktuell').css({ 'width': aktuellW, 'left': signL - 24 });
	$('div#aktuell a img').css({ 'width': aktuellW - 20 });
	$('ul#socials').css({ 'right': socialsR });
	$('ul#socials li a').css({ 'width': socialsW, 'height': socialsW, 'backgroundSize': socialsW });
	$('div#spreadshirts').css({ 'left': shirtsL });

	if (!home) $('div#TSCont').css({ 'height': contentPaddingT });
	$('div#content').css({ 'width': contW, 'marginLeft': contentMarginLeft, 'backgroundSize': contW + 'px, ' + contW + 'px, ' + contW + 'px' });
	$('div#content img').css({ 'maxWidth': picsMaxW }).removeAttr('height');
	$('div#content iframe').removeAttr('width').removeAttr('height').css({ 'width': contW - 70, 'height': (contW - 70) / 1.7777 });
	$('div.hinweis').css({ 'width': contW - 114 });

	archiveLiW = (contW - 60) / archiveCols - 20;
	$('#archiv ul li').css({ 'width': archiveLiW, 'height': archiveLiW * 1.15 });

	$('#bg_video').css({ 'width': w, 'height': h });
	if (w > 883) {
		$('#popup, #popup iframe').css({ 'width': 853, 'height': 480, 'top': (h - 480) / 2, 'left': (w - 853) / 2 });
	} else {
		if (screenR >= 1.7777) {
			vH = h - 30;
			vW = vH * 1.7777;
			vT = 15;
			vL = (w - vW) / 2;
		} else {
			vW = w - 30;
			vH = vW / 1.7777;
			vT = (h - vH) / 2;
			vL = 15;
		}
		$('#popup, #popup iframe').css({ 'width': vW, 'height': vH, 'top': vT, 'left': vL });
	}
	if (w <= 568) {
		$('ul#results li div.bild').css({ 'width': contW - 60, 'float': 'none', 'marginRight': 0 });
		$('ul#results li div.daten').css({ 'width': contW - 60, 'none': 'left' });
	} else {
		resultPicW = (contW - 60) * 0.45;
		$('ul#results li div.bild').css({ 'width': resultPicW, 'float': 'left', 'marginRight': 30 });
		$('ul#results li div.daten').css({ 'width': contW - resultPicW - 100, 'float': 'left' });
	}

	if ($('#popup').find('img').is('img')) {
		picT = (h - ((w - 40) / 2.711864 + 40)) / 2;
		$('#popup').css({ 'width': 'auto', 'height': 'auto', 'left': 20, 'top': picT });
		$('#popup img').css({ 'width': w - 40 });
	}
	$('p#copyright').css({ 'marginLeft': marginComplete + leftOffset });

	$('#status').html(bP + ') ' + w);
}

$(window).resize(function () {
	resizeStage();
});

$(document).ready(function () {
	resizeStage();
	$('a.video').click(function (e) {
		e.preventDefault();
		var Vurl = $(this).attr('href');
		openVideo(Vurl);
	});
	$('div#bt_menu_mob').click(function () {
		$('div#wrapper_menu_mob').css({ 'left': 0 });
	});
	$('div#bt_menu_close').click(function () {
		$('div#wrapper_menu_mob').css({ 'left': -200 });
	});
	$('ul#menu_mob li a').each(function () {
		$(this).click(function (e) {
			nURL = $(this).attr('href');
			if (nURL.substr(0, 7) != 'http://') {
				e.preventDefault();
				$('div#wrapper_menu_mob').css({ 'left': -200 });
				window.setTimeout(function () {
					top.location.href = nURL;
				}, 750);
			}
		});
	});
	$('a.ecard').click(function (e) {
		e.preventDefault();
		var Eurl = $(this).attr('href');
		$('#bg_video').fadeIn(400, function () {
			$('#popup').fadeIn(200, function () {
				$('#popup iframe').attr('src', Eurl);
			});
		});
	});
	$("a.fancy").click(function (e) {
		e.preventDefault();
		quelle = $(this).find("img").attr("src");
		openpic(quelle);
	});
});
