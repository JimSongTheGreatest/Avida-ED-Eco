/**
 * Filename: dragulaDnd.js
 * Author: Yemi Shin
 * Description: Implementation of Raheem Clemon's Dragula proof of concept in AvidaED 4. 
 * Note: Change the legacy "Dojo-" tags later in HTMl, CSS, and JS
 *       // yemd is a tag for all the legacy code that is getting commented out in development
 */

var av = av || {};  // consistent with the rest of js files
var dijit = dijit || {}; // lets NetBeans know that dijit is defined

// ******************************************************************************************* jQuery(document).ready **
// keep as is since I'm trying to get rid of dojo 
jQuery(document).ready(function($) {
  // containers are divs that are capable of accepting and intiating drag and drop
  var containers = [
                    $.map($(".freezerContainer"), (value, key) => { return value }),  
                    $.map($("#testConfig"), (value, key) => { return value }),
                    $.map($("#activeConfig"), (value, key) => { return value }), 
                    $.map($("#trashCan"), (value, key) => { return value }), 
                    $.map($("#gridCanvas"), (value, key) => { return value }), 
                    $.map($("#ancestorBox"), (value, key) => { return value }),
                    $.map($("#ancestorBoTest"), (value, key) => { return value }),
                    $.map($("#activeOrgan"), (value, key) => { return value }),
                    $.map($("#organCanvas"), (value, key) => { return value }),
                    $.map($("#organIcon"), (value, key) => { return value }),
                    $.map($("#anlDndChart"), (value, key) => { return value }),
                    $.map($("#popDish0"), (value, key) => { return value }),
                    $.map($("#popDish1"), (value, key) => { return value }),
                    $.map($("#popDish2"), (value, key) => { return value }),
                   ].flat();
  if (av.debug.dnd) { console.log('DnD: dragula containters: ', containers); }

  // initialize globally availble references to dnd containers
  av.dnd.fzConfig = containers[0];
  av.dnd.fzOrgan = containers[1];
  av.dnd.fzWorld = containers[2];
  av.dnd.fzTdish = containers[3];
  av.dnd.testConfig = containers[4];
  av.dnd.activeConfig = containers[5];
  av.dnd.trashCan = containers[6];
  av.dnd.gridCanvas = containers[7];
  av.dnd.ancestorBox = containers[8];
  av.dnd.ancestorBoTest = containers[9];
  av.dnd.activeOrgan = containers[10];
  av.dnd.organCanvas = containers[11];
  av.dnd.organIcon = containers[12];
  av.dnd.anlDndChart = containers[13];
  av.dnd.popDish0 = containers[14];
  av.dnd.popDish1 = containers[15];
  av.dnd.popDish2 = containers[16];

  // variables necessary to make landGridCanvas work (because dragula and regular JavaScript mouseevents are not compatible)
  var dragging = false;
  var sourceIsFzOrgan = false;
  var sourceIsFzWorld = false;
  var sourceIsFzConfig = false;
  var sourceIsAncestorBox = false;
  var elForGrid = '';
  // variable to keep the most recently added domid
  // domids are unique for each new item that is drag and dropped
  var mostRecentlyAddedDomid = '';
  av.dnd.clickedMenu = "";
  av.dnd.userDraggedNewConfig = false; // needed to let the modal know whether or not to reset the grid or not

 //------------------------------------------------------------------------------------------- Dragula Initialization --
  var dra = dragula(containers, {
    isContainer: function (el) {
      return false; // only elements in drake.containers will be taken into account
    },
    moves: function (el, source, handle, sibling) {
      // these sources only receive, they do not give
      if (source === av.dnd.anlDndChart || source === av.dnd.organIcon || source === av.dnd.trashCan) {
        return false;
      }
      return true; // otherwise they both work as receivers and givers
    },
    accepts: function (el, target, source, sibling) {
      // actual accepts function is taken out into its own function to be usable outside the dragula constructor
      return av.dnd.accepts(el, target, source);
    },
    invalid: function (el, handle) {
      return false; // don't prevent any drags from initiating by default
    },
    copy: function (el, source) {
      //Makes sure the only item that will be copied instead of moved is in the FreezerMove div
      return source === av.dnd.ancestorBox || source === av.dnd.activeOrgan || source === av.dnd.activeConfig || source === av.dnd.fzConfig || source === av.dnd.fzOrgan || source === av.dnd.fzWorld || source === av.dnd.fzTdish;
    },
    direction: 'vertical',             // Y axis is considered when determining where an element would be dropped                       
    copySortSource: false,             // elements in copy-source containers can be reordered
    revertOnSpill: true,               // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    mirrorContainer: document.body,    // set the element that gets mirror elements appended
    ignoreInputTextSelection: true     // allows users to select input text, see details below
  });
  //--------------------------------------------------------------------------------------- end Dragula Initialization --

  //-------------------------------------------------------------------------------------------------- av.dnd.accepts --
  // This is defining which containers can accept what
  av.dnd.accepts = function(el, target, source) {
    if (source === av.dnd.anlDndChart) { // prevent dragging from analysis chart
      return false;
    }
    if (source === av.dnd.popDish0 || source === av.dnd.popDish1 || source === av.dnd.popDish2) {
      return false;
    }
    // if (target === source) {
    //   return true;
    // }
    if (source === av.dnd.ancestorBox) {
      if (av.grd.runState === "started" && (target === av.dnd.trashCan || target === av.dnd.gridCanvas)) {
        return false;
      } 
      if (target === av.dnd.activeConfig) {
        return false;
      }
      return true;
    } 
    if (source === av.dnd.activeConfig) {
      if (av.grd.runState != "started" && target === av.dnd.fzWorld) {
        return false;
      } else if (target === av.dnd.fzConfig || target === av.dnd.fzWorld) {
        return true;
      }
    }
    if (source === av.dnd.activeOrgan && (target === av.dnd.fzOrgan || target === av.dnd.organIcon || target === av.dnd.organCanvas)) {
      return true;
    }
    if (source === av.dnd.fzConfig && (target === av.dnd.activeConfig || target === av.dnd.gridCanvas)) {
      return true;
    }
    if (source === av.dnd.fzWorld && (target === av.dnd.activeConfig || target === av.dnd.gridCanvas || target === av.dnd.anlDndChart || target === av.dnd.popDish0 || target === av.dnd.popDish1 || target === av.dnd.popDish2)) {
      return true;
    }
    if (source === av.dnd.fzOrgan) {
      if (av.grd.runState === "started" && (target === av.dnd.gridCanvas || target === av.dnd.ancestorBox)) {
        return false;
      } 
      else if (target === av.dnd.activeConfig || target === av.dnd.anlDndChart || target === av.dnd.popDish0 || target === av.dnd.popDish1 || target === av.dnd.popDish2) {
        return false;
      }
      else if (target === av.dnd.organCanvas || target === av.dnd.organIcon || target === av.dnd.gridCanvas || av.dnd.ancestorBox) {
        return true;
      } 
    } 
    if (source === av.dnd.fzTdish && target === av.dnd.testConfig) {
      return true;
    } 
    if (target === av.dnd.trashCan) {
      if (source === av.dnd.activeOrgan || source === av.dnd.organCanvas) { // according to avida ed 3, unable to delete from activeOrgan or organCanvas
        return false;
      }
      return true;
    }
    
    return false;
  };
  //---------------------------------------------------------------------------------------------- end av.dnd.accepts --

  //===================================================================================================== Handle drag ==
  //----------------------------------------------------------------------------------------------------- dra.on drag --
  dra.on('drag', (el, source) => {
    dragging = true;

    // these three if's are for handling drops on gridCanvas 
    // necessary because for some reason inside mouse events, dra 'source' and 'target' are messed up
    if (source === av.dnd.fzOrgan) {
      sourceIsFzOrgan = true;
    } else sourceIsFzOrgan = false;

    if (source === av.dnd.fzWorld) {
      sourceIsFzWorld = true;
    } else sourceIsFzWorld = false;

    if (source === av.dnd.fzConfig) {
      sourceIsFzConfig = true;
    } else sourceIsFzConfig = false;

    if (source === av.dnd.ancestorBox) {
      sourceIsAncestorBox = true;
    } else sourceIsAncestorBox = false;
    if (av.debug.dnd) { console.log('DnD: el =', el); }
    elForGrid = el;
  });

  //----------------------------------------------------------------------------------------------------- dra.on over --
  dra.on('over', (el, container, source) => {
    // when mouse is over some container, change cursor shape according to whether or not item is accepted at target container
    if (av.dnd.accepts(el, container, source)) {
      document.body.style.cursor = "copy";
    } else {
      document.body.style.cursor = "no-drop";
    }
  });

  //------------------------------------------------------------------------------------------------------ dra.on out --
  dra.on('out', (el, container, source) => {
    // when mouse is out of some container, revert to default cursor shape
    document.body.style.cursor = "default";
  });

  //--------------------------------------------------------------------------------------------------- dra.on cancel --
  dra.on('cancel', (el, container, source) => {
    // if drag was canceled, revert to default cursor shape
    document.body.style.cursor = "default";
  });

  //----------------------------------------------------------------------------------------------------- dra.on drop --
  // handle drop
  dra.on('drop', (el, target, source) => {
    if (av.debug.dnd) { console.log('DnD: el=', el); }
    // if the drop is not accepted at this target, cancel and return
    if (!av.dnd.accepts(el, target, source)) {
      dra.cancel();
      return;
    }

    // el, target, source are dom objects aka things you could 'target.id' to
    // if the experiment has already started and user is trying to run a new experiment, show the newDishModal, which prompts user to save
    if (av.grd.runState === 'started' && (source === av.dnd.fzConfig || source === av.dnd.fzWorld) && (target === av.dnd.gridCanvas || target === av.dnd.activeConfig)) {
      av.dnd.userDraggedNewConfig = true;
      av.dom.newDishModalID.style.display = 'block'; // show the 'please save' modal
      av.dom.newDishCancel.onclick = function () {
        av.dom.newDishModalID.style.display = 'none';
        dra.cancel();
        av.dnd.remove(target, el);
        return;
      };
      
      av.dom.newDishDiscard.onclick = function () {
        av.post.addUser('Button: newDishDiscard');
        av.dom.newDishModalID.style.display = 'none';
        if ((source === av.dnd.fzWorld || source === av.dnd.fzConfig) && target === av.dnd.gridCanvas) { 
          av.dnd.landActiveConfigFn(el, av.dnd.activeConfig, source, 'av.dom.newDishDiscard.onclick1');
        } 
        else if ((source === av.dnd.fzWorld || source === av.dnd.fzConfig) && target === av.dnd.activeConfig) {
          av.dnd.landActiveConfigFn(el, target, source, 'av.dom.newDishDiscard.onclick2');
        }
      };

      av.dom.newDishSaveWorld.onclick = function () {
        av.post.addUser('Button: newDishSaveWorld');
        av.ptd.FrPopulationFn();
        av.dom.newDishModalID.style.display = 'none';
        av.dnd.landActiveConfigFn(el, av.dnd.activeConfig, source, 'av.dom.newDishSaveWorld.onclick');
      };
    
      av.dom.newDishSaveConfig.onclick = function () {
        av.post.addUser('Button: newDishSaveConfig');
        av.ptd.FrConfigFn('av.dom.newDishSaveConfig.onclick');
        av.dom.newDishModalID.style.display = 'none';
        av.dnd.landActiveConfigFn(el, av.dnd.activeConfig, source, 'av.dom.newDishSaveConfig.onclick');
      };
    } 
    else {
      if (target === av.dnd.activeConfig) {
        av.dnd.landActiveConfigFn(el, target, source, 'target=av.dnd.activeConfig');
      }

      if (av.grd.runState === 'started' && (source === av.dnd.fzTdish) && (target === av.dnd.gridCanvas || target === av.dnd.testConfig)) {
      //below is older and does not work
      //if (target === av.dnd.testConfig || target === av.dnd.ancestorBoTest && av.grd.runState === 'started') {
        av.dom.newDishModalID.style.display = 'block';
        dra.cancel();
      } else if (target === av.dnd.testConfig) {
        av.dnd.landTestConfigFn(el, target, source, 'dra.on drop: target=av.dnd.activeConfig');
      }
      if (target === av.dnd.trashCan) {
        // however, if the drag is being initiated from the gridCanvas aka, then the event handler is in mouse.js
        // refer to av.mouse.ParentMouse or av.mouse.KidMouse
        av.dnd.landTrashCan(el, source);
      }
      if (target === av.dnd.fzConfig) {
        av.dnd.landFzConfig(el, target, source);
      }
      if (target === av.dnd.ancestorBox) {
        av.dnd.landAncestorBox(el, target, source);
      }
      if (target === av.dnd.ancestorBoTest) {
        av.dnd.landAncestorBoTest(el, target, source);
      }
      if (target === av.dnd.fzWorld) {
        // does not trigger if source is gridCanvas because techinically there are no 'items' on the grid right now.
        // on the grid, mouse movements overtake. Code for that is in mouse.js (av.mouse.kidMouse)
        av.dnd.landFzWorld(el, target, source);
      }
      if (target === av.dnd.fzOrgan) {
        av.dnd.landFzOrgan(el, target, source); // not getting called if source is gridCanvas
      }
      if (target === av.dnd.organIcon) {
        av.dnd.landOrganIcon(el, target, source);
      }
      if (target === av.dnd.activeOrgan) {
        av.dnd.landActiveOrgan(el, target, source);
      }
      if (target === av.dnd.organCanvas) {
        av.dnd.landOrganCanvas(el, target, source);
      }
      if (target === av.dnd.anlDndChart) {
        av.dnd.landAnlDndChart(el, target, source);
      }
      if (target === av.dnd.popDish0 || target === av.dnd.popDish1 || target === av.dnd.popDish2) {
        if (target === av.dnd.popDish0) {
          av.dnd.landpopDish(el, target, source, 0);
        }
        else if (target === av.dnd.popDish1) {
          av.dnd.landpopDish(el, target, source, 1);
        }
        else if (target === av.dnd.popDish2) {
          av.dnd.landpopDish(el, target, source, 2);
        }
      } 
    }

    // Special case for gridCanvas
    $(document).on('mouseup touchend', function (evt) {
      'use strict';
      document.body.style.cursor = "default"; // want the mouse to be default after mouseup
      if (dragging) { 
        var x;
        var y;
        // capture the x and y coordinates
        if(evt.type == 'touchend'){
          var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
          x = touch.pageX;
          y = touch.pageY;
        } else if (evt.type == 'mouseup') {
          x = evt.clientX;
          y = evt.clientY;
        }
        av.mouse.UpGridPos = [x, y];
        // the below convoluted method is necessary to see which elements are below the mouse cursor at this moment
        var elements = $.map(document.elementsFromPoint(x, y), (x) => {return x.id});
        // if gridCanvas is behind this mouse point
        if (elements.indexOf("gridCanvas") != -1 && av.grd.runState !== 'started') {
          if (sourceIsFzOrgan) { 
            av.dnd.landGridCanvas(elForGrid, av.dnd.gridCanvas, av.dnd.fzOrgan);
            av.grd.drawGridSetupFn('av.dnd.gridCanvas where target = gridCanvas');
          }
          else if (sourceIsFzWorld) {
            av.dnd.landActiveConfigFn(elForGrid, av.dnd.activeConfig, av.dnd.fzWorld, 'sourceIsFzWorld');
          }
          else if (sourceIsFzConfig) {
            av.dnd.landActiveConfigFn(elForGrid, av.dnd.activeConfig, av.dnd.fzConfig, 'sourceIsFzConfig');
          }
          else if (sourceIsAncestorBox) {
            av.dnd.landGridCanvas(elForGrid, av.dnd.gridCanvas, av.dnd.ancestorBox);
            av.grd.drawGridSetupFn('av.dnd.gridCanvas where target = gridCanvas');
          }
        }
        dragging = false;
        $(document).unbind('mousemove touchmove');
      }
      // change the color back (whatever it was before) of the most recently added dom object
      if (mostRecentlyAddedDomid != '') {
        $('#' + mostRecentlyAddedDomid).css('background', 'inherit');
      }
      document.body.style.cursor = "default";
      // for debugging
      // if (av.dbg.flg.drg) { console.log('dragula: end mouseup touchend: av.fzr =', av.fzr); }
      if (av.dbg.flg.drg) { console.log('dragula: end mouseup touchend: av.dnd.containerMap =', av.dnd.containerMap); }
    });
  });
  //------------------------------------------------------------------------------------------------- end dra.on drop --

  // Select an item from the freezer using click
  av.dnd.selectedId = '';

  //--------------------------------------------------------------------------------------------- navColClass.onClick --
  // allow click selection only if it's within the freezer
  $('.navColClass').on('click', function(e) {
    document.body.style.cursor = "default"; // want the mouse to be default for click
    if (e.target) {
      var classList = e.target.className.split(" "); // e.target.className is a string
      if (av.dnd.selectedId !== '' && e.target.id === av.dnd.selectedId) {
        $('#' + e.target.id).css('background', 'inherit');
        $('#' + e.target.id).css('border-color', 'inherit');
        av.dnd.selectedId = '';
      } 
      else if (av.dnd.selectedId === '' && classList.indexOf('item') != -1) { // if the target is of class 'item' (aka draggable item)
        $('#' + e.target.id).css('background', 'rgb(189, 229, 245)');
        $('#' + e.target.id).css('border-color', '#3440e6');
        av.dnd.selectedId = e.target.id;
      }
      else if (av.dnd.selectedId != '' && classList.indexOf('item') != -1) { // if something is selected already and user selects another one
        $('#' + av.dnd.selectedId).css('background', 'inherit');
        $('#' + e.target.id).css('background', 'rgb(189, 229, 245)');
        $('#' + e.target.id).css('border-color', '#3440e6');
        av.dnd.selectedId = e.target.id;
      }
    }
  });
  //----------------------------------------------------------------------------------------- end navColClass.onClick --


  //========================================================================== When something is added to the Freezer ==
  //--------------------------------------------------------------------------------------------- av.dnd.landFzConfig --
  // when a configuration is added to the freezer
  av.dnd.landFzConfig = function(el, target, source) {
    'use strict';
    if (av.debug.dnd) { console.log('av.dnd.landFzConfig: fzr', av.fzr); }
    // create a new dom id for the new object
    el.id = 'dom_c' + av.fzr.cNum;
    mostRecentlyAddedDomid = el.id; // register this as the most recently added dom object
    // give a new name to the object
    var oldName = el.textContent.trim();
    var sName = av.dnd.namefzrItem(target, oldName);
    var configurationName = prompt('Please name your dish configuration', sName);
    if (configurationName === null) {
      //cancelled so the item should NOT be added to the freezer.
      dra.cancel();
      return;
    }
    else {
      // confirm that it is a unique name
      var configName = av.dnd.getUniqueFzrName(target, configurationName);
      if (configName !== null) {
        el.innerHTML = `<img src='images/Avida-ED-dish-icon.png' class='DishIcon'></img> ${configName}`;
        // el.textContent = configName;
        // Add an entry to av.dnd.containerMap
        av.dnd.insert(target, el, 'c');
        // insert a new directory into the freezer
        av.fzr.dir[el.id] = 'c'+ av.fzr.cNum;
        // insert a new domid into the freezer
        av.fzr.domid['c'+ av.fzr.cNum] = el.id;
        // insert a new file into the freezer
        av.fzr.file[av.fzr.dir[el.id]+'/entryname.txt'] = configName;
        av.fwt.makeFzrConfig(av.fzr.cNum,'av.dnd.landFzConfig');
        // increment av.fzr.cNum
        av.fzr.cNum++;
        //create a right av.mouse-click context menu for the item just created.
        av.dnd.contextMenu(target, el.id, 'av.dnd.landFzConfig');   //might need to comment out again (djb)
        av.fzr.saveUpdateState('no');
        if (av.debug.dnd) { console.log('dir', av.fzr.dir[el.id], '; configName', configName ); }   //domid is el.id
      } else { //user cancelled so the item should NOT be added to the freezer.
        dra.cancel();
        return;
      }
    } 
  };
  //----------------------------------------------------------------------------------------- end av.dnd.landFzConfig --

  //---------------------------------------------------------------------------------------------- av.dnd.landFzOrgan --
  //when an organism is added to the freezer
  av.dnd.landFzOrgan = function(el, target, source) {
    el.id = 'dom_g' + av.fzr.gNum;
    mostRecentlyAddedDomid = el.id;
    var gen;
    var oldName = el.textContent.trim();
    var sName = av.dnd.namefzrItem(target, oldName);
    var avidian = prompt('Please name your avidian', sName);
    if (avidian === null) {
      //cancelled so the item should NOT be added to the freezer.
      dra.cancel();
      return;
    }
    else {
      var avName = av.dnd.getUniqueFzrName(target, avidian);
      if (null !== avName) { //give dom item new avName name
        av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent + '; --> ' + avName);
        av.dnd.insert(target, el, 'g');
        el.innerHTML = `<img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'></img> ${avName}`;
        // el.textContent = avName;
        if (source === av.dnd.ancestorBox) { //do not remove if population has started running
          //update structure to hold freezer data for Organisms.
          var Ndx = av.parents.domid.indexOf(el.id); //Find index into parent structure
          gen = av.parents.genome[Ndx];
        }
        else if (source === av.dnd.activeOrgan) { gen = av.fzr.actOrgan.genome; }
        av.fzr.dir[el.id] = 'g' + av.fzr.gNum;
        av.fzr.domid['g'+ av.fzr.gNum] = el.id;
        av.fzr.file['g' + av.fzr.gNum + '/genome.seq'] = gen;
        av.fzr.file['g' + av.fzr.gNum + '/entryname.txt'] = avName;
        if (av.debug.dnd) { console.log('fzr', av.fzr); }
        if (av.debug.dnd) { console.log('fzOrgan', av.dnd.fzOrgan); }
        //create a right av.mouse-click context menu for the item just created.
        if (av.debug.dnd) { console.log('before context menu: target',target, '; domId', domid ); }
        av.fzr.gNum++;
        av.dnd.contextMenu(target, el.id, 'av.dnd.landFzOrgan', av.dnd.landFzOrgan);
        av.fzr.saveUpdateState('no');
      }
      else { //Not given a name, so it should NOT be added to the freezer.
        // do not do anything
        dra.cancel();
        return;
      }
    }
    if (av.debug.dnd) console.log('near end of av.dnd.landFzOrgan');
    if (source != av.dnd.ancestorBox) {
      if (av.debug.dnd) console.log('dojo dnd to Organ Freezer, not from Ancestor Box');
    }
    if (av.debug.dnd) console.log('End of av.dnd.landFzOrgan');
  };
  //------------------------------------------------------------------------------------------ end av.dnd.landFzOrgan --

  //---------------------------------------------------------------------------------------------- av.dnd.landFzWorld --
  //when a populated dish is added to the freezer
  av.dnd.landFzWorld = function(el, target, source) {
    'use strict';
    if (av.debug.dnd) console.log('landFzPopDish: fzr', av.fzr);
    el.id = 'dom_w' + av.fzr.wNum;
    mostRecentlyAddedDomid = el.id;
    var oldName = el.textContent.trim() + '@' + av.grd.popStatsMsg.update.formatNum(0);
    var sName = av.dnd.namefzrItem(target, oldName);
    var worldName = prompt('Please name your populated dish', sName);
    if (worldName === null) {
      //cancelled so the item should NOT be added to the freezer.
      dra.cancel();
      return;
    }
    else {
      var nameWorld = av.dnd.getUniqueFzrName(target, worldName);
      if (nameWorld !== null) {
        av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent.trim() + ' --> ' + nameWorld);
        el.innerHTML = `<img src='images/Avida-ED-dish-icon.png' class='DishIcon'></img> ${nameWorld}`;
        // el.textContent = nameWorld;
        av.dnd.insert(target, el, 'w');
        av.fzr.dir[el.id] = 'w'+ av.fzr.wNum;
        av.fzr.domid['w'+ av.fzr.wNum] = el.id;
        //create a right av.mouse-click context menu for the item just created.
        av.dnd.contextMenu(target, el.id, 'av.dnd.landFzWorldFn', av.dnd.landFzOrgan);
        av.fwt.makeFzrWorld(av.fzr.wNum, 'av.dnd.landFzWorldFn');
        av.msg.exportExpr('w' + av.fzr.wNum);
        av.msg.sendData();
        av.fzr.saveUpdateState('no');
        av.fzr.wNum++;
      } else { //user cancelled so the item should NOT be added to the freezer.
        // do nothing
        dra.cancel();
        return;
      }
    }
  };
  //------------------------------------------------------------------------------------------ end av.dnd.landFzWorld --

  //================================================================================== Process drop down menu choices ==
  //---------------------------------------------------------------------------------------- av.dnd.FzAddExperimentFn --
  // Running actions from drop down menu
  // When using dojoDnd, the an item could be selected in each section of the freezer. 
  // Also I did not know an easy way to see if an item was selected in each freezer section. 
  av.dnd.FzAddExperimentFn = function (source, target, type) {
    var fzSection = source.id;
    var targetId = target.id;
    var addedPopPage = false;
    var addedAnaPage = false;

    switch (av.dnd.clickedMenu) {
      case "addOrgan":
        if (av.dnd.selectedId === "") {
          alert('You must select an organism first');
        }
        else {
          var classList = document.getElementById(av.dnd.selectedId).className.split(" ");
          var el = $.map($('#' + av.dnd.selectedId), (value, key) => { return value; })[0].cloneNode(true);
          if (classList.indexOf('g') === -1) {
            $('#' + av.dnd.selectedId).css('background', 'inherit');
            av.dnd.selectedId = '';
            return;
          } else if (av.grd.runState === "started") {
            alert("Can't add a new organism to a running experiment. Start a new experiment to continue.");
          } else {
            addedPopPage = av.dnd.landAncestorBox(el, target, source); 
          }
          // reset the av.dnd.selectedId
          $('#' + mostRecentlyAddedDomid).css('background', 'inherit'); // revert the background color of the most recently added dom object
          $('#' + av.dnd.selectedId).css('background', 'inherit'); // av.dnd.selectedId is the id of the dom object from which the new object was copied from 
          av.dnd.selectedId = '';
        }
        break;
      case "addPop":
        if (av.dnd.selectedId === "") {
          alert('You must select an populated dish first');
        } 
        else {
          var classList = document.getElementById(av.dnd.selectedId).className.split(" ");
          var el = $.map($('#' + av.dnd.selectedId), (value, key) => { return value; })[0].cloneNode(true);
          if (classList.indexOf('w') === -1) {
            $('#' + av.dnd.selectedId).css('background', 'inherit');
            av.dnd.selectedId = '';
            return;
          } else if (av.grd.runState === "started") {
            alert("Can't add a new populated dish to a running experiment. Start a new experiment to continue.");
          } else {
            addedPopPage = av.dnd.landActiveConfigFn(el, target, source, 'addedPopPage1'); 
          }
          // reset the av.dnd.selectedId
          $('#' + mostRecentlyAddedDomid).css('background', 'inherit'); // revert the background color of the most recently added dom object
          $('#' + av.dnd.selectedId).css('background', 'inherit'); // av.dnd.selectedId is the id of the dom object from which the new object was copied from 
          av.dnd.selectedId = '';
        }
        break;
      case "addConfig":
        if (av.dnd.selectedId === "") {
          alert('You must select an configured dish first');
        } 
        else {
          var classList = document.getElementById(av.dnd.selectedId).className.split(" ");
          var el = $.map($('#' + av.dnd.selectedId), (value, key) => { return value; })[0].cloneNode(true);
          if (classList.indexOf('c') === -1) {
            $('#' + av.dnd.selectedId).css('background', 'inherit');
            av.dnd.selectedId = '';
            return;
          } else if (av.grd.runState === "started") {
            alert("Can't add a new configured dish to a running experiment. Start a new experiment to continue.");
          } else {
            addedPopPage = av.dnd.landActiveConfigFn(el, target, source, 'addedPopPage2'); 
          }
          // reset the av.dnd.selectedId
          $('#' + mostRecentlyAddedDomid).css('background', 'inherit'); // revert the background color of the most recently added dom object
          $('#' + av.dnd.selectedId).css('background', 'inherit'); // av.dnd.selectedId is the id of the dom object from which the new object was copied from 
          av.dnd.selectedId = '';
        }
        break;
      case "addToGenomeView":
        if (av.dnd.selectedId != "") {
          var classList = document.getElementById(av.dnd.selectedId).className.split(" ");
          var el = $.map($('#' + av.dnd.selectedId), (value, key) => { return value; })[0].cloneNode(true);
          if (classList.indexOf('g') === -1) {
            $('#' + av.dnd.selectedId).css('background', 'inherit');
            av.dnd.selectedId = '';
            return;
          } else {
            addedPopPage = av.dnd.landActiveOrgan(el, target, source); 
          }
          // reset the av.dnd.selectedId
          $('#' + mostRecentlyAddedDomid).css('background', 'inherit'); // revert the background color of the most recently added dom object
          $('#' + av.dnd.selectedId).css('background', 'inherit'); // av.dnd.selectedId is the id of the dom object from which the new object was copied from 
          av.dnd.selectedId = '';
        } else if (av.dnd.gridSelected != "" && av.dnd.gridSelected != undefined) {
          if (av.dnd.gridSelected == "parent") { // if ancestor is selected
            av.mouse.traceSelectedParent('av.dnd.FzAddExperimentFn');
          } else if (av.dnd.gridSelected == "kid") { // if kid is selected
            av.mouse.traceSelected('av.dnd.FzAddExperimentFn');
          }
        }
        break;
      case "addToAnalysisView":
        if (av.dnd.selectedId === "") {
          alert('You must select an populated dish first');
        } 
        else {
          var classList = document.getElementById(av.dnd.selectedId).className.split(" ");
          var el = $.map($('#' + av.dnd.selectedId), (value, key) => { return value; })[0].cloneNode(true);
          if (classList.indexOf('w') === -1) {
            $('#' + av.dnd.selectedId).css('background', 'inherit');
            av.dnd.selectedId = '';
            return;
          } else {
            addedAnaPage = av.dnd.landAnlDndChart(el, target, source);
          }
          // reset the av.dnd.selectedId
          $('#' + mostRecentlyAddedDomid).css('background', 'inherit'); // revert the background color of the most recently added dom object
          $('#' + av.dnd.selectedId).css('background', 'inherit'); // av.dnd.selectedId is the id of the dom object from which the new object was copied from 
          av.dnd.selectedId = '';
        }
        break;
    }
    if (addedPopPage) av.grd.drawGridSetupFn('av.dnd.FzAddExperimentFn');
  };
  //------------------------------------------------------------------------------------ end av.dnd.FzAddExperimentFn --

  //=================================================================================================== Analysis Page ==
  //---------------------------------------------------------------------------------------------- av.dnd.landpopDish --
  av.dnd.landpopDish = function(el, target, source, num) {
    'use strict';
    av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent.trim());
    //if there is an existing item, need to clear all nodes and assign most recent to item 0
    //clear out the old data
    av.dnd.empty(target);
    // get the data for the dragged dish
    var dir = av.fzr.dir[el.id];
    // give the new dom object a new dom id
    el.id = 'dom_w' + av.fzr.wNum++; 
    mostRecentlyAddedDomid = el.id;
    // add an entry to av.fzr.dir for this new dom id
    av.fzr.dir[el.id] = dir;
    // and vice versa
    av.fzr.domid[dir] = el.id;
    // insert element into target av.dnd.containerMap
    av.dnd.insert(target, el, 'w');
    // insert element into the target DOM
    av.dnd.insertToDOM(target, el);
    // load world data
    av.anl.loadWorldData(num, dir);
    av.anl.loadSelectedData(num, 'yLeftSelect', 'left', 'av.dnd.landpopDish');
    av.anl.loadSelectedData(num, 'yRightSelect', 'right', 'av.dnd.landpopDish');
    av.anl.AnaChartFn();
  };
  //------------------------------------------------------------------------------------------ end av.dnd.landpopDish --

  //------------------------------------------------------------------------------------------------- av.dnd.putNslot --
  av.dnd.putNslot = function (el, num, source) {
    'use strict';
    //the console.log get the data one way, the codes gets the same data another way. 
    // console.log('sourceContainer=', source.parent.id, '; world domID=', source.anchor.id, '; world Name=', source.anchor.textContent.trim());
    // get the data for the dragged dish
    var dir = av.fzr.dir[el.id];
    // give the new dom object a new dom id
    el.id = 'dom_w' + av.fzr.wNum++;
    mostRecentlyAddedDomid = el.id;
    // add an entry to av.fzr.dir for this new dom id
    av.fzr.dir[el.id] = dir;
    // and vice versa
    av.fzr.domid[dir] = el.id;
    // insert element into target av.dnd.containerMap
    av.dnd.insert(source, el, 'w');
    // insert element into DOM
    av.dnd.insertToDOM(source, el);
    // load world data
    av.anl.loadWorldData(num, dir);
    av.anl.loadSelectedData(num, 'yLeftSelect', 'left', 'av.dnd.putNslot');
    av.anl.loadSelectedData(num, 'yRightSelect', 'right', 'av.dnd.putNslot');
  };
  //--------------------------------------------------------------------------------------------- end av.dnd.putNslot --

  //------------------------------------------------------------------------------------------ av.dnd.landAnlDndChart --
  av.dnd.landAnlDndChart = function(el, target, source) {
    'use strict';
    if (av.dbg.flg.drg) { console.log('dragula: in av.dnd.landAnlDndChart'); }
    av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent);
    var items = av.dnd.getAllItems(av.dnd.popDish0);
    if (0 === items.length) { av.dnd.putNslot(el, 0, av.dnd.popDish0); }
    else {
      items = av.dnd.getAllItems(av.dnd.popDish1);
      if (0 === items.length) { av.dnd.putNslot(el, 1, av.dnd.popDish1); }
      else {
        items = av.dnd.getAllItems(av.dnd.popDish2);
        if (0 === items.length) { av.dnd.putNslot(el, 2, av.dnd.popDish2);}
      }
    }
    // in all cases no population name is stored in the graph div
    av.dnd.empty(target);
    av.anl.AnaChartFn();
  };
  //-------------------------------------------------------------------------------------- end av.dnd.landAnlDndChart --

  //=================================================================================================== Organism Page ==
  //------------------------------------------------------------------------------------------ av.dnd.landOrganCanvas --
  av.dnd.landOrganCanvas = function(el, target, source) {
    'use strict';
    av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent);
    // behave the same way as if organism was dropped onto active organ box
    av.dnd.landActiveOrgan(el, target, source);
  };
  //-------------------------------------------------------------------------------------- end av.dnd.landOrganCanvas --

  //------------------------------------------------------------------------------------------ av.dnd.landActiveOrgan --
  av.dnd.landActiveOrgan = function(el, target, source) {
    // need to have only the most recent dropped organism in av.dnd.activeOrgan. 
    // Do this by deleting everything in activeOrgan and reinserting the most resent one after a drop event.
    'use strict';
    if (av.debug.dnd) { console.log('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent); }
    //clear out the old data if an organism is already there
    av.dnd.empty(av.dnd.activeOrgan);
    // get the data for the dragged organism
    var dir = av.fzr.dir[el.id];
    el = el.cloneNode(true);
    // give a new id to the new dom object
    el.id = 'dom_g' + av.fzr.gNum++;
    mostRecentlyAddedDomid = el.id;
    // add an entry to av.fzr.dir for this new new dom id
    av.fzr.dir[el.id] = dir;
    // and vice versa
    av.fzr.domid[dir] = el.id;
    // insert element into target av.dnd.containerMap
    av.dnd.insert(av.dnd.activeOrgan, el, 'g');
    // insert element into target DOM
    av.dnd.insertToDOM(av.dnd.activeOrgan, el);
    // update active organ
    av.fzr.actOrgan.actDomid = el.id;
    av.dnd.updateFromFzrOrganism(el);
    av.msg.doOrgTrace();
  };
  //------------------------------------------------------------------------------------------ av.dnd.landActiveOrgan --
  
  //-------------------------------------------------------------------------------------------- av.dnd.landOrganIcon --
  av.dnd.landOrganIcon = function(el, target, source) {
    // clear out the old data if an organism is already there
    'use strict';
    av.post.addUser('DnD: ' + source.id + '--> ' + target.id + ': by: ' + el.textContent);
    if (av.debug.dnd) { console.log('DnD: source', source.id); }
    // remove the existing configuration
    av.dnd.empty(av.dnd.activeOrgan);
    // get the data for the dragged organism
    var dir = av.fzr.dir[el.id];
    var parentID = el.id;
    // give a new dom id to the new dom object
    el.id = 'dom_g' + av.fzr.gNum++;
    mostRecentlyAddedDomid = el.id;
    // add an entry to av.fzr.dir for this new dom id
    av.fzr.dir[el.id] = dir;
    // and vice versa
    av.fzr.domid[dir] = el.id;
    // insert element into target av.dnd.containerMap
    av.dnd.insert(av.dnd.activeOrgan, el, 'g');
    // insert element into target DOM
    av.dnd.insertToDOM(av.dnd.activeOrgan, el);
    // update active organ
    av.fzr.actOrgan.actDomid = el.id;
    if (source === av.dnd.fzOrgan) { 
      av.dnd.updateFromFzrOrganism(el); 
    }
    if (source === av.dnd.ancestorBox) {
      var Ndx = av.parents.domid.indexOf(parentID);
      if (av.debug.dnd) { console.log('DnD: test from ancestorBox to organIcon', Ndx); }
      av.fzr.actOrgan.name = av.parents.name[Ndx];
      av.fzr.actOrgan.genome = av.parents.genome[Ndx];
      if (av.debug.dnd) { console.log('fzr', av.fzr, '; parents', av.parents, '; ndx', Ndx); }
    }
    // change to organism page
    av.ui.mainBoxSwap('organismBlock');
    av.ind.organismCanvasHolderSize('mouseup_organIcon_parent');
    av.ui.adjustOrgInstructionTextAreaSize();
    if (av.dbg.flg.mouse) { console.log('mouse: from parent', av.parent, '; fzr', av.fzr); }
    av.post.addUser('Dragged item to Organism Icon');
    av.msg.doOrgTrace();  // request new Organism Trace from Avida and draw that.
    // /* yemi: update organism canvas */
    // av.ind.updateOrgTrace();
    // clear out av.dnd.organIcon as nothing is stored there - just moved on to OrganismCurrent
    av.dnd.empty(target); //clear items from icon
  };
  //---------------------------------------------------------------------------------------- end av.dnd.landOrganIcon --

  //------------------------------------------------------------------------------------ av.dnd.updateFromFzrOrganism --
  av.dnd.updateFromFzrOrganism = function (el) {
    'use strict';
    var domId = el.id;
    var dir = av.fzr.dir[domId];
    if (av.debug.dnd) { console.log('DnD: domId', domId, '; dir', dir); }
    av.fzr.actOrgan.name = av.fzr.file[dir+'/entryname.txt'];
    av.fzr.actOrgan.genome = av.fzr.file[dir+'/genome.seq'];
    if (av.debug.dnd) { console.log('DnD: domId', domId); } 
    if (av.debug.dnd) { console.log('DnD: domId', domId, '; dir', dir, '; name', av.fzr.actOrgan.name, '; genome', av.fzr.actOrgan.genome); }
    if (av.debug.dnd) { console.log('DnD: fzr', av.fzr); }
    if (av.debug.dnd) { console.log('DnD: av.fzr.actOrgan', av.fzr.actOrgan); }
  };
  //-------------------------------------------------------------------------------- end av.dnd.updateFromFzrOrganism --

  //================================================================================================= Population Page ==
  //------------------------------------------------------------------------------------ av.dnd.updateFromFzrOrganism --
  av.dnd.landGridCanvas = function(el, target, source) {
    'use strict';
    if (av.debug.dnd) { console.log('DnD: inside gridCanvas dnd'); }
    if (av.debug.dnd) { console.log('DnD: parents', av.parents); }

    var nn = av.parents.name.length;
    av.post.addUser('DnD: ' + source.id + '--> GridCanvas: by: ' + el.textContent.trim() + ' on (' +  av.mouse.UpGridPos[0] + ', ' + av.mouse.UpGridPos[1] + ')' );
    // to correctly place the organism, need to calculate offsets
    var offsetXLocal = ($("#gridHolder").width() - av.dom.gridCanvas.width) / 2;
    var offsetYLocal = ($("#gridHolder").height() - av.dom.gridCanvas.height) / 2;
    var widthOfNav = parseInt($('#navColId').css('width'));
    var heightOfTop = parseInt($('#popTopRw').css('height')) + parseInt($('#headerMain').css('height'));
    var mouseX = av.mouse.UpGridPos[0] - av.grd.marginX - av.grd.xOffset - offsetXLocal - widthOfNav - 5;   // diane moved semicolen to right of -5
    var mouseY = av.mouse.UpGridPos[1] - av.grd.marginY - av.grd.yOffset - offsetYLocal - heightOfTop - 5;  // yemi: hardcoded 5; works for now
    if (av.debug.dnd) { console.log('DnD: mouse.UpGridPosX, y', av.mouse.UpGridPos[0], av.mouse.UpGridPos[1]); }
    if (av.debug.dnd) { console.log('DnD: mouseX, y', mouseX, mouseY); }
    av.parents.col[nn] = Math.floor(mouseX / av.grd.cellWd);
    av.parents.row[nn] = Math.floor(mouseY / av.grd.cellHt);
    // check to see if in the grid part of the canvas
    if (av.parents.col[nn] >= 0 && av.parents.col[nn] < av.grd.cols && av.parents.row[nn] >= 0 && av.parents.row[nn] < av.grd.rows) {
      av.parents.AvidaNdx[nn] = av.parents.row[nn] * av.grd.cols + av.parents.col[nn];
      // start setting up for getting data for parents structure
      nn = av.parents.name.length;  // get index into parents
      // clone the element
      el = el.cloneNode(true);
      // get the data for the dragged element
      var dir = av.fzr.dir[el.id];
      // give a new id to the new dom object
      el.id = 'dom_g' + av.fzr.gNum++;
      mostRecentlyAddedDomid = el.id;
      // add an entry to av.fzr.dir for this new new dom id
      av.fzr.dir[el.id] = dir;
      // and vice versa
      av.fzr.domid[dir] = el.id;
      // give a new name
      el.innerHTML = `<img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'></img> ${av.dnd.nameParent(el.textContent.trim())}`;
      // el.textContent = av.dnd.nameParent(el.textContent.trim());
      // insert element into ancestorBox av.dnd.containerMap
      av.dnd.insert(av.dnd.ancestorBox, el, 'g');
      // insert element into ancestorBox DOM
      av.dnd.insertToDOM(av.dnd.ancestorBox, el);
      
      var container = target.id !== undefined ? "#" + av.dnd.ancestorBox.id : "." + av.dnd.ancestorBox.className;
      if (av.debug.dnd) { console.log('DnD: av.dnd.containerMap[#ancestorBox]', av.dnd.containerMap[container]); }  //av.dnd.containerMap not defined? 

      // Push the item to av.parents
      av.parents.domid.push(el.id);
      //update parents structure
      av.parents.handNdx.push(nn);
      av.parents.howPlaced[nn] = 'hand';
      av.parents.injected[nn] = false;
      if (av.debug.dnd) { console.log('DnD: av.dnd.landGridCanvas; domId', el.id, '; av.fzr.genome', av.fzr.genome); }
      av.parents.genome.push(av.fzr.file[dir+'/genome.seq']);
      //Find color of ancestor
      if (0 < av.parents.Colors.length) {av.parents.color.push(av.parents.Colors.pop());}
      else {av.parents.color.push(av.color.defaultParentColor);}
      //Re-Draw Grid - done in routine that calls this one.
    }
    else {
      // not on grid
      av.post.addUser('DnD: ' + source.id + '--> GridCanvas: by: ' + el.textContent.trim());
    }
    //In all cases remove the ancestor from the gridCanvas so we only keep them in the av.dnd.ancestorBox.
    av.dnd.empty(av.dnd.gridCanvas);  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
    if (av.debug.dnd) { console.log('DnD: parents', av.parents); }
  };
  //-------------------------------------------------------------------------------- end av.dnd.updateFromFzrOrganism --

  //------------------------------------------------------------------------------------------ av.dnd.landAncestorBox --
  av.dnd.landAncestorBox = function(el, target, source) {
    'use strict';
    // get the data for the dragged element
    var dir = av.fzr.dir[el.id];
    if (source !== av.dnd.ancestorBox) {
      //find genome by finding source
      av.parents.genome.push(av.fzr.file[dir + '/genome.seq']);
      var nn = av.parents.name.length;
      av.parents.autoNdx.push(nn);
      av.parents.injected.push(false);
      // give a new id to the new dom object
      el.id = 'dom_g' + av.fzr.gNum++;
      mostRecentlyAddedDomid = el.id;
      // add an entry to av.fzr.dir for this new new dom id
      av.fzr.dir[el.id] = dir;
      // and vice versa
      av.fzr.domid[dir] = el.id;
      // rename the item with a new name
      var newName = av.dnd.nameParent(el.textContent.trim());
      el.innerHTML = `<img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'></img> ${newName}`;
      // el.textContent = newName;
      // insert element into target av.dnd.containerMap
      av.dnd.insert(target, el, 'g');
      // if you place organism into ancestorBox, placement is set to 'auto'
      av.parents.howPlaced.push('auto');
      av.parents.domid.push(el.id); // domid in ancestorBox used to remove if square in grid moved to trashcan
      if (av.debug.dnd) { console.log('DnD: av.parents.domid=', av.parents.domid); }
      // find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.placeAncestors();

      if (av.debug.dnd) { console.log('DnD: parents', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]); }
      av.grd.drawGridSetupFn('av.dnd.landAncestorBox');

      // if the element has not been added yet to target because it has been moved from outside the dragula framework, manually add them
      var childDomIds = $.map(document.querySelector('#' + target.id).children, (x) => { if (!x.classList.contains('gu-transit')) return x.id; });
      if (childDomIds.indexOf(el.id) === -1) {
        target.append(el);
      }
      return (true);
    }
    else { return (false); }
  };
  //-------------------------------------------------------------------------------------- end av.dnd.landAncestorBox --

  //--------------------------------------------------------------------------------------- av.dnd.landAncestorBoTest --
  av.dnd.landAncestorBoTest = function(el, target, source) {
  //Do not copy parents if one is moved within Ancestor Box
    'use strict';
    // get the data for the dragged element
    var dir = av.fzr.dir[el.id];
    if (source !== av.dnd.ancestorBoTest) {
      av.post.data = {
        'operation' : 'DojoDnd',
        'name' : 'av.dnd.landAncestorBoTest',
        //'vars' : {'source' : 'av.dnd.fzOrgan', 'nodeDir': move.dir, 'target': 'av.dnd.ancestorBoTest'},
        'vars' : {'source' : source.id, 'nodeDir': dir, 'target': target.id, 'call': 'dnd.landAncestorBoTest'},
        'assumptions' : {'nodeName': el.textContent.trim() , 'via': 'usr'}
      };
      //find genome by finding source
      av.parents.genome.push(av.fzr.file[dir + '/genome.seq']);
      var nn = av.parents.name.length;
      av.parents.autoNdx.push(nn);
      av.parents.injected.push(false);
      // give a new id to the new dom object
      el.id = 'dom_g' + av.fzr.gNum++;
      mostRecentlyAddedDomid = el.id;
      // add an entry to av.fzr.dir for this new new dom id
      av.fzr.dir[el.id] = dir;
      // and vice versa
      av.fzr.domid[dir] = el.id;
      // rename the item with a new name
      var newName = av.dnd.nameParent(el.textContent.trim());
      el.innerHTML = `<img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'></img> ${newName}`;
      // el.textContent = newName;
      // insert element into target av.dnd.containerMap
      av.dnd.insert(target, el, 'g');
      // if you place organism into ancestorBox, placement is set to 'auto'
      av.parents.howPlaced.push('auto');
      av.parents.domid.push(el.id); // domid in ancestorBox used to remove if square in grid moved to trashcan
      // find color of ancestor
      if (0 < av.parents.Colors.length) { av.parents.color.push(av.parents.Colors.pop());}
      else { av.parents.color.push(av.color.defaultParentColor); }
      av.parents.placeAncestors();

      if (av.debug.dnd) { console.log('DnD: parents', av.parents.name[nn], av.parents.domid[nn], av.parents.genome[nn]); }
      av.grd.drawGridSetupFn('av.dnd.landAncestorBox');

      // if the element has not been added yet to target because it has been moved from outside the dragula framework, manually add them
      var childDomIds = $.map(document.querySelector('#' + target.id).children, (x) => { if (!x.classList.contains('gu-transit')) return x.id;});
      if (childDomIds.indexOf(el.id) === -1) {
        target.append(el);
      }
      return (true);
    }
    else { return (false); }
  };
  //----------------------------------------------------------------------------------- end av.dnd.landAncestorBoTest --

  //--------------------------------------------------------------------------------------- av.dnd.landActiveConfigFn --
  // when a configured dish is added to the config box
  av.dnd.landActiveConfigFn = function (el, target, source, from) {
    'use strict';
    if (av.debug.dnd) { console.log('DnD:', from, 'called av.dnd.landActiveConfigFn: el =', el); }
    if ('test' != av.dnd.configFlag) av.dnd.configFlag = 'normal'; 
   
    av.grd.clearGrd();
    // av.grd.popChartInit('restDishFn');
    av.grd.runState = 'prepping';
    document.getElementById('mnCnOrganismTrace').disabled = true;
    document.getElementById('mnFzOrganism').disabled = true;
    // Clear grid settings
    av.parents.clearParentsFn();
    // old settings cleaned out now
    
    var ndx = -1;
    var klen = 0;
    var kk = 0;
    var str = '';
    // get the data for the dragged element
    // need to make a clone, so as to now modify the original   //should modify the copy (djb)
    el = el.cloneNode(true);
    var dir = av.fzr.dir[el.id];
    // give a new id to the new dom object depending on the type
    var classList = el.className.split(" ");
    if (classList.indexOf('c') != -1 || source == av.dnd.fzConfig) el.id = 'dom_c' + av.fzr.cNum++;
    else if (classList.indexOf('w') != -1 || source == av.dnd.fzWorld) el.id = 'dom_w' + av.fzr.wNum++;
    else if (classList.indexOf('t') != -1 || source == av.dnd.fzTdish) el.id = 'dom_t' + av.fzr.tNum++;

    mostRecentlyAddedDomid = el.id;
    // remove the existing configuration
    av.dnd.empty(target);
    // insert element into target DOM
    av.dnd.insertToDOM(target, el);
    // update active config
    av.fzr.actConfig.actDomid = el.id;
    av.fzr.actConfig.name = el.textContent.trim();
    av.fzr.actConfig.fzDomid = source.id;
    av.fzr.actConfig.dir = dir;
    delete av.fzr.actConfig.file['instset.cfg'];
    if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {
      av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];
    }

    // types are reassigned to indicate that they might be the populated form of the dishes.
    av.frd.updateSetup('av.dnd.landActiveConfigFn');                  // call the avida-ED 3.0 style setup page
    av.msg.setupType = 'standard';
    // empty ancestorBox and ancestorBoTest
    av.dnd.empty(av.dnd.ancestorBoTest);
    av.dnd.empty(av.dnd.ancestorBox);
    av.parents.clearParentsFn();

    if (source === av.dnd.fzConfig || source === av.dnd.fzTdish) {
      // insert element into target av.dnd.containerMap
      av.dnd.insert(target, el, 'c');
      av.fzr.actConfig.type = 'c';
      av.fzr.actConfig.file['events.cfg'] = ' ';

      // delete any files in activeConfig part of freezer
      if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
      if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
      if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}

      // load ancestors if present.
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
        av.fio.autoAncestorLoad(str);
      };
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
        av.fio.handAncestorLoad(str);
      };

      // load files from freezer
      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];

      av.grd.drawGridSetupFn("Yemi's Implementation of landTestConfig. Tiba???"); // draw grid
    }

    else if (source === av.dnd.fzWorld) {
      // insert element into target av.dnd.containerMap
      av.dnd.insert(target, el, 'w');
      av.fzr.actConfig.type = 'w';
      av.ptd.popWorldStateUi('av.dnd.landActiveConfigFn');

      // load files from freezer
      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['clade.ssg'] = av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg'];
      av.fzr.actConfig.file['detail.spop'] = av.fzr.file[av.fzr.actConfig.dir + '/detail.spop'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];
      av.grd.oldUpdate = av.fzr.actConfig.file['update'];
      TimeLabel.textContent = av.grd.oldUpdate;
      
      // load parents from clade.ssg and ancestors.
      av.fio.cladeSSG2parents(av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg']);
      var handList = av.fio.handAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']);
      var autoList = av.fio.autoAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']);
      if (av.debug.dnd) { console.log('DnD: handList=', handList); }
      if (av.debug.dnd) { console.log('DnD: autoList=', autoList); }
      var ndx = 0;
      klen = av.parents.name.length;
      for (kk = 0; kk < klen; kk++) {
        ndx = autoList.nam.indexOf(av.parents.name[kk]);
        if (-1 < ndx) {
          av.parents.genome[kk] = autoList.gen[ndx];
          av.parents.howPlaced[kk] = 'auto';
          av.parents.injected[kk] = true;
          av.parents.autoNdx.push(kk);
          autoList.nam.splice(ndx, 1);
          autoList.gen.splice(ndx, 1);
        }
        else {
          ndx = handList.nam.indexOf(av.parents.name[kk]);
          if (-1 < ndx) {
            av.parents.genome[kk] = handList.gen[ndx];
            av.parents.col[kk] = handList.col[ndx];
            av.parents.row[kk] = handList.row[ndx];
            av.parents.howPlaced[kk] = 'hand';
            av.parents.injected[kk] = true;
            av.parents.handNdx.push(kk);
            handList.nam.splice(ndx, 1);
            handList.gen.splice(ndx, 1);
            handList.col.splice(ndx, 1);
            handList.row.splice(ndx, 1);
          }
          else {
            if (av.debug.dnd) { console.log('DnD: Name, ', av.parents.name[kk], ', not found'); }
          }
        }
      }
    } else {
      // insert element into target av.dnd.containerMap
      av.dnd.insert(target, el, 't');
      av.fzr.actConfig.type = 't';
      av.ptd.popTdishStateUi('av.dnd.landActiveConfigFn');
    }

    av.parents.placeAncestors();
    // load Time Recorder Data
    av.frd.loadTimeRecorderData(av.fzr.actConfig.dir);
    av.pch.processLogic();
    // send message to Avida
    av.msg.importPopExpr();
    av.msg.requestGridData();
    av.msg.sendData();
    av.grd.popChartFn(false, 'av.dnd.landActiveConfigFn');
  };
  //----------------------------------------------------------------------------------- end av.dnd.landActiveConfigFn --

  //-------------------------------------------------------------------------------------- av.dnd.loadDefaultConfigFn --
  // function that is called in the beginning to load the default configuration
  av.dnd.loadDefaultConfigFn = function (from) {
    if (av.debug.dnd) { console.log('DnD:', from, 'called av.dnd.loadDefaultConfigFn'); }
    el = $.map($("#dom_c0"), (value, key) => { return value })[0].cloneNode(true);
    av.dnd.landActiveConfigFn(el, av.dnd.activeConfig, av.dnd.fzConfig, 'av.dnd.loadDefaultConfigFn');
  };
  //---------------------------------------------------------------------------------- end av.dnd.loadDefaultConfigFn --

  //--------------------------------------------------------------------------------------- av.dnd.loadConfigByNameFn --
  av.dnd.loadConfigByNameFn = function (name, from) {
    configs = $('#fzConfig').children();
    if (av.debug.dnd) { console.log('DnD:', from, 'called av.dnd.loadConfigByName: configs =',configs); }
    for (var ii = 0; ii < configs.length; ii++) {
      if (configs[ii].outerText.trim() === name) {
        if (av.debug.dnd) { console.log('DnD: configs['+ii+']=', configs[ii]); }
        av.dnd.landActiveConfigFn(configs[ii].cloneNode(true), av.dnd.activeConfig, av.dnd.fzConfig, av.dnd.loadConfigByNameFn);
      }
    }
  };
  //----------------------------------------------------------------------------------- end av.dnd.loadConfigByNameFn --

  //----------------------------------------------------------------------------------------- av.dnd.landTestConfigFn --
  // when a test dish is added to the test config box
  av.dnd.landTestConfigFn = (el, target, source, find) => {
    'use strict';
    if (av.debug.dnd) { console.log('DnD:', find, 'called av.dnd.landTestConfigFn: will call av.dnd.landActiveConfigFn'); }
    av.dnd.configFlag = 'test';
    //av.dnd.landActiveConfigFn(el, target, source, 'av.dnd.landTestConfigFn');
    if (av.debug.dnd) { console.log('DnD: testconfig', av.fzr.actConfig.file['environment.cfg']); }
    document.getElementById('showBigTextarea').value = av.fzr.actConfig.file['environment.cfg'];
    document.getElementById('environConfigEdit').value = av.fzr.actConfig.file['environment.cfg'];
    av.grd.clearGrd();
    av.grd.runState = 'prepping';
    dijit.byId('mnCnOrganismTrace').attr('disabled', true);    //???
    dijit.byId('mnFzOrganism').attr('disabled', true);         //???
    // Clear grid settings
    av.parents.clearParentsFn();
    // old settings cleaned out now
    
    var ndx = -1;
    var klen = 0;
    var kk = 0;
    var str = '';
    // get the data for the dragged element
    // need to make a clone, so as to now modify the original   //should modify the copy (djb)
    el = el.cloneNode(true);
    var dir = av.fzr.dir[el.id];
    // give a new id to the new dom object depending on the type
    var classList = el.className.split(" ");
    if (classList.indexOf('c') != -1 || source == av.dnd.fzConfig) el.id = 'dom_c' + av.fzr.cNum++;
    else if (classList.indexOf('w') != -1 || source == av.dnd.fzWorld) el.id = 'dom_w' + av.fzr.wNum++;
    else if (classList.indexOf('t') != -1 || source == av.dnd.fzTdish) el.id = 'dom_t' + av.fzr.tNum++;

    mostRecentlyAddedDomid = el.id;
    // remove the existing configuration
    av.dnd.empty(target);
    // insert element into target DOM
    av.dnd.insertToDOM(target, el);
    // update active config
    av.fzr.actConfig.actDomid = el.id;
    av.fzr.actConfig.name = el.textContent.trim();
    av.fzr.actConfig.fzDomid = source.id;
    av.fzr.actConfig.dir = dir;
    delete av.fzr.actConfig.file['instset.cfg'];
    if (av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg']) {
      av.fzr.actConfig.file['instset.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/instset.cfg'];
    }

    // types are reassigned to indicate that they might be the populated form of the dishes.
    av.frd.updateSetup('av.dnd.landActiveConfigFn');                  // call the avida-ED 3.0 style setup page
    av.msg.setupType = 'standard';
    // empty ancestorBox and ancestorBoTest
    av.dnd.empty(av.dnd.ancestorBoTest);
    av.dnd.empty(av.dnd.ancestorBox);
    av.parents.clearParentsFn();

    if (source === av.dnd.fzConfig || source === av.dnd.fzTdish) {
      // insert element into target av.dnd.containerMap
      av.dnd.insert(target, el, 'c');
      av.fzr.actConfig.type = 'c';
      av.fzr.actConfig.file['events.cfg'] = ' ';

      // delete any files in activeConfig part of freezer
      if (av.fzr.actConfig.file['clade.ssg']) {delete av.fzr.actConfig.file['clade.ssg'];}
      if (av.fzr.actConfig.file['detail.spop']) {delete av.fzr.actConfig.file['detail.spop'];}
      if (av.fzr.actConfig.file['update']) {delete av.fzr.actConfig.file['update'];}

      // load ancestors if present.
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt'];
        av.fio.autoAncestorLoad(str);
      };
      if (av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']) {
        str = av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt'];
        av.fio.handAncestorLoad(str);
      };

      // load files from freezer
      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];

      av.grd.drawGridSetupFn("Yemi's Implementation of landTestConfig"); // draw grid
    }

    else if (source === av.dnd.fzWorld) {
      // insert element into target av.dnd.containerMap
      av.dnd.insert(target, el, 'w');
      av.fzr.actConfig.type = 'w';
      av.ptd.popWorldStateUi('av.dnd.landActiveConfigFn');

      // load files from freezer
      av.fzr.actConfig.file['avida.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/avida.cfg'];
      av.fzr.actConfig.file['clade.ssg'] = av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg'];
      av.fzr.actConfig.file['detail.spop'] = av.fzr.file[av.fzr.actConfig.dir + '/detail.spop'];
      av.fzr.actConfig.file['environment.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/environment.cfg'];
      av.fzr.actConfig.file['events.cfg'] = av.fzr.file[av.fzr.actConfig.dir + '/events.cfg'];
      av.fzr.actConfig.file['update'] = av.fzr.file[av.fzr.actConfig.dir + '/update'];
      av.grd.oldUpdate = av.fzr.actConfig.file['update'];
      TimeLabel.textContent = av.grd.oldUpdate;
      
      // load parents from clade.ssg and ancestors.
      av.fio.cladeSSG2parents(av.fzr.file[av.fzr.actConfig.dir + '/clade.ssg']);
      var handList = av.fio.handAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors_manual.txt']);
      var autoList = av.fio.autoAncestorParse(av.fzr.file[av.fzr.actConfig.dir + '/ancestors.txt']);
      if (av.debug.dnd) { console.log('DnD: handList=', handList); }
      if (av.debug.dnd) { console.log('DnD: autoList=', autoList); }
      var ndx = 0;
      klen = av.parents.name.length;
      for (kk = 0; kk < klen; kk++) {
        ndx = autoList.nam.indexOf(av.parents.name[kk]);
        if (-1 < ndx) {
          av.parents.genome[kk] = autoList.gen[ndx];
          av.parents.howPlaced[kk] = 'auto';
          av.parents.injected[kk] = true;
          av.parents.autoNdx.push(kk);
          autoList.nam.splice(ndx, 1);
          autoList.gen.splice(ndx, 1);
        }
        else {
          ndx = handList.nam.indexOf(av.parents.name[kk]);
          if (-1 < ndx) {
            av.parents.genome[kk] = handList.gen[ndx];
            av.parents.col[kk] = handList.col[ndx];
            av.parents.row[kk] = handList.row[ndx];
            av.parents.howPlaced[kk] = 'hand';
            av.parents.injected[kk] = true;
            av.parents.handNdx.push(kk);
            handList.nam.splice(ndx, 1);
            handList.gen.splice(ndx, 1);
            handList.col.splice(ndx, 1);
            handList.row.splice(ndx, 1);
          }
          else {
            if (av.debug.dnd) { console.log('DnD: Name, ', av.parents.name[kk], ', not found'); }
          }
        }
      }
    } else {
      // insert element into target av.dnd.containerMap
      av.dnd.insert(target, el, 't');
      av.fzr.actConfig.type = 't';
      av.ptd.popTdishStateUi('av.dnd.landActiveConfigFn');
    }

    av.parents.placeAncestors();
    // load Time Recorder Data
    av.frd.loadTimeRecorderData(av.fzr.actConfig.dir);
    av.pch.processLogic();
    // send message to Avida
    av.msg.importPopExpr();
    av.msg.requestGridData();
    av.msg.sendData();
    av.grd.popChartFn(false, 'av.dnd.landActiveConfigFn');
  };
  //------------------------------------------------------------------------------------- end av.dnd.landTestConfigFn --

  //--------------------------------------------------------------------------------------------- av.dnd.landTrashCan --
  // When item is added to the trash can
  av.dnd.landTrashCan = function (el, source) {
    'use strict';
    // empty the trashCan of all children elements except for the trashCan image
    for (var i = 0; i < $('#trashCan')[0].children.length; i++) {
      if ($('#trashCan')[0].children[i].id !== 'trashCanImage') {
        $('#trashCan')[0].children[i].remove();
      }
    }
    var remove = {};
    remove.type = '';
    remove.domid = '';
    if (av.debug.dnd) { console.log('in av.dnd.landTrashCan'); }
    var elName = el.textContent.trim();
    if (elName === '@ancestor' || elName === '@default' || elName === '@example') {
      if (elName === '@ancestor' && source === av.dnd.fzOrgan) {
        alert(`You cannot delete ${elName} because it is a reserve item.`);
        dra.cancel();
        return;
      }
      else if (elName === '@default' && source === av.dnd.fzConfig) {
        alert(`You cannot delete ${elName} because it is a reserve item.`);
        dra.cancel();
        return;
      }
      else if (elName === '@example' && source === av.dnd.fzWorld) {
        alert(`You cannot delete ${elName} because it is a reserve item.`);
        dra.cancel();
        return;
      }
    } 
    var sure = confirm(`Are you sure you want to delete ${elName}?`);
    if (sure) {
      // if the item is from the freezer, delete from freezer unless it is original stock (@)
      if (av.dnd.fzOrgan === source && '@ancestor' !== elName) {
        if (av.debug.dnd) { console.log('DnD: fzOrgan->trash', av.fzr.genome); }
        remove.domid = el.id;
        remove.type = 'g';
        // remove the dom object
        el.remove();       
        // remove the object from source av.dnd.containerMap
        av.dnd.remove(source, el);
        av.fzr.saveUpdateState('no');
      }
      else if (av.dnd.fzConfig === source && '@default' !== elName) {
        remove.domid = el.id;
        remove.type = 'g';
        // remove the dom object
        el.remove();       
        // remove the object from source av.dnd.containerMap
        av.dnd.remove(source, el);
        av.fzr.saveUpdateState('no');
      }
      else if (av.dnd.fzWorld === source && '@example' !== elName) {
        remove.domid = el.id;
        remove.type = 'w';
        // remove the dom object
        el.remove();       
        // remove the object from source av.dnd.containerMap
        av.dnd.remove(source, el);
        av.fzr.saveUpdateState('no');
      } 
      else if (av.dnd.ancestorBox === source) {
        // remove the dom object
        el.remove();       
        // remove the object from source av.dnd.containerMap
        av.dnd.remove(source, el);
        av.fzr.saveUpdateState('no');
        var index = av.parents.domid.indexOf(el.id);
        // remove parent
        av.parents.removeParent(index);
        if (av.debug.dnd) { console.log('DnD: parents =', av.parents); }
        // draw an updated grid
        av.grd.drawGridUpdate();
      }
      else if (av.dnd.gridCanvas === source) {
        // taken care of in avidaED.js under mouse drag and drop
      }
    }
    if ((source === av.dnd.fzConfig || av.dnd.fzOrgan || av.dnd.fzWorld) && '' !== remove.type) {
      remove.dir = av.fzr.dir[remove.domid];
      av.fwt.removeFzrItem(remove.dir, remove.type);
    }
    return remove;
  };
  //----------------------------------------------------------------------------------------- end av.dnd.landTrashCan --

  //============================================================================================= Adding context menu ==
  //---------------------------------------------------------------------------------------------- av.dnd.contextMenu --
  av.dnd.contextMenu = function(target, fzItemID, from) {
    'use strict';
    if (av.debug.dnd) { console.log('DnD:', from, 'called contextMenu: fzItemID=', fzItemID); }
    if (av.debug.dnd) { console.log('DnD:', from, 'called contextMenu: target=', target); }
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    var dir = '';
    if (av.debug.dnd) { console.log('contextMenu; target.id =',container); }
    if (av.debug.dnd) { console.log('contextMenu; fzItemID=',fzItemID, ' container=', container); }
    if (av.debug.dnd) { console.log('contextMenu: fzr', av.fzr); }

    var aMenu = new dijit.Menu({targetNodeIds: [fzItemID]});
    aMenu.addChild(new dijit.MenuItem({
      label: 'Rename',
      onClick: function () {
        av.post.addUser('Button: Rename:' + document.getElementById(fzItemID).textContent);
        var fzName = prompt('Please rename freezer item', document.getElementById(fzItemID).textContent);
        if (fzName) {
          fzName = av.dnd.getUniqueFzrName(target, fzName);
          if (null != fzName) {
            if (target === av.dnd.fzConfig || target === av.dnd.fzWorld) {
              document.getElementById(fzItemID).innerHTML = `<img src='images/Avida-ED-dish-icon.png' class='DishIcon'></img> ${fzName}`;
            } else if (target === av.dnd.fzOrgan) {
              document.getElementById(fzItemID).innerHTML = `<img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'></img> ${fzName}`;
            }
            // document.getElementById(fzItemID).data = fzName;
            av.dnd.containerMap[container][fzItemID].name = fzName;
            //update freezer structure
            dir = av.fzr.dir[fzItemID];
            av.fzr.file[dir+'/entryname.txt']=fzName;
            av.fzr.saveUpdateState('no');
          }
        }
      }
    }));
    if (!av.brs.isSafari) {
      aMenu.addChild(new dijit.MenuItem({
        label: 'export',
        onClick: function () {
          av.post.addUser('Button: export:' + document.getElementById(fzItemID).textContent);
          var type;
          var itemName = document.getElementById(fzItemID).textContent.trim();
          var zName = prompt(itemName + ' will be saved as ' + itemName + '.avidaED_fi.zip', itemName + '.avidaED_fi.zip');
          if (zName) {
            if (0 === zName.length) zName = itemName + '.avidaED_fi.zip';  //.avidaED_fi.zip is 23 characters
            if ('.zip' != zName.substring(zName.length - 4)) zName = zName + '.zip';
            dir = av.fzr.dir[fzItemID];
            type = dir.substring(0, 1);
            var FIzip = new av.fio.JSZip();  //FreezerItemZip
            FIzip.file('entrytype.txt', type);
            if (av.debug.dnd) { console.log('DnD: type', type); }
            for (var fname in av.fzr.file) {
              if (dir == fname.substring(0, dir.length)) {
                if (av.debug.dnd) { console.log('DnD: export filename', fname.substring(dir.length + 1)); }
                FIzip.file(fname.substring(dir.length + 1), av.fzr.file[fname]);
              }
            }
            var content = FIzip.generate({type: 'blob'});
            saveAs(content, zName);
          }
        }
      }));
    }
    aMenu.addChild(new dijit.MenuItem({
      label: 'delete',
      onClick: function () {
        av.post.addUser('Button: delete:' + document.getElementById(fzItemID).textContent);
        var sure = confirm('Do you want to delete ' + document.getElementById(fzItemID).textContent + '?');
        if (sure) {
          dir = av.fzr.dir[fzItemID];
          av.fzr.file[dir+'/entryname.txt'];
          if ('fzOrgan' == container) {
            av.fwt.removeFzrItem(dir, 'g');
          } else if ('fzConfig' == container){
            av.fwt.removeFzrItem(dir, 'c');
          } else if ('fzWorld' == container){
            av.fwt.removeFzrItem(dir, 'w');
          }
          document.querySelector(container).removeChild(document.getElementById(fzItemID));
          delete av.dnd.containerMap[container][fzItemID];
          av.fzr.saveUpdateState('no');
        }
      }
    }));
  };
  //------------------------------------------------------------------------------------------ end av.dnd.contextMenu --

  //================================================ Helpers for Inserting and Removing Items from Dragula Containers ==
  //---------------------------------------------------------------------------------------------------- av.dnd.empty --
  // empty a target container
  av.dnd.empty = function(target) {
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    $(container).empty();
    if (av.debug.dnd) { console.log('DnD: container =', container); }
    if (av.debug.dnd) { console.log('DnD: av.dnd.containerMap =', av.dnd.containerMap); }
    if (av.debug.dnd) { console.log('DnD: Object =', Object); }
    if (Object.keys(av.dnd.containerMap).indexOf(container) != -1) {
      av.dnd.containerMap[container] = {}
    }
  };
  //------------------------------------------------------------------------------------------------ end av.dnd.empty --

  //--------------------------------------------------------------------------------------------------- av.dnd.remove --
  // remove an element from target container
  av.dnd.remove = function(target, el) {
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    // below code is accounting for cases where dra.cancel fails, and 
    // you have the item that is not supposed to be in the target container still persist.
    // in this case, because so no official drag and drop event triggered,
    // the dragged (copied) item has the same dom id as its original copy
    // so you end up having multiple dom objects with the same id.
    // so you need to identify which dom object you need to remove from its parentNode
    // and delete the (wrongly copied) dom object that exists within a parentNode that is the (misdirected) target
    var node_to_be_removed;
    for (var i=0; i < document.querySelectorAll("#" + el.id).length; i++) {
      // just make sure the dom object you're trying to remove has a parent who is the target 
      // from which you're trying to remove it
      if (document.querySelectorAll("#" + el.id)[i].parentNode === target) {
        node_to_be_removed = document.querySelectorAll("#" + el.id)[i];
        document.querySelector(container).removeChild(node_to_be_removed);
        break;
      } 
    } 
    
    try { delete av.dnd.containerMap[container][el.id];} 
    catch { console.log("delete failed"); }
  }
  //----------------------------------------------------------------------------------------------- end av.dnd.remove --

  //--------------------------------------------------------------------------------------------------- av.dnd.insert --
  // insert an element into target container
  av.dnd.insert = function(target, el, type) {
    var domid = el.id;
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;

    if (av.debug.dnd) { console.log('DnD: in av.dnd.insert: container =', container); }
    if (av.debug.dnd) { console.log('DnD: av.dnd.containerMap =', av.dnd.containerMap); }
    if (av.debug.dnd) { console.log('DnD: Object =', Object); }
    if (Object.keys(av.dnd.containerMap).indexOf(container) === -1) {
      av.dnd.containerMap[container] = {};
    }
    av.dnd.containerMap[container][domid] = {'name': el.textContent.trim() , 'type': type};
  };
  //----------------------------------------------------------------------------------------------- end av.dnd.insert --

  //---------------------------------------------------------------------------------------------- av.dnd.insertToDOM --
  // insert an element into target container DOM
  av.dnd.insertToDOM = function(target, el) {
    if (av.debug.dnd) { console.log('DnD: in av.dnd.insertToDOM: target=', target); }
    if (av.debug.dnd) { console.log('DnD: el=', el); }
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    el = el.cloneNode(true);
    var classList = el.className.split(" ");
    if (av.debug.dnd) { console.log('DnD: classList=', classList); }
    if (classList.indexOf('gu-transit') != -1) {
      classList.splice(classList.indexOf('gu-transit'), 1);
    };
    el.className = classList.join(" ");
    if (av.debug.dnd) { console.log('DnD: in av.dnd.insertToDOM: el=', el); }
    $(container).append(el);
  };
  //------------------------------------------------------------------------------------------ end av.dnd.insertToDOM --

  //---------------------------------------------------------------------------------------------- av.dnd.getAllItems --
  // get all the items currently in source
  av.dnd.getAllItems = function (source) {
    'use strict';
    var container = source.id !== undefined ? "#" + source.id : "." + source.className;
    try {
      var items = Object.keys(av.dnd.containerMap[container]);
      if (av.debug.dnd) { console.log('DnD: in av.dnd.getAllItems: items=', items); }
    } catch (error) {
      var items = [];
    }
    return items;
  };
  //------------------------------------------------------------------------------------------ end av.dnd.getAllItems --

  //======================================================================================= Helpers for Naming Things ==
  //---------------------------------------------------------------------------------------------- av.dnd.getAllItems --
  // used when anything is dragged into the freezer and it must be named
  av.dnd.getUniqueFzrName = function(target, name) {
    'use strict';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    var unique = true;
    var suggestName;
    var namelist = $.map(document.querySelector(container).children, (x) => { if (!x.classList.contains('gu-transit')) return x.textContent.trim()});
    while (unique) {
      unique = false;
      if (0 <= namelist.indexOf(name)) {
        suggestName = av.dnd.namefzrItem(target, name);
        name = prompt('Please give your item a unique name ', suggestName);
        unique = true;
      }
    }
    return name;
  };
  //------------------------------------------------------------------------------------------ end av.dnd.getAllItems --

  //---------------------------------------------------------------------------------------------- av.dnd.namefzrItem --
  // used to name an item that's being introduced to the freezer
  av.dnd.namefzrItem = function(target, name) {
    'use strict';
    var container = target.id !== undefined ? "#" + target.id : "." + target.className;
    var namelist = $.map(document.querySelector(container).children, (x) => { if (!x.classList.contains('gu-transit')) return x.textContent.trim()});
    var theName;
    //look for name in freezer section
    if (0 <= namelist.indexOf(name)) {
      if (av.debug.dnd) { console.log('DnD: namelist =',namelist, '; name=',name); }
      theName = av.dnd.nameNfrzItem(namelist, name, 1);
    } else { theName = name; }

    return theName;
  };
  //------------------------------------------------------------------------------------------ end av.dnd.namefzrItem --

  //--------------------------------------------------------------------------------------------- av.dnd.nameNfrzItem --
  // helper function for namefzrItem
  av.dnd.nameNfrzItem = function (namelist, name, number) {
    var num = number + 1;
    var aName = name + '_' + num.formatNum(0);
    var newName;
    if (0 <= namelist.indexOf(aName)) {
      newName = av.dnd.nameNfrzItem(namelist, name, num);
    }
    else { newName = aName; }
    return newName;
  };
  //----------------------------------------------------------------------------------------- end av.dnd.nameNfrzItem --

  //---------------------------------------------------------------------------------------------- av.dnd.nameNparent --
  av.dnd.nameNparent = function (name, number) {
    var num = number + 1;
    var aName = name + '-' + num.formatNum(0);
    var newName;
    if (0 <= av.parents.name.indexOf(aName)) {
      newName = av.dnd.nameNparent(name, num);
    }
    else { newName = aName; }
    return newName;
  };
  //------------------------------------------------------------------------------------------ end av.dnd.nameNparent --

  //----------------------------------------------------------------------------------------------- av.dnd.nameParent --
  av.dnd.nameParent = function(name) {
    'use strict';
    var theName;
    //look for name in parent
    if (0 <= av.parents.name.indexOf(name)) {
      theName = av.dnd.nameNparent(name, 1);
    }
    else { theName = name;}
    av.parents.name.push(theName);
    return theName;
  };
  //------------------------------------------------------------------------------------------- end av.dnd.nameParent --

  //-------------------------------------------------------------------------------------------------- av.dnd.sortDnD --
  // Helper For Sorting Things (not sure if still needed)
  // would need to be re written if we want a freezer section sorted
  //
  // based on https://stackoverflow.com/questions/27529727/sorta-b-does-not-work-in-dojo-dnd-source
  // av.dnd.sortDnD = function (dndSection) {
  //   // Input: dndSection = the text of the class os the Dojo DnD section with elements to be sorted
  //   // e.g., var dndSection = 'fzOrgan'; sortDnD(dndSection);
  //   // actually full class name is ".element dojoDndItem" to query
  //   // if (av.debug.dnd) { console.log('DnD: inside sortDnD'); }
  //   //dojo.query(".element",  dojo.byId(dndSection)).sort(
  //   dojo.query(".dojoDndItem", dndSection).sort(
  //     function (a, b) {
  //       var aih = a.innerHTML.toString().toLowerCase();
  //       var bih = b.innerHTML.toString().toLowerCase();
  //       return (aih == bih ? 0 : (aih > bih ? 1 : -1));
  //     }
  //   ).forEach(// fire bug debugging cursor move to this section
  //     function (a, idx) {
  //       dojo.byId(dndSection).insertBefore(a, dojo.byId(dndSection).childNodes[idx]);
  //     });
  // };

  // 2019-04-14: Untested.
  // dojo.connect(av.dnd.fzTdish, "onDndDrop", function (source, nodes, copy, target) {
  //   if ('fzTdish' === target.node.id) {
  //     nodes.forEach(function (node) {
  //       av.dnd.sortDnD('fzTdish');
  //     });
  //   }
  // });
  //-------------------------------------------------------------------------------------------------- av.dnd.sortDnD --

  /*
  Helpers For Touch Screens
  */
  //------------------------------------------------------------------------------------------------- controlMovement --

  function controlMovement(){
    // makes sure that 1 finger touch wont move the screen in the canvas
      $("#gridCnvsHldr").on('touchmove', function(e) {
          // screen wont move with one touch
          if (e.touches.length==1){
            e.preventDefault();
          }
      }, false);
    // makes sure that 1 finger touch wont move the screen in any of the first 3 containers
    for (var i = 0; i < containers.length; i++) {
      containers[i].addEventListener('touchmove', function(e) {
          if (e.touches.length==1){
            e.preventDefault();
          }
      }, false);
    }
  };
  //--------------------------------------------------------------------------------------------- end controlMovement --

  controlMovement();

});
//---------------------------------------------------------------------------------------------- av.dnd.landFzWorld --

