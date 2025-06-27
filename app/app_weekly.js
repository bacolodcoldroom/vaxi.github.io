let clor_lotno='#ddebf7';
let clor_expiry='#fce4d6';
let clor_req='#c9daf8';

async function fm_weekly(){
  //not_yet();
  //return;
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
  showProgress(true);
  let data=await api_readfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content; 
  showProgress(false);
  

  DB_STOCK_INVTY.sort(JBE_SORT_ARRAY(['rank']));
  DB_STOCK_INVTY2.sort(JBE_SORT_ARRAY(['stockno','expiry','lotno']));
  
  let pa_height=H_BODY-35-8;  
  let dtl= 
  '<div id="dv_weekly" data-maxdays=0 data-print=0 data-mode="disp" style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:0px;border:1px solid lightgray;background:white;">'+

    '<div style="height:35px;width:100%;padding:0px;border:1px solid lightgray;background:none;">'+             
      
      '<div id="div_monthof" class="cls_daily" style="margin:0 auto;width:250px;height:100%;padding:4px;border:0px solid lightgray;">'+ 
        '<span style="float:left;width:40%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">Month of: </span>'+ 
        '<input id="date_weekly" style="width:60%;height:100%;" onchange="chg_weekly_month(this.value)" type="month" value="'+JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM')+'"  placeholder="Date" />'+ 
      '</div>'+

    '</div>'+

    '<div style="width:100%;height:'+pa_height+'px;border:1px solid lightgray;padding:5px;background:white;">'+

      '<div disabled id="div_hd" style="width:100%;height:60px;border:1px solid lightgray;padding:5px;">'+
        '<div style="float:left;width:15%;height:100%;padding:5px;">Vaccine</div>'+
        '<div style="float:left;width:85%;height:100%;border:0px solid black;">'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn0" onclick="edit_fm_weekly(1)" style="background:'+JBE_CLOR+';"></button></div>'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn1" onclick="edit_fm_weekly(2)" style="background:'+JBE_CLOR+';"></button></div>'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn2" onclick="edit_fm_weekly(3)" style="background:'+JBE_CLOR+';"></button></div>'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn3" onclick="edit_fm_weekly(4)" style="background:'+JBE_CLOR+';"></button></div>'+
          '<div class="cls_weekly_row" style="border:0px solid lightgray;padding:1px;"><button id="btn4" onclick="edit_fm_weekly(5)" style="background:'+JBE_CLOR+';"></button></div>'+
          '<div class="cls_weekly_row" style="width:18%;padding:6px 0 0 0;border:0px;background:'+clor_lotno+';">Lot No.</div>'+
          '<div class="cls_weekly_row" style="width:11%;padding:6px 0 0 0;border:0px;background:'+clor_expiry+';">Exp.</div>'+
          '<div class="cls_weekly_row" style="width:11%;padding:6px 0 0 0;border:0px;background:'+clor_req+';">Req.</div>'+
        '</div>'+
      '</div>'+

      '<div id="div_hd_edit" style="display:none;width:100%;height:60px;border:1px solid lightgray;padding:5px;">'+
        '<div id="hd_edit_week" style="width:100%;height:50%;text-align:center;font-size:14px;padding:5px;border:0px solid lightgray;color:white;background:'+JBE_CLOR+';">'+ 
        '</div>'+
        '<div style="width:100%;height:50%;border:1px solid gray;font-size:12px;font-weight:bold;padding:5px;color:black;background:none;">'+
          '<div style="float:left;width:35%;height:100%;padding:0px;">Vaccine</div>'+
          '<div style="float:left;width:65%;height:100%;text-align:center;border:0px solid black;">'+
            '<div style="float:left;width:20%;">Qty</div>'+
            '<div style="float:left;width:40%;">Lot No.</div>'+
            '<div style="float:left;width:20%;">Exp.</div>'+
            '<div style="float:left;width:20%;">Req.</div>'+
          '</div>'+    
        '</div>'+
      '</div>'+

      '<div id="div_dtls" style="width:100%;height:'+(pa_height-60-10-30)+'px;margin-top:5px;border:1px solid lightgray;overflow:auto;padding:5px;background:none;">'+
        //html_dtl_weekly('disp')+
        /*      
        let w_leftWidth=15; let w_marginLeft=0;
        let wd_qty=12; let wd_lotno=18; let wd_expiry=11; let wd_req=11;
        let vdtl='';
        //let v_stockno='';
        DB_STOCK_INVTY.sort(JBE_SORT_ARRAY(['rank']));
        DB_STOCK_INVTY2.sort(JBE_SORT_ARRAY(['stockno','expiry','lotno']));
        for(var i=0;i<DB_STOCK_INVTY.length;i++){
          let v_stockno=DB_STOCK_INVTY[i].stockno;    
          let arr=[];
          let ctr=0;
          for(var j=0;j<DB_STOCK_INVTY2.length;j++){
            if(DB_STOCK_INVTY2[j].stockno != v_stockno){ continue; }
            let ob={
              "lotno":DB_STOCK_INVTY2[j].lotno,
              "expiry":JBE_DATE_FORMAT(DB_STOCK_INVTY2[j].expiry,'YYYY-MM'),
              "req":DB_STOCK_INVTY2[j].req
            };
            arr[ctr]=ob; ctr++;
          }

          let len=arr.length;
          if(len==0){ arr=[{ "lotno":"", "expiry":"", "req":"" },{ "lotno":"", "expiry":"", "req":"" }]; }
          if(len==1){ arr[1]={ "lotno":"", "expiry":"", "req":"" }; }
          //console.log(arr);
          
          let row_height=42;
          if(len>2){
            let n=len-2;
            row_height=(20*len)+len-n;      
          }

          vdtl+=
          '<div id="div_row'+v_stockno+'" data-stockno="'+v_stockno+'" class="cls_stock_rows" style="width:100%;height:'+row_height+'px;border:1px solid black;color:black;background:none;">'+
            '<div id="div_row_vax'+v_stockno+'" style="float:left;width:'+w_leftWidth+'%;height:100%;text-align:left;padding:5px;border:px solid black;overflow:auto;background:none;">'+DB_STOCK_INVTY[i].descrp+'</div>'+
            '<div id="div_row_data'+v_stockno+'" style="float:left;width:'+(100-w_leftWidth)+'%;height:100%;text-align:left;padding:0px;border:0px solid blue;border-left:0px;background:none;">';

              for(var j=0;j<arr.length;j++){
                let v_lotno=arr[j].lotno;
                let v_expiry=arr[j].expiry;
                let v_req=arr[j].req;
                let div=v_stockno+'_'+(j+1);
                vdtl+=
                '<div style="width:100%;height:20px;border:0px solid black;border-bottom:0px;background:none;">'+
                  '<input type="number" id="'+div+'w1'+'" name="'+div+'w1'+'" class="cls_weekly_row" value="" />'+
                  '<input type="number" id="'+div+'w2'+'" name="'+div+'w2'+'" class="cls_weekly_row" value="" />'+
                  '<input type="number" id="'+div+'w3'+'" name="'+div+'w3'+'" class="cls_weekly_row" value="" />'+
                  '<input type="number" id="'+div+'w4'+'" name="'+div+'w4'+'" class="cls_weekly_row" value="" />'+
                  '<input type="number" id="'+div+'w5'+'" name="'+div+'w5'+'" class="cls_weekly_row" style="border-right:1px solid black;" value="" />'+

                  //'<input type="text"   id="'+div+'lotno'+'"  name="'+div+'lotno'+'"  class="cls_weekly_row" style="width:'+wd_lotno+'%;margin-left:'+w_marginLeft+'%;overflow:auto;color:black;background:'+clor_lotno+';" value="'+v_lotno+'" />'+
                  //'<input type="text"  id="'+div+'expiry'+'" name="'+div+'expiry'+'" class="cls_weekly_row" style="width:'+wd_expiry+'%;background:'+clor_expiry+';" value="'+v_expiry+'" />'+
                  //'<input type="number" id="'+div+'req'+'"    name="'+div+'req'+'" class="cls_weekly_row" style="width:'+wd_req+'%;margin-left:'+w_marginLeft+'%;border:1px solid black;border-top:0px;border-right:0px;background:'+clor_req+';" value="'+v_req+'" />'+
                  '<div id="'+div+'lotno'+'" class="cls_weekly_row" style="width:'+wd_lotno+'%;margin-left:'+w_marginLeft+'%;pointer-events:auto;overflow:auto;color:black;background:'+clor_lotno+';">'+v_lotno+'</div>'+
                  '<div id="'+div+'expiry'+'" class="cls_weekly_row" style="width:'+wd_expiry+'%;padding:2px 0 0 0;background:'+clor_expiry+';">'+v_expiry+'</div>'+
                  '<div id="'+div+'req'+'" class="cls_weekly_row" style="width:'+wd_req+'%;margin-left:'+w_marginLeft+'%;padding:2px 0 0 0;border:1px solid black;border-top:0px;border-right:0px;background:'+clor_req+';">'+v_req+'</div>'+
                  
                '</div>';
              }

              vdtl+=
            '</div>'+
          '</div>';
        }
        dtl+=vdtl+
        */

      '</div>'+

    '</div>'+
        
  '</div>';
  
  JBE_OPEN_VIEW(dtl,'Weekly Inventory','showMainPage');
  document.getElementById('div_dtls').innerHTML=html_dtl_weekly('disp');
  /*
  let dv_hd=document.getElementById('div_hd');
  let dv_dt=document.getElementById('div_dtls');
  dv_hd.style.width=dv_dt.clientWidth+'px';
  */
  disp_fm_weekly();  
}

