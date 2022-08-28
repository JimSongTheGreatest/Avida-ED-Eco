// if (av.dbg.flg.root) { console.log('Root: start of messaging'); }  
var av = av || {};  //incase av already exists
var dijit = dijit || {};  //to let file know dijit is defined
var tmpStr;

// if (av.dbg.flg.root) { console.log('Root: before av.msg.readMsg'); }
av.msg.readMsg = function (ee) {
  'use strict';

  var stub = '';
  var msg = ee.data;  //passed as object rather than string so JSON.parse is not needed.
  //console.log('msg.type=', msg.type, '; msg.name=', msg.name, '; msg.level=', msg.level);
  //console.log('av.msg.readMsg: msg', msg);
  if ('data' == msg.type) {
    if (av.debug.userMsg) userMsgLabel.textContent = '| Avida type:data; name:' + msg.name;
    switch (msg.name) {
      case 'exportExpr':
        av.debug.log += '\n--Aui: \n' + av.utl.json2stringFn(msg);
        if ('untitled' != msg.popName) {av.fwt.popExpWrite(msg);}
        break;
      case 'paused':
        av.ptd.makePauseState();
        av.debug.log += '\n--Aui: \n' + av.utl.json2stringFn(msg);
        break;
      case 'reset':
        av.debug.log += '\n--Aui: \n' + av.utl.json2stringFn(msg);
        if (av.debug.userMsg) userMsgLabel.textContent = '| Avida: ' + msg.name;
        if (true === av.msg.uiReqestedReset) {
          av.ptd.resetDishFn(false);
          av.msg.uiReqestedReset = false;
        }
        break;
      case 'running':
        av.ptd.makeRunState('av.msg.readMsg msg.type=running');
        av.debug.log += '\n--Aui: \n' + av.utl.json2stringFn(msg);
        break;
      case 'runPause':
        if (true != msg['Success']) {
          if (av.debug.msg) console.log('Error: ', msg);  // msg failed
          av.ptd.runStopFn();  //flip state back since the message failed to get to Avida
        }
        av.debug.log += '\n--Aui: \n' + av.utl.json2stringFn(msg);
        break;
      case 'webOrgTraceBySequence': //reset values and call organism tracing routines.
        //console.log('webOrgTraceBySequence', msg);
        av.traceObj = msg.snapshots;
        //console.log('av.traceObj', av.traceObj);
        av.ind.cycle = 0;
        av.dom.orgCycle.value = 0;
        av.ind.cycleSlider.set('maximum', av.traceObj.length - 1);
        av.ind.cycleSlider.set('discreteValues', av.traceObj.length);
        av.ind.cycleSlider.set('value', av.ind.cycle);
        av.ind.updateOrgTrace('messaging_webOrgTraceBySequence');
        av.debug.log += '\n--Aui: \n' + av.utl.json2stringFn(msg);
        break;
      case 'webPopulationStats':
        av.grd.popStatsMsg = msg;
        stub = 'name: webPopulationStats; update:' + msg.update.toString() + '; oldUpdate:' + av.grd.oldUpdate
              + '; fit:' + msg.ave_fitness.formatNum(2) + '; gln:' + msg.ave_gestation_time.formatNum(2)
              + '; Met:' + msg.ave_metabolic_rate.formatNum(2) + '; Num:' + msg.organisms.formatNum(2);
        av.debug.log += '\n--Aui:  ' + stub;
        if (av.grd.oldUpdate != msg.update && 0 <= msg.update) {  //use only one = as one maybe number and the other string
          av.grd.oldUpdate = msg.update;
          av.msg.updatePopStats(av.grd.popStatsMsg);
          //av.msg.sync('webPopulationStats-update:' + msg.update.toString());
//          console.log('stub=', stub);
          av.grd.popChartFn(false, 'av.msg.readMsg');
        }
        else {
          //console.log('Repeat so webPopulationStats and chart not redrawn');
          av.debug.log += '\n -     Repeat so webPopulationStats and chart not redrawn; update=', av.grd.oldUpdate;
        }
        //Is there another update? ---------------------
        av.msg.check4anotherUpdate();
        //av.debug.log += '\n - - end webPopulation: update:' + av.grd.popStatsMsg.update;
        break;
      case 'webGridData':
        av.grd.msg = msg;
        stub = 'name: webGridData; type: ' + msg.type.toString() + '; update:' + msg.update;  //may not display anyway
        av.debug.log += '\n--Aui:  ' + stub;
        //av.msg.sync('webGridData:' + msg.update.toString());
        
        //use only one = as one maybe number and the other string
        if (av.grd.oldUpdate == msg.update && 0 <= msg.update) {  
          console.log('webGridData repeat update=', av.grd.msg.update);
        }
        av.grd.drawGridSetupFn('av.msg.readMsg: case=webGridData');  //needs to be called always as some calculations need to happen even if nothing is displayed (for logic data)
        //av.debug.log += '\n - - end webGridData: update:' + av.grd.msg.update;
        break;
      case 'webOrgDataByCellID':
        av.grd.DataByCellID = msg;        //debug only should be commented out when in user mode
        av.msg.ByCellIDgenome = msg.genome;
        av.grd.updateSelectedOrganismType(msg);  //in messaging
        stub = 'name: webOrgDataByCellID; genotypeName: ' + msg.genotypeName.toString();  //may not display anyway
        av.debug.log += '\n--Aui:  ' + stub;
        //console.log('--Aui: webOrgDataByCellID', msg);
        break;
      default:
        if (av.debug.msg) {console.log('____________UnknownRequest: ', msg);}
        av.debug.log += '\nAui: in default in messaging on line 84 \n' + av.utl.json2stringFn(msg);   //fix format
        break;
    };
  }
  else if ('userFeedback' == msg.type) {
    av.debug.log += '\nAui: userFeedback \n' + av.utl.json2stringFn(msg);
    if (av.debug.userMsg) userMsgLabel.textContent = '| Avida userFeedback: ' + msg.level + ' at ' + av.grd.oldUpdate.toString() + ' is ' + msg.message;
    //console.log('userFeedback', msg);
    switch (msg.level) {
      case 'error':
        userMsgLabel.textContent = '| Avida error at ' + av.grd.oldUpdate.toString() + ' is ' + av.utl.json2oneLine(msg);
        //console.log('type:userFeedback; level:error');
        if (msg.isFatal) {
          //kill and restart avida worker
          restartAvidaDialog.show();  //DJB: this does not work as of 2022; never did
        }
        else {
          //return everything to defaults
        }
        break;
      case 'notification':
        $('#splash').remove(); //hides splash screen.
        if (av.debug.msg) console.log('avida:notify: ',msg.message);
        console.log('avida:notify:', msg.message, '; inhtml=', document.getElementById('avidaVersion').innerHTML );
        tmpStr = msg.message;
        tmpStr = 'avida V:' + tmpStr.substr(tmpStr.length - 13, 13);
        console.log('================================================================================================');
        console.log('tmpStr=', tmpStr);
        //document.getElementById('avidaVersion').innerHTML = tmpStr;
        if (av.debug.msg) userMsgLabel.textContent = '| Avidia notification: ' + msg.message; //with splash screen no longer need ready message
        // Worked on a better splash screen gif. Used licecap, an application on the Mac to record the gif.
        // Then used http://gifmaker.me/reverser/ to make a gif in reverse time order. Then Wesley used gifsicle
        // to combine the forward and reverse gif.
        document.getElementById("appReloadDialog").style.display="none";
        av.ui.loadOK = true;
        if (av.debug.msg) console.log('before calling av.grd.popChartInit');
        //av.grd.popChartInit('Message: notification');
        av.ui.initialDivSizing(); 
        break;
      case 'warning':
        userMsgLabel.textContent = '| Avida warning at ' + av.grd.oldUpdate.toString() + ' is ' + av.utl.json2oneLine(msg);
        if (av.debug.msg) console.log('Avida warn: ',msg);
        break;
      case 'fatal':
        userMsgLabel.textContent = '| Avida fatal error at ' + av.grd.oldUpdate.toString() + ' is ' + av.utl.json2oneLine(msg);
        if (av.debug.msg) console.log('Avida fatal: ',msg.message);
        break;
      default:
        if (av.debug.msg) console.log('Avida unkn: level ',msg.level,'; msg=',msg.message);
        break;
    }
  }
  else if ('response' === msg.type) {
    //console.log('msg.request.type', msg.request.type);  
    if ('stepUpdate' == msg.request.type) {
      av.debug.log += '\n--Aui: type: response; request: stepUpdate; success:' + msg.success;
    }
    else {
      av.debug.log += '\n--Aui: msg.type=response\n' + av.utl.json2stringFn(msg);
    }

  }
  else av.debug.log += '\n--Aui: (else) \n' + av.utl.json2stringFn(msg);
};

