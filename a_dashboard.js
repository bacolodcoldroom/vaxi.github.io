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
  get_app_default();
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
  let h_mainbox_invty=378;
  let h_mainbox_accom=h_mainbox_invty;
  let dtl=
  '<div style="display:block;width:100%;height:100%;font-size:18px;text-align:center;padding:10px;border:0px solid orange;background:	lightgray;">'+  

    '<div style="width:100%;height:'+h_dashboard+'px;font-size:18px;padding:0px;font-weight:bold;text-align:left;border:0px solid gainsboro;background:none;">'+  
      '<div id="menu_open"" data-mode=0 onclick="openNav()" style="float:left;width:30px;height:100%;"><img src="gfx/jham.png" style="height:100%;" /></div>'+
      '<div  style="float:left;width:auto;height:100%;">DASHBOARD</div>'+
    '</div>'+


    '<div style="display:block;width:100%;height:'+h_box1+'px;margin-top:5px;text-align:center;padding:0%;border:0px solid red;background:none;">'+

      //left brgy
      '<div style="float:left;width:20%;height:100%;margin-top:0px;text-align:center;padding:1%;border:0px solid red;background:white;">'+
        '<div style="width:100%;height:100%;padding:5px;overflow:auto;">';
          let vdtl='';          
          for(var i=0;i<DB_AREA.length;i++){
            vdtl+='<div id="id_'+i+'" class="class_brgy" onclick="JBE_HL_ROW('+i+',&quot;black&quot;,&quot;gray&quot;, &quot;.class_brgy&quot;, &quot;id_&quot;,  &quot;red&quot;, &quot;black&quot;); sel_brgy(&quot;'+DB_AREA[i].areano+'&quot;);" style="width:100%;height:25px;font-size:12px;margin-top:2px;cursor:pointer;padding:4px;border:1px solid lightgray;color:black;background:gray;">'+DB_AREA[i].name+'</div>';
          }
          dtl+=vdtl+
        '</div>'+
      '</div>'+

      //right
      '<div style="float:left;margin-left:1%;width:59%;height:100%;margin-top:0px;text-align:center;padding:0px;border:1px solid gray;overflow:auto;background:white;">'+

        '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:white;background:'+JBE_CLOR+';">'+
          '<div style="width:100%;height:100%;">Barangay : <span id="id_brgy" data-areano="" style="font-weight:bold;"></span></div>'+
        '</div>'+

        //invty
        '<div div="div_invty" style="display:block;width:100%;height:'+h_mainbox_invty+'px;margin-top:10px;text-align:center;padding:0%;border:1px solid darkgray;background:green;">'+

          '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:black;background:#FFEE00;">'+
            '<div style="float:left;width:50%;height:100%;">Weekly Inventory</div>'+
            '<div style="float:left;width:50%;height:100%;text-align:right;background:none;">Date : <input type="month" id="id_date" onchange="chgdate_invty_brgy()"  style="float:right;width:100px;margin-left:5px;height:100%;font-weight:bold;" disabled value='+curdate+' /></div>'+
          '</div>'+

          '<div disabled id="div_hd" style="width:100%;height:30px;border:0px solid black;border-top:0px;padding:4px;background:#FFD900;">'+
            '<div style="float:left;width:23%;height:100%;padding:0px;">Vaccines</div>'+
            '<div style="float:left;width:77%;height:100%;border:0px solid black;">'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn1" onclick="edit_invty_brgy(1)" style="background:'+JBE_CLOR+';">W1</button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn2" onclick="edit_invty_brgy(2)" style="background:'+JBE_CLOR+';">W2</button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn3" onclick="edit_invty_brgy(3)" style="background:'+JBE_CLOR+';">W3</button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn4" onclick="edit_invty_brgy(4)" style="background:'+JBE_CLOR+';">W4</button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:0 0 0 1px;"><button id="btn5" onclick="edit_invty_brgy(5)" style="background:'+JBE_CLOR+';">W5</button></div>'+
              '<div class="cls_weekly_row" style="width:20%;margin-left:1%;padding:2px 0 0 0;border:1px solid black;border-right:0px;background:'+clor_lotno+';">Lot No.</div>'+
              '<div class="cls_weekly_row" style="width:12%;padding:2px 0 0 0;border:0px solid black;border:1px solid black;background:'+clor_expiry+';">Exp.</div>'+
              '<div class="cls_weekly_row" style="width:11%;margin-left:1%;padding:2px 0 0 0;border:1px solid black;background:'+clor_req+';">Req.</div>'+              
            '</div>'+
          '</div>'+
          
          '<div id="dtls_invty" style="width:100%;height:'+(h_mainbox_invty-(30+30+35+2))+'px;border:0px solid blue;overflow:auto;padding:5px;background:white;">';              
            vdtl='';
            for(var i=0;i<DB_STOCK_INVTY.length;i++){
              vdtl+=
              '<div id="div_row" style="width:100%;height:35px;border:1px solid black;color:black;background:none;">'+
                '<div style="float:left;width:23%;height:100%;text-align:left;padding:5px;border:0px solid black;overflow:auto;">'+DB_STOCK_INVTY[i].descrp+'</div>'+

                '<div style="float:left;width:77%;height:100%;border:0px solid black;">'+
                  '<div style="width:100%;height:50%;border:0px solid black;">'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w1'+'" class="cls_weekly_row" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w2'+'" class="cls_weekly_row" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w3'+'" class="cls_weekly_row" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w4'+'" class="cls_weekly_row" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w5'+'" class="cls_weekly_row" value="" />'+

                    '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_1lotno'+'"  class="cls_weekly_row" style="width:20%;margin-left:1%;overflow:auto;color:black;background:'+clor_lotno+';" value="" />'+
                    '<input type="month" id="'+DB_STOCK_INVTY[i].stockno+'_1expiry'+'" class="cls_weekly_row" style="width:12%;background:'+clor_expiry+';" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1req'+'"  class="cls_weekly_row" style="width:11%;margin-left:1%;border:1px solid black;border-top:1px;border-right:0px;background:'+clor_req+';" value="" />'+
                  '</div>'+
                  '<div style="width:100%;height:50%;border:0px solid black;">'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w1'+'" class="cls_weekly_row" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w2'+'" class="cls_weekly_row" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w3'+'" class="cls_weekly_row" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w4'+'" class="cls_weekly_row" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w5'+'" class="cls_weekly_row" value="" />'+

                    '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_2lotno'+'"   class="cls_weekly_row" style="width:20%;margin-left:1%;overflow:auto;color:black;background:'+clor_lotno+';" value="" />'+
                    '<input type="month" id="'+DB_STOCK_INVTY[i].stockno+'_2expiry'+'" class="cls_weekly_row" style="width:12%;background:'+clor_expiry+';" value="" />'+
                    '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2req'+'"   class="cls_weekly_row" style="width:11%;margin-left:1%;border:1px solid black;border-bottom:0px;border-right:0px;background:'+clor_req+';" value="" />'+
                  '</div>'+
                '</div>'+

              '</div>';
            }
            dtl+=vdtl+        
          '</div>'+

          '<div id="div_menu" class="cls_dispMenu">'+           
          '</div>'+

        '</div>'+
