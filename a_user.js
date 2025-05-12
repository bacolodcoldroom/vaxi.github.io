function fm_user(){  
  FM_TRANS='USER';
  FM_FM_MODE=1;
  FM_TABLE=DB_USER;  FM_TABLE_NAME='user';  FM_RKEY='usercode';
  FM_CB='';
  //FM_TABLE2=DB_RECEIVE2;

  FM_FIELDS=[ //display on screen
    { div:"tx_usercode", fld:"usercode", type:"text", disp:1, save:true },
    { div:"tx_username", fld:"username", type:"text", disp:1, save:true },
    { div:"tx_userid", fld:"userid", type:"text", disp:1, save:true },
    { div:"tx_pword", fld:"pword", type:"text", disp:1, save:true }
  ];
    
  var fm_ob = {
    title:"USER MASTER FILE",  
    title2:"USER",
    width:"800px",height:"970px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
    
  var fm_layout=    
    '<div id="div_FM_head" style="width:100%;height:500px;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+
    
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span onclick="JBE_SHOW_LOGGER(tx_usercode.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">User Code:</span>'+                     
          '<input id="lu_usercode" type="image" src="gfx/jsearch.png" onclick="look_usercode(tx_usercode.value)" />'+
        '</div>'+
        '<input id="tx_usercode" type="text" disabled data-caption="Stock Code" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_usercode.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span style="cursor:help;">User Name:</span>'+                     
        '</div>'+
        '<input id="tx_username" type="text" data-caption="User Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span" style="cursor:help;">User ID:</span>'+                     
        '</div>'+
        '<input id="tx_userid" type="text" data-caption="User Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span" style="cursor:help;">Password:</span>'+                     
        '</div>'+
        '<input id="tx_pword" type="text" data-caption="User Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+
            
    '</div>';
  
  FM_FUNC={
    look:"look_fm_user",
    init:"init_fm_user",
    add:"add_fm_user",
    edit:"edit_fm_user",
    del:"del_fm_user",
    disp:"disp_fm_user",
    save:"save_fm_user",
    quit:"quit_fm_user"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function look_usercode(){
  //{ "title":"Product Name", "width":"60%", "align":"left" },
  var flds=[
    { title:"User Code", fld:"usercode", type:"text", width:"20%", align:"left" },
    { title:"Username", fld:"username", type:"text", width:"40%", align:"left" },
    { title:"User ID", fld:"userid", type:"text", width:"20%", align:"center" },
    { title:"Password", fld:"pword", type:"text", width:"20%", align:"center" }
  ];
  //FM_LOOKUP(true,tx_username.value,FM_TABLE,[],'AREA LOOKUP','lookup_fm_user','name',flds,FM_RKEY);
  var ob=[
    { val:tx_usercode.value, fld:"usercode" }
  ];
  FM_LOOKUP(true,tx_username.value,ob,FM_TABLE,[],'LOOKUP','lookup_fm_user',flds);
}

function lookup_fm_user(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_usercode'+ndx).innerHTML;
  document.getElementById('tx_usercode').value=val;
  document.getElementById('tx_username').value=document.getElementById('dd_username'+ndx).innerHTML;
  document.getElementById('tx_userid').value=document.getElementById('dd_userid'+ndx).innerHTML;
  document.getElementById('tx_pword').value=document.getElementById('dd_pword'+ndx).innerHTML;
  FM_DISP_REC(val); 
  disp_fm_user();
}
//
function init_fm_user(){  
  document.getElementById('tx_usercode').value='';
  document.getElementById('lu_usercode').disabled=false;
  document.getElementById('lu_usercode').style.opacity='1';
}
//
function add_fm_user(){
  document.getElementById('tx_usercode').value='';
  document.getElementById('lu_usercode').disabled=true;
  document.getElementById('lu_usercode').style.opacity='0.5';
  document.getElementById('tx_username').focus();
}
//edit
function edit_fm_user(){  
  document.getElementById('lu_usercode').disabled=true;
  document.getElementById('lu_usercode').style.opacity='0.5';
  document.getElementById('tx_username').focus();
  console.log('edit_fm_user');
}
//look
function look_fm_user(){
    disp_fm_user();
}
//del
function del_fm_user(stat,r){
  //alert('stat :'+stat+' r:'+r);
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_INVTY,FM_RKEY,document.getElementById('tx_usercode').value,FM_RKEY);
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in RIS No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_USER=r; } 
}
//save
function save_fm_user(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_usercode').value;    
  if(stat==2){
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_stock" }
      ];
      //uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    DB_USER=r; 
    console.log('======save area:',DB_USER);
  }
}
//disp
function disp_fm_user(){   
  //alert('disp_fm_user '+disp_mode);
  console.log('disp_fm_user:',DB_USER);
  var n = new Date().toLocaleTimeString('it-IT'); 
  document.getElementById('lu_usercode').disabled=false;
  document.getElementById('lu_usercode').style.opacity='1';    
}

//quit
function quit_fm_user(){   
  console.log('quit_fm_user:',DB_USER);
  fm_dashboard(false);
}

