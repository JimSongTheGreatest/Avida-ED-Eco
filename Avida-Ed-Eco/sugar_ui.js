  /* 
   *  functions used to create and modify the user interface for the resources and reactions. 
   *  In Avida-ED we use the analogy of bacterial digessting sugars
   *  Most of the interface is to create the environment file. 
   *  The Periodic functions occure in the Event File. 
   */

  /*  Just to state some dom IDs that might be used.
      av.dom.sugarAccordion = document.getElementById('sugarAccordion');
      av.dom.orn_section = document.getElementById('orn_section');
      av.dom.orn_title
      av.dom.orn_summary = document.getElementById('orn_summary'); 
      av.dom.orn_detailsHolder = document.getElementById('orn_detailsHolder'); 
      av.dom.orn1subSection = document.getElementById('orn1subSection'); 
  */

  var av = av || {};  //incase av already exists

  // This function builds the html for all the other tasks based on the html writen for "orn"
  if (av.dbg.flg.root) { console.log('Root: before av.sgr.buildHtml'); }
  av.sgr.buildHtml = function() {
    //console.log('in av.sgr.buildHtml');
    var ii, jj, tsk;
    var tskSectionStr = '';
    //var subSectionStr = av.dom.orn1subSection.innterHTML;   //later there will be 4 of these for each sugar/task
    var newstr = '';
    var pattern = 'orn';  
    var pattern_ = 'orn_';
    var patternW = 'ornW';  //Rob wanted supply type to be in the "summary" section when the layout = Whole Dish; Later changed his  mine. This structure and all that reference should come out in 2021
    
    var patternTsk = 'orn';
    var tmpstr = '';
    var tskNum = '';
    var len = av.sgr.logicNames.length;
    for (ii=0; ii<len; ii++) {
      tsk = av.sgr.logicNames[ii];
      if ('orn' != tsk) {
        tskSectionStr = av.dom.orn_section.innerHTML;
        tskNum = tsk + '_';
        //console.log('tskNum=', tskNum, 'pattern_=',pattern_);
        tskSectionStr = tskSectionStr.replaceAll(pattern_, tskNum);

        tskNum = tsk + 'W';
        tskSectionStr = tskSectionStr.replaceAll(patternW, tskNum);
        //console.log('tskSectionStr=', tskSectionStr);

        tmpstr = tsk+'_section';
        //console.log('id = ', tmpstr);
        //console.log( 'av.dom.'+tsk+'_detailsHolder =', document.getElementById(tsk+'_detailsHolder').innerHTML );
        //console.log( 'dom address is ', tmpstr);
        
        document.getElementById(tmpstr).innerHTML = tskSectionStr;

        tmpstr = tsk+'_title';
        document.getElementById(tmpstr).innerHTML = av.sgr.oseNames[ii];

        newstr = av.dom.orn_detailsHolder.innerHTML;
        // av.nut.numRegionsinHTML is defined in globals and is the number of subregions in the html
        for (jj=0; jj <= av.nut.numRegionsinHTML; jj++) {
          patternTsk = pattern + jj.toString();
          tskNum = tsk + jj;
          //console.log('patternTsk=',patternTsk, '; tskNum=',tskNum);
          newstr = newstr.replaceAll(patternTsk, tskNum);
        }
        //console.log('dom is', tsk+'_detailsHolder');
        av.dom.showBigTextarea.value =+ tskSectionStr;
        //console.log('tsk_detailsHolder=', tsk+'_detailsHolder');
        document.getElementById(tsk+'_detailsHolder').innerHTML = newstr;
      };
    };
      //Was using this to display how I was building sugar according data
      //console.log('av.dom.orn_section.innerHTML=', av.dom.orn_section.innerHTML);
      //document.getElementById('showBigTextarea').value = document.getElementById('equorn_detailsHolder').innerHTML;
      //document.getElementById('showBigTextarea').value = tskSectionStr;

      av.dom.showBigTextarea.value = av.dom.sugarAccordion.innerHTML;  
  };

  // html5 that is not in use right now. 
  /*
   In use but with fewer options
                            <div id="orn1hiSideSelectHolder" class="grid-sugarDetail-item sideNclass">
                            <label><select id="orn1hiSide">
                              <option value="top">Top</option>
                              <option value="bottom">Bottom</option>
                              <option value="left" selected="">Left</option>
                              <option value="right">Right</option>
                              <option value="center">Center</option>
                              <option value="edge">Edge</option>
                            </select>
                              <span id="orn1sideText">high side</span></label>
                          </div>

                            <div id="orn1periodcheckboxHolder" class="grid-sugarDetail-item periodCheckDiv" onchange="av.sgr.eachSugarcheckboxHolderChange(this);">
                            <label><input id="orn1periodCheck" type="checkboxHolder">Periodic&nbsp;&nbsp;</label>
                          </div>
                          <div id="orn1gradientcheckboxHolder" class="grid-sugarDetail-item gradientCheckDiv" onchange="av.sgr.eachSugarcheckboxHolderChange(this);">
                            <label><input id="orn1gradientCheck" type="checkboxHolder">Gradient&nbsp;&nbsp;</label>
                          </div>
                          <div id="orn1diffusecheckboxHolder" class="grid-sugarDetail-item diffuseCheckDiv" onchange="av.sgr.eachSugarcheckboxHolderChange(this);">
                            <label><input id="orn1diffuseCheck" type="checkboxHolder">Diffusion&nbsp;&nbsp;</label>
                          </div>

                          <div id="orn_summaryFooterText" class="sumFtTxtCls"> 0 < period then periodic </div>Re  
  */
  //-------------------------------------------------------------------------------------------------- sugars for Eco --
  //Code for adaptable user interface for environment layout witn upto 9 subsections. 
  //-------------------------------------------------------------------------------------------------- sugars for Eco --

/***************************************************************************************** calls directly from dom ****/

//------------------------------------------------------------------------------------------------- Sugar Accordion ----
//Global or Local in Ed speak = Global or Grid in Avida Environment file.
  av.sgr.allSugarGeometryChange = function (domObj) {
    var idx = domObj.selectedIndex;        // get the index of the selected option
    var which = domObj.options[idx].value;   // get the value of the selected option 
    av.sgr.ChangeAllGeo(which);
    document.getElementById('allSugarGeometry').value = 'neutral';
  };
  
  //This looks like it needs work
//------------------------------------------------------------------------------------- av.sgr.allSugarModifierChange --
  av.sgr.allSugarModifierChange = function(domObj) {
    var selectedOption = domObj.value;
    console.log('av.sgr.allSugarModifierChange: pattern=', selectedOption, '???????????????????????????');
    if ('diffusion' == domObj.value.toLowerCase()) { diffussionFlag = true; }
    var endName = 'supplyModifierSelect';   
    var domName = '';
    var numtasks = av.sgr.logicNames.length;
    var start = 1;   //only grid geometry can have diffusion, item 0 is for global
    // all tasks
    // console.log('endName=', endName, '; numtasks=', numtasks, '; sub=', sub, ' numRegons=', av.nut.numRegionsinHTML);
    for (var ii=start; ii< numtasks; ii++) {  
      for (var sub=start; sub <= av.nut.numRegionsinHTML; sub++) {
      //change all subsections; Global can have periodic but not gradient or diffusion. 
        domName = av.sgr.logicNames[ii] + sub + endName;
        av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], 'av.sgr.allSugarModifierChange');   //need to do once per task/subsection combo even if it does change both global and subtasks
        if (10 < sub) break;
      }
    }
    //console.log('ii=',ii,'; domName=', domName, '; selectedOption=', selectedOption);
    document.getElementById('allSugarModifier').value = 'neutral';
  };

//--------------------------------------------------------------------------------- av.sgr.allSugarRegionLayoutChange --

av.sgr.allSugarRegionLayoutChange = function(domObj) {
  //console.log('in av.sgr.allSugarRegionLayoutChange: value=', domObj.value);
  var selectedOption = domObj.value;
  av.changeAllSgrRegionLayout(selectedOption, 'av.sgr.allSugarRegionLayoutChange');
};

av.changeAllSgrRegionLayout = function(selectedOption, from) {
  var endName = 'regionLayout';   //nan_supplyTypeHolder  the 0 is present because we were considering doing upto 4 local areas and easier to take the 0 out later, than to put it in. 
  console.log(from, ' called av.changeAllSgrRegionLayout: selectedOption=',selectedOption);
  var domName = '';  
  var sub=0;   //most will start with 0 for global and also do local section 1
  // all tasks
  for (var ii=0; ii< av.sgr.numTasks; ii++) {  
    //change global
    domName = av.sgr.logicNames[ii] + '_' + endName;
    //console.log('domName='+domName, '; tsk =', av.sgr.logicNames[ii], '; sub=', sub, '; value=', domObj.value);
    //console.log('dom.'+domName+'.value =',  document.getElementById(domName).value, '; tsk =', av.sgr.logicNames[ii], '; sub=', sub);
    document.getElementById(domName).value = selectedOption;
    av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], 'av.changeAllSgrRegionLayout');   //only need to do once per task/subsection combo even if it does change both global and subtasks
    //console.log('dom.'+domName+'.value =',  document.getElementById(domName).value);
  }   
  //console.log('ii=',ii,'; domName=', domName, '; selectedOption=', selectedOption);
  document.getElementById('allSugarRegionLayout').value = 'neutral';
};

