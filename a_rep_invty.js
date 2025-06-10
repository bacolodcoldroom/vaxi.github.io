function rp_invty(areano,date){    
  let ndate=date+'-01';
  ndate=JBE_DATE_FORMAT(ndate,'MMMM YYYY');
  console.log('rp_invty date:',date);
  //date=JBE_DATE_FORMAT(CURR_DATE,'YYYY-MM-DD');
  let v_areaname=get_area(areano);
 
  const today=new Date(date);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11
  const wednesdays = getWednesdaysInMonth(currentYear, currentMonth);
  console.log('wednesdays len:',wednesdays.length);
  
  let wd_date=20; 
  let wd_box=0;
  let len_wed=wednesdays.length+0;
  if(wednesdays.length==5){ wd_date=15; }

  wd_box=Number((100-(wd_date+30))/(len_wed));

  let hd=
  
  '<div style="width:100%;height:auto;margin-top:0px;font-size:14px;">'+      
    '<div style="width:100%;height:40px;font-size:24px;font-weight:bold;text-align:center;padding:5px;border:1px solid black;background:yellow;">MONTHLY VACCINE INVENTORY FORM</div>'+
    
    '<div style="width:100%;height:20px;border:1px solid black;background:white;">'+
      '<div style="float:left;width:20%;height:100%;text-align:left;border-right:1px solid black;">BARANGAY : </div>'+
      '<div style="float:left;width:79%;height:100%;text-align:center;font-weight:bold;">'+v_areaname+'</div>'+    
    '</div>'+

    '<div style="width:100%;height:20px;border:1px solid black;background:white;">'+
      '<div style="float:left;width:20%;height:100%;text-align:left;border-right:1px solid black;">DATE : </div>'+
      '<div style="float:left;width:79%;height:100%;text-align:center;font-weight:bold;">'+ndate+'</div>'+    
    '</div>'+

    '<div style="width:100%;height:10px;border:1px solid black;background:yellow;"></div>'+
  '</div>';
  
  let hd1=
  '<div style="width:100%;height:40px;margin-top:0px;font-size:14px;font-weight:bold;text-align:center;border:1px solid black;border-bottom:0px;background:'+clor_req+';">'+      
    '<div style="float:left;width:'+(wd_date-0)+'%;height:100%;border-right:1px solid black;background:white;"><div style="padding:10px 0 0 0;">DATE</div></div>';        
    let vdtl='';
    let px=1;
    let wed='';
    for(var k=1;k<=len_wed;k++){          
      wed=JBE_DATE_FORMAT(wednesdays[(k-1)].toDateString(),'MMM DD, YYYY');
      vdtl+='<div style="float:left;width:'+wd_box+'%;height:100%;text-align:center;border-right:'+px+'px solid black;background:white;"><div style="padding:10px 0 0 0;">'+wed+'</div></div>';
    }
    vdtl+=   
    '<div style="float:left;width:10%;height:100%;border-right:1px solid black;color:black;background:'+clor_lotno+';"><div style="height:100%;padding:10px 0 0 0;">Lot No.</div></div>'+
    '<div style="float:left;width:10%;height:100%;border-right:1px solid black;background:'+clor_expiry+';"><div style="height:100%;padding:10px 0 0 0;">Expiry</div></div>'+
    '<div style="float:left;width:9%;height:100%;border-right:0px solid black;background:'+clor_req+';"><div style="height:100%;padding:3px 0 0 0;">Monthly Required</div></div>'+
  '</div>'+
  '<div style="width:100%;height:10px;border:1px solid black;background:yellow;"></div>';
  hd1+=vdtl;

  let hd2='';  
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  let dtl='';
  DB_STOCK_INVTY.sort(JBE_SORT_ARRAY(['rank']));
  for(var i=0;i<DB_STOCK_INVTY.length;i++){
    dtl+=
    '<div style="width:100%;height:40px;margin-top:0px;font-size:14px;font-weight:normal;text-align:left;border:1px solid black;background:'+clor_req+';">'+      
      '<div style="float:left;width:'+(wd_date)+'%;height:100%;border-right:1px solid black;background:white;"><div style="padding:2px;">'+DB_STOCK_INVTY[i].descrp+'</div></div>';      
      vdtl='';
      px=1;
      for(var k=1;k<=len_wed;k++){        
        vdtl+=
        '<div style="float:left;width:'+(wd_box)+'%;height:100%;text-align:center;font-size:12px;border-right:'+px+'px solid black;background:white;">'+
          '<div style="width:100%;height:50%;border:0px solid black;">'+
            '<div id="'+DB_STOCK_INVTY[i].stockno+'_1w'+k+'" style="width:100%;height:100%;padding:2px 0 0 0;background:none;"></div>'+
          '</div>'+
          '<div style="width:100%;height:50%;border-top:1px solid black;">'+
            '<div id="'+DB_STOCK_INVTY[i].stockno+'_2w'+k+'" style="width:100%;height:100%;padding:2px 0 0 0;background:none;"></div>'+
          '</div>'+
        '</div>';
      }
      vdtl+=   
      '<div style="float:left;width:10%;height:100%;border-right:1px solid black;color:black;background:'+clor_lotno+';">'+
        '<div id="'+DB_STOCK_INVTY[i].stockno+'_1lotno'+'" style="width:100%;height:50%;text-align:center;padding:2px 0 0 0;color:black;background:none;"></div>'+
        '<div id="'+DB_STOCK_INVTY[i].stockno+'_2lotno'+'" style="width:100%;height:50%;text-align:center;padding:2px 0 0 0;border-top:1px solid black;color:black;background:none;"></div>'+
      '</div>'+
      '<div style="float:left;width:10%;height:100%;border-right:1px solid black;color:black;background:'+clor_expiry+';">'+
        '<div id="'+DB_STOCK_INVTY[i].stockno+'_1expiry'+'" style="width:100%;height:50%;text-align:center;padding:2px 0 0 0;color:black;background:none;"></div>'+
        '<div id="'+DB_STOCK_INVTY[i].stockno+'_2expiry'+'" style="width:100%;height:50%;text-align:center;padding:2px 0 0 0;border-top:1px solid black;color:black;background:none;"></div>'+
      '</div>'+
      '<div style="float:left;width:9%;height:100%;border-right:0px solid black;color:black;background:'+clor_req+';">'+
        '<div id="'+DB_STOCK_INVTY[i].stockno+'_1req'+'" style="width:100%;height:50%;text-align:center;padding:2px 0 0 0;color:black;background:none;"></div>'+
        '<div id="'+DB_STOCK_INVTY[i].stockno+'_2req'+'" style="width:100%;height:50%;text-align:center;padding:2px 0 0 0;border-top:1px solid black;color:black;background:none;"></div>'+
      '</div>'+
     
    '</div>';
    dtl+=vdtl;
  }
  hd+=hd1+hd2+dtl;
  document.getElementById('pa_dtl').innerHTML=hd;

  //////////////////////////////////////////////////////
  ///////////////////display data///////////////////////
  for(var i=0;i<DB_INVTY.length;i++){
    if(DB_INVTY[i].areano !== areano){ continue; }
    if(JBE_DATE_FORMAT(DB_INVTY[i].date,'YYYY-MM') !== date){ continue; }
    //console.log(DB_INVTY[i]);
    let div;
    for(var k=1;k<=len_wed;k++){
      let fld1='1w'+k;
      let fld2='2w'+k;
      document.getElementById(DB_INVTY[i].stockno+'_1w'+(k)).innerHTML=DB_INVTY[i][fld1]; 
      document.getElementById(DB_INVTY[i].stockno+'_2w'+(k)).innerHTML=DB_INVTY[i][fld2]; 
    }
    
    document.getElementById(DB_INVTY[i].stockno+'_1lotno').innerHTML=DB_INVTY[i]['1lotno'];
    document.getElementById(DB_INVTY[i].stockno+'_1expiry').innerHTML=DB_INVTY[i]['1expiry'];
    document.getElementById(DB_INVTY[i].stockno+'_1req').innerHTML=DB_INVTY[i]['1req'];
    document.getElementById(DB_INVTY[i].stockno+'_2lotno').innerHTML=DB_INVTY[i]['2lotno'];
    document.getElementById(DB_INVTY[i].stockno+'_2expiry').innerHTML=DB_INVTY[i]['2expiry'];
    document.getElementById(DB_INVTY[i].stockno+'_2req').innerHTML=DB_INVTY[i]['2req'];
  }  
}
