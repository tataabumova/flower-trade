/****************БЛОК ITEM***********************/

function whichChild(elem){
    var  i= 0;
    while((elem=elem.previousSibling)!=null) if(elem.nodeType != 3 && elem.offsetParent != null) ++i;
    return i;
}

var item_mini = document.querySelectorAll(".item__mini");
var item_open = document.querySelectorAll(".item__open");
var item_block_elem = document.querySelector('.item-block');



for (var i=0; i < item_mini.length; i++){
	item_mini[i].addEventListener("click", function(event) {
		//setItemsPointerEvents("none");
		event.preventDefault();
		
		var a = document.querySelectorAll(".item__mini--open");
		var b = document.querySelectorAll(".item__open--visible");
		for (var i=0; i < a.length; i++){
			if(a[i] != this){
				a[i].classList.remove("item__mini--open");
			}
		};
		for (var i=0; i < b.length; i++){
			if(b[i] != this.nextElementSibling){
				b[i].classList.remove("item__open--visible");
			}
		};

		this.nextElementSibling.classList.toggle("item__open--visible");
		this.classList.toggle("item__mini--open");
		
		var elem_index = (whichChild(this)+2)/2;
		var top_value = 51*(elem_index-1);
		item_block_elem.scrollTop = top_value;
		//setItemsPointerEvents("all");
		// var w = document.querySelector(".item__open.item__open--visible");
		
		// if (document.querySelector(".item__open.item__open--visible")==true) {
		// 	document.querySelector(".item__open.item__open--visible").classList.remove("item__open");
		// };
	});
};


/***************КАЛЕНДАРЬ*************************/

var calendar_elem = document.querySelector(".calendar");
var calendar_block = document.querySelector(".calendar__block");
var calendar_block_background = document.querySelector(".calendar__block-background");
var calendar_elem_value = calendar_elem.innerHTML;
var calendar_elem_value_day = calendar_elem_value.split('.')[0];
var calendar_elem_value_month = calendar_elem_value.split('.')[1];
var calendar_elem_value_year = calendar_elem_value.split('.')[2];


calendar_elem.addEventListener("click", function(event) {
	event.preventDefault();
	calendar_block_background.classList.toggle("calendar__block-background--visible");
	calendar_block.classList.toggle("calendar__block--visible");
});

calendar_block_background.addEventListener("click", function(event) {
	event.preventDefault();
	calendar_block_background.classList.toggle("calendar__block-background--visible");
	calendar_block.classList.toggle("calendar__block--visible");
});

var getCalendar = function(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return el.childNodes[0];
}