//=====================================================================================================================
        //accom
        '<div id="div_accom" style="display:block;width:100%;height:'+h_mainbox_accom+'px;margin-top:20px;font-size:14px;text-align:center;padding:0px;border:1px solid darkgray;background:white;">'+

          '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:left;border:0px solid black;color:black;background:#FFEE00;">'+
            '<div style="float:left;width:50%;height:100%;">Accomplishment</div>'+
            '<div style="float:left;width:50%;height:100%;text-align:right;background:none;">Date : <input type="month" id="date_accom" onchange="chgdate_accom_brgy(this.value)"  style="float:right;width:100px;margin-left:5px;height:100%;font-weight:bold;" disabled value='+curdate+' /></div>'+
          '</div>'+

          '<div style="width:100%;height:30px;border:0px solid lightgray;padding:0px;background:white;">'+

            '<div disabled id="div_hd" style="width:100%;height:100%;border:0px solid red;padding:3px;background:#FFD900;">'+
              '<div style="float:left;width:13%;height:100%;padding:0px;">Vax</div>'+
              '<div style="float:left;width:87%;height:100%;border:0px solid black;">'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn10" onclick="edit_accom_brgy(1)" style="background:'+JBE_CLOR+';"></button></div>'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn11" onclick="edit_accom_brgy(2)" style="background:'+JBE_CLOR+';"></button></div>'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn12" onclick="edit_accom_brgy(3)" style="background:'+JBE_CLOR+';"></button></div>'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn13" onclick="edit_accom_brgy(4)" style="background:'+JBE_CLOR+';"></button></div>'+
                '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn14" onclick="edit_accom_brgy(5)" style="background:'+JBE_CLOR+';"></button></div>'+     
                '<div class="cls_accom_row" style="width:22.8%;border:1px solid lightgray;padding:4px 0 0 0;margin-left:1.1%;font-weight:bold;text-align:center">TOTALS</div>'+     
              '</div>'+
            '</div>'+
            

            '<div id="div_dtls" style="width:100%;height:'+(h_mainbox_accom-(30+30+35+2))+'px;;border:0px solid red;overflow:auto;padding:5px;background:none;">';
              let vdtl2='';
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
            
            '<div id="div_menu2" class="cls_dispMenu">'+            
            '</div>'+

          '</div>'+          
          
        '</div>'+

      '</div>'+

      //
      '<div style="float:right;width:19%;height:100%;margin-left:1%;text-align:left;border:0px solid red;background:white;">'+
        '<div style="width:100%;height:30px;padding:5px;text-align:center;color:white;background:'+JBE_CLOR+';">Log</div>'+
        '<div id="id_log" style="width:100%;height:'+(H_BODY-40-35-2)+'px;font-size:12px;padding:5px;overflow:auto;background:white;">'+

        '</div>'+        
      '</div>'+

    '</div>'+

  '</div>';
  document.getElementById('div_right').innerHTML=dtl;

  if(f_clear){
    document.getElementById('div_body').setAttribute('data-row',0);
    document.getElementById('div_body').setAttribute('data-row2',0);
  }
  
}