//------------------------------------------------------------------------------- av.sgr.allsugarsupplyTypeSlctChange --
av.sgr.allsugarsupplyTypeSlctChange = function (domObj) {
  var tsk = 'not';
  //two line method
  var idx = domObj.selectedIndex;        // get the index of the selected option 
  var selectedValue = domObj.options[idx].value;   // get the value of the selected option 
  // one line method
  selectedValue = domObj.value;

  //console.log('allsugarsupplyTypeSlctChange: idx=', idx, '; value=', selectedValue, '=', domObj.value);
  av.sgr.ChangeAllsugarsupplyTypeSlct(selectedValue, 'av.sgr.allsugarsupplyTypeSlctChange');
  document.getElementById('allsugarsupplyTypeSlct').value = 'neutral';
};

//-------------------------------------------------------------------------------------- av.sgr.toggleOpenCloseSymbol --
av.sgr.toggleOpenCloseSymbol = function(task) {
  if (document.getElementById(task+'_section').open) {
    document.getElementById(task+'_openClose').innerHTML = av.sgr.symbolIsClosed;
  } else {
    document.getElementById(task+'_openClose').innerHTML = av.sgr.symbolIsOpen;
  };
};

//--------------------------------------------------------------------------------- av.sgr.ChangeAllsugarsupplyTypeSlct --
av.sgr.ChangeAllsugarsupplyTypeSlct = function(selectedOption, from) {
  var endName = 'supplyTypeSlct';   //nan_supplyTypeHolder  the 0 is present because we were considering doing upto 4 local areas and easier to take the 0 out later, than to put it in. 
  console.log(from, ' called ChangeAllsugarsupplyTypeSlct: selectedOption=', selectedOption);
  var domName = '';
  var start = 1;   //sub sections start with 0, because global limited is in the summary (_)

  //console.log('start='+start, '; numTasks='+av.sgr.numTasks, '; endName='+endName, '; value=', selectedOption);
  for (var ii=0; ii< av.sgr.numTasks; ii++) {
    //change glabal and all subsections  
    tsk = av.sgr.logicNames[ii];
    //console.log('av.dom.'+tsk + '_regionLayHolder.value =', document.getElementById(tsk + '_regionLayHolder').value);
    domName = tsk + 'W' + endName;
    //console.log('domname=', domName);
    document.getElementById(domName).value = selectedOption;
    domName = tsk + '_' + endName;
    //console.log('domname=', domName);
    document.getElementById(domName).value = selectedOption;
    //console.log('document.getElementById('+domName+').value=', document.getElementById(domName).value);
    av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], 'av.sgr.ChangeAllsugarsupplyTypeSlct');
    for (var sub=start; sub<= 2; sub++) {
      domName = av.sgr.logicNames[ii] + sub + endName;
      //console.log('domName='+domName, '; selectedOption='+selectedOption+'|');
      document.getElementById(domName).value = selectedOption;
    };  // end subsection for loop
    av.sgr.toggleOpenCloseSymbol(tsk);
  };    // end task for loop
  //console.log('ii=',ii,'; domName=', domName, '; selectedOption=', selectedOption);
};

//----------------------------------------------------------------------------------- av.sgr.allSugarDetailsOpenClose --
av.sgr.allSugarDetailsOpenClose = function (domObj) {
  var idx = domObj.selectedIndex;        // get the index of the selected option 
  var selectedOption = domObj.options[idx].value;   // get the value of the selected option 
  av.sgr.OpenCloseAllSugarDetails(selectedOption, 'av.sgr.allSugarDetailsOpenClose');
  document.getElementById('allSugarDetails').value = 'neutral';
};

//--------------------------------------------------------------------------------------------- av.sgr.geometryChange --
av.sgr.geometryChange = function (selectObj) {
  //need to find subregion Number in the future - set to 1 for now.;
  var taskID = selectObj.id;
  var task = taskID.substring(0, 3);
  var sub = taskID.substr(3, 1);
  // if (av.dbg.flg.nut) { console.log('av.sgr.geometryChange: taskID=', taskID, '; task =', task, '; subsection=', sub); }
  sub = 1;       //or should this be 0 since it is in the 'summary' section?
  av.sgr.changeDetailsLayout(task, 'av.sgr.geometryChange');
};

//----------------------------------------------------------------------------------------- av.sgr.regionLayoutChange --
av.sgr.regionLayoutChange = function (domObj) {
//if (av.dbg.flg.nut) { console.log('Nut: av.sgr.regionLayoutChange was called by', domObj); }
  var taskID = domObj.id;
  var task = taskID.substring(0, 3);
  var sub = taskID.substr(3, 1);
  //console.log('taskID=', taskID, 'task=', task, '; subsection=', sub);
  av.sgr.changeDetailsLayout(task, 'av.sgr.regionLayoutChange');
};

//----------------------------------------------------------------------------------------------- av.sgr.supplyChange --
av.sgr.supplyChange = function (domObj) {
  var taskID = domObj.id;
  var value = domObj.value;
  var task = taskID.substring(0, 3);
  var sub = taskID.substr(3, 1);
  if ('_' == sub) {
    var tmpstr = task + 'W' + taskID.substr(4);
    //console.log('av.sgr.supplyChange: taskID=', taskID, '; task=', task, '; subsection=', sub, '; suffix=', taskID.substr(4), '; value=', value, '; tmpstr = '+tmpstr);
    document.getElementById(tmpstr).value = domObj.value;
  }
  else if ('W' == sub) {
    var tmpstr = task + '1' + taskID.substr(4);
    //console.log('av.sgr.supplyChange: taskID=', taskID, '; task=', task, '; subsection=', sub, '; suffix=', taskID.substr(4), '; value=', value, '; tmpstr = '+tmpstr);
    document.getElementById(tmpstr).value = domObj.value;      
  }
  //console.log('taskID=', taskID, '; value=', value, '; task=', task, '; sub=', sub);
  av.sgr.changeDetailsLayout(task, 'av.sgr.supplyChange');
};

//--------------------------------------------------------------------------------------- av.sgr.supplyModifierChange --
  av.sgr.supplyModifierChange = function (domObj) {
  if (av.dbg.flg.nut) { console.log('Nut: av.sgr.supplyModifierChange value', domObj.value); }
    var taskID = domObj.id;
    var task = taskID.substring(0, 3);
    var sub = taskID.substr(3, 1);
    console.log('taskID=', taskID, 'task=', task, '; subsection=', sub);
    av.sgr.changeDetailsLayout(task, 'av.sgr.supplyModifierChange');
  };

//------------------------------------------------------------------------------ av.sgr.eachSugarcheckboxHolderChange --
  av.sgr.eachSugarcheckboxHolderChange = function (domObj) {
  //av.sgr.re_region = /(\D+)(\d+)(.*$)/;
    var taskID = domObj.id;
    var matchTaskRegion = taskID.match(av.sgr.re_region);
    var task = matchTaskRegion[1];      //taskID.substring(0,3);   
    var sub = matchTaskRegion[2];       //taskID.substring(3,1);   did not work; substr seems to work for sub
 // if (av.dbg.flg.nut) { console.log('av.sgr.eachSugarcheckboxHolderChange: taskID=', taskID, 'tst=', task, '; subsection=', sub); }
    if (1 < sub)
      sub = 1;
    sub = 1; //only whole dish  for now
    av.sgr.changeDetailsLayout(task, 'av.sgr.eachSugarcheckboxHolderChange');
  };

//----------------------------------------------------------------------------------------------- av.sgr.periodChange --
  av.sgr.periodChange = function (domObj) {
    var txtNum = domObj.value;
    console.log('av.sgr.periodChange domObj.id=', domObj.id, '; value = ', domObj.value);
    if ( !av.utl.isNumber(Number(txtNum) ) ) {
      console.log('NaN: txtNum=', txtNum);
    }
  };

//---------------------------------------------------------------------------------------------- av.sgr.initialChange --
  av.sgr.initialChange = function (domObj) {
    // if (av.dbg.flg.nut) { console.log('domObj.value=', domObj.value, '; id=, domObj.id); }
    //var ndx = domObj.id.indexOf('Input');
    //var id = domObj.id.substring(0, ndx) + 'Text';
    var geometry;
    var id = domObj.id;
    console.log('text id=', id, '; input id=', domObj.id);
    // console.log('Number(domObj.value)=',Number(domObj.value));
    if (isNaN(Number(domObj.value))) {
      document.getElementById(id).innerHTML = 'inital amount must be a number';
      document.getElementById(id).style.color = 'red';
    } else if (0 > domObj.value) {
      document.getElementById(id).innerHTML = 'inital amount must be > 0';
      document.getElementById(id).style.color = 'red';
    } else {
      document.getElementById(id).innerHTML = 'inital amount / cell';
      document.getElementById(id).style.color = 'black';
      var tsk = domObj.id.substring(0, 3);  //start and end (does not inlcude end)
      var sub = domObj.id.substr(3, 1);     //start and number of characters
      if ('1Global' == document.getElementById(tsk+'_geometry').value) {
        var geometry = 'global';
      } else { geometry = 'grid'; }
      var supplyTypeSlct = document.getElementById(tsk+sub+'supplyTypeSlct').value;
      console.log('tsk=', tsk, '; geometry=', geometry, '; supplyTypeSlct=', supplyTypeSlct);
      
     av.sgr.setColorFlagBasedonSugarPresence(geometry, tsk, 'av.sgr.initialChange');
    }
  };

