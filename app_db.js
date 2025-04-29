var dbVersion = 1;
var dbReady = false;
var db;

var JBE_STORE_IDX = [    
  { "id":0, "flename":"accom", "numrec":0 , "init":1 },
  { "id":1, "flename":"area", "numrec":0 , "init":1 },
  { "id":2, "flename":"invty", "numrec":0 , "init":1 },
  { "id":3, "flename":"stock_invty", "numrec":0 , "init":1 },
  { "id":4, "flename":"stock_accom", "numrec":0 , "init":1 },
  { "id":5, "flename":"user", "numrec":0 , "init":1 }     
];

if (navigator.storage && navigator.storage.persist)
  navigator.storage.persist().then(granted => {
    if (granted){
      //alert("Storage will not be cleared except by explicit user action");
      PERSIST_GRANTED=true;
    }else{
      //alert("Storage may be cleared by the UA under storage pressure.");
      PERSIST_GRANTED=false;
    }
  }
);

//var CURR_IDX_DB='IDB_'+CURR_CLIENT;
var CURR_IDX_DB='IDB_VAXI';
initDb();
//=========================================================================================================================
//=========================================================================================================================
//=========================================================================================================================
function initDb() {
  console.log('initDb activated...'+JBE_ONLINE);
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }

  request.onsuccess = function(e) {
    db = e.target.result;
    console.log('db opened');  
  }

  request.onupgradeneeded = function(e) {
    db = e.target.result;
    db.createObjectStore('sysfile', { keyPath:'clientno' });
    db.createObjectStore('user', { keyPath:'usercode' });
    db.createObjectStore('area', { keyPath:'areano' });
    db.createObjectStore('stock_invty', { keyPath:'stockno' });
    db.createObjectStore('stock_accom', { keyPath:'stockno' });
    db.createObjectStore('invty', { keyPath:['areano','date','stockno'] });
    db.createObjectStore('accom', { keyPath:['areano','date','stockno'] });
    
    dbReady = true;
    console.log('initDb onupgradeneeded...'+JBE_ONLINE);
  }
}

async function clearStore(jstore){   
  //alert(jstore);
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }
  request.onsuccess = function(e) {
    var db1 = e.target.result;  
    var trans = db1.transaction([jstore], 'readwrite');
    var req = trans.objectStore(jstore).clear();
  
    //alert(111);
    req.onerror = function(e) {
      console.log('error clearing storeobject');
      console.error(e);
      //alert('error');
    }

    req.onsuccess = function(e) {
      console.log('objectStore Cleared');
      //alert('success');
    }
  }
}


/****************************************/
function countRecordIDX(n){  
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }
  request.onsuccess = function(e) {
    var db1 = e.target.result;
    var flename=JBE_STORE_IDX[n]['flename'];   
    //alert('countRecordIDX: '+flename);
    var jstore = db1.transaction([flename]).objectStore(flename); 
    var count = jstore.count();
    count.onsuccess = function() {      
      JBE_STORE_IDX[n]['numrec']=count.result;
      console.log('countRecordIDX: '+JBE_STORE_IDX[n]['flename']+' '+count.result);
    }
  }
}

/****************************************/
function getAllDataFromIDX() {   
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);  
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }

  var ctr=0;
  request.onsuccess = function(e) {
    var db2 = e.target.result;
    for(var i=0;i < JBE_STORE_IDX.length;i++){
      //if(!vmode && JBE_STORE_IDX[i]['init'] == 0) { continue; }
      //if(parseInt(JBE_STORE_IDX[i]['init']) != vmode) { continue; }
      //alert(JBE_STORE_IDX[i]['flename']+' = '+JBE_STORE_IDX[i]['numrec']);
      //alert('i = '+i);
      getDataFromIDX(i,db2);  
      ctr++;
    }
  }
  //alert('total: '+ctr);
}  

