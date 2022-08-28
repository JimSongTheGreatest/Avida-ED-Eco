
//
// Defaults and Constants
// one global to hold them all.
var av = av || {};  //incase av already exists

//console.log('start of globals on 2021_310_04:22 Thurs');
console.log('start of globals on 2022_121_Fri');

Number.prototype.pad = function(size) {
  var ss = String(this);
  while (ss.length < (size || 2)) {ss = "0" + ss;}
  return ss;
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

//av.debug flags
av.debug = {};
av.debug.alo = false; //analysis page layout
av.debug.anl = false;  //analysis page
av.debug.bool = false;  //av.debug statements that look for errors outlining logic functions
av.debug.dnd = false;  //debug statements about dojo dnd
av.debug.fio = false;  // file input/output; fio, read, write
av.debug.fzr = false;  // statements about freezer
av.debug.grid = false;  //population grid
av.debug.ind = false;  //oranism page
av.debug.msg = false;  //messages to and from avida
av.debug.popCon = false;  //population Controls
av.debug.trace = false;  //organism page
av.debug.uil = false; //user interface layout.
av.debug.userMsg = false; //debug of user messages.

av.dbg = {};
av.dbg.flg = {}; 
av.dbg.flg.divsize = false;
av.dbg.flg.drg = false;   // used for dragula relate code
av.dbg.flg.dsz = false;   //div size; used to eliminate scroll bars
av.dbg.flg.frd = false;  //reading file text strings
av.dbg.flg.mouse = false;  //av.debug statements about non-dojo drag and drop
av.dbg.flg.nut = false;  //processing nutrients (sugars) for the new new structures related to ecology (resources/reactions/sugars/logic functions
av.dbg.flg.nutSum = false; //summary for each function when processing environment.cfg for sugar user interace
av.dbg.flg.plt = false;  //analysis plot 
av.dbg.flg.pch = false;  //popChart and analysis
av.dbg.flg.popSetup = false;
av.dbg.flg.root = false;  //statements that look for failers when the code executes outside of functions
av.debug.usr = ''; //working on log for user actions.

av.post = {};
av.post.addUser = function(addStr, comment) {
  "use strict";
  var note = comment === undefined ? '' : comment;
  av.debug.log += '\n--usr: ' + addStr + ' ~.~ ' + note;
  if (av.debug.usr) {console.log('usr: ' + addStr + note);}
};

av.post.usrOneline = function (data, comment) {
  "use strict";
  var note = comment === undefined ? '' : comment;
  av.debug.log += '\n--usr: ' + '~|~' + JSON.stringify(data) + ' ~.~ ' + note;
};

av.post.usrOut = function (jStr, comment) {
  "use strict";
  var note = comment === undefined ? '' : ' ' + comment;
  var str0 = JSON.stringify(jStr, null, 2);
  var str1 = '~|~' + str0.replace(/\\n/g, "\n") + '~.~' + note;
  av.debug.log += '\n--usr: ' + '~|~' + str0.replace(/\\n/g, "\n") + '~.~' + note;
};

//initialize globals needed to hold Organism Trace Data
var traceObj = {}; //global that holds the traceObject that was sent from Avida

//initialize gen (genome) object. Used in organism view
av.ind = {};
av.ind.cycle = 0;
av.ind.update_timer = null;
av.ind.labeled = [];
av.ind.bitboxwd = 6;   //x direction
av.ind.bitboxht = 6;   //y direction
for (ii=0; ii <101; ii++) { av.ind.labeled[ii] = false;}

av.aww = {}; //avida web worker
av.aww.uiWorker = null;

av.msg = {}; //holds functions to send messages between the ui and Avida (web worker)
av.msg.uiReqestedReset = false;
av.msg.setupType = 'normal';

//http://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
// please note,
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// and new IE Edge outputs to true now for window.chrome
// so use the below updated condition

av.ui = {};  //user interface functions and variables
av.ui.sendEmailFlag = true;
av.ui.popStatFlag = true;  //flag that determines if the stats panel is visible.
av.ui.orgStatFlag = true;  //flag that determines if the stats panel is visible.
av.ui.orgInfoHolderMinWidth = 250; //need to cross check with orgInfoHolder in avidaEdEco.css
av.ui.orgInfo = 'details';   //settings is the other option
av.ui.beginFlag = true;
av.ui.oneUpdateFlag = false;
av.ui.lftSidePnlShowing = true;
av.ui.version = '4.0.16 Beta';
av.debug.log = '';
av.debug.log = '--hed: message and error log: Version:' + av.ui.version;
av.debug.triggered = 'unknown';

av.ui.page = 'populationBlock';
av.ui.subpage = 'Data';
av.ui.autoStopFlag = false;
av.ui.autoStopValue = 987654321;
//used in adjusting size of areas on population page
av.ui.gridHolderSideBuffer = 0;
av.ui.popGridCtlWdMin = 380;   //was 430
av.ui.rightInfoHolderMinWd = 338;
av.ui.navColIdMinWd = 152;

//not really ui, but not sure where to put them
av.ui.num = 0;   //tenporary holder for a number;
av.ui.numTxt = '';
av.msg.avidaReady = false;
av.ui.loadOK = false;  //av.ui.loadOK is set true when the application has been loaded.
av.ui.showOutlineFlag = false;

//----------------------------------------------- finding the browser and opperating system ----------------------------
//http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
av.brs = {};  //browser and operating system data
av.brs.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
av.brs.isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+: "[object HTMLElementConstructor]"
av.brs.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Internet Explorer 6-11
av.brs.isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
av.brs.isEdge = !av.brs.isIE && !!window.StyleMedia;
// Chrome 1+
av.brs.isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
av.brs.isBlink = (av.brs.isChrome || av.brs.isOpera) && !!window.CSS;

//----------------------------------------------------------------------------------------------------------------------
av.brs.found = 0;
if (av.brs.isOpera) {
  av.debug.log += '\n     Browser is Opera';
  av.brs.found++;
  av.brs.browser = 'Opera';
  av.debug.log += '\n     Browser is Opera';
};
if (av.brs.isFirefox) {
  av.brs.found++;
  av.brs.browser = 'Firefox';
  av.debug.log += '\n     Browser is Firefox';
}
if (av.brs.isSafari) {
  av.brs.found++;
  av.brs.browser = 'Safari';
  av.debug.log += '\n     Browser is Safarli';
}
if (av.brs.isIE) {
  av.brs.found++;
  av.brs.browser = 'IE';
  av.debug.log += '\n     Browser is IE';
}
if (av.brs.isEdge) {
  av.brs.found++;
  av.brs.browser = 'Edge';
  av.debug.log += '\n     Browser is Edge';
}
if (av.brs.isChrome) {
  av.brs.found++;
  av.brs.browser = 'Chrome';
  av.debug.log += '\n     Browser is Chrome';
}
if (av.brs.isBlink) {
  av.brs.found++;
  av.brs.browser = 'Blink';
  av.debug.log += '\n     Browser is Blink';
}
if (0 === av.brs.found) {
  av.brs.browser = 'not found';
  av.debug.log += '\n     Browser is not found';
}

//----------------------------------------------------------------------------------------------------------------------

//console.log('window.navigator',window.navigator);
// if (av.dbg.flg.root) { console.log('Root: brs', av.brs); }
// if (av.dbg.flg.root) { console.log('Root: browser info: window.navigator.userAgent=', window.navigator.userAgent); }
//----------------------------------------------------------------------------------------------------------------------

av.utl = {};  // holds utility functions

av.fwt = {}; // file data write
av.frd = {}; // file data read
av.fio = {}; //file input output data
av.fio.dbName = 'wsdb';  //for workspace database
//av.fio.wsdb = null;
av.fio.defaultFname = 'default.avidaWs.zip';
//av.fio.defaultFname = 'default.avidaedworkspace.zip';
av.fio.fileReadingDone = false;
//av.fio.defaultUserFname = 'avidaWS.avidaedworkspace.zip';
av.fio.defaultUserFname = 'avidaWS.avidaWs.zip';
av.fio.userFname = av.fio.defaultUserFname;
av.fio.csvFileName = 'avidaDataRecorder.csv';
av.fio.useDefault = true;
av.fio.mailAddress = 'Avida-ED-development@googlegroups.com';  //'mailto:diane.blackwood@gmail.com'

av.dnd = {};  //details in AvidiaEd.js as it access the DOM
av.dnd.configFlag = 'normal';
av.dnd.move = {};  //used to hold data needed for dnd type move.

// replacement for dndSection.map
av.dnd.containerMap = {};
// example av.dnd.containerMap access: av.dnd.containerMap['#fzConfig']['test 0']
// The first key contains '#' or '.'. Second key doesn't.


av.ptd = {};  // on population page that are not part of the grid. (PeTri Dish)
av.ptd.logicButtons = ['notButton', 'nanButton', 'andButton', 'ornButton', 'oroButton', 'antButton', 'norButton', 'xorButton', 'equButton'];
av.ptd.rightInfoHolderWd = 395;

//structure to hold list of ancestor organisms
av.parents = {};
//Clear parents/Ancestors
av.parents.clearParentsFn = function () {
  av.parents.name = [];
  av.parents.injected = [];   //Has it been injeccted?
  av.parents.genome = [];
  av.parents.color = [];
  av.parents.col = [];
  av.parents.row = [];
  av.parents.AvidaNdx = [];
  av.parents.autoNdx = [];
  av.parents.handNdx = [];
  av.parents.howPlaced = [];
  av.parents.domid = [];  //need domID of entry in ancestorBox so that it can be removed from ancestor box when square on grid is dragged from box
  av.parents.Colors = av.color.parentColorList.slice();
  av.parents.Colors.reverse();  //needed for the stack to have the "easy to see" colors on top
  return av.parents;
};
//console.log('after clearParents', av.parents.clearParentsFn);

av.fzr = {};

av.env = {}; //used for functions to process information beteen the environment file and the User Interface (UI)

//Commments in the environment.cfg file?
//
//#comment option
//#!xor not34 region=all:side=none:supply=limited:gradient=false
//region options are in av.sgr.region below   There are several name formats and one dictionary below 
//supply optoins are in av.sgr.supply 
//side options are in av.sgr.side3
//gradient options are false/true;  gradient will be implemented using CELL which does not need a name. 
//
// q suffix on numbrs is q for quarters or n for ninths

//----------------------------------------------------------------------------------------------------------------------
// av.sgr = These are constants; dictionaries and arrays that might be useful to process 
//       // environment.cfg --> av.nut.reAct & reSrc (nutrient structure)
//       // av.nut.reAct & reSrc --> av.nut.uiAll & uiSub
//       // av.nut --> dom (actual values in the dom that the user sees)
//       // dom --> av.nut.uiAll & uiSub
//       // av.nut.uiAll & uiSub --> av.nut.reAct & reSrc
//       // av.nut.reAct & reSrc --> environment.cfg
//       //
//       // there are extra items in av.sgr as ideas were put in before implementation and not all ideas were used
//       // in implementation. Eventually after all is working with at least 4 subdishes Diane will clean out extra 
//       // items in av.sgr
//----------------------------------------------------------------------------------------------------------------------
// thinking about a situation where either 4ths or 9 ths were allowed in Avida-ED
// av.sqr.postfix_q    | 1, 2, |  //layout   tsk001q
//                     | 3, 4  |
// not in use
// av.sqr.postfix_n | 1 2 3 |   //sub-sections can be done as for quarters below
//      layout      | 4 5 6 |   // not123n = top one third row
//                  | 7 8 9 |

av.sgr = {};   //specific to resource/reactions (sugars); mostly constants. Not all iddeas written here will be used. 
av.sgr.symbolIsClosed = '▼';
av.sgr.symbolIsOpen = '►';

av.sgr.typeDefault = 'unlimited';
av.sgr.oseNames = ['Notose', 'Nanose', 'Andose', 'Ornose', 'Orose', 'Antose', 'Norose', 'Xorose', 'Equose'];
av.sgr.resrcTyp = ['unlimited', 'unlimited', 'unlimited', 'unlimited', 'unlimited', 'unlimited', 'unlimited', 'unlimited', 'unlimited'];
av.sgr.logEdNames = ['0not', '1nan', '2and', '3orn', '4oro', '5ant', '6nor', '7xor', '8equ'];
av.sgr.logicNames = ['not', 'nan', 'and', 'orn', 'oro', 'ant', 'nor', 'xor', 'equ'];
av.sgr.logicTitleNames = ['Not', 'Nan', 'And', 'Orn', 'Oro', 'Ant', 'Nor', 'Xor', 'Equ'];
av.sgr.logicVnames = ['not', 'nand', 'and', 'orn', 'or', 'andn', 'nor', 'xor', 'equ'];
av.sgr.numTasks = av.sgr.logicNames.length;
av.sgr.reactValues = [ 1.0,   1.0,   2.0,   2.0,   3.0,   3.0,   4.0,   4.0,   5.0];
av.sgr.monoChromeMaps = ['reddMap', 'orngMap', 'yllwMap', 'lawnMap',  'grenMap', 'seagMap', 'cyanMap', 
                         'cornMap', 'blueMap', 'purpMap', 'mgntMap',  'pinkMap', 'redvMap', 'greyMap'];
//av.sgr.sugarColors = ['redvMap', 'orngMap',  'yllwMap', 'grenMap',  'cyanMap', 'cornMap',  'blueMap', 'purpMap', 'mgntMap'];
//av.sgr.sugarColors = ['purpMap', 'blueMap',  'cornMap', 'cyanMap',  'seagMap', 'lawnMap',  'yllwMap', 'orngMap',  'pinkMap'];
//  av.sgr.sugarColors = ['blueMap', 'cornMap',  'cyanMap', 'grenMap',  'yllwMap', 'orngMap',  'reddMap', 'pinkMap',  'mgntMap'];
//  av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'lawnMap',  'yllwMap', 'orngMap',  'reddMap', 'pinkMap',  'mgntMap'];
//  av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'grenMap',  'yllwMap', 'orngMap',  'reddMap', 'mgntMap',  'purpMap'];
//  av.sgr.sugarColors = ['blueMap', 'cornMap',  'seagMap', 'grenMap',  'yllwMap', 'orngMap',  'redvMap', 'mgntMap',  'purpMap'];
// list of colors
// lawn
// gren -
// sea
// cyan =
// corn
// blue -
// purp
// mgnt =
// pink
// redv
// redd -
// orng
// yllw =
// 
// 13 colors?

  av.sgr.sugarColors = ['grenMap', 'seagMap',  'cornMap', 'blueMap',  'purpMap', 'mgntMap',  'redvMap', 'orngMap',  'yllwMap'];
//console.log('sugarColors=', av.sgr.sugarColors);
av.sgr.sugarBackgroundShade = 40;  //was 30
av.sgr.pureShade = 255;
av.sgr.sugarNameShade = 345;   //was 365   265 too light for yellow&greens; 300 green ok; yellow still too light (Rob liked 340)
av.sgr.monoColormaplength = av.color.reddMap.length;
av.sgr.darkEnd = av.sgr.monoColormaplength-30;          //last color used in the the array for color scale
av.sgr.sugarGreyShade = 20;
//console.log('full mono colorMap length =', av.sgr.monoColormaplength, '; greyMap length =', av.color.greyMap.length
//     , '; darkEnd =', av.sgr.darkEnd, '; sugarBackgroundShade', av.sgr.sugarBackgroundShade, '; sugarNameShade=', av.sgr.sugarNameShade);

av.sgr.react_valED = [   '',       1,            1,  'missing',   0.0,  1.0,   '',           1,    'pow' ];
av.sgr.react_argu = ['name', 'value', 'depletable', 'resource', 'min', 'max', 'task', 'max_count', 'type'];   
av.sgr.reAct_edValu_d = {
  'name' : '',
  'value' : 1,
  'depletable' : 1,
  'resource' : 'missing',
  'min' : 1.0,
  'max' : 1.0,
  'task' : '',
  'max_count' : 1,
  'type' : 'pow'
};

av.sgr.cell_argu = ['initial', 'inflow', 'outflow'];
av.sgr.reAct_avidaDft_d = {
    'name' : '',       //name of reaction
    'value' : 1,       //value = 1 through 5 based on number of nan gates needed to do the task. 
    'depletable' : 1,  // depletable = 1 = yes resources are eaten; 0 = no they are not eaten
    'resource' : '',  // name or resource that needs to be present for reaction. if none stated assume infinate
    'min' : 1.0,      // min will be a constant probably 0.9
    'max' : 1.0,      // max will be a constang probably 1.1
    'task' : '',      // one of the logic. s
    'max_count' : 1,  // max_count = 1 always in Avida-ED
    'type' : 'add'    // type = pow always in Avida-ED
};

// arugment name in the nutrient structure (nut); which is also the arugment name in the environment.cfg file if relevent
av.sgr.resrc_argu = ['name', 'initial', 'inflow', 'outflow', 'geometry'           //geometry is always the same, not sure it belongs here
                    , 'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'  
                    , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'
                    , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'
                    ,'boxflag', 'boxx', 'boxy', 'boxcol', 'boxrow' ];   //these are new for Avida-ED and not in the wiki. 
                //belong ui part of structure not resource
                //, 'region', 'hiSide', 'grdNum', 'regionCode','regionList'];  // this last row is not in the argurments for avida; used for 'multi-dish'

av.sgr.resrc_num = ['initial', 'inflow', 'outflow',
                    , 'inflowx1',  'inflowx2',  'inflowy1',  'inflowy2'  
                    , 'outflowx1', 'outflowx2', 'outflowy1', 'outflowy2'
                    , 'xdiffuse', 'ydiffuse', 'xgravity', 'ygravity'
                    , 'boxx', 'boxy', 'boxcol', 'boxrow' ];   //these are new for Avida-ED and not in the wiki. 





av.sgr.uiMin = [-2, -2, 1, -2, -2, 0, -2];  //need to document this tiba                  
av.sgr.uiMax = [ 0,  0, 0,  0,  0, 0, 1];

av.sgr.uiSummaryDom_num = ['initialHiNp', 'outflowHiNp','periodNp'];  //names of arguements that have numerical values in the dom for global dish
av.sgr.uiSubGlobalDom_num = ['inflowHiNp', 'outflowHiDiv'];  //names of arguements that have numerical values in the dom for globa dish
av.sgr.uiSubDom_num = ['initialHiNp', 'inflowHiNp', 'outflowHiNp',                
                    'initialLoNp', 'inflowLoNp', 'outflowLoNp', 'periodNp'];  //names of arguements that have numerical values in the dom for each subdish
av.sgr.uiSubDish_num = ['initialHiNp', 'inflowHiNp', 'outflowHiNp', 
                      , 'initialLoNp', 'inflowLoNp', 'outflowLoNp', 'periodNp', 'area'];  //names of arguements that have numerical values in av.nut[numtsk].uiSub
av.sgr.uiSubDom_txt = ['supplyTypeSlct', 'hiSide'];

av.sgr.uiSub_Check = [ 'diffuseCheck', 'periodCheck', 'gradientCheck' ];

av.sgr.ui_subDom_argu = ['supplyTypeSlct', 'initialHiNp', 'inflowHiNp', 'outflowHiNp', 'periodNp'
                        , 'diffuseCheck', 'periodCheck'   //not sure if regionCode and regionName belong in Dom
                        , 'gradientCheck', 'hiSide', 'initialLoNp', 'inflowLoNp', 'outflowLoNp'];

av.sgr.ui_subDish_argu = ['supplyTypeSlct', 'initialHiNp', 'inflowHiNp', 'outflowHiNp', 'periodNp'
                        , 'diffuseCheck', 'periodCheck', 'area'
                        , 'gradientCheck', 'hiSide', 'initialLoNp', 'inflowLoNp', 'outflowLoNp'
                        , 'boxed', 'regionCode', 'regionName', 'regionSet', 'regionNdx'];  
                      //subRegion is not in Dom, so it is at the end; boxed has not been added to the dom yet
                      //I don't think subRegion is in use. 
//av.sgr.ui values match the dom, so they are amount per cell; av.sgr.Resrce values match avida, so they are amouth per dish/world. (will adust for cell value later)
//one each task if I make a data structure from the UI that is separate from what goes in thhe config file.
av.sgr.ui_allDom_argu = ['geometry', 'supplyTypeSlct', 'regionLayout', 'initialHiNp'];  //'regionsNumOf' is not in dom but found using regionLayout (region layout in the dish)
av.sgr.ui_allDish_argu = ['geometry', 'supplyTypeSlct', 'regionLayout', 'initialHiNp', 'regionsNumOf'];   //'regionsNumOf' is not in dom, so it is at the end of the list.
// 'inflow', 'outflow', 'periodFlag';  could be in global, but won't fit on one line in the sumary/details accordian.


av.sgr.reSrc_avidaDft_d = {
    'initialHiNp' : 0
  , 'inflow' : 0
  , 'outflow' : 0.0
  , 'geometry' : 'global' // Avida-ED 'global' = global; Avida-ED 'local = grid; Avida-ED does not used torus
  , 'inflowx1' : 0        // Actually in Avida, inflowx1 is deterministic
  , 'inflowx2' : 0        // = inflowx1;
  , 'inflowy1' : 0        // Actually in Avida, inflowx1 is deterministic
  , 'inflowy2' : 0        // = inflowy1
  , 'outflowx1' : 0    // Actually in Avida, outflowx1 is unset
  , 'outflowx2' : 0    // = outflowx1
  , 'outflowy1' : 0    // Actually in Avida, outflowy1 is unset
  , 'outflowy2' : 0    // = outflowy1
  , 'xdiffuse' : 1.0
  , 'ydiffuse' : 1.0
  , 'xgravity' : 0.0
  , 'ygravity' : 0.0
  , 'boxflag' : false  //box is new for Avida-ED and only in defined within Avida-ED, but not in the wiki at https://github.com/devosoft/avida/wiki/Environment-file
  , 'boxx' : 0
  , 'boxy' : 0 
  , 'boxcol' : 0
  , 'boxrow' : 0
};


//Region Layout in use as of 2019 Dec
  // not ready yet                        <option id="orn_TopLeftRight" class="TopLftRit" value="3TopLftRit">Top/Bottom(L/R)</option>
  // not ready yet                        <option id="orn_quarters" class="Quarters" value="4Quarters">Quarters</option>

av.sgr.re_region = /(\D+)(\d+)(.*$)/;

// These are the values for the options in region layout based on a region divided into quarters. 
// Diane could make one for ninths (tic-tac-toe), but I don't think Rob will ever approve.
av.sgr.regionLayoutValues = ['1Global', '1All', '2LftRit', '2UppLow', '3TopLftRit', '4Quarters'];  //The first character is the number of regions; 
av.sgr.regionQuarterSubBeg =[        0,      1,         1,         1,            1,          1 ];  // start of sub regions useed 
av.sgr.regionQuarterSubEnd =[        0,      1,         2,         2,            3,          4 ];  //End sub region used

//entry zero isf for global so index matches subregion number, when dish is limited. 
av.sgr.name = {};
av.sgr.code = {};
av.sgr.name['1Global'] = ['Global Dish'];
av.sgr.code['1Global'] = ['100'];
av.sgr.name['1All'] = [null, 'Whole Dish'];
av.sgr.code['1All'] = [null, '000'];
av.sgr.name['2LftRit'] = [null,'Left', 'Right']; 
av.sgr.code['2LftRit'] = [null, '013q', '024q'];
av.sgr.name['2UppLow'] = [null,'Upper', 'Lower']; 
av.sgr.code['2UppLow'] = [null, '012q', '034q']; 
av.sgr.name['3TopLftRit'] = [null, 'Top', 'loL', 'loR'];
av.sgr.code['3TopLftRit'] = [null, '012q', '003q', '004q'];
av.sgr.name['4Quarters'] = [null, 'upL', 'upR', 'loL', 'loR'];
av.sgr.code['4Quarters'] = [null, '001q', '002q', '003q', '004q'];

av.sgr.regionLookup = {};
av.sgr.regionLookup['100,'] = '1Global';
av.sgr.regionLookup['000,'] = '1All';
av.sgr.regionLookup['013,024,'] = '2LftRit';
av.sgr.regionLookup['012,024,'] = '2UppLow';
av.sgr.regionLookup['001,002,034,'] = 'LftRitLow';
av.sgr.regionLookup['001,002,003,004,'] = '4Quarders';
av.sgr.regionLookup['003,004,012,'] = '3TopLftRit';
av.sgr.regionLookup['000'] = '1All';   //the same for the tic-tac-toe layout
av.sgr.regionLookup['100'] = '1Global';

av.sgr.boxArguments = ['boxflag', 'boxx', 'boxy', 'boxcol', 'boxrow']; //flag is true if in use; false if these arguments are not included. 
                      //boxx and boxy are the upper left corner positions of the region in Avida-ED
                      //boxcol and boxrow is the size of the box, so the lower right corner is (boxx+boxcol-1, boxy+boxrow-1]
  
 // Still using this version
// Region List based on 4 quarters: entire dish, upper left, upper right, lower left, lower right, upper half, lower half, left half, right half

av.sgr.regionQuarterNames = ['Global Dish', 'Whole Dish', 'Upper Left', 'Upper Right', 'Lower Left', 'Lower Right', 'Top', 'Bottom', 'Left', 'Right']; 
av.sgr.regionQuarter3Char = [ 'gbl', 'all', 'upL', 'upR', 'loL', 'loR', 'top', 'bot', 'lft', 'rit'];   //Use as values when the time comes
av.sgr.regionQuarterCodes = [ '100', '000', '001', '002', '003', '004', '012', '034', '013', '024'];   //These numbers go with the regions above
av.sgr.regionQuarterCols =  [   1.0,   1.0,   0.5,   0.5,   0.5,   0.5,   1.0,   1.0,   0.5,   0.5];   //fraction of cols
av.sgr.regionQuarterRows =  [   1.0,   1.0,   0.5,   0.5,   0.5,   0.5,   0.5,   0.5,   1.0,   1.0];   //fraction of rows
av.sgr.regionQuarterColsAdd = [   0,     0,     0,     1,     0,     1,     0,     0,     0,     1];   //add amount if odd cols in world
av.sgr.regionQuarterRowsAdd = [   0,     0,     0,     0,     1,     1,     0,     1,     0,     0];   //add amount if odd rows in world
av.sgr.regionQuarterBoxx =  [   0.0,   0.0,   0.0,   0.5,   0.0,   0.5,   0.0,   0.0,   0.0,   0.5];  
av.sgr.regionQuarterBoxy =  [   0.0,   0.0,   0.0,   0.5,   0.0,   0.5,   0.0,   0.0,   0.0,   0.0];  

// Will convert to version below

// Region List based on 4 quarters: entire dish, upper left, upper right, lower left, lower right, upper half, lower half, left half, right half
av.sgr.regionQuarter = {};
av.sgr.regionQuarter.Names = ['Global Dish', 'Whole Dish', 'Upper Left', 'Upper Right', 'LowerLeft', 'LowerRight', 'Top', 'Bottom', 'Left', 'Right']; 
av.sgr.regionQuarter['3Char'] = ['glb', 'all', 'upL', 'upR', 'loL', 'loR', 'top', 'bot', 'lft', 'rit'];   //Use as values when the time comes
av.sgr.regionQuarter.Codes = [   '100', '000', '001', '002', '003', '004', '012', '034', '013', '024'];   //These numbers go with the regions above
av.sgr.regionQuarter.Cols =  [     1.0,  1.0,   0.5,   0.5,   0.5,   0.5,   1.0,   1.0,   0.5,   0.5];   //fraction of cols
av.sgr.regionQuarter.Rows =  [     1.0,  1.0,   0.5,   0.5,   0.5,   0.5,   0.5,   0.5,   1.0,   1.0];   //fraction of rows
av.sgr.regionQuarter.ColsAdd = [     0,    0,     0,     1,     0,     1,     0,     0,     0,     1];   //add amount if odd cols in world
av.sgr.regionQuarter.RowsAdd = [     0,    0,     0,     0,     1,     1,     0,     1,     0,     0];   //add amount if odd rows in world
av.sgr.regionQuarter.Boxx =  [     0.0,  0.0,   0.0,   0.5,   0.0,   0.5,   0.0,   0.0,   0.0,   0.5];  
av.sgr.regionQuarter.Boxy =  [     0.0,  0.0,   0.0,   0.5,   0.0,   0.5,   0.0,   0.0,   0.0,   0.0];  

av.sgr.regionNine = {};
av.sgr.regionNine.Codes = ['000n', '001', '002', '003'   //top row: ninth of dish
                                 , '004', '005', '006'   //middle row
                                 , '007', '008', '009'   //bottom row
                                 , '123', '456', '789'   //rows 
                                 , '147', '258', '369'];  //columns 
 
// need to figure out how to assign when reading environment.cfg
av.sgr.supply3 =      ['non', 'inf',  'fin',  'chm',  'poi', 'flo' ];  //none, unlimited, limited, chemostat, poison
av.sgr.supply4 =      ['none', 'infn', 'fint', 'chst', 'pois', 'flow'];
av.sgr.supplyProper = ['None', 'unlimited', 'Limited', 'Chemostat', 'Flow'];    //only using the first 3 for now; 
av.sgr.supplylower  = ['none', 'unlimited', 'limited', 'chemostat', 'flow'];    //only using the first 3 for now; 
//Flow would be from the source in a diffrent place fromt he sink: that is input x,y coordinaes are different from those of output. 
av.sgr.supplyLetter = ['N'  , 'I'  , 'F'  , 'E', 'P', 'S'];   
av.sgr.side1 = ['L', 'R', 'T', 'B', 'C', 'E', 'U'];
av.sgr.side3 = ['Lft', 'Rit', 'Top', 'Bot', 'Cen', 'Edg', 'Unk']; //left, right, top, bottom, center, edge, unknown
av.sgr.side = ['left', 'rite', 'top', 'bottom', 'center', 'edges', 'unknown'];

av.sgr.hideFlgNames = ['gradient', 'periodic'];  
av.sgr.hideFlagInit = [true, true];  //true is to hide when areas underdevelopment are hidden. 
av.sgr.flagInitOpposite = [false, false];  //false in this case is to NOT hide as develpment sections shown.

av.sgr.nutdft = {}; 
//---------------------------------------------------------------------------------- odd flags to try to get Rob's UI --
//Rob Pennock decided that we should only have local/grid resources. This will complicate things as my design is based
// global characteristic in the "summary" and the rest in the "details" section of the summary/details format. 

av.sgr.showGeoSelect = false;   // This will allow the use of both global and grid; but with no selection element
                                // if "Whole Dish" then unlimited and none are global. All else is grid. 
av.sgr.gridOnly = false;        // gridOnly true  ++> dftGeometry = grid
av.sgr.dftGeometry = 'global';  // gridOnly false ++> dftGeometry = global
if (av.sgr.gridOnly) av.sgr.dftGeometry = 'grid';
av.sgr.complexityLevel = 'sgrBasic';
av.sgr.complexityLevel = 'sgrAdvanced';
av.sgr.complexityLevel = 'sgrGlobal';
av.sgr.complexSumGridPrefix = 'grd-sgr-sum-adv-';

av.sgr.describe = ['basic', 'global', 'adv'];

av.sgr.describe = ['basic', 'global', 'adv'];
av.sgr.describe.long = {};
av.sgr.describe.long.not = '&nbsp;(x2) Easy';
av.sgr.describe.long.nan = '&nbsp;(x2) Easy';
av.sgr.describe.long.and = '&nbsp;(x4) Moderate';
av.sgr.describe.long.orn = '&nbsp;(x4) Moderate';
av.sgr.describe.long.oro = '&nbsp;(x8) Hard';
av.sgr.describe.long.ant = '&nbsp;(x8) Hard';
av.sgr.describe.long.nor = '(x16) Very Hard';
av.sgr.describe.long.xor = '(x16) Very Hard';
av.sgr.describe.long.equ = '(x32) Brutal';
av.sgr.describe.long.width = '96px';

av.sgr.describe.lng2 = {};
av.sgr.describe.lng2.not = 'Easy &nbsp;(x2)';
av.sgr.describe.lng2.nan = 'Easy &nbsp;(x2)';
av.sgr.describe.lng2.and = 'Moderate &nbsp;(x4)';
av.sgr.describe.lng2.orn = 'Moderate &nbsp;(x4)';
av.sgr.describe.lng2.oro = 'Hard &nbsp;(x8)';
av.sgr.describe.lng2.ant = 'Hard &nbsp;(x8)';
av.sgr.describe.lng2.nor = 'Very Hard (x16)';
av.sgr.describe.lng2.xor = 'Very Hard (x16)';
av.sgr.describe.lng2.equ = 'Brutal (x32)';

av.sgr.describe.lng2.width = '96px';

av.sgr.describe.short = {};
av.sgr.describe.short.not = '&nbsp;(x2)';
av.sgr.describe.short.nan = '&nbsp;(x2)';
av.sgr.describe.short.and = '&nbsp;(x4)';
av.sgr.describe.short.orn = '&nbsp;(x4)';
av.sgr.describe.short.oro = '&nbsp;(x8)';
av.sgr.describe.short.ant = '&nbsp;(x8)';
av.sgr.describe.short.nor = '(x16)';
av.sgr.describe.short.xor = '(x16)';
av.sgr.describe.short.equ = '(x32)';
av.sgr.describe.short.width = '33px';

//------------------------------------------------------------------------------------------- av.sgr.makeNutDefault --
av.sgr.makeNutDefault = function () {
  av.sgr.nutdft = {};    

  //for user interface 
  av.sgr.nutdft.react = {};
  av.sgr.nutdft['uiAll'] = {};
  av.sgr.nutdft['uiSub'] = {};
  var uiAllDishLen = av.sgr.ui_allDish_argu.length;
  for (jj=0; jj < uiAllDishLen; jj++) {
    av.sgr.nutdft.uiAll[ av.sgr.ui_allDish_argu[jj] ] = 'default';
  };
  //defaults for items that describe the whole dish
  av.sgr.nutdft.react.min = 1;
  av.sgr.nutdft.react.max = 1;
  av.sgr.nutdft.react.max_count = 1;
  av.sgr.nutdft.react.type = 'pow';
  av.sgr.nutdft.uiAll.geometry = av.sgr.dftGeometry;  ////Needs be the default incase there is no resource, but only a reaction ro a task; in that case the resource is global
  av.sgr.nutdft.uiAll.supplyTypeSlct = 'unlimited';    //this is only for whem ui.geometry = global
  av.sgr.nutdft.uiAll.regionLayout = '1Global';  //only Whole Dish for now; '1All' is the code for 'Whole Dish';
  av.sgr.nutdft.uiAll.regionsNumOf = 1;   // whole dish = there is only one dish 
  av.sgr.nutdft.uiAll.initialHiNp = 100;      //only used when whem ui.geometry = global and  supplyTypeSlct = 'limited' set per cell ; need to multiply by wrldSize

  //defaults for subtasks which must be Grid or Local
  av.sgr.nutdft.uiSub.supplyTypeSlct = 'unlimited';  // unlimited default from Avida-ED 3: I think Should change to Limited
  av.sgr.nutdft.uiSub.initialHiNp = 100;  //sugar units/cell guess at an initial value when supplyTypeSlct='limited'; need to multiply by wrldSize
  av.sgr.nutdft.uiSub.inflowHi  = 0.1;   //sugar units/cell guess at an initial value when supplyTypeSlct='chemostat'; need to multiply by wrldSize
  av.sgr.nutdft.uiSub.outflowHi = 0.1;   //sugar units (fraction) guess at an initial value when supplyTypeSlct='chemostat';
  av.sgr.nutdft.uiSub.area = -1;   //based on a standard 30 x 30 world
  av.sgr.nutdft.uiSub.diffuseCheck = false;    //false = default;  else true.      
  //from event file
  av.sgr.nutdft.uiSub.periodCheck = false;    //false = default;  else true.
  av.sgr.nutdft.uiSub.periodTime = 1000;    //need to play with default time in updates

  av.sgr.nutdft.uiSub.gradientCheck = false;    //false = default;  else true.      
  av.sgr.nutdft.uiSub.hiSide = 'left';    //only valid for local resources with supply Type = 'gradient' or 'flow';
  av.sgr.nutdft.uiSub.inflowLo  = 0;     //sugar units/cell guess at an initial value when supplyTypeSlct='gradient' or 'flow';
  av.sgr.nutdft.uiSub.outflowLo = 0.1;  //sugar units (fraction) guess at an initial value when supplyTypeSlct='gradient' or 'flow';
  av.sgr.nutdft.uiSub.initialLo =   0;  //sugar units/cell guess at an initial value when supplyTypeSlct='gradient' or 'flow';
  av.sgr.nutdft.uiSub.regionNdx = 1;   //index into various region data vectors
  av.sgr.nutdft.uiSub.regionCode = '000';
  av.sgr.nutdft.uiSub.regionName = '1All';
  av.sgr.nutdft.uiSub.regionsNumOf = 1;
  av.sgr.nutdft.uiSub.boxed = true;           //true keeps resources in their subdish; false allows them to flow into the rest of the dish
  av.sgr.nutdft.uiSub.regionSet = 'q';  // q = Quarters = 2x2 subregions
};                                       // n = Niths = 3x3 subregions
//---------------------------------------------------------------------------------------end av.sgr.makeNutDefault --
av.sgr.makeNutDefault();  // only ever called here.
//console.log('av.sgr.nutdft =', av.sgr.nutdft);   //or should there just be a 'dft' task and only ever one region?


av.nut = {};  // within Nutrients (av.nut) the first element in all arrays refer to the geometry="global". The element has an index = 0;
              // when geometry="grid", Avida-ED calls it "local" and there can be up to 9 subdishes. 
              // subscripts 1-9 can refer upto 9 subsections within a dish. They are actually elements 2-10, but the subscript is 1-9. 
              // av.uiALL.regionLayout has various options which define both how many subdishes can be defined and where in the dish those subdishes are located. 
              // the dom elelment tsk#regionLayout.value will determine number and labels for the subsections. 
              // When more subdishes are implemented, an array or dictionary will be defined for each of the tsk.regionLayout values. 

//----------------------------------------------------------------------------------------- av.fzr.clearEnvironment --
// used to create several structures used in defining parameters for the environment.cfg file
av.fzr.clearEnvironment = function(from) {
  //console.log(from + ' called av.fzr.clearEnvironment');
  av.oldNut = {};
  av.oldNut = JSON.parse(JSON.stringify(av.nut));
  av.nut = {};
  av.nut.hideFlags = {};
  av.nut.resrcTyp = av.sgr.resrcTyp;
  av.sgr.processHideFlags(av.sgr.hideFlagInit, 'av.fzr.clearEnvironment');
  av.nut.numRegionsinHTML = 2;
  av.nut.wrldCols = 30;
  av.nut.wrldRows = 30;
  //av.nut.wrldSize = av.nut.wrldCols * av.nut.wrldRows;
  // more about environment variables can be found at https://github.com/devosoft/avida/wiki/Environment-file#RESOURCE
  // av.nut is used for normal runs. nut is for nutrients; not used for test runs which run the envornment.cfg file as
  // submitted in the workspace. 

  var grd = [];
  for (var ii = 0; ii<5;ii++) {
    grd[ii] = [];
    //for (var jj=0; jj < ii+1; jj++) {
    //  grd[ii][jj] = (ii+1) * (jj+1);
    //}
  };
    
  //console.log('grd=', grd);
  var rsrcelen = av.sgr.resrc_argu.length; 
  var reactlen = av.sgr.react_argu.length;
  var tsk;
  var uiAllDishLen = av.sgr.ui_allDish_argu.length;
  var uiSubDishLen = av.sgr.ui_subDish_argu.length;
  for (var ii=0; ii< av.sgr.numTasks; ii++) {      //9
    tsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
    av.nut[tsk] = {};    
    av.nut[tsk]['resrc'] = {};
    for (var jj=0; jj<rsrcelen; jj++){
      av.nut[tsk]['resrc'][ av.sgr.resrc_argu[jj] ] = [];
    };
    av.nut[tsk]['react'] = {};
    for (var jj=0; jj<reactlen; jj++){
      av.nut[tsk]['react'][ av.sgr.react_argu[jj] ] = [];     //Should these actually lbe left blank if they are really avida defaults? 
                                                              //We don't need to write the avida defaults; We do need to write where Avida-ED devaults don't match avida
    };
    
    //cell command
    av.nut[tsk].cell = {};
    av.nut[tsk].cell.resource = [];
    av.nut[tsk].cell.list = [];
    av.nut[tsk].cell.initial = [];
    av.nut[tsk].cell.inflow = [];
    av.nut[tsk].cell.outflow = [];
    av.nut[tsk].cell.gradientFlag = [];

    av.nut[tsk].cell.w_list = grd;
    av.nut[tsk].cell.x_initial = grd;
    av.nut[tsk].cell.y_inflow = grd;
    av.nut[tsk].cell.z_outflow = grd;
         
    //for user interface 
    av.nut[tsk]['uiAll'] = {};
    av.nut[tsk]['uiSub'] = {};
    for (jj=0; jj < uiAllDishLen; jj++) {
      av.nut[tsk].uiAll[ av.sgr.ui_allDish_argu[jj] ] = 'default';
    };
    //defaults for items that describe the whole dish
    // These should be in arrays or dictionaries so that they always match with av.sgr.nutdft.uiAll - tiba fix later
    av.nut[tsk].uiAll.geometry = av.sgr.dftGeometry;        //Needs be the default incase there is no resource, but only a reaction ro a task; in that case the resource is global 
    av.nut[tsk].uiAll.supplyTypeSlct = av.sgr.nutdft.uiAll.supplyTypeSlct;    //this is only for whem ui.geometry = global
    av.nut[tsk].uiAll.regionLayout = av.sgr.nutdft.uiAll.regionLayout;  //only whole dish for now; default is global;
    av.nut[tsk].uiAll.regionsNumOf = av.sgr.nutdft.uiAll.regionsNumOf;   // whole dish
    av.nut[tsk].uiAll.initialHiNp = av.sgr.nutdft.uiAll.initialHiNp;      //only used whem ui.geometry = global and  supplyTypeSlct = 'limited' 

    for (jj=0; jj < uiSubDishLen; jj++) {
      av.nut[tsk]['uiSub'][av.sgr.ui_subDish_argu[jj] ] = [];
    };
  };   //end of looping through the logic tasks.
  //if (av.dbg.flg.nut) {
  if (false) {
    av.cleanNut = {};
    av.cleanNut = JSON.parse(JSON.stringify(av.nut));
    // section to verifiy that av.nut and av.cleanNut are different structurs; console.log statements verified that they are different
    // console.log('av.nut[tsk].uiAll.geometry', av.nut[tsk].uiAll.geometry, '; tsk=', tsk);
    // console.log('av.cleanNut[tsk].uiAll.geometry', av.cleanNut[tsk].uiAll.geometry, '; tsk=', tsk);
    // console.log('near end of av.fzr.clearEnvironment');
    console.log('av.oldNut =', av.oldNut);
    console.log('av.cleanNut=', av.cleanNut);
  }

  //--------------------------------------------- av.fzr.env section mighht be delted in future. used for Test Dishes --
  // av.fzr.env is only used for Test Dishes. 
  av.fzr.env = {};
  av.fzr.env.rsrce = {};
  av.fzr.env.react = {}; 
  av.fzr.env.supply = {};

  for (var ii=0; ii< av.sgr.numTasks; ii++) {      //9
    tsk = av.sgr.logEdNames[ii];   //puts names in order they are on avida-ed user interface
    av.fzr.env.supply[tsk] = [];
    av.fzr.env.rsrce[tsk] = {};    
    for (var jj=0; jj<rsrcelen; jj++){
      av.fzr.env.rsrce[tsk][av.sgr.resrc_argu[jj]] = [];
    }
    av.fzr.env.react[tsk] = {};
    for (var jj=0; jj<reactlen; jj++){
      av.fzr.env.react[tsk][ av.sgr.react_argu[jj] ] = [];
    }
  };
  //console.log('av.fzr.env.react=',av.fzr.env.react);
  //console.log('av.fzr.env.rsrce=',av.fzr.env.rsrce);
  //console.log('av.fzr.env=', av.fzr.env);
 //----------------------------------------------------------------------------- end of av.fzr.env section in globals --
};
//------------------------------------------------------------------------------------- end av.fzr.clearEnvironment --

//------------------------------------------------------------------------------------------- av.sgr.processHideFlags --
//Flags for fields not yet implemented. 
av.ui.hideDevelopment = false;
av.sgr.processHideFlags = function(boolArry, from) {
  //console.log(from+' called av.sgr.processHideFlags: hideDevelopment=', av.ui.hideDevelopment, '; boolArry=', boolArry);
  //showDevelopment is a flag, when true show parts still under development or debug
  if (undefined != boolArry) {
    // it is defined so use it
    if (boolArry.length < av.sgr.hideFlgNames.length) {
      // but it is too short so fill out with the end of initialized array
      for (var ii=boolArry.length; ii < av.sgr.hideFlgNames.length; ii++) {
        boolArry[ii] = av.sgr.hideFlagInit[ii];
      };
      //console.log('boolArry=', boolArry);
    }
  }
  //not defined so use initialized array if we are hiding development, and the comp[lement if showing development
  else {
    if (av.ui.hideDevelopment) boolArry = av.sgr.hideFlagInit;
    else boolArry = av.sgr.flagInitOpposite;
    //console.log('av.ui.hideDevelopment=', av.ui.hideDevelopment,'; boolArry=', boolArry);    
  };
  //now finally change the flags as needed.
  var len = av.sgr.hideFlgNames.length;
  for (var ii=0; ii < len; ii++) {
    av.nut.hideFlags[av.sgr.hideFlgNames[ii]] = boolArry[ii];
  };
  //console.log('av.nut.hideFlags=',av.nut.hideFlags,'-------------------------------------------------------------');
};
//------------------------------------------------------------------------------------ end of av.sgr.processHideFlags --


//---------------------------------------------------------------- in av.fzr.clearFzr_activeConfig_nutData_Fn --//
//cannot call av.fzr.clearFzr_activeConfig_nutData_Fn until after saveUpdateState is defined in fileIO.js
// Clear the ___active config data__  and __av.nut___
av.fzr.clearFzr_activeConfig_nutData_Fn = function () {
  'use strict';
  av.fzr.dir = {};
  av.fzr.domid = {};
  av.fzr.file = {};
  av.fzr.item = {};
  av.fzr.mDish = {};

  av.dnd.configFlag;  //flag to indicate if the normal or test configuration is in use. 
  av.fzr.cNum = 0;  //value of the next configured dish (config) number
  av.fzr.gNum = 0;  //value of the next organism (genome) number
  av.fzr.mNum = 0;  //value of the next multi-dish (complex-populated dish) number
  av.fzr.rNum = 0;  //value of the next resource dish number
  av.fzr.tNum = 0;  //value of the next test dish number
  av.fzr.wNum = 0;  //value of the next world (populated dish) number

  //probably delete the next few lines
  av.fzr.mDish[0] = {};
  av.fzr.mDish[0].cNum = 0; //number of subdish or index of subdish
  av.fzr.mDish[0].wNum = 0;
  av.fzr.mDish[0].dirA = [];
  av.fzr.mDish[0].dir = {};
  av.fzr.mDish[0].domid = {};
  av.fzr.mDish[0].file = {};
  av.fzr.mDish[0].item = {};
  //to here

  //hold genome for active organism in Organism View
  av.fzr.actOrgan = {'name': '', 'actDomid': '', 'fzDomid': '', 'genome': ''};
  //hold genome for active organism in Organism View
  av.fzr.actConfig = {'name': '', 'actDomid': '', 'fzDomid': '', 'type': '', 'dir': ''};
  av.fzr.actConfig.file = {};
  av.fzr.pop = [];
  //the pops hold the data for the populated dishes for the Analysis page
  for (var ii=0; ii<3; ii++) {
    av.fzr.pop[ii] = {};
    av.fzr.pop[ii].fit = [];
    av.fzr.pop[ii].ges = [];
    av.fzr.pop[ii].met = [];
    av.fzr.pop[ii].num = [];
    av.fzr.pop[ii].via = [];
  }
  av.fzr.saveUpdateState('yes');
  av.fzr.subDishOrNot = 'none';
  av.fzr.clearEnvironment('av.fzr.clearFzr_activeConfig_nutData_Fn');
};

//--------------------------------------------------------------- end av.fzr.clearFzr_activeConfig_nutData_Fn --//

av.fzr.saveState = 'default';
av.fzr.workspaceName = 'default';

// Does NOT clear the active config data
av.fzr.clearMainFzrFn = function () {
  'use strict';
  if (av.debug.fzr) { console.log('Freezer: in ClearMainFzrFn'); }

  //Clear each section of the freezer and active organism and ancestorBox
  if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzConfig.selectAll', av.dnd.fzConfig); }
  av.dnd.empty(av.dnd.fzConfig);
  if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzConfig.sync'); }
  if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzOrgan.selectAll=', av.dnd.fzOrgan); }
  av.dnd.empty(av.dnd.fzOrgan);
  if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzOrgan.sync'); }
  console.log(av.dnd.containerMap);
/*
  if (av.debug.fzr) console.log('Freezer: before av.dnd.fzMdish.selectAll=', av.dnd.fzMdish);
  av.dnd.fzMdish.selectAll().deleteSelectedNodes();
  if (av.debug.fzr) console.log('Freezer: before av.dnd.fzMdish.sync');
  av.dnd.fzMdish.sync();
*/

  if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzWorld.selectAll=', av.dnd.fzWorld); }
  console.log(av.dnd.fzWorld);
  av.dnd.empty(av.dnd.fzWorld);
  console.log(av.dnd.fzWorld);
  if (av.debug.fzr) { console.log('Freezer: before av.dnd.fzWorld.sync'); }
  if (av.debug.fzr) { console.log('Freezer: before av.dnd.ancestorBox.selectAll=', av.dnd.ancestorBox); }
  av.dnd.empty(av.dnd.ancestorBox);
  if (av.debug.fzr) { console.log('Freezer: before av.dnd.ancestorBox.sync'); }
  // av.dnd.ancestorBox.sync();
  if (av.debug.fzr) { console.log('Freezer: before av.fzr.saveUpdateState'); }
  av.fzr.saveUpdateState('yes');
  if (av.debug.fzr) { console.log('Freezer: end of ClearMainFzrFn'); }
};

//--------------------------------------------------------------------------------------------------- av.grd.clearGrd --
av.grd = {};         //data about the grid canvas
av.grd.popStatsMsg = {};
av.dom = {};    //dom id shortcuts and dimensions
av.dsz = {};    //dom size of elements in the dom
av.doj = {};    //dom dojo id shortcuts

av.grd.fnChosen = [];
for (var ii = 0; ii < 9; ii++) { av.grd.fnChosen[av.ptd.logicButtons[ii]] = false; }

// initialize data for chart on population page
av.grd.need2DrawGrid = true;
av.grd.newlyNone = true;

av.grd.clearGrd = function () {
  av.grd.cmap = av.color.Gnuplot2cmap;  //default colormap
  av.grd.runState = 'prepping';  //'started'; 'world';
  av.grd.updateNum = 0;
  av.grd.selectedNdx = -1;
  av.grd.cols = 0;    //Number of columns in the grid
  av.grd.rows = 0;    //Number of rows in the grid
  av.grd.sizeX = 0;  //size of canvas in pixels
  av.grd.sizeY = 0;  //size of canvas in pixels
  av.grd.boxX = 0;   //size based zoom
  av.grd.boxY = 0;   //size based zoom
  av.grd.flagSelected = false; //is a cell selected
  av.grd.zoom = 1;     //magnification for zooming.
  //structure for colors in the grid
  av.grd.fill = [];  //deals with color to fill a grid cell
  av.grd.logicOutline = [];   // deals with the color of the grid outline
  av.grd.fillmax = 0;    // max value for grid scale for the gradient color
  av.grd.msg = {};
  av.grd.mxFitHist = 0; 
  av.grd.mxFit = 1.0;   //store initial maximum fitness during an experiment
  av.grd.mxCost = 200;  //store initial maximum Offspring Cost during an experiment
  av.grd.mxRate = 50;   //store initial maximum Energy Acq. Rate during an experiment
  av.grd.mxRnot = 1.0;  //store initial maximum not Resource in any cell during an experiment.
  av.grd.mxRnan = 1.0;  //store initial maximum nan Resource in any cell during an experiment.
  av.grd.mxRand = 1.0;  //store initial maximum and Resource in any cell during an experiment.
  av.grd.mxRorn = 1.0;  //store initial maximum orn Resource in any cell during an experiment.
  av.grd.mxRoro = 1.0;  //store initial maximum oro Resource in any cell during an experiment.
  av.grd.mxRant = 1.0;  //store initial maximum ant Resource in any cell during an experiment.
  av.grd.mxRnor = 1.0;  //store initial maximum nor Resource in any cell during an experiment.
  av.grd.mxRxor = 1.0;  //store initial maximum xor Resource in any cell during an experiment.
  av.grd.mxRequ = 1.0;  //store initial maximum equ Resource in any cell during an experiment.

  av.grd.rescaleTolerance = 0.1;
  av.grd.rescaleTimeConstant = 5;     // was 1  //used to adjust scale over several updates rather than all at once. 
  av.grd.rescaleUpdateStart = 100;   // was ; 500 or 1000
  av.grd.SelectedColor = '#ffffff';
  av.grd.LogicColor = '#00ff00';   //color used to outline cells with avidians that can do the selected logic functions
  av.grd.cellOutline = '#00aa00';  //color used to outline all cells with avidians 
  av.grd.kidStatus = '';

  av.grd.legendPad = 10;   //padding on left so it is not right at edge of canvas
  av.grd.colorWide = 13;   //width and heigth of color square
  av.grd.RowHt = 20;       //height of each row of text
  av.grd.leftpad = 10;     //padding to allow space between each column of text in the legend
  av.grd.marginX = 1;  //width of black line between the cells
  av.grd.marginY = 1;  //width of black line between the cells

  av.grd.oldUpdate = -10;
  av.ptd.autoPauseUpdate = 1000;

  av.msg.ByCellIDgenome = '';        //Holdes the genome which is needed to freeze a cell.
  av.msg.previousUpdate = -10;
  av.grd.popStatsMsg.update = -5;
  av.ptd.allOff = true;

  av.ptd.validGridSize = true;
  av.ptd.validMuteInuput=true;
  av.grd.selFnText = 'none';
  av.grd.selFnBinary = '000000000';

  av.grd.gridWasCols = 20;
  av.grd.gridWasRows = 20;
};
av.grd.clearGrd();

// Plotly: useful urls
// https://plotly.com/javascript/reference/scatter/
// https://plotly.com/javascript/reference/scatter/#scatter-marker-line
//----------------------------------------------------------------------------------------------- av.pch.clearPopChrt --
av.pch = {};   // related to the chart on the population page
av.pch.dadMax = 16;
av.pch.resrcGlobal = {};
av.pch.sgr = {};
popChrtRitYaxisNow = 'None'

av.sgr.lineDash = ['solid', 'dot', 'solid', 'longdash', 'solid',  'dash', 'solid', 'dashdot', 'longdashdot'];
av.sgr.lineDash = ['10px,5px', 'dot', 'solid', 'longdashdot', 'solid',  'dot', 'solid', 'dashdot', 'solid'];

//av.sgr.lineColors =  ['green', 'green', 'blue', 'blue', 'red', 'red', 'orange', 'orange', 'yellow'];

av.pch.clearPopChrt = function () {
  av.pch.needInit = true; //Added on 2019 Dec 10 Tues; not sure if it belongs here or not
  av.pch.ht = 10;
  av.pch.wd = 10; 
  //console.log('av.pch.wd', av.pch.wd);    // when duging why plotly crashed; turned out plotly crashs if div holding plot is not displayed
  av.pch.yValue = 'new';
  av.pch.yChange = 'false';
  av.pch.popY = [];
  av.pch.logY = [];
  av.pch.xx = [];
  av.pch.aveFit = [0];  //ave is for all avidians.
  av.pch.logFit = [0];  //log is for avidians that performm logic functions
  av.pch.aveCst = [0];  //Offspring Cost - used to be Offspring Cost
  av.pch.logCst = [0];
  av.pch.aveEar = [0];
  av.pch.logEar = [0];
  av.pch.aveNum = [0];
  av.pch.logNum = [0];
  av.pch.aveVia = [0];
  av.pch.nUpdate = [];    //not sure if this is needed.
  av.pch.aveMaxFit = 0.1;
  av.pch.aveMaxCst = 0.1;
  av.pch.aveMaxEar = 0.1;
  av.pch.aveMaxNum = 0.1;
  av.pch.aveMaxVia = 0.1;
  
  av.pch.aveDadFit = [0];  //Dad is for all avidians that have produced offspring
  av.pch.aveDadCst = [0];  //Offspring Cost - used to be gestation
  av.pch.aveDadEar = [0];
  av.pch.aveDadVia = [0];
  av.pch.aveDadMaxFit = 0.1;
  av.pch.aveDadMaxCst = 0.1;
  av.pch.aveDadMaxEar = 0.1;
  av.pch.aveDadMaxEar = 0.1;
  av.pch.aveDadMaxVia = 0.1;

  av.pch.logMaxFit = 0;
  av.pch.logMaxCst = 0;
  av.pch.logMaxEar = 0;
  av.pch.logMaxNum = 0;

//  console.log('av.sgr.numTasks=', av.sgr.numTasks);
  for (var ii=0; ii< av.sgr.numTasks; ii++) {
    numTsk = av.sgr.logEdNames[ii];
    tsk = av.sgr.logicNames[ii];
    av.pch.resrcGlobal[tsk] = [];
    av.pch.sgr[numTsk] = [];
  //  console.log('av.pch.resrcGlobal['+tsk+']=', av.pch.resrcGlobal[tsk]);
  };
  //console.log('______________________________________________________________________________');
  //console.log('av.pch.resrcGlobal=', av.pch.resrcGlobal);


  av.pch.fnBinary = '000000000';
  av.pch.dadFit = {};
  av.pch.dadCst = {};
  av.pch.dadEar = {};
  av.pch.dadNum = {};
  av.pch.dadVia = {};
  av.pch.numDads = 1;

  av.pch.maxX = 10;
  av.pch.maxY = 1;
  
  av.pch.ritYaxisNow = 'None';
  av.pch.ritYaxisWas = 'None';
  av.pch.lftYaxisNow = 'Average Fitness';
  av.pch.lftYaxisWas = 'Average Fitness';

  av.pch.makeTrace = function(xx, yy, type, mode, name, color, width, texture) {
    this.x = xx;
    this.y = yy;
    this.type = type;
    this.name = name;
    this.line = {};
    this.line.color = color;
    this.line.width = width;
    this.line.dash = texture;    //solid  dot  dash    dashdot
  };

  av.pch.trc = {};
  av.pch.traceList = {};

  av.pch.tracePop = new av.pch.makeTrace(av.pch.xx, av.pch.popY, 
               'scatter', 'lines', 'Population', 'black', 1, 'solid');
/*
  av.pch.tracePop = {
    x:av.pch.xx, y:av.pch.popY, type:'scatter', mode: 'lines', name: 'Population',
    line: {color: 'rgb(2, 2, 2)', width: 1, dash: 'solid' }
  };
*/
  av.pch.traceLog = {
    x:av.pch.xx, y:av.pch.logY, type:'scatter', mode: 'lines', name: 'Function Subset',
    line: {color: 'rgb(2, 2, 2)', width: 1, dash: 'dot' }
    //line: {color: '#00FF00', width: 1, dash: 'solid' }   //dash: (solid   dot    dashdot   dash
    //line: {color: '#00FF00', width: 1, dash: 'dot' }
  };
  av.pch.traceDad = {
    x:av.pch.xx, y:av.pch.logY, type:'scatter', mode: 'lines', name: 'Have Offspring',
    // line: {color: 'rgb(2, 2, 2)', width: 1, dash: 'dot' }
    //line: {color: '#00FF00', width: 1, dash: 'solid' }   //dash: (solid   dot    dashdot   dash
    line: {color: 'rgb(122, 0, 0)', width: 1, dash: 'solid' }
  };
  
  var sgrName;
  var dashtype;
  for (var ii=0; ii < av.sgr.numTasks; ii++) {
    numTsk = av.sgr.logEdNames[ii];
    tsk = av.sgr.logicNames[ii];
    numTsk = av.sgr.logEdNames[ii];
    dashtype = av.sgr.lineDash[ii];
    sgrName = av.sgr.oseNames[ii];
    nameColor = av.color[av.sgr.sugarColors[ii]][av.sgr.sugarNameShade]; 
    darkColor = av.color[av.sgr.sugarColors[ii]][av.sgr.sugarNameShade+10];
    pureColor = av.color[av.sgr.sugarColors[ii]][av.sgr.pureShade];
    if (ii+1 == av.sgr.numTasks) { pureColor = nameColor; };
    //console.log('tsk=', tsk, '; nameColo345r=', nameColor, '; color_255', av.color[av.sgr.sugarColors[ii]][255] );
    av.pch.trc[numTsk] = {
//      x:av.pch.xx, y:av.pch.sgr[numTsk], type:'scatter', mode: 'lines', name: sgrName, yaxis: "y2",
//      line: {color: av.color[av.sgr.sugarColors[ii]][av.sgr.sugarNameShade+10], width: 1, dash: dashtype }
      x:av.pch.xx, y:av.pch.sgr[numTsk], type:'scatter', mode: 'lines', name: sgrName, yaxis: "y2",
      line: {color: pureColor, width: 1, dash: dashtype }
    };
    //console.log('av.pch.resrcGlobal['+tsk+']=', av.pch.resrcGlobal[tsk] );
  };
  
  // used to set the size of #popChrtHolder and the chart
  av.pch.pixel = {wd: 310, ht: 202, wdif:20, hdif:8};  //hdif:2  //wdif was 10 which is not enough
  av.pch.pixel.htremove = 53;
  
  av.pch.data = [av.pch.tracePop, av.pch.traceLog];
  for (var ii=0; ii < av.sgr.numTasks-7; ii++) {
    numTsk = av.sgr.logEdNames[ii];
    av.pch.data[ii+2] = av.pch.trc[numTsk];
  };
  
  // not sure that we need both av.pch.popData and av.pch.data. 
  // Probalby could change all av.pch.popData to av.pch.data.  Tiba check this and fix later
  av.pch.popData = av.pch.data;
  
  
  av.pch.layout = {
    autosize: true,     //false
    width: 300,
    height: 200,
    margin: { l: 25, r: 20, b:40, t: 8},   //l was 85 to show a y-axis title, r: was 2 to go to edge
    showlegend: false,
    xaxis: {
      title: 'Time (updates)',
      rangemode: 'tozero',
      autorange: true,
      //range: [0, 10],
      showgrid: true,
      zeroline: true,
      showline: true,
      autotick: true,
      ticks: 'inside',
      showticklabels: true
    },
    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      //srange: [0, 1],
      showgrid: true,
      zeroline: true,
      showline: true,
      autotick: true,
      ticks: '',
      tickangle: -90,
      gridcolor: '#ccc',
      showticklabels: true
    },
    yaxis2: {
      // title: {text: 'Resource Amount' },
      //titlefont: {color: 'black'},
      //tickfont: {color: 'black'},
      rangemode: 'nonnegative', 
      autorange: true,
      overlaying: 'y',
      side: 'right',
      showgrid: true,
      zeroline: true,
      showline: true,
      autotick: true,
      ticks: 'inside',
      showticklabels: true,
      tickangle: -90,
      exponentformat: 'SI',
      visible: true
    }
  };
  av.pch.yRightTitle = 'Resource Amount';
  
    // Plotly configuration including that of the modebar
    // widg is also called config or configuration
    // https://plotly.com/javascript/configuration-options/
    // https://plot.ly/javascript/configuration-options/#hide-the-modebar-with-plotly.js
    // https://community.plot.ly/search?q=modebar%20options%20list    might also be useful
    av.pch.widg = {                // https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js
    autosizable: true              // plot will respect layout.autosize=true and infer its container size
    ,fillFrame: false              // if we DO autosize, do we fill the container or the screen?
    ,frameMargins: 0               // if we DO autosize, set the frame margins in percents of plot
    ,sizescrollZoom: true          // mousewheel or two-finger scroll zooms the plot
    ,showTips: true                // new users see some hints about interactivity
    ,showLink: false               // link to edit image of graph - this is an edit link outside of the modebar
    ,sendData: true                // if we show a link, does it contain data or just link to a plotly file?
    ,staticPlot: false             // no interactivity, for export or image generation
    ,displaylogo: false            // hides plotly logo
    ,displayModeBar: 'hover'       // display the mode bar (true, false, or 'hover')
    ,responsive: true        //added 2019_10 not sure I needed to
    ,modeBarButtonsToRemove: [     // https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
      'toImage'           //makes png file
      ,'sendDataToCloud'  //sends data to plotly web editor workspace
      //,'zoom2d'           //zoom to a box defined with cursor
      //,'pan2d'            //pan
      ,'select2d'         //this one does not seem to turn anything on/off
      ,'lasso2d'          //this one does not seem to turn anything on/off
      ,'zoomIn2d'           //zoom in
      ,'zoomOut2d'          //zoom out
      //,'autoScale2d'
      ,'resetScale2d'
        , 'hoverClosestCartesian'  //shows values as an (x,y) pair
        , 'hoverCompareCartesian'   //shows values (x at x axis) (y near y value)
        , 'toggleSpikelines'         //new button that sows horizotal and vertical lines to each axis from the nearest data point
    ]
  };
};

