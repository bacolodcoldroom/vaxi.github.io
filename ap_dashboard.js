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
  show_notes();
 // disp_dashboard();
}

function disp_all_invty(){
  let h1=50;
  let b1=H_BODY-h1-10-10;
  let dtl=
    '<div style="width:100%;height:100%;padding:10px;">'+

      '<div style="width:100%;height:'+h1+'px;border:1px solid orange;">MONTHLY VACCINE INVENTORY</div>'+

      '<div style="width:100%;height:'+b1+'px;border:1px solid orange;">'+

        '<div style="float:left;width:20%;height:100%;border:1px solid red;overflow:auto;">'+
          '<div id="da_invty" style="width:100%;height:100%;padding:5px;">';
            let vdtl='';
            for(var i=0;i<DB_INVTY.length;i++){
              vdtl+='<div onclick="oc_invty('+DB_INVTY[i].areano+')" style="width:100%;height:25px;cursor:pointer;border:1px solid lightgray;">'+DB_INVTY[i].name+'</div>';
            }
            dtl+=vdtl+
          '</div>'+
        '</div>'+

        '<div style="float:left;width:80%;height:100%;background:gray;overflow:auto;">'+
          '<div id="da_dtls" style="width:100%;height:100%;">'+
          '</div>'+
        '</div>'+

      '</div>'+

    '</div>';
  document.getElementById('div_right').innerHTML=dtl;  
}