function getDataFromIDX(i,db2) {  
  var idx=0;
  var aryIDB=[]; 
  var flename=JBE_STORE_IDX[i]['flename'];
      
  var trans = db2.transaction([flename]);
  var object_store = trans.objectStore(flename);
  var request1 = object_store.openCursor();

  request1.onerror = function(event) {
    console.err("error fetching data");
  };
  
  request1.onsuccess = function(event) {        
    var cursor = event.target.result;    
    if (cursor) {
      var key = cursor.primaryKey;
      var ob;
      if(i==0){ //daily
        ob = {
          id:i,
          date:cursor.value.date,
          rank:cursor.value.rank,
          usercode:cursor.value.usercode,
          day:cursor.value.day,
          time1:cursor.value.time1,
          time2:cursor.value.time2,
          time3:cursor.value.time3,
          time4:cursor.value.time4, 
          txt:cursor.value.txt,
          txt_top:cursor.value.txt_top,
          txt_left:cursor.value.txt_left,
          txt_width:cursor.value.txt_width, 
          txt_fsize:cursor.value.txt_fsize
        };  
      }else if(i==1){ //monthly
        ob = {
          id:i,
          date:cursor.value.date,
          descrp:cursor.value.descrp
        };  
      }else if(i==2){ //sig
        ob = {
          id:i,
          head:cursor.value.head,
          position:cursor.value.position,            
          office:cursor.value.office,
          license:cursor.value.license
        };        
      }else if(i==3){ //User
        ob = {
          id:i,
          clientno:cursor.value.clientno,
          usercode:cursor.value.usercode,
          userid:cursor.value.userid,
          username:cursor.value.username,
          username2:cursor.value.username2,
          pword:cursor.value.pword,
          fullname:cursor.value.fullname,
          lastname:cursor.value.lastname,
          firstname:cursor.value.firstname,
          midname:cursor.value.midname,
          photo:cursor.value.photo,
          usertype:cursor.value.usertype,
          addrss:cursor.value.addrss,
          celno:cursor.value.celno,
          fb:cursor.value.fb,
          email:cursor.value.email,
          d_active:cursor.value.d_active,
          lat:cursor.value.lat,
          lng:cursor.value.lng
        };        
      }

      aryIDB[idx]=ob;    
      idx++;
      cursor.continue();
    }else{
      if(i==0){     
        DB_DAILY=[]; DB_DAILY=aryIDB;
        //showSystem();
      }else if(i==1){          
        DB_MONTHLY=[]; DB_MONTHLY=aryIDB;
        //showProfile(2);  
      }else if(i==2){          
        DB_SIG=[]; DB_SIG=aryIDB;
        //showProfile(2); 
      }else if(i==3){          
        DB_USER=[]; DB_USER=aryIDB; 
        console.log('DB_USER getDataFromIDX');
        console.log(DB_USER);
        //showProfile(2);     
      }
      //alert(JBE_STORE_IDX[i]['flename']+aryIDB.length);
      //JBE_STORE_IDX[i]['numrec']=aryIDB.length;
    }    
  }
}  

function refreshIDX(){    
  return;
  //alert('refreshIDX '+DB_SYS.length+' = '+DB_SYS[0]['clientname']);  
  if(JBE_STORE_IDX[0]['numrec'] != DB_SYS.length){ clearStore(JBE_STORE_IDX[2]['flename']); saveDataToIDX(DB_SYS,0); }
  if(JBE_STORE_IDX[1]['numrec'] != DB_USER.length){ clearStore(JBE_STORE_IDX[3]['flename']); saveDataToIDX(DB_USER,1); }         
  //jdata();  
}

function jdata(){
  //if(CURR_AXTYPE < 9){ return; }
  var jd=
    'From IDX '+JBE_STORE_IDX[0]['flename']+' : '+JBE_STORE_IDX[0]['numrec']+' vs '+DB_CAT.length+' Array<br>'+
    'From IDX '+JBE_STORE_IDX[1]['flename']+' : '+JBE_STORE_IDX[1]['numrec']+' vs '+DB_STOCK_INVTY.length+' Array<br>'+
    'From Array CLIENTS '+DB_USER.length+' Array<br>'+
    'From Array BELLS '+DB_BELL.length+' Array<br>';    

  MSG_SHOW(vbOk,"DATA:",jd,function(){},function(){}); 
}

async function saveDataToIDX(aryDB,n) {    
  console.log('saveDataToIDX',JBE_STORE_IDX[n].flename);
  //JBE_STORE_IDX[n]['numrec']=aryDB.length;
  console.log(JBE_STORE_IDX[n].flename+' ::: length: '+aryDB.length+'::: saveDataToIDX '+n);
  for(var i=0;i<aryDB.length;i++){     
    //if(aryDB[i]['clientno']!=CURR_CLIENT){ continue; }
    //console.log((i+1)+'/'+aryDB.length);
    await putDataToIDX(i,aryDB,n);
  }
}

