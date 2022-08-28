/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// if (av.dbg.flg.root) { console.log('Root: start of reSizePageParts'); }
var av = av || {};  //because av already exists

/* checks if the left side panel is closed or not; is used by both the dragbar and the left panel button. */
var IS_LEFT_COLLAPSED = false;

/* checks if the right side panel is closed or not; is used by both the dragbar and the right panel button. */
var IS_RIGHT_COLLAPSED = false;

/* function to automatically resize the Analysis page when button clicked; called in avidaED.js */
resizeAnalysisPage = function() {
  var leftNavBarWidth = $('.navColClass').css("width");
  var dragbarLeftWidth = $('#dragbarLeft').css("width");
  var newColumns;

  if (IS_LEFT_COLLAPSED) {
    newColumns = "0px " + dragbarWidth + " auto " + dragbarWidth + " auto";
  } else {
    newColumns = leftNavBarWidth + " " + dragbarLeftWidth + " auto";
  }
  $('.all2lft').css("grid-template-columns", newColumns);
  av.anl.AnaChartFn(); 
}

/* diane modified yemi's work: function to automatically resize the Analysis page when button clicked; called in avidaED.js */
av.ui.resizeShowTextDebugPage = function() {
  console.log('in av.ui.resizeShowTextDebugPage');
  var leftNavBarWidth = $('.navColClass').css("width");
  var dragbarLeftWidth = $('#dragbarLeft').css("width");
  var newColumns = leftNavBarWidth + " " + dragbarLeftWidth + " auto";
  $('.all2lft').css("grid-template-columns", newColumns);
};

/* function to automatically resize the Populations page when button clicked; called in avidaED.js */
resizePopulationPage = function() {
  var leftNavBarWidth = $('.navColClass').css("width");
  var dragbarWidth = $('.dragbar').css("width");
  // var rightSideWidth = $('#labInfoHolder').css("width");
  rightSideWidth = '440px';
  var newColumns;
  if (!IS_LEFT_COLLAPSED && !IS_RIGHT_COLLAPSED) {
    newColumns = leftNavBarWidth + " " + dragbarWidth + " auto " + dragbarWidth + " " + rightSideWidth;
  }
  else {
    if (IS_RIGHT_COLLAPSED) {
      newColumns = leftNavBarWidth + " " + dragbarWidth + " auto " + dragbarWidth + " 0px";
    }
    if (IS_LEFT_COLLAPSED) {
      newColumns = "0px " + dragbarWidth + " auto " + dragbarWidth + " " + rightSideWidth;
      if (IS_RIGHT_COLLAPSED) {
        newColumns = "0px " + dragbarWidth + " auto " + dragbarWidth + " 0px";
      }
    } 
  }
  $('.all3pop').css("grid-template-columns", newColumns);
  av.grd.drawGridSetupFn('resizePopulationPage'); 
}

/* function to automatically resize the Organisms page when button clicked; called in avidaED.js */
resizeOrganismPage = function() {
  var leftNavBarWidth = $('.navColClass').css("width");
  var dragbarWidth = $('.dragbar').css("width");
  // var rightSideWidth = $('#orgInfoHolder').css("width");
  rightSideWidth = '220px';
  var newColumns;
  if (!IS_LEFT_COLLAPSED && !IS_RIGHT_COLLAPSED) {
    newColumns = leftNavBarWidth + " " + dragbarWidth + " auto " + dragbarWidth + " " + rightSideWidth;
  }
  else {
    if (IS_RIGHT_COLLAPSED) {
      newColumns = leftNavBarWidth + " " + dragbarWidth + " auto " + dragbarWidth + " 0px";
    }
    if (IS_LEFT_COLLAPSED) {
      newColumns = "0px " + dragbarWidth + " auto " + dragbarWidth + " " + rightSideWidth;
      if (IS_RIGHT_COLLAPSED) {
        newColumns = "0px " + dragbarWidth + " auto " + dragbarWidth + " 0px";
      }
    } 
  }
  $('.all3org').css("grid-template-columns", newColumns);
}

