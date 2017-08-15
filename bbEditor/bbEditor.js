/* jQuery bbEditor plugin
|* by Noah Bagge
|* http://www.pagebuddy.com/
|* version: 1.0
|* updated: June 1, 2016
|* since 2016
|* licensed under the MIT License
|* Enjoy.
|* 
|* Thanks,
|* Noah */

(function ($, window)
{
	// default options
	var defaults = {
		
	};
	
	var top_tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table'];
	
	function decodeHtml(html) {
	    var txt = document.createElement("textarea");
	    txt.innerHTML = html;
	    return txt.value;
	}
	
	function initContent(orgstr)
	{
		if (orgstr.substring(0, 1) != "<")
			return "<p>" + orgstr + "</p>";
		else
			return orgstr;
	}

	// methods
	var bbEditor = function(node, options)
	{
		var eid = $(node).attr('id');
		var options = $.extend({}, defaults, options);
		var allstr = decodeHtml($(node).html());
		var realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
		
		var allstrlog = [];
		var curIndex = 0;
		
		var tooltiptimeout = null;
		function initBBEvent(eid)
		{
			$("#" + eid + " *").unbind("mouseover");
			$("#" + eid + " *").on("mouseover", function(e){
			//	var fontFamily = $(e.target).css('font-family');
			//	var fontSize = $(e.target).css('font-size');
				var fontWeight = $(e.target).css('font-weight');
				var fontStyle = $(e.target).css('font-style');
				var textDecoration = $(e.target).css('text-decoration');
			//	var fontColor = $(e.target).css('color');
			//	var backgroundColor = $(e.target).css('background-color');
				var tooltip_str = '';
			//	tooltip_str = fontFamily + ", " + fontSize;
				if (fontWeight != 400)
					tooltip_str += ", " + fontWeight;
				if (fontStyle != "normal")
					tooltip_str += ", " + fontStyle;
				if (textDecoration != "none")
					tooltip_str += ", " + textDecoration;
			//	tooltip_str += ", color:" + fontColor + ", background-color:" + backgroundColor;
				if (tooltip_str == "")
					return;
				tooltip_str = tooltip_str.substring(2, tooltip_str.length);
				$('.bbtooltip').html(tooltip_str);
				$(".bbtooltip").css("top", e.pageY + 20);
				$(".bbtooltip").css("left", e.pageX);
				$(".bbtooltip").show();
				clearTimeout(tooltiptimeout);
				tooltiptimeout = setTimeout(function(){
					$(".bbtooltip").hide();
				}, 2000);
			});
			if (start != end)
				restoreSelection(document.getElementById(eid), {start:start, end:end});
		}
		
		allstr = initContent(allstr.trim());
		curIndex = allstrlog.length;
		allstrlog.push(allstr);
		$(node).html(allstr);
		initBBEvent(eid);
		
		$(node).attr('contenteditable', true);
		$(node).addClass('bbEditorContent');
		$(node).css('box-shadow', '0px 0px 1px 1px rgb(0, 0, 0)');
		$(node).css('overflow-x', 'hidden');
		$(node).css('overflow-y', 'auto');
		
		var toolbar = '<div class="bbToolbar" id="bbToolbar_' + eid + '">';
		toolbar += '<div class="bbToolframe showToolTitle"><div class="toolTitle">FONT</div><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-dropdown btn-font-family" data-cmd="font-family" for="' + eid + '" title="Font">Open Sans</button><div class="caret"></div></div></div>';
		toolbar += '<div class="bbToolframe showToolTitle"><div class="toolTitle">SIZE</div><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-dropdown btn-font-size" data-cmd="font-size" for="' + eid + '" contenteditable=true title="Size">22px</button><div class="caret"></div></div></div>';
		toolbar += '<div class="bbToolframe showToolTitle"><div class="toolTitle">SPACING</div><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-dropdown btn-letter-spacing" data-cmd="letter-spacing" for="' + eid + '" contenteditable=true title="Letter spacing">0</button><div class="caret"></div></div></div>';
		toolbar += '<div class="bbToolframe showToolTitle"><div class="toolTitle">LINE HEIGHT</div><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-dropdown btn-line-height" data-cmd="line-height" for="' + eid + '" contenteditable=true title="Line height">25</button><div class="caret"></div></div></div>';
		toolbar += '<div class="bbToolframe showToolTitle"><div class="toolTitle">STYLES</div><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-button btn-style-bold" data-cmd="style-bold" title="Bold"><b>B</b></button><button type="button" class="bb-btn bb-button btn-style-italic" data-cmd="style-italic" title="Italic"><i>I</i></button><button type="button" class="bb-btn bb-button btn-style-underline" data-cmd="style-underline" title="Underline"><u>U</u></button><button type="button" class="bb-btn bb-button btn-style-strikethrough" data-cmd="style-strikethrough" title="Strikethrough"><s>S</s></button></div></div>';
	//	toolbar += '<div class="bbToolframe"><button type="button" class="bb-btn bb-dropdown btn-font-weight" data-cmd="font-weight">Font Weight</button><div class="caret"></div></div>';
		toolbar += '<br>';
		toolbar += '<div class="bbToolframe"><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-button btn-foreground" data-cmd="foreground" title="Color"><i class="fa fa-foreground"></i></button><button type="button" class="bb-btn bb-button btn-background" data-cmd="background"><i class="fa fa-background" title="Background"></i></button></div></div>';
		toolbar += '<div class="bbToolframe"><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-button btn-link" data-cmd="link" for="' + eid + '" title="Insert link"><i class="fa fa-bblink"></i></button><button type="button" class="bb-btn bb-button btn-unlink bb-btn-disable" data-cmd="unlink" title="Remove link"><i class="fa fa-bbunlink"></i></button></div></div>';
		toolbar += '<div class="bbToolframe"><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-button btn-align" data-cmd="left" title="Left"><i class="fa fa-bbalign-left"></i></button><button type="button" class="bb-btn bb-button btn-align" data-cmd="center" title="Center"><i class="fa fa-bbalign-center"></i></button><button type="button" class="bb-btn bb-button btn-align" data-cmd="right" title="Right"><i class="fa fa-bbalign-right"></i></button><button type="button" class="bb-btn bb-button btn-align" data-cmd="justify" title="Justify"><i class="fa fa-bbalign-justify"></i></button></div></div>';
	//	toolbar += '<div class="bbToolframe"><button type="button" class="bb-btn bb-dropdown btn-style" data-cmd="style">Style</button><div class="caret"></div></div>';
	//	toolbar += '<div class="bbToolframe"><button type="button" class="bb-btn bb-button btn-ltr" data-cmd="ltr"><i class="fa fa-ltr"></i></button><button type="button" class="bb-btn bb-button btn-rtl" data-cmd="rtl"><i class="fa fa-rtl"></i></button></div>';
	//	toolbar += '<div class="bbToolframe"><button type="button" class="bb-btn bb-button btn-list-dot" data-cmd="list-dot"><i class="fa fa-list-ul"></i></button><button type="button" class="bb-btn bb-button btn-list-num" data-cmd="list-num"><i class="fa fa-list-ol"></i></button></div>';
	//	toolbar += '<div class="bbToolframe"><button type="button" class="bb-btn bb-dropdown btn-format" data-cmd="format">Format</button><div class="caret"></div></div>';
		toolbar += '<div class="bbToolframe"><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-button btn-table" data-cmd="table" title="Insert a table"><i class="fa fa-bbtable"></i></button><button type="button" class="bb-btn bb-button btn-separate" data-cmd="separate" title="Insert a separator"><i class="fa fa-separate"></i></button></div></div>';
		toolbar += '<div class="bbToolframe"><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-button btn-html-code" data-cmd="html-code" for="' + eid + '" title="HTML code">&lt;/&gt;</button></div></div>';
		toolbar += '<div class="bbToolframe"><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-button btn-find" data-cmd="find" title="Find"><i class="fa fa-search"></i></button></div></div>';
		toolbar += '<div class="bbToolframe"><div class="bbToolFrameBack"><button type="button" class="bb-btn bb-button btn-undo bb-btn-disable" data-cmd="undo" title="Undo"><i class="fa fa-bbundo"></i></button><button type="button" class="bb-btn bb-button btn-redo bb-btn-disable" data-cmd="redo" title="Redo"><i class="fa fa-bbredo"></i></button></div></div>';
		toolbar += '</div>';
		
		var fontFamily = '<div class="bb-dropdown-menu for-font-family" id="for_font_family_' + eid + '"><ul class="bb-dropdown-list"><!--<li class="bb-command" data-param1="Arial,Helvetica,sans-serif" style="font-family: Arial,Helvetica,sans-serif" title="Arial">Arial</li><li class="bb-command" data-param1="Alegreya Sans" style="font-family: Alegreya Sans" title="Alegreya Sans">Alegreya Sans</li><li class="bb-command" data-param1="Amaranth" style="font-family: Amaranth" title="Amaranth">Amaranth</li><li class="bb-command" data-param1="Avenir Next" style="font-family: Avenir Next" title="Avenir Next">Avenir Next</li><li class="bb-command" data-param1="Ek Mukta" style="font-family: Ek Mukta" title="Ek Mukta">Ek Mukta</li><li class="bb-command" data-param1="Lato Regular" style="font-family: Lato Regular" title="Lato Regular">Lato Regular</li><li class="bb-command" data-param1="Raleway" style="font-family: Raleway" title="Raleway">Raleway</li>--><li class="bb-command" data-param1="Open Sans" style="font-family: Open Sans" title="Open Sans">Open Sans</li><li class="bb-command" data-param1="Roboto" style="font-family: Roboto" title="Roboto">Roboto</li><li class="bb-command" data-param1="Slabo" style="font-family: Slabo" title="Slabo">Slabo</li><li class="bb-command" data-param1="Lato" style="font-family: Lato" title="Lato">Lato</li><li class="bb-command" data-param1="Oswald" style="font-family: Oswald" title="Oswald">Oswald</li><li class="bb-command" data-param1="Source Sans Pro" style="font-family: Source Sans Pro" title="Source Sans Pro">Source Sans Pro</li><li class="bb-command" data-param1="Montserrat" style="font-family: Montserrat" title="Montserrat">Montserrat</li><li class="bb-command" data-param1="Raleway" style="font-family: Raleway" title="Raleway">Raleway</li><li class="bb-command" data-param1="PT Sans" style="font-family: PT Sans" title="PT Sans">PT Sans</li><li class="bb-command" data-param1="Lora" style="font-family: Lora" title="Lora">Lora</li><li class="bb-command" data-param1="Roboto Slab" style="font-family: Roboto Slab" title="Roboto Slab">Roboto Slab</li><li class="bb-command" data-param1="Droid Sans" style="font-family: Droid Sans" title="Droid Sans">Droid Sans</li><li class="bb-command" data-param1="Ubuntu" style="font-family: Ubuntu" title="Ubuntu">Ubuntu</li><li class="bb-command" data-param1="Droid Serif" style="font-family: Droid Serif" title="Droid Serif">Droid Serif</li><li class="bb-command" data-param1="Noto Sans" style="font-family: Noto Sans" title="Noto Sans">Noto Sans</li><li class="bb-command" data-param1="Playfair Display" style="font-family: Playfair Display" title="Playfair Display">Playfair Display</li><li class="bb-command" data-param1="Alegreya Sans" style="font-family: Alegreya Sans" title="Alegreya Sans">Alegreya Sans</li><li class="bb-command" data-param1="Cabin" style="font-family: Cabin" title="Cabin">Cabin</li><li class="bb-command" data-param1="Dosis" style="font-family: Dosis" title="Dosis">Dosis</li><li class="bb-command" data-param1="Bitter" style="font-family: Bitter" title="Bitter">Bitter</li><li class="bb-command" data-param1="Oxygen" style="font-family: Oxygen" title="Oxygen">Oxygen</li><li class="bb-command" data-param1="Lobster" style="font-family: Lobster" title="Lobster">Lobster</li><li class="bb-command" data-param1="Hind" style="font-family: Hind" title="Hind">Hind</li><li class="bb-command" data-param1="Bree Serif" style="font-family: Bree Serif" title="Bree Serif">Bree Serif</li><li class="bb-command" data-param1="Anton" style="font-family: Anton" title="Anton">Anton</li></ul></div>';
		var fontSize = '<div class="bb-dropdown-menu for-font-size" id="for_font_size_' + eid + '"><div class="bb-dropdown-wrapper"><div class="bb-dropdown-content" tabindex="-1"><ul class="bb-dropdown-list"><li><a class="bb-command" data-param1="8px">8px</a></li><li><a class="bb-command" data-param1="10px">10px</a></li><li><a class="bb-command" data-param1="12px">12px</a></li><li><a class="bb-command" data-param1="14px">14px</a></li><li><a class="bb-command" data-param1="16px">16px</a></li><li><a class="bb-command" data-param1="18px">18px</a></li><li><a class="bb-command" data-param1="20px">20px</a></li><li><a class="bb-command" data-param1="22px">22px</a></li><li><a class="bb-command" data-param1="24px">24px</a></li><li><a class="bb-command" data-param1="26px">26px</a></li><li><a class="bb-command" data-param1="28px">28px</a></li><li><a class="bb-command" data-param1="30px">30px</a></li><li><a class="bb-command" data-param1="32px">32px</a></li><li><a class="bb-command" data-param1="36px">36px</a></li><li><a class="bb-command" data-param1="40px">40px</a></li><li><a class="bb-command" data-param1="44px">44px</a></li><li><a class="bb-command" data-param1="48px">48px</a></li></ul></div></div></div>';
		var letterSpacing = '<div class="bb-dropdown-menu for-letter-spacing" id="for_letter_spacing_' + eid + '"><div class="bb-dropdown-wrapper"><div class="bb-dropdown-content" tabindex="-1"><ul class="bb-dropdown-list"><li><a class="bb-command" data-param1="-4px">-4px</a></li><li><a class="bb-command" data-param1="-3px">-3px</a></li><li><a class="bb-command" data-param1="-2px">-2px</a></li><li><a class="bb-command" data-param1="-1px">-1px</a></li><li><a class="bb-command" data-param1="0px">0px</a></li><li><a class="bb-command" data-param1="1px">1px</a></li><li><a class="bb-command" data-param1="2px">2px</a></li><li><a class="bb-command" data-param1="3px">3px</a></li><li><a class="bb-command" data-param1="3px">3px</a></li></ul></div></div></div>';
		var lineHeight = '<div class="bb-dropdown-menu for-line-height" id="for_line_height_' + eid + '"><div class="bb-dropdown-wrapper"><div class="bb-dropdown-content" tabindex="-1"><ul class="bb-dropdown-list"><li><a class="bb-command" data-param1="8px">8px</a></li><li><a class="bb-command" data-param1="10px">10px</a></li><li><a class="bb-command" data-param1="12px">12px</a></li><li><a class="bb-command" data-param1="14px">14px</a></li><li><a class="bb-command" data-param1="16px">16px</a></li><li><a class="bb-command" data-param1="18px">18px</a></li><li><a class="bb-command" data-param1="20px">20px</a></li><li><a class="bb-command" data-param1="22px">22px</a></li><li><a class="bb-command" data-param1="24px">24px</a></li><li><a class="bb-command" data-param1="26px">26px</a></li><li><a class="bb-command" data-param1="28px">28px</a></li><li><a class="bb-command" data-param1="30px">30px</a></li><li><a class="bb-command" data-param1="32px">32px</a></li><li><a class="bb-command" data-param1="36px">36px</a></li><li><a class="bb-command" data-param1="40px">40px</a></li><li><a class="bb-command" data-param1="44px">44px</a></li><li><a class="bb-command" data-param1="48px">48px</a></li></ul></div></div></div>';
		var fontWeight = '<div class="bb-dropdown-menu for-font-weight" id="for_font_weight_' + eid + '"><div class="bb-dropdown-wrapper"><div class="bb-dropdown-content" tabindex="-1"><ul class="bb-dropdown-list"><li><a class="bb-command" data-param1="100">100</a></li><li><a class="bb-command" data-param1="200">200</a></li><li><a class="bb-command" data-param1="300">300</a></li><li><a class="bb-command" data-param1="400">400</a></li><li><a class="bb-command" data-param1="500">500</a></li><li><a class="bb-command" data-param1="600">600</a></li><li><a class="bb-command" data-param1="700">700</a></li><li><a class="bb-command" data-param1="800">800</a></li><li><a class="bb-command" data-param1="900">900</a></li><li><a class="bb-command" data-param1="bold">bold</a></li><li><a class="bb-command" data-param1="bolder">bolder</a></li><li><a class="bb-command" data-param1="light">light</a></li><li><a class="bb-command" data-param1="lighter">lighter</a></li><li><a class="bb-command" data-param1="normal">normal</a></li></ul></div></div></div>';
		var setColor = '<div class="bb-color-picker" id="for_colorpicker"><div class="bb-pre-color-panel"><div class="bb-pre-color-btn color-ff0000"></div><div class="bb-pre-color-btn color-ffff00"></div><div class="bb-pre-color-btn color-ff00ff"></div><div class="bb-pre-color-btn color-00ffff"></div><div class="bb-pre-color-btn color-00ff00"></div><div class="bb-pre-color-btn color-0000ff"></div><div class="bb-pre-color-btn color-0080a2"></div><div class="bb-pre-color-btn color-8080a2"></div><div class="bb-pre-color-btn color-804040"></div><div class="bb-pre-color-btn color-ff8040"></div><div class="bb-pre-color-btn color-008080"></div><div class="bb-pre-color-btn color-004080"></div><div class="bb-pre-color-btn color-ff8080"></div><div class="bb-pre-color-btn color-ffff80"></div><div class="bb-pre-color-btn color-80ff80"></div><div class="bb-pre-color-btn color-80ffff"></div><div class="bb-pre-color-btn color-0080ff"></div><div class="bb-pre-color-btn color-ff80c0"></div><div class="bb-pre-color-btn color-ff80ff"></div><div class="bb-pre-color-btn color-8080ff"></div><div class="bb-pre-color-btn color-800040"></div><div class="bb-pre-color-btn color-ff0080"></div><div class="bb-pre-color-btn color-800000"></div><div class="bb-pre-color-btn color-ff8000"></div><div class="bb-pre-color-btn color-008000"></div><div class="bb-pre-color-btn color-0000a0"></div><div class="bb-pre-color-btn color-800080"></div><div class="bb-pre-color-btn color-8000ff"></div><div class="bb-pre-color-btn color-400000"></div><div class="bb-pre-color-btn color-804000"></div><div class="bb-pre-color-btn color-004000"></div><div class="bb-pre-color-btn color-000080"></div><div class="bb-pre-color-btn color-000040"></div><div class="bb-pre-color-btn color-400040"></div><div class="bb-pre-color-btn color-400080"></div><div class="bb-pre-color-btn color-408080"></div></div><div class="bb-color-picker-background"><div class="bb-color-picker-panel1"><div class="bb-color-picker-panel2"><div class="bb-color-picker-pointer1"></div></div></div></div><div class="bb-color-picker-grad"><div class="bb-color-picker-pointer2"></div></div><div class="bb-color-rgb"><div class="bb-color-rgb-cell"><span>R</span><input type="text" class="color-cell color-r" value="255"></div><div class="bb-color-rgb-cell"><span>G</span><input type="text" class="color-cell color-g" value="255"></div><div class="bb-color-rgb-cell"><span>B</span><input type="text" class="color-cell color-b" value="255"></div><div class="bb-color-rgb-cell"><span>#</span><input type="text" name="curColor" class="color-cell color-rgb" value="FFFFFF"></div></div></div>';
		var htmlEditor = '<div class="bb-background bb-html-editor-background"><div class="bb-dialog bb-html-editor"><div class="bb-dialog-header"><div class="bb-dialog-title">HTML SOURCE</div><div class="bb-dialog-close-btn"><i class="fa fa-remove"></i></div></div><div class="bb-dialog-content"><textarea id="htmleditor_' + eid + '"></textarea></div><div class="bb-dialog-buttons"><button class="bb-dialog-button bb-dialog-button-ok">OK</button><button class="bb-dialog-button bb-dialog-button-cancel">CANCEL</button></div></div></div>';
		var linkEditor = '<div class="bb-background bb-link-editor-background"><div class="bb-dialog bb-link-editor"><div class="bb-dialog-header"><div class="bb-dialog-title">LINK</div><div class="bb-dialog-close-btn"><i class="fa fa-remove"></i></div></div><div class="bb-dialog-content">Target URL:<br><input type="text" id="bb-link-url" value=""><br><input type="checkbox" id="bb-link-target-chk"> Open in a new window</div><div class="bb-dialog-buttons"><button class="bb-dialog-button bb-dialog-button-ok">OK</button><button class="bb-dialog-button bb-dialog-button-cancel">CANCEL</button></div></div></div>';
		var findEditor = '<div class="bb-background bb-find-editor-background"><div class="bb-dialog bb-find-editor"><div class="bb-dialog-header"><div class="bb-dialog-title">FIND AND REPLACE</div><div class="bb-dialog-close-btn"><i class="fa fa-remove"></i></div></div><div class="bb-dialog-content"><div class="bb-dialog-field-name">Find:</div><div class="bb-dialog-field-value"><input type="text" id="bb-find-str" value=""></div><div class="bb-dialog-field-button"><button class="bb-dialog-button bb-dialog-button-find">Find</button></div><div class="bb-dialog-find-option"><input type="checkbox" id="bb-find-match-case"><span>Match case</span><input type="checkbox" id="bb-find-match-word"><span>Match word</span><input type="checkbox" id="bb-find-match-cyclic"><span>Match cyclic</span></div><hr><div class="bb-dialog-field-name" style="line-height: 15px;">Replace with:</div><div class="bb-dialog-field-value"><input type="text" id="bb-replace-str" value=""></div><div class="bb-dialog-field-button"><button class="bb-dialog-button bb-dialog-button-replace">Replace</button></div></div><div class="bb-dialog-buttons"><button class="bb-dialog-button bb-dialog-button-cancel">Close</button></div></div></div>';
		var tableEditor = '<div class="bb-background bb-table-editor-background"><div class="bb-dialog bb-table-editor"><div class="bb-dialog-header"><div class="bb-dialog-title">TABLE PROPERTIES</div><div class="bb-dialog-close-btn"><i class="fa fa-remove"></i></div></div><div class="bb-dialog-content">Rows:<input type="text" id="bb-table-rows" value=""> Columns:<input type="text" id="bb-table-columns"></div><div class="bb-dialog-buttons"><button class="bb-dialog-button bb-dialog-button-ok">OK</button><button class="bb-dialog-button bb-dialog-button-cancel">CANCEL</button></div></div></div>';
		
		$('body').prepend(fontFamily);
		$('body').prepend(fontSize);
		$('body').prepend(letterSpacing);
		$('body').prepend(lineHeight);
		$('body').prepend(fontWeight);
		$('body').prepend(setColor);
		$('body').prepend(htmlEditor);
		$('body').prepend(linkEditor);
		$('body').prepend(findEditor);
		$('body').prepend(tableEditor);
		$('body').prepend("<div class='bbtooltip'></div>");
		
		/* Color picker Events */
		var cp_lock = '';
		var cur_color = {'r': 255, 'g': 255, 'b': 255}; // #ffffff
		var cur_color_bar = {'r': 255, 'g': 0, 'b': 0}; // #ff0000
		var pos1 = {'top': 0, 'left': 0}; // panel pos
		var pos2 = {'top': 0}; // grad pos
		var cp_start1 = function(e)
		{
			cp_lock = "cppan1";
			pos1.left = e.pageX - $(".bb-color-picker-panel2").offset().left;
			pos1.top = e.pageY - $(".bb-color-picker-panel2").offset().top;
			pos1.left = pos1.left < 0 ? 0 : pos1.left > 100 ? 100 : pos1.left;
			pos1.top = pos1.top < 0 ? 0 : pos1.top > 100 ? 100 : pos1.top;
			reset_color1(pos1.top, pos1.left);
			$(".bb-color-picker-pointer1").css('top', pos1.top);
			$(".bb-color-picker-pointer1").css('left', pos1.left);
			$(".color-rgb").val(get_color_str(cur_color).substring(1, 7));
		//	$(".color-rgb").css('color', get_color_str(cur_color));
			$(".color-r").val(cur_color.r);
			$(".color-g").val(cur_color.g);
			$(".color-b").val(cur_color.b);
			$("input[name=curColor]").change();
		}
		$(".bb-color-picker-panel2").on('mousedown', cp_start1);
		$(".bb-color-picker-pointer1").on('mousedown', cp_start1);
		
		var cp_start2 = function(e)
		{
			cp_lock = "cppan2";
			pos2.top = e.pageY - $(".bb-color-picker-grad").offset().top;
			pos2.top = pos2.top < 0 ? 0 : pos2.top > 100 ? 100 : pos2.top;
			reset_color2(pos2.top);
			$(".bb-color-picker-pointer2").css('background', get_color_str(cur_color_bar));
			$(".bb-color-picker-pointer2").css('top', pos2.top);
			$(".bb-color-picker-background").css('background', get_color_str(cur_color_bar));
			reset_color1(pos1.top, pos1.left);
			$(".color-rgb").val(get_color_str(cur_color).substring(1, 7));
		//	$(".color-rgb").css('color', get_color_str(cur_color));
			$(".color-r").val(cur_color.r);
			$(".color-g").val(cur_color.g);
			$(".color-b").val(cur_color.b);
			$("input[name=curColor]").change();
		}
		$(".bb-color-picker-grad").on('mousedown', cp_start2);
		$(".bb-color-picker-pointer2").on('mousedown', cp_start2);
		
		$(".bb-color-picker").on("mousemove", function(e){
			if (cp_lock == "")
				return;
			if (cp_lock == "cppan1")
			{
				cp_start1(e);
			}
			else if (cp_lock == "cppan2")
			{
				cp_start2(e);
			}
			$("input[name=curColor]").change();
		});
		$(".bb-color-picker").on("mouseout", function(e){
			if (cp_lock == "")
				return;
			var padding = parseInt($(this).css('padding').substring(0, $(this).css('padding').indexOf('px')));
			if (e.pageY < $(this).offset().top || e.pageY > $(this).offset().top + $(this).height() + padding * 2 || e.pageX < $(this).offset().left || e.pageX > $(this).offset().left + $(this).width() + padding * 2)
				cp_lock = "";
		});
		$(".bb-color-picker").on("mouseup", function(e){
			cp_lock = "";
		});
		
		var checkColorCell = function(e){
			if ($(this).hasClass('color-rgb'))
			{
				if (e.keyCode != 46 && e.keyCode != 8 && (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 65 || e.keyCode > 70))
					return false;
			}
			else
			{
				if (e.keyCode != 46 && e.keyCode != 8 && (e.keyCode < 48 || e.keyCode > 57))
					return false;
			}
		};
		var reviewColorCell = function(e){
			if ($(this).hasClass('color-rgb'))
			{
				if ($(this).val().length != 6 && $(this).val().length != 3)
					return;
				
				var ctxt = $(this).val();
				if (ctxt.length == 3)
					ctxt = ctxt[0] + ctxt[0] + ctxt[1] + ctxt[1] + ctxt[2] + ctxt[2];
				
				cur_color.r = parseInt(ctxt.substring(0, 2), 16);
				cur_color.g = parseInt(ctxt.substring(2, 4), 16);
				cur_color.b = parseInt(ctxt.substring(4, 6), 16);
				
				$(".color-r").val(cur_color.r);
				$(".color-g").val(cur_color.g);
				$(".color-b").val(cur_color.b);
			} else {
				if ($(this).val() > 255)
					$(this).val(255);
				if ($(this).attr('class') == 'color-cell color-r')
					cur_color.r = parseInt($(this).val());
				else if ($(this).attr('class') == 'color-cell color-g')
					cur_color.g = parseInt($(this).val());
				else //if ($(this).attr('class') == 'color-cell color-b')
					cur_color.b = parseInt($(this).val());
				$(".color-rgb").val(get_color_str(cur_color).substring(1, 7));
			}
			reset_cur_color_bar();
			reset_color_view();
			$("input[name=curColor]").change();
		};
		$(".color-cell").on('keydown', checkColorCell);
		$(".color-cell").on('keyup', reviewColorCell);
		$(".bb-pre-color-btn").on('click', function(e){
			var bgColorRGB = $(this).css('background-color');
			var r = parseInt(bgColorRGB.substring(bgColorRGB.indexOf('(') + 1, bgColorRGB.indexOf(',')));
			bgColorRGB = bgColorRGB.substring(bgColorRGB.indexOf(',') + 2, bgColorRGB.length);
			var g = parseInt(bgColorRGB.substring(0, bgColorRGB.indexOf(',')));
			bgColorRGB = bgColorRGB.substring(bgColorRGB.indexOf(',') + 2, bgColorRGB.length);
			var b = parseInt(bgColorRGB.substring(0, bgColorRGB.indexOf(')')));
			cur_color.r = r;
			cur_color.g = g;
			cur_color.b = b;
			$(".color-rgb").val(get_color_str(cur_color).substring(1, 7));
			$(".color-r").val(cur_color.r);
			$(".color-g").val(cur_color.g);
			$(".color-b").val(cur_color.b);
			reset_cur_color_bar();
			reset_color_view();
			$("input[name=curColor]").change();
		});
		function get_color_str(color)
		{
			var r = color.r < 16 ? "0" + color.r.toString(16) : color.r.toString(16);
			var g = color.g < 16 ? "0" + color.g.toString(16) : color.g.toString(16);
			var b = color.b < 16 ? "0" + color.b.toString(16) : color.b.toString(16);
			return "#" + r + g + b;
		}
		function reset_color1(top, left)
		{
			var r = cur_color_bar.r;
			var g = cur_color_bar.g;
			var b = cur_color_bar.b;
			r = 255 - (255 - r) * left / 100;
			g = 255 - (255 - g) * left / 100;
			b = 255 - (255 - b) * left / 100;
			r = (100 - top) * r / 100;
			g = (100 - top) * g / 100;
			b = (100 - top) * b / 100;
			cur_color.r = parseInt(r);
			cur_color.g = parseInt(g);
			cur_color.b = parseInt(b);
		}
		function reset_color2(top)
		{
			if (top < 100 / 6)
			{
				cur_color_bar.r = 255;
				cur_color_bar.g = 0;
				cur_color_bar.b = parseInt(255 * top * 6 / 100);
			}
			else if (top < 200 / 6)
			{
				cur_color_bar.r = 255 - parseInt(255 * (top - 100 / 6) * 6 / 100);
				cur_color_bar.g = 0;
				cur_color_bar.b = 255;
			}
			else if (top < 300 / 6)
			{
				cur_color_bar.r = 0;
				cur_color_bar.g = parseInt(255 * (top - 200 / 6) * 6 / 100);
				cur_color_bar.b = 255;
			}
			else if (top < 400 / 6)
			{
				cur_color_bar.r = 0;
				cur_color_bar.g = 255;
				cur_color_bar.b = 255 - parseInt(255 * (top - 300 / 6) * 6 / 100);
			}
			else if (top < 500 / 6)
			{
				cur_color_bar.r = parseInt(255 * (top - 400 / 6) * 6 / 100);
				cur_color_bar.g = 255;
				cur_color_bar.b = 0;
			}
			else
			{
				cur_color_bar.r = 255;
				cur_color_bar.g = 255 - parseInt(255 * (top - 500 / 6) * 6 / 100);
				cur_color_bar.b = 0;
			}
		}
		function reset_cur_color_bar()
		{
			var r = cur_color.r;
			var g = cur_color.g;
			var b = cur_color.b;
			
			var max = Math.max(r, g, b);
			var min = Math.min(r, g, b);
			var mdl = 0;
			var top = 100 - parseInt(max * 100 / 255);
			top = top > 100 ? 100 : top < 0 ? 0 : top;
			var left = parseInt((max - min) * 100 / max);
			left = left > 100 ? 100 : left < 0 ? 0 : left;
			var top2 = 0;
			
			if (r == max && g == min || r == min && g == max)
				mdl = b;
			else if (r == max && b == min || r == min && b == max)
				mdl = g;
			else
				mdl = r;
			
			mdl = parseInt(255 - (255 - mdl * 100 / (100 - top)) * 100 / left);
			mdl = mdl < 0 ? 0 : mdl > 255 ? 255 : mdl;
			
			if (r == max && g == min)
			{
				r = 255;
				g = 0;
				b = mdl;
				top2 = parseInt(mdl * 100 / (255 * 6));
			} else if (b == max && g == min) {
				r = mdl;
				g = 0;
				b = 255;
				top2 = parseInt((255 - mdl) * 100 / (255 * 6) + 100 / 6);
			} else if (b == max && r == min) {
				r = 0;
				g = mdl;
				b = 255;
				top2 = parseInt(mdl * 100 / (255 * 6) + 200 / 6);
			} else if (g == max && r == min) {
				r = 0;
				g = 255;
				b = mdl;
				top2 = parseInt((255 - mdl) * 100 / (255 * 6) + 300 / 6);
			} else if (g == max && b == min) {
				r = mdl;
				g = 255;
				b = 0;
				top2 = parseInt(mdl * 100 / (255 * 6) + 400 / 6);
			//} else if (r == max && b == min) {
			} else {
				r = 255;
				g = mdl;
				b = 0;
				top2 = parseInt((255 - mdl) * 100 / (255 * 6) + 500 / 6);
			}
			top2 = top2 > 100 ? 100 : top2 < 0 ? 0 : top2;
			
			pos1.top = top;
			pos1.left = left;
			pos2.top = top2;
			
			cur_color_bar.r = r;
			cur_color_bar.g = g;
			cur_color_bar.b = b;
		}
		function reset_color_view()
		{
			$(".bb-color-picker-background").css('background', get_color_str(cur_color_bar));
			$(".bb-color-picker-pointer1").css('top', pos1.top);
			$(".bb-color-picker-pointer1").css('left', pos1.left);
			$(".bb-color-picker-pointer2").css('background', get_color_str(cur_color_bar));
			$(".bb-color-picker-pointer2").css('top', pos2.top);
		}
		$("input[name=curColor]").change(function(e){
			var ctxt = $(this).val();
			if (ctxt.length == 3 || ctxt.length == 6)
				add_font(for_color == 'for_foreground' ? 'color' : 'background', get_color_str(cur_color));
		});
		/* End Color picker Events */
		
		$('body').prepend(toolbar);
		if ($(node).offset().top < 80)
		{
			$("#bbToolbar_" + eid).css('top', $(node).offset().top + $(node).height());
			$("#bbToolbar_" + eid).css('left', $(node).offset().left);
		}
		else
		{
			$("#bbToolbar_" + eid).css('top', $(node).offset().top - $(".bbToolbar").height() - 8);
			$("#bbToolbar_" + eid).css('left', $(node).offset().left);
		}

		var saveSelection, restoreSelection;
		if (window.getSelection && document.createRange) {
		    saveSelection = function(containerEl) {
		    	try
		    	{
			        var range = window.getSelection().getRangeAt(0);
			        var preSelectionRange = range.cloneRange();
			        preSelectionRange.selectNodeContents(containerEl);
			        preSelectionRange.setEnd(range.startContainer, range.startOffset);
			        var start = preSelectionRange.toString().length;
			        
			        return {
			            start: start,
			            end: start + range.toString().length
			        };
		    	}
		        catch(e)
		        {
					return {start: 0, end: 0};
		        }
		    };

		    restoreSelection = function(containerEl, savedSel) {
		        var charIndex = 0, range = document.createRange();
		        range.setStart(containerEl, 0);
		        range.collapse(true);
		        var nodeStack = [containerEl], node, foundStart = false, stop = false;
		        
		        while (!stop && (node = nodeStack.pop())) {
		            if (node.nodeType == 3) {
		                var nextCharIndex = charIndex + node.length;
		                if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
		                    range.setStart(node, savedSel.start - charIndex);
		                    foundStart = true;
		                }
		                if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
		                    range.setEnd(node, savedSel.end - charIndex);
		                    stop = true;
		                }
		                charIndex = nextCharIndex;
		            } else {
		                var i = node.childNodes.length;
		                while (i--) {
		                    nodeStack.push(node.childNodes[i]);
		                }
		            }
		        }

		        var sel = window.getSelection();
		        sel.removeAllRanges();
		        sel.addRange(range);
		    }
		} else if (document.selection && document.body.createTextRange) {
		    saveSelection = function(containerEl) {
		        var selectedTextRange = document.selection.createRange();
		        var preSelectionTextRange = document.body.createTextRange();
		        preSelectionTextRange.moveToElementText(containerEl);
		        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
		        var start = preSelectionTextRange.text.length;

		        return {
		            start: start,
		            end: start + selectedTextRange.text.length
		        }
		    };

		    restoreSelection = function(containerEl, savedSel) {
		        var textRange = document.body.createTextRange();
		        textRange.moveToElementText(containerEl);
		        textRange.collapse(true);
		        textRange.moveEnd("character", savedSel.end);
		        textRange.moveStart("character", savedSel.start);
		        textRange.select();
		    };
		}
		
		function clean_style_tags(org)
		{
			return org.replace(/<b><\/b>/g, "").replace(/<\/b><b>/g, "").replace(/<i><\/i>/g, "").replace(/<\/i><i>/g, "").replace(/<u><\/u>/g, "").replace(/<\/u><u>/g, "").replace(/<s><\/s>/g, "").replace(/<\/s><s>/g, "");
		}
		
	    function get_substrings(tag)
	    {
	    	var i = -1, j = 0;
			var tagName = '';
			var inTag = false;
			var findStart = false;
			var is_style = false;
			
			var prev_str = '';
			var new_str = '';
			var next_str = '';
			
	    	while(j < end)
	    	{
	    		i++;
				if (j == start)
					findStart = true;
				
	    		if (!findStart)
	    			prev_str += allstr.charAt(i);
	    		else
	    			new_str += allstr.charAt(i);
	    		
				if (allstr.charAt(i) == '<')
				{
					inTag = true;
					tagName = '';
					continue;
				}
				else if (allstr.charAt(i) == '>')
				{
					inTag = false;
					if (tagName == tag)
						is_style = true;
					else if (tagName == '/' + tag)
						is_style = false;
					continue;
				}
				
				if (!inTag)
					j++;
	    	}
	    	next_str = allstr.substring(i + 1, allstr.length);
	    	
	    	if (new_str.charAt(0) == '<')
	    	{
	    		prev_str += new_str.substring(0, new_str.indexOf('>') + 1);
	    		new_str = new_str.substring(new_str.indexOf('>') + 1, new_str.length);
	    	}
	    	
	    	return [prev_str, new_str, next_str];
	    }
		
	    function get_substrings_in_content()
	    {
	    	var i = -1, j = 0;
			var inTag = false;
			var findStart = false;
			
			var prev_str = '';
			var new_str = '';
			var next_str = '';
			
	    	while(j < end)
	    	{
	    		i++;
				if (j == start)
					findStart = true;
				
	    		if (!findStart)
	    			prev_str += allstr.charAt(i);
	    		else
	    			new_str += allstr.charAt(i);
	    		
				if (allstr.charAt(i) == '<')
				{
					inTag = true;
					continue;
				}
				else if (allstr.charAt(i) == '>')
				{
					inTag = false;
					continue;
				}
				
				if (!inTag)
					j++;
	    	}
	    	next_str = allstr.substring(i + 1, allstr.length);
	    	
	    	if (new_str.charAt(0) == '<')
	    	{
	    		prev_str += new_str.substring(0, new_str.indexOf('>') + 1);
	    		new_str = new_str.substring(new_str.indexOf('>') + 1, new_str.length);
			}
	    	while(1)
	    	{
		    	if (new_str.charAt(0) == '<')
		    	{
		    		if (new_str.substring(1, 6) != "table" && new_str.substring(1, 6) != "tbody" && new_str.substring(1, 3) != "tr" && new_str.substring(1, 3) != "td")
		    			break;
		    		prev_str += new_str.substring(0, new_str.indexOf('>') + 1);
		    		new_str = new_str.substring(new_str.indexOf('>') + 1, new_str.length);
		    		continue;
				}
				break;
			}
	    	
	    	return [prev_str, new_str, next_str];
	    }
		
	    function add_style(tag)
	    {
	    	if (start == end)
	    		return;
	    	
	    	var substrs = get_substrings(tag);
	    	var prev_str = substrs[0];
	    	var new_str = substrs[1];
	    	var next_str = substrs[2];
	    	
	    	var open_tag_pos = prev_str.lastIndexOf('<' + tag + '>');
	    	var close_tag_pos = prev_str.lastIndexOf('</' + tag + '>');
	    	var need_open_tag = true;
	    	if (open_tag_pos > close_tag_pos)
	    	{
	    		need_open_tag = false;
	    	}
	    	else if (close_tag_pos > open_tag_pos && close_tag_pos + tag.length + 3 == prev_str.length)
	    	{
	    		need_open_tag = false;
	    		prev_str = prev_str.substring(0, prev_str.length - 3 - tag.length);
	    	}
	    	var need_close_tag = true;
	    	open_tag_pos = next_str.indexOf('<' + tag + '>');
	    	close_tag_pos = next_str.indexOf('</' + tag + '>');
	    	if (open_tag_pos == -1 && close_tag_pos > -1 || open_tag_pos > close_tag_pos)
	    	{
	    		need_close_tag = false;
	    	}
	    	else if (open_tag_pos < close_tag_pos && open_tag_pos == 0)
	    	{
	    		need_close_tag = false;
	    		next_str = next_str.substring(3, next_str.length);
	    	}
	    	
	    	var regexp = new RegExp('<\/?' + tag + '>', 'ig');
	    	new_str = new_str.replace(regexp, "");
	    	
	    	if (!need_open_tag)
	    	{
	    		new_str = prev_str.substring(prev_str.lastIndexOf('<' + tag + '>') + tag.length + 2, prev_str.length) + new_str;
	    		prev_str = prev_str.substring(0, prev_str.lastIndexOf('<' + tag + '>') + tag.length + 2);
	    	}
	    	if (!need_close_tag)
	    	{
	    		new_str += next_str.substring(0, next_str.indexOf('</' + tag + '>'));
	    		next_str = next_str.substring(next_str.indexOf('</' + tag + '>'), next_str.length);
	    	}
	    	
	    	new_str = clean_style_tags(new_str);
	    	var tmp_str = new_str;
	    	var new_content = '';
	    	i = -1;
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('<');
	    		if (i < 0)
	    		{
	    			break;
	    		}
		    	new_content += tmp_str.substring(0, i) + "</" + tag + ">";
		    	tmp_str = tmp_str.substring(i, tmp_str.length);
	    		i = tmp_str.indexOf('>');
		    	new_content += tmp_str.substring(0, i + 1) + "<" + tag + ">";
		    	tmp_str = tmp_str.substring(i + 1, tmp_str.length);
	    	}
	    	new_content += tmp_str;
	    	
	    	if (need_open_tag)
	    		prev_str += '<' + tag + '>';
	    	if (need_close_tag)
	    		next_str = '</' + tag + '>' + next_str;
	    	
	    	new_str = clean_style_tags(prev_str + new_content + next_str);
	    	$(node).html(new_str);
			initBBEvent(eid);
	    	allstr = new_str;
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
	    }
	    function remove_style(tag)
	    {
	    	if (start == end)
	    		return;
	    	
	    	var substrs = get_substrings(tag);
	    	var prev_str = substrs[0];
	    	var new_str = substrs[1];
	    	var next_str = substrs[2];
	    	
	    	var new_pstr = '';
	    	if (prev_str.lastIndexOf('<' + tag + '>') != -1)
	    	{
	    		new_pstr = prev_str.substring(prev_str.lastIndexOf('<' + tag + '>') + tag.length + 2, prev_str.length);
	    		prev_str = prev_str.substring(0, prev_str.lastIndexOf('<' + tag + '>') + tag.length + 2);
	    	}
	    	var new_nstr = '';
	    	if (prev_str.indexOf('</' + tag + '>') != -1)
	    	{
		    	new_nstr = next_str.substring(0, next_str.indexOf('</' + tag + '>'));
		    	next_str = next_str.substring(next_str.indexOf('</' + tag + '>'), next_str.length);
		    }
	    	
	    	var opened_tags = [];
	    	var tmp_str = new_pstr;
	    	var i = -1;
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('<');
	    		if (i < 0)
	    			break;
	    		if (tmp_str.charAt(i + 1) == '/')
	    		{
	    			opened_tags.pop();
	    		} else {
	    			opened_tags.push(tmp_str.substring(i + 1, tmp_str.indexOf('>')));
	    		}
	    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
	    	}
	    	
	    	for (i = 0; i < opened_tags.length; i++)
	    	{
	    		if (opened_tags[opened_tags.length - i - 1].indexOf(' ') > -1)
	    			new_pstr += '</' + opened_tags[opened_tags.length - i - 1].substring(0, opened_tags[opened_tags.length - i - 1].indexOf(' ')) + '>';
	    		else
	    			new_pstr += '</' + opened_tags[opened_tags.length - i - 1] + '>';
	    	}
	    	new_pstr += '</' + tag + '>';
	    	for (i = 0; i < opened_tags.length; i++)
	    	{
	    		new_pstr += '<' + opened_tags[i] + '>';
	    	}
	    	
	    	var regexp = new RegExp('<\/?' + tag + '>', 'ig');
	    	new_str = new_str.replace(regexp, "");
	    	tmp_str = new_str;
	    	i = -1;
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('<');
	    		if (i < 0)
	    			break;
	    		if (tmp_str.charAt(i + 1) == '/')
	    		{
	    			opened_tags.pop();
	    		} else {
	    			opened_tags.push(tmp_str.substring(i + 1, tmp_str.indexOf('>')));
	    		}
	    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
	    	}
	    	
	    	for (i = 0; i < opened_tags.length; i++)
	    	{
	    		new_nstr = '<' + opened_tags[opened_tags.length - i - 1] + '>' + new_nstr;
	    	}
	    	new_nstr = '<' + tag + '>' + new_nstr;
	    	for (i = 0; i < opened_tags.length; i++)
	    	{
	    		if (opened_tags[opened_tags.length - i - 1].indexOf(' ') > -1)
	    			new_nstr = '</' + opened_tags[opened_tags.length - i - 1].substring(0, opened_tags[opened_tags.length - i - 1].indexOf(' ')) + '>' + new_nstr;
	    		else
	    			new_nstr = '</' + opened_tags[opened_tags.length - i - 1] + '>' + new_nstr;
	    	}
	    	
	    	new_str = prev_str + new_pstr + new_str + new_nstr + next_str;
	    	
	    	$(node).html(new_str);
			initBBEvent(eid);
	    	allstr = new_str;
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
	    }
		var check_style = function(tag)
		{
			var i = -1, j = 0;
			var tagName = '';
			var inTag = false;
			var findStart = false;
			var is_style = false;
			var tmp_start = 0;
			
			if (start == end && start > 0)
				tmp_start = start - 1;
			else
				tmp_start = start;
			
			while(tmp_start == end && j <= end || tmp_start != end && j < end)
			{
				i++;
				if (allstr.charAt(i) == '<')
				{
					inTag = true;
					tagName = '';
					continue;
				}
				else if (allstr.charAt(i) == '>')
				{
					inTag = false;
					if (tagName == tag)
						is_style = true;
					else if (tagName == '/' + tag)
						is_style = false;
					continue;
				}
				
				if (inTag)
				{
					tagName += allstr.charAt(i);
					continue;
				}
				
				if (j == tmp_start)
					findStart = true;
				if (findStart && !is_style)
					return false;
				
				if (!inTag)
					j++;
			}
			
			return true;
		};
		var check_link = function()
		{
			var tag = 'a';
			var i = -1, j = 0;
			var tagName = '';
			var inTag = false;
			var findStart = false;
			var is_link = false;
			var tmp_start = 0;
			
			if (start == end && start > 0)
				tmp_start = start - 1;
			else
				tmp_start = start;
			
			while(tmp_start == end && j <= end || tmp_start != end && j < end)
			{
				i++;
				if (allstr.charAt(i) == '<')
				{
					inTag = true;
					tagName = '';
					continue;
				}
				else if (allstr.charAt(i) == '>')
				{
					inTag = false;
					if (tagName.indexOf(' ') != -1)
						tagName = tagName.substring(0, tagName.indexOf(' '));
					if (tagName == tag)
						is_link = true;
					if (tagName == '/' + tag)
						is_link = false;
					continue;
				}
				
				if (inTag)
				{
					tagName += allstr.charAt(i);
					continue;
				}
				
				if (j >= end)
					return false;
				if (j == tmp_start)
					findStart = true;
				if (findStart && is_link)
					return true;
				
				if (!inTag)
					j++;
			}
			
			return false;
		};
		var check_font = function(csskind)
		{
			var i = -1, j = 0;
			var tagName = '';
			var inTag = false;
			var findStart = false;
			var font = [''];
			var result = '';
			var tmp_start = 0;
			var find_cnt = 0;
			
			if (start == end && start > 0)
				tmp_start = start - 1;
			else
				tmp_start = start;
			
			while(tmp_start == end && j <= end || tmp_start != end && j < end)
			{
				i++;
				if (allstr.charAt(i) == '<')
				{
					inTag = true;
					tagName = '';
					continue;
				}
				else if (allstr.charAt(i) == '>')
				{
					inTag = false;
					if ((tagName == "/span" && csskind != 'line-height' || tagName == "/p" && csskind == 'line-height') && find_cnt > 0)
					{
						font.splice(font.length - 1, 1);
						find_cnt--;
						continue;
					}
					var tmptag = tagName;
					k = tmptag.indexOf(csskind + ':');
					if (k < 0)
					{
						delete tmptag;
						continue;
					}
					tmptag = tmptag.substring(k + csskind.length + 1, tmptag.length);
					k = tmptag.indexOf(';');
					tmptag = tmptag.substring(0, k);
					font.push(tmptag);
					find_cnt++;
					delete tmptag;
					continue;
				}
				
				if (inTag)
				{
					tagName += allstr.charAt(i);
					continue;
				}
				
				if (j == tmp_start)
					findStart = true;
				if (findStart)
				{
					if (result == '')
					{
						result = font[font.length - 1];
					} else if (result != font[font.length - 1]) {
						result = '';
						return result;
					}
				}
				
				if (!inTag)
					j++;
			}
			
			if (result == '')
				result = $(node).css(csskind);
			
			if (typeof(result) == "string" && result.charAt(0) == "'")
				result = result.substring(1, result.length - 1);
			
			if (csskind == 'line-height' && result == 'normal')
				result = 0;
			
			return result;
		};
		
	    function add_font_to_newstr(newstr, sname, svalue)
	    {
    		var opened_tags = [];
    		tmp_str = newstr;
    		while(1)
	    	{
	    		j = tmp_str.indexOf('<');
	    		if (j < 0)
	    			break;
	    		if (tmp_str.charAt(j + 1) == '/')
	    		{
	    		} else {
	    			opened_tags.push(tmp_str.substring(j + 1, tmp_str.indexOf('>')));
	    		}
	    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
	    	}
	    	var k = -1, l = -1, m = -1;
	    	var style = '';
	    	var prev_style = '';
	    	for (j = 0; j < opened_tags.length; j++)
	    	{
	    		if (opened_tags[j].substring(0, 4) == 'span')
	    		{
	    			k = opened_tags[j].indexOf('style=');
	    			if (k < 0)
	    			{
	    				opened_tags[j] = '';
	    				continue;
	    			}
	    			style = opened_tags[j].substring(k + 7, opened_tags[j].length - 1);
	    			l = style.indexOf(sname);
	    			if (l < 0)
	    			{
	    				continue;
	    			}
	    			prev_style = opened_tags[j].substring(0, k + 7);
	    			opened_tags[j] = opened_tags[j].substring(l + style.length, opened_tags[j].length);
	    			m = opened_tags[j].indexOf(';');
	    			opened_tags[j] = opened_tags[j].substring(m + 1, opened_tags[j].length);
	    			opened_tags[j] = prev_style + opened_tags[j];
	    			if (opened_tags[j].length < 14)
	    				opened_tags[j] = '';
	    		}
	    	}
    		tmp_str = newstr;
    		newstr = '';
    		k = -1;
    		open_tag_pri = 0;
    		close_tag_pri = 0;
    		var taginfo = '';
	    	while (1)
	    	{
	    		k = tmp_str.indexOf('<');
	    		if (k < 0)
	    			break;
	    		newstr += tmp_str.substring(0, k);
	    		if (tmp_str.charAt(k + 1) == '/')
	    		{
	    			close_tag_pri++;
	    			taginfo = opened_tags[open_tag_pri - close_tag_pri];
	    			if (taginfo != "")
	    			{
		    			l = taginfo.indexOf(' ');
		    			if (l < 0)
		    			{
		    				newstr += '</' + taginfo + '>';
		    			} else {
		    				newstr += '</' + taginfo.substring(0, l) + '>';
		    			}
		    		}
		    		open_tag_pri--;
		    		close_tag_pri--;
		    		opened_tags.splice(open_tag_pri, 1);
	    		}
	    		else
	    		{
	    			open_tag_pri++;
	    			taginfo = opened_tags[open_tag_pri - 1];
	    			if (taginfo != "")
	    			{
		    			newstr += '<' + taginfo + '>';
	    			}
	    		}
		    	l = tmp_str.indexOf('>');
		    	tmp_str = tmp_str.substring(l + 1, tmp_str.length);
	    	}
	    	newstr += tmp_str;
	    	
	    	return '<span style="' + sname + ':' + svalue + ';">' + newstr + '</span>';
	    }
	    function add_font(sname, svalue)
	    {
	    	if (start == end)
	    		return;
	    	
	    	var substrs = get_substrings_in_content();
	    	var prev_str = substrs[0];
	    	var new_str = substrs[1];
	    	var next_str = substrs[2];
	    	
	    	if (new_str.indexOf('<table>') > -1)
	    		return;
	    	if (new_str.indexOf('<table ') > -1)
	    		return;
	    	if (new_str.indexOf('<tbody>') > -1)
	    		return;
	    	if (new_str.indexOf('<tr>') > -1)
	    		return;
	    	if (new_str.indexOf('<tr ') > -1)
	    		return;
	    	if (new_str.indexOf('<td>') > -1)
	    		return;
	    	if (new_str.indexOf('<td ') > -1)
	    		return;
	    	if (new_str.indexOf('</td>') > -1)
	    		return;
	    	if (new_str.indexOf('</tr>') > -1)
	    		return;
	    	if (new_str.indexOf('</tbody>') > -1)
	    		return;
	    	if (new_str.indexOf('</table>') > -1)
	    		return;
	    	
	    	var i = prev_str.indexOf('>');
	    	var first_tag = prev_str.substring(1, i);
	    	var real_first_tag = first_tag;
	    	prev_str = prev_str.substring(i + 1, prev_str.length);
	    	i = next_str.lastIndexOf('<');
	    	var last_tag = next_str.substring(i, next_str.length);
	    	next_str = next_str.substring(0, i);
	    	
	    	var temp_first_tag = first_tag;
	    	var tmp_str = prev_str;
	    	var first_str = '';
	    	while(1)
	    	{
	    		j = temp_first_tag.indexOf(' ');
	    		if (j < 0)
	    			first_tag_name = temp_first_tag;
	    		else
	    			first_tag_name = temp_first_tag.substring(0, j);
	    		
	    		i = tmp_str.indexOf('</' + first_tag_name + '>');
	    		if (i < 0)
	    			break;
	    		
	    		first_str += tmp_str.substring(0, i) + '</' + first_tag_name + '>';
	    		tmp_str = tmp_str.substring(i + 3 + first_tag_name.length, tmp_str.length);
	    		i = tmp_str.indexOf('>');
	    		temp_first_tag = tmp_str.substring(1, i);
	    		first_str += tmp_str.substring(0, i + 1);
	    		tmp_str = tmp_str.substring(i + 1, tmp_str.length);
	    	}
	    	first_tag = temp_first_tag;
	    	prev_str = tmp_str;
	    	
	    	var tmp_first_tag = first_tag;
	    	i = tmp_first_tag.indexOf(' ');
	    	if (i > -1)
	    		tmp_first_tag = tmp_first_tag.substring(0, i);
	    	if (tmp_first_tag == "table")
	    	{
	    		new_str = add_font_to_newstr(new_str, sname, svalue);
		    	new_str = clean_style_tags('<' + real_first_tag + '>' + first_str + prev_str + new_str + next_str + last_tag);
		    	$(node).html(new_str);
				initBBEvent(eid);
		    	allstr = new_str;
		    	allstrlog.splice(curIndex + 1, allstrlog.length);
				allstrlog.push(allstr);
				curIndex = allstrlog.length - 1;
				realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
				$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
				$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
				$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
				$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
	    		return;
	    	}
	    	
	    	var new_strs = [];
	    	i = -1;
	    	var j = -1;
	    	temp_first_tag = first_tag;
	    	var first_tag_name = '';
	    	var first_tags = [first_tag];
	    	var tmp_str = new_str;
	    	while(1)
	    	{
	    		j = temp_first_tag.indexOf(' ');
	    		if (j < 0)
	    			first_tag_name = temp_first_tag;
	    		else
	    			first_tag_name = temp_first_tag.substring(0, j);
	    		
	    		i = tmp_str.indexOf('</' + first_tag_name + '>');
	    		if (i < 0)
	    			break;
	    		
	    		new_strs.push(tmp_str.substring(0, i));
	    		tmp_str = tmp_str.substring(i + 3 + first_tag_name.length, tmp_str.length);
	    		i = tmp_str.indexOf('>');
	    		temp_first_tag = tmp_str.substring(1, i);
	    		first_tags.push(temp_first_tag)
	    		tmp_str = tmp_str.substring(i + 1, tmp_str.length);
	    	}
	    	new_strs.push(tmp_str);
	    	
	    	var opened_tags = [];
	    	tmp_str = prev_str;
	    	i = -1;
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('<');
	    		if (i < 0)
	    			break;
	    		if (tmp_str.charAt(i + 1) == '/')
	    		{
	    			opened_tags.pop();
	    		} else {
	    			opened_tags.push(tmp_str.substring(i + 1, tmp_str.indexOf('>')));
	    		}
	    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
	    	}
	    	
	    	for (i = 0; i < opened_tags.length; i++)
	    	{
	    		if (opened_tags[opened_tags.length - i - 1].indexOf(' ') > -1)
	    			prev_str += '</' + opened_tags[opened_tags.length - i - 1].substring(0, opened_tags[opened_tags.length - i - 1].indexOf(' ')) + '>';
	    		else
	    			prev_str += '</' + opened_tags[opened_tags.length - i - 1] + '>';
	    	}
	    	
	    	for (i = 0; i < opened_tags.length; i++)
	    	{
	    		new_strs[0] = '<' + opened_tags[opened_tags.length - i - 1] + '>' + new_strs[0];
	    	}
	    	
	    	opened_tags = [];
	    	tmp_str = new_strs[0];
	    	i = -1;
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('<');
	    		if (i < 0)
	    			break;
	    		if (tmp_str.charAt(i + 1) == '/')
	    		{
	    			opened_tags.pop();
	    		} else {
	    			opened_tags.push(tmp_str.substring(i + 1, tmp_str.indexOf('>')));
	    		}
	    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
	    	}
	    	
	    	var last_opened_tags = [];
	    	if (new_strs.length > 1)
	    	{
		    	tmp_str = new_strs[new_strs.length - 1];
		    	i = -1;
		    	while(1)
		    	{
		    		i = tmp_str.indexOf('<');
		    		if (i < 0)
		    			break;
		    		if (tmp_str.charAt(i + 1) == '/')
		    		{
		    			last_opened_tags.pop();
		    		} else {
		    			last_opened_tags.push(tmp_str.substring(i + 1, tmp_str.indexOf('>')));
		    		}
		    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
		    	}
		    }
	    	
	    	for (i = 0; i < opened_tags.length; i++)
	    	{
	    		if (opened_tags[opened_tags.length - i - 1].indexOf(' ') > -1)
	    			new_strs[0] += '</' + opened_tags[opened_tags.length - i - 1].substring(0, opened_tags[opened_tags.length - i - 1].indexOf(' ')) + '>';
	    		else
	    			new_strs[0] += '</' + opened_tags[opened_tags.length - i - 1] + '>';
	    	}
	    	
	    	if (new_strs.length > 1)
	    	{
		    	for (i = 0; i < last_opened_tags.length; i++)
		    	{
		    		if (last_opened_tags[last_opened_tags.length - i - 1].indexOf(' ') > -1)
		    			new_strs[new_strs.length - 1] += '</' + last_opened_tags[last_opened_tags.length - i - 1].substring(0, last_opened_tags[last_opened_tags.length - i - 1].indexOf(' ')) + '>';
		    		else
		    			new_strs[new_strs.length - 1] += '</' + last_opened_tags[last_opened_tags.length - i - 1] + '>';
		    	}
		    	for (i = 0; i < last_opened_tags.length; i++)
		    	{
		    		next_str = '<' + last_opened_tags[i] + '>' + next_str;
		    	}
	    	} else {
		    	for (i = 0; i < opened_tags.length; i++)
		    	{
		    		next_str = '<' + opened_tags[opened_tags.length - i - 1] + '>' + next_str;
		    	}
	    	}
	    	
	    	var j = 0;
	    	for (i = 0; i < new_strs.length; i++)
	    	{
	    		new_strs[i] = add_font_to_newstr(new_strs[i], sname, svalue);
		    }
		    
		    new_str = '';
		    for (i = 0; i < new_strs.length; i++)
		    {
		    	if (i > 0)
		    		new_str += '<' + first_tags[i] + '>';
		    //	new_str += '<span style="' + sname + ':' + svalue + ';">' + new_strs[i] + '</span>';
		    	new_str += new_strs[i];
		    	if (i < new_strs.length - 1)
		    	{
		    		j = first_tags.indexOf(' ');
		    		if (j < 0)
		    			new_str += '</' + first_tags[i] + '>';
		    		else
		    			new_str += '</' + first_tags[i].substring(0, j - 1) + '>';
		    	}
		    }
	    	
	    	new_str = clean_style_tags('<' + real_first_tag + '>' + first_str + prev_str + new_str + next_str + last_tag);
	    	$(node).html(new_str);
			initBBEvent(eid);
	    	allstr = new_str;
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
	    }
	    
	    function set_top_style(sname, svalue)
	    {
	    	var substrs = get_substrings_in_content();
	    	var prev_str = substrs[0];
	    	var new_str = substrs[1];
	    	var next_str = substrs[2];
	    	
	    	var tmp_str = prev_str;
	    	var i = tmp_str.indexOf('>');
	    	var first_tag = tmp_str.substring(1, i);
	    	var first_str = '';
	    	while(1)
	    	{
	    		i = first_tag.indexOf(' ');
	    		if (i < 0)
	    			first_tag_name = first_tag;
	    		else
	    			first_tag_name = first_tag.substring(0, i);
	    		
	    		i = tmp_str.indexOf('</' + first_tag_name + '>');
	    		if (i < 0)
	    			break;
	    		
	    		first_str += tmp_str.substring(0, i) + '</' + first_tag_name + '>';
	    		tmp_str = tmp_str.substring(i + 3 + first_tag_name.length, tmp_str.length);
	    		i = tmp_str.indexOf('>');
	    		first_tag = tmp_str.substring(1, i);
	    	}
	    	prev_str = first_str;
	    	tmp_str += new_str;
	    	new_str = '';
	    	var sep = '';
	    	var style = '';
	    	var regexp = null;
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('>');
	    		if (i < 0)
	    			break;
	    		
	    		first_tag = tmp_str.substring(1, i);
	    		tmp_str = tmp_str.substring(i + 1, tmp_str.length);
	    		
	    		i = first_tag.indexOf(' ');
	    		if (i < 0)
	    		{
	    			first_tag_name = first_tag;
	    			if (first_tag_name != 'table')
		    			new_str += '<' + first_tag + ' style="' + sname + ':' + svalue + ';">';
		    		else if (svalue != 'justify')
		    			new_str += '<' + first_tag + ' align="' + svalue + '">';
		    		else
		    			new_str += '<' + first_tag + ' width="100%">';
	    		}
	    		else
	    		{
	    			first_tag_name = first_tag.substring(0, i);
	    			if (first_tag_name == 'table')
	    			{
	    				if (sname == 'line-height')
	    					return;
	    				if (svalue == "justify")
	    				{
		    				i = first_tag.indexOf("width=");
		    				if (i < 0)
		    					new_str += '<' + first_tag + ' width="100%">';
		    				else
		    				{
		    					new_str += '<' + first_tag + ' width="100%"';
		    					i = first_tag.indexOf(' ');
		    					if (i < 0)
		    						new_str += '>';
		    					else
		    						new_str += first_tag.substring(i, first_tag.length);
		    				}
	    				}
	    				else
	    				{
	    					regexp = new RegExp(' width=100%', 'g');
	    					first_tag = first_tag.replace(regexp, '');
	    					regexp = new RegExp(' width="100%"', 'g');
	    					first_tag = first_tag.replace(regexp, '');
	    					regexp = new RegExp(" width='100%'", 'g');
	    					first_tag = first_tag.replace(regexp, '');
	    					
		    				i = first_tag.indexOf("align=");
		    				if (i < 0)
		    				{
		    					new_str += '<' + first_tag + ' align="' + svalue + '">';
		    				} else {
		    					new_str += '<' + first_tag.substring(0, i) + 'align="' + svalue + '"';
		    					first_tag = first_tag.substring(i, first_tag.length);
		    					i = first_tag.indexOf(' ');
		    					if (i < 0)
		    						new_str += '>';
		    					else
		    						new_str += first_tag.substring(i, first_tag.length) + ">";
		    				}
	    				}
	    			}
	    			else
	    			{
		    			i = first_tag.indexOf("style=");
		    			if (i < 0)
		    			{
			    			new_str += '<' + first_tag + ' style="' + sname + ':' + svalue + ';">';
		    			}
		    			else
		    			{
			    			sep = first_tag.charAt(i + 6);
			    			style = first_tag.substring(i + 7, first_tag.length);
			    			style = style.substring(0, style.indexOf(sep));
			    			i = style.indexOf(sname + ':');
			    			if (i < 0)
			    			{
			    				new_str += '<' + first_tag_name + ' style=' + sep + style + sname + ":" + svalue + ";" + sep + '>';
			    			}
			    			else
			    			{
			    				new_str += '<' + first_tag_name + ' style=' + sep + style.substring(0, i) + sname + ":" + svalue + ";";
			    				style = style.substring(i + 1, style.length);
			    				style = style.substring(style.indexOf(';') + 1, style.length);
			    				new_str += style + sep + '>';
			    			}
			    		}
	    			}
	    		}
	    		
	    		i = tmp_str.indexOf('</' + first_tag_name + '>');
	    		if (i < 0)
	    			break;
	    		
	    		new_str += tmp_str.substring(0, i) + '</' + first_tag_name + '>';
	    		tmp_str = tmp_str.substring(i + 3 + first_tag_name.length, tmp_str.length);
	    	}
	    	new_str += tmp_str;
	    	
	    	new_str = clean_style_tags(prev_str + new_str + next_str);
	    	$(node).html(new_str);
			initBBEvent(eid);
	    	allstr = new_str;
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
	    }
	    
	    function add_separate()
	    {
	    	var substrs = get_substrings_in_content();
	    	var prev_str = substrs[0];
	    	var new_str = substrs[1];
	    	var next_str = substrs[2];
	    	
	    	var tmp_str = prev_str;
	    	var i = tmp_str.indexOf('>');
	    	var first_tag = tmp_str.substring(1, i);
	    	var first_str = '';
	    	while(1)
	    	{
	    		i = first_tag.indexOf(' ');
	    		if (i < 0)
	    			first_tag_name = first_tag;
	    		else
	    			first_tag_name = first_tag.substring(0, i);
	    		
	    		i = tmp_str.indexOf('</' + first_tag_name + '>');
	    		if (i < 0)
	    			break;
	    		
	    		first_str += tmp_str.substring(0, i) + '</' + first_tag_name + '>';
	    		tmp_str = tmp_str.substring(i + 3 + first_tag_name.length, tmp_str.length);
	    		i = tmp_str.indexOf('>');
	    		first_tag = tmp_str.substring(1, i);
	    	}
	    	prev_str = first_str;
	    	new_str = "<hr></hr>" + tmp_str + new_str;
	    	
	    	new_str = clean_style_tags(prev_str + new_str + next_str);
	    	$(node).html(new_str);
			initBBEvent(eid);
	    	allstr = new_str;
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
	    }
		
		var is_bold = false;
		var is_italic = false;
		var is_underline = false;
		var is_strikethrough = false;
		var is_linked = false;
		var focus_font_family = '';
		var focus_font_size = '';
		var focus_letter_spacing = '';
		var focus_line_height = '';
		function setToolbarButtons()
		{
	        is_bold = check_style("b");
	        is_italic = check_style("i");
	        is_underline = check_style("u");
	        is_strikethrough = check_style("s");
	        is_linked = check_link();
	        
	        focus_font_family = check_font('font-family');
	        focus_font_size = check_font('font-size');
	        focus_letter_spacing = check_font('letter-spacing');
	        focus_line_height = check_font('line-height');
	        
	        if (is_bold)
	        	$('#bbToolbar_' + eid + ' .btn-style-bold').addClass('bb-selection');
	        else
	        	$('#bbToolbar_' + eid + ' .btn-style-bold').removeClass('bb-selection');
	        if (is_italic)
	        	$('#bbToolbar_' + eid + ' .btn-style-italic').addClass('bb-selection');
	        else
	        	$('#bbToolbar_' + eid + ' .btn-style-italic').removeClass('bb-selection');
	        if (is_underline)
	        	$('#bbToolbar_' + eid + ' .btn-style-underline').addClass('bb-selection');
	        else
	        	$('#bbToolbar_' + eid + ' .btn-style-underline').removeClass('bb-selection');
	        if (is_strikethrough)
	        	$('#bbToolbar_' + eid + ' .btn-style-strikethrough').addClass('bb-selection');
	        else
	        	$('#bbToolbar_' + eid + ' .btn-style-strikethrough').removeClass('bb-selection');
	        if (is_linked)
	        {
	        	$('#bbToolbar_' + eid + ' .btn-link').removeClass('bb-btn-enable');
	        	$('#bbToolbar_' + eid + ' .btn-link').addClass('bb-btn-disable');
	        	$('#bbToolbar_' + eid + ' .btn-unlink').removeClass('bb-btn-disable');
	        	$('#bbToolbar_' + eid + ' .btn-unlink').removeClass('bb-btn-enable');
	        }
	        else
	        {
	        	$('#bbToolbar_' + eid + ' .btn-link').removeClass('bb-btn-disable');
	        	if (start != end)
		        	$('#bbToolbar_' + eid + ' .btn-link').addClass('bb-btn-enable');
		        else
		        	$('#bbToolbar_' + eid + ' .btn-link').removeClass('bb-btn-enable');
	        	$('#bbToolbar_' + eid + ' .btn-unlink').removeClass('bb-btn-enable');
	        	$('#bbToolbar_' + eid + ' .btn-unlink').addClass('bb-btn-disable');
	        }
	        
	        $('#bbToolbar_' + eid + ' .btn-font-family').html(focus_font_family);
	        $('#bbToolbar_' + eid + ' .btn-font-size').html(focus_font_size);
	        $('#bbToolbar_' + eid + ' .btn-letter-spacing').html(focus_letter_spacing);
	        $('#bbToolbar_' + eid + ' .btn-line-height').html(focus_line_height);
		}
		function insert_link_to_substr(substr, linkurl, is_new)
		{
			var opened_tags = [];
	    	var tmp_str = substr;
	    	var next_str = '';
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('<');
	    		if (i < 0)
	    			break;
	    		if (tmp_str.charAt(i + 1) == '/')
	    		{
	    			opened_tags.pop();
	    		} else {
	    			opened_tags.push(tmp_str.substring(i + 1, tmp_str.indexOf('>')));
	    		}
	    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
	    	}
	    	
	    	for(i = 0; i < opened_tags.length; i++)
	    	{
	    		j = opened_tags[opened_tags.length - i - 1].indexOf(' ');
	    		if (j < 0)
	    			substr += "</" + opened_tags[opened_tags.length - i - 1] + ">";
	    		else
	    			substr += "</" + opened_tags[opened_tags.length - i - 1].substring(0, j) + ">";
	    		next_str = "<" + opened_tags[opened_tags.length - i - 1] + ">" + next_str;
	    	}
	    	return '<a href="' + linkurl + '"' + (is_new ? ' target="_blank"' : '') + '>' + substr + "</a>" + next_str;
		}
		function insert_link(linkurl, is_new)
		{
			var substrs = get_substrings_in_content();
	    	var prev_str = substrs[0];
	    	var new_str = substrs[1];
	    	var next_str = substrs[2];
	    	
	    	if (new_str.indexOf('<table>') > -1)
	    		return;
	    	if (new_str.indexOf('<table ') > -1)
	    		return;
	    	if (new_str.indexOf('<tbody>') > -1)
	    		return;
	    	if (new_str.indexOf('<tr>') > -1)
	    		return;
	    	if (new_str.indexOf('<tr ') > -1)
	    		return;
	    	if (new_str.indexOf('<td>') > -1)
	    		return;
	    	if (new_str.indexOf('<td ') > -1)
	    		return;
	    	if (new_str.indexOf('</td>') > -1)
	    		return;
	    	if (new_str.indexOf('</tr>') > -1)
	    		return;
	    	if (new_str.indexOf('</tbody>') > -1)
	    		return;
	    	if (new_str.indexOf('</table>') > -1)
	    		return;
	    	
	    	var tmp_str = prev_str;
	    	var i = tmp_str.indexOf('>');
	    	var first_tag = tmp_str.substring(1, i);
	    	var first_str = '';
	    	while(1)
	    	{
	    		i = first_tag.indexOf(' ');
	    		if (i < 0)
	    			first_tag_name = first_tag;
	    		else
	    			first_tag_name = first_tag.substring(0, i);
	    		
	    		i = tmp_str.indexOf('</' + first_tag_name + '>');
	    		if (i < 0)
	    			break;
	    		
	    		first_str += tmp_str.substring(0, i) + '</' + first_tag_name + '>';
	    		tmp_str = tmp_str.substring(i + 3 + first_tag_name.length, tmp_str.length);
	    		i = tmp_str.indexOf('>');
	    		first_tag = tmp_str.substring(1, i);
	    	}
	    	prev_str = tmp_str;
	    	i = prev_str.indexOf('>');
	    	first_str += prev_str.substring(0, i + 1);
	    	prev_str = prev_str.substring(i + 1, prev_str.length);
	    	
    		i = first_tag.indexOf(' ');
    		if (i < 0)
    			first_tag_name = first_tag;
    		else
    			first_tag_name = first_tag.substring(0, i);
    		
    		if (first_tag_name == "table")
    		{
    			new_str = first_str + prev_str + insert_link_to_substr(new_str, linkurl, is_new) + next_str;
		    	$(node).html(new_str);
				initBBEvent(eid);
		    	allstr = new_str;
		    	allstrlog.splice(curIndex + 1, allstrlog.length);
				allstrlog.push(allstr);
				curIndex = allstrlog.length - 1;
				realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
				$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
				$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
				$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
				$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
				return;
    		}
    		
    		i = new_str.indexOf('</' + first_tag_name + '>');
    		if (i > -1)
    		{
    			next_str = new_str.substring(i, new_str.length) + next_str;
    			new_str = new_str.substring(0, i);
    		}
	    	
	    	var opened_tags = [];
	    	var tmp_str = prev_str;
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('<');
	    		if (i < 0)
	    			break;
	    		if (tmp_str.charAt(i + 1) == '/')
	    		{
	    			opened_tags.pop();
	    		} else {
	    			opened_tags.push(tmp_str.substring(i + 1, tmp_str.indexOf('>')));
	    		}
	    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
	    	}
	    	
	    	for(i = 0; i < opened_tags.length; i++)
	    	{
	    		j = opened_tags[opened_tags.length - i - 1].indexOf(' ');
	    		if (j < 0)
	    			prev_str += "</" + opened_tags[opened_tags.length - i - 1] + ">";
	    		else
	    			prev_str += "</" + opened_tags[opened_tags.length - i - 1].substring(0, j) + ">";
	    		new_str = "<" + opened_tags[opened_tags.length - i - 1] + ">" + new_str;
	    	}
    		
	    	new_str = first_str + prev_str + insert_link_to_substr(new_str, linkurl, is_new) + next_str;
	    	
	    	$(node).html(new_str);
			initBBEvent(eid);
	    	allstr = new_str;
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
		}
		function remove_link()
		{
			var substrs = get_substrings_in_content();
	    	var prev_str = substrs[0];
	    	var new_str = substrs[1];
	    	var next_str = substrs[2];
	    	
	    	var i = -1, j = -1;
	    	i = prev_str.lastIndexOf("<a ");
	    	j = prev_str.lastIndexOf("</a>");
	    	if (i > j)
	    	{
	    		new_str = prev_str.substring(i, prev_str.length) + new_str;
	    		prev_str = prev_str.substring(0, i);
	    	}
	    	i = next_str.indexOf("<a ");
	    	j = next_str.indexOf("</a>");
	    	if (i > j || i == -1 && j > -1)
	    	{
	    		new_str += next_str.substring(0, j + 4);
	    		next_str = next_str.substring(j + 4, next_str.length);
	    	}
	    	
	    	var tmp_str = new_str;
	    	var tag_str = '';
	    	new_str = '';
	    	while(1)
	    	{
	    		i = tmp_str.indexOf('<');
	    		if (i < 0)
	    			break;
	    		new_str += tmp_str.substring(0, i);
	    		tag_str = tmp_str.substring(i + 1, tmp_str.indexOf('>'));
	    		if (tag_str.charAt(0) == '/')
	    		{
	    			if (tag_str != '/a')
	    				new_str += '<' + tag_str + '>';
	    		}
	    		else
	    		{
	    			if (tag_str.indexOf(' ') < 0)
	    			{
	    				if (tag_str != 'a')
	    					new_str += '<' + tag_str + '>';
	    			}
	    			else
	    			{
	    				if (tag_str.substring(0, tag_str.indexOf(' ')) != 'a')
	    					new_str += '<' + tag_str + '>';
	    			}
	    		}
	    		tmp_str = tmp_str.substring(tmp_str.indexOf('>') + 1, tmp_str.length);
	    	}
	    	new_str += tmp_str;
	    	
	    	new_str = prev_str + new_str + next_str;
	    	
	    	$(node).html(new_str);
			initBBEvent(eid);
	    	allstr = new_str;
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
		}
		var cur_find_pos = 0;
		function find_string(find_str, is_match_case, is_match_word, is_match_cyclic)
		{
			var matchopt = 'g';
			if (!is_match_case)
				matchopt += 'i';
			
			var regexp;
			
			if (is_match_word)
				regexp = new RegExp('[^a-zA-Z0-9]' + find_str + '[^a-zA-Z0-9]', matchopt);
			else
				regexp = new RegExp(find_str, matchopt);
			
			var re;
			var new_str = '';
			while(re = regexp.exec(allstr))
			{
				if (start > re.index)
					continue;
				if (is_match_word)
					new_str = allstr.substring(0, re.index + 1) + '<span style="background:#ff0">' + JSON.stringify(re).substring(3, JSON.stringify(re).length - 3) + '</span>' + allstr.substring(regexp.lastIndex - 1, allstr.length);
				else
					new_str = allstr.substring(0, re.index) + '<span style="background:#ff0">' + JSON.stringify(re).substring(2, JSON.stringify(re).length - 2) + '</span>' + allstr.substring(regexp.lastIndex, allstr.length);
				start = regexp.lastIndex;
				cur_find_pos = re.index;
				break;
			}
			if (is_match_cyclic && new_str == 0)
			{
				start = 0;
				while(re = regexp.exec(allstr))
				{
					if (start > re.index)
						continue;
					if (is_match_word)
						new_str = allstr.substring(0, re.index + 1) + '<span style="background:#ff0">' + JSON.stringify(re).substring(3, JSON.stringify(re).length - 3) + '</span>' + allstr.substring(regexp.lastIndex - 1, allstr.length);
					else
						new_str = allstr.substring(0, re.index) + '<span style="background:#ff0">' + JSON.stringify(re).substring(2, JSON.stringify(re).length - 2) + '</span>' + allstr.substring(regexp.lastIndex, allstr.length);
					start = regexp.lastIndex;
					break;
				}
			}
			if (new_str != "")
				$(node).html(new_str);
			else
				$(node).html(allstr);
			initBBEvent(eid);
		}
		function replace_string(find_str, replace_str, is_match_case, is_match_word, is_match_cyclic)
		{
			var matchopt = 'g';
			if (!is_match_case)
				matchopt += 'i';
			
			var regexp;
			
			if (is_match_word)
				regexp = new RegExp('[^a-zA-Z0-9]' + find_str + '[^a-zA-Z0-9]', matchopt);
			else
				regexp = new RegExp(find_str, matchopt);
			
			var re;
			var new_str = '';
			while(re = regexp.exec(allstr))
			{
				if (cur_find_pos > re.index)
					continue;
				if (is_match_word)
					new_str = allstr.substring(0, re.index + 1) + replace_str + allstr.substring(regexp.lastIndex - 1, allstr.length);
				else
					new_str = allstr.substring(0, re.index) + replace_str + allstr.substring(regexp.lastIndex, allstr.length);
				start = cur_find_pos;
		    	allstr = new_str;
		    	allstrlog.splice(curIndex + 1, allstrlog.length);
				allstrlog.push(allstr);
				curIndex = allstrlog.length - 1;
				realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
				$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
				$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
				$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
				$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
				break;
			}
			$(node).html(allstr);
			initBBEvent(eid);
			find_string(find_str, is_match_case, is_match_word, is_match_cyclic)
		}
		function insert_table(rows, columns)
		{
	    	var substrs = get_substrings_in_content();
	    	var prev_str = substrs[0];
	    	var new_str = substrs[1];
	    	var next_str = substrs[2];
	    	
	    	var tmp_str = prev_str;
	    	var i = tmp_str.indexOf('>');
	    	var first_tag = tmp_str.substring(1, i);
	    	var first_str = '';
	    	while(1)
	    	{
	    		i = first_tag.indexOf(' ');
	    		if (i < 0)
	    			first_tag_name = first_tag;
	    		else
	    			first_tag_name = first_tag.substring(0, i);
	    		
	    		i = tmp_str.indexOf('</' + first_tag_name + '>');
	    		if (i < 0)
	    			break;
	    		
	    		first_str += tmp_str.substring(0, i) + '</' + first_tag_name + '>';
	    		tmp_str = tmp_str.substring(i + 3 + first_tag_name.length, tmp_str.length);
	    		i = tmp_str.indexOf('>');
	    		first_tag = tmp_str.substring(1, i);
	    	}
	    	prev_str = first_str;
	    	new_str = tmp_str + new_str + next_str;
	    	
	    	tmp_str = new_str;
	    	i = tmp_str.indexOf('>');
	    	first_tag = tmp_str.substring(1, i);
	    	first_str = '';
	    	while(1)
	    	{
	    		i = first_tag.indexOf(' ');
	    		if (i < 0)
	    			first_tag_name = first_tag;
	    		else
	    			first_tag_name = first_tag.substring(0, i);
	    		
	    		i = tmp_str.indexOf('</' + first_tag_name + '>');
	    		if (i < 0)
	    			break;
	    		
	    		first_str = tmp_str.substring(0, i) + '</' + first_tag_name + '>';
	    		tmp_str = tmp_str.substring(i + 3 + first_tag_name.length, tmp_str.length);
	    		break;
	    	}
	    	
	    	prev_str += first_str;
	    	
	    	var new_str = "<table align=center border=1 cellspacing=0>";
	    	for (i = 0; i < rows; i++)
	    	{
	    		new_str += "<tr>";
	    		for (var j = 0; j < columns; j++)
	    			new_str += "<td>Edit</td>";
	    		new_str += "</tr>";
	    	}
	    	new_str += "</table>";
	    	
	    	next_str = tmp_str;
	    	
	    	new_str = clean_style_tags(prev_str + new_str + next_str);
	    	$(node).html(new_str);
			initBBEvent(eid);
	    	allstr = new_str;
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
		}
		var start = 0;
		var end = 0;
		$(document).bind("mouseup", function(e) {
		//	if (opened_menu != '' && !e.target.matches('.bb-dropdown-menu') && !e.target.matches('.bb-dropdown-list') && !e.target.matches('.bb-command') && !e.target.matches('.bb-dropdown'))
			if (opened_menu != '')
				return;
			if ($(e.target).hasClass('btn-font-size') || $(e.target).hasClass('btn-letter-spacing') || $(e.target).hasClass('btn-line-height'))
				return;
	        savedSelection = saveSelection(document.getElementById(eid));
	        start = savedSelection.start;
	        end = savedSelection.end;
	        setToolbarButtons();
	    });
		$(node).bind("keyup", function() {
	        savedSelection = saveSelection(document.getElementById(eid));
	        start = savedSelection.start;
	        end = savedSelection.end;
			allstr = decodeHtml($(node).html());
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
	        setToolbarButtons();
	    });
		$(node).bind("keydown", function() {
		//	console.log('keydown');
		});
	    
	    $('#bbToolbar_' + eid + ' .btn-style-bold').on('click', function(e){
	    	if (is_bold)
	    	{
	        	$('#bbToolbar_' + eid + ' .btn-style-bold').removeClass('bb-selection');
	        	is_bold != is_bold;
	        	remove_style('b');
	        }
	        else
	        {
	        	is_bold != is_bold;
	        	$('#bbToolbar_' + eid + ' .btn-style-bold').addClass('bb-selection');
	        	add_style('b');
	        }
	    });
	    
	    $('#bbToolbar_' + eid + ' .btn-style-italic').on('click', function(){
	    	if (is_italic)
	    	{
	        	$('#bbToolbar_' + eid + ' .btn-style-italic').removeClass('bb-selection');
	        	is_italic != is_italic;
	        	remove_style('i');
	        }
	        else
	        {
	        	is_italic != is_italic;
	        	$('#bbToolbar_' + eid + ' .btn-style-italic').addClass('bb-selection');
	        	add_style('i');
	        }
	    });
	    
	    $('#bbToolbar_' + eid + ' .btn-style-underline').on('click', function(){
	    	if (is_underline)
	    	{
	        	$('#bbToolbar_' + eid + ' .btn-style-underline').removeClass('bb-selection');
	        	is_underline != is_underline;
	        	remove_style('u');
	        }
	        else
	        {
	        	is_underline != is_underline;
	        	$('#bbToolbar_' + eid + ' .btn-style-underline').addClass('bb-selection');
	        	add_style('u');
	        }
	    });
	    
	    $('#bbToolbar_' + eid + ' .btn-style-strikethrough').on('click', function(){
	    	if (is_strikethrough)
	    	{
	        	$('#bbToolbar_' + eid + ' .btn-style-strikethrough').removeClass('bb-selection');
	        	is_strikethrough != is_strikethrough;
	        	remove_style('s');
	        }
	        else
	        {
	        	is_strikethrough != is_strikethrough;
	        	$('#bbToolbar_' + eid + ' .btn-style-strikethrough').addClass('bb-selection');
	        	add_style('s');
	        }
	    });
	    $('#bbToolbar_' + eid + ' .btn-font-family').on('click', function(e){
	    	if (opened_menu != "")
	    		$('#' + opened_menu).hide();
	    	var editorid = $(this).attr('for');
	    	if (opened_menu == 'for_font_family_' + editorid)
	    	{
	    		opened_menu = '';
	    		return;
	    	}
	    	opened_menu = 'for_font_family_' + editorid;
	    	var top = $("#bbToolbar_" + editorid + " .btn-font-family").offset().top + $("#bbToolbar_" + editorid + " .btn-font-family").height() + 3;
	    	var left = $("#bbToolbar_" + editorid + " .btn-font-family").offset().left;
	    	
	    	$('#for_font_family_' + editorid).css('top', top);
	    	$('#for_font_family_' + editorid).css('left', left);
	    	$('#for_font_family_' + editorid).show();
	    });
	    $('#for_font_family_' + eid + ' .bb-dropdown-list .bb-command').on('click', function(e){
	    	var font = $(this).attr('data-param1');
	    	add_font('font-family', font);
	    });
	    $('#bbToolbar_' + eid + ' .btn-font-size').on('click', function(e){
	    	if (opened_menu != "")
	    		$('#' + opened_menu).hide();
	    	var editorid = $(this).attr('for');
	    	if (opened_menu == 'for_font_size_' + editorid)
	    	{
	    		opened_menu = '';
	    		return;
	    	}
	    	opened_menu = 'for_font_size_' + editorid;
	    	var top = $("#bbToolbar_" + editorid + " .btn-font-size").offset().top + $("#bbToolbar_" + editorid + " .btn-font-size").height() + 3;
	    	var left = $("#bbToolbar_" + editorid + " .btn-font-size").offset().left;
	    	
	    	$('#for_font_size_' + editorid).css('top', top);
	    	$('#for_font_size_' + editorid).css('left', left);
	    	$('#for_font_size_' + editorid).show();
	    });
	    $('#bbToolbar_' + eid + ' .btn-font-size').on('keyup', function(e){
	    	if (e.keyCode != 13)
	    		return;
	    	var font = $(this).html();
	    	add_font('font-size', font);
    		$('#' + opened_menu).hide();
    		opened_menu = '';
	    });
	    $('#bbToolbar_' + eid + ' .btn-letter-spacing').on('keyup', function(e){
	    	if (e.keyCode != 13)
	    		return;
	    	var font = $(this).html();
	    	add_font('letter-spacing', font);
    		$('#' + opened_menu).hide();
    		opened_menu = '';
	    });
	    $('#bbToolbar_' + eid + ' .btn-line-height').on('keyup', function(e){
	    //	if (e.keyCode != 13)
	    //		return;
	    	var font = $(this).html();
	    	set_top_style('line-height', font);
    		$('#' + opened_menu).hide();
    		opened_menu = '';
	    });
	    $('#for_font_size_' + eid + ' .bb-dropdown-list .bb-command').on('click', function(e){
	    	var font = $(this).attr('data-param1');
	    	add_font('font-size', font);
	    });
	    $('#bbToolbar_' + eid + ' .btn-letter-spacing').on('click', function(e){
	    	if (opened_menu != "")
	    		$('#' + opened_menu).hide();
	    	var editorid = $(this).attr('for');
	    	if (opened_menu == 'for_letter_spacing_' + editorid)
	    	{
	    		opened_menu = '';
	    		return;
	    	}
	    	opened_menu = 'for_letter_spacing_' + editorid;
	    	var top = $("#bbToolbar_" + editorid + " .btn-letter-spacing").offset().top + $("#bbToolbar_" + editorid + " .btn-letter-spacing").height() + 3;
	    	var left = $("#bbToolbar_" + editorid + " .btn-letter-spacing").offset().left;
	    	
	    	$('#for_letter_spacing_' + editorid).css('top', top);
	    	$('#for_letter_spacing_' + editorid).css('left', left);
	    	$('#for_letter_spacing_' + editorid).show();
	    });
	    $('#for_letter_spacing_' + eid + ' .bb-dropdown-list .bb-command').on('click', function(e){
	    	var font = $(this).attr('data-param1');
	    	add_font('letter-spacing', font);
	    });
	    $('#bbToolbar_' + eid + ' .btn-line-height').on('click', function(e){
	    	if (opened_menu != "")
	    		$('#' + opened_menu).hide();
	    	var editorid = $(this).attr('for');
	    	if (opened_menu == 'for_line_height_' + editorid)
	    	{
	    		opened_menu = '';
	    		return;
	    	}
	    	opened_menu = 'for_line_height_' + editorid;
	    	var top = $("#bbToolbar_" + editorid + " .btn-line-height").offset().top + $("#bbToolbar_" + editorid + " .btn-line-height").height() + 3;
	    	var left = $("#bbToolbar_" + editorid + " .btn-line-height").offset().left;
	    	
	    	$('#for_line_height_' + editorid).css('top', top);
	    	$('#for_line_height_' + editorid).css('left', left);
	    	$('#for_line_height_' + editorid).show();
	    });
	    $('#for_line_height_' + eid + ' .bb-dropdown-list .bb-command').on('click', function(e){
	    	set_top_style('line-height', $(this).attr('data-param1'));
	    });
		
		$('#bbToolbar_' + eid + ' .btn-foreground').on("click", function(e){
	    	if (opened_menu != "")
	    		$('#' + opened_menu).hide();
	    	if (opened_menu == 'for_colorpicker' && for_color == 'for_foreground')
	    	{
	    		opened_menu = '';
	    		return;
	    	}
	    	opened_menu = 'for_colorpicker';
	    	for_color = 'for_foreground';
	    	var top = $(this).offset().top + $(this).height() + 3;
	    	var left = $(this).offset().left;
	    	$(".bb-color-picker").css('top', top);
	    	$(".bb-color-picker").css('left', left);
	    	$(".bb-color-picker").show();
		});
		
		$('#bbToolbar_' + eid + ' .btn-background').on("click", function(e){
	    	if (opened_menu != "")
	    		$('#' + opened_menu).hide();
	    	if (opened_menu == 'for_colorpicker' && for_color == 'for_background')
	    	{
	    		opened_menu = '';
	    		return;
	    	}
	    	opened_menu = 'for_colorpicker';
	    	for_color = 'for_background';
	    	var top = $(this).offset().top + $(this).height() + 3;
	    	var left = $(this).offset().left;
	    	$(".bb-color-picker").css('top', top);
	    	$(".bb-color-picker").css('left', left);
	    	$(".bb-color-picker").show();
		});
	    $('#bbToolbar_' + eid + ' .btn-align').on('click', function(e){
	    	set_top_style('text-align', $(this).attr('data-cmd'));
	    });
	    $('#bbToolbar_' + eid + ' .btn-separate').on('click', function(e){
	    	add_separate();
	    });
	    var htmleditor_id = '';
	    function show_code_dialog(eid)
	    {
			$(".bb-dropdown-menu").hide();
			$(".bb-color-picker").hide();
	    	$('.bb-html-editor-background').show();
	    	htmleditor_id = 'htmleditor_' + eid;
	    	$('#htmleditor_' + eid).val(allstr);
	    }
	    $('.btn-html-code').on('click', function(e){
	    	show_code_dialog($(this).attr('for'));
	    });
	    $('.bb-html-editor .bb-dialog-button-ok').on('click', function(e){
	    	allstr = $('#' + htmleditor_id).val();
	    	allstrlog.splice(curIndex + 1, allstrlog.length);
			allstrlog.push(allstr);
			curIndex = allstrlog.length - 1;
	    	$(node).html(allstr);
			initBBEvent(eid);
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
	    	$('.bb-html-editor-background').hide();
	    });
	    $('.bb-html-editor .bb-dialog-button-cancel').on('click', function(e){
	    	$('.bb-html-editor-background').hide();
	    });
	    $('.bb-html-editor .bb-dialog-close-btn').on('click', function(e){
	    	$('.bb-html-editor-background').hide();
	    });
	    function show_link_dialog(eid)
	    {
			$(".bb-dropdown-menu").hide();
			$(".bb-color-picker").hide();
	    	$('.bb-link-editor-background').show();
	    	opened_menu = "link-editor";
	    }
		$('#bbToolbar_' + eid + ' .btn-link').on('click', function(e){
			if (is_linked)
				return false;
			if (start == end)
				return false;
	    	show_link_dialog($(this).attr('for'));
	    });
	    $('.bb-link-editor .bb-dialog-button-ok').on('click', function(e){
	    	var linkurl = $('#bb-link-url').val();
	    	var is_new = $('#bb-link-target-chk').prop("checked");
			insert_link(linkurl, is_new);
	    	$('.bb-link-editor-background').hide();
	    	opened_menu = "";
	    });
	    $('.bb-link-editor .bb-dialog-button-cancel').on('click', function(e){
	    	$('.bb-link-editor-background').hide();
	    	opened_menu = "";
	    });
	    $('.bb-link-editor .bb-dialog-close-btn').on('click', function(e){
	    	$('.bb-link-editor-background').hide();
	    	opened_menu = "";
	    });
		$('#bbToolbar_' + eid + ' .btn-unlink').on('click', function(e){
			if (!is_linked)
				return false;
	    	remove_link($(this).attr('for'));
	    });
		$('#bbToolbar_' + eid + ' .btn-undo').on('click', function(e){
			if (curIndex == 0)
				return;
			curIndex--;
			allstr = allstrlog[curIndex];
	    	$(node).html(allstr);
			initBBEvent(eid);
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-enable');
			if (curIndex == 0)
			{
				$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-disable');
				$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-enable');
			}
		});
		$('#bbToolbar_' + eid + ' .btn-redo').on('click', function(e){
			if (curIndex == allstrlog.length - 1)
				return;
			curIndex++;
			allstr = allstrlog[curIndex];
	    	$(node).html(allstr);
			initBBEvent(eid);
			realstr = allstr.replace(/<\/?[^>]+(>|$)/g, "");
			$('#bbToolbar_' + eid + ' .btn-undo').removeClass('bb-btn-disable');
			$('#bbToolbar_' + eid + ' .btn-undo').addClass('bb-btn-enable');
			if (curIndex == allstrlog.length - 1)
			{
				$('#bbToolbar_' + eid + ' .btn-redo').addClass('bb-btn-disable');
				$('#bbToolbar_' + eid + ' .btn-redo').removeClass('bb-btn-enable');
			}
		});
	    function show_find_dialog(eid)
	    {
			$(".bb-dropdown-menu").hide();
			$(".bb-color-picker").hide();
	    	$('.bb-find-editor-background').show();
	    	opened_menu = "find-editor";
	    }
		$('#bbToolbar_' + eid + ' .btn-find').on('click', function(e){
	    	show_find_dialog($(this).attr('for'));
	    });
	    $('#bb-find-str').on('keyup', function(e){
	    	if (e.keyCode != 13)
	    		return;
	    	var find_str = $('#bb-find-str').val();
	    	var is_match_case = $('#bb-find-match-case').prop("checked");
	    	var is_match_word = $('#bb-find-match-word').prop("checked");
	    	var is_match_cyclic = $('#bb-find-match-cyclic').prop("checked");
			find_string(find_str, is_match_case, is_match_word, is_match_cyclic);
	    });
	    $('.bb-find-editor .bb-dialog-button-find').on('click', function(e){
	    	var find_str = $('#bb-find-str').val();
	    	var is_match_case = $('#bb-find-match-case').prop("checked");
	    	var is_match_word = $('#bb-find-match-word').prop("checked");
	    	var is_match_cyclic = $('#bb-find-match-cyclic').prop("checked");
			find_string(find_str, is_match_case, is_match_word, is_match_cyclic);
	    });
	    $('.bb-find-editor .bb-dialog-button-replace').on('click', function(e){
	    	var find_str = $('#bb-find-str').val();
	    	var replace_str = $('#bb-replace-str').val();
	    	var is_match_case = $('#bb-find-match-case').prop("checked");
	    	var is_match_word = $('#bb-find-match-word').prop("checked");
	    	var is_match_cyclic = $('#bb-find-match-cyclic').prop("checked");
			replace_string(find_str, replace_str, is_match_case, is_match_word, is_match_cyclic);
	    });
	    $('.bb-find-editor .bb-dialog-button-cancel').on('click', function(e){
	    	$('.bb-find-editor-background').hide();
	    	opened_menu = "";
			$(node).html(allstr);
			initBBEvent(eid);
	    });
	    $('.bb-find-editor .bb-dialog-close-btn').on('click', function(e){
	    	$('.bb-find-editor-background').hide();
	    	opened_menu = "";
			$(node).html(allstr);
			initBBEvent(eid);
	    });
	    var move_find_dialog = false;
	    var org_top = 0, org_top = 0;
	    var org_x = 0, org_y = 0;
	    $('.bb-find-editor-background .bb-dialog-header').on('mousedown', function(e){
	    	move_find_dialog = true;
	    	org_top = $('.bb-find-editor').offset().top;
	    	org_left = $('.bb-find-editor').offset().left;
	    	org_x = e.pageX;
	    	org_y = e.pageY;
	    });
	    $('.bb-find-editor-background').on('mousemove', function(e){
	    	if (!move_find_dialog)
	    		return false;
	    	$('.bb-find-editor').css('top', org_top + e.pageY - org_y);
	    	$('.bb-find-editor').css('left', org_left + e.pageX - org_x);
	    });
	    $('.bb-find-editor-background').on('mouseup', function(e){
	    	move_find_dialog = false;
	    });
	    function show_table_dialog(eid)
	    {
			$(".bb-dropdown-menu").hide();
			$(".bb-color-picker").hide();
	    	$('.bb-table-editor-background').show();
	    	opened_menu = "table-editor";
	    }
		$('#bbToolbar_' + eid + ' .btn-table').on('click', function(e){
	    	show_table_dialog($(this).attr('for'));
	    });
	    $('.bb-table-editor .bb-dialog-button-ok').on('click', function(e){
	    	var rows = $('#bb-table-rows').val();
	    	var columns = $('#bb-table-columns').val();
			insert_table(rows, columns);
	    	$('.bb-table-editor-background').hide();
	    	opened_menu = "";
	    });
	    $('.bb-table-editor .bb-dialog-button-cancel').on('click', function(e){
	    	$('.bb-table-editor-background').hide();
	    	opened_menu = "";
	    });
	    $('.bb-table-editor .bb-dialog-close-btn').on('click', function(e){
	    	$('.bb-table-editor-background').hide();
	    	opened_menu = "";
	    });
    }
    
	var opened_menu = '';
	var for_color = '';
	$(document).on("click", function(e){
		if (opened_menu == 'for_colorpicker')
		{
			if (!e.target.matches('.btn-background') && !e.target.matches('.btn-foreground') && !e.target.matches('.fa-background') && !e.target.matches('.fa-foreground') && !e.target.matches('.bb-color-picker') && !e.target.matches('.bb-pre-color-btn') && !e.target.matches('.color-cell') && !e.target.matches('.bb-color-picker-grad') && !e.target.matches('.bb-color-picker-panel1') && !e.target.matches('.bb-color-picker-pointer1') && !e.target.matches('.bb-color-picker-pointer2') && !e.target.matches('.bb-color-picker-panel1') && !e.target.matches('.bb-color-picker-panel2') && !e.target.matches('.bb-pre-color-panel'))
			{
				$(".bb-color-picker").hide();
				is_opened_usermenu = false;
				opened_menu = '';
			}
		}
		else if (opened_menu == 'link-editor' || opened_menu == 'find-editor' || opened_menu == 'table-editor')
		{
		}
		else if (opened_menu != '')
		{
			if (!e.target.matches('.bb-dropdown-menu') && !e.target.matches('.bb-dropdown-list') && !e.target.matches('.bb-command') && !e.target.matches('.bb-dropdown') && !e.target.matches('.btn-link'))
			{
				$(".bb-dropdown-menu").hide();
				is_opened_usermenu = false;
				opened_menu = '';
			}
		}
	});

	// methods
	var bbDestory = function(node)
	{
		var eid = $(node).attr('id');
		$(node).attr('contenteditable', false);
		$(node).removeClass('bbEditorContent');
		$(".bbToolbar").remove();
    }

    // create plugin
    $.fn.bbEditor = function (options)
    {
    	$(document).unbind("mouseup");
    	if (options == "destroy")
        	return bbDestory(this);
    	else
        	return bbEditor(this, options);
    }
})(jQuery, window);