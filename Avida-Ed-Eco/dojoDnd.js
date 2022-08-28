var av = av || {};  //incase av already exists
var dojo = dojo || {};

// global definitions based dom that involve DND
// OBSOLETE: all of dnd functions were replaced in dragulaDnd.js

//------------------------------------------------------------------------------------------ av.msg.TestDishSetupPrep --
av.dnd.TestDishSetupPrep = function(fzSection, target, type) {
  //console.log('fzrObject=', av.dnd[fzSection].getSelectedNodes()[0]);
  //need to find selected item. looking for 'dojoDndItem dojoDndItemAnchor' might help
  //console.log('fzOrgan selected keys', Object.keys(av.dnd.fzOrgan.selection)[0]);
  //Object.keys(av.dnd.fzOrgan.selection)[0] and av.dnd.fzOrgan.getSelectedNodes()[0].id return the same thing

  if (undefined != av.dnd[fzSection].getSelectedNodes()[0]) {
    //This section partially puts the test-dish in the active area
    av.msg.setupType = 'test';  //Do not reload files from the active config freezer section
                                      //Do not put data from files in the setup section. 
                                      //
    //there is always a node here, so it must always be cleared when adding a new one.
    av.dnd.activeConfig.selectAll().deleteSelectedNodes();  //http://stackoverflow.com/questions/11909540/how-to-remove-delete-an-item-from-a-dojo-drag-and-drop-source
    av.dnd.activeConfig.sync();   //should be done after insertion or deletion
                                      
    var nodeMvDomid = av.dnd[fzSection].getSelectedNodes()[0].id;
    console.log('fzSection=', fzSection, '; nodeMvDomid=', nodeMvDomid);
    var added = false;
    av.dnd.move.via = 'menu';
    av.dnd.move.source = av.dnd[fzSection];
    av.dnd.move.target = av.dnd[target];
    av.dnd.move.type = type;
    av.dnd.move.sourceDomId = nodeMvDomid;
    av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
    av.dnd.move.nodeName = av.fzr.file[av.dnd.move.dir + '/entryname.txt'];
    av.dnd[target].insertNodes(false, [{data: av.dnd.move.nodeName, type: [type]}]);
    av.dnd[target].sync();
    
    var domIDs = Object.keys(av.dnd[target].map);
    av.dnd.move.targetDomId = domIDs[domIDs.length - 1];
    console.log('move', av.dnd.move);
    added = av.dnd.lndActiveConfig(av.dnd.move, 'av.dnd.TestDishSetupPrep');
    console.log('after added av.dnd.lndActiveConfig, added=', added);
    
    console.log('av.dom.environConfigEdit=',av.dom.environConfigEdit);
    if (av.fzr.file[av.dnd.move.dir+'/'+ 'environment.cfg'] ) {
      av.dom.environConfigEdit.value = av.fzr.file[av.dnd.move.dir+'/'+'environment.cfg'];
    };

  }
  else {
    alert('You must select a test-dish first');
  };
};
//-------------------------------------------------------------------------------------- end av.dnd.testDishSetupPrep --

