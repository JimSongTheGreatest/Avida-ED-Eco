// Process environment.cfg
  
var av = av || {};  // variable exists; this just lets the ide konw that av is defnined
var dijit = dijit || {};  //variable exists; this just lets the ide konw that dijit is defnined

//============================================================================================ read environment.cfg ==
// to make nutrient structure; and then to create user controls

//-------------------------------------------------------------------------------------------- av.env.findNameIndex --
av.env.findNameIndex = function(nutrientObj, rtag, geometry) {
  /*
   * 
   * @param nutrientObj =  the suboabject of av.nut that holds the arrays for logic9 type
   * @param rtag       the string that we are looking for. If the string is found data will be over written. 
   *                     if not, create a new entry in the arrays
   * @returns {Int}
   * 
   * Look for rtag in structure
   * return its index if it exists
   * return length + 1 is it does not exist
   */

  var defaultindex = nutrientObj.name.length;

  //console.log('rtag=', rtag, '; geometry = ', geometry, '; defaultindex=', defaultindex);
  if (undefined !== geometry) {
    if ('grid' === geometry.toLowerCase() && 1 > defaultindex) {
      defaultindex = 1;
    }
    else if ('global' === geometry.toLowerCase() && 1 > defaultindex) { 
      defaultindex = 0;
    };
  }
  else {console.log('why is geometry undefined: geometry = ', geometry);}

  var found = nutrientObj.name.indexOf(rtag);

  //onsole.log('defaultindex = ',  defaultindex, '; name.length = ', nutrientObj.name.length, 'found=', found );

  if (-1 < found) {
    //console.log('The name ', rtag, ' was found already in av.nut;   The subobject=',nutrientObj);
    return found;
  } 
  //if (av.dbg.flg.nut) { console.log('defaultindex=',defaultindex,'; rtag='+rtag, '; found=', found, '; nutrientObj.name=', nutrientObj.name); }
  return defaultindex;  
};
//---------------------------------------------------------------------------------------- end av.env.findNameIndex --

// Avida reacton line format
// REACTION reactionName taskName process:resource=resourceName:value=2:type=pow:max=1.1:min=0.9 requisite:max_count=1
// Avida-ED 3 version for no resource is 
// REACTION ANDN andn process:value=0.0:type=pow requisite:max_count=1  #value=3.0
//
// For now in Avida-ED 4.0.16 Beta; the the Resource MUST be defined before the Reaction for that resource. 

//------------------------------------------------------------------------------------------- av.env.reActLineParse --
av.env.reActLineParse = function(lnArray, from) {
  'use strict';
  //if (av.dbg.flg.nut) { console.log('Nut: ', from, ' called av.env.reActLineParse'); }
  var lnError = '';     //was it a valid line wihtout errors
//  if (av.dbg.flg.nut) { console.log('Nut: av.env.reActLineParse: lnArray = ', lnArray); }
  var pear = [];
  var nn;

  var logicindex = av.sgr.logicVnames.indexOf( lnArray[2] );   //task name length is variable so must fined in that the correct list of logic functions
  //console.log('logicindex=',logicindex);
  if (-1 < logicindex) {
    var numTsk = av.sgr.logEdNames[logicindex];
    // Checking for a resource tag
    //console.log('numTsk=', numTsk);
    var reActObj = av.nut[numTsk].react;   //objec based on logic type and reaction;
    //console.log('numTsk=', numTsk,'; lnArray', lnArray);
    //console.log('av.nut.'+numTsk+'.uiAll.geometry = ');

// if (av.dbg.flg.nut) { console.log('av.nut['+numTsk+'].uiAll = ',av.nut[numTsk].uiAll); }

    var ndx = av.env.findNameIndex(reActObj, lnArray[1], av.nut[numTsk].uiAll.geometry);
    reActObj.name[ndx] = lnArray[1];   //assin the name of the resource. 
    //console.log('REACT: ndx = ', ndx, '; lnArray[1]', lnArray[1], 'reactName=', reActObj.name, 'uiAll.geometry=', av.nut[numTsk].uiAll.geometry );

    var len;
    var lngth = lnArray.length;
    //console.log('REACT: ndx=',ndx, '; name=lnArray[1]=',lnArray[1],'; task=',lnArray[2], '; numTsk=', numTsk, '; lnArray.length=', lnArray.length);
    for (var jj=3; jj<lngth ;jj++) {
      var pairArray = lnArray[jj].split(':');    //this should get process
      len = pairArray.length;    
      //console.log('len=',len,'; pairArray=',pairArray);
      for (var ii=1; ii < len; ii++) {
        pear = pairArray[ii].split('=');
        //console.log('React: ii=',ii,'; pear', pear);
        nn = av.sgr.react_argu.indexOf(pear[0].toLowerCase());
        if (-1 < nn) {
          reActObj[av.sgr.react_argu[nn]][ndx] = pear[1];
        }
        else {
            lnError = ' '+pear[0]+' is not a valid reaction keyword. lnArray = '+lnArray;
            //console.log(lnError);
        };
      };
    };
    //console.log('av.nut['+numTsk+'].react=', av.nut[numTsk].react);
  }
  // valid logic name not found;
  else {
    lnError = 'react task, |'+ lnArray[2]+'| not found in av.sgr.logicVnames';
    console.log(lnError+':', av.sgr.logicVnames);
  };

  return lnError;
};
//--------------------------------------------------------------------------------------- end av.env.reActLineParse --

