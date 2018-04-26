//倒计时
(function($){
    
    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: null,
                offset: null
            }, options);

        // Save container
        var container = this;

        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = new Date(); // get fixed current date

            var difference = target_date - current_date;
            if (difference < 0) {
                clearInterval(interval);
                if (callback && typeof callback === 'function') callback();
                return;
            }

            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);
        };
        
        // start
        var interval = setInterval(countdown, 1000);

        return {
            stop:function(){
                clearInterval(interval);
            }
        }
    };

    $.fn.upCount = function (options, callback) {
        var settings = $.extend({
                startDate: null,
                endDate: null,
                offset: null
            }, options);

        var container = this;

        function countup () {
            var target_date = new Date(settings.endDate),
                start_date = new Date(settings.startDate),
                current_date = new Date();

            var is_end = target_date - current_date>0 ? false : true;
            if (is_end) {
                clearInterval(interval);
                if (callback && typeof callback === 'function') callback();
                return;
            }

            var difference = current_date - start_date;

            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);
        };
        
        // start
        var interval = setInterval(countup, 1000);

        return {
            stop:function(){
                clearInterval(interval);
            }
        }
    };

    $.fn.pafviewer = function(options, callback){
        
    }
})(jQuery)
