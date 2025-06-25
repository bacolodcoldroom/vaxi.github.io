function report_main(tran){
  if(!JBE_CHK_USER(0)){ return; }
  offLive(live_id);
  document.getElementById('wrapper').setAttribute('data-tran',tran);
  let main=ret_main(tran);
  let hd=ret_hd_main(tran);
  JBE_OPEN_VIEW2(main,'PRINTER','');
  
  document.getElementById('hd_main').innerHTML=hd;
  //document.getElementById('hd_main').style.border='2px solid blue';
  if(tran=='invty'){
    document.getElementById('dtl_main').innerHTML=html_dtl_invty('main');
  }else{
    document.getElementById('dtl_main').innerHTML=ret_dtl_main(tran);
  }
  
  //document.getElementById('dtl_main').style.border='2px solid brown';
  let dv_hd=document.getElementById('hd_main');
  let dv_dt=document.getElementById('dtl_main');
  dv_hd.style.width=dv_dt.clientWidth+'px';
  /*
  let dv_hd=document.getElementById('div_hd_invty');
  let dv_dt=document.getElementById('dtls_invty');
  dv_hd.style.width=dv_dt.clientWidth+'px';

  dv_hd=document.getElementById('div_hd_accom');
  dv_dt=document.getElementById('dtls_accom');
  dv_hd.style.width=dv_dt.clientWidth+'px';
  mnu_brgy();
  */
  
  mnu_brgy();
  disp_brgy_list();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ret_main(tran){     
  //get_main_all_db();  
  let h_dashboard=22;
  let h_box1=280;
  h_box1=350;
  h_box1=window.innerHeight-h_dashboard-155;
  h_box1=H_BODY-h_dashboard-0;
    
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM');   
  let h_mainbox_invty=(h_box1-85);  
  let dtl=
  '<div id="dv_main" style="display:block;width:100%;height:100%;font-size:18px;text-align:center;padding:10px;border:1px solid blue;background:lightgray;">'+  

    '<div style="display:block;width:100%;height:'+h_box1+'px;height:100%;margin-top:0px;text-align:center;padding:0%;border:0px solid red;background:none;">'+

      //left brgy      
      '<div style="position:relative;float:left;width:20%;height:100%;margin-top:0px;text-align:center;padding:0%;border:0px solid red;background:none;">'+
        '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:center;border:0px solid black;color:white;background:'+JBE_CLOR2+';">'+
          '<div style="width:100%;height:100%;" style="font-weight:bold;">Barangay</div>'+
        '</div>'+
        '<div id="brgy_back" onclick="JBE_CLOSE_VIEW2();showMainPage()" style="position:absolute;width:auto;height:30px;top:0px;left:0px;padding:4px;background:black;"><img src="gfx/jback.png"  style="height:100%;cursor:pointer;"/></div>'+

        '<div id="brgy_list" style="width:100%;height:'+(h_box1-30-200)+'px;padding:10px;border:0px solid black;overflow:auto;background:white;">'+
        '</div>'+
        '<div style="width:100%;height:190px;margin-top:9px;border:0px solid black;padding:10px;background:white;">'+
          '<img id="brgy_logo" src="gfx/avatar.png" style="height:auto;max-height:100%;width:auto;max-width:100%;" />'+
        '</div>'+
      '</div>'+

      //right
      '<div style="float:left;margin-left:1%;width:79%;height:100%;margin-top:0px;text-align:center;padding:0px;border:0px solid red;background:none;">'+

        '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:white;background:'+JBE_CLOR2+';">'+
          '<div style="width:100%;height:100%;">Barangay : <span id="id_brgy" data-areano="" style="font-weight:bold;"></span></div>'+
        '</div>'+

        //invty
        '<div style="display:block;width:100%;height:'+h_mainbox_invty+'px;margin-top:10px;text-align:center;padding:0%;border:1px solid black;background:#FFD900;">'+
          //hd          
          '<div style="width:100%;height:30px;font-size:12px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:black;background:#FFEE00;">'+
            '<div style="float:left;width:25%;height:100%;background:none;">'+
              '<div onclick="prn_brgy(``,&quot;'+tran+'&quot;,&quot;'+curdate+'&quot;)" style="width:60px;height:100%;cursor:pointer;background:none;">'+
                '<img src="gfx/jprn.png" style="float:left;height:100%;width:auto;" />'+
                '<input type="text" value="Print" class="cls_inputlabel" style="float:left;width:35px;"/>'+
              '</div>'+
            '</div>'+
            '<div id="title_main" style="float:left;width:50%;height:100%;text-align:center;font-size:17px;">'+iif(tran=='invty','Weekly Inventory','NIP Weekly Accomplishment')+'</div>'+
            '<div style="float:left;width:25%;height:100%;text-align:right;background:none;">'+
              '<input type="text" value="Date: " class="cls_inputlabel" style="float:left;width:50%;text-align:right;" />'+
              '<input type="month" id="id_date" onchange="chgdate_brgy(this.value)"  style="float:right;width:50%;height:100%;font-weight:bold;" disabled value='+curdate+' />'+
            '</div>'+
          '</div>'+  
          
          '<div id="hd_main" style="width:100%;height:30px;border:0px solid lightgray;padding:0px;background:#FFD900;">'+

          '</div>'+
          //dtls
          '<div id="dtl_main" style="width:100%;height:'+(h_mainbox_invty-(30+30+2))+'px;font-size:14px;border:0px solid blue;overflow:auto;padding:5px;background:white;">'+           
          '</div>'+

          //menu
          '<div id="div_footer" data-saveMode="" class="cls_dispMenu" style="width:100%;height:35px;margin-top:10px;padding:2px;border:2px solid black;background:#3A3B3C;background:'+JBE_CLOR+';">'+            
          '</div>'+  

        '</div>'+        

      '</div>'+
      
    '</div>'+

  '</div>';
  return dtl;
}

function ret_hd_main(tran){  
  let areano=document.getElementById('wrapper').getAttribute('data-areano');
  let date=JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM');
  
  let hd=
  '<div disabled id="div_hd" style="width:100%;height:40px;border:0px solid black;font-size:14px;border-top:0px;padding:5px;background:#FFD900;">'+
    '<div style="float:left;width:20%;height:100%;padding:2px;border:0px solid black;">Vaccines</div>'+
    '<div style="float:left;width:80%;height:100%;padding:0px;border:0px solid black;background:none;">'+
      '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 1px 0 1px;"><button id="btn0" onclick="edit_invty_brgy(`'+areano+'`,`'+date+'`,1)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 1px 0 1px;"><button id="btn1" onclick="edit_invty_brgy(`'+areano+'`,`'+date+'`,2)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 1px 0 1px;"><button id="btn2" onclick="edit_invty_brgy(`'+areano+'`,`'+date+'`,3)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 1px 0 1px;"><button id="btn3" onclick="edit_invty_brgy(`'+areano+'`,`'+date+'`,4)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 1px 0 1px;"><button id="btn4" onclick="edit_invty_brgy(`'+areano+'`,`'+date+'`,5)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_weekly_row" style="width:15%;margin-left:0%;padding:4px 0 0 0;border:1px solid black;border-right:0px;background:'+clor_lotno+';">Lot No.</div>'+
      '<div class="cls_weekly_row" style="width:10%;padding:4px 0 0 0;border:0px solid black;border:1px solid black;border-right:0px;background:'+clor_expiry+';">Exp.</div>'+
      '<div class="cls_weekly_row" style="width:10%;margin-left:0%;padding:4px 0 0 0;border:1px solid black;background:'+clor_req+';">Req.</div>'+              
    '</div>'+
  '</div>';

  let hd2=
  '<div disabled id="div_hd" style="width:100%;height:30px;border:0px solid black;font-size:14px;border-top:0px;padding:3px 0 3px 0;background:#FFD900;">'+
    '<div style="float:left;width:13%;height:100%;padding:3px;">Vaccine</div>'+
    '<div style="float:left;width:87%;height:100%;border:0px solid black;">'+
      '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn10" onclick="edit_accom_brgy(1)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn11" onclick="edit_accom_brgy(2)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn12" onclick="edit_accom_brgy(3)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn13" onclick="edit_accom_brgy(4)" style="background:'+JBE_CLOR+';"></button></div>'+
      '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn14" onclick="edit_accom_brgy(5)" style="background:'+JBE_CLOR+';"></button></div>'+     
      '<div class="cls_accom_row" style="width:22.8%;border:1px solid lightgray;padding:4px 0 0 0;margin-left:1.1%;font-weight:bold;text-align:center">TOTALS</div>'+     
    '</div>'+
  '</div>';

  if(tran=='invty'){
    return hd;
  }else if(tran=='accom'){
    return hd2;
  }
}

function ret_dtl_main(tran){  
  let dtl='';
  DB_STOCK_INVTY.sort(JBE_SORT_ARRAY(['rank']));
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    dtl+=
    '<div id="div_row'+DB_STOCK_INVTY[i].stockno+'" style="width:100%;height:42px;border:0px solid red;color:black;background:none;">'+
      '<div style="float:left;width:20%;height:100%;text-align:left;padding:5px;border:0px solid black;overflow:auto;">'+DB_STOCK_INVTY[i].descrp+'</div>'+
      '<div id="div_row_data'+DB_STOCK_INVTY[i].stockno+'" style="float:left;width:80%;height:100%;text-align:left;padding:0px;border:0px solid red;overflow:auto;"></div>'+

      /*
      '<div style="float:left;width:80%;height:100%;border:0px solid black;">'+
        '<div style="width:100%;height:50%;border:0px solid black;">'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w1'+'" class="cls_weekly_row" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w2'+'" class="cls_weekly_row" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w3'+'" class="cls_weekly_row" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w4'+'" class="cls_weekly_row" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w5'+'" class="cls_weekly_row" value="" />'+

          '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_1lotno'+'"  class="cls_weekly_row" style="width:15%;margin-left:1%;overflow:auto;color:black;background:'+clor_lotno+';" value="" />'+
          '<input type="month" id="'+DB_STOCK_INVTY[i].stockno+'_1expiry'+'" class="cls_weekly_row" style="width:10%;background:'+clor_expiry+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1req'+'"  class="cls_weekly_row" style="width:8%;margin-left:1%;border:1px solid black;border-top:1px;border-right:0px;background:'+clor_req+';" value="" />'+
        '</div>'+
        '<div style="width:100%;height:50%;border:0px solid black;">'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w1'+'" class="cls_weekly_row" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w2'+'" class="cls_weekly_row" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w3'+'" class="cls_weekly_row" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w4'+'" class="cls_weekly_row" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w5'+'" class="cls_weekly_row" value="" />'+

          '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_2lotno'+'"   class="cls_weekly_row" style="width:15%;margin-left:1%;overflow:auto;color:black;background:'+clor_lotno+';" value="" />'+
          '<input type="month" id="'+DB_STOCK_INVTY[i].stockno+'_2expiry'+'" class="cls_weekly_row" style="width:10%;background:'+clor_expiry+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2req'+'"   class="cls_weekly_row" style="width:8%;margin-left:1%;border:1px solid black;border-bottom:0px;border-right:0px;background:'+clor_req+';" value="" />'+
        '</div>'+
      '</div>'+
      */

    '</div>';
  }

  let dtl2='';
  DB_STOCK_ACCOM.sort(JBE_SORT_ARRAY(['rank']));
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    dtl2+=
    '<div id="div_row" style="width:100%;height:40px;border:1px solid black;color:black;background:none;">'+
      '<div style="float:left;width:13%;height:100%;text-align:left;padding:5px;border:0px solid black;overflow:auto;">'+DB_STOCK_ACCOM[i].descrp+'</div>'+

      '<div style="float:left;width:87%;height:100%;border:0px solid black;">'+
        '<div style="width:100%;height:100%;border:0px solid black;">'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_1wm'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-left:2px solid black;background:'+clor_male+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_1wf'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-right:1px solid black;background:'+clor_female+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_2wm'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-left:1px solid black;background:'+clor_male+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_2wf'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-right:1px solid black;background:'+clor_female+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_3wm'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-left:1px solid black;background:'+clor_male+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_3wf'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-right:1px solid black;background:'+clor_female+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_4wm'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-left:1px solid black;background:'+clor_male+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_4wf'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-right:1px solid black;background:'+clor_female+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_5wm'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-left:1px solid black;background:'+clor_male+';" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_5wf'+'" class="cls_accom_row" onchange="do_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="border-right:2px solid black;background:'+clor_female+';" value="" />'+
          
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_totM'+'" class="cls_accom_row" style="background:'+clor_male+';border:1px solid black;margin-left:1.1%;border-left:2px solid black;" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_totF'+'" class="cls_accom_row" style="background:'+clor_female+';border:1px solid black;" value="" />'+
          '<input type="number" id="'+DB_STOCK_ACCOM[i].stockno+'_total'+'" class="cls_accom_row" style="background:white;border:1px solid black;" value="" />'+
        '</div>'+
      '</div>'+

    '</div>';
  }

  if(tran=='invty'){
    return dtl;
  }else if(tran=='accom'){
    return dtl2;
  }
}

