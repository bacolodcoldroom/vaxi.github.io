let clor_lotno='#ddebf7';
let clor_expiry='#fce4d6';
let clor_req='#c9daf8';

function fm_weekly(){
  //if(!CHK_ONLINE()){ return; };
  if(!CHK_ONLINE() && JBE_CLOUD){ return; }
  if(!CURR_USER){
    snackBar('Please Log In...');
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  var n = new Date().toLocaleTimeString('it-IT');
  document.getElementById('back_view1').style.display='block';  
  mnu_fm_weekly();
  
  let pa_height=H_BODY-35-8;  
  let dtl= 
  '<div id="dv_weekly" data-maxdays=0 data-print=0  style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:0px;border:1px solid lightgray;background:white;">'+

    '<div style="height:35px;width:100%;padding:0px;border:1px solid lightgray;background:none;">'+             
      
      '<div class="cls_daily" style="margin:0 auto;width:250px;height:100%;padding:4px;border:0px solid lightgray;">'+ 
        '<span style="float:left;width:40%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">Month of: </span>'+ 
        '<input id="date_weekly" style="width:60%;height:100%;" onchange="chg_weekly_month(this.value)" type="month" value="'+JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM')+'"  placeholder="Date" />'+ 
      '</div>'+

    '</div>'+

    '<div style="width:100%;height:'+pa_height+'px;border:1px solid lightgray;padding:5px;background:white;">'+

      '<div disabled id="div_hd" style="width:100%;height:40px;border:1px solid lightgray;padding:5px;">'+
        '<div style="float:left;width:15%;height:100%;padding:5px;">Vaccine</div>'+
        '<div style="float:left;width:85%;height:100%;border:0px solid black;">'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn1" onclick="edit_weekly(1)" style="background:'+JBE_CLOR+';">W1</button></div>'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn2" onclick="edit_weekly(2)" style="background:'+JBE_CLOR+';">W2</button></div>'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn3" onclick="edit_weekly(3)" style="background:'+JBE_CLOR+';">W3</button></div>'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn4" onclick="edit_weekly(4)" style="background:'+JBE_CLOR+';">W4</button></div>'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn5" onclick="edit_weekly(5)" style="background:'+JBE_CLOR+';">W5</button></div>'+
          '<div class="cls_weekly_row" style="width:18%;padding:6px 0 0 0;border:0px;background:'+clor_lotno+';">Lot No.</div>'+
          '<div class="cls_weekly_row" style="width:11%;padding:6px 0 0 0;border:0px;background:'+clor_expiry+';">Exp.</div>'+
          '<div class="cls_weekly_row" style="width:11%;padding:6px 0 0 0;border:0px;background:'+clor_req+';">Req.</div>'+
        '</div>'+
      '</div>'+

      '<div id="div_dtls" style="width:100%;height:'+(pa_height-40-10-25)+'px;border:1px solid lightgray;overflow:auto;padding:5px;background:none;">';
        let vdtl='';
        for(var i=0;i<DB_STOCK_INVTY.length;i++){
          vdtl+=
          '<div id="div_row" style="width:100%;height:60px;border:1px solid black;color:black;background:none;">'+
            '<div style="float:left;width:15%;height:100%;text-align:left;padding:5px;border:0px solid black;overflow:auto;">'+DB_STOCK_INVTY[i].descrp+'</div>'+

            '<div style="float:left;width:85%;height:100%;border:0px solid black;">'+
              '<div style="width:100%;height:50%;border:0px solid black;">'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w1'+'" class="cls_weekly_row" value="" />'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w2'+'" class="cls_weekly_row" value="" />'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w3'+'" class="cls_weekly_row" value="" />'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w4'+'" class="cls_weekly_row" value="" />'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_1w5'+'" class="cls_weekly_row" value="" />'+

                '<div id="'+DB_STOCK_INVTY[i].stockno+'_1lotno'+'"  class="cls_weekly_row" style="width:18%;pointer-events:auto;overflow:auto;background:'+clor_lotno+';"></div>'+
                '<div id="'+DB_STOCK_INVTY[i].stockno+'_1expiry'+'"  class="cls_weekly_row" style="width:11%;pointer-events:auto;overflow:auto;background:'+clor_expiry+';"></div>'+
                '<div id="'+DB_STOCK_INVTY[i].stockno+'_1req'+'"  class="cls_weekly_row" style="width:11%;pointer-events:auto;overflow:auto;background:'+clor_req+';"></div>'+
              '</div>'+
              '<div style="width:100%;height:50%;border:0px solid black;">'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w1'+'" class="cls_weekly_row" value="" />'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w2'+'" class="cls_weekly_row" value="" />'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w3'+'" class="cls_weekly_row" value="" />'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w4'+'" class="cls_weekly_row" value="" />'+
                '<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_2w5'+'" class="cls_weekly_row" value="" />'+

                '<div id="'+DB_STOCK_INVTY[i].stockno+'_2lotno'+'"  class="cls_weekly_row" style="width:18%;pointer-events:auto;overflow:auto;background:'+clor_lotno+';"></div>'+
                '<div id="'+DB_STOCK_INVTY[i].stockno+'_2expiry'+'"  class="cls_weekly_row" style="width:11%;pointer-events:auto;overflow:auto;background:'+clor_expiry+';"></div>'+
                '<div id="'+DB_STOCK_INVTY[i].stockno+'_2req'+'"  class="cls_weekly_row" style="width:11%;pointer-events:auto;overflow:auto;background:'+clor_req+';"></div>'+
              '</div>'+
            '</div>'+

          '</div>';
        }
        dtl+=vdtl+        
      '</div>'+

    '</div>'+
        
  '</div>';
  
  JBE_OPEN_VIEW(dtl,'Weekly Inventory','showMainPage');
  disp_fm_weekly();
}

//‐-------
function disp_fm_weekly(){  
  console.log('CURR_AREANO:',CURR_AREANO);
  JBE_BACK_VIEW(true);
  let curdate=document.getElementById('date_weekly').value;  
  clear_fm_weekly();
  for(var i=0;i<DB_INVTY.length;i++){
    if(JBE_DATE_FORMAT(DB_INVTY[i].date,'YYYY-MM') !== curdate){ continue; }
    if(DB_INVTY[i].areano !== CURR_AREANO){ continue; }

    let div='';    
    for(var k=0;k<5;k++){
      let fld1='1w'+(k+1);      
      let fld2='2w'+(k+1);
      div=DB_INVTY[i].stockno+'_'+fld1;    document.getElementById(div).value=DB_INVTY[i][fld1];
      div=DB_INVTY[i].stockno+'_'+fld2;    document.getElementById(div).value=DB_INVTY[i][fld2];
    }
    
    div=DB_INVTY[i].stockno+'_1lotno';        document.getElementById(div).innerHTML=DB_INVTY[i]['1lotno'];   
    div=DB_INVTY[i].stockno+'_1expiry';       document.getElementById(div).innerHTML=DB_INVTY[i]['1expiry'];  
    div=DB_INVTY[i].stockno+'_1req';          document.getElementById(div).innerHTML=DB_INVTY[i]['1req'];     
    div=DB_INVTY[i].stockno+'_2lotno';        document.getElementById(div).innerHTML=DB_INVTY[i]['2lotno'];   
    div=DB_INVTY[i].stockno+'_2expiry';       document.getElementById(div).innerHTML=DB_INVTY[i]['2expiry'];  
    div=DB_INVTY[i].stockno+'_2req';          document.getElementById(div).innerHTML=DB_INVTY[i]['2req'];     
  }  
  mnu_fm_weekly();
}

//‐-------
function edit_weekly(col){
  JBE_BACK_VIEW(false); 
  btn_enabled(col);
  //assign
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let div=DB_STOCK_INVTY[i].stockno+'_1w'+col;  document.getElementById(div).style.backgroundColor='yellow'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_INVTY[i].stockno+'_2w'+col;      document.getElementById(div).style.backgroundColor='yellow'; document.getElementById(div).style.pointerEvents='auto';
  }
  document.getElementById('btn'+col).disabled=false;
  mnu_save_fm_weekly();
}

