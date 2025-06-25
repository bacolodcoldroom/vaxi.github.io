function fm_stock(){  
  //get_app_default();
  FM_TRANS='STK';
  FM_FM_MODE=2;
  FM_REC2_EMPTY=true;
  
  FM_TABLE=DB_STOCK_INVTY;  FM_TABLE_NAME='stock_invty';  FM_RKEY='stockno';
  FM_TABLE2=DB_STOCK_INVTY2;  FM_TABLE_NAME2='stock_invty2'; FM_RKEY='stockno';

  FM_CB='';

  FM_FIELDS=[ //display on screen
    { div:"tx_stockno", fld:"stockno", type:"text", disp:1, save:true },
    { div:"tx_descrp", fld:"descrp", type:"text", disp:1, save:true },
    { div:"tx_area_rank", fld:"rank", type:"text", disp:1, save:true },
    { div:"tx_area_cat", fld:"cat", type:"text", disp:0, save:false }
  ];
  
  FM_FIELDS2=[ //display on screen
    { hd:"", fld:"stockno", type:"text", input:false, width:"10%", align:"center", dupli:1, err:"Please enter Vaccine", disp:0, save:true },    
    { hd:"Lot No.", fld:"lotno", type:"text", input:true, width:"34%", align:"center", dupli:1, err:"Please enter Lot No.", disp:1, save:true },    
    { hd:"Expiry", fld:"expiry", type:"date", input:true, width:"33%", align:"center", dupli:0, err:"Please enter Expiry", disp:1, save:true },
    { hd:"Required", fld:"req", type:"number", input:true, width:"33%", align:"center", dupli:0, err:"Please enter Requirement", disp:1, save:true }
  ];
    
  var fm_ob = {
    title:"VACCINE INVENTORY MASTER FILE",  
    title2:"STOCK",
    width:"800px",height:"270px",
    head:"100px", foot:"0px",
    foot:0
  };  
  FM_TITLE=fm_ob.title;
  
  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout_width='15';
  if(JBE_MOBILE){ fm_layout_width='33'; }
    
  var fm_layout=    
    '<div id="div_FM_head" style="width:100%;height:100px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+
    
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span onclick="JBE_SHOW_LOGGER(tx_stockno.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Stock Code:</span>'+                     
          '<input id="lu_stockno" type="image" src="gfx/jsearch.png" onclick="look_stockno(tx_stockno.value)" />'+
        '</div>'+
        '<input id="tx_stockno" type="text" disabled data-caption="Stock Code" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_stockno.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span onclick="JBE_SHOW_LOGGER(tx_stockno.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Description:</span>'+                     
        '</div>'+
        '<input id="tx_descrp" type="text" data-caption="Stock Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_descrp.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+        
        '<div style="float:left;width:50%;height:100%;background:none;">'+
          '<span style="float:left;width:50%;text-align:right;padding:4px 10px 0 0;">Rank</span><input id="tx_area_rank" style="float:left;width:50%;text-align:center;" type="number" />'+
        '</div>'+
        '<div style="float:left;width:50%;height:100%;background:none;">'+
          '<span style="float:left;width:50%;text-align:right;padding:4px 10px 0 0;">Category</span><input id="tx_area_cat" style="float:left;width:50%;text-align:center;" type="number" />'+
        '</div>'+
      '</div>'+
      
    '</div>';
  
  FM_FUNC={
    look:"look_fm_stock",
    init:"init_fm_stock",
    add:"add_fm_stock",
    add_item:"add_item_fm_stock",
    edit:"edit_fm_stock",
    del:"del_fm_stock",
    disp:"disp_fm_stock",
    save:"save_fm_stock",
    quit:"quit_fm_stock"
  }
  FM_MAIN(fm_ob,fm_layout);
} 

function look_stockno(){
  //{ "title":"Product Name", "width":"60%", "align":"left" },
  var flds=[
    { title:"Stock No", fld:"stockno", type:"text", width:"20%", align:"left" },
    { title:"Description", fld:"descrp", type:"text", width:"40%", align:"left" },
    { title:"Ranking", fld:"rank", type:"text", width:"20%", align:"center" },
    { title:"Category", fld:"cat", type:"text", width:"20%", align:"center" }
  ];
  //FM_LOOKUP(true,tx_descrp.value,FM_TABLE,[],'AREA LOOKUP','lookup_fm_stock','name',flds,FM_RKEY);
  var ob=[
    { val:tx_stockno.value, fld:"stockno" }
  ];
  FM_LOOKUP(true,tx_descrp.value,ob,FM_TABLE,['rank'],'LOOKUP','lookup_fm_stock',flds);
}

