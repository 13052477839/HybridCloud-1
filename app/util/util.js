define(function (require) {

    //==============================
    // sidebarChange control
    //==============================
    var sidebarChange = function (a) {
        if (!$(a).parent().is('.treeview')) {
            var url = $(a).attr('href');
            url = url.substr(2);
            $('div.content-wrapper').load('app/' + url + '/' + url + '.html?v=' + version, function () {
                var $ul = $(a).parent().parent();
                if ($ul.is('.treeview-menu')) {
                    $ul.children('li').removeClass('active');
                }
                $('.sidebar li:not(.treeview) > a').parent().removeClass('active');
                $(a).parent().addClass('active');
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

    return {
        sidebarChange: sidebarChange,
        gridUtilOptions: gridUtilOptions
    }
});