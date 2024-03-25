 const HTTPRequestService = (method,url,data=undefined)=>{
    emp = [];
        $.ajax(
            {
                url:url,
                method:method,
                async:false,
                contentType: 'application/json',
                data:data,
                success:(data,text,jqXHR)=>{
                    emp = data;
                },
                error:function (jqXHR,textStatus,errorThrown){
                    window.alert(`AJAX error (${method}):`, errorThrown);
                }
            }
        );
        return emp;
}

