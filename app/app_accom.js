let clor_male='lightblue';
let clor_female='pink';

async function fm_accom(){
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
  let data=await api_readfile(JBE_CLOUD,JBE_API+'accom'); DB_ACCOM=data.content; 
  showProgress(false);
  mnu_fm_accom();
  
  let pa_height=H_BODY-35-8;  
  let dtl= 
  '<div id="dv_accom" data-maxdays=0 data-print=0  style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:0px;border:1px solid lightgray;background:white;">'+

    '<div style="height:35px;width:100%;padding:0px;border:1px solid lightgray;background:none;">'+             
      
      '<div class="cls_daily" style="margin:0 auto;width:250px;height:100%;padding:4px;border:0px solid lightgray;">'+ 
        '<span style="float:left;width:40%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">Month of: </span>'+ 
        '<input id="date_accom" style="width:60%;height:100%;" onchange="chg_accom_month(this.value)" type="month" value="'+JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM')+'"  placeholder="Date" />'+ 
      '</div>'+

    '</div>'+

    '<div style="width:100%;height:'+pa_height+'px;border:1px solid lightgray;padding:5px;background:white;">'+

      '<div disabled id="div_hd" style="width:100%;height:40px;border:1px solid lightgray;padding:5px;">'+
        '<div style="float:left;width:13%;height:100%;padding:5px;">Vax</div>'+
        '<div style="float:left;width:87%;height:100%;border:0px solid black;">'+
          '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn1" onclick="edit_fm_accom(1)" style="background:'+JBE_CLOR+';">W1</button></div>'+
          '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn2" onclick="edit_fm_accom(2)" style="background:'+JBE_CLOR+';">W2</button></div>'+
          '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn3" onclick="edit_fm_accom(3)" style="background:'+JBE_CLOR+';">W3</button></div>'+
          '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn4" onclick="edit_fm_accom(4)" style="background:'+JBE_CLOR+';">W4</button></div>'+
          '<div class="cls_accom_row" style="width:15.2%;border:0px solid lightgray;padding:1px;"><button id="btn5" onclick="edit_fm_accom(5)" style="background:'+JBE_CLOR+';">W5</button></div>'+     
          '<div class="cls_accom_row" style="width:22.8%;border:1px solid lightgray;padding:7px 0 0 0;margin-left:1.1%;font-weight:bold;text-align:center">TOTALS</div>'+     
        '</div>'+
      '</div>'+

      '<div id="div_dtls" style="width:100%;height:'+(pa_height-40-10-25)+'px;border:1px solid lightgray;overflow:auto;padding:5px;background:none;">';
        let vdtl='';
        for(var i=0;i<DB_STOCK_ACCOM.length;i++){
          vdtl+=
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
        dtl+=vdtl+        
      '</div>'+

    '</div>'+
        
  '</div>';
  
  JBE_OPEN_VIEW(dtl,'Weekly Accomplishment','showMainPage');
  disp_fm_accom();
}

function do_total_accom(id){
  let tot_m=0; let tot_f=0;  
  for(var k=1;k<=5;k++){
    let div_m=id+'_'+k+'wm';
    let div_f=id+'_'+k+'wf';
    tot_m+=Number(document.getElementById(div_m).value);
    tot_f+=Number(document.getElementById(div_f).value);
  }
  console.log('>>>>>> ',tot_m,tot_f);
  document.getElementById(id+'_totM').value=tot_m;
  document.getElementById(id+'_totF').value=tot_f;
  document.getElementById(id+'_total').value=tot_m+tot_f;
}

//‐-------
function disp_fm_accom(){  
  //alert('act disp_fm_accom');
  JBE_BACK_VIEW(true);
  let curdate=document.getElementById('date_accom').value;  
  clear_fm_accom();
  for(var i=0;i<DB_ACCOM.length;i++){
    if(JBE_DATE_FORMAT(DB_ACCOM[i].date,'YYYY-MM') !== curdate){ continue; }
    if(DB_ACCOM[i].areano !== CURR_AREANO){ continue; }

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
  mnu_fm_accom();
}

//‐-------
function edit_fm_accom(col){
  let vheight=H_BODY-100;
  let fld1=col+'wm';      
  let fld2=col+'wf';
  let div='';    
  let v_val1=0;    let v_val2=0;    

  var dtl=       
    '<div id="div_edit_fm_accom" style="width:100%;height:'+vheight+'px;text-align:center;padding:0px;background-color:none;">'+
      '<div style="width:100%;height:30px;border:1px solid black;font-size:12px;font-weight:bold;padding:5px 0 0 0;color:black;background:none;">'+
        '<div style="float:left;width:50%;">Vaccine</div>'+
        '<div style="float:left;width:50%;">'+
          '<div style="float:left;width:33%;">Male</div>'+
          '<div style="float:left;width:33%;">Female</div>'+
          '<div style="float:left;width:34%;">Total</div>'+
        '</div>'+    
      '</div>'+

      '<div style="width:100%;height:'+(vheight-30-2-10)+'px;border:0px solid brown;font-size:12px;font-weight:bold;overflow:auto;padding:5px 0 0 0;color:black;background:none;">';
      let vdtl='';
      for(var i=0;i<DB_STOCK_ACCOM.length;i++){
        div=DB_STOCK_ACCOM[i].stockno+'_'+fld1;            v_val1=document.getElementById(div).value;
        div=DB_STOCK_ACCOM[i].stockno+'_'+fld2;            v_val2=document.getElementById(div).value;        
        let v_total=Number(v_val1)+Number(v_val2);
        vdtl+=
        '<div id="div_row" class="dtls" style="width:100%;height:60px;margin-top:2px;border:1px solid green;color:black;background:none;">'+
          '<div style="float:left;width:50%;height:100%;text-align:left;padding:5px;border:0px solid black;overflow:auto;">'+DB_STOCK_ACCOM[i].descrp+'</div>'+

          '<div style="float:left;width:50%;height:100%;border:0px solid black;">'+            
            '<input type="number" id="_'+DB_STOCK_ACCOM[i].stockno+'_wm" class="cls_accom_row" onchange="get_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="width:33%;pointer-events:auto;font-weight:bold;border-left:2px solid black;background:'+clor_male+';" value='+v_val1+' />'+
            '<input type="number" id="_'+DB_STOCK_ACCOM[i].stockno+'_wf" class="cls_accom_row" onchange="get_total_accom(&quot;'+DB_STOCK_ACCOM[i].stockno+'&quot;)" style="width:33%;pointer-events:auto;font-weight:bold;border-right:1px solid black;background:'+clor_female+';" value='+v_val2+' />'+
            '<input type="number" id="_'+DB_STOCK_ACCOM[i].stockno+'_total" class="cls_accom_row" style="width:34%;pointer-events:none;font-weight:bold;border-right:1px solid black;background:white;" value='+v_total+' />'+
          '</div>'+

        '</div>';
      }
      dtl+=vdtl+    

      '</div>'+
     
    '</div>';

  var dtl2=   
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="repl_fm_accom('+col+');save_fm_accom();" style="float:left;width:25%;height:100%;background:none;">'+
      //'<div onclick="repl_fm_accom('+col+');" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span>Save</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="disp_fm_accom();JBE_CLOSEBOX();" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span>Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';

  JBE_OPENBOX('div_edit_fm_accom','Edit Week # '+col,dtl,dtl2,'close_edit_dtr');
}
function get_total_accom(id){
  let tot=0;
  tot=Number(document.getElementById('_'+id+'_wm').value)+Number(document.getElementById('_'+id+'_wf').value);
  document.getElementById('_'+id+'_total').value=tot;
}

//‐-------
function repl_fm_accom(col){
  //id="'+DB_STOCK_ACCOM[i].stockno+'_1wm'
  let fld1=col+'wm';      
  let fld2=col+'wf';
  let div='';    
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let id1='_'+DB_STOCK_ACCOM[i].stockno+'_wm'; 
    let id2='_'+DB_STOCK_ACCOM[i].stockno+'_wf'; 
    div=DB_STOCK_ACCOM[i].stockno+'_'+fld1;     document.getElementById(div).value=document.getElementById(id1).value;
    div=DB_STOCK_ACCOM[i].stockno+'_'+fld2;     document.getElementById(div).value=document.getElementById(id2).value;
  }
  JBE_CLOSEBOX();
}


//‐-------
function xedit_fm_accom(col){
  JBE_BACK_VIEW(false);
  btn_enabled(col);
  //assign
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let div=DB_STOCK_ACCOM[i].stockno+'_'+col+'wm';  document.getElementById(div).style.borderLeft='2px solid red'; document.getElementById(div).style.pointerEvents='auto';
    div=DB_STOCK_ACCOM[i].stockno+'_'+col+'wf';      document.getElementById(div).style.borderRight='2px solid red'; document.getElementById(div).style.pointerEvents='auto';
  }
  document.getElementById('btn'+col).disabled=false;
  mnu_save_fm_accom();
}