//--------------------------------------------------------------------------------------- av.env.reSrcNameBasedInfo --
// this function puts data in av.nut.[numTsk].uiAll and uiSub[sub] based on the name of the resource;
av.env.reSrcNameBasedInfo = function(numTsk, sub) {
  var re_name = /(\D+)(\d+)([qn])(.*$)/;    // match array = whole line? , task, region number, data about things with a side (gradient, flow), else NULL
  var re_region = /(\D+)(\d+)(.*$)/;    // match array = whole line? , task, region number, data about things with a side (gradient, flow), else NULL    

  nameRCR = av.nut[numTsk].resrc.name[sub];

  // resource name matches resource in reaction cfg line.
  // Reaction names a Resource; Need to find info about that resource to determine Supply Type. supplyTypeSlcts will
  // be determined after the entire file has beeen read to make sure the named resource  is in the (nut)rient structure 

  //if (av.dbg.flg.nut) console.log('Nut: reSrcLineParse: pairArray=', pairArray);
  //find logic type include test for quarters vs ninths subregion layout. 
  matchTaskRegion = nameRCR.match(re_name);  // Matches using re_name pattern: looing for tsk##q
  //if (av.dbg.flg.nut) console.log('nut: name =', av.nut[numTsk].resrc.name[sub],'; re_name=', re_name, ', matchTaskRegion=', matchTaskRegion);
  if (null == matchTaskRegion) {
    matchTaskRegion = nameRCR.match(re_region);  // Matches using re_num pattern.
    //console.log('nut: reSrc pairArra[0]=', nameRCR,'; re_region=', re_region, ', matchTaskRegion=', matchTaskRegion);
    if (null != matchTaskRegion) {
      //assume 'q' for quarters if suffix letter indicating subregion layout not included. 
      matchTaskRegion[4] = matchTaskRegion[3];   //                                   1 2
      matchTaskRegion[3] = 'q';  //q=quarters for a dish divided in 4 regions.        3 4      with 00 = whole dish
                                 //n=ninths for a dish divided into ninths as layed out on a phone with 000 = whole dish (not implemented)
    }
  }
  if (null == matchTaskRegion) {
    console.log('ERROR: RESOURCE name format wrong; nameRCR=', nameRCR);
  } else {
    //console.log('nut: nameRCR=', nameRCR,', matchTaskRegion=', matchTaskRegion);
    var tsk =  matchTaskRegion[1];

    //Find region
    //console.log('RESOURCE: matchTaskRegion=', matchTaskRegion);
    //to add a leading zero if needed and add if code is based on 4 quarters or 9 octothorpe
    regionStr = ('000'+ matchTaskRegion[2]).slice(-3);
    //console.log('regionStr=', regionStr);
    av.nut[numTsk].uiSub.regionSet[sub] = matchTaskRegion[3];
    av.nut[numTsk].uiSub.regionCode[sub] = regionStr;   //This is a one to three digit string with leading zeros.
    av.nut[numTsk].uiSub.regionNdx[sub] = av.sgr.regionQuarterCodes.indexOf(regionStr);

    //console.log('av.nut['+numTsk+'].uiSub.regionNdx['+sub+']=', av.nut[numTsk].uiSub.regionNdx[sub]);
    av.nut[numTsk].uiSub.regionName[sub] = av.sgr.regionQuarterNames[av.nut[numTsk].uiSub.regionNdx[sub]];
    //if (av.dbg.flg.nut) { console.log('Nut: RESOURCE: av.nut['+numTsk+'].uiSub.regionCode['+sub+']=', av.nut[numTsk].uiSub.regionCode[sub],'; av.nut[numTsk].uiSub.regionName[sub]=',av.nut[numTsk].uiSub.regionName[sub]); }
    //if (av.dbg.flg.nut) { console.log('Nut: RESOURCE: av.num['+numTsk+'].name['+sub+']=',av.nut[numTsk].resrc.name[sub]); }
  }
};

