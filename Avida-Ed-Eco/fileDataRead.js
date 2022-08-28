  //Read file data
  var av = av || {};  //incase av already exists
  var dijit = dijit || {};  //incase av already exists

  // if (av.dbg.flg.root) { console.log('Root: before av.fio.addFzItem'); }
  /*------------------------------------------------------------------------------------------------ av.fio.addFzItem --*/

  av.fio.addFzItem = function(target, name, type, fileNum, from) {
    // example 'container' input format: '.className' or '#id'
    'use strict';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    if (container !== undefined) {
      // if the container is not yet in the av.dnd.containerMap, add an entry

      console.log('container =', container);
      console.log('av.dnd.containerMap =', av.dnd.containerMap);
      console.log('Object =', Object);
      if (Object.keys(av.dnd.containerMap).indexOf(container) === -1) {
        av.dnd.containerMap[container] = {};
      };
      // 'insertNodes' implementation
      var domid = `dom_${type}${fileNum}`
      if (type === 'g') 
      {
        $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${name} </div>`);
      } 
      else 
      {
        $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-dish-icon.png' class='DishIcon'> ${name} </div>`);
      }
      
      av.dnd.containerMap[container][domid] = {"name": name, "type": type};
      if (av.dbg.flg.frd) console.log('fileNum=', fileNum, '; name=', name, '; Section=', av.dnd.containerMap[container][domid]);

      // create a right av.mouse-click context menu for the item just created.
      if (0 < fileNum) {
        av.dnd.contextMenu(target, domid, 'av.fio.addFzItem');
      }
      return domid;
    } else {
      return 'dndSection is undefined';
    }
  };

  /*-------------------------------------------------------------------------------------- av.frd.add2freezerFromFile --*/
  av.frd.add2freezerFromFile = function (loadConfigFlag, from) {
    'use strict';
    //console.log(from, ' called av.frd.add2freezerFromFile: loadConfigFlag = ', loadConfigFlag);
    var type = av.fio.anID.substr(0, 1);
    //console.log('av.fio.anID', av.fio.anID);
    var dir = av.utl.wsb('/', av.fio.anID);
    var num = dir.substr(1, dir.length-1);
    var name, domid;
    //console.log('av.fio.thisfile.asText()', av.fio.thisfile.asText());
    //console.log('av.fio.thisfile', av.fio.thisfile);
    if (null === av.fio.thisfile.asText()) { name = av.fio.anID; }
    else { name = av.utl.wsb('\n', av.fio.thisfile.asText()); }

    //if (av.dbg.flg.frd) console.log('type ', type, '; dir', dir, '; num', num);

    switch (type) {
      case 'c':
        domid = av.fio.addFzItem(av.dnd.fzConfig, name, type, num, 'av.frd.add2freezerFromFile: c');
        if ('dndSection is undefined' === domid) console.log('av.dnd.fzConfig is undefined');
        if (av.fzr.cNum < Number(num)) {av.fzr.cNum = Number(num); }
        //The default config file is loaded as the activeConfig after all the files are loaded. 
        //if (0 == num && loadConfigFlag) {var ConfigActiveDomID = av.fio.setActiveConfig(av.dnd.activeConfig, name, 'b');}
        break;
      case 'g':
        domid = av.fio.addFzItem(av.dnd.fzOrgan, name, type, num, 'av.frd.add2freezerFromFile: g');
        if ('dndSection is undefined' === domid) console.log('av.dnd.fzOrgan is undefined');
        if (av.fzr.gNum < Number(num)) {av.fzr.gNum = Number(num); }
        break;
  /*
      case 'm':
        domid = av.fio.addFzItem(av.dnd.fzMdish, name, type, num, 'frd.add2freezerFromFile: m');
        av.fzr.mDish[dir] = {};
        av.fzr.mDish[dir].dir = {};
        av.fzr.mDish[dir].domid = {};
        av.fzr.mDish[dir].cNum = -1;
        av.fzr.mDish[dir].wNum = -1;
        if ('dndSection is undefined' == domid) console.log('av.dnd.fzMdish is undefined------------------------------');
        if (av.fzr.mNum < Number(num)) {av.fzr.mNum = Number(num); }
        break;
      case 'r':
        domid = av.fio.addFzItem(av.dnd.fzRdish, name, type, num, 'av.frd.add2freezerFromFile: r');
        if ('dndSection is undefined' == domid) console.log('av.dnd.fzrDish is undefined');
        if (av.fzr.rNum < Number(num)) {av.fzr.rNum = Number(num); }
        break;
  */
      case 't':
        domid = av.fio.addFzItem(av.dnd.fzTdish, name, type, num, 'av.frd.add2freezerFromFile: t');
        if ('dndSection is undefined' === domid) console.log('av.dnd.fzTdish is undefined');
        if (av.fzr.tNum < Number(num)) {av.fzr.tNum = Number(num); } 
        break;
      case 'w':
        domid = av.fio.addFzItem(av.dnd.fzWorld, name, type, num, 'av.frd.add2freezerFromFile: w');
        if ('dndSection is undefined' === domid) console.log('av.dnd.fzWorld is undefined');
        if (av.fzr.wNum < Number(num)) {av.fzr.wNum = Number(num); }
        break;
    }
    av.fzr.file[av.fio.anID] = name;
    av.fzr.domid[dir] = domid;
    av.fzr.dir[domid] = dir;
  };

  /*------------------------------------------------------------------------------------ av.frd.add2multiDishFromFile --*/
  //    no longer in use as of 2020 Aug. Delete in future
  av.frd.add2multiDishFromFile = function(){
    "use strict";
/*  //console.log(from, ' called av.frd.add2multiDishFromFile');
    //console.log('av.fio.fName', av.fio.fName, '; av.fio.anID', av.fio.anID, '; av.fzr.folderType=',av.fzr.folderType);
    var multiDish = av.utl.wsb('/', av.fio.anID);
    var superNum = multiDish.substr(1, multiDish.length-1);
    var firstIndex = av.fio.anID.indexOf('/');
    var lastIndex = av.fio.anID.lastIndexOf('/');
    var length = lastIndex - firstIndex - 1;
    //console.log('firstI=', firstIndex, ';  lastI=', lastIndex);
    var subDish = av.fio.anID.substr(firstIndex+1, length);
    var type = subDish.substr(0,1);
    var subNum = subDish.substr(1, subDish.length-1);
    switch (type) {
      case 'c':
        if (av.fzr.mDish[multiDish].cNum < Number(subNum)) {av.fzr.mDish[multiDish].cNum = Number(subNum); }
        break;
      case 'w':
        if (av.fzr.mDish[multiDish].wNum < Number(subNum)) {av.fzr.mDish[multiDish].wNum = Number(subNum); }
        break;
    }
    av.fzr.mDish[multiDish].domid[subDish] = subNum;  //eventually subNum will be a domid, but we are not building the editing interface yet.
    av.fzr.mDish[multiDish].dir[subNum] = subDish;

    //console.log('multiDish=', multiDish, '; superNum=', superNum, '; subDish=', subDish, '; subNum=', subNum, '; type=', type, 'wNum=', av.fzr.mDish[multiDish].wNum);
*/
  };
  /*------------------------------------------------------------------------------------------ aav.frd.processSubDish --*/
  //    no longer in use as of 2020 Aug. Delete in future
  av.frd.processSubDish = function() {
    "use strict";
    //console.log('SubDish:', av.fzr.folderType, ';  ID=', av.fio.anID);
  };

  //--------------------------------------------------------------------------------------------- av.fio.processFiles --
  // 
  av.fio.processFiles = function (loadConfigFlag, from) {
    'use strict';
    if (av.dbg.flg.frd) { console.log('FIO: ',from, ' called av.fio.processFiles: loadConfigFlag = ', loadConfigFlag); }
    //console.log('FIO: ',from, ' called av.fio.processFiles: loadConfigFlag = ', loadConfigFlag);
    var fileType = av.fio.anID;
    
    //Multi-dish not being implented at this time so subDish should never be a av.fzr.folderType    //delete in 2021
    //if ('subDish' === av.fzr.folderType){
    //  fileType = av.utl.wsa('/', fileType); 
    //  //av.frd.processSubDish();
    //};
    
    fileType = av.utl.wsa('/', fileType);
    //if (av.debug.fio) console.log('anID=', av.fio.anID, '; fileType=', fileType, '; fziType=', av.fzr.folderType);
      switch (fileType) {
        case 'entryname.txt':
          if ('subDish' !== av.fzr.folderType) {  //the if was added when trying to deal with multi-dish they used the else case
            // all normal files
            av.frd.add2freezerFromFile(loadConfigFlag, 'av.fio.processFiles');
            av.fzr.usrFileLoaded = true;
          }
          else {
            // only for dealing with the multi-dish section
            av.frd.add2multiDishFromFile();
          }
        case 'ancestors':
        case 'ancestors_manual':
        case 'tr0':
        case 'tr1':
        case 'tr2':
        case 'tr3':
        case 'tr4':
        case 'update':
        case 'ancestors.txt':
        case 'ancestors_manual.txt':
        case 'avida.cfg':
        case 'clade.ssg':
        case 'detail.spop':
        case 'environment.cfg':
        case 'events.cfg':
        case 'genome.seq':
        case 'instset.cfg':
        case 'pauseRunAt.txt':
        case 'offset.txt':
        case 'timeRecorder.csv':
        case 'tr0.txt':
        case 'tr1.txt':
        case 'tr2.txt':
        case 'tr3.txt':
        case 'tr4.txt':
        case 'update.txt':
          // deal with multidish - not sure what this section has to do with multi-dish? perhaps a reminder that if we implement multidishh?

          // fix files that are missing the .txt extension
          switch (fileType) {
            case 'ancestors':
            case 'ancestors_manual':
            case 'tr0':
            case 'tr1':
            case 'tr2':
            case 'tr3':
            case 'tr4':
            case 'update':
              //console.log('av.fio.anID = ', av.fio.anID);
              av.fio.anID += '.txt';
              break;
          };

          //need to fix this so the config dish is loaded after all the files are read not during the file reading. 
          //if (loadConfigFlag) {        
          // trying false; if thise works well this section will be deleted. 
          if (false) {
              //console.log('loadConfigFlag = ', loadConfigFlag);
              if ('c0/avida.cfg' === av.fio.anID) {
                av.frd.avidaCFG2form(av.fio.thisfile.asText(), 'av.fio.processFiles');
              }
              else if ('c0/environment.cfg' === av.fio.anID) {
                av.frd.environmentCFG2form(av.fio.thisfile.asText().trim());
              }
              else if ('c0/events.cfg' === av.fio.anID) {
                //must be callsed after environment, but c0/events is empty
                av.frd.eventsCFG2form(av.fio.thisfile.asText().trim(), 'av.fio.processFiles');
              }
            };

            //put the text of the file in the freezer
            av.fzr.file[av.fio.anID] = av.fio.thisfile.asText().trim();

            //Process dishes with ancesotrs. //this was commented out before 2019_1225;s
            //if ('ancestors' == fileType || 'ancestors_manual' == fileType) {
            //  av.fio.anID = av.fio.anID + '.txt';
            //};

            //if (av.debug.fio) console.log('FileType is ', fileType, '; filepath = ', av.fio.anID);
          break;
        default:
          //if (av.debug.fio) console.log('undefined file type in zip: full ', av.fio.fName, '; id ', av.fio.anID, '; type ', fileType);
          break;

      //if (av.debug.fio) console.log('file type in zip: fname ', av.fio.fName, '; id ', av.fio.anID, '; type ', fileType);
      //console.log('file type in zip: fname ', av.fio.fName, '; id ', av.fio.anID, '; type ', fileType);
    }
  };
  //-------------------------------------------------------------------------------------- end of av.fio.processFiles --

  //----------------------------------------------------------------------------------------- av.fio.processItemFiles --
  // used to load a single freeer item, not a whole workspace
  av.fio.processItemFiles = function (){
    'use strict';
    switch (av.fio.anID) {
      case 'ancestors':
      case 'ancestors_manual':
      case 'tr0':
      case 'tr1':
      case 'tr2':
      case 'tr3':
      case 'tr4':
      case 'update':
      case 'entryname.txt':
      case 'entrytype.txt':
      case 'ancestors.txt':
      case 'ancestors_manual.txt':
      case 'avida.cfg':
      case 'clade.ssg':
      case 'detail.spop':
      case 'environment.cfg':
      case 'events.cfg':
      case 'genome.seq':
      case 'instset.cfg':
      case 'pauseRunAt.txt':
      case 'timeRecorder.csv':
      case 'tr0.txt':
      case 'tr1.txt':
      case 'tr2.txt':
      case 'tr3.txt':
      case 'tr4.txt':
      case 'update.txt':

        // fix files that are missing the .txt extension
        if (av.debug.fio) { console.log('av.fio.anID = ', av.fio.anID); }
        switch (av.fio.anID) {
          case 'ancestors':
          case 'ancestors_manual':
          case 'tr0':
          case 'tr1':
          case 'tr2':
          case 'tr3':
          case 'tr4':
          case 'update':
            av.fio.anID += '.txt';
            break;
        };

        if ('ancestors' === av.fio.anID ||'ancestors_manual' == av.fio.anID) {
          av.fio.anID = av.fio.anID + '.txt';
        };
        //put the text of the file in the freezer
        if (av.debug.fio) { console.log('av.fio.anID = ', av.fio.anID); }
        av.fzr.item[av.fio.anID] = av.fio.thisfile.asText().trim();
        break;
      default:
        if (av.debug.fio) console.log('undefined file type in zip: full ', av.fio.fName, '; id ', av.fio.anID);
        break;
    }
  };
  //====================================================================================================================

  //--------------------------------------------------------------------------------------------- av.frd.updateSetups --
  //update config data from file data stored in freezer
  av.frd.updateSetup = function(from) {
    'use strict';
    var dir = av.fzr.actConfig.dir;
    // av.dbg.flg.frd
    if (true) { console.log(from, 'called av.frd.updateSetup; dir=', dir); }

    var doctext = av.fzr.file[dir + '/avida.cfg'];
    console.log('');
    av.frd.avidaCFG2form(doctext, 'av.frd.updateSetup');

    doctext = av.fzr.file[dir + '/environment.cfg'];
    if (av.dbg.flg.frd) { console.log(dir + '/environment.cfg:  ', doctext); }
    av.env.environment2UI(doctext, 'av.frd.updateSetup');      //puts environment in a structure
    
    doctext = av.fzr.file[dir + '/events.cfg'];
    if (av.dbg.flg.frd) { console.log('events.cfg = ', doctext, '; length = ', doctext.length); }
    if (2 < doctext.length) {
      //must be processed after environment.cfg
      av.frd.eventsCFG2form(doctext, 'av.frd.updateSetup');
    };

    doctext = av.fzr.file[dir + '/pauseRunAt.txt'];
    if (undefined !== doctext) { av.frd.pauseRunAtTXT2form(doctext); }
  };
  //--------------------------------------------------------------------------------------- end of av.frd.updateSetup --

  //--------------------------------------------------------------------------------------- of av.frd.updateTestSetup --
  //update config data from file data stored in freezer for test setup page 
  av.frd.updateTestSetup = function (from) {
    'use strict';
    var dir = av.fzr.actConfig.dir;
    console.log(from, ' called av.frd.updateTestSetup; dir=', dir);
    var path = dir + '/avida.cfg';
    var doctext = av.fzr.file[path];
    //console.log('actConfig: path=', path);

    av.frd.avidaTestform(doctext, 'av.frd.updateTestSetup');
    doctext = av.fzr.file[dir + '/environment.cfg'];
    console.log('Test files only --------------------------------------------------------------');
    // av.frd.environmentTestform(doctext);     //for now editing the whole file
    //console.log('av.dom.environConfigEdit=',av.dom.environConfigEdit);

    if (av.fzr.file[av.dnd.move.dir+'/'+ 'environment.cfg'] ) {
      av.dom.environConfigEdit.value = av.fzr.file[av.dnd.move.dir+'/'+'environment.cfg'];
    };


    //doctext = av.fzr.file[dir + '/environment.cfg'];

    //not sure about this one; may need a test version of this one too
    //doctext = av.fzr.file[dir + '/pauseRunAt.txt'];
    //av.frd.pauseRunAtTest2form(doctext);
  };
  //----------------------------------------------------------------------------------- end of av.frd.updateTestSetup --

  //============================================================================================ read environment.cfg ==
  //environment.cfg into setup traditional form of population page = no longer in use;
  //---------------------------------------------------------------------------------- av.frd.environmentCFGlineParse --
  
  av.frd.environmentCFGlineParse = function(instr){
    'use strict';
    var num = 0;
    var flag = true;
    //console.log('instr', instr);
    var cfgary = av.utl.flexsplit(instr).split(',');      //replaces white space with a comma, then splits on comma
    //console.log('cfgary = ', cfgary);
    if (0 < cfgary[3].length) {num = av.utl.wsb(':',av.utl.wsa('=',cfgary[3]));}
    if (0 === num) {flag = false;} //use == in this case as they are of different type
    //if (av.dbg.flg.nut) console.log('flag', flag, '; num', num, '; cfgary', cfgary[3], '; instr', instr);
    //console.log('flag', flag, '; num', num, '; cfgary', cfgary[3], '; instr', instr);
    var rslt = {
      name : cfgary[1],
      value : flag
    };
    return rslt;
  };

  // makes a dictionary out of a environment.cfg file
  //-------------------------------------------------------------------------------------- av.frd.environmentCFGparse --
  av.frd.environmentCFGparse = function (filestr) {
    'use strict';
    var rslt = {};
    var lineobj;
    var lines = filestr.split('\n');
    var lngth = lines.length;
    for (var ii = 0; ii < lngth; ii++) {
      if (3 < lines[ii].length) {
        //console.log("lines[", ii, "]=", lines[ii]);
        lineobj = av.frd.environmentCFGlineParse(lines[ii]);
        rslt[lineobj.name.toUpperCase()] = lineobj.value;
      }
    } // for
    return rslt;
  };

  // puts data from the environment.cfg into the setup form for the population page
  //-------------------------------------------------------------------------------------- av.frd.environmentCFG2form --
  av.frd.environmentCFG2form = function (fileStr) {
    'use strict';
    var dict = av.frd.environmentCFGparse(fileStr);
    //console.log('av.frd.environmentCFG2form; dict=',dict);
  };
  //======================================================================================== end read environment.cfg ==
