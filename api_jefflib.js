// GitHub API configuration
const API_BASE = 'https://api.github.com';
const REPO_OWNER = 'bacolodcoldroom';
const REPO_NAME = 'JDB';
var apiBase = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/`;

async function api_readfile(cloud,path) {    
  console.log('api_readfile path:',path);
  if(cloud){
    path=path+'.json';
    try {
        const response = await fetch(apiBase+`${path}`, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        if (!response.ok) throw new Error(`Failed to fetch file: ${response.status}`);
        const data = await response.json(); 
        const finalData=JSON.parse(decodeURIComponent(escape(atob(data.content))));
        return { content: finalData, sha: data.sha };
    } catch (error) {
        showProgress(false);
        //console.error("Error fetching file:", error);
        //snackBar("Error fetching file: "+error);
        MSG_SHOW(vbOk,"ERROR:",error,function(){},function(){});
    }
  }else{    
    try {
       console.log('indexeddb jeff path.... ',path);
       const tbl = await readAllRecords(path); 
       console.log(path,':::indexeddb path and length.... ',tbl.length);   
       return { content: tbl };
    } catch (error) {
        showProgress(false);
        //snackBar("Error fetching file: "+error);
        MSG_SHOW(vbOk,"ERROR:",error,function(){},function(){});
    }
  }
}

async function updateFile(path,updatedContent, message, sha) {
  try {
    path=path+'.json';
    const response = await fetch(apiBase+`${path}`, {
        method: "PUT",
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message,
            //content: btoa(JSON.stringify(updatedContent, null, 2)),
            content: btoa(unescape(encodeURIComponent(JSON.stringify(updatedContent, null, 2)))),
            sha
        })
    });

    if (!response.ok) throw new Error(`Failed to update file: ${response.status}`);
    console.log("File updated successfully");
  } catch (error) {
    //snackBar("Error updating file: "+error);
    MSG_SHOW(vbOk,"ERROR updating file:",error,function(){},function(){});
  }
}

async function api_save(cloud,fileName,newData,cond){
  console.log('api_save filename',fileName);
  console.log(newData);
  console.log('=================================');
  if(cloud){
    try {
      const { content, sha } = await api_readfile(cloud,fileName);
      //const filteredData = content.filter(record => String(record[fld]) !== val);
      let filteredData;
      let finalData;
      let msg='';
      if(cond){
        filteredData = content.filter(cond);              
        msg='Data updated.';
      }else{
        filteredData = content;
      }
      finalData = filteredData.concat(newData); 
      // Commit the updated array back to the file with a commit message.
      await updateFile(fileName,finalData, ``, sha);
      console.log('finalData',finalData);    
      //speakText(msg);
    } catch (error) {
      MSG_SHOW(vbOk,"ERROR:",error.message,function(){},function(){});
      console.log(error);
    }
  }else{
    let n=get_ndx_JBE_STORE_IDX(fileName);
    await saveDataToIDX(newData,n);
    //speakText('Data updated to Indexed DB.');
  }
}


////--------------------------------------

// Base64 encoding/decoding with UTF-8 support
function decodeBase64(base64Str) {
  return decodeURIComponent(
    atob(base64Str).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
}

function encodeBase64(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

// Run the update
//updateJsonWithSpanishChars();

// =====================================================================================================================
// =====================================================================================================================

async function get_all_db_from_json(){  
  let dir='./DBF/';
  if(CURR_CLIENT=='VAXIAPP'){ dir='../DBF/'; }
  console.log('************* JBE_API '+JBE_API);  
  await fetch(dir+'accom.json').then(res => res.json()).then(data => { DB_ACCOM=data; saveDataToIDX(data,0); })
  await fetch(dir+'area.json').then(res => res.json()).then(data => { DB_AREA=data;  saveDataToIDX(data,1); })
  await fetch(dir+'invty.json').then(res => res.json()).then(data => { DB_INVTY=data; saveDataToIDX(data,2); })
  await fetch(dir+'stock_invty.json').then(res => res.json()).then(data => { DB_STOCK_INVTY=data; saveDataToIDX(data,3); })
  await fetch(dir+'stock_accom.json').then(res => res.json()).then(data => { DB_STOCK_ACCOM=data; saveDataToIDX(data,4); })
  await fetch(dir+'user.json').then(res => res.json()).then(data => { DB_USER=data; saveDataToIDX(data,5); }) 
}
