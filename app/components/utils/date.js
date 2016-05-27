const date = {
    GetFormatDate(start) {
        var date = new Date();
        if (start) {
            date.setMonth(date.getMonth() - 1);
        }
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + "-" + m + "-" + d;
    },
    /**
     * 获取当前月的第一天
     */
    getCurrentMonthFirst() {
        var date = new Date();
        date.setDate(1);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + "-" + m + "-" + d;
    },
    /**
     * 获取当前月的最后一天
     */
    getCurrentMonthLast() {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        date = new Date(nextMonthFirstDay - oneDay);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + "-" + m + "-" + d;
    }
}

module.exports = date
