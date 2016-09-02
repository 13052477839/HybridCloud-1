define(function (require, exports, module) {

    var Util = require('util/util');

    function Image() {
        this.accounts;
    }

    module.exports = Image;

    //==============================
    // init
    //==============================
    Image.prototype.init = function () {
        this.accounts = Util.getAccounts();
        this.imagePanel();
        this.imageTable();

        $('button, input').tooltip();
    };

    //==============================
    // image panel
    //==============================
    Image.prototype.imagePanel = function () {
        var image = this;
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
                '<table class="image-table" id="imageTable' + i + '" data-account-sequence-id="' + v.sequenceId + '" data-type="' + v.type + '"></table>',
                '</div>',
                '<div class="overlay">',
                '<i class="fa fa-refresh fa-spin"></i>',
                '</div>',
                '</div>'
            ].join('');
        };

        $.each(image.accounts, function (i, v) {
            $('#image-content-wrapper').append(panel(i, v));
        });
    };

    //==============================
    // image table
    //==============================
    Image.prototype.imageTable = function () {
        var image = this;
        var $table = $('.image-table');
        $.each($table, function (i, v) {
            $(v).bootstrapTable($.extend(Util.gridUtilOptions(), {
                url: API_URL.IMAGES,
                //toolbar: '<a class="create-btn" href="#/instance/create-' + $(v).attr('data-type') + '/' + $(v).attr('data-account-sequence-id') + '"><i class="fa fa-plus"></i>创建</a>',
                ajaxOptions: {
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('account-sequence-id', $(v).attr('data-account-sequence-id'));
                    }
                },
                queryParams: function (params) {
                    return $.extend(params, {'is-public': false});
                },
                dataField: 'list',
                pageSize: 5,
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
                    field: 'imageId',
                    visible: true
                }, {
                    title: '名称',
                    field: 'name',
                    sortable: true
                }, {
                    title: '来源',
                    field: 'imageLocation'
                }, {
                    title: '平台',
                    field: 'platform'
                }, {
                    title: '拥有者',
                    field: 'ownerId'
                }, {
                    title: '可见性',
                    field: 'public',
                    formatter: function (value, row, index) {
                        if (value) {
                            return '公有'
                        } else {
                            return '私有'
                        }
                    }
                }, {
                    title: '状态',
                    field: 'state'
                }, {
                    title: '虚拟化',
                    field: 'virtualizationType',
                    visible: false
                }, {
                    title: '创建时间',
                    field: 'creationDate',
                    formatter: function (value, row, index) {
                        var date = new Date(value);
                        return moment(date).format('LLL');
                    }
                }, {
                    title: '根设备类型',
                    field: 'rootDeviceType',
                    visible: false
                }, {
                    title: '描述',
                    field: 'description',
                    visible: false
                }, {
                    title: '操作',
                    field: '',
                    //events: operateEvents,
                    formatter: image.operateFormatter
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
    Image.prototype.operateFormatter = function (value, row, index) {
        return [
            '<a class="image-edit" href="#/image/edit/' + row.id + '" data-toggle="tooltip" title="编辑">',
            '<i class="glyphicon glyphicon-pencil"></i>',
            '</a>'
        ].join('');
    };
});