const colorScheme = [
  "#25CCF7","#FD7272","#54a0ff","#00d2d3",
  "#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e",
  "#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50",
  "#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6",
  "#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d",
  "#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9",
  "#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7",
  "#fab1a0","#ff7675","#fd79a8","#fdcb6e","#e17055",
  "#d63031","#feca57","#5f27cd","#54a0ff","#01a3a4"
]
let clor_lotno='#ddebf7';
let clor_expiry='#fce4d6';
let clor_req='#c9daf8';
let clor_male='#d9e2f3';
let clor_female='#ffccff';

function fm_dashboard(f_clear){   
  //if(!JBE_CHK_USER(0)){ return; };
  //get_main_all_db();
  let h_dashboard=22;
  let h_box1=280;
  h_box1=350;
  h_box1=window.innerHeight-h_dashboard-155;
  h_box1=H_BODY-h_dashboard-25;
  //if(JBE_MOBILE){ h_box1=350; }
  let h_spaces=30;
  let h_box2=H_BODY-(h_dashboard+h_box1+h_spaces+5);
  //refresh_all_db();
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM'); 
  //alert(curdate);
  //alert(DB_STOCK_INVTY.length);
  let h_mainbox_invty=(h_box1-94)/2;
  let h_mainbox_accom=h_mainbox_invty;
  let dtl=
  '<div style="display:block;width:100%;height:100%;font-size:18px;text-align:center;padding:10px;border:0px solid orange;background:	lightgray;">'+  

    '<div style="width:100%;height:'+h_dashboard+'px;font-size:18px;padding:0px;font-weight:bold;text-align:left;border:0px solid gainsboro;background:none;">'+  
      '<div id="menu_open"" data-mode=0 onclick="openNav()" style="float:left;width:30px;height:100%;"><img src="gfx/jham.png" style="height:100%;" /></div>'+
      '<div  style="float:left;width:auto;height:100%;">DASHBOARD</div>'+
    '</div>'+


    '<div style="display:block;width:100%;height:'+h_box1+'px;margin-top:5px;text-align:center;padding:0%;border:0px solid red;background:none;">'+

      //left brgy
      
      '<div style="float:left;width:20%;height:100%;margin-top:0px;text-align:center;padding:0%;border:0px solid red;background:none;">'+
        '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:center;border:0px solid black;color:white;background:'+JBE_CLOR2+';">'+
          '<div style="width:100%;height:100%;" style="font-weight:bold;">Barangay</div>'+
        '</div>'+
        '<div id="brgy_list" style="width:100%;height:'+(h_box1-30-200)+'px;padding:10px;border:0px solid black;overflow:auto;background:white;">'+
        '</div>'+
        '<div style="width:100%;height:190px;margin-top:10px;border:0px solid black;padding:10px;background:white;">'+
          '<img id="brgy_logo" src="gfx/avatar.png" style="height:100%;" />'+
        '</div>'+
      '</div>'+

      //right
      '<div style="float:left;margin-left:1%;width:59%;height:100%;margin-top:0px;text-align:center;padding:0px;border:0px solid red;background:none;">'+

        '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:white;background:'+JBE_CLOR2+';">'+
          '<div style="width:100%;height:100%;">Barangay : <span id="id_brgy" data-areano="" style="font-weight:bold;"></span></div>'+
        '</div>'+

        //'<div style="width:100%;height:'+h_mainbox+'px;;margin-top:10px;text-align:center;padding:0px;overflow:auto;border:1px solid yellow;background:none;">'+

        //invty
        '<div div="div_invty" style="display:block;width:100%;height:'+h_mainbox_invty+'px;margin-top:10px;text-align:center;padding:0%;border:1px solid black;background:#FFD900;">'+
          /*
          '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:black;background:#FFEE00;">'+
            '<div style="float:left;width:50%;height:100%;">Weekly Inventory</div>'+
            '<div style="float:left;width:50%;height:100%;text-align:right;background:none;">Date : <input type="month" id="id_date" onchange="chgdate_invty_brgy()"  style="float:right;width:100px;margin-left:5px;height:100%;font-weight:bold;" disabled value='+curdate+' /></div>'+
          '</div>'+
          */

          '<div style="width:100%;height:30px;font-size:12px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:black;background:#FFEE00;">'+
            '<div style="float:left;width:25%;height:100%;background:none;">'+
              '<div onclick="prn_brgy(1)" style="width:60px;height:100%;cursor:pointer;background:none;">'+
                '<img src="gfx/jprn.png" style="float:left;height:100%;width:auto;" />'+
                '<input type="text" value="Print" class="cls_inputlabel" style="float:left;width:35px;"/>'+
              '</div>'+
            '</div>'+
            '<div style="float:left;width:50%;height:100%;text-align:center;font-size:17px;">Weekly Inventory</div>'+
            '<div style="float:left;width:25%;height:100%;text-align:right;background:none;">'+
              '<input type="text" value="Date: " class="cls_inputlabel" style="float:left;width:50%;text-align:right;" />'+
              '<input type="month" id="id_date" onchange="chgdate_invty_brgy(this.value)"  style="float:right;width:50%;height:100%;font-weight:bold;" disabled value='+curdate+' />'+
            '</div>'+
          '</div>'+

          '<div disabled id="div_hd_invty" style="width:100%;height:30px;border:0px solid black;font-size:14px;border-top:0px;padding:4px;background:#FFD900;">'+
            '<div style="float:left;width:20%;height:100%;padding:3px;">Vaccines</div>'+
            '<div style="float:left;width:80%;height:100%;border:0px solid black;">'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn0" onclick="edit_invty_brgy(1)" style="background:'+JBE_CLOR+';"></button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn1" onclick="edit_invty_brgy(2)" style="background:'+JBE_CLOR+';"></button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn2" onclick="edit_invty_brgy(3)" style="background:'+JBE_CLOR+';"></button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn3" onclick="edit_invty_brgy(4)" style="background:'+JBE_CLOR+';"></button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn4" onclick="edit_invty_brgy(5)" style="background:'+JBE_CLOR+';"></button></div>'+
              '<div class="cls_weekly_row" style="width:15%;margin-left:1%;padding:4px 0 0 0;border:1px solid black;border-right:0px;background:'+clor_lotno+';">Lot No.</div>'+
              '<div class="cls_weekly_row" style="width:10%;padding:4px 0 0 0;border:0px solid black;border:1px solid black;background:'+clor_expiry+';">Exp.</div>'+
              '<div class="cls_weekly_row" style="width:8%;margin-left:1%;padding:4px 0 0 0;border:1px solid black;background:'+clor_req+';">Req.</div>'+              
            '</div>'+
          '</div>'+
          
          '<div id="dtls_invty" style="width:100%;height:'+(h_mainbox_invty-(30+30+2))+'px;border:0px solid blue;overflow:auto;padding:5px;background:white;">';              
            let vdtl='';
            DB_STOCK_INVTY.sort(JBE_SORT_ARRAY(['rank']));
            for(var i=0;i<DB_STOCK_INVTY.length;i++){
              vdtl+=
              '<div id="div_row" style="width:100%;height:35px;font-size:14px;border:1px solid black;color:black;background:none;">'+
                '<div style="float:left;width:20%;height:100%;text-align:left;padding:5px;border:0px solid black;overflow:auto;">'+DB_STOCK_INVTY[i].descrp+'</div>'+

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

              '</div>';
            }
            dtl+=vdtl+        
          '</div>'+

        '</div>'+
        //=====================================================================================================================
        //accom
        '<div id="div_accom" style="display:block;width:100%;height:'+h_mainbox_accom+'px;margin-top:10px;font-size:14px;text-align:center;padding:0px;border:1px solid black;background:white;">'+

          '<div style="width:100%;height:30px;font-size:12px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:black;background:#FFEE00;">'+
            '<div style="float:left;width:25%;height:100%;background:none;">'+
              '<div onclick="prn_brgy(2,date_accom.value)" style="width:60px;height:100%;cursor:pointer;background:none;">'+
                '<img src="gfx/jprn.png" style="float:left;height:100%;width:auto;" />'+
                '<input type="text" value="Print" class="cls_inputlabel" style="float:left;width:35px;"/>'+
              '</div>'+
            '</div>'+
            '<div style="float:left;width:50%;height:100%;text-align:center;font-size:17px;background:none;">Weekly Accomplishment</div>'+
            '<div style="float:right;width:25%;height:100%;text-align:right;background:none;">'+
              '<input type="text" value="Date: " class="cls_inputlabel" style="float:left;width:50%;text-align:right;" />'+
              '<input type="month" id="date_accom" onchange="chgdate_accom_brgy(this.value)"  style="float:right;width:50%;height:100%;font-weight:bold;" disabled value='+curdate+' />'+
            '</div>'+
          '</div>'+

          '<div style="width:100%;height:30px;border:0px solid lightgray;padding:0px;background:#FFD900;">'+

            '<div id="div_hd_accom" style="width:100%;height:100%;border:0px solid red;padding:3px;background:#FFD900;">'+
              '<div style="float:left;width:13%;height:100%;padding:3px;">Vaccine</div>'+
              '<div style="float:left;width:87%;height:100%;border:0px solid black;">'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn10" onclick="edit_accom_brgy(1)" style="background:'+JBE_CLOR+';"></button></div>'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn11" onclick="edit_accom_brgy(2)" style="background:'+JBE_CLOR+';"></button></div>'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn12" onclick="edit_accom_brgy(3)" style="background:'+JBE_CLOR+';"></button></div>'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn13" onclick="edit_accom_brgy(4)" style="background:'+JBE_CLOR+';"></button></div>'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn14" onclick="edit_accom_brgy(5)" style="background:'+JBE_CLOR+';"></button></div>'+     
                '<div class="cls_accom_row" style="width:22.8%;border:1px solid lightgray;padding:4px 0 0 0;margin-left:1.1%;font-weight:bold;text-align:center">TOTALS</div>'+     
              '</div>'+
            '</div>'+
            

            '<div id="dtls_accom" style="width:100%;height:'+(h_mainbox_accom-(30+30+2))+'px;;border:0px solid red;overflow:auto;padding:5px;background:none;">';
              let vdtl2='';
              DB_STOCK_ACCOM.sort(JBE_SORT_ARRAY(['rank']));
              for(var i=0;i<DB_STOCK_ACCOM.length;i++){
                vdtl2+=
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
              dtl+=vdtl2+        
              
            '</div>'+ 

            //menu
            '<div id="div_menu" data-saveMode="" class="cls_dispMenu" style="width:100%;height:35px;margin-top:10px;padding:2px;border:2px solid black;background:#3A3B3C;background:'+JBE_CLOR+';">'+            
            '</div>'+            

          '</div>'+   
          
        '</div>'+

        //'</div>'+

      '</div>'+

      //
      '<div style="float:right;width:19%;height:100%;margin-left:1%;text-align:left;border:0px solid red;background:white;">'+
        '<div style="width:100%;height:30px;padding:5px;text-align:center;color:white;background:'+JBE_CLOR2+';">Log</div>'+
        '<div id="id_log" style="width:100%;height:'+(H_BODY-40-35-2)+'px;font-size:12px;padding:5px;overflow:auto;background:white;">'+
        '</div>'+        
      '</div>'+

    '</div>'+

  '</div>';
  document.getElementById('div_right').innerHTML=dtl;
  disp_brgy_list();

  if(f_clear){
    document.getElementById('div_body').setAttribute('data-row',0);
    document.getElementById('div_body').setAttribute('data-row2',0);
  }
  /*
  document.querySelectorAll('.menu_class').forEach(function(el) {
    el.style.display = 'none'; 
  });
  */
  let dv_hd=document.getElementById('div_hd_invty');
  let dv_dt=document.getElementById('dtls_invty');
  dv_hd.style.width=dv_dt.clientWidth+'px';

  dv_hd=document.getElementById('div_hd_accom');
  dv_dt=document.getElementById('dtls_accom');
  dv_hd.style.width=dv_dt.clientWidth+'px';
  mnu_brgy();
}

function mnu_brgy(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div style="float:left;width:75%;height:100%;padding:5px;font-size:16px;text-align:left;color:white;background:none;">'+
        'Click Week Buttons to Edit'+
      '</div>'+
    '</div>';  
  //document.getElementById('div_menu').innerHTML=jmenu;
  dispMenu('div_menu',jmenu);
}

function mnu_save_brgy(){  
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="save_brgy(&quot;'+areano+'&quot;)" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span style="height:100%;padding:0 0 0 5px;color:white;">Save</span>'+
        '</div>'+
      '</div>'+
      //'<div onclick="disp_invty_brgy(&quot;'+areano+'&quot;)" style="float:right;width:25%;height:100%;background:none;">'+
      '<div onclick="disp_brgy(&quot;'+areano+'&quot;)" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  dispMenu('div_menu',jmenu);
}

function disp_brgy(areano){
  disp_invty_brgy(areano);
  disp_accom_brgy(areano);
  mnu_brgy();
}

async function sel_brgy(areano){
  if(!JBE_CHK_USER(0)){ return; };
  document.getElementById('wrapper').setAttribute('data-brgycode',areano);
  let name=JBE_GETFLD('name',DB_AREA,'areano',areano);
  document.getElementById('id_brgy').setAttribute('data-areano',areano);
  document.getElementById('id_brgy').innerHTML=name;    
  document.getElementById('id_date').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM');
  document.getElementById('id_date').disabled=false;
  document.getElementById('brgy_logo').src='./gfx/proc_balls.gif';  
  let v_mphoto=await jeff_getImage('vaxi/images/'+areano+'.jpg');  
  if(isJpegDataUrl(v_mphoto)){ document.getElementById('brgy_logo').src=v_mphoto; }
  disp_invty_brgy(areano);
  //accom
  document.getElementById('date_accom').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM');
  document.getElementById('date_accom').disabled=false;
  disp_accom_brgy(areano);
  mnu_brgy();
  //hightlight select barangay
  let ndx=0;
  let len_dtls=document.querySelectorAll('.class_brgy').length;
  for(var i=0;i<len_dtls;i++){
    let vname=document.getElementById('id_'+i).innerHTML;
    if(vname==name){
      ndx=i; break;
    }
  }
  JBE_HL_ROW(ndx,'black','gray', '.class_brgy', 'id_',  'red', 'black');
}

function chgdate_invty_brgy(){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  if(!areano){ snackBar('No Barangay selected...'); }
  disp_invty_brgy(areano);
}

function clear_invty_brgy(){
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let div='';
    for(var k=0;k<5;k++){
      div=DB_STOCK_INVTY[i].stockno+'_1w'+(k+1);    document.getElementById(div).style.backgroundColor='white'; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
      div=DB_STOCK_INVTY[i].stockno+'_2w'+(k+1);    document.getElementById(div).style.backgroundColor='white'; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    }
    div=DB_STOCK_INVTY[i].stockno+'_1lotno';        document.getElementById(div).style.backgroundColor=clor_lotno; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK_INVTY[i].stockno+'_1expiry';       document.getElementById(div).style.backgroundColor=clor_expiry; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK_INVTY[i].stockno+'_1req';          document.getElementById(div).style.backgroundColor=clor_req; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK_INVTY[i].stockno+'_2lotno';        document.getElementById(div).style.backgroundColor=clor_lotno; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK_INVTY[i].stockno+'_2expiry';       document.getElementById(div).style.backgroundColor=clor_expiry; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK_INVTY[i].stockno+'_2req';          document.getElementById(div).style.backgroundColor=clor_req; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
  }  
}