av.msg.check4anotherUpdate = function () {
  'use strict';
  var task = 'not';
  var sum = 0;
  var ndx = 0;
  //console.log('newUpdate? stopflag=', av.ui.autoStopFlag, '; stopLimit=', av.dom.autoPauseNum.value, '; update=',av.grd.popStatsMsg.update);
  if (av.dom.autoPauseCheck.checked) {
    if ('update' == av.dom.pauseCriteria.value) {
      if (av.dom.autoPauseNum.value <= av.grd.popStatsMsg.update) {
        //make pause state
        av.ptd.makePauseState();
        av.ui.autoStopFlag = false;
        av.dom.autoPauseCheck.checked = false;
        if (av.ui.oneUpdateFlag) av.ui.oneUpdateFlag = false;
      }
      else {
        // pause run based on up update number not met, check oneupdateflag
        if (av.ui.oneUpdateFlag) {
          av.ui.oneUpdateFlag = false;
          av.ptd.makePauseState();
        }
        else { av.msg.stepUpdate();}
      }
    } else {
      // first done 
      if ('task' == av.dom.itemDone1st.value) {
        for (var ii=0; ii < av.sgr.numTasks; ii++) {
          task = av.sgr.logicVnames[ii];
          sum += av.grd.popStatsMsg[task];
        };
        console.log('sum='+sum, '; not='+ av.grd.popStatsMsg.not, '; nan='+ av.grd.popStatsMsg.nand 
                    ,'; and='+ av.grd.popStatsMsg.and, '; orn='+ av.grd.popStatsMsg.orn
                    ,'; oro='+ av.grd.popStatsMsg.or, '; ant='+ av.grd.popStatsMsg.andn
                    ,'; nor='+ av.grd.popStatsMsg.nor, '; xor='+ av.grd.popStatsMsg.xor
                    ,'; equ='+ av.grd.popStatsMsg.equ);
        if ( 0 < sum ) {
          //make pause state
          av.ptd.makePauseState();
          av.ui.autoStopFlag = false;
          av.dom.autoPauseCheck.checked = false;
          if (av.ui.oneUpdateFlag) av.ui.oneUpdateFlag = false;   
          console.log('sum=', sum);
        } else {
          // pause run based on up any task done not met, check oneupdateflag
          if (av.ui.oneUpdateFlag) {
            av.ui.oneUpdateFlag = false;
            av.ptd.makePauseState();
          }
          else { av.msg.stepUpdate();}
        }
      } else if ('picked' == av.dom.itemDone1st.value) {
        // test to see if picked combo done
        if (0 < av.pch.logNumFnd) {
          //make pause state
          av.ptd.makePauseState();
          av.ui.autoStopFlag = false;
          av.dom.autoPauseCheck.checked = false;
          if (av.ui.oneUpdateFlag) av.ui.oneUpdateFlag = false;            
        } else {
          // pause run based on up any picked combo done not met, check oneupdateflag
          if (av.ui.oneUpdateFlag) {
            av.ui.oneUpdateFlag = false;
            av.ptd.makePauseState();
          }
          else { av.msg.stepUpdate();}
        }
      } else {
        // check for an individual logic task
        ndx = av.sgr.logicNames.indexOf(av.dom.itemDone1st.value);
        if (0 < av.grd.popStatsMsg[av.sgr.logicVnames[ndx]]) {
          //make pause state
          av.ptd.makePauseState();
          av.ui.autoStopFlag = false;
          av.dom.autoPauseCheck.checked = false;
          if (av.ui.oneUpdateFlag) av.ui.oneUpdateFlag = false;                        
        } else {
          // pause run based on up any picked combo done not met, check oneupdateflag
          if (av.ui.oneUpdateFlag) {
            av.ui.oneUpdateFlag = false;
            av.ptd.makePauseState();
          }
          else { av.msg.stepUpdate();}
        };
      };  //end of indidual logic task
    };  //end of first done 
  }  // end of pause flag checked 
  else {
    // not checked so check for oneUpdateFlag
    if (av.ui.oneUpdateFlag) {
      av.ui.oneUpdateFlag = false;
      av.ptd.makePauseState();
    }
    else {av.msg.stepUpdate();}
  }
};

