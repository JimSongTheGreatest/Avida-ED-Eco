  var av = av || {};  //incase av already exists
  var dijit = dijit || {}; 

  // if (av.dbg.flg.root) { console.log('Root: before av.mouse.downOrganCanvasFn'); }
  av.mouse.downOrganCanvasFn = function(evt) {
    console.log('in av.mouse.downOrganCanvasFn');
    document.body.style.cursor = 'copy';
    av.mouse.DnOrganPos = [evt.offsetX, evt.offsetY];
    av.mouse.Dn = true;
    av.mouse.Picked = '';
    var distance, jj, hh;
    var ith = -10;
    var isRightMB;
    //http://stackoverflow.com/questions/6926963/understanding-the-window-event-property-and-its-usage
    evt = evt || window.event;  //for IE since IE does not return an event
    // also there is no e.target property in IE.
    // instead IE uses window.event.srcElement
    //var target = e.target || e.srcElement;  //for IE since IE does not have a target.  //not using target here
    //is a right click instead of a left click?
    if ("which" in evt)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRightMB = evt.which == 3;
    else if ("button" in e)  // IE, Opera
      isRightMB = evt.button == 2;

    //if (av.traceObj) console.log('av.traceObj', av.traceObj);
    if (av.traceObj && [] !== av.traceObj) {
      //console.log('av.traceObj', av.traceObj);
      av.mouse.Picked = 'not offspring';
      if (av.ind.didDivide) {  //offpsring exists
        distance = Math.sqrt(Math.pow(evt.offsetX - av.ind.cx[1], 2) + Math.pow(evt.offsetY - av.ind.cy[1], 2));
        if (25 > distance) {
          for (var dir in av.fzr.domid) {
            //if ('g' == dir.substring(0, 1)) document.getElementById(av.fzr.domid[dir][-1]).style.cursor = 'copy';
          }
          // av.mouse.sonCursorShape();
          av.mouse.Picked = "offspring";
          if (av.debug.ind) console.log('av.ind.dna', av.ind.dna);
        }
      }
      if ('offspring' != av.mouse.Picked) {
        av.post.addUser('Click on Offspring');
        if (av.debug.ind) {
        }
        var lngth = av.traceObj[av.ind.cycle].memSpace.length;
        for (var gg = 0; gg < lngth; gg++) { //gg is generation
          var iiLngth = av.ind.dna[gg].length;
          for (var ii = 0; ii < iiLngth; ii++) {  //ii is the isntruction number
            distance = Math.sqrt(Math.pow(evt.offsetX - av.ind.smCenX[gg][ii], 2) + Math.pow(evt.offsetY - av.ind.smCenY[gg][ii], 2));
            if (av.ind.smallR >= distance) {
              //console.log('found, gg, ii', gg, ii, '; xy',av.ind.smCenX[gg][ii],av.ind.smCenY[gg][ii] );
              ith = ii;
              hh = gg;
              av.mouse.Picked = 'instruction';
              break;
            }
          }
        }
      }
      var instructionNum = ith + 1;
      var flagIndx = hh*50 + instructionNum;
      if ('instruction' == av.mouse.Picked) {
        if (isRightMB) {  //right click on instruction. allow replacement letter.
          //console.log('right click');
          evt.preventDefault();  //supposed to prevent default right click menu - does not work
          return false;         //supposed to prevent default right click menu - does not work
        }
        else {//hh is generation, ith is the instruction
          var labX = av.ind.cx[hh] + (av.ind.bigR[hh] + 2.1 * av.ind.smallR) * Math.cos(ith * 2 * Math.PI / av.ind.size[hh] + av.ind.rotate[hh]);
          var labY = av.ind.cy[hh] + (av.ind.bigR[hh] + 2.1 * av.ind.smallR) * Math.sin(ith * 2 * Math.PI / av.ind.size[hh] + av.ind.rotate[hh]);
          // need to get to this console log to dispay instruction number. 
          if (av.dbg.flg.mouse) console.log('ith, gn', ith, hh, '; rotate', av.ind.rotate[hh], '; xy', labX, labY);
          av.ind.ctx.beginPath();
          av.ind.ctx.arc(labX, labY, 1.1 * av.ind.smallR, 0, 2 * Math.PI);
          av.ind.ctx.fillStyle = av.color.names['White'];  //use if av.ind.dna is a string
          av.ind.ctx.fill();   //required to render fill
          //draw number;
          //console.log('instructionNum=', instructionNum, '; hh=', hh, '; flagIndx=', flagIndx);
          //console.log('labeled=', av.ind.labeled);
          if (av.ind.labeled[flagIndx]) {
            av.ind.labeled[flagIndx] = false;
            //av.ind.ctx.fillStyle = av.color.names['White'];
          }
          else {
            av.ind.labeled[flagIndx] = true;
            av.ind.ctx.fillStyle = av.color.names['Black'];
            av.ind.ctx.font = av.ind.fontsize + "px Arial";
            var txtW = av.ind.ctx.measureText(instructionNum).width;  //use if av.ind.dna is a string
            //txtW = av.ind.ctx.measureText(av.ind.dna[gg][ith]).width;     //use if av.ind.dna is an array
            av.ind.ctx.fillText(instructionNum, labX - txtW / 2, labY + av.ind.smallR / 2);  //use if av.ind.dna is a string
          }
        }
      }
    };
  };

  // if (av.dbg.flg.root) { console.log('Root: before av.mouse.downGridCanvasFn'); }
  av.mouse.downGridCanvasFn = function (evt, from) {
    console.log(from, 'called av.mouse.downGridCanvasFn');
    document.body.style.cursor = 'copy';
    av.mouse.DnGridPos = [evt.offsetX, evt.offsetY];
    av.mouse.Dn = true;
    // Select if it is in the grid
    av.mouse.findSelected(evt, 'av.mouse.downGridCanvasFn');
    //check to see if in the grid part of the canvas
    if (av.dbg.flg.mouse) { console.log('in av.mouse.downGridCanvasFn: av.mousedown', av.grd.selectedNdx); }
    //if (av.dbg.flg.mouse) console.log('grid Canvas; selectedNdx', av.grd.selectedNdx,'________________________________');
    //if (av.dbg.flg.mouse) console.log('grid Canvas; av.grd.msg.ancestor[av.grd.selectedNdx]', av.grd.msg.ancestor.data[av.grd.selectedNdx]);
    if (av.grd.selectedCol >= 0 && av.grd.selectedCol < av.grd.cols && av.grd.selectedRow >= 0 && av.grd.selectedRow < av.grd.rows) {
      av.grd.flagSelected = true;
      if (av.dbg.flg.mouse) console.log('ongrid', av.grd.selectedNdx);
      av.post.addUser('Click on grid cell with index: ' + av.grd.selectedNdx + '');
      av.grd.drawGridSetupFn('av.mouse.downGridCanvasFn in grid');

      //In the grid and selected. Now look to see contents of cell are dragable.
      av.mouse.ParentNdx = -1; //index into parents array if parent selected else -1;
      if ('prepping' == av.grd.runState) {  //run has not started so look to see if cell contains ancestor
        av.mouse.ParentNdx = av.mouse.findParentNdx('av.mouse.downGridCanvasFn');
        if (av.dbg.flg.mouse) { console.log('parent', av.mouse.ParentNdx); }
        if (-1 < av.mouse.ParentNdx) { //selected a parent, check for dragging
          //av.mouse.selectedDadMouseStyle();
          av.mouse.Picked = 'parent';
        }
      }
      else {  //look for decendents (kids)
        if (av.dbg.flg.mouse) console.log('kidSelected; selectedNdx', av.grd.selectedNdx, '________________________________');
        if (av.dbg.flg.mouse) console.log('kidSelected; av.grd.msg.ancestor[av.grd.selectedNdx]', av.grd.msg.ancestor.data[av.grd.selectedNdx]);
        //find out if there is a kid in that cell
        //if ancestor not null then there is a 'kid' there.
        //if (null != av.grd.msg.ancestor.data[av.grd.selectedNdx]) {
        if (av.grd.msg.ancestor) {
          //console.log('SelectedNdx', av.grd.selectedNdx, '; ancestor', av.grd.msg.ancestor.data[av.grd.selectedNdx]);
          if ('-' == av.grd.msg.ancestor.data[av.grd.selectedNdx] || '-' == av.grd.msg.ancestor.data[av.grd.selectedNdx]) {
            document.getElementById('mnCnOrganismTrace').disabled=true;
            document.getElementById('mnFzOrganism').disabled=true;            
          }
          else {
            if (av.dbg.flg.mouse) console.log('kid found');
            av.grd.kidStatus = 'getgenome';
            av.msg.doWebOrgDataByCell();
            av.grd.kidName = 'temporary';
            av.grd.kidGenome = '0,heads_default,wzcagcccccccccaaaaaaaaaaaaaaaaaaaaccccccczvfcaxgab';  //ancestor
            // mouse down on organism
            av.mouse.Picked = 'kid';
            if (av.dbg.flg.mouse) console.log('kid', av.grd.kidName, av.grd.kidGenome);
            document.getElementById('mnFzOrganism').disabled=false;
            document.getElementById('mnCnOrganismTrace').disabled=false;
          }
        }
        else {
          document.getElementById('mnCnOrganismTrace').disabled=true;
          document.getElementById('mnFzOrganism').disabled=true;
        }
      }
    }
    else {
      av.grd.flagSelected = false;
      av.grd.selectedNdx = -1;
      document.getElementById('mnCnOrganismTrace').disabled=true;
      document.getElementById('mnFzOrganism').disabled=true;
    }
    av.grd.drawGridSetupFn('av.mouse.downGridCanvasFn outside grid?');
    // if something was picked up, grid was selected (will be used in dragulaDnd.js)
    // also time to change cursor shape
    if (av.mouse.Picked != "" && av.mouse.Picked != undefined) {
      document.body.style.cursor = 'copy';
      av.dnd.gridSelected = av.mouse.Picked;
      console.log('av.dnd.gridSelected =', av.dnd.gridSelected, 
               'document.body.style.cursor =', document.body.style.cursor);    
    }
    else {
      av.dnd.gridSelected = '';
    };
    console.log('end av.mouse.downGridCanvasFn: av.mouse.Picked =', av.mouse.Picked, '; av.dnd.gridSelected =', av.dnd.gridSelected);
  };

