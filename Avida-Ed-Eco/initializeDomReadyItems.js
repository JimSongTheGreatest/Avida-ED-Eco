  //Just a definition of pointes to DOM objecs. I'm not sure if this speeds up running at all just slows down lading the app

  var av = av || {};  //because av already exists, want to let editor know that av is valid

  // if (av.dbg.flg.root) { console.log('Root: before av.dom.load'); }
  av.dom.load = function () {
    'use strict';
    //Menu
    av.dom.mnCnPopRun = document.getElementById('mnCnPopRun');

    av.dom.mnFlStandAloneApp = document.getElementById('mnFlStandAloneApp');
    av.dom.mnHpAbout = document.getElementById('mnHpAbout');
    av.dom.mnHpManual = document.getElementById('mnHpManual');
    av.dom.mnHpHardware = document.getElementById('mnHpHardware');
    av.dom.mnHpInfo = document.getElementById('mnHpInfo');
    av.dom.mnHpProblem = document.getElementById('mnHpProblem');
    av.dom.mnHpDebug = document.getElementById('mnHpDebug');
    av.dom.mnDebug = document.getElementById('mnDebug');

    //main area
    av.dom.userMsgLabel = document.getElementById('userMsgLabel');
    av.dom.wsSavedMsg = document.getElementById('wsSavedMsg');
    av.dom.wsNameMsg = document.getElementById('wsNameMsg');


    av.dom.navColId = document.getElementById('navColId');
    av.dom.allAvidaContainer = document.getElementById('allAvidaContainer');
    av.dom.popInfoVert = document.getElementById('popInfoVert');
    av.dom.labInfoHolder = document.getElementById('labInfoHolder');
    av.dom.popStatsBlock = document.getElementById('popStatsBlock');
    av.dom.popStatHolder = document.getElementById('popStatHolder');
    av.dom.popStatistics = document.getElementById('popStatistics');
    av.dom.popStats4grid = document.getElementById('popStats4grid');
    av.dom.selOrgType = document.getElementById('selOrgType');
    av.dom.resrceDataHolder = document.getElementById('resrceDataHolder');
    av.dom.popChrtCntrlHldr = document.getElementById('popChrtCntrlHldr');
    av.dom.popChrtHolder = document.getElementById('popChrtHolder');
    av.dom.pauseOptions = document.getElementById('pauseOptions');

    av.dom.populationButton = document.getElementById('populationButton');
    av.dom.freezerSection = document.getElementById('freezerSection');
    av.dom.freezeButton = document.getElementById('freezeButton');
    av.dom.populationBlock = document.getElementById('populationBlock');
    av.dom.organismBlock = document.getElementById('organismBlock');
    av.dom.analysisBlock = document.getElementById('analysisBlock');
    av.dom.showTextDebugBlock = document.getElementById('showTextDebugBlock');
    av.dom.populationButton = document.getElementById('populationButton');
    av.dom.organismButton = document.getElementById('organismButton');
    av.dom.analysisButton = document.getElementById('analysisButton');
    av.dom.showTextDebugButton = document.getElementById('showTextDebugButton');

    av.dom.leftPanelButton = document.getElementById('leftPanelButton');
    av.dom.lftSidePnlShowing = true;
    av.dom.ritePanelButton = document.getElementById('ritePanelButton');

    av.dom.orgInfoHolder = document.getElementById('orgInfoHolder');


    //Population Page
    av.dom.rightInfoHolder = document.getElementById('rightInfoHolder');
    av.dom.statsTab = document.getElementById('statsTab');
    av.dom.setupTab = document.getElementById('setupTab');
    av.dom.testTab = document.getElementById('testTab');
    av.dom.setupBlock = document.getElementById('setupBlock');
    av.dom.testSetupBlock = document.getElementById('testSetupBlock');
    av.dom.mapHolder = document.getElementById('mapHolder');
    av.dom.popTopRw = document.getElementById('popTopRw');
    av.dom.gridHolder = document.getElementById('gridHolder');
    av.dom.gridCanvas = document.getElementById('gridCanvas');
    av.dom.sclCnvsHldr = document.getElementById('sclCnvsHldr');
    av.dom.scaleCanvas = document.getElementById('scaleCanvas');
    av.dom.dadLegendHldr = document.getElementById('dadLegendHldr');
    av.dom.dadInfo00 = document.getElementById('dadInfo00');
    av.dom.popStatsBlock = document.getElementById('popStatsBlock');
    av.dom.sotColorBox = document.getElementById('sotColorBox');
    av.dom.StatsButton = document.getElementById('StatsButton');

    av.dom.popChrtHolder = document.getElementById('popChrtHolder'); 
    av.dom.popChart = document.getElementById('popChart');  //easier handle for div with chart
    av.dom.popChartDiv = document.getElementById('popChartDiv');
    av.dom.cycleSlider = document.getElementById('cycleSlider');
    av.dom.runStopButton = document.getElementById('runStopButton');
    av.dom.oneUpdateButton = document.getElementById('oneUpdateButton');
    av.dom.newDishButton = document.getElementById('newDishButton');
    av.dom.avidianOutline = document.getElementById('avidianOutline');


    av.dom.popPgCntrlHolder = document.getElementById('popPgCntrlHolder');

    //Test setup page
    av.dom.sizeCellTest = document.getElementById('sizeCellTest');
    av.dom.sizeColTest = document.getElementById('sizeColTest');
    av.dom.sizeRowTest = document.getElementById('sizeRowTest');
    av.dom.childParentRadiTest = document.getElementById('childParentRadiTest');
    av.dom.experimentRadiTest = document.getElementById('experimentRadiTest');
    av.dom.randInpuTest = document.getElementById('randInpuTest');
    //av.dom.Test = document.getElementById('Test');
    //av.dom.Test = document.getElementById('Test');

    //Population Map Setup page
    av.dom.sizeCells = document.getElementById('sizeCells');
    av.dom.sizeCols = document.getElementById('sizeCols');
    av.dom.sizeRows = document.getElementById('sizeRows');
    av.dom.mutePopInput = document.getElementById('mutePopInput');
    av.dom.mutePopError = document.getElementById('mutePopError');
    av.dom.childParentRadio = document.getElementById('childParentRadio');
    av.dom.childRandomRadio = document.getElementById('childRandomRadio');
    av.dom.envNone = document.getElementById('envNone');
    av.dom.envLimited = document.getElementById('envLimited');
    av.dom.envGradient = document.getElementById('envGradient');
    av.dom.envChemostat = document.getElementById('envChemostat');
    av.dom.envSourceSink = document.getElementById('envSourceSink');
    av.dom.envInitial = document.getElementById('envInitial');
    av.dom.envEqInflow = document.getElementById('envEqInflow');
    av.dom.envEqOutflow = document.getElementById('envEqOutflow');
    av.dom.envEqual = document.getElementById('envEqual');
    av.dom.envGrSide = document.getElementById('envGrSide');
    av.dom.envGrInflow = document.getElementById('envGrInflow');
    av.dom.envGrOutflow = document.getElementById('envGrOutflow');
    //av.dom.env = document.getElementById(''); 

    av.dom.notButton = document.getElementById('notButton');
    av.dom.andButton = document.getElementById('andButton');
    av.dom.orButton = document.getElementById('orButton');
    av.dom.norButton = document.getElementById('norButton');
    av.dom.equButton = document.getElementById('equButton');  //5
    av.dom.nanButton = document.getElementById('nanButton');
    av.dom.ornButton = document.getElementById('ornButton');
    av.dom.andnButton = document.getElementById('andnButton');
    av.dom.xorButton = document.getElementById('xorButton');

    av.dom.sugarAccordion = document.getElementById('sugarAccordion');
    av.dom.orn_section = document.getElementById('orn_section');
    av.dom.orn_summary = document.getElementById('orn_summary');
    av.dom.orn_title = document.getElementById('orn_title');
    av.dom.orn_detailsHolder = document.getElementById('orn_detailsHolder');
    av.dom.orn1subSection = document.getElementById('orn1subSection');
    av.dom.showBigTextarea = document.getElementById('showBigTextarea');

    /*
     * Not in use any longer; might use to create new vars
     * 
     av.dom.notType = document.getElementById('notType');
     av.dom.andType = document.getElementById('andType');
     av.dom.oroType = document.getElementById('oroType');
     av.dom.norType = document.getElementById('norType');
     av.dom.equType = document.getElementById('equType'); 
     av.dom.nanType = document.getElementById('nanType');
     av.dom.ornType = document.getElementById('ornType');
     av.dom.antType = document.getElementById('antType');
     av.dom.xorType = document.getElementById('xorType');

     av.dom.notIn = document.getElementById('notIn');
     av.dom.andIn = document.getElementById('andIn');
     av.dom.oroIn = document.getElementById('oroIn');
     av.dom.norIn = document.getElementById('norIn');
     av.dom.equIn = document.getElementById('equIn'); 
     av.dom.nanIn = document.getElementById('nanIn');
     av.dom.ornIn = document.getElementById('ornIn');
     av.dom.antIn = document.getElementById('antIn');
     av.dom.xorIn = document.getElementById('xorIn');

     av.dom.notOut = document.getElementById('notOut');
     av.dom.andOut = document.getElementById('andOut');
     av.dom.oroOut = document.getElementById('oroOut');
     av.dom.norOut = document.getElementById('norOut');
     av.dom.equOut = document.getElementById('equOut'); 
     av.dom.nanOut = document.getElementById('nanOut');
     av.dom.ornOut = document.getElementById('ornOut');
     av.dom.antOut = document.getElementById('antOut');
     av.dom.xorOut = document.getElementById('xorOut');
     */
    av.dom.experimentRadio = document.getElementById('experimentRadio');
    av.dom.demoRadio = document.getElementById('demoRadio');
    av.dom.autoPauseCheck = document.getElementById('autoPauseCheck');
    av.dom.autoPauseNum = document.getElementById('autoPauseNum');
    av.dom.itemDone1st = document.getElementById('itemDone1st');
    av.dom.pausePrefix = document.getElementById('pausePrefix');
    av.dom.pauseMidText = document.getElementById('pauseMidText');
    av.dom.pauseCriteria = document.getElementById('pauseCriteria');
    
    //test dishes setup
    av.dom.environConfigEdit = document.getElementById('environConfigEdit');

    av.dom.sendLogPara1 = document.getElementById('sendLogPara1');
    av.dom.sendLogPara2 = document.getElementById('sendLogPara2');
    av.dom.sendLogScrollBox = document.getElementById('sendLogScrollBox');

    //Organism Page
    av.dom.orgBotId = document.getElementById('orgBotId');
    av.dom.organCanvas = document.getElementById("organCanvas");
    av.dom.orgSettings = document.getElementById('orgSettings');
    av.dom.orgDetailID = document.getElementById('orgDetailID');
    av.dom.orgCycle = document.getElementById('orgCycle');
    av.dom.muteOrgError = document.getElementById('muteOrgError');

    //Analysis Page  
    //av.dom.anlChrtSpace = document.getElementById('anlChrtSpace');  //easier handle for div with chart
    av.dom.anlChrtSpace = document.getElementById('anlDndChart');  //easier handle for div with chart
    av.dom.anlDndChart = document.getElementById('anlDndChart');
    av.dom.anaChrtHolder = document.getElementById('anaChrtHolder');
    av.dom.popDish0 = document.getElementById('popDish0');
    av.dom.popDish1 = document.getElementById('popDish1');
    av.dom.popDish2 = document.getElementById('popDish2');
    av.dom.pop0color = document.getElementById('pop0color');
    av.dom.pop1color = document.getElementById('pop1color');
    av.dom.pop2color = document.getElementById('pop2color');

    //post - send data to database
    av.dom.postLogTextarea = document.getElementById('postLogTextarea');
    av.dom.postLogPara = document.getElementById('postLogPara');
    av.dom.postVersionLabel = document.getElementById('postVersionLabel');
    av.dom.postScreenSize = document.getElementById('postScreenSize');
    av.dom.postUserInfoLabel = document.getElementById('postUserInfoLabel');
    av.dom.postError = document.getElementById('postError');
    av.dom.postProblemError = document.getElementById('postProblemError');
    av.dom.postEmailInput = document.getElementById('postEmailInput');
    av.dom.postEmailLabel = document.getElementById('postEmailLabel');
    av.dom.postNoteLabel = document.getElementById('postNoteLabel');
    av.dom.postComment = document.getElementById('postComment');
    av.dom.postLogTextarea = document.getElementById('postLogTextarea');
    av.dom.postdTailTextarea = document.getElementById('postdTailTextarea');
    av.dom.postStatus = document.getElementById('postStatus');

    av.dom.mainButtons = document.getElementById('mainButtons');
    av.dom.trashDiv = document.getElementById('trashDiv');

    av.dom.orgTopId = document.getElementById('orgTopId');

    av.dom.ExecuteJust = document.getElementById('ExecuteJust');       //check for code repeats might be able to do a function and clean things tiba
    av.dom.ExecuteAbout = document.getElementById('ExecuteAbout');

    av.dom.xorLabel = document.getElementById('xorLabel');          //no longer in use. 

    //av.dom. = document.getElementById('');
    // Modal Dialogs 
    av.dom.newDishModalID = document.getElementById('newDishModalID');
    av.dom.newDishCancel = document.getElementById('newDishCancel');
    av.dom.newDishDiscard = document.getElementById('newDishDiscard');
    av.dom.newDishSaveConfig = document.getElementById('newDishSaveConfig');
    av.dom.newDishSaveWorld = document.getElementById('newDishSaveWorld');
    av.dom.needAncestorModalID = document.getElementById('needAncestorModalID');
    av.dom.needAncestorCancel = document.getElementById('needAncestorCancel');

    //av.dom. = document.getElementById('');
  };
  //av.dom.load();

  av.dom.initilizeDigitData = function () {
    document.getElementById('mnCnPause').disabled = true;
    document.getElementById('mnCnOrganismTrace').disabled = true;
    document.getElementById('mnFzOrganism').disabled = true;
    document.getElementById('mnFzOffspring').disabled = true;
    document.getElementById('mnFzPopulation').disabled = true;
    document.getElementById('mnFzAddFzItem').disabled = true; //tiba need to fix this so freezer button works when I freezer item is highlighted
    //dijit.byId('mnFzAddConfigEx').attr('disabled', true);
    //dijit.byId('mnFzAddGenomeEx').attr('disabled', true);
    //dijit.byId('mnFzAddPopEx').attr('disabled', true);
    //dijit.byId('mnFzAddGenomeView').attr('disabled', true);
    //dijit.byId('mnFzAddPopAnalysis').attr('disabled', true);
  };

  // for analyze page
  av.dom.initilizeAnalizePage = function() {
    //console.log('getDomByID of pop0color=', document.getElementById('pop0color') );
    //console.log('av.dom.pop0color=', av.dom.pop0color);
    //console.log('av.dom.pop0color.value=', av.dom.pop0color.value);
    //console.log('av.color.names=', av.color.names);
    av.anl.color[0] = av.color.names[av.dom.pop0color.value];
    av.anl.color[1] = av.color.names[av.dom.pop1color.value];
    av.anl.color[2] = av.color.names[av.dom.pop2color.value];
    av.anl.yLeftTitle = document.getElementById('yLeftSelect').value;
    av.anl.yRightTitle = document.getElementById('yRightSelect').value;
  };

  //------------------------------------------------------------------------------------- av.ui.toggleComplexityLevel --
  av.ui.toggleComplexityLevel = function(){
    var len = av.sgr.logicNames.length;
    var willbe = 'none';
    
    if ('sgrGlobal' === av.sgr.complexityLevel) {
      willbe = 'inline-block';
      av.sgr.complexityLevel = 'sgrAdvanced';
      //
    } else {
      willbe = 'none';
      av.sgr.complexityLevel = 'sgrGlobal';
    };
    //console.log('willbe=', willbe);  
    av.sgr.complexityChangeProcess('av.ui.toggleComplexityLevel');
  };
  

  //----------------------------------------------------------------------------- av.ui.toggleDisplayGeometryControls --
  //No longer in uses as Geometry and Region Layout are now combined
  av.ui.toggleDisplayGeometryControls = function(){ 
    var len = av.sgr.logicNames.length;
    var willbe = 'none';
    if ('none' === document.getElementById('orn_geometryDiv').style.display) {
      willbe = 'inline-block';
    } else {
      willbe = 'none';
    };
    //console.log('willbe=', willbe);  
    for (ii = 0; ii < len; ii++) {
      tsk = av.sgr.logicNames[ii];
      document.getElementById(tsk+'_geometryDiv').style.display = willbe;
    };
    document.getElementById('geometrySgr').style.display = willbe;
    document.getElementById('allSugarGeometryDiv').style.display = willbe;
  };