/* functions for left dragbar */
function dragbarLeftResize() {
  var dragging = false;

  /* when there's a mousehover over dragbar, dragbar changes color */
  $('#dragbarLeft').on('mouseover touchstart', function(e) {
    $('#dragbarLeft').css('background-color', 'blue');
  });

  $('#dragbarLeft').on('mouseout touchend', function(e) {
    $('#dragbarLeft').css('background-color', 'gray');
  });

  $('#dragbarLeft').on('mousedown touchstart', function(e) {
    dragging = true;
    
    $(document).on('mousemove touchmove', function(e){
      av.grd.drawGridSetupFn('dragbarLeftResize 1'); // redraw the grid
      av.anl.AnaChartFn('dragbarLeftResize'); // redraw analysis grid
      
      // need to account for both touch and mouse event
      var x;
      if(e.type == 'touchmove'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        x = touch.pageX;
      } else if (e.type == 'mousemove') {
        x = e.pageX;
      }

      /* on mouse move, dragbar changes color */
      $('#dragbarLeft').css('background-color', 'blue');

      // calculate the widths of each of the grid columns
      var rightSideWidth = $('#rightInfoHolder').css("width");
      var rightSideWidthNum = parseInt($('#rightInfoHolder').css("width")); /* yemi: extract only the number */
      var widthAvailable = window.innerWidth - rightSideWidthNum - 6; /* yemi: hard-coded 400px (right panel) 6px (left dragbar + right dragbar), need to fix */
      var percentage = (x / widthAvailable);
      var widthOfNav = widthAvailable * percentage;

      // display freezer section
      $('#freezerSection').children().css("display", "block");

      /* if the width of the user's cursor is smaller than the minimum width of the navigation column, collapse */
      if (widthOfNav < parseInt($('#navColId').css("min-width"))) {
        widthOfNav = 0; /* yemi: if width too small, collapse it*/
        $('#freezerSection').children().css("display", "none");
        IS_LEFT_COLLAPSED = true;
      } 
      /* yemi: if thhe width of the user's cursor is larger than the maximum width of the navigation column, choose the maximum width */
      else if (widthOfNav > parseInt($('#navColId').css("max-width"))) {
        widthOfNav = parseInt($('#navColId').css("max-width"));
        IS_LEFT_COLLAPSED = false;
      }
      else {
        IS_LEFT_COLLAPSED = false;
      }

      /* when modifying the column sizes, need to modify all three layouts */
      var population_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
      var organism_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
      var analysis_colInfo = widthOfNav + "px 3px auto";
      $('.all2lft').css("grid-template-columns", analysis_colInfo); /* yemi: you need to resize again on the analysis page to resize it correctly */
      $('.all3pop').css("grid-template-columns", population_colInfo);
      $('.all3org').css("grid-template-columns", organism_colInfo);

      /* make the following divs take up the entire width of their containers */
      if (av.ui.page === "organismBlock") {
        $('#orgInfoHolder').css("width", "100%");
      }
      else if (av.ui.page === "populationBlock") {
        $('#labInfoHolder').css("width", "100%");
      }

      /* update organism canvas */
      av.ind.updateOrgTrace();
    });
  });

  $(document).on('mouseup touchend', function(e) {
    if (dragging) {
      av.grd.drawGridSetupFn('dragbarLeftResize 2'); // redraw the grid
      av.anl.AnaChartFn('dragbarLeftResize 2'); // redraw analysis grid

      // need to account for both touch and mouse event
      var x;
      if(e.type == 'touchmove'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        x = touch.pageX;
      } else if (e.type == 'mouseup') {
        x = e.clientX;
      }

      /* dragbar changes color back to original */
      $('#dragbarLeft').css('background-color', 'gray');

      // calculate the widths of each of the grid columns
      var rightSideWidth = $('#rightInfoHolder').css("width");
      var rightSideWidthNum = parseInt($('#rightInfoHolder').css("width")); /* extract only the number */
      var widthAvailable = window.innerWidth - rightSideWidthNum - 6; /* 6 is for the width of the two dragbars */
      var percentage = (x / widthAvailable);
      var widthOfNav = widthAvailable * percentage;

      // display freezer section
      $('#freezerSection').children().css("display", "block");

      /* if the width of the user's cursor is smaller than the minimum width of the navigation column, collapse */
      if (widthOfNav < parseInt($('.navColClass').css("min-width"))) {
        widthOfNav = 0; /* yemi: if width too small, collapse it */
        $('#freezerSection').children().css("display", "none");
        IS_LEFT_COLLAPSED = true;
        /* change the button's contents and look */
        $('#leftPanelButton').val('>> ');
        $('#leftPanelBUtton').css('background', '#ccc');
      } 
      /* if the width of the user's cursor is larger than the maximum width of the navigation column, choose the maximum width */
      else if (widthOfNav > parseInt($('.navColClass').css("max-width"))) {
        widthOfNav = parseInt($('#navColId').css("max-width"));
        IS_LEFT_COLLAPSED = false;
        /* change the button's contents and look */
        $('#leftPanelButton').val('<< ');
        $('#leftPanelBUtton').css('background', 'inherit');
      }
      else {
        IS_LEFT_COLLAPSED = false;
        /* change the button's contents and look */
        $('#leftPanelButton').val('<< ');
        $('#leftPanelBUtton').css('background', 'inherit');
      }

      /* when modifying the column sizes, need to modify all three layouts */
      var population_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
      var organism_colInfo = widthOfNav + "px 3px " + "auto 3px " + rightSideWidth;
      var analysis_colInfo = widthOfNav + "px 3px auto";
      $('.all2lft').css("grid-template-columns", analysis_colInfo); /* yemi: you need to resize again on the analysis page to resize it correctly */
      $('.all3pop').css("grid-template-columns", population_colInfo);
      $('.all3org').css("grid-template-columns", organism_colInfo);

      /* make the following divs take up the entire width of their containers */
      if (av.ui.page === "organismBlock") {
        $('#orgInfoHolder').css("width", "100%");
      }
      else if (av.ui.page === "populationBlock") {
        $('#labInfoHolder').css("width", "100%");
      }
      
      $(document).unbind('mousemove touchmove'); // yemi: need it to disasssociate mouse action from the page
      dragging = false;
    }
  });
};

