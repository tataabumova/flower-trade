/****************БЛОК ITEM***********************/

function whichChild(elem){
    var  i= 0;
    while((elem=elem.previousSibling)!=null) if(elem.nodeType != 3) ++i;
    return i;
}

var item_mini = document.querySelectorAll(".item__mini");
var item_open = document.querySelectorAll(".item__open");
var item_block_elem = document.querySelector('.item-block');

for (var i=0; i < item_mini.length; i++){
	item_mini[i].addEventListener("click", function(event) {
		event.preventDefault();
		
		var a = document.querySelectorAll(".item__mini--open");
		var b = document.querySelectorAll(".item__open--visible");
		for (var i=0; i < a.length; i++){
			if(a[i] != this){
				a[i].classList.remove("item__mini--open");
			}
		};
		for (var i=0; i < b.length; i++){
			if(b[i] != this.nextSibling.nextSibling){
				b[i].classList.remove("item__open--visible");
			}
		};

		this.nextSibling.nextSibling.classList.toggle("item__open--visible");
		this.classList.toggle("item__mini--open");
		
		var elem_index = (whichChild(this)+2)/2;
		var top_value = 51*(elem_index-1);
		item_block_elem.scrollTop = top_value;
		// var w = document.querySelector(".item__open.item__open--visible");
		
		// if (document.querySelector(".item__open.item__open--visible")==true) {
		// 	document.querySelector(".item__open.item__open--visible").classList.remove("item__open");
		// };
	});
};


/***************КАЛЕНДАРЬ*************************/

var calendar_elem = document.querySelector(".calendar");
var calendar_block = document.querySelector(".calendar__block");

calendar_elem.addEventListener("click", function(event) {
	event.preventDefault();
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
			add_class += " witing_items";
		} 
		if(u == 12 || u == 24){
			add_class += " in_stock";
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
		calendar_elem.innerHTML = need_day + "." + need_month + "." + need_year;
		calendar_block.classList.remove("calendar__block--visible");
	});
}

/*****************BTN +/- ***********************/
var minus = document.querySelectorAll(".btn--minus");
var plus = document.querySelectorAll(".btn--plus");
var count_input = document.querySelectorAll(".count");

for (var i=0; i < count_input.length; i++){
	count_input[i].addEventListener("keypress",  function (evt){
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)){
            evt.preventDefault();
        }
    });
}



for (var i=0; i < minus.length; i++){
	var elemMinus = minus[i];
	elemMinus.addEventListener("click", function(e){
		e.preventDefault();
		var input = this.parentElement.querySelector(".count");
		var a = input.value;
		
		if (input.className.indexOf("count") != -1 && (a<=0)) {
			input.value = 0;
		}
		else {
			input.value = input.value - 1;
		}
	});
};
for (var i=0; i < plus.length; i++) {
	var elemPlus = plus[i];
	elemPlus.addEventListener("click", function(e){
		e.preventDefault();
		var input = this.parentElement.querySelector(".count");
		var a = input.value;

		input.value = Number(a) + 1;

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
		this.classList.toggle("anchor-item--choosen");
	});	
}
var menu_anchor = document.querySelector(".anchor.menu--anchor");
menu_anchor.addEventListener("click", function(e){
	e.preventDefault();
	this.classList.toggle("anchor-item--choosen");
});	

/***************HERNA'**********************/
function whichChild(elem){
    var  i= 0;
    while((elem=elem.previousSibling)!=null) if(elem.nodeType != 3) ++i;
    return i;
}