av.pch.clearPopChrt();

//------------------------------------------------------------------------------------------------- av.anl.clearChart --
av.anl = {};  //Analysis page functions and data
av.anl.color = [];   //holds the three colors for the three populations
av.anl.wrld = [];
av.anl.hasWrldData = [];     //I don't think this does anythig useful
av.anl.abbreviate = {};
av.anl.abbreviate['Average Fitness'] = 'Fitness';
av.anl.abbreviate['Average Offspring Cost'] = 'Cost';
av.anl.abbreviate['Average Energy Acq. Rate'] = 'EAR';
av.anl.abbreviate['Number of Organisms'] = 'Num';

av.anl.clearChart = function () {
  for (var ii = 0; ii < 3; ii++) {
    av.anl.wrld[ii] = {};
    av.anl.wrld[ii].left = [];
    av.anl.wrld[ii].right = [];
    av.anl.hasWrldData[ii] = false;

  }
  av.anl.xx = [];
  //av.anl.xx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  //av.anl.wrld[0].left = [1, 3, 2, 5, 4, 7, 6];
  //av.anl.wrld[0].right = [3, 5, 4, 7, 6, 9, 8, 11, 10];

  av.anl.trace0 = {
      x: av.anl.xx.slice(0,av.anl.wrld[0].left.length)
    , y: av.anl.wrld[0].left
    , type: 'scatter'
    , mode: 'lines'
    , name: 'tr0',
    line: {color: av.color.names['Red'], width: 3}
  };
  av.anl.trace1 = {
    x: av.anl.xx.slice(0,av.anl.wrld[0].right.length), y: av.anl.wrld[0].right, type: 'scatter', mode: 'lines', name: 'tr1', yaxis: 'y2',
    line: {color: av.color.names['Red'], width: 1}
  };
  av.anl.trace2 = {
    x: av.anl.xx.slice(0,av.anl.wrld[1].left.length), y: av.anl.wrld[1].left, type: 'scatter', mode: 'lines', name: 'tr2',
    line: {color: av.color.names['Blue'], width: 3}
  };
  av.anl.trace3 = {
    x: av.anl.xx.slice(0,av.anl.wrld[1].right.length), y: av.anl.wrld[1].right, type: 'scatter', mode: 'lines', name: 'tr1', yaxis: 'y2',
    line: {color: av.color.names['Blue'], width: 1}
  };
  av.anl.trace4 = {
    x: av.anl.xx.slice(0,av.anl.wrld[2].left.length), y: av.anl.wrld[2].left, type: 'scatter', mode: 'lines', name: 'tr4',
    line: {color: av.color.names['Black'], width: 3}
  };
  av.anl.trace5 = {
    x: av.anl.xx.slice(0,av.anl.wrld[2].right.length), y: av.anl.wrld[2].right, type: 'scatter', mode: 'lines', name: 'tr1', yaxis: 'y2',
    line: {color: av.color.names['Black'], width: 1}
  };

  av.anl.data = [av.anl.trace0, av.anl.trace1, av.anl.trace2, av.anl.trace3, av.anl.trace4, av.anl.trace5];
  //av.anl.data = [av.anl.trace0, av.anl.trace1];
  av.anl.layout = {
    autosize: false,
    margin: {l: 55, r: 55, b: 40, t: 10},   //l was 85 to show all-functions when y=0 not shown
    showlegend: false,
    xaxis: {
      title: 'Time (updates)',
      rangemode: 'tozero',
      autorange: true,
      showgrid: true,
      zeroline: true,
      showline: true,
      autotick: true,
      ticks: '',
      showticklabels: true
    },
    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      showgrid: true,
      zeroline: true,
      showline: true,
      autotick: true,
      ticks: '',
      showticklabels: true
    },
    yaxis2: {
      //title: 'yaxis2 title',
      titlefont: {color: 'rgb(148, 103, 189)'},
      tickfont: {color: 'rgb(148, 103, 189)'},
      overlaying: 'y',
      side: 'right'
    }
  };
  // Plotly configuration including that of the modebar
  // https://plot.ly/javascript/configuration-options/#hide-the-modebar-with-plotly.js
  av.anl.widg = {                // https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js
    autosizable: true              // plot will respect layout.autosize=true and infer its container size
    , fillFrame: false              // if we DO autosize, do we fill the container or the screen?
    , frameMargins: 0               // if we DO autosize, set the frame margins in percents of plot
    , sizescrollZoom: true          // mousewheel or two-finger scroll zooms the plot
    , doubleClick: 'reset+autosize' // double click interaction (false, 'reset', 'autosize' or 'reset+autosize')
    , showTips: true                // new users see some hints about interactivity
    , showLink: false               // link to edit image of graph - this is an edit link outside of the modebar
    , sendData: true                // if we show a link, does it contain data or just link to a plotly file?
    , staticPlot: false             // no interactivity, for export or image generation
    , displaylogo: false            // hides plotly logo
    , displayModeBar: 'hover'       // display the mode bar (true, false, or 'hover')
    ,responsive: true        //added 2019_10 not sure I needed to
    , modeBarButtonsToRemove: [     // https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
       'toImage'           //makes png file
      ,'sendDataToCloud'  //sends data to plotly web editor workspace
      //,'zoom2d'           //zoom to a box defined with cursor
      //,'pan2d'            //pan
      //,'select2d'         //this one does not seem to turn anything on/off
      //,'lasso2d'          //this one does not seem to turn anything on/off
      , 'zoomIn2d'           //zoom in
      //, 'zoomOut2d'          //zoom out
      //, 'autoScale2d'
      , 'resetScale2d'
      , 'hoverClosestCartesian'  //shows values as an (x,y) pair
      , 'hoverCompareCartesian'   //shows values (x at x axis) (y near y value)
      , 'toggleSpikelines'         //new button that sows horizotal and vertical lines to each axis from the nearest data point
    ]
  };
};
av.anl.clearChart();