function oc_invty(areano){
  let a=JBE_GETFLD('name',DB_AREA,'areano',areano);
  document.getElementById('da_dtls').innerHTML=a;  
  document.getElementById('da_dtls').style.fontSize='20px';
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

function chg_dispense(dte){
  disp_dispense(dte)
}
function chg_expire(n){
  //alert('expiry months: '+n);
  disp_expire(n)
}

function disp_dispense(dte){   
  dte=JBE_DATE_FORMAT(dte,'YYYY-MM-DD');     
  let rval=0;
  let lbl='Dispensed Today';
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');  
  if(dte != curdate){ lbl=JBE_DATE_FORMAT(dte,'MMM DD, YYYY'); }    
  let dtl='<div style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  
  for(var i=0;i<DB_PTR.length;i++){
    let ptrdate=JBE_DATE_FORMAT(DB_PTR[i].ptrdate,'YYYY-MM-DD');  
    if(dte != ptrdate){ continue; }

    let areaname=JBE_GETFLD('name',DB_AREA,'areano',DB_PTR[i].areano,DB_PTR[i].details);
    //if(DB_PTR[i].details){ areaname+=DB_PTR[i].details; }
    let tooltip=get_ptr2(DB_PTR[i].trano,areaname,DB_PTR[i].details);

    dtl+=
    '<div title="'+tooltip+'" onclick="launch_ptr(&quot;'+DB_PTR[i].trano+'&quot;)" style="width:100%;height:20px;text-align:left;cursor:pointer;font-size:11px;padding:3px;border:1px solid lightgray;">'+
      '<div style="float:left;width:60%;height:100%;overflow:auto;">'+DB_PTR[i].trano+'</div>'+
      '<div style="float:right;width:40%;height:100%;overflow:auto;">'+areaname+'</div>'+
    '</div>';
    rval++; 
  } 
  dtl+='</div>';
  document.getElementById('id_dispense').innerHTML=rval;  
  document.getElementById('dtl_dispense').innerHTML=dtl;
  document.getElementById('lbl_dispense').innerHTML=lbl;   
  //let vborder=1; 
  //if(rval>0){ vborder=1; }
  //document.getElementById('dtl_dispense').style.border=vborder+'px solid lightgray'; 
  disp_chart(dte);
  /// sub func
  function get_ptr2(ptrno,areaname,details){
    let rval='';
    let dtlz='';
    if(details){ dtlz='\n\u25C6 '+details; }
    for(var i=0;i<DB_PTR2.length;i++){      
      if(DB_PTR2[i].trano != ptrno){ continue; }

      rval+=DB_PTR2[i].descrp+' [ Lot#: '+DB_PTR2[i].lotno+' ] [ Qty: '+DB_PTR2[i].qty+' ]\n';
    }
    rval=ptrno+' [ '+areaname+' ]'+dtlz+'\n\n'+rval;
    return rval;
  }
}

function launch_ptr(ptrno){
  main_ptr(0,'JBE_CLOSE_VIEW2');
  document.getElementById('trano').value=ptrno;  
  document.getElementById('ptr_head').setAttribute('data-trano',ptrno);  
  disp_ptr();
}

function disp_invty(f_clear){  
  //clear data rows
  if(f_clear){
    document.getElementById('div_body').setAttribute('data-row',0);
    document.getElementById('div_body').setAttribute('data-row2',0);
  }
  //
  let e_date=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');
  let v_type=document.getElementById('div_body').getAttribute('data-invty');
  let v_desc=JBE_GETFLD('prodname',DB_PRODUCT,'type',v_type);
  document.getElementById('lbl_invty').innerHTML=v_desc;
  let v_total=0;
  let line_ctr=0;
  //if(DB_PTR.length > 0){ v_prodno=DB_PRODUCT[0].prodno; }

  DB_STOCK.sort(JBE_SORT_ARRAY(['type','descrp']));
  let dtl='<div style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  for(var k=0;k<DB_STOCK.length;k++){
    //if(DB_STOCK[k].prodno != v_prodno){ continue; }
    if(DB_STOCK[k].type != v_type){ continue; }
    
    let stockno=DB_STOCK[k].stockno;
    let stockBal=getStockBal(stockno,'',e_date);
    v_total+=stockBal[0];
    let storageBal=get_storage_bal(stockno);
    
    let tooltip='In &nbsp;&nbsp; : [ '+JBE_FORMAT_INT_TO_STR(stockBal[1])+' ]\n'+
                'Out : [ '+JBE_FORMAT_INT_TO_STR(stockBal[2])+' ]\n'+
                'Bal &nbsp;: [ '+JBE_FORMAT_INT_TO_STR(stockBal[0])+' ]';

    let fcolor='black'; let fline='none';
    if(stockBal[0] <= 0){ 
      fcolor='brown'; fline='line-through'; 
    }else if( stockBal[0] != storageBal) {
      fcolor='#0096FF';
    }
    line_ctr++;
    dtl+=    
    '<div id="dtl2_'+line_ctr+'" title="'+tooltip+'" data-clor="'+fcolor+'" ondblclick="launch_stockcard(&quot;'+stockno+'&quot;)" onclick="JBE_HL_ROW('+line_ctr+',&quot;black&quot;,&quot;white&quot;,&quot;dtl_invty&quot;,&quot;dtl2_&quot;);click_invty('+line_ctr+',&quot;'+stockno+'&quot;,'+stockBal[0]+')" style="width:100%;height:20px;text-align:left;cursor:pointer;font-size:11px;padding:3px;border:1px solid lightgray;color:'+fcolor+';">'+      
      '<div style="float:left;width:70%;height:100%;text-decoration:'+fline+';overflow:auto;padding:0px;margin:0;">'+JBE_GETFLD('descrp',DB_STOCK,'stockno',stockno)+'</div>'+
      '<div id="dtl2_bal_'+line_ctr+'" style="float:right;width:30%;height:100%;text-align:right;background:none;">'+JBE_FORMAT_INT_TO_STR(stockBal[0])+'</div>'+
    '</div>';
  }
  dtl+='</div>';
  document.getElementById('id_invty').innerHTML=JBE_FORMAT_INT_TO_STR(v_total);  
  document.getElementById('dtl_invty').innerHTML=dtl;
  //document.getElementById('lbl_dispense').innerHTML=lbl;   
  //let vborder=1; 
  //if(v_total>0){ vborder=1; }
  //document.getElementById('dtl_invty').style.border=vborder+'px solid lightgray'; 
  disp_storage('',0);
}