function html_dtl_weekly(mode,col=0){
  document.getElementById('dv_weekly').setAttribute('data-mode',mode);
  let w_leftWidth=15; let w_marginLeft=0; let h_dtl=20;
  let wd_qty=12; let wd_lotno=18; let wd_expiry=11; let wd_req=11;
  let pointEvents='none'; let font_qty=12;
  if(mode=='edit'){
    w_leftWidth=30;
    h_dtl=30;
    pointEvents='auto';
    w_marginLeft=0;
    wd_lotno=10;  wd_expiry=10;  wd_req=9;
    wd_qty=20; wd_lotno=40; wd_expiry=20; wd_req=20;
    bg='yellow';
    font_qty=14;
  }
  //alert('pointEvents: '+pointEvents);
  let vdtl='';
  //let v_stockno='';
  DB_STOCK_INVTY.sort(JBE_SORT_ARRAY(['rank']));
  DB_STOCK_INVTY2.sort(JBE_SORT_ARRAY(['stockno','expiry','lotno']));
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let v_stockno=DB_STOCK_INVTY[i].stockno;    
    let arr=[];
    let ctr=0;
    for(var j=0;j<DB_STOCK_INVTY2.length;j++){
      if(DB_STOCK_INVTY2[j].stockno != v_stockno){ continue; }
      let ob={
        "lotno":DB_STOCK_INVTY2[j].lotno,
        "expiry":JBE_DATE_FORMAT(DB_STOCK_INVTY2[j].expiry,'YYYY-MM'),
        "req":DB_STOCK_INVTY2[j].req
      };
      arr[ctr]=ob; ctr++;
    }

    let len=arr.length;
    if(len==0){ arr=[{ "lotno":"", "expiry":"", "req":"" },{ "lotno":"", "expiry":"", "req":"" }]; }
    if(len==1){ arr[1]={ "lotno":"", "expiry":"", "req":"" }; }
    //console.log(arr);
    
    //let row_height=42;
    let row_height=(h_dtl*2)+2;
    if(len>2){
      let n=len-2;
      row_height=(h_dtl*len)+len-n;      
    }

    vdtl+=
    '<div id="div_row'+v_stockno+'" data-stockno="'+v_stockno+'" class="cls_stock_rows" style="width:100%;height:'+row_height+'px;border:1px solid black;color:black;background:none;">'+
      '<div id="div_row_vax'+v_stockno+'" style="float:left;width:'+w_leftWidth+'%;height:100%;text-align:left;padding:5px;border:px solid black;overflow:auto;background:none;">'+DB_STOCK_INVTY[i].descrp+'</div>'+
      '<div id="div_row_data'+v_stockno+'" style="float:left;width:'+(100-w_leftWidth)+'%;height:100%;text-align:left;padding:0px;border:0px solid blue;border-left:0px;background:none;">';

        for(var j=0;j<arr.length;j++){
          let v_lotno=arr[j].lotno;
          let v_expiry=arr[j].expiry;
          let v_req=arr[j].req;
          let div=mode+v_stockno+'_'+(j+1);

          vdtl+=
          '<div style="width:100%;height:'+h_dtl+'px;border:0px solid black;border-bottom:0px;background:none;">';
            
            for(var k=1;k<=5;k++){                  
              let vstyle='display:block;width:20%;pointer-events:'+pointEvents+';background:yellow;';
              if(mode=='edit'){
                if(k!=col){
                  vstyle='display:none;';
                }             
              }

              vdtl+='<input type="number" id="'+div+'w'+k+'" name="'+div+'w'+k+'" class="cls_weekly_row" style="'+vstyle+'font-size:'+font_qty+';px;" value="" />';
            }
           
            vdtl+=
            '<div id="'+div+'lotno'+'" class="cls_weekly_row" style="width:'+wd_lotno+'%;margin-left:'+w_marginLeft+'%;pointer-events:auto;overflow:auto;color:black;background:'+clor_lotno+';">'+v_lotno+'</div>'+
            '<div id="'+div+'expiry'+'" class="cls_weekly_row" style="width:'+wd_expiry+'%;padding:2px 0 0 0;background:'+clor_expiry+';">'+format_expiry(v_expiry)+'</div>'+
            '<div id="'+div+'req'+'" class="cls_weekly_row" style="width:'+wd_req+'%;margin-left:'+w_marginLeft+'%;padding:2px 0 0 0;border:1px solid black;border-top:0px;border-right:0px;background:'+clor_req+';">'+v_req+'</div>'+
          '</div>';
        }

        vdtl+=
      '</div>'+
    '</div>';
  }
  return vdtl;
}