/* functions for right dragbar */
function dragbarRightResize() {
  var dragging = false;

  /* when there's a mousehover over dragbar, dragbar changes color */
  $('#dragbarRight').on('mouseover touchstart', function(e) {
    $('#dragbarRight').css('background-color', 'blue');
  });

  $('#dragbarRight').on('mouseout touchend', function(e) {
    $('#dragbarRight').css('background-color', 'gray');
  });

  $('#dragbarRight').on('mousedown touchstart', function(e) {
    dragging = true;

    $(document).on('mousemove touchmove', function(e){
      av.grd.drawGridSetupFn('dragbarRightResize'); // redraw the grid
      av.grd.popChartFn(true, 'dragbarRightResize'); // redraw plotly graph

      // need to account for both touch and mouse event
      var x;
      if(e.type == 'touchmove'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        x = touch.pageX;
      } else if (e.type == 'mousemove') {
        x = e.pageX;
      }

      /* on mouse move, dragbar changes color */
      $('#dragbarRight').css('background-color', 'blue');

      var leftSideWidth;

      // if left is collapsed because user clicked on left close button
      if (IS_LEFT_COLLAPSED) {
        leftSideWidth = "0px";
      } else {
        leftSideWidth = $('#navColId').css("width");
      }

      // calculate the widths of each of the grid columns
      var widthAvailable = window.innerWidth - parseInt(leftSideWidth) - 6; /* yemi: hard-coded 400px (right panel) 6px (left dragbar + right dragbar), need to fix */
      var percentage = ((x - parseInt(leftSideWidth) - 6) / widthAvailable); /* yemi: prolly needs fixing */
      var widthOfCenter = widthAvailable * percentage;
      var widthOfRight = widthAvailable - widthOfCenter;

      /* if the width of the user's cursor is smaller than the minimum width of the navigation column, collapse */
      if (widthOfRight < parseInt($('.labInfoHoldCls').css("min-width"))) {
        widthOfRight = 0; /* if width too small, collapse it */
        widthOfCenter = widthAvailable;
      }
      /* if the width of the user's cursor is larger than the maximum width of the navigation column, choose the maximum width */
      else if (widthOfRight > parseInt($('.labInfoHoldCls').css("max-width"))) {
        widthOfRight = parseInt($('.labInfoHoldCls').css("max-width"));
        widthOfCenter = widthAvailable - widthOfRight;
      }
      
      /* when modifying the column sizes, need to modify all two layouts */
      var population_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
      var organism_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
      
      $('.all3pop').css("grid-template-columns", population_colInfo);
      $('.all3org').css("grid-template-columns", organism_colInfo);

      /* yemi: make the following divs take up the entire width of their containers */
      if (av.ui.page === "organismBlock") {
        $('#orgInfoHolder').css("width", "100%");
      }
      else if (av.ui.page === "populationBlock") {
        $('#labInfoHolder').css("width", "100%");
      }
      
      /* yemi: update organism canvas */
      av.ind.updateOrgTrace();
    });
  });

  $(document).on('mouseup touchend', function(e) {

    if (dragging) {
      av.grd.drawGridSetupFn('dragbarRightResize 2'); // yemi: redraw the grid
      av.grd.popChartFn(true, 'dragbarRightResize 2'); // yemi: redraw plotly graph

      // yemi: need to account for both touch and mouse event
      var x;
      if(e.type == 'touchmove'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        x = touch.pageX;
      } else if (e.type == 'mouseup') {
        x = e.clientX;
      }

      var leftSideWidth;

      // if left is collapsed because user clicked on left close button
      if (IS_LEFT_COLLAPSED) {
        leftSideWidth = "0px";
      } else {
        leftSideWidth = $('#navColId').css("width");
      }

      // calculate the widths of each of the grid columns
      var widthAvailable = window.innerWidth - parseInt(leftSideWidth) - 6; /* yemi: hard-coded 400px (right panel) 6px (left dragbar + right dragbar), need to fix */
      var percentage = ((x - parseInt(leftSideWidth) - 6) / widthAvailable); /* yemi: prolly needs fixing */
      var widthOfCenter = widthAvailable * percentage;
      var widthOfRight = widthAvailable - widthOfCenter;

      /* if the width of the user's cursor is smaller than the minimum width of the navigation column, collapse */
      if (widthOfRight < parseInt($('.labInfoHoldCls').css("min-width"))) {
        widthOfRight = 0; /* yemi: if width too small, collapse it */
        widthOfCenter = widthAvailable;
        IS_RIGHT_COLLAPSED = true;
        /* change the button's contents and look */
        $('#ritePanelButton').val('<< ');
        $('#ritePanelBUtton').css('background', '#ccc');
      }
      /* if thhe width of the user's cursor is larger than the maximum width of the navigation column, choose the maximum width */
      else if (widthOfRight > parseInt($('.labInfoHoldCls').css("max-width"))) {
        widthOfRight = $('.labInfoHolder').css("max-width");
        widthOfCenter = widthAvailable - widthOfRight;
        IS_RIGHT_COLLAPSED = false;
        /* change the button's contents and look */
        $('#ritePanelButton').val('>> ');
        $('#ritePanelBUtton').css('background', 'inherit');
      }
      else {
        IS_RIGHT_COLLAPSED = false;
        /* change the button's contents and look */
        $('#ritePanelButton').val('>> ');
        $('#ritePanelBUtton').css('background', 'inherit');
      }
      
      /* when modifying the column sizes, need to modify all two layouts */
      var population_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
      var organism_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
      $('.all3pop').css("grid-template-columns", population_colInfo);
      $('.all3org').css("grid-template-columns", organism_colInfo);

      /* make the following divs take up the entire width of their containers */
      if (av.ui.page === "organismBlock") {
        $('#orgInfoHolder').css("width", "100%");
      }
      else if (av.ui.page === "populationBlock") {
        $('#labInfoHolder').css("width", "100%");
      }

      $(document).unbind('mousemove touchmove');
      
      dragging = false;
    }
  });
};