//‐-------
function disp_brgy_list(){  
  DB_AREA.sort(JBE_SORT_ARRAY(['rank','name']));
  console.log('disp_brgy_list',DB_AREA);
  let vdtl='';          
  for(var i=0;i<DB_AREA.length;i++){            
    vdtl+='<div id="id_'+i+'" class="class_brgy" onclick="sel_brgy(&quot;'+DB_AREA[i].areano+'&quot;)" style="width:100%;height:25px;font-size:12px;margin-top:2px;cursor:pointer;padding:4px;border:1px solid lightgray;color:black;background:gray;">'+DB_AREA[i].name+'</div>';
  }
  document.getElementById('brgy_list').innerHTML=vdtl;
}

//‐-------
function disp_invty_brgy(areano){  
  let curdate=document.getElementById('id_date').value;
  curdate=JBE_DATE_FORMAT(curdate,'YYYY-MM');
  clear_invty_brgy();
  btn_enabled(0);
  update_week_buttons(curdate,'invty');
  for(var i=0;i<DB_INVTY.length;i++){
    if(DB_INVTY[i].areano !== areano){ continue; }
    if(JBE_DATE_FORMAT(DB_INVTY[i].date,'YYYY-MM') !== curdate){ continue; }

    let div;
    for(var k=0;k<5;k++){
      let fld1='1w'+(k+1);
      let fld2='2w'+(k+1);
      div=DB_INVTY[i].stockno+'_'+fld1;       document.getElementById(div).value=DB_INVTY[i][fld1];
      div=DB_INVTY[i].stockno+'_'+fld2;       document.getElementById(div).value=DB_INVTY[i][fld2];
    }
    
    div=DB_INVTY[i].stockno+'_1lotno';        document.getElementById(div).value=DB_INVTY[i]['1lotno'];
    div=DB_INVTY[i].stockno+'_1expiry';       document.getElementById(div).value=DB_INVTY[i]['1expiry'];
    div=DB_INVTY[i].stockno+'_1req';          document.getElementById(div).value=DB_INVTY[i]['1req'];
    div=DB_INVTY[i].stockno+'_2lotno';        document.getElementById(div).value=DB_INVTY[i]['2lotno'];
    div=DB_INVTY[i].stockno+'_2expiry';       document.getElementById(div).value=DB_INVTY[i]['2expiry'];
    div=DB_INVTY[i].stockno+'_2req';          document.getElementById(div).value=DB_INVTY[i]['2req'];
  }  
  //mnu_invty_brgy();
}


