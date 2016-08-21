define(function (require) {

    //==============================
    // hashChange control
    //==============================
    var hashChange = function (hash) {
        var path = hash.substr(2).split('/');
        var url;
        if (path.length > 0) {
            if (path.length == 1) {
                url = 'app/' + path[0] + '/' + path[0] + '.html?v=' + version;
            }
            if (path.length == 2) {
                url = 'app/' + path[0] + '/' + path[1] + '.html?v=' + version;
            }
            $('div.content-wrapper').load(url, function () {
                var $a = $('a[href="' + hash + '"]');
                var $ul = $a.parent().parent();
                if ($ul.is('.treeview-menu') || $ul.is('.sidebar-menu')) {
                    if ($ul.is('.treeview-menu')) {
                        $ul.children('li').removeClass('active');
                    }
                    $('.sidebar li:not(.treeview) > a').parent().removeClass('active');
                    $a.parent().addClass('active');
                }
            });
        }
    };

    //==============================
    // gridUtilOptions
    //==============================
    var gridUtilOptions = function () {
        return {
            strip: true,
            pagination: true,
            sidePagination: 'server',
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            sortable: true,
            search: true,
            strictSearch: false,
            showRefresh: true,
            showColumns: true,
            paginationDetailHAlign: 'left',
            paginationHAlign: 'right',
            clickToSelect: true
        }
    };

    //==============================
    // ajaxSetup
    //==============================
    var _ajaxSetup = function () {
        $.ajaxSetup({
            timeout: 5000,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            beforeSend: function (xhr) {
                var accessToken = window.localStorage.accessToken;
                xhr.setRequestHeader('Access-Token', accessToken);
            },
            complete: function (xhr, status) {
                // status: success, error, timeout
                // xhr.status: 200, 404 500..., 0
                if(xhr.status == 404 ) {
                    $('.content-wrapper').load('app/util/404.html?v=' + version);
                }
                if(xhr.status == 500) {
                    $('.content-wrapper').load('app/util/500.html?v=' + version);
                }
                var sessionStatus = xhr.getResponseHeader('sessionStatus');
                if(sessionStatus === 'timeout') {
                    window.location.href = 'login.html';
                }
            }
        });
    };

    //====================================================
    // alertDialog
    //====================================================
    var alertDialog = function(text) {
        $('#dialog-alert p').text(text);
        $('#dialog-alert').modal({
            backdrop : true,
            keyboard : true,
            show : true
        });
    };

    //====================================================
    // confrimDialog
    //====================================================
    var confirmDialog = function(text, callback) {
        $('#dialog-confirm p').text(text);
        $('#dialog-confirm').modal({
            backdrop : true,
            keyboard : true,
            show : true
        });
        $('#dialog-confirm .btn-confirm').unbind().click(callback);
    };

    return {
        hashChange: hashChange,
        gridUtilOptions: gridUtilOptions,
        _ajaxSetup: _ajaxSetup,
        alertDialog: alertDialog,
        confirmDialog: confirmDialog
    }
});