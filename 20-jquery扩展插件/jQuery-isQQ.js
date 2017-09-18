(function ($) {
    $.extend({
        isQQ:function (qq) {
            return /^[1-9]\d{4,11}$/.test(qq);
        }
    });
})(jQuery);