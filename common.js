async function make_log(areano,tran){
  let n=new Date();
  let date = JBE_DATE_FORMAT(n,'YYYY-MM-DD');
  let time= n.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
  let log='Updated Weekly Inventory...';
  if(tran=='accom'){ log='Updated Weekly Accomplishment...'; }
  let ob={
    "areano": areano,
    "date": date,
    "time": time,
    "log": log,
    "tran":tran,
    "post":false
  };
  await api_save(JBE_CLOUD,JBE_API+'log',ob,record => !(record.areano === areano && record.tran === tran));
}

async function show_log(){
  return;
  let data=await api_readfile(JBE_CLOUD,JBE_API+'log'); DB_LOG=data.content;
  let curdate=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  
  DB_LOG.sort(sortByMultipleKey(['*time','date','areano']));
  let arr_post=[]; let ctr=0;
  let dtl='';  
  let areanames='';
  for(var i=0;i<DB_LOG.length;i++){
    if(DB_LOG[i].date != curdate){ continue; }
    //if(DB_LOG[i].post == true){ continue; }
        
    let aname=get_area(DB_LOG[i].areano);    
    let clor='black';
    if(DB_LOG[i].post==false){ 
      clor='red'; 
      //speakText('New Update! from '+aname);
      console.log('......... ',get_area(DB_LOG[i].areano));
      //await updateField(JBE_API+'log.json',record => record.areano ===  DB_LOG[i].areano && record.post === false,'post',true);       
      DB_LOG[i].post=true;    
      //await api_save(JBE_CLOUD,JBE_API+'log',DB_LOG,record => !(record.areano === DB_LOG[i].areano && record.tran !== DB_LOG[i].tran));        
      //await api_save(JBE_CLOUD,JBE_API+'log',DB_LOG,record => record.areano !== DB_LOG[i].areano || record.tran !== DB_LOG[i].tran);        
    }

    dtl+=
    '<div onclick="sel_brgy(&quot;'+DB_LOG[i].areano+'&quot;)" style="width:100%;height:40px;cursor:pointer;margin-top:5px;padding:2px;border:1px solid lightgray;">'+
      '<div style="width:100%;height:50%;">'+
        '<div style="float:left;width:70%;height:100%;font-weight:bold;color:'+clor+';">'+aname+'</div>'+
        '<div style="float:right;width:auto;height:100%;">'+DB_LOG[i].time+'</div>'+
      '</div>'+
      '<div style="width:100%;height:50%;">'+DB_LOG[i].log+'</div>'+
    '</div>';

  }
  document.getElementById('id_log').innerHTML=dtl;

  //await updateField(JBE_API+'log.json',record => record.post === false,'post',true); 
  //await api_save(JBE_CLOUD,JBE_API+'log',arr_post,record => !(record.post === true));  
  //data=await api_readfile(JBE_CLOUD,JBE_API+'log'); DB_LOG=data.content;
  
  //await updateField(JBE_API+'log.json',record => record.areano ===  v_areano && record.post === false,'post',true); 
  
  //areanames=areanames.substring(0,areanames.length-1);
  //console.log(areanames);
  
  //JBE_AUDIO('gfx/snd/insight',5);
}


function getWednesdaysInMonth(year, month) {
  // Note: month is 0-indexed (0 = January, 11 = December)
  const wednesdays = [];
  const date = new Date(year, month, 1);
  
  // Find first Wednesday of the month
  while (date.getDay() !== 3) {
      date.setDate(date.getDate() + 1);
  }
  
  // Add all Wednesdays in the month
  while (date.getMonth() === month) {
      wednesdays.push(new Date(date));
      date.setDate(date.getDate() + 7);
  }
  
  return wednesdays;
}

function update_week_buttons(date,tran){
  // Example usage for current month
  const today = new Date(date);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11
  const wednesdays = getWednesdaysInMonth(currentYear, currentMonth);

  let vbtn='';
  if(tran=='invty'){
    vbtn='btn';
  }else if(tran=='accom'){
    vbtn='btn1';
  }

  for(var i=0;i<5;i++){   
    document.getElementById((vbtn+i)).textContent='';
  }
  for(var i=0;i<wednesdays.length;i++){
    let wed=JBE_DATE_FORMAT(wednesdays[i].toDateString(),'MMM DD, YYYY');
    document.getElementById(vbtn+i).textContent=wed;
  }
}

