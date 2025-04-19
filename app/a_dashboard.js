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

function fm_dashboard(f_clear){   
  get_app_default();
  let h_dashboard=22;
  let h_box1=280;
  h_box1=350;
  h_box1=window.innerHeight/2;
  //if(JBE_MOBILE){ h_box1=350; }
  let h_spaces=30;
  let h_box2=H_BODY-(h_dashboard+h_box1+h_spaces+5);
  //refresh_all_db();
  //let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD'); 
  //alert(curdate);

  let ddate=document.getElementById('hd_date').innerHTML;
  let dtl=
  '<div style="display:block;width:100%;height:100%;font-size:18px;text-align:center;padding:10px;border:0px solid orange;background:	lightgray;">'+  

    '<div style="width:100%;height:'+h_dashboard+'px;font-size:18px;padding:0px;font-weight:bold;text-align:left;border:0px solid gainsboro;background:none;">'+  
      '<div id="menu_open"" data-mode=0 onclick="openNav()" style="float:left;width:30px;height:100%;"><img src="gfx/ham.png" style="height:100%;" /></div>'+
      '<div  style="float:left;width:auto;height:100%;">DASHBOARD</div>'+
    '</div>'+

    '<div style="display:block;width:100%;height:'+h_box1+'px;margin-top:5px;text-align:center;padding:1%;border:0px solid red;background:white;">'+

      '<div class="dash_box" style="margin-left:5px;background:mediumaquamarine;">'+   //mediumaquamarine
        '<p id="id_invty">0</p>'+   
        '<h1 onclick="disp_invty(true)">'+
          '<span id="lbl_invty">Inventory</span>'+
          '<div><input type="image" src="gfx/jcategory.png" style="z-index:200;height:100%;" onclick="chg_invty(this.value)" /></div>'+
        '</h1>'+    
        '<h2></h2>'+   
        '<h3 id="dtl_invty" data-row=0></h3>'+   
      '</div>'+

      /*
      '<div class="dash_box" style="border-radius:15px;background:#ff1493;">'+ 
        '<h5>'+
          '<p id="id_expire">0</p>'+   
          '<p id="id_expire2">'+
            '<span id="dtl_total_a" style="float:left;height:100%;"></span>'+
            '<span id="dtl_total_q" style="float:right;height:100%;"></span>'+
          '</p>'+   
        '</h5>'+
        '<h1>'+
          '<span id="lbl_expire">Expiring Vax in '+          
            '<input id="inp_expire" type="number" onchange="chg_expire(this.value)" value=6 style="width:40px;margin-right:0px;text-align:center;color:white;background:none;"/> months'+
          '</span>'+      
        '</h1>'+  
        '<h2></h2>'+ 
        '<h3 id="dtl_expire"></h3>'+   
      '</div>'+
      */

      '<div class="dash_box" style="position:relative;background:#ff1493;">'+
        '<p id="id_expire" style="position:relative;"></p>'+

        '<div id="id_expire2" style="">'+
          '<span id="dtl_total_a" style="float:left;height:100%;"></span>'+
          '<span id="dtl_total_q" style="float:right;height:100%;"></span>'+
        '</div>'+

        

        '<h1>'+
          '<span id="lbl_expire">Expiring Vax in '+          
            '<input id="inp_expire" type="number" onchange="chg_expire(this.value)" value=6 style="width:40px;margin-right:0px;text-align:center;color:white;background:none;"/> months'+
          '</span>'+ 
          '<div></div>'+
        '</h1>'+   
        '<h2></h2>'+   
        '<h3 id="dtl_expire"></h3>'+   
      '</div>'+

      '<div id="id_dash_box3" class="dash_box" style="background:orange;">'+   
        '<p id="id_dispense">0</p>'+   
        '<h1>'+
          '<span id="lbl_dispense">Dispensed Today</span>'+          
          '<div><input type="date" style="width:22px;height:100%;" onchange="chg_dispense(this.value)" /></div>'+
        '</h1>'+   
        '<h2></h2>'+   
        '<h3 id="dtl_dispense"></h3>'+   
      '</div>'+

      '<div class="dash_box" style="background:purple;">'+   
        '<p id="id_chart" style="padding:5px;"><canvas id="myPieChart" width="200" height="200"></canvas></p>'+   
        '<h1><span>Inventory</span></h1>'+
        '<h2></h2>'+
        '<h3 id="dtl_chart"></h3>'+   
      '</div>'+

    '</div>'+

    '<div id="div_storage" style="display:block;width:100%;height:'+h_box2+'px;margin-top:10px;font-size:14px;text-align:center;padding:5px;border:0px solid blue;background:white;">'+
      '<div style="width:100%;height:20px;font-weight:bold;padding:2px;text-align:left;border:0px solid white;background:'+JBE_CLOR+';">'+
        'STORAGE LOCATION SUMMARY'+
        '<span id="tot_summ" style="float:right;text-align:right;width:100px;font-size:14px;background:none;"></span>'+
        '<span id="tot_var" style="float:right;text-align:right;margin-right:10px;width:100px;font-weight:normal;font-size:14px;color:pink;background:none;"></span>'+
      '</div>'+
      '<div style="width:100%;height:20px;background:'+JBE_CLOR2+';">'+      
        '<div id="hd_location" style="width:100%;height:100%;text-align:center;font-size:11px;padding:3px;border:0px solid lightgray;color:white;background:'+JBE_CLOR2+';">'+      
          '<div style="float:left;width:25%;height:100%;overflow:auto;padding:0px;background:none;margin:0;text-align:left;">Description</div>'+
          '<div style="float:left;width:18%;height:100%;padding:0px;margin:0;background:none;">'+iif(!JBE_MOBILE,'Lot Number','Lot#')+'</div>'+
          '<div style="float:left;width:17%;height:100%;padding:0px;margin:0;background:none;">Expiry</div>'+
          '<div style="float:left;width:15%;height:100%;padding:0px;margin:0;background:none;">'+iif(!JBE_MOBILE,'Reference Number','Ref#')+'</div>'+
          '<div style="float:left;width:10%;height:100%;padding:0px;margin:0;background:none;">'+iif(!JBE_MOBILE,'Location','Loc')+'</div>'+
          '<div style="float:right;width:15%;height:100%;text-align:right;background:none;">Balance</div>'+      
        '</div>'+
      '</div>'+
      '<div id="dtl_location" data-row=0 style="width:100%;height:'+(h_box2-20-20-12)+'px;text-align:center;overflow:auto;padding:5px;border:1px solid darkgray;background:none;">'+
      '</div>'+
    '</div>'+

  '</div>';
  document.getElementById('div_right').innerHTML=dtl;
  if(f_clear){
    document.getElementById('div_body').setAttribute('data-row',0);
    document.getElementById('div_body').setAttribute('data-row2',0);
  }
  //show_notes();
  // disp_dashboard();
}

