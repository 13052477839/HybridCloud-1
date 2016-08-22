define(function(require, exports, module){

    var Util = require('util/util');

    function Image(){}

    module.exports = Image;

    //==============================
    // init
    //==============================
    Image.prototype.init = function () {
        this.imageTable();
    };

    //==============================
    // image table
    //==============================
    Image.prototype.imageTable = function() {
        var image = this;
        var $table = $('#imageTable');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            url: API_URL.IMAGES + '/private',
            toolbar: '#imageTableToolbar',
            dataField: 'list',
            //detailView: true,
            //sortName: 'name',
            //sortOrder: 'asc',
            columns: [{
                checkbox: true
            }, {
                title: 'ID',
                field: 'imageId',
                visible: false
            }, {
                title: '名称',
                field: 'name',
                sortable: true
            }, {
                title: '来源',
                field: 'imageLocation'
            }, {
                title: '操作',
                field: '',
                //events: operateEvents,
                formatter: image.operateFormatter
            }]
        }));
        $('.bootstrap-table .search input').attr('placeholder', '')
            .parent().append('<span></span>');
        $('.fixed-table-container').append('<div class="fixed-table-footerButtons"><button disabled id="btn-user-delete">删除</button></div>');
        $table.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
            $('.fixed-table-footerButtons button').prop('disabled', !$table.bootstrapTable('getSelections').length);
        });
    };

    //==============================
    // operateFormatter
    //==============================
    Image.prototype.operateFormatter = function (value, row, index) {
        return [
            '<a class="image-edit" href="#/image/edit/'+row.id+'" data-toggle="tooltip" title="编辑">',
            '<i class="glyphicon glyphicon-pencil"></i>',
            '</a>'
        ].join('');
    };
});