//‐-------
function edit_invty_brgy(col){  
  let txtContent=document.getElementById('btn'+(col-1)).textContent;
  if(!txtContent){
    //MSG_SHOW(vbOk,'ERROR:','No Database Found. Create New one.', function(){},function(){});    
    return;
  }
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  if(!areano){
    snackBar('Select a Barangay...');
    return;
  }
  document.getElementById('div_menu').setAttribute('data-saveMode','invty');
  btn_enabled(col,'invty');
  //assign
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let div=DB_STOCK_INVTY[i].stockno+'_1w'+col;  document.getElementById(div).style.backgroundColor='yellow'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_INVTY[i].stockno+'_2w'+col;      document.getElementById(div).style.backgroundColor='yellow'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_INVTY[i].stockno+'_1lotno';      document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_INVTY[i].stockno+'_1expiry';     document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_INVTY[i].stockno+'_1req';        document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_INVTY[i].stockno+'_2lotno';      document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_INVTY[i].stockno+'_2expiry';     document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_INVTY[i].stockno+'_2req';        document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
  }
  //document.getElementById('btn'+col).disabled=false;
  mnu_save_brgy();
}

function btn_enabled(col,tran){
  let vbtn='btn';
  if(tran=='accom'){ vbtn='btn1'; }
  let vcolor='white';let vopacity='0.5'; let vdisabled=true;
  if(col==0){
    vcolor='white'; vopacity='1'; vdisabled=false;
  }
  for(var i=0;i<5;i++){    
    //document.getElementById(vbtn+i).style.color='white'; document.getElementById(vbtn+i).style.opacity='0.5'; document.getElementById(vbtn+i).disabled=true;
    document.getElementById('btn'+i).style.color=vcolor; document.getElementById('btn'+i).style.opacity=vopacity; document.getElementById('btn'+i).disabled=vdisabled;
    document.getElementById('btn1'+i).style.color=vcolor; document.getElementById('btn1'+i).style.opacity=vopacity; document.getElementById('btn1'+i).disabled=vdisabled;    
  }
  if(col != 0){
    document.getElementById(vbtn+(col-1)).style.color='red'; document.getElementById(vbtn+(col-1)).style.opacity='1'; document.getElementById(vbtn+(col-1)).disabled=false;
  }
}

