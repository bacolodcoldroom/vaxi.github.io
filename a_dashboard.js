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

function fm_dashboard(){   
  //if(!JBE_CHK_USER(0)){ return; };
  //get_main_all_db();
  DB_AREA.sort(JBE_SORT_ARRAY(['*cluster','name']));
  let h_dashboard=40;
  let h_box1=280;
  h_box1=350;
  h_box1=window.innerHeight-h_dashboard-155;
  h_box1=H_BODY-h_dashboard-25-0;
  if(JBE_MOBILE){ h_box1+=10; }
      
  var newOptionsHtml =  '<option value=0>Sort by Category</option>'; 
  newOptionsHtml +=     '<option value=1>Sort by Inventory</option>'; 
  newOptionsHtml +=     '<option value=2>Sort by Accomplishment</option>';   

  let dtl=
  '<div id="dv_dashboard" style="display:block;width:100%;height:100%;font-size:12px;text-align:center;border:0px solid orange;background:	lightgray;">'+  

    '<div style="width:100%;height:'+h_dashboard+'px;padding:0px;font-weight:bold;text-align:left;border:0px solid gainsboro;background:gray;">'+ 
      '<div id="menu_open"" data-mode=0 onclick="openNav()" style="float:left;width:auto;height:100%;"><img src="gfx/jham.png" style="height:100%;" /></div>'+
      '<div  style="float:left;width:auto;height:100%;padding:10px;font-size:18px;background:none;">DASHBOARD</div>'+
      '<div  style="float:right;width:185px;height:100%;padding:5px;font-size:12px;background:none;">'+
        '<select id="div_sel_level" name="div_sel_level" onchange="disp_areas(this.value)" style="width:100%;height:100%;">'+
          newOptionsHtml+
        '</select>'+
      '</div>'+
    '</div>'+

    '<div id="dv_areaBox" style="width:100%;height:'+h_box1+'px;margin-top:5px;text-align:center;padding:0%;overflow:auto;border:0px solid red;background:white;">';
    '</div>'+

  '</div>';
  document.getElementById('div_right').innerHTML=dtl;
  /*
  let dv_hd=document.getElementById('div_hd_invty');
  let dv_dt=document.getElementById('dtls_invty');
  dv_hd.style.width=dv_dt.clientWidth+'px';

  dv_hd=document.getElementById('div_hd_accom');
  dv_dt=document.getElementById('dtls_accom');
  dv_hd.style.width=dv_dt.clientWidth+'px';
  */

  let sortsel=wrapper.getAttribute('data-sort');
  document.getElementById('div_sel_level').value=sortsel;
  disp_areas(sortsel);
}