//
function init_fm_weekly(mode){
  if(mode=='edit'){ return; }
  let w_leftWidth=15; let w_marginLeft=0;
  let wd_qty=12; let wd_lotno=18; let wd_expiry=11; let wd_req=11;
  let bg='white';
  
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let v_stockno=DB_STOCK_INVTY[i].stockno;    
    let arr=[];
    let ctr=0;
    document.getElementById('div_row_vax'+v_stockno).style.width=w_leftWidth+'%';
    document.getElementById('div_row_data'+v_stockno).style.width=(100-w_leftWidth)+'%';
    for(var j=0;j<DB_STOCK_INVTY2.length;j++){
      if(DB_STOCK_INVTY2[j].stockno != v_stockno){ continue; }
      let ob={
        "lotno":DB_STOCK_INVTY2[j].lotno,
        "expiry":DB_STOCK_INVTY2[j].expiry,
        "req":DB_STOCK_INVTY2[j].req
      };
      arr[ctr]=ob; ctr++;
    }

    let len=arr.length;
    if(len==0){ arr=[{ "lotno":"", "expiry":"", "req":"" },{ "lotno":"", "expiry":"", "req":"" }]; }
    if(len==1){ arr[1]={ "lotno":"", "expiry":"", "req":"" }; }
    console.log(arr.length);

    for(var j=0;j<arr.length;j++){
      let div=mode+v_stockno+'_'+(j+1); 
      for(var k=1;k<=5;k++){
        document.getElementById(div+'w'+k).style.backgroundColor='#ffb38a';          
        document.getElementById(div+'w'+k).style.display='block';         
        document.getElementById(div+'w'+k).style.width=wd_qty+'%';
        document.getElementById(div+'w'+k).style.backgroundColor=bg;     
        document.getElementById(div+'w'+k).value='';
      }
      document.getElementById(div+'lotno').innerHTML=arr[j].lotno;
      document.getElementById(div+'expiry').innerHTML=format_expiry(arr[j].expiry); 
      document.getElementById(div+'req').innerHTML=arr[j].req;
    }    

  }
}
//