async function putDataToIDX(i,aryDB,n){ 
  if(n==0){ //accom   
    ob = {  
      "areano":aryDB[i]['areano'],
      "stockno":aryDB[i]['stockno'],
      "date":aryDB[i]['date'],
      "1wm":aryDB[i]['1wm'],
      "1wf":aryDB[i]['1wf'],
      "2wm":aryDB[i]['2wm'],
      "2wm":aryDB[i]['2wm'],
      "3wm":aryDB[i]['3wm'],
      "3wf":aryDB[i]['3wf'],
      "4wm":aryDB[i]['4wm'],
      "4wf":aryDB[i]['4wf'],
      "5wm":aryDB[i]['5wm'],
      "5wf":aryDB[i]['5wf'],
      "totM":aryDB[i]['totM'],
      "totF":aryDB[i]['totF'],
      "total":aryDB[i]['total']
    };
  }else if(n==1){ //area    
    ob = {
      "areano": aryDB[i]['areano'],
      "name": aryDB[i]['name'],
      "rank": aryDB[i]['rank'],
      "cat": aryDB[i]['cat']
    };  
  }else if(n==2){ //invty    
    ob = {  
      "areano":aryDB[i]['areano'],
      "stockno":aryDB[i]['stockno'],
      "date":aryDB[i]['date'],

      "1w1":aryDB[i]['1w1'],
      "1w2":aryDB[i]['1w2'],
      "1w3":aryDB[i]['1w3'],
      "1w4":aryDB[i]['1w4'],
      "1w5":aryDB[i]['1w5'],
      "1lotno":aryDB[i]['1lotno'],
      "1expiry":aryDB[i]['1expiry'],
      "1req":aryDB[i]['1req'],

      "2w1":aryDB[i]['2w1'],
      "2w2":aryDB[i]['2w2'],
      "2w3":aryDB[i]['2w3'],
      "2w4":aryDB[i]['2w4'],
      "2w5":aryDB[i]['2w5'],
      
      "2lotno":aryDB[i]['2lotno'],      
      "2expiry":aryDB[i]['2expiry'],
      "2req":aryDB[i]['2req']
    };
  }else if(n==3){ //stock  invty  
    ob = {  
      "stockno": aryDB[i]['stockno'],
      "descrp": aryDB[i]['descrp'],
      "lotno": aryDB[i]['lotno'],
      "expiry": aryDB[i]['expiry']
    };
  }else if(n==4){ //stock  accom
    ob = {  
      "stockno": aryDB[i]['stockno'],
      "descrp": aryDB[i]['descrp'],
      "lotno": aryDB[i]['lotno'],
      "expiry": aryDB[i]['expiry']
    };
  }else if(n==5){ //user    
    let jimg=aryDB[i]['photo'];  
    if(JBE_CHK_BASE64(jimg)){    
      await JBE_BLOB(n,jimg).then(result => jimg=result);
    }else{
      jimg='';
    }
    ob = {
      clientno:aryDB[i]['clientno'],
      areano:aryDB[i]['areano'],
      usercode:aryDB[i]['usercode'],
      userid:aryDB[i]['userid'],
      username:aryDB[i]['username'],
      username2:aryDB[i]['username2'],
      pword:aryDB[i]['pword'],
      fullname:aryDB[i]['fullname'],
      lastname:aryDB[i]['lastname'],
      firstname:aryDB[i]['firstname'],
      midname:aryDB[i]['midname'],
      //photo:jimg,
      photo:aryDB[i]['photo'],
      usertype:aryDB[i]['usertype'],
      addrss:aryDB[i]['addrss'],
      celno:aryDB[i]['celno'],
      fb:aryDB[i]['fb'],
      email:aryDB[i]['email'],
      d_active:aryDB[i]['d_active'],
      lat:aryDB[i]['lat'],
      lng:aryDB[i]['lng']
    };
  }

  //console.log(i,'>>> putDataToIDX: flename: ',JBE_STORE_IDX[n]['flename']);
  //console.log(ob.photo);
  var trans = db.transaction([JBE_STORE_IDX[n]['flename']], 'readwrite');
  var addReq = trans.objectStore(JBE_STORE_IDX[n]['flename']).put(ob);
  addReq.onerror = function(e) {
    //console.log('error storing data');
    console.log('ERROR: putToIDX '+JBE_STORE_IDX[n]['flename']);
    console.error(e);
  }

  trans.oncomplete = function(e) {
    //console.log(n+': putToIDX '+JBE_STORE_IDX[n]['flename']+' with value '+JBE_STORE_IDX[n]['numrec']);  
    //console.log('--------------');
    //alert(xox);
  }
}

function get_ndx_JBE_STORE_IDX(tbl){
  let rval=-1;
  for(var i=0;i<JBE_STORE_IDX.length;i++){
    if(tbl==JBE_STORE_IDX[i].flename){
      rval=i;
      break;
    }
  }
  return rval;
}