function lookup_fm_stock(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  document.getElementById('tx_stockno').value=val;
  document.getElementById('tx_descrp').value=document.getElementById('dd_descrp'+ndx).innerHTML;
  FM_DISP_REC(val); 
  disp_fm_stock();
}
//
function init_fm_stock(){  
  document.getElementById('tx_stockno').value='';
  document.getElementById('lu_stockno').disabled=false;
  document.getElementById('lu_stockno').style.opacity='1';
}
//
function add_fm_stock(){
  document.getElementById('tx_stockno').value='';
  document.getElementById('lu_stockno').disabled=true;
  document.getElementById('lu_stockno').style.opacity='0.5';
  document.getElementById('tx_descrp').focus();
}
//edit
function edit_fm_stock(){  
  document.getElementById('lu_stockno').disabled=true;
  document.getElementById('lu_stockno').style.opacity='0.5';
  document.getElementById('tx_descrp').focus();
  console.log('edit_fm_stock');
}

function clear_add_item_fm_stock(){
  document.getElementById('txt_stockno').innerHTML='';
  document.getElementById('txt_lotno').value='';
  document.getElementById('txt_loc').value='';
  document.getElementById('txt_descrp').innerHTML='';
}

function lookup_stock_fm_stock(){  
  /*
  let areano=document.getElementById('tx_areano').innerHTML;
  if(!areano){
    snackBar('Please enter Sub-Area first...');
    return;
  }
  */
    
  var flds=[        
    { title:"", fld:"stockno", type:"text", width:"0%", align:"center" },
    //{ title:"", fld:"expiry", type:"date", width:"0%", align:"center" },
    { title:"", fld:"cost", type:"double", width:"0%", align:"center" },    
    { title:"", fld:"refno", type:"text", width:"15%", align:"center" },
    { title:"Vaccine", fld:"descrp", type:"text", width:"25%", align:"center" },
    { title:"Lot No", fld:"lotno", type:"text", width:"18%", align:"center" },
    { title:"Expiry", fld:"expiry", type:"date", width:"15%", align:"center" },
    { title:"RSI Date", fld:"date_rel", type:"date", width:"15%", align:"center" },
    { title:"Qty", fld:"qty", type:"number", width:"7%", align:"center" },
    { title:"Ref-No", fld:"trano", type:"text", width:"20%", align:"center" }    
  ];
  
  //alert('tx_areano.value:'+tx_areano.value);
  var newArr1 = DB_PTR2.filter(function(DB_PTR2) {
    return DB_PTR2.areano == tx_areano.value;
  });
  
  /*
  alert('lookup'+
    '\nv_areano:'+tx_areano.value+
    '\nv_stockno:'+txt_stockno.innerHTML+
    '\nv_lotno:'+txt_lotno.value+
    '\nv_cost:'+txt_req.value+
    '\nv_amt:'+txt_amount.innerHTML+
    '\nv_loc:'+txt_loc.value+
    '\nv_refno:'+txt_refno.innerHTML
  );
  */
  
  var ob=[
    { val:txt_stockno.innerHTML, fld:"stockno" },
    { val:txt_lotno.value, fld:"lotno" },
    { val:txt_refno.innerHTML, fld:"trano" }
  ];
  FM_LOOKUP2(true,txt_descrp.innerHTML,ob,newArr1,['*trano','*date','descrp'],'LOOKUP','do_lookup_stock_fm_stock',flds,'fld_color_rt');
}

function fld_color_rt(){
  var len_look=document.querySelectorAll('.cls_names').length; 
  for(var i=0;i<len_look;i++){
    let v_trano=document.getElementById('dd_trano'+i).innerHTML;
    console.log('*** fld_color_rt: '+v_trano);
    if(!v_trano || v_trano===undefined){ document.getElementById('d_'+i).style.color='blue'; }
  }
}