function format_expiry(expiry){
  let rval='';
  if(!expiry){ return rval; }
  expiry=JBE_DATE_FORMAT(expiry,'YYYY-MM');  
  rval=parseInt(expiry.substring(5))+'/'+expiry.substring(2,4);
  console.log('>>>> format_expiry:',rval);
  return rval;
}

function disp_fm_weekly(){  
  let mode=document.getElementById('dv_weekly').getAttribute('data-mode');
  console.log('CURR_AREANO:',CURR_AREANO);
  JBE_BACK_VIEW(true);  
  let date=JBE_DATE_FORMAT(document.getElementById('date_weekly').value,'YYYY-MM');
  document.getElementById('div_hd').style.display='block';
  document.getElementById('div_hd_edit').style.display='none';
  div_monthof.style.pointerEvents='auto'; div_monthof.style.opacity='1';

  let curdate=JBE_DATE_FORMAT(date,'YYYY-MM');  
  let areano=CURR_AREANO;
  btn_enabled(0);
  update_week_buttons(curdate,'invty');

  init_fm_weekly(mode,0);
  
  for(var i=0;i<DB_INVTY.length;i++){
    if(DB_INVTY[i].areano !== areano){ continue; }
    if(JBE_DATE_FORMAT(DB_INVTY[i].date,'YYYY-MM') !== curdate){ continue; }

    let v_stockno=DB_INVTY[i].stockno;
    let arr_data=DB_INVTY[i].row_data;
    //console.log(arr_data.length,' ==row_data::: ',arr_data);    

    for(var j=1;j<=arr_data.length;j++){
      let div=mode+v_stockno+'_'+j;
      for(var k=1;k<=5;k++){
        let val=arr_data[j-1]['w'+k];
        if(!val){ val=''; }
        console.log('val',val);
        document.getElementById(div+'w'+k).value=val;
        //document.getElementById(div+'w'+k).style.backgroundColor='white'; //document.getElementById(div+'w'+k).style.pointerEvents='none';
      }
      document.getElementById(div+'lotno').innerHTML=arr_data[j-1]['lotno'];    
      document.getElementById(div+'expiry').innerHTML=format_expiry(arr_data[j-1]['expiry']);  
      document.getElementById(div+'req').innerHTML=arr_data[j-1]['req'];      
    }
  }  
  console.log('Humana na app!');
  mnu_fm_weekly();
}

