import React, { useEffect, useMemo, useState, useContext, createContext } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import {
    Chip,
    ChipGroup,
    ImageBlock,
    ImageBlockCaptionPosition,
    Notification,
    Kind,
    Size,
    Theme,
    AspectRatio,
    CommentBlock,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    FlexBox,
    Link,
    Orientation,
    Alignment,
    IconButton,
    Emphasis
} from '@lumx/react';

import { NotificationsProvider, PredefinedErrorBoundary, useLanguage, useNotifications } from 'lumapps-sdk-js';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

import defaultGlobalSettings from './defaultGlobalSettings';
import { isPlainObject, keys } from 'lodash';

import '../style/App.css';
import { mdiDotsVertical, mdiInformationOutline } from '@lumx/icons';




type Widget = import('lumapps-sdk-js').ContentComponent<
    import('./types').SampleAppGlobalParams,
    import('./types').SampleAppParams
>;

const Widget: Widget = ({ value = {}, globalValue = {}, theme = Theme.light }) => {
    const [url, setUrl] = useState<string | undefined>();
    const [error, setError] = useState<string>();

    const { sited, nonewsId, useGreyScale, useBlur, blur, pages, interest, lists, siteurl, excerpt,nonews, useimage, listcols, listitems }: any = value;
    const [testy, setTesty] = useState('');
    
    const { baseUrl = defaultGlobalSettings.baseUrl }: any = globalValue;
   
  //  console.log("WIDGET********************* COLS : " + listcols)
 //   console.log("WIDGET********************* ITEMS : " + JSON.stringify(listitems))

 

    

   // console.log("___________CURRENT NEWS  : " + JSON.stringify(news))

   

    
     interface itemObject {
        id:string;
        webUrl: string;
        createdBy: string;
        createdDateTime:string;
        fields:Array<fieldObject>;
    }

    interface fieldObject {
        field:string;
        fieldValue: string;
       
    }
    interface headerObject {
        name:string;
        label: string;
       
    }
 
    
   function convertCols(res:string)
   {
      // console.log("CONVERT " + res)
       var str = res.toString();
 
   
    var z = str.split(',');
    console.log("CONVERT 2 " + typeof(z))
    for (var i = 0; i < z.length; i++) {
       // console.log(z[i]);
        //Do something
    }

    
    return z;
   }

   function convertColsSpace(res:string)
   {
       console.log("CONVERT SPACE " + res)
       var str = res.toString();
       var str1 = str.replace(/ /g, "");
       str1 = str1.replace("CreatedBy", "createdBy");
       str1 = str1.replace("ModifiedBy", "lastModifiedBy");
       var z = str1.split(',');
    

    console.log("CONVERT 2 SPACE " + typeof(z))
    for (var i = 0; i < z.length; i++) {
       // console.log(z[i]);
        //Do something
    }

    
    return z;
   }
    
    function Manipulate(res?:any)
    {
        if(res)
        {
            
       let list = new Array; 
        Object.keys(res).forEach(key => {
           console.log("MANIPULATING " + key, res[key]);
           var obj={} as any;
            
           
            obj.id = res[key].id;
            obj.webUrl = res[key].webUrl;
            obj.createdBy = res[key].createdBy.user.displayName;
            obj.createdDateTime = res[key].createdDateTime;

            const flds = res[key].fields;

            let fldList = new Array;

                    Object.keys(flds).forEach(key => {

                        var fldObj={} as any;
                    
                        console.log("____________FIELDS " + key, flds[key]);
                        if(key !== "@odata.etag")
                        {
                        fldObj.field = key;
                        fldObj.fieldValue = flds[key];
                        fldList.push(fldObj)

                        obj.fields = fldList;
                        var str = key
                        obj[str] = flds[key];

                        }
                    });
            
           

            list.push(obj)

        })
        console.log("MANPULATED OBJECT LIST " + JSON.stringify(list))
        return list;
    }
}

    function ShowListItems(res?:any, cols?:any) { 
     //   console.log("WWWWWWWWWWWW___________SHOW LIST ITEMS " + typeof(res))
     //  console.log("WWWWWWWWWWW_______SHOWLISTITEMS " + JSON.stringify(res))
     //  console.log("WWWWWWWWWWW_______CURRENT COLUMNS " + listcols)
    
       let list = new Array;
       
       
     
        
        if(res)
        {
           
           
        Object.keys(res).forEach(key => {
         //  console.log(key, res[key]);

          // console.log("_____________ PRIMARY KEY " + JSON.stringify(res[key]))
            var obj={} as any;
            
           
            obj.id = res[key].id;
            // https://cordapse.sharepoint.com/sites/TheHub/Lists/Itinery/3_.000
            //https://cordapse.sharepoint.com/sites/TheHub/Lists/Itinery/DispForm.aspx?ID=1
            var ID = res[key].id;
            var URL = res[key].webUrl;
             var baseurl = URL.substring(0, URL.lastIndexOf("/") + 1)
             console.log("_________" + baseurl)
             var newUrl = baseurl + "DispForm.aspx?ID=" + ID;
             console.log("_________" + newUrl)


            obj.webUrl = newUrl;
            obj.createdBy = res[key].createdBy.user.displayName;
            obj.lastModifiedBy = res[key].lastModifiedBy.user.displayName;
            

            var date1 = new Date(res[key].createdDateTime)
           // console.log("DATE 1 " + date1)
            obj.createdDateTime = "date1";

            var date2 = new Date(res[key].lastModifiedDateTime)
           // console.log("DATE 2 " + date2)
            obj.lastModifiedDateTime = "date2";


            console.log("________________________________OBJECT BEFORE " + JSON.stringify(obj))
            // get the fields
            const flds = res[key].fields;

            let fldList = new Array;

                    Object.keys(flds).forEach(key => {

                        var fldObj={} as fieldObject;
                    
                       // console.log("____________FIELDS " + key, flds[key]);
                        if(key !== "@odata.etag")
                        {
                          //  console.log("_____________ THIS KEY " + key)
                            
                        
                        fldObj.field = key;
                        fldObj.fieldValue = flds[key];
                        fldList.push(fldObj)
                        console.log("PUSH 2_____________  " + JSON.stringify(fldObj))
                        

                        obj.fields = fldList;
                        var str = key

                        var isd = Date.parse(flds[key])
                        if(str == "_UIVersionString")
                        {
                            str = "Version";
                        }
                        if(!isNaN(isd))
                        {
                            var date1 = new Date(isd).toLocaleDateString('en-UK')

                            console.log("DATE 1 " + date1)
                            obj[str] = date1;
                        }

                        
                        else
                        obj[str] = flds[key];
                     //   console.log("PUSH 3_____________  str:" + str)
                      //  console.log("PUSH 3_____________  str:" + flds[key])
                        }
                    });
                   // console.log("_____________________________OBJECT AFTER " + JSON.stringify(obj))
            
            list.push(obj)
            

          });
        }

        console.log("OBJECT LIST " + JSON.stringify(list))

       


        if(res)
        {
            const tableheaders = convertCols(listcols)
            const columnNames = convertColsSpace(listcols)


           
           // const list1 = Manipulate(res)

            // this is where we set the number of news items
        list = list.slice(0,nonews);

        

        return(
           <div className='listContainer'>
               <Table hasDividers theme={theme}>
               
               <TableHeader>
              
                <TableRow>
               {tableheaders.length > 0
              
                            ? tableheaders.map((header) => (
                            <TableCell
                                key={header}
                              
                            >
                               
                                {header}
                            </TableCell>
                            ))
                            : [  
                            ]}
                </TableRow>
                </TableHeader>
             <TableBody>
           {list.length > 0
                    ? list.map((nws) => (
                        
                        <TableRow key={nws.id}>
                            
                           
                            {columnNames.length > 0
                            ? columnNames.map((col) => (
                    
                                 <TableCell>
                                     
                                <FlexBox orientation={Orientation.horizontal} hAlign={Alignment.center}>
                                   
                                <Link color={theme === 'dark' ? 'light' : 'dark'} href={nws.webUrl} target="_blank">
                                        <span className="">{nws[col]}</span>
                                </Link>
                                </FlexBox>
                            </TableCell>
                            ))
                            : [  
                            ]}
                           
                    </TableRow> 

                      ))
                      : [  
                    ]}
                   
                   </TableBody>
                   </Table>
                          </div>
             
               
        );
                        }
                        else
                        return(<div>List items will appear here</div>)
        }
    
    
  
const z = ShowListItems(listitems, listcols)

    useEffect(() => {
        
    }, []);
    return (
       
        <div className="widget-picsum">
            
           
            {error && (
                <Notification
                    theme={theme}
                    type={Kind.error}
                    content={<FormattedMessage id="errors.retrieve_user" />}
                    isOpen
                    actionLabel="Dismiss"
                    onActionClick={() => setError(undefined)}
                />
            )}
           {z}
        </div>
        
    );
}; // end widget settings


const NotificationAwareWidget: Widget = (props) => {
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
            <NotificationsProvider>
                <PredefinedErrorBoundary>
                    <Widget {...props} />
                </PredefinedErrorBoundary>
            </NotificationsProvider>
        </IntlProvider>
    );
};

export { NotificationAwareWidget as Widget };