//----------------------------------------------------------------------------------- av.ui.toggleDevelopmentDisplays --
// opens items used in development that are not for the user to see. 
av.ui.toggleDevelopmentDisplays = function () {
  var len, tsk, sub;
  var ndx2b = 0;
  var visible2b = ['visible', 'hidden'];
  var block2b = ['inline-block', 'none'];
  var flex2b = ['flex', 'none'];
  var devoTog2b = ['devoShow', 'devoCammo'];
  var geoHideBut2b =['devoShow', 'geoButtonCammo'];
  var popInfoTab2b = ['tabHolderShow', 'tabHolderHide'];
  var sgrfooter2b = ['changeAllSugarsTogetherContainer', 'changeAllSugarsTogetherNoGlobalContainer'];

  console.log('av.dom.mnDebug.style.visibility=', av.dom.mnDebug.style.visibility);
  if ('devoShow' === document.getElementById('developmentToggle').className) {
    ndx2b = 1;
    //hide all development elements
    av.ui.hideDevelopment = true;
    av.sgr.processHideFlags(av.sgr.hideFlagInit, 'av.ui.toggleDevelopmentDisplays');
    av.post.addUser('Button: mnHpDebug: now hidden; InitlizeDomReadyItems.js');
    //-------------------------------------------------------------------------------- hide stuff --
  } else {
    // development sectiomn can be seen.
    av.ui.hideDevelopment = false;
    av.sgr.processHideFlags(av.sgr.flagInitOpposite, 'av.ui.toggleDevelopmentDisplays.onclick_show');
    av.post.addUser('Button: mnHpDebug: now visible');
  }  // end of development section can be seen 
  //------------------------------------------------------------------------------------ process changes using ndx2b--

  len = document.getElementsByClassName('3TopLftRit').length;
  for (ii = 0; ii < len; ii++) {
    document.getElementsByClassName('3TopLftRit')[ii].style.display = block2b[ndx2b];
    document.getElementsByClassName('4Quarters')[ii].style.display = block2b[ndx2b];
  }

  if (av.sgr.gridOnly) {
    document.getElementById('sugarFooter').className = sgrfooter2b[ndx2b];
    document.getElementById('geometrySgr').style.display = block2b[ndx2b];
    document.getElementById('allSugarGeometryDiv').style.display = block2b[ndx2b];
    document.getElementById('allSugarGeometry').style.display = block2b[ndx2b]; 
  }

  document.getElementById('testConfig').style.display = block2b[ndx2b];
  console.log('block2b[ndx2b]', block2b[ndx2b]);
  document.getElementById('avidianOutline').style.display = block2b[ndx2b];   //none
  document.getElementById('resrceDataHolder').style.display = block2b[ndx2b];

  document.getElementById('developmentToggle').className = devoTog2b[ndx2b];
  document.getElementById('geometyHideButton').className = geoHideBut2b[ndx2b];
  document.getElementById('popInfoTabHolder').className = popInfoTab2b[ndx2b];

  av.dom.mnDebug.style.visibility = visible2b[ndx2b];
  document.getElementById('testConfigLableHolder').style.display = flex2b[ndx2b];   //none

  document.getElementById('showTextDebugButtonDiv').style.visibility = visible2b[ndx2b];   //hidden
  av.dom.showTextDebugButton.style.visibility = visible2b[ndx2b]
  document.getElementById('fzTdishSec').style.visibility = visible2b[ndx2b];       // hidden
  document.getElementById('testDishDetailDiv').style.display = block2b[ndx2b];   //none
  document.getElementById('testConfig').style.display = block2b[ndx2b];    //none

  len = av.sgr.logicNames.length;
  sub = 1;   //this may change later;
  for (ii = 0; ii < len; ii++) {
    tsk = av.sgr.logicNames[ii];
    av.sgr.changeDetailsLayout(tsk, 'av.ui.toggleDevelopmentDisplays');
  };

  //console.log('in av.ui.hideDevelopment=', av.ui.hideDevelopment, 'at end of function');
  };