var tableStr = "<div id = 'calendar'><div class = 'calendar_wrapper' data-left = '0'>";
for (var i = 0; i < 12; i++){ //цикл по месяцам
	tableStr += "<div class='div_for_table'><table class='calendar__day' data-month = '" + (i + 1) + "'><tr>";
	var currDate = new Date(2015, i, 1); //получаем первый день каждого месяца
	var currDateDaysInMonth = currDate.daysInMonth(); //сколько дней в текущем месяце
	var currDateDay = currDate.getDay(); //номер дня в неделе
	if(currDateDay == 0){
		currDateDay = 7;
	}
	var prevDate = new Date(currDate.getTime()); //получили дату идентичную текущей дате
	prevDate.setDate(0); // получаем последнюю дату предыдущего месяца
	var prevDateDaysInMonth = prevDate.daysInMonth(); // сколько дней в предыдущем месяце

	var prevDateYear =  prevDate.getFullYear();
	var prevDateMonth = ('0' + (prevDate.getMonth() + 1).toString()).slice(-2);

	for (var y = 0; y < (currDateDay - 1); y++){
		var prevDateDay = prevDateDaysInMonth - (currDateDay - 2) + y;
		var prevDateDayWithZero = ('0' + (prevDateDaysInMonth - (currDateDay - 2) + y).toString()).slice(-2);
		tableStr += "<td class = 'not_currMoth' data-year = '" + prevDateYear + "' data-month = '" + prevDateMonth + "' data-day = '" + prevDateDayWithZero + "'><span>" + prevDateDay + "</span></td>";
	}

	var trIndex = currDateDay;

	var currDateYear = currDate.getFullYear();
	var currDateMonth = ('0' + (currDate.getMonth() + 1).toString()).slice(-2);

	for (var u = 1; u <= currDateDaysInMonth; u++){
		trIndex++;
		var currDateTdDay = ('0' + u.toString()).slice(-2);
		var add_class = "";
		if(u == 3 || u == 14 || u == 30){
			add_class += " waiting_items";
		} 
		if(currDateTdDay == calendar_elem_value_day && currDateMonth == calendar_elem_value_month && currDateYear == calendar_elem_value_year){
			add_class += " curr_date";
		}
		tableStr += "<td class = '" + add_class + "' data-year = '" + currDateYear + "' data-month = '" + currDateMonth + "' data-day = '" + currDateTdDay + "'><span>" + u + "</span></td>";

		if (trIndex > 7){
			tableStr += "</tr><tr>";
			trIndex = 1;
		}
	}

	var nextDate = new Date(currDate.getTime());
	nextDate.setDate(32);
	console.log(nextDate);
	var nextDateYear = nextDate.getFullYear();
	var nextDateMonth = ('0' + (nextDate.getMonth() + 1).toString()).slice(-2);

	for (var j = 1; j <= (42 - (currDateDay - 1) - currDateDaysInMonth); j++){
		trIndex++;
		var nextDateDay = ('0' + j.toString()).slice(-2);
		tableStr += "<td class = 'not_currMoth' data-year = '" + nextDateYear + "' data-month = '" + nextDateMonth + "' data-day = '" + nextDateDay + "'><span>" + j + "</span></td>";

		if (trIndex > 7){
			tableStr += "</tr><tr>";
			trIndex = 1;
		}
	}

	tableStr += "</tr></table></div>";
}
tableStr += "</div></div>";
var calendar = getCalendar(tableStr);
var calendar_block = document.querySelector(".calendar__block");
var btn_right = document.querySelector(".calendar__block>.btn--right");
var btn_left = document.querySelector(".calendar__block>.btn--left");

calendar_block.insertBefore(calendar, btn_right);

/******************Кнопки********************/

var open_close_btn = document.querySelector('.open-close');

open_close_btn.addEventListener('click', function(e){
	var a = document.querySelectorAll(".item__mini:not(.item__mini--open)");
	var a_open = document.querySelectorAll(".item__mini.item__mini--open");
	var b = document.querySelectorAll(".item__open:not(.item__open--visible)");
	var b_open = document.querySelectorAll(".item__open.item__open--visible");
	if(a.length < a_open.length){
		a = a_open;
	}
	if(b.length < b_open.length){
		b = b_open;
	}
	for (var i=0; i < a.length; i++){
		a[i].classList.toggle("item__mini--open");
	};
	for (var i=0; i < b.length; i++){
		b[i].classList.toggle("item__open--visible");
	};
});

var calendar_wrapper = document.querySelector(".calendar_wrapper");

btn_right.addEventListener("click", function(event) {
	var data_left = calendar_wrapper.getAttribute("data-left");
	if (data_left > -5786){
		var a = data_left - 526;
		calendar_wrapper.setAttribute("data-left", a);
		calendar_wrapper.style.left = a + "px";

		var all_highlight_months = document.querySelectorAll("table.calendar__month td.curr_month");
		for (i = 0; i < all_highlight_months.length; i++){
			all_highlight_months[i].classList.remove("curr_month");
		}
		var month_elem = document.querySelector("table.calendar__month td[data-month='" + (Math.abs(a/526) + 1) + "']");
		month_elem.classList.add("curr_month");

	}
	else {
		calendar_wrapper.style.left = -5786 + "px";
	}
});
btn_left.addEventListener("click", function(event) {
	var data_left = calendar_wrapper.getAttribute("data-left");
	if (data_left < 0){
		var a = Number(526) + Number(data_left);
		calendar_wrapper.setAttribute("data-left", a);
		calendar_wrapper.style.left = a + "px";

		var all_highlight_months = document.querySelectorAll("table.calendar__month td.curr_month");
		for (i = 0; i < all_highlight_months.length; i++){
			all_highlight_months[i].classList.remove("curr_month");
		}
		var month_elem = document.querySelector("table.calendar__month td[data-month='" + (Math.abs(a/526) + 1) + "']");
		month_elem.classList.add("curr_month");
	}
	else {
		calendar_wrapper.style.left = 0 + "px";
	}
});