function dispMenu(divmenu,m){
  document.getElementById(divmenu).innerHTML=m;
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

///////////////////////////////////////////////////////////////////////
function mnu_brgy(){
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
  dispMenu('div_footer',jmenu);
}

function mnu_save_brgy(date){  
  let areano=document.getElementById('wrapper').getAttribute('data-areano');
  let tran=document.getElementById('wrapper').getAttribute('data-tran');
  let func_save='save_invty_brgy('+date+')'; //(date);
  let func_disp='disp_invty_brgy()'; //(date);
  if(tran=='accom'){
    func_save='save_accom_brgy()'; //(date);
    func_disp='disp_accom_brgy()'; //(date);
  }
  //alert(tran+ ' = '+areano);
  //return;
  var jmenu=
    '<div style="width:100%;height:100%;">'+           
      '<div onclick="'+func_save+'" style="float:left;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jsave.png"  alt="home image" />'+
          '<span style="height:100%;padding:0 0 0 5px;color:white;">Save</span>'+
        '</div>'+
      '</div>'+
      '<div onclick="'+func_disp+'" style="float:right;width:25%;height:100%;background:none;">'+
        '<div class="class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span style="padding:0px;color:white;">Cancel</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  dispMenu('div_footer',jmenu);
}
///////////////////////////////////////////////////////////////////////

function html_dtl_invty(mode,date){  
  let len_wed=5; let wd_box=13;
  let w_leftWidth=20; 
  let w_marginLeft=0;
  let wd_lotno=15; let wd_expiry=10; let wd_req=10;

  if(mode=='prn'){
    w_marginLeft=0;
    wd_lotno=10;  wd_expiry=10;  wd_req=9;

    let ndate=date+'-01';
    ndate=JBE_DATE_FORMAT(ndate,'MMMM YYYY');
    console.log('rp_invty date:',date);
    //date=JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM-DD');
    //let v_areaname=get_area(areano);
  
    const today=new Date(date);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-11
    const wednesdays = getWednesdaysInMonth(currentYear, currentMonth);
    console.log('wednesdays len:',wednesdays.length);
    
    
    len_wed=wednesdays.length;
    if(wednesdays.length==5){ w_leftWidth=15; }

    wd_box=Number((100-(w_leftWidth+30))/(len_wed));
  }
  
  let dtl='';
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

    dtl+=
    '<div id="div_row'+v_stockno+'" data-stockno="'+v_stockno+'" class="cls_stock_rows" style="width:100%;height:'+row_height+'px;border:1px solid black;color:black;background:none;">'+
      '<div id="div_row_vax'+v_stockno+'" style="float:left;width:'+w_leftWidth+'%;height:100%;text-align:left;padding:5px;border:px solid black;overflow:auto;">'+DB_STOCK_INVTY[i].descrp+'</div>'+
      '<div id="div_row_data'+v_stockno+'" style="float:left;width:'+(100-w_leftWidth)+'%;height:100%;text-align:left;padding:0px;border:0px solid blue;border-left:0px;overflow:auto;">';

        for(var j=0;j<arr.length;j++){
          let v_lotno=arr[j].lotno;
          let v_expiry=arr[j].expiry;
          let v_req=arr[j].req;
          let div=v_stockno+'_'+(j+1);
          dtl+=
          '<div style="width:100%;height:20px;border:0px solid black;border-bottom:0px;background:none;">';
          for(var k=1;k<=len_wed;k++){    
            let vstyle='';
            if(k==len_wed){ vstyle='border-right:0px solid black;'};
            dtl+='<input type="number" id="'+div+'w'+k+'" name="'+div+'w'+k+'" class="cls_weekly_row" style="'+vstyle+'" value="" />';
          }
          
          dtl+=
            '<input type="text"   id="'+div+'lotno'+'"  name="'+div+'lotno'+'"  class="cls_weekly_row" style="width:'+wd_lotno+'%;margin-left:'+w_marginLeft+'%;overflow:auto;color:black;background:'+clor_lotno+';" value="'+v_lotno+'" />'+
            '<input type="month"  id="'+div+'expiry'+'" name="'+div+'expiry'+'" class="cls_weekly_row" style="width:'+wd_expiry+'%;background:'+clor_expiry+';" value="'+v_expiry+'" />'+
            '<input type="number" id="'+div+'req'+'"    name="'+div+'req'+'" class="cls_weekly_row" style="width:'+wd_req+'%;margin-left:'+w_marginLeft+'%;border:1px solid black;border-top:0px;border-right:0px;background:'+clor_req+';" value="'+v_req+'" />'+
          '</div>';
        }

        dtl+=
      '</div>'+
    '</div>';
  }
  return dtl;
}