function do_lookup_stock_fm_stock(ndx){	  
  if(ndx == -1){ 
    clear_add_item_fm_stock();    
    return; 
  }  
  let val=document.getElementById('dd_stockno'+ndx).innerHTML;
  let lotno=document.getElementById('dd_lotno'+ndx).innerHTML;
  let ptr_qty=document.getElementById('dd_qty'+ndx).innerHTML;
  let qty=document.getElementById('txt_qty').value;
  
  //alert('PTR Qty:'+ptr_qty+'\nRET Qty:'+txt_qty.value+'\nTOTAL:'+(ptr_qty*qty));
  let cost=Number(document.getElementById('dd_cost'+ndx).innerHTML);
  if(!cost){
    cost=JBE_GETFLD2('cost',DB_RECEIVE2, [
      { "fld":"stockno","val":val },
      { "fld":"lotno","val":lotno }
    ]);
    txt_amount.innerHTML=qty*cost;
  }
  //alert('cost:'+cost+'\nQty:'+qty+'\nAmt:'+txt_amount.innerHTML);
  document.getElementById('txt_stockno').innerHTML=val;
  document.getElementById('txt_lotno').value=lotno
  document.getElementById('txt_descrp').innerHTML=document.getElementById('dd_descrp'+ndx).innerHTML;
  let vtype=JBE_GETFLD('type',DB_STOCK,'stockno',val);
  document.getElementById('txt_expiry').value=document.getElementById('dd_expiry'+ndx).innerHTML;
  document.getElementById('txt_req').value=cost;
  document.getElementById('txt_refno').innerHTML=document.getElementById('dd_trano'+ndx).innerHTML;  
  document.getElementById('txt_ptr_qty').innerHTML=ptr_qty;  
  if(qty){ chg_qty_fm_stock(qty); }  
}

//
function init_fm_stock(){  
  document.getElementById('tx_stockno').value='';
  document.getElementById('lu_stockno').disabled=false;
  document.getElementById('lu_stockno').style.opacity='1';
}

function xxxadd_fm_stock(){  
  let prfx='RET ';
  //let last_trano='1';
  //let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');  
  //let sql='SELECT * FROM '+FM_TABLE_NAME+' ORDER BY trano';
  let sql='SELECT * FROM ret ORDER BY trano';
  axios.get('/api/fmlib_get', { params: {sql:sql} })
  .then(function (response) { 
    let newArr=response.data;
    var last_trano='1';
    let last_date=new Date();
    let v_date=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
    if(newArr.length > 0){ 
      last_trano=newArr[newArr.length-1].trano; 
      last_date=JBE_DATE_FORMAT(newArr[newArr.length-1].date,'YYYY-MM-DD');
      if(last_date > v_date){v_date=last_date; }
      //v_date=last_date;
      document.getElementById('tx_date').value=v_date;  
    }
    var new_trano=prfx+v_date;
    var v_num=0;
     
    if(last_trano.substring(0,14) == new_trano){
      v_num=parseInt(last_trano.substring(15,17))+1;
    }else{
      v_num=1;
    }
    new_trano=new_trano+'-'+v_num.toString().padStart(2,0);  
    console.log('ret new trano: '+new_trano);

    document.getElementById('tx_stockno').value=new_trano;  
    document.getElementById('tx_stockno').disabled=false;
    //document.getElementById('btn_name').disabled=false;
    document.getElementById('tx_stockno').setAttribute('data-docno',new_trano);
        
    FM_FORCE_ADDREC(FM_TRANS,new_trano,'edit_fm_stock','tx_stockno');    
  })    
  .catch(function (error) { console.log(error); });
}
//

