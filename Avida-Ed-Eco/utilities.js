  // all instances of Math.floor were Math.trunc, but Internet Explorer does not support Math.trunc
  //----------------------------------------------------------------------------------------------------------------------
  //because IE does not understand var event = new Event('change'); in the file fileIO.js

  // if (av.dbg.flg.root) { console.log('Root: start of utilities'); }
  var av = av || {};  //incase av already exists

  //----------------------------------------------------------------------------------------------------------------------
    //http://nelsonwells.net/2011/10/swap-object-key-and-values-in-javascript/
  av.utl.invertHash = function (obj) {
    var new_obj = {};
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        new_obj[obj[prop]] = prop;
      }
    }
    return new_obj;
  };
  //------- not in use = example
  //var hexColor = av.ui.invertHash(av.color.names);
  //var theColor = hexColor['#000000'];  //This should get 'Black'
  //console.log('theColor=', theColor);

  //----------------------------------------------------------------------------------------------------------------------
  //http://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
  av.utl.newFilledArray = function (length, val) {
    var array = [];
    var i = 0;
    while (i < length) {
      array[i++] = val;
    }
    return array;
  };

  //----------------------------------------------------------------------------------------------------------------------
  av.utl.isNumberRegExpression = function(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); };
  //from https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
  av.utl.isNumber = function(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0); };
  
  //----------------------------------------------------------------------------------------------------------------------
  (function () {
    'use strict';
    function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  })();

  //----------------------------------------------------------------------------------------------------------------------
  if (typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
      return String(this).replace(/^\s+|\s+$/g, '');
    };
  }

  /*----------------------------------------------------------------------------------------------------------------------
   linmap
   Function by Wesley R. Elsberry, based on
   1989 Turbo Pascal version.
   ---------------------------------------- */
  av.utl.linmap = function(dx, d1, d2, r1, r2){
    'use strict';
    var ddiff = d2 - d1 + 0.0;
    var rdiff = r2 - r1 + 0.0;

    var doffs = dx - d1 + 0.0;

    if (0.0 == ddiff){
      //return 0.0; // should be NaN
      return Number.Nan; // should be NaN
    };

    var dscale = (doffs + 0.0) / ddiff;

    var rx = dscale * rdiff + r1;

    return rx;
  };
  //when applying to excel dx = mod column; ddif is the divisor to get the mode; r1, r1 are numbers above and below. 

  /* ----------------------------------------
   get_color

   Function to obtain a color out of a color map
   implemented as a sequential list of color value
   strings.

   example:
   cmap = ['rgb(0,0,0)', 'rgb(0, 0, 1)', ... 'rgb(255,255,255)'];

   dx is a number in the data domain.
   d1 is the data domain value corresponding to the low end
   of the colormap.
   d2 is the data domain value corresponding to the high end
   of the colormap.

   Returns:

   a color string from the corresponding index in the
   input color map.

   The color map can be of any length.

   ---------------------------------------- */
  av.utl.get_color0 = function(cmap, dx, d1, d2){
    'use strict';
    var datacolorindex = Math.max(0,Math.min(cmap.length-1,Math.round(av.utl.linmap(dx, d1, d2, 0, cmap.length-1))));
    var datacolor = cmap[datacolorindex];
    return datacolor;
  };

  av.utl.get_color1 = function(cmap, dx, d1, d2){
    'use strict';
    var datacolorindex = Math.max(0,Math.min(cmap.length-1,Math.round(av.utl.linmap(dx, d1, d2, 1, cmap.length-1))));
    var datacolor = cmap[datacolorindex];
    return datacolor;
  };

  av.utl.get_color2 = function(cmap, dx, d1, d2, r1){
    'use strict';
    var datacolorindex = Math.max(0,Math.min(cmap.length-1,Math.round(av.utl.linmap(dx, d1, d2, r1, cmap.length-1))));
    var datacolor = cmap[datacolorindex];
    return datacolor;
  };

  // No longer using. Now using a subset of toLocalString
  //from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
  //formats numbers with commas c=number of decimal places; d = 3-digit separator, t = decimal point indicator
  /* original   Number.prototype.formatNum = function(c, d, t){
    'use strict';
    var n = this,
      c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };
  original */

  //simplified form of toLocalString
  Number.prototype.formatNum = function(fracDigits, location){
    'use strict';
    var num = this;
    var digits = isNaN(fracDigits = Math.abs(fracDigits)) ? 1 : fracDigits;
    var local = location;  //if missing then local should also be undefined. 
    return num.toLocaleString(local, {minimumFractionDigits: digits, maximumFractionDigits: digits});
  };

