define(function(require, exports, module){

    function Home(){}

    module.exports = Home;

    //==============================
    // init
    //==============================
    Home.prototype.init = function () {
        $("#example1").DataTable();
        $('#example2').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false
        });
        Mock.mock('rest/test', 'get', {
            res: {
                id: 1,
                name: 'yangkai'
            }
        });
        $.ajax({
            url: 'rest/test',
            type: 'get',
            dataType: 'json',
            success: function(result) {
                console.log(result);
            }
        })
    }
});