function subtractDates(date1, date2) {
  // Ensure date1 is the later date
  if (date1 < date2) {
    [date1, date2] = [date2, date1];
  }

  const yearsDiff = date1.getFullYear() - date2.getFullYear();
  const monthsDiff = date1.getMonth() - date2.getMonth();
  const daysDiff = date1.getDate() - date2.getDate();

  // Calculate total months difference
  let totalMonths = yearsDiff * 12 + monthsDiff;
  let remainingDays = daysDiff;

  // Adjust days if negative
  if (remainingDays < 0) {
    totalMonths -= 1; // Borrow one month
    const prevMonth = new Date(date1.getFullYear(), date1.getMonth() - 1, 1);
    remainingDays += new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate(); // Days in the previous month
  }

  return { months: totalMonths, days: remainingDays };
}
//save
function save_brgy(areano){
  let saveMode=document.getElementById('div_menu').getAttribute('data-saveMode');  
  if(saveMode=='invty'){
    save_invty_brgy(areano);
  }else if(saveMode=='accom'){
    save_accom_brgy(areano);
  }else{
    snackBar('ERROR: Select Inventory or Accomplishment mode.');
    return;    
  }
}

async function save_invty_brgy(areano){
  showProgress(true);
  let n=new Date();
  let date_save = JBE_DATE_FORMAT(n,'YYYY-MM-DD');
  let time_save= n.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });

  let curdate=document.getElementById('id_date').value;
  let arr=[];arr_ctr=0;
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let row1=[]; let row2=[];
    for(var k=0;k<5;k++){      
      row1[k]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_1w'+(k+1)).value;
      row2[k]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_2w'+(k+1)).value;
    }

    row1[5]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_1lotno').value; row1[6]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_1expiry').value;    
    row1[7]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_1req').value;    

    row2[5]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_2lotno').value; row2[6]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_2expiry').value;
    row2[7]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_2req').value;
    
    let obj={
      "areano":areano,
      "stockno":DB_STOCK_INVTY[i].stockno,
      "date_save":date_save,"time_save":time_save,
      "date":curdate,
      "1w1":row1[0],"1w2":row1[1],"1w3":row1[2],"1w4":row1[3],"1w5":row1[4], "1lotno":row1[5],"1expiry":row1[6],"1req":row1[7],
      "2w1":row2[0],"2w2":row2[1],"2w3":row2[2],"2w4":row2[3],"2w5":row2[4], "2lotno":row2[5],"2expiry":row2[6],"2req":row2[7]
    }
    console.log(DB_STOCK_INVTY[i].descrp,obj);
    arr[arr_ctr]=obj; 
    arr_ctr++;
  }
  await api_save(JBE_CLOUD,JBE_API+'invty',arr,record => !(record.areano === areano || record.date === curdate));  
  let data=await api_readfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content;
  console.log('data new:',data.length);
  showProgress(false);
  disp_invty_brgy(areano);
}