//======================================================================================================================

  av.frd.setPeriodicInflowLineParse = function (lineArray) {
    // line started wtih SETPERIODICRESOURCEINFLOW befor parsing. 
    var taskName = lineArray[3];
    var tsk = taskName.substr(0,3);
    var ndx = av.sgr.logicNames.indexOf(tsk);
    var numTsk = av.sgr.logEdNames[ndx];
    console.log('In av.frd.setPeriodicInflowLineParse', lineArray, 'taskName=', taskName, '; tsk=', tsk, '; ndx=', ndx, '; numTsk=', numTsk);
    
    var regionCode = taskName.substr(3,3);
    var regionSet = taskName.substr(6,1);
    var sub = av.nut[numTsk].uiSub.regionCode.indexOf(regionCode);
    //console.log('numTsk=', numTsk, '; regionCode=', regionCode, '; regionSet=', regionSet, '; sub=', sub );
    av.nut[numTsk].uiSub.periodNp[sub] = lineArray[4];
  };

  av.frd.eventsCFGparse = function (filestr, from) {
    if (av.dbg.flg.frd) { console.log('frd: ', from, 'called av.frd.eventsCFGparse'); }
    var matchComment, matchContinue, matchResult;
    var aline;
    var lines = filestr.split('\n');
    var lngth = lines.length;       //number of lines in file. 
    var re_comment = /^(.*?)#.*$/;   //look at begining of the line and look until #; used to get the stuff before the #
    var re_continue = /^(.*?)\\/;  //look for continuation line
    var re_SetPeriodicResourceInflow = /^(.*?)SetPeriodicResourceInflow/i;
    var re_SETPERIODICRESOURCEINFLOW = /^(.*?)SETPERIODICRESOURCEINFLOW/i;
    var lineArray;
    var ii = 0;
    while (ii < lngth) {
      eolfound = false;
      //console.log("lines["+ii+"]=", lines[ii]);
      matchComment = lines[ii].match(re_comment);
      //console.log('matchComment=',matchComment);
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
        if (2 < lineArray.length) {
          matchResult = lineArray[2].toUpperCase().match(re_SETPERIODICRESOURCEINFLOW);
          //console.log('matchReaction=', matchResult);
          if (null !== matchResult) av.frd.setPeriodicInflowLineParse(lineArray);
        }  //end of checking that line has at least 3 'words'
      }  //end of processing lines longer than 3 characters
      ii++;
    } // while that goes through lines in file. 
    //console.log('----------------------------------------------------------------------------------------------------');
  };

  av.frd.eventsCFG2form = function(fileStr, from){
    'use strict';
    // if (av.dbg.flg.frd) { console.log('frd: ', from, 'called av.frd.eventsCFG2form'); }
    av.frd.eventsCFGparse(fileStr, 'av.frd.eventsCFG2form' );
  };

  //------------------------------------------------------------------------------------------------- parse avida.cfg --
  //section to put data from avida.cfg into setup form of population page 
  //makes a dictionary entry out of line if the key and value are the first two items.
  av.frd.avidaCFGlineParse = function(instr){
    'use strict';
    var cfgary = av.utl.flexsplit(instr).split(',');  //replaces white space with a comma, then splits on comma
    var rslt = {
      name : cfgary[0],
      value : cfgary[1]
    };
    return rslt;
  };

  // makes a dictionary out of a avida.cfg file
  av.frd.avidaCFGparse = function (filestr, from) {
    'use strict';
    console.log(from, 'called av.frd.avidaCFGparse');
    console.log('filestr.length=', filestr.length);
    var rslt = {};
    var lines = filestr.split('\n');
    var lngth = lines.length;
    for (var ii = 0; ii < lngth; ii++) {
      var lineobj = av.frd.avidaCFGlineParse(lines[ii]);
      rslt[lineobj.name.toUpperCase()] = lineobj.value;
    } // for
    return rslt;
  };

  // puts data from the avida.cfg into the setup form for the population page
  av.frd.avidaCFG2form = function (fileStr, from){
    'use strict';
    console.log(from, 'called av.frd.avidaCFG2form');
    var dict = av.frd.avidaCFGparse(fileStr, 'av.frd.avidaCFG2form');
    //console.log(from, 'called av.frd.avidaCFG2form; dict=', dict);
    av.dom.sizeCols.value = parseInt(dict.WORLD_X);
    av.grd.gridWasCols = parseInt(dict.WORLD_X);  
    av.grd.setupCols = parseInt(dict.WORLD_X);  
    av.fzr.env.fileCols = parseInt(dict.WORLD_X);  //test dishes only
    av.fzr.actConfig.cols = parseInt(dict.WORLD_X);   // move to av.nut.wrldCols in environment.cfg to struct

    av.dom.sizeRows.value = dict.WORLD_Y;
    av.grd.gridWasRows = parseInt(dict.WORLD_Y);
    av.grd.setupRows = parseInt(dict.WORLD_Y);
    av.fzr.env.fileRows = parseInt(dict.WORLD_Y);   //test dishes only
    av.fzr.actConfig.rows = parseInt(dict.WORLD_Y);    // move to av.nut.wrldRows in environment.cfg to struct
    
    av.fzr.actConfig.size = av.fzr.actConfig.cols * av.fzr.actConfig.rows;
    av.dom.sizeCells.innerHTML = '= '+ av.fzr.actConfig.size + ' cells';
    
    
    av.dom.mutePopInput.value = '2.0';
    if (av.utl.isNumber( dict.COPY_MUT_PROB) ) {
      document.getElementById('mutePopInput').value = dict.COPY_MUT_PROB*100;
      av.dom.mutePopInput.value = (dict.COPY_MUT_PROB*100).toFixed(1);
    };
    
    // I think this creates an event so the slider gets updated
    var event = new window.CustomEvent('change');
    document.getElementById('mutePopInput').dispatchEvent(event);
    
    
    if (0==dict.BIRTH_METHOD) {
      dijit.byId('childParentRadio').set('checked', true);
      dijit.byId('childRandomRadio').set('checked', false);
    }
    else {
      dijit.byId('childParentRadio').set('checked', false);
      dijit.byId('childRandomRadio').set('checked', true);
    }

    if (-1 == dict.RANDOM_SEED) {
      dijit.byId('experimentRadio').set('checked', true);
      dijit.byId('demoRadio').set('checked', false);
    }
    else {
      dijit.byId('experimentRadio').set('checked', false);
      dijit.byId('demoRadio').set('checked', true);
    };
    
  };
  
  //-------------------------------------------------------------------------------------------- av.frd.avidaTestform --
  av.frd.avidaTestform = function (fileStr, from){
    'use strict';
    console.log(from, 'called av.frd.avidaTestform');
    var dict = av.frd.avidaCFGparse(fileStr, 'av.frd.avidaTestform');
    document.getElementById('sizeColTest').value = dict.WORLD_X;
    //av.grd.gridWasCols = dict.WORLD_X;
    av.grd.gridWasCols = parseInt(dict.WORLD_X);  
    av.grd.setupCols = parseInt(dict.WORLD_X); 
    av.fzr.env.fileCols = parseInt(dict.WORLD_X);

    document.getElementById('sizeRowTest').value = dict.WORLD_Y;
    //av.grd.gridWasRows = dict.WORLD_Y;
     av.grd.gridWasRows = parseInt(dict.WORLD_Y);
    av.grd.setupRows = parseInt(dict.WORLD_Y);
    av.fzr.env.fileRows = parseInt(dict.WORLD_Y);

    document.getElementById('muteInpuTest').value = dict.COPY_MUT_PROB*100;

    //var event = new Event('change');
    var event = new window.CustomEvent('change');
    document.getElementById('muteInpuTest').dispatchEvent(event);
    if (0==dict.BIRTH_METHOD) {
      dijit.byId('childParentRadiTest').set('checked', true);
      dijit.byId('childRandomRadiTest').set('checked', false);
    }
    else {
      dijit.byId('childParentRadiTest').set('checked', false);
      dijit.byId('childRandomRadiTest').set('checked', true);
    }
  /*
    if (-1 == dict.RANDOM_SEED) {
      dijit.byId('experimentRadiTest').set('checked', true);
      dijit.byId('demoRadiTest').set('checked', false);
    }
    else {
      dijit.byId('experimentRadiTest').set('checked', false);
      dijit.byId('demoRadiTest').set('checked', true);
    }
    */
  };
  //---------------------------------------------------------------------------------------- end av.frd.avidaTestform --

  //puts data from the av.frd.pauseRun.txt file into the test setup form for the population page
  //-------------------------------------------------------------------------------------- av.frd.pauseRunAtTest2form --
  //---------------------------------------------------------------------------------- end av.frd.pauseRunAtTest2form --

  // puts data from the av.frd.pauseRun.txt file into the setup form for the population page
  // this uses the value from the last ine in pauseRunAt.txt if the line has more than one line.
  //--------------------------------------------------------------------------------------- av.frd.pauseRunAtTXT2form --
  av.frd.pauseRunAtTXT2form = function (fileStr) {
    'use strict';
    //if (av.dbg.flg.nut) { console.log('av.frd.pauseRunAtTXT2form: fileStr=', fileStr); }
    if (undefined !== fileStr) {
      var lines = fileStr.split('\n');
      var update;
      var lngth = lines.length;
      for (var ii = 0; ii < lngth; ii++) {
        if (1 < lines[ii].length) {
          if (av.dbg.flg.frd) { console.log('lines['+ii+'] = ', lines[ii]); }
          update  = parseInt(lines[ii]);
          if (isNaN(update)) {
            av.dom.autoPauseCheck.checked = false;
            av.dom.autoPauseNum.value = '1000';
          } else if (0 < update){
            av.dom.autoPauseCheck.checked = true;
            av.dom.autoPauseNum.value = update;
          }
          else {
            av.dom.autoPauseCheck.checked = false;
            av.dom.autoPauseNum.value = '1000';
          }
        }
      } 
    }
  };
  //----------------------------------------------------------------------------------- end av.frd.pauseRunAtTXT2form --

  // section to put data from ancestors file into ancestorBox and placeparents auto
  // makes a list out of a ancestor file
  //---------------------------------------------------------------------------------------- av.fio.autoAncestorParse --
  av.fio.autoAncestorParse = function (filestr) {
    'use strict';
    var rslt = {};
    rslt.nam = [];
    rslt.gen = [];
    var lineobj, gen, name;
    var lines = filestr.split('\n');
    var kk = 0;
    var lngth = lines.length;
    for (var ii = 0; ii < lngth; ii++) {
      if (1 < lines[ii].length) {
        if (ii % 2 < 1) {//even
          rslt.nam[kk] = lines[ii];  //tiba need to get rid of whitespace in string
        }
        else { //odd
          rslt.gen[kk] = lines[ii]; //content will be genome line; leave white space alone
          //console.log('autAncestor', kk, rslt.nam[kk], rslt.gen[kk]);
          kk++;
        }
      }
    } // for
    return rslt;
  };
  //------------------------------------------------------------------------------------ end av.fio.autoAncestorParse --

  //----------------------------------------------------------------------------------------- av.fio.autoAncestorLoad --
  // puts data from the ancestor into parents file using autoplace
  av.fio.autoAncestorLoad = function(fileStr) {
    'use strict';
    if (av.dbg.flg.frd) console.log('in av.autoAncestorLoad: fileStr', fileStr);
    var rslt = av.fio.autoAncestorParse(fileStr);
    //Now put in ancestors and place parents
    var lngth = rslt.nam.length;
    for (var ii = 0; ii < lngth; ii++) {
      av.parents.genome.push(rslt.gen[ii]);
      var nn = av.parents.name.length;
      av.parents.name.push(rslt.nam[ii]);
      av.parents.howPlaced.push('auto');

      // var domid;
      if ('test' == av.msg.setupType) {
        var domid = 'dom_g' + av.fzr.gNum++;
        var type = 'g';
        var container = '#' + av.dnd.ancestorBoTest.id;
      }
      else {
        var domid = 'dom_g' + av.fzr.gNum++;
        var type = 'g';
        var container = '#' + av.dnd.ancestorBox.id;
      }

      // Add a DOM object
      $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${rslt.nam[ii]} </div>`);
      // Add an entry to av.dnd.containerMap
      console.log('container =', container);
      console.log('av.dnd.containerMap =', av.dnd.containerMap);
      console.log('Object =', Object);
      if (Object.keys(av.dnd.containerMap).indexOf(container) === -1) {
        av.dnd.containerMap[container] = {};
      }
      av.dnd.containerMap[container][domid] = {'name': rslt.nam[ii] , 'type': 'g'};
    
      // if (av.dbg.flg.frd) console.log('autoPlaceParent: domIds', domid, '; length', domIds.length);
      av.parents.domid.push(domid); //domid in ancestorBox used to remove if square in grid moved to trashcan
      //Find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.autoNdx.push(nn);
      av.parents.placeAncestors();
      if (av.dbg.flg.frd) console.log('av.parents:  name', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]);
    }
  };
  //------------------------------------------------------------------------------------- end av.fio.autoAncestorLoad --

  //---------------------------------------------------------------------------------------- av.fio.handAncestorParse --
  // makes a listing out of a ancestors_manual.txt' file
  // section to put data from ancestors_manual.txt' file into ancestorBox and placeparents hand
  av.fio.handAncestorParse = function (filestr) {
    'use strict';
    if (av.dbg.flg.frd) { console.log('filestr=', filestr); }
    var rslt = {};
    rslt.nam = [];
    rslt.gen = [];
    rslt.col = [];
    rslt.row = [];
    var lineobj, gen, xx, yy;
    var pair = [];
    var lines = filestr.split('\n');
    var lngth = lines.length;
    var kk = 0;
    for (var ii = 0; ii < lngth; ii++) {
      if (1 < lines[ii].length) {
        if (0 === ii % 3) {// divide by 3 evenly => first line
          rslt.nam[kk] = lines[ii];  //tiba need to get rid of whitespace in string
        }
        else if (1 === ii % 3){ //second line
          rslt.gen[kk] = lines[ii]; //content will be genome line; leave white space alone
        }
        else {  //third line
          pair = lines[ii].split(',');
          rslt.col[kk] = parseInt(pair[0]);
          rslt.row[kk] = parseInt(pair[1]);
          kk++;
        }
      }
    } // for
    return rslt;
  };
  //------------------------------------------------------------------------------------ end av.fio.handAncestorParse --

  //----------------------------------------------------------------------------------------- av.fio.handAncestorLoad --
  // puts data from the ancestor(s) plaed by hand into parents file
  av.fio.handAncestorLoad = function(fileStr) {
    'use strict';
    if (av.dbg.flg.frd) { console.log('in av.fio.handAncestorLoad'); }
    if (av.dbg.flg.frd || true) console.log('in av.fio.handAncestorLoad: fileStr', fileStr);
    var stuff = av.fio.handAncestorParse(fileStr);
    if (av.dbg.flg.frd) console.log('in av.fio.handAncestorLoad: stuff', stuff);
    //Now put in ancestors and place parents
    var lngth = stuff.nam.length;
    for (var kk = 0; kk < lngth; kk++) {
      var nn = av.parents.name.length;
      av.parents.name.push(stuff.nam[kk]);

      if ('test' == av.msg.setupType) {
        var domid = 'dom_g' + av.fzr.gNum++; // might need to come back to it
        var type = 'g';
        var container = '#' + av.dnd.ancestorBoTest.id;
      }
      else {
        var domid = 'dom_g' + av.fzr.gNum++;
        var type = 'g';
        var container = '#' + av.dnd.ancestorBox.id;
      }

      // Add a DOM object
      $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${stuff.nam[kk]} </div>`);

      // Add an entry to av.dnd.containerMap
      console.log('container =', container);
      console.log('av.dnd.containerMap =', av.dnd.containerMap);
      console.log('Object =', Object);
      if (Object.keys(av.dnd.containerMap).indexOf(container) === -1) {
        av.dnd.containerMap[container] = {};
      }
      av.dnd.containerMap[container][domid] = {'name': stuff.nam[kk] , 'type': 'g'};
      av.parents.domid.push(domid); //domid in ancestorBox used to remove if square in grid moved to trashcan

      //Find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.handNdx.push(nn);
      av.parents.howPlaced.push('hand');
      av.parents.genome[nn] = stuff.gen[kk];
      av.parents.col[nn] = stuff.col[kk];
      av.parents.row[nn] = stuff.row[kk];
      av.parents.injected[nn] = false;
      av.parents.AvidaNdx[nn] = av.parents.col[nn] + parseInt(av.parents.row[nn]) * parseInt(av.dom.sizeCols.value);
      //av.parents.AvidaNdx[nn] = av.parents.col[nn] + parseInt(av.parents.row[nn]) * parseInt(dijit.byId('sizeCols').get('value'));
      //av.parents.AvidaNdx[av.parents.autoNdx[ii]] = av.parents.col[av.parents.autoNdx[ii]] + cols * av.parents.row[av.parents.autoNdx[ii]];
      if (av.dbg.flg.frd) console.log('av.parents:  name', av.parents.name[nn], '; domid', av.parents.domid[nn], '; gen', av.parents.genome[nn]);
    }
    if (av.dbg.flg.frd) console.log('parents', av.parents);
  };
  //------------------------------------------------------------------------------------- end av.fio.handAncestorLoad --

  //---------------------------------------------------- two function section to put data from clade.ssg into parents --
  // makes a dictionary out of a clade.ssg file
  av.frd.cladeSSGparse = function (filestr) {
    'use strict';
    var rslt = [];
    var lineobj, cfgary, name;
    var lines = filestr.split('\n');
    var lngth = lines.length;
    for (var ii = 0; ii < lngth; ii++) {
      if (1 < lines[ii].length) {
        cfgary = av.utl.flexsplit(lines[ii]).split(',');   //replaces white space with a comma, then splits on comma
        name = cfgary[0];
        if ('#' !== name[0]) {
          rslt.push(name);
        }
      }
    } // for
    return rslt;
  };

  // puts data from the clade.ssg into the parents structure
  av.fio.cladeSSG2parents = function (fileStr) {
    'use strict';
    var list = av.frd.cladeSSGparse(fileStr);
    var lngth = list.length;
    for (var ii = lngth-1; 0 <= ii; ii--) {
      av.parents.name[ii] = list[ii];
      av.parents.injected[ii] = false;
      //console.log('Dads', list[ii]);

      //Add organism to av.dnd.ancestorBox in settings.
      var domid = 'dom_g' + av.fzr.gNum;
      var type = 'g';
      var container = '#' + av.dnd.ancestorBox.id;
      // var domid = av.dnd.insertNode(container, stuff.nam[kk], type);

      // Add a DOM object
      $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${av.parents.name[ii]} </div>`);

      // Add an entry to av.dnd.containerMap
      console.log('container =', container);
      console.log('av.dnd.containerMap =', av.dnd.containerMap);
      console.log('Object =', Object);
      if (Object.keys(av.dnd.containerMap).indexOf(container) === -1) {
        av.dnd.containerMap[container] = {};
      }

      if (Object.keys(av.dnd.containerMap[container]).indexOf(domid) === -1) {
        av.dnd.containerMap[container][domid] = {'name': av.parents.name[ii] , 'type': 'g'};
      } else {
        av.dnd.containerMap[container][domid].name = av.parents.name[ii];
        av.dnd.containerMap[container][domid].type = 'g';
      }

      av.parents.domid.push(domid);
      av.fzr.gNum++;
      console.log(av.dnd.containerMap);
      console.log(av.fzr);

      //Find color of ancestor
      if (0 < av.parents.Colors.length) {av.parents.color.push(av.parents.Colors.pop());}
      else {av.parents.color.push(av.color.defaultParentColor);}

    }
    //console.log('parents', av.parents);
  };
  //------------------------------------------------ end two function section to put data from clade.ssg into parents --

  //------------------------------- two function section to put data from timeRecorder.csv file into data from charts --

  // makes arrays out of a time recorder file
  av.frd.timeRecorder2chart = function (filestr) {
    'use strict';
    if (undefined !== filestr) {
      var sub = 0;
      var lineData, aline, headerLine, functionLine;
      var lines = filestr.split('\n');
      var lngth = lines.length;
      //console.log('length= ', lngth, '; lines = ', lines);

      //Used to find the maxium for each data column
      av.pch.aveMaxFit = 0;
      av.pch.aveMaxCst = 0;
      av.pch.aveMaxEar = 0;
      av.pch.aveMaxNum = 0;
      av.pch.aveMaxVia = 0;
      av.pch.logMaxFit = 0;
      av.pch.logMaxCst = 0;
      av.pch.logMaxEar = 0;
      av.pch.logMaxNum = 0;

      av.pch.fnBinary = '000000000';            //default is all buttons off.
      for (var ii = 0; ii < lngth; ii++) {
        if (1 < lines[ii].length) {
          aline = lines[ii];
          //console.log('aline[0]', aline[0]);
          if ('#' == aline[0]) {
            //console.log('aline.substring.(0,11) = ', aline.substring(0,11));
            if ('# Functions' == aline.substring(0,11)) {
              //console.log('functionLine = ', aline);
              av.pch.fnBinary = aline.substring(14, 24);
              if (av.dbg.flg.frd) { console.log('av.pch.fnBinary = ', av.pch.fnBinary, '; aline=', aline); }
            }
          }
          else {
            //console.log('lines[ii]',lines[ii]);
            lineData = lines[ii].split(',');
            if ('Update' == lineData[0]) {
              headerLine = lineData;
              //console.log('headerLine',headerLine);
            }
            else {
              //console.log('lineData',lineData);
              //console.log('av.pch.nUpdate', av.pch.nUpdate);
              //console.log('jj=', jj);
              av.pch.nUpdate[jj] = parseFloat(lineData[0]);
              //console.log('av.pch.nUpdate[jj]',av.pch.nUpdate[jj]);
              av.pch.aveFit[jj] = parseFloat(lineData[1]);
              av.pch.aveCst[jj] = parseFloat(lineData[2]);
              av.pch.aveEar[jj] = parseFloat(lineData[3]);
              av.pch.aveNum[jj] = parseFloat(lineData[4]);
              av.pch.aveVia[jj] = parseFloat(lineData[5]);
              av.pch.logFit[jj] = parseFloat(lineData[6]);
              av.pch.logCst[jj] = parseFloat(lineData[7]);
              av.pch.logEar[jj] = parseFloat(lineData[8]);
              av.pch.logNum[jj] = parseFloat(lineData[9]);
              av.pch.xx[jj] = jj;
              if (av.pch.aveFit[jj] > av.pch.aveMaxFit) av.pch.aveMaxFit = av.pch.aveFit[jj];
              if (av.pch.aveCst[jj] > av.pch.aveMaxCst) av.pch.aveMaxCst = av.pch.aveCst[jj];
              if (av.pch.aveEar[jj] > av.pch.aveMaxEar) av.pch.aveMaxEar = av.pch.aveEar[jj];
              if (av.pch.aveNum[jj] > av.pch.aveMaxNum) av.pch.aveMaxNum = av.pch.aveNum[jj];
              if (av.pch.aveVia[jj] > av.pch.aveMaxVia) av.pch.aveMaxVia = av.pch.aveVia[jj];
              if (av.pch.logFit[jj] > av.pch.logMaxFit) av.pch.logMaxFit = av.pch.logFit[jj];
              if (av.pch.logCst[jj] > av.pch.logMaxCst) av.pch.logMaxCst = av.pch.logCst[jj];
              if (av.pch.logEar[jj] > av.pch.logMaxEar) av.pch.logMaxEar = av.pch.logEar[jj];
              if (av.pch.logNum[jj] > av.pch.logMaxNum) av.pch.logMaxNum = av.pch.logNum[jj];
              jj++;
            }
          }
        }
      } // for
      //console.log('headerLine = ', headerLine, '; jj=', jj);
      //console.log('av.pch = ', av.pch);
      return;
    }
  };

  //Load Time Recorder Data.
  av.frd.loadTimeRecorderData = function(dir) {
    'use strict';
  //console.log('fzr.file', av.fzr.file);
  // if there is NOT a timeRecorder.csv file, then look for tr0, tr1, tr2, tr3 and tr4
    if (undefined == av.fzr.file[dir + '/timeRecorder.csv']) {
      av.pch.aveFit = av.fio.tr2chart(av.fzr.file[dir + '/1']);
      av.pch.aveCst = av.fio.tr2chart(av.fzr.file[dir + '/tr1.txt']);
      av.pch.aveEar = av.fio.tr2chart(av.fzr.file[dir + '/tr2.txt']);
      av.pch.aveNum = av.fio.tr2chart(av.fzr.file[dir + '/tr3.txt']);
      av.pch.aveVia = av.fio.tr2chart(av.fzr.file[dir + '/tr4.txt']);
      if (av.dbg.flg.frd) { console.log('via=', av.fzr.file[dir + '/tr4']); }
      //av.pch.xx = [];  in globals.js
      //console.log('av.pch.aveFit', av.pch.aveFit);
      lngth = av.pch.aveFit.length;
      av.pch.logFit = av.utl.newFilledArray(lngth, null);
      av.pch.logCst = av.utl.newFilledArray(lngth, null);
      av.pch.logEar = av.utl.newFilledArray(lngth, null);
      av.pch.logNum = av.utl.newFilledArray(lngth, null);
      for (var ii = 0; ii < lngth; ii++) av.pch.xx[ii] = ii;
    }
    else {
      //console.log('av.fzr.file.' + dir + '/timeRecorder.csv=', av.fzr.file[dir + '/timeRecorder.csv']);
      //console.log('av.fzr.file.' + dir + '/timeRecorder.csv.length=', av.fzr.file[dir + '/timeRecorder.csv'].length);

      av.frd.timeRecorder2chart(av.fzr.file[dir+'/timeRecorder.csv']);
      if (av.dbg.flg.frd) { console.log('av.pch.fnBinary = ', av.pch.fnBinary); }
    }
  };
  //--------------------------- end two function section to put data from timeRecorder.csv file into data from charts --

  //---------------------------- two function section to put data from time recorder (tr) files into data from charts --

  // makes a dictionary out of a time recorder file
  av.frd.tr2chartParse = function (filestr) {
    'use strict';
    var rslt = {};
    rslt.update = [];
    rslt.data = [];
    var lineobj, cfgary, name;
    var pairs = filestr.split(',');
    var pairLngth = pairs.length;
    if (av.dbg.flg.frd) console.log('pairLngth', pairLngth);
    for (var ii = 0; ii < pairLngth; ii++) {
      lineobj = pairs[ii].split(':');
      rslt.update[ii] = parseFloat(lineobj[0]);
      rslt.data[ii] = parseFloat(lineobj[1]);
    } // for
    return rslt.data;
  };

  // puts data from the time recorder data into the right format
  av.fio.tr2chart = function (fileStr) {
    'use strict';
    var data = [];
    if (undefined !== fileStr) { data = av.frd.tr2chartParse(fileStr); }
    return data;
  };
  //------------------------ end two function section to put data from time recorder (tr) files into data from charts --

  //---------------------------------------------------------------------------------------- regular expression notes --

  // examples from avdia-ed 
  /*  
    var commentStr = "#!data name:not34g87 region:bot side:lft supply:equilibrium";
    var reactStr = 'REACTION  NAND nand process:resource=nan1:value=1.0:type=pow:depletable=0 requisite:max_count=1 ';
    var resrcStr = 'RESOURCE not1:geometry=grid:initial=1600 #this is a commment';
    var resrcStr1 = "RESOURCE and1:geometry=grid:outflow=1:inflow=40:\  ";
    var resrcStr2 = 'inflowX1=15:inflowY1=0:inflowX2=15:inflowY2=39 ';
    var re_comment = /^(.*?)#.*$/;   //look at begining of the line and look until #; used to get the stuff before the #
    var re_continue = /^(.*?)\\/;  //look for continuation line
    var re_REACTION = /^(.*?)REACTION/i;
    var re_RESOURCE = /RESOURCE/i;
    var match = commentStr.match(re_comment);
    /*
    console.log('not match: str='+resrcStr2+'; resrcStr.match(re_comment)=',resrcStr2.match(re_comment)); 
    console.log('match: str='+commentStr,'; commentStr.match(re_comment)=', commentStr.match(re_comment)); 
    console.log('');
    console.log('str= ',resrcStr,';resrcStr.match(re_comment)=', resrcStr.match(re_comment));
    console.log('str= ',resrcStr1,'resrcStr1.match(re_continue)=',resrcStr1.match(re_continue));
    console.log('str= ',resrcStr,'resrcStr.match(re_RESOURCE)=',resrcStr.match(re_RESOURCE));
    console.log('str= ',reactStr,'reactStr.match(e_REACTION',reactStr.match(re_REACTION));

  //-- looking at resource names
  var nameNone = 'not';
  var shortNames =      ['not0', 'nan12', 'nam345', 'and4g3', 'and4g04', 'and4g22', 'and04g3L'];
  var someNames =      ['not0', 'nan12', 'nam34', 'and1', 'and01', 'and02', 'and03', 'and4g00L', 'and4g01L', 'and4g2L', 'and04g3L'];
  var exampleNames_sepg = ['not0', 'nan12', 'nam34', 'and1', 'and01', 'and02', 'and03', 'and4_g00', 'and4g01', 'and4g2', 'and04g3'];
  var sepNames = ['not_0', 'nan_12', 'nam_34', 'and_1', 'and_01', 'and_02', 'and_03', 'and_4_g00', 'and_4_g01_Lft', 'and_4_g2_Lft', 'and_04_g3_Lft'];
  var get1; var get2; var get3; var tempStr;
  var exampleNames = shortNames;
    var re_num1 = /\D+(\d+)/ig;
    // re_num1 pattern: ^ start of string; \D+ match all non-numerics, but at least one character must exist; (\d+) match into a group one or more contiguous numeric characters
    var re_num2 = /(\d+)/ig;
    var re_num3 = /\d+(\D+)(\d+)/;
    // re_num2 pattern: extending re_num 1 to match the second set of contiguous numeric characters
    for (var ii = 0; ii < exampleNames.length; ii++) {
      tempStr = exampleNames[ii];
      get1 = tempStr.match(re_num1);
      get2 = tempStr.match(re_num2);
      get3 = tempStr.match(re_num3);
      console.log('str=',tempStr, '; re_num1=',re_num1, 'exampleNames['+ii+'].match(re_num1) = \n', get1 );
      console.log('str=',tempStr, '; re_num2=',re_num2, 'exampleNames['+ii+'].match(re_num2) = \n', get2 );
      console.log('str=',tempStr, '; re_num3=',re_num3, 'exampleNames['+ii+'].match(re_num3) = \n', get3 );
      get1 = re_num1.exec(tempStr);
      get2 = re_num2.exec(tempStr);  
      get3 = re_num3.exec(tempStr); 
      console.log('str=',tempStr, '; re_num1=',re_num1, 'get1.last=', re_num1.lastIndex, 're_num1.exec(exampleNames['+ii+']) = \n', get1 );
      console.log('str=',tempStr, '; re_num2=',re_num2, 'get2.last=', re_num2.lastIndex, 're_num2.exec(exampleNames['+ii+']) = \n', get2 );
      console.log('str=',tempStr, '; re_num3=',re_num3, 'get3.last=', re_num3.lastIndex, 're_num3.exec(exampleNames['+ii+']) = \n', get3 );
      //console.log('str=',tempStr, 'get1.last=', tempStr.lastIndex, 're_num2.exec(exampleNames['+ii+']) = \n', /\D+\d+(\D+)(\d+)/.exec(tempStr)   );
      console.log('re_num1 =', re_num1,';  re_num2', re_num2, '----------------------------------------');
    }

  //Examples from https://codepen.io/ijmccallum/post/regular-expressions-in-javascript
  //
  var stringToSearch = 'aa ab ac';
  var myRegExp = /a\w+/g;
  console.log('myRegExp=', myRegExp, '; stringToSearch=', stringToSearch);
  console.log('myRegExp.lastIndex=', myRegExp.lastIndex); // 0
  console.log('myRegExp.exec(stringToSearch', myRegExp.exec(stringToSearch) ); //["aa", index: 0, input: "aa ab ac"]
  console.log('myRegExp.lastIndex', myRegExp.lastIndex); // 2
  console.log('myRegExp.exec(stringToSearch)=', myRegExp.exec(stringToSearch) ); //["ab", index: 3, input: "aa ab ac"]
  console.log('myRegExp.lastIndex=', myRegExp.lastIndex); // 5
  console.log('myRegExp.exec(stringToSearch=', myRegExp.exec(stringToSearch) ); //["ac", index: 6, input: "aa ab ac"]
  console.log('myRegExp.lastIndex', myRegExp.lastIndex); // 8
  console.log('myRegExp.exec(stringToSearch)=', myRegExp.exec(stringToSearch) ); // null
  console.log('myRegExp.lastIndex=', myRegExp.lastIndex); // 0
  console.log('myRegExp.exec(stringToSearch)=', myRegExp.exec(stringToSearch) ); // ["aa", index: 0, input: "aa ab ac"]
  console.log('myRegExp.lastIndex=', myRegExp.lastIndex); // 2

  myRegExp.lastIndex = 0;
  console.log('myRegExp.test(stringToSearch)=', myRegExp.test(stringToSearch) );
  console.log('myRegExp.lastIndex)=', myRegExp.lastIndex); //n 
  console.log('stringToSearch.match(myRegExp)=', stringToSearch.match(myRegExp));
  console.log('stringToSearch.search(myRegExp)=', stringToSearch.search(myRegExp));

  console.log('stringToSearch.search(/ad/)=', stringToSearch.search(/ad/) );
  var newstring = stringToSearch.replace(myRegExp, 'replacement!');
  console.log("stringToSearch.replace(myRegExp, 'replacement!')=", newstring);

  // examples for learning. 
  var junkStr = 'The address is 1273 Divine Dr';   // meta data ^ beginning of string;   $ end of string. 
                                                  // ^ can also be used to indicated negation in a character set
  var re_address_literal = /address/;  // looks for this and only this literally. 
  var re_address = /^.*?address.*?$/;   // 
  var re_number1more = /[0-9]+/;  // one ore more of characters in the group 0 to 9
  var re_decimal = /\d/;    //here the \d is the same as [0-9]
  var re_notNum = /[^0-9]+/;  //one ore more of 'not numeral'
  var re_notNumD = /\D+/;     //one ore more of 'not numeral'
  var re_number0more = /[0-9]*/;   // zero or more of characters in the group 0 to 9

  //  // what does .*/   //do?
  //var re_simple = /.*/;     // in javascript the / at the beginning and end is used to indicate this is a regular expression pattern

  ///----------------------------------------------------------------------------------------- convert string to number --
  //ways to convert from string to number. 
  //console.log('envobj.value[ndx]=', envobj.value[ndx], '; +envobj.value[ndx]=', +envobj.value[ndx],'; task = lnArray[2]=',lnArray[2]);
  //var valueNumber = parseFloat(envobj.value[ndx]);             //if there are characters other than [0-9] or white_space it returns NaN
  //var plusValue = +envobj.value[ndx];
  //var parseIntValue = parseInt(envobj.value[ndx], 10);   // the second pareameter is the radix or base, ignores non [0-9] after the number part of the string
  //var parseFloatValue = parseFloat(envobj.value[ndx]);   //ignores non [0-9] after the number part of the string
  //console.log('valueNumber=', valueparseFloat, '; plusValue=',plusValue,'; parseIntValue=', parseIntValue, '; parseFloatValue=', parseFloatValue);

  ///---------------------------------------------------------------------------------------------------------------------
  //                                                                                           Only used for Test files --
  ///---------------------------------------------------------------------------------------------------------------------
/*
  // only called by by files using av.fzr.env
  av.frd.rNameIndex = function(avfzrenvLog, rtag) {  

    // 
    // @param avfzrenv =  the suboabject of av.fzr.env that holds the arrays for logic9 type
    // @param rtag       the string that we are looking for. If the string is found data will be over written. 
    //                     if not, create a new entry in the arrays
    // @returns {Int}
    // 
    // Look for rtag in structure
    // return its index if it exists
    // return length + 1 is it does not exist
    //
    //console.log('avfzrenvLog=',avfzrenvLog,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    var defaultindex = avfzrenvLog.name.length;
    //console.log('defaultindex='defaultindex);
    var found = avfzrenvLog.name.indexOf(rtag);

    if (-1 < found) {
      //console.log('The name ', rtag, ' was found already in av.fzr.env subobject=',avfzrenvLog.name);
      return found;
    } 

    return defaultindex;  
  };

  // all av.frd.test files will be deleted eventually. 
/*
  av.frd.testReActLineParse = function (lnArray, from) {
    //console.log(from, 'called av.frd.testReActLineParse');
    'use strict';
    var lnError = '';     //was it a valid line wihtout errors
    //console.log('lnArray = ', lnArray);
    var pear = [];
    var nn;
    var numTsk;
    //find logic type
    //console.log('task = lnArray[2]=',lnArray[2]);
    var logicindex = av.sgr.logicVnames.indexOf(lnArray[2]);   //task name
    //console.log('logicindex=',logicindex);
    if (-1 < logicindex) {
      numTsk = av.sgr.logEdNames[logicindex];
      // Checking for a resource tag
      //console.log('numTsk=', numTsk);
      var reActObj = av.fzr.env.react[numTsk];   //objec based on logic type and reaction;
      var ndx = av.frd.rNameIndex(reActObj, lnArray[1]);
      //assin the name of the resource. 
      reActObj.name[ndx] = lnArray[1];
      // assign default values are from https://github.com/devosoft/avida/wiki/Environment-file with constants for Avida-ED
      reActObj.depletable[ndx] = 0;
      reActObj.value[ndx] = 1;
      reActObj.min[ndx] = 0.9;
      reActObj.max[ndx] = 1.1;
      reActObj.max_count[ndx] = 1;
      reActObj.task[ndx] = lnArray[2];
      reActObj.resource[ndx] = reActObj.name[ndx];
      reActObj.type[ndx] = 'pow';

      var len;
      var lngth = lnArray.length;
      //console.log('ndx=',ndx, '; name=lnArray[1]=',lnArray[1],'; task=',lnArray[2], '; numTsk=', numTsk, '; lnArray.length=', lnArray.length);
      for (var jj = 3; jj < lngth; jj++) {
        var pairArray = lnArray[jj].split(':');    //this should get process
        len = pairArray.length;
        //console.log('len=',len,'; pairArray=',pairArray);
        for (var ii = 1; ii < len; ii++) {
          pear = pairArray[ii].split('=');
          //console.log('React: ii=',ii,'; pear', pear);
          nn = av.sgr.react_argu.indexOf(pear[0].toLowerCase());
          if (-1 < nn) {
            reActObj[av.sgr.react_argu[nn]][ndx] = pear[1];
          } else {
            lnError = 'pear[0]=, ' + pear[0] + ' is not a valid reaction keyword. lnArray = ' + lnArray;
            //console.log(lnError);
          }
          ;
        }
        ;  //completed going thru pair arrays
      }
      ;  //completed loop to processs lnArray
      //console.log('numTsk=', numTsk,'ndx=',ndx,'reActObj=', reActObj);
    }
    // valid logic name not found;
    else {
      lnError = 'react task, ' + lnArray[2] + ' not found in av.sgr.logicVnames';
    };
    return lnError;
  };
*/
