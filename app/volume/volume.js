define(function (require, exports, module) {

    var Util = require('util/util');

    function Volume() {
    }

    module.exports = Volume;

    //==============================
    // init
    //==============================
    Volume.prototype.init = function () {
        this.volumeTable();
    };

    //==============================
    // volume table
    //==============================
    Volume.prototype.volumeTable = function () {
        var volume = this;
        var $table = $('#volumeTable');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            url: API_URL.VOLUMES,
            toolbar: '#volumeTableToolbar',
            dataField: 'list',
            //detailView: true,
            //sortName: 'name',
            //sortOrder: 'asc',
            columns: [{
                checkbox: true
            }, {
                title: 'ID',
                field: 'volumeId',
                visible: true
            }, {
                title: '大小',
                field: 'size',
                formatter: function (value, row, index) {
                    return value + 'GB';
                }
            }, {
                title: '类型',
                field: 'volumeType'
            }, {
                title: 'IOPS',
                field: 'iops',
                formatter: function (value, row, index) {
                    return value + '/3000';
                }
            }, {
                title: '快照',
                field: 'snapshotId'
            }, {
                title: '状态',
                field: 'state'
            }, {
                title: '可用区',
                field: 'availabilityZone'
            }, {
                title: '挂载点',
                field: 'state',
                formatter: function (value, row, index) {
                    console.log(row);
                    if (row.attachments.length > 0) {
                        var at = row.attachments[0];
                        return '<b>'+at.instanceId + '</b>:' + at.device + '(' + at.state + ')';
                    } else {
                        return '';
                    }
                }
            }, {
                title: '创建时间',
                field: 'createTime',
                formatter: function (value, row, index) {
                    var date = new Date(value);
                    return moment(date).format('LLL');
                }
            },  {
                title: '操作',
                field: '',
                //events: operateEvents,
                formatter: volume.operateFormatter
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
    Volume.prototype.operateFormatter = function (value, row, index) {
        return [
            '<a class="image-edit" href="#/volume/edit/' + row.id + '" data-toggle="tooltip" title="编辑">',
            '<i class="glyphicon glyphicon-pencil"></i>',
            '</a>'
        ].join('');
    };

});