var btn_month = document.querySelectorAll("table.calendar__month td");
for(i = 0; i < btn_month.length; i++){
	btn_month[i].addEventListener("click", function(event) {
		event.preventDefault();
		var curr_btn_month = this.getAttribute("data-month");
		var move_to_month = -(curr_btn_month - 1)*526;
		calendar_wrapper.setAttribute("data-left", move_to_month);
		calendar_wrapper.style.left = move_to_month + "px";

		var all_highlight_months = document.querySelectorAll("table.calendar__month td.curr_month");
		for (i = 0; i < all_highlight_months.length; i++){
			all_highlight_months[i].classList.remove("curr_month");
		}
		this.classList.add("curr_month");
	});
}

var need_data = document.querySelectorAll("table.calendar__day td");
for(i = 0; i < need_data.length; i++){
	need_data[i].addEventListener("click", function(event){
		var need_day = this.getAttribute("data-day");
		var need_month = this.getAttribute("data-month");
		var need_year = this.getAttribute("data-year");
		document.querySelector('td.curr_date').classList.remove('curr_date');
		this.classList.add('curr_date');
		calendar_elem.innerHTML = need_day + "." + need_month + "." + need_year;
		calendar_block_background.classList.toggle("calendar__block-background--visible");
		calendar_block.classList.remove("calendar__block--visible");
	});
}

var basket_filter_arrow = document.querySelector('.menu .basket').previousElementSibling;
var money_filter_arrow = document.querySelector('.menu .money').previousElementSibling;
var elements_array = [];
for (var i = 0; i < item_mini.length; i++) {
	var money_elem = item_mini[i].querySelector('.price');
	elements_array[i] = {element: item_mini[i], basket: item_mini[i].querySelector('.count').innerHTML, money: money_elem.innerHTML+"."+money_elem.getAttribute('data-kopiyka')};
};
function compareBasketMax(itemA, itemB) {
	return itemA.basket - itemB.basket;
}
function compareBasketMin(itemA, itemB) {
	return itemB.basket - itemA.basket;
}
function comparePriceMax(itemA, itemB) {
	return itemA.money - itemB.money;
}
function comparePriceMin(itemA, itemB) {
	return itemB.money - itemA.money;
}

basket_filter_arrow.addEventListener('click', function(event){
	event.preventDefault;
	var curr_elem = this.querySelector('span.ios_arrows');
	if(curr_elem.className.indexOf('arrow_up') > -1){
		curr_elem.classList.remove('arrow_up');
		curr_elem.classList.add('arrow_down');
		elements_array.sort(compareBasketMin);
	}else{
		curr_elem.classList.remove('arrow_down');
		curr_elem.classList.add('arrow_up');
		elements_array.sort(compareBasketMax);
	}
	var last_elem_mini = null;
	for (var i = elements_array.length-1; i >= 0; i--) {
		var elem_mini = elements_array[i].element;
		var elem_open = elem_mini.nextElementSibling;
		if(i == elements_array.length-1){
			item_block_elem.appendChild(elem_mini);
			item_block_elem.appendChild(elem_open);	
		}else{
			item_block_elem.insertBefore(elem_mini, last_elem_mini);
			item_block_elem.insertBefore(elem_open, last_elem_mini);
		}
		last_elem_mini = elem_mini;
	};
});
money_filter_arrow.addEventListener('click', function(event){
	event.preventDefault;
	var curr_elem = this.querySelector('span.ios_arrows');
	if(curr_elem.className.indexOf('arrow_up') > -1){
		curr_elem.classList.remove('arrow_up');
		curr_elem.classList.add('arrow_down');
		elements_array.sort(comparePriceMin);
	}else{
		curr_elem.classList.remove('arrow_down');
		curr_elem.classList.add('arrow_up');
		elements_array.sort(comparePriceMax);
	}
	var last_elem_mini = null;
	for (var i = elements_array.length-1; i >= 0; i--) {
		var elem_mini = elements_array[i].element;
		var elem_open = elem_mini.nextElementSibling;
		if(i == elements_array.length-1){
			item_block_elem.appendChild(elem_mini);
			item_block_elem.appendChild(elem_open);	
		}else{
			item_block_elem.insertBefore(elem_mini, last_elem_mini);
			item_block_elem.insertBefore(elem_open, last_elem_mini);
		}
		last_elem_mini = elem_mini;
	};
});