function fm_invty(){  
  let curdate=JBE_DATE_FORMAT(new Date(),'YYYY-MM');
  CURR_PAGE='invty';
  let h1=60;
  let b1=H_BODY-h1-10-10;
  let vdtl='';
  let dtl=
  '<div style="width:100%;height:100%;padding:10px;">'+

    '<div style="width:100%;height:30px;font-size:20px;padding:5px;font-weight:bold;border:1px solid black;color:black;background:yellow;">MONTHLY VACCINE INVENTORY FORM</div>'+

    '<div style="width:100%;height:30px;font-size:17px;padding:5px;font-weight:normal;text-align:left;border:1px solid black;color:black;background:yellow;">'+
      '<div style="float:left;width:50%;height:100%;">Barangay : <span id="id_brgy" data-areano="" style="font-weight:bold;"></span></div>'+
      '<div style="float:left;width:50%;height:100%;text-align:right;background:none;">Date : <input type="month" id="id_date" onchange="chg_fm_invty()"  style="float:right;width:100px;margin-left:5px;height:100%;font-weight:bold;" disabled value='+curdate+' /></div>'+
    '</div>'+

    '<div style="width:100%;height:'+b1+'px;border:1px solid black;">'+

      '<div style="float:left;width:20%;height:100%;border:0px solid black;border-right:1px solid black;">'+
        '<div id="da_invty" data-row=0 style="width:100%;height:100%;padding:5px;overflow:auto;">';
          vdtl='';          
          for(var i=0;i<DB_AREA.length;i++){
            vdtl+='<div id="id_'+i+'" class="class_brgy" onclick="JBE_HL_ROW('+i+',&quot;black&quot;,&quot;gray&quot;, &quot;.class_brgy&quot;, &quot;id_&quot;,  &quot;red&quot;, &quot;black&quot;); oc_invty(&quot;'+DB_AREA[i].areano+'&quot;)" style="width:100%;height:25px;font-size:12px;margin-top:2px;cursor:pointer;padding:4px;border:1px solid lightgray;color:black;background:gray;">'+DB_AREA[i].name+'</div>';
          }
          dtl+=vdtl+
        '</div>'+
      '</div>'+
      //////////////////////////////////////////right side
      '<div style="float:left;width:80%;height:100%;background:white;overflow:auto;">'+

        '<div id="da_dtls" style="width:100%;height:80%;text-align:left;background:none;">'+
          
          '<div disabled id="div_hd" style="width:100%;height:40px;border:0px solid yellow;padding:5px;background:darkgray;">'+
            '<div style="float:left;width:23%;height:100%;padding:5px;">Vaccines</div>'+
            '<div style="float:left;width:77%;height:100%;border:0px solid black;">'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn1" onclick="edit_invty_brgy(1)" style="background:'+JBE_CLOR+';">W1</button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn2" onclick="edit_invty_brgy(2)" style="background:'+JBE_CLOR+';">W2</button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn3" onclick="edit_invty_brgy(3)" style="background:'+JBE_CLOR+';">W3</button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn4" onclick="edit_invty_brgy(4)" style="background:'+JBE_CLOR+';">W4</button></div>'+
              '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn5" onclick="edit_invty_brgy(5)" style="background:'+JBE_CLOR+';">W5</button></div>'+
              '<div class="cls_weekly_row" style="width:20%;margin-left:1%;padding:8px 0 0 0;border:1px solid black;border-right:0px;background:'+clor_lotno+';">Lot No.</div>'+
              '<div class="cls_weekly_row" style="width:12%;padding:8px 0 0 0;border:0px solid black;border:1px solid black;background:'+clor_expiry+';">Exp.</div>'+
              '<div class="cls_weekly_row" style="width:11%;margin-left:1%;padding:8px 0 0 0;border:1px solid black;background:'+clor_req+';">Req.</div>'+              
            '</div>'+
          '</div>'+
          '<div id="div_dtls" style="width:100%;height:'+(H_BODY-60-40-40-22)+'px;border:0px solid blue;overflow:auto;padding:5px;background:white;">';              
            vdtl='';
            for(var i=0;i<DB_STOCK.length;i++){
              vdtl+=
              '<div id="div_row" style="width:100%;height:50px;border:1px solid black;color:black;background:none;">'+
                '<div style="float:left;width:23%;height:100%;text-align:left;padding:5px;border:0px solid black;overflow:auto;">'+DB_STOCK[i].descrp+'</div>'+

                '<div style="float:left;width:77%;height:100%;border:0px solid black;">'+
                  '<div style="width:100%;height:50%;border:0px solid black;">'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_1w1'+'" class="cls_weekly_row" value="" />'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_1w2'+'" class="cls_weekly_row" value="" />'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_1w3'+'" class="cls_weekly_row" value="" />'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_1w4'+'" class="cls_weekly_row" value="" />'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_1w5'+'" class="cls_weekly_row" value="" />'+

                    '<input type="text" id="'+DB_STOCK[i].stockno+'_1lotno'+'"  class="cls_weekly_row" style="width:20%;margin-left:1%;overflow:auto;color:black;background:'+clor_lotno+';" value="" />'+
                    '<input type="month" id="'+DB_STOCK[i].stockno+'_1expiry'+'" class="cls_weekly_row" style="width:12%;background:'+clor_expiry+';" value="" />'+
                    '<input type="number" id="'+DB_STOCK[i].stockno+'_1req'+'"  class="cls_weekly_row" style="width:11%;margin-left:1%;border:1px solid black;border-top:1px;border-right:0px;background:'+clor_req+';" value="" />'+
                  '</div>'+
                  '<div style="width:100%;height:50%;border:0px solid black;">'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_2w1'+'" class="cls_weekly_row" value="" />'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_2w2'+'" class="cls_weekly_row" value="" />'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_2w3'+'" class="cls_weekly_row" value="" />'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_2w4'+'" class="cls_weekly_row" value="" />'+
                    '<input type="text" id="'+DB_STOCK[i].stockno+'_2w5'+'" class="cls_weekly_row" value="" />'+

                    '<input type="text" id="'+DB_STOCK[i].stockno+'_2lotno'+'"   class="cls_weekly_row" style="width:20%;margin-left:1%;overflow:auto;color:black;background:'+clor_lotno+';" value="" />'+
                    '<input type="month" id="'+DB_STOCK[i].stockno+'_2expiry'+'" class="cls_weekly_row" style="width:12%;background:'+clor_expiry+';" value="" />'+
                    '<input type="number" id="'+DB_STOCK[i].stockno+'_2req'+'"   class="cls_weekly_row" style="width:11%;margin-left:1%;border:1px solid black;border-bottom:0px;border-right:0px;background:'+clor_req+';" value="" />'+
                  '</div>'+
                '</div>'+

              '</div>';
            }
            dtl+=vdtl+        
          '</div>'+

          '<div id="div_menu" style="width:100%;height:40px;border:0px solid blue;overflow:auto;padding:5px;background:'+JBE_CLOR2+';">'+            
          '</div>'+
          
        '</div>'+

      '</div>'+

    '</div>'+

  '</div>';
  document.getElementById('div_right').innerHTML=dtl;  
  mnu_fm_invty();
}