//------------------------------------------------------------------------------------------- av.dom.initialDivSizing --
// Called in messaging.js in av.msg.readMsg()
// called when the avida webworker indicates that it is ready.
// the splash screen should also be turned off at this time. 
// stores initial size that are valid when the viewport stays the same
//
av.ui.initialDivSizing = function() {
  //  av.dom.window_ht_now = $(window).height();
  //  av.dom.window_wd_now = $(window).width();
  //  av.dom.document_ht_now = $(document).height();
  //  av.dom.document_wd_now = $(document).width();
  //  av.dom.freezerSection_wd_now = $("#freezerSection").width();
  //  av.dom.freezerSection_ht_now = $("#freezerSection").height();
  //  av.dom.navColId_wd_now = $("#navColId").width();
  //  av.dom.navColId_ht_now = $("#navColId").height();
  //  av.dom.popInfoVert_wd_now = $("#popInfoVert").width();
  //  av.dom.popInfoVert_ht_now = $("#popInfoVert").height();
  //  av.dom.popChrtHolder_wd_now = $("#popChrtHolder").width();
  //  av.dom.popChrtHolder_ht_now = $("#popChrtHolder").height();
  //  av.dom.sclCnvsHldr_wd_now = $('#sclCnvsHldr').width();
  //  av.dom.sclCnvsHldr_ht_now = $('#sclCnvsHldr').height();
  //  
  //  if (av.dbg.flg.dsz) { console.log('dsz: now: navColId wd,       ht =', av.dom.navColId_wd_now, ',', av.dom.navColId_ht_now); }
  //  if (av.dbg.flg.dsz) { console.log('dsz: now: freezerSection wd, ht =', av.dom.freezerSection_wd_now, ',', av.dom.freezerSection_ht_now); }
  //  if (av.dbg.flg.dsz) { console.log('dsz: now: popInfoVert wd,    ht =', av.dom.popInfoVert_wd_now, ',', av.dom.popInfoVert_ht_now); }
  //  if (av.dbg.flg.dsz) { console.log('dsz: now: popChrtHolder wd,  ht =', av.dom.popChrtHolder_wd_now, ',', av.dom.popChrtHolder_ht_now); }
  //  if (av.dbg.flg.dsz) { console.log('dsz: now: sclCnvsHldr_wd, ht =', av.dom.sclCnvsHldr_wd_now, ',', av.dom.sclCnvsHldr_ht_now); }
  //
  //  av.dom.headerMain_ht_ot_now = $('#headerMain').outerHeight(true);
  //  av.dom.navColId_ht_ot_now = $('#navColId').outerHeight(true);
  //  av.dom.navColId_ht_now = $('#navColId').height();
  //  av.dom.mainButtons_ht_ot_now = $('#mainButtons').outerHeight(true);
  //  av.dom.freezerSection_ht_ot_now = $('#freezerSection').outerHeight(true);
  //  av.dom.trashDiv_ht_ot_now = $('#trashDiv').outerHeight(true);
  //  av.dom.window_ht_now = $(window).height();
  //
  //  console.log('Ht: header=', av.dom.headerMain_ht_ot_now, '; navColID=', av.dom.navColId_ht_ot_now
  //              , '; sum=', (av.dom.headerMain_ht_ot_now+av.dom.navColId_ht_ot_now) );
  //  console.log('mainButtons=', av.dom.mainButtons_ht_ot_now, '; freezer=', av.dom.freezerSection_ht_ot_now
  //              , '; trash=', av.dom.trashDiv_ht_ot_now, '; navColID_now=', av.dom.navColId_ht_now
  //              , '; sum=',(av.dom.mainButtons_ht_ot_now+av.dom.freezerSection_ht_ot_now+av.dom.trashDiv_ht_ot_now) );
  //  
  // call other size related function when initializing 
  av.ui.freezerSizeHtFn(); 
  console.log('sizes=', av.dom.sizes('av.ui.initialDivSizing') );
  /* call the drag bar left function */
  dragbarLeftResize();
  /* call the drag bar right function */
  dragbarRightResize();
};