//The plan was to create a non-linear slider with an array with break points, but I needed a way to convert
// from any number input as text to the value of the slider and I decided to stay with the log for now rather 
// dealing with interpulation for real numbers to find the clossest value in the array. 
/*
av.ptd.muteScaleAry = [];
av.ptd.muteScaleAry[0]="0";
var ii=0;
var jj=0;
var kk=0;
var breakpt = [0.01,   0.1,    1, 10,   100, 1000];
var step =  [0.0005, 0.005, 0.05,  0.5,   5,  10];
var fxplc = [   4,  3,   2,    1,  0,   0,    0];
do {
  ii++;
  av.ptd.muteScaleAry[ii] = (Number(av.ptd.muteScaleAry[ii-1]) + step[jj]).toFixed(fxplc[jj]);
  //console.log('ii=', ii, '; jj=', jj, '; kk=', kk, '; scale['+jj+']=', step[jj], '; breakpt['+jj+']=', breakpt[jj], '; av.ptd.muteScaleAry['+ii+']=', av.ptd.muteScaleAry[ii]);
  if ( breakpt[jj] <= Number(av.ptd.muteScaleAry[ii]) ) {
   av.ptd.muteScaleAry[ii] = Number(av.ptd.muteScaleAry[ii]).toFixed(fxplc[jj+1]);
   console.log('kk=', kk, '; muteScale.slice('+kk+')=', av.ptd.muteScaleAry.slice(kk) );
   jj++;
   kk = ii;
  }
} 
while (av.ptd.muteScaleAry[ii] < 100)
console.log('length =', av.ptd.muteScaleAry.length, 'max = ', av.ptd.muteScaleAry[av.ptd.muteScaleAry.length-1]);  
*/

  //-------------------------------------------------------------------------------------------- av.mousse.clearMouse --