//----------------------------------------------------------------------------------- end av.env.reSrcNameBasedInfo --

//------------------------------------------------------------------------------------------- av.env.reSrcLineParse --
av.env.reSrcLineParse = function(lnArray, from ){
  'use strict';
  var lineErrors = '';  //was it a valid line wih tout errors
  // if (av.dbg.flg.nut) { console.log('nut: ', from, ' called av.env.reSrcLineParse'); }
  //if (av.dbg.flg.nut) { console.log('lnArray = ', lnArray); }
  var pairArray = lnArray[1].split(':');
  var pear = [];
  var cellboxdata = [];
  var len;
  var nn; 
  var numTsk;
  var rSourcObj;
  var geometry = '';
  var ndx;

  var tsk = pairArray[0].substr(0,3);
  //console.log('name=', pairArray[0], '; tsk=', tsk);
  var logicindex = av.sgr.logicNames.indexOf( tsk );
  if (-1 < logicindex) {
    numTsk = av.sgr.logEdNames[logicindex];
    // Checking for a resource tag
    rSourcObj = av.nut[numTsk].resrc;
    //console.log('numTsk='+numTsk,'; rSourcObj=', rSourcObj);

    // find geometry as global tasks are placed in index 0 within av.nut[numTsk].resrc[index]
    //if (av.dbg.flg.nut) console.log('numTsk=', numTsk,'; av.nut[numTsk].uiAll.geometry=', av.nut[numTsk].uiAll.geometry);
    len = pairArray.length;
    for (var ii=1; ii < len; ii++) {
      pear = pairArray[ii].split('=');
      //console.log('pear = ', pear);
      if ('geometry' === pear[0].toLowerCase() ) {
        geometry = pear[1];
        break;
      };   
    };
    if (av.dbg.flg.nut) { 
      // console.log('reSrce: pairArray = ', pairArray);
      // console.log('; geometry['+numTsk+']=', geometry); 
    }

    // Set geometry: in Avida-ED, geometry=Grid or global; The user interface calls Grid = 'Local'
    //console.log('av.nut[numTsk].resrc.geometry['+sub+']=', av.nut[numTsk].resrc.geometry[sub]);
    //// console.log('av.nut['+numTsk+'].uiAll.geometry', av.nut[numTsk].uiAll.geometry);
    if ('grid' == geometry || 'global' == geometry ) {
      av.nut[numTsk].uiAll.geometry = geometry;
    }
    else { 
      console.log('ERROR: geometry was not set correctly in environment.cfg *********************************');
      console.log('pairArray=', pairArray, '; av.nut['+numTsk+'].uiAll.geometry=', av.nut[numTsk].uiAll.geometry);
    };

    // check to make sure name is unqiue. If it is not unique then overright the previous data. 
    // index into all the arrays that hold resource/reaction parameters; The name should be unique for all arrays in the object. 
    ndx = av.env.findNameIndex(rSourcObj, pairArray[0], av.nut[numTsk].uiAll.geometry);   
    //console.log('RESROUCE: ndx=',ndx, '; tsk=',tsk, '; name=', pairArray[0], 'resrcName=', rSourcObj.name, 'uiAll.geometry=', av.nut[numTsk].uiAll.geometry );
    //if (av.dbg.flg.nut) { console.log('ndx=',ndx); }
    if (-1 < ndx) {
      rSourcObj.name[ndx] = pairArray[0];    //asign the name of the resource statement. 
      av.nut[numTsk].resrc.geometry[ndx] = geometry;

      //Find information based on resource name
      av.env.reSrcNameBasedInfo(numTsk, ndx);

      // assign default values are from https://github.com/devosoft/avida/wiki/Environment-file with a few exceptions
      // defaults are put directly in the dom

      // boxflag is false indicating there are no box values. 
      rSourcObj.boxflag[ndx] = false;

      //process all data pairs
      len = pairArray.length;
      //console.log('len=',len,'; pairArray=',pairArray);
      for (var ii=1; ii < len; ii++) {
        pear = pairArray[ii].split('=');
        nn = av.sgr.resrc_argu.indexOf(pear[0].toLowerCase());
        //if (av.dbg.flg.nut) { console.log('Resource: ii=',ii,'; pear=', pear, '; nn=', nn); }
        if (-1 < nn) {
          rSourcObj[av.sgr.resrc_argu[nn]][ndx] = pear[1];
          //console.log('av.sgr.resrc_argu[nn]=',av.sgr.resrc_argu[nn], '; value =', rSourcObj[av.sgr.resrc_argu[nn]][ndx] );
        }
        else {
          //console.log('pear= ', pear[0]);
          if ('cellbox' === pear[0].toLowerCase()) {
            cellboxdata = pear[1].split('|');
            //console.log('cellboxdata=',cellboxdata);
            rSourcObj.boxflag[ndx] = true;
            rSourcObj.boxx[ndx] = cellboxdata[0];
            rSourcObj.boxy[ndx] = cellboxdata[1];
            rSourcObj.boxcol[ndx] = cellboxdata[2];
            rSourcObj.boxrow[ndx] = cellboxdata[3];
            //console.log('rSourcObj.boxrow[ndx]=', rSourcObj.boxrow[ndx]);
          }
          else {
            lineErrors = 'leftside, '+pear[0]+', not a valid resource keyword. lnArray = '+lnArray;
            if (av.dbg.flg.nut) { console.log(lineErrors); }
          };
        };
      };   //end of proccessing data pairs
      // look for area based on inflow x & y values if they exist


    }  //end of valid ndx found for the subdish names
  }    //end of valid logic name
  else {
    // valid logic name not found;
    lineErrors = 'RESOURCE: pairArray.substring='+pairArray[0].substring(0,3)+' not found in av.sgr.logicNames';
    console.log(lineErrors);
  }
  //console.log('RESOURCE: lineErrors=', lineErrors);
  return lineErrors;
};
//--------------------------------------------------------------------------------------- end av.env.reSrcLineParse --

