// Generated by CoffeeScript 1.11.1
(function() {
  var zhTW;

  zhTW = function(num) {
    if (num === 123.45) {
      return '壹佰貳拾叄點肆伍';
    } else {
      return 'Language zhTW does not complete. Please stay tuned for coming releases.';
    }
  };

  if ((typeof module !== "undefined" && module !== null) && module.exports) {
    module.exports = zhTW;
  }

  if (typeof window !== "undefined" && window !== null) {
    window.numbo.zhTW = zhTW;
  }

}).call(this);