function xedit_fm_weekly(col){
  let txtContent=document.getElementById('btn'+(col-1)).textContent;
  if(!txtContent){ return; }

  JBE_BACK_VIEW(false);  
  div_hd.style.display='none';
  div_hd_edit.style.display='block';  
  init_fm_weekly('edit',col); //if 0, mode is display  
  
  div_monthof.style.pointerEvents='none'; div_monthof.style.opacity='0.5';
  //div_monthof2.style.display='block';
  hd_edit_week.innerHTML='Edit Week #'+col+'  ('+txtContent+')'
  let date=JBE_DATE_FORMAT(document.getElementById('date_weekly').value,'YYYY-MM');
  //assign    
  mnu_save_fm_weekly();  
}

function edit_fm_weekly(col){
  let txtContent=document.getElementById('btn'+(col-1)).textContent;
  if(!txtContent){ return; }

  let vheight=H_BODY-100-5;
  let fld1=col+'wm';      
  let fld2=col+'wf';
  let div='';    
  let v_val1=0;    let v_val2=0;    

  var dtl=       
    '<div id="div_edit_fm_accom" style="width:100%;height:'+vheight+'px;text-align:center;padding:5px;overflow:auto;background-color:none;">'+
      html_dtl_weekly('edit',col)+
    '</div>';

  var dtl2=   
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="save_fm_weekly();" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span>Save</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="JBE_CLOSEBOX();" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span>Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';

  JBE_OPENBOX('div_edit_fm_accom','Edit Week #'+col+'  ('+txtContent+')',dtl,dtl2,'close_edit_dtr');
  disp_fm_weekly();
}