function clear_invty_brgy(){
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let v_stockno=DB_STOCK_INVTY[i].stockno;    
    let arr=[];
    let ctr=0;

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
    
    for(var j=0;j<arr.length;j++){
      let div=v_stockno+'_'+(j+1);
      //console.log(div);
      for(var k=1;k<=5;k++){
        document.getElementById(div+'w'+k).value='';
        document.getElementById(div+'w'+k).style.backgroundColor='white'; document.getElementById(div+'w'+k).style.pointerEvents='none';
      }
      document.getElementById(div+'lotno').value=arr[j].lotno;                                document.getElementById(div+'lotno').style.pointerEvents='none';
      document.getElementById(div+'expiry').value=JBE_DATE_FORMAT(arr[j].expiry,'YYYY-MM');   document.getElementById(div+'expiry').style.pointerEvents='none';
      document.getElementById(div+'req').value=arr[j].req;                                    document.getElementById(div+'req').style.pointerEvents='none';
    }

  }
}

//‐-------
async function disp_invty_brgy(){ 
  let areano=document.getElementById('wrapper').getAttribute('data-areano');
  let date=document.getElementById('id_date').value;
  console.log(date+'::: disp_invty_brgy: '+areano);     
  showProgress(true);
  let data=await api_readfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content;
  showProgress(false);
  //console.log('disp_invty_brgy(areano,date) :: areano::',areano,' date::'+date);
  
  btn_enabled(0);
  update_week_buttons(date,'invty');
  clear_invty_brgy();
  //console.log('disp invty brgy:',areano);
  
  for(var i=0;i<DB_INVTY.length;i++){
    if(DB_INVTY[i].areano !== areano){ continue; }
    if(JBE_DATE_FORMAT(DB_INVTY[i].date,'YYYY-MM') !== date){ continue; }

    let v_stockno=DB_INVTY[i].stockno;
    let arr_data=DB_INVTY[i].row_data;
    //console.log(arr_data.length,' ==row_data::: ',arr_data);    

    for(var j=1;j<=arr_data.length;j++){
      let div=v_stockno+'_'+j;
      //div_row'+DB_STOCK_INVTY[i].stockno;
      if(!document.getElementById('div_row'+v_stockno)){
        console.log('FAILED 99999',j,div);
        //continue;
      }

      console.log('AYOS 555',j,div);
      for(var k=1;k<=5;k++){
        let val=arr_data[j-1]['w'+k];
        if(!val){ val=''; }
        console.log('val',val);
        document.getElementById(div+'w'+k).value=val;
        document.getElementById(div+'w'+k).style.backgroundColor='white'; document.getElementById(div+'w'+k).style.pointerEvents='none';
      }
      document.getElementById(div+'lotno').value=arr_data[j-1]['lotno'];                             document.getElementById(div+'lotno').style.pointerEvents='none';
      document.getElementById(div+'expiry').value=JBE_DATE_FORMAT(arr_data[j-1].expiry,'YYYY-MM');   document.getElementById(div+'expiry').style.pointerEvents='none';
      document.getElementById(div+'req').value=arr_data[j-1]['req'];                                 document.getElementById(div+'req').style.pointerEvents='none';
    }
  }  
  console.log('Humana na po!');
  document.getElementById('brgy_list').style.pointerEvents='auto';
  document.getElementById('brgy_back').style.pointerEvents='auto';
  
  mnu_disp_brgy();
}

function mnu_disp_brgy(){
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
  dispMenu('div_footer',jmenu);
}