//----------------------------------------------------------------------------------------------- av.sgr.inflowChange --
  av.sgr.inflowChange = function (domObj) {
  // if (av.dbg.flg.nut) { console.log('av.sgr.inflowChange domObj=', domObj); }
  // if (av.dbg.flg.nut) { console.log('id=', domObj.id, '; domObj.value=', domObj.value); }
    var id = domObj.id;
    var equilbrium = 1;
    var preID = id.substr(0,4);
    var postID = id.substr(-4,2);
    var textID = preID + 'inflow' + postID + 'Np';
    console.log('id=', domObj.id, '; domObj.value=', domObj.value, '; preID=', preID, '; postID=', postID, '; textID=', textID);
    if (isNaN(Number(domObj.value))) {
      document.getElementById(textID).innerHTML = 'inflow amount must be a number';
      document.getElementById(textID).style.color = 'red';
    } else if (0 >= domObj.value) {
      document.getElementById(textID).innerHTML = 'inflow amount must be >= 0';
      document.getElementById(textID).style.color = 'red';
    } else {
      document.getElementById(textID).innerHTML = 'inflow / cell';
      document.getElementById(textID).style.color = 'black';
      equilbrium = parseFloat(document.getElementById(preID+'inflow'+ postID + 'Np').value)/
                   parseFloat(document.getElementById(preID+'outflow'+ postID + 'Np').value);
      console.log('av.dom.'+preID+'chmstat'+postID+'Text = ', av.utl.toMetric(equilbrium,0) + ' = equilibrium');
      document.getElementById(preID+'chmstat'+postID +'Text').innerHTML = av.utl.toMetric(equilbrium,0) + ' = equilibrium';
  };
};

//---------------------------------------------------------------------------------------------- av.sgr.outflowChange --
  av.sgr.outflowChange = function (domObj) {
 // if (av.dbg.flg.nut) { console.log('av.sgr.outflowChange domObj=', domObj); }
 // if (av.dbg.flg.nut) { console.log('id=', domObj.id, '; domObj.value=', domObj.value); }
    var id = domObj.id;
    var equilbrium = 1;
    var preID = id.substr(0,4);
    var postID = id.substr(-4,2);
    var textID = preID + 'outflow' + postID + 'Text';
    //console.log('id=', domObj.id, '; domObj.value=', domObj.value, '; preID=', preID, '; postID=', postID, '; textID=', textID);
    if (isNaN(Number(domObj.value))) {
      document.getElementById(textID).innerHTML = 'outflow fraction must be a number';
      document.getElementById(textID).style.color = 'red';
    } else if (0 >= domObj.value || domObj.value >  1) {
      document.getElementById(textID).innerHTML = 'Required: 0 < outflow fraction <= 0';
      document.getElementById(textID).style.color = 'red';
    } else {
      document.getElementById(textID).innerHTML = 'outflow fraction';
      document.getElementById(textID).style.color = 'black';
      equilbrium = parseFloat(document.getElementById(preID+'inflow'+ postID + 'Np').value)/
                   parseFloat(document.getElementById(preID+'outflow'+ postID + 'Np').value);
      //console.log('av.dom.'+preID+'chmstat'+postID+'Text = ', av.utl.toMetric(equilbrium,0) + ' = equilibrium');
      document.getElementById(preID+'chmstat'+postID +'Text').innerHTML = av.utl.toMetric(equilbrium,0) + ' = equilibrium';
    }
  };

  /*********************************************************************************** end calls directly from dom ****/



  //--------------------------------------------------------------------------------------------- av.sgr.ChangeAllGeo --
  // Geometry no longer an opton on the UI
  av.sgr.ChangeAllGeo = function(selectedOption){
    var sub = 1;  //need to figure out subsections later
    var idName = '';
    var numtasks = av.sgr.logicNames.length;
    for (var ii=0; ii< numtasks; ii++) {
    //for (var ii=1; ii< 3; ii++) {
      idName = av.sgr.logicNames[ii] + '_geometry';   //nan_geometry
      document.getElementById(idName).value = selectedOption;

      av.sgr.changeDetailsLayout(av.sgr.logicNames[ii], 'av.sgr.ChangeAllGeo');
    }
    //console.log('ii=',ii,'; idName=', idName, '; selectedOption=', selectedOption);
  };

  
  //if (av.dbg.flg.root) { console.log('Root: av.sgr.updateSugarColors'); }
  //---------------------------------------------------------------------------------------- av.sgr.updateSugarColors --
  // not called as of 2020_0124
  av.sgr.updateSugarColors = function() {
    var tsk;
    var sub = 0;
    var colorFlg = true;
    var from = 'av.sgr.update.colors';
    var supplyTypeSlct, initial;
    var len = av.sgr.logicNames.length;
    for (ii = 0; ii < len; ii++) {
      tsk = av.sgr.logicNames[ii];
      if ('1Global' == document.getElementById(tsk+'_regionLayout').value ) {
        //global dish
        supplyTypeSlct = document.getElementById(tsk + '_regionLayout').value.toLowerCase();
        if ('none' == supplyTypeSlct.toLowerCase() ) {
          colorFlg = false;
        }
      }
      // now look at local resources that might be different in the different subSections in the future. 
      else {
        //local (grid dish)
        for (sub = 0; sub <= av.nut.numRegionsinHTML; sub++) {
          supplyTypeSlct = document.getElementById(tsk + sub + 'supplyTypeSlct').value.toLowerCase();
          if ('none' == supplyTypeSlct.toLowerCase() ) {
            colorFlg = false;
          }
          else if ('limited' == supplyTypeSlct.toLowerCase() ) {
            initial = document.getElementById(tsk+sub+'initialHiNp').value;
            if (0 >= initial) {
              colorFlg = false;
            }
          }
        }
      }
      // for all tasks call setSingeleSugarColor
      av.sgr.setSingleSugarColor(colorFlg, ii, from);
    }
  };
  //------------------------------------------------------------------------------------ end av.sgr.updateSugarColors --

  //if (av.dbg.flg.root) { console.log('Root: av.sgr.OpenCloseAllSugarDetails'); }
  //--------------------------------------------------------------------------------- av.sgr.OpenCloseAllSugarDetails --
  av.sgr.OpenCloseAllSugarDetails = function(selectedOption, from) {
    var tsk = 'sgr';
    var openFlag = false;
    var numtasks = av.sgr.logicNames.length;
    if ('allOpen' == selectedOption) {
      openFlag = true;
    }
    for (var ii=0; ii< numtasks; ii++) {
      tsk = av.sgr.logicNames[ii];
      numTsk = av.sgr.logEdNames[ii];
      document.getElementById(tsk+'_section').open = openFlag;
      av.sgr.OpenClsSugarDetails(tsk, openFlag, 'av.sgr.OpenCloseAllSugarDetails');    
    };
    //if (av.dbg.flg.nut) { console.log('ii=',ii,'; idName=', idName, '; selectedOption=', selectedOption, '; openFlag=', openFlag, '; from=', from); }
  };
  //----------------------------------------------------------------------------- end av.sgr.OpenCloseAllSugarDetails --
  
  //--------------------------------------------------------------------------------------- av.sgr.OpenClsSugarDetail --
  av.sgr.OpenClsSugarDetails = function(tsk, openFlag, from) {
    var ndx = av.sgr.logicNames.indexOf(tsk);
    var numTsk = av.sgr.logEdNames[ndx];
    var chemoSummary = '';
    var tmpnum = '';
    var notestr = '';
    console.log(from, 'called OpenClsSugarDetails: type=', document.getElementById(tsk+'_supplyTypeSlct').value.toLowerCase(), '; !optioin=', !openFlag);
    if ('chemostat'  == document.getElementById(tsk+'_supplyTypeSlct').value.toLowerCase() && !openFlag) {
      chemoSummary = av.sgr.describe.short[tsk] + ' ' + document.getElementById(tsk+'0inflowHiNp').value + ' / '
                   + document.getElementById(tsk+'0outflowHiNp').value + ' = '
                   + av.utl.toMetric(av.nut[numTsk].uiAll.equil,0);
      //console.log('new width is', tmpnum);
      notestr = 'Inflow / Outflow = Equilibrium';
    } else if ('chemostat'  == document.getElementById(tsk+'_supplyTypeSlct').value.toLowerCase() && openFlag) {
      chemoSummary = av.sgr.describe.lng2[tsk];
    };
    tmpnum = (chemoSummary.length * 7) + 'px';
    //console.log('new width is', tmpnum);
    document.getElementById(tsk+'_taskRewardText').style.width = tmpnum;
    document.getElementById(tsk+'_taskRewardText').innerHTML = chemoSummary;    
    document.getElementById('sugarNote').innerHTML = notestr;
  };
  
  
  if (av.dbg.flg.root) { console.log('Root: av.sgr.setSingleSugarColor()'); }
  //-------------------------------------------------------------------------------------- av.sgr.setSingleSugarColor --
  av.sgr.setSingleSugarColor = function(colorFlg, tskNum, from) {
    //if (av.dbg.flg.nut) { console.log(from, 'called av.sgr.setSingleSugarColor: tskNum=', tskNum, '; colorFlg=', colorFlg); }
    //console.log(from, 'called av.sgr.setSingleSugarColor: tskNum=', tskNum, '; colorFlg=', colorFlg);

    // initialize values for color theme
    var backgndColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarBackgroundShade];
    var nameColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarNameShade];
    var textColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarNameShade];
    var darkColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarNameShade+20];
    
    // console.log('nameColor =', nameColor, '; textColor =', textColor, '; darkColor =', darkColor, '; backgndColor =', backgndColor);
    
    // initalize other values
    var idname = av.sgr.logicNames[tskNum]+'_section';