//============================================================================================================================================================================
//============================================================================================================================================================================

function prn_brgy(brgy_code,tran,date){
  if(!JBE_CHK_USER(0)){ return; };
  
  if(!brgy_code){ brgy_code=document.getElementById('wrapper').getAttribute('data-areano'); }
  if(!brgy_code){ 
    snackBar('Select a Barangay');
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  document.getElementById('back_view1').style.display='none';
  let pa_height=H_BODY-30-35-25;
  if(JBE_MOBILE){ pa_height=H_BODY-30-35-30; }

  var dtl=
  '<div id="dv_prn" data-maxdays=0 data-print=1 style="height:100%;width:100%;font-family: Arial, Helvetica, sans-serif;font-size:12px;padding:10px;border:0px solid lightgray;background:white;">'+

    '<div style="height:35px;width:100%;text-align:center;padding:0px;font-size:16px;border:1px solid lightgray;background:none;">'+ 
       '<div class="cls_daily" style="margin:0 auto;width:250px;height:100%;padding:4px;border:0px solid lightgray;">'+ 
          '<span style="float:left;width:40%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">As of:</span>'+ 
          '<input id="date_dtr" style="width:60%;height:100%;" onchange="chg_rep_month(`'+tran+'`,`'+brgy_code+'`,this.value)" type="month" value="'+JBE_DATE_FORMAT(date,'YYYY-MM')+'"  placeholder="Date" />'+       
          //'<input id="date_dtr" style="width:60%;height:100%;" onchange="chgdate_brgy(this.value)" type="month" value="'+JBE_DATE_FORMAT(date,'YYYY-MM')+'"  placeholder="Date" />'+       
        '</div>'+
    '</div>'+  

    '<div id="printableBorder" style="height:'+pa_height+'px;border:1px solid lightgray;">'+    
      '<div id="printableArea" style="width:1000px;border:1px solid black;">'+
        '<div id="pa_dtl">'+
        '</div>'+
      '</div>'+
    '</div>'+

    '<div id="div_prn_menu" style="width:100%;height:40px;margin-top:0px;font-size:14px;padding:3px;border:0px solid green;color:white;background:'+JBE_CLOR+';">'+  
    '</div>';
      
  '</div>';

  JBE_OPEN_VIEW2(dtl,'PRINTER','showMainPage');
  mnu_repo();

  if(tran=='invty'){
    rp2_invty(brgy_code,date);
  }else if(tran=='accom'){
    rp_accom(brgy_code,date);
  }
}
function mnu_repo(){  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="JBE_PRINTDIV(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:20%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span style="padding:2px;">Print</span>'+
      '</div>'+
    '</div>'+    
    '<div onclick="JBE_PRINT_PDF(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:20%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jpdf.png" alt="call image" />'+
        '<span style="padding:2px;">PDF</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="JBE_CLOSE_VIEW2();showMainPage()" style="float:right;width:20%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span style="padding:2px;">Close</span>'+
      '</div>'+
    '</div>'+
  '</div>';
  dispMenu('div_prn_menu',jmenu);  
}

function chg_rep_month(tran,areano,date){
  //alert(date);
  console.log(tran,areano,date);
  if(tran=='invty'){
    rp2_invty(areano,date);
  }else{
    rp_accom(areano,date);
  }
}





