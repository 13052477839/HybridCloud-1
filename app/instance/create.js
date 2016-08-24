define(function(require, exports, module){

    var Util = require('util/util');

    function Create(){
        this.choosenImage;
    }

    module.exports = Create;

    //=================================
    // init
    //=================================
    Create.prototype.init = function(){
        this.stepper();
        this.image();
    };

    //=================================
    // init
    //=================================
    Create.prototype.stepper = function(){
        $("#stepper").stepper({
            steps: 7,
            start: 1,
            type: 'default',
            onStep: function(index, step){
                $('.stepper-content-wrapper').html($('#step' + index).html());
            },
            onStepClick: function(index, step){

            }
        });
        $('#stepper li').map(function(index, domElement){
            switch(index){
                case 0: $(this).html('<span class="stepper-title">选择镜像</span>');break;
                case 1: $(this).html('<span class="stepper-title">选择类型</span>');break;
                case 2: $(this).html('<span class="stepper-title">配置实例</span>');break;
                case 3: $(this).html('<span class="stepper-title">添加存储</span>');break;
                case 4: $(this).html('<span class="stepper-title">标签实例</span>');break;
                case 5: $(this).html('<span class="stepper-title">配置安全组</span>');break;
                case 6: $(this).html('<span class="stepper-title">审核</span>');break;
                default:break;
            }
        });
    };

    //=================================
    // image
    //=================================
    Create.prototype.image = function(){
        $('.stepper-content-wrapper .js-images a[data-toggle="tab"]:first').tab('show');
        $('.stepper-content-wrapper .js-images a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var a = e.target;
            $($(a).attr('href')).find('table').bootstrapTable($.extend(Util.gridUtilOptions(),{
                showColumns: false,
                showHeader: false,
                url: API_URL.IMAGES + '/quickStart',
                dataField: 'list',
                columns: [{
                    title: '',
                    field: '',
                    formatter: function(value, row ,index) {
                        switch(row.platform){
                            case 'amazon': return '<img src="images/image-amazon-linux.png">';break;
                            case 'rhel': return '<img src="images/image-redhat.png">';break;
                            case 'suse': return '<img src="images/image-suse.png">';break;
                            case 'canonical': return '<img src="images/image-ubuntu.png">';break;
                            case 'windows': return '<img src="images/image-windows.png">';break;
                        }
                    }
                }, {
                    title: '',
                    field: '',
                    formatter: function(value, row, index){
                        return '<b>'+row.title+'</b> - ' + row.imageId64 + '<br>' + row.description + '<br>根设备类型:' + row.rootDeviceType + ' 虚拟化类型:' + row.virtualizationType;
                    },
                    align: 'left'
                }, {
                    title: '',
                    field: '',
                    formatter: function(value, row, index) {
                        return '<button class="btn-normal">选择</button>'
                    }
                }]
            }));
            $('.bootstrap-table .search input').attr('placeholder', '')
                .parent().append('<span></span>');
        });
    };
});