/*
    // another grey theme
    var backgndColor = av.color.greyMap[av.sgr.sugarGreyShade];
    var darkBkgndColor = av.color.greyMap[av.sgr.sugarGreyShade+20];   
    var nameColor = 'Black';
    var darkColor = '#eee';
    var idname;
 */   
    //need to think this thru as eventually there will be up to 4 subsections. Just one for now.
    
      
      if (colorFlg) {
        if (8 == tskNum) {
          nameColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarNameShade+40]; 
          textColor = av.color[av.sgr.sugarColors[tskNum]][av.sgr.sugarNameShade+40]; 
        }
      }
      else {
        //no resource for that task, so use grey theme
        backgndColor = av.color.greyMap[av.sgr.sugarGreyShade];
        textColor = 'Black'; 
        darkColor = '#eee';
      };
      // console.log('nameColor =', nameColor, '; textColor =', textColor, '; darkColor =', darkColor, '; backgndColor =', backgndColor);
      // console.log('greyMap length =', av.color.greyMap.length, '; av.sgr.sugarGreyShade =', av.sgr.sugarGreyShade, '; tskNum =', tskNum, '; colorFlg =', colorFlg);
      
      document.getElementById(idname).style.backgroundColor = backgndColor;
      idname = av.sgr.logicNames[tskNum]+'_title';
      // if (av.dbg.flg.nut) { console.log('idname =', idname, '; nameColor =', nameColor, 'textColor = ', textColor); }
      document.getElementById(idname).style.color = nameColor;
      
      //update colors for Resource Data table.
      idname = 'sgr' + av.sgr.logicTitleNames[tskNum];     //only need to do this once, move to where it is only called once?
      document.getElementById(idname).style.color = textColor;
      document.getElementById(idname).innerHTML = av.sgr.logicTitleNames[tskNum];
        
