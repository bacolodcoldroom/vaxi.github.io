
//============================================================================================================================================================================
//============================================================================================================================================================================

function prn_brgy(mode,date){
  let brgy_code=document.getElementById('wrapper').getAttribute('data-brgycode');  
  if(!brgy_code){ 
    snackBar('Select a Barangay');
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  document.getElementById('back_view1').style.display='none';
  let pa_height=H_BODY-30-35-25;
  if(JBE_MOBILE){ pa_height=H_BODY-30-50; }

  var dtl=
  '<div id="dv_prn" data-maxdays=0 data-print=1 style="height:100%;width:100%;font-family: Arial, Helvetica, sans-serif;font-size:12px;padding:10px;border:0px solid lightgray;background:white;">'+

    '<div style="height:35px;width:100%;text-align:center;padding:0px;font-size:16px;border:1px solid lightgray;background:none;">'+ 
       '<div class="cls_daily" style="margin:0 auto;width:250px;height:100%;padding:4px;border:0px solid lightgray;">'+ 
          '<span style="float:left;width:40%;height:100%;padding:3px 0 0 0;font-size:14px;font-weight:bold;background:none;">As of:</span>'+ 
          '<input id="date_dtr" style="width:60%;height:100%;" onchange="chg_month(&quot;'+brgy_code+'&quot;,this.value)" type="month" value="'+JBE_DATE_FORMAT(date,'YYYY-MM')+'"  placeholder="Date" />'+       
        '</div>'+
    '</div>'+  

    '<div id="printableBorder" style="height:'+pa_height+'px;border:1px solid lightgray;">'+    
      '<div id="printableArea" style="width:1000px;border:1px solid black;">'+
        '<div id="pa_dtl">'+
        '</div>'+
      '</div>'+
    '</div>'+

    '<div id="div_prn_menu" style="width:100%;height:35px;margin-top:0px;font-size:14px;padding:3px;border:0px solid green;color:white;background:'+JBE_CLOR+';">'+  
    '</div>';
      
  '</div>';

  JBE_OPEN_VIEW2(dtl,'PRINTER','showMainPage');
  mnu_repo();

  if(mode==1){
    rp_invty(brgy_code,date);
  }else if(mode==2){
    rp_accom(brgy_code,date);
  }
}
function mnu_repo(){  
  var jmenu=  
  '<div style="width:100%;height:100%;">'+
    '<div onclick="JBE_PRINTDIV(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:20%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jprn.png" alt="call image" />'+
        '<span style="padding:2px;">Print</span>'+
      '</div>'+
    '</div>'+    
    '<div onclick="JBE_PRINT_PDF(&quot;printableArea&quot;,&quot;REPORT&quot;)" style="float:left;width:20%;height:100%;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jpdf.png" alt="call image" />'+
        '<span style="padding:2px;">PDF</span>'+
      '</div>'+
    '</div>'+       
    '<div onclick="JBE_CLOSE_VIEW2();showMainPage()" style="float:right;width:20%;height:100%;background:none;">'+
      '<div class="class_footer">'+
        '<img src="gfx/jclose.png"  alt="home image" />'+
        '<span style="padding:2px;">Close</span>'+
      '</div>'+
    '</div>'+
  '</div>';
  dispMenu('div_prn_menu',jmenu);  
}

function rp_invty(areano){  
  
}

function chg_month(areano,date){
  date+='-01';
  rp_accom(areano,date);
}

function rp_accom(areano,date){    
  let clor_male='lightblue';
  let clor_female='pink';
  //date=JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM-DD');
  let v_areaname=get_area(areano);
 
  const today=new Date(date);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11
  const wednesdays = getWednesdaysInMonth(currentYear, currentMonth);
  //alert('wednesdays len:'+wednesdays.length);
  
  let wd_date=20; 
  let wd_box=0;
  let len_wed=wednesdays.length+1;
  if(wednesdays.length==5){ wd_date=15; }

  wd_box=Number((100-wd_date)/(len_wed));

  let hd=reportHead('NIP WEEKLY ACCOMPLISHMENT',v_areaname)+
  '<div style="width:100%;height:40px;margin-top:0px;font-size:14px;padding:0px 0 0 0;text-align:left;border:0px solid black;">'+      
    '<div style="float:left;width:100%;height:50%;">DATE : '+JBE_DATE_FORMAT(date,'MMMM YYYY')+'</div>'+
    '<div style="float:left;width:100%;height:50%;">TARGET POP/ ELIGIBLE POP : <span style="text-decoration:underline;">45</span></div>'+    
  '</div>';
  let hd1=
  '<div style="width:100%;height:25px;margin-top:10px;font-size:14px;font-weight:bold;text-align:center;border:1px solid black;border-bottom:0px;background:yellow;">'+      
    '<div style="float:left;width:'+(wd_date-0)+'%;height:100%;border-right:1px solid black;background:white;"><div style="padding:3px 0 0 0;">DATE</div></div>';    
    let vdtl='';
    let px=1;
    let wed='';
    for(var k=1;k<=len_wed;k++){      
      if(k==len_wed){ 
        wd_box--; 
        px=0;
        wed="MONTHLY";
      }else{
        wed=JBE_DATE_FORMAT(wednesdays[(k-1)].toDateString(),'MMM DD, YYYY');
      }      
      //vdtl+='<div style="float:left;width:'+wd_box+'%;height:100%;text-align:center;border-right:'+px+'px solid black;">'+wed+'</div>';
      vdtl+='<div style="float:left;width:'+wd_box+'%;height:100%;text-align:center;border-right:'+px+'px solid black;"><div style="padding:3px 0 0 0;">'+wed+'</div></div>';
    }
    vdtl+=    
  '</div>';
  hd1+=vdtl;

  let hd2=
  '<div style="width:100%;height:25px;margin-top:0px;font-size:14px;font-weight:bold;text-align:center;border:1px solid black;">'+      
    '<div style="float:left;width:'+(wd_date-0)+'%;height:100%;border-right:1px solid black;"><div style="padding:3px 0 0 0;">INDICATORS</div></div>';
    let f_male=true;
    vdtl='';
    px=1;
    wd_box++;
    for(var k=1;k<=len_wed;k++){
      //console.log('f_male',f_male);
      if(k==len_wed){ wd_box--; px=0; }
      vdtl+=
      '<div style="float:left;width:'+wd_box+'%;height:100%;text-align:center;font-size:10px;border-right:'+px+'px solid black;">'+
        '<div style="float:left;width:33%;height:100%;border-right:1px solid black;background:'+clor_male+';"><div style="padding:5px 0 0 0;">MALE</div></div>'+
        '<div style="float:left;width:33%;height:100%;border-right:1px solid black;background:'+clor_female+';"><div style="padding:5px 0 0 0;">FEMALE</div></div>'+
        '<div style="float:left;width:32%;height:100%;border-right:px solid black;background:white;"><div style="padding:5px 0 0 0;">TOTAL</div></div>'+
      '</div>';
      f_male=!f_male;
    }
    vdtl+=    
  '</div>';
  hd2+=vdtl;
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  let dtl='';
  DB_STOCK_ACCOM.sort(JBE_SORT_ARRAY(['rank']));
  for(var i=0;i<DB_STOCK_ACCOM.length;i++){
    dtl+=
    '<div style="width:100%;height:20px;margin-top:0px;font-size:14px;font-weight:normal;text-align:left;border:1px solid black;">'+      
      '<div style="float:left;width:'+(wd_date)+'%;height:100%;border-right:1px solid black;"><div style="padding:2px;">'+DB_STOCK_ACCOM[i].descrp+'</div></div>';
      let f_male=true;
      vdtl='';
      px=1;
      wd_box++;
      for(var k=1;k<=len_wed;k++){
        //console.log('f_male',f_male);
        let vbold='normal';
        if(k==len_wed){ wd_box--; px=0; vbold='bold'; }
        let div=DB_STOCK_ACCOM[i].stockno+'_'+k;
        vdtl+=
        '<div style="float:left;width:'+(wd_box)+'%;height:100%;text-align:center;font-size:12px;border-right:'+px+'px solid black;">'+
          '<div style="float:left;width:33%;height:100%;border-right:1px solid black;background:'+clor_male+';"><div id="'+div+'wm'+'" style="height:100%;padding:3px;font-weight:'+vbold+';"></div></div>'+
          '<div style="float:left;width:33%;height:100%;border-right:1px solid black;background:'+clor_female+';"><div id="'+div+'wf'+'" style="height:100%;padding:3px;font-weight:'+vbold+';"></div></div>'+
          '<div style="float:left;width:32%;height:100%;border-right:px solid black;background:white;"><div id="'+div+'total'+'" style="height:100%;padding:3px;font-weight:bold;">0</div></div>'+
        '</div>';
        f_male=!f_male;
        //console.log('>>>>> ',div);
      }
      vdtl+=   
    '</div>';
    dtl+=vdtl;
  }
  hd+=hd1+hd2+dtl;
  document.getElementById('pa_dtl').innerHTML=hd;

  //////////////////////////////////////////////////////
  ///////////////////display data///////////////////////
  
  //alert(date+' len:'+DB_ACCOM.length);
  let brgy_code=document.getElementById('wrapper').getAttribute('data-brgycode');  
  
  for(var i=0;i<DB_ACCOM.length;i++){
    if(JBE_DATE_FORMAT(DB_ACCOM[i].date,'YYYY-MM') !== date){ continue; }
    if(DB_ACCOM[i].areano !== brgy_code){ continue; }
    let mon_wm=0; let mon_wf=0; let mon_tot=0;
    let div=''; let div2=''; let div3='';    
    for(var k=1;k<=len_wed;k++){
      let fld1=k+'wm';
      let fld2=k+'wf';
      let fld3=k+'total';

      let wm=Number(DB_ACCOM[i][fld1]);
      let wf=Number(DB_ACCOM[i][fld2]);
      let tot=wm+wf;

      mon_wm+=wm; mon_wf+=wf; mon_tot+=tot;

      if(k==len_wed){ wm=mon_wm; wf=mon_wf; tot=mon_tot; }

      div=DB_ACCOM[i].stockno+'_'+fld1;     document.getElementById(div).innerHTML=wm;
      div2=DB_ACCOM[i].stockno+'_'+fld2;    document.getElementById(div2).innerHTML=wf;
      div3=DB_ACCOM[i].stockno+'_'+fld3;    document.getElementById(div3).innerHTML=tot;      
    }
    
  }    
  
}