//------------------------------------------------------------------------------------------------ av.dnd.runTestDish --
av.dnd.runTestDish = function(fzSection, target, type) {
  //console.log('fzrObject=', av.dnd[fzSection].getSelectedNodes()[0]);
  //need to find selected item. looking for 'dojoDndItem dojoDndItemAnchor' might help
  //console.log('fzOrgan selected keys', Object.keys(av.dnd.fzOrgan.selection)[0]);
  //Object.keys(av.dnd.fzOrgan.selection)[0] and av.dnd.fzOrgan.getSelectedNodes()[0].id return the same thing

  if (undefined != av.dnd[fzSection].getSelectedNodes()[0]) {
    //This section partially puts the multi-dish in the active area
    var nodeMvDomid = av.dnd[fzSection].getSelectedNodes()[0].id;
    console.log('fzSection=', fzSection, '; nodeMvDomid=', nodeMvDomid);
    var added = false;
    av.dnd.move.via = 'menu';
    av.dnd.move.source = av.dnd[fzSection];
    av.dnd.move.target = av.dnd[target];
    av.dnd.move.type = type;
    av.dnd.move.sourceDomId = nodeMvDomid;
    av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
    av.dnd.move.nodeName = av.fzr.file[av.dnd.move.dir + '/entryname.txt'];
    av.dnd[target].insertNodes(false, [{data: av.dnd.move.nodeName, type: [type]}]);
    av.dnd[target].sync();
    var domIDs = Object.keys(av.dnd[target].map);
    av.dnd.move.targetDomId = domIDs[domIDs.length - 1];
    console.log('move', av.dnd.move);
    //added = av.dnd.lndActiveConfig(av.dnd.move);

    var filename = av.dnd.move.dir +'/ancestors.txt';
    console.log('filename = ', filename, '=======================================================');
    if (av.fzr.file[filename]) {
      console.log('file ', filename, 'exists');
      av.fio.autoAncestorLoad(av.fzr.file[filename]);
    }
    var filename = av.dnd.move.dir +'/ancestors_manual.txt';
    console.log('filename = ', filename, '=======================================================');
    if (av.fzr.file[filename]) {
      console.log('file ', filename, 'exists');
      av.fio.handAncestorLoad(av.fzr.file[filename]);
    }
    //Now actually load resreq direcdtly from the freezer.
    av.msg.makeTestDirMsg(av.dnd.move.dir);
    av.msg.setupType = 'test';   //Do not reload files from the active config freezer section
  }
  else {
    alert('You must select a multi dish first');
  }
};

//-------------------------------------------------------------------------------------------- end av.dnd.runTestDish --


//----------------------------------------------------------------------------------------------- av.dnd.runTestDish --
av.dnd.runTestDish2 = function(fzSection, target, type) {
  //console.log('fzrObject=', av.dnd[fzSection].getSelectedNodes()[0]);
  //need to find selected item. looking for 'dojoDndItem dojoDndItemAnchor' might help
  //console.log('fzOrgan selected keys', Object.keys(av.dnd.fzOrgan.selection)[0]);
  //Object.keys(av.dnd.fzOrgan.selection)[0] and av.dnd.fzOrgan.getSelectedNodes()[0].id return the same thing

  if (undefined != av.dnd[fzSection].getSelectedNodes()[0]) {
    //This section partially puts the test-dish in the active area
    av.msg.setupType = 'test';   //Do not reload files from the active config freezer section
                                      //Do not put data from files in the setup section. 
    var nodeMvDomid = av.dnd[fzSection].getSelectedNodes()[0].id;
    console.log('fzSection=', fzSection, '; nodeMvDomid=', nodeMvDomid);
    var added = false;
    av.dnd.move.via = 'menu';
    av.dnd.move.source = av.dnd[fzSection];
    av.dnd.move.target = av.dnd[target];
    av.dnd.move.type = type;
    av.dnd.move.sourceDomId = nodeMvDomid;
    av.dnd.move.dir = av.fzr.dir[av.dnd.move.sourceDomId];
    av.dnd.move.nodeName = av.fzr.file[av.dnd.move.dir + '/entryname.txt'];
    av.dnd[target].insertNodes(false, [{data: av.dnd.move.nodeName, type: [type]}]);
    av.dnd[target].sync();
    var domIDs = Object.keys(av.dnd[target].map);
    av.dnd.move.targetDomId = domIDs[domIDs.length - 1];
    console.log('move', av.dnd.move);
    added = av.dnd.lndActiveConfig(av.dnd.move, 'av.dnd.runTestDish2');
    console.log('after added av.dnd.lndActiveConfig, added=', added);
    
    //Now actually load and run the test direcdtly from the freezer.
    av.msg.importTestDishExpr(av.dnd.move.dir); 

    console.log('av.dom.environConfigEdit=',av.dom.environConfigEdit);
    //av.dom.environConfigEdit.value = "some text";
    if (av.fzr.file[av.dnd.move.dir+'/'+ 'environment.cfg'] ) {
      av.dom.environConfigEdit.value = av.fzr.file[av.dnd.move.dir+'/'+'environment.cfg'];
    };

  }
  else {
    alert('You must select a test-dish first');
  };
};