/*
      // Rob decided against colored backgrounds. Leave for now incase he changes his mind 2021_c02
      idname = 'cell' + av.sgr.logicTitleNames[tskNum];
      document.getElementById(idname).style.backgroundColor = darkBkgndColor;
      idname = 'tot' + av.sgr.logicTitleNames[tskNum];
      document.getElementById(idname).style.backgroundColor = backgndColor;
*/

      // eventually there will be up to 4 subsections. deal with that later.
      for (var sub=1; sub <= av.nut.numRegionsinHTML; sub++) {
        idname = av.sgr.logicNames[tskNum]+sub+'regionName';
        //console.log('set color for idname=', idname);
        document.getElementById(idname).style.color = nameColor;  
        //document.getElementById(idname).style.backgroundColor = darkBkgndColor;
        idname = av.sgr.logicNames[tskNum]+sub+'subSection';
        document.getElementById(idname).style['border-top'] = '1px solid '+darkColor;  
    } //end of loop thru subsections
  };
  //---------------------------------------------------------------------------------- end av.sgr.setSingleSugarColor --

  //if (av.dbg.flg.root) { console.log('Root: before av.sgr.setColorFlagBasedonSugarPresence'); }
  //------------------------------------------------------------------------- av.sgr.setColorFlagBasedonSugarPresence --
  av.sgr.setColorFlagBasedonSugarPresence = function(geometry, tsk, from) {
 // if (av.dbg.flg.nut) { console.log(from, 'called av.sgr.setColorFlagBasedonSugarPresence: supplyTypeSlct=', supplyTypeSlct, '; geometry=', geometry, '; tsk=', tsk, '; sub=', sub); }
    //console.log(from, 'called av.sgr.setColorFlagBasedonSugarPresence: geometry=', geometry, '; tsk=', tsk);
    var colorFlg = false;
    var supplyTypeSlct;
    var domObjName;
    var indx = av.sgr.logicNames.indexOf(tsk);
    var numTsk = av.sgr.logEdNames[indx];
    //console.log('tsk=', tsk, '; indx=', indx, '; numTsk=', numTsk, '; geometry=', geometry);
    av.nut[numTsk].uiAll.regionsNumOf =  Number(av.nut[numTsk].uiAll.regionLayout.substr(0,1) );
    if ('global' == geometry.toLowerCase()) {
      supplyTypeSlct = document.getElementById(tsk + '_supplyTypeSlct').value.toLowerCase();
      //console.log('supplyTypeSlct=', supplyTypeSlct);
      if ('none' != supplyTypeSlct.toLowerCase() ) {
        colorFlg = true;
      }
    }
    // now look at local resources that might be different in the different subSections in the future. 
    else {
      for (var ii=1; ii <=av.nut[numTsk].uiAll.regionsNumOf; ii++) {
        domObjName = tsk + ii + 'supplyTypeSlct';
        //console.log('tsk=', tsk, '; ii=', ii);
        //console.log('domElementID=|' + domObjName +'|');
        //console.log(domObjName+'.value=', document.getElementById(domObjName).value);
        supplyTypeSlct = document.getElementById(domObjName).value.toLowerCase();
        if ('none' != supplyTypeSlct.toLowerCase() ) {
          colorFlg = true;
        }
        if ('limited' == supplyTypeSlct.toLowerCase() ) {
          initial = document.getElementById(tsk+ii+'initialHiNp').value;
          if (0 < initial) {
            colorFlg = true;
          }
        }
      }
    } // end else Grid=geometry
    // for all tasks call setSingeleSugarColor
    av.sgr.setSingleSugarColor(colorFlg, indx, 'av.sgr.setColorFlagBasedonSugarPresence');
  };
  //--------------------------------------------------------------------- end av.sgr.setColorFlagBasedonSugarPresence --

  //-------------------------------------------------------------------------------------- av.sgr.changeDetailsLayout --
  // https://stackoverflow.com/questions/7363117/detecting-the-opening-or-closing-of-a-details-element
  av.sgr.detailsToggle = function(domObj) {
      var taskID = domObj.id;     //orn_regionLayHolder
      var task = taskID.substring(0, 3);
      var isOpen = !domObj.open;
      console.log('Details object,', task, 'has an open status of', isOpen, '; complexity level=', av.sgr.complexityLevel, 'Time=',
      //           new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }));
                    new Date().getTime() );
      // may put back later. 
      //if ('sgrGlobal' == av.sgr.complexityLevel) {
      if (false) {
        console.log('av.sgr.complexityLevel=', av.sgr.complexityLevel);
        if (isOpen) {
          setTimeout(function() {     //https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
            document.getElementById(taskID).open = false;
            console.log('details=', taskID, 'should close. Time=', new Date().getTime() );
          }, 5);   //delayInMilliseconds
        };
      };
      setTimeout(function() {     //https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
        console.log('after close global if needed; ', taskID, 'open=', domObj.open);
        av.sgr.toggleOpenCloseSymbol(task);
      }, 7);   //delayInMilliseconds
    };

  //---------------------------------------------------------------------------------- av.sgr.complexityChangeProcess --
  av.sgr.complexityChangeProcess = function (from) {
    var ii, tsk;
    var basicDisplayNone = 'inline-bloack';
    var optionDisabled = false;
    var subnum = 1;
    var len = av.sgr.logicNames.length;
    var clssnam = 'changeAllSugarsTogetherContainer';
    av.sgr.complexSumGridPrefix = 'grd-sgr-sum-adv-';
    
    console.log(from, 'called av.sgr.complexityChangeProcess: av.sgr.complexityLevel =', av.sgr.complexityLevel);
    if ('sgrBasic' == av.sgr.complexityLevel) {
      basicDisplayNone = 'none';
      clssnam = 'changeAllSugarsBasic';
      optionDisabled = true;
      av.sgr.complexSumGridPrefix = 'grid-sugar-summary-geo-basic-';
    } else if ('sgrGlobal' == av.sgr.complexityLevel) {
      basicDisplayNone = 'none';
      clssnam = 'changeAllSugarsGlobal';
      optionDisabled = true;
      av.sgr.complexSumGridPrefix = 'grd-sgr-sum-global-';
    } else {
      basicDisplayNone = 'inline-block';
      clssnam = 'changeAllSugarsAdvanced';
      av.sgr.complexSumGridPrefix = 'grd-sgr-sum-adv-';
      optionDisabled = false;
    };
    console.log('------------------------------------------------------------------------------geoDispay=', basicDisplayNone);
    document.getElementById('sugarFooter').className = clssnam;
    document.getElementById('allSugarModifierDiv').style.display = basicDisplayNone;
    document.getElementById('allSugarRegionLayoutDiv').style.display = basicDisplayNone;
    //document.getElementById('allsgrLimited').disabled = optionDisabled;
    //document.getElementById('allsgrChemostat').disabled = optionDisabled;
    document.getElementById('allTopLftRit').style.display = basicDisplayNone;
    document.getElementById('allQuarters').style.display = basicDisplayNone;
    document.getElementById('regionLayoutSgr').style.display = basicDisplayNone;
    document.getElementById('patternSgr').style.display = basicDisplayNone;
    document.getElementById('allSugarDetailsDiv').style.display = basicDisplayNone;
    document.getElementById('showHideSgr').style.display = basicDisplayNone;
    document.getElementById('allsgrChemostat').style.display = basicDisplayNone;
    
    for (ii = 0; ii < len; ii++) {
      tsk = av.sgr.logicNames[ii];
      document.getElementById(tsk+'_regionLayout').value = '1Global';      
      document.getElementById(tsk+'_regionLayHolder').style.display = basicDisplayNone;
      //document.getElementById(tsk+'_limited').disabled = optionDisabled;
      //document.getElementById(tsk+'_chemostat').disabled = optionDisabled;
      document.getElementById(tsk+'_topLftRit').style.display = basicDisplayNone;
      document.getElementById(tsk+'_quarters').style.display = basicDisplayNone;
      document.getElementById(tsk+'_section').open = false;
      document.getElementById('rs'+tsk).style.display = basicDisplayNone;       //dropDown Display
      av.sgr.changeDetailsLayout(tsk, 'av.sgr.complexityChangeProcess');
    };    
  };


  //if (av.dbg.flg.root) { console.log('Root: before av.sgr.changeDetailsLayout'); }
  //-------------------------------------------------------------------------------------- av.sgr.changeDetailsLayout --
  av.sgr.changeDetailsLayout = function(tsk, from) {
    var dom = '';
    var ndx = av.sgr.logicNames.indexOf(tsk);
    var numTsk = av.sgr.logEdNames[ndx];
    var numRegions = 'multi';
    if ( null != document.getElementById(tsk+'_regionLayout').value) {
      if ('1Global' == document.getElementById(tsk+'_regionLayout').value) {av.nut[numTsk].uiAll.geometry = 'global';}
      else { av.nut[numTsk].uiAll.geometry = 'grid';}
    };
    
    // update nut.txt.uiAll. uiAll.regionLayout is used to find name list. 
    av.nut[numTsk].uiAll.regionLayout = document.getElementById(tsk+'_regionLayout').value;    
    //console.log('av.nut['+numTsk+'].uiAll.regionLayout=', av.nut[numTsk].uiAll.regionLayout);
    av.nut[numTsk].uiAll.regionsNumOf =  Number(av.nut[numTsk].uiAll.regionLayout.substr(0,1) );
        
    //console.log('layout =', av.nut[tsk].uiAll.regionLayout, '; tsk=', tsk, ' subChanged=', subChanged, '; from=', from);
    //console.log('num sub Regions=', av.nut[numTsk].uiAll.regionsNumOf, 'layoutName=', '|'+av.nut[numTsk].uiAll.regionLayout+'|');
    
    //console.log('regionNameList=', regionNameList);
    //this 2 line method woks to get the value of the option in the select structure, but so does the one line method;
    //var idx = document.getElementById(tsk+'_geometry').selectedIndex;
    // if (av.dbg.flg.nut) { console.log('geometry=', geometry); }

    //hide everything. Display parts based on what is selected
    document.getElementById(tsk+'_supplyTypeHolder').style.display = 'none';
    document.getElementById(tsk+'WsupplyTypeHolder').style.display = 'none';
    document.getElementById(tsk+'_taskRewardText').style.display = 'none';
    document.getElementById(tsk+'_inflowHiDiv').style.display = 'none';
    document.getElementById(tsk+'_outflowHiDiv').style.display = 'none';
    document.getElementById(tsk+'_combo').style.display = 'none';    
    document.getElementById(tsk+'_chemo').style.display = 'none';               // may comment out before Rob sees. 
    document.getElementById(tsk+'_chmstatHiTxt').style.display = 'none';
    document.getElementById(tsk+'0inflowHiNp').style.display = 'inline-block';   //yes block as global chemo turns the inputs 2 none
    document.getElementById(tsk+'0outflowHiNp').style.display = 'inline-block';   //yes block as global chemo turns the inputs 2 none
     
    document.getElementById(tsk+'_periodcheckboxHolder').style.display = 'none';
    document.getElementById(tsk+'_periodTimeHolder').style.display = 'none';
    document.getElementById(tsk+'_initialHiHolder').style.display = 'none';
    document.getElementById(tsk+'_summaryFooterText').style.display = 'none';
    document.getElementById(tsk+'0periodcheckboxHolder').style.display = 'none';
    //document.getElementById('sgrEngergyReportLabel').style.display = 'none';
    document.getElementById(tsk+'_section').open = false;
    
    // hide for all subsections possible not just the number based on the regon layout type
    for (var sub=0; sub <= av.nut.numRegionsinHTML; sub++) {
      document.getElementById(tsk+sub+'supplyTypeHolder').style.display = 'none';
      document.getElementById(tsk+sub+'detailText').style.display = 'none';
      document.getElementById(tsk+sub+'regionName').style.display = 'none';
      document.getElementById(tsk+sub+'blank').style.display = 'none';
      //document.getElementById(tsk+sub+'gradientcheckboxHolder').style.display = 'none';
      //document.getElementById(tsk+sub+'diffusecheckboxHosslder').style.display = 'none';
      //document.getElementById(tsk+sub+'periodcheckboxHolder').style.display = 'none';
      document.getElementById(tsk+sub+'supplyModifierHolder').style.display = 'none';
      document.getElementById(tsk+sub+'periodTimeHolder').style.display = 'none';
      document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'none';
      document.getElementById(tsk+sub+'sideHiText').style.display = 'none';
      document.getElementById(tsk+sub+'sideLoText').style.display = 'none';
      document.getElementById(tsk+sub+'initialHiHolder').style.display = 'none';
      document.getElementById(tsk+sub+'initialLoDiv').style.display = 'none';
      document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'none';
      document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'none';
      document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'none';
      document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'none';
      document.getElementById(tsk+sub+'chmstatHiDiv').style.display = 'none';
      document.getElementById(tsk+sub+'chmstatLoDiv').style.display = 'none';
      tmpstr = JSON.stringify(av.nut[numTsk].uiSub.supplyTypeSlct);
      //console.log('av.nut['+numTsk+'].uiSub.supplyTypeSlct['+sub+'] =',av.nut[numTsk].uiSub.supplyTypeSlct[sub], '; supplyTypeSlct=', tmpstr);
    };
    // end hiding resource (sugar) interface elements, will show accorting to current state

    //console.log('av.nut.'+numTsk+'.uiAll.geometry.tolower()=',av.nut[numTsk].uiAll.geometry.toLowerCase());
    //console.log(from, '==> changeDetailsLayout: complex=', av.sgr.complexityLevel, '; geo=',av.nut[numTsk].uiAll.geometry, 'av.nut['+numTsk+'].uiAll.supplyTypeSlct=', av.nut[numTsk].uiAll.supplyTypeSlct);
    
    if ('sgrAdvanced' == av.sgr.complexityLevel) {
      av.sgr.processAdvancedFn(numTsk, tsk);
    }
    else {
      av.sgr.processBasicFn(numTsk, tsk);
    };    //end of sgrBasic vs sgrAdvanced
    //----------------------------------------------------------------------------- basic (global) resource interface --
    // if (av.dbg.flg.nut) { console.log('tsk=', tsk, 'sub=', sub, '; geometry=', geometry, '; supplyTypeSlct =', supplyTypeSlct, ' ' ,tsk+'_regionLayHolder=', document.getElementById(tsk+'_regionLayHolder').value ); }
    av.sgr.setColorFlagBasedonSugarPresence(av.nut[numTsk].uiAll.geometry.toLowerCase(), tsk, 'av.sgr.changeDetailsLayout');

    // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
  };
//------------------------------------------------------------------------------------ end av.sgr.changeDetailsLayout --