function clear_fm_weekly(){
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let div='';
    for(var k=0;k<5;k++){
      div=DB_STOCK_INVTY[i].stockno+'_1w'+(k+1);    document.getElementById(div).style.backgroundColor='white'; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
      div=DB_STOCK_INVTY[i].stockno+'_2w'+(k+1);    document.getElementById(div).style.backgroundColor='white'; document.getElementById(div).style.pointerEvents='none'; document.getElementById(div).value='';
    }    
    div=DB_STOCK_INVTY[i].stockno+'_1lotno';        document.getElementById(div).style.backgroundColor=clor_lotno;  document.getElementById(div).innerHTML='';
    div=DB_STOCK_INVTY[i].stockno+'_1expiry';       document.getElementById(div).style.backgroundColor=clor_expiry; document.getElementById(div).innerHTML='';
    div=DB_STOCK_INVTY[i].stockno+'_1req';          document.getElementById(div).style.backgroundColor=clor_req;    document.getElementById(div).innerHTML='';

    div=DB_STOCK_INVTY[i].stockno+'_2lotno';        document.getElementById(div).style.backgroundColor=clor_lotno;  document.getElementById(div).innerHTML='';
    div=DB_STOCK_INVTY[i].stockno+'_2expiry';       document.getElementById(div).style.backgroundColor=clor_expiry; document.getElementById(div).innerHTML='';
    div=DB_STOCK_INVTY[i].stockno+'_2req';          document.getElementById(div).style.backgroundColor=clor_req;    document.getElementById(div).innerHTML='';

    document.getElementById('btn'+(i+1)).style.color='white'; 
    document.getElementById('btn'+(i+1)).disabled=false;
    document.getElementById('btn'+(i+1)).style.opacity='1';
  }  
  for(var y=0;y<5;y++){
    document.getElementById('btn'+(y+1)).style.color='white'; document.getElementById('btn'+(y+1)).style.opacity='1'; document.getElementById('btn'+(y+1)).disabled=false;
  }
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

