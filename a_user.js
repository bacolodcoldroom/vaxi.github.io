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
    { div:"tx_pword", fld:"pword", type:"text", disp:1, save:true },

    { div:"tx_areano", fld:"areano", type:"text", disp:1, save:true },
    //{ div:"tx_areaname", fld:"areano", type:"text", disp:1, save:false },

    { div:"tx_username2", fld:"username2", type:"text", disp:1, save:true },
    { div:"tx_fullname", fld:"fullname", type:"text", disp:1, save:true },
    { div:"tx_lastname", fld:"lastname", type:"text", disp:0, save:true },
    { div:"tx_firstname", fld:"firstname", type:"text", disp:0, save:true },
    { div:"tx_midname", fld:"midname", type:"text", disp:0, save:true },

    { div:"tx_addrss", fld:"addrss", type:"text", disp:1, save:true },
    { div:"tx_usertype", fld:"usertype", type:"text", disp:1, save:true },
    { div:"tx_celno", fld:"celno", type:"text", disp:1, save:true },
    { div:"tx_fb", fld:"fb", type:"text", disp:0, save:true },
    { div:"tx_email", fld:"email", type:"text", disp:0, save:true },
    { div:"tx_d_active", fld:"d_active", type:"text", disp:0, save:true },

    { div:"tx_lat", fld:"lat", type:"text", disp:0, save:true },
    { div:"tx_lng", fld:"lng", type:"text", disp:0, save:true }
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
    '<div id="div_FM_head" style="width:100%;height:100%;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div style="display:none;">'+        
        '<input id="tx_lastname" />'+
        '<input id="tx_firstname" />'+
        '<input id="tx_midname" />'+
        '<input id="tx_fb" />'+
        '<input id="tx_email" />'+
        '<input id="tx_d_active" />'+
        '<input id="tx_lat" />'+
        '<input id="tx_lng" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span onclick="JBE_SHOW_LOGGER(tx_usercode.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">User Code:</span>'+                     
          '<input id="lu_usercode" type="image" src="gfx/jsearch.png" onclick="look_usercode(tx_usercode.value)" />'+
        '</div>'+
        '<input id="tx_usercode" type="text" disabled data-caption="Stock Code" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_usercode.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl" style="height:150px;">'+ 
        '<div style="height:25px;">'+
          '<span>Photo:</span>'+
          '<input type="file" id="inpfile_stock" data-orig="" data-sel=0 name="inpfile_stock" value="" hidden="hidden" />'+ 
          '<input id="lu_stock_photo" type="image" style="display:block;background:dimgray;overflow:auto;width:auto;max-width:100%;height:auto;max-height:100%;" src="gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,inpfile_stock.id,img_user.id,&quot;putimg_user&quot;)" />'+
        '</div>'+  
        '<p>'+
          '<img id="img_user" data-img="" name="img_user" src="gfx/avatar.png" onclick="JBE_ZOOM(this.src,&quot;&quot;)" style="height:100%;width:auto;border:1px solid lightgray;"/>'+          
        '</p>'+   
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

      '<div class="cls_fm_dtl" style="margin-top:10px;">'+        
        '<div>'+          
          '<span" style="cursor:help;">Voice Name:</span>'+                     
        '</div>'+
        '<input id="tx_username2" type="text" data-caption="User Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl" style="margin-top:0px;">'+        
        '<div>'+          
          '<span" style="cursor:help;">Full Name:</span>'+                     
        '</div>'+
        '<input id="tx_fullname" type="text" data-caption="User Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl" style="margin-top:0px;">'+        
        '<div>'+          
          '<span" style="cursor:help;">Address:</span>'+                     
        '</div>'+
        '<input id="tx_addrss" type="text" data-caption="User Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl" style="margin-top:0px;">'+        
        '<div>'+          
          '<span" style="cursor:help;">Mobile Number:</span>'+                     
        '</div>'+
        '<input id="tx_celno" type="text" data-caption="User Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl" style="margin-top:0px;">'+        
        '<div>'+          
          '<span" style="cursor:help;">User Type:</span>'+                     
        '</div>'+
        '<input id="tx_usertype" type="number" data-caption="User Name" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span style="cursor:help;">Barangay:</span>'+                     
          '<input id="lu_areano" type="image" src="gfx/jsearch.png" onclick="look_areano_fm_user(tx_areano.value)" />'+
        '</div>'+
        '<input id="tx_areano" type="text" style="display:none;" />'+
        '<input id="tx_areaname" disabled type="text" value="" />'+
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