function disp_areas(sortMode){
  wrapper.setAttribute('data-sort',sortMode);
  console.clear();
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM'); 
  const today=new Date(curdate+'-01');
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11
  const wednesdays = getWednesdaysInMonth(currentYear, currentMonth);
  const len_wed=wednesdays.length;

  let arr_area=[]; let ctr_arr_area=0;

  for(var i=0;i<DB_AREA.length;i++){
    //console.log(DB_AREA[i].name);
    let areano=DB_AREA[i].areano;
    let name=DB_AREA[i].name;
    let cluster=DB_AREA[i].cluster;
    let cluster_areano=DB_AREA[i].cluster_areano;
    let ctr_week_invty=0;
    let ary_tot=[0,0,0,0,0]; 
    //invty        
    //===========================================================================================================
    DB_INVTY.sort(JBE_SORT_ARRAY(['areano','date']));
    for(var j=0;j<DB_INVTY.length;j++){
      if(DB_INVTY[j].areano != areano){ continue; }
      if(DB_INVTY[j].date != curdate){ continue; }
      
      for(var k=1;k<=5;k++){
        let fld1='1w'+k; let fld2='2w'+k;
        let wk_row1=Number(DB_INVTY[j][fld1]); 
        let wk_row2=Number(DB_INVTY[j][fld2]);
        //console.log(areano,k,wk_row1,wk_row2);
        let tot=wk_row1+wk_row2;
        ary_tot[k-1]+=tot;
      } 
      //console.log('invty',areano,tot_wk1);      
    }
    ctr_week_invty=0;
    for(var kk=0;kk<ary_tot.length;kk++){ if(ary_tot[kk] > 0){ ctr_week_invty++; } }
    //===========================================================================================================
    let ctr_week_accom=0;
    ary_tot=[0,0,0,0,0]; 
    //accom   
    DB_ACCOM.sort(JBE_SORT_ARRAY(['areano','date'])); 
    for(var j=0;j<DB_ACCOM.length;j++){
      if(DB_ACCOM[j].areano != areano){ continue; }
      if(DB_ACCOM[j].date != curdate){ continue; }
      let tot=0;
      for(var k=1;k<=5;k++){
        let fld1=k+'wm'; let fld2=k+'wf';
        let wk_male=Number(DB_ACCOM[j][fld1]);
        let wk_female=Number(DB_ACCOM[j][fld2]);
        tot=wk_male+wk_female;
        ary_tot[k-1]+=tot;
      }      
    }
    //console.log('accom',areano,ary);
    ctr_week_accom=0;
    for(var kk=0;kk<ary_tot.length;kk++){ if(ary_tot[kk] > 0){ ctr_week_accom++; } }
    //===========================================================================================================

    let ob={ "areano":areano, "name":name, "cluster":cluster, "cluster_areano":cluster_areano, "invty":ctr_week_invty, "accom":ctr_week_accom };
    arr_area[ctr_arr_area]=ob; ctr_arr_area++;
  }  
  //===========================================================================================================
  //===========================================================================================================
  //===========================================================================================================
  let dtl='';  
  let sorter=['*cluster','name'];
  if(sortMode==1){ sorter=['*invty','name']; }
  if(sortMode==2){ sorter=['*accom','name']; }
    
  arr_area.sort(JBE_SORT_ARRAY(sorter));
  for(var i=0;i<arr_area.length;i++){
    let vdisp_invty='block';          
    if(arr_area[i].cluster_areano != '-'){ vdisp_invty='none'; }
    let vdisp_accom=iif(arr_area[i].cluster=='YES','none','block');
    let fg_invty='black'; let bg_invty='yellow';
    let fg_accom='black'; let bg_accom='pink';

    if(arr_area[i].invty==len_wed){ fg_invty='red'; bg_invty='gold'; }
    if(arr_area[i].accom==len_wed){ fg_accom='white'; bg_accom='purple'; }
    
    dtl+=
    '<div id="dv_Circle_'+i+'" style="float:left;width:23.75%;height:60px;margin-left:1%;margin-top:1%;padding:5px;border-radius:10px;border:1px solid lightgray;">'+
      '<div style="width:100%;height:50%;border:0px solid gold;text-align:center;background:none;">'+

        '<div style="float:left;width:50%;height:100%;border:0px solid red;background:none;">'+          
          '<div id="'+arr_area[i].areano+'I'+'" onclick="prn_brgy(`'+arr_area[i].areano+'`,`invty`,`'+curdate+'`)" style="display:'+vdisp_invty+';float:right;margin-right:10px;width:25px;height:100%;cursor:pointer;border-radius:50%;text-align:center;font-size:13px;border:1px solid black;padding:4px 0 0 0;color:'+fg_invty+';background:'+bg_invty+';">'+arr_area[i].invty+'</div>'+
        '</div>'+

        '<div style="float:left;width:50%;height:100%;border:0px solid red;background:none;">'+        
          '<div id="'+arr_area[i].areano+'I'+'" onclick="prn_brgy(`'+arr_area[i].areano+'`,`accom`,`'+curdate+'`)" style="display:'+vdisp_accom+';float:left;margin-left:10px;width:25px;height:100%;cursor:pointer;border-radius:50%;text-align:center;font-size:13px;border:1px solid black;padding:4px 0 0 0;color:'+fg_accom+';background:'+bg_accom+';">'+arr_area[i].accom+'</div>'+
        '</div>'+

      '</div>'+
      '<div id="brgy_'+i+'" style="width:100%;height:50%;font-weight:bold;border:0px solid red;overflow:auto;padding:2px 0 0 0;color:black;background:none;">'+arr_area[i].name+'</div>'+        
    '</div>';
  }
  document.getElementById('dv_areaBox').innerHTML=dtl;
}

