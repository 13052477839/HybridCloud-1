define(function(require, exports, module){

    var Util = require('util/util');

    function Create(){}

    module.exports = Create;

    //=================================
    // init
    //=================================
    Create.prototype.init = function(){
        this.stepper();
    };

    //=================================
    // init
    //=================================
    Create.prototype.stepper = function(){
        $("#stepper").stepper();
    };
});