function update_accom_buttons(date){
  // Example usage for current month
  const today = new Date(date);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11

  const wednesdays = getWednesdaysInMonth(currentYear, currentMonth);

  // Format and display the dates
  //console.log("All Wednesdays in the current month:"+wednesdays.length);
  /*
  wednesdays.forEach(wed => {
    //console.log('---->>>> dates wed:',wed.toDateString());
    document.getElementById('btn1'+)
  });
  */

  for(var i=0;i<5;i++){   
    document.getElementById('btn1'+i).textContent='';
  }
  for(var i=0;i<wednesdays.length;i++){
    let wed=JBE_DATE_FORMAT(wednesdays[i].toDateString(),'MMM DD, YYYY');
    //console.log('---->>>> dates wed:',wed);
    document.getElementById('btn1'+i).textContent=wed;
  }
}

function mnu_invty_brgy(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div style="float:left;width:75%;height:100%;padding:3px;font-size:16px;text-align:left;color:white;background:none;">'+
        'Click Week Buttons to Edit'+
      '</div>'+
    '</div>';  
  //document.getElementById('div_menu').innerHTML=jmenu;
  dispMenu('div_menu',jmenu);
}

function mnu_save_invty_brgy(){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="save_invty_brgy(&quot;'+areano+'&quot;)" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span style="padding:0 0 0 5px;color:white;">Save</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="disp_invty_brgy(&quot;'+areano+'&quot;)" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  dispMenu('div_menu',jmenu);
}

function sel_brgy(areano){
  let name=JBE_GETFLD('name',DB_AREA,'areano',areano);
  document.getElementById('id_brgy').setAttribute('data-areano',areano);
  document.getElementById('id_brgy').innerHTML=name;    
  document.getElementById('id_date').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM');
  document.getElementById('id_date').disabled=false;
  disp_invty_brgy(areano);
  //accom
  document.getElementById('date_accom').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM');
  document.getElementById('date_accom').disabled=false;
  disp_accom_brgy(areano);

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

    document.getElementById('btn'+(i+1)).style.color='white'; 
    document.getElementById('btn'+(i+1)).disabled=false;
    document.getElementById('btn'+(i+1)).style.opacity='1';
  }  
  for(var y=0;y<5;y++){
    document.getElementById('btn'+(y+1)).style.color='white'; document.getElementById('btn'+(y+1)).style.opacity='1'; document.getElementById('btn'+(y+1)).disabled=false;
  }
}