function add_item_fm_stock(f_add){
  var curRow=document.getElementById('div_FM_dtl_div2').getAttribute('data-row');
  var recno=document.getElementById('tx_stockno').value;
 // var v_areaname=document.getElementById('tx_areaname').value;
  //var v_date=document.getElementById('tx_date').value;
  /*
  if(!recno){ 
    snackBar('Ref. No. is Empty.');
    document.getElementById('tx_stockno').focus();
    return false;
  }
  if(!v_date){ 
    snackBar('Date is Empty.');
    document.getElementById('tx_date').focus();
    return false;
  }

  if(!v_areaname){ 
    snackBar('Sub Area is Empty.');
    //document.getElementById('tx_stockno').focus();
    return false;
  }
  */
  var len_dtls=document.querySelectorAll('.dtls').length;   
  if(len_dtls==0 && !f_add){ 
    snackBar('Cannot Edit empty record');
    return false;
  }

  let v_stockno=recno;
  let v_lotno='';
  let v_expiry=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  let v_req='';

  if(!f_add){
    v_lotno=document.getElementById('dtl_lotno_'+curRow).innerHTML;
    v_expiry=JBE_DATE_FORMAT(document.getElementById('dtl_expiry_'+curRow).innerHTML,'YYYY-MM-DD');
    v_req=JBE_FORMAT_STR_TO_NUMBER(document.getElementById('dtl_req_'+curRow).innerHTML);
  }

  let v_head='Add';
  if(!f_add){ v_head='Edit'; }

  var dtl=          
    '<div id="div_name" data-zoom=0 style="width:100%;height:100%;font-text:14px;padding:5px;background-color:white;">'+      
    
      '<div style="width:100%;height:25px;padding:4px;font-size:14px;font-weight:bold;color:white;background:'+JBE_CLOR2+';">'+
        '<span style="float:left;width:auto;">'+v_head+' Item</span>'+
        '<span style="float:right;width:auto;">Stock Return Facility</span>'+        
      '</div>'+    
    
      '<div class="class_mtr0" style="display:none;margin-top:5px;">'+
        '<span id="txt_stockno" class="class_mtr2" style="width:50%;color:red;">'+v_stockno+'</span>'+
      '</div>'+   
  
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Lot No.:</span>'+        
        '<input type="text" id="txt_lotno" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_lotno+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Expiry:</span>'+        
        '<input type="date" id="txt_expiry" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_expiry+'" />'+
      '</div>'+ 
      '<div class="class_mtr0" style="margin-top:5px;">'+        
        '<span class="class_mtr1">Require:</span>'+        
        '<input type="number" id="txt_req" class="class_mtr2" style="color:red;overflow:auto;" value="'+v_req+'" />'+
      '</div>'+       

    '</div>';
  //JBE_OPEN_VIEW(dtl,'','');
  JBE_SHOW_MODULE(true,dtl);
  return true;
}

//edit
function edit_fm_stock(){
  document.getElementById('lu_stockno').disabled=true;
  document.getElementById('lu_stockno').style.opacity='0.5';
  document.getElementById('tx_descrp').focus();
  console.log('edit_fm_stock');
}
//look
function look_fm_stock(fld){
  if(fld=='trano'){ 
    disp_fm_stock();
    //disp_fm_stock(1);
  }  
}
//del
function del_fm_stock(stat,r){
  if(stat==2){ DB_STOCK_INVTY=r; } 
}
//save
function save_fm_stock(stat,r){
  //alert('stat :'+stat+' r:'+r.length);
  if(stat==0){
    let ob=[];
    return ob;
  }  
  if(stat==1){
    //alert('interrupted....'); return false;
    /*
    console.clear();
    var len_dtls=document.querySelectorAll('.dtls').length;    
    for(var i=1;i<=len_dtls;i++){ 
      if(!document.getElementById('fil_areano_'+i)){
        alert('new add');
        continue;
      }
      let v_loc_old=Number(document.getElementById('fil_areano_'+i).innerHTML);
      let v_loc=Number(document.getElementById('dtl_areano_'+i).innerHTML);
      alert(v_loc_old+' vs new: '+v_loc);
    }
    //return false;
    */
    //update_stocks_fm_stock(-1);
  }    
  if(stat==2){
    /*
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    */
    //console.clear();
    //alert('----alams na!!!!!!!:'+FM_FM_MODE);
    DB_STOCK_INVTY=r; 
  }
  if(stat==3){
    console.log('----show na!!2222222!!!!!:'+FM_FM_MODE);
    DB_STOCK_INVTY2=r; 
    //update_stocks_fm_stock(1);
  }
}


//disp
function disp_fm_stock(){   
  //alert('disp_fm_stock '+disp_mode);
  console.log('disp_fm_stock:',DB_STOCK_INVTY);
  var n = new Date().toLocaleTimeString('it-IT'); 
  document.getElementById('lu_stockno').disabled=false;
  document.getElementById('lu_stockno').style.opacity='1';    
}

//quit
function quit_fm_stock(){   
  console.log('quit_fm_stock:',DB_STOCK_INVTY);
  showMainPage();
}