function click_invty(row,stockno,stockBal){
  document.getElementById('div_body').setAttribute('data-row',row);
  document.getElementById('div_body').setAttribute('data-row2',0);
  document.getElementById('div_body').setAttribute('data-code',stockno);
  disp_storage(stockno,stockBal);
}

function get_storage_bal(stockno){
  let tot=0;
  for(var z=0;z<DB_TRANSFER2.length;z++){
    if(DB_TRANSFER2[z].stockno != stockno){ continue; }
    tot+=DB_TRANSFER2[z].balance;
  }
  return tot;
}

function launch_stockcard(v){
  rp_stockcard();
  let vname=JBE_GETFLD('descrp',DB_STOCK,'stockno',v);
  document.getElementById('fil_vax').setAttribute('data-stockno',v);  
  document.getElementById('fil_vax').value=vname;
  let d1=JBE_DATE_FORMAT(document.getElementById('date_from').value,'YYYY-MM-DD');
  let d2=JBE_DATE_FORMAT(document.getElementById('date_to').value,'YYYY-MM-DD');  
  prn_stockcard(d1,d2);
}

function disp_expire(n){
  //alert('n:'+n);
  let arr=[]; let ctr_arr=0;
  let v_total=0;  
  let v_amount=0; let v_totqty=0;
  DB_TRANSFER2.sort(JBE_SORT_ARRAY(['type','descrp','expiry']));
  if(DB_TRANSFER2.length==0){ return; }

  let v_type=0;
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');  
    
  for(var k=0;k<DB_TRANSFER2.length;k++){  
    if(DB_TRANSFER2[k].type != v_type){ continue; }    

    let stockno=DB_TRANSFER2[k].stockno;   
    let descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',stockno); 
    
    if(DB_TRANSFER2[k].balance <= 0){ continue; }

    let exdate=JBE_DATE_FORMAT(DB_TRANSFER2[k].expiry,'YYYY-MM-DD');   
    if(exdate < curdate){ continue; }
    let result=subtractDates(new Date(curdate),new Date(exdate));    
    //console.log(`${descrp} Difference: ${result.months} months and ${result.days} days`);
    if(result.months > n){ continue; }

    let rez=result.months+'m/'+result.days+'d';
    if(result.months==0){ rez=result.days+'d'; }

    arr[ctr_arr]={
      "stockno":stockno,
      "descrp":descrp,
      "months":result.months,
      "days":result.days,
      "rez":rez,

      "lotno":DB_TRANSFER2[k].lotno,
      "locname":DB_TRANSFER2[k].locname,
      "expiry":DB_TRANSFER2[k].expiry,
      "date_tf":DB_TRANSFER2[k].date_tf,
      "balance":DB_TRANSFER2[k].balance,
      "refno":DB_TRANSFER2[k].refno
    }
    ctr_arr++;
    v_amount+=Number(DB_TRANSFER2[k].balance) * Number(DB_TRANSFER2[k].cost);
    v_totqty+=Number(DB_TRANSFER2[k].balance);
  }

  let dtl='<div style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  arr.sort(JBE_SORT_ARRAY(['months','days']));
  for(var k=0;k<arr.length;k++){
    let clor='gray';
    if(arr[k].months==0){
      if(arr[k].days > 14){ 
        clor='brown'; 
      }else if(arr[k].days > 7){ 
        clor='coral'; 
      }else{
        clor='red'; 
      }
    }
    let tooltip='Lot No. : [ '+arr[k].lotno+' ]\n'+                
                'Expiry &nbsp; : [ '+JBE_DATE_FORMAT(arr[k].expiry,'MMM DD, YYYY')+' ]\n'+
                'Location: [ '+arr[k].locname+' ]\n'+
                'Balance : [ '+JBE_FORMAT_INT_TO_STR(arr[k].balance)+' ]\n'+
                'Ref No. : [ '+arr[k].refno+' ]\n'+
                'TF-Date : [ '+JBE_DATE_FORMAT(arr[k].date_tf,'MMM DD, YYYY')+' ]';
    dtl+=
    '<div title="'+tooltip+'" style="width:100%;height:20px;cursor:context-menu;text-align:left;font-size:11px;padding:3px;border:1px solid lightgray;">'+      
      '<div style="float:left;width:50%;height:100%;overflow:auto;padding:0px;background:none;">'+arr[k].descrp+'</div>'+
      '<div style="float:left;width:18%;height:100%;text-align:center;color:'+clor+';background:none;">'+arr[k].rez+'</div>'+      
      '<div style="float:left;width:16%;height:100%;padding:0px;text-align:right;background:none;">'+JBE_FORMAT_INT_TO_STR(arr[k].balance)+'</div>'+
      '<div style="float:right;width:16%;height:100%;overflow:auto;padding:0px;text-align:right;background:none;">'+arr[k].locname+'</div>'+      
    '</div>';
    v_total++;    
  }
  dtl+='</div>';

  document.getElementById('id_expire').innerHTML=JBE_FORMAT_INT_TO_STR(v_total);  
  document.getElementById('dtl_expire').innerHTML=dtl;
  document.getElementById('dtl_total_a').innerHTML='Amount: '+JBE_FORMAT_DOUBLE_TO_STR(v_amount);
  document.getElementById('dtl_total_q').innerHTML='Qty: '+JBE_FORMAT_INT_TO_STR(v_totqty);
  //let vborder=1; 
  //if(v_total>0){ vborder=1; }
  //document.getElementById('dtl_expire').style.border=vborder+'px solid lightgray'; 
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

function disp_storage(v_stockno,v_qty){    
  //alert('disp_storage: v_stockno: '+v_stockno);
  DB_TRANSFER2.sort(JBE_SORT_ARRAY(['type','stockno','expiry','lotno','loc']));
  if(DB_TRANSFER2.length==0){ return; }

  let v_type=document.getElementById('div_body').getAttribute('data-invty'); 
  let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');  
  
  if(!v_stockno){ JBE_HL_ROW(0,'black','white','dtl_invty','dtl2_'); }
  let line_ctr=0;
  let tot_summ=0; let tot_var=0;
  let dtl_storage='';
  let bg='white'; let sv_stockno='';  let flag=0;

  let dtl='<div style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  
  for(var k=0;k<DB_TRANSFER2.length;k++){  
    let stockno=DB_TRANSFER2[k].stockno;   
    let type=JBE_GETFLD('type',DB_STOCK,'stockno',stockno);  
    let descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',stockno);  
    let lotno=JBE_GETFLD('lotno',DB_STOCK,'stockno',stockno);
    let loc=JBE_GETFLD('loc',DB_STOCK,'stockno',stockno);
    if(type != v_type){ continue; }    
    if(v_stockno && v_stockno != stockno){ continue; }
    
    let clor='lightgray'; 
    let v_style='normal';
    let v_italic='normal';
    let v_fsize=10;
    if(DB_TRANSFER2[k].lotno==lotno && DB_TRANSFER2[k].loc==loc){ clor='green'; v_style='bold'; v_italic='italic'; v_fsize=11; }

    line_ctr++;

    if(sv_stockno != stockno){ 
      sv_stockno=stockno;
      if(flag==0){ 
        bg='white'; flag=1; 
      }else{ 
        bg='gray'; flag=0; 
      }
    }

    let v_expiry=JBE_DATE_FORMAT(DB_TRANSFER2[k].expiry,'YYYY-MM-DD');
    if(JBE_MOBILE){ v_expiry=v_expiry.substring(0,7); }

    dtl_storage+=
    '<div id="dtl_st_'+line_ctr+'" class="dtls_storage" data-clor="black" data-bg="none" onclick="JBE_HL_ROW('+line_ctr+',&quot;black&quot;,&quot;white&quot;,&quot;dtl_location&quot;,&quot;dtl_st_&quot;);document.getElementById(&quot;div_body&quot;).setAttribute(&quot;data-row2&quot;,'+line_ctr+');" ondblclick="launch_transfer(&quot;'+DB_TRANSFER2[k].stockno+'&quot;,&quot;'+DB_TRANSFER2[k].lotno+'&quot;,&quot;'+DB_TRANSFER2[k].loc+'&quot;)" style="width:100%;height:20px;text-align:center;cursor:context-menu;font-size:11px;padding:3px;font-weight:'+v_style+';font-size:'+v_fsize+'px;font-style:'+v_italic+';border:1px solid gray;background-color:'+bg+';">'+      
      '<div style="float:left;width:25%;height:100%;overflow:auto;padding:0px;background:none;margin:0;text-align:left;">'+descrp+'</div>'+
      '<div style="float:left;width:18%;height:100%;padding:0px;margin:0;background:none;color:cyan;"><a href="javascript:launch_bincard(&quot;'+DB_TRANSFER2[k].stockno+'&quot;,&quot;'+DB_TRANSFER2[k].lotno+'&quot;,&quot;&quot;);" style="color:blue;">'+DB_TRANSFER2[k].lotno+'</a></div>'+
      '<div style="float:left;width:17%;height:100%;padding:0px;margin:0;background:none;">'+v_expiry+'</div>'+
      '<div style="float:left;width:15%;height:100%;padding:0px;margin:0;background:none;"><a href="javascript:launch_rr(&quot;'+DB_TRANSFER2[k].refno+'&quot;);" style="color:magenta;">'+DB_TRANSFER2[k].refno+'</a></div>'+
      '<div style="float:left;width:10%;height:100%;padding:0px;margin:0;background:none;"><a href="javascript:launch_bincard(&quot;'+DB_TRANSFER2[k].stockno+'&quot;,&quot;'+DB_TRANSFER2[k].lotno+'&quot;,&quot;'+DB_TRANSFER2[k].loc+'&quot;);" style="color:orange;">'+DB_TRANSFER2[k].locname+'</a></div>'+
      '<div id="dtl_qty_st_'+line_ctr+'" style="float:right;width:15%;height:100%;text-align:right;background:none;">'+JBE_FORMAT_INT_TO_STR(DB_TRANSFER2[k].balance)+'</div>'+
    '</div>';
    tot_summ+=DB_TRANSFER2[k].balance;    
  }
  dtl+='</div>';
  //tot_var=v_qty-tot_summ;
  let lbl_var='';
  //if(tot_var){ lbl_var='{ '+JBE_FORMAT_INT_TO_STR(tot_var)+' }'; }
  document.getElementById('dtl_location').innerHTML=dtl_storage;
  document.getElementById('tot_summ').innerHTML='[ '+JBE_FORMAT_INT_TO_STR(tot_summ)+' ]';
  //document.getElementById('tot_var').innerHTML=lbl_var;
  let dv_hd=document.getElementById('hd_location');
  let dv_dt=document.getElementById('dtl_location');
  dv_hd.style.width=dv_dt.clientWidth+'px';
  show_tot_var(v_stockno);
}

function show_tot_var(v_stockno){
  if(!v_stockno){ document.getElementById('tot_var').innerHTML=''; return; }

  let totvar=0;
  let row=document.getElementById('div_body').getAttribute('data-row'); 
  let div=document.getElementById('dtl2_bal_'+row);
  if(!div){ return; }

  let mqty=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl2_bal_'+row).innerHTML);   
  let li=document.getElementsByClassName('dtls_storage');   
  for(var i=1;i<=li.length;i++){
    totvar+=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_qty_st_'+i).innerHTML);
  }
  totvar=totvar-mqty;
  document.getElementById('tot_var').innerHTML=iif(totvar==0,'','{ '+JBE_FORMAT_INT_TO_STR(totvar)+' }');
}

function launch_bincard(stockno,lotno,loc){
  document.getElementById('div_body').setAttribute('data-lotno',lotno);  
  rp_bincard(stockno,lotno,loc);
  //console.log('launch loc:'+loc);  
  document.getElementById('fil_loc').setAttribute('data-loc',loc);
  document.getElementById('fil_loc').value=iif(loc,JBE_GETFLD('name',DB_WHOUSE,'whcode',loc),'');
  document.getElementById('fil_vax').setAttribute('data-stockno',stockno);
  document.getElementById('fil_vax').value=JBE_GETFLD('descrp',DB_STOCK,'stockno',stockno);
  document.getElementById('fil_lotno').setAttribute('data-lotno',lotno);
  document.getElementById('fil_lotno').value=lotno;
  document.getElementById('div_opt').setAttribute('data-opt',0);
  document.getElementById('dvRange').disabled=true;  
  show_datefrom_bincard(false);
}

function launch_rr(stockno){
  fm_receive('JBE_CLOSE_VIEW2');
  document.getElementById('tx_trano').value=stockno;
  FM_DISP_REC(stockno);
}

function launch_transfer(stockno,lotno,loc){
  document.getElementById('div_body').setAttribute('data-lotno',lotno);  
  fm_transfer('JBE_CLOSE_VIEW2');
  let li=document.getElementsByClassName('dtls');    
  for(var i=1;i<=li.length;i++){
    let li_stockno=document.getElementById('dtl_stockno_'+i).innerHTML;    
    let li_lotno=document.getElementById('dtl_lotno_'+i).innerHTML;    
    let li_loc=document.getElementById('dtl_loc_'+i).innerHTML;    
    //console.log(i+']   li_stockno : '+li_stockno+'  li_lotno:'+li_lotno);    
    //if(i>2){ break; }
    if(li_stockno == stockno && li_lotno==lotno && li_loc==loc){      
      let running=JBE_GETFLD('lotno',DB_STOCK,'stockno',stockno);
      //document.getElementById('dtl_'+i).style.color=iif(lotno==running,'black','white');
      document.getElementById('dtl_'+i).style.color='white';
      document.getElementById('dtl_'+i).style.backgroundColor='black';
      document.getElementById('dtl_'+i).scrollIntoView();    
      //FM_hl_row(i);
      
      FM_BTN_LEVEL=2;
      edit_fm_transfer(FM_BTN_LEVEL);
      document.getElementById('div_FM_dtl_div2').setAttribute('data-row',i);    
      //JBE_HL_ROW(i,'black','white','dtl_storage','dtl_');
      //JBE_HL_ROW(i,'black','white','dtl_location','dtl_');      
      FM_EDIT_REC();
      break;
    }    
  }
}

function chg_invty(){
  var flds=[    
    { title:"Product Description", fld:"prodname", type:"text", width:"50%", align:"center" },
    { title:"Code", fld:"prodno", type:"text", width:"25%", align:"center" },
    { title:"Type", fld:"type", type:"text", width:"25%", align:"center" }
  ];
  //FM_LOOKUP(true,fil_vax.value,newArr,[],'LOOKUP3','do_lu_prod_daily','prodname',flds,'prodno');
  let v_desc=document.getElementById('lbl_invty').innerHTML;
  var ob=[
    { val:v_desc, fld:"prodname" }
  ];
  
  FM_LOOKUP2(true,v_desc,ob,DB_PRODUCT,['*descrp'],'LOOKUP','do_lu_prod_invty',flds);
}
function do_lu_prod_invty(ndx){	
  if(ndx == -1){ 
    return; 
  }
  let val=document.getElementById('dd_type'+ndx).innerHTML;
  document.getElementById('div_body').setAttribute('data-invty',val);
  disp_invty(false);
}

function retNDX(s,arr){
  //console.log('retNDX search:'+s+' arrname:'+arr.name);
  let rval=-1;
  for(var ii=0;ii<arr.length;ii++){
    if(arr[ii]==s){ rval=ii; break; }
  }  
  return rval;
}

function disp_chart(curdate){
  //let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD');  
  //alert(curdate);
  let arr=[]; let ctr_arr=0;
  let arr_stock=[];
  let arr_descrp=[];
  let arr_qty=[];
  let arr_area=[]; let ctr_arr_area=0;

  for(var i=0;i<DB_PTR2.length;i++){
    let v_date=JBE_DATE_FORMAT(DB_PTR2[i].ptrdate,'YYYY-MM-DD');
    if(v_date != curdate) { continue; }
    
    let v_stockno=DB_PTR2[i].stockno;
    let v_descrp=JBE_GETFLD('descrp',DB_STOCK,'stockno',v_stockno);
    let v_qty=parseInt(DB_PTR2[i].qty);

    let v_areano=DB_PTR2[i].areano;
    let v_areaname=JBE_GETFLD('name',DB_AREA,'areano',v_areano);
    let ob={
      "stockno":v_stockno,
      "areano":v_areano,
      "areaname":v_areaname,
      "qty":v_qty
    }
    arr_area[ctr_arr_area]=ob; ctr_arr_area++;
    
    let v_ndx = retNDX(v_stockno,arr_stock);
    //console.log('v_ndx:'+v_ndx);
    if(v_ndx == -1){ //not found
      arr_stock[ctr_arr]=v_stockno; 
      arr_descrp[ctr_arr]=v_descrp; 
      arr_qty[ctr_arr]=v_qty; 
      ctr_arr++;          
    }else{    //found
      arr_qty[v_ndx]=parseInt(arr_qty[v_ndx])+v_qty; 
    }
  }

  let aryVax=[]; let ctr_aryVax=0;
  for(var i=0;i<arr_qty.length;i++){
    let ob={
      "stockno":arr_stock[i],
      "descrp":arr_descrp[i],
      "qty":arr_qty[i],
      "bg":colorScheme[i]
    };
    aryVax[ctr_aryVax]=ob; ctr_aryVax++;
  }

  aryVax.sort(JBE_SORT_ARRAY(['*qty']));
  //arr_qty.sort(sortByMultipleKey(['q','username']));
  //arr_qty.sort(function(a, b){return b - a});
  let dtl='<div style="width:100%;height:100%;padding:0px;overflow:auto;border:0px solid lightgray;background:none;">';
  let v_total=0;
  for(var j=0;j<aryVax.length;j++){
    let dumStockno=aryVax[j].stockno;
    let tooltip=get_ch_area(dumStockno,arr_area);
    dtl+=
    '<div title="'+tooltip+'"style="width:100%;height:20px;cursor:context-menu;text-align:left;font-size:11px;padding:3px;border:1px solid lightgray;background:'+aryVax[j].bg+';">'+            
      '<div style="float:left;width:70%;height:100%;overflow:auto;padding:0px;background:none;">'+aryVax[j].descrp+'</div>'+      
      '<div style="float:right;width:30%;height:100%;padding:0px;text-align:right;background:none;">'+JBE_FORMAT_INT_TO_STR(aryVax[j].qty)+'</div>'+
    '</div>';
    v_total++;
  }
  dtl+='</div>';
  document.getElementById('dtl_chart').innerHTML=dtl;
  //let vborder=1; 
  //if(v_total>0){ vborder=1; }
  //document.getElementById('dtl_chart').style.border=vborder+'px solid lightgray'; 

  document.querySelector("#id_chart").innerHTML = '<canvas id="myPieChart" width="150" height="100" style="margin:0 auto;border:0px solid red;"></canvas>';
  let ctx = document.getElementById('myPieChart').getContext('2d');
  let myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      //labels: ['Red', 'Blue'],
      labels: arr_descrp,
      datasets: [{
        //data: [12, 19],
        data: arr_qty,
        /*
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],       
        
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        */
        backgroundColor:colorScheme,
        borderColor:colorScheme,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
        },
        tooltip: {
          enabled: true,
        },
      }
    }
  });
  /// sub func
  function get_ch_area(stockno,area_arr){    
    let rval='';
    for(var ix=0;ix<area_arr.length;ix++){      
      //console.log('>>> '+area_arr[ix].stockno);
      if(area_arr[ix].stockno != stockno){ continue; }

      rval+=area_arr[ix].areaname+' [ Qty: '+area_arr[ix].qty+' ]\n';
    }
    //rval=ptrno+' [ '+areaname+' ]\n\n'+rval;
    return rval;
  }
}