/*****************BTN +/- ***********************/
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

var minus = document.querySelectorAll(".btn--minus");
var plus = document.querySelectorAll(".btn--plus");
var count_input = document.querySelectorAll(".count");

for (var i=0; i < count_input.length; i++){
	count_input[i].addEventListener("keypress",  function (evt){
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)){
            evt.preventDefault();
        }else{
        	var price_elem = this.parentElement.querySelector(".price");
			var item_mini = this.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
			var item_price = item_mini.getAttribute('data-price');
			var kopiyka_elem = this.parentElement.querySelector(".kopiyka");
			var max_count = item_mini.querySelector('.count').innerHTML;
			if(item_price == null){
				item_price = parseFloat(item_mini.querySelector('.price').innerHTML+"."+item_mini.querySelector('.price').getAttribute('data-kopiyka')).toFixed(2);
				item_mini.setAttribute('data-price', item_price);
			}
			if(item_price*(this.value+String.fromCharCode(charCode)) > 9999999 || this.value+String.fromCharCode(charCode) > max_count){
				evt.preventDefault();
			}
        }
    });
    count_input[i].addEventListener("paste",  function (evt){
    	evt.preventDefault();
    });
    count_input[i].addEventListener("input",  function (evt){
    	var price_elem = this.parentElement.querySelector(".price");
		var item_mini = this.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
		var item_price = item_mini.getAttribute('data-price');
		var kopiyka_elem = this.parentElement.querySelector(".kopiyka");
		if(item_price == null){
			item_price = parseFloat(item_mini.querySelector('.price').innerHTML+"."+item_mini.querySelector('.price').getAttribute('data-kopiyka')).toFixed(2);
			item_mini.setAttribute('data-price', item_price);
		}
		price_elem.setAttribute('data-value', item_price*this.value);
		price_elem.value = Math.floor(item_price*this.value);
		kopiyka_elem.innerHTML = (item_price*this.value).toFixed(2).split('.')[1];
    });
    count_input[i].addEventListener('click', function(event) {
		setCaretToPos(this, this.value?this.value.length:0);
	});
}



