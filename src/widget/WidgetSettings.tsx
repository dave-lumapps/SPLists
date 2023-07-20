import React, { useMemo, useState, useEffect, useContext, createContext, SyntheticEvent } from 'react';
import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';
import { Dropdown, Slider, Switch, TextField, List, ListItem, Size, Button,CommentBlock, SelectMultiple } from '@lumx/react';
import { PredefinedErrorBoundary, useDebounce, useExportProps, useLanguage } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

import '../style/App.css';

import axios from 'axios';
import {retarray} from '../hooks/helper'

import { mdiConsolidate, mdiDoNotDisturbOff } from '@mdi/js';


type WidgetSettings = import('lumapps-sdk-js').SettingsComponent<
    import('./types').SampleAppGlobalParams,
    import('./types').SampleAppParams
    
>;

const WithIntlSettings: WidgetSettings = ({ properties = {}, exportProp }) => {
    const intl = useIntl();
    
    const [siteId, setSiteId] = useState(properties.siteId);
    const [listId, setListId] = useState(properties.listId);
    const [columnId, setColumnId] = useState(properties.columnId);
    const [listName, setListName] = useState(properties.listName);
    const [siteName, setSiteName] = useState(properties.siteName);
    const [siteDesc, setSiteDesc] = useState(properties.siteDesc);
    const [siteSearch, setSiteSearch] = useState(properties.siteSearch);
    const [sites, setSites] = useState(properties.sites);
    const [url, setSiteURL] = useState('');

    const [infolist, setInfoList] = useState('');

    const [interest, setInterest] = useState('');
    const [response, setResponse] = useState('');
    const [lists, setLists] = useState('');
    const [columns, setListColumns] = useState('');
   
    const [excerpt, setExcerpt] = useState(properties.excerpt || 1);
    const [nonews, setNonews] = useState(properties.nonews || 1);

    const [useimage, setUseImage] = useState<boolean>(properties.useimage || false);
    
    


    const [nonewsId, setNonewsId] = useState(properties.nonewsId);
    const [useGreyScale, setUseGreyScale] = useState<boolean>(properties.useGreyScale || false);
    const [useBlur, setUseBlur] = useState<boolean>(properties.useBlur || false);
    const [blur, setBlur] = useState(properties.blur || 1);
    const [values, setValues] = React.useState<string[]>([]);

    const debouncedImageId = useDebounce(nonewsId, 800);

    const [tenant, setTenant] = useState('12da1e76-c564-44ad-8f98-06a3cda8f3b4');
    const [appid, setAppid] = useState('b4463410-6089-42f4-9445-a22d63051845');
    const [secret, setSecret] = useState('Cu~7Q~9c-kZl3D21-74Np5gVYh6v0NhPQfXzP');
    const [listitems, setListItems] = useState('');

    useExportProps(tenant, 'tenant', properties, exportProp);
    useExportProps(appid, 'appid', properties, exportProp);
    useExportProps(secret, 'secret', properties, exportProp);
    useExportProps(listitems, 'listitems', properties, exportProp);
    useExportProps(infolist, 'infolist', properties, exportProp);


    useExportProps(debouncedImageId, 'nonewsId', properties, exportProp);
    useExportProps(useGreyScale, 'useGreyScale', properties, exportProp);
    useExportProps(useBlur, 'useBlur', properties, exportProp);
    useExportProps(blur, 'blur', properties, exportProp);

    useExportProps(lists, 'lists', properties, exportProp);
    useExportProps(sites, 'foundsites', properties, exportProp);
    useExportProps(url, 'siteurl', properties, exportProp);
    useExportProps(excerpt, 'excerpt', properties, exportProp);
    useExportProps(nonews, 'nonews', properties, exportProp);
    useExportProps(useimage, 'useimage', properties, exportProp);
    useExportProps(values, 'listcols', properties, exportProp);


    const anchorSiteRef = React.useRef(null);
    const anchorListRef = React.useRef(null);
    const anchorColumnsRef = React.useRef(null);
    const [isSiteOpen, setSiteIsOpen] = React.useState(false);
    const [isListOpen, setListIsOpen] = React.useState(false);
    const [isColsOpen, setColsIsOpen] = React.useState(false);
    
    const toggleSiteMenu = () => setSiteIsOpen(!isSiteOpen);
    const toggleListMenu = () => setListIsOpen(!isListOpen);
    const toggleColsMenu = () => setColsIsOpen(!isColsOpen);
    const closeSiteMenu = () => setSiteIsOpen(false);
    const closeListMenu = () => setListIsOpen(false);
    const closeColumnMenu = () => setColsIsOpen(false);

    const [showDDL, setDDL] = useState(false);
    const [showDDLists, setDDLists] = useState(false);
    const [showDDCols, setDDCols] = useState(false);
    const [showComm, setComments] = useState(false);
    const [showSlide, setSlider] = useState(false);
    const [showNonewsSlide, setNonewsSlider] = useState(false);
    const [showImageSwitch, setUseImageSwitch] = useState(false);


   // console.log('_________________%%%%%%%% selected lists', lists);
   
   
    
console.log("SEARCH " + siteSearch)
     const onSiteMenuSelected = (item: string, site:string, url:string) => () => {
       // console.log('_________________%%%%%%%% selected item', item);
        //console.log('_________________%%%%%%%% selected site', site);
       
        
        setSiteId(item);
        setSiteName(site);
        setSiteDesc("You have selected the site: " + site +". Only modern sites will display news items. Please ensure you have selected a modern site using news site pages")
        
        setSiteURL(url)
        closeSiteMenu();
    };


    const onListMenuSelected = (item: string, list:string, url:string) => () => {
        //console.log('_________________%%%%%%%% selected item', list);
       
       
        
       setListName(list)
        setSiteDesc("You have selected the list: " + list +". Please specify below the number of items to show")
        setComments(true)
        setListId(item);
        closeListMenu();
    };
    const onColumnMenuSelected = (item: string, list:string, url:string) => () => {
       // console.log('_________________%%%%%%%% selected Column', list);
       
       
        
       setListName(list)
        setSiteDesc("You have selected the column: " + list +". Please specify below the number of items to show")
        setComments(true)
        setColumnId(item);
        closeColumnMenu();
    };

    
//______________________________________________________________________________________


interface LooseObject {
    siteName: string;
    siteID: string;
}
interface LooseObject2{
    newsTitle: string;
    newsUrl: string;
    newsDate : string;
    newsId: string;
}


function searchButton(res:any):JSX.Element { 
    if(showDDL)
    {
    return(
<div className="searchcontainer">         
<Button ref={anchorSiteRef} onClick={toggleSiteMenu}  disabled={interest === ""}>
   
               Choose SharePoint Site
            </Button>
</div>
    )
}
else
return(<div></div>)
}
function listButton(res:any):JSX.Element { 
    if(showDDLists)
    {
    return(
<div className="listcontainer">         
<Button ref={anchorListRef} onClick={toggleListMenu}  disabled={interest === ""}>
   
               Choose SharePoint List
            </Button>
</div>
    )
}
else
return(<div></div>)
}

function showButton(res:any):JSX.Element { 
    if(showDDL)
    {
    return(
<div className="searchcontainer">         
<Button ref={anchorSiteRef} onClick={toggleSiteMenu}  disabled={interest === ""}>
   
               Show SharePoint List
            </Button>
</div>
    )
}
else
return(<div></div>)
}

function columnsButton(res:any):JSX.Element { 
    if(showDDCols)
    {
    return(
<div className="colscontainer">         
<Button ref={anchorColumnsRef} onClick={toggleColsMenu}  disabled={interest === ""}>
   
               Choose List Columns
            </Button>
</div>
    )
}
else
return(<div></div>)
}
          
interface LooseObject {
    id: string;
    title: string;
    published:string;
    url: string;


}
interface ListObject {
    id: string;
    title: string;
    url: string;


}
interface ColumnObject {
    id: string;
    title: string;
    required: string;
    hidden: string;


}


function listSites(res:any):JSX.Element { 
  //  console.log("______LIST SITES JSON " + JSON.stringify(res))
    let list1 = new Array;
  //  console.log("___________TYPE OF RES " + typeof(res))

    for (var i=0; i<res.length; i++) {
        //console.log(res[i].id);
        //console.log(res[i].displayName);
        var obj={} as LooseObject;
        obj.siteName = res[i].displayName;
        obj.siteID = res[i].id;
        obj.url = res[i].webUrl;
        list1.push(obj)
       // console.log("_____LS __ " + obj.siteName + " " + obj.siteID)

    }
//console.log("______show ddl ? " + showDDL)
    if(showDDL)
    {
    return(
        <Dropdown isOpen={isSiteOpen} onClose={closeSiteMenu} anchorRef={anchorSiteRef}>
    <List>
{list1.length > 0
                    ? list1.map((choice) => (
                          <ListItem
                              isSelected={siteId === choice.siteID}
                              key={choice.siteID}
                              onItemSelected={onSiteMenuSelected(choice.siteID, choice.siteName, choice.url)}
                              size={Size.tiny}
                              value={choice.siteName}
                          >
                              
                              {choice.siteName}
                          </ListItem>
                      ))
                    : [
                          <ListItem key={0} size={Size.tiny}>
                              No data
                          </ListItem>,
                      ]}
            </List>
            </Dropdown>
           
    );
                    }
                    else
                    return(<div></div>)
                    
 } 

 function listLists(res:any):JSX.Element { 
  //console.log("______LIST LISTS " + JSON.stringify(res))
    let list1 = new Array;
  //  console.log("___________TYPE OF RES " + typeof(res))

    for (var i=0; i<res.length; i++) {
        //console.log(res[i].id);
        //console.log(res[i].displayName);
        var obj={} as ListObject;
        obj.title = res[i].displayName;
        obj.id = res[i].id;
        obj.url = res[i].required;
        
        list1.push(obj)
        //console.log("LIS __ " + obj.id + " " + obj.title)

    }
    //console.log("LIS OBJECT " + JSON.stringify(list1))
//console.log("______show ddl ? " + showDDLists)

    if(showDDLists)
    {
     // console.log("______inside show ddl ? " + showDDLists)
    return(
        <div >     
        <Dropdown isOpen={isListOpen} onClose={closeListMenu} anchorRef={anchorListRef}>
    <List>
{list1.length > 0
                    ? list1.map((choice) => (
                          <ListItem
                              isSelected={listId === choice.id}
                              key={choice.id}
                              onItemSelected={onListMenuSelected(choice.id, choice.title, choice.url)}
                              size={Size.tiny}
                              value={choice.title}
                          >
                              
                              {choice.title}
                          </ListItem>
                      ))
                    : [
                          <ListItem key={0} size={Size.tiny}>
                              No data
                          </ListItem>,
                      ]}
            </List>
            </Dropdown>
           </div>
    );
                    }
                    else
                    return(<div></div>)
                    
 }


 const CHOICES = ['First item', 'Second item', 'Third item'];
    const PLACEHOLDER = 'Select a value';
    const LABEL = 'Select List Columns';
    const [isOpen, setOpen] = useState(false);
    const closeSelect = () => setOpen(false);
    const toggleSelect = () => setOpen(!isOpen);
    
    const clearSelected = (event?: SyntheticEvent, value?: string) => {
        event?.stopPropagation();
        setValues(value ? values.filter((val) => val !== value) : []);
    };
    const selectItem = (item: string) => () => {
        if (values.includes(item)) {
            clearSelected(undefined, item);
            return;
        }
        setValues([...values, item]);
        
    };

 function listColumns(res:any) { 
   // console.log("______VLAUES " + values)
      let list1 = new Array;
    //  console.log("___________TYPE OF RES " + typeof(res))
  
      for (var i=0; i<res.length; i++) {
          //console.log(res[i].id);
          //console.log(res[i].displayName);
          var obj={} as ColumnObject;
          obj.title = res[i].displayName;
          obj.id = res[i].id;
          obj.hidden = res[i].hidden;
          list1.push(obj)
          //console.log("COL __ " + obj.id + " " + obj.title)

          
  
      }
    //  console.log("_________COL OBJECT " + JSON.stringify(list1))
  //console.log("______show COL ddl ? " + showDDCols)
  
      if(showDDCols)
      {
        //console.log("______inside show ddl COLS ? " + showDDCols)

        

      return(
        <div className='colscontainer'>   
          <SelectMultiple
          style={{ width: '100%' }}
          value={values}
          isOpen={isOpen}
          onDropdownClose={closeSelect}
          onInputClick={toggleSelect}
          label={LABEL}
          placeholder={PLACEHOLDER}
          
          
          onClear={clearSelected}
          clearButtonProps={{ label: 'Clear' }}
      >
          <List>
              {list1.length > 0
                  ? list1.map((choice) => (
                        <ListItem
                            isSelected={values.includes(choice.title)}
                            key={choice.id}
                            onItemSelected={selectItem(choice.title)}
                            size={Size.tiny}
                        >
                            {choice.title}
                        </ListItem>
                    ))
                  : [
                        <ListItem key={0} size={Size.tiny}>
                            No data
                        </ListItem>,
                    ]}
          </List>
      </SelectMultiple>
      </div>
  );
           
      
                      
                      
   }
}
 //console.log("____SHOW COMM " + showComm) 

 function showComments():JSX.Element { 
    if(showComm)
    {
    
    return (

        
    <CommentBlock
    hasActions
    isRelevant
    avatarProps={{ image: 'https://www.onmsft.com/wp-content/uploads/2021/04/microsoftlistsappicon.jpg', alt: 'Avatar' }}
    date=""
    name={listName}
    text={siteDesc}
    visible=""
/>

    );
}
else
return(<div></div>)

 }
    //______________________________________________________________________________________       
    
    
   
    
  function GetInfoList(siteid:any)
  {
    const article = {        
        sid: siteid,
        appid: appid,
    secret: secret,
    tenentid: tenant     
              
    };
    
    useEffect(() => {
        // If you want do do some other action after
        // the response is set do it here. This useEffect will only fire
        // when response changes.
        callYourAPI()
     }, [siteid]); // Makes the useEffect dependent on response.
  
     function callYourAPI() {
        // console.log("___CUURENT SITEID " + siteid)
         if(siteid !== undefined)
         {
       //  console.log("_____________CALLING LISTS API : ")
         axios.post('https://dave-master-services.herokuapp.com/microsoft/getInfoList', article)
         .then(res =>  {
           // Handle Your response here.
           // Likely you may want to set some state
          // console.log("___________AXIOS START PAGES : ____________________")
           setInfoList(res.data.value[0].id);
           console.log("________SITE INFO LIST: " + JSON.stringify(res.data.value[0].id))

           var newRes = res.data.value
          // console.log("NUMBER OF LISTS " + newRes.length)

           
        
         
         
        //   console.log("___________AXIOS END PAGES: ____________________")
           
        })
        .catch(err => {
         console.log(err)
       })
     };
 } // end if
  }
  
  function GetUserLookup(siteid:any, listid:any, id:any)
  {
      console.log("________________INFOLIST " + infolist);
    const article = {        
        sid: siteid,
        lid: listid,
        id: id,
        appid: appid,
    secret: secret,
    tenentid: tenant     
              
    };
    
    useEffect(() => {
        // If you want do do some other action after
        // the response is set do it here. This useEffect will only fire
        // when response changes.
        callYourAPI()
     }, [infolist]); // Makes the useEffect dependent on response.
  
     function callYourAPI() {
        // console.log("___CUURENT SITEID " + siteid)
         if(infolist !== "")
         {
       //  console.log("_____________CALLING LISTS API : ")
         axios.post('https://dave-master-services.herokuapp.com/microsoft/getUserlookup', article)
         .then(res =>  {
           // Handle Your response here.
           // Likely you may want to set some state
          // console.log("___________AXIOS START PAGES : ____________________")
           //setInfoList(res.data.value);
           console.log("________USER: " + JSON.stringify(res.data))

           var newRes = res.data.value
          // console.log("NUMBER OF LISTS " + newRes.length)

           
        
         
         
        //   console.log("___________AXIOS END PAGES: ____________________")
           
        })
        .catch(err => {
         console.log(err)
       })
     };
 } // end if
  }
  
    

    function GetLists (siteid:any) {
        
        
      // console.log("___________GETTING LISTS FOR SITE ID : " + JSON.stringify(siteid))
        siteid = JSON.stringify(siteid);
        
       
       
        const article = {        
            text: siteid,
            appid: appid,
        secret: secret,
        tenentid: tenant     
                  
        };
        
        useEffect(() => {
           // If you want do do some other action after
           // the response is set do it here. This useEffect will only fire
           // when response changes.
           callYourAPI()
        }, [siteid]); // Makes the useEffect dependent on response.
     
        function callYourAPI() {
           // console.log("___CUURENT SITEID " + siteid)
            if(siteid !== undefined)
            {
          //  console.log("_____________CALLING LISTS API : ")
            axios.post('https://dave-master-services.herokuapp.com/microsoft/getLists', article)
            .then(res =>  {
              // Handle Your response here.
              // Likely you may want to set some state
             // console.log("___________AXIOS START PAGES : ____________________")
              setLists(res.data.value);
             // console.log("________SETTING LISTS: " + JSON.stringify(res))

              var newRes = res.data.value
             // console.log("NUMBER OF LISTS " + newRes.length)

              
           
            setDDLists(true)
            
           //   console.log("___________AXIOS END PAGES: ____________________")
              
           })
           .catch(err => {
            console.log(err)
          })
        };
    } // end if

    }

    function GetListColumns (siteid:any, listid:any) {
        
        
       // console.log("CCCCCCCCCCCCCCCCC___________GETTING lIST COLUMN : ")
         siteid = JSON.stringify(siteid);
         
        
        
         const article = {        
             sid: siteid,
             lid:listid,
             appid: appid,
             secret: secret,
             tenentid: tenant     

                   
         };
         
         useEffect(() => {
            // If you want do do some other action after
            // the response is set do it here. This useEffect will only fire
            // when response changes.
            callYourAPI()
         }, [listid]); // Makes the useEffect dependent on response.
      
         function callYourAPI() {
           //  console.log("CCCCCCCCCCCCCCCC___CUURENT SITEID " + listid)
             if(listid !== undefined)
             {
           //  console.log("CCCCCCCCCCCCCCCCC_____________CALLING COMUNS API : ")
             axios.post('https://dave-master-services.herokuapp.com/microsoft/getListColumns', article)
             .then(res =>  {
               // Handle Your response here.
               // Likely you may want to set some state
              // console.log("___________AXIOS START PAGES : ____________________")
               setListColumns(res.data.value);
           //   console.log("CCCCCCCCCCCCCCCC________SETTING LIST COLUMNS: " + JSON.stringify(res.data.value))
 
               var newRes = res.data.value
           //    console.log("CCCCCCCCCCCCCCC_________NUMBER OF LIST COLUMNS " + newRes.length)
 
               setDDCols(true)
             
             
             
            //   console.log("___________AXIOS END PAGES: ____________________")
               
            })
            .catch(err => {
             console.log(err)
           })
         };
     } // end if
 
     }

     function GetListItems (siteid:any, listid:any, cols:any) {
        
       // console.log("BBBBBBBBBBBBBB___________CURRENT COLS : " + cols)
       // console.log("BBBBBBBBBBBBBBB___________CURRENT COLS LENGTH : " + cols.length)
       // console.log("BBBBBBBBBBBBBBBBB___________GETTING lIST ITEMS : ")
         siteid = JSON.stringify(siteid);
         
        
        
         const article = {        
             sid: siteid,
             lid:listid,
             appid: appid,
             secret: secret,
             tenentid: tenant,
             columns: cols     

                   
         };
         
         useEffect(() => {
            // If you want do do some other action after
            // the response is set do it here. This useEffect will only fire
            // when response changes.
            callYourAPI()
         }, [cols]); // Makes the useEffect dependent on response.
      
         function callYourAPI() {
         //    console.log("AAAAAAAAAAAAA___CUURENT COLS " + cols)
             if(cols.length > 0)
             {
         //    console.log("AAAAAAAAAAAAAA____________CALLING ITEMS API : ")
             axios.post('https://dave-master-services.herokuapp.com/microsoft/getListItems', article)
             .then(res =>  {
               // Handle Your response here.
               // Likely you may want to set some state
              // console.log("___________AXIOS START PAGES : ____________________")
               setListItems(res.data.value);
            //   console.log("AAAAAAAAAAAAAAA________GETTING LIST ITEMS: " + JSON.stringify(res.data.value))
 
               var newRes = res.data.value
          //     console.log("AAAAAAAAAAAAAAAAA_________NUMBER OF LIST ITEMS " + newRes.length)
 
               //setDDCols(true)
             
             
             
            //   console.log("___________AXIOS END PAGES: ____________________")
               
            })
            .catch(err => {
             console.log(err)
           })
         };
     } // end if
 
     }
 
     function ShowTenant(res:any):JSX.Element { 
     
        function HandleTenant(event:any) {
  
          setTenant(event.target.value);
          
          
        //  console.log("___________HANDLE SITE SELECTION: " + event.target.value)
       };
   
       return (
        
           <div className="searchcontainer">
              <input
                className="searchInput"
                type="text"
                placeholder="Enter your Tenant ID"
                value={tenant}
                onChange={HandleTenant}
                style={{width: "270px"}}
              />
             
           </div>
           
        );
        }; // end details
  
        function ShowAppID(res:any):JSX.Element { 
       
          
        
     
        function HandleAppID(event:any) {
  
          setAppid(event.target.value);
          
          
        //  console.log("___________HANDLE SITE SELECTION: " + event.target.value)
       };
   
       return (
        
           <div className="searchcontainer">
              <input
                className="searchInput"
                type="text"
                placeholder="Enter your Application ID"
                value={appid}
                onChange={HandleAppID}
                style={{width: "270px"}}
              />
             
           </div>
           
        );
        }; // end appid
  
  
        function ShowSecret(res:any):JSX.Element { 
  
        function HandleSecret(event:any) {
  
          setSecret(event.target.value);
          
          
        //  console.log("___________HANDLE SITE SELECTION: " + event.target.value)
       };
   
       return (
        
           <div className="searchcontainer">
              <input
                className="searchInput"
                type="text"
                placeholder="Enter your Secret"
                value={secret}
                onChange={HandleSecret}
                style={{width: "270px"}}
              />
             
           </div>
           
        );
        }; // end secret
    
  function SearchSites (search:any) {
   // console.log("___________SS1 : " + search)
    const url = 'https://dave-master-services.herokuapp.com/microsoft/siteSearch'
   
    const article = {        
        text: search,
        appid: appid,
        secret: secret,
        tenentid: tenant     
    };
 
    useEffect(() => {
       // If you want do do some other action after
       // the response is set do it here. This useEffect will only fire
       // when response changes.
    }, [interest]); // Makes the useEffect dependent on response.
 
    function callYourAPI() {

       // console.log("_____________CALLING API : ")
        axios.post('https://dave-master-services.herokuapp.com/microsoft/siteSearch', article)
        .then(res =>  {
          // Handle Your response here.
          // Likely you may want to set some state
        //  console.log("___________AXIOS START : ____________________")
          setResponse(res.data.value);
        //  console.log(res.data)
        //  console.log("___________AXIOS END : ____________________")
          setDDL(true)
         
       })
      
       .catch(err => {
        console.log(err)
      })
    };

    
 
    function HandleChange(event:any) {

       setInterest(event.target.value);
       
       
       console.log("___________HANDLE SITE SELECTION: " + event.target.value)
    };

    return (
        <div className="searchcontainer">
           <input
             className="searchInput"
             type="text"
             placeholder="Enter a site name"
             value={interest}
             onChange={HandleChange}
           />
           <Button
             onClick={() => callYourAPI()}
             className="searchbutton"
             // You may want to disable your button until interest is set
             disabled={interest === ""}
             
           >
             Search
           </Button>
        </div>
     );
  }; // end


  function showNonewsSlider(siteid:any):JSX.Element { 
    if(showDDL)
    {
      return (
  <Slider
                    label={(<FormattedMessage id="settings.nonews_value_title" />) as any}
                    helper={(<FormattedMessage id="settings.nonews_value_desc" />) as any}
                    max={20}
                    min={1}
                    value={nonews}
                    onChange={setNonews}
                />
      )
    }
    else
                    return(<div></div>)
  }

  


  
 // console.log("XXXXXXXXXXXXXXXXXXXXXXXXX  interest " + interest)
 // console.log("XXXXXXXXXXXXXXXXXXXXXXXXX  response " + response)
 // console.log("XXXXXXXXXXXXXXXXXXXXXXXXX  site id " + siteId)
 // console.log("XXXXXXXXXXXXXXXXXXXXXXXXX  lists " + lists)

 // console.log("XXXXXXXXXXXXXXXXXXXXXXXXX  Columns " + columns)
  //console.log("XXXXXXXXXXXXXXXXXXXXXXXXX  Values " + values)
   

  const ten = ShowTenant(tenant)
  const app = ShowAppID(appid)
  const sec = ShowSecret(secret)
  const searchBox = SearchSites(interest);
  const searchBut = searchButton(interest);
  const  dropDown = listSites(response);
  const sitelists = GetLists(siteId);
  const infoList = GetInfoList(siteId)
  const listBut = listButton(interest);
  const  dropDownLists = listLists(lists);
  const cols = GetListColumns(siteId, listId)
  const listCols = listColumns(columns);
  const items = GetListItems(siteId, listId, values)

  const user = GetUserLookup(siteId, infolist, "6")
 
  const comments = showComments();
  
  const nwsslider = showNonewsSlider(siteId);
 
  
    return (
        <>
{ten}
{app}
{sec}
{searchBox}
{searchBut}
{dropDown}
{listBut}
{sitelists} 
{infoList}
{dropDownLists}
{listCols}
{items}
{user}
{comments}
{nwsslider}
{cols}

            
            

            
        </>
    );
}; // end widget settings

export const WidgetSettings: WidgetSettings = (props) => {
    //console.log("PROPS " + JSON.stringify(props))
    
    const { displayLanguage } = useLanguage();
    const messages: Record<string, Record<string, string>> = {
        en: messagesEn,
        fr: messagesFr,
    };
    const lang = useMemo(() => (Object.keys(messages).includes(displayLanguage) ? displayLanguage : 'en'), [
        displayLanguage,
        messages,
    ]);

    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <PredefinedErrorBoundary>
                <WithIntlSettings {...props} />
            </PredefinedErrorBoundary>
        </IntlProvider>
    );
};