//=========================================================================================================================================================================
//=========================================================================================================================================================================
//=========================================================================================================================================================================
//‐-------
function disp_accom_brgy(areano){  
  let curdate=document.getElementById('date_accom').value;    
  clear_accom_brgy();
  btn_enabled(0);
  update_week_buttons(curdate,'accom');
  for(var i=0;i<DB_ACCOM.length;i++){
    if(JBE_DATE_FORMAT(DB_ACCOM[i].date,'YYYY-MM') !== curdate){ continue; }
    if(DB_ACCOM[i].areano !== areano){ continue; }

    let div='';    
    for(var k=0;k<5;k++){
      let fld1=(k+1)+'wm';      
      let fld2=(k+1)+'wf';

      div=DB_ACCOM[i].stockno+'_'+fld1;    document.getElementById(div).value=DB_ACCOM[i][fld1];
      div=DB_ACCOM[i].stockno+'_'+fld2;    document.getElementById(div).value=DB_ACCOM[i][fld2];
    }
    
    document.getElementById(DB_ACCOM[i].stockno+'_totM').value=DB_ACCOM[i]['totM'];   
    document.getElementById(DB_ACCOM[i].stockno+'_totF').value=DB_ACCOM[i]['totF'];  
    document.getElementById(DB_ACCOM[i].stockno+'_total').value=DB_ACCOM[i]['total'];         
  }    
  //mnu_accom_brgy();
}