av.utl.log = function (base, num) {  
  return Math.log(num) / Math.log(base);  
};
//--------------------------------------------------------------------------------------------------- av.utl.toMetric --
// The largest number displayed in my test was     512P = 512345678901235000
// in number in the the environment.cfg CELL statement was 512345678901234567
  av.utl.toMetric = function (standardNotationNum, fixedBase) {
    var stdNum = NaN;
    var fixBase = 0;
    var numStr = 'NaN';
    if ( av.utl.isNumber(Number(fixedBase)) ) {
      var fixBase = parseFloat(fixedBase);
      //console.log('fixedBase=', fixedBase);
    };
    //console.log('10**update = 10**',av.grd.msg.update, '=', 10**av.grd.msg.update);
    if ( av.utl.isNumber(parseFloat(standardNotationNum)) ) {
      stdNum = parseFloat(standardNotationNum);
      if (10**27 <= stdNum ) {numStr = stdNum.toExponential(3); }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (10**26 <= stdNum ) {numStr = (stdNum/10**24).toFixed(fixBase+0) + "Y"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**25 <= stdNum ) {numStr = (stdNum/10**24).toFixed(fixBase+1) + "Y"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**24 <= stdNum ) {numStr = (stdNum/10**24).toFixed(fixBase+2) + "Y"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (10**23 <= stdNum ) {numStr = (stdNum/10**21).toFixed(fixBase+0) + "Z"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**22 <= stdNum ) {numStr = (stdNum/10**21).toFixed(fixBase+1) + "Z"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**21 <= stdNum ) {numStr = (stdNum/10**21).toFixed(fixBase+2) + "Z"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (10**20 <= stdNum ) {numStr = (stdNum/10**18).toFixed(fixBase+0) + "E"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**19 <= stdNum ) {numStr = (stdNum/10**18).toFixed(fixBase+1) + "E"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**18 <= stdNum ) {numStr = (stdNum/10**18).toFixed(fixBase+2) + "E"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (10**17 <= stdNum ) {numStr = (stdNum/10**15).toFixed(fixBase+0) + "P"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**16 <= stdNum ) {numStr = (stdNum/10**15).toFixed(fixBase+1) + "P"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**15 <= stdNum ) {numStr = (stdNum/10**15).toFixed(fixBase+2) + "P"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (10**14 <= stdNum ) {numStr = (stdNum/10**12).toFixed(fixBase+0) + "T"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**13 <= stdNum ) {numStr = (stdNum/10**12).toFixed(fixBase+1) + "T"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**12 <= stdNum ) {numStr = (stdNum/10**12).toFixed(fixBase+2) + "T"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (10**11 <= stdNum ) {numStr = (stdNum/10**9).toFixed(fixBase+0) + "G"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**10 <= stdNum ) {numStr = (stdNum/10**9).toFixed(fixBase+1) + "G"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**9 <= stdNum )  {numStr = (stdNum/10**9).toFixed(fixBase+2) + "G"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (10**8 <= stdNum ) {numStr = (stdNum/10**6).toFixed(fixBase+0) + "M"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**7 <= stdNum ) {numStr = (stdNum/10**6).toFixed(fixBase+1) + "M"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**6 <= stdNum ) {numStr = (stdNum/10**6).toFixed(fixBase+2) + "M"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (10**5 <= stdNum ) {numStr = (stdNum/10**3).toFixed(fixBase+0) + "k"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**4 <= stdNum ) {numStr = (stdNum/10**3).toFixed(fixBase+1) + "k"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10**3 <= stdNum ) {numStr = (stdNum/10**3).toFixed(fixBase+2) + "k"; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (100 <= stdNum ) {numStr = stdNum.toFixed(fixBase+1) ; }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (10 <= stdNum ) {numStr = stdNum.toFixed(fixBase+2); }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }
      else if (1 <= stdNum ) {numStr = stdNum.toFixed(fixBase+3); }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

      else if (0.1 <= stdNum) {numStr = (stdNum/10**(-3)).toFixed(fixBase+0) + "m"; } 
      else if (0.01 <= stdNum) {numStr = (stdNum/10**(-3)).toFixed(fixBase+1) + "m"; } 
      else if (0.001 <= stdNum) {numStr = (stdNum/10**(-3)).toFixed(fixBase+2) + "m"; } 

      else if (10**(-4) <= stdNum) {numStr = (stdNum/10**(-6)).toFixed(fixBase+0) + '&micro;'; }
      else if (10**(-5) <= stdNum) {numStr = (stdNum/10**(-6)).toFixed(fixBase+1) + '&micro;'; }
      else if (10**(-6) <= stdNum) {numStr = (stdNum/10**(-6)).toFixed(fixBase+2) + '&micro;'; }

      else if (10**(-7) <= stdNum) {numStr = (stdNum/10**(-9)).toFixed(fixBase+0) + 'n'; }
      else if (10**(-8) <= stdNum) {numStr = (stdNum/10**(-9)).toFixed(fixBase+1) + 'n'; }
      else if (10**(-9) <= stdNum) {numStr = (stdNum/10**(-9)).toFixed(fixBase+2) + 'n'; }

      else if (10**(-10) <= stdNum) {numStr = (stdNum/10**(-12)).toFixed(fixBase+0) + 'p'; }
      else if (10**(-11) <= stdNum) {numStr = (stdNum/10**(-12)).toFixed(fixBase+1) + 'p'; }
      else if (10**(-12) <= stdNum) {numStr = (stdNum/10**(-12)).toFixed(fixBase+2) + 'p'; }

      else if (10**(-13) <= stdNum) {numStr = (stdNum/10**(-15)).toFixed(fixBase+0) + 'f'; }
      else if (10**(-14) <= stdNum) {numStr = (stdNum/10**(-15)).toFixed(fixBase+1) + 'f'; }
      else if (10**(-15) <= stdNum) {numStr = (stdNum/10**(-15)).toFixed(fixBase+2) + 'f'; }

      else if (10**(-16) <= stdNum) {numStr = (stdNum/10**(-18)).toFixed(fixBase+0) + 'a'; }
      else if (10**(-17) <= stdNum) {numStr = (stdNum/10**(-18)).toFixed(fixBase+1) + 'a'; }
      else if (10**(-18) <= stdNum) {numStr = (stdNum/10**(-18)).toFixed(fixBase+2) + 'a'; }

      else if (10**(-19) <= stdNum) {numStr = (stdNum/10**(-21)).toFixed(fixBase+0) + 'z'; }
      else if (10**(-20) <= stdNum) {numStr = (stdNum/10**(-21)).toFixed(fixBase+1) + 'z'; }
      else if (10**(-21) <= stdNum) {numStr = (stdNum/10**(-21)).toFixed(fixBase+2) + 'z'; }

      else if (10**(-22) <= stdNum) {numStr = (stdNum/10**(-24)).toFixed(fixBase+0) + 'y'; }
      else if (10**(-23) <= stdNum) {numStr = (stdNum/10**(-24)).toFixed(fixBase+1) + 'y'; }
      else if (10**(-24) <= stdNum) {numStr = (stdNum/10**(-24)).toFixed(fixBase+2) + 'y'; }

      else if (0 == stdNum) { numStr = stdNum.toFixed(0); }
      else {numStr = stdNum.toExponential(3); }  //console.log('stdNum =',stdNum,'; numStr=', numStr); }

    };
    //console.log('stdNum =',stdNum,'; numStr=', numStr);
    return numStr;
  };
//----------------------------------------------------------------------------------------------- end av.utl.toMetric --

//-------------------------------------------------------------------------------------------------- string utilities --
  /*
   av.utl.wsb(target, thestring)
   returns the part of the string that occurs before the target substring
   or the entire string if the target is not found.
   */
  av.utl.wsb = function(target, strng){   //string is longer, target is the substring
    'use strict';
    var sb = strng;
    var tndx = strng.indexOf(target);
    if (-1 == tndx) {
      return sb;
    } else {
      sb = strng.substr(0, tndx);
      return sb;
    }
  };
  //string.trim() removes leading and trailing white space

  /*
   av.utl.wsa(target, thestring)
   returns the part of the string that follows the target or
   the empty string if the target is not found.
   */
  av.utl.wsa = function(target, strng){
    'use strict';
    var sb = strng;
    var tndx = strng.indexOf(target);
    if (-1 == tndx) {
      return '';
    } else {
      sb = strng.substr(tndx + target.length, strng.length);
      return sb;
    }
  };
  /*
   So to extract the genome out of
   var genplus = "0,heads-default,abcdefghijklmnopqrstuvwxyz";
   var genome = av.utl.wsa(",", av.utl.wsa(",", genplus));
   */

  //replaces , with a !; remove preceeding and trailing spaces; replace spaces with ~
  av.utl.spaceSplit = function (instr) {
    'use strict';
    var str1 = instr.replace(/,/g, '|').replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\s,]+/g, '~');

    return str1;
  };

  //remove all commas; remove preceeding and trailing spaces; replace spaces with comma
  av.utl.flexsplit = function (instr) {
    'use strict';
    var str1 = instr.replace(/,/g, '').replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\s,]+/g, ',');

    return str1;
  };

  //remove all commas; remove preceeding and trailing spaces; replace spaces with underbar; put underbar at start of string.
  av.utl.makeFileName = function (instr) {
    'use strict';
    var str1 = instr.replace(/,/g, '').replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\s,]+/g, '_');
    str1 = '_' + str1;

    return str1;
  };
//---------------------------------------------------------------------------------------------- end string utilities --

//------------------------------------------------------------------------------------------------- av.utl.dTailWrite --
  av.utl.dTailWrite = function (file, lineNum, nameStr, objAry) {
    av.debug.dTail = 'File=' + file + ': ' + lineNum;
    var lngth = objAry.length;
    var objName = ''; var sbStr = '';
    for (var ii = 0; ii < lngth; ii++) {
      objName = av.utl.wsb(',', nameStr);
      if ('' == objName) console.log('empty string');
      sbStr = av.utl.wsb('.', av.utl.wsa('.', nameStr));
      nameStr = av.utl.wsa(',', nameStr);
      if ('dom' == sbStr) {
        av.debug.dTail += '\n' + objName + ' = ' + objAry[ii].toString();
      }
      else {
        av.debug.dTail += '\n' + objName + ' = ' + JSON.stringify(objAry[ii], null, 2);
      }
    }
    //console.log('dTail = ', av.debug.dTail);
  };
//--------------------------------------------------------------------------------------------- end av.utl.dTailWrite --

//---------------------------------------------------------------------------------------------- av.utl.jsonStringify --
  av.utl.jsonStringify = function(jStr) {
    'use strict';
    var str0 = JSON.stringify(jStr, null, 2);
    var str1 = '~|~' + str0.replace(/\\n/g, "\n") + '~.~';
    return str1;
  };


  av.utl.jsonStringifyOneLine = function(jStr) {
    'use strict';
    var str0 = JSON.stringify(jStr);
    var str1 = '~|~' + str0 + '~.~';
    return str1;
  };

  // JSon to string  Should only be used to put statements from Avida into logs
  av.utl.json2stringFn = function (jStr) {
    'use strict';
    var rstr = '';
    for (var ndx in jStr) {
      if ('object' === typeof jStr[ndx]) {
        rstr += '..' + ndx + ': \n';
        if ('snapshots' != ndx) {
          var iiStuff = jStr[ndx];
          for (var ii in iiStuff) {
            if ('object' === typeof iiStuff[ii]) {
              rstr += '__' + ii + ': \n';
              var jjStuff = iiStuff[ii];
              for (var jj in jjStuff) {
                rstr += '    ' + jj + ': ' + jjStuff[jj] + '\n';
              }
            }
            else rstr += '  ' + ii + ': ' + iiStuff[ii] + '\n';
          }
        }
      }
      else rstr += '  ' + ndx + ':' + jStr[ndx] + '\n';
    }
    return rstr + '~.~';
  };

//----------------------------------------------------------------------------------------------- av.utl.json2oneLine --
  // JSon to oneLine
  av.utl.json2oneLine = function (jStr) {
    'use strict';
    var rstr = '';
    for (var ndx in jStr) {
      if ('object' === typeof jStr[ndx]) {
        rstr += ndx + ':__';
        if ('snapshots' != ndx) {
          var iiStuff = jStr[ndx];
          for (var ii in iiStuff) {
            if ('object' === typeof iiStuff[ii]) {
              rstr += ii + ':__';
              var jjStuff = iiStuff[ii];
              for (var jj in jjStuff) {
                rstr += '    ' + jj + ': ' + jjStuff[jj] + '; ';
              }
            }
            else rstr += '  ' + ii + ': ' + iiStuff[ii] + '; ';
          }
        }
      }
      else rstr += ndx + ':' + jStr[ndx] + '; s';
    }
    return rstr;
  };
//------------------------------------------------------------------------------------------- end av.utl.json2oneLine --


//----------------------------------------------------------------------------------------------- av.utl.objectLength --
  //number of items in an object
  //http://stackoverflow.com/questions/16976904/javascript-counting-number-of-objects-in-object
  av.utl.objectLength = function(object){
    if (object.keys) {
      return Object.keys(object).length;
    }
    else {
      var length = 0;
      for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
          ++length;
        }
      }
      return length;
    }
  };