//--------------------------------------------------------------------------------------------- av.ui.freezerSizeHtFn --
// fix Freezer div size
// only called from within av.dom.storeInitialSize
// the notation 
// = function() {        is the same as 
// = () => {
av.ui.freezerSizeHtFn = () => {
  var dif = 0;
  console.log('window=', $(window).height(), '; docu=', $(document).height() );
  if ( $(window).height() < $(document).height() ) {
    console.log('fix Freezer Size jquery');

    dif = $(document).height - $(window).height();
    if ( dif < $("#freezerSection").height() ) {
      av.dom.gridCanvas.height = 10;
      av.dom.gridHolder.style.height = '10px';
      
      av.dom.freezerSection.style.overflow = 'scroll';
      av.dom.freezerSection.style.height = ($("#freezerSection").height() - dif) +'px';
      //av.grd.drawGridSetupFn is in avidaED.js
      av.grd.drawGridSetupFn('av.ui.freezerSizeHtFn');
    }
  };  
};

//---------------------------------------------------------------------------------------------------- av.anl.divSize --

//called from two places in avidaED.js
av.anl.divSize = function (from) {
  if (av.debug.alo) { console.log('alo: ', from, 'called av.anl.divSize'); }
  console.log('alo: ', from, 'called av.anl.divSize');
  //console.log(from,'anaChrtHolder Ht client scroll ', av.dom.anaChrtHolder.clientHeight, av.dom.anaChrtHolder.scrollHeight);
  //console.log(from,'anlDndChart Ht client scroll', av.dom.anlDndChart.clientHeight, av.dom.anlDndChart.scrollHeight);
  //console.log(from,'anlChrtSpace Ht client scroll', av.dom.anlChrtSpace.clientHeight, av.dom.anlChrtSpace.scrollHeight);

  if (av.debug.alo) { console.log('alo: av.dom.anaChrtHolder.clientWd, Ht=', av.dom.anaChrtHolder.clientWidth, av.dom.anaChrtHolder.clientHeight); }
  av.anl.ht = av.dom.anaChrtHolder.getBoundingClientRect().height - 1;
  av.anl.wd = av.dom.anaChrtHolder.getBoundingClientRect().width - 1;
  //av.dom.anaChrtHolder.style.height = av.anl.ht + 'px';
  av.anl.ht = av.dom.anaChrtHolder.clientHeight - 6;
  av.dom.anlChrtSpace.style.height = av.anl.ht + 'px';
  av.dom.anlChrtSpace.style.width = av.anl.wd + 'px';
  av.anl.layout.height = av.anl.ht;
  av.anl.layout.width = av.anl.wd;
  console.log(av.anl.ht, av.anl.wd);
};