av.msg.stepUpdate = function () {
  'use strict';
  setTimeout(function () {
    //av.debug.log += '\n - - Update data: stepUpdate: stopRun:' + runStopButton.textContent + '; previousUpdate'
    //  + av.msg.previousUpdate  + '; popStatsupdate' + av.grd.popStatsMsg.update;
    //console.log('stepUpdate', runStopButton.textContent, '; previousUpdate', av.msg.previousUpdate, '; pop', av.grd.popStatsMsg.update);
    if ('Pause' == runStopButton.textContent) {
      av.msg.previousUpdate = av.grd.popStatsMsg.update;
      var request = {'type': 'stepUpdate'};
      av.aww.uiWorker.postMessage(request);
      av.debug.log += '\n\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; ' + av.utl.jsonStringifyOneLine(request);
    }
  }, 1);  //number is time in msec for a delay
};

//------------------------------------------------------------------------------------------- av.msg.importConfigExpr --
av.msg.importConfigExpr = function (from) {
  'use strict';
  console.log(from, 'called av.msg.importConfigExpr');
  if (false) console.log('this would not be executed');
  //if ('test' == av.msg.setupType) {av.msg.makeTestDirMsg();}  //av.msg.avidaTestRunFlag
//  if (av.msg.avidaMultiRunFlag) av.msg.makeMultiMsg;
//  if (av.msg.ResourceRunFlag) av.msg.makeResourceMsg;
  else {
    var fList = ['avida.cfg'
      , 'clade.ssg'
      , 'detail.spop'
      , 'environment.cfg'
      , 'events.cfg'
      , 'instset.cfg'
      , 'update'
    ];
    var request = {
      'type': 'addEvent',
      'name': 'importExpr',
      'amend': 'false',
      'triggerType': 'immediate',
      'files': [
//      { 'name': 'avida.cfg', 'data': av.fzr.actConfig.file['avida.cfg'] },
//      { 'name': 'environment.cfg', 'data': av.fzr.actConfig.file['environment.cfg'] }
      ]
    };
    var lngth = fList.length;
    for (var ii = 0; ii < lngth; ii++) {
      //console.log('Config: file', ii, fList[ii])
      if (av.fzr.actConfig.file[fList[ii]]) {
        request.files.push({ 'name': fList[ii], 'data': av.fzr.actConfig.file[fList[ii]] });
      }
    }
    if (av.debug.msg) console.log('importExpr', request);
    //console.log('importExpr', request);
    document.getElementById('showBigTextarea').value = '\n--uiA: importExpr:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + '  from importTestDishExpr';
    console.log('\n--uiA: importExpr:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + ' from importConfigExpr');
    //console.log('Debug: NOT SENT TO AVIDA');
    av.aww.uiWorker.postMessage(request);
    av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + ' from importConfigExpr';
  }
};

//--------------------------------------------------------------------------------------- end av.msg.importConfigExpr --

//--------------------------------------------------------------------------------------------- av.msg.makeTestDirMsg --
av.msg.makeTestDirMsg = function () {
  'use strict';
  var fList = ['avida.cfg'
    , 'clade.ssg'
    , 'detail.spop'
    , 'environment.cfg'
    , 'events.cfg'
    , 'instset.cfg'
    , 'update'
  ];
  var request = {
    'type': 'addEvent',
    'name': 'importExpr',
    'triggerType': 'immediate',
    'files': [
//      { 'name': 'avida.cfg', 'data': av.fzr.actConfig.file['avida.cfg'] },
//      { 'name': 'environment.cfg', 'data': av.fzr.actConfig.file['environment.cfg'] }
    ]
  };
  console.log('in av.msg.makeResReqMsg: undefined global var dir = ', dir);
  var lngth = fList.length;
  for (var ii = 0; ii < lngth; ii++) {
    if (av.fzr.file[dir+'/'+fList[ii]]) {
      request.files.push({ 'name': fList[ii], 'data': av.fzr.file[dir+'/'+fList[ii]] });
      console.log('filename=', dir+'/'+fList[ii]);
    }
  }
  if (true) console.log('importExpr-testDish', request); //av.debug.msg
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + '  from av.msg.makeTestDirMsg';
};

//----------------------------------------------------------------------------------------- end av.msg.makeTestDirMsg --

//---------------------------------------------------------------------------------------------- av.msg.makeResReqMsg --
av.msg.makeResReqMsg = function (dir) {
  'use strict';
  var fList = ['avida.cfg'
    , 'clade.ssg'
    , 'detail.spop'
    , 'environment.cfg'
    , 'events.cfg'
    , 'instset.cfg'
    , 'update'
  ];
  var request = {
    'type': 'addEvent',
    'name': 'importExpr',
    'triggerType': 'immediate',
    'files': [
//      { 'name': 'avida.cfg', 'data': av.fzr.actConfig.file['avida.cfg'] },
//      { 'name': 'environment.cfg', 'data': av.fzr.actConfig.file['environment.cfg'] }
    ]
  };
  console.log('in av.msg.makeResReqMsg:');
  var lngth = fList.length;
  for (var ii = 0; ii < lngth; ii++) {
    if (av.fzr.file[dir+'/'+fList[ii]]) {
      request.files.push({ 'name': fList[ii], 'data': av.fzr.file[dir+'/'+fList[ii]] });
      console.log('filename=', dir+'/'+fList[ii]);
    }
  }
  av.aww.uiWorker.postMessage(request);
  if (true) console.log('makeResReqMsg', request); //av.debug.msg
  if (av.debug.msg) console.log('av.msg.makeResReqMsg', request);

  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + '  from importPopExpr';
};
//------------------------------------------------------------------------------------------ end av.msg.makeResReqMsg --

//---------------------------------------------------------------------------------------- av.msg.importMultiDishExpr --
/*
av.msg.importMultiDishExpr = function (dir) {
  'use strict';
  var fList = ['avida.cfg'
    , 'clade.ssg'
    , 'detail.spop'
    , 'environment.cfg'
    , 'events.cfg'
    , 'instset.cfg'
    , 'update'
  ];
  var request = {
    'type': 'addEvent',
    'name': 'importMultiDish',
    'triggerType': 'immediate',
    'amend': 'false',
    'superDishFiles': [
//      { 'name': 'avida.cfg', 'data': av.fzr.actConfig.file['avida.cfg'] },
//      { 'name': 'environment.cfg', 'data': av.fzr.actConfig.file['environment.cfg'] }
    ],
    'subDishes': []
  };
  var subDish = {
      'xpos': 0
    , 'ypos': 0
    , 'files':[
//      { 'name': 'avida.cfg', 'data': av.fzr.actConfig.file['avida.cfg'] },
//      { 'name': 'environment.cfg', 'data': av.fzr.actConfig.file['environment.cfg'] }
    ]
  };

  //console.log('in av.msg.importMultiDishExpr:');
  var lngth = fList.length;
  for (var ii = 0; ii < lngth; ii++) {
    if (av.fzr.file[dir+'/'+fList[ii]]) {request.superDishFiles.push({ 'name': fList[ii], 'data': av.fzr.file[dir+'/'+fList[ii]] }); }
  }
  var offset = [];
  for (var key in av.fzr.mDish[dir].domid) {
    subDish.files = [];
    console.log('dir=', dir, '; key=', key);
    offset = av.msg.getOffset(dir, key);
    subDish.xpos = offset[0];
    subDish.ypos = offset[1];
    var lngth = fList.length;
    for (var ii = 0; ii < lngth; ii++) {
      if (av.fzr.file[dir+'/'+key+'/'+fList[ii]]) {
        subDish.files.push({ 'name': fList[ii], 'data': av.fzr.file[dir+'/'+key+'/'+fList[ii]] });
      }
    }
    request.subDishes.push(subDish);
  }
  if (av.debug.msg) console.log('importMultiDishExpr', request);
  console.log('importMultiDishExpr', request);
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + '  from importMultiDishExpr';
};
*/
//------------------------------------------------------------------------------------ end av.msg.importMultiDishExpr --

//----------------------------------------------------------------------------------------- av.msg.importTestDishExpr --
av.msg.importTestDishExpr = function (dir) {
  'use strict';
  var fList = ['avida.cfg'
    , 'clade.ssg'
    , 'detail.spop'
    , 'environment.cfg'
    , 'events.cfg'
    , 'instset.cfg'
    , 'update'
  ];
  var request = {
    'type': 'addEvent',
    'name': 'importExpr',
    'triggerType': 'immediate',
    'amend': 'false',
    'files': [
//      { 'name': 'avida.cfg', 'data': av.fzr.actConfig.file['avida.cfg'] },
//      { 'name': 'environment.cfg', 'data': av.fzr.actConfig.file['environment.cfg'] }
    ]
  };

  //console.log('in av.msg.importTdishExpr:');
  var lngth = fList.length;
  for (var ii = 0; ii < lngth; ii++) {
    if (av.fzr.file[dir+'/'+fList[ii]]) {request.files.push({ 'name': fList[ii], 'data': av.fzr.file[dir+'/'+fList[ii]] }); }
  }

  if (true) console.log('importTestDishExpr', request);  //av.debug.msg
  console.log('importTestDishExpr', request);
  console.log('\n--uiA: importExpr:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + '  from importTestDishExpr');
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: importExpr:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + '  from importTestDishExpr';
};
//------------------------------------------------------------------------------------- end av.msg.importTestDishExpr --

av.msg.importPopExpr = function () {
  'use strict';
  var fList = ['avida.cfg'
    , 'clade.ssg'
    , 'detail.spop'
    , 'environment.cfg'
    , 'events.cfg'
    , 'instset.cfg'
    , 'update'
  ];
  var request = {
    'type': 'addEvent',
    'name': 'importExpr',
    'triggerType': 'immediate',
    'files': [
//      { 'name': 'avida.cfg', 'data': av.fzr.actConfig.file['avida.cfg'] },
//      { 'name': 'environment.cfg', 'data': av.fzr.actConfig.file['environment.cfg'] }
    ]
  };
  //console.log('in importPopExpr: av.fzr.actConfig.file',av.fzr.actConfig.file)
  var lngth = fList.length;
  for (var ii = 0; ii < lngth; ii++) {
    if (av.fzr.actConfig.file[fList[ii]]) {request.files.push({ 'name': fList[ii], 'data': av.fzr.actConfig.file[fList[ii]] }); }
  }
  if (av.debug.msg) console.log('importExpr', request);
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + '  from importPopExpr';
};

av.msg.importWorldExpr = function () {
  'use strict';
  var fList = ['avida.cfg'
    , 'environment.cfg'
  ];
  var request = {
    'type': 'addEvent',
    'name': 'importExpr',
    'triggerType': 'immediate',
    'amend': 'true',
    'files': [
      { 'name': 'avida.cfg', 'data': av.fzr.actConfig.file['avida.cfg'] },
      { 'name': 'environment.cfg', 'data': av.fzr.actConfig.file['environment.cfg'] }
    ]
  };
  //console.log('in importWorldExpr: av.fzr.actConfig.file',av.fzr.actConfig.file)
  var lngth = fList.length;
  for (var ii = 0; ii < lngth; ii++) {
    if (av.fzr.actConfig.file[fList[ii]]) {request.files.push({ 'name': fList[ii], 'data': av.fzr.actConfig.file[fList[ii]] }); }
  }
  if (true) console.log('importExpr', request);  //av.debug.msg
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request) + '  from importWorldExpr';
};

av.msg.getOffset = function (dir, key) {
  "use strict";
  var pair = [];
  var filestr = av.fzr.file[dir+'/'+key+'/offset.txt'];
  if (undefined != filestr) {
    var lines = filestr.split('\n');
    var pair = lines[0].split(',');
    return pair;
  }
  else {
    console.log('file ', dir+'/'+key+'/offset.txt', ' is missing.');
    pair = [0, 0];
    return;
  }
};

av.msg.exportExpr = function (popName) {
  'use strict';
  var request = {
    'type': 'addEvent',
    'name': 'exportExpr',
    'popName': popName,
    'triggerType': 'immediate'
  };
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request);
};