for (var i=0; i < minus.length; i++){
	var elemMinus = minus[i];
	elemMinus.addEventListener("click", function(e){
		e.preventDefault();
		var input = this.parentElement.querySelector(".count");
		var price_elem = this.parentElement.querySelector(".price");
		var item_mini = this.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
		var item_price = item_mini.getAttribute('data-price');
		var kopiyka_elem = this.parentElement.querySelector(".kopiyka");
		if(item_price == null){
			item_price = parseFloat(item_mini.querySelector('.price').innerHTML+"."+item_mini.querySelector('.price').getAttribute('data-kopiyka')).toFixed(2);
			item_mini.setAttribute('data-price', item_price);
		}
		var a = input.value;
	
		if (input.className.indexOf("count") != -1 && (a<=0)) {
			input.value = 0;
			price_elem.setAttribute('data-value', "0");
			price_elem.value = "0";
			kopiyka_elem.innerHTML = "00";
		}
		else {
			input.value = input.value - 1;
			price_elem.setAttribute('data-value', item_price*input.value);
			price_elem.value = Math.floor(item_price*input.value);
			kopiyka_elem.innerHTML = (item_price*input.value).toFixed(2).split('.')[1];
		}
	});
};
for (var i=0; i < plus.length; i++) {
	var elemPlus = plus[i];
	elemPlus.addEventListener("click", function(e){
		e.preventDefault();
		var input = this.parentElement.querySelector(".count");
		var price_elem = this.parentElement.querySelector(".price");
		var item_mini = this.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
		var item_price = item_mini.getAttribute('data-price');
		var kopiyka_elem = this.parentElement.querySelector(".kopiyka");
		var max_count = item_mini.querySelector('.count').innerHTML;
		if(item_price == null){
			item_price = parseFloat(item_mini.querySelector('.price').innerHTML+"."+item_mini.querySelector('.price').getAttribute('data-kopiyka')).toFixed(2);
			item_mini.setAttribute('data-price', item_price);
		}
		var a = input.value;

		if(item_price*(parseInt(a)+1) > 9999999 || parseInt(a)+1 > max_count){
			e.preventDefault();
		}else{
			input.value = Number(a) + 1;
			price_elem.setAttribute('data-value', item_price*input.value);
			price_elem.value = Math.floor(item_price*input.value);
			kopiyka_elem.innerHTML = (item_price*input.value).toFixed(2).split('.')[1];
		}
	});
};

/**************SCROLL*******************/
function removeScrollBar() {
	var item_block_elem = document.querySelector('.item-block');
	var first_item_mini_elem = document.querySelector('.item__mini');
	var scroll_width = item_block_elem.offsetWidth - first_item_mini_elem.offsetWidth;
	item_block_elem.style.marginRight = -scroll_width+"px";
}
removeScrollBar();

/***************ANCHOR**********************/
var anchor = document.querySelectorAll(".anchor.anchor-item");
for(i = 0; i < anchor.length; i++){
	anchor[i].addEventListener("click", function(e){
		e.preventDefault();

		var menu_anchor = document.querySelector(".anchor.menu--anchor");
		if(menu_anchor.className.indexOf("anchor-menu--choosen") > -1){
			var item_open_element = this.parentElement.parentElement.parentElement;
			var item_mini_element = item_open_element.previousElementSibling;

			item_open_element.classList.add("hidden-by-anchor");
			item_mini_element.classList.add("hidden-by-anchor");
		}


		this.classList.toggle("anchor-item--choosen");
	});	
}
var menu_anchor = document.querySelector(".anchor.menu--anchor");
var anchor_item_choosen = document.querySelectorAll(".anchor-item--choosen");
menu_anchor.addEventListener("click", function(e){
	e.preventDefault();
	
	if(this.className.indexOf("anchor-menu--choosen") > -1) {
		/*показать все*/

		var hidden_by_anchor = document.querySelectorAll(".hidden-by-anchor");
		for(i = 0; i < hidden_by_anchor.length; i++){
			hidden_by_anchor[i].classList.remove("hidden-by-anchor");
		}
	}
	else {
		/*скрыть все неотмеченные*/
		var do_not_choosen_anchors = document.querySelectorAll(".anchor.anchor-item:not(.anchor-item--choosen)");
		for (var i = 0; i < do_not_choosen_anchors.length; i++) {

			var item_open_element = do_not_choosen_anchors[i].parentElement.parentElement.parentElement;
			var item_mini_element = item_open_element.previousElementSibling;

			item_open_element.classList.add("hidden-by-anchor");
			item_mini_element.classList.add("hidden-by-anchor");
		};
	}
	this.classList.toggle("anchor-menu--choosen");
	

});	

/*************SEARCH*****************/

