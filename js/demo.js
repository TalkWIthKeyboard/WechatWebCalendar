/**
 * Created by CoderSong on 16/10/7.
 */
$(function () {
    startCalendar()
});

startCalendar = function() {
    var mon = 'Mon';
    var tue = 'Tue';
    var wed = 'Wed';
    var thur = 'Thur';
    var fri = 'Fri';
    var sat = 'Sat';
    var sund = 'Sun';

    //获得现在的日期
    var d = new Date();
    var dayNumber = d.getDate();
    var monthNumber = d.getMonth() + 1;
    var yearNumber = d.getFullYear();
    setDay(mon,tue,wed,thur,fri,sat,sund);

    function setDay() {
        //清空天数栏
        $($('tbody.event-calendar tr')).each(function (index) {
            $(this).empty();
        });

        //清空星期数栏
        $($('tbody.event-days tr')).each(function (index) {
            $(this).empty();
        });

        i = 0;
        setMonth(monthNumber);
        printWeek();
        printDay();
        setCurrentDay();
        
        function getWeekWord(monthNumber) {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return months[monthNumber - 1];
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
        };

        //填星期数栏
        function printWeek() {
            var monthDay = getDaysInMonth(monthNumber - 1, yearNumber)[0].toString().substring(0, 3);
            if (monthDay === 'Mon') {
                $('thead.event-days tr').append('<td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td>');
            } else if (monthDay === 'Tue') {
                $('thead.event-days tr').append('<td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td>');
            } else if (monthDay === 'Wed') {
                $('thead.event-days tr').append('<td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td>');
            } else if (monthDay === 'Thu') {
                $('thead.event-days tr').append('<td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td>');
            } else if (monthDay === 'Fri') {
                $('thead.event-days tr').append('<td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td>');
            } else if (monthDay === 'Sat') {
                $('thead.event-days tr').append('<td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td>');
            } else if (monthDay === 'Sun') {
                $('thead.event-days tr').append('<td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td>');
            }
        };

        //填天数栏
        function printDay() {
            $(getDaysInMonth(monthNumber - 1, yearNumber)).each(function(index) {
                var index = index + 1;
                if (index < 8) {
                    $('tbody.event-calendar tr.1').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                } else if (index < 15) {
                    $('tbody.event-calendar tr.2').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                } else if (index < 22) {
                    $('tbody.event-calendar tr.3').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                } else if (index < 29) {
                    $('tbody.event-calendar tr.4').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                } else if (index < 32) {
                    $('tbody.event-calendar tr.5').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                }
                i++;
            });
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

        //填年－月标题栏
        function setMonth(monthNumber) {
            $('.month').text(getWeekWord(monthNumber) + ' ' + yearNumber);
            $('.month').attr('data-month', monthNumber);
        };
    }
};
