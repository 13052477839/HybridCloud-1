define(function (require, exports, module) {
    var Util = require('util/util');
    function Table() {}

    module.exports = Table;

    //==========================
    // init
    //==========================
    Table.prototype.init = function () {
        $table = $('#table1');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            url: 'api/rest/table1',
            dataField: 'res',
            columns: [{
                checkbox: true
            },{
                field: 'id',
                title: 'ID'
            },{
                field:'name',
                title: '姓名'
            }]
        }));
    }
});