//------------------------------------------------------------------------------------------show/hide rite side panel --
// if (av.dbg.flg.root) { console.log('Root: before av.ptd.lftPanelBtnFn'); }
// Used for a presentation to hide the left panel and make the right panel bigger.
// Rob wants a button like this that hides the left panel and makes the center panel bigger. 
// not in current use; I hope this can be done with fewer individual size adjustments

av.ptd.ritePanelBtnFn = function () {
  setTimeout(function() {}, 80);

  var leftSideWidth;

  // if left is collapsed, take this into account
  if (IS_LEFT_COLLAPSED) {
    leftSideWidth = "0px";
  } else {
    leftSideWidth = $('#navColId').css("width");
  }

  // if right is not collapsed
  if (!IS_RIGHT_COLLAPSED) {
    IS_RIGHT_COLLAPSED = true;

    // collapse right
    var widthOfRight = 0;

    /* change the button's contents and look */
    $('#ritePanelButton').val('<< ');
    $('#ritePanelBUtton').css('background', '#ccc');

    /* when modifying the column sizes, need to modify all two layouts */
    var population_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";
    var organism_colInfo = leftSideWidth + " 3px auto" + " 3px " + widthOfRight + "px";

    $('.all3pop').css("grid-template-columns", population_colInfo);
    $('.all3org').css("grid-template-columns", organism_colInfo);
    $('#orgInfoHolder').css("width", "0px");
    $('#popInfoVert').css("width", "0px");
  }
  // if right is not collapsed
  else if (IS_RIGHT_COLLAPSED) {
    IS_RIGHT_COLLAPSED = false;

    /* change the button's contents and look */
    $('#ritePanelButton').val('>> ');
    $('#ritePanelBUtton').css('background', 'inherit');

    /* when modifying the column sizes, need to modify all two layouts */
    var population_colInfo = leftSideWidth + " 3px auto" + " 3px " + "440px";
    var organism_colInfo = leftSideWidth + " 3px auto" + " 3px " + "220px";

    $('.all3pop').css("grid-template-columns", population_colInfo);
    $('.all3org').css("grid-template-columns", organism_colInfo);
    $('#orgInfoHolder').css("width", "220px");
    $('#popInfoVert').css("width", "440px");
    /* make the following divs take up the entire width of their containers */
  }

  av.grd.drawGridSetupFn('av.ptd.ritePanelBtnFn'); // redraw the grid
  av.grd.popChartFn(true, 'av.ptd.ritePanelBtnFn'); // redraw plotly graph
  av.ind.updateOrgTrace('av.ptd.ritePanelBtnFn'); // update organism canvas
};

