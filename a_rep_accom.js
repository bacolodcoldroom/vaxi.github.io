function rp_accom(areano,date){    
  //date+='-01';
  //alert('rp_accom: '+areano+' ::: rp_accom date: '+date+'\nLEN:'+DB_ACCOM.length);
  let clor_male='lightblue';
  let clor_female='pink';
  //date=JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM-DD');
  let v_areaname=get_area(areano);
  let v_pop=JBE_GETFLD('pop',DB_AREA,'areano',areano);
 
  const today=new Date(date);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11
  const wednesdays = getWednesdaysInMonth(currentYear, currentMonth);
  
  let wd_date=20; 
  let wd_box=0;
  let len_wed=wednesdays.length+1;
  if(wednesdays.length==5){ wd_date=15; }

  wd_box=Number((100-wd_date)/(len_wed));

  let hd=reportHead('NIP WEEKLY ACCOMPLISHMENT',v_areaname)+
  '<div style="width:100%;height:40px;margin-top:0px;font-size:14px;padding:0px 0 0 0;text-align:left;border:0px solid black;">'+      
    '<div style="float:left;width:100%;height:50%;">DATE : '+JBE_DATE_FORMAT(date,'MMMM YYYY')+'</div>'+
    '<div style="float:left;width:100%;height:50%;">TARGET POP/ ELIGIBLE POP : <span style="text-decoration:underline;">'+v_pop+'</span></div>'+    
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
   
  console.log('going display:',areano,date);
  for(var i=0;i<DB_ACCOM.length;i++){
    if(JBE_DATE_FORMAT(DB_ACCOM[i].date,'YYYY-MM') !== date){ continue; }
    if(DB_ACCOM[i].areano !== areano){ continue; }
    
    let mon_wm=0; let mon_wf=0; let mon_tot=0;
    for(var k=1;k<=len_wed;k++){
      let fld1=k+'wm';
      let fld2=k+'wf';
      let fld3=k+'total';

      let wm=(DB_ACCOM[i][fld1]);
      let wf=(DB_ACCOM[i][fld2]);
      let tot=Number(wm)+Number(wf);

      mon_wm+=Number(wm); mon_wf+=Number(wf); mon_tot+=tot;

      if(k==len_wed){ wm=mon_wm; wf=mon_wf; tot=mon_tot; }

      document.getElementById(DB_ACCOM[i].stockno+'_'+fld1).innerHTML=wm;
      document.getElementById(DB_ACCOM[i].stockno+'_'+fld2).innerHTML=wf;
      document.getElementById(DB_ACCOM[i].stockno+'_'+fld3).innerHTML=tot;      
    }
    
  }    
}
