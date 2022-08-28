var av = av || {};  // variable exists; this just lets the ide konw that av is defnined
var dijit = dijit || {};  //variable exists; this just lets the ide konw that dijit is defnined


////Find subarea based on region code
//-------------------------------------------------------------------------------------- av.fwt.getInflowRegionArea --
av.fwt.getInflowRegionArea = function(numTsk, subnum) {
  var ndx = av.nut[numTsk].uiSub.regionNdx[subnum];
  var cols = Math.floor(av.nut.wrldCols *  av.sgr.regionQuarterCols[ndx]);
  var rows = Math.floor(av.nut.wrldRows *  av.sgr.regionQuarterRows[ndx]);
  //console.log('tsk=', numTsk, '; subnum=', subnum,'; ndx=', ndx, '; cols=', cols, '; rows=', rows);

  // if the number of rows or cols is odd, then one half will get an extra row/col in that direction
  if(0 != av.nut.wrldCols % 2) {
     cols += av.sgr.regionQuarterColsAdd[1];
    }
    if (0 != av.nut.wrldRows %2 ) {
      rows += av.sgr.regionQuarterRowsAdd[1];
    };
    var rslt = {
      area : rows*cols,
      cols : cols,
      rows : rows,
      boxx : Math.floor(av.nut.wrldCols * av.sgr.regionQuarterBoxx[ndx]),
      boxy : Math.floor(av.nut.wrldRows * av.sgr.regionQuarterBoxy[ndx])
    };
   return (rslt);
};
//---------------------------------------------------------------------------------- end av.fwt.getInflowRegionArea --

av.fwt.existDfltCheck = function(str, data, dfltTxt, avidaDefault){
  if (':depletable=' == str )
  var text = ''; 
  if (null != data) {
    text = data;
  } 
  else if (null != dfltTxt) {
    text = dfltTxt;
  };
  //console.log('str=', str, '; data=', data, '; dfltTxt=', dfltTxt, '; avidaDefault=', avidaDefault,'; text=', text, '-------- are they equal?-----');
  if (text == avidaDefault) {
    text = '';
  }
  else if (null != str) {
    text = str + text;
  };

  //if (':depletable=' == str ) {
  if (false) {
    console.log('in av.fwt.existDfltCheck: str=', str, '; data=', data, '; dfltTxt='+dfltTxt+'; avidaDefault='+avidaDefault
      +'; text=', text);
  }
  return text;
};

//----------------------------------------------------------------------------------------------- av.fwt.existCheck --
av.fwt.existCheck = function(str, data, dfltTxt){
  var text = '';
  if (null !=  data) {
    text = data;
  }
  else if (null != dfltTxt) {
    text = dfltTxt;
  }
  else { 
    return '';  
  }
  if (null != str) {
    text = str + text;
  }
  if (':value=' == str) {
    //console.log('in av.fwt.existCheck: str=', str, '; data=', data, '; dfltTxt='+dfltTxt+'; text='+text+'|');  
  }
  return text;
};

