define(function (require) {
    var Table = require('./table');
    return {
        init: function() {
            var table = new Table();
            table.init();
        }
    }
});