//------------------------------------------------------------------------------------------show/hide left side panel --
av.ptd.lftPanelBtnFn = function () {
  setTimeout(function() {}, 80);  

  /* if left is not collapsed */
  if (!IS_LEFT_COLLAPSED) {
    IS_LEFT_COLLAPSED = true;

    // collapse left
    var widthOfNav = "0px";

    /* change the button's contents and look */
    $('#leftPanelButton').val('>> ');
    $('#leftPanelButton').css('background', '#ccc');

    if (IS_RIGHT_COLLAPSED) {
      /* when modifying the column sizes, need to modify all three layouts */
      var population_colInfo = widthOfNav + " 3px " + "auto 3px " + "0px";
      var organism_colInfo = widthOfNav + " 3px " + "auto 3px " + "0px";
      var analysis_colInfo = widthOfNav + " 3px auto";
    } else {
      /* when modifying the column sizes, need to modify all three layouts */
      var population_colInfo = widthOfNav + " 3px " + "auto 3px " + $('#popInfoVert').css("width");
      var organism_colInfo = widthOfNav + " 3px " + "auto 3px " + $('#orgInfoHolder').css("width");
      var analysis_colInfo = widthOfNav + " 3px auto";
    }
    
    $('.all2lft').css("grid-template-columns", analysis_colInfo); /* you need to resize again on the analysis page to resize it correctly */
    $('.all3pop').css("grid-template-columns", population_colInfo);
    $('.all3org').css("grid-template-columns", organism_colInfo);

    $('#freezerSection').children().css("display", "none"); // to fix the problem of fzConfig items being visible even with the left sidebar collapsed
  }
  // if left is collapsed
  else if (IS_LEFT_COLLAPSED) {

    IS_LEFT_COLLAPSED = false;

    // open up left sidebar
    var widthOfNav = "240px"; // default width --------- should be in globals for consistency ---------

    /* change the button's contents and look */
    $('#leftPanelButton').val('<< ');
    $('#leftPanelBUtton').css('background', 'inherit');
    
    var population_colInfo;
    var organism_colInfo;
    var analysis_colInfo;
    
    if (IS_RIGHT_COLLAPSED) {
      /* when modifying the column sizes, need to modify all three layouts */
      var population_colInfo = widthOfNav + " 3px " + "auto 3px " + "0px";
      var organism_colInfo = widthOfNav + " 3px " + "auto 3px " + "0px";
      var analysis_colInfo = widthOfNav + " 3px auto";
    } else {
      /* when modifying the column sizes, need to modify all three layouts */
      var population_colInfo = widthOfNav + " 3px " + "auto 3px " + $('#popInfoVert').css("width");
      var organism_colInfo = widthOfNav + " 3px " + "auto 3px " + $('#orgInfoHolder').css("width");
      var analysis_colInfo = widthOfNav + " 3px auto";
    }

    $('.all2lft').css("grid-template-columns", analysis_colInfo); /* yemi: you need to resize again on the analysis page to resize it correctly */
    $('.all3pop').css("grid-template-columns", population_colInfo);
    $('.all3org').css("grid-template-columns", organism_colInfo);

    $('#freezerSection').children().css("display", "block"); // re-display freezer section after being collapsed
  }

  av.grd.drawGridSetupFn('av.ptd.lftPanelBtnFn'); // redraw the grid
  av.anl.AnaChartFn('av.ptd.lftPanelBtnFn'); // redraw analysis grid
  av.ind.updateOrgTrace('av.ptd.lftPanelBtnFn'); // update organism canvas
};
//------------------------------------------------------------------------------------- end show/hide left side panel --