//fio.uiWorker function
av.msg.doOrgTrace = function () {
  'use strict';
  if (av.fzr.actOrgan.genome) {
    //console.log('in send webOrgTraceBySequence; av.fzr.actOrgan.genome', av.fzr.actOrgan.genome.length, av.fzr.actOrgan.genome);
    if ( 50 < av.fzr.actOrgan.genome.length) {
      if (av.debug.msg) console.log('doOrgTrace: fzr', av.fzr);
      var seed = 100 * Math.random();
      if (dijit.byId('OrganDemoRadio').get('checked', true)) {seed = 0;}
      else {seed = -1;}
      var request = {
        'type': 'addEvent',
        'name': 'webOrgTraceBySequence',
        'triggerType': 'immediate',
        'args': [
          //'0,heads_default,' + av.fzr.actOrgan.genome,                                  //genome string
          av.fzr.actOrgan.genome,                                  //genome string
          document.getElementById('orgMuteInput').value / 100,     // point mutation rate
          seed                                            //seed where 0 = random; >0 to replay that number
        ]
      };
      //
      if (av.debug.msg) console.log('doOrgTrace', request);
      if (av.debug.msg) console.log('doOrgTrace string', av.utl.json2stringFn(request));
      av.aww.uiWorker.postMessage(request);
      av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request);
      av.msg.sendData();
    }
  }
};