//‐-------
function edit_accom_brgy(col){
  let txtContent=document.getElementById('btn1'+(col-1)).textContent;
  if(!txtContent){
    //MSG_SHOW(vbOk,'ERROR:','No Database Found. Create New one.', function(){},function(){});    
    return;
  }
  
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  if(!areano){
    snackBar('Select a Barangay...');
    return;
  }
  document.getElementById('div_menu').setAttribute('data-saveMode','accom');
  btn_enabled(col,'accom');
  //assign
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let div=DB_STOCK_ACCOM[i].stockno+'_'+col+'wm';  document.getElementById(div).style.borderLeft='2px solid red'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_ACCOM[i].stockno+'_'+col+'wf';      document.getElementById(div).style.borderRight='2px solid red'; document.getElementById(div).style.pointerEvents='auto';
  }
  //document.getElementById('btn'+col).disabled=false;
  //mnu_save_accom_brgy();
  mnu_save_brgy();
}

function clear_accom_brgy(){
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let div='';
    for(var k=0;k<5;k++){
      div=DB_STOCK_ACCOM[i].stockno+'_'+(k+1)+'wm';    document.getElementById(div).style.borderLeft=iif((k+1)==1,2,1)+'px solid black';  document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
      div=DB_STOCK_ACCOM[i].stockno+'_'+(k+1)+'wf';    document.getElementById(div).style.borderRight=iif((k+1)==5,2,1)+'px solid black'; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    }   
    document.getElementById(DB_STOCK_ACCOM[i].stockno+'_totM').value='';   
    document.getElementById(DB_STOCK_ACCOM[i].stockno+'_totF').value=''; 
    document.getElementById(DB_STOCK_ACCOM[i].stockno+'_total').value='';
  }  
}