function show_notes(){
  let ctr_today=0;  let dtl_today='';
  let ctr_tomm=0;   let dtl_tomm='';
  let ctr_seven=0;  let dtl_seven='';
  let f_show=false;
  
  axios.get('/api/get_all', { params: {tbl:'notif2'} })
  .then(function (response) { 
    DB_NOTIF2=response.data;
    let curdate=JBE_DATE_FORMAT(document.getElementById('hd_date').innerHTML,'YYYY-MM-DD'); 
     
    for(var i=0;i<DB_NOTIF2.length;i++){  
      let vdate=JBE_DATE_FORMAT(DB_NOTIF2[i].date,'YYYY-MM-DD');
      if(!vdate || vdate < curdate){ continue; }

      let diff=JBE_DATE_SUBSTRACT_DAYS(vdate,curdate);
      if(diff > 7){ continue; }

      let wday = weekday[new Date(vdate).getDay()].substring(0,3);

      if(diff==0){         
        ctr_today++; 
        dtl_today+='\u25C6 '+DB_NOTIF2[i].msg+'\n';        
      }else if(diff==1){         
        ctr_tomm++; 
        //dtl_tomm+=ctr_tomm.toString().padStart(2,' ')+'.) '+DB_NOTIF2[i].msg+'\n\n';        
        dtl_tomm+='\u25C6 '+DB_NOTIF2[i].msg+'\n';        
      }else if(diff > 1 && diff <= 7){ 
        ctr_seven++; 
        dtl_seven+='\u25C6 '+JBE_DATE_FORMAT(DB_NOTIF2[i].date,'MMM DD, YYYY')+' ['+wday+'] \u2B9E\u2B9E '+DB_NOTIF2[i].msg+'\n';     
      }      
      //console.log(diff+'::: vdate:'+vdate+' curdate:'+curdate);
    }
    //console.log('ctr_today:'+ctr_today);
    //console.log('ctr_tomm:'+ctr_tomm);
    //console.log('ctr_seven:'+ctr_seven);
    document.getElementById('hd_num1').innerHTML=ctr_today;
    document.getElementById('hd_num2').innerHTML=ctr_tomm;
    document.getElementById('hd_num3').innerHTML=ctr_seven;
    document.getElementById('hd_num1').title='TODAY:\n'+dtl_today;
    document.getElementById('hd_num2').title='TOMORROW:\n'+dtl_tomm;
    document.getElementById('hd_num3').title='COMING:\n'+dtl_seven;
      
    document.getElementById('hd_num1').style.display=iif(ctr_today > 0,'block','none');
    document.getElementById('hd_num2').style.display=iif(ctr_tomm > 0,'block','none');
    document.getElementById('hd_num3').style.display=iif(ctr_seven > 0,'block','none');
    let ctr=ctr_today+ctr_tomm+ctr_seven;
    document.getElementById('hd_notif').style.display=iif(ctr > 0,'block','none');
  })    
  .catch(function (error) { console.log(error); });   
}