define(function (require) {

    //==============================
    // sidebarChange control
    //==============================
    var sidebarChange = function (a) {
        if (!$(a).parent().is('.treeview')) {
            var url = $(a).attr('href');
            url = url.substring(2);
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

    return {
        sidebarChange: sidebarChange
    }
});