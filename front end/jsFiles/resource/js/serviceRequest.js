 const HTTPRequestService = (method,url,data=undefined)=>{
    // obj = new obj();
    let requestObj =  new Object();
    requestObj.data = null;
    requestObj.status = null;
    requestObj.errorMessage = null;
        $.ajax(
            {
                url:url,
                method:method,
                async:false,
                contentType: 'application/json',
                data:data,
                success:(data,text,jqXHR)=>{
                    requestObj.data = data;
                    requestObj.status = jqXHR.status
                },
                error:function (jqXHR,textStatus,errorThrown){
                    try{
                        requestObj.errorMessage = JSON.parse(jqXHR.responseJSON.message);
                        requestObj.status = jqXHR.status
                    }catch(e){
                        requestObj.errorMessage = jqXHR.responseJSON.message;
                        requestObj.status = jqXHR.status
                    }
                }
            }
        );
    return requestObj;
}