//--------------------------------------------------------------------------------------------- av.sgr.processBasicFn --
av.sgr.processBasicFn = function(numTsk, tsk) {
  // av.sgr.complexityLevel = 'sgrGlobal';   (begingger level)      
  av.nut[numTsk].uiAll.supplyTypeSlct = document.getElementById(tsk + '_supplyTypeSlct').value;
  //console.log('av.nut['+numTsk+'].uiAll.supplyTypeSlct=', av.nut[numTsk].uiAll.supplyTypeSlct);
  
  if ('grid' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
    // modify to treat as if it is global
    console.log('In av.sgr.processBasicFn: geometry=grid; tsk=', tsk, '; numTsk=', numTsk,'-------------- this will be trouble');
  };
  if (true) {
    // I was not able to get a grid container to start in the top row of the summary secion. 
    // I tried absolute postion, but then the grid contain did not change the sise of the summary section. 
    // never got tried with one surrounding div an then two. finally Applied display: grid to the summary element
    // changing the summary element to display: grid causes the arrow to disapper, but the detials will still open
    // document.getElementById(tsk+'_summary').className = av.sgr.complexSumGridPrefix + 'container';
    document.getElementById('allSugarDetailsDiv').style.display = 'none';
    document.getElementById('showHideSgr').style.display = 'none';
    document.getElementById(tsk+'_section').open = false;
    document.getElementById(tsk+'_supplyTypeHolder').style.display = 'inline-block';
    switch (av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase()) {
      case 'none': 
      case 'unlimited':  
        //document.getElementById(tsk+'_summary').className = av.sgr.complexSumGridPrefix + 'container';
        document.getElementById(tsk+'_sumLftGrid').className = av.sgr.complexSumGridPrefix + 'container sgrLftSumCls';
        document.getElementById(tsk+'_taskRewardText').innerHTML = av.sgr.describe.lng2[tsk];
        document.getElementById(tsk+'_taskRewardText').style.width = av.sgr.describe.lng2.width;
        document.getElementById(tsk+'_taskRewardText').style.display = 'inline-block';
        document.getElementById(tsk+'_section').open = false;
        break;
      case 'limited': 
        document.getElementById(tsk+'_sumLftGrid').className = av.sgr.complexSumGridPrefix + 'limited-container sgrLftSumCls';
        document.getElementById(tsk+'_taskRewardText').innerHTML = av.sgr.describe.lng2[tsk];
        document.getElementById(tsk+'_taskRewardText').style.width = av.sgr.describe.lng2.width;
        //document.getElementById(tsk+'_taskRewardText').innerHTML = av.sgr.describe.short[tsk];
        //document.getElementById(tsk+'_taskRewardText').style.width = av.sgr.describe.short.width;
        document.getElementById(tsk+'_taskRewardText').style.display = 'inline-block';
        document.getElementById(tsk+'_initialHiHolder').style.display = 'inline-block';
        document.getElementById(tsk+'_section').open = false;
        break;
      case 'chemostat':
        document.getElementById(tsk+'_sumLftGrid').className = av.sgr.complexSumGridPrefix + 'chemo-container sgrLftSumCls';
        //tmpTxt = av.sgr.describe.lng2[tsk] + ': . . . .  When 0 < period, chemostat becomes periodic';
        //tmpTxt = 'When 0 < period, chemostat becomes periodic';
        document.getElementById(tsk+'_section').open = true;
        if ( av.utl.isNumber(Number(document.getElementById(tsk+'0inflowHiNp').value))  && 
             av.utl.isNumber(Number(document.getElementById(tsk+'0outflowHiNp').value)) ) {
          if ( 0 < Number(document.getElementById(tsk+'0outflowHiNp').value)  && 
                   Number(document.getElementById(tsk+'0outflowHiNp').value) <=1 ) {
            av.nut[numTsk].uiAll.equil = ( Number(document.getElementById(tsk+'0inflowHiNp').value) / 
                     Number(document.getElementById(tsk+'0outflowHiNp').value) );
            tmpTxt = '';
          }
          else {
            tmpTxt = 'outflow or inflow value is not valid';
          };
        };
        document.getElementById('allSugarDetailsDiv').style.display = 'inline-block';
        document.getElementById('showHideSgr').style.display = 'inline-block';

        document.getElementById(tsk+'0inflowHiDiv').style.display = 'inline-block';;
        document.getElementById(tsk+'0outflowHiDiv').style.display = 'inline-block';;
        document.getElementById(tsk+'0chmstatHiDiv').style.display = 'inline-block';;
        document.getElementById(tsk+'0inflowHiText').innerHTML = 'inflow / cell';
        document.getElementById(tsk+'0outflowHiText').innerHTML = 'outflow fract';
        if (true) {
          // horizontal
          if (3 > tmpTxt.length) { tmpTxt = av.utl.toMetric(av.nut[numTsk].uiAll.equil, 0) + ' = equilibrium'; }
          document.getElementById(tsk+'0chmstatHiText').innerHTML = tmpTxt;
          document.getElementById(tsk+'_taskRewardText').innerHTML = av.sgr.describe.lng2[tsk];
          document.getElementById(tsk+'_taskRewardText').style.width = av.sgr.describe.lng2.width;
          document.getElementById(tsk+'_taskRewardText').style.display = 'inline-block';
        } else {
          // vertical with only numbers in summary
          document.getElementById(tsk+'_inflowHiDiv').style.display = 'inline-block';
          document.getElementById(tsk+'_outflowHiDiv').style.display = 'inline-block';
          document.getElementById(tsk+'_chmstatHiTxt').style.display = 'inline-block';
          document.getElementById(tsk+'0detailText').style.display = 'inline-block';
          document.getElementById(tsk+'0detailText').style.width = '100px';
          document.getElementById(tsk+'0detailText').innerHTML = av.sgr.describe.lng2[tsk];   
          document.getElementById(tsk+'_taskRewardText').style.width = av.sgr.describe.lng2.width;
          document.getElementById(tsk+'0inflowHiNp').style.display = 'none';    //hide actual input block
          document.getElementById(tsk+'0outflowHiNp').style.display = 'none';  //hide actual input block
          document.getElementById(tsk+'_chmstatHiTxt').innerHTML = av.utl.toMetric(av.nut[numTsk].uiAll.equil, 0) + ' = ';
          document.getElementById(tsk+'0chmstatHiText').innerHTML = 'equilibrium &nbsp;&nbsp;';
        };
        document.getElementById(tsk+'0subSection').className = 'sgr-detail-global-chemo-grid-container';
        if (!av.ui.hideDevelopment) {
          document.getElementById(tsk+'_periodTimeHolder').style.display = 'inline-block';
          document.getElementById(tsk+'0detailText').innerHTML = tmpTxt;
          document.getElementById(tsk+'0detailText').style.display = 'inline-block';
          document.getElementById(tsk+'0periodcheckboxHolder').style.display = 'inline-block';
        }
        // if (av.dbg.flg.nut) { console.log('task='+tsk, '; sub='+sub, '; get className from dom of ', tsk+'0Details'); }
        // if (av.dbg.flg.nut) { console.log('task='+tsk,'; Details.class=', document.getElementById(tsk+'0Details').className); }
        // if (av.dbg.flg.nut) { console.log(tsk+'0periodcheckboxHolder.checked value =', document.getElementById(tsk+'0periodCheck').checked, document.getElementById(tsk+'0periodCheck').value); }
        break;
    }  // end of switch 
  };
};
//----------------------------------------------------------------------------------------- end av.sgr.processBasicFn --

