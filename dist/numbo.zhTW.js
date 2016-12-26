// Generated by CoffeeScript 1.11.1

/*

numbo.zhTW, as a plugin for Numbo, convert number to Traditional Chinese.

This plugin and Numbo are open source in:
https://github.com/Edditoria/numbo

under MIT license:
https://github.com/Edditoria/numbo/blob/master/LICENSE
 */

(function() {
  var zhTW;

  zhTW = function(input, options) {
    var check, main, n1, n10, n10Simple, n1Simple, nLarge, normalize, parseCents, speak9999, speakAmt, speakByDigit, speakInt, speakNum, splitNum;
    if (options == null) {
      options = 'default';
    }
    n1 = ['零', '壹', '貳', '叁', '肆', '伍', '陸', '柒', '捌', '玖'];
    n1Simple = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    n10 = ['', '拾', '佰', '仟'];
    n10Simple = ['', '十', '百', '千'];
    nLarge = ['', '萬', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載'];
    speak9999 = function(str, isSimple) {
      var eachNum, i, num, output, ref, speakN1, speakN10, times, unit;
      if (isSimple == null) {
        isSimple = true;
      }
      speakN1 = isSimple ? n1Simple : n1;
      speakN10 = isSimple ? n10Simple : n10;
      times = str.length - 1;
      output = '';
      for (num = i = 0, ref = times; 0 <= ref ? i <= ref : i >= ref; num = 0 <= ref ? ++i : --i) {
        eachNum = +str[num];
        unit = eachNum === 0 ? '' : speakN10[times - num];
        output += speakN1[eachNum] + unit;
      }
      if (output === '零零零零') {
        output = '零';
      } else {
        output = output.replace(/\零+$/g, '');
      }
      return output;
    };
    speakInt = (function(_this) {
      return function(str, isSimple) {
        var i, item, itemNum, len, num, output, speakItem, strArr, times, unit;
        if (isSimple == null) {
          isSimple = true;
        }
        if (str === '0') {
          return '零';
        } else {
          strArr = _this.tools.splitInt(str, 4);
          times = strArr.length - 1;
          output = '';
          for (num = i = 0, len = strArr.length; i < len; num = ++i) {
            item = strArr[num];
            speakItem = speak9999(item, isSimple);
            if (num === 0) {
              itemNum = parseInt(item, 10);
              if (itemNum > 9 && itemNum < 20) {
                speakItem = speakItem.replace(/^[\一\壹]|\零/g, '');
              }
            }
            unit = speakItem === '零' ? '' : nLarge[times - num];
            output += speakItem + unit;
          }
          return output.replace(/\零+$/g, '').replace(/\零+/g, '零');
        }
      };
    })(this);
    speakByDigit = function(str, n1, separator) {
      var i, item, len, output;
      if (separator == null) {
        separator = ' ';
      }
      if (typeof str === 'string' && str.search(/\D/g) < 0) {
        output = [];
        for (i = 0, len = str.length; i < len; i++) {
          item = str[i];
          output.push(n1[+item]);
        }
        return output.join(separator);
      } else {
        console.log('Error: invalid argument of speakByDigit()');
        return null;
      }
    };
    check = this.tools.check;
    normalize = this.tools.normalize;
    splitNum = this.tools.splitNum;
    parseCents = this.tools.parseCents;
    speakNum = function(str) {
      var dec, dot, int, strSplited;
      strSplited = splitNum(str);
      int = strSplited[0];
      dec = strSplited[1];
      dot = dec === '' ? '' : '點';
      return speakInt(int, true) + dot + speakByDigit(dec, n1Simple, '');
    };
    speakAmt = function(str, options) {
      var cent, cent1, cent2, dec, dollar, dp1, dp2, int, isSimple, speakN1, strSplited;
      if (options == null) {
        options = 'cheque';
      }
      strSplited = splitNum(str);
      int = strSplited[0];
      dec = parseCents(strSplited[1]);
      isSimple = options === 'cheque' ? false : true;
      if (isSimple && int === '0' && dec === 0) {
        return '零元';
      } else {
        dollar = int === '0' ? '' : int === '2' && options !== 'cheque' ? '兩元' : speakInt(int, isSimple) + '元';
        cent = dec === 0 ? options === 'cheque' ? '正' : '' : (speakN1 = isSimple ? n1Simple : n1, dp1 = Math.floor(dec / 10), dp2 = dec % 10, cent1 = dp1 === 0 ? '' : dp1 === 2 && options !== 'cheque' ? '兩角' : speakN1[dp1] + '角', cent2 = dp2 === 0 ? '' : dp2 === 2 && options !== 'cheque' ? '兩分' : speakN1[dp2] + '分', cent = cent1 + cent2);
        return dollar + cent;
      }
    };
    main = function(input, options) {
      if (options == null) {
        options = 'default';
      }
      if (input === '') {
        return null;
      } else if (input === '1e+100') {
        return 'Ding! One Google... Oops... One Googol!!';
      } else {
        if (check(input) === false) {
          console.log('Error: Invalid input value. Return null');
          return null;
        } else {
          input = normalize(input);
          input;
          switch (options) {
            case 'default':
            case 'number':
            case 'num':
              return speakNum(input);
            case 'cheque':
            case 'check':
            case 'chk':
              return speakAmt(input, 'cheque');
            case 'amount':
            case 'amt':
              return speakAmt(input, 'amount');
            default:
              console.log('Error: Option in zhTW is not valid');
              return null;
          }
        }
      }
    };
    return main(input, options);
  };

  if ((typeof module !== "undefined" && module !== null) && module.exports) {
    module.exports = zhTW;
  }

  if (typeof window !== "undefined" && window !== null) {
    window.numbo.zhTW = zhTW;
  }

}).call(this);
