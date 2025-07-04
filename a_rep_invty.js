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
  
  let wd_date=20; let wd_rest=80; 
  let wd_box=0;
  let len_wed=wednesdays.length+0;
  if(wednesdays.length==5){ wd_date=15; wd_rest=75;}
  wd_date=20; wd_rest=80-0.5; //wd_rest=79.5;

  wd_box=Number((wd_rest-17)/len_wed);
  //wd_box=Number((wd_rest-20)/len_wed);
  console.log('wd_box',wd_box);

  let hd=  
  '<div style="width:100%;height:auto;margin-top:0px;font-size:14px;">'+      
    '<div style="width:100%;height:35px;font-size:24px;font-weight:bold;text-align:center;padding:0px;border:0px solid black;background:yellow;"><p style="margin:0px;padding:5px;">MONTHLY VACCINE INVENTORY FORM</p></div>'+
    
    '<div style="width:100%;height:20px;border:1px solid black;background:white;">'+
      '<div style="float:left;width:20%;height:100%;text-align:left;border-right:1px solid black;"><div style="padding:2px;">BARANGAY : </div></div>'+
      '<div style="float:left;width:79%;height:100%;text-align:center;font-weight:bold;">'+v_areaname+'</div>'+    
    '</div>'+

    '<div style="width:100%;height:20px;border:1px solid black;background:white;">'+
      '<div style="float:left;width:20%;height:100%;text-align:left;border-right:1px solid black;"><div style="padding:2px;">DATE : </div></div>'+
      '<div style="float:left;width:79%;height:100%;text-align:center;font-weight:bold;">'+ndate+'</div>'+    
    '</div>'+

  '</div>'+
  '<div style="width:100%;height:5px;border:1px solid black;background:yellow;"></div>';
  
  let hd1=
  '<div style="width:100%;height:40px;margin-top:0px;font-size:14px;font-weight:bold;text-align:center;border:1px solid black;border-bottom:0px;background:'+clor_req+';">'+      
    '<div style="float:left;width:'+wd_date+'%;height:100%;border-right:1px solid black;background:white;"><p style="margin:0px;padding:10px 0 0 0;">DATE</p></div>'+
    '<div style="float:left;width:'+wd_rest+'%;height:100%;border-right:0px solid black;background:none;">';    
    let vdtl='';
    let px=1;
    let wed='';
    
    for(var k=1;k<=len_wed;k++){          
      wed=JBE_DATE_FORMAT(wednesdays[(k-1)].toDateString(),'MMM DD, YYYY');
      vdtl+=
      '<div style="float:left;width:'+wd_box+'%;height:100%;text-align:center;border-right:'+px+'px solid black;background:white;"><p style="margin:0px;padding:10px 0 0 0;">'+wed+'</p></div>';
      //'<input type="text" style="float:left;width:'+wd_box+'%;height:100%;border:0px solid black;text-align:center;border-right:'+px+'px solid black;background:white;" value="'+wed+'" />';
    }
    vdtl+=   
      '<div style="float:left;width:15%;height:100%;border-right:1px solid black;color:black;background:'+clor_lotno+';"><div style="height:100%;padding:10px 0 0 0;">Lot No.</div></div>'+
      '<div style="float:left;width:11%;height:100%;border-right:1px solid black;background:'+clor_expiry+';"><div style="height:100%;padding:10px 0 0 0;">Expiry</div></div>'+
      '<div style="float:left;width:10.8%;height:100%;border-right:0px solid black;background:'+clor_req+';"><p style="margin:0px;height:100%;padding:2px 0 0 0;">Monthly Required</p></div>';
    
    vdtl+=         
    '</div>'+    
  '</div>'+
  '<div style="width:100%;height:5px;border:1px solid black;background:yellow;"></div>';
  hd1+=vdtl;

  let hd2='';  
  //////////////////////////////////////////////////////
  /////////////////// HTML ///////////////////////////////////
  let dtl='';
  let wd_lotno=15; let wd_expiry=10; let wd_req=10;
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
    
    let row_height=40;
    if(len>2){
      let n=len-2;
      row_height=(20*len)+(len);      
    }else{
      row_height=row_height+2;
    }

    dtl+=
    '<div id="div_row'+v_stockno+'" data-stockno="'+v_stockno+'" class="cls_stock_rows" style="width:100%;height:'+row_height+'px;border:1px solid black;color:black;background:'+clor_req+';">'+
      '<div id="div_row_vax'+v_stockno+'" style="float:left;width:'+wd_date+'%;height:100%;text-align:left;border-right:1px solid black;background:white;"><p style="margin:0px;padding:5px;">'+DB_STOCK_INVTY[i].descrp+'</p></div>'+
      '<div id="div_row_data'+v_stockno+'" style="float:left;width:'+wd_rest+'%;height:100%;text-align:left;border-right:0px solid blue;background:none">';

      
      for(var j=1;j<=arr.length;j++){
        let bott_px=1;
        if(j==arr.length){ bott_px=0; }
        dtl+=
        '<div style="width:100%;height:20px;border-right:0px solid blue;background:none;">';
        let px=1;
        //bott_px=0;
        for(var k=1;k<=len_wed;k++){    
          let vstyle='';          
          if(k==len_wed){ vstyle='border-right:0px solid black;'; };
          //if(j==arr.length){ bott_px=0; }
          dtl+=          
          '<div style="float:left;height:100%;width:'+(wd_box)+'%;text-align:center;font-size:12px;border-left:0px;border-top:0px;border-right:1px solid black;border-bottom:'+bott_px+'px solid black;color:black;background:white;">'+           
            '<p id="'+v_stockno+'_'+j+'w'+k+'" style="height:100%;margin:0px;padding:2px 0 0 0;text-align:center;background:none;"></p>'+
          '</div>';          
        }
                
        dtl+=
          '<div style="float:left;width:15%;height:100%;text-align:center;border-right:1px solid black;border-bottom:'+bott_px+'px solid black;color:black;background:'+clor_lotno+';">'+
            '<p id="'+v_stockno+'_'+j+'lotno'+'" style="margin:0px;padding:2px 0 0 0;"></p>'+
          '</div>'+
          
          '<div style="float:left;width:11%;height:100%;text-align:center;border-right:1px solid black;border-bottom:'+bott_px+'px solid black;color:black;background:'+clor_expiry+';">'+
            '<p id="'+v_stockno+'_'+j+'expiry'+'" style="margin:0px;padding:2px 0 0 0;"></p>'+
          '</div>'+
          '<div style="float:left;width:10.8%;height:100%;text-align:center;border-right:0px solid black;border-bottom:'+bott_px+'px solid black;color:black;background:'+clor_req+';background:none;">'+
            '<p id="'+v_stockno+'_'+j+'req'+'" style="margin:0px;padding:2px 0 0 0;"></p>'+
          '</div>';
        
        dtl+=
        '</div>';
      }
      
      dtl+=
      '</div>'+
    '</div>';  
  }

  hd+=hd1+hd2+dtl;
  document.getElementById('pa_dtl').innerHTML=hd;
  //return;
  //////////////////////////////////////////////////////
  ///////////////////display data///////////////////////
  for(var i=0;i<DB_INVTY.length;i++){
    if(DB_INVTY[i].areano !== areano){ continue; }
    if(JBE_DATE_FORMAT(DB_INVTY[i].date,'YYYY-MM') !== date){ continue; }

    let v_stockno=DB_INVTY[i].stockno;
    let arr_data=DB_INVTY[i].row_data;
    //console.log(arr_data.length,' ==row_data::: ',arr_data);    

    for(var j=0;j<arr_data.length;j++){
      let div=v_stockno+'_'+(j+1);
      //v_stockno+'_'+j+'w'+k
      for(var k=1;k<=len_wed;k++){        
        let val=arr_data[j]['w'+k];
        if(!val){ val=''; }
        //console.log('val',val,v_stockno,'j:',j);
        document.getElementById(div+'w'+k).innerHTML=val;
        document.getElementById(div+'w'+k).style.pointerEvents='none';
      }
      document.getElementById(div+'lotno').innerHTML=arr_data[j]['lotno'];    document.getElementById(div+'lotno').style.pointerEvents='none';
      document.getElementById(div+'expiry').innerHTML=arr_data[j]['expiry'];  document.getElementById(div+'expiry').style.pointerEvents='none';
      document.getElementById(div+'req').innerHTML=arr_data[j]['req'];        document.getElementById(div+'req').style.pointerEvents='none';
    }
  }  
}
