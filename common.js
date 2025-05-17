async function make_log(areano,tran){
  let n=new Date();
  let date = JBE_DATE_FORMAT(n,'YYYY-MM-DD');
  let time= n.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
  let log='Updated Weekly Inventory...';
  if(tran=='accom'){ log='Updated Weekly Accomplishment...'; }
  let ob={
    "areano": areano,
    "date": date,
    "time": time,
    "log": log,
    "tran":tran,
    "post":false
  };
  await api_save(JBE_CLOUD,JBE_API+'log',ob,record => !(record.areano === areano && record.tran === tran));
}

async function show_log(){
  let data=await api_readfile(JBE_CLOUD,JBE_API+'log'); DB_LOG=data.content;
  let curdate=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  
  DB_LOG.sort(sortByMultipleKey(['*time','date','areano']));
  let arr_post=[]; let ctr=0;
  let dtl='';  
  let areanames='';
  for(var i=0;i<DB_LOG.length;i++){
    if(DB_LOG[i].date != curdate){ continue; }
    //if(DB_LOG[i].post == true){ continue; }
        
    let aname=get_area(DB_LOG[i].areano);    
    let clor='black';
    if(DB_LOG[i].post==false){ 
      clor='red'; 
      speakText('New Update! from '+aname);
      console.log('......... ',get_area(DB_LOG[i].areano));
      //await updateField(JBE_API+'log.json',record => record.areano ===  DB_LOG[i].areano && record.post === false,'post',true);       
      DB_LOG[i].post=true;    
      //await api_save(JBE_CLOUD,JBE_API+'log',DB_LOG,record => !(record.areano === DB_LOG[i].areano && record.tran !== DB_LOG[i].tran));        
      //await api_save(JBE_CLOUD,JBE_API+'log',DB_LOG,record => record.areano !== DB_LOG[i].areano || record.tran !== DB_LOG[i].tran);        
    }

    dtl+=
    '<div onclick="sel_brgy(&quot;'+DB_LOG[i].areano+'&quot;)" style="width:100%;height:40px;margin-top:5px;padding:2px;border:1px solid lightgray;">'+
      '<div style="width:100%;height:50%;">'+
        '<div style="float:left;width:70%;height:100%;font-weight:bold;color:'+clor+';">'+aname+'</div>'+
        '<div style="float:right;width:auto;height:100%;">'+DB_LOG[i].time+'</div>'+
      '</div>'+
      '<div style="width:100%;height:50%;">'+DB_LOG[i].log+'</div>'+
    '</div>';

  }
  document.getElementById('id_log').innerHTML=dtl;

  //await updateField(JBE_API+'log.json',record => record.post === false,'post',true); 
  //await api_save(JBE_CLOUD,JBE_API+'log',arr_post,record => !(record.post === true));  
  //data=await api_readfile(JBE_CLOUD,JBE_API+'log'); DB_LOG=data.content;
  
  //await updateField(JBE_API+'log.json',record => record.areano ===  v_areano && record.post === false,'post',true); 
  
  //areanames=areanames.substring(0,areanames.length-1);
  //console.log(areanames);
  
  //JBE_AUDIO('gfx/snd/insight',5);
}


function getWednesdaysInMonth(year, month) {
  // Note: month is 0-indexed (0 = January, 11 = December)
  const wednesdays = [];
  const date = new Date(year, month, 1);
  
  // Find first Wednesday of the month
  while (date.getDay() !== 3) {
      date.setDate(date.getDate() + 1);
  }
  
  // Add all Wednesdays in the month
  while (date.getMonth() === month) {
      wednesdays.push(new Date(date));
      date.setDate(date.getDate() + 7);
  }
  
  return wednesdays;
}

function update_week_buttons(date,tran){
  // Example usage for current month
  const today = new Date(date);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11
  const wednesdays = getWednesdaysInMonth(currentYear, currentMonth);

  let vbtn='';
  if(tran=='invty'){
    vbtn='btn';
  }else if(tran=='accom'){
    vbtn='btn1';
  }

  for(var i=0;i<4;i++){   
    document.getElementById((vbtn+i)).textContent='';
  }
  for(var i=0;i<wednesdays.length;i++){
    let wed=JBE_DATE_FORMAT(wednesdays[i].toDateString(),'MMM DD, YYYY');
    document.getElementById(vbtn+i).textContent=wed;
  }
}