//---------------------------------------------------------------------------------- find browser & operationg system --
  //  
  // http://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
  // http://jsfiddle.net/ChristianL/AVyND/
  /**
   * JavaScript Client Detection
   * (C) viazenetti GmbH (Christian Ludwig)
   */
  (function (window) {
    {
      var unknown = '-';

      // screen
      var screenSize = '';
      if (screen.width) {
        width = (screen.width) ? screen.width : '';
        height = (screen.height) ? screen.height : '';
        screenSize += '' + width + " x " + height;
      }

      // browser
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browser = navigator.appName;
      var version = '' + parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion, 10);
      var nameOffset, verOffset, ix;

      // Opera
      if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
        }
      }
      // Opera Next
      if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
      }
      // MSIE
      else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
      }
      // Chrome
      else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
      }
      // Safari
      else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
        }
      }
      // Firefox
      else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
      }
      // MSIE 11+
      else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
      }
      // Other browsers
      else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
          browser = navigator.appName;
        }
      }
      // trim the version string
      if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

      majorVersion = parseInt('' + version, 10);
      if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
      }

      // mobile version
      var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

      // cookie
      var cookieEnabled = (navigator.cookieEnabled) ? true : false;

      if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
      }

      // system
      var os = unknown;
      var clientStrings = [
        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Windows Vista', r:/Windows NT 6.0/},
        {s:'Windows Server 2003', r:/Windows NT 5.2/},
        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
        {s:'Windows 98', r:/(Windows 98|Win98)/},
        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s:'Windows CE', r:/Windows CE/},
        {s:'Windows 3.11', r:/Win16/},
        {s:'Android', r:/Android/},
        {s:'Open BSD', r:/OpenBSD/},
        {s:'Sun OS', r:/SunOS/},
        {s:'Linux', r:/(Linux|X11)/},
        {s:'iOS', r:/(iPhone|iPad|iPod)/},
        {s:'Mac OS X', r:/Mac OS X/},
        {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s:'QNX', r:/QNX/},
        {s:'UNIX', r:/UNIX/},
        {s:'BeOS', r:/BeOS/},
        {s:'OS/2', r:/OS\/2/},
        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
      ];
      for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
          os = cs.s;
          break;
        }
      }

      var osVersion = unknown;

      if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
      }

      switch (os) {
        case 'Mac OS X':
          osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
          break;

        case 'Android':
          osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
          break;

        case 'iOS':
          osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
          osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
          break;
      }

      // flash (you'll need to include swfobject)
      /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
      var flashVersion = 'no check';
      if (typeof swfobject != 'undefined') {
        var fv = swfobject.getFlashPlayerVersion();
        if (fv.major > 0) {
          flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
        }
        else  {
          flashVersion = unknown;
        }
      }
    }

    window.jscd = {
      screen: screenSize,
      browser: browser,
      browserVersion: version,
      browserMajorVersion: majorVersion,
      mobile: mobile,
      os: os,
      osVersion: osVersion,
      cookies: cookieEnabled,
      flashVersion: flashVersion
    };
  }(this));
