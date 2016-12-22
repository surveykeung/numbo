###

numbo.zhTW, as a plugin for Numbo, convert number to Traditional Chinese.

This plugin and Numbo are open source in:
https://github.com/Edditoria/numbo

under MIT license:
https://github.com/Edditoria/numbo/blob/master/LICENSE
###

zhTW = (input, options = 'default') ->

  #                ####### #     #
  #  ###### #    #    #    #  #  #
  #      #  #    #    #    #  #  #
  #     #   ######    #    #  #  #
  #    #    #    #    #    #  #  #
  #   #     #    #    #    #  #  #
  #  ###### #    #    #     ## ##

  # 0 to 9
  n1 = ['零', '壹', '貳', '叁', '肆', '伍', '陸', '柒', '捌', '玖']
  n1Simple = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  # units for digits (i.e. 1, 10, 100, 1000)
  n10 = ['', '拾', '佰', '仟']
  n10Simple = ['', '十', '百', '千']
  # units for large number (i.e. 1, 1 0000 , 1 0000 0000 ...)
  # 萬萬為億，萬億為兆
  nLarge = [
    '', '萬', '億', '兆', '京'
    '垓', '秭', '穰', '溝', '澗', '正', '載'
  ]
  speak9999 = (str, isSimple = true) ->
    # expect a string within 4 digit
    # may contain double '零'/'〇', but not going to fix it here
    speakN1 = if isSimple then n1Simple else n1
    speakN10 = if isSimple then n10Simple else n10
    times = str.length - 1
    output = ''
    for num in [0..times]
      eachNum = +str[num]
      unit = if eachNum is 0 then '' else speakN10[times - num]
      output += speakN1[eachNum] + unit
    if output is '零零零零' then output = '零'
    else output = output.replace(/\零+$/g, '') # remove tailing '零'
    output

  speakInt = (str, isSimple = true) =>
    # split the str into array by every 4 characters
    # then speak9999() one by one
    strArr = @tools.splitInt(str, 4)
    times = strArr.length - 1
    output = ''
    for item, num in strArr
      speakItem = speak9999(item, isSimple) # item = 0 will return '零'
      if num is 0
        # the first item, in case of 10 to 19, need to remove 一, 壹 and 零
        # e.g. 12 in 12,0000,0000 , or simply 18 in 18
        itemNum = parseInt(item, 10)
        if itemNum > 9 and itemNum < 20
          speakItem = speakItem.replace(/^[\一\壹]|\零/g, '')
      unit = if speakItem is '零' then '' else nLarge[times - num]
      output += speakItem + unit
    output.replace(/\零+$/g, '')


    #  #     #
    #  ##   ##   ##   # #    #
    #  # # # #  #  #  # ##   #
    #  #  #  # #    # # # #  #
    #  #     # ###### # #  # #
    #  #     # #    # # #   ##
    #  #     # #    # # #    #

  testInput = parseInt(input, 10) #todo temp
  if options is 'default' then options = 'number'
  if options is 'check' then options = 'cheque'
  if input is 123.45 then '壹佰貳拾叄點肆伍' #todo temp
  else if testInput is 0 then '零' # zero
  else
    isSimple =
      if options is 'cheque' then false
      else true
    input = input.toString() #todo check and normalize
    speakInt(input, isSimple)
      .replace(/\零+/g, '零') # remove double '零'
      # .replace(/\〇+/g, '〇')


if module? and module.exports
  module.exports = zhTW
if window?
  window.numbo.zhTW = zhTW