//request data from Avida to update SelectedOrganismType
av.msg.doWebOrgDataByCell = function () {
  'use strict';
  var request = {
    'type': 'addEvent',
    'name': 'WebOrgDataByCellID',
    //'triggerType': 'immediate',
    'start': 'now',
    'interval': 'always',
    'singleton': true,
    'args': av.grd.selectedNdx
  };
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request);
  av.msg.sendData();
  //console.log('runStopButton',runStopButton.textContent);
};

//fio.uiWorker function
av.msg.requestPopStats = function () {
  'use strict';
  var request = {
    'type': 'addEvent',
    'name': 'webPopulationStats',
    'start': 'now',
    'interval': 1
  };
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request);
};

av.msg.sync = function (trigger) {
  'use strict';
  var tmp = Date.now();
  var request = {
    'type': 'sync',
    'time': tmp,
    'args': trigger
  };
  av.aww.uiWorker.postMessage(request);
  var stub = 'type:sync; args:' + trigger + '; time: ' + tmp;  //may not display anyway
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + ';  ' + stub;
};

av.msg.requestGridData = function () {
  'use strict';
  var request = {
    'type': 'addEvent',
    'name': 'webGridData',
    'start': 'begin',
    'interval': 1
  };
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request);
};

av.msg.sendData = function () {};

av.msg.sendData_real = function () {
  'use strict';
  var request;
  request = {'type': 'sendData'};
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request);
};

//sends message to worker to tell Avida to run/pause as a toggle.
//fio.uiWorker function
av.msg.doRunPause = function () {};
/*
av.msg.doRunPause = function () {
  'use strict';
  var request;
    request = {
      'type': 'addEvent',
      'name': 'runPause',
      'triggerType': 'immediate'
    };
  av.aww.uiWorker.postMessage(request);
}
*/

//fio.uiWorker function
av.msg.resetFn = function (from) {
  'use strict';
  console.log(from, 'called av.msg.resetFn');
  av.msg.setupType = 'normal';
  av.msg.uiReqestedReset = true;
  var request = {
    'type': 'addEvent',
    'name': 'reset',
    'triggerType': 'immediate'
  };
  if (av.debug.userMsg) userMsgLabel.textContent = '| ui-->Avida: reset requested';
  av.aww.uiWorker.postMessage(request);
  av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request);
};

//Not used when handshaking is used.
av.msg.pause = function(update) {};

av.msg.injectAncestors = function (from) {
  'use strict';
  //console.log(from, 'called av.msg.injectAncestors; parents=', av.parents);
  var request;
  var lngth = av.parents.name.length;
  for (var ii = 0; ii < lngth; ii++) {
    //console.log('parents.injected', av.parents.injected[ii]);
    if (!av.parents.injected[ii]) {
      request = {
        'type': 'addEvent',
        'name': 'webInjectSequence',
        'start': 'begin',   //was begin
        'interval': 'once',
        'genome': av.parents.genome[ii],
        'start_cell_id': av.parents.AvidaNdx[ii],
        'clade_name': av.parents.name[ii]
      };
      av.aww.uiWorker.postMessage(request);
      av.debug.log += '\n--uiA: grdUpdate:' + av.msg.previousUpdate + '; \n' + av.utl.jsonStringify(request);
      //console.log('log', av.utl.json2stringFn(request));
      av.parents.injected[ii] = true;
      //console.log('parents.injected', av.parents.injected[ii]);
    };
  };
};

