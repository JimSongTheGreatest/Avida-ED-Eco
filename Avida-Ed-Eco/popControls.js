  // *********************************************************************************************************************
  //                                       Population page script
  // *********************************************************************************************************************
  // ptd = PeTri Dish
  var av = av || {};  //incase av already exists

  // if (av.dbg.flg.root) { console.log('Root: before av.ptd.makePauseState'); }
    av.ptd.makePauseState = function () {
    document.getElementById('mnCnPause').disabled = true;
    document.getElementById('mnCnRun').disabled = false;
    document.getElementById('mnCnOne').disabled = false;
    av.dom.runStopButton.textContent = 'Run';
    av.dom.oneUpdateButton.disabled = false;
  };

  //change what buttons work in the user interface to be consistent with avida running on the population page.
  //probably should not be called until after program is sure that it is valid to start running, but it works this way
  //might change someday.
  av.ptd.makeRunState = function (from) {
    av.dom.runStopButton.textContent = 'Pause';
    document.getElementById('mnCnPause').disabled = false;
    document.getElementById('mnCnRun').disabled = true;
    document.getElementById('mnCnOne').disabled = true;
    av.dom.oneUpdateButton.disabled = true;
  };

  av.ptd.popWorldStateUi = function (from) {
    'use strict';
    console.log(from, 'called av.ptd.popWorldStateUi');
    av.grd.runState = 'world';
    //Disable some of the options on the Setup page
    av.dom.sizeCols.disabled = true;
    av.dom.sizeRows.disabled = true;
    //av.dom.experimentRadio.disabled = true;
    //av.dom.demoRadio.disabled = true;
    //there will be a population so it can now be frozen.
    document.getElementById('mnFzPopulation').disabled = false;
  };

  av.ptd.popTdishStateUi = function (from) {
    'use strict';
    console.log(from, 'called av.ptd.popTdishStateUi');
    av.grd.runState = 'tDish';
    //Disable normal Setup page and setup testDish setup Page   
    av.dom.sizeCols.disabled = true;
    av.dom.sizeRows.disabled = true;
    //av.dom.experimentRadio.disabled = true;
    //av.dom.demoRadio.disabled = true;
    //there will be a population so it can now be frozen.
    document.getElementById('mnFzPopulation').disabled = false;
  };


  //---------------------------------------------------------------------------------------- av.ptd.popRunningStateUi --
  av.ptd.popRunningStateUi = function () {
    'use strict';
    av.grd.runState = 'started';  //the run has now started
    //Disable some of the options on the Setup page
    
    $('#mutePopSlide').slider({disabled: true});  //http://stackoverflow.com/questions/970358/jquery-readonly-slider-how-to-do
    av.dom.sizeCols.disabled = true;
    av.dom.sizeRows.disabled = true;

    av.dom.mutePopInput.disabled= true;

    av.dom.childParentRadio.disabled = true;
    av.dom.childRandomRadio.disabled = true;
    
    var tsk='neq';
    var len = av.sgr.logicNames.length;
    for (var ndx=0; ndx<len; ndx++) {
      tsk = av.sgr.logicNames[ndx];
      document.getElementById(tsk+'_geometry').disabled = true;
      document.getElementById(tsk+'_regionLayout').disabled = true;
      document.getElementById(tsk+'_supplyTypeSlct').disabled = true;
      document.getElementById(tsk+'WsupplyTypeSlct').disabled = true;
      document.getElementById(tsk+'_periodcheckboxHolder').disabled = true;
      document.getElementById(tsk+'_periodTimeHolder').disabled = true;
      document.getElementById(tsk+'_initialHiNp').disabled = true;
      for (var sub=0; sub<av.nut.numRegionsinHTML; sub++) {
        document.getElementById(tsk+sub+'supplyTypeSlct').disabled = true;
        //console.log('html:', tsk+sub+'supplyModifierSelect');
        document.getElementById(tsk+sub+'supplyModifierSelect').disabled = true;
        document.getElementById(tsk+sub+'periodNp').disabled = true;
        document.getElementById(tsk+sub+'hiSide').disabled = true;
        document.getElementById(tsk+sub+'initialHiNp').disabled = true;
        document.getElementById(tsk+sub+'initialLoNp').disabled = true;
        document.getElementById(tsk+sub+'inflowHiNp').disabled = true;
        document.getElementById(tsk+sub+'inflowLoNp').disabled = true;
        document.getElementById(tsk+sub+'outflowHiNp').disabled = true;
        document.getElementById(tsk+sub+'outflowLoNp').disabled = true;
      };
    };
    document.getElementById('allsugarsupplyTypeSlct').disabled = true;
    document.getElementById('allSugarRegionLayout').disabled = true;
    document.getElementById('allSugarModifier').disabled = true;
    document.getElementById('allSugarDetails').disabled = true;

    av.dom.experimentRadio.disabled = true;
    av.dom.demoRadio.disabled = true;

    //there will be a population so it can now be frozen.
    document.getElementById('mnFzPopulation').disabled = false;
  };
  //------------------------------------------------------------------------------------ end av.ptd.popRunningStateUi --
  
  //------------------------------------------------------------------------------------------ av.ptd.popNewExStateFn --
  
  av.ptd.popNewExStateFn = function (from) {
    'use strict';
    console.log(from, 'called av.ptd.popNewExStateFn: actConfig was', av.fzr.actConfig.name);
    
    // a way to keep the same active configuration
    // if (av.fzr.actConfig.name != '@default') {
    //   console.log('av.fzr.actConfig.name =', av.fzr.actConfig.name);
    //   av.dnd.loadConfigByNameFn(av.fzr.actConfig.name, 'av.ptd.popNewExStateFn');
    //   return;
    // }
    
    av.dnd.loadDefaultConfigFn('av.ptd.popNewExStateFn'); 
    
    //set configuation to default
    var fname = '@default';

    var domId = Object.keys(av.dnd.containerMap['#activeConfig'])[0];
    av.fzr.actConfig.actDomid = domId;
    av.fzr.actConfig.name = fname;
    av.fzr.actConfig.type = 'c';
    av.fzr.actConfig.actDomid = 'dom_c0';
    av.fzr.actConfig.dir = 'c0';

    // clear parents
    av.dom.sizeCols.disabled = false;
    av.dom.sizeRows.disabled = false;
    av.dom.mutePopInput.disabled = false;
    $('#mutePopSlide').slider({disabled: false});  //http://stackoverflow.com/questions/970358/jquery-readonly-slider-how-to-do
    av.dom.childParentRadio.disabled = false;
    av.dom.childRandomRadio.disabled = false;
    console.log('Avida-ED4: need to reset defaults on new Environmental seettings.');

    av.dom.experimentRadio.disabled = false;
    av.dom.demoRadio.disabled = false;

    var tsk='neq';
    var len = av.sgr.logicNames.length;
    for (var ndx=0; ndx<len; ndx++) {
      tsk = av.sgr.logicNames[ndx];
      document.getElementById(tsk+'_geometry').disabled = false;
      document.getElementById(tsk+'_regionLayout').disabled = false;
      document.getElementById(tsk+'_supplyTypeSlct').disabled = false;
      document.getElementById(tsk+'WsupplyTypeSlct').disabled = false;
      document.getElementById(tsk+'_periodcheckboxHolder').disabled = false;
      document.getElementById(tsk+'_periodTimeHolder').disabled = false;
      document.getElementById(tsk+'_initialHiNp').disabled = false;
      //clear the resource series graphs
      av.pch.resrcGlobal[tsk] = [];
      for (var sub=1; sub<av.nut.numRegionsinHTML; sub++) {
        document.getElementById(tsk+sub+'supplyTypeSlct').disabled = false;
        document.getElementById(tsk+sub+'supplyModifierSelect').disabled = false;
        document.getElementById(tsk+sub+'periodNp').disabled = false;
        document.getElementById(tsk+sub+'hiSide').disabled = false;
        document.getElementById(tsk+sub+'initialHiNp').disabled = false;
        document.getElementById(tsk+sub+'initialLoNp').disabled = false;
        document.getElementById(tsk+sub+'inflowHiNp').disabled = false;
        document.getElementById(tsk+sub+'inflowLoNp').disabled = false;
        document.getElementById(tsk+sub+'outflowHiNp').disabled = false;
        document.getElementById(tsk+sub+'outflowLoNp').disabled = false;
      };
    };

    var tsk='neq';
    var len = av.sgr.logicNames.length;
    for (var ndx=0; ndx<len; ndx++) {
      tsk = av.sgr.logicNames[ndx];
      document.getElementById(tsk+'_geometry').disabled = false;
      document.getElementById(tsk+'_regionLayout').disabled = false;
      document.getElementById(tsk+'_supplyTypeSlct').disabled = false;
      document.getElementById(tsk+'WsupplyTypeSlct').disabled = false;
      document.getElementById(tsk+'_periodcheckboxHolder').disabled = false;
      document.getElementById(tsk+'_periodTimeHolder').disabled = false;
      document.getElementById(tsk+'_initialHiNp').disabled = false;
      //clear the resource series graphs
      av.pch.resrcGlobal[tsk] = [];
      for (var sub=0; sub<av.nut.numRegionsinHTML; sub++) {
        document.getElementById(tsk+sub+'supplyTypeSlct').disabled = false;
        document.getElementById(tsk+sub+'supplyModifierSelect').disabled = false;
        document.getElementById(tsk+sub+'periodNp').disabled = false;
        document.getElementById(tsk+sub+'hiSide').disabled = false;
        document.getElementById(tsk+sub+'initialHiNp').disabled = false;
        document.getElementById(tsk+sub+'initialLoNp').disabled = false;
        document.getElementById(tsk+sub+'inflowHiNp').disabled = false;
        document.getElementById(tsk+sub+'inflowLoNp').disabled = false;
        document.getElementById(tsk+sub+'outflowHiNp').disabled = false;
        document.getElementById(tsk+sub+'outflowLoNp').disabled = false;
      };
    };
    //document.getElementById('allSugarGeometry').disabled = false;
    document.getElementById('allsugarsupplyTypeSlct').disabled = false;
    document.getElementById('allSugarRegionLayout').disabled = false;
    document.getElementById('allSugarModifier').disabled = false;
    document.getElementById('allSugarDetails').disabled = false;
    console.log('environment settings should now be enabled ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');


    //reset Ancestor Color stack
    //av.parents.Colors = av.color.parentColorList.slice();   //delete this later
    av.parents.Colors.reverse();
    //set run/stop and drop down menu to the 'stopped' state
    document.getElementById('mnCnPause').disabled = true;
    document.getElementById('mnCnRun').disabled = false;
    av.dom.runStopButton.innerHTML = 'Run';
    //console.log('pauseState; button=run in av.ptd.popNewExStateFn');

    //clear the time series graphs
    av.pch.aveFit = [];
    av.pch.logFit = [];
    av.pch.aveCst = [];
    av.pch.logCst = [];
    av.pch.aveEar = [];
    av.pch.logEar = [];
    av.pch.aveNum = [];
    av.pch.logNum = [];

    TimeLabel.textContent = 0;

    var dir = av.fzr.actConfig.dir;
    var fileStr = av.fzr.file[dir + '/avida.cfg'];
    av.frd.avidaCFG2form(fileStr, 'av.ptd.popNewExStateFn'); 

    av.dnd.empty(av.dnd.ancestorBox);
    av.dnd.empty(av.dnd.ancestorBoTest);

    //Update data for Selected Organism Type
    av.dom.sotColorBox.style.backgroundColor = '#D7D7D7';
    av.dom.sotColorBox.style.border = '2px solid ' + '#D7D7D7';
    nameLabel.textContent = '';
    fitLabel.innerHTML = '';
    energyAcqRateLabel.textContent = '';
    offspringCostLabel.textContent = '';
    ageLabel.textContent = '';
    ancestorLabel.textContent = '';
    viableLabel.textContent = '';
    notLabel.textContent = 'NOT';
    nanLabel.textContent = 'NAN';
    andLabel.textContent = 'AND';
    ornLabel.textContent = 'ORN';
    oroLabel.textContent = 'ORO';
    antLabel.textContent = 'ANT';
    norLabel.textContent = 'NOR';
    xorLabel.textContent = 'XOR';
    equLabel.textContent = 'EQU';
    notTime.textContent = '0';
    nanTime.textContent = '0';
    andTime.textContent = '0';
    ornTime.textContent = '0';
    oroTime.textContent = '0';
    antTime.textContent = '0';
    norTime.textContent = '0';
    xorTime.textContent = '0';
    equTime.textContent = '0';

    //Population Statistics
    popSizeLabel.textContent = '';
    aFitLabel.textContent = '';
    aEnergyAcqRateLabel.textContent = '';
    aOffspringCostLabel.textContent = '';
    aAgeLabel.textContent = '';
    parentNumLabel.textContent = '';
    viableNumLabel.textContent = '';
    notPop.textContent = '';
    nanPop.textContent = '';
    andPop.textContent = '';
    ornPop.textContent = '';
    oroPop.textContent = '';
    antPop.textContent = '';
    norPop.textContent = '';
    xorPop.textContent = '';
    equPop.textContent = '';

    numLog.textContent = '';
    logTit0.textContent = '';
    logTit1.textContent = '';
    logTit2.textContent = '';
    logTit3.textContent = '';
    logTit4.textContent = '';
    logTit5.textContent = '';
    logTit6.textContent = '';
    logTit7.textContent = '';
    av.grd.flagSelected = false;
    document.getElementById('mnCnOrganismTrace').disabled = true;
    document.getElementById('mnFzOrganism').disabled = true;
  };

  //after Run button pushed for population
  av.ptd.runPopFn = function (from) {
    'use strict';
    if (av.debug.popCon) { console.log('popCon:', from, 'called av.ptd.runPopFn: runPopFn runState =', av.grd.runState); }
    console.log(from, 'called av.ptd.runPopFn: runPopFn runState =', av.grd.runState);
    //check for ancestor organism in configuration data
    var namelist;
    // used only for testing new dish configurations don't work in the current computer interface
    if ('test' == av.msg.setupType)
      namelist = $.map(document.querySelector('#ancestorBoTest').children, (x) => {return x.innerHTML.trim()});
    // normal end user version
    else
      //get a list of names of organisms that are in the starting population. 
      //works for both configured dishes and populated dishes
      namelist = $.map(document.querySelector('#ancestorBox').children, (x) => {return x.innerHTML.trim()});
  
    if (namelist.length < 1) {
      //console.log('about to call av.ptd.makePauseState()');
      // tiba: fix so 'av.ptd.makeRunState' is not called till after tests are done and remove the extra calls to makePauseState
      av.ptd.makePauseState();
      //NeedAncestorDialog.show();
      av.dom.needAncestorModalID.style.display = 'block';
    }
    else if (!av.ptd.validGridSize) {
      console.log('not option: !av.ptd.validGridSize=', !av.ptd.validGridSize);
      // tiba: fix so 'av.ptd.makeRunState' is not called till after tests are done and remove the extra calls to makePauseState
      av.ptd.makePauseState();
      av.dom.userMsgLabel.innerHTML = 'A valid grid size is required before Avida will run';
      if ('populationBlock' !== av.ui.page) av.ui.mainBoxSwap('populationBlock');
    }
    else if (!av.ptd.validMuteInuput) {
      console.log('Not option: av.ptd.validMuteInuput=',av.ptd.validMuteInuput);
      // tiba: fix so 'av.ptd.makeRunState' is not called till after tests are done and remove the extra calls to makePauseState
      av.ptd.makePauseState();
      av.dom.userMsgLabel.innerHTML = 'A valid mutation rate is required before Avida will run';
      if ('populationBlock' !== av.ui.page) av.ui.mainBoxSwap('populationBlock');
    }
    else { // setup for a new run by sending config data to avida
      if (av.debug.popCon) console.log('else: av.ptd.validMuteInuput=',av.ptd.validMuteInuput);
      av.dom.userMsgLabel.innerHTML = '';
      // tiba: eventually put the 'av.ptd.makeRunState' here.

      if ('started' !== av.grd.runState) {
        if ('test' == av.msg.setupType) { 
          console.log('test files just allow edits directly to the environment file so rest of form is ignored');
          //get original files. 
          av.fwt.testForm2folder();
        }
        // 
        else {
          //collect setup data to send to avida in a normal run.  
          //Order matters. Files must be created first. Then files must be sent before some other stuff.
          av.fwt.form2cfgFolder();  //creates avida.cfg and environment.cfg and ancestor.txt and ancestors_manual.txt from form
        };
        if ('prepping' === av.grd.runState) {
           av.msg.importConfigExpr('av.ptd.runPopFn ln301');   // send importExpr message to avida
          //console.log('after calling av.msg.importConfigExpr');
          //used for configured dish
          av.msg.injectAncestors('config');
        }
        else {
          av.msg.importWorldExpr();
          //console.log('parents.injected = av.parents.injected);
          //av.debug.log += '\nstart importWorld running-----------------------------------------\n'
          av.msg.injectAncestors('world');
        }

        //change ui parameters for the correct state when the avida population has started running
        av.ptd.popRunningStateUi();  //av.grd.runState now == 'started'

        av.msg.requestGridData();
        av.msg.requestPopStats();
        if (0 < av.grd.selectedNdx) av.msg.doWebOrgDataByCell();

        //initialize arrays to store data by_clade (or can be called by_ancestor)
        av.pch.numDads = (av.pch.dadMax < av.parents.name.length) ? av.pch.dadMax : av.parents.name.length;
        for (var ii = 0; ii < av.pch.numDads; ii++) {
          av.pch.dadFit[av.parents.name[ii]] = [];
          av.pch.dadCst[av.parents.name[ii]] = [];
          av.pch.dadEar[av.parents.name[ii]] = [];
          av.pch.dadNum[av.parents.name[ii]] = [];
          av.pch.dadVia[av.parents.name[ii]] = [];
        }
        //console.log('numver of ancestors =',av.pch.numDads, '; av.pch.dadFit=',av.pch.dadFit);
      }; // end if section to deal with starting a new run

      if (av.dom.autoPauseCheck.checked) {
        av.ui.autoStopFlag = true;                          // switching to using check box directly
        av.ui.autoStopValue = av.dom.autoPauseNum.value;    // swithcing to using dom value
        //console.log('stop at  = av.dom.autoPauseNum.value;
      };
      //console.log('before call av.ptd.makeRunState');
      av.ptd.makeRunState('av.ptd.runPopFn 338');
      //console.log('after call av.ptd.makeRunState');
      av.msg.stepUpdate();   //av.msg.doRunPause(av.fio);
      //console.log('after av.msg.stepUpdate');
    }
    if (av.debug.popCon) console.log('end of av.ptd.runPopFn 331');
    //update screen based on data from C++
  };
  //-------------------------------------------------------------------------------------- end av.ptd.popNewExStateFn --

  //------------------------------------------------------------------------------------------------ av.ptd.runStopFn --
  av.ptd.runStopFn = function () {
    if ('Run' == av.dom.runStopButton.innerHTML) {
      av.ptd.makeRunState('av.ptd.runStopFn');
      av.ptd.runPopFn('av.ptd.runStopFn');
    } else {
      //console.log('about to call av.ptd.makePauseState()');
      //av.debug.log += 'about to call av.ptd.makePauseState() in AvidaEd.js line 772 \n';
      av.ptd.makePauseState();
      //av.msg.doRunPause(av.fio);
      //console.log('pop size  = av.pch.aveNum);
    }
  };
  //-------------------------------------------------------------------------------------------- end av.ptd.runStopFn --

  //--------------------------------------------------------------------------------------------------------------------
  // Freezer Button functions
  //--------------------------------------------------------------------------------------------------------------------

  //Freeze the selected organism
  av.ptd.FrOrganismFn = function (trigger) {
    'use strict';
    var fzName = 'new';
    var parentName = '';
    var gene;
    var container = av.dnd.fzOrgan.id !== undefined ? "#" + av.dnd.fzOrgan.id : "." + av.dnd.fzOrgan.className;
    if ('selected' == trigger) {
      fzName = prompt('Please name the selected organism', av.grd.kidName);
      gene = av.grd.kidGenome;
    }
    else if ('offspring' == trigger) {
      //get name from parent
      parentName = av.dnd.activeOrgan.textContent.trim(); 
      fzName = prompt('Please name the offspring', parentName + '_offspring');
      gene = '0,heads_default,' + av.ind.dna[1];
    }
    else {
      fzName = prompt('Please name the organism', 'newOrganism');
      //console.log('source unknwon', trigger);
    }
    fzName = av.dnd.getUniqueFzrName(av.dnd.fzOrgan, fzName);
    if (null != fzName) {
      //insert new item into the freezer.
      var type = 'g'
      var domid = `dom_${type}${av.fzr.gNum}`
      $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${fzName} </div>`)
      av.dnd.containerMap[container][domid] = {"name": fzName, "type": type};
      av.fzr.dir[domid] = 'g' + av.fzr.gNum;
      av.fzr.domid['g' + av.fzr.gNum] = domid;
      av.fzr.file['g' + av.fzr.gNum + '/genome.seq'] = gene;
      av.fzr.file['g' + av.fzr.gNum + '/entryname.txt'] = fzName;
      av.fzr.gNum++;
      console.log(av.fzr);
      av.dnd.contextMenu(av.dnd.fzWorld, domid, 'av.ptd.FrOrganismFn');
      av.fzr.saveUpdateState('no');
    }
  };

  //get a name for the new config file for the freezer
  av.ptd.FrConfigFn = function (from) {
    'use strict';
    console.log(from, ' called av.ptd.FrConfigFn');
    var sName = av.dnd.namefzrItem(av.dnd.fzConfig, 'newConfig');
    var fzName = prompt('Please name the new configuration', sName);
    var container = av.dnd.fzConfig.id !== undefined ? "#" + av.dnd.fzConfig.id : "." + av.dnd.fzConfig.className;
    if (fzName) {
      fzName = av.dnd.getUniqueFzrName(av.dnd.fzConfig, fzName);
      if (null != fzName) {
        var type = 'c'
        var domid = `dom_${type}${av.fzr.cNum}`
        $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-dish-icon.png' class='DishIcon'> ${fzName} </div>`)
        av.dnd.containerMap[container][domid] = {"name": fzName, "type": type};
        av.fzr.dir[domid] = 'c'+ av.fzr.cNum;
        av.fzr.domid['c'+ av.fzr.cNum] = domid;
        av.fzr.file[av.fzr.dir[domid]+'/entryname.txt'] = fzName;
        av.fwt.makeFzrConfig(av.fzr.cNum, 'av.ptd.FrConfigFn');
        av.fzr.cNum++;
        //Create context menu for right-click on this item
        av.dnd.contextMenu(av.dnd.fzConfig, domid, 'av.ptd.FrConfigFn');
        av.fzr.saveUpdateState('no');
      }
    }
  };

  //Save a populated dish
  av.ptd.FrPopulationFn = function () {
    'use strict';
    av.msg.exportExpr('w' + av.fzr.wNum);
    av.msg.sendData();
    var popName = av.fzr.actConfig.name + '@' + av.grd.popStatsMsg.update.formatNum(0);  // need update here star
    var fzName = prompt('Please name the new population', popName);
    var container = av.dnd.fzWorld.id !== undefined ? "#" + av.dnd.fzWorld.id : "." + av.dnd.fzWorld.className;
    if (fzName) {
      fzName = av.dnd.getUniqueFzrName(av.dnd.fzWorld, fzName);
      if (null != fzName) {
        var type = 'w'
        var domid = `dom_${type}${av.fzr.wNum}`
        $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-dish-icon.png' class='DishIcon'> ${fzName} </div>`)
        av.dnd.containerMap[container][domid] = {"name": fzName, "type": type};
        av.fzr.dir[domid] = 'w'+ av.fzr.wNum;
        av.fzr.domid['w'+ av.fzr.wNum] = domid;
        av.fzr.file[av.fzr.dir[domid]+'/entryname.txt'] = fzName;
        av.fwt.makeFzrWorld(av.fzr.wNum, 'av.ptd.FrPopulationFn');
        av.fzr.wNum++;
        //Create context menu for right-click on this item
        av.dnd.contextMenu(av.dnd.fzWorld, domid, 'av.ptd.FrPopulationFn');
        av.fzr.saveUpdateState('no');
      }
    }
  };

  av.pch.processLogic = function() {
    "use strict";
    //console.log('In av.pch.processLogic: av.pch.fnBinary = ', av.pch.fnBinary);
    if ( (null !== av.pch.fnBinary) && (undefined !== av.pch.fnBinary) ) {
      for (var ii = 0; ii<9; ii++) {
        //console.log('substring = ', av.pch.fnBinary.substring(ii,ii+1));
        //console.log('ii = ', ii, '; buton=', av.ptd.logicButtons[ii]);
        if ('1' == av.pch.fnBinary.substring(ii, ii + 1)) {
          av.pch.bitTurnOn(av.ptd.logicButtons[ii]);
        }
      }
    }
  };

  av.pch.bitTurnOn = function(button) {
    "use strict";
    document.getElementById(button).value = 'on';
    document.getElementById(button).className = 'bitButtonOn';
    av.post.addUser('Button: ' + button + ' = on');
    av.grd.fnChosen[button] = true;

    av.grd.selFnText = '';
    av.grd.selFnBinary = '';
    for (var ii=0; ii<9; ii++) {
      if (av.grd.fnChosen[av.ptd.logicButtons[ii]]) {
        av.grd.selFnText += av.sgr.logicNames[ii] + '.';
        av.grd.selFnBinary += '1';
      }
      else av.grd.selFnBinary +='0';
    }
    if (3 > av.grd.selFnText.length) {av.grd.selFnText = 'none';}
    //console.log('av.grd.fnChosen = ', av.grd.fnChosen);
    //console.log('av.grd.selFnText =', av.grd.selFnText);
    //console.log('av.grd.selFnBinary =',av.grd.selFnBinary);
  };

  av.ptd.bitToggle = function (button) {
    'use strict';
    if ('on' == document.getElementById(button).value) {
      document.getElementById(button).value = 'off';
      document.getElementById(button).className = 'bitButtonOff';
      av.post.addUser('Button: ' + button + ' = off');
      av.grd.fnChosen[button] = false;
    }
    else {
      document.getElementById(button).value = 'on';
      document.getElementById(button).className = 'bitButtonOn';
      av.post.addUser('Button: ' + button + ' = on');
      av.grd.fnChosen[button] = true;
    }

    av.grd.selFnText = '';
    av.grd.selFnBinary = '';
    for (var ii=0; ii<9; ii++) {
      if (av.grd.fnChosen[av.ptd.logicButtons[ii]]) {
        av.grd.selFnText += av.sgr.logicNames[ii] + '.';
        av.grd.selFnBinary += '1';
      }
      else av.grd.selFnBinary +='0';
    }
    if (3 > av.grd.selFnText.length) {av.grd.selFnText = 'none';}
    //console.log('av.grd.fnChosen = ', av.grd.fnChosen);
    //console.log('av.grd.selFnText =', av.grd.selFnText);
    //console.log('av.grd.selFnBinary =',av.grd.selFnBinary);

    //console.log('av.grd.selFnText=', av.grd.selFnText);
    var lngth = av.pch.aveFit.length;
    for (var ii=0; ii < lngth; ii++){
      av.pch.logFit[ii] = null;
      av.pch.logCst[ii] = null;
      av.pch.logEar[ii] = null;
      av.pch.logNum[ii] = null;
    }
    av.grd.drawGridSetupFn('av.ptd.bitToggle');
    av.grd.popChartFn(false, 'av.ptd.bitToggle');
    //console.log('bitToggle: av.grd.popStatsMsg.update', av.grd.popStatsMsg.update);
    av.ptd.updateLogicFn(av.grd.popStatsMsg.update);
  };

  //Need to reset all settings to @default
  av.ptd.resetDishFn = function (need2sendRest2avida) { 
    'use strict';
    
    //Take this out if we only reset when avida resets After sending a request for reset.
    // send reset to Avida adaptor
    // this is still here because the code to remove the attempt to restart avida without reloading the web app has not been removed.
    // Restarting avida without restarting the web app has never worked. 
    //if (need2sendRest2avida) {av.msg.reset();} 

    var Tsk;
    console.log('in resetDishFn');
    av.ptd.makePauseState();
    av.grd.clearGrd();
    if (av.debug.grid) console.log('before calling av.grd.popChartInit');
    av.grd.popChartInit('restDishFn');
    av.grd.runState = 'prepping';
    document.getElementById('mnCnOrganismTrace').disabled = true;
    document.getElementById('mnFzOrganism').disabled = true;
    //Enable the options on the Setup page
    av.ptd.popNewExStateFn('av.ptd.resetDishFn');
    // //Clear grid settings
    // av.parents.clearParentsFn();
    // // reset values in population settings based on a 'file' @default
    // av.fzr.actConfig.file = {};
    // // write if @default not found - need to figure out a test for this
    // // av.ptd.writeHardDefault(av);
    // av.fzr.actConfig.dir = 'c0';
    // av.fzr.actConfig.file['events.cfg'] = ' ';
    // if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
    // if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
    // if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}
    // if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
    //   str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
    //   av.fio.autoAncestorLoad(str);
    // }
    // if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
    //   str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
    //   av.fio.handAncestorLoad(str);
    // }

    // av.frd.updateSetup('av.ptd.resetDishFn');

    if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];}

    //Clear options that are not in the config files
    av.dom.autoPauseCheck.checked = false;
    av.dom.autoPauseNum.value = av.ptd.autoPauseUpdate;

    av.ptd.clearLogicButtons();
    //console.log('fzr.activeCon', av.fzr.actConfig);

    // re-write grid if that page is visible
    av.grd.drawGridSetupFn('av.ptd.resetDishFn');

    // reset resource values.
    for (var ii=0; ii < av.sgr.numTasks; ii++) {
      Tsk = av.sgr.logicTitleNames[ii];
      document.getElementById('mx'+Tsk).innerHTML = '';
      document.getElementById('cell'+Tsk).innerHTML = '';
      document.getElementById('tot'+Tsk).innerHTML = '';
    };
  };

  //clear logic Buttons
  av.ptd.clearLogicButtons = function() {
    var len = av.ptd.logicButtons.length;
    for (var ii = 0; ii < len; ii++) {
      document.getElementById(av.ptd.logicButtons[ii]).value = 'off';
      document.getElementById(av.ptd.logicButtons[ii]).className = 'bitButtonOff';
      av.grd.fnChosen[av.ptd.logicButtons[ii]] = false;
    }
  };

  //----------------------------------------------------------------------------------------------------------------------

  // should really be in a ui code section
  // http://stackoverflow.com/questions/7125453/modifying-css-class-property-values-on-the-fly-with-javascript-jquery
    av.ptd.setStyle = function (cssText) {
    var sheet = document.createElement('style'), isIE = false;
      sheet.type = 'text/css';
      /* Optional */ window.customSheet = sheet;
      (document.head || document.getElementsByTagName('head')[0]).appendChild(sheet);
      try{sheet.cloneNode(false).appendChild(document.createTextNode('')); }
    catch (err){isIE = true; }
    var wrapper = isIE ? document.createElement('div') : sheet;
      return (setStyle = function(cssText, node) {
      if (!node || node.parentNode !== wrapper)
        node = wrapper.appendChild(document.createTextNode(cssText));
        else node.nodeValue = cssText;
        if (isIE) sheet.styleSheet.cssText = wrapper.innerHTML;
        return node;
      })(cssText);
      };
  //----------------------------------------------------------------------------------------------------------------------