//------------------------------------------------------------------------------------------ av.sgr.processAdvancedFn --
av.sgr.processAdvancedFn = function(numTsk, tsk) {
  av.nut[numTsk].uiAll.supplyTypeSlct = document.getElementById(tsk + '_supplyTypeSlct').value;
  console.log('in av.sgr.processAdvancedFn: av.nut['+numTsk+'].uiAll.supplyTypeSlct=', av.nut[numTsk].uiAll.supplyTypeSlct);
  // document.getElementById(tsk+'_combo').style.display = 'inline-block';  not used it limited includes inflow and outflow;
  console.log('av.sgr[av.nut['+numTsk+'].uiAll.regionLayout]=', av.sgr[av.nut[numTsk].uiAll.regionLayout]);
  var numRegions = av.sgr[av.nut[numTsk].uiAll.regionLayout];
  var regionNameList = av.sgr.name[av.nut[numTsk].uiAll.regionLayout];
    
  console.log('av.sgr[av.nut['+numTsk+'].uiAll.regionLayout]=', av.nut[numTsk].uiAll.regionLayout, '; regionNameList',regionNameList);


  if ('global' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
    // I was not able to get a grid container to start in the top row of the summary secion. 
    // I tried absolute postion, but then the grid contain did not change the sise of the summary section. 
    // never got tried with one surrounding div an then two. finally Applied display: grid to the summary element
    // changing the summary element to display: grid causes the arrow to disapper, but the detials will still open
    // document.getElementById(tsk+'_summary').className = 'grd-sgr-sum-adv-' + 'container';
    document.getElementById('allSugarDetailsDiv').style.display = 'none';
    document.getElementById('showHideSgr').style.display = 'none';
    document.getElementById(tsk+'_section').open = false;
    document.getElementById(tsk+'_supplyTypeHolder').style.display = 'inline-block';
    switch (av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase()) {
      case 'none': 
      case 'unlimited':
        document.getElementById(tsk+'_sumLftGrid').className = 'grd-sgr-sum-adv-glb-container sgrLftSumCls';
        document.getElementById(tsk+'_taskRewardText').innerHTML = av.sgr.describe.lng2[tsk];
        document.getElementById(tsk+'_taskRewardText').style.width = av.sgr.describe.lng2.width;
        document.getElementById(tsk+'_taskRewardText').style.display = 'inline-block';
        document.getElementById(tsk+'_section').open = false;
        break;
      case 'limited': 
        document.getElementById(tsk+'_sumLftGrid').className = 'grd-sgr-sum-adv-glb-limited-container sgrLftSumCls';
        document.getElementById(tsk+'_taskRewardText').innerHTML = av.sgr.describe.short[tsk];
        document.getElementById(tsk+'_taskRewardText').style.width = av.sgr.describe.short.width;
        document.getElementById(tsk+'_taskRewardText').style.display = 'inline-block';
        document.getElementById(tsk+'_initialHiHolder').style.display = 'inline-block';
        document.getElementById(tsk+'_section').open = false;
        break;
      case 'chemostat':
        document.getElementById(tsk+'_summary').className = 'grd-sgr-sum-adv-chemo-container sgrLftSumCls';
        //tmpTxt = av.sgr.describe.lng2[tsk] + ': . . . .  When 0 < period, chemostat becomes periodic';
        //tmpTxt = 'When 0 < period, chemostat becomes periodic';
        document.getElementById(tsk+'_section').open = true;
        if ( av.utl.isNumber(Number(document.getElementById(tsk+'0inflowHiNp').value))  && 
             av.utl.isNumber(Number(document.getElementById(tsk+'0outflowHiNp').value)) ) {
          if ( 0 < Number(document.getElementById(tsk+'0outflowHiNp').value)  && 
                   Number(document.getElementById(tsk+'0outflowHiNp').value) <=1 ) {
            av.nut[numTsk].uiAll.equil = ( Number(document.getElementById(tsk+'0inflowHiNp').value) / 
                     Number(document.getElementById(tsk+'0outflowHiNp').value) );
            tmpTxt = '';
          }
          else {
            tmpTxt = 'outflow or inflow value is not valid';
          };
        };
        document.getElementById('allSugarDetailsDiv').style.display = 'inline-block';
        document.getElementById('showHideSgr').style.display = 'inline-block';

        document.getElementById(tsk+'0inflowHiDiv').style.display = 'inline-block';;
        document.getElementById(tsk+'0outflowHiDiv').style.display = 'inline-block';;
        document.getElementById(tsk+'0chmstatHiDiv').style.display = 'inline-block';;
        document.getElementById(tsk+'0inflowHiText').innerHTML = 'inflow / cell';
        document.getElementById(tsk+'0outflowHiText').innerHTML = 'outflow fract';
        if (true) {
          // horizontal
          if (3 > tmpTxt.length) { tmpTxt = av.utl.toMetric(av.nut[numTsk].uiAll.equil, 0) + ' = equilibrium'; }
          document.getElementById(tsk+'0chmstatHiText').innerHTML = tmpTxt;
          document.getElementById(tsk+'_taskRewardText').innerHTML = av.sgr.describe.lng2[tsk];
          document.getElementById(tsk+'_taskRewardText').style.width = av.sgr.describe.lng2.width;
          document.getElementById(tsk+'_taskRewardText').style.display = 'inline-block';
        } else {
          // vertical with only numbers in summary
          document.getElementById(tsk+'_inflowHiDiv').style.display = 'inline-block';
          document.getElementById(tsk+'_outflowHiDiv').style.display = 'inline-block';
          document.getElementById(tsk+'_chmstatHiTxt').style.display = 'inline-block';
          document.getElementById(tsk+'0detailText').style.display = 'inline-block';
          document.getElementById(tsk+'0detailText').style.width = '100px';
          document.getElementById(tsk+'0detailText').innerHTML = av.sgr.describe.lng2[tsk];   // + '&nbsp;&nbsp;&nbsp;&nbsp;';
          document.getElementById(tsk+'0inflowHiNp').style.display = 'none';    //hide actual input block
          document.getElementById(tsk+'0outflowHiNp').style.display = 'none';  //hide actual input block
          document.getElementById(tsk+'_chmstatHiTxt').innerHTML = av.utl.toMetric(av.nut[numTsk].uiAll.equil, 0) + ' = ';
          document.getElementById(tsk+'0chmstatHiText').innerHTML = 'equilibrium &nbsp;&nbsp;';
        };
        document.getElementById(tsk+'0subSection').className = 'sgr-detail-global-chemo-grid-container';
        if (!av.ui.hideDevelopment) {
          document.getElementById(tsk+'_periodTimeHolder').style.display = 'inline-block';
          document.getElementById(tsk+'0detailText').innerHTML = tmpTxt;
          document.getElementById(tsk+'0detailText').style.display = 'inline-block';
          document.getElementById(tsk+'0periodcheckboxHolder').style.display = 'inline-block';
        }
        // if (av.dbg.flg.nut) { console.log('task='+tsk, '; sub='+sub, '; get className from dom of ', tsk+'0Details'); }
        // if (av.dbg.flg.nut) { console.log('task='+tsk,'; Details.class=', document.getElementById(tsk+'0Details').className); }
        // if (av.dbg.flg.nut) { console.log(tsk+'0periodcheckboxHolder.checked value =', document.getElementById(tsk+'0periodCheck').checked, document.getElementById(tsk+'0periodCheck').value); }
        break;
      case 'combo':
        document.getElementById(tsk+'_section').open = true;
        //document.getElementById(tsk+'_periodcheckboxHolder').style.display = 'inline-block';
        //document.getElementById(tsk+'_gradientcheckboxHolder').style.display = 'inline-block';
        //document.getElementById(tsk+'_diffusecheckboxHolder').style.display = 'inline-block';
        document.getElementById(tsk+'_initialDiv').style.display = 'inline-block';
        document.getElementById(tsk+'_periodTimeHolder').style.display = 'inline-block';
        document.getElementById(tsk+'_initialHiHolder').style.display = 'inline-block';
        document.getElementById(tsk+'_initialLoDiv').style.display = 'inline-block';
        document.getElementById(tsk+'_inflowHiDiv').style.display = 'inline-block';
        document.getElementById(tsk+'_inflowLoDiv').style.display = 'inline-block';
        document.getElementById(tsk+'_outflowHiDiv').style.display = 'inline-block';
        document.getElementById(tsk+'_outflowLoDiv').style.display = 'inline-block';
        document.getElementById(tsk+'_chmstatHiTxt').style.display = 'inline-block';
        document.getElementById(tsk+'_chmstatLoDiv').style.display = 'inline-block';
        document.getElementById(tsk+'_hiSideSelectHolder').style.display = 'inline-block';
        document.getElementById(tsk+'_sideText').innerHTML = 'Side text describing what side means';
        document.getElementById(tsk+'_subSection').className = 'grid-sugarDetailAll-container';
     // if (av.dbg.flg.nut) { console.log(tsk+'Details.class=', document.getElementById(tsk+'Details').className); }
        break;
    }    
  }        // end global 
  else {
    // geometry = grid    
    document.getElementById(tsk+'_summary').className = 'grd-sgr-sum-adv-space';
    document.getElementById(tsk+'_regionLayHolder').style.display = 'inline-block';
    document.getElementById(tsk+'_section').open = true;
    console.log('av.nut['+numTsk+'].uiAll.regionsNumOf=', av.nut[numTsk].uiAll.regionsNumOf);
    for (var sub=0; sub <= av.nut[numTsk].uiAll.regionsNumOf; sub++) {
      dom = tsk + sub + 'supplyTypeSlct';
      //console.log('dom is', dom, '=', tsk + sub + 'supplyTypeSlct');
      av.nut[numTsk].uiSub.supplyTypeSlct[sub] = document.getElementById(tsk + sub + 'supplyTypeSlct').value;
      //console.log('sub=', sub,'; regionNameList=',  regionNameList);
      regionName = regionNameList[sub];
      document.getElementById(tsk+sub+'regionName').innerHTML = regionName;
      document.getElementById(tsk+sub+'supplyTypeSlct').style.display = 'none';
      //console.log('supplyTypeSlct ui =', document.getElementById(tsk + sub + 'supplyTypeSlct').value);
      //console.log('tsk=', tsk, 'numTsk=', numTsk, 'sub=', sub, '; uiSub=', av.nut[numTsk].uiSub) ;
      //console.log('supplyTypeSlct nut =', av.nut[numTsk].uiSub.supplyTypeSlct[sub]);
      // if (av.dbg.flg.nut) { console.log('Nut: tsk=', 'sub=', sub, tsk,'supplyTypeSlct=', av.nut[numTsk].uiSub.supplyTypeSlct[sub].toLowerCase(),'regionLayoutDiv=', document.getElementById(tsk+'_regionLayout').value); }
      switch (av.nut[numTsk].uiSub.supplyTypeSlct[sub].toLowerCase()) {    //for when geometery = local
        case 'none':
        case 'unlimited': 
            //document.getElementById(tsk+sub+'blank').style.display = 'block';      
            //document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-' + numRegions+ '-unlimited-container';
            document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-unlimited-container';
          break;
        case 'limited':   //Local
          // if (av.dbg.flg.nut) { console.log('av.nut.hideFlags.gradient=',av.nut.hideFlags.gradient); }
          document.getElementById(tsk+sub+'supplyModifierHolder').style.display = 'block';
          // document.getElementById(tsk+sub+'gradientcheckboxHolder').style.display = 'block';
          // document.getElementById(tsk+sub+'diffusecheckboxHolder').style.display = 'block';
          document.getElementById(tsk+sub+'initialHiHolder').style.display = 'block';
          document.getElementById(tsk+sub+'initialHiText').innerHTML = 'Inital amount';
          document.getElementById(tsk+sub+'subSection').className = 'sugarColsDetail-limited-container';
          //document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetail-Limited-container';
            //console.log('document.getElementById('+tsk+sub+'supplyModifierSelect).value =');
            //console.log(document.getElementById(tsk+sub+'supplyModifierSelect').value);
            console.log(tsk+sub+'supplyModifierSelect.value.toLowerCase()=',
                         document.getElementById(tsk+sub+'supplyModifierSelect').value.toLowerCase() );
          if ('gradient' == document.getElementById(tsk+sub+'supplyModifierSelect').value.toLowerCase()) {  
            //gradient
            document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
            document.getElementById(tsk+sub+'sideText').innerHTML = 'High edge';
            document.getElementById(tsk+sub+'initialHiText').innerHTML = 'High initial';
            document.getElementById(tsk+sub+'initialHiHolder').style.display = 'block';
            document.getElementById(tsk+sub+'initialLoDiv').style.display = 'block'; 
            document.getElementById(tsk+sub+'subSection').className = 'sugarColsDetail-limited-gradient-container';
            //document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-LimitedGradient-container';
            // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
          }
          break;
        case 'chemostat':
          // if (av.dbg.flg.nut) { console.log(tsk,'_gradientcheckboxHolder.checked=', document.getElementById(tsk+sub+'gradientCheck').checked); }
          // if (!av.nut.hideFlags.gradient) { document.getElementById(tsk+sub+'gradientcheckboxHolder').style.display = 'inline-block';}
          // if (!av.nut.hideFlags.periodic) { document.getElementById(tsk+sub+'periodcheckboxHolder').style.display = 'inline-block';  }
          // document.getElementById(tsk+sub+'diffusecheckboxHolder').style.display = 'inline-block';
          document.getElementById(tsk+sub+'regionName').style.display = 'block';
          document.getElementById(tsk+sub+'supplyModifierHolder').style.display = 'block';
          if ('periodic' == document.getElementById(tsk+sub+'supplyModifierSelect').value.toLowerCase() ) {
            document.getElementById(tsk+sub+'periodTimeHolder').style.display = 'inline-block';
            console.log('--------------- periodHolder should be');
          }

          //if (av.dbg.flg.nut) { console.log(tsk+sub+'gradientCheck', document.getElementById(tsk+sub+'gradientCheck').checked, '; av.sgr.hideFlgNames.gradient=', av.sgr.hideFlgNames.gradient); }
          if ('gradient' == document.getElementById(tsk+sub+'supplyModifierSelect').value.toLowerCase()) {  
            //gradient
            document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
            document.getElementById(tsk+sub+'sideText').innerHTML = 'hi edge';
            //document.getElementById(tsk+sub+'sideHiDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it; only used when left and right weere side by side
            //document.getElementById(tsk+sub+'sideLoDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it; only used when left and right weere side by side
            document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'chmstatHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'chmstatLoDiv').style.display = 'block';
            document.getElementById(tsk+sub+'chmstatHiText').innerHTML = ' = equilibrium hi';
            document.getElementById(tsk+sub+'chmstatLoText').innerHTML = ' = equilibrium low';
            document.getElementById(tsk+sub+'inflowHiText').innerHTML = 'Inflow Hi';
            document.getElementById(tsk+sub+'outflowHiText').innerHTML = 'Outflow frac';

            document.getElementById(tsk+sub+'subSection').className = 'sugarColsDetail-chemostat-gradient-container';
            //document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-chemostatGradient-container';
            // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
            if ('periodic' == document.getElementById(tsk+sub+'supplyModifierSelect').value.toLowerCase() ) {
              document.getElementById(tsk+sub+'periodTimeHolder').style.display = 'block';
              // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
            }
          }
          else {
            //not-gradient; Local
            //document.getElementById(tsk+sub+'periodcheckboxHolder').style.display = 'inline-block';
            //document.getElementById(tsk+sub+'gradientcheckboxHolder').style.display = 'inline-block';
            document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
            document.getElementById(tsk+sub+'inflowHiText').innerHTML = 'Inflow';
            document.getElementById(tsk+sub+'outflowHiText').innerHTML = 'Outflow frac';
            document.getElementById(tsk+sub+'chmstatHiDiv').style.display = 'block';
            if ( !isNaN(Number(document.getElementById(tsk+sub+'inflowHiNp').value))  && 
                 !isNaN(Number(document.getElementById(tsk+sub+'outflowHiNp').value)) ) {
              if ( 0 < Number(document.getElementById(tsk+sub+'outflowHiNp').value)  && 
                       Number(document.getElementById(tsk+sub+'outflowHiNp').value) <=1 ) {
                av.nut[numTsk].uiAll.equil = Number(document.getElementById(tsk+sub+'inflowHiNp').value) / 
                         Number(document.getElementById(tsk+sub+'outflowHiNp').value);
                document.getElementById(tsk+sub+'chmstatHiText').innerHTML = av.utl.toMetric(av.nut[numTsk].uiAll.equil),0 + ' = equilibrium';                  
              }
              else {
                document.getElementById(tsk+sub+'chmstatHiText').innerHTML = 'outflow or inflow value is not valid';
              }
            };

            document.getElementById(tsk+sub+'subSection').className = 'sugarColsDetail-chemostat-container';
            //document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-chemostat-container';
            //console.log('document.getElementById('+tsk+sub+'gradientCheck).checked=', document.getElementById(tsk+sub+'gradientCheck').checked);
            //console.log('document.getElementById('+tsk+sub+'gradientcheckboxHolder).style=', document.getElementById(tsk+sub+'gradientcheckboxHolder').style);
         // if (av.dbg.flg.nut) { console.log(tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
            if ('periodic' == document.getElementById(tsk+sub+'supplyModifierSelect').value.toLowerCase() ) {
              document.getElementById(tsk+sub+'periodTimeHolder').style.display = 'block';
              //document.getElementById(tsk+sub+'subSection').className = showGeo + '-sugarDetail-chemostatPeriod-container';            
              // if (av.dbg.flg.nut) { console.log('nut: tsk+sub+'subSection.class=', document.getElementById(tsk+sub+'subSection').className); }
            };
          }
          break;
          /*
        case 'SourceSink':        //or should this be 'flow' as it must have diffusion and/or gravity ??
          document.getElementById(tsk+sub+'periodcheckboxHolder').style.display = 'inline-block';
          document.getElementById(tsk+sub+'sideText').innerHTML = 'inflow side; outlow will be everywhere or on the opposite side';
          document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
          document.getElementById(tsk+'Details').className = 'grid-sugarDetailSourceSink-container';
       // if (av.dbg.flg.nut) { console.log('nanDetails.class=', document.getElementById(tsk+'Details').className); }
          break;
          */
        case 'combo':
          document.getElementById(tsk+'_regionLayHolder').style.display = 'inline-block';
          //document.getElementById(tsk+sub+'periodcheckboxHolder').style.display = 'inline-block';
          //document.getElementById(tsk+sub+'gradientcheckboxHolder').style.display = 'inline-block';
          //document.getElementById(tsk+sub+'diffusecheckboxHolder').style.display = 'inline-block';
          document.getElementById(tsk+'_initialDiv').style.display = 'inline-block';
          document.getElementById(tsk+sub+'periodTimeHolder').style.display = 'block';
          document.getElementById(tsk+sub+'hiSideSelectHolder').style.display = 'block';
          document.getElementById(tsk+sub+'sideText').innerHTML = 'Side text describing what side means';
          document.getElementById(tsk+sub+'sideHiDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
          document.getElementById(tsk+sub+'sideLoDiv').style.display = 'block';   //put in to make high and low side more obvious, but I don't think I need it
          document.getElementById(tsk+sub+'initialHiHolder').style.display = 'block';
          document.getElementById(tsk+sub+'initialLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'inflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'inflowLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'outflowHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'outflowLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'chmstatHiDiv').style.display = 'block';
          document.getElementById(tsk+sub+'chmstatLoDiv').style.display = 'block';
          document.getElementById(tsk+sub+'subSection').className = 'grid-sugarDetailAll-container';
       // if (av.dbg.flg.nut) { console.log(tsk+'Details.class=', document.getElementById(tsk+'Details').className); }
          break;
      }; //end of switch
      //console.log('document.getElementById('+tsk+sub+'subSection).className=', document.getElementById(tsk+sub+'subSection').className);
        //console.log('document.getElementById('+tsk+sub+'gradientcheckboxHolder).className=', document.getElementById(tsk+sub+'gradientcheckboxHolder').className);
        //console.log('document.getElementById('+tsk+sub+'gradientCheck).style.display=', document.getElementById(tsk+sub+'gradientcheckboxHolder').style.display);
    };  //end of subregion for loop
  }    //end of global/local if statement
};
//-------------------------------------------------------------------------------------- end av.sgr.processAdvancedFn --
  //---------------------------------------------------------------------------------------------- end sugars for Eco --
  if (av.dbg.flg.root) { console.log('Root: end sugars for Eco'); }


//---------------------------------------------------------------------------------- The rest is not in use, comments --


//----------------------------------------------------------------------------------------------------------------------