async function save_fm_weekly(){
  console.clear();
  let arr=[];arr_ctr=0;
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let div='';
    let row1=[]; let row2=[];
    for(var k=0;k<5;k++){      
      row1[k]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_1w'+(k+1)).value;
      row2[k]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_2w'+(k+1)).value;
    }

    row1[5]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_1lotno').innerHTML; row1[6]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_1expiry').innerHTML;  row1[7]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_1req').innerHTML; 
    row2[5]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_2lotno').innerHTML; row2[6]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_2expiry').innerHTML;  row2[7]=document.getElementById(DB_STOCK_INVTY[i].stockno+'_2req').innerHTML; 
    
    let obj={
      "areano":CURR_AREANO,
      "stockno":DB_STOCK_INVTY[i].stockno,
      "date":document.getElementById('date_weekly').value,
      "1w1":row1[0],"1w2":row1[1],"1w3":row1[2],"1w4":row1[3],"1w5":row1[4], "1lotno":row1[5],"1expiry":row1[6],"1req":row1[7],
      "2w1":row2[0],"2w2":row2[1],"2w3":row2[2],"2w4":row2[3],"2w5":row2[4], "2lotno":row2[5],"2expiry":row2[6],"2req":row2[7]
    }
    console.log(DB_STOCK_INVTY[i].descrp,obj);
    arr[arr_ctr]=obj; 
    arr_ctr++;
  }
  console.log('arr',arr);
  showProgress(true);
  let curdate=document.getElementById('date_weekly').value;
  //await jeff_update_File(JBE_CLOUD,JBE_API+'invty.json',arr,record => record.areano !== CURR_AREANO || record.date !== curdate);  
  //let data=await jeff_getFile(JBE_CLOUD,JBE_API+'invty.json'); DB_INVTY=data.content;
  await api_save(JBE_CLOUD,JBE_API+'invty',arr,record => record.areano !== CURR_AREANO || record.date !== curdate);  
  let data=await api_getfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content;
  showProgress(false);
  disp_fm_weekly();
}

function chg_weekly_month(v){
  disp_fm_weekly();
}

function close_fm_weekly(){
  //JBE_CLOSE_VIEW();
  showMainPage();
  //mnu_main_repo();
}

function mnu_fm_weekly(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div style="float:left;width:75%;height:100%;padding:12px;font-size:12px;text-align:left;color:white;background:none;">'+
        'Click Week Buttons to Edit'+
      '</div>'+
      '<div onclick="showMainPage()" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span>Close</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}

function mnu_save_fm_weekly(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="save_fm_weekly()" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span>Save</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="disp_fm_weekly()" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span>Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}

function refresh_weekly(){  
  snackBar(`Refreshed...`);
}
 
function print_back(){
  //alert('rp_weekly');
  /*
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  var repTilt='';
  */
  document.getElementById('back_view2').style.display='none';
  document.getElementById('cap_viewMid2').innerHTML='';
  
  let pa_height=H_VIEW-30;
  if(JBE_MOBILE){ pa_height=H_VIEW-30; }

  let dtl=
  '<div id="dv_weekly2" data-maxdays=0 data-print=1 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:10px;border:0px solid lightgray;background:white;">'+

    '<div id="printableBorder2" style="height:'+pa_height+'px;">'+    
      '<div id="printableArea2" style="width:705px;">'+
        '<div id="pa_dtl2">'+
        '</div>'+
      '</div>'+
    '</div>'+
      
  '</div>';

  JBE_OPEN_VIEW(dtl,'Print BACK PAGE','');
  mnu_repo2();
  let unod=
  '<div style="width:100%;height:1100px;margin-top:0px;font-size:14px;padding:0px;border:0px solid green;">'+  
    '<div id="dtr_b1" style="float:left;width:auto;height:800px;border:0px solid black;"></div>'+
    '<div id="dtr_b2" style="float:right;width:auto;height:800px;border:0px solid black;"></div>'+
  '</div>';
  document.getElementById('pa_dtl2').innerHTML=unod;
  ret_back_page();  
}




function clk_text(row){
  document.getElementById('box_txt').style.display='block';
  document.getElementById('dtl_jbox').style.height='163px';
  document.getElementById("myJBox_main").style.height='217px';
}
