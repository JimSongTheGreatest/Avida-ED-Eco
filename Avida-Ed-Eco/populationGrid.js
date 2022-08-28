  var av = av || {};  //because av already exists
  var dijit = dijit || {};

  // if (av.dbg.flg.root) { console.log('Root: start of populationGrid'); }
  // if (av.dbg.flg.root) { console.log('Root: before av.grd.backgroundSquares'); }
  av.grd.backgroundSquares = function () {
    'use strict';
    var boxColor = '#111';
    for (var ii = 0; ii < av.grd.cols; ii++) {
      var xx = av.grd.marginX + av.grd.xOffset + ii * av.grd.cellWd;
      for (var jj = 0; jj < av.grd.rows; jj++) {
        var yy = av.grd.marginY + av.grd.yOffset + jj * av.grd.cellHt;
        av.grd.cntx.fillStyle = 'rgb(40, 40, 40)';
        av.grd.cntx.fillRect(xx, yy, av.grd.cellWd - 1, av.grd.cellHt - 1);
      };
    };
  };

  /*
  s  scale set based on ancestor organsim as of 2016 summer
   */

  av.grd.setColorMapOnly = function(from) {
    av.grd.cmap = av.color.Gnuplot2cmap;  //for fitness, offspring cost and energy aquisition rate
    var mapColor = 'greyMap';
    //console.log(from, 'called av.grd.setColorMapOnly: colorMode = ', document.getElementById("colorMode").value, ' ======================================');
    switch (document.getElementById("colorMode").value) {
      case 'rnot':
        mapColor = av.sgr.sugarColors[0];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'rnan':
        mapColor = av.sgr.sugarColors[1];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'rand':
        mapColor = av.sgr.sugarColors[2];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'rorn':
        mapColor = av.sgr.sugarColors[3];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'roro':
        mapColor = av.sgr.sugarColors[4];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'rant':
        mapColor = av.sgr.sugarColors[5];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'rnor':
        mapColor = av.sgr.sugarColors[6];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'rxor':
        mapColor = av.sgr.sugarColors[7];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'requ':
        mapColor = av.sgr.sugarColors[8];
        av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
        break;
      case 'Ancestor Organism':
        av.grd.fill = av.grd.msg.ancestor.data;
        av.grd.fillRescale = '';
        break;
    };
    //console.log('colorMdoe=',document.getElementById("colorMode").value, '; colorM=', mapColor, '; length = ', av.grd.cmap.length);
  };

  //Sets scale and puts the user selected data type in the grid array. Rob wants the scale to be different at the beginning of a run 
  av.grd.setMapData = function (from) {
    'use strict';
    var tskDom='';
    var taskNum=0;
    var tskName='';
    var taskStr='';
    //console.log(from, 'called av.grd.setMapData: av.grd.msg.fitness=',av.grd.msg.fitness);
    if (undefined != av.grd.msg.fitness) {
      if (av.grd.mxFitHist < av.grd.msg.fitness.maxVal) { av.grd.mxFitHist = av.grd.msg.fitness.maxVal; }
      //console.log('av.grd.msg', av.grd.msg);
      //console.log('av.grd.mxFit=', av.grd.mxFit, '; av.grd.msg.fitness.maxVal=', av.grd.msg.fitness.maxVal, '; low limit=',
      //  (1 - av.grd.rescaleTolerance) * av.grd.mxFit, '; lo2 limit = ', (1 - 2*av.grd.rescaleTolerance) * av.grd.mxFit );
      
      if (av.grd.mxFit < av.grd.msg.fitness.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxFit > av.grd.msg.fitness.maxVal) ) {
        av.grd.mxFit = av.grd.mxFit + ((1 + av.grd.rescaleTolerance) * av.grd.msg.fitness.maxVal - av.grd.mxFit) / av.grd.rescaleTimeConstant;
        av.grd.reScaleFit = 'rescaling';
        console.log('rescaling: av.grd.msg.fitness.maxVal=', av.grd.msg.fitness.maxVal);
      }
      else av.grd.reScaleFit = '';

      if (av.grd.mxCost < av.grd.msg.gestation.maxVal || (1 - av.grd.rescaleTolerance) * av.grd.mxCost > av.grd.msg.gestation.maxVal) {
        av.grd.mxCost = av.grd.mxCost + ((1 + av.grd.rescaleTolerance) * av.grd.msg.gestation.maxVal - av.grd.mxCost) / av.grd.rescaleTimeConstant;
        //if (1000 < av.grd.mxCost) av.grd.mxCost = 1000;
        av.grd.reScaleGest = 'rescaling';
      }
      else av.grd.reScaleGest = '';

      if (av.grd.mxRate < av.grd.msg.metabolism.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRate > av.grd.msg.metabolism.maxVal)) {
        av.grd.mxRate = av.grd.mxRate + ((1 + av.grd.rescaleTolerance) * av.grd.msg.metabolism.maxVal - av.grd.mxRate) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';

      if (av.grd.mxRnot < av.grd.msg.rnot.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRnot > av.grd.msg.rnot.maxVal)) {
        av.grd.mxRnot = av.grd.mxRnot + ((1 + av.grd.rescaleTolerance) * av.grd.msg.rnot.maxVal - av.grd.mxRnot) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';

      if (av.grd.mxRnan < av.grd.msg.rnan.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRnan > av.grd.msg.rnan.maxVal)) {
        av.grd.mxRnan = av.grd.mxRnan + ((1 + av.grd.rescaleTolerance) * av.grd.msg.rnan.maxVal - av.grd.mxRnan) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';
      if (av.grd.mxRand < av.grd.msg.rand.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRand > av.grd.msg.rand.maxVal)) {
        av.grd.mxRand = av.grd.mxRand + ((1 + av.grd.rescaleTolerance) * av.grd.msg.rand.maxVal - av.grd.mxRand) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';

      if (av.grd.mxRorn < av.grd.msg.rorn.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRorn > av.grd.msg.rorn.maxVal)) {
        av.grd.mxRorn = av.grd.mxRorn + ((1 + av.grd.rescaleTolerance) * av.grd.msg.rorn.maxVal - av.grd.mxRorn) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';

      if (av.grd.mxRoro < av.grd.msg.roro.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRoro > av.grd.msg.roro.maxVal)) {
        av.grd.mxRoro = av.grd.mxRoro + ((1 + av.grd.rescaleTolerance) * av.grd.msg.roro.maxVal - av.grd.mxRoro) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';

      if (av.grd.mxRant < av.grd.msg.rant.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRant > av.grd.msg.rant.maxVal)) {
        av.grd.mxRant = av.grd.mxRant + ((1 + av.grd.rescaleTolerance) * av.grd.msg.rant.maxVal - av.grd.mxRant) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';

      if (av.grd.mxRnor < av.grd.msg.rnor.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRnor > av.grd.msg.rnor.maxVal)) {
        av.grd.mxRnor = av.grd.mxRnor + ((1 + av.grd.rescaleTolerance) * av.grd.msg.rnor.maxVal - av.grd.mxRnor) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';

      if (av.grd.mxRxor < av.grd.msg.rxor.maxVal || ( av.grd.updateNum >av.grd.rescaleUpdateStart && (1 - av.grd.rescaleTolerance) * av.grd.mxRxor > av.grd.msg.rxor.maxVal)) {
        av.grd.mxRxor = av.grd.mxRxor + ((1 + av.grd.rescaleTolerance) * av.grd.msg.rxor.maxVal - av.grd.mxRxor) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';

      if (av.grd.mxRequ < av.grd.msg.requ.maxVal || ( av.grd.updateNum >1000 && (1 - av.grd.rescaleTolerance) * av.grd.mxRequ > av.grd.msg.requ.maxVal)) {
        av.grd.mxRequ = av.grd.mxRequ + ((1 + av.grd.rescaleTolerance) * av.grd.msg.requ.maxVal - av.grd.mxRequ) / av.grd.rescaleTimeConstant;
        av.grd.reScaleRate = 'rescaling';
      }
      else av.grd.reScaleRate = '';  

      //need to make an infinity grid so we know where to put the infinity color and value for the grid
      if (av.grd.selectedNdx) {
        for (var ii=0; ii < av.sgr.numTasks; ii++) {
          tskDom = av.sgr.logicTitleNames[ii];
          tskName = av.sgr.logicNames[ii];

          //taskNum = parseFloat(av.grd.msg['r'+tskName].data[av.grd.selectedNdx]);
          taskNum = av.grd.msg['r'+tskName].data[av.grd.selectedNdx];
          if (av.utl.isNumber(parseFloat(taskNum)) ) {
            //console.log('cell'+tskDom + '=', taskNum);
            taskStr = av.utl.toMetric(taskNum, 0);
            document.getElementById('cell'+tskDom).innerHTML = taskStr;
          };
          //taskNum = parseFloat(av.grd.msg['r'+tskName].maxVal);
          taskNum = av.grd.msg['r'+tskName].maxVal;
          if (av.utl.isNumber(parseFloat(taskNum)) ) {
            //console.log('max'+tskDom + ' =', taskNum);
            taskStr = av.utl.toMetric(taskNum, 0);
            document.getElementById('mx'+tskDom).innerHTML = taskStr;
            document.getElementById('mx'+tskDom).style.backgroundColor
          };
        };
      };

      //av.grd.cmap = av.color.Gnuplot2cmap;  //for fitness, offspring cost and energy aquisition rate
      var mapColor = 'greyMap';
      switch (document.getElementById("colorMode").value) {
        case 'Fitness':
          av.grd.fill = av.grd.msg.fitness.data;
          av.grd.fillmax = av.grd.mxFit;
          av.grd.fillmin = av.grd.msg.fitness.minVal;
          av.grd.fillRescale = av.grd.reScaleFit;
          av.grd.cmap = av.color.Gnuplot2cmap;  //for fitness, offspring cost and energy aquisition rate
          break;
        case 'Offspring Cost':
          av.grd.fill = av.grd.msg.gestation.data;
          av.grd.fillmax = av.grd.mxCost;
          av.grd.fillmin = av.grd.msg.gestation.minVal;
          av.grd.fillRescale = av.grd.reScaleGest;
          av.grd.cmap = av.color.Gnuplot2cmap;  //for fitness, offspring cost and energy aquisition rate
          break;
        case 'Energy Acq. Rate':
          av.grd.fill = av.grd.msg.metabolism.data;
          av.grd.fillmax = av.grd.mxRate;
          av.grd.fillmin = av.grd.msg.metabolism.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          av.grd.cmap = av.color.Gnuplot2cmap;  //for fitness, offspring cost and energy aquisition rate
          break;
        case 'rnot':
          av.grd.fill = av.grd.msg.rnot.data;
          av.grd.fillmax = av.grd.mxRnot;
          av.grd.fillmin = av.grd.msg.rnot.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[0];
          av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
          break;
        case 'rnan':
          av.grd.fill = av.grd.msg.rnan.data;
          av.grd.fillmax = av.grd.mxRnan;
          av.grd.fillmin = av.grd.msg.rnan.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[1];
          av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
          break;
        case 'rand':
          av.grd.fill = av.grd.msg.rand.data;
          av.grd.fillmax = av.grd.mxRand;
          av.grd.fillmin = av.grd.msg.rand.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[2];
          av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
          break;
        case 'rorn':
          av.grd.fill = av.grd.msg.rorn.data;
          av.grd.fillmax = av.grd.mxRorn;
          av.grd.fillmin = av.grd.msg.rorn.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[3];
          av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
          break;
        case 'roro':
          av.grd.fill = av.grd.msg.roro.data;
          av.grd.fillmax = av.grd.mxRoro;
          av.grd.fillmin = av.grd.msg.roro.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[4];
          av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
          break;
        case 'rant':
          av.grd.fill = av.grd.msg.rant.data;
          av.grd.fillmax = av.grd.mxRant;
          av.grd.fillmin = av.grd.msg.rant.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[5].slice(0,av.sgr.darkEnd);
          av.grd.cmap = av.color[mapColor];
          break;
        case 'rnor':
          av.grd.fill = av.grd.msg.rnor.data;
          av.grd.fillmax = av.grd.mxRnor;
          av.grd.fillmin = av.grd.msg.rnor.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[6];
          av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
          break;
        case 'rxor':
          av.grd.fill = av.grd.msg.rxor.data;
          av.grd.fillmax = av.grd.mxRxor;
          av.grd.fillmin = av.grd.msg.rxor.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[7];
          av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
          break;
        case 'requ':
          av.grd.fill = av.grd.msg.requ.data;
          av.grd.fillmax = av.grd.mxRequ;
          av.grd.fillmin = av.grd.msg.requ.minVal;
          av.grd.fillRescale = av.grd.reScaleRate;
          mapColor = av.sgr.sugarColors[8];
          av.grd.cmap = av.color[mapColor].slice(0,av.sgr.darkEnd);
          break;
        case 'Ancestor Organism':
          av.grd.fill = av.grd.msg.ancestor.data;
          av.grd.fillRescale = '';
          break;
      };
      //console.log('colorMdoe=',document.getElementById("colorMode").value, '; colorM=', mapColor);
      //console.log('av.grd.msg.anc.data', av.grd.msg.ancestor.data);
      //console.log('av.grd.msg.fit.data', av.grd.msg.fitness.data);
      //console.log('av.grd.msg.gen.data', av.grd.msg.gestation.data);
      //console.log('av.grd.msg.met.data', av.grd.msg.metabolism.data);
    }
    //console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    //console.log('fitmax',av.grd.msg.fitness.maxVal,'; Gest',av.grd.msg.gestation.maxVal,'; rate',av.grd.msg.metabolism.maxVal,'; fillmax',av.grd.fillmax);
  };

  av.grd.drawParent = function () {
    'use strict';
    //console.log('av.parents.col.length, marginX, xOffset', av.parents.col.length, av.grd.marginX, av.grd.xOffset);
    if (undefined != av.parents.col) {
      var lngth = av.parents.col.length;
      for (var ii = 0; ii < lngth; ii++) {
        if (!av.parents.injected[ii]) {
          var xx = av.grd.marginX + av.grd.xOffset + av.parents.col[ii] * av.grd.cellWd;
          var yy = av.grd.marginY + av.grd.yOffset + av.parents.row[ii] * av.grd.cellHt;
          if ("Ancestor Organism" == document.getElementById("colorMode").value) {
            av.grd.cntx.fillStyle = av.parents.color[ii];
          }
          else {
            av.grd.cntx.fillStyle = av.color.defaultParentColor;
          }
          av.grd.cntx.fillRect(xx, yy, av.grd.cellWd - 1, av.grd.cellHt - 1);
          //console.log('x, y, wd, Ht', xx, yy, av.grd.cellWd, av.grd.cellHt);
        }
      }
    }
  };

  //only one line changes between the two loops. Thought it would be faster to do the if outside the loop rather than
  //inside the loop. Need to time things to see if it makes a difference
  av.grd.drawKids = function () {  //Draw the children of parents
    'use strict';
    var cc, ii, rr, xx, yy, lngth, ndx;
    //console.log('mode', document.getElementById("colorMode").value, '; fill', av.grd.fill);
    lngth = av.grd.fill.length;
    //console.log('av.grd.fill.length=',av.grd.fill.length);
    if (0 < av.grd.fill.length){
      //console.log('in av.grd.drawKids: data type =', document.getElementById("colorMode").value);
      //console.log('av.grd.fill=',av.grd.fill);
      if ("Ancestor Organism" == document.getElementById("colorMode").value) {
        for (ii = 0; ii < lngth; ii++) {
          cc = ii % av.grd.cols;
          rr = Math.floor(ii / av.grd.cols);       //floor was trunc
          xx = av.grd.marginX + av.grd.xOffset + cc * av.grd.cellWd;
          yy = av.grd.marginY + av.grd.yOffset + rr * av.grd.cellHt;
          if (null === av.grd.fill[ii]) {
            av.grd.cntx.fillStyle = '#000';  //no avidian is in this cell
          }
          else {
            ndx = av.parents.name.indexOf(av.grd.fill[ii]);
            if ('-' === av.grd.fill[ii]) {av.grd.cntx.fillStyle = 'black';}
            else
              av.grd.cntx.fillStyle = av.parents.color[ndx];
            //av.grd.cntx.fillStyle = av.parents.color[av.grd.fill[ii]]
            //console.log('ndx=', ndx, '; name', av.parents.name[av.grd.fill[ii]], '; color', av.parents.color[ndx]);
          }
          av.grd.cntx.fillRect(xx, yy, av.grd.cellWd - 1, av.grd.cellHt - 1);
        }
      }
      else {
        for (ii = 0; ii <  lngth; ii++) {
          cc = ii % av.grd.cols;
          rr = Math.floor(ii / av.grd.cols);     //was trunc
          xx = av.grd.marginX + av.grd.xOffset + cc * av.grd.cellWd;
          yy = av.grd.marginY + av.grd.yOffset + rr * av.grd.cellHt;
          if (null === av.grd.fill[ii]) {
            //console.log('ii', ii, '; msg.ancestor.data[ii]',av.grd.msg.ancestor.data[ii]);
            if ('-' === av.grd.msg.ancestor.data[ii]) av.grd.cntx.fillStyle = '#000';  //not there = black
            else {
              //data error
              av.grd.cntx.fillStyle = '#0B0';    //Green
              console.log('fill[', ii, '] = ', av.grd.fill[ii], 'ancestor != -;   ======================================');
            } 
          }
          else if (0 >= av.grd.fill[ii] && 'Ancestor Organism' == document.getElementById("colorMode").value) {
            console.log('fill[', ii, '] = ', av.grd.fill[ii], 'default kid color, this should not happen');
            av.grd.cntx.fillStyle = av.color.defaultKidColor;
          }
          else if (0 > av.grd.fill[ii]) {
            //console.log('fill[', ii, '] = ', av.grd.fill[ii], '; type=',document.getElementById("colorMode").value,'; fill out of bounds');
            console.log('Error: fill out of bounds =====================================================================');
            av.grd.fill[ii] = 0;
            av.grd.cntx.fillStyle = av.utl.get_color0(av.grd.cmap, av.grd.fill[ii], 0, av.grd.fillmax);

          }
          else if ('Offspring Cost' == document.getElementById("colorMode").value && 999 < av.grd.fill[ii]) {
            //console.log('fill[', ii, '] = ', av.grd.fill[ii], 'Offspring Cost out of bounds');
            console.log('Error: Offspring Cost out of bounds');
            av.grd.cntx.fillStyle = '#090';   //green
          }
          else if (0 >= av.grd.msg.gestation.data[ii]) {
            av.grd.cntx.fillStyle = '#888';    //non-viable grey. added recently
            //console.log('non-viable found');
          }
          else {  //av.utl.get_color0 = function(cmap, dx, d1, d2)
            av.grd.cntx.fillStyle = av.utl.get_color0(av.grd.cmap, av.grd.fill[ii], 0, av.grd.fillmax);
            //console.log('fillStyle', av.utl.get_color0(av.grd.cmap, av.grd.fill[ii], 0, av.grd.fillmax));
          }
          av.grd.cntx.fillRect(xx, yy, av.grd.cellWd - 1, av.grd.cellHt - 1);
        }
      }
    }
    else
    {
      console.log('need to draw a black square the size of the grid');
    }
    //console.log('end of drawKids update', av.grd.msg.update);
  };

  av.grd.findLogicOutline = function () {
    'use strict';
    var ii, lngth;
    av.ptd.allOff = true;
    //console.log('not',av.grd.msg.not.data);
    //Should there be error checking here. It indicates a problem with the envioronment.cfg file. 
    if (null == av.grd.msg.not) {
      console.log('av.grd.msg.not = null: ERROR: Check Environment File; ================================');
      console.log('av.grd.msg=', av.grd.msg);
    } else {
      lngth = av.grd.msg.not.data.length;
      for (ii = 0; ii < lngth; ii++) {
        av.grd.logicOutline[ii] = 1;
      }
      if ('on' == document.getElementById('notButton').value) {
        lngth = av.grd.msg.not.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.not.data[ii];}
        av.ptd.allOff = false;
      }
      if ('on' == document.getElementById('nanButton').value) {
        lngth = av.grd.msg.nand.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.nand.data[ii];}
        av.ptd.allOff = false;
      }
      if ('on' == document.getElementById('andButton').value) {
        lngth = av.grd.msg.and.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.and.data[ii];}
        av.ptd.allOff = false;
      }
      if ('on' == document.getElementById('ornButton').value) {
        lngth = av.grd.msg.orn.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.orn.data[ii];}
        av.ptd.allOff = false;
        if (av.debug.bool) console.log('orn', av.grd.msg.orn.data);
      }
      if ('on' == document.getElementById('oroButton').value) {
        lngth = av.grd.msg.or.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.or.data[ii];}
        av.ptd.allOff = false;
        if (av.debug.bool) console.log('or', av.grd.msg.or.data);
      }
      if ('on' == document.getElementById('antButton').value) {
        lngth = av.grd.msg.andn.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.andn.data[ii];}
        av.ptd.allOff = false;
      }
      if ('on' == document.getElementById('norButton').value) {
        lngth = av.grd.msg.nor.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.nor.data[ii];}
        av.ptd.allOff = false;
      }
      if ('on' == document.getElementById('xorButton').value) {
        lngth = av.grd.msg.xor.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.xor.data[ii];}
        av.ptd.allOff = false;
      }
      if ('on' == document.getElementById('equButton').value) {
        lngth = av.grd.msg.equ.data.length;
        for (ii = 0; ii < lngth; ii++) {av.grd.logicOutline[ii] = av.grd.logicOutline[ii] * av.grd.msg.equ.data[ii];}
        av.ptd.allOff = false;
      }
      if (av.ptd.allOff) {for (ii = 0; ii < av.grd.msg.not.data.length; ii++) { av.grd.logicOutline[ii] = 0; } }

      //console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
      if (av.debug.bool) console.log('setLogic', av.grd.logicOutline);
      //console.log('update',av.grd.updateNum, '; setLogic', av.grd.logicOutline);
      //if (0 <= av.grd.msg.update) av.ptd.updateLogicFn();  //this is done in update population stats right now
    }
  };

  av.grd.cellConflict = function (NewCols, NewRows) {
    'use strict';
    var places = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
    var flg = false;
    var tryCol, tryRow, avNdx;
    if (undefined != av.parents.handNdx) {
      var handNum = av.parents.handNdx.length;
      for (var ii = 0; ii < handNum; ii++) {
        flg = av.grd.cellFilled(av.parents.AvidaNdx[av.parents.handNdx[ii]], ii);
        if (flg) {
          var lngth = places.length;
          for (var jj = 0; jj < lngth; jj++) {
            tryCol = av.parents.col[av.parents.handNdx[ii]] + places[jj][0];
            tryRow = av.parents.row[av.parents.handNdx[ii]] + places[jj][1];
            avNdx = tryCol + tryRow * NewCols;
            if (0 <= tryCol && tryCol < NewCols && 0 <= tryRow && tryRow < NewRows) {
              flg = av.grd.cellFilled(avNdx, ii);
            }
            else {
              flg = true;
            };
            if (!flg) {
              av.parents.col[av.parents.handNdx[ii]] = tryCol;
              av.parents.row[av.parents.handNdx[ii]] = tryRow;
              av.parents.AvidaNdx[av.parents.handNdx[ii]] = avNdx;
              break;
            }
          }
        }
      }
    }
  };

  //Draw the outline of all cells that contain avidians when a resource is the main information in the grid
  av.grd.DrawAvidaOutline = function () {
    'use strict';
    //console.log('DrawLogic', av.grd.logicOutline);
    var cc, rr, xx, yy;
    var inner = 0.08 * av.grd.cellWd; //how far inside the square to put the outline.
    var thick = 0.1 * av.grd.cellWd; //thickness of line to draw
    if (1 > inner) inner = 1;
    if (1 > thick) thick = 1;
    //console.log('=========================')
    //console.log('logic', av.grd.logicOutline);
    var lngth = av.grd.logicOutline.length;
    for (var ii = 0; ii < lngth; ii++) {
      if ('-' != av.grd.msg.ancestor.data[ii]) {
        cc = ii % av.grd.cols;
        rr = Math.floor(ii / av.grd.cols);  //was trunc
        xx = av.grd.marginX + av.grd.xOffset + cc * av.grd.cellWd + inner;
        yy = av.grd.marginY + av.grd.yOffset + rr * av.grd.cellHt + inner;
        av.grd.drawCellOutline(thick, av.grd.cellOutline, xx, yy, av.grd.cellWd-2*inner, av.grd.cellHt-2*inner);
      }
    }  
  };

  av.grd.DrawLogicSelected = function () {
    'use strict';
    //console.log('DrawLogic', av.grd.logicOutline);
    var cc, rr, xx, yy;
    var inner = 0.08 * av.grd.cellWd; //how far inside the square to put the outline.
    var thick = 0.1 * av.grd.cellWd; //thickness of line to draw
    if (1 > inner) inner = 1;
    if (1 > thick) thick = 1;
    //console.log('=========================')
    //console.log('logic', av.grd.logicOutline);
    var lngth = av.grd.logicOutline.length;
    for (var ii = 0; ii < lngth; ii++) {
      if (0 != av.grd.logicOutline[ii]) {
        cc = ii % av.grd.cols;
        rr = Math.floor(ii / av.grd.cols);  //was trunc
        xx = av.grd.marginX + av.grd.xOffset + cc * av.grd.cellWd + inner;
        yy = av.grd.marginY + av.grd.yOffset + rr * av.grd.cellHt + inner;
        av.grd.drawCellOutline(thick, av.grd.LogicColor, xx, yy, av.grd.cellWd-2*inner, av.grd.cellHt-2*inner);
      }
    }
  };

  //Draw Cell outline or including special case for Selected
  av.grd.drawSelected = function () {
    'use strict';
    var thick = 0.1 * av.grd.cellWd;
    if (1 > thick) thick = 1;
    av.grd.selectX = av.grd.marginX + av.grd.xOffset + av.grd.selectedCol * av.grd.cellWd;
    av.grd.selectY = av.grd.marginY + av.grd.yOffset + av.grd.selectedRow * av.grd.cellHt;
    av.grd.drawCellOutline(thick, av.grd.SelectedColor, av.grd.selectX, av.grd.selectY, av.grd.cellWd, av.grd.cellHt);
  };

  av.grd.drawCellOutline = function (lineThickness, color, xx, yy, wide, tall) {
    'use strict';
    av.grd.cntx.beginPath();
    av.grd.cntx.rect(xx, yy, wide, tall);
    av.grd.cntx.strokeStyle = color;
    av.grd.cntx.lineWidth = lineThickness;
    av.grd.cntx.stroke();
  };

  av.grd.findGridSize = function (){
    'use strict';
    // When zoom = 1x, set canvas size based on space available and cell size
    // based on rows and columns requested by the user. Zoom acts as a factor
    // to multiply the size of each cell. 
    // Zoom does not work at this time and will be rebuilt later. 

    // no longer doing offsets inside the canvas - Need to get rid of offsets 

    // First find sizes based on zoom
    if (av.debug.uil) { console.log('ui: av.grd.zoom=', av.grd.zoom); }
    av.grd.boxX = av.grd.zoom * av.grd.spaceX;
    av.grd.boxY = av.grd.zoom * av.grd.spaceY;
    //get rows and cols based on user input 
    av.grd.cols = av.grd.setupCols
    av.grd.rows = av.grd.setupRows;
    //max size of box based on width or height based on ratio of cols:rows and width:height
    if (av.grd.spaceX / av.grd.spaceY > av.grd.cols / av.grd.rows) {
      //set based  on height as that is the limiting factor.
      av.grd.sizeY = av.grd.boxY;
      av.grd.sizeX = av.grd.sizeY * av.grd.cols / av.grd.rows;
      av.grd.spaceCellWd = av.grd.spaceY / av.grd.rows;
      av.grd.spaceCells = av.grd.rows;  //rows exactly fit the space when zoom = 1x
    }
    else {
      //set based on width as that is the limiting direction
      av.grd.sizeX = av.grd.boxX;
      av.grd.sizeY = av.grd.sizeX * av.grd.rows / av.grd.cols;
      av.grd.spaceCellWd = av.grd.spaceX / av.grd.cols;
      av.grd.spaceCells = av.grd.cols;  //cols exactly fit the space when zoom = 1x
    }

    //Determine new size of grid
    if (av.debug.uil) { console.log('ui: w:', av.dom.gridCanvas.width, av.dom.gridCanvas.height, '= In: av.dom.gridCanvas.width ht--'); }

    // av.dom.gridCanvas.width = av.grd.sizeX;
    // av.dom.gridCanvas.height = av.grd.sizeY;
    av.grd.sizeX = av.dom.gridCanvas.width; /* yemi: changed the order, did not break anything */
    av.grd.sizeY = av.dom.gridCanvas.height;
    av.grd.xOffset = 0;
    av.grd.yOffset = 0;
  };

  av.grd.drawGridUpdate = function () {
    'use strict';
    //get cell size based on grid size and number of columns and rows
    av.grd.cellWd = ((av.grd.sizeX - av.grd.marginX) / av.grd.cols);
    av.grd.cellHt = ((av.grd.sizeY - av.grd.marginY) / av.grd.rows);
    if (av.debug.uil) { console.log('ui: ', av.grd.marginX, '= av.grd.marginX; ', av.grd.marginY, '= av.grd.marginY'); }
    //Find a reasonable maximum zoom for this grid and screen space for av.grd.zoomSlide
    /*
    var zMaxCells = Math.floor(av.grd.spaceCells / 25);  // at least 10 cells   was trunc
    var zMaxWide = Math.floor(10 / av.grd.spaceCellWd);  // at least 10 pixels  was trunc
    var zMax = ((zMaxCells > zMaxWide) ? zMaxCells : zMaxWide); //Max of two methods
    zMax = ((zMax > 2) ? zMax : 2); //max zoom power of at least 2x
  */
    //console.log('zoomSlide set zMax, expression', zMax, 2 * (zMax - 1) + 1);
  //  av.grd.zoomSlide.set("maximum", zMax);
    //av.grd.zoomSlide.set("discreteValues", 2 * (zMax - 1) + 3);
  //  av.grd.zoomSlide.set("maximum", 5);

    //console.log('min', av.grd.zoomSlide.get('minimum'), '; max', av.grd.zoomSlide.get('maximum'), '; discrete',
    //    av.grd.zoomSlide.get('discreteValues'), '; value', av.grd.zoomSlide.get('value'));
    //console.log("Cells, pixels, zMax, zoom", zMaxCells, zMaxWide, zMax, av.grd.zoom);

    av.grd.drawGridBackground();
    //Check to see if run has started
    if ('prepping' === av.grd.runState) {
      av.grd.drawParent();
    }
    else {
      av.grd.drawKids();
      av.grd.drawParent();
    }
    // Draw Selected as one of the last items to draw
    if (av.grd.flagSelected) { av.grd.drawSelected(); };
    if ('prepping' !== av.grd.runState) {
      if ('r' == document.getElementById('colorMode').value.substring(0,1) && av.ui.showOutlineFlag ) av.grd.DrawAvidaOutline();
      av.grd.DrawLogicSelected();
    }
  };

  av.grd.drawGridBackground = function () {
    'use strict';
    // Use the identity matrix while clearing the canvas    http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
    av.grd.cntx.setTransform(1, 0, 0, 1, 0, 0);
    av.grd.cntx.clearRect(0, 0, av.dom.gridCanvas.width, av.dom.gridCanvas.height); //to clear canvas see http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
    //draw grey rectangle as back ground
    av.grd.cntx.fillStyle = av.color.names['ltGrey'];
    av.grd.cntx.fillRect(0, 0, av.dom.gridCanvas.width, av.dom.gridCanvas.height);

    //av.grd.cntx.translate(av.grd.xOffset, av.grd.yOffset);
    av.grd.cntx.fillStyle = av.color.names['Black'];
    av.grd.cntx.fillRect(av.grd.xOffset, av.grd.yOffset, av.grd.sizeX, av.grd.sizeY);

    av.grd.backgroundSquares();
  };

  //--------------- Draw legend --------------------------------------
  //Draws the color and name of each Ancestor (parent) organism
  //to lay out the legend we need the width of the longest name and we
  //allow for the width of the color box to see how many columns fit across
  //the width of av.dom.scaleCanvas. We will need to increase the size of the
  //legend box by the height of a line for each additional line.

  av.grd.drawLegend = function() {
    av.dom.sclCnvsHldr.style.display = 'none';
    av.dom.dadLegendHldr.style.display = 'grid';  //'grid';
    var numtxt = '00';
    var tmpNum = 0;
    var dadDivTxt = '';
    var maxWidth = 0;
    var leftPad = 10;
    var row = 0;
    var col = 0;
    var numCol = 1;
    var numRow = 1;
    var rowHt = 20;
    
    var dadListLngth = av.parents.name.length;
    for (var ii=0; ii < dadListLngth; ii++) {
      if (10 > ii) numtxt = '0' + ii;
      else numtxt = ii.toString();
      dadDivTxt += "<div id='dadInfo"+numtxt+"' class='dadInfoCls'> \n";
      dadDivTxt += "  <div id='dadColor"+numtxt+"' class='dadColorCls' style='background:"+av.parents.color[ii]+"'></div> \n";
      dadDivTxt += "  <p id='dadName"+numtxt+"' class='dadNameCls'>"+av.parents.name[ii]+"</p> \n";
      dadDivTxt += "</div> \n";
    };
    av.dom.dadLegendHldr.innerHTML = dadDivTxt;
//    console.log('dadDivTxt=', dadDivTxt);
    for (var ii=0; ii < dadListLngth; ii++) {
      if (10 > ii) numtxt = '0' + ii;
      else numtxt = ii.toString();
      tmpNum = $('#dadColor'+numtxt).outerWidth(true) + $('#dadName'+numtxt).outerWidth(true) + 20;
      document.getElementById('dadInfo'+numtxt).style.width = tmpNum + 'px';
      if (tmpNum > maxWidth) maxWidth = tmpNum;
    };
    console.log('dadInfoCls_wd', maxWidth);
    $('.dadInfoCls').css('width',maxWidth+'px');
    av.dom.dadLegendHldr_wd = $('#dadLegendHldr').outerWidth(true);
    numCol = Math.floor((av.dom.dadLegendHldr_wd-leftPad)/maxWidth);
    if (Math.floor(dadListLngth/numCol) == dadListLngth/numCol) {
      numRow = Math.floor(dadListLngth / numCol);
    } else {
      numRow = Math.floor(dadListLngth / numCol) + 1;
    };
    av.dom.dadLegendHldr.style.gridTemplateColumns = 'repeat('+numCol+', '+maxWidth+'px'+')';
    av.dom.dadLegendHldr.style.gridTemplateRows = 'repeat('+numRow+', 18px)';

  };
  
  av.grd.drawLegend_canvas = function () {
    'use strict';
    var legendPad = 10;   //padding on left so it is not right at edge of canvas
    var colorWide = 13;   //width and heigth of color square
    var RowHt = 10;       //height of each row of text
    var textOffset = 15;  //vertical offset to get to the bottom of the text
    var leftPad = 10;     //padding to allow space between each column of text in the legend
    var legendCols = 1;   //max number of columns based on width of canvas and longest name
    var txtWide = 0;      //width of text for an ancestor (parent) name
    var maxWide = 0;      //maximum width needed for any of the ancestor names in this set
   
    //console.log('in drawLedgend')
    av.grd.sCtx.font = "14px Arial";
    //find out how much space is needed
    var lngth = av.parents.name.length;
    for (var ii = 0; ii < lngth; ii++) {
      txtWide = av.grd.sCtx.measureText(av.parents.name[ii]).width;
      if (txtWide > maxWide) {
        maxWide = txtWide;
      };
    };
        
    legendCols = Math.floor((av.dom.scaleCanvas.width - leftPad) / (maxWide + colorWide + legendPad));  //was trunc
    if (Math.floor(av.parents.name.length / legendCols) == av.parents.name.length / legendCols) {          //was trunc
      var legendRows = Math.floor(av.parents.name.length / legendCols);
    }
    else {
      legendRows = Math.floor(av.parents.name.length / legendCols) + 1;    //was trunc
    }
    //set canvas height based on space needed
    console.log('scale canvas ht:', RowHt * legendRows);
    //av.dom.scaleCanvas.height = RowHt * legendRows;
    av.grd.sCtx.fillStyle = av.color.names["ltGrey"];
    av.grd.sCtx.fillRect(0, 0, av.dom.scaleCanvas.width, av.dom.scaleCanvas.height);
    var colWide = (av.dom.scaleCanvas.width - leftPad) / legendCols;
    var col = 0;
    var row = 0;
    lngth = av.parents.name.length;
    for (ii = 0; ii < lngth; ii++) {
      col = ii % legendCols;
      row = Math.floor(ii / legendCols);    //was trunc
      //xx = leftPad + col*(maxWide+colorWide+legendPad);
      var xx = leftPad + col * (colWide);
      var yy = 2 + row * RowHt;
      av.grd.sCtx.fillStyle = av.parents.color[ii];
      av.grd.sCtx.fillRect(xx, yy, colorWide, colorWide);
      var yy = textOffset + row * RowHt;
      av.grd.sCtx.font = "14px Arial";
      av.grd.sCtx.fillStyle = 'black';
      av.grd.sCtx.fillText(av.parents.name[ii], xx + colorWide + legendPad / 2, yy);
    };
  };

  av.grd.gradientScale = function (from) {
    'use strict';
    if (av.debug.uil) { console.log('ui: ', from, 'called av.grd.gradientScale. w:',av.dom.scaleCanvas.width, av.dom.scaleCanvas.height, '= scaleCanvas Wd Ht; start gradientScale '); }
    if (av.debug.uil) { console.log('ui: w:', $("#gridHolder").outerWidth(), $("#gridHolder").outerHeight(), '= av.dom.gridHolder jQuery.outerWd ht ~ ccs ~ offset; start gradientScale'); }
    av.dom.sclCnvsHldr.style.display = 'block';
    av.dom.dadLegendHldr.style.display = 'none';

    //finding the dimensions needed for the legend. 
    av.dom.scaleCanvas.height = 30;
    av.grd.sCtx.fillStyle = av.color.names["ltGrey"];
    av.grd.sCtx.fillRect(0, 0, av.dom.scaleCanvas.width, av.dom.scaleCanvas.height);
    var xStart = 15;
    var xEnd = av.dom.scaleCanvas.width - 2.5 * xStart;
    var gradWidth = xEnd - xStart;
    //Set up gradient size
    var grad = av.grd.sCtx.createLinearGradient(xStart + 2, 0, xEnd - 2, 0);
    var legendHt = 15;

    //av.grd.cmap = av.color.Gnuplot2cmap;
    //does not currently do anything because the only option is for Gnuplot2
    /*
    switch (av.grd.colorMap) {
      case "Viridis":
        av.grd.cmap = av.color.ViridisCmap;
        break;
      case 'Gnuplot2':
        av.grd.cmap = av.color.Gnuplot2cmap;
        break;
      case 'Cubehelix':
        av.grd.cmap = av.color.cubehelixCmap;
    };
    */
    var lngth = av.grd.cmap.length;
    //An html gradient can have as many colorstops as one wants. I did on for every point in the color map. 
    for (var ii = 0; ii < lngth; ii++) {
      grad.addColorStop(ii / (av.grd.cmap.length - 1), av.grd.cmap[ii]);
    }
    av.grd.sCtx.fillStyle = grad;
    av.grd.sCtx.fillRect(xStart, legendHt, gradWidth, av.dom.scaleCanvas.height - legendHt);
    //Draw Values if run started
    //console.log('GradientScale runState = ',av.grd.runState);
    if ('prepping' !== av.grd.runState) {
      //if (true) {  av.grd.fillmax = 805040;
      av.grd.sCtx.font = "14px Arial";
      av.grd.sCtx.fillStyle = "#000";
      var maxTxtWd = gradWidth / 5;
      var xx = 0;
      var marks = 4;
      var txt = "";

      for (var ii = 0; ii <= marks; ii++) {
        xx = ii * av.grd.fillmax / marks;
        txt = av.utl.toMetric( xx, 0);
        if (0.0004 > xx ) { txt = xx.formatNum(0); } //2 in this case is number of decimal places
        var txtW = av.grd.sCtx.measureText(txt).width;
        xx = xStart + ii * gradWidth / marks - txtW / 2;
        av.grd.sCtx.fillText(txt, xx, legendHt - 2, maxTxtWd);
      }
    }
    if (av.debug.uil) { console.log('ui: w:',av.dom.scaleCanvas.width, av.dom.scaleCanvas.height, '= scaleCanvas Wd Ht; end gradientScale '); }
    if (av.debug.uil) { console.log('ui: w:', $("#gridHolder").outerWidth(), $("#gridHolder").outerHeight(), '= av.dom.gridHolder jQuery.outerWd ht ~ ccs ~ offset; end gradientScale'); }
  };

  // if (av.dbg.flg.root) { console.log('Root: before av.grd.cellFilled'); }
  av.grd.cellFilled = function (AvNdx, ii) {
    var flag = false;
    //console.log('av.grd.cellFilled', AvNdx, av.parents.AvidaNdx)
    var lngth = av.parents.name.length;
    for (var jj = 0; jj < lngth; jj++) {
      if (av.parents.handNdx[ii] != jj) {
        if (AvNdx == av.parents.AvidaNdx[jj]) {
          flag = true;
          return flag;
          break;
        }
      }
    }
    return flag;
  };
  // if (av.dbg.flg.root) { console.log('Root: end of populationGrid'); }

  /*how to center grid
  http://stackoverflow.com/questions/5127937/how-to-center-canvas-in-html5
  */
