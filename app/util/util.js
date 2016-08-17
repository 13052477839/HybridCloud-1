define(function (require) {
    var sidebarChange = function (a) {
        if (!$(a).parent().is('.treeview')) {
            var $ul = $(a).parent().parent();
            if ($ul.is('.treeview-menu')) {
                $ul.children('li').removeClass('active');
            }
            $('.sidebar li:not(.treeview) > a').parent().removeClass('active');
            $(a).parent().addClass('active');
            var url = $(a).attr('href');
            console.log(url);
        }
    };

    return {
        sidebarChange: sidebarChange
    }
});