var search_input = document.querySelector("input.search");
search_input.addEventListener("input", function(e){
	var search_input_value = search_input.value.toLowerCase();
	var search_count = search_input.value.length;
	
	for (var i=0; i < item_mini.length; i++){
		if(search_count > 2){
			//ищем
			var data_tags_is = item_mini[i].getAttribute("data-tags");
			

			if (data_tags_is){
				var data_tags = data_tags_is.replace(/(^\s+|\s+$)/g,'').toLowerCase();
				if(data_tags.indexOf(search_input_value) > -1){
					//выводим элементы с совпадениями, остальное скрваем
					item_mini[i].classList.remove("hidden-by-search");
					item_mini[i].nextElementSibling.classList.remove("hidden-by-search");
				}
				else {
					//пишем, что поиск не дал результатов
					item_mini[i].classList.add("hidden-by-search");
					item_mini[i].nextElementSibling.classList.add("hidden-by-search");
				}
			}
			else {
				//скрываем элементы с пустым дата атрибутом или без дата атрибута
				item_mini[i].classList.add("hidden-by-search");
				item_mini[i].nextElementSibling.classList.add("hidden-by-search");
			}
		}
		else {
			//показать всё
			item_mini[i].classList.remove("hidden-by-search");
			item_mini[i].nextElementSibling.classList.remove("hidden-by-search");
		}
	}			
});


/**********Pallete**********/
var menu_color = document.querySelector(".inner__colors");
var color_elements = document.querySelectorAll(".color");
var palette = document.querySelector(".palette");
var pallete_visible_height = (document.querySelector(".color").offsetHeight-1)*color_elements.length-1;
menu_color.addEventListener("click", function(e){
	e.preventDefault();

	palette.classList.toggle("palette--visible");
	if(palette.className.indexOf("palette--visible") > -1){
		palette.style.height = pallete_visible_height + "px";
	}else{
		palette.style.height = "0px";
	}
});
for (var i = 0; i < color_elements.length; i++) {
	var color_elem = color_elements[i];
	color_elem.addEventListener("click", function(e){
		e.preventDefault();
		var data_color = this.getAttribute("data-color");
		if(data_color){
			data_color = data_color.replace(/(^\s+|\s+$)/g,'').toLowerCase();
			for (var j=0; j < item_mini.length; j++){
				var item_data_color = item_mini[j].getAttribute("data-color");
				if(item_data_color){
					item_data_color = item_data_color.replace(/(^\s+|\s+$)/g,'').toLowerCase();
					if(item_data_color == data_color){
						//выводим элементы с совпадениями, остальное скрваем
						item_mini[j].classList.remove("hidden-by-color");
						item_mini[j].nextElementSibling.classList.remove("hidden-by-color");
					}
					else {
						//пишем, что поиск не дал результатов
						item_mini[j].classList.add("hidden-by-color");
						item_mini[j].nextElementSibling.classList.add("hidden-by-color");
					}
				}else{
					//скрываем элементы с пустым дата атрибутом или без дата атрибута
					item_mini[j].classList.add("hidden-by-color");
					item_mini[j].nextElementSibling.classList.add("hidden-by-color");
				}
			}
		}else{
			for (var j=0; j < item_mini.length; j++){
				item_mini[j].classList.remove("hidden-by-color");
				item_mini[j].nextElementSibling.classList.remove("hidden-by-color");
			}
		}
		if(this.className.indexOf("del-cross") == -1) {
			menu_color.style.backgroundColor = this.style.backgroundColor;
		}
		if(this.className.indexOf("del-cross") == -1 && (this.style.backgroundColor.toLowerCase() == "white" || this.style.backgroundColor.toLowerCase() == "#fff" || this.style.backgroundColor.toLowerCase() == "#ffffff")){
			document.querySelector(".colors").style.color = "black";
		}else{
			document.querySelector(".colors").style.color = "white";
		}
		if(this.className.indexOf("del-cross") > -1 && menu_color.className.indexOf("no_color") == -1){
			menu_color.classList.add("no_color");
			menu_color.style.backgroundColor = "";
		}else if(this.className.indexOf("del-cross") == -1){
			menu_color.classList.remove("no_color");
		}
		palette.classList.remove("palette--visible");
		palette.style.height = "0px";
	});
};
