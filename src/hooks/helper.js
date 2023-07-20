function ListSites(res)
  {
     var list = new Array[5];
     

    console.log("******* res " + JSON.stringify(res))

    for (var i=0; i<res.length; i++) {
        console.log(res[i].id);
        console.log(res[i].displayName);
        var obj = new Object()
        obj.siteName = res[i].displayName;
        obj.siteID = res[i].displayNameid;
        list.push(obj)

    }

    
    

  return list
  }

  module.exports = {
    ListSites
  };