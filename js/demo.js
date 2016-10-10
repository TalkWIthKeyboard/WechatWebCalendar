/**
 * Created by CoderSong on 16/10/7.
 */
$(function () {
    startEvent();
    startCalendar();

    var weekName = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    $('tbody.event-calendar tr td').click(function () {
        var day = $(this).attr('date-day');
        var month = $(this).attr('date-month');
        var year = $(this).attr('date-year');
        var date = new Date(year,month,day);
        $('.dayInfo').text(weekName[date.getDay()] + '  ' + day);
        // $('.activeInfo').text();
    });

    startEventHeader(weekName)
});

startEventHeader = function (weekName) {

    var d = new Date();
    var dayNumber = d.getDate();
    $('.dayInfo').text(weekName[d.getDay()] + '  ' + dayNumber);
};

startEvent = function () {
    $.ajax({
        url: '/calendar/data/events.json',
        type: 'GET'
    }).done(function (data) {
        var event = data.events;
        for (var i = 0; i < event.length; i++){
            $('.event-list').append(
                '<div class="weui_panel"> \
                    <div class="weui_panel_bd"> \
                        <div class="weui_media_box weui_media_text"> \
                            <h4 class="weui_media_title">' + event[i].time + '</h4> \
                            <p class="weui_media_desc">' + event[i].description + '</p> \
                        </div> \
                    </div> \
                </div>'
            )
        }
    })
};

startCalendar = function() {
    //获得现在的日期
    var d = new Date();
    var dayNumber = d.getDate();
    var monthNumber = d.getMonth() + 1;
    var yearNumber = d.getFullYear();
    setMonth(yearNumber,monthNumber);

    //左翻按钮事件
    $('.btn-prev').click(function () {
        var monthNumber = $('.month').attr('data-month');
        if (monthNumber < 2){
            $('.month').attr('data-month','13');
            var monthNumber = 13;
            yearNumber = yearNumber - 1;
            setMonth(yearNumber,parseInt(monthNumber) - 1);
        }
        else{
            setMonth(yearNumber,parseInt(monthNumber) - 1);
        }
    });

    //右翻按钮事件
    $('.btn-next').click(function () {
        var monthNumber = $('.month').attr('data-month');
        if (monthNumber > 11){
            $('.month').attr('data-month', '0');
            var monthNumber = 0;
            yearNumber = yearNumber + 1;
            setMonth(yearNumber,parseInt(monthNumber) + 1);
        }
        else {
            setMonth(yearNumber,parseInt(monthNumber) + 1);
        }
    });

    function getWeekWord(monthNumber) {
        var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        return months[monthNumber - 1];
    }

    //通过月数来填数据
    function setMonth(yearNumber,monthNumber) {
        $('.month').text(yearNumber + '年 ' + getWeekWord(monthNumber));
        $('.month').attr('data-month', monthNumber);
        setDay(monthNumber)
    };

    function setDay(monthNumber) {

        //清空天数栏
        $($('tbody.event-calendar tr')).each(function (index) {
            $(this).empty();
        });

        //清空星期数栏
        $($('thead.event-days tr')).each(function (index) {
            $(this).empty();
        });

        printWeek(monthNumber);
        printDay(monthNumber);
        var date = new Date();
        var month = date.getMonth() + 1;
        var thisyear = new Date().getFullYear();
        setCurrentDay(month,thisyear);
        
        function getAllDays(month,year) {
            var days = getDaysInMonth(month,year);
            var realDays = [];
            //填列表前的空
            var weekNum = days[0].getDay();
            var date = new Date(days[0]);
            date.setDate(days[0].getDate() - weekNum - 1);
            for (var i = 0; i < weekNum; i++){
                date.setDate(date.getDate() + 1);
                realDays.push(new Date(date));
            }
            //填中间内容
            for (var i = 0; i < days.length; i++){
                realDays.push(days[i]);
            }
            //填列表后的空
            var date = new Date(days[days.length - 1]);
            for (var i = days.length - 1; i < 41; i++){
                date.setDate(date.getDate() + 1);
                realDays.push(new Date(date));
            }
            return realDays;
        }

        //准备天的数组
        function getDaysInMonth(month,year) {
            var date = new Date(year,month,1);
            var days = [];
            while (date.getMonth() == month){
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        }

        //填星期数栏
        function printWeek() {
            $('thead.event-days tr').append('<td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td>');
        }

        //填天数栏
        function printDay(monthNumber) {
            var days = getAllDays(monthNumber - 1, yearNumber);
            for (var index = 0 ; index < days.length; index++){
                var each = new Date(days[index]);
                if (index < 7) {
                    $('tbody.event-calendar tr.1').append('<td date-month="' + each.getMonth() + '" date-day="' + each.getDate() + '" date-year="' + each.getFullYear() + '"class="first-line">' + each.getDate() + '</td>');
                } else if (index < 14) {
                    $('tbody.event-calendar tr.2').append('<td date-month="' + each.getMonth() + '" date-day="' + each.getDate() + '" date-year="' + each.getFullYear() + '">' + each.getDate() + '</td>');
                } else if (index < 21) {
                    $('tbody.event-calendar tr.3').append('<td date-month="' + each.getMonth() + '" date-day="' + each.getDate() + '" date-year="' + each.getFullYear() + '">' + each.getDate() + '</td>');
                } else if (index < 28) {
                    $('tbody.event-calendar tr.4').append('<td date-month="' + each.getMonth() + '" date-day="' + each.getDate() + '" date-year="' + each.getFullYear() + '">' + each.getDate() + '</td>');
                } else if (index < 35) {
                    $('tbody.event-calendar tr.5').append('<td date-month="' + each.getMonth() + '" date-day="' + each.getDate() + '" date-year="' + each.getFullYear() + '">' + each.getDate() + '</td>');
                } else if (index < 42){
                    $('tbody.event-calendar tr.6').append('<td date-month="' + each.getMonth() + '" date-day="' + each.getDate() + '" date-year="' + each.getFullYear() + '"class="last-line">' + each.getDate() + '</td>');
                }
            }

            $('tbody.event-calendar tr td').each(function (index) {
                if ($(this).attr('date-month') != monthNumber - 1){
                    $(this).addClass('not-month-day');
                }
            })
        }

        //对今天特殊的样式处理
        function setCurrentDay(month, year) {
            var viewMonth = $('.month').attr('data-month');
            if (parseInt(year) === yearNumber) {
                if (parseInt(month) === parseInt(viewMonth)) {
                    $('tbody.event-calendar td[date-day="' + d.getDate() + '"]').addClass('current-day');
                }
            }
        };
    }
};