//--------------------------------------------------------------------------------------- av.fwt.setResourceConstants --
// clears data for three row data table for resources in the stats panel on the population page. 
av.fwt.clearResourceConstants = function(from) {
  var tskTitle;
  av.nut.resrcTyp = av.sgr.resrcTyp;
  // console.log(from,'called av.fwt.clearResourceConstants: resource type =', av.nut.resrcTyp);
  for (var ii=0; ii < av.sgr.numTasks; ii++) {
    tskTitle = av.sgr.logicTitleNames[ii];
    document.getElementById('cell'+tskTitle).innerHTML = '';
    document.getElementById('mx'+tskTitle).innerHTML = '';
    document.getElementById('tot'+tskTitle).innerHTML = '';
  }
};
  
  av.fwt.setResourceConstants = function() {
    var logLen = av.sgr.logicNames.length;
    var numTsk;
    var tskTitle;
    av.nut.cntGlobalDataTasks = 0;
    //console.log('resource type =', av.nut.resrcTyp);
    for (var ii=0; ii < logLen; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      tskTitle = av.sgr.logicTitleNames[ii];
      //console.log('numTsk', numTsk, '; nut_resr type =', av.nut[numTsk].uiAll.supplyTypeSlct);
      document.getElementById('cell'+tskTitle).innerHTML = '&nbsp;';   //Type
      document.getElementById('mx'+tskTitle).innerHTML = '&nbsp;';
      document.getElementById('tot'+tskTitle).innerHTML = '&nbsp;';   //Amount
      //console.log('tsk=', numTsk, '; geo=', av.nut[numTsk].uiAll.geometry.toLowerCase() );
      if ( 'global' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        if ('unlimited' == av.nut.resrcTyp[ii] ) {
          document.getElementById('cell'+tskTitle).innerHTML = 'U';
          document.getElementById('mx'+tskTitle).innerHTML = '&infin; ';      //&infin is infinity symbol
          document.getElementById('tot'+tskTitle).innerHTML = '&infin; ';        //&infin is infinity symbol
        } else if ('none' == av.nut.resrcTyp[ii].toLowerCase() ) {
          document.getElementById('cell'+tskTitle).innerHTML = 'N';
          document.getElementById('mx'+tskTitle).innerHTML = '-';
          document.getElementById('tot'+tskTitle).innerHTML = '-';
        } else {
          document.getElementById('mx'+tskTitle).innerHTML = '+';
          document.getElementById('tot'+tskTitle).innerHTML = '+';
          av.nut.cntGlobalDataTasks++;
          if ('limited' == av.nut.resrcTyp[ii].toLowerCase() ) {
//          if ('limited' == av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase() ) {
            document.getElementById('cell'+tskTitle).innerHTML = 'L';
          } else {
            document.getElementById('cell'+tskTitle).innerHTML = 'C';
          }
        };
      } else {
        // grid
        document.getElementById('tot'+tskTitle).innerHTML = 'Grid ';
        document.getElementById('cell'+tskTitle).innerHTML = '&nbsp;';
          if (1 >= av.nut[numTsk].uiAll.regionsNumOf ) { 
          if ('unlimited' == av.nut.resrcTyp[ii] ) {
            document.getElementById('cell'+tskTitle).innerHTML = 'unlim';
            document.getElementById('mx'+tskTitle).innerHTML = 'unlim';
          } else {
            document.getElementById('cell'+tskTitle).innerHTML = '0 ';
            document.getElementById('mx'+tskTitle).innerHTML = '0 ';
          }
        };
      };  // end of else grid
    };  // end of loop thru tasks
    //console.log('av.nut.cntGlobalDataTasks=', av.nut.cntGlobalDataTasks);
  };

  //----------------------------------------------------------------------------------- av.fwt.setResourceGridDisplay --
  av.fwt.setResourceGridDisplay = function (from) {
    console.log(from, 'called av.fwt.setResourceGridDisplay');
    var hideFlag = [false, false, false, false, false, false, false, false, false];
    var hideResourceGrid = true;  // hide resource grid when true. Show grid when false. 
    var numTsk = '0not';
    var supplyType = 'other';
    
    for (var ii=1; ii < av.sgr.numTasks; ii++) {
      numTsk = av.sgr.logEdNames[ii];
      if ('global' == av.nut[numTsk].uiAll.geometry.toLowerCase()) {
        supplyType = av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase();
        if ('unlimited' == supplyType || 'none' == supplyType) {
          hideFlag[ii] = true;
        };
      };
      //console.log('hideFlag['+ii+'] =', hideFlag[ii]);
      hideResourceGrid = hideResourceGrid && hideFlag[ii];
    }  // end of for loop. 
    console.log(from, 'called av.fwt.setResourceGridDisplay: hideResourceGrid is', hideResourceGrid);
    
    if (hideResourceGrid) {
      //document.getElementById('resrceDataHolder').style.display = 'none';
      //document.getElementById('resrceDataHolder').style.visibility = 'hidden';
      document.getElementById('resourceDataGrid').class = 'visibility_hidden';
    } else {
      //there is some spatial data so show that. 
      document.getElementById('resrceDataHolder').style.display = 'inline-block';
      //document.getElementById('resrceDataHolder').style.visibility = 'hidden';
      document.getElementById('resourceDataGrid').class = 'sugarGlobal-gridContainer';
//      document.getElementById('resrceDataHolder').style.display = 'block';
//      document.getElementById('resrceDataHolder').style.visibility = 'visible';
//      document.getElementById('resourceDataGrid').class = 'sugarGlobal-gridContainer';
    }
  };
  
  //------------------------------------------------------------------------------------ av.fwt.makeFzrEnvironmentCfg --
  av.fwt.makeFzrEnvironmentCfg = function (idStr, toActiveConfigFlag, from) {
    'use strict';
    if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrEnvironmentCfg; idStr=', idStr);
    console.log(from, ' called av.fwt.makeFzrEnvironmentCfg; idStr=', idStr);
    av.fwt.dom2nutUIfields('av.fwt.makeFzrEnvironmentCfg');
    av.fwt.nutUI2cfgStructure('av.fwt.makeFzrEnvironmentCfg');
    av.fwt.setResourceGridDisplay('av.fwt.makeFzrEnvironmentCfg');
    console.log('before calling av.fwt.nut2cfgFile');
    av.fwt.nut2cfgFile(idStr, toActiveConfigFlag, 'av.fwt.makeFzrEnvironmentCfg');
    console.log('after calling av.fwt.nut2cfgFile');
    av.fwt.setResourceConstants();    
  };

  //------------------------------------------------------------------------------------------ av.fwt.dom2nutUIfields --
  //convert dom data into nutUI data fields
  av.fwt.dom2nutUIfields = function (from) {
    av.fzr.clearEnvironment('av.fwt.dom2nutUIfields');
    av.nut.wrldCols = Number(av.dom.sizeCols.value);
    av.nut.wrldRows = Number(av.dom.sizeRows.value);
    av.nut.wrldSize = av.nut.wrldCols * av.nut.wrldRows;
    //------------------------------------------------------ assign ui parameters first --
    var tsk; //name of a task with 3 letters
    var numTsk; //number prefix to put in Avida-ED order before 3 letter prefix
    var tskVar;  // avida uses variable length logic9 names
    var arguDom;  // argument name in the Dom
    var arguDish; // arugment name in the nutrient structure (nut); which is also the arugment name in the environment.cfg file
    var logiclen = av.sgr.logicNames.length;
    var area = 1;
    var uiAllDishLen = av.sgr.ui_allDish_argu.length;
    var uiAllDomLen  = av.sgr.ui_allDom_argu.length;
    var uiSubDom_numLen = av.sgr.uiSubDom_num.length;
    var uiSub_checkLen = av.sgr.uiSub_Check.length;
    var uiSubDom_txtLen = av.sgr.uiSubDom_txt.length;
    var tmpNum = 1;
    var regionLayout = '';
    var ndx = 1;
    var react_arguLen = av.sgr.react_argu.length;
    var rslt;
    var kk=0; // index into uiSub
    var subBegin= 0; //must be positive
    var subEnd = av.nut.numRegionsinHTML;  // cannot be more than the number of html slots
    
    if (false) {
      console.log(from,'called av.fwt.dom2nutUIfields: react_arguLen=',react_arguLen, 
        ';aiAlDishLen=',uiAllDishLen,'; uiAllDomLen=', uiAllDomLen, '; uiSubdom_numLen=', uiSubDom_numLen, 
        '; uiSub_checkLen=', uiSub_checkLen, '; uiSubDom_txtLen=', uiSubDom_txtLen);
    }
    for (var ii=0; ii< logiclen; ii++) {      //9
      numTsk = av.sgr.logEdNames[ii];     //puts names in order they are on avida-ed user interface
      tsk = av.sgr.logicNames[ii];        //3 letter logic names
      tskVar = av.sgr.logicVnames[ii];    // variable length logic tasks names as required by Avida
      //argument lists to hold data relevant to getting data from dom
      
      for (jj=0; jj < uiAllDomLen; jj++) {
        arguDom = av.sgr.ui_allDom_argu[jj];
        //console.log('ii='+ii+'; jj='+jj, '; av.nut['+numTsk+'].uiAll['+arguDom+']=', 'dom of', tsk+'_'+arguDom);
        //console.log('domList length=', uiAllDomLen,'; value=',document.getElementById(tsk+'_'+arguDom).value);    

        av.nut[numTsk].uiAll[arguDom] = document.getElementById(tsk+'_'+arguDom).value;
        //console.log('av.nut['+numTsk+'].uiAll['+arguDom+']=');
        //console.log(av.nut[numTsk].uiAll[arguDom]);
      };
      regionLayout = document.getElementById(tsk+'_regionLayout').value;
      av.nut[numTsk].uiAll.regionLayout = regionLayout;
      //console.log('numTsk=', numTsk, '; regionLayout=', regionLayout);
      av.nut[numTsk].uiAll.regionsNumOf = regionLayout[0];
      ndx = av.sgr.regionLayoutValues.indexOf(regionLayout);
      
      if ('1Global' == regionLayout) {
        av.nut[numTsk].uiAll.geometry = 'global';
      }
      else {
        av.nut[numTsk].uiAll.geometry = 'grid';
      }

      subBegin = av.sgr.regionQuarterSubBeg[ndx];
      subEnd = av.sgr.regionQuarterSubEnd[ndx];
      //console.log('numTsk=', numTsk, '; regionLayout=', regionLayout, '; ndx=', ndx, ';subBegin=', subBegin, '; subEnd=', subEnd);
      //start on the potential subdishes next
      for (var nn=subBegin; nn <= subEnd; nn++) {
                
        //seemed to have inconsistent error, but it went away. left the debug console.logs for now
        //console.log('regionLayout = av.nut['+numTsk+'].uiAll.regionLayout=', av.nut[numTsk].uiAll.regionLayout);
        
        //console.log('av.nut['+numTsk+'].uiSub.regionName['+nn+']=', av.nut[numTsk].uiSub.regionName[nn]);
        //console.log('av.sgr.name['+regionLayout+']['+nn+']=', av.sgr.name[regionLayout][nn]);

        av.nut[numTsk].uiSub.regionName[nn] = av.sgr.name[regionLayout][nn];
                                      //tmptext = av.sgr.name[regionLayout][nn];
        //av.nut[numTsk].uiSub.regionName[nn] = tmpText;
        //console.log('av.nut['+numTsk+'].uiSub.regionName['+nn+']=', av.nut[numTsk].uiSub.regionName[nn]);
          
        ndx = av.sgr.regionQuarterNames.indexOf(av.sgr.name[regionLayout][nn]);
        av.nut[numTsk].uiSub.regionNdx[nn] = ndx;
        
        av.nut[numTsk].uiSub.regionCode[nn] = av.sgr.regionQuarterCodes[ndx];
        //av.nut[numTsk].uiSub.area[nn] = av.nut.wrldCols * av.sgr.regionQuarterCols[ndx]
        //                    * av.nut.wrldRows * av.sgr.regionQuarterRows[ndx];
        

        rslt = av.fwt.getInflowRegionArea(numTsk, nn);
        av.nut[numTsk].uiSub.area[nn] = rslt.area;
        av.nut[numTsk].resrc.boxcol[nn] = rslt.cols;
        av.nut[numTsk].resrc.boxrow[nn] = rslt.rows;
        av.nut[numTsk].resrc.boxx[nn] = rslt.boxx;
        av.nut[numTsk].resrc.boxy[nn] = rslt.boxy;
        //console.log('av.nut['+numTsk+'].resrc.boxx['+nn+']; boxy =', av.nut[numTsk].resrc.boxx[nn], ';', av.nut[numTsk].resrc.boxy[nn]);

        // error in this section - I think just does not work in summary section
        //Need to fine area of subregions first. 
        for (jj=0; jj< uiSubDom_numLen; jj++) {
          arguDom = av.sgr.uiSubDom_num[jj];
          //console.log('jj='+jj, '; av.nut['+numTsk+'].uiSub['+arguDom+']['+nn+']=', 'dom of', '|'+tsk+nn+arguDom+'|');
          //console.log('; dom=',document.getElementById(tsk+nn+arguDom).value ); 
          if (av.utl.isNumber(Number(document.getElementById(tsk+nn+arguDom).value))) {
            tmpNum = Number(document.getElementById(tsk+nn+arguDom).value);
            if ('in' == arguDom.substr(0,2)) {
              tmpNum = tmpNum / area;   //need to find area first
            };
            av.nut[numTsk].uiSub[arguDom][nn] = tmpNum;
          }
        };  //end uiSubDom_num for loop (jj)
        
        /* no longer using check boxes; I have not yet implemented the new select box 
        for (jj=0; jj< uiSub_checkLen; jj++) {
          arguDom = av.sgr.uiSub_Check[jj];
          console.log('jj='+jj, '; av.nut['+numTsk+'].uiSub['+arguDom+']['+nn+']=', 'dom of', '|'+tsk+nn+arguDom+'|');
          console.log('; dom=',document.getElementById(tsk+nn+arguDom).checked ); 
          av.nut[numTsk].uiSub[arguDom][nn] = document.getElementById(tsk+nn+arguDom).checked;
        };
        */
       
        if (0 == nn) {
          if ('sgrBasic' == av.sgr.complexityLevel) { 
            av.nut[numTsk].uiSub.supplyTypeSlct[nn] = document.getElementById(tsk+'WsupplyTypeSlct').value;
          } else {
            av.nut[numTsk].uiSub.supplyTypeSlct[nn] = document.getElementById(tsk+'_supplyTypeSlct').value;
            if ('limited' == av.nut[numTsk].uiSub.supplyTypeSlct[nn].toLowerCase() ) {
              tmpNum = parseFloat(document.getElementById(tsk+'_supplyTypeSlct').value);
              if ( av.utl.isNumber(tmpNum) ) {
                av.nut[numTsk].resrc.inflowHi[nn] = tmpNum * av.nut.wrld.size;
              }
            }
          }
          //resource for this task is not global
        } else {
          av.nut[numTsk].uiSub['supplyTypeSlct'][nn] = document.getElementById(tsk+nn+'supplyTypeSlct').value;          
          av.nut[numTsk].uiSub['hiSide'][nn] = document.getElementById(tsk+nn+'hiSide').value;
        }

      };   //end for subDishes   

    };  //end for ii
    if (true) { 
      console.log('------------------------------------------------------------------ Now write nutrient structure --');
      av.nut_ui = {};
      av.nut_ui = JSON.parse(JSON.stringify(av.nut));
      console.log('av.nut_ui = ', av.nut_ui); 
      console.log('----------------------------------------------End of av.fwt.dom2nutUIfields, when called by ', from);
    }
  };
  //----------------------------------------------------------------------------------- End of av.fwt.dom2nutUIfields --

  //-------------------------------------------------------------------------------------- av.fwt.nutUI2cfgStructure  --
  // This function takes values in the uiAll and uiSub substructures and creates the data for the parameters that are 
  // needed to write the evironment file. Iniital and inflow amounts are per cell in the ui and total aount in the environment
  // in the RESOURCE and CELLS statements. 
  av.fwt.nutUI2cfgStructure = function (from) {
    //console.log(from, 'called av.fwt.nutUI2cfgStructure');
    //------ assign ui parameters first --
    var tsk; //name of a task with 3 letters
    var numTsk; //number prefix to put in Avida-ED order before 3 letter prefix
    var tskVar;  // avida uses variable length logic9 names
    var logiclen = av.sgr.logicNames.length;
    var tmpNum = 1;
    var regionLayout = '';
    var ndx = 1;
    var jj = 0;
    var react_arguLen = av.sgr.react_argu.length;
    console.log('world col, row, area=', av.nut.wrldCols, av.nut.wrldRows, av.nut.wrldSize);

    for (var ii=0; ii< logiclen; ii++) {      //9
      numTsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
      tsk = av.sgr.logicNames[ii];      //3 letter logic names
      tskVar = av.sgr.logicVnames[ii];   // variable length logic tasks names as required by Avida
      
      if ('global' == av.nut[numTsk].uiAll.geometry.toLowerCase() ) {
        jj = 0;
        av.nut[numTsk].resrc.geometry[jj] = av.nut[numTsk].uiAll.geometry;
        av.nut[numTsk].resrc.boxflag[jj] = false;

        // Start with default Avida-ED values for reactoins. re-writen with dictionary. 
        for (var ll = 0; ll < react_arguLen; ll++) {
          av.nut[numTsk].react[ av.sgr.react_argu[ll] ][jj] = av.sgr.reAct_edValu_d[av.sgr.react_argu[ll]];
        }
        //sconsole.log('av.nut['+numTsk+'].react', av.nut[numTsk].react);
        
        av.nut[numTsk].react.value[jj] = av.sgr.reactValues[ii];
        av.nut[numTsk].react.name[jj] = tsk+'000';
        av.nut[numTsk].react.task[jj] = tskVar;
        //console.log('numTsk =', numTsk,';  av.nut[numTsk].react=', av.nut[numTsk].react);

        //inflow and outflow coordinates are the same for most suppply Types
        av.nut[numTsk].resrc.inflowx1[jj] = 0;
        av.nut[numTsk].resrc.inflowy1[jj] = 0;
        av.nut[numTsk].resrc.outflowx1[jj] = 0;
        av.nut[numTsk].resrc.outflowy1[jj] = 0;

        av.nut[numTsk].resrc.inflowx2[jj] = av.nut.wrldCols-1;
        av.nut[numTsk].resrc.inflowy2[jj] = av.nut.wrldRows-1;
        av.nut[numTsk].resrc.outflowx2[jj] = av.nut.wrldCols-1;
        av.nut[numTsk].resrc.outflowy2[jj] = av.nut.wrldRows-1;
        
        //console.log('av.nut['+numTsk+'].uiAll.supplyTypeSlct=', av.nut[numTsk].uiAll.supplyTypeSlct);
        switch ( av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase() ) {
          case 'none':
            av.nut[numTsk].react.value[0] = 0;
            break;
          case 'unlimited':
            av.nut[numTsk].react.depletable[0] = 0;
            break;
          case 'limited':
            av.nut[numTsk].resrc.initial[jj] = av.nut[numTsk].uiAll.initialHiNp;
            av.nut[numTsk].react.resource[0] = tsk+'000';
            break;
          case 'chemostat': 
            av.nut[numTsk].react.resource[0] = tsk+'000';
            av.nut[numTsk].resrc.inflow[jj] = av.nut[numTsk].uiSub.inflowHiNp[jj]*av.nut.wrldSize;
            av.nut[numTsk].resrc.outflow[jj] = av.nut[numTsk].uiSub.outflowHiNp[jj];
            break;
        }
      }
      else {
        // 'Local' or 'grid'
        len = av.nut[numTsk].uiSub.regionCode.length;
        for (jj=1; jj< len; jj++) {
          // Start with default Avida-ED values for reactions. re-writen with dictionary. 
          for (var ll = 0; ll < react_arguLen; ll++) {
            av.nut[numTsk].react[ av.sgr.react_argu[ll] ][jj] = av.sgr.reAct_edValu_d[av.sgr.react_argu[ll]];
          };
          
          av.nut[numTsk].react.value[jj] = av.sgr.reactValues[ii];
          av.nut[numTsk].react.name[jj] = av.nut[numTsk].resrc.name[jj];
          av.nut[numTsk].react.resource[jj] = av.nut[numTsk].resrc.name[jj];
          av.nut[numTsk].react.task[jj] = tskVar;

          av.nut[numTsk].resrc.boxflag[jj] = true;
          av.nut[numTsk].resrc.geometry[jj] = av.nut[numTsk].uiAll.geometry.toLowerCase();
          av.nut[numTsk].resrc.name[jj] = tsk + av.nut[numTsk].uiSub.regionCode[jj]+'q';

          if (av.nut[numTsk].uiSub.diffuseCheck[jj]) {
            av.nut[numTsk].resrc.xdiffuse[jj] = 1;
            av.nut[numTsk].resrc.ydiffuse[jj] = 1;
          }
          else {
            av.nut[numTsk].resrc.xdiffuse[jj] = 0;
            av.nut[numTsk].resrc.ydiffuse[jj] = 0;            
          };
          //ndx = av.sgr.regionQuarterNames.indexOf(av.nut[numTsk].uiSub.regionName[jj]);
          
          //inflow and outflow coordinates are the same for most suppply Types
          av.nut[numTsk].resrc.inflowx1[jj] = av.nut[numTsk].resrc.boxx[jj];
          av.nut[numTsk].resrc.inflowy1[jj] = av.nut[numTsk].resrc.boxy[jj];
          av.nut[numTsk].resrc.outflowx1[jj] = av.nut[numTsk].resrc.boxx[jj];
          av.nut[numTsk].resrc.outflowy1[jj] = av.nut[numTsk].resrc.boxy[jj];
          
          av.nut[numTsk].resrc.inflowx2[jj] = av.nut[numTsk].resrc.boxx[jj]+av.nut[numTsk].resrc.boxcol[jj]-1;
          av.nut[numTsk].resrc.inflowy2[jj] = av.nut[numTsk].resrc.boxy[jj]+av.nut[numTsk].resrc.boxrow[jj]-1;
          av.nut[numTsk].resrc.outflowx2[jj] = av.nut[numTsk].resrc.boxx[jj]+av.nut[numTsk].resrc.boxcol[jj]-1;
          av.nut[numTsk].resrc.outflowy2[jj] = av.nut[numTsk].resrc.boxy[jj]+av.nut[numTsk].resrc.boxrow[jj]-1;
          
          av.nut[numTsk].react.resource[jj] = tsk+av.nut[numTsk].uiSub.regionCode[jj]+'q';
          av.nut[numTsk].react.name[jj] = tsk+av.nut[numTsk].uiSub.regionCode[jj]+'q';
          
          //console.log('numTsk='+numTsk, 'sub='+jj, 'x2=', av.nut[numTsk].resrc.inflowx2[jj],
          //   'y2=', av.nut[numTsk].resrc.inflowy2[jj]);
          //av.nut[numTsk].resrc.inflow[jj] = av.nut[numTsk].uiSub.[jj];
          
          console.log('av.nut['+numTsk+'].uiSub.supplyTypeSlct['+jj+']=', av.nut[numTsk].uiSub.supplyTypeSlct[jj]);
          switch ( av.nut[numTsk].uiSub.supplyTypeSlct[jj].toLowerCase() ) {
            case 'unlimited':
              av.nut[numTsk].react.depletable[jj] = 0;
              av.nut[numTsk].cell.initial[jj] = 10;
              break;
            case 'limited':
              av.nut[numTsk].cell.resource[jj] = av.nut[numTsk].resrc.name[jj];
              av.nut[numTsk].cell.initial[jj] = Math.round(av.nut[numTsk].uiSub.initialHiNp[jj],0);
              break;
            case 'none':
              av.nut[numTsk].cell.resource[jj] = av.nut[numTsk].resrc.name[jj];
              av.nut[numTsk].cell.initial[jj] = 0;
              break;
            case 'chemostat': 
              av.nut[numTsk].resrc.inflow[jj] =  Math.round(av.nut[numTsk].uiSub.inflowHiNp[jj] * av.nut[numTsk].uiSub.area[jj]);
              av.nut[numTsk].resrc.outflow[jj] = av.nut[numTsk].uiSub.outflowHiNp[jj];
//              av.nut[numTsk].resrc.[jj] = av.nut[numTsk].uiSub.[jj];
              //console.log('av.nut['+numTsk+'].resrc.inflow['+jj+']=', av.nut[numTsk].resrc.inflow[jj], '; av.nut['+numTsk+'].resrc.outflow['+jj+']=', av.nut[numTsk].resrc.outflow[jj]);
              break;
          }
        }  // for go thru array of subregions in grid; 
      };  // end global else grid
      //console.log('av.nut['+numTsk+'].react.value=', av.nut[numTsk].react.value);
    }  //end for loop to go thru all sugars
    if (true) { 
      console.log('---------------------------------------------- Value of nutrient structure at this time.');
      av.nut_ui_cfg = {};
      av.nut_ui_cfg = JSON.parse(JSON.stringify(av.nut));
      console.log('av.nut_ui_cfg = ', av.nut_ui_cfg); 
      console.log('----------------------------------------------End of av.fwt.nutUI2cfgStructure, when called by ', from);
    };
  };
  //---------------------------------------------------------------------------------------- end nutUI2cftParameters  --

  //--------------------------------------------------------------------------------------------- av.fwt.nut2cfgFile  --
  av.fwt.nut2cfgFile = function (idStr, toActiveConfigFlag, from) {
    var tsk, tskVar, numTsk, resrcFix, cellboxtxt, cellTxt, cellList, ndx, codeTxt, reactTxt;
    var logicLen = av.sgr.logicNames.length;
    var tmpNum = 0;
    var jj=0;
    var cbeg = 0; 
    var cend = av.nut.wrldSize-1;
    var wcol = parseInt(av.nut.wrldCols);
    var wrow = parseInt(av.nut.wrldRows);
    var boxx=0, boxy=0, bcol=parseInt(av.nut.wrldCols), brow=parseInt(av.nut.wrldRows);
    console.log('-----------------', from, 'called av.fwt.nut2cfgFile: toActiveConfigFlag=', toActiveConfigFlag, '; cellEnd=', cend, 'logicLen=',logicLen);

    var txt = '\n';
    txt += '# Environment.cfg file for Avida-ED 4: guidelines for hand editing.\n';
    txt += '\n';
    txt += '# environment.cfg for information is at https://github.com/devosoft/avida/wiki/Environment-file  \n';
    txt += '# \n';
    txt += '# A "name-set" are the set of statements that all use the same resource name. For Avida-ED the REACTION name should match as well. \n';
    txt += '# name and the reaction name should match as well. Each nam set may contatin:\n';
    txt += '#    RESCOURCE   \n';
    txt += '#      - must be the first line of the name-set for Avida-ED\n';
    txt += '#      - describes the resouce \n';
    txt += '#      - defines boundaries for inflow and outflow \n';
    txt += '#      - sets diffusion on or off \n';
    txt += '#      - needed for all sub-region resources \n';
    txt += '#      - grid position is based on two dimensional representation where (0,0) is uppper left corner \n';
    txt += '#    CELL \n';
    txt += '#      - requires a RESOURCE statement \n';
    txt += '#      - defines boundaries for initial so needed for Limited\n';
    txt += '#      - also used to define gradient resources \n';
    txt += '#      - may have zero or more CELL statements in each name-set \n';
    txt += '#      - are not named but must have matcing resource name \n';
    txt += '#      - grid position are based on a one dimensional array from 0 to world size - 1 \n';
    txt += '#      - \n';
    txt += '#    REACTION \n';
    txt += '#      - needed for there to be any effect on Avians\n';
    txt += '#      - defines tsk needed and the effect \n';
    txt += '#      - no matching RESOURCE statement:\n';
    txt += '#      - - when there is no resouce name is stated or there is no matching RESOURCE statement.\n';
    txt += '#      - - must be none or unlimited;\n';
    txt += '#      - - must be glogal \n';
    txt += '#      - - could act as "none" even for  global/local or a subregion even if not technically correct\n';
    txt += '#      - matching RESOURE statement found \n';
    txt += '#      - - can be global or local; can be any resource option \n';
    txt += '#      - can be either global or limited (grid) if a RESOURCE is specieifed. \n';
    txt += '#\n';
    txt += '# Summary: There must be a REACTION STATEMENT to effect an avidian\n';
    txt += '#    RESOURCE statement must be first line for each name-set if there is a RESOURCE statement \n';
    txt += '# \n';
    txt += '\n';
    
    for (var ii=0; ii< logicLen; ii++) {      //9
      numTsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
      tsk = av.sgr.logicNames[ii];      //3 letter logic names
      tskVar = av.sgr.logicVnames[ii];   // variable length logic tasks names as required by Avida
      //console.log('numTsk=', numTsk, '; tsk=', tsk, '; tskVar=', tskVar, 'uiAll.geometry=', av.nut[numTsk].uiAll.geometry.toLowerCase());
      av.nut.resrcTyp[ii] = av.sgr.typeDefault;
/*
//      if ('nor' == tsk) {
        if (false) {
        txt += 'RESOURCE nor000q:geometry=grid:xdiffuse=0:ydiffuse=0\n';
        txt += 'CELL nor000q:0..39:initial=40\n';
        txt += 'CELL nor000q:40..79:initial=80\n';
        txt += 'CELL nor000q:80..119:initial=120\n';
        txt += 'CELL nor000q:120..159:initial=160\n';
        txt += 'CELL nor000q:160..199:initial=200\n';
        txt += 'CELL nor000q:200..239:initial=240\n';
        txt += 'CELL nor000q:240..279:initial=280\n';
        txt += 'CELL nor000q:280..319:initial=320\n';
        txt += 'CELL nor000q:320..359:initial=360\n';
        txt += 'CELL nor000q:360..399:initial=400\n';
        txt += 'REACTION nor000q  nor process:resource=nor000q:value=4:type=pow requisite:max_count=1\n\n';
      }
      else if (false) {
        txt += 'RESOURCE nor013q:geometry=grid:xdiffuse=0:ydiffuse=0:inflow=128:outflow=0.04:';
        txt += 'inflowX1=0:inflowY1=0:inflowX2=19:inflowY2=19:cellbox=0,0,20,20:';
        txt += 'outflowX1=0:outflowY1=0:outflowX2=19:outflowY2=19\n';
        txt += 'RESOURCE nor013q:geometry=grid:xdiffuse=0:ydiffuse=0:inflow=144:outflow=0.04:';
        txt += 'inflowX1=20:inflowY1=0:inflowX2=39:inflowY2=19:cellbox=20,0,20,20:';
        txt += 'outflowX1=20av:outflowY1=0:outflowX2=39:outflowY2=19\n';
        txt += 'REACTION  nor013q xor  process:resource=nor013q:value=2.0:type=pow:min=0.9:max=1 requisite:max_count=1\n';
      }
      else {
*/    if (true) {     

      if ('global' == av.nut[numTsk].uiAll.geometry.toLowerCase()) {
        jj = 0;
        tmpNum = 1;
        //console.log('numTsk=', numTsk, '; jj=', jj, '; supplyTypeSlct=', av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase());
        txt += '# Task = '+ numTsk + '; Geometry = ' + av.nut[numTsk].uiAll.geometry + '; supplyTypeSlct = '+  av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase() + '\n';
        av.nut.resrcTyp[ii] = av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase();
        switch ( av.nut[numTsk].uiAll.supplyTypeSlct.toLowerCase() ) {
          case 'none':
            tmpNum = 0;
          case 'unlimited':
            txt += 'REACTION ' + av.fwt.existCheck( '',av.nut[numTsk].react.name[jj],tskVar );
            txt += ' ' + av.fwt.existCheck( '',av.nut[numTsk].react.task[jj], tskVar );
            //console.log('av.nut['+numTsk+'].react.value['+jj+']=', av.nut[numTsk].react.value[jj]);
            txt += ' process' + av.fwt.existCheck( ':value=', av.nut[numTsk].react.value[jj], tmpNum);
            txt += av.fwt.existCheck( ':type=', av.nut[numTsk].react.type[jj], ':type=pow' );
            txt += av.fwt.existDfltCheck( ':depletable=', av.nut[numTsk].react.depletable[jj], '', 1 );
            txt += ' requisite' + av.fwt.existCheck(':max_count=', av.nut[numTsk].react.max_count[jj], ':max_count=1') + '\n\n';
            break;
          case 'limited':
            txt += 'RESOURCE ' + av.fwt.existCheck('', av.nut[numTsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numTsk].react.resource[jj], tsk) );
            txt += av.fwt.existCheck(':geometry=', av.nut[numTsk].resrc.geometry[jj], '');
            // Since fileDataRead looks for initial to see if the catagory is limited, 
            // initial needs to be in the file even if it is the default value = 0
            tmpNum = parseFloat(av.nut[numTsk].resrc.initial[jj]) * av.nut.wrldSize;
            txt += av.fwt.existCheck(':initial=', tmpNum, '')+ '\n'; 
            
            // Reaction is the same for limited and chemostat
            txt += 'REACTION ' + av.nut[numTsk].react.name[jj] + ' ' + av.nut[numTsk].react.task[jj];
            txt += ' process:resource='+av.nut[numTsk].react.resource[jj]+':value=' + av.nut[numTsk].react.value[jj];
            txt +=':type=' + av.nut[numTsk].react.type[jj]+':min='+av.nut[numTsk].react.max[jj]+':max='+av.nut[numTsk].react.max[jj];
            txt += ' requisite:max_count=' + av.nut[numTsk].react.max_count[jj] + '\n\n';
            break;
          case 'chemostat': 
            txt += 'RESOURCE ' + av.fwt.existCheck('', av.nut[numTsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numTsk].react.resource[jj], tsk) );
            txt += av.fwt.existCheck(':geometry=', av.nut[numTsk].resrc.geometry[jj], '');
            //console.log('inflow=', parseFloat(av.nut[numTsk].resrc.inflow[jj]) );
            txt += av.fwt.existCheck(':inflow=', parseFloat(av.nut[numTsk].resrc.inflow[jj]), ':inflow=' + av.nut.wrldSize);
            txt += av.fwt.existCheck(':outflow=', av.nut[numTsk].resrc.outflow[jj], ':outflow=0.5')  + '\n';
            //console.log('numTsk=', numTsk, '; inflow=', tmpNum, '; outflow=', av.nut[numTsk].resrc.outflow[jj]);
                        
            // Reaction is the same for limited and chemostate
            txt += 'REACTION ' + av.nut[numTsk].react.name[jj] + ' ' + av.nut[numTsk].react.task[jj];
            txt += ' process:resource='+av.nut[numTsk].react.resource[jj]+':value=' + av.nut[numTsk].react.value[jj];
            txt +=':type=' + av.nut[numTsk].react.type[jj]+':min='+av.nut[numTsk].react.min[jj]+':max='+av.nut[numTsk].react.max[jj];
            txt += ' requisite:max_count=' + av.nut[numTsk].react.max_count[jj] + '\n';
/*
            // Reaction is the same for limited and chemostate
            txt += 'REACTION ' + av.fwt.existCheck( '',av.nut[numTsk].react.name[jj],tskVar );
            txt += ' ' + av.fwt.existCheck( '',av.nut[numTsk].react.task[jj], tskVar );
            txt += ' process' + av.fwt.existCheck( ':value=', av.nut[numTsk].react.value[jj], '');
            txt += av.fwt.existCheck( ':type=', av.nut[numTsk].react.type[jj], ':type=pow' );
            txt += av.fwt.existDfltCheck( ':depletable=', av.nut[numTsk].react.depletable[jj], '', 1 );
            txt += av.fwt.existCheck(' requisite:max_count=', av.nut[numTsk].react.max_count[jj], ' requisite:max_count1'+av.sgr.reactValues[ii]);
*/
            txt += '\n';
            break;
        };  //end switch
        // initialize Resource data table. 
        
      } else {
        // geometery = grid (local in Avida-ED = grid in avida)
        len = av.nut[numTsk].uiSub.regionCode.length;
        for (jj=1; jj< len; jj++) {
          resrcFix =  'RESOURCE ' + av.fwt.existCheck('', av.nut[numTsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numTsk].react.resource[jj], tsk) );
          resrcFix += av.fwt.existCheck(':geometry=', av.nut[numTsk].resrc.geometry[jj], 'grid');
          resrcFix += av.fwt.existDfltCheck(':xdiffuse=', av.nut[numTsk].resrc.xdiffuse[jj], 0, 1); 
          resrcFix += av.fwt.existDfltCheck(':ydiffuse=', av.nut[numTsk].resrc.ydiffuse[jj], 0, 1);

          cellboxtxt = '';
          boxx = parseInt(av.nut[numTsk].resrc.boxx[jj]);
          boxy = parseInt(av.nut[numTsk].resrc.boxy[jj]);
          bcol = parseInt(av.nut[numTsk].resrc.boxcol[jj]);
          brow = parseInt(av.nut[numTsk].resrc.boxrow[jj]);
          console.log('boxx=', boxx, '; boxy=', boxy, '; bcol=', bcol, '; brow=', brow, '; wcol=', wcol, 'wrow=', wrow);
          if (av.utl.isNumber(boxx) && av.utl.isNumber(boxy) && av.utl.isNumber(bcol) && av.utl.isNumber(brow) ) {
          //if ( (null != av.nut[numTsk].resrc.boxflag[jj]) && (null != av.nut[numTsk].resrc.boxx[jj]) 
          //  && (null != av.nut[numTsk].resrc.boxy[jj]) && (null != av.nut[numTsk].resrc.boxcol[jj]) 
          //  && (null != av.nut[numTsk].resrc.boxrow[jj]) ) {
            if (av.nut[numTsk].resrc.boxflag[jj]) {
              cellboxtxt += ':cellbox=' + boxx + ',' + boxy + ',' + bcol + ',' + brow;
            }
          };
          //console.log('cellboxtxt=', cellboxtxt);
          if (0 != parseInt(av.nut[numTsk].uiSub.regionCode)) {
            resrcFix = resrcFix + cellboxtxt;
          }            
          
          //console.log('av.nut['+numTsk+'].resrc.name['+jj+']=', av.nut[numTsk].resrc.name[jj], '; av.nut['+numTsk+'].react.resource['+jj+']=', av.nut[numTsk].react.resource[jj], 'tsk=', tsk);
          cellTxt = 'CELL ' + av.fwt.existCheck('', av.nut[numTsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numTsk].react.resource[jj], tsk) );
          
          //Find cell description
          codeTxt = av.nut[numTsk].uiSub.regionCode[jj];
          ndx = av.sgr.regionQuarterCodes.indexOf(codeTxt);
          cellList = ':';
          //lineararray index = x + y * (numcols)
          if ('000' == codeTxt || '012' == codeTxt || '034' == codeTxt) {
            //subdish includes entire rows so it is easier to define. 
            cbeg = Number(av.nut[numTsk].resrc.inflowx1[jj]) +
                      Number(av.nut[numTsk].resrc.inflowy1[jj]) * wcol;
            cend = Number(av.nut[numTsk].resrc.inflowx2[jj]) +
                      Number(av.nut[numTsk].resrc.inflowy2[jj]) * wcol;
            cellList = ':' + Math.floor(cbeg) + '..' + Math.floor(cend);
            //console.log('inx1=', Number(av.nut[numTsk].resrc.inflowx1[jj]), 'iny1=', Number(av.nut[numTsk].resrc.inflowy1[jj])
            //          , 'inx2=', Number(av.nut[numTsk].resrc.inflowx2[jj]), 'iny2=', Number(av.nut[numTsk].resrc.inflowy2[jj])  
            //          , 'wld=',  Number(av.nut.wrldCols), '; cellBeg=', cellBeg, '; cellEnd=', cellEnd);
            //console.log('cellList=', cellList);
          }
          else {
            //Need to find cell list in parts for half rows
            //This is wrong as I think it only gives the first row of list in that region
            var cii = 0;
            var cbeg, cend;
            for ( cii = 0; cii < brow; cii++) {
              if (0  < cii) { cellList += ',';}
              cbeg = boxx + boxy * wcol + cii * wcol;
              cend = cbeg + bcol - 1;
              cellList += Math.floor(cbeg) + '..' + Math.floor(cend);  //each row;
            };
/*
           for ( bx = boxx; bx < boxy+brow; bx++) {
              cellBeg = boxx + boxy * Number(av.nut.wrldCols);
              cellEnd = cellBeg + bcol-1;
              //console.log('boxx=', bbox, '; boxy=', boxy, '; wldCols=', Number(av.nut.wrldCols) );
              cellList += Math.floor(cellBeg) + '..' + Math.floor(cellEnd);  //this is just the first row
            }
*/
          };
          //console.log('cellList=', cellList);
          cellTxt += cellList;
          tmpNum = Number(av.nut[numTsk].cell.initial[jj]);
          if (av.utl.isNumber( tmpNum) )  {
            cellTxt += av.fwt.existCheck( ':initial=', Math.round(tmpNum).toString(), tmpNum )+ '\n'; 
            
          } 
          else {
            tmpNum = Number(av.nut[numTsk].resrc.initial[jj]);
            if (av.utl.isNumber( tmpNum) )  {
              cellTxt += av.fwt.existCheck( ':initial=', Math.round(tmpNum).toString(), tmpNum )+ '\n'; 
              //console.log('tmpnum is a number: cellTxt=', cellTxt);
            }
            else if ('none' == av.nut[numTsk].uiSub.supplyTypeSlct[jj].toLowerCase()) {
              cellTxt += ':initial=0\n'; 
              //console.log('none: cellTxt=', cellTxt);

            }
            else if ('unlimited' == av.nut[numTsk].uiSub.supplyTypeSlct[jj].toLowerCase()) {
                cellTxt += av.fwt.existCheck( ':initial=', Math.round(), 10 )+ '\n'; 
                //console.log('should never reach this location: cellTxt=', cellTxt);
            }
            else {
              cellTxt += ':initial=14400\n';
              //console.log('else cellTxt=', cellTxt);
            }
          };
          
          reactTxt = 'REACTION ' + av.fwt.existCheck( '',av.nut[numTsk].react.name[jj],tskVar );
          reactTxt += ' ' + av.fwt.existCheck( '',av.nut[numTsk].react.task[jj], tskVar );
          reactTxt += ' process' + av.fwt.existCheck( ':resource=', av.nut[numTsk].react.resource[jj], '');
          reactTxt += av.fwt.existCheck( ':value=', av.nut[numTsk].react.value[jj], '');
          reactTxt += av.fwt.existCheck( ':type=', av.nut[numTsk].react.type[jj], ':type=pow' );
          reactTxt += av.fwt.existDfltCheck( ':depletable=', av.nut[numTsk].react.depletable[jj], '', 1 );
          //console.log('av.nut['+numTsk+'].react.depletable['+jj+']=', av.nut[numTsk].react.depletable[jj]);
          reactTxt += av.fwt.existCheck(' requisite:max_count=', av.nut[numTsk].react.max_count[jj], ' requisite:max_count1'+av.sgr.reactValues[ii]);
          reactTxt += '\n\n';

          //console.log('numTsk=', numTsk, '; jj=', jj, '; supplyTypeSlct=',av.nut[numTsk].uiSub.supplyTypeSlct[jj].toLowerCase());
          txt += '# Task = '+ numTsk + '; Geometry = ' + av.nut[numTsk].uiAll.geometry + '; supplyTypeSlct = '+  av.nut[numTsk].uiSub.supplyTypeSlct[jj].toLowerCase() + '\n';
          switch ( av.nut[numTsk].uiSub.supplyTypeSlct[jj].toLowerCase() ) {
            case 'unlimited':
              txt += resrcFix + '\n';
              txt += cellTxt;
              txt += reactTxt;
              //console.log('resrcFix=', resrcFix);
              break;
            case 'none':
              av.nut.resrcTyp[ii] = 'none';
            case 'limited':
              av.nut.resrcTyp[ii] = 'limited';
              txt += resrcFix + '\n';
              txt += cellTxt;
              txt += reactTxt;
              //console.log('resrcFix=', resrcFix);
              break;
            case 'chemostat': 
              av.nut.resrcTyp[ii] = 'chemosat';
              txt += 'RESOURCE ' + av.fwt.existCheck('', av.nut[numTsk].resrc.name[jj], av.fwt.existCheck('', av.nut[numTsk].react.resource[jj], tsk) );
              txt += av.fwt.existCheck(':geometry=', av.nut[numTsk].resrc.geometry[jj], '');
              // Since fileDataRead looks for inflow/outflow to see if the catagory is chemostat, 
              // initial must not exist in file
              txt += av.fwt.existCheck(':inflow=', av.nut[numTsk].resrc.inflow[jj], ':inflow='+av.nut.wrldSize); 
              txt += av.fwt.existCheck(':outflow=', av.nut[numTsk].resrc.outflow[jj], ':outflow=0.5'); 
              txt += av.fwt.existCheck(':inflowx1=', av.nut[numTsk].resrc.inflowx1[jj], ':inflowx1=0' ); 
              txt += av.fwt.existCheck(':inflowy1=', av.nut[numTsk].resrc.inflowy1[jj], ':inflowy1=0' ); 
              txt += av.fwt.existCheck(':inflowx2=', av.nut[numTsk].resrc.inflowx2[jj], ':inflowx2='+(av.nut.wrldCols-1)); 
              txt += av.fwt.existCheck(':inflowy2=', av.nut[numTsk].resrc.inflowy2[jj], ':inflowy2='+(av.nut.wrldRows-1) ); 

              txt += av.fwt.existCheck(':outflowx1=', av.nut[numTsk].resrc.outflowx1[jj], ':outflowx1=0' ); 
              txt += av.fwt.existCheck(':outflowy1=', av.nut[numTsk].resrc.outflowy1[jj], ':outflowy1=0' ); 
              txt += av.fwt.existCheck(':outflowx2=', av.nut[numTsk].resrc.outflowx2[jj], ':outflowx2='+(av.nut.wrldCols-1)); 
              txt += av.fwt.existCheck(':outflowy2=', av.nut[numTsk].resrc.outflowy2[jj], ':outflowy2='+(av.nut.wrldRows-1) ); 

              txt += av.fwt.existDfltCheck(':xdiffuse=', av.nut[numTsk].resrc.xdiffuse[jj], 0, 1); 
              txt += av.fwt.existDfltCheck(':ydiffuse=', av.nut[numTsk].resrc.ydiffuse[jj], 0, 1); 
              txt += '\n';
              txt += reactTxt;

              // Reaction is the same for limited and chemostate
              break;
          }; // end of switch
        }; // end loop through array of each resource/reaction instance
      };  // end of else geometry=grid
     };   // end of else based on if to run some test code
     txt += '#-----\n'; 
    };  // end of looping through each sugar
    
    
    console.log('-------------------------------------- End of av.fwt.nut2cfgFile -------------------------------');
    
    if (toActiveConfigFlag) av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.nut2cfgFile');
    else {av.fwt.makeFzrFile(idStr+'/environment.cfg', txt, 'av.fwt.nut2cfgFile');}

  };
  //----------------------------------------------------------------------------------------- end av.fwt.nut2cfgFile  --

  /*----------------------------------------------------------------------------------- av.fwt.makeFzrEnvironmentTest --*/
  av.fwt.makeFzrEnvironmentTest = function (idStr, from) {
    'use strict';
    if (av.debug.fio) console.log(from, 'called av.fwt.makeFzrEnvironmentTest');

    var txt = av.dom.environConfigEdit.value;

    if (true) {av.fwt.makeActConfigFile('environment.cfg', txt, 'av.fwt.makeFzrEnvironmentTest');}
    else  { av.fwt.makeFzrFile(idStr+'/environment.cfg', txt, 'av.fwt.makeFzrEnvironmentTest');}
  };

  /*-------------------------------------------------------------------------------------- av.fwt.makeFzrAncestorAuto --*/

  av.fwt.makeFzrAncestorAuto = function (idStr, toActiveConfigFlag, from) {
    'use strict';
    if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrAncestorAuto: idStr=', idStr, '; toActiveConfigFlag=', toActiveConfigFlag);
    var txt = '';
    var lngth = av.parents.autoNdx.length;
    for (var ii = 0; ii < lngth; ii++) {
      txt += av.parents.name[av.parents.autoNdx[ii]] + '\n';
      txt += av.parents.genome[av.parents.autoNdx[ii]] + '\n';
    }
    if (toActiveConfigFlag) {av.fwt.makeActConfigFile('ancestors.txt', txt, 'av.fwt.makeFzrAncestorAuto');}
    else {av.fwt.makeFzrFile(idStr+'/ancestors.txt', txt), 'av.fwt.makeFzrAncestorAuto';}
  };

  /*-------------------------------------------------------------------------------------- av.fwt.makeFzrAncestorHand --*/
  av.fwt.makeFzrAncestorHand = function (idStr, toActiveConfigFlag, from) {
    'use strict';
    //if (av.debug.fio) console.log(from, ' called av.fwt.makeFzrAncestorHand: idStr=', idStr, '; toActiveConfigFlag=', toActiveConfigFlag);
    var txt = '';
    var lngth = av.parents.handNdx.length;
    for (var ii = 0; ii < lngth; ii++) {
      txt += av.parents.name[av.parents.handNdx[ii]] + '\n';
      txt += av.parents.genome[av.parents.handNdx[ii]] + '\n';
      txt += av.parents.col[av.parents.handNdx[ii]] + ',' + av.parents.row[av.parents.handNdx[ii]] + '\n';
    }
    if (toActiveConfigFlag) {av.fwt.makeActConfigFile('ancestors_manual.txt', txt, 'av.fwt.makeFzrAncestorHand');}
    else {av.fwt.makeFzrFile(idStr+'/ancestors_manual.txt', txt, 'av.fwt.makeFzrAncestorHand');}
  };
