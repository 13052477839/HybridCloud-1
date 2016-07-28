define(function(require){
    var Header = require('./header');


    return {
        init: function() {
            var header = new Header();
            header.init();
        }
    }

});