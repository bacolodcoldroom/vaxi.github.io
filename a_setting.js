function fm_lotno_expiry(){   
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  var n = new Date().toLocaleTimeString('it-IT');
  var profileImg=document.getElementById('bar_avatar').src;
  var username=CURR_NAME;
  let cb='JBE_CLOSE_VIEW2';
  cb='';
  var dtl=
    '<div id="div_main_vax_expiry" data-mode="" data-usercode="'+CURR_USER+'" data-cb="'+cb+'" style="width:800px;height:100%;margin:0 auto;padding:0px;border:1px solid lightgray;overflow-x:hidden;overflow-y:auto;background:none;">'+
      
      '<div style="height:55px;width:100%;padding:5px;color:'+JBE_TXCLOR1+';background:'+JBE_CLOR+';">'+
        '<div id="div_back" onclick="close_vax_expiry()" style="float:left;width:auto;height:100%;cursor:pointer;">'+
          '<img src="gfx/jback.png" style="height:100%;" />'+
        '</div>'+
        '<div style="float:right;height:100%;width:auto;padding:10px;font-weight:bold;border:px solid white;background:none;">'+
          'Lot Numbers and Expiry'+
        '</div>'+        
      '</div>'+

      '<div id="div_body_vax_expiry" style="width:100%;height:'+(H_BODY-(55+50+3))+'px;overflow-x:hidden;overflow-y:auto;background:white;padding:2px;">'+        
/*
        '<div style="width:400px;height:auto;margin:0 auto;margin-top:200px;background:red;">'+        
          '<div style="float:left;width:50%;height:50%;">Lot No. :</div> <input type="text" style="float:left;width:50%;height:50%;" />'+ 
          '<div style="float:left;width:50%;height:50%;">Expiry:</div> <input type="date" style="float:left;width:50%;height:50%;" />'+ 
        '</div>'+
*/
        '<div class="cls_fm_dtl">'+        
          '<div>'+          
            '<span onclick="JBE_SHOW_LOGGER(tx_stockno.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Stock Code:</span>'+                     
            '<input id="lu_stockno" type="image" src="gfx/jsearch.png" onclick="look_stockno(tx_stockno.value)" />'+
          '</div>'+
          '<input id="tx_stockno" type="text" disabled data-caption="Stock Code" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_stockno.id).focus()" />'+
        '</div>'+
        '<div class="cls_fm_dtl">'+        
          '<div>'+          
            '<span onclick="JBE_SHOW_LOGGER(tx_stockno.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Description:</span>'+                     
          '</div>'+
          '<input id="tx_descrp" type="text" data-caption="Stock Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_descrp.id).focus()" />'+
        '</div>'+

      '</div>'+

      '<div id="div_foot_vax_expiry" style="width:100%;height:50px;padding:5px;background:'+JBE_CLOR+';"></div>'+

    '</div>';        

  JBE_OPEN_VIEW2(dtl,'Set Lot No. and Expiry','close_vax_expiry');  
  dispMenu('div_foot_vax_expiry',123);
}

function close_vax_expiry(){   
  JBE_CLOSE_VIEW2();
  showMainPage();
}