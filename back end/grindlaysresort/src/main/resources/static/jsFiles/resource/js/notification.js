function alertFunction (des,tit,typ,aa=null,time="5000") {
    toastr.options.onclick = aa;
    toastr.options.timeOut = time;
    if(typ==="success")toastr.success(tit,des);
    if(typ==="info")toastr.info(tit,des);
    if(typ==="error")toastr.error(tit,des);
    if(typ==="warning")toastr.warning(tit,des);
}
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "showDuration": "300",
    "hideDuration": "1000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}