async function save_fm_weekly(){
  console.clear();
  let date=document.getElementById('date_weekly').value;
  let n=new Date();
  let date_save = JBE_DATE_FORMAT(n,'YYYY-MM-DD');
  let time_save= n.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });

  let curdate=JBE_DATE_FORMAT(date,'YYYY-MM');  
  let aryINVTY=[];  let ctr_aryINVTY=0;
  
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let v_stockno=DB_STOCK_INVTY[i].stockno;        
    let arr=[]; let ctr=0;
    for(var j=0;j<DB_STOCK_INVTY2.length;j++){
      if(DB_STOCK_INVTY2[j].stockno != v_stockno){ continue; }

      let ob={
        "lotno":DB_STOCK_INVTY2[j].lotno,
        "expiry":JBE_DATE_FORMAT(DB_STOCK_INVTY2[j].expiry,'YYYY-MM'),
        "req":DB_STOCK_INVTY2[j].req
      };
      arr[ctr]=ob; ctr++;
    }

    let len=arr.length;
    if(len==0){ arr=[{ "lotno":"", "expiry":"", "req":"" },{ "lotno":"", "expiry":"", "req":"" }]; }
    if(len==1){ arr[1]={ "lotno":"", "expiry":"", "req":"" }; }
    //console.log(arr);
    let arr_data=[];  let ctr_arr_data=0;
    let f_empty=false;
    for(var j=0;j<arr.length;j++){      
      let div='edit'+v_stockno+'_'+(j+1);
      if(!document.getElementById(div+'w1').value 
        && !document.getElementById(div+'w2').value 
        && !document.getElementById(div+'w3').value 
        && !document.getElementById(div+'w4').value 
        && !document.getElementById(div+'w5').value
      ){
        f_empty=true; console.log('empty===',div); continue;
      }

      let ob_data={
        "w1":document.getElementById(div+'w1').value,
        "w2":document.getElementById(div+'w2').value,
        "w3":document.getElementById(div+'w3').value,
        "w4":document.getElementById(div+'w4').value,
        "w5":document.getElementById(div+'w5').value,
        "lotno":document.getElementById(div+'lotno').innerHTML,
        "expiry":document.getElementById(div+'expiry').innerHTML,
        "req":document.getElementById(div+'req').innerHTML,
      };
      arr_data[ctr_arr_data]=ob_data; ctr_arr_data++;
    }

    if(!arr_data.length){ console.log('====b4 obj yet empty.'); continue; }

    let obj={
      "areano":CURR_AREANO,      
      "stockno":v_stockno,      
      "date":curdate,
      "row_data":arr_data
    }

    aryINVTY[ctr_aryINVTY]=obj; ctr_aryINVTY++;
  }  
  console.log(CURR_AREANO,' -----aryINVTY',aryINVTY);

  showProgress(true);  
  await api_save(JBE_CLOUD,JBE_API+'invty',aryINVTY,record => !(record.areano === CURR_AREANO  && record.date === curdate));  
  let data=await api_readfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content;
  speakText('Data Uploaded successfully');
  //make_log(CURR_AREANO,'invty');
  showProgress(false);
  JBE_CLOSEBOX();
  document.getElementById('dv_weekly').setAttribute('data-mode','disp');
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
      /*
      '<div onclick="refresh_fm_weekly()" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jrefresh.png"  alt="home image" />'+
          '<span>Refresh</span>'+
        '</div>'+
      '</div>'+          
      */
      '<div style="float:left;width:100%;height:100%;padding:10px;font-size:15px;text-align:center;color:white;background:none;">'+
        'Click Week Buttons to Edit'+
      '</div>'+
    '</div>';
  dispMenu('div_footer',jmenu);
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
  dispMenu('div_footer',jmenu);
}

async function refresh_fm_weekly(){  
  let a=document.getElementById('dv_weekly').getAttribute('data-mode');
  showProgress(true);
  let data=await api_readfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content; 
  showProgress(false);
  disp_fm_weekly();
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