function mnu_fm_invty(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div style="float:left;width:75%;height:100%;padding:3px;font-size:16px;text-align:left;color:white;background:none;">'+
        'Click Week Buttons to Edit'+
      '</div>'+
      '<div onclick="disp_invty_brgy()" style="float:right;text-align:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Close</span>'+
        '</div>'+
      '</div>'+
    '</div>';  
  document.getElementById('div_menu').innerHTML=jmenu;
}

function mnu_save_invty(){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="save_invty_brgy(&quot;'+areano+'&quot;)" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Save</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="disp_invty_brgy(&quot;'+areano+'&quot;)" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  document.getElementById('div_menu').innerHTML=jmenu;
}

function oc_invty(areano){
  let name=JBE_GETFLD('name',DB_AREA,'areano',areano);
  document.getElementById('id_brgy').setAttribute('data-areano',areano);
  document.getElementById('id_brgy').innerHTML=name;    
  document.getElementById('id_date').value=JBE_DATE_FORMAT(new Date(),'YYYY-MM');
  document.getElementById('id_date').disabled=false;
  disp_invty_brgy(areano);
}

function chg_fm_invty(){
  let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  if(!areano){ snackBar('No Barangay selected...'); }
  disp_invty_brgy(areano);
}

function clear_invty_brgy(){
  for(var i=0;i<DB_STOCK.length;i++){
    let div='';
    for(var k=0;k<5;k++){
      div=DB_STOCK[i].stockno+'_1w'+(k+1);    document.getElementById(div).style.backgroundColor='white'; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
      div=DB_STOCK[i].stockno+'_2w'+(k+1);    document.getElementById(div).style.backgroundColor='white'; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    }
    div=DB_STOCK[i].stockno+'_1lotno';        document.getElementById(div).style.backgroundColor=clor_lotno; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK[i].stockno+'_1expiry';       document.getElementById(div).style.backgroundColor=clor_expiry; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK[i].stockno+'_1req';          document.getElementById(div).style.backgroundColor=clor_req; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK[i].stockno+'_2lotno';        document.getElementById(div).style.backgroundColor=clor_lotno; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK[i].stockno+'_2expiry';       document.getElementById(div).style.backgroundColor=clor_expiry; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    div=DB_STOCK[i].stockno+'_2req';          document.getElementById(div).style.backgroundColor=clor_req; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';

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

    let div='';    
    for(var k=0;k<5;k++){
      let fld1='1w'+(k+1);      
      let fld2='2w'+(k+1);
      div=DB_INVTY[i].stockno+'_'+fld1;    document.getElementById(div).value=DB_INVTY[i][fld1];
      div=DB_INVTY[i].stockno+'_'+fld2;    document.getElementById(div).value=DB_INVTY[i][fld2];
    }
    
    div=DB_INVTY[i].stockno+'_1lotno';        document.getElementById(div).value=DB_INVTY[i]['1lotno'];    
    div=DB_INVTY[i].stockno+'_1expiry';       document.getElementById(div).value=DB_INVTY[i]['1expiry'];
    div=DB_INVTY[i].stockno+'_1req';          document.getElementById(div).value=DB_INVTY[i]['1req'];
    div=DB_INVTY[i].stockno+'_2lotno';        document.getElementById(div).value=DB_INVTY[i]['2lotno'];    
    div=DB_INVTY[i].stockno+'_2expiry';       document.getElementById(div).value=DB_INVTY[i]['2expiry'];
    div=DB_INVTY[i].stockno+'_2req';          document.getElementById(div).value=DB_INVTY[i]['2req'];
  }  
  mnu_fm_invty();
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
  for(var i=0;i<DB_STOCK.length;i++){
    let div=DB_STOCK[i].stockno+'_1w'+col;  document.getElementById(div).style.backgroundColor='yellow'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK[i].stockno+'_2w'+col;      document.getElementById(div).style.backgroundColor='yellow'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK[i].stockno+'_1lotno';      document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK[i].stockno+'_1expiry';     document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK[i].stockno+'_1req';        document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK[i].stockno+'_2lotno';      document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK[i].stockno+'_2expiry';     document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK[i].stockno+'_2req';        document.getElementById(div).style.backgroundColor='orange'; document.getElementById(div).style.pointerEvents='auto';
  }
  document.getElementById('btn'+col).disabled=false;
  mnu_save_invty();
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

function disp_dashboard(){    
  alert('yes');
  return;
  disp_dispense(document.getElementById('hd_date').innerHTML);
  disp_invty(false);
  let i=parseInt(document.getElementById('div_body').getAttribute('data-row'));
  let i2=parseInt(document.getElementById('div_body').getAttribute('data-row2'));
  let stockno=''; let lotno='';
  
  if(i>0){
    stockno=document.getElementById('div_body').getAttribute('data-code');  
    lotno=document.getElementById('div_body').getAttribute('data-lotno');  
    JBE_HL_ROW(i,'black','white','dtl_invty','dtl2_');
    document.getElementById('dtl2_'+i).scrollIntoView();    
  }
  
  disp_expire(inp_expire.value);
  disp_storage(stockno);
  if(i2>0){
    //stockno=document.getElementById('div_body').getAttribute('data-code');  
    //lotno=document.getElementById('div_body').getAttribute('data-lotno');  
    JBE_HL_ROW(i2,'black','white','dtl_location','dtl_st_');    
    if(document.getElementById('dtl_st_'+i2)){
      document.getElementById('dtl_st_'+i2).scrollIntoView();
    }else{
      snackBar('JBE ERROR: Undefined dtl_st_'+i2+'. Cannot .scrollIntoView()');
    }
  }
  //document.getElementById('dash_div').scrollTop = 0;
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
  console.clear();
  let curdate=document.getElementById('id_date').value;
  let arr=[];arr_ctr=0;
  for(var i=0;i<DB_STOCK.length;i++){
    let row1=[]; let row2=[];
    for(var k=0;k<5;k++){      
      row1[k]=document.getElementById(DB_STOCK[i].stockno+'_1w'+(k+1)).value;
      row2[k]=document.getElementById(DB_STOCK[i].stockno+'_2w'+(k+1)).value;
    }

    row1[5]=document.getElementById(DB_STOCK[i].stockno+'_1lotno').value; row1[6]=document.getElementById(DB_STOCK[i].stockno+'_1expiry').value;    
    row1[7]=document.getElementById(DB_STOCK[i].stockno+'_1req').value;    

    row2[5]=document.getElementById(DB_STOCK[i].stockno+'_2lotno').value; row2[6]=document.getElementById(DB_STOCK[i].stockno+'_2expiry').value;
    row2[7]=document.getElementById(DB_STOCK[i].stockno+'_2req').value;
    
    let obj={
      "areano":areano,
      "stockno":DB_STOCK[i].stockno,
      "date":curdate,
      "1w1":row1[0],"1w2":row1[1],"1w3":row1[2],"1w4":row1[3],"1w5":row1[4], "1lotno":row1[5],"1expiry":row1[6],"1req":row1[7],
      "2w1":row2[0],"2w2":row2[1],"2w3":row2[2],"2w4":row2[3],"2w5":row2[4], "2lotno":row2[5],"2expiry":row2[6],"2req":row2[7],
    }
    console.log(DB_STOCK[i].descrp,obj);
    arr[arr_ctr]=obj; 
    arr_ctr++;
  }
  console.log('arr',arr);
  showProgress(true);
  await jeff_update_File('vaxi/invty.json',arr,record => record.areano !== areano || record.date !== curdate);  
  let data=await getFile('vaxi/invty.json'); DB_INVTY=data.content;
  showProgress(false);
  disp_invty_brgy(areano);
}