//------------------------------------------------------------------------------------------- av.env.cell_LineParse --
av.env.cell_LineParse = function(lnArray, from) {
  'use strict';
  //if (av.dbg.flg.nut) { console.log('____', from, ' called av.env.cell_LineParse _____'); }
  var lnError = '';     //was it a valid line wihtout errors
  var pair = lnArray[1].split(':');
  var len = pair.length;
  var pear = [];
  var ndx;
  var nn;

  // console.log('CELL lnArray = ', lnArray);
  // console.log('Resource = pair[0]=',pair[0]);
  var tsk = pair[0].substr(0,3);

  var logicindex = av.sgr.logicNames.indexOf(tsk);  
  //console.log('logicindex=',logicindex);
  if (-1 < logicindex) {
    var numTsk = av.sgr.logEdNames[logicindex];
    // console.log('numTsk=', numTsk);
    // Checking for a resource tag
//    rsrc = pair[0];
//    ndx = av.nut[numTsk].resrc.indexOf(rsrc);
    ndx = av.nut[numTsk].resrc.name.indexOf(pair[0]);
    // console.log('CELL ndx=', ndx);
    if (0> ndx) {
      // console.log('CELL resource=', pair[0], 'is not in RESOURCE name list = ', av.nut[numTsk].resrc.name); 
      if ( av.nut[numTsk].resrc.name.length > av.nut[numTsk].cell.resrc.length) {
        ndx = av.nut[numTsk].resrc.name.length;
      }
      else { ndx = av.nut[numTsk].cell.resrc.length; }
    };
    // console.log('av.nut['+numTsk+'].uiAll = ', av.nut[numTsk].uiAll);
    av.nut[numTsk].cell.resource[ndx] = pair[0];
    av.nut[numTsk].cell.list[ndx] = pair[1];
    // console.log('CELL: ndx = ', ndx, '; lnArray[1]', lnArray[1], 'cellResource=', av.nut[numTsk].cell.resource, 'uiAll.geometry=', av.nut[numTsk].uiAll.geometry );

    for (var ii=2; ii < len; ii++) {
      pear = pair[ii].split('=');
      // console.log('av.sgr.cell_argu=', av.sgr.cell_argu);
      nn = av.sgr.cell_argu.indexOf(pear[0].toLowerCase());
      if (av.dbg.flg.nut) { console.log('Resource: ii=',ii,'; pear=', pear, '; nn=', nn); }
      if (-1 < nn) {
        av.nut[numTsk].cell[av.sgr.cell_argu[nn]][ndx] = pear[1];
        // console.log('av.sgr.cell_argu['+nn+']=', av.sgr.cell_argu[nn]);
        // console.log('av.nut['+numTsk+'].cell[' + av.sgr.cell_argu[nn] +'['+ndx+']=', pear[1] );
      }
      else {
        // console.log('left side of pear not a cell argument: leftside = ', pear[0], 'cell arguments=', av.sgr.cell_argu);
      }
    }

  }
  // valid logic name not found;
  else {
    lnError = 'cell task in pair[0]=' + pair[0] + '; tsk='+ tsk + '; not found in av.sgr.logicNames = ', av.sgr.logicName;
    // console.log('CELL: lnError=',lnError);
  };
  // console.log('CELL: numtsk=', numTsk, '; nut.cell=', av.nut[numTsk].cell);
  return lnError;
};
//--------------------------------------------------------------------------------------- end av.env.cell_LineParse --