function look_areano_fm_user(){  
  var flds=[
    { title:"Area Code", fld:"areano", type:"text", width:"50%", align:"left" },
    { title:"Area Name", fld:"name", type:"text", width:"50%", align:"left" }
  ];
  //FM_LOOKUP(true,tx_username.value,FM_TABLE,[],'AREA LOOKUP','lookup_fm_user','name',flds,FM_RKEY);
  var ob=[
    { val:tx_areano.value, fld:"areano" }
  ];
  FM_LOOKUP(true,tx_areaname.value,ob,DB_AREA,[],'LOOKUP','lookup_areano_fm_user',flds);
}

function lookup_areano_fm_user(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_areano'+ndx).innerHTML;
  document.getElementById('tx_areano').value=val;
  document.getElementById('tx_areaname').value=document.getElementById('dd_name'+ndx).innerHTML;
  //FM_DISP_REC(val); 
  //disp_fm_user();
}
//
function init_fm_user(){  
  document.getElementById('tx_usercode').value='';  
  document.getElementById('lu_usercode').disabled=false;
  document.getElementById('lu_usercode').style.opacity='1';
  document.getElementById('lu_areano').disabled=true;
  document.getElementById('lu_areano').style.opacity='0.5';    
  document.getElementById('tx_areaname').value='';
  document.getElementById('lu_stock_photo').disabled=true;
  document.getElementById('lu_stock_photo').style.opacity='0.5';
  document.getElementById('img_user').src='./gfx/avatar.png'; 
}
//
function add_fm_user(){
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];  
  var usercode='U_'+vDate+'_'+vTime;
  usercode = usercode.replace(/-/g, "").replace(/:/g, "").replace("T", "-");   
  document.getElementById('tx_usercode').disabled=true;
  document.getElementById('tx_usercode').value=usercode;
  document.getElementById('lu_usercode').disabled=true;
  document.getElementById('lu_usercode').style.opacity='0.5';
  document.getElementById('lu_stock_photo').disabled=false;
  document.getElementById('lu_stock_photo').style.opacity='1';
  document.getElementById('img_user').src='./gfx/avatar.png'; 
  document.getElementById('tx_username').focus();
}
//edit
function edit_fm_user(){  
  document.getElementById('lu_usercode').disabled=true;
  document.getElementById('lu_usercode').style.opacity='0.5';  
  document.getElementById('lu_areano').disabled=false;
  document.getElementById('lu_areano').style.opacity='1';    
  document.getElementById('lu_stock_photo').disabled=false;
  document.getElementById('lu_stock_photo').style.opacity='1';
  document.getElementById('tx_username').focus();
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
async function save_fm_user(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_usercode').value;    
  if(stat==2){
    console.log('save recno:',recno);
    let photo=document.getElementById('img_user').src;     
    if(JBE_CLOUD){ await jeff_uploadImage(photo,'vaxi/images/'+recno+'.jpg'); }
    DB_USER=r; 
    console.log('======save DB_USER:',DB_USER);
  }
}
//disp
async function disp_fm_user(){   
  var recno=document.getElementById('tx_usercode').value;      
  //alert('disp_fm_user '+disp_mode);
  console.log('recno:',recno);
  var n = new Date().toLocaleTimeString('it-IT'); 
  document.getElementById('lu_usercode').disabled=false;
  document.getElementById('lu_usercode').style.opacity='1';    
  document.getElementById('lu_areano').disabled=true;
  document.getElementById('lu_areano').style.opacity='0.5';    
  document.getElementById('tx_areaname').value=get_area(tx_areano.value);

  document.getElementById('lu_stock_photo').disabled=true;
  document.getElementById('lu_stock_photo').style.opacity='0.5';

  document.getElementById('img_user').src='./gfx/avatar.png';  
  let v_mphoto=await jeff_getImage('vaxi/images/'+recno+'.jpg');  
  if(isJpegDataUrl(v_mphoto)){ document.getElementById('img_user').src=v_mphoto; }
}

//quit
function quit_fm_user(){   
  console.log('quit_fm_user:',DB_USER);
  fm_dashboard(false);
}

