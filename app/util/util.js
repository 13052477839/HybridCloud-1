define(function (require) {

    //==============================
    // sidebarChange control
    //==============================
    var sidebarChange = function (a) {
        if (!$(a).parent().is('.treeview')) {
            var hash = $(a).attr('href');
            var path = hash.substr(2).split('/');
            var url;
            if(path.length > 0) {
                if(path.length == 1) {
                    url = 'app/' + path[0] + '/' + path[0] + '.html?v=' + version;
                }
                if(path.length == 2) {
                    url = 'app/' + path[0] + '/' + path[1] + '.html?v=' + version;
                }
                $('div.content-wrapper').load(url, function () {
                    var $ul = $(a).parent().parent();
                    if ($ul.is('.treeview-menu')) {
                        $ul.children('li').removeClass('active');
                    }
                    $('.sidebar li:not(.treeview) > a').parent().removeClass('active');
                    $(a).parent().addClass('active');
                });
            }

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