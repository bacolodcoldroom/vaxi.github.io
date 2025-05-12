function fm_stock(){  
  FM_TRANS='STOCK';
  FM_FM_MODE=1;
  FM_TABLE=DB_STOCK_INVTY;  FM_TABLE_NAME='stock_invty';  FM_RKEY='stockno';
  FM_CB='';
  //FM_TABLE2=DB_RECEIVE2;

  FM_FIELDS=[ //display on screen
    { div:"tx_stockno", fld:"stockno", type:"text", disp:1, save:true },
    { div:"tx_descrp", fld:"descrp", type:"text", disp:1, save:true },
    { div:"tx_area_rank", fld:"rank", type:"text", disp:1, save:true },
    { div:"tx_area_cat", fld:"cat", type:"text", disp:0, save:false }
  ];
    
  var fm_ob = {
    title:"VACCINE INVENTORY MASTER FILE",  
    title2:"STOCK",
    width:"800px",height:"270px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
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
//look
function look_fm_stock(){
    disp_fm_stock();
}
//del
function del_fm_stock(stat,r){
  //alert('stat :'+stat+' r:'+r);
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_INVTY,FM_RKEY,document.getElementById('tx_stockno').value,FM_RKEY);
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in RIS No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_STOCK_INVTY=r; } 
}
//save
function save_fm_stock(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_stockno').value;    
  if(stat==2){
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    DB_STOCK_INVTY=r; 
    console.log('======save area:',DB_STOCK_INVTY);
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
  fm_dashboard(false);
}

