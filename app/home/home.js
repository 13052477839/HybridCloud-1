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
    }
});