av.mouse = {};

av.mouse.clearMouse = function (av) {
  'use strict';
  av.mouse.Dn = false;
  av.mouse.DnGridPos = [];
  av.mouse.UpGridPos = [];
  av.mouse.DnOrganPos = [];
  av.mouse.Move = false;
  av.mouse.Drag = false;
  av.mouse.ParentNdx = -1;
  av.mouse.ParentSelected = false;
  av.mouse.Picked = "";
};
av.mouse.clearMouse(av);

//offspring on grid
av.mouse.kidTarget = ['gridCanvas'   //canvas must be first in the list for conditional to work in av.mouse.kidMouse
  , 'organIcon'
  , 'organismsFzSec'
  , 'fzOrgan'
];

//parent on grid
av.mouse.dadTarget = ['organIcon'
  , 'gridCanvas'
  , 'trashCanImage'
  , 'activeOrgan'
];

//offspring on Organism View
av.mouse.sonTarget = ['organIcon'
  , 'organCanvas'
  , 'activeOrgan'
  , 'actOrgImg'
//    , 'activeOrgImg'
  ];

  av.mouse.dndTarget = ['organIcon'
    , 'organCanvas'
    , 'gridCanvas'
    , 'trashCanImage'
  ];

//list of dom elements on the Population page that need to have the mouse over shape/style changed for the drag n drop to look right
av.mouse.notDndPopList = ['colorMode'
  , 'TimeLabel'
  , 'popStatsBlock'
  , 'setupBlock'
  , 'populationBlock'
  , 'scaleCanvas'
  , 'trashDiv'
  , 'trashCanImage'
  , 'gridHolder'
  //freezer
  , 'fzOrgan'
  //menu Buttons
  , 'mnFile'
  , 'mnFreezer'
  , 'mnControl'
  , 'mnHelp'
  , 'mnDebug'
  , 'wsSavedMsg'
  , 'wsNameMsg'
  //Buttons
  , 'mainButtons'
  , 'ritePanelButton'
  , 'populationButton'
  , 'organismButton'
  , 'analysisButton'
  , 'newDishButton'
  , 'runStopButton'
  , 'freezeButton'
  , 'rescaleLabel'
  , 'zoomSlide'
  //statistics section
  , 'sotTitle'
  , 'nameLabel'
  , 'sotColorBox'
  , 'fitLabel'
  , 'energyAcqRateLabel'
  , 'offspringCostLabel'
  , 'ageLabel'
  , 'ancestorLabel'
  , 'viableLabel'
  , 'sotFun'
  , 'sotBotTbCls'
  , 'sotTimes'
  , 'notLabel'
  , 'nanLabel'
  , 'andLabel'
  , 'ornLabel'
  , 'oroLabel'
  , 'antLabel'
  , 'norLabel'
  , 'xorLabel'
  , 'equLabel'
  , 'notTime'
  , 'nanTime'
  , 'andTime'
  , 'ornTime'
  , 'oroTime'
  , 'antTime'
  , 'norTime'
  , 'xorTime'
  , 'equTime'
  , 'popStat'
  , 'popSizeLabel'
  , 'aFitLabel'
  , 'aEnergyAcqRateLabel'
  , 'aOffspringCostLabel'
  , 'aAgeLabel'
  , 'popStatsFunction'
  , 'psNumOrg'
  , 'notButton'
  , 'nanButton'
  , 'andButton'
  , 'ornButton'
  , 'oroButton'
  , 'antButton'
  , 'norButton'
  , 'xorButton'
  , 'equButton'
  , 'notPop'
  , 'nanPop'
  , 'andPop'
  , 'ornPop'
  , 'oroPop'
  , 'antPop'
  , 'norPop'
  , 'xorPop'
  , 'equPop'
  // chart
  , 'yaxis'
  , 'popChrtlftYaxLbl'
];
var lngth = av.mouse.notDndPopList.length;
av.mouse.notDndPopShape = [];
for (var ii = 0; ii < lngth; ii++) {
  av.mouse.notDndPopShape[ii] = 'default';
};

