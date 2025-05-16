function fm_area(){  
  FM_TRANS='AREA';
  FM_FM_MODE=1;
  FM_TABLE=DB_AREA;  FM_TABLE_NAME='area';  FM_RKEY='areano';
  FM_CB='';
  //FM_TABLE2=DB_RECEIVE2;

  FM_FIELDS=[ //display on screen
    { div:"tx_areano", fld:"areano", type:"text", disp:1, save:true },
    { div:"tx_name", fld:"name", type:"text", disp:1, save:true },
    { div:"tx_rank", fld:"rank", type:"text", disp:1, save:true },
    { div:"tx_cat", fld:"cat", type:"text", disp:0, save:false }
  ];
    
  var fm_ob = {
    title:"AREA MASTER FILE",  
    title2:"AREA",
    width:"800px",height:"270px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
  }
  
  var fm_layout=    
    '<div id="div_FM_head" style="width:100%;height:100%;margin-top:0px;text-align:left;padding:5px;border:1px solid lightgray;background:none;">'+

      '<div style="display:none;">'+        
        '<input id="tx_cat" />'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span onclick="JBE_SHOW_LOGGER(tx_areano.value,&quot;'+FM_TRANS+'&quot;)" style="cursor:help;">Area Code:</span>'+                     
          '<input id="lu_area_no" type="image" src="gfx/jsearch.png" onclick="look_areano(tx_areano.value)" />'+
        '</div>'+
        '<input id="tx_areano" type="text" onchange="FM_CHK_REC(tx_areano.value)" style="text-transform: uppercase;" disabled data-caption="Area Code" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_areano.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span style="cursor:help;">Area Name:</span>'+                     
        '</div>'+
        '<input id="tx_name" type="text" data-caption="Stock Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_name.id).focus()" />'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+        
        '<div>'+          
          '<span style="cursor:help;">Rank:</span>'+                     
        '</div>'+
        '<input id="tx_rank" type="text" data-caption="Stock Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_name.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl" style="height:175px;">'+ 
        '<div style="height:25px;">'+
          '<span>Photo:</span>'+
          '<input type="file" id="inpfile_stock" data-orig="" data-sel=0 name="inpfile_stock" value="" hidden="hidden" />'+ 
          '<input id="lu_stock_photo" type="image" style="display:block;background:dimgray;overflow:auto;width:auto;max-width:100%;height:auto;max-height:100%;" src="gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,inpfile_stock.id,img_stock.id,&quot;putImg_stock&quot;)" />'+
        '</div>'+  
        '<p>'+
          '<img id="img_stock" data-img="" name="img_stock" src="gfx/proc_balls.gif" onclick="JBE_ZOOM(this.src,&quot;&quot;)" style="height:100%;width:auto;border:1px solid lightgray;"/>'+          
        '</p>'+   
      '</div>'+       
      
    '</div>';
  
  FM_FUNC={
    look:"look_fm_area",
    init:"init_fm_area",
    add:"add_fm_area",
    edit:"edit_fm_area",
    del:"del_fm_area",
    disp:"disp_fm_area",
    save:"save_fm_area",
    quit:"quit_fm_area"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function look_areano(){
  //{ "title":"Product Name", "width":"60%", "align":"left" },
  var flds=[
    { title:"Area No", fld:"areano", type:"text", width:"20%", align:"left" },
    { title:"Area Name", fld:"name", type:"text", width:"40%", align:"left" },
    { title:"Ranking", fld:"rank", type:"text", width:"20%", align:"center" },
    { title:"Category", fld:"cat", type:"text", width:"20%", align:"center" }
  ];  
  var ob=[
    { val:tx_areano.value, fld:"areano" }
  ];
  FM_LOOKUP(true,tx_name.value,ob,FM_TABLE,['rank'],'LOOKUP','lookup_fm_area',flds);
}

function lookup_fm_area(ndx){	  
  if(ndx == -1){ 
    FM_INIT_REC();
    return; 
  }
  let val=document.getElementById('dd_areano'+ndx).innerHTML;
  document.getElementById('tx_areano').value=val;
  document.getElementById('tx_name').value=document.getElementById('dd_name'+ndx).innerHTML;
  FM_DISP_REC(val);   
}
//
function init_fm_area(){  
  document.getElementById('tx_areano').value='';
  document.getElementById('lu_area_no').disabled=false;
  document.getElementById('lu_area_no').style.opacity='1';
  document.getElementById('lu_stock_photo').disabled=true;
  document.getElementById('lu_stock_photo').style.opacity='0.5';
  document.getElementById('img_stock').src='./gfx/avatar.png';
}
//
function add_fm_area(){
  document.getElementById('tx_areano').value='';
  document.getElementById('lu_area_no').disabled=true;
  document.getElementById('lu_area_no').style.opacity='0.5';
  document.getElementById('lu_stock_photo').disabled=false;
  document.getElementById('lu_stock_photo').style.opacity='1';
  document.getElementById('img_stock').src='./gfx/proc_balls.gif'; 
  document.getElementById('tx_areano').focus();
}
//edit
function edit_fm_area(){  
  document.getElementById('lu_area_no').disabled=true;
  document.getElementById('lu_area_no').style.opacity='0.5';
  document.getElementById('lu_stock_photo').disabled=false;
  document.getElementById('lu_stock_photo').style.opacity='1';
  document.getElementById('tx_name').focus();  
}
//look
function look_fm_area(){
    disp_fm_area();
}
//del
function del_fm_area(stat,r){
  //alert('stat :'+stat+' r:'+r);
  if(stat==1){ 
    let refno=JBE_REC_EXIST(DB_INVTY,FM_RKEY,document.getElementById('tx_areano').value,FM_RKEY);
    if(refno){
      MSG_SHOW(vbOk,"DENIED: ","Can't Delete, Record is used in RIS No:"+refno,function(){},function(){}); 
      return false; 
    }
  }
  if(stat==2){ DB_AREA=r; } 
}
//save
async function save_fm_area(stat,r){
  //alert('stat :'+stat+' r:'+r);
  var recno=document.getElementById('tx_areano').value;      
  if(stat==2){
    //alert('recno:'+recno);
    let photo=document.getElementById('img_stock').src;     
    if(JBE_CLOUD){ await jeff_uploadImage(photo,'vaxi/images/'+recno+'.jpg'); }
    DB_AREA=r; 
    console.log('======save area:',DB_AREA);
  }
}
//disp
async function disp_fm_area(){   
  var recno=document.getElementById('tx_areano').value;      
  //var n = new Date().toLocaleTimeString('it-IT'); 
  document.getElementById('lu_area_no').disabled=false;
  document.getElementById('lu_area_no').style.opacity='1';    
  document.getElementById('lu_stock_photo').disabled=true;
  document.getElementById('lu_stock_photo').style.opacity='0.5';

  document.getElementById('img_stock').src='./gfx/proc_balls.gif';  
  let v_mphoto=await jeff_getImage('vaxi/images/'+recno+'.jpg');  
  if(isJpegDataUrl(v_mphoto)){ document.getElementById('img_stock').src=v_mphoto; }
}

//quit
function quit_fm_area(){   
  console.log('quit_fm_area:',DB_AREA);
  showMainPage();
}

function putImg_stock(){
  return;
  var vimg=document.getElementById('img_stock').getAttribute('data-img');  
  document.getElementById('tx_stock_photo').value=vimg;
  //alert('vimg:'+vimg);

  let img=document.getElementById('img_stock').src;
  //document.getElementById('tx_b64').value=img;
  //alert('img:'+img);
}