//-------------------------------------------------------------------------------------------- av.env.nutrientParse --
// Uses environment.cfg file to create a structure to hold environment variables.   uses av.nut
av.env.nutrientParse = function (filestr, from) {
  'use strict';
  if (av.dbg.flg.nut) { console.log('Nut:', from + ' called av.env.nutrientParse =='); }
  var errors='';
  var reacError='', rsrcError='', cellError='';
  var eolfound;
  //var lineobj;
  var aline;
  var lines = filestr.split('\n');
  var lngth = lines.length;
  var matchComment, matchContinue, matchResult, metaData;
  var re_metaData = /^(.*?)#!.*$/;    //metadata 
  var re_comment =  /^(.*?)#.*$/;   //look at begining of the line and look until #; used to get the stuff before the #
  var re_continue = /^(.*?)\\/;  //look for continuation line
  var re_REACTION = /^(.*?)REACTION/i;
  var re_CELL = /^(.*?)CELL/i;
  var re_RESOURCE = /RESOURCE/i;
  var lineArray;
  var ii = 0;
  if (av.dbg.flg.nutSum) {
    console.log('--------------------------------------------------------------------------------------- start of av.env.nutrientParse --');
    av.nut_beforeParse = {};
    av.nut_beforeParse = JSON.parse(JSON.stringify(av.nut));
    console.log('av.nut_beforeParse = ', av.nut_beforeParse); 
  }

  while (ii < lngth) {
    eolfound = false;
    metaData = lines[ii].match(re_metaData);        //console.log("lines["+ii+"]=", lines[ii]);
    matchComment = lines[ii].match(re_comment);
    //if (null !== metaData) { console.log('metaData=', metaData); }   // not useing metadata, hope there is no neeed
    if (null !== matchComment) {aline = matchComment[1];}
    else aline = lines[ii];
    if (3 < aline.length) {
      //console.log('aline.length=', aline.length,'; aline=', aline);
      do {
        //console.log('ii', ii, '; eolfound=', eolfound,'; aline=', aline);
        if (ii+1 < lngth) {
          matchContinue = aline.match(re_continue);
          //console.log('matchContinue=',matchContinue);
          if (null !== matchContinue) {
            ii++;
            //console.log('ii=', ii);
            matchComment = lines[ii].match(re_comment);
            //console.log('matchComment=',matchComment);
            if (null !== matchComment) {aline = matchContinue[1]+matchComment[1];}
            else aline = matchContinue[1]+lines[ii];
          }
          else eolfound = true;
        }
        else eolfound = true;
        //console.log('ii', ii, '; eolfound=', eolfound,'; aline=', aline);
      }
      while (!eolfound)  //end of subloop for continuation lines
      //console.log('ii', ii, '; aline=', aline);
      // look for valid starting keyword
      lineArray = av.utl.spaceSplit(aline).split('~');      //change , to !; remove leading and trailing space and replaces white space with a ~, then splits on ~
      //console.log('lineArray=', lineArray);

      //look for a RESOURCE statement
      matchResult = lineArray[0].match(re_RESOURCE);
      //consolen('matchResource=', matchResult);
      if (null !== matchResult) { 
        rsrcError = av.env.reSrcLineParse(lineArray, 'av.env.nutrientParse');
        if ('' != rsrcError) console.log('reSrcLineParse: lineArray=', lineArray, '; rsrcError=', rsrcError);          
      }
      else {rsrcError = '';}

      //look for a REACTION statement
      matchResult = lineArray[0].match(re_REACTION);
      //console.log('matchReaction=', matchResult);
      if (null !== matchResult) { 
        //if (av.dbg.flg.nut) { console.log('reActLineParse: lnArray=', lineArray); }
        reacError = av.env.reActLineParse(lineArray, 'av.env.nutrientParse');
        if ('' != reacError) console.log('reActLineParse: lineArray=', lineArray, '; reacError=', reacError);          
      }
      else {
        reacError='';
        //console.log('no matach on REACTION');
      };

      //look for a CELL statement
      matchResult = lineArray[0].match(re_CELL);
      //console.log('matchReaction=', matchResult);
      if (null !== matchResult) { 
        //if (av.dbg.flg.nut) { console.log('cell_LineParse: lnArray=', lineArray); }
        cellError = av.env.cell_LineParse(lineArray, 'av.env.nutrientParse');
        if ('' != cellError) console.log('CELL_LineParse: lineArray=', lineArray, '; cellError=', cellError);          
      }
      else {
        cellError='';
        //console.log('no matach on REACTION');
      };

      if ('' !== rsrcError || '' !== reacError || '' != cellError) {
        console.log('------------------------------------------------------- aline=', aline);
        errors += 'ii='+ii+'; rsrcError='+rsrcError+'; reacError='+reacError+'; cellError='+cellError+'\n';
        console.log('ii='+ii+'; rsrcError='+rsrcError+'; reacError='+reacError+'; cellError='+cellError);
      };

    //if (av.dbg.flg.nut) console.log('--------------------- end of processing a line that was longer than 3 characters -------------------------------');
    }  //end of processing one line that was lines longer than 3 characters
    ii++;
  } // while that goes through lines in file. 

        //if (av.dbg.flg.nut) { 
  if (av.dbg.flg.nutSum) {
    console.log('end of av.env.nutrientParse');
    av.nut_env_cfg = {};
    av.nut_env_cfg = JSON.parse(JSON.stringify(av.nut));
    console.log('av.nut_env_cfg = ', av.nut_env_cfg); 
  }
  if (av.dbg.flg.nutSum) { 
    console.log('Nut: ======================================================================================= end av.env.nutrientParse =='); 
  }
};
//---------------------------------------------------------------------------------------- end av.env.nutrientParse --