//------------------------------------------------------------------------------------------- av.msg.updatePopStats --
av.msg.updatePopStats = function (msg) {
  'use strict';
  var tskDom= '';
  var resrcAmount= 0;
  var tskName='';
  var resrcMetric= '';
  var ndx= 0;
  var numTsk = 0;
  
  if (av.debug.msg) { console.log('Fit=', msg.ave_fitness, '; Cst=', msg.ave_gestation_time, '; Ear=', msg.ave_metabolic_rate, '; via=', msg.viables); }
  
  //update graph arrays
  if (0 <= msg.update) {  //normal start to loop
    av.pch.aveFit[msg.update] = msg.ave_fitness;
    av.pch.aveCst[msg.update] = msg.ave_gestation_time;
    av.pch.aveEar[msg.update] = msg.ave_metabolic_rate;
    av.pch.aveNum[msg.update] = msg.organisms;
    av.pch.aveVia[msg.update] = msg.viables;
    
    av.pch.aveDadFit[msg.update] = msg.ave_repro_fitness;
    av.pch.aveDadCst[msg.update] = msg.ave_repro_gestation_time;
    av.pch.aveDadEar[msg.update] = msg.ave_repro_metabolic_rate;
    av.pch.aveDadVia[msg.update] = msg.with_offspring;

    av.pch.xx[msg.update] = msg.update;

    //console.log('av.parents.name.length = ',av.parents.name.length, '; av.pch.numDads=', av.pch.numDads);
    for (var ii = 0; ii<av.pch.numDads; ii++) {
      //console.log('ii='+ii,'; msg.by_clade[av.parents.name[ii]]=',msg.by_clade[av.parents.name[ii]], '; av.parents.name[ii]=', av.parents.name[ii]);
      if (undefined != msg.by_clade[av.parents.name[ii]]) {
        //console.log('ii=',ii,'; msg.update=', msg.update);
        //console.log('av.pch.dadFit=', av.pch.dadFit);
        //console.log('av.parents.name', av.parents.name);
        //console.log('msg.by_clade=', msg.by_clade);
        //console.log('ii='+ii ,'; msg.by_clade['+av.parents.name[ii]+'].fitness=', msg.by_clade[av.parents.name[ii]].fitness);
        av.pch.dadFit[av.parents.name[ii]][msg.update] = msg.by_clade[av.parents.name[ii]].fitness;
        av.pch.dadCst[av.parents.name[ii]][msg.update] = msg.by_clade[av.parents.name[ii]].gestation;
        av.pch.dadEar[av.parents.name[ii]][msg.update] = msg.by_clade[av.parents.name[ii]].metabolism;
        av.pch.dadNum[av.parents.name[ii]][msg.update] = msg.by_clade[av.parents.name[ii]].organisms;
        av.pch.dadVia[av.parents.name[ii]][msg.update] = msg.by_clade[av.parents.name[ii]].viables;
      }
      else {
        av.pch.dadFit[av.parents.name[ii]][msg.update] = null;
        av.pch.dadCst[av.parents.name[ii]][msg.update] = null;
        av.pch.dadEar[av.parents.name[ii]][msg.update] = null;
        av.pch.dadNum[av.parents.name[ii]][msg.update] = null;
        av.pch.dadVia[av.parents.name[ii]][msg.update] = null;
      }
      //console.log('av.pch.dadfFit['+av.parents.name[ii]+']['+msg.update+']=', av.pch.dadFit[av.parents.name[ii]][msg.update]);
    }

    if (av.pch.aveFit[msg.update] > av.pch.aveMaxFit) av.pch.aveMaxFit = av.pch.aveFit[msg.update];
    if (av.pch.aveCst[msg.update] > av.pch.aveMaxCst) av.pch.aveMaxCst = av.pch.aveCst[msg.update];
    if (av.pch.aveEar[msg.update] > av.pch.aveMaxEar) av.pch.aveMaxEar = av.pch.aveEar[msg.update];
    if (av.pch.aveNum[msg.update] > av.pch.aveMaxNum) av.pch.aveMaxNum = av.pch.aveNum[msg.update];
    if (av.pch.aveVia[msg.update] > av.pch.aveMaxVia) av.pch.aveMaxVia = av.pch.aveVia[msg.update];
    
    if (av.pch.aveDadFit[msg.update] > av.pch.aveDadMaxFit) av.pch.aveDadMaxFit = av.pch.aveFit[msg.update];
    if (av.pch.aveDadCst[msg.update] > av.pch.aveDadMaxCst) av.pch.aveDadMaxCst = av.pch.aveCst[msg.update];
    if (av.pch.aveDadEar[msg.update] > av.pch.aveDadMaxEar) av.pch.aveDadMaxEar = av.pch.aveEar[msg.update];
    if (av.pch.aveDadVia[msg.update] > av.pch.aveDadMaxVia) av.pch.aveDadMaxVia = av.pch.aveVia[msg.update];
    
    av.ptd.updateLogicFn(msg.update);  //for graph data  switch to run with grid data since the data is from the grid data
  };
  
  TimeLabel.textContent = msg.update.formatNum(0) + ' updates';
  av.grd.updateNum = msg.update;
  
  popSizeLabel.textContent = msg.organisms.formatNum(0);
  aFitLabel.textContent = av.utl.toMetric(msg.ave_fitness, 0);

  aEnergyAcqRateLabel.textContent = av.utl.toMetric(msg.ave_metabolic_rate, 0);
  if (0 < msg.ave_gestation_time) {
    aOffspringCostLabel.textContent = av.utl.toMetric(msg.ave_gestation_time, 0);
  } else { 
    aOffspringCostLabel.textContent = 'non-viable'; 
  }
  
  aAgeLabel.textContent = msg.ave_age.formatNum(1);

  parentNumLabel.textContent = av.parents.name.length;  //number of original ancesstors

  //update viable number on webpage
  viableNumLabel.textContent = msg.viables.formatNum(0);

  notPop.textContent = msg.not;
  nanPop.textContent = msg.nand;  //these do not match
  andPop.textContent = msg.and;
  ornPop.textContent = msg.orn;
  oroPop.textContent = msg.or;
  antPop.textContent = msg.andn;
  norPop.textContent = msg.nor;
  xorPop.textContent = msg.xor;
  equPop.textContent = msg.equ;
  
  //create resource arrays
  //console.log('msg.globalResourceAmount=', msg.globalResourceAmount);
  var obj = msg.globalResourceAmount;
  //console.log(av.pch.resrcCnt, 'obj.length=', obj.length, '; obj=', obj);
  //console.log('length=', av.pch.resrcGlobal.length, '; av.pch.resrcGlobal=', av.pch.resrcGlobal);
  
  for (var tskName in obj) {
    if ( obj.hasOwnProperty(tskName) ) {
      ndx = av.sgr.logicNames.indexOf(tskName);
      numTsk = av.sgr.logEdNames[ndx];
      resrcAmount = obj[tskName];
      if ( av.utl.isNumber(parseFloat(resrcAmount)) && 'global' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        tskDom = av.sgr.logicTitleNames[ndx];
        resrcMetric = av.utl.toMetric(resrcAmount, 0);
        av.pch.resrcGlobal[tskName][msg.update] = parseFloat(resrcAmount);
        //console.log('key=', tskName, '; val=', resrcAmount, '; resrcMetric=', resrcMetric, '; dom = '+tskDom);
        document.getElementById('tot'+tskDom).innerHTML = resrcMetric;
      };
    };
  };  // end of for items in object
  //console.log('av.pch.resrcGlobal=', av.pch.resrcGlobal);
};
//--------------------------------------------------------------------------------------- end av.msg.updatePopStats --