//--------------------------------------------------------------------------- end of find browser & operationg system --

  av.brs.userData = window.jscd;
  //console.log('user', av.brs.userData);
  //console.log('os', av.brs.userData.os);
  av.brs.str =
    'OS: ' + jscd.os +' '+ jscd.osVersion + '\n' +
    'Browser: ' + jscd.browser +' '+ jscd.browserMajorVersion +
    ' (' + jscd.browserVersion + ')\n' +
    'Mobile: ' + jscd.mobile + '\n' +
    'Flash: ' + jscd.flashVersion + '\n' +
    'Cookies: ' + jscd.cookies + '\n' +
    'Screen Size: ' + jscd.screen + '\n\n' +
    'Full User Agent: ' + navigator.userAgent;
  // if (av.dbg.flg.root) { console.log('Root: av.brs.str=',av.brs.str); }
  av.debug.log += '\n' + 'user info = ' + window.navigator.userAgent + ';  Screen Size: ' + jscd.screen;


  //**********************************************************************************************************************
  //                        Utilities to convert text to and from format needed by emscripten database
  //                                      Created by ruppmatt on 12/16/15.
  //**********************************************************************************************************************
  /*

  function utf16to8(str) {
    'use strict';
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      }
    }
    return out;
  }

  function utf8to16(str) {
    'use strict';
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
      c = str.charCodeAt(i++);
      switch(c >> 4)
      {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i-1);
        break;
        case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  }

  // IE does not like line 'for (var char of str8){'
  function utf8bytesEncode(str16){
    'use strict';
    var bytes = []
    var str8 = utf16to8(str16);
    for (var char of str8){
      bytes.push(char.charCodeAt(0));
    };
    return bytes;
  }

  function utf8bytesEecode(bytes8){
    'use strict';
    var chars = [];
    for (var byte of bytes8){
      chars.push(String.fromCharCode(byte));
    }
    return utf8to16(chars.join(''));
  }

  // displays text on screen instead of using console log
  function display(text)
  {   var para = document.createElement("p");
    var child = document.createTextNode(text);
    para.appendChild(child);
    document.body.appendChild(para);
  }
  */
 
  //**********************************************************************************************************************
  //   Another way to encode; decode stuff for emscripten files  system
  //**********************************************************************************************************************
  function encodeUtf8(s) {
    return unescape(encodeURIComponent(s));
  }

  function decodeUtf8(s) {
    'use strict';
    return decodeURIComponent(escape(s));
  }

  var UTF8 = (function () {
    'use strict';
    function UTF8() {
    }
    UTF8.getBytes = function (stringValue) {
      var bytes = [];
      var lngth = stringValue.length;
      for (var i = 0; i < lngth; ++i) {
        bytes.push(stringValue.charCodeAt(i));
      }
      return bytes;
    };

    UTF8.getString = function (utftext) {
      'use strict';
      var result = "";
      var lngth = utftext.length;
      for (var i = 0; i < lngth; i++) {
        result += String.fromCharCode(parseInt(utftext[i], 10));
      }
      return result;
    };

    return UTF8;
  })();
  
  // if (av.dbg.flg.root) { console.log('Root: end of utilities.js'); };

  //Example of using the above functions
  /*
  var emTxt = encodeUtf8('George');
  var emContents = UTF8.getBytes(emTxt);
  // to go back
  var emTxt2 = UTF8.getString(emContents);
  var jsTxt = decodeUtf8(emTxt2);
  console.log('emTxt', emTxt, '; jsTxt', jsTxt);
  */