//‐-------
function edit_invty_brgy(xareano,date,col){  
  //let progmode=document.getElementById('wrapper').getAttribute('data-progmode');
  let txtContent=document.getElementById('btn'+(col-1)).textContent;
  if(!txtContent){
    //MSG_SHOW(vbOk,'ERROR:','No Database Found. Create New one.', function(){},function(){});    
    return;
  }
  //let areano=document.getElementById('id_brgy').getAttribute('data-areano');
  let areano=document.getElementById('wrapper').getAttribute('data-areano');
  if(!areano){
    snackBar('Select a Barangay...');
    return;
  }
  
  document.getElementById('div_footer').setAttribute('data-saveMode','invty');
  btn_enabled(col);
  //assign  
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    let v_stockno=DB_STOCK_INVTY[i].stockno;    
    let arr=[];
    let ctr=0;
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
    console.log(arr);

    for(var j=0;j<arr.length;j++){
      let div=v_stockno+'_'+(j+1);
      for(var k=1;k<=5;k++){
        //document.getElementById(div+'w'+k).value='z';
        document.getElementById(div+'w'+k).style.backgroundColor='#ffb38a';
        if(k==col){ document.getElementById(div+'w'+k).style.backgroundColor='yellow'; document.getElementById(div+'w'+k).style.pointerEvents='auto'; }
        /*
        if(progmode=='app'){
          if(k!=col){
            document.getElementById(div+'w'+k).style.display='none';
          }else{
            document.getElementById(div+'w'+k).style.width='20%';
            document.getElementById(div+'lotno').style.width='40%';
            document.getElementById(div+'expiry').style.width='20%';
            document.getElementById(div+'req').style.width='20%';
          }
        }
          */
        document.getElementById(div+'lotno').style.pointerEvents='auto';
        document.getElementById(div+'expiry').style.pointerEvents='auto';
        document.getElementById(div+'req').style.pointerEvents='auto';
      }
    }
    

  }
  mnu_save_brgy(date);
  document.getElementById('brgy_list').style.pointerEvents='none';
  document.getElementById('brgy_back').style.pointerEvents='none';
}

async function save_invty_brgy(){
  let areano=document.getElementById('wrapper').getAttribute('data-areano');  
  let date=document.getElementById('id_date').value;
  //validate entries

  let n=new Date();
  let date_save = JBE_DATE_FORMAT(n,'YYYY-MM-DD');
  let time_save= n.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });

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
      let div=v_stockno+'_'+(j+1);
      if(!document.getElementById(div+'w1').value 
        && !document.getElementById(div+'w2').value 
        && !document.getElementById(div+'w3').value 
        && !document.getElementById(div+'w4').value 
        && !document.getElementById(div+'w5').value
      ){
        f_empty=true; continue;
      }
      let ob_data={
        "w1":document.getElementById(div+'w1').value,
        "w2":document.getElementById(div+'w2').value,
        "w3":document.getElementById(div+'w3').value,
        "w4":document.getElementById(div+'w4').value,
        "w5":document.getElementById(div+'w5').value,
        "lotno":document.getElementById(div+'lotno').value,
        "expiry":JBE_DATE_FORMAT(document.getElementById(div+'expiry').value,'YYYY-MM'),
        "req":document.getElementById(div+'req').value,
      };
      arr_data[ctr_arr_data]=ob_data; ctr_arr_data++;
    }

    if(!arr_data.length){ console.log('====b4 obj yet empty.'); continue; }

    let obj={
      "areano":areano,      
      "stockno":v_stockno,      
      "date":date,
      "row_data":arr_data
    }

    aryINVTY[ctr_aryINVTY]=obj; ctr_aryINVTY++;
  }  
  console.log('-----aryINVTY',aryINVTY);
  if(!aryINVTY.length){ 
    snackBar('NO DATA to Save...');
    disp_invty_brgy();
    return;
  }
  //JBE_CLOSEBOX();
  //return;
  showProgress(true);  
  await api_save(JBE_CLOUD,JBE_API+'invty',aryINVTY,record => !(record.areano === CURR_AREANO  && record.date === date));  
  let data=await api_readfile(JBE_CLOUD,JBE_API+'invty'); DB_INVTY=data.content;
  speakText('Data Uploaded successfully');
  //make_log(CURR_AREANO,'invty');
  showProgress(false);
  disp_invty_brgy();
}