async function save_accom_brgy(areano){
  showProgress(true);
  let n=new Date();
  let date_save = JBE_DATE_FORMAT(n,'YYYY-MM-DD');
  let time_save= n.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
  
  let curdate=document.getElementById('date_accom').value;  
  let arr=[];arr_ctr=0;
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let totals=Number(document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'total').value);
    if(!totals){ continue; }
    let obj={
      "areano":areano,
      "stockno":DB_STOCK_ACCOM[i].stockno,
      "date_save":date_save,"time_save":time_save,
      "date":document.getElementById('date_accom').value,
      "1wm":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'1wm').value,
      "1wf":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'1wf').value,
      "2wm":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'2wm').value,
      "2wf":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'2wf').value,
      "3wm":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'3wm').value,
      "3wf":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'3wf').value,
      "4wm":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'4wm').value,
      "4wf":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'4wf').value,
      "5wm":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'5wm').value,
      "5wf":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'5wf').value,
      "totM":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'totM').value,
      "totF":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'totF').value,
      "total":document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'total').value
    }
    arr[arr_ctr]=obj; arr_ctr++;
  }  
  await api_save(JBE_CLOUD,JBE_API+'accom',arr,record => !(record.areano === areano || record.date === curdate));  
  let data=await api_readfile(JBE_CLOUD,JBE_API+'accom'); DB_ACCOM=data.content;
  showProgress(false);
  disp_accom_brgy(areano);
}

function chgdate_accom_brgy(v){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  if(!areano){ snackBar('No Barangay selected...'); }
  disp_accom_brgy(areano);
}

function close_accom_brgy(){
  //JBE_CLOSE_VIEW();
  showMainPage();
  //mnu_main_repo();
}

function mnu_accom_brgy(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div style="float:left;width:75%;height:100%;padding:5px;font-size:16px;text-align:left;color:white;background:none;">'+
        'Click Week Buttons to Edit'+
      '</div>'+      
    '</div>';
  dispMenu('div_menu2',jmenu);
}

function xmnu_save_accom_brgy(){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="save_accom_brgy(&quot;'+areano+'&quot;)" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span style="padding:0 0 0 5px;color:white;">Save</span>'+
        '</div>'+
      '</div>'+
      //'<div onclick="disp_accom_brgy(&quot;'+areano+'&quot;)" style="float:right;width:25%;height:100%;background:none;">'+
      '<div onclick="disp_brgy(&quot;'+areano+'&quot;)" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  dispMenu('div_menu2',jmenu);
}

function do_total_accom(id){
  let tot_m=0; let tot_f=0;  
  for(var k=1;k<=5;k++){
    let div_m=id+'_'+k+'wm';
    let div_f=id+'_'+k+'wf';
    tot_m+=Number(document.getElementById(div_m).value);
    tot_f+=Number(document.getElementById(div_f).value);
  }
  document.getElementById(id+'_totM').value=tot_m;
  document.getElementById(id+'_totF').value=tot_f;
  document.getElementById(id+'_total').value=tot_m+tot_f;
}