//Ind is for individual organism page
av.mouse.notDndIndList = ['colorMode'
  , 'populationBlock'
  , 'setupBlock'
  , 'popStatsBlock'
  , 'scaleCanvas'
  , 'trashCan'
  , 'organismCanvasHolder'
  , 'organCanvas'
  // Stats
  , 'notOrg'
  , 'nanOrg'
  , 'andOrg'
  , 'ornOrg'
  , 'oroOrg'
  , 'antOrg'
  , 'norOrg'
  , 'xorOrg'
  , 'equOrg'
  , 'notPerf'
  , 'nanPerf'
  , 'andPerf'
  , 'ornPerf'
  , 'oroPerf'
  , 'antPerf'
  , 'norPerf'
  , 'xorPerf'
  , 'equPerf'
  , 'cpuBufferCnvs'
  , 'cpuRegisterCnvs'
  , 'cpuStackAcnvs'
  , 'cpuStackBcnvs'
  , 'cpuOutputCnvs'
  , 'InstructionDetail'
  , 'ExecuteJust'
  , 'ExecuteAbout'
  //Buttons
  , 'populationButton'
  , 'organismButton'
  , 'analysisButton'
  //, 'orgSetting'
  , 'cycleSlider'
  , 'orgCycle'
  , 'orgReset'
  , 'orgBack'
  , 'orgRun'
  , 'orgForward'
  , 'orgEnd'
];
var lngth = av.mouse.notDndIndList.length;
av.mouse.notDndIndShape = [];
for (var ii = 0; ii < lngth; ii++) {
  av.mouse.notDndIndShape[ii] = 'default';
};

//console.log('end of globals');

//----------------------------------------------------------------------------------------------------------------------
// Notes on page layout
//----------------------------------------------------------------------------------------------------------------------
// AllAvida: 937
// Population page: Initial assume a square grid and both sidebars open. 
// navColID or navColClass: wd = 152 includling 2px for a 1 px border. 
//     (minimum nice wd) about 84 too narrow, but works. 
// mainBlockHolder: wd = 
// rightInfoHolder: mn wd = 500 inlcuding border
// popStatsBlock: min wd = 364 no border. 
// selOrgType: min wd = 164  (might make a tad smaller) includes 1 px border
// popStats4grid: min wd = 176   (get left over)

