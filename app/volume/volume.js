define(function (require, exports, module) {

    var Util = require('util/util');

    function Volume() {
        this.accounts;
    }

    module.exports = Volume;

    //==============================
    // init
    //==============================
    Volume.prototype.init = function () {
        this.accounts = Util.getAccounts();
        this.volumePanel();        
        this.volumeTable();
    };
    
    //==============================
    // volume panel
    //==============================
    Volume.prototype.volumePanel = function () {
        var volume = this;
        var panel = function (i, v) {
            return [
                '<div class="col-xs-12">',
                '<div class="box">',
                '<div class="box-header">',
                '<h3 class="box-title"><b>' + v.type + '</b> ' + v.alias + '</h3>',
                '<div class="box-tools pull-right">',
                '<button type="button" class="btn btn-box-tool" data-widget="collapse">',
                '<i class="fa fa-minus"></i>',
                '</button>',
                '<button type="button" class="btn btn-box-tool" data-widget="remove">',
                '<i class="fa fa-times"></i>',
                '</button>',
                '</div>',
                '</div>',
                '<div class="box-body">',
                '<table class="volume-table" id="volumeTable' + i + '" data-account-sequence-id="' + v.sequenceId + '" data-type="' + v.type + '"></table>',
                '</div>',
                '<div class="overlay">',
                '<i class="fa fa-refresh fa-spin"></i>',
                '</div>',
                '</div>'
            ].join('');
        };

        $.each(volume.accounts, function (i, v) {
            $('#volume-content-wrapper').append(panel(i, v));
        });
    };

    //==============================
    // volume table
    //==============================
    Volume.prototype.volumeTable = function () {
        var volume = this;
        var $table = $('.volume-table');
        $.each($table, function (i, v) {
            $(v).bootstrapTable($.extend(Util.gridUtilOptions(), {
                url: API_URL.VOLUMES,
                //toolbar: '#volumeTableToolbar',
                dataField: 'list',
                pageSize: 5,
                ajaxOptions: {
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('account-sequence-id', $(v).attr('data-account-sequence-id'));
                    }
                },
                onLoadSuccess: function () {
                    $(v).parents('.box').find('.overlay').css('display', 'none');
                },
                onLoadError: function () {
                    $(v).parents('.box').find('.overlay').css('display', 'none');
                },
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
                        if (value)
                        {
                            return value + '/3000';
                        }
                        return '-';
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
            var $box = $(v).parents('.box');
            $box.find('.bootstrap-table .search input').attr('placeholder', '')
                .parent().append('<span></span>');
            $box.find('.fixed-table-container').append('<div class="fixed-table-footerButtons"><button disabled>删除</button></div>');
            $(v).on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                $box.find('.fixed-table-footerButtons button').prop('disabled', !$(v).bootstrapTable('getSelections').length);
            });
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