//‐-------
function disp_invty_brgy(areano){  
  let curdate=document.getElementById('id_date').value;
  curdate=JBE_DATE_FORMAT(curdate,'YYYY-MM');
  clear_invty_brgy();
  for(var i=0;i<DB_INVTY.length;i++){
    if(JBE_DATE_FORMAT(DB_INVTY[i].date,'YYYY-MM') !== curdate){ continue; }
    if(DB_INVTY[i].areano !== areano){ continue; }

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
  mnu_invty_brgy();
}


//‐-------
function edit_invty_brgy(col){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  if(!areano){
    snackBar('Select a Barangay...');
    return;
  }
  //JBE_BACK_VIEW(false);
  btn_enabled(col);
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
  document.getElementById('btn'+col).disabled=false;
  mnu_save_invty_brgy();
}

function btn_enabled(col){
  let x=true;
  let c='white';
  for(var i=0;i<5;i++){     
    //if(col==(i+1)){ x=true; c='red'; document.getElementById('btn'+(i+1)).style.color=c; document.getElementById('btn'+(i+1)).disabled=x; }
    document.getElementById('btn'+(i+1)).style.color='white'; document.getElementById('btn'+(i+1)).style.opacity='0.5'; document.getElementById('btn'+(i+1)).disabled=true;
  }
  document.getElementById('btn'+col).style.color='red'; document.getElementById('btn'+col).style.opacity='1'; document.getElementById('btn'+col).disabled=false;
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

async function save_invty_brgy(areano){
  showProgress(true);
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
      "date":curdate,
      "1w1":row1[0],"1w2":row1[1],"1w3":row1[2],"1w4":row1[3],"1w5":row1[4], "1lotno":row1[5],"1expiry":row1[6],"1req":row1[7],
      "2w1":row2[0],"2w2":row2[1],"2w3":row2[2],"2w4":row2[3],"2w5":row2[4], "2lotno":row2[5],"2expiry":row2[6],"2req":row2[7]
    }
    console.log(DB_STOCK_INVTY[i].descrp,obj);
    arr[arr_ctr]=obj; 
    arr_ctr++;
  }
  await api_save(JBE_CLOUD,JBE_API+'invty',arr,record => record.areano !== areano || record.date !== curdate);  
  let data=await api_getfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content;
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
  update_accom_buttons(curdate);
  clear_accom_brgy();
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
  mnu_accom_brgy();
}

//‐-------
function edit_accom_brgy(col){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  if(!areano){
    snackBar('Select a Barangay...');
    return;
  }
  //JBE_BACK_VIEW(false);
  btn_enabled(col);
  //assign
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let div=DB_STOCK_ACCOM[i].stockno+'_'+col+'wm';  document.getElementById(div).style.borderLeft='2px solid red'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_ACCOM[i].stockno+'_'+col+'wf';      document.getElementById(div).style.borderRight='2px solid red'; document.getElementById(div).style.pointerEvents='auto';
  }
  document.getElementById('btn'+col).disabled=false;
  mnu_save_accom_brgy();
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

    document.getElementById('btn'+(i+1)).style.color='white'; 
    document.getElementById('btn'+(i+1)).disabled=false;
    document.getElementById('btn'+(i+1)).style.opacity='1';
  }  
  for(var y=0;y<5;y++){
    document.getElementById('btn'+(y+1)).style.color='white'; document.getElementById('btn'+(y+1)).style.opacity='1'; document.getElementById('btn'+(y+1)).disabled=false;
  }
}

async function save_accom_brgy(areano){
  showProgress(true);
  let curdate=document.getElementById('date_accom').value;  
  let arr=[];arr_ctr=0;
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let totals=Number(document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'total').value);
    if(!totals){ continue; }
    let obj={
      "areano":areano,
      "stockno":DB_STOCK_ACCOM[i].stockno,
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
  await api_save(JBE_CLOUD,JBE_API+'accom',arr,record => record.areano !== areano || record.date !== curdate);  
  let data=await api_getfile(JBE_CLOUD,JBE_API+'accom'); DB_ACCOM=data.content;
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
      '<div style="float:left;width:75%;height:100%;padding:3px;font-size:16px;text-align:left;color:white;background:none;">'+
        'Click Week Buttons to Edit'+
      '</div>'+      
    '</div>';
  dispMenu('div_menu2',jmenu);
}

function mnu_save_accom_brgy(){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="save_accom_brgy(&quot;'+areano+'&quot;)" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span style="padding:0 0 0 5px;color:white;">Save</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="disp_accom_brgy(&quot;'+areano+'&quot;)" style="float:right;width:25%;height:100%;background:none;">'+
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