//-------------------------------------------------------------------------------------------- av.ptd.updateLogicFn --
av.ptd.updateLogicFn = function (mUpdate){
  'use strict';
  //console.log('in updateLogicFn: mUpdate = ', mUpdate);
  av.pch.logFitFnd = 0;
  av.pch.logCstFnd = 0;
  av.pch.logEarFnd = 0;
  av.pch.logNumFnd = 0;

  //console.log('av.ptd.allOff',av.ptd.allOff);
  if (av.ptd.allOff) {    logTit1.textContent = '';
    logTit0.textContent = '';
    logTit1.textContent = '';
    logTit2.textContent = '';
    logTit3.textContent = '';
    logTit4.textContent = '';
    logTit5.textContent = '';
    logTit6.textContent = '';
    logTit7.textContent = '';
    numLog.textContent = '';
    av.pch.logMaxFit = 0;
    av.pch.logMaxCst = 0;
    av.pch.logMaxEar = 0;
    av.pch.logMaxNum = 0;
    av.pch.logFit[mUpdate] = null;
    av.pch.logCst[mUpdate] = null;
    av.pch.logEar[mUpdate] = null;
    av.pch.logNum[mUpdate] = null;
  }
  else {
    logTit0.textContent = '';
    logTit1.textContent = 'Number';
    logTit2.textContent = 'Performing';
    logTit3.textContent = 'All';
    logTit4.textContent = 'Selected';
    logTit5.textContent = 'Functions';
  //logTit6.textContent = 'dashed line';
    logTit6.textContent = '(black dotted line';
    logTit7.textContent = 'in graph below)';

    //console.log('out_', av.grd.logicOutline );
    //console.log('gest', av.grd.msg.gestation.data);

    //console.log('grd.msg', av.grd.msg);
    //console.log('grd.popStatsMsg', av.grd.popStatsMsg);
    ////console.log('av.grd.logicOutline', av.grd.logicOutline);  //looking at logic outline values
    var lngth =  av.grd.msg.fitness.data.length;
    for (var ii=0; ii < lngth; ii++){
      if (0 < av.grd.logicOutline[ii]) {
        av.pch.logFitFnd += av.grd.msg.fitness.data[ii];
        av.pch.logCstFnd += av.grd.msg.gestation.data[ii];
        av.pch.logEarFnd += av.grd.msg.metabolism.data[ii];
        av.pch.logNumFnd++;
      }
    }
    //console.log('NumFnd', av.pch.logNumFnd);                    //looking at logic outline values
    if (0 < av.pch.logNumFnd) {
      av.pch.logFitFnd = av.pch.logFitFnd/av.pch.logNumFnd;
      av.pch.logCstFnd = av.pch.logCstFnd/av.pch.logNumFnd;
      av.pch.logEarFnd = av.pch.logEarFnd/av.pch.logNumFnd;
    }
    av.pch.logFit[mUpdate] = av.pch.logFitFnd;
    av.pch.logCst[mUpdate] = av.pch.logCstFnd;
    av.pch.logEar[mUpdate] = av.pch.logEarFnd;
    av.pch.logNum[mUpdate] = av.pch.logNumFnd;
    numLog.textContent = av.pch.logNumFnd;
  };

  if (av.pch.logFit[mUpdate] > av.pch.logMaxFit) av.pch.logMaxFit = av.pch.logFit[mUpdate];
  if (av.pch.logCst[mUpdate] > av.pch.logMaxCst) av.pch.logMaxCst = av.pch.logCst[mUpdate];
  if (av.pch.logEar[mUpdate] > av.pch.logMaxEar) av.pch.logMaxEar = av.pch.logEar[mUpdate];
  if (av.pch.logNum[mUpdate] > av.pch.logMaxNum) av.pch.logMaxNum = av.pch.logNum[mUpdate];

  /*
  if (av.pch.logFit[mUpdate]) {
    console.log('update', mUpdate, '; Num', av.pch.logNum[mUpdate], '; Fit', av.pch.logFit[mUpdate].formatNum(0),
      '; Gnl', av.pch.logCst[mUpdate].formatNum(0), '; Met', av.pch.logEar[mUpdate].formatNum(0));
  }
  */
};
//------------------------------------------------------------------------------------------ end av.ptd.updateLogicFn --