//----------------------------------------------------------------------------------- av.ui.toggleDevelopmentDisplays --

  
  av.ui.toggleDebugMenu =function () {
    //console.log('in av.ui.toggleDebugMenu: av.dom.mnDebug.style.visibility=', av.dom.mnDebug.style.visibility);
    if ('visible' === av.dom.mnDebug.style.visibility) {
      av.dom.mnDebug.style.visibility = 'hidden';
    }
    else 
      av.dom.mnDebug.style.visibility = 'visible';
  };
  
  // if (av.dbg.flg.root) { console.log('Root: before av.ui.toggleResourceData'); }
  //----------------------------------------------------------------------------------------------------------------------
  //toggles showing resource data in right info panel (Stats window) in Populaton View
  av.ui.toggleResourceData = function (from) {
    console.log(from, 'called av.ui.toggleResourceData to to toggle dipslay of resource data');
    if ('none' === document.getElementById('resrceDataHolder').style.display) {
      document.getElementById('resrceDataHolder').style.display = 'block';
    } else {
      document.getElementById('resrceDataHolder').style.display = 'none';  //flex
    };
    av.sgr.complexityChangeProcess('last-things-done');
  };

  // if (av.dbg.flg.root) { console.log('Root: before av.ui.toggleResourceComplexity'); }
  //----------------------------------------------------------------------------------------------------------------------
  //toggles showing resource data in right info panel (Stats window) in Populaton View
  av.ui.toggleResourceComplexity = function (from) {
    console.log(from, 'called av.ui.toggleResourceComplexity to to toggle dipslay of complexityLevel');
    if ('sgrBasic' === av.sgr.complexityLevel) {
      av.sgr.complexityLevel = 'sgrAdvanced';
    } else {
        av.sgr.complexityLevel = 'sgrBasic';
    }
    av.ui.setResourceComplexity(av.sgr.complexityLevel, 'av.ui.toggleResourceComplexity');
  };
  