function clear_fm_accom(){
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

async function save_fm_accom(){
  let n=new Date();
  let date_save = JBE_DATE_FORMAT(n,'YYYY-MM-DD');
  let time_save= n.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });

  let curdate=document.getElementById('date_accom').value;  
  console.clear();
  console.log('JBE_CLOUD',JBE_CLOUD);
  console.log('JBE_API',JBE_API);
  let arr=[];arr_ctr=0;
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let totals=Number(document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'total').value);
    if(!totals){ continue; }
    let obj={
      "areano":CURR_AREANO,
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
  showProgress(true);
  //await jeff_update_File(JBE_CLOUD,JBE_API+'accom.json',arr,record => record.areano !== CURR_AREANO || record.date !== curdate);  
  //let data=await jeff_getFile(JBE_CLOUD,JBE_API+'accom.json'); DB_ACCOM=data.content;
  await api_save(JBE_CLOUD,JBE_API+'accom',arr,record => record.areano !== CURR_AREANO || record.date !== curdate);  
  let data=await api_readfile(JBE_CLOUD,JBE_API+'accom'); DB_ACCOM=data.content;
  speakText('Data Uploaded successfully');
  make_log(CURR_AREANO,'accom');
  console.log('arr:',arr);
  showProgress(false);
  disp_fm_accom();
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

function chg_accom_month(v){
  disp_fm_accom();
}

function close_fm_accom(){
  //JBE_CLOSE_VIEW();
  showMainPage();
  //mnu_main_repo();
}

function mnu_fm_accom(){
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

function mnu_save_fm_accom(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="save_fm_accom()" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span>Save</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="disp_fm_accom()" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span>Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}

function refresh_accom(){  
  snackBar(`Refreshed...`);
}
 
function print_back(){
  //alert('rp_accom');
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
  '<div id="dv_accom2" data-maxdays=0 data-print=1 style="height:100%;width:100%;font-family:Arial Narrow,Arial,sans-serif;font-size:12px;padding:10px;border:0px solid lightgray;background:white;">'+

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