function mnu_brgy(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="JBE_CLOSE_VIEW2();showMainPage();" style="float:left;width:35%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Edit Inventory</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="JBE_CLOSE_VIEW2();showMainPage();" style="float:left;width:35%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Edit Barangay</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="JBE_CLOSE_VIEW2();showMainPage();" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Close</span>'+
        '</div>'+
      '</div>'+
    '</div>';  
  dispMenu('div_menu',jmenu);
}
///////////////////////////////////////////////////////////////////////
function mnu_brgy2(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div style="float:left;width:75%;height:100%;padding:5px;font-size:16px;text-align:left;color:white;background:none;">'+
        'Click Week Buttons to Edit'+
      '</div>'+
      '<div onclick="JBE_CLOSE_VIEW2();showMainPage();" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Close</span>'+
        '</div>'+
      '</div>'+
    '</div>';  
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
  let tran=document.getElementById('wrapper').getAttribute('data-tran');
  console.log('disp_brgy:',tran,areano);
  if(tran=='invty'){
    disp_invty_brgy(areano);
  }else if(tran=='accom'){
    disp_accom_brgy(areano);
  }
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
  let v_mphoto=await jeff_getImage(areano+'.jpg');  
  if(isJpegDataUrl(v_mphoto)){ document.getElementById('brgy_logo').src=v_mphoto; }
  
  disp_brgy(areano);
 
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

function chgdate_brgy(){
  console.log('chgdate_brgy');
  let tran=document.getElementById('wrapper').getAttribute('data-tran');
  let areano=document.getElementById('wrapper').getAttribute('data-areano');
  if(!areano){ snackBar('No Barangay selected...'); }
  if(tran=='invty'){
    disp_invty_brgy(areano);
  }else if(tran=='accom'){
    disp_accom_brgy(areano);
  }  
}

function clear_invty_brgy(){
  for(var i=0;i<DB_STOCK_INVTY.length;i++){   
    document.getElementById('div_row_data'+DB_STOCK_INVTY[i].stockno).innerHTML='';
    document.getElementById('div_row'+DB_STOCK_INVTY[i].stockno).style.height='42px'; 
    let vdtl='';
    for(var j=1;j<=2;j++){
      vdtl+=
      '<div style="width:100%;height:20px;border:1px solid lightgray;">';
        for(var k=1;k<=5;k++){
          //let val=DB_INVTY[i][fld1];
          vdtl+='<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_'+(j)+'w'+(k)+'" class="cls_weekly_row" value="" />';
        }
        vdtl+=
          '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_'+j+'lotno'+'"  class="cls_weekly_row" style="width:15%;margin-left:1%;overflow:auto;color:black;background:'+clor_lotno+';" value="" />'+
          '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_'+j+'expiry'+'" class="cls_weekly_row" style="width:10%;background:'+clor_expiry+';" value="" />'+
          '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_'+j+'req'+'"    class="cls_weekly_row" style="width:8%;margin-left:1%;border:1px solid black;border-top:1px;border-right:0px;background:'+clor_req+';" value="" />';
      vdtl+=
      '</div>';      
    }
    document.getElementById('div_row_data'+DB_STOCK_INVTY[i].stockno).innerHTML=vdtl;    
  }
  return;
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
  let tran=document.getElementById('wrapper').getAttribute('data-tran');

  DB_AREA.sort(JBE_SORT_ARRAY(['*cluster','name']));
  console.log('disp_brgy_list',DB_AREA);
  let ctr=0;
  let vdtl='';          
  for(var i=0;i<DB_AREA.length;i++){            
    if(tran=='invty' && (DB_AREA[i].cluster_areano != '-')){ continue; }
    if(tran=='accom' && (DB_AREA[i].cluster == 'YES')){ continue; }

    vdtl+='<div id="id_'+ctr+'" class="class_brgy" onclick="sel_brgy(&quot;'+DB_AREA[i].areano+'&quot;)" style="width:100%;height:25px;font-size:12px;margin-top:2px;cursor:pointer;padding:4px;border:1px solid lightgray;color:black;background:gray;">'+DB_AREA[i].name+'</div>';
    ctr++;
  }
  document.getElementById('brgy_list').innerHTML=vdtl;
}

//‐-------
function disp_invty_brgy(areano){    
  console.log('disp_invty_brgy --> ',areano);
  let curdate=document.getElementById('id_date').value;
  //alert(curdate+' areano:'+areano);
  //curdate=JBE_DATE_FORMAT(curdate,'YYYY-MM');  
  btn_enabled(0);
  update_week_buttons(curdate,'invty');
  clear_invty_brgy();
  console.log('disp invty brgy:',areano);
  for(var i=0;i<DB_INVTY.length;i++){
    if(DB_INVTY[i].areano !== areano){ continue; }
    if(JBE_DATE_FORMAT(DB_INVTY[i].date,'YYYY-MM') !== curdate){ continue; }

    let v_stockno=DB_INVTY[i].stockno;
    let arr_data=DB_INVTY[i].row_data;
    console.log(arr_data.length,' ==row_data::: ',arr_data);
    let vdtl='';
    for(var j=1;j<=arr_data.length;j++){
      vdtl+=
      '<div style="width:100%;height:20px;border:1px solid lightgray;">';
        for(var k=1;k<=5;k++){
          //let val=DB_INVTY[i][fld1];
          vdtl+='<input type="number" id="'+DB_STOCK_INVTY[i].stockno+'_'+(j)+'w'+(k)+'" class="cls_weekly_row" value="'+k+'" />';
        }
        vdtl+=
          '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_'+j+'lotno'+'"  class="cls_weekly_row" style="width:15%;margin-left:1%;overflow:auto;color:black;background:'+clor_lotno+';" value="" />'+
          '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_'+j+'expiry'+'" class="cls_weekly_row" style="width:10%;background:'+clor_expiry+';" value="" />'+
          '<input type="text" id="'+DB_STOCK_INVTY[i].stockno+'_'+j+'req'+'"    class="cls_weekly_row" style="width:8%;margin-left:1%;border:1px solid black;border-top:1px;border-right:0px;background:'+clor_req+';" value="" />';
      vdtl+=
      '</div>';      
    }
    document.getElementById('div_row_data'+v_stockno).innerHTML=vdtl;    
    let row_height=42;
    console.log('arr_data.length:',arr_data.length);
    if(arr_data.length>2){
      let n=arr_data.length-2;
      row_height=(20*arr_data.length)+arr_data.length-n;      
    } 
    document.getElementById('div_row'+v_stockno).style.height=(row_height)+'px';       
  }  
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
  //document.getElementById('btn'+col).disabled=false;
  mnu_save_brgy();
}

function btn_enabled(col){
  let tran=document.getElementById('wrapper').getAttribute('data-tran');
  let vbtn='btn';
  if(tran=='accom'){ vbtn='btn1'; }
  let vcolor='white';let vopacity='0.5'; let vdisabled=true;
  if(col==0){
    vcolor='white'; vopacity='1'; vdisabled=false;
  }
  for(var i=0;i<5;i++){        
    document.getElementById(vbtn+i).style.color=vcolor; document.getElementById(vbtn+i).style.opacity=vopacity; document.getElementById(vbtn+i).disabled=vdisabled;
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
  let tran=document.getElementById('wrapper').getAttribute('data-tran');
  //let saveMode=document.getElementById('div_menu').getAttribute('data-saveMode');  
  if(tran=='invty'){
    save_invty_brgy(areano);
  }else if(tran=='accom'){
    save_accom_brgy(areano);
  }else{
    snackBar('ERROR: Select Inventory or Accomplishment mode.');
    return;    
  }
  mnu_brgy();
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
  //await api_save(JBE_CLOUD,JBE_API+'invty',arr,record => !(record.areano === areano || record.date === curdate));  
  await api_save(JBE_CLOUD,JBE_API+'invty',arr,record => !(record.areano === areano && record.date === curdate));  
  let data=await api_readfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content;
  console.log('data new:',data.length);
  showProgress(false);
  //disp_invty_brgy(areano);
  disp_brgy(areano);
}

//=========================================================================================================================================================================
//=========================================================================================================================================================================
//=========================================================================================================================================================================
//‐-------
function disp_accom_brgy(areano){  
  let curdate=document.getElementById('id_date').value;    
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
  btn_enabled(col);
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
  
  let curdate=document.getElementById('id_date').value;  
  let arr=[];arr_ctr=0;
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    let totals=Number(document.getElementById(DB_STOCK_ACCOM[i].stockno+'_'+'total').value);
    if(!totals){ continue; }
    let obj={
      "areano":areano,
      "stockno":DB_STOCK_ACCOM[i].stockno,
      "date_save":date_save,"time_save":time_save,
      "date":document.getElementById('id_date').value,
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
  await api_save(JBE_CLOUD,JBE_API+'accom',arr,record => !(record.areano === areano && record.date === curdate));  
  let data=await api_readfile(JBE_CLOUD,JBE_API+'accom'); DB_ACCOM=data.content;
  showProgress(false);
  //disp_accom_brgy(areano);
  disp_brgy(areano);
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