av.ui.setResourceComplexity = function (level, from) {
  document.getElementById('resrcComplexity').value = level;
  av.sgr.complexityChangeProcess('av.ui.setResourceComplexity');
};

//=========================================================================================== simulated dom action ===
// https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript?fbclid=IwAR0Ht17-ZP6Rb6paHLZUFoLPf_Hz0-WXRTv-dKS3SsZsymY8TsM7OJYinmQ
// 
// example call of av.dom.simulate
// av.dom.simulate(document.getElementById(defaultConfigDomID), "click");
//
// Note that as a third parameter you can pass in 'options'. The options you don't specify are taken from the 
// defaultOptions (see bottom of the script). So if you for example want to specify mouse coordinates you can do something like:
// simulate(document.getElementById("btn"), "click", { pointerX: 123, pointerY: 321 })

av.dom.simulate = function (element, eventName) {
    console.log('element', element, '; eventName=', eventName);
    var options = av.dom.simulateExtend(av.dom.simulateDefaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in av.dom.simulateEventMatchers)
    {
        if (av.dom.simulateEventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
        console.log('after dispatchEvent; oEvent=', oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = av.dom.simulateExtend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
        console.log('after fire; evt=', evt);
    }
    return element;
};

  av.dom.simulateExtend = function(destination, source) {
      for (var property in source)
        destination[property] = source[property];
      return destination;
  };

  av.dom.simulateEventMatchers = {
      'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
      'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
  };
  av.dom.simulateDefaultOptions = {
      pointerX: 0,
      pointerY: 0,
      button: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true
  };
  //======================================================================================= end simulated dom action ===

// Code below is not in use

  // if (av.dbg.flg.root) { console.log('Root: before av.ui.antLabel'); }
  //----------------------------------------------------------------------------------------------------------------------
  //Forces popChartInit  not in use 2021_801
/*  av.ui.antLabel = function (from) {
    console.log(from, 'called av.ui.antLabel to run av.grd.popChartInit'); 
    
    console.log('ht: popChrtHolder, popChart, popChartDiv', $('#popChrtHolder').outerHeight(true), $('#popChartDiv').outerHeight(true), $('#popChart').outerHeight(true) );
    var htnum = Number($('#popChrtHolder').outerHeight(true))-1;
    av.dom.popChart.style.maxheight = htnum +'px;';
    console.log('ht: popChrtHolder, popChart, popChartDiv', $('#popChrtHolder').outerHeight(true), $('#popChartDiv').outerHeight(true), $('#popChart').outerHeight(true) );
    av.grd.popChartInit('av.ui.antLabel');
    console.log('ht: popChrtHolder, popChart, popChartDiv', $('#popChrtHolder').outerHeight(true), $('#popChartDiv').outerHeight(true), $('#popChart').outerHeight(true) );
  };
*/  



//----------------------------------------------------------------------------------------------------------------------
// Notes
//----------------------------------------------------------------------------------------------------------------------
// logicaly this should be in reSizePageParts, 
// but putting the info here makes it easy to reference when writing in reSizePageParts.js
//---------------------------------------------------------------------------------- notes on different types of size --
//
// div objects have size with width (x) and height (y) directions. 
// there are several size modifies and trying to figure out which is which can be confusing. 

// dom box model and size info   
// https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
// There is a nested set of boxes with every div
// margin
//   border
//     padding
//       box (with actual content or guts
// the size of stuff around the box gets added twice, once for each side
// 
// dom.name.offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
// dom.name.clientWidth = box + 2*padding - scrollbar_width    
// dom.name.scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
// cssWidth = box only nothing else
// dom.name.width
// 
// https://www.w3schools.com/jquery/css_width.asp
// https://www.w3schools.com/jquery/jquery_dimensions.asp
// 
// $('#name').innerWidth()
//    where name is from the id='name'   of the dom objecte in the html
//  .height() - returns the height of element excludes padding, border and margin.
//  .innerHeight() - returns the height of element includes padding but excludes border and margin.
//  .outerHeight() - returns the height of the div including border but excludes margin.
//  .outerHeight(true) - returns the height of the div including margin.
// 
// The difference between .css( "height" ) and .height() is that the former returns a value with units intact (for example, 400px).
// while the latter returns a unit-less pixel value (for example, 400)
// https://api.jquery.com/height/
//   
// var av.dom.name = $("#name"); // variable is longer than $ version so no real need to use
//  
// scrollbarWidth = offsetWidth - clientWidth - getComputedStyle().borderLeftWidth - getComputedStyle().borderRightWidth
//  
//
// get css values
//     //https://stackoverflow.com/questions/590602/padding-or-margin-value-in-pixels-as-integer-using-jquery
//     //https://stackoverflow.com/questions/9592575/get-height-of-div-with-no-height-set-in-css
//     
// an example: the 10 at the end is to say base 10 rather than octal.
//     console.log('av.dom.popChart.ht offset, client ht=', av.dom.popChart.offsetHeight, 
//       av.dom.popChart.clientHeight, '; parseInt(padding)=', parseInt($("#popChart").css('padding'),10));

// 


// should this move to an init page ui function?
//get size of screen availbe for Avida-ED; used to keep on screen and get rid of scroll bars
//http://ryanve.com/lab/dimensions/
//https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
//https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
//window.screen.availWidth
//window.innerWidth    or    window.outerWidth
//console.log('documentElement Ht, scroll client', document.documentElement.scrollHeight, 
//  document.documentElement.clientHeight);
//if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
//  document.documentElement.style.height = document.documentElement.clientHeight + 'px';
//}
//
// Targeting common screen sizes   https://www.websitedimensions.com/

// looks like tool-tip
// https://www.w3schools.com/howto/howto_js_popup.asp
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup

//
// jQurey resize() Method
// https://www.w3schools.com/jquery/event_resize.asp
//
// html reize element: 
// https://codepen.io/sol0mka/pen/FnizC
// 
// Position relative to ancestor:
// https://www.w3schools.com/cssref/pr_pos_right.asp
//
// Document Ready Examples
// https://www.sitepoint.com/types-document-ready/
// 
// Forcing windows resize to fire
// https://stackoverflow.com/questions/1861109/forcing-windows-resize-to-fire
// https://stackoverflow.com/questions/23567483/jquery-fake-a-window-resize
// https://stackoverflow.com/questions/277759/html-onresizeend-event-or-equivalent-way-to-detect-end-of-resize
// https://stackoverflow.com/questions/2996431/detect-when-a-window-is-resized-using-javascript
// https://stackoverflow.com/questions/14504079/jquery-trigger-function-above-a-certain-window-width



//  cursor shapes:
// use: col-resize   for changing the width between divs
// use: row-resize   for changing the height between divs
// https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
// https://www.w3schools.com/css/tryit.asp?filename=trycss_cursor
