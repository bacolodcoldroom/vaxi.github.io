async function make_log(areano,log){
  let n=new Date();
  let date = JBE_DATE_FORMAT(n,'YYYY-MM-DD');
  let time= n.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
  let ob={
    "areano": areano,
    "date": date,
    "time": time,
    "log": log
  };
  await api_save(JBE_CLOUD,JBE_API+'log',ob,record => record.areano !== areano);  
  //await api_save(JBE_CLOUD,JBE_API+'log',ob,'');  
}

async function show_log(){
  let data=await api_getfile(JBE_CLOUD,JBE_API+'log'); DB_LOG=data.content;
  let curdate=JBE_DATE_FORMAT(new Date(),'YYYY-MM-DD');
  
  DB_LOG.sort(sortByMultipleKey(['*time','date','areano']));
  let dtl='';
  for(var i=0;i<DB_LOG.length;i++){
    if(DB_LOG[i].date != curdate){ continue; }
    dtl+=
    '<div style="width:100%;height:40px;margin-top:5px;padding:2px;border:1px solid lightgray;">'+
      '<div style="width:100%;height:50%;">'+
        '<div style="float:left;width:70%;height:100%;font-weight:bold;">'+get_area(DB_LOG[i].areano)+'</div>'+
        '<div style="float:right;width:auto;height:100%;">'+DB_LOG[i].time+'</div>'+
      '</div>'+
      '<div style="width:100%;height:50%;">'+DB_LOG[i].log+'</div>'+
    '</div>';
  }
  document.getElementById('id_log').innerHTML=dtl;
  //JBE_AUDIO('gfx/snd/insight',5);
}