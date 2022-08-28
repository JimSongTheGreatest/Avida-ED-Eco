
 // this version uses grid box layout for major sections (toop, left side, main, right side)  
 // if (av.dbg.flg.root) { console.log('Root: avidaED.js at beginning of file on 2020_0111 @ 20:21'); };
 console.log('Root: avidaED.js at beginning of file on 2022_804_Sat'); 

// need a server to run Avida-ED from a file. The one below works.
// python server.py                    for http://localhost:8000/
// python -m SimpleHTTPServer 
// python -m SimpleHTTPServer 8004  to put on 8004 instead of 8000
// Then visit http://localhost:8004/   on browser
//
// Using NetBeans as IDE in 2019 Different versions exists see
// https://netbeans.apache.org/download/archive/index.html
//
//----------------------------------------------------------------------------------------------------------------------
// Ideally I would have listed the hashtag or the complied version of Avida that goes with each veersion of Avida-ED
//  - in reality this did not happen. Or if at least I had thee ID of the commit on github that would have been good.
//  - the instructions below are supposed to tell one how to get a hash number for compiled emspcripten, but I'm not
//    really sure what the instructions mean. 
//  
// Git commands used to push
// git add .
// git commit -m 'comment about the change being pushed'
// git commit    then use editor to make the comment.
// i to insert text in vim; escape to get out of insert mode
// :wq will write and then quit vim
// git push -u origin master
//
// Get hashtag of avida side to state which version of avida works with this version of av_ui
// git rev-parse HEAD
//
// To get a local copy of a pull request:
// git pull origin pull/18/head    //where '18' is the number of the pull request
//
// github.com now requires personal access tokens
// log in at 
// https://github.com/settings/tokens/677090811/regenerate
// generate a new access token. 
// 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
// git2021_819a Expires on Sun, Jan 30 2022. 
// 
// This url states that it will automatically add to keychain if use to push or clone a repository
// https://gist.github.com/jonjack/bf295d4170edeb00e96fb158f9b1ba3c?fbclid=IwAR2ZsG8_wGUJtUtMSLNVCpKX-PuVG0IfaXGzOHBEAGqQ66Fxzomvih2BCSA
// 
// more information about Access Tokens
// https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/
// 
// Avida -------------------
//
// to thet the parse value go to the current version of avida folder and
// git rev-parse --short HEAD
//
// 4814740943 this might be the hash number for avida.js, but not sure
//
// Versions -------------------------------------------------------------------------------------------------------
// The main change are the limited Resources
//
// The main function change from Avida-ED 3 to four is the addition of limited and gird (local) resources
// Layout was changed on Population Page 
// all files in tthe workspace now have a three letter sufix; *.txt was added to those missing a suffix
// 
// Avida-ED 4.0.0
// - a basic verison works there will be an advanced mode as well, but it is not ready yet
//   Basic Mode only has global resources. 
//    - infinite, none, finte and chemostat. 
//    
// Avida-ED 4.0.01
//  - fixed ability to change the color of a trace on the Analysis page
//  - fixed legend for ancestor organism 
// 
// Avida-ED 4.0.02
//  - The focus was staying on the grid cell if one was selected, which prevented typing in text
//    Changed this so that when the cusor is in a input area then then that gets the keyboard input
//  - added Avida-ED version number remind folks this is a beta version 
// 
// Avida-ED 4.0.03
//  - Changed resource type from Infinite/Finite to Unlimited/Limited
//  - Changed it so that the heat map scale for Fitness does not changed until after 10,000 updated for Cory. tiba
//  - updated the following libraries to the versions listed
//  - - dojo-release-1.16.4
//  - - jquery-v3.4.1.min
//  - - FileSaver.min.2.0.4
//    
// Avida-ED 4.0.04 (2021_804)
// - merged av4ths back to main
// - cleaned testing workspace
// - made world (grid) canvas so that it is sized based on inital viwport size and does not change size.
// - Yemi fixed right and left side panel buttons so they can be open or closed. 
// - more work on resource UI and converting from environment.cfg -> av.env -> UI -> av.env -> environment.cfg
// - Yemi added drag bars between main and left and right sidebars
// - - there are some overflow and extra space gaps that need more work. 
// - Main area including canvas in main area for Population and Organism Pages now resize with Viewport size change.
// - - they also change size in response to change in size of left and/or right side panels
// - Removed server.py as it is no longer in use
// - Removed functions no longer in use in avidaED.js and reSizePageParts.js
// - changed visible.css to resize.css for css specific to resizeing
// - fixed formatting issues in labinfoHoldCls
//
// Avida-ED 4.0.05 (2021_826)
// 
// Avida-ED 4.0.06 (2021_812) Dragula branch
// 
// Avida-ED 4.0.09 Beta
// - working with Dragula
// 
// Avida-ED 4.0.10 Beta
// - mostly more formating and making the site look 'pretty'
// 
// Avida-ED 4.0.11 Beta
// - changing options and labels on the mini-chart on the Population Page
//
// Avida-ED 4.0.14 Beta
// - cleaned up formatting on Statistics Tables on Population Page
// - working on formatting on Left & Right mini-chart Y axis and Pause Run at sections
// - Added utilities to look for elements with overlow in reSizePageParts.js
//
// Avida-ED 4.0.16 Beta
// - repaired drag-n-drop so that the cursor changes shape to cue the user
// - Analysis: need to fix clicking on instruction circle to get the instruction number. 
// - - loook at mouseDown, line 70
// 
// Generic Notes -------------------------------------------------------------------------------------------------------
//
// [option]<alt>{go} to get library in the list for finder
//
// to have chrome run from file
// Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files
// 
// Path in TX for Filezilla /var/www/vhosts/bwng/public_html/projects/Avida-ED
//                          /var/www/vhosts/bwng/public_html/projects/
//
//----------------------------------------------------------------------------------------------------------------------
//  Notes on problems below:
//---------------------------------------------------------------------------------------------------------- Problems --
//  
//  Population Page -------
//  
//  the avidaDataRecorder.csv does not export correctly, but is created correctly when the population is frozen
//  
//  In the environment.cfg file I wrote, I put one unit or resouce in each cell for grid; unlimited. I need to have 
//  the same amount of resouce as in the default so it will default to the corret courrect amount if the user changes from 
//  infimite to limited in the UI. 
//  
//  I think it will write to have the default amount of resource for that region. 
//  
//  Looking at loading default files and perhaps we need to add default values for limited when limited is selected even 
//  there is no limited in the config file. 
//  
//  Oraganism Page -------
//  
//  
//  Analysis page
//  
//  Fix av.anl.widg = {   statement on globals in Avida-ED 3.2 to match the one in Avida-ED-4 ecology
//  
//----------------------------------------------------------------------------------------------------------------------


// if (av.dbg.flg.root) { console.log('Root: before require statement'); }
var av = av || {};  //incase av already exists
var dojo = dojo || {};

define.amd.jQuery = true;
require([
  'maqetta/space',
  'maqetta/AppStates',
  'dijit/dijit',
  'dijit/registry',
  'dijit/form/Button',
  'dijit/form/Select',
  'dijit/form/HorizontalSlider',
  'dijit/form/HorizontalRule',
  'dijit/form/HorizontalRuleLabels',
  'dijit/form/RadioButton',
  'dijit/form/NumberSpinner',
  'dijit/form/ComboButton',
  'dijit/form/DropDownButton',
  'dijit/form/ComboBox',
  'dijit/form/Textarea',
  'dijit/Dialog',
  'dijit/layout/BorderContainer',
  'dijit/layout/ContentPane',
  'dijit/MenuBar',
  'dijit/PopupMenuBarItem',
  'dijit/MenuItem',
  'dijit/Menu',
  'dijit/TitlePane',
  'dojo/parser',
  'dojo/_base/declare',
  'dojo/query',
  'dojo/NodeList-traverse',
  'dojo/dnd/Source',
  'dojo/dnd/Manager',
  'dojo/dnd/Selector',
  'dojo/dnd/Target',
  'dojo/dom-geometry',
  'dojo/dom-style',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/aspect',
  'dojo/on',
  'dojo/request/xhr',
  'dojo/ready',
  //next line from avidaEdEco.html
  //            {'name':'jquery','location':'../jquery/dist','main':'jquery'},   // older version
  'jquery',
  'jquery-ui',   //used primarily for the jquery slider. It can go away if the slider goes away. 
                // line from avidaEdEco.html        <link rel='stylesheet' href='lib/jquery-ui/themes/smoothness/jquery-ui.css'>
  //'lib/plotly-latest.min.js',   //updatd to plotly_v1.44.3.js on 2018_0915
  //'lib/plotly.js',               //version  plotly_v1.44.3   as of 2018
  //'lib/plotly-v1.53.min.js',      //2020_0409 production
  'lib/plotly-v1.53.js',      //2020_0409 development
  //'lib/dragula/dragula-v3.7.2.min.js',

  //'lib/jszip.min.js',        //older version. Not sure what version
  'lib/jszip-v2.6.1.js',        //need to update, but need to figure out update methods. tiba
  //'lib/jszip-v3.3.0.js',         //current version on 2020_0404, but code changes needed that have not been done. development
  //'lib/jszip-v3.3.0.min.js',     //current version on 2020_0404, but code changes needed that have not been done. production
  //'lib/jszip-v3.2.0.min.js',     //newest version but I have not figure out how to get it to work. 
  //'lib/FileSaver_v1.1_date-2016_0328.js',
  //'lib/FileSaver-2.0.3/FileSaver.min.js',
  'lib/FileSaver.min.2.0.4.js',
  //'lib/FileSaver.js',
  //'avida-messages.js',
  'messaging.js',
  'initializeDomReadyItems.js',
  'fileDataRead.js',
  'fileDataWrite.js',
  'fileIO.js',
  'populationGrid.js',
  'organismView.js',
  //'dojoDnd.js',
  'popControls.js',
  'mouse.js',
  'mouseDown.js',
  'environmentRead.js',
  'environment2UI.js',
  'environmentWrite.js',
  'sugar_ui.js',
  'reSizePageParts.js',
  //'restartAvida.js',
  //'diagnosticconsole.js',
  'dojo/domReady!'
], function (space, AppStates, dijit, registry,
  Button, Select,
  HorizontalSlider, HorizontalRule, HorizontalRuleLabels, RadioButton, NumberSpinner, ComboButton,
  DropDownButton, ComboBox, Textarea,
  Dialog,
  BorderContainer, ContentPane, MenuBar, PopupMenuBarItem, MenuItem, Menu,
  TitlePane, parser, declare, query, nodelistTraverse,
  dndSource, dndManager, dndSelector, dndTarget, domGeometry, domStyle, dom, domConst,
  aspect, on, xhr,
  ready, $, jqueryui, Plotly, //fileDownload,  //Blob.js,
  JSZip, FileSaver) {
  'use strict';
  if (av.dbg.flg.root) { console.log('before type of $'); }
  if (typeof $ != 'undefined') {
    // jQuery is loaded => print the version
    console.log('Jquery ($) is defined.');
    av.jqueryVersion = ($.fn.jquery);
  } else {
    console.log('Jquery ($) is not defined.');
  }
  if (av.dbg.flg.root) { console.log('after type of $'); }

  //console.log('dojo version', dojo.version.toString());
  parser.parse();

  /********************************************************************************************************************/
  // * The files at the end of the require list contain code specific to Avida-ED.
  // * The functions they contain can access the dom. They cannot access functions defined anywhere
  // * else in the project. This has resulted in some code split between AvidaED.js and the various
  // * other files.
  // *
  // * The files included in script tags in AvidaED.html cannot access the dom. They contain global
  // * variables and functions that are independent of the dom
  // *

  /********************************************************************************************************************/
  // Splash Screen code stopped when ready message from Avida
  /********************************************************************************************************************/
  setTimeout(function () {
    if (!av.ui.loadOK) {
      //alert('Avida-ED failed to load, please try re-loading');
      document.getElementById('appReloadDialog').style.display = 'show';
    }
  }, 121000);

  /********************************************************************************************************************/
  // if (av.dbg.flg.root) { console.log('Root: after splash screen code'); }
  // -------------------------------------------------------------------------------------------------------------------
  // Initialize variables that depend on files loaded in requirement statement
  // -------------------------------------------------------------------------------------------------------------------

  // if (av.dbg.flg.root) { console.log('Root: before av.dom.load'); };
  av.dom.load();
  av.dom.initilizeDigitData();
  av.dom.initilizeAnalizePage(); 
  av.parents.clearParentsFn();

  //********************************************************************************************************************
  // Web worker to talk to Avida
  //********************************************************************************************************************

  // Avida as a web worker
  // if (av.dbg.flg.root) { console.log('Root: before call avida'); }
  //
  // if (av.dbg.flg.root) { console.log('Root: typeof(av.aww.uiWorker', typeof(av.aww.uiWorker)); }
  if (typeof (Worker) !== 'undefined') {
    //console.log('Worker type is not undefined');
    if (null === av.aww.uiWorker) {
      av.aww.uiWorker = new Worker('avida.js');
      //console.log('webworker created');
      av.debug.log += '\n     --note: av.aww.uiWorker was null, started a new webworker';
    } else { console.log('av.aww.uiWorker is not null'); }
  } 
  else {
    userMsgLabel.textContent = "Sorry, your browser does not support Web workers and Avida won't run";
  };

  //process message from web worker
  // if (av.dbg.flg.root) { console.log('Root: before dnd triggers'); }
  av.aww.uiWorker.onmessage = function (ee) {
    //console.log('avida_ee', ee);
    av.msg.readMsg(ee);
  };  // in file messaging.js

  //*******************************************************************************************************************
  // Mouse DND functions
  //*******************************************************************************************************************

  //mouse click started on Organism Canvas - only offspring can be selected if present
  $(document.getElementById('organCanvas')).on('mousedown', function (evt) {
    av.post.addUser('mousedown: organCanvas(' + evt.offsetX + ', ' + evt.offsetY + ')');
    av.mouse.downOrganCanvasFn(evt);
  });

  //if a cell is selected, arrow keys can move the selection
  $(document).keydown(function (event) {
    //av.post.addUser(' ');   //in av.mouse.arrowKeyOnGrid
    //console.log('keydown.event=', event);
    av.mouse.arrowKeysOnGrid(event);
  });

  //-------------------------------------------------------------------------------- .hover change mouse cursor shape --
  var mouseDown = false;
  $(document).mousedown(() => { mouseDown = true;}).mouseup(() => {mouseDown = false;});
    $(av.dnd.activeConfig).hover(
      () => {
        if (mouseDown) {
          document.body.style.cursor = 'no-drop';
        }
      }, 
      () => {
        if (mouseDown) {
          document.body.style.cursor = 'copy';
        } else {
          document.body.style.cursor = 'default';
        }
      });
    $(av.dnd.ancestorBox).hover(
      () => {
        if (mouseDown) {
          document.body.style.cursor = 'no-drop';
        }
      }, 
      () => {
        if (mouseDown) {
          document.body.style.cursor = 'copy';
        } else {
          document.body.style.cursor = 'default';
        }
      });
    $(av.dnd.trashCan).hover(
      () => {
        if (mouseDown) {
          if (av.grd.runState === "started") {
            document.body.style.cursor = 'no-drop';
          }
        }
      }, 
      () => {
        if (mouseDown) {
          document.body.style.cursor = 'copy';
        } else {
          document.body.style.cursor = 'default';
        }
      });

  //---------------------------------------------------------------------------- end .hover change mouse cursor shape --

  //av.mouse down on the grid
  $(av.dom.gridCanvas).on('mousedown', function (evt) {
    av.post.addUser('mousedown: gridCanvas(' + evt.offsetX + ', ' + evt.offsetY + ')');
    //console.log('mousedown: gridCanvas(' + evt.offsetX + ', ' + evt.offsetY + ')');
    av.mouse.downGridCanvasFn(evt, 'av.mouse.downGridCanvasFn');
  });

  //When mouse button is released, return cursor to default values
  $(document).on('mouseup touchend', function (evt) {
    'use strict';
    var target = '';
    //if (av.dbg.flg.mouse) console.log('in mouseup target:', evt.target.id, '; event:', evt);
    if (av.dbg.flg.mouse) console.log('in mouseup target:', evt.target.id);
    if (av.dbg.flg.mouse) console.log('AvidaED.js: mouse.UpGridPosX, y', av.mouse.UpGridPos[0], av.mouse.UpGridPos[1]);
    // after everything, reset cursor
    document.body.style.cursor = "default";
    av.mouse.Dn = false;

    // --------- process if something picked to dnd ------------------
    if ('parent' == av.mouse.Picked) {
      av.mouse.Picked = '';
      av.mouse.ParentMouse(evt, av);
      if ('gridCanvas' == evt.target.id || 'trashCanImage' == evt.target.id) {
        av.grd.drawGridSetupFn('on mouseup where evt.target.id=gridCanvas or trashCanImage');
      } else if ('organIcon' == evt.target.id) {
        //Change to Organism Page
        av.ui.mainBoxSwap('organismBlock');
        av.ind.organismCanvasHolderSize('mouseup_organIcon_parent');
        av.ui.adjustOrgInstructionTextAreaSize();
        if (av.dbg.flg.mouse)
          console.log('from parent', av.parent, '; fzr', av.fzr);
        av.post.addUser('Dragged item to Organism Icon');
        av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
      }
    } 
    // this is for organism page
    else if ('offspring' == av.mouse.Picked) {
      target = av.mouse.offspringMouse(evt, 'document.on_mouseup_touchend');
      av.mouse.Picked = '';
    } 
    // this is for population page
    else if ('kid' == av.mouse.Picked) {
      av.mouse.Picked = '';
      target = av.mouse.kidMouse(evt, av.dnd, av.fzr, av.grd);
      if (av.dbg.flg.mouse)
        console.log('kidMouse: target', target, '===============', evt.target.id);
      if ('organIcon' == evt.target.id) {
        //Change to Organism Page
        av.ui.mainBoxSwap('organismBlock');
        av.ind.organismCanvasHolderSize('mouseup_organIcon_Kid');
        av.ui.adjustOrgInstructionTextAreaSize();
        av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
      } 
    }
    av.mouse.Picked = '';
  });

  //********************************************************************************************************************
  // Remind user if they might need to save their workspace
  //********************************************************************************************************************

  //from Avida-ED 3
  //http://stackoverflow.com/questions/20773306/mozilla-firefox-not-working-with-window-onbeforeunload  //not used
  //More usefull websites to catch errors
  // https://davidwalsh.name/javascript-stack-trace
  // https://danlimerick.wordpress.com/2014/01/18/how-to-catch-javascript-errors-with-window-onerror-even-on-chrome-and-firefox/
  //to send e-mail  http://stackoverflow.com/questions/7381150/how-to-send-an-email-from-javascript

  // how to send e-mail
  // http://www.codeproject.com/Questions/303284/How-to-send-email-in-HTML-or-Javascript

  // selected text
  // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  // http://www.javascriptkit.com/javatutors/copytoclipboard.shtml

  //http://www.technicaladvices.com/2012/03/26/detecting-the-page-leave-event-in-javascript/
  window.onbeforeunload = function (event) {
    console.log("in window.onbeforeunload = function (event)");
    if (!av.ui.sendEmailFlag) {
      if ('no' === av.fzr.saveState || 'maybe' === av.fzr.saveState) {
        return 'Your workspace may have changed sine you last saved. Do you want to save first?';

        // this needs to be inside the if that checks the value of av.fzr.saveState
        // yes it gives an error: 'unreachable code after return statement'
        // but it must be here to get the pop up message in Firefox. 
        // Want pop up message when user tries to leave page,
        //   if the user saved anything to the freezer this session
        // e.stopPropagation works in Firefox.
        if (event.stopPropagation) {
          event.stopPropagation();
          event.preventDefault();
        }  //end fireFoxs
      }
    }
  };
  //end from Avida-ED 3

/* version Yemi fixed. Delete in 2022
  window.onbeforeunload__ = function (event) {
  console.log('window.onbeforeunload: av.ui.sendEmailFlag =', av.ui.sendEmailFlag, '; av.fzr.saveState = ', av.fzr.saveState);
    if (!av.ui.sendEmailFlag) {
      if ('no' === av.fzr.saveState || 'maybe' === av.fzr.saveState) {
        return 'Your workspace may have changed sine you last saved. Do you want to save first?';

        if (event.stopPropagation) {
          event.stopPropagation();
          event.preventDefault();
        }
      };      
    }
  };
*/

  // if (av.dbg.flg.root) { console.log('Root: before Error Logging'); }
  //********************************************************************************************************************
  // Error logging
  //********************************************************************************************************************
  //https://bugsnag.com/blog/js-stacktracess
  //http://blog.bugsnag.com/js-stacktraces
  window.onerror = function (message, file, line, col, error) {
    //console.log('in window.onerror 633');
    av.dom.runStopButton.innerHTML = 'Run';  
    av.debug.finalizeDtail();
    av.debug.triggered = 'errorTriggered';
    av.post.postLogPara = 'Please send the info below to Help us make Avida-ED better by clicking on the [Send] button';
    av.debug.sendLogPara1 = 'The error is at the beginning and end of the session log in the text below.';
    av.debug.postEmailLabel = 'Please include your e-mail if you would like feed back or are willing to further assist in debug';
    av.debug.postNoteLabel = 'Please include any additional comments in the field below.';
    av.debug.postEmailLabel = 'Please include your e-mail for feedback or so we can discuss the problem further';
    av.debug.error = 'Error: ' + message + ' from ' + file + ':' + line + ':' + col;
    av.debug.sendLogScrollBox = av.debug.error + '\n\n' + av.fio.mailAddress + '\n\n' + av.debug.log + '\n\nDebug Details:\n' + av.debug.dTail + '\n\n' + av.debug.error;

    //console.log('inside Window.on_Error: before call problemWindow');
    av.ui.problemWindow('window.onerror');
  };

  //--------------------------------------------------------------------------------------------------------------------
  //More usefull websites to catch errors
  // https://davidwalsh.name/javascript-stack-trace
  // https://danlimerick.wordpress.com/2014/01/18/how-to-catch-javascript-errors-with-window-onerror-even-on-chrome-and-firefox/
  //to send e-mail  http://stackoverflow.com/questions/7381150/how-to-send-an-email-from-javascript

  // how to send e-mail
  // http://www.codeproject.com/Questions/303284/How-to-send-email-in-HTML-or-Javascript

  // selected text
  // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  // http://www.javascriptkit.com/javatutors/copytoclipboard.shtml

  // if (av.dbg.flg.root) { console.log('Root: defore av.ui.problemWindow'); }
  
  //--------------------------------------------------------------------------------------------- av.ui.problemWindow --
  //process problme pop-up window
  av.ui.problemWindow = function (from) {
    console.log(from, 'called av.ui.problemWindow');
    av.debug.vars = {
      isBlink: av.brs.isBlink,
      isChrome: av.brs.isChrome,
      isEdge: av.brs.isEdge,
      isFirefox: av.brs.isFirefox,
      isIE: av.brs.isIE,
      isOpera: av.brs.isOpera,
      isSafari: av.brs.isSafari
    };

    av.debug.postData = {
      version: av.ui.version,
      userInfo: window.navigator.userAgent,
      screenSize: av.brs.userData.screen,
      comment: 'userComment',
      error: av.debug.error,
      email: 'user email if provided',
      triggered: av.debug.triggered,
      logs: {
        details: av.debug.dTail,
        session: av.debug.log
      },
      freezer: JSON.stringify(av.fzr),
      vars: av.debug.vars
    };
    //console.log('postData=', av.debug.postData); 

    //Until we get sending data to database figure out. Switch between post and e-mail session log
    if (false) {
      console.log('sendLogModalID=', document.getElementById('sendLogModalID') );
      //Need to be able to get rid of these three lines for postPost. will crash without them now.
      document.getElementById('sendLogModalID').style.display = "block";  //textarea must be visable first
      av.dom.sendLogScrollBox.focus();   //must not be commented out or extra error
      document.getElementById('sendLogModalID').style.display = "none";   //sendLogDialog.hide();  
      av.post.sendWindow('av.ui.problemWindow');
    }
    //e-mail in production version until database worked out.
    else {
      av.post.emailWindow('av.ui.problemWindow');
    }
  };
  //----------------------------------------------------------------------------------------- end av.ui.problemWindow --


  //--------------------------------------------------------------------------------------------- av.post.emailWindow --
  av.post.emailWindow = function (from) {
    console.log(from, 'called av.post.emailWindow');
    av.dom.sendLogScrollBox.textContent = av.debug.sendLogScrollBox;
    av.dom.sendLogPara1.textContent = av.debug.sendLogPara1;
    $('#sendLogPara2').text(av.debug.sendLogPara2);

    //document.getElementById('postLogTextarea').textContent = av.debug.sendLogScrollBox;
    //document.getElementById('postLogPara').textContent = av.debug.sendLogPara;

    document.getElementById('sendLogModalID').style.display = 'block';  //sendLogDialog.show();  //textarea must be visable first
    av.dom.sendLogScrollBox.focus();
    //av.dom.sendLogScrollBox.select();  //https://css-tricks.com/snippets/javascript/auto-select-textarea-text/
  };

  av.ui.closeSendModalFn = function(){
    document.getElementById('sendLogmodalID').style.display = 'none';
  };

  //---------------------------------------------------------------------------------------------- av.post.sendWindow --
  av.post.sendWindow = function (from) {
    console.log(from, 'called av.post.sendWindow; used for database; not email');
    av.dom.postLogPara.textContent = av.post.postLogPara;  //textarea must be visable first
    document.getElementById('postLogModalID').style.display = 'block';
    av.dom.postVersionLabel.textContent = av.ui.version;
    av.dom.postScreenSize.textContent = av.brs.userData.screen;
    av.dom.postUserInfoLabel.textContent = window.navigator.userAgent.toString();
    av.dom.postError.textContent = av.debug.error;
    av.dom.postError.style.color = 'red';
    av.dom.postEmailLabel.textContent = av.debug.postEmailLabel;
    av.dom.postNoteLabel.textContent = av.debug.postNoteLabel;
    av.dom.postStatus.textContent = av.debug.postStatus;
    av.dom.postLogTextarea.textContent = av.debug.log;
    av.dom.postdTailTextarea.textContent = av.debug.dTail;
    av.dom.postProblemError.textContent = '';
  };

  window.addEventListener('error', function (evt) {
    console.log('In window.addEventListener: event listener', evt);
  });
  //--------------------------------------------------------------------------------------------
  //http://www.technicaladvices.com/2012/03/26/detecting-the-page-leave-event-in-javascript/
  //Cannot get custom message in Firefox (or Safari for now)

// the function 'postPost' below used to use dojo.toJson(obj)
// https://dojotoolkit.org/reference-guide/1.7/dojo/toJson.html
// On 2022_801 this was changed JSON.stringify(obj) 
// https://www.w3schools.com/js/js_json_stringify.asp

// part of updating database
  on(document.getElementById('postPost'), 'click', function () {
    console.log('in on(document.getElementById(postPost)');
    av.post.addUser('Button: postPost');
    //Data to send
    av.debug.postData.email = av.dom.postEmailInput.value;
    av.debug.postData.comment = av.dom.postComment.value;
    console.log('postData=', av.debug.postData);

    av.dom.postStatus.textContent = 'Sending';
    av.dom.postProblemError.textContent = '';

    //domConst.place('<p>sending message</p>', 'postStatus');
    var hostname = 'https://avida-ed.msu.edu/developer/report/receive';

    xhr.post(//Post is a helper function to xhr, a more generic class
      hostname, //URL parameter
      {//Data and holding parameter
        // data: dojo.toJson(av.debug.postData), //This function takes an object and converts it to a String serialization of that object.
        data: JSON.stringify(av.debug.postData),
        headers: {'X-Requested-With': null}
      }
    ).then(function (received) { //Promise format; received data from request (first param of then)
      av.dom.postStatus.textContent = 'Received';
      //domConst.place('<p>Data received: <code>' + JSON.stringify(received) + '</code></p>', 'postStatus');
    }, function (err) { //Error handling (second param of then)
      av.dom.postStatus.textContent = 'Error';
      av.dom.postProblemError.textContent = 'Please send an e-mail to ' + av.fio.mailAddress + ' about the error sending a Problem Report';
      av.dom.postProblemError.style.color = 'red';

      //domConst.place('<p>Error: <code>' + JSON.stringify(err) + '</code></p>', 'postStatus');
    }
    ); // End then
  }); // End on's function and on statement

  //http://stackoverflow.com/questions/7080269/javascript-before-leaving-the-page
  av.ui.sendLogEmailFn = function () {
    console.log('in sendLogEmailFn');
    av.ui.sendEmailFlag = true;
    av.post.addUser('Button: sendEmail');
    var link = 'mailto:' + av.fio.mailAddress +
      //'?cc=CCaddress@example.com' +
      '?subject=' + escape('Avida-ED session log') +
      '&body=' + escape(av.debug.sendLogScrollBox);
    window.location.href = link;
    av.ui.sendEmailFlag = false;
  };

  /* 
  //http://stackoverflow.com/questions/7080269/javascript-before-leaving-the-page
    dijit.byId('sendEmail').on('Click', function () {
      av.ui.sendEmailFlag = true;
      av.post.addUser('Button: sendEmail');
      var link = 'mailto:' + av.fio.mailAddress +
        //'?cc=CCaddress@example.com' +
        '?subject=' + escape('Avida-ED session log') +
        '&body=' + escape(av.debug.log);
      window.location.href = link;
      av.ui.sendEmailFlag = false;
    });
  */

  av.debug.finalizeDtail = function () {
    //finalize dTail
    //dom dimensions clientWidth clientHeight scrollWidth scrollHeight innerWidth innerHeight outerWidth outerHeight
    //assignment must have units and is a string style.width style.height
    av.debug.dTail = ''
      + '\nmapHolder.client wd Ht = ' + av.dom.mapHolder.clientWidth + '  ' + av.dom.mapHolder.clientHeight
      + '\nmapHolder.scroll wd Ht = ' + av.dom.mapHolder.scrollWidth + '  ' + av.dom.mapHolder.scrollHeight
      + '\n  gridHolder.client wd Ht = ' + av.dom.gridHolder.clientWidth + '  ' + av.dom.gridHolder.clientHeight
      + '\n  gridHolder.scroll wd Ht = ' + av.dom.gridHolder.scrollWidth + '  ' + av.dom.gridHolder.scrollHeight
      + '\n  gridCanvas.client wd Ht = ' + av.dom.gridCanvas.clientWidth + '  ' + av.dom.gridCanvas.clientHeight
      + '\n  gridCanvas.scroll wd Ht = ' + av.dom.gridCanvas.scrollWidth + '  ' + av.dom.gridCanvas.scrollHeight
      + '\n' + av.debug.dTail;
  };

  //**********************************************************************************************************************
  // Menu Buttons handling
  //**********************************************************************************************************************
  // if (av.dbg.flg.root) { console.log('Root: dijit test', dijit.byId('mnFlOpenDefaultWS')); }

  // if (av.dbg.flg.root) { console.log('Root: before mnFlOpenDefaultWS'); }

  //=====refactored========
  document.getElementById("mnFlOpenDefaultWS").onclick = function () {
    "use strict";
    av.post.addUser("Button: mnFlOpenDefaultWS");
    av.fio.useDefault = true;
    if ("no" === av.fzr.saveState) {
      sWSfModalID.show(); 
    } else {
      av.fio.readZipWS(av.fio.defaultFname, false); //loadConfigFlag = false = do not load config file
    }
  };

  // ===Original - Save current workspace====
  // dijit.byId("sWSfSave").on("Click", function () {
  //   av.post.addUser("Button: sWSSave");
  //   //console.log('before call save workspace');
  //   av.fio.fzSaveCurrentWorkspaceFn(); //fileIO.js
  //   //console.log('after call to save workspace');
  // });

  // ===refactored - Save current workspace====
  document.getElementById("sWSfSave").onclick = function () {
    av.post.addUser("Button: sWSSave");
    av.fio.fzSaveCurrentWorkspaceFn();
  };

  // ===refactored -Open Workspace====
  document.getElementById("sWSfOpen").onclick = function () {
    av.post.addUser("Button: sWSfOpen");
    sWSfModalID.hide(sWSfModalID.hide);
    if (av.fio.useDefault) {
      av.fio.readZipWS(av.fio.defaultFname, false);  //loadConfigFlag = false = do not load config file
    }  
    //false = do not load config file
    else {
      //document.getElementById('inputFile').click();  //to get user picked file
      document.getElementById('putWS').click();  //to get user picked file
    }
  };

  // open and read user picked file
  //--------------------------------------------------------------------------------------------------------------------
  //=====refactored========
  document.getElementById("mnFlOpenWS").onclick = function () {
    "use strict";
    av.post.addUser("Button: mnFlOpenWS");
    av.fio.useDefault = false;
    if ('no' === av.fzr.saveState) {
      sWSfModalID.show();   //Need to change to include might be saved tiba fix
    }
    //else document.getElementById('inputFile').click();
    else {
      document.getElementById('putWS').click();  // calls av.fio.userPickZipRead
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  //=====refactored========
  document.getElementById("mnFlFzItem").onclick = function () {
    "use strict";
    av.post.addUser("Button: mnFlFzItem");
    av.fio.useDefault = false;
    //console.log('importFzrItem', importFzrItem);
    document.getElementById('importFzrItem').click();
  };

  //--------------------------------------------------------------------------------------------------------------------
  // Save current workspace (mnFzSaveWorkspace)
  document.getElementById('mnFlSaveWorkspace').onclick = function () {
    if (!av.brs.isSafari) {
      //if (true) {
      av.post.addUser('Button: mnFlSaveWorkspace');
      av.fio.fzSaveCurrentWorkspaceFn();  //fileIO.js
    }
  };

  try {
    var isFileSaverSupported = !!new Blob;
  } catch (e) {
    console.log('----------------------------------------------------------filesaver supported?', e);
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Save current workspace with a new name
  document.getElementById('mnFlSaveAs').onclick = function () {
    if (!av.brs.isSafari) {
      //if (true) {
      av.post.addUser('Button: mnFlSaveAs');
      var suggest = 'avidaWS.avidaWs.zip';
      if (av.fio.userFname) {
        if (0 < av.fio.userFname.length) { suggest = av.fio.userFname; }
      }
      av.fio.userFname = prompt('Choose a new name for your Workspace now', suggest);
      if (null !== av.fio.userFname) {
        av.fio.fzSaveCurrentWorkspaceFn();
      }  //fileIO.js
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  //Export csv data from current run.
  //=====refactored========
  document.getElementById("mnFlExportData").onclick = function () {
    "use strict";
    av.post.addUser("Button: mnFlExportData");
    console.log('filename is ' + av.fzr.actConfig.name + "@" + av.grd.popStatsMsg.update + "\n");
    av.fwt.writeCurrentCSV(av.fzr.actConfig.name + "@" + av.grd.popStatsMsg.update + "\n", 'mnFlExportData');
  };

  //--------------------------------------------------------------------------------------------------------------------
  //Export chart data from current run.
  //=====refactored========
  document.getElementById("mnFlExportGraph").onclick = function () {
    "use strict";
    av.post.addUser("Button: mnFlExportGraph");
    //mnFlExportGraphDialog.show();
    document.getElementById("mnFlExportGraphModalID").style.display = "block";
  };

  document.getElementById("mnFlExportGraphModClose").onclick = function () {
    document.getElementById("mnFlExportGraphModalID").style.display = "none";
  };

  //--------------------------------------------------------------------------------------------------------------------
  //Save Stand alone applicaton.
  //=====refactored========
  // error loading Modal box
  document.getElementById("mnFlStandAloneApp").onclick = function () {
    "use strict";
    av.post.addUser("Button: mnFlExportGraph");
    mnFlStandAloneAppModalID.show();
  };

  //----------------------------------------- Testing & Development Tools that are hidden from from User .---------------
  // av.dom.mnHpDebug.onclick = function () {
  //   console.log('in av.dom.mnHpDebug.onclick');
  //   if ('visible' === av.dom.mnDebug.style.visibility) {
  //     // av.doj.mnDebug.style.visibility = 'hidden';
  //     // document.getElementById('mnDebug').style.visibility = 'hidden';
  //     av.dom.mnDebug.style.visibility = 'hidden';
  //     document.getElementById('mnHpDebug').label = 'Show debug menu';
  //     // dijit.byId('mnHpDebug').set('label', 'Show debug menu');
  //     av.post.addUser('Button: mnHpDebug: now hidden; avidaED.js');
  //   } else {
  //     document.getElementById('mnDebug').style.visibility = 'visible';
  //     document.getElementById('mnHpDebug').label = 'Hide debug menu';
  //     av.post.addUser('Button: mnHpDebug: now visible');
  //   }
  // };

  av.ui.where = function (domobj) {
    // placeholder that was to return the cell ID in the grid; this was never done. 
    console.log('domobj=', domobj);
  };

  // if (av.dbg.flg.root) { console.log('Root: before Help drop down menu'); }
  //********************************************************************************************************************
  // Help Drop down menu buttons
  //********************************************************************************************************************
  av.ui.aboutAvidaED = function(from) {
    av.post.addUser('Button: display About Avida-ED from:', from);
    document.getElementById('aboutAvidaED_ModalID').style.display = 'block';
    var num = $('#aboutAvidaED_content').height() - ($('#aboutAvidaED_grid_container').height() + 80);
    console.log('ht = ', num);
    document.getElementById('AvidaedaboutdetailBox').style.height = num + 'px';
    console.log('in av.ui.aboutAvidaED: from=', from);    
  };

  //document.getElementById('aboutAvidaED_Cancel').onclick = function () {
  av.ui.aboutAvidaED_Close = function() {
    document.getElementById('aboutAvidaED_ModalID').style.display = 'none';
  };

  //====refactored=====
  document.getElementById("mnAePreferences").onclick = function () {
    av.post.addUser("Button: mnAePreferences");
    //console.log('in mnAePreferences.click');
    document.getElementById('preferences_ModalID').style.display = 'block';
  };

  av.ui.email = function() {
    av.post.addUser('Button: mnHpAbout');
    av.ui.emailAvidaED();
    document.getElementById('email_ModalID').style.display = 'block';
    console.log('in av.ui.email');    
  };

  av.ui.closeSendModalFn = () => {
    document.getElementById('sendLogModalID').style.display = 'none';
  };

  av.sgr.complexityChange = function (domObj) {
    console.log('the complexity requested is:', domObj.value);
    av.sgr.complexityLevel = domObj.value;
    av.sgr.complexityChangeProcess('av.sgr.complexityChange');
  };

  av.ui.language = function (domObj) {
    av.ui.language = domObj.value;
    console.log('not yet implemented: the language requested is:', domObj.value);
  };

  av.ui.closePreferences = function () {
    document.getElementById('preferences_ModalID').style.display = 'none';
  };

av.ui.feedback = function(){
  console.log('in feedback');
  av.post.addUser('Button: mnHpFeedback');
  av.debug.finalizeDtail();    //info on grid size
  av.debug.triggered = 'userTriggered';
  av.debug.postStatus = '';
  av.post.postLogPara = 'Please send your comment, suggestion or problem to ' + av.fio.mailAddress;
  av.debug.postNoteLabel = 'Please describe the problem or suggestion in the comment field below. ';
  av.debug.postEmailLabel = 'Please include your e-mail so we can discuss your problem or suggeston further.';
  av.dom.postError.style.color = 'grey';
  
  // sendLogParagraph lines
  av.debug.sendLogPara1 = 'Please send your comment, suggestion or problem to Avida-ED-development@googlegroups.com';

  av.debug.sendLogPara2 = 'If there was an error or odd behavior in this session, include the session log, which is in the text box below. '
                       + 'The [Send email] button will open your default email program and include the session log in a new message. ';
                       + 'Or, copy and past the Session Log (the contents of the textbox) and put this in your email.'

  av.debug.sendLogScrollBox = 'Session Log' + '\n\n' + av.debug.log + '\n\nDebug Details:\n' + av.debug.dTail;
  av.debug.error = '';
  av.ui.problemWindow("av.ui.feedback");
  // only shows one line = prompt('Please put this in an e-mail to help us improve Avida-ED: Copy to clipboard: Ctrl+C, Enter', '\nto: ' + av.fio.mailAddress + '\n' + av.debug.log);
};

  //------------------------------------------------------------------------------------------------------ debug menu --
  document.getElementById('mnDbThrowData').onclick = function () {
    'use strict';
    av.post.addUser('Button: mnDbThrowData');
    console.log('av', av);
    console.log('fzr', av.fzr);
    console.log('parents', av.parents);
    console.log('av.grd.msg', av.grd.msg);
    console.log('av.grd.popStatsMsg', av.grd.popStatsMsg);
    console.log('av.grd.DataByCellID =', av.grd.DataByCellID);
    console.log('av.pch =', av.pch);
    console.log('av.dom.popChart.data=', av.dom.popChart.data);
    console.log('av.anl =', av.anl);
  };

  document.getElementById('mnDbThrowError').onclick = function () {
    'use strict';
    av.post.addUser('Button: mnDbThrowError');
    var george = fred;
  };

  document.getElementById('mnDbLineLog').onclick = function () {
    'use strict';
    av.debug.log += '\n -----------------------------------------------------------------------------------------------\n';
  };

  //********************************************************************************************************************
  // Pop up Buttons Modals 
  //********************************************************************************************************************
  // some drop down menu  buttons are in here as they open pop ups. 

  //------------------------------------------------------------------------------------- modal cancel buttons --

  av.dom.needAncestorCancel.onclick = function () {
    av.dom.needAncestorModalID.style.display = 'none';
  };

  av.dom.newDishCancel.onclick = function () {
    av.dnd.userDraggedNewConfig = false;
    av.dom.newDishModalID.style.display = 'none';
  };

  /******************************************* New Button and new Modal **********************************************/
  //av.dom.newDishDiscard not in avidaEdEco.html
  av.dom.newDishDiscard.onclick = function () {
    av.post.addUser('Button: newDishDiscard');
    av.dom.newDishModalID.style.display = 'none';
    // only reset if this function was triggered because user clicked the 'new' button
    // there's one other way this function could be triggered, which is through dnd in dragulaDnd.js 'drop' function
    if (!av.dnd.userDraggedNewConfig) {
      // if this is the case user dragged a new populated dish 
      // and that's why this modal was triggered, 
      // you want to replace the old dish with a new one, 
      // in which case you don't want to reset
      av.msg.resetFn('av.dom.newDishDiscard.onclick'); 
      av.dnd.loadConfigByNameFn(av.fzr.actConfig.name, 'av.dom.newDishDiscard.onclick'); // reload the current active config
    }
    av.dnd.userDraggedNewConfig = false;
    //console.log('newDishDiscard click');
  };

  // av.dom.newDishSaveConfig not in avidaEdEco.html
  av.dom.newDishSaveWorld.onclick = function () {
    av.post.addUser('Button: newDishSaveWorld');
    av.ptd.FrPopulationFn();
    av.dom.newDishModalID.style.display = 'none';
    if (!av.dnd.userDraggedNewConfig) {
      // if this is the case user dragged a new populated dish 
      // and that's why this modal was triggered, 
      // you want to replace the old dish with a new one, 
      // in which case you don't want to reset
      av.msg.resetFn('av.dom.newDishSaveWorld.onclick'); 
      av.dnd.loadConfigByNameFn(av.fzr.actConfig.name, 'av.dom.newDishSaveWorld.onclick'); // reload the current active config
    }
    av.dnd.userDraggedNewConfig = false;
    //console.log('newDishSaveWorld click');
  };

  av.dom.newDishSaveConfig.onclick = function (domObj) {
    console.log('in av.dom.newDishSaveConfig, domObj = ', domObj);
    av.post.addUser('Button: newDishSaveConfig');
    av.ptd.FrConfigFn('av.dom.newDishSaveConfig.onclick');
    av.dom.newDishModalID.style.display = 'none';
    if (!av.dnd.userDraggedNewConfig) { 
      // if this is the case user dragged a new config 
      // and that's why this modal was triggered, 
      // you want to replace the old config with a new one, 
      // in which case you don't want to reset
      av.msg.resetFn('av.dom.newDishSaveConfig.onclick'); 
      av.dnd.loadConfigByNameFn(av.fzr.actConfig.name, 'av.dom.newDishSaveConfig.onclick'); // reload the current active config
    }
    av.dnd.userDraggedNewConfig = false;
    //console.log('newDishSaveConfig click');
  };

  av.ui.newButtonBothFn = function() {
    'use strict';
    if ('prepping' == av.grd.runState) {// reset petri dish
      av.msg.resetFn('av.ui.newButtonBothFn');
      //av.dnd.loadConfigByNameFn(av.fzr.actConfig.name, 'av.ui.newButtonBothFn'); // put @default back as the active Config 
      console.log('av.ui.newButtonBothFn: in prepping');
    } else {// check to see about saving current population
      av.ptd.makePauseState();
      console.log('av.ui.newButtonBothFn: av.dom.newDishModalID=', av.dom.newDishModalID);
      av.dom.newDishModalID.style.display = "block";
    }
  };

  //av.dom.newDishButton.onclick = function () {
  av.ptd.newDishButton = function () {
    av.post.addUser("Button: newDishButton");
    av.ui.newButtonBothFn();
  };

  // ====refactored======
  document.getElementById("mnCnNewpop").onclick = function () {
    av.post.addUser("Button: mnCnNewpop");
    av.ui.newButtonBothFn();
  };

  //*******************************************      Freeze Button      **********************************************
  //Saves either configuration or populated dish
  //Also creates context menu for all new freezer items.*/
  av.dom.freezeButton.onclick = function () {
    console.log('in av.dom.freezeButton.onclick: av.grd.runState=', av.grd.runState, '; av.msg.ByCellIDgenome=', av.msg.ByCellIDgenome, '; length=', av.msg.ByCellIDgenome.length);
    av.post.addUser('Button: freezeButton');
    if ('prepping' == av.grd.runState)
      av.ptd.FrConfigFn('av.dom.freezeButton.onclick');
    else {
      if (5 > av.msg.ByCellIDgenome.length) {
        document.getElementById('fzModFzOrganismSpan').style.display = 'none';
      } 
      else
        document.getElementById('fzModFzOrganismSpan').style.display = 'inline';
      console.log('before fzModalID.show()');
      document.getElementById('fzModalID').style.display = "block";    //fzModalID.show();
    }
  };

  document.getElementById('fzModSaveConfig').onclick = function () {
    av.post.addUser('Button: fzModSaveConfig');
    document.getElementById('fzModalID').style.display = 'none';    //fzModalID.hide();
    av.ptd.FrConfigFn('fzModSaveConfig.onClick');
  };

  //Drop down menu to save a configuration item
  // ====refactored========
  document.getElementById("mnFzConfig").onclick = function () {
    av.post.addUser("Button: mnFzConfig");
    av.ptd.FrConfigFn("mnFzConfig");
  };

  document.getElementById("fzModSaveOrganism").onclick = function () {
    av.post.addUser("Button: fzModSaveOrganism");
    document.getElementById("fzModalID").style.display = "none"; //fzModalID.hide
    av.ptd.FrOrganismFn("selected");
  };

  //button to freeze a population
  document.getElementById("fzModSaveWorld").onclick = function () {
    //dijit.byId('FzPopulationButton').on('Click', function () {
    av.post.addUser("Button: fzModSaveWorld");
    document.getElementById("fzModalID").style.display = "none"; //fzModalID.hide
    av.ptd.FrPopulationFn();
  };

  document.getElementById("fzModCancel").onclick = function () {
    document.getElementById("fzModalID").style.display = "none"; //fzModalID.hide
  };

  // dijit.byId("mnFzPopulation").on("Click", function () {
  //   av.post.addUser("Button: mnFzPopulation");
  //   av.ptd.FrPopulationFn();
  // });

  document.getElementById("mnFzPopulation").onclick = function () {
    av.post.addUser("Button: mnFzPopulation");
    av.ptd.FrPopulationFn();
  };

  //Buttons on drop down menu to save an organism
  // ====refactored========
  document.getElementById("mnFzOrganism").onclick = function () {
    av.post.addUser("Button: mnFzOrganism");
    av.ptd.FrOrganismFn("selected");
  };

  //Buttons on drop down menu to save an offspring
  // ====refactored========
  document.getElementById("mnFzOffspring").onclick = function () {
    av.post.addUser("Button: mnFzOffspring");
    av.ptd.FrOrganismFn("offspring");
  };

  //------------------------------------------------------------------------------------------------ av.ui.mnFzItemFn --
  // Menu Buttons from 'Freezer' to Add things to Experiment
  av.ui.mnFzItemFn = function(domobj) {
    console.log('av.ui.mnFzItemFn: domobj =', domobj);
    var domID = domobj.id;
  };
/*
  //Buttons on drop down menu to add Configured Dish to an Experiment
  dijit.byId('mnFzAddConfigEx').on('Click', function () {
    av.dnd.clickedMenu = "addConfig";
    av.post.addUser('Button: mnFzAddConfigEx');
    av.dnd.FzAddExperimentFn(av.dnd.fzConfig, av.dnd.activeConfig, 'c');
  });

  //Buttons on drop down menu to add Organism to an Experiment - does not work on Test
  dijit.byId('mnFzAddGenomeEx').on('Click', function () {
    av.dnd.clickedMenu = "addOrgan";
    av.post.addUser('Button: mnFzAddGenomeEx');
    av.dnd.FzAddExperimentFn(av.dnd.fzOrgan, av.dnd.ancestorBox, 'g');
  });

  //Buttons on drop down menu to add Populated Dish to an Experiment
  dijit.byId('mnFzAddPopEx').on('Click', function () {
    av.dnd.clickedMenu = "addPop";
    av.post.addUser('Button: mnFzAddPopEx');
    av.dnd.FzAddExperimentFn(av.dnd.fzWorld, av.dnd.activeConfig, 'w');
  });
*/
  //Buttons on drop down menu to put an organism in Organism Viewer
  // ====refactored========
  document.getElementById("mnFzAddGenomeView").onclick = function () {
    av.post.addUser("Button: mnFzAddGenomeEx");
    av.dnd.clickedMenu = "addToGenomeView";
    av.dnd.FzAddExperimentFn(av.dnd.fzOrgan, av.dnd.activeOrgan, 'g');
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize('mnFzAddGenomeView');
    av.ui.adjustOrgInstructionTextAreaSize();
    av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
  };

  //Buttons on drop down menu to add Populated Dish to Analysis
  // ====refactored========
  document.getElementById("mnFzAddPopAnalysis").onclick = function () {
    av.dnd.clickedMenu = "addToAnalysisView";
    av.post.addUser('Button: mnFzAddPopEx');
    av.dnd.FzAddExperimentFn(av.dnd.fzWorld, av.dnd.anlDndChart, 'w');
    av.ui.mainBoxSwap('analysisBlock');
    av.anl.AnaChartFn();
  };

  //---------------------------------------------------------------------------------------- Restart Avida web worker --

  //http://www.w3schools.com/html/tryit.asp?filename=tryhtml5_webworker
  av.ui.restartAvida = function () {
    userMsgLabel.textContent = 'reloading Avida . . .';

    av.aww.uiWorker.terminate();
    av.aww.uiWorker = null;

    //console.log('just killed webWorker');

    if (typeof (Worker) !== 'undefined') {
      if (null == av.aww.uiWorker) {
        av.aww.uiWorker = new Worker('avida.js');
        console.log('webworker recreated');
        av.debug.log += '\nuiA: ui killed avida webworker and started a new webworker';
      }
    } else {
      userMsgLabel.textContent = "Sorry, your browser does not support Web workers and Avida won't run";
    }

    //need to 'start new experiment'
    av.ptd.resetDishFn(false);  //do not send reset to avida; avida restarted
    restartAvidaDialog.hide();
  };

  document.getElementById('restartAvidaNow').onclick = function () {
    av.post.addUser('Button: restartAvidaNow');
    av.ui.restartAvida();
  };

  document.getElementById('restartAvidaFrzConfig').onclick = function () {
    av.post.addUser('Button: restartAvidaFzrConfig');
    av.ptd.FrConfigFn('restartAvidaFrzConfig');
  };

  //********************************************************************************************************************
  // Main Page button scripts
  //********************************************************************************************************************

  //----------------------------------------------------------------------------------------------- av.ui.mainBoxSwap --
  //The style display: 'none' cannnot be used in the html during the initial load as the dijits won't work right
  //visibility:hidden can be used, but it leaves the white space and just does not display dijits.
  //So all areas are loaded, then the mainBoxSwap is called to set display to none after the load on all but
  //the default option.
  // if (av.dbg.flg.root) { console.log('Root: before av.ui.mainBoxSwap defined'); }
  av.ui.mainBoxSwap = function (showBlock) {
    //console.log('showBlock=', showBlock);
    av.ui.page = showBlock;
    av.dom.populationBlock.style.display = "none";
    av.dom.organismBlock.style.display = "none";
    av.dom.analysisBlock.style.display = "none";
    av.dom.showTextDebugBlock.style.display = "none";
    av.dom.orgInfoHolder.style.display = 'none';
    av.dom.popInfoVert.style.display = 'none';
    av.dom.populationButton.style.background = 'white';
    av.dom.organismButton.style.background = 'white';
    av.dom.analysisButton.style.background = 'white';
    av.dom.showTextDebugButton.style.background = 'white';
    document.getElementById(showBlock).style.display = "flex";   //orgPageButtonHolder
    var showButton = showBlock.substring(0,showBlock.length-5)+'Button';
    console.log('showButton=',showButton);
    document.getElementById(showButton).style.background = '#DBDBDB'; 

    //disable menu options. they will be enabled when relevant canvas is drawn
    document.getElementById('mnFzOffspring').disabled = true;
    document.getElementById('mnCnOffspringTrace').disabled = true;

    if ('populationBlock' == av.ui.page) {
      av.dom.popInfoVert.style.display = 'block';
      document.getElementById('allAvidaContainer').className = 'all3pop';
      resizePopulationPage();
    };    
    
    if ('organismBlock' == av.ui.page) {
      document.getElementById('allAvidaContainer').className = 'all3org';
      console.log('allAvidaContainer.class=', document.getElementById('allAvidaContainer').className );
      av.dom.orgInfoHolder.style.display = 'block';
      if ('settings' == av.ui.orgInfo) {
        av.dom.orgSettings.style.display = 'block';
        av.dom.orgDetailID.style.display = 'none';
      }
      else {
        av.dom.orgSettings.style.display = 'none';
        av.dom.orgDetailID.style.display = 'block';
        av.ui.adjustOrgInstructionTextAreaSize();
      };

      if (undefined !== av.traceObj) {
        av.ind.updateOrgTrace('mainBoxSwap_organismBlock');
      };
      av.ind.organismCanvasHolderSize('mainBoxSwap_organismBlock');   ///??????
      av.ind.clearGen('mainBoxSwap_organismBlock');
      av.ind.cpuOutputCnvsSize();
      resizeOrganismPage();
    }
     if (('populationBlock' == av.ui.page) || ('organismBlock' == av.ui.page)) {
      document.getElementById('RtSideToggleButtons').style.display = 'block';
      document.getElementById('ritePnlBtnHolder').style.display = 'block';
      document.getElementById('rightInfoHolder').style.display = 'block';
    }
    else {
      document.getElementById('RtSideToggleButtons').style.display = 'none';
      document.getElementById('ritePnlBtnHolder').style.display = 'none';
      document.getElementById('rightInfoHolder').style.display = 'none';
    };

    // if the miniplot on the populaton page needs to be initiated call that funciton.
    console.log('In: av.ui.mainBoxSwap; av.pch.needInit=', av.pch.needInit, '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible"));
    if ($(av.dom.popStatsBlock).is(":visible") && (av.pch.needInit) ) {
      av.grd.popChartInit('av.ui.mainBoxSwap');
    };
    if ('analysisBlock' == av.ui.page) {
      document.getElementById('allAvidaContainer').className = 'all2lft';
      resizeAnalysisPage();
    };
    if ('showTextDebugBlock' == av.ui.page) {
      document.getElementById('allAvidaContainer').className = 'all2lft';
    }
    //console.log('allAvidaContainer.class=', document.getElementById('allAvidaContainer').className );
  };
  //------------------------------------------------------------------------------------------- end av.ui.mainBoxSwap --

  //----------------------------------------------------------------------------------- Buttons that call MainBoxSwap --
  // if (av.dbg.flg.root) { console.log('Root: before av.dom.populationButton.onclick'); }
  av.dom.populationButton.onclick = function () {
    av.post.addUser('Button: populationButton');
    if (av.debug.dnd || av.dbg.flg.mouse)
      console.log('PopulationButton, av.fzr.genome', av.fzr.genome);
    av.ui.mainBoxSwap('populationBlock');
    resizePopulationPage();
  };

  av.dom.organismButton.onclick = function () {
    av.post.addUser('Button: organismButton');
    // * offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
    // * clientWidth = box + 2*padding - scrollbar_width    
    // * scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
    // * csssWidth = box only nothing else
    console.log('orgInfoHolder.scrollWidth, client, offset =', av.dom.orgInfoHolder.scrollWidth, av.dom.orgInfoHolder.clientWidth, 
      av.dom.orgInfoHolder.offsetWidth, '; $width, $innerWidth, $outerWidth, css(width)=',
      $("#orgInfoHolder").width(), $("#orgInfoHolder").innerWidth(), $("#orgInfoHolder").outerWidth(), $("#orgInfoHolder").css('width') );
    if (av.dom.orgInfoHolder.clientWidth < av.ui.orgInfoHolderMinWidth) av.ui.orgInfoHolderWidth = av.ui.orgInfoHolderMinWidth;
    av.ui.mainBoxSwap('organismBlock');
    resizeOrganismPage();

    console.log('orgInfoHolder.scrollWidth, client, offset =', av.dom.orgInfoHolder.scrollWidth, av.dom.orgInfoHolder.clientWidth, 
      av.dom.orgInfoHolder.offsetWidth, '; $width, $innerWidth, $outerWidth, css(width)=',
      $("#orgInfoHolder").width(), $("#orgInfoHolder").innerWidth(), $("#orgInfoHolder").outerWidth(), $("#orgInfoHolder").css('width') );
    console.log('orgInfoHolder.paddding=', $("#orgInfoHolder").css('padding'));
    
    /* organism trace persists; can be removed if undesired */
    av.ind.updateOrgTrace();
  };

  document.getElementById('analysisButton').onclick = function () {
    av.post.addUser('Button: analysisButton');
    av.ui.mainBoxSwap('analysisBlock');
    resizeAnalysisPage();
    //console.log('after mainBoxSwap to analysisBlock');
    av.anl.AnaChartFn();
    //console.log('fzWorld wd =', document.getElementById('fzWld').style.width );
  };
  //------------------------------------------------------------------------------- end Buttons that call MainBoxSwap --


  // if (av.dbg.flg.root) { console.log('Root: before showTextDebugButton.onclick'); }
  document.getElementById('showTextDebugButton').onclick = function () {
    av.post.addUser('Button: showTextDebugButton');
    av.ui.mainBoxSwap('showTextDebugBlock');
    av.ui.resizeShowTextDebugPage('showTextDebug');
  };
  
  
  // ------------------ two controls for the same purpose; tabs used in develoopment mode --

  //Toggle switch for Population/Organism pages
  // if (av.dbg.flg.root) { console.log('Root: before av.ptd.rightInfoPanelToggleButton'); }
  //------------------------------------------------------------------------------- av.ptd.rightInfoPanelToggleButton --
  av.ptd.rightInfoPanelToggleButton = function(domObj) {
    //console.log('in av.ptd.rightInfoPanelToggleButton: domObj.id is', domObj.id);
    
    // change items with the class 'labInfoClass' to 'labInfoClass labInfoNone';
    if ('populationBlock' == av.ui.page) {
      var tabcontent = document.getElementsByClassName("labInfoClass");
      //console.log('populationBlock: before loop: labInfoClass(tabcontent) =', tabcontent);
      for (ii = 0; ii < tabcontent.length; ii++) {
        //console.log('ii=', ii, '; tabcontent[ii]=', tabcontent[ii]);
        tabcontent[ii].className = 'labInfoClass labInfoNone';
        //console.log('ii=', ii, '; tabcontent[ii].className =', tabcontent[ii].className);
      };
      //console.log('populationBlock: before loop: labInfoClass(tabcontent) =', tabcontent);
      
      // change the class from 'tablinks' to tablinks active'
      var tablinks = document.getElementsByClassName("tablinks");
      //console.log('populationBlock: before loop: tablinks =', tabcontent);
      for (var ii = 0; ii < tablinks.length; ii++) {
        //console.log('ii=', ii, '; tablinks[ii]=', tablinks[ii], '; tablinks[ii].className =', tablinks[ii].className);
        tablinks[ii].className = tablinks[ii].className.replace(" active", "");
        //console.log('tablinks[ii].className =', tablinks[ii].className);
      };
      //console.log('populationBlock: after loop: tablinks =', tabcontent);

      // show set up panel
      if ('SetupButton' == domObj.id) {
        document.getElementById('SetupButton').className = 'toggleRitButton activeBtn';
        document.getElementById('StatsButton').className = 'toggleLftButton';
        av.dom.popStatsBlock.className = 'labInfoClass labInfoNone';
        av.dom.setupBlock.className = 'labInfoClass labInfoFlex';
        av.dom.setupTab.className = 'tablinks active';
        //console.log('setupButton.className =', document.getElementById('SetupButton').className);
      } else {
        // show Statisitcal data about grid
        document.getElementById('StatsButton').className = 'toggleLftButton activeBtn';
        document.getElementById('SetupButton').className = 'toggleRitButton';
        av.dom.popStatsBlock.className = 'labInfoClass labInfoFlex';
        av.dom.setupBlock.className = 'labInfoClass labInfoNone';
        av.dom.statsTab.className = 'tablinks active'; 

        //if (av.dbg.flg.pch) {      //
        //  console.log('In: av.ptd.rightInfoPanelToggleButton; av.pch.needInit=', av.pch.needInit
        //      , '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible") ); 
        //}
        // if the miniplot on the populaton page needs to be updated.
        if ( $(av.dom.popStatsBlock).is(":visible")) {
          if (av.dbg.flg.pch) { console.log('popChrt: need to call av.grd.popChartInit'); }
          av.grd.popChartFn(false, 'av.ptd.rightInfoPanelToggleButton');
        }
      };
      //console.log('Stats.class=', document.getElementById('StatsButton').className, '; Setup.class=', document.getElementById('SetupButton').className);
    }
    //Organism Page
    else if ('organismBlock' == av.ui.page) {
      if ('SetupButton' == domObj.id) {
        av.post.addUser('Button: OrgSetting');
        av.ind.settingsChanged = false;
        av.ui.orgInfo = 'settings';
        av.dom.orgSettings.style.display = 'block';
        av.dom.orgDetailID.style.display = 'none';
      }
      else {
        av.ui.orgInfo = 'details';
        av.dom.orgSettings.style.display = 'none';
        av.dom.orgDetailID.style.display = 'block';
        // console.log('av.ind.settingsChanged=', av.ind.settingsChanged);
        if (av.ind.settingsChanged) av.msg.doOrgTrace();
      }
      //console.log('organismBlock: Display: orgSetting is', av.dom.orgSettings.style.display, '; orgDetailID', av.dom.orgDetailID.style.display);
    } else {
      // Analysis Page or Big text display for debug
      // console.log('should not be avaiable on analysis or showText page');
    }
  };
  //--------------------------------------------------------------------------- end av.ptd.rightInfoPanelToggleButton --

  //Development section with tabs
  //----------------------------------------------------------------------------------------------- av.ptd.processTab --
  // if (av.dbg.flg.root) { console.log('Root: before av.ptd.processTab'); }
  av.ptd.processTab = function (evt, contentType) {
    var ii, tablinks;
    var tabcontent = document.getElementsByClassName("labInfoClass");
    //console.log('tabcontent=', tabcontent);
    for (ii = 0; ii < tabcontent.length; ii++) {
      //console.log('ii=', ii, '; tabcontent[ii]=', tabcontent[ii]);
      tabcontent[ii].className = 'labInfoClass labInfoNone';
      //console.log('ii=', ii, '; tabcontent[ii].display =', tabcontent[ii].style.display);
    };
    tablinks = document.getElementsByClassName("tablinks");
    for (ii = 0; ii < tablinks.length; ii++) {
      //console.log('ii=', ii, '; tablinks[ii]=', tablinks[ii], '; tablinks[ii].className =', tablinks[ii].className);
      tablinks[ii].className = tablinks[ii].className = 'tablinks';
      //console.log('tablinks[ii].className =', tablinks[ii].className);
    };
    // keep console example because evt info looks useful for improving mouse code.
    // console.log('contentType=',contentType,'; evt=', evt);
    // console.log('contentType=', contentType);

    document.getElementById(contentType).className = 'labInfoClass labInfoFlex';;
    evt.currentTarget.className = "tablinks active";
    //console.log('id=', evt.currentTarget.id);
    if ('setupTab' == evt.currentTarget.id) {
      document.getElementById('SetupButton').className = 'toggleRitButton activeBtn';
      document.getElementById('StatsButton').className = 'toggleLftButton';
    }
    else if ('statsTab' == evt.currentTarget.id) {
      document.getElementById('SetupButton').className = 'toggleRitButton';
      document.getElementById('StatsButton').className = 'toggleLftButton activeBtn';      
    }
    else {
      document.getElementById('SetupButton').className = 'toggleRitButton';
      document.getElementById('StatsButton').className = 'toggleLftButton';            
    }
  };
  //------------------------------------------------------------------------------------------- end av.ptd.processTab --

  // ------- end of two controls for the same purpose; took work to get tabs to look right so I'm keeping tab example --

  //----------------------------------------------------------------------------------------------------------------------
  //                                             Population page Buttons
  //----------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
  /// Map Grid buttons - New  Run/Pause Freeze
  //--------------------------------------------------------------------------------------------------------------------

  //process the run/Stop Button - a separate function is used so it can be flipped if the message to avida is not successful.
  av.dom.runStopButton.onclick = function () {
    av.post.addUser('Button: runStopButton = ' + av.grd.updateNum, '=updateNum;  ' + av.grd.msg.update + '=msg.update;  ' + av.grd.popStatsMsg.update + '=popStatsMsg.update');
    av.ptd.runStopFn();
  };

  //====refactored========
  document.getElementById("mnCnPause").onclick = function () {
    av.post.addUser("Button: mnCnPause");
    //console.log('about to call av.ptd.makePauseState()');
    //av.debug.log += '______Debug Note: about to call av.ptd.makePauseState() in AvidaEd.js line 986 \n';
    av.ptd.makePauseState();
  };

  //process run/Stop buttons as above but for drop down menu
  // ====refactored======
  document.getElementById("mnCnRun").onclick = function () {
    av.post.addUser("Button: mnCnRun");
    av.ptd.makeRunState("mnCnRun.Click");
    av.ptd.runPopFn("mnCnRun.Click");
  };

  //process run/Stop buttons as above but for drop down menu
  //====refactored======
  document.getElementById("mnCnOne").onclick = function () {
    av.post.addUser("Button: mnCnOne");
    av.ui.oneUpdateFlag = true;
    av.ptd.makeRunState('mnCnOne.Click');
    av.ptd.runPopFn('mnCnOne.Click');
  };

  av.dom.oneUpdateButton.onclick = function () {
    av.post.addUser('Button: oneUpdateButton', '=updateNum; ' + av.grd.msg.update + '=msg.update;  ' + av.grd.popStatsMsg.update + '=popStatsMsg.update');
    av.ui.oneUpdateFlag = true;
    av.ptd.makeRunState('av.dom.oneUpdateButton.onclick');
    av.ptd.runPopFn('av.dom.oneUpdateButton.onclick');
  };

  av.ui.avidianOutlineOnclick = function (domObj) {
    av.post.addUser('Button: avidianOutline; av.ui.showOutlineFlag=' + av.ui.showOutlineFlag);
    if ('Resource Mode: hide Avidian Outlines' == av.dom.avidianOutline.innerHTML) {
      av.dom.avidianOutline.innerHTML = 'Resource Mode: show Avidian Outlines';
      av.ui.showOutlineFlag = false;
      console.log('av.ui.showOutlineFlag=' + av.ui.showOutlineFlag);
    } else {
      av.dom.avidianOutline.innerHTML = 'Resource Mode: hide Avidian Outlines';
      console.log('av.ui.showOutlineFlag=' + av.ui.showOutlineFlag);
      av.ui.showOutlineFlag = true;
    }
  };

  //----------------------------------------------------------------------------------------------------------------------
  //                                          End Population page Buttons
  //----------------------------------------------------------------------------------------------------------------------
  //********************************************************************************************************************

  // *******************************************************************************************************************
  //                                      Population Page
  // *******************************************************************************************************************
  //                                      Draw Population Grid
  // *******************************************************************************************************************

  //Set up canvas objects
  av.grd.sCtx = av.dom.scaleCanvas.getContext('2d');
  av.grd.cntx = av.dom.gridCanvas.getContext('2d');

  //--------------------------------------------------------------------------------------------------------------------
  // if (av.dbg.flg.root) { console.log('Root: before av.grd.drawGridSetupFn'); }

  av.grd.drawGridSetupFn = function (from) {
    'use strict';
    if (av.dbg.flg.dsz) { console.log(from, 'called av.grd.drawGridSetupFn__________________________________________________'); }

    // about total window size
    // av.dsz.windowWd = window.innerWidth || document.documentElement.clientWidth  || document.body.clientWidth;
    // av.dsz.windowHd = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // if (av.dbg.flg.dsz) { console.log('dsz: w:', av.dsz.windowWd, av.dsz.windowHd, '= window'); }

    if (undefined != av.grd.msg) {
      if ('prepping' != av.grd.runState && undefined != av.grd.msg.fitness) {
        //av.grd.setMapData('av.grd.drawGridSetupFn');  //update color information for offpsring once run has started only if screen visable.
        av.grd.findLogicOutline();
      };
    };
    if ('populationBlock' === av.ui.page) {
      // Does not seem to change wd/ht of gridHolder
      if ('none' == document.getElementById('colorMode').value.toLowerCase()) {
        if (av.grd.newlyNone) {
          av.grd.newlyNone = false;
          av.grd.cntx.fillStyle = av.color.names['Black'];
          av.grd.cntx.fillRect(1, 1, av.dom.gridCanvas.width - 1, av.dom.gridCanvas.height - 1);
        }
      } else {
        av.grd.newlyNone = true;
        // Does not seem to change wd/ht of gridHolder
        if (undefined != av.grd.msg) {
          if ('prepping' != av.grd.runState && undefined != av.grd.msg.fitness) {
            av.grd.setMapData('colorMode != none in av.grd.drawGridSetupFn');  //update color information for offpsring once run has started
            //av.grd.findLogicOutline(); //needs to be done for all updates
          };
        };
        av.dom.scaleCanvas.width = $("#sclCnvsHldr").width() + 0.5 * $("#sclCnvsHldr").width();

        //figure out scale or legend
        if ('Ancestor Organism' == document.getElementById('colorMode').value) {
          av.grd.drawLegend();
        } else {
          av.grd.setColorMapOnly('draw gradient scale in av.grd.drawGridSetupFn');  //to set color scales for resources
          av.grd.gradientScale('av.grd.drawGridSetupFn');
        }

        if (av.dbg.flg.dsz) { console.log('dsz: scaleCanvas ht =', av.dom.scaleCanvas.height); }
        //av.dom.gridCanvas.width = 10;
        av.dom.gridCanvas.height = 10;
        //av.dom.gridHolder.style.width = '10px';
        av.dom.gridHolder.style.height = '10px';

        $('#sclCnvsHldr').height(av.dom.scaleCanvas.height);

        if (av.dbg.flg.dsz) { console.log('dsz: ', $('#sclCnvsHldr').height(), '= sclCnvsHldr ht'); }

        if (av.dbg.flg.dsz) { console.log('--------------- gridHolder ht =',$('#gridHolder').height().toFixed(1)); }
        //if (av.dbg.flg.dsz) { console.log('dsz: before: benchPopBot.scroll.Height =', document.getElementById('benchPopBot').scrollHeight + 'px'); }
        document.getElementById('benchPopBot').style.height = document.getElementById('benchPopBot').scrollHeight + 'px';
        //if (av.dbg.flg.dsz) { console.log('dsz: post: benchPopBot.scroll.Height =', document.getElementById('benchPopBot').scrollHeight + 'px'); }
        
        if ($("#gridHolder").height() < $("#gridHolder").width()) {
          av.grd.canvasSize = Math.floor( $("#gridHolder").height() ) - 4;
          //console.log('smaller height: canvasSize = ', av.grd.canvasSize);
        } else {
          av.grd.canvasSize = Math.floor( $("#gridHolder").width() ) - 2;
          //console.log('smaller width: canvasSize = ', av.grd.canvasSize);
        };

        av.dom.gridCanvas.width = av.grd.canvasSize;
        av.dom.gridCanvas.height = av.grd.canvasSize;
        av.grd.spaceX = av.grd.canvasSize;
        av.grd.spaceY = av.grd.canvasSize;

        av.grd.findGridSize(av.grd, av.parents);

        av.grd.drawGridUpdate();   //in populationGrid.js

        rescaleLabel.textContent = av.grd.fillRescale;
        av.grd.need2DrawGrid = true;
      }
    }
  };

  // The rest of grid canvas drawing code is in populationGrid.js

  // *******************************************************************************************************************
  //        Color Map Color Mode and Zoom Slide Controls
  // *******************************************************************************************************************

  // Get color map data from Avida and draw
  document.getElementById('colorMode').onchange = function () {
    av.grd.drawGridSetupFn('colorMode_onchange');
  };

  // Zoom slide - display only not avida
  av.grd.zoomSlide = new HorizontalSlider({
    name: 'zoomSlide',
    value: 1,
    minimum: 1,
    maximum: 10,
    intermediateChanges: true,
    discreteValues: 10,
    style: 'height: auto; width: 80px;float:right',
    onChange: function (value) {
      av.grd.zoom = value;
      //console.log('zoomSlide', av.grd.zoom);
      av.grd.drawGridSetupFn('av.grd.zoomSlide');
    }
  }, 'zoomSlide');

  av.grd.colorMap = 'Gnuplot2';
  /*
   *  This secton allowed one to change the color map of the scale, but Rob did not like it.
   * 
   dijit.byId('mnGnuplot2').attr('disabled', true);

   dijit.byId('mnViridis').on('Click', function () {
   av.post.addUser('Button: mnViridis');
   dijit.byId('mnCubehelix').attr('disabled', false);
   dijit.byId('mnGnuplot2').attr('disabled', false);
   dijit.byId('mnViridis').attr('disabled', true);
   av.grd.colorMap = 'Viridis';
   av.grd.drawGridSetupFn('digjit.byID(mnViridis');
   });

   dijit.byId('mnGnuplot2').on('Click', function () {
   av.post.addUser('Button: mnGnuplot2');
   dijit.byId('mnCubehelix').attr('disabled', false);
   dijit.byId('mnGnuplot2').attr('disabled', true);
   dijit.byId('mnViridis').attr('disabled', false);
   av.grd.colorMap = 'Gnuplot2';
   av.grd.drawGridSetupFn('digit.byID(mnGnuplot2)');
   });

   dijit.byId('mnCubehelix').on('Click', function () {
   av.post.addUser('Button: mnCubehelix');
   dijit.byId('mnCubehelix').attr('disabled', true);
   dijit.byId('mnGnuplot2').attr('disabled', false);
   dijit.byId('mnViridis').attr('disabled', false);
   av.grd.colorMap = 'Cubehelix';
   av.grd.drawGridSetupFn('digit.byID(mnCubehelix)');
   av.post.addUser('Button: mnCubehelix pressed');
   });
   */

  // *******************************************************************************************************************
  //    Buttons that select organisms that perform a logic function
  // *******************************************************************************************************************
  // if (av.dbg.flg.root) { console.log('Root: before logic buttons'); }

  //    av.post.addUser('Button: notButton');    //done in av.ptd.bitToggle
  document.getElementById('notButton').onclick = function () {
    av.ptd.bitToggle('notButton');
  }; //av.ptd.bitToggle in popControls.js
  document.getElementById('nanButton').onclick = function () {
    av.ptd.bitToggle('nanButton');
  };
  document.getElementById('andButton').onclick = function () {
    av.ptd.bitToggle('andButton');
  };
  document.getElementById('ornButton').onclick = function () {
    av.ptd.bitToggle('ornButton');
  };
  document.getElementById('oroButton').onclick = function () {
    av.ptd.bitToggle('oroButton');
  };
  document.getElementById('antButton').onclick = function () {
    av.ptd.bitToggle('antButton');
  };
  document.getElementById('norButton').onclick = function () {
    av.ptd.bitToggle('norButton');
  };
  document.getElementById('xorButton').onclick = function () {
    av.ptd.bitToggle('xorButton');
  };
  document.getElementById('equButton').onclick = function () {
    av.ptd.bitToggle('equButton');
  };

  // -------------------------------------------------------------------------------------------------------------------
  //                    Population Chart   ; pop chart; popchart
  // -------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------- av.pch.popChrtYaxisChangeFn --
  av.pch.popChrtYaxisChangeFn = function (domobj) {
    var side = domobj.id;
    side = side.substring(7,10);
    console.log('popChrtYaxisChangeFn: domobj.id=', domobj.id, '; substring=', side);
    var yTitle = side+'Ytitle';
    side = 'popChrt'+side+'Yaxis';
    console.log('side=', side, 'yTitle=', yTitle, '; Title=', document.getElementById(side).value, '; option=', domobj.value);
    av.grd[yTitle] = document.getElementById(side).value;
    av.grd.popChartFn(false, 'popChrtYaxisChangeFn');    
  };

  // if (av.dbg.flg.root) { console.log('Root: before av.grd.popChartInit defined'); }
  // initialize needs to be in AvidaED.js; cannot be run when mini-graph is not visible. 
  //--------------------------------------------------------------------------------------------- av.grd.popChartInit --
  // Should be done before av.grd.popChartFn is run.  
  av.grd.popChartInit = function (from) {
    var data;
    if (av.dbg.flg.pch) { console.log('popChrt',from, 'called av.grd.popChartInit; av.pch.needInit=', av.pch.needInit
                   , '; av.ui.page=', av.ui.page
                   , '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible") 
                   , '; av.dom.popStatsBlock.style =', av.dom.popStatsBlock.style); }

    //look to see if poplulation page mini-chart is showing
    if ( !$(av.dom.popStatsBlock).is(":visible") ) {
      av.pch.needInit = true;
      return;
      // chart is not visible don't try to write chart
    };

    //minichart is visible on population page
    av.pch.clearPopChrt();
    av.pch.divSize('av.grd.popChartInit');    //changes the size of the div to get max chart that fits on page
    av.pch.popData = av.pch.data;

    //if (av.dbg.flg.pch) { console.log('popChrt: av.dom.popChart=', av.dom.popChart); }
    //if (av.dbg.flg.pch) { console.log('popChrt: av.dom.popChart.data=',av.dom.popChart.data); }

  //    if (null == av.dom.popChart.data) {
    if (true) {
      av.pch.update = {
        autorange: true,
        width: av.pch.layout.width,
        height: av.pch.layout.height
      };
      av.pch.shortLayout = { autorange: true };
      av.pch.config = { responsive: true };
      data = [];
      // find out layout vs update in Plotly.js
      // Plotly.newPlot(av.dom.popChart, data, av.pch.update);    // older version   
      // Plotly.newPlot(av.dom.popChart, data, av.pch.update, av.pch.config);   //
      Plotly.newPlot(av.dom.popChart, data, av.pch.shortLayout, av.pch.config); //
    } else {
      // never happens because if is hard coded with a true;
      if (undefined != av.dom.popChart.data[0]) {
        Plotly.deleteTraces(av.dom.popChart, [0, 1]);
        Plotly.relayout(av.dom.popChart, av.pch.update);
        if (av.dbg.flg.pch) { console.log('PopPlot: av.dom.popChart.data=',av.dom.popChart.data); }
      };
    };

    av.dom.popChart.style.visibility = 'hidden';
    av.pch.ChartVisibleNow = false;
    //if (av.dbg.flg.pch) { console.log('popChrt: layout.ht, wd =', av.dom.popChart.layout.height, av.dom.popChart.layout.width); }
    av.pch.needInit = false;
  };
  // if (av.dbg.flg.root) { console.log('Root: after av.grd.popChartInit defined'); }

   //Draw popChartFn
  //----------------------------------------------------------------------------------------------- av.grd.popChartFn --
  av.grd.popChartFn = function (from) {
    'use strict';
    var popData;
    var numof;
    var layout = av.pch.layout;
    var widg = av.pch.widg;

    var cntY = 0; //count y data arrays

     if (av.dbg.flg.pch) { console.log('popChrt:', from, 'called popChartFn: $(statsBlock.display = ', $(av.dom.popStatsBlock).css('display'),
                       '; av.ui.page=', av.ui.page); }
    //  console.log('popChrt: av.pch.needInit= ', av.pch.needInit, 
    //                  '; $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible")); 
    //}
    // Check to see if Initialization is needed.
    if (av.pch.needInit) {
      if (av.dbg.flg.pch) { console.log(from + ' called av.grd.popChartFn: av.pch.needInit= ', av.pch.needInit, '; av.ui.page =', av.ui.page); }

      //initialize if needed; 
      // if (av.dbg.flg.pch) { console.log('before IF: $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible"), '; $(av.dom.popStatsBlock).is(":visible") =', $(av.dom.popStatsBlock).is(":visible") ); }
      if ( $(av.dom.popStatsBlock).is(":visible") ) {
        // if (av.dbg.flg.pch) { console.log('in IF: $(av.dom.popStatsBlock).is(":visible")=', $(av.dom.popStatsBlock).is(":visible") ); }
        // if (av.dbg.flg.pch) { console.log('popChrt: if $popStatsBlock is visible & needInit - then call popChartInit'); }
        av.grd.popChartInit('av.grd.popChartFn');
        if (av.dbg.flg.pch) { console.log('popChrt: av.grd.runState = ', av.grd.runState); }
      };
    };

    // Do not display chart if the chart is not on the screen. Data seems to be getting updated. need to verify this.
    if ( !$(av.dom.popStatsBlock).is(":visible") ) {
      if (av.dbg.flg.pch) { console.log('popChrt: Not visible: so skip rest of function'); }
      return;
    };

    if (av.dbg.flg.pch) { console.log('popChrt: av.grd.runState = ', av.grd.runState); }
    
    //values can be prepping, started, or world
    if ('prepping' === av.grd.runState) {
      av.dom.popChart.style.visibility = 'hidden';  //hide mini-chart when an experiment is not running. 
      av.pch.ChartVisibleWas = av.pch.ChartVisibleNow;
      av.pch.ChartVisibleNow = false;
      return;
    };
    
    // update the previous and currrent meaning of the of the Y-axis (left and right)
    av.pch.lftYaxisWas = av.pch.lftYaxisNow;
    av.pch.ritYaxisWas = av.pch.ritYaxisNow;

    // update current values of Y-axis (left and right)
    av.pch.lftYaxisNow = document.getElementById('popChrtLftYaxis').value;
    av.pch.ritYaxisNow = document.getElementById('popChrtRitYaxis').value;
    if (av.pch.lftYaxisWas != av.pch.lftYaxisNow) { av.pch.lftYchange = true; }
    else { av.pch.lftYchange = false; }
    if (av.pch.ritYaxisWas != av.pch.ritYaxisNow) { av.pch.ritYchange = true; }
    else { av.pch.ritYchange = false; }
    
    if (av.dbg.flg.pch) { console.log('popChrt: lftYaxisWas=', av.pch.lftYaxisWas, '; lftYaxisNow =', av.pch.lftYaxisNow, '; av.pch.lftYchange =', av.pch.lftYchange); }
    if (av.dbg.flg.pch) { console.log('popChrt: ritYaxisWas=', av.pch.ritYaxisWas, '; ritYaxisNow =', av.pch.ritYaxisNow, '; av.pch.ritYchange =', av.pch.ritYchange); }

    // only draw chart if drawing data on at least one axis
    if ('none' === av.pch.ritYaxisNow && 'none' === av.pch.lftYaxisNow) {
      av.pch.ChartVisibleWas = av.pch.ChartVisibleNow;
      av.pch.ChartVisibleNow = false;
      av.dom.popChart.style.visibility = 'hidden';
      
      // debug
      if (undefined !== av.dom.popChart.data) {
        console.log('av.dom.popChart.data is', av.dom.popChart.data);
      };
      console.log('chart containts none');
      return;
    };

    // Need to update Chart: process chart options and y-axis for organisms. 
    av.dom.popChart.style.visibility = 'visible';
    av.pch.ChartVisibleNow = true;
    // this adusts the size. Seems like the size should only change when window/div changes size rather than checking very time. 
    av.pch.divSize(true, 'av.grd.popChartFn');   
    //console.log('after av.pch.divSize');

    if ('None' !== av.pch.lftYaxisNow) {
//      if (av.pch.lftYchange) { 
      if (true) { 
        if (av.dbg.flg.pch) { console.log('PopChrt: ~~~~~~~~~~~~~~~left Y change =', av.pch.lftYchange, '; av.pch.lftYaxisNow=', av.pch.lftYaxisNow, '; cntY=', cntY); }
        if (av.dbg.flg.pch) { console.log('PopChrt: av.pch.aveFit = ', av.pch.aveFit); }
        if (av.dbg.flg.pch) { console.log('PopChrt: av.pch.logFit = ', av.pch.logFit); }
        if (av.dbg.flg.pch) { console.log('PopChrt: av.pch.maxFit =', av.pch.aveMaxFit, '; av.pch.logMaxFit=',av.pch.logMaxFit, '~~~~~~~~~~~~~~~'); }
          switch (av.pch.lftYaxisNow) {
            case 'Average Fitness':
              av.pch.popY = av.pch.aveFit;
              av.pch.dadY = av.pch.aveDadFit;
              av.pch.logY = av.pch.logFit;
              av.pch.maxY = (av.pch.aveMaxFit > av.pch.logMaxFit) ? av.pch.aveMaxFit : av.pch.logMaxFit;
              if (av.dbg.flg.pch) { console.log('PopChrt: aveMaxFit=', av.pch.aveMaxFit, '; logMaxFit=', av.pch.logMaxFit, '; maxY=', av.pch.maxY); }
              //if (av.dbg.flg.pch) { console.log('PopChrt: av.pch.aveFit = ', av.pch.aveFit); }
              //if (av.dbg.flg.pch) { console.log('PopChrt: popY', av.pch.popY); }
              break;
            case 'Average Offspring Cost':
              av.pch.popY = av.pch.aveCst;
              av.pch.dadY = av.pch.aveDadCst;
              av.pch.logY = av.pch.logCst;
              av.pch.maxY = (av.pch.aveMaxCst > av.pch.logMaxCst) ? av.pch.aveMaxCst : av.pch.logMaxCst;
              if (av.dbg.flg.pch) { console.log('PopChrt: aveMaxCst=', av.pch.aveMaxCst, '; logMaxCst=', av.pch.logMaxCst, '; maxY=', av.pch.maxY); }
              break;
            case 'Average Energy Acq. Rate':
            av.pch.popY = av.pch.aveEar;
            av.pch.dadY = av.pch.aveDadEar;
            av.pch.logY = av.pch.logEar;
            av.pch.maxY = (av.pch.aveMaxEar > av.pch.logMaxEar) ? av.pch.aveMaxEar : av.pch.logMaxEar;
              break;
            case 'Number of Organisms':
            av.pch.popY = av.pch.aveNum;
            av.pch.dadY = av.pch.aveDadVia;
            av.pch.logY = av.pch.logNum;
            av.pch.maxY = (av.pch.aveMaxNum > av.pch.logMaxNum) ? av.pch.aveMaxNum : av.pch.logMaxNum;
              break;
            case 'Number Viable':
            av.pch.popY = av.pch.aveVia;
            av.pch.dadY = av.pch.aveDadVia;
            av.pch.logY = av.pch.logNum;
            av.pch.maxY = (av.pch.aveMaxVia > av.pch.logMaxNum) ? av.pch.aveMaxVia : av.pch.logMaxNum;
            default:
            av.pch.yValue = 'none';
            av.pch.dadY = [];
            av.pch.popY = [];
            av.pch.logY = [];
            av.pch.maxY = 0.1;
              break;
          }; // end switch
        }; //   end of left y-axis change
      

      if (av.dbg.flg.pch) { console.log('PopChrt: lft   xx=', av.pch.xx); }
      if (av.dbg.flg.pch) { console.log('PopChrt: lft popY=', av.pch.popY); }
      if (av.dbg.flg.pch) { console.log('PopChrt: lft logY=', av.pch.logY); }
      if (av.dbg.flg.pch) { console.log('PopChrt: lft dadY=', av.pch.dadY); }
      if (av.dbg.flg.pch) { console.log('PopChrt: lft maxY=', av.pch.maxY, '-------------------------'); }

      //av.pch.tracePop = {x:av.pch.xx, y:av.pch.popY, type:'scatter', mode: 'lines', name: 'Population'};
      //av.pch.traceLog = {x:av.pch.xx, y:av.pch.logY, type:'scatter', mode: 'lines', name: 'Function Subset'};
      //av.pch.popData = [av.pch.tracePop];

      av.pch.tracePop.y = av.pch.popY;
      av.pch.traceLog.y = av.pch.logY;
      av.pch.popData = [av.pch.tracePop, av.pch.traceLog]; //popData
      av.pch.traceList = [];

      av.pch.traceList[cntY] = {x: [av.pch.xx], y: [av.pch.popY]};
      av.pch.traceList[cntY+1] = {x: [av.pch.xx], y: [av.pch.logY]};
      cntY = cntY+2;
      
      // This is the show information about the sub group of avidans that have produced offspring. 
      // This options has a display: none; so has not been verified to work after 2021_b15
      if ('moms only' == av.pch.ritYaxisNow.toString().toLowerCase() ) {
        av.pch.traceDad.y = av.pch.dadY;
        av.pch.popData = [av.pch.tracePop, av.pch.traceLog, av.pch.traceDad]; //popData
        cntY++;
      }
    }; // end chart contains trait determined by left y-Axis
    
    if (av.dbg.flg.pch) { console.log('cntY=', cntY, '; av.pch.popData=', av.pch.popData, '; av.pch.ritYaxisNow='+ av.pch.ritYaxisNow ); } 
    if ('resources' == av.pch.ritYaxisNow.toString().toLowerCase() ) {

      // need to check to see if there are any valid global resources before adding them to the structure
      console.log('--------------------------------------------------------- chart resources');
      console.log('cntGlobalDataTask=', av.nut.cntGlobalDataTasks, '; av.pch.resrcGlobal=', av.pch.resrcGlobal);
      if (0 < av.nut.cntGlobalDataTasks) {
        for (var ii=0; ii < av.sgr.numTasks; ii++) {
          numTsk = av.sgr.logEdNames[ii];
          tsk = av.sgr.logicNames[ii];
           av.pch.sgr[numTsk] = av.pch.resrcGlobal[tsk];
           av.pch.trc[numTsk].x = av.pch.xx;
           av.pch.trc[numTsk].y = av.pch.sgr[numTsk];
           av.pch.popData[ii+cntY] = av.pch.trc[numTsk];
           av.pch.traceList[ii+cntY] = {x: [av.pch.xx], y: [ av.pch.sgr[numTsk] ]};
        };
      };
    };  // end of chart contains amount of resource


    if (true) {
      numof = av.pch.traceList.length;
      if (av.debug.uil) { console.log('ui: av.pch.pixel.wd ht=', av.pch.pixel.wd, av.pch.pixel.ht); }
      if (av.debug.uil) { console.log('ui: av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height); }

      av.pch.update = {
        autorange: true,
        width: av.pch.layout.width,
        height: av.pch.layout.height
      };

      // if either Y-axis has changed, then make av.dom.popChart.data = null
      if (av.pch.lftYaxisWas != av.pch.lftYaxisNow) { av.dom.popChart.data = null; }
      if (av.pch.ritYaxisWas != av.pch.ritYaxisNow) { av.dom.popChart.data = null; }

      //plotly.animate will not accept a . in the variable name so the 
      popData = av.pch.popData;
      console.log('popData=', av.pch.popData);
      console.log('=================================================== before test for null');
      
      if (null == av.dom.popChart.data || 0 == av.dom.popChart.data.length) {
        // No chart data, but data is in several av.pch variables. 
        console.log('?? data is null or length 0; av.dom.popChart.data is', av.dom.popChart.data);
        console.log('before Plotly.plot; av.pch.popData is', av.pch.popData);
        console.log('before Plotly.plot; av.pch.layout is', av.pch.layout);
        console.log('before Plotly.plot; av.pch.widg is', av.pch.widg);

        Plotly.plot('popChart', av.pch.popData, av.pch.layout, av.pch.widg);

        console.log('after Plotly.plot; av.dom.popChart.data is', av.dom.popChart.data);
        console.log('after Plotly.plot; av.pch.popData is', av.pch.popData);
        console.log('after Plotly.plot; av.pch.layout is', av.pch.layout);
        console.log('after Plotly.plot; av.pch.widg is', av.pch.widg);
      } else {
        if (av.brs.isChrome) {
          if (av.dbg.flg.pch) { console.log('PopChrt: true? av.brs.isChrome=', av.brs.isChrome); }
          for (var ii=0; ii< numof; ii++) {
            av.debug.log += '\n     --uiD: Plotly: Plotly.restyle("popChart", av.pch.traceList['+ii+'], ['+ii+'])';
            av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.pch.traceList[]', [av.pch.traceList[ii]]);
            Plotly.restyle('popChart', av.pch.traceList[ii], [ii]);
          };
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart, av.pch.update', [av.dom.popChart, av.pch.update]);
          Plotly.relayout(av.dom.popChart, av.pch.update);
        } else {
          
          if (av.dbg.flg.pch) { console.log('PopChrt: false? av.brs.isChrome=', av.brs.isChrome, ); }
          //Plotly.restyle(graphDiv, update, [1, 2]);
          //Plotly.restyle(av.dom.popChart, av.pch.tracePop, [0]);
          //Plotly.restyle(av.dom.popChart, av.pch.traceLog, [1]);
          av.debug.log += '\n     --uiD: Plotly.relayout(av.dom.popChart, av.pch.update) in AvidaED.js at 2304';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.dom.popChart, av.pch.update', [av.dom.popChart, av.pch.update]);
          if (undefined == av.pch.update) {
            console.log('undefined == av.pch.update');
            av.pch.update = {
              autorange: true,
              width: av.pch.layout.width,
              height: av.pch.layout.height
            };
          };
          // the div holding the chart  must be 'visible' for plotly actions to work. 
          Plotly.relayout(av.dom.popChart, av.pch.update);
          console.log('after relayout in update grid chart: av.dom.popChart=', av.dom.popChart, '; av.pch.update=', av.pch.update);
          popData = av.pch.popData;
          if (av.dbg.flg.pch) { console.log('popChrt: before Plotly.animate; av.pch.popData', av.pch.popData); }
          av.debug.log += '\n     --uiD: Plotly.animate("popChart", {av.pch.popData}) in AvidaED.js at 1971';
          av.utl.dTailWrite('AvidaED.js', (new Error).lineNumber, 'av.pch.popData', [av.pch.popData]);
          if (av.dbg.flg.pch) { console.log('popChrt: before Plotly.animate; popData', popData); }
          if (av.dbg.flg.pch) { console.log('popChrt: before Plotly.animate; av.dom.popChart=', av.dom.popChart); }
          Plotly.animate('popChart', {popData});
          
          if (av.dbg.flg.pch) { console.log('popChrt: after Plotly.animate; av.dom.popChart=', av.dom.popChart); }
        }   //  end of else for av.brs.isChrome
      };    //  end of else related to data in av.dom.popChart.data
      
      if (av.dbg.flg.pch) { console.log('popChrt: av.dom.popChart.data=', av.dom.popChart.data); }
      if (av.dbg.flg.pch) { console.log('popChrt: av.dom.popChart.layout=', av.dom.popChart.layout); }
    };  //end of true
  };
  //------------------------------------------------------------------------------------------- end av.grd.popChartFn --


  // **************************************************************************************************************** */
  // ******* Population Setup Buttons from 'Setup' subpage ********* */
  // **************************************************************************************************************** */
  if ('test' == av.msg.setupType) {
    av.grd.gridWasCols = Number(av.dom.sizeColTest.value);
    av.grd.gridWasRows = Number(av.dom.sizeRowTest.value);
  } else {
    av.grd.gridWasCols = Number(av.dom.sizeCols.value);
    av.grd.gridWasRows = Number(av.dom.sizeRows.value);
  };

/*------------------------------------------------------------------------------------------------ av.ptd.popSizeFn --*/
  av.ptd.popSizeFn = function (from) {
    av.grd.setupCols = Number(av.dom.sizeCols.value);
    av.grd.setupRows = Number(av.dom.sizeRows.value);
    //console.log(from, 'called av.ptd.popSizeFn: new col, row', av.grd.setupCols, av.grd.setupRows);
    //console.log('av.grd.setupCols, Rows', av.grd.setupCols, av.grd.setupRows);
    av.dom.sizeCells.innerHTML = 'for a total of ' + av.grd.setupCols * av.grd.setupRows + ' cells';
    //av.dom.sizeCells.text = 'for a total of ' + av.grd.setupCols * av.grd.setupRows + ' cells';
    av.dom.sizeCols.style.color = 'black';
    av.dom.sizeRows.style.color = 'black';
    av.dom.sizeCells.style.color = 'black';
    //Linear scale the position for Ancestors added by hand;
    if (undefined != av.parents.handNdx) {
      var lngth = av.parents.handNdx.length;
      for (var ii = 0; ii < lngth; ii++) {
        if (av.debug.popCon) { console.log('old cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]); }
        av.parents.col[av.parents.handNdx[ii]] = Math.floor(av.grd.setupCols * av.parents.col[av.parents.handNdx[ii]] / av.grd.gridWasCols);  //was trunc
        av.parents.row[av.parents.handNdx[ii]] = Math.floor(av.grd.setupRows * av.parents.row[av.parents.handNdx[ii]] / av.grd.gridWasRows);  //was trunc
        av.parents.AvidaNdx[av.parents.handNdx[ii]] = av.parents.col[av.parents.handNdx[ii]] + av.grd.setupCols * av.parents.row[av.parents.handNdx[ii]];
        if (av.debug.popCon) { console.log('New cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]); }
      }
    };
    av.grd.gridWasCols = Number(av.dom.sizeCols.value);
    av.grd.gridWasRows = Number(av.dom.sizeRows.value);
    //reset zoom power to 1
    av.grd.zoomSlide.set('value', 1);
    av.parents.placeAncestors();
    //are any parents on the same cell?
    av.grd.cellConflict(av.grd.setupCols, av.grd.setupRows);
    av.grd.drawGridSetupFn('av.ptd.popSizeFn');
  };

  /*-------------------------------------------------------------------------------------------- av.ptd.popSizeFnTest --*/
  av.ptd.popSizeFnTest = function (from) {
    av.grd.setupCols = Number(av.dom.sizeColTest.value);
    av.grd.setupRows = Number(av.dom.sizeRowTest.value);
    //console.log(from, 'called av.ptd.popSizeFnTest: new col, row', av.grd.setupCols, av.grd.setupRows);
    //console.log('av.grd.setupCols, Rows', av.grd.setupCols, av.grd.setupRows);
    av.dom.sizeCellTest.innerHTML = 'for a total of ' + av.grd.setupCols * av.grd.setupRows + ' cells';
    //av.dom.sizeCells.text = 'for a total of ' + av.grd.setupCols * av.grd.setupRows + ' cells';
    av.dom.sizeColTest.style.color = 'black';
    av.dom.sizeRowTest.style.color = 'black';
    av.dom.sizeCellTest.style.color = 'black';
    //Linear scale the position for Ancestors added by hand;
    if (undefined != av.parents.handNdx) {
      var lngth = av.parents.handNdx.length;
      for (var ii = 0; ii < lngth; ii++) {
        //console.log('old cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]);
        av.parents.col[av.parents.handNdx[ii]] = Math.floor(av.grd.setupCols * av.parents.col[av.parents.handNdx[ii]] / av.grd.gridWasCols);  //was trunc
        av.parents.row[av.parents.handNdx[ii]] = Math.floor(av.grd.setupRows * av.parents.row[av.parents.handNdx[ii]] / av.grd.gridWasRows);  //was trunc
        av.parents.AvidaNdx[av.parents.handNdx[ii]] = av.parents.col[av.parents.handNdx[ii]] + av.grd.setupCols * av.parents.row[av.parents.handNdx[ii]];
        //console.log('New cr', av.parents.col[av.parents.handNdx[ii]], av.parents.row[av.parents.handNdx[ii]]);
      }
    };
    av.grd.gridWasCols = Number(av.dom.sizeColTest.value);
    av.grd.gridWasRows = Number(av.dom.sizeRowTest.value);
    //reset zoom power to 1
    av.grd.zoomSlide.set('value', 1);
    av.parents.placeAncestors();
    //are any parents on the same cell?
    av.grd.cellConflict(av.grd.setupCols, av.grd.setupRows);
    av.grd.drawGridSetupFn('av.ptd.popSizeFn');
  };


  // no slider for muteTest
  //------------------------------------------------------------------------------------------ av.ptd.muteInpuTestChng --
  av.ptd.muteInpuTestChng = function () {
    var value = this.value;
    var muteNum = parseFloat(value);
    //if (av.debug.uil) { console.log('ui: muteNum=', muteNum); }
    if (muteNum >= 0 && muteNum <= 100) {
      av.ptd.validMuteInuput = true;
      av.dom.muteErroTest.style.color = 'black';
      av.dom.muteErroTest.innerHTML = '';

      //av.ind.settingsChanged = true;
      if (av.debug.trace) { console.log('Mute changed', av.ind.settingsChanged); };
      av.post.addUser('muteInpuTest =' + av.dom.muteInpuTest.value,  '1add ? 949');
    }
    else {
      av.ptd.validMuteInuput = false;
      av.dom.muteErroTest.style.color = 'red';
      av.dom.muteErroTest.innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (muteNum <= 0) {
        av.dom.muteErroTest.innerHTML += 'Mutation rate must be >= than zero percent. ';
        if (av.debug.popCon) { console.log('<0'); }
      }
      if (muteNum >= 100) {
        av.dom.muteErroTest.innerHTML += 'Mutation rate must be 100% or less. ';
        if (av.debug.popCon) { console.log('>0'); }
      }
       if (isNaN(muteNum)) {
        av.dom.muteErroTest.innerHTML += 'Mutation rate must be a valid number. ';
        if (av.debug.popCon) { console.log('==NaN'); }
      }
    };
  };

  //*********************************************************************************** enviornment (sugar) settings ****/
  //***************************************************************************** Tests for Population Setup section ****/

  //------------------------------------------------------------------------------------------------- av.ptd.gridChange --
  av.ptd.gridChange = function (domObj) {
    // if (av.dbg.flg.popSetup ) { console.log('popSetup: in av.ptd.gridChange; domObj.id =', domObj.id); }
    var colNum = Number(av.dom.sizeCols.value);
    var rowNum = Number(av.dom.sizeRows.value);
    var gridSize = colNum * rowNum;
    //console.log('col, row=', colNum, rowNum);
    if (colNum > 0 && colNum <= 100 && rowNum > 0 && rowNum <= 100) {
      //console.log('valid response');
      av.ptd.popSizeFn('gridChange');
      av.ptd.validGridSize = true;
      av.dom.userMsgLabel.innerHTML = '';
      //redraw grid
      av.grd.drawGridSetupFn('av.ptd.gridChange');
    } else {
      av.ptd.validGridSize = false;
      if (colNum > 0 && colNum <= 100) {
        av.dom.sizeCols.style.color = 'black';
        av.dom.sizeCells.innerHTML += 'there are '+ gridSize;
      }
      else
        av.dom.sizeCols.style.color = 'red';
      if (rowNum > 0 && rowNum <= 100)
        av.dom.sizeRows.style.color = 'black';
      else
        av.dom.sizeRows.style.color = 'red';
      av.dom.sizeCells.style.color = 'red';
      // if (av.dbg.flg.popSetup ) { console.log('popSetup: not valid; col, row=', colNum, rowNum); }
      av.dom.sizeCells.innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (colNum <= 0) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be greater than zero. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: <0'); }
      }
      if (colNum >= 100) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be 100 or less. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: >0'); }
      }
      if (isNaN(colNum)) {
        av.dom.sizeCells.innerHTML += 'Number of columns must be a valid number. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: ==NaN'); }
      }
      if (rowNum <= 0) {
        av.dom.sizeCells.innerHTML += 'Number rof rows must be greater than zero. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: <0'); }
      }
      if (rowNum >= 100) {
        av.dom.sizeCells.innerHTML += 'Number of rows must be 100 or less. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: >0'); }
      }
      if (isNaN(rowNum)) {
        av.dom.sizeCells.innerHTML += 'Number of rows must be a valid number. ';
        // if (av.dbg.flg.popSetup ) { console.log('popSetup: ==NaN'); }
      }
    }
  };
  //---------------------------------------------------------------------------------------------- av.ptd.gridChangTest --
  av.ptd.gridChangTest = function (from) {
    //console.log(from, 'called av.ptd.gridChangTest; ');
    var colNum = Number(av.dom.sizeColTest.value);
    var rowNum = Number(av.dom.sizeRowTest.value);
    if (colNum > 0 && colNum <= 100 && rowNum > 0 && rowNum <= 100) {
      //console.log('valid response');
      av.ptd.popSizeFnTest('gridChangTest');
      av.ptd.validGridSizTest = true;
      av.dom.userMsgLabel.innerHTML = '';
      //redraw grid
      av.grd.drawGridSetupFn('av.ptd.gridChangTest');
    } else {
      av.ptd.validGridSizTest = false;
      if (colNum > 0 && colNum <= 100)
        av.dom.sizeColTest.style.color = 'black';
      else
        av.dom.sizeColTest.style.color = 'red';
      if (rowNum > 0 && rowNum <= 100)
        av.dom.sizeRowTest.style.color = 'black';
      else
        av.dom.sizeRowTest.style.color = 'red';
      av.dom.sizeCellTest.style.color = 'red';
      //console.log('not valid; col, row=', colNum, rowNum);
      av.dom.sizeCellTest.innerHTML = '';
      av.dom.userMsgLabel.innerHTML = '';
      if (colNum <= 0) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be greater than zero. ';
        //console.log('<0');
      }
      if (colNum >= 100) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be 100 or less. ';
        //console.log('>0');
      }
      if (isNaN(colNum)) {
        av.dom.sizeCellTest.innerHTML += 'Number of columns must be a valid number. ';
        //console.log('==NaN');
      }
      if (rowNum <= 0) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be greater than zero. ';
        //console.log('<0');
      }
      if (rowNum >= 100) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be 100 or less. ';
        //console.log('>0');
      }
      if (isNaN(rowNum)) {
        av.dom.sizeCellTest.innerHTML += 'Number of rows must be a valid number. ';
        //console.log('==NaN');
      }
    }
  };

  //------------------------------------------------------------------------------------ dojo controls that will change --
  // dojo.connect(dijit.byId("childParentRadio"), "onClick", function () {
  //   av.post.addUser("Button: childParentRadio");
  // });
  document.getElementById('childParentRadio').onclick = function () {
    av.post.addUser('Button: childParentRadio');
  };

  // dojo.connect(dijit.byId("childRandomRadio"), "onClick", function () {
  //   av.post.addUser("Button: childRandomRadio");
  // });
  document.getElementById('childRandomRadio').onclick = function () {
    av.post.addUser('Button: childRandomRadio');
  };

  // dojo.connect(dijit.byId("experimentRadio"), "onClick", function () {
  //   av.post.addUser("Button: experimentRadio");
  // });
  document.getElementById('experimentRadio').onclick = function () {
    av.post.addUser('Button: experimentRadio');
  };

  // dojo.connect(dijit.byId("demoRadio"), "onClick", function () {
  //   av.post.addUser("Button: demoRadio");
  // });
  document.getElementById('demoRadio').onclick = function () {
    av.post.addUser('Button: demoRadio');
  };

  av.dom.autoPauseNum.onchange = function () {
    av.post.addUser(": autoPauseNum = " + av.dom.autoPauseNum.value);
    av.ui.autoStopValue = av.dom.autoPauseNum.value; //switching to using av.dom.autoPauseNum.value directly
    //console.log('autoPauseNum=', av.dom.autoPauseNum.value);
  };

  // dojo.connect(dijit.byId("postPost"), "onClick", function () {
  //   av.post.addUser('Button: postPost');
  // });
  document.getElementById('postPost').onclick = function () {
    av.post.addUser('Button: postPost');
  };


  // ===refactored====
  // -near parent
  // document.getElementById("childParentRadio").onclick = function () {
  //   av.post.addUser("Button: childParentRadio");
  // };

  // // --random
  // document.getElementById("childRandomRadio").onclick = function () {
  //   av.post.addUser("Button: childRandomRadio");
  // };

  // document.getElementById("notose").onclick = function () {
  //   av.post.addUser("Button: notose = ");
  // };

  av.ptd.pauseSlctFn = (domObj) => {
    var value = document.getElementById("pauseCriteria").value;
    console.log("puaseCriteria=", value);
    if ("update" == value) {
      av.dom.itemDone1st.style.display = "none";
      av.dom.autoPauseNum.style.display = "inline-block";
      av.dom.pausePrefix.innerHTML = "Pause Run at ";
      av.dom.pauseMidText.innerHTML = "";
    } else {
      // stop based on first task criteria
      av.dom.itemDone1st.style.display = "inline-block";
      av.dom.autoPauseNum.style.display = "none";
      av.dom.pausePrefix.innerHTML = "Pause Run when ";
      av.dom.pauseMidText.innerHTML = " ";
    }
  };

  av.ptd.sgr1stSlctFn = () => {
    var value = document.getElementById("itemDone1st").value;
  };

  //----------------------------------------------------------------------------------------------------------------------
  //  Read Default Workspace as part of initialization
  //----------------------------------------------------------------------------------------------------------------------
  av.fio.JSZip = JSZip;  //to allow other required files to be able to use JSZip
  av.fio.FileSaver = FileSaver;
  av.pch.Plotly = Plotly;

  //Read the default work space and then loadConfigFlag = true; //the @default should be placed at the current configuration
  // need to change how loadConfig worrks

  // if (av.dbg.flg.root) { console.log('Root: before calling av.fio.readZipWS ---------------'); }
  av.fio.readZipWS(av.fio.defaultFname, true);  

  //Need to get @default (the condents of folder c0) into the active config field. 

  //------------------------------------------------------- call StatsButton.click to get the display in default mode --
  // if (av.dbg.flg.root) { console.log('Root: before call StatsButton.click'); }
  document.getElementById('StatsButton').click();
  console.log('after StatsButton.click');

  //********************************************************************************************************************
  //                                                     Oranism Page methods
  //********************************************************************************************************************

  //adjust instruction text size
    // if (av.dbg.flg.root) { console.log('Root: before av.ui.adjustOrgInstructionTextAreaSize'); }
  //---------------------------------------------------------------------------- av.ui.adjustOrgInstructionTextAreaSize --
  av.ui.adjustOrgInstructionTextAreaSize = function() {
    var height = ( $('#orgInfoHolder').innerHeight() - $('#orgDetailID').innerHeight() - 10 ) / 2;
    //console.log('orgInfoHolder.ht=', $('#orgInfoHolder').innerHeight(), '; orgDetailID=',$('#orgDetailID').innerHeight(), '; height=', height);
    av.dom.ExecuteJust.style.height = height + 'px';  //from http://stackoverflow.com/questions/18295766/javascript-overriding-styles-previously-declared-in-another-function
    av.dom.ExecuteAbout.style.height = height + 'px';
    av.dom.ExecuteJust.style.width = '100%';
    av.dom.ExecuteAbout.style.width = '100%';    
  };

  //--------------------------------------------------------------------------------------------------- $ slideOrganism --
  $(function slideOrganism() {
    /* because most mutation rates will be less than 2% I set up a non-linear scale as was done in the Mac Avida-ED */
    /* the jQuery slider I found only deals in integers and the fix function truncates rather than rounds, */
    /* so I multiplied by 400 to get a range .from 0 to 802 for a slide that uses 800 pixels */
    //console.log('before defaultslide value');
    var muteSlideDefault = 190.848501887865;
    /* results in 2% as a default */
    var muteDefault = (Math.pow(10, (muteSlideDefault / 400)) - 1).toFixed(1);
    var slides = $('#orgMuteSlide').slider({
      /* orientation: "vertical", */
      range: 'min',   /*causes the left side of the scroll bar to be grey */
      value: muteSlideDefault,
      min: 0.0,
      max: 802,
      slide: function (event, ui) {
        var tmpVal = (Math.pow(10, (ui.value / 400)) - 1);
        if (12 <= tmpVal ) {tmpVal = tmpVal.toFixed(0); }
        else if (1 <= tmpVal ) {tmpVal = tmpVal.toFixed(1); }
        else if (0.3 <= tmpVal ) {tmpVal = tmpVal.toFixed(2); }
        else {tmpVal = tmpVal.toFixed(2); }
         //console.log('mutation rate =', tmpVal, 'slider = ', ui.value);
        $('#orgMuteInput').val(tmpVal); //put slider value in the text near slider 
        //put the value in the text box 
        av.ind.settingsChanged = true;
        if (av.debug.trace) { console.log('orSlide changed', av.ind.settingsChanged); }
      }
    });
    // initialize
    $('#orgMuteInput').val(muteDefault);

    // update slide based on textbox 
    $('#orgMuteInput').change(function () {
      var value = this.value;
      var muteNum = Number(value);
      //if (av.debug.uil) { console.log('ui: muteNum=', muteNum); }
      if (muteNum >= 0 && muteNum <= 100) {
        av.ptd.validMuteInuput = true;
        console.log();
        av.dom.muteOrgError.style.color = 'black';
        av.dom.muteOrgError.innerHTML = '';
        //update slide value
        slides.slider('value', 400 * av.utl.log(10,1 + (muteNum)));
        av.ind.settingsChanged = true;
        if (av.debug.trace) { console.log('Mute changed', av.ind.settingsChanged); };
        //console.log('value=', muteNum, '; slide=', 400 * av.utl.log(10,1 + (muteNum) ) );
        av.post.addUser('orgMuteInput =' + document.getElementById('orgMuteInput').value,  '1add ? 949');
      } 
      else {
        av.ptd.validMuteInuput = false;
        av.dom.muteOrgError.style.color = 'red';
        av.dom.muteOrgError.innerHTML = '';
        av.dom.userMsgLabel.innerHTML = '';
        if (muteNum <= 0) {
          av.dom.muteOrgError.innerHTML += 'Mutation rate must be >= than zero percent. ';
          if (av.debug.popCon) { console.log('<0'); }
        }
        if (muteNum >= 100) {
          av.dom.muteOrgError.innerHTML += 'Mutation rate must be 100% or less. ';
          if (av.debug.popCon) { console.log('>0'); }
        }
        if (isNaN(muteNum)) {
          av.dom.muteOrgError.innerHTML += 'Mutation rate must be a valid number. ';
          if (av.debug.popCon) { console.log('==NaN'); }
        }
      }
    });
  });

  //triggers flag that requests more data when the settings ModalID is closed.
  //http://stackoverflow.com/questions/3008406/dojo-connect-wont-connect-onclick-with-button
  //----------------------------------------------------------------------------------------------------------------------  

  dojo.connect(dijit.byId('OrganExperimentRadio'), 'onClick', function () {
    av.post.addUser('Button: OrganExperimentRadio');
    av.ind.settingsChanged = true;
  });

  dojo.connect(dijit.byId('OrganDemoRadio'), 'onClick', function () {
    av.ind.settingsChanged = true;
    av.post.addUser('Button: OrganDemoRadio');
  });

  //----------------------------------------------------------------------------------------------------------------------
  //                                        Menu buttons that call for genome/Organism trace
  //----------------------------------------------------------------------------------------------------------------------
  //
  //------------------------------------------------------------------------------------------------- mnCnOrganismTrace --
  // dijit.byId("mnCnOrganismTrace").on("Click", function () {
  //   av.post.addUser("Button: mnCnOrganismTrace");
  //   console.log("control drop down menu clicked");
  //   av.mouse.traceSelected(av.dnd, av.fzr, av.grd);
  //   av.ui.mainBoxSwap("organismBlock");
  //   av.ind.organismCanvasHolderSize("mnCnOrganismTrace");
  //   av.ui.adjustOrgInstructionTextAreaSize();
  //   av.msg.doOrgTrace(); //request new Organism Trace from Avida and draw that.
  // });

  // ===refactored====
  document.getElementById('mnCnOrganismTrace').onclick = function () {
    av.post.addUser('Button: mnCnOrganismTrace');
    console.log('control drop down menu clicked');
    av.mouse.traceSelected('mnCnOrganismTrace.onclick');
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize('mnCnOrganismTrace');
    av.ui.adjustOrgInstructionTextAreaSize();
    av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
  };

  //Put the offspring in the parent position on Organism Trace
  // ====refactored======
  document.getElementById('mnCnOffspringTrace').onclick = function () {
    //Open Oranism view
    av.post.addUser('Button: mnCnOffspringTrace');
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize('mnCnOffspringTrace');
    av.ui.adjustOrgInstructionTextAreaSize();
    av.mouse.offspringTrace(av.dnd, av.fio, av.fzr, av.gen);
    /* update organism canvas */ /* it doesn't automatically update */
    setTimeout(() => {av.ind.updateOrgTrace();}, 1000);
  };

  //----------------------------------------------------------------------------------------------------------------------
  //                                             Canvas for Organsim View (genome)
  //----------------------------------------------------------------------------------------------------------------------

  //set canvas size; called from many places
  av.ind.organismCanvasHolderSize = function() {
    av.dom.organCanvas.width = $('#organismCanvasHolder').innerWidth() - 6; // hopefully $('organismCanvasHolder').innerWidth is equivalent to 100%
    av.dom.organCanvas.height = $('#organismCanvasHolder').innerHeight() - 15; // changed it from -12 to -15 (works better I guess? when I tried using percentages, did not work as well)
    /* IMPORTANT THING TO NOTE: innerHeight() returns just the number, .css("width") returns a string with 'px' suffix
             Canvas widths CANNOT have 'px' suffix, it just needs to be a number. So in conclusion, do NOT use .css("width") to set the width of a canvas. I learned it the hard way. */
  };

  //set output Canvas Size
  av.ind.cpuOutputCnvsSize = function() {
    console.log('output Wd Ht: $inner =', $('#cpuOutputCnvs').innerWidth(), $('#cpuOutputCnvs').innerHeight());
    av.ind.outputCanvasWd = $('#cpuOutputCnvs').innerWidth();
    av.ind.outputCanvasHt = $('#cpuOutputCnvs').innerHeight();
    console.log('av.ind.outputCanvas=', av.ind.outputCanvasWd, av.ind.outputCanvasHt);
  };

  av.ind.updateOrgTrace = function (from) {
    //console.log(from, 'called av.ind.updateOrgTrace: av.traceObj=', av.traceObj.length);
    //console.log('av.ind.cycle', av.ind.cycle);
    av.ind.organismCanvasHolderSize('av.ind.updateOrgTrace');
    //if (undefined == av.traceObj[av.ind.cycle]) console.log('its undefined');
    if (!(undefined == av.traceObj || {} == av.traceObj || undefined == av.traceObj[av.ind.cycle])) {
      av.ind.didDivide = av.traceObj[av.ind.cycle].didDivide; //update global version of didDivide
      av.ind.updateOrganTrace(av.traceObj, av.gen, 'av.ind.updateOrgTrace');
    } else
      av.ind.didDivide = false;
  };

  //----------------------------------------------------------------------------------------------------------------------
  //                                 End of Canvas to draw genome and update details
  //----------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------
  //                    Methods for Buttons examine run of one Avidian on Organaism Page (below drawing of genome
  //----------------------------------------------------------------------------------------------------------------------

  //wonder if this does anything. comment out on 29 June 2021; delete later if no problems
  //function outputUpdate(vol) {
  //  if (av.debug.ind) { console.log('outputUpdate: vol= ', vol); }
  //  document.querySelector('#orgCycle').value = vol;
  //};

  //----------------------------------------------------------------------------------------------------------------------
  document.getElementById('orgBack').onclick = function () {
    var ii = Number(document.getElementById('orgCycle').value);
    //console.log('; av.ind.cycleSlider.get(minimum") =', av.ind.cycleSlider.get('minimum'), '; orgBack: ii = ', ii );
    //console.log('av.ind.cycleSlider = ', av.ind.cycleSlider);
    if (av.ind.cycleSlider.get('minimum') < ii) {
      ii--;
      av.dom.orgCycle.value = ii;
      av.ind.cycle = ii;
      av.ind.cycleSlider.set('value', ii);
      av.ind.updateOrgTrace('orgBack_onclick');
    }
    av.post.addUser('Button: orgBack; cycle = ' + ii);
  };

  //----------------------------------------------------------------------------------------------------------------------
  document.getElementById('orgForward').onclick = function () {
    var ii = Number(document.getElementById('orgCycle').value);
    //console.log('orgForward: ii = ', ii);
    if (av.ind.cycleSlider.get('maximum') > ii) {
      ii++;
      av.dom.orgCycle.value = ii;
      av.ind.cycle = ii;
      av.ind.cycleSlider.set('value', ii);
      av.ind.updateOrgTrace('orgForward_onclick');
      //console.log('ii', ii, '; gen', av.gen);
    }
    av.post.addUser('Button: orgForward; cycle = ' + ii);
  };

  //----------------------------------------------------------------------------------------------------------------------
  document.getElementById('orgReset').onclick = function () {
    //console.log('orgReset');
    av.post.addUser('Button: orgReset');
    av.msg.doOrgTrace();
  };

  //----------------------------------------------------------------------------------------------------------------------
  av.ind.orgRunFn = function () {
    if (av.ind.cycleSlider.get('maximum') > av.ind.cycle) {
      av.ind.cycle++;
      av.dom.orgCycle.value = av.ind.cycle;
      av.ind.cycleSlider.set('value', av.ind.cycle);
      av.ind.updateOrgTrace('orgRunFn');
    } else {
      av.ind.orgStopFn();
    }
  };

  //----------------------------------------------------------------------------------------------------------------------
  document.getElementById('orgRun').onclick = function () {
    //console.log('orgRun: av.ind.cycleSlider.get("value")=', av.ind.cycleSlider.get('value'));
    if ('Run' == document.getElementById('orgRun').textContent) {
      document.getElementById('orgRun').textContent = 'Stop';
      av.ind.update_timer = setInterval(av.ind.orgRunFn, 100);
      av.post.addUser('Button: orgRun = stop; cycle = ' + av.ind.cycle);
    } else {
      av.ind.orgStopFn();
      av.post.addUser('Button: orgRun = run; cycle = ' + av.ind.cycle);
    };
  };

  document.getElementById('orgEnd').onclick = function () {
    if (av.debug.ind) { console.log('orgEnd: av.ind.cycleSlider.get("maximum)', av.ind.cycleSlider.get('maximum')); }
    av.post.addUser('Button: orgEnd');
    av.dom.orgCycle.value = av.ind.cycleSlider.get('maximum');
    av.ind.cycle = av.ind.cycleSlider.get('maximum');
    av.ind.cycleSlider.set('value', av.ind.cycle);
    av.ind.updateOrgTrace('orgEnd_onclick');
    av.ind.orgStopFn();
  };

  //----------------------------------------------------------------------------------------------------------------------
    av.ind.orgCycleInputChange = function (domObj) {
      if (av.debug.ind) { console.log('orgCycle.onChange:  value = ',  domObj.value); }
      av.ind.cycleSlider.set('value', domObj.value);  //seemed to work;
      av.ind.cycle = domObj.value;
      if (av.debug.ind) { console.log('orgCycle: value = ', domObj.value, '; av.ind.cycleSlider.get("value") =', av.ind.cycleSlider.get('value')); }
      av.ind.updateOrgTrace('av.ind.orgCycleInputChange');
      if (av.debug.ind) { console.log('orgCycle: value = ', domObj.value, '; av.ind.cycleSlider=', av.ind.cycleSlider); }
    };

  //       Organism Offspring Cycle Slider      running all the cycles completes the reproduuction
  if (av.debug.ind) { console.log('bevore av.ind.cycleslider av.dom.cycleSlider =', av.dom.cycleSlider); }
  //----------------------------------------------------------------------------------------------------------------------
  av.ind.cycleSlider = new HorizontalSlider({
    name: 'cycleSlider',
    value: 0,
    minimum: 0,
    maximum: 2,
    diabled: true,
    intermediateChanges: true,
    discreteValues: 3,
    style: 'width:100%;',
    onChange: function (value) {
      document.getElementById('orgCycle').value = value;
      av.ind.cycle = value;
      //console.log('cycleSlider');
      av.ind.updateOrgTrace('av.ind.cycleSlider');
    }
  }, 'cycleSlider');
    if (av.debug.ind) { console.log('av.dom.cycleSlider.innerHTML =', av.dom.cycleSlider.innerHTML); }
    if (av.debug.ind) { console.log('av.ind.cycleSlider =', av.ind.cycleSlider); }

  // **************************************************************************************************************** */
  //                                                Analysis Page
  // **************************************************************************************************************** */
  // if (av.dbg.flg.root) { console.log('Root: start of Analysis Page'); }

  // initialize needs to be in AvidaED.js   Does not work in included files
  av.anl.anaChartInit = function () {
    av.anl.divSize('anaChartInit');

    if (undefined !== av.dom.anlChrtSpace.data) {
      if (av.dbg.flg.divsize) { console.log('AnaPlot: before purge in init'); } 
      av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2168';
      av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
      Plotly.purge(av.dom.anlChrtSpace);
      if (av.dbg.flg.divsize) { console.log('AnaPlot: after purge in init'); }
    }
    //Comment out the next three lines later
    var anaData = av.anl.data;
    if (av.dbg.flg.divsize) { console.log('AnaPlot: anlChrtPlotly in av.anl.anaChartInit'); }
    console.log('AnaPlot: anlChrtPlotly in av.anl.anaChartInit before first Plotly call');
    //Plotly.plot('anlChrtSpace', anaData, av.anl.layout, av.anl.widg);
    av.debug.log += '\n     --uiD: Plotly: Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg) in AvidaED.js at 3174 (was 2157)';
    av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg', [av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg]);
    Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg);
    if (av.dbg.flg.divsize) { console.log('AnaPlot: after plot in av.anl.anaChartInit'); }

    //console.log('layout=', av.dom.anlChrtSpace.layout);
    av.dom.anlChrtSpace.style.visibility = 'visible'; /* used to be 'hidden' */
  };
  // if (av.dbg.flg.root) { console.log('Root: before av.anl.anaChartInit called'); }
  av.anl.anaChartInit(); // bug

  //----------------------------------------------------------------------------------------------- av.anl.AnaChartFn --
  av.anl.AnaChartFn = function (from) {
    'use strict';
    // console.log(from, 'called av.anl.AnaChartFn');
    var hasData = false;
    var hideChart = true;
    for (var ii = 0; ii < 3; ii++) {
      if (0 < document.getElementById('popDish' + ii).textContent.length)
        hasData = true;
    }
    if (!hasData)
      av.dom.anlChrtSpace.style.visibility = 'hidden';
    else {
      av.dom.anlChrtSpace.style.visibility = 'visible';
      //if ('populationBlock' === av.ui.page && av.ui.popStatFlag && undefined !== av.anl.logFit[1]) {
      if ('none' === document.getElementById('yLeftSelect').value && 'none' === document.getElementById('yRightSelect').value) {
        if (av.dbg.flg.plt) { console.log('AnaPlot: both axis set to none'); }
        // hide chart see if this will work instead of purging. 
        if (hideChart) {
          av.dom.anlChrtSpace.style.visibility = 'visible';
        }
        // purge chart this was the old way.
        else if (undefined !== av.dom.anlChrtSpace.data) {
          console.log('before purge in anaChartFn');
          av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2205';
          av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
          Plotly.purge(av.dom.anlChrtSpace);
          console.log('after purge in anaChartFn');
        }
      } else {
        if (av.dbg.flg.plt) { console.log('AnaPlot: in AnaChartFn'); }
        av.anl.trace0.x = av.anl.xx.slice(0, av.anl.wrld[0].left.length);
        av.anl.trace1.x = av.anl.xx.slice(0, av.anl.wrld[0].right.length);
        av.anl.trace2.x = av.anl.xx.slice(0, av.anl.wrld[1].left.length);
        av.anl.trace3.x = av.anl.xx.slice(0, av.anl.wrld[1].right.length);
        av.anl.trace4.x = av.anl.xx.slice(0, av.anl.wrld[2].left.length);
        av.anl.trace5.x = av.anl.xx.slice(0, av.anl.wrld[2].right.length);
        av.anl.trace0.y = av.anl.wrld[0].left;
        av.anl.trace1.y = av.anl.wrld[0].right;
        av.anl.trace2.y = av.anl.wrld[1].left;
        av.anl.trace3.y = av.anl.wrld[1].right;
        av.anl.trace4.y = av.anl.wrld[2].left;
        av.anl.trace5.y = av.anl.wrld[2].right;
        av.anl.trace0.line.color = av.anl.color[0];
        av.anl.trace1.line.color = av.anl.color[0];
        av.anl.trace2.line.color = av.anl.color[1];
        av.anl.trace3.line.color = av.anl.color[1];
        av.anl.trace4.line.color = av.anl.color[2];
        av.anl.trace5.line.color = av.anl.color[2];
        av.anl.trace0.name = av.anl.abbreviate[document.getElementById('yLeftSelect').value] + '-' + document.getElementById('popDish0').textContent;
        av.anl.trace1.name = av.anl.abbreviate[document.getElementById('yRightSelect').value] + '-' + document.getElementById('popDish0').textContent;
        av.anl.trace2.name = av.anl.abbreviate[document.getElementById('yLeftSelect').value] + '-' + document.getElementById('popDish1').textContent;
        av.anl.trace3.name = av.anl.abbreviate[document.getElementById('yRightSelect').value] + '-' + document.getElementById('popDish1').textContent;
        av.anl.trace4.name = av.anl.abbreviate[document.getElementById('yLeftSelect').value] + '-' + document.getElementById('popDish2').textContent;
        av.anl.trace5.name = av.anl.abbreviate[document.getElementById('yRightSelect').value] + '-' + document.getElementById('popDish2').textContent;

        var anaData = [av.anl.trace0, av.anl.trace1, av.anl.trace2, av.anl.trace3, av.anl.trace4, av.anl.trace5];

        if (av.dbg.flg.plt) { console.log('AnaPlot: av.anl.xx', av.anl.xx); }
        if (av.dbg.flg.plt) { console.log('trace0', av.anl.trace0); }

        av.anl.divSize('anaChartInit');
        av.anl.layout.height = av.anl.ht;
        av.anl.layout.width = av.anl.wd;
        av.anl.layout.yaxis.title = document.getElementById('yLeftSelect').value;
        av.anl.layout.yaxis2.title = document.getElementById('yRightSelect').value;
        if (av.dbg.flg.plt) { console.log('AnaPlot: before purge in update'); }
        av.debug.log += '\n     --uiD: Plotly: Plotly.purge(av.dom.anlChrtSpace) in AvidaED.js at 2249';
        av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace', [av.dom.anlChrtSpace]);
        Plotly.purge(av.dom.anlChrtSpace);
        if (av.dbg.flg.plt) { console.log('AnaPlot: after plot anlChrtSpace'); }
        //Plotly.plot('anlChrtSpace', anaData, av.anl.layout, av.anl.widg);
        av.debug.log += '\n     --uiD: Plotly: Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg) in AvidaED.js at 3258';
        av.utl.dTailWrite('avidaED.js', (new Error).lineNumber, 'av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg', [av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg]);
        Plotly.plot(av.dom.anlChrtSpace, anaData, av.anl.layout, av.anl.widg);
        if (av.dbg.flg.plt) { console.log('AnaPlot: after plot anlChrtSpace'); }
      }
    }
  };

  av.anl.AnaChartFn();

  //--------------------------------------------------------------------------------------------------------------------//
  //          DND Analysis page
  //--------------------------------------------------------------------------------------------------------------------//

  av.anl.loadWorldData = function (worldNum, dir) {
    if (av.debug.dnd) console.log('loadWorldData: WoldNum:', worldNum, '; dir', dir);
    av.anl.hasWrldData[worldNum] = true;
    av.fzr.pop[worldNum].fit = av.fio.tr2chart(av.fzr.file[dir + '/tr0.txt']);
    av.fzr.pop[worldNum].ges = av.fio.tr2chart(av.fzr.file[dir + '/tr1.txt']);
    av.fzr.pop[worldNum].met = av.fio.tr2chart(av.fzr.file[dir + '/tr2.txt']);
    av.fzr.pop[worldNum].num = av.fio.tr2chart(av.fzr.file[dir + '/tr3.txt']);
    av.fzr.pop[worldNum].via = av.fio.tr2chart(av.fzr.file[dir + '/tr4.txt']);
  };

  av.anl.clearWorldData = function (worldNum){
    'use strict';
    av.fzr.pop[worldNum].fit = [];
    av.fzr.pop[worldNum].ges = [];
    av.fzr.pop[worldNum].met = [];
    av.fzr.pop[worldNum].num = [];
    av.fzr.pop[worldNum].via = [];
  };

  //worldNum is a number 0-2 of the population loaded into analysis page
  av.anl.loadSelectedData = function (worldNum, axisSide, side, from) {
    'use strict';
    console.log(from, 'called v.anl.loadSelectedData: worldNum=',worldNum, '; axis=', axisSide, '; side=', side);
    var dataType = document.getElementById(axisSide).value.toLowerCase();
    switch(dataType) {
      case 'none':
        av.anl.wrld[worldNum][side] = [];
        break;
      case 'average fitness':
        av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].fit;
        break;
      case 'average offspring cost':
        av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].ges;
        break;
      case 'average energy acq. rate':
        av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].met;
        break;
      case 'number of organisms':
        av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].num;
        break;
      case 'number viable':
        av.anl.wrld[worldNum][side] = av.fzr.pop[worldNum].via;
        break;
    }
    var begin = av.anl.xx.length;
    var end = av.fzr.pop[worldNum].fit.length;
    //console.log('begin=', begin, '; end=', end);
    if (av.anl.xx.length < av.fzr.pop[worldNum].fit.length) {
      for (ii = begin; ii< end; ii++) {
        av.anl.xx[ii] = ii;
      }
    }
  };

  /* Chart buttons ****************************************/
  document.getElementById('pop0delete').onclick = function () {
    av.post.addUser('Button: pop0delete');
    av.anl.hasWrldData[0] = false;
    av.anl.wrld[0].left = [];
    av.anl.wrld[0].right = [];
    av.anl.clearWorldData(0);
    console.log('pop0delete');
    av.dnd.empty(av.dnd.popDish0);
    av.anl.AnaChartFn();
  };
  document.getElementById('pop1delete').onclick = function () {
    av.post.addUser('Button: pop1delete');
    av.anl.hasWrldData[1] = false;
    av.anl.wrld[1].left = [];
    av.anl.wrld[1].right = [];
    av.anl.clearWorldData(1);
    av.dnd.empty(av.dnd.popDish1);
    av.anl.AnaChartFn();
  };
  document.getElementById('pop2delete').onclick = function () {
    av.post.addUser('Button: pop2delete');
    av.anl.hasWrldData[2] = false;
    av.anl.wrld[2].left = [];
    av.anl.wrld[2].right = [];
    av.anl.clearWorldData(2);
    av.dnd.empty(av.dnd.popDish2);
    av.anl.AnaChartFn(); 
  };

  //Set Y-axis title and choose the correct array to plot
  //document.getElementById('yLeftSelect').onclick = function () {
  av.anl.yScaleSelect_onChange = function(domObj) {
    var id = domObj.id;
    var value = domObj.value;
    var side = id.substr(1,4).toLowerCase();
    console.log('id=', id, '; value=', value, '; side=', side);
    if ('left' !== side) {side = 'right';};
    av.post.addUser('Button: ' + id + ' is ' + value);
    av.anl.yLeftTitle = value;
    //need to get correct array to plot from freezer
    av.anl.loadSelectedData(0, id, side, 'av.anl.yScaleSelect_onChange');  //numbers are world landing spots
    av.anl.loadSelectedData(1, id, side, 'av.anl.yScaleSelect_onChange');
    av.anl.loadSelectedData(2, id, side, 'av.anl.yScaleSelect_onChange');
    av.anl.AnaChartFn('av.anl.yScaleSelect_onChange');
  };

  av.anl.wrldColorOnChange = function (domObj) {
    var ndx = Number(domObj.id.substr(3, 1));
    var popDishName = 'popDish' + ndx;
    console.log('domObj.id=', domObj.id, '; ndx=', ndx, '; domObj.value', domObj.value, '; av.color.names[]=', av.color.names[domObj.value]);
    av.anl.color[ndx] = av.color.names[domObj.value];
    av.post.addUser('Button:' + domObj.id);
    console.log('av.anl.color[ndx]=', av.anl.color[ndx], '; popDishName=', popDishName);
    console.log('popDish_dom=', document.getElementById(popDishName));
    console.log('');

  /*  
  var tstText = 'not0Details';
    av.dom.test = document.getElementById(tstText);
    console.log(tstText+'.domObj =', av.dom.test);
    var sugarlist = av.dom.test.children;
    console.log('children of '+tstText+' =', sugarlist);
  */
    av.anl.AnaChartFn();    //redraw chart which will get new color from dom
  };

  // if (av.dbg.flg.root) { console.log('Root: after chart defined for analysis page'); }
  // **************************************************************************************************************** */
  //                                       end of Analysis Page
  // **************************************************************************************************************** */

  // **************************************************************************************************************** */
  //                                          Last_things_done; Last things done; Last done last done
  // **************************************************************************************************************** */
  // Do this after all other is done; end of file
  //must create the rest of the resource/reaction user interface before calling av.sgr.ChangeAllGeo('Global');
  av.sgr.buildHtml();
  // av.sgr.defaults;

  if (av.debug.ind) {
    console.log('orgInfoHolder.scrollWidth, client, offset =', av.dom.orgInfoHolder.scrollWidth, av.dom.orgInfoHolder.clientWidth, 
    av.dom.orgInfoHolder.offsetWidth, '; $width, $innerWidth, $outerWidth, css(width)=',
    $("#orgInfoHolder").width(), $("#orgInfoHolder").innerWidth(), $("#orgInfoHolder").outerWidth(), $("#orgInfoHolder").css('width') );
  }
  // if (av.dbg.flg.root) { console.log('Root: before mainBoxSwap'); }
  av.ui.mainBoxSwap('populationBlock');  // just uncommented jan 2019
  av.dom.popStatsBlock.className = 'labInfoClass labInfoNone';
  av.dom.setupBlock.className = 'labInfoClass labInfoFlex';

  // av.doj.mnDebug.style.visibility = 'hidden';
  av.dom.mnDebug.style.visibility = 'hidden';

  // Avida-ED 4.0.16 Beta Testing fix this too. 
  //true for development; false for all production releases even in alpha testsing.  
  if (false) {
    console.log('testing mode; set to false before public release for Avida-ED 4.0.16 Beta Testing. ');
    av.ui.toggleResourceData('lastDone');   //now only turns grid resource value table on and off
    //
    //set mmDebug to hidden so that when toggle called it will show the development sections x
    av.dom.mnDebug.style.visibility = 'hidden';   //visible
  };
  //av.ui.toggleDevelopmentDisplays('Last_things_done');  // this needs to be called in production version

  av.ptd.rightInfoPanelToggleButton(av.dom.StatsButton);
  //av.changeAllSgrRegionLayout(av.sgr.nutdft.uiAll.regionLayout, 'last_things_done');   //does not seem to be needed. 2021_714
  //av.sgr.ChangeAllsugarsupplyTypeSlct('unlimited','Last_things_done');    //does not seem to be needed. 2021_714
  av.sgr.OpenCloseAllSugarDetails('allClose', 'Last_things_done');
  av.pch.popChrtHolder_Ht = $('popChrtHolder').innerHeight();
  av.pch.popStatsBlock_Ht = $('popStatsBlock').innerHeight();
  av.pch.pop_statsBlock_ChrtHolder_noResrceGrid = av.pch.popStatsBlock_Ht - av.pch.popChrtHolder_Ht;

  //problem as now av.ui.about does not desplay at all
  //av.ui.aboutAvidaED_Close();    //should not needd this as display = 'none' but it is needed for now.

  av.ui.setResourceComplexity(av.sgr.complexityLevel, 'last-things-done');

  av.fwt.clearResourceConstants();

  // Geometry is no longer a drop down. Now it is an opton in Supply Type; tiba delte before 2022
  // document.getElementById('allSugarGeometry').style.display = 'none';
  // document.getElementById('geometrySgr').style.display = 'none';

  // **************************************************************************************************************** */
  //Resize tools might be called here or after "Last_things_done"
  // **************************************************************************************************************** */

  var ro = new ResizeObserver(entries => {
    //console.log('in ResizeObserver');
    for (let entry of entries) {
      const cr = entry.contentRect;
      if (av.dbg.flg.dsz) { console.log(entry.target.id, `size wd, ht: ${cr.width}px  ${cr.height}px`); }
      if (av.dbg.flg.dsz) { console.log(entry.target.id,'contntRect: ', cr); }
      if (av.dbg.flg.dsz) { console.log(entry.target.id, 'size wd, ht:', cr.width-cr.left, cr.height-cr.top, 'might need to multiply left and top by two'); }
    }
  });

  // Observe one or multiple elements
  //ro.observe(document.querySelector('div'));
  
    
  //ro.observe(document.querySelector('#gridHolder'));  // commented out on 2021_731 Sat

  // **************************************************************************************************************** */
  //                                          Useful Generic functions
  // **************************************************************************************************************** */

  //Modulo that is more accurate than %; Math.fmod(aa, bb);
  Math.fmod = function (aa, bb) {
    return Number((aa - (Math.floor(aa / bb) * bb)).toPrecision(8));
  };
  
  //console.log('before resize function');
  //does this need a timer function to delay response slightly so the page is not re-written as frequently when the
  //page is changing sizes  ??
  //----------------------------------------------------------------------------------------------------------------------
  $(window).resize(function () {
    //console.log('Does trigger on resize');
    // av.ui.resizePopLayout('window.resize');    //does not work.
  });
});

//----------------------------------------------------------------------------------------------------------------------
  //on 2018_0823 this is where height gets messed up when loading the program. 2021_b15 still in use
  av.pch.divSize = function (from) {
    //av.debug.uil = true;
    if (av.debug.uil) { console.log('ui: PopPlotSize: ',from, 'called av.pch.divSize'); }
    if (av.debug.uil) {
      console.log('ui: popChrtHolder css.wd ht border padding margin=', $("#popChrtHolder").css('width'), $("#popChrtHolder").css('height')
        , $("#popChrtHolder").css('border'), $("#popChrtHolder").css('padding'), $("#popChrtHolder").css('margin'));
    }
    if (av.debug.uil) {
      console.log('ui: PopPlotSize: av.dom.popChrtHolder.ht offset, client ht=', av.dom.popChrtHolder.offsetHeight,
        av.dom.popChrtHolder.clientHeight, '; parseInt(padding)=', parseInt($("#popChrtHolder").css('padding'), 10));
    }
    // trying to remove awkward space between actual plot and its plot holder.
    av.pch.pixel.ht = av.dom.popChrtHolder.clientHeight;
    av.pch.pixel.wd = av.dom.popChrtHolder.clientWidth;
    av.pch.pixel.hdif = 0;
    av.pch.pixel.wdif = 0;

    //console.log(from, 'called av.pch.divSize: av.pch.pixel.wd=', av.pch.pixel.wd, '; av.pch.pixel.ht=', av.pch.pixel.ht);
    av.pch.layout.height = av.pch.pixel.ht - av.pch.pixel.hdif;  //leave a bit more vertical space for plot;
    av.pch.layout.width = av.pch.pixel.wd - av.pch.pixel.wdif;   //leave more horizontal space to right of plot;
    if (av.debug.uil) { console.log('ui: PopPlotSize: av.pch.pixel.wd ht=', av.pch.pixel.wd, av.pch.pixel.ht); }
    if (av.debug.uil) { console.log('ui: PopPlotSize: av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height); }
    //av.dom.popChrtHolder.style.width = av.dom.popChrtHolder.clientWidth + 'px';  //seems redundent  djb said to delete as of 2018_0827
    //av.dom.popChrtHolder.style.height = av.dom.popChrtHolder.clientHeight + 'px';  //seems redundent djb said to delete as of 2018_0827
    av.dom.popChart.style.height = av.pch.layout.height + 'px';
    av.dom.popChart.style.width = av.pch.layout.width + 'px';
    if (av.debug.uil) {
      console.log('ui: PopPlotSize: popChart css.wd, border, padding, margin=', $("#popChart").css('width'), $("#popChart").css('height')
        , $("#popChart").css('border'), $("#popChart").css('padding'), $("#popChart").css('margin'));
    }
    if (av.debug.uil) {
      console.log('ui: PopPlotSize: av.dom.popChart.ht offset, client ht=', av.dom.popChart.offsetHeight,
        av.dom.popChart.clientHeight, '; parseInt(padding)=', parseInt($("#popChart").css('padding'), 10));
    }
    if (av.debug.uil) { console.log('ui: PopPlotSize: av.pch.pixel.wd ht=', av.pch.pixel.wd, av.pch.pixel.ht); }
    if (av.debug.uil) { console.log('ui: PopPlotSize: av.pch.layout.wd ht=', av.pch.layout.width, av.pch.layout.height); }
    //av.debug.uil = false;
  };

  let linkBtn = document.querySelectorAll(".link-btn");
      for (i = 0; i < linkBtn.length; i++) {
        linkBtn[i].addEventListener("click", function (e) {
          let subMenu = this.nextElementSibling;
          if (subMenu.style.display === "block") {
            subMenu.style.display = "none";
          } else {
            dismiss();
            subMenu.style.display = "block";
            e.stopPropagation();
          }
        });
      }

      function dismiss() {
        let submenu = document.querySelectorAll(".dismiss");
        for (i = 0; i < submenu.length; i++) {
          submenu[i].style.display = "none";
        }
      }

      window.addEventListener("click", function (e) {
        dismiss();
      });

// **************************************************************************************************************** */
//                                       Notes on things I learned writing this code
// **************************************************************************************************************** */
//--------------------------------------------------------------------------------------------------------------------
//Notes on things I learned writing this code, that is not directly used in the code
//use FileMerge to compare to versions of the same file on a Mac
//js fiddle of dragging image to cavans and dragging it around http://jsfiddle.net/XU2a3/41/

//Use Meld to compare two folders worth of stuff. Evoke from a terminal prompt. Does not seem to be be in applications folder

//http://dojo-toolkit.33424.n3.nabble.com/dojo-dnd-problems-selection-object-from-nodes-etc-td3753366.html
//This is supposed to select a node; lists as selected programatically, but does not show up on screen.

//A method to distinguish a av.mouse click from a av.mouse drag
//http://stackoverflow.com/questions/6042202/how-to-distinguish-av.mouse-click-and-drag

//A method to get the data items in a dojo DND container in order
//av.dnd.fzConfig.on('DndDrop', function(source, nodes, copy, target){  //This triggers for every dnd drop, not just those of freezeConfigureNode
//http://stackoverflow.com/questions/5837558/dojo-drag-and-drop-how-to-retrieve-order-of-items
//var orderedDataItems = av.dnd.fzConfig.getAllNodes().map(function(node){
//  return av.dnd.fzConfig.getItem(node.id).data;
//});
//console.log('orderedDataItems', orderedDataItems);
/*
 var matches = function (aa, bb) {
 if (aa[0] == bb[0] && aa[1] == bb[1]) return true;
 else return false;
 }
 });
 */

// Web sites that looked useful for some task
/* Capture Close event
 http://stackoverflow.com/questions/1631959/how-to-capture-the-browser-window-close-event
 http://stackoverflow.com/questions/5712195/js-listen-when-child-window-is-closed
 
 Single page app
 http://singlepageappbook.com/detail1.html
 */


/* Charting packages
 
 Reviews
 https://iprodev.com/39-javascript-chart-and-graph-libraries-for-developers/
 http://thenextweb.com/dd/2015/06/12/20-best-javascript-chart-libraries/#gref
 http://www.sitepoint.com/15-best-javascript-charting-libraries/
 
 Good zooming and point value pop-up
 http://dygraphs.com/
 http://jsfiddle.net/eM2Mg/
 
 Charles likes -
 http://c3js.org/
 http://swizec.com/blog/quick-scatterplot-tutorial-for-d3-js/swizec/5337
 http://bl.ocks.org/peterssonjonas/4a0e7cb8d23231243e0e
 
 real time grapsh shift data over
 https://square.github.io/cubism/
 https://bost.ocks.org/mike/cubism/intro/#10
 
 other
 http://www.flotcharts.org/flot/examples/
 
 */

//http://maffelu.net/jquery-handle-left-click-right-click-and-double-click-at-the-same-time/
// I just had to handle a left-click, right-click and a dbl-click at the same time which turned
// out to be a bit tricky at first using just the mousedown function, but the solution was simple:
/*$('#Foo')
 .click(function() //Left click
 {
 //Do something
 })
 .mousedown(function(e) //Right click
 {
 if(e.which == 3) //1: left, 2: middle, 3: right
 {
 //Do something
 }
 })
 .dblclick(function() //Double click
 {
 //Do something
 });
 */

/*
 formating tables = http://www.the-art-of-web.com/html/table-markup/
 */

/* How to make a .gif file.
 To make a gif using screen capture
 http://osxdaily.com/2013/08/23/record-screen-animated-gif-mac-os-x/
 A web application reverses a GIF.
 http://gifmaker.me/reverser/
 */

/* Border order   
 *  
 *  border-color: red;  //all four borders are the same color taht is red
 *  border-color: red blue;  //Top and bottom borders = red; left and right = blue
 *  border-color: red blue green; //Top=red  left &  right = blue;   bottom = green
 *  border-color: red blue green yellow //top=red;  right=blue;   bottom=green   left=yellow
 * 
 */

/* dom box model and size info   
 * https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
 * There is a nested set of boxes with every div
 * margin
 *   border
 *     padding
 *       box (with actual content or guts
 * the size of stuff around the box gets added twice, once for each side
 * 
 * dom.name.offsetWidth = box + 2*padding + 2*borders (seems to include scroll bars plus some)
 * dom.name.clientWidth = box + 2*padding - scrollbar_width    
 * dom.name.scrollWidth = incudes all of the boxes content even that hidden outside scrolling area
 * cssWidth = box only nothing else
 * dom.name.width
 * $('#name').innerWidth()
 *    where name is from the id='name'   of the dom object in the html
 *    
 * scrollbarWidth = offsetWidth - clientWidth - getComputedStyle().borderLeftWidth - getComputedStyle().borderRightWidth
 *  
 */
// get css values
//     //https://stackoverflow.com/questions/590602/padding-or-margin-value-in-pixels-as-integer-using-jquery
// an example: the 10 at the end is to say base 10 rather than octal.
//     console.log('av.dom.popChart.ht offset, client ht=', av.dom.popChart.offsetHeight, 
//       av.dom.popChart.clientHeight, '; parseInt(padding)=', parseInt($("#popChart").css('padding'),10));


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
// 
// 
// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modal ModalID Popup
// 
// https://www.webdesignerdepot.com/2012/10/creating-a-modal-window-with-html5-and-css3/
// http://webreference.com/js/column90/2.html
// https://jqueryhouse.com/30-best-jquery-modal-ModalID-boxes/
// https://www.sitepoint.com/14-jquery-modal-ModalID-boxes/
// https://www.sitepoint.com/14-jquery-modal-ModalID-boxes/
// https://www.w3schools.com/howto/howto_css_modals.asp
// 
// other ModalID boxes premade
// https://www.w3schools.com/js/js_popup.asp
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User interface - Responsive Web design
// 
// https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/
// https://www.w3schools.com/css/css_rwd_intro.asp
// https://www.w3schools.com/html/html_responsive.asp
// 
// very wordy https://alistapart.com/article/responsive-web-design
// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Git Hub
// https://github.com/DBlackwood/av_ui/branches
// 
// https://stackoverflow.com/questions/24977965/collapsible-lists-using-html-and-css
 
//Tabs could be used in the header row for the page buttons. Formated like the tabs on the info pannel for populaton page
/*
 <div id='headerTabs'>
 <span>Population Tab</span>
 <span>Organism Tab</span>
 <span>Analysis Tab</span>
 </div> 
 */