//--------------------------------------------------------------------------------------------------- detect overflow --
// https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing
// https://newbedev.com/javascript-how-to-detect-if-my-element-is-overflowing-css-code-example
// https://pretagteam.com/question/javascript-check-if-element-is-overflowing
// https://www.codegrepper.com/code-examples/javascript/javascript+check+if+element+is+overflowing


av.ui.isOverflownXorY = function(elName, orient) {
  //elName = name of a dom element; orient = orientation that is "Width" or "Height"
  var element = document.getElementById(elName);
  return element['scroll'+orient] > element['client'+orient];
};

//----------------------------------------------------------------------------------------------------------------------
//  Code below this is not in use. But might be usefull
//
//------------------------------------------------------------------------------------------------------ av.dom.sizes --
// https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
// not in use, could be useful. So I did not delete 

av.dom.sizes = () => {
  let contentWidth = [...document.body.children].reduce(
    (a, el) => Math.max(a, el.getBoundingClientRect().right), 0)
    - document.body.getBoundingClientRect().x;

  return {
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
    pageWidth: Math.min(document.body.scrollWidth, contentWidth),
    pageHeight: document.body.scrollHeight,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    pageX: document.body.getBoundingClientRect().x,
    pageY: document.body.getBoundingClientRect().y,
    screenX: -window.screenX,
    screenY: -window.screenY - (window.outerHeight - window.innerHeight)
  };
};

// av.dom.page = av.dom.sizes();  //only call for av.dom.sizes

//-------------------------------------------------------------------------------- finds elements wider than document --
// https://davidwalsh.name/detect-overflow-elements

av.ui.isAnElementTooWide = function() {
  document.querySelectorAll('*').forEach(el => {
    if (el.offsetWidth > document.documentElement.offsetWidth) {
        console.log('Found the worst element ever: ', el);
    }
  });
};

//-------------------------------------------------------- check-if-an-elements-content-is-overflowing all in a class --
//https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing

av.ui.isAnElementInClassOverlown = function(elName) {

  isOverflown = function(element) {
    // looks at both direction
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  };

  var els = document.getElementsByClassName(elName);
  for (var ii = 0; ii < els.length; ii++) {
    var el = els[ii];
    el.style.borderColor = (isOverflown(el) ? 'red' : 'green');
    console.log("Element #" + ii + " is " + (isOverflown(el) ? '' : 'not ') + "overflown.");
  }
};

//------------------------------------------------------------------- end check-if-an-elements-content-is-overflowing --

// https://twitter.com/beevorr/status/1379692518489591810
/*
var docWidth = document.documentElement.offsetWidth;
[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);
*/

//----------------------------------------------------------------------------------------- findOverflows in document --
// https://www.webtips.dev/webtips/javascript/find-overflowing-elements-with-javascript

const findOverflows = () => {
    const documentWidth = document.documentElement.offsetWidth;

    document.querySelectorAll('*').forEach(element => {
        const box = element.getBoundingClientRect();

        if (box.left < 0 || box.right > documentWidth) {
            console.log(element);
            element.style.border = '1px solid red';
        }
    });
};

// Execute findOverflows to find overflows on the page.
// findOverflows();

//------------------------------------------------------------------------------------------- window.addEventListener --
// triggers when viewport is resized, values are not used. so could be deleted
window.addEventListener('resize', function() {
	// viewport and full window dimensions will change
	console.log('in window.addEventListener in reSizePageParts.js, triggered when viewport (browers) is resized');
	av.viewPortInnerWidth = window.innerWidth;
	av.viewPortInnerHeight = window.innerHeight;
	av.viewPortClientWidth = document.documentElement.clientWidth;
	av.viewPortClientHeight = document.documentElement.clientHeight;
  av.grd.drawGridSetupFn('window.addEventListener'); // redraw the grid
  av.anl.AnaChartFn('window.addEventListener'); // redraw analysis grid
});
//--------------------------------------------------------------------------------------- end window.addEventListener --





