  //set cursor shape -----------------------------------------------------------------------------------------------------
  // Dad and kid are on the population page
  // Mom and Son are on the Individual Organism page
  av = av || {};  //incase av already exists


  //get domID list for freezer; just organism section
  // if (av.dbg.flg.root) { console.log('Root: before av.mouse.frzOrgCurserSet'); }
  av.mouse.frzOrgCurserSet = function(state) {
    console.log('in av.mouse.frzOrgCurserSet: state is', state);
    'use strict';
    for (var dir in av.fzr.domid) {
      //console.log('dir', dir, '; domid', av.fzr.domid[dir]);
      if (null != document.getElementById(av.fzr.domid[dir]) && 'g' === dir[0]) {
        document.getElementById(av.fzr.domid[dir]).style.cursor = state;
        // expect state = 'copy' or 'default'
      }
    }
  };

  //this does all entries in freezer.
  av.mouse.frzCurserSet = function(state) {
    'use strict';
    console.log('in av.mouse.frzCurserSet: state is', state);
    for (var dir in av.fzr.domid) {
      console.log('dir', dir, '; domid', av.fzr.domid[dir]);
      if (null != document.getElementById(av.fzr.domid[dir])) {
        document.getElementById(av.fzr.domid[dir]).style.cursor = state;
        // expect state = 'copy' or 'default'
      }
    }
  };

  av.mouse.setCursorStyle = function (shape, nodeList) {
    "use strict";
    console.log('in av.mouse.setCursorStyle: shape is', shape, 'nodeList =', nodeList);
    if (nodeList !== undefined) {
      var lnght = nodeList.length;
      for (var ii = 0; ii < lnght; ii++) {
        document.getElementById(nodeList[ii]).style.cursor = shape;
      }
    }
  };

  av.mouse.selectedDadMouseStyle = function () {
    'use strict';
    console.log('av.mouse.selectedDadMouseStyle');
    av.mouse.setCursorStyle('no-drop', av.mouse.notDndPopList);
    av.mouse.frzCurserSet('no-drop');
    av.mouse.setCursorStyle('copy', av.mouse.dadTarget);
    if (1 < av.fzr.actConfig.actDomid.length) {document.getElementById(av.fzr.actConfig.actDomid).style.cursor = 'no-drop';}
  };

  //update data about a kid in the selected organism to move = primarily genome and name
  av.mouse.selectedKidMouseStyle = function () {
    'use strict';
    console.log('in av.mouse.selectedKidMouseStyle');
    av.mouse.setCursorStyle('no-drop', av.mouse.notDndPopList);
    av.mouse.setCursorStyle('copy', av.mouse.kidTarget);
    av.mouse.frzOrgCurserSet('copy');
    if (1 < av.fzr.actConfig.actDomid.length) {document.getElementById(av.fzr.actConfig.actDomid).style.cursor = 'no-drop';}
  };

  av.mouse.sonCursorShape = function () {
    'use strict';
    console.log('in av.mouse.sonCursorShape');
    av.mouse.setCursorStyle('no-drop', av.mouse.notDndIndList);
    av.mouse.frzCurserSet('no-drop');
    av.mouse.setCursorStyle('copy', av.mouse.sonTarget);
    av.mouse.frzOrgCurserSet('copy');
    console.log('av.fzr.actOrgan.actDomid', av.fzr.actOrgan.actDomid, '; av.dnd.containerMap["#activeOrgan"]', av.dnd.containerMap["#activeOrgan"]);
    // if (1 < av.fzr.actOrgan.actDomid.length) {document.getElementById(av.fzr.actOrgan.actDomid).style.cursor = 'copy';}
  };

  av.mouse.makeCursorDefault = function () {
    'use strict';
    console.log('in av.mouse.makeCursorDefault');
    av.mouse.frzCurserSet('default');  //arrow
    av.mouse.setCursorStyle('default', av.mouse.dndTarget);
    av.mouse.setCursorStyle('default', av.mouse.notDndPopList);
    av.mouse.setCursorStyle('default', av.mouse.notDndIndList);
  };

  //----------------------------------------------------------------------------------------------------------------------

  //is the mouse nearly in the same place??? not sure if in use
  av.mouse.nearly = function (aa, bb) {
    'use strict';
    console.log('in av.mouse.nearly');
    var epsilon = 3;
    var distance = Math.sqrt(Math.pow(aa[0] - bb[0], 2) + Math.pow(aa[1] - bb[1], 2));
    if (distance > epsilon) return false;
    else return true;
  };

  av.mouse.findParentNdx  = function (from) {
    'use strict';
    console.log(from, 'called av.mouse.findParentNdx');
    var MomNdx = -1;
    var lngth = av.parents.name.length;
    for (var ii = 0; ii < lngth; ii++) {
      //if (matches([av.grd.selectedCol, av.grd.selectedRow], [av.parents.col[ii], av.parents.row[ii]])) {
      if (av.grd.selectedNdx == av.parents.AvidaNdx[ii]) {
        MomNdx = ii;
        //console.log('parent found in function', MomNdx);
        break;  //found a parent no need to keep looking
      }
    }
    return MomNdx;
  };

  av.mouse.findSelected = function (evt, from) {
    'use strict';
    /* yemi: The actual height of the grid is $("#gridHolder").height(). 
             The height of the displayed population grid canvas, is determined in populationGrid.js.
             Basically, the scheme is, if the height is longer than the width, av.dom.gridCanvas.height gets set equal to the width.
             This is probably to keep the canvas a square.
             Anyhow, offsetYLocal basically resolves the offset between the actual grid height ($("#gridHolder").height()) and the newly determined av.dom.gridCanvas.height.
             This is done by doing $("#gridHolder").height() - av.dom.gridCanvas.height and then dividing the result by 2. 
             The dividng by 2 is because there's "empty" gray space both above and below the displayed population grid. 
             We just want to offset by the "above" empty space, so we divide by 2.
             I named offsetYLocal "Local" because this is a variable local to this function. 
             I was mindful not to confuse this with the global variable, av.grd.yOffset, which I believe is not really in use right now.
             I know this because in av.grd.findGridSize function of populationGrid.js, it is set to 0.
    */
    if (!from) from = unknown
    var offsetYLocal = ($("#gridHolder").height() - av.dom.gridCanvas.height) / 2;
    var offsetXLocal = ($("#gridHolder").width() - av.dom.gridCanvas.width) / 2;
    var mouseX = evt.offsetX - av.grd.marginX - av.grd.xOffset - offsetXLocal;
    var mouseY = evt.offsetY - av.grd.marginY - av.grd.yOffset - offsetYLocal;
    av.grd.selectedCol = Math.floor(mouseX / av.grd.cellWd);
    av.grd.selectedRow = Math.floor(mouseY / av.grd.cellHt);
    av.grd.selectedNdx = av.grd.selectedRow * av.grd.cols + av.grd.selectedCol;
    if (av.dbg.flg.mouse) console.log(from, 'called av.mouse.findSelected: mx,y', mouseX, mouseY, '; selected Col, Row', av.grd.selectedCol, av.grd.selectedRow);
  };

  av.mouse.offspringTrace = function(from) {
    'use strict';
    //Get name of Mom that is in OrganCurrentNode
    var parent;
    var parentID = Object.keys(av.dnd.containerMap['#activeOrgan'])[0];
    if (av.dbg.flg.mouse) console.log(from, 'called av.mouse.offspringTrace: parentID =', parentID);
    if (undefined == parentID) parent = '';
    else parent = document.getElementById(parentID).textContent.trim();
    av.dnd.empty(av.dnd.activeOrgan);
    //Put name of offspring in OrganCurrentNode
    var domid = 'g' + av.fzr.gNum++;
    var type = 'g';
    $('#activeOrgan').append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${parent + "_offspring"} </div>`);
    var gdir = av.fzr.dir[parentID];
    av.fzr.dir[domid] = gdir;
    av.fzr.domid[gdir] = domid;
    av.dnd.containerMap['#activeOrgan'][domid] = {name: parent + "_offspring", type: type};
    av.fzr.actOrgan.actDomid = domid;
    av.fzr.actOrgan.name = parent + "_offspring";
    console.log(av.ind.dna[av.ind.son]);
    av.fzr.actOrgan.genome = '0,heads_default,' + av.ind.dna[av.ind.son];  //this should be the full genome when the offspring is complete.
    if (av.dbg.flg.mouse) console.log('av.fzr.actOrgan', av.fzr.actOrgan);
    //get genome from offspring data //needs work!!
    av.msg.doOrgTrace();  //request new Organism Trace from Avida and draw that.
  };

  // yemi: 'offspring' is for organism page, 'kid' for population page
  av.mouse.offspringMouse = function(evt, from) {
    'use strict';
    if (!from) from = 'unkn';
    console.log(from, 'called av.mouse.offspringMouse');
    var target = '';
    var elements = $.map(document.elementsFromPoint(evt.clientX, evt.clientY), (x) => {return x.id});
    if (elements.indexOf('organIcon') != -1 || elements.indexOf('actOrgImg') != -1 || elements.indexOf('activeOrgan') != -1) {
      console.log('inside offspringMouse');
      av.mouse.offspringTrace('av.mouse.offspringMouse');
      av.post.addUser('Moved something to organsim Icon');
      target = 'organIcon';
    }
    else if (elements.indexOf('fzOrgan') != -1) { // look for target in the freezer
      var found = false;
      console.log(av.fzr);
      console.log(evt.target.id);
      // for (var dir in av.fzr.domid) {if (av.fzr.domid[dir] === evt.target.id) {found=true; break;}}
      found = true;
      if (found) {
        target  = 'fzOrgan';
        //create a new freezer item
        if (av.dbg.flg.mouse) console.log('offSpring->freezerDiv');
        var parent;
        var container = av.dnd.activeOrgan.id !== undefined ? "#" + av.dnd.activeOrgan.id : "." + av.dnd.activeOrgan.className;
        var parentID = $(container).children()[0].id; // yemi: not sure it will work
        if (av.dbg.flg.mouse) console.log('parentID', parentID);
        if (undefined == parentID) parent = 'noParentName';
        else parent = document.getElementById(parentID).textContent.trim();
        //make sure there is a name.
        var oldName = parent + '_offspring';
        var sName = av.dnd.namefzrItem(av.dnd.activeOrgan, oldName);
        var avidian = prompt('Please name your avidian', sName);
        if (avidian) {
          avidian = av.dnd.getUniqueFzrName(av.dnd.activeOrgan, avidian);
          if (null != avidian) {  //add to Freezer
            av.post.addUser('Moved offspring, ' + avidian + ', to organism freezer');
            var domid = 'g' + av.fzr.gNum;
            var type = 'g';
            $('#fzOrgan').append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${avidian} </div>`);
            // Add an entry to av.dnd.containerMap
            av.dnd.containerMap[container][domid] = {'name': avidian , 'type': 'g'};
            //find domId of offspring as listed in dnd.fzOrgan
            var gdir =  'g' + av.fzr.gNum;
            av.fzr.dir[domid] = gdir;
            av.fzr.domid[gdir] = domid;
            av.fzr.file[gdir + '/entryname.txt'] = avidian;
            av.fzr.file[gdir + '/genome.seq'] = '0,heads_default,' + av.ind.dna[av.ind.son];
            av.fzr.gNum++;
            av.fzr.saveUpdateState('no');
            if (av.dbg.flg.mouse) console.log('dragula: Offspring-->freezer, dir', gdir, 'fzr', av.fzr);
            //create a right mouse-click context menu for the item just created.
            if (av.dbg.flg.mouse) console.log('mouse: Offspring-->freezer; fzf', av.fzr);
            av.dnd.contextMenu(av.dnd.fzOrgan, domid, 'av.mouse.offspringMouse');
          }
        }
      }
    }
    return target;
  };

  av.mouse.traceSelected = function(from) {
    'use strict';
    if (av.dbg.flg.mouse) { console.log('mouse:', from, 'called av.mouse.traceSelected'); }
    av.dnd.empty(av.dnd.activeOrgan);
    //Put name of offspring in OrganCurrentNode
    var container = '#' + av.dnd.activeOrgan.id;
    // Add an entry to av.dnd.containerMap
    if (Object.keys(av.dnd.containerMap).indexOf(container) === -1) {
      av.dnd.containerMap[container] = {};
    }
    var domid = 'dom_g' + av.fzr.gNum++;
    var type = 'g';
    $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${av.grd.kidName} </div>`);
    av.dnd.containerMap[container][domid] = {'name': av.grd.kidName , 'type': 'g'};
    //genome data should be in av.parents.genome[av.mouse.ParentNdx];
    if (av.dbg.flg.mouse) { console.log('mouse: genome =', av.grd.kidGenome); }
    av.fzr.actOrgan.genome = av.grd.kidGenome;
    av.fzr.actOrgan.name = av.grd.kidName;
    av.fzr.actOrgan.fzDomid = "";
    av.fzr.actOrgan.actDomid = domid;
  };

  av.mouse.traceSelectedParent = function(from) {
    if (av.dbg.flg.mouse) { console.log('mouse:', from, 'called av.mouse.traceSelectedParent'); }
    av.dnd.empty(av.dnd.activeOrgan);
    var container = '#' + av.dnd.activeOrgan.id;
    var domid = av.parents.domid[av.mouse.ParentNdx];
    var type = 'g';
    //Put name of offspring in av.dnd.activeOrganism
    if (Object.keys(av.dnd.containerMap).indexOf(container) === -1) {
      av.dnd.containerMap[container] = {};
    }
    av.dnd.containerMap[container][domid] = {'name': av.parents.name[av.mouse.ParentNdx] , 'type': 'g'};
    $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${av.parents.name[av.mouse.ParentNdx]} </div>`)
    av.fzr.actOrgan.actDomid = domid;
    //genome data should be in av.parents.genome[av.mouse.ParentNdx];
    av.fzr.actOrgan.genome = av.parents.genome[av.mouse.ParentNdx];
    av.fzr.actOrgan.name = av.parents.name[av.mouse.ParentNdx];
    av.fzr.actOrgan.fzDomid = av.parents.domid[av.mouse.ParentNdx];
  };

  // yemi: 'offspring' is for organism page, 'kid' for population page
  av.mouse.kidMouse = function (evt, from){
    'use strict';
    console.log(from, 'called av.mouse.kidMouse');
    var target = '';
    if (av.dbg.flg.mouse) console.log('in KidMouse', evt.target.id, evt);
    if (av.grd.kidGenome === undefined) {
      return target;
    }
    if (5 < av.grd.kidGenome.length) {
      if ('organIcon' == evt.target.id) {
        target = 'organIcon';
        av.post.addUser('Moved something to Organism Icon');
        av.mouse.traceSelected('av.mouse.kidMouse');
      }
      else { // look for target in the freezer
        var found = false;
        if (av.dbg.flg.mouse) console.log('target.id',evt.target.id, '; av.fzr.domid', av.fzr.domid);
        //note below index of 0 indicates gridCanvas and if the target is canvas it should not be frozen
        if (0 < av.mouse.kidTarget.indexOf(evt.target.id)) {found = true;}
        else {
          for (var dir in av.fzr.domid) {
            //console.log('dir', dir);
            if ((av.fzr.domid[dir].indexOf(evt.target.id) != -1) && ('g' == dir.substring(0, 1))) {
              found = true;
              break;
            }
          }
        }
        if (found) {
          target = 'fzOrgan';
          av.mouse.freezeTheKid();
        }
      }
    }
    else console.log('Kid->OrganismIcon: genome too short ', av.grd.kidGenome);
    return target;
  };

  // possibly move to dragulaDnd just to keep all the dnd functions together?
  av.mouse.freezeTheKid = function () {
    "use strict";
    av.post.addUser('moved avidian from grid to freezer');
    if (av.dbg.flg.mouse) console.log('in av.mouse.freezeTheKid: moved avidian from grid to freezer');
    //make sure there is a name
    var sName = av.dnd.namefzrItem(av.dnd.fzOrgan, av.grd.kidName);
    var avidian = prompt('Please name your avidian', sName);
    var container = '#' + av.dnd.fzOrgan.id;
    if (avidian) {
      var avName = av.dnd.getUniqueFzrName(av.dnd.fzOrgan, avidian);
      if (null != avName) {  //give dom item new avName name
        av.post.addUser('Froze kid = ' + avName);
        var gdir =  'g' + av.fzr.gNum;
        var type = 'g';
        var domid = 'dom_' + gdir;
        var container = '#' + av.dnd.fzOrgan.id;
        var mapItems = Object.keys(av.dnd.containerMap[container]);

        $(container).append(`<div class="item ${type}" id="${domid}"> <img src='images/Avida-ED-ancestor-icon.png' class='AvidianIcon'> ${avName} </div>`);
        // Add an entry to av.dnd.containerMap
        if (Object.keys(av.dnd.containerMap).indexOf(container) === -1) {
          av.dnd.containerMap[container] = {};
        }
        av.dnd.containerMap[container][domid] = {'name': avName , 'type': 'g'};

        av.fzr.file[gdir + '/entryname.txt'] = avName;
        av.fzr.dir[domid] = gdir;
        av.fzr.domid[gdir] = domid;
        //av.fzr.file[gdir + '/genome.seq'] = '0,heads_default,' + av.grd.kidGenome;
        av.fzr.file[gdir + '/genome.seq'] = av.grd.kidGenome;
        av.fzr.gNum++;
        av.fzr.saveUpdateState('no');
        console.log(av.fzr);
        if (av.dbg.flg.mouse) console.log('fzOrgan', av.dnd.fzOrgan);
        if (av.dbg.flg.mouse) console.log('Kid-->Snow: dir',gdir, '; fzr', av.fzr);
        //create a right mouse-click context menu for the item just created.
        av.dnd.contextMenu(av.dnd.fzOrgan, domid, 'av.mouse.freezeTheKid');
        av.fzr.saveUpdateState('no');
      }
    }
  };

  av.mouse.ParentMouse = function (evt, from) {
    'use strict';
    if (!from) from = 'unknown';
    if (av.dbg.flg.mouse) console.log(from, 'called av.mouse.ParentMouse', evt.target.id, evt);
    if ('gridCanvas' == evt.target.id) { // parent moved to another location on grid canvas
      av.mouse.UpGridPos = [evt.offsetX, evt.offsetY]; //not used for now
      //Move the ancestor on the canvas
      av.mouse.findSelected(evt, 'av.mouse.ParentMouse');
      // look to see if this is a valid grid cell
      if (av.grd.selectedCol >= 0 && av.grd.selectedCol < av.grd.cols && av.grd.selectedRow >= 0 && av.grd.selectedRow < av.grd.rows) {
        if (av.dbg.flg.mouse) console.log('parentMouse, selected,',av.grd.selectedCol, av.grd.selectedRow, av.grd.selectedNdx);
        av.parents.col[av.mouse.ParentNdx] = av.grd.selectedCol;
        av.parents.row[av.mouse.ParentNdx] = av.grd.selectedRow;
        av.parents.AvidaNdx[av.mouse.ParentNdx] = av.parents.col[av.mouse.ParentNdx] + av.grd.cols * av.parents.row[av.mouse.ParentNdx];
        av.post.addUser('Moved ancestor to col=' + av.grd.selectedCol + '; row=' + av.grd.selectedRow);
        if (av.dbg.flg.mouse) console.log('mvparent', av.mouse.ParentNdx, av.parents.col[av.mouse.ParentNdx], av.parents.row[av.mouse.ParentNdx]);
        if (av.dbg.flg.mouse) console.log('b auto', av.parents.autoNdx.length, av.parents.autoNdx, av.parents.name);
        if (av.dbg.flg.mouse) console.log('b hand', av.parents.handNdx.length, av.parents.handNdx);
        //change from auto placed to hand placed if needed
        if ('auto' == av.parents.howPlaced[av.mouse.ParentNdx]) {
          av.parents.howPlaced[av.mouse.ParentNdx] = 'hand';
          av.parents.makeHandAutoNdx();
          //av.parents.placeAncestors(parents);
        }
        if (av.dbg.flg.mouse) console.log('auto', av.parents.autoNdx.length, av.parents.autoNdx, av.parents.name);
        if (av.dbg.flg.mouse) console.log('hand', av.parents.handNdx.length, av.parents.handNdx);
      }
    }  // close on canvas
    //-------------------------------------------- av.dnd.trashCan
    else if ('trashCanImage' == evt.target.id) {
      if (av.dbg.flg.mouse) console.log('parent->trashCan', evt);
      if (av.dbg.flg.mouse) console.log('av.mouse.ParentNdx', av.mouse.ParentNdx, '; domid', av.parents.domid[av.mouse.ParentNdx]);
      if (av.dbg.flg.mouse) console.log('ancestorBox', av.dnd.ancestorBox);
      if (av.dbg.flg.mouse) console.log('av.parents.domid', av.parents.domid);
      // yemi: delete from av.dnd.containerMap as well as erase dom object
      var domid = av.parents.domid[av.mouse.ParentNdx];
      var container = '#' + av.dnd.ancestorBox.id;
      $(container).children('#' + domid).remove();
      delete av.dnd.containerMap[container][domid];
      av.post.addUser('Moved ancestor to trash');
      //remove from main list.
      av.parents.removeParent(av.mouse.ParentNdx);
    }
    //-------------------------------------------- organism view
    else if ('organIcon' == evt.target.id) {
      av.post.addUser('Moved ancestor to Organsim View');
      av.mouse.traceSelectedParent('av.mouse.ParentMouse');
    };
  };

  //Key movement on grid
  // if (av.dbg.flg.root) { console.log('Root: before av.mouse.arrowKeysOnGrid'); }
  av.mouse.arrowKeysOnGrid = function (event) {
    'use strict';
    var arrowkey = true;
    console.log('document.activeElement', document.activeElement, document.activeElement.tagName);
    if ('INPUT' != document.activeElement.tagName && 'TEXTAREA' != document.activeElement.tagName) {
      if (av.grd.flagSelected) {
        var moved = false;
        switch (event.which) {
          case 37: // left
            av.post.addUser('key: arrowLeft');
            if (0 < av.grd.selectedCol) {
              av.grd.selectedCol = av.grd.selectedCol - 1;
              moved = true;
            }
            break;
          case 38: // up
            av.post.addUser('key: arrowUp');
            if (0 < av.grd.selectedRow) {
              av.grd.selectedRow = av.grd.selectedRow - 1;
              moved = true;
            }
            break;
          case 39: // right
            av.post.addUser('key: arrowRight');
            if (av.grd.selectedCol < av.grd.cols - 1) {
              av.grd.selectedCol++;
              moved = true;
            }
            break;
          case 40: // down
            av.post.addUser('key: arrowDown');
            if (av.grd.selectedRow < av.grd.rows - 1) {
              av.grd.selectedRow = av.grd.selectedRow + 1;
              moved = true;
            }
            break;
          default:
            arrowkey = false;
            break;
        };
        if (arrowkey) {
          //event.preventDefault(); // prevent the default action (scroll / move caret)
          av.grd.selectedNdx = av.grd.selectedRow * av.grd.cols + av.grd.selectedCol;
          if (moved && 'prepping' != av.grd.runState) {  //look for decendents (kids)
            //find out if there is a kid in that cell
            //if which ancestor is not null then there is a 'kid' there.
            if (null != av.grd.msg.ancestor.data[av.grd.selectedNdx]) {
              av.grd.kidStatus = 'getgenome';
              av.post.addUser('ArrowKey was used to pick kid cellID=' + av.grd.selectedNdx);
              av.msg.doWebOrgDataByCell();
              if (av.dbg.flg.mouse) console.log('kid', av.grd.kidName, av.grd.kidGenome);
              document.getElementById('mnFzOrganism').disabled = false; //When an organism is selected, then it can be save via the menu
              document.getElementById('mnCnOrganismTrace').disabled = false
            }
          }
          av.grd.drawGridSetupFn('av.mouse.arrowKeysOnGrid');
        }  // end arrowkey
      }   // grid flag selected
    }    // focus is not in an input or textarea element
  };

  //No longer in use delete later
  /*
  av.mouse.getOriginalShapes = function () {
    'use strict';
    var lngth = av.mouse.notDndPopList.length;
    for (var ii = 0; ii < lngth; ii++) {
      //console.log('domElements', av.mouse.notDndPopList[ii])
      av.mouse.notDndPopShape[ii] = document.getElementById(av.mouse.notDndPopList[ii]).style.cursor;
      console.log('domElement/Shape', av.mouse.notDndPopList[ii], av.mouse.notDndPopShape[ii]);
    }
    var lngth = av.mouse.notDndIndList.length;
    for (var ii = 0; ii < lngth; ii++) {
      //console.log('domElements', av.mouse.notDndIndList[ii])
      av.mouse.notDndIndShape[ii] = document.getElementById(av.mouse.notDndIndList[ii]).style.cursor;
      console.log('domElement/Shape', av.mouse.notDndIndList[ii], av.mouse.notDndIndShape[ii]);
    }
  };

  av.mouse.notDndPopCursorShape = function (shape) {
    'use strict';
    var lngth = av.mouse.notDndPopList.length;
    if ('default' === shape) {
      for (var ii = 0; ii < lngth; ii++) {
        document.getElementById(av.mouse.notDndPopList[ii]).style.cursor = av.mouse.notDndPopShape[ii];
      }
    } else {
      for (var ii = 0; ii < lngth; ii++) {
        document.getElementById(av.mouse.notDndPopList[ii]).style.cursor = shape;
      }
    }
  };

   av.mouse.notDndIndCursorShape = function (shape) {
   'use strict';
   //console.log('in av.mouse.notDndIndCursorShape');
   var lngth = av.mouse.notDndIndList.length;
   if ('default' === shape) {
   for (var ii = 0; ii < lngth; ii++) {
   document.getElementById(av.mouse.notDndIndList[ii]).style.cursor = av.mouse.notDndIndShape[ii];
   }
   } else {
   for (var ii = 0; ii < lngth; ii++) {
   document.getElementById(av.mouse.notDndIndList[ii]).style.cursor = shape;
   }
   }
   };
   */




  /* mouse websites
   mouse clicks
   http://stackoverflow.com/questions/706655/bind-event-to-right-mouse-click
   http://stackoverflow.com/questions/7343117/cant-use-jquerys-click-event-handler-to-detect-right-click
   http://stackoverflow.com/questions/1206203/how-to-distinguish-between-left-and-right-mouse-click-with-jquery
   http://www.w3schools.com/jsref/dom_obj_event.asp

   overide mouse shape

   http://stackoverflow.com/questions/10750582/global-override-of-mouse-cursor-with-javascript
   https://developer.mozilla.org/en-US/docs/Web/API/Element/setCapture
   http://www.w3schools.com/cssref/tryit.asp?filename=trycss_cursor
   http://www.w3schools.com/cssref/playit.asp?filename=playcss_cursor&preval=row-resize
   http://www.w3schools.com/cssref/tryit.asp?filename=trycss_cursor

  set capture??
   https://developer.mozilla.org/en-US/docs/Web/API/Element/setCapture
   http://stackoverflow.com/questions/820026/capture-mouse-in-firefox
   http://stackoverflow.com/questions/820026/capture-mouse-in-firefox
   http://stackoverflow.com/questions/7481022/mouse-capture-in-non-ie-browser

   dragging
   https://jsfiddle.net/d2wyv8fo/
   http://stackoverflow.com/questions/8528428/cleanest-drag-and-drop-code-in-javascript-canvas

   cursors
   http://www.echoecho.com/csscursors.htm
   http://www.useragentman.com/blog/2011/12/21/cross-browser-css-cursor-images-in-depth/
   http://stackoverflow.com/questions/10866471/javascript-how-to-change-mouse-cursor-to-an-image
   http://www.htmlgoodies.com/beyond/css/create-custom-cursors-with-javascript-and-css3.html#fbid=zWT2yc03gfP
   http://stackoverflow.com/questions/192900/wait-cursor-over-entire-html-page

   making cur files
   http://stackoverflow.com/questions/426372/convert-a-gif-into-a-cur-file
   https://convertio.co/png-cur/
   http://customize.org/cursor/help/How_To_Create_Cursors
   http://www.ehow.com/video_12213843_create-cursor-gimp.html
   */