//--------------------------------------------------------------------------------- av.grd.updateSelectedOrganismType --
//writes out data for WebOrgDataByCellID
av.grd.updateSelectedOrganismType = function (msg) {
  'use strict';
  var prefix = '';
  if (av.debug.msg) console.log('selected_msg', msg);
  if (msg.isEstimate) prefix = 'est. ';
  else prefix = '';
  nameLabel.textContent = msg.genotypeName;
  if (null === msg.fitness) fitLabel.textContent = ' ';
  else fitLabel.textContent = prefix + av.utl.toMetric(msg.fitness, 0);
  if (null === msg.metabolism) energyAcqRateLabel.textContent = ' ';
  else {
    energyAcqRateLabel.textContent = prefix + av.utl.toMetric(msg.metabolism, 0);
  }
  if (null === msg.gestation) offspringCostLabel.textContent = ' ';
  else if (0 < msg.gestation) {
    offspringCostLabel.textContent = prefix + av.utl.toMetric(msg.gestation, 0);
  }
  else {offspringCostLabel.textContent = 'non-viable';}
  if (null == msg.age) ageLabel.textContent = ' ';
    else ageLabel.textContent = msg.age;
  if (null === msg.ancestor) {
    //console.log('av.grd.msg', av.grd.msg);
    if (av.debug.msg) console.log('msg.ancestor === null_______________________________________________________');
    if ('undefined' != typeof av.grd.msg.ancestor) {
      if (null === av.grd.msg.ancestor.data[av.grd.selectedNdx])
        ancestorLabel.textContent = ' ';
      else ancestorLabel.textContent = av.parents.name[av.grd.msg.ancestor.data[av.grd.selectedNdx]];
    }
    else ancestorLabel.textContent = ' ';
  }
  //else ancestorLabel.textContent = av.parents.name[msg.ancestor];
  else ancestorLabel.textContent = msg.ancestor;

  if (null != msg.tasks) {
    //now put in the actual numbers
    notTime.textContent = msg.tasks.not;
    nanTime.textContent = msg.tasks.nand;
    andTime.textContent = msg.tasks.and;
    ornTime.textContent = msg.tasks.orn;
    oroTime.textContent = msg.tasks.or;
    antTime.textContent = msg.tasks.andn;
    norTime.textContent = msg.tasks.nor;
    xorTime.textContent = msg.tasks.xor;
    equTime.textContent = msg.tasks.equ;
  }
  else {
    notTime.textContent = '-';
    nanTime.textContent = '-';
    andTime.textContent = '-';
    ornTime.textContent = '-';
    oroTime.textContent = '-';
    antTime.textContent = '-';
    norTime.textContent = '-';
    xorTime.textContent = '-';
    equTime.textContent = '-';
  }
  if (av.debug.msg) dnaLabel.textContent = av.utl.wsa(',', av.utl.wsa(',', msg.genome));
  if (av.debug.msg) viableLabel.textContent = msg.isViable;
  if (0 > msg.isViable) viableLabel.textContent = 'no';
  else if (0 < msg.isViable) viableLabel.textContent = 'yes';
  else viableLabel.textContent = 'unknown';

  av.msg.fillColorBlock(msg, 'av.grd.updateSelectedOrganismType');   // make the color block next to name contain the color that is on the grid for that cell
  if (av.debug.msg) console.log('Kidstatus', av.grd.kidStatus);
  
  //set status of selected grid locaton to know if an organism is present to drag and drop
  if ('getgenome' == av.grd.kidStatus) {
    if (av.debug.msg) console.log('in kidStatus');
    av.grd.kidStatus = 'havegenome';
    av.grd.kidName = msg.genotypeName;
    av.grd.kidGenome = msg.genome;
    if (av.debug.msg) console.log('genome',av.grd.kidGenome, '-------------------');
    dijit.byId('mnCnOrganismTrace').attr('disabled', false);
  }
};
//----------------------------------------------------------------------------- end av.grd.updateSelectedOrganismType --

//--------------------------------------------------------------------------------------------- av.msg.fillColorBlock --
// Draw a box with the color of the selected organism in the Selected Organsim Type (SOT) table next to name.
// if (av.dbg.flg.root) { console.log('Root: before av.msg.fillColorBlock'); }
av.msg.fillColorBlock = function (msg, from) {  
  'use strict';
  var bkcolor = '#000';
  var colorMode = document.getElementById('colorMode').value;
  if (av.debug.msg) { console.log('Msg: av.grd.fill[av.grd.selectedNdx]=',av.grd.fill[av.grd.selectedNdx]); }

  if ('Ancestor Organism' == document.getElementById('colorMode').value) {
    // the display mode is Ancestor so used the color for the ancstor, if one exits. 
    if (null != av.grd.fill[av.grd.selectedNdx]) {
      bkcolor = av.parents.color[av.parents.name.indexOf(msg.ancestor)];
      //console.log('Ancestor Organimsm mode: bkColor=', bkcolor);
    };
  }
  else {
    //console.log('Gradient mode');
    if (null != av.grd.fill[av.grd.selectedNdx]) {
      if (0 >= av.grd.msg.gestation.data[av.grd.selectedNdx]) {  
        bkcolor = '#888';
      //console.log('Gradient mode,  null != fill, - = ancestor.data: bkColor=', bkcolor);
      }
      else {
        bkcolor = av.utl.get_color0(av.grd.cmap, av.grd.fill[av.grd.selectedNdx], 0, av.grd.fillmax);
        //console.log('Gradient mode,  null != fill, - = ancestor.data: bkColor=', bkcolor);
      };
    }
    else {
      console.log('Gradient mode,  null = fill: bkColor=', bkcolor);
      if (undefined == av.grd.msg.ancestor) { 
        console.log ('av.grd.msg.ancestor is undefined');
      } else {
        console.log('av.grd.msg.ancestor =', av.grd.msg.ancestor);
      };
      try {
        if (av.grd.msg.ancestor.data != undefined) {
          console.log("av.grd.msg.ancestor.data is defined");
          if ('-' != av.grd.msg.ancestor.data[av.grd.selectedNdx]) { 
            bkcolor = '#888';
          console.log('Gradient mode,  null = fill, - = ancestor.data: bkColor=', bkcolor);
          }
        }
      } catch (e) { console.log('ERROR: e =', e, 'e.stack =', e.stack); } // buggy
    }
  } 

  if (true) {
    if (av.grd.msg.ancestor.data != undefined) {
      console.log(from, 'called fillColorBlock: colorMode=', colorMode
                  , '; av.grd.fill['+av.grd.selectedNdx+']=',  av.grd.fill[av.grd.selectedNdx] 
                  , '; av.grd.msg.ancestor.data['+av.grd.selectedNdx+']=',  av.grd.msg.ancestor.data[av.grd.selectedNdx]); 
    }
  }


  if (av.debug.msg) console.log('sot bkcolor', bkcolor);
  av.dom.sotColorBox.style.backgroundColor = bkcolor;
  av.dom.sotColorBox.style.border = '1xpx solid ' + 'blacks';   //was bkcolor
};




//----------------------------------------------------------------------------------------- end av.msg.fillColorBlock --
// if (av.dbg.flg.root) { console.log('Root: end of messaging'); }


// ------------------------------------------------ not in use ---------------------------------------------------------
/*
function doDbReady(fio) {
  'use strict';
  var request = {
    'type': 'dbReady'
  };
  av.aww.uiWorker.postMessage(request);
}
*/

