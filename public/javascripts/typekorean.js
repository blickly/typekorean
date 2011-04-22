var translator = (function() {
  var vowels = {
    'o' : 2, 'j' : 5, 'n' : 14,
    'k' : 1, 'i' : 3, 'O' : 4,
    'p' : 6, 'u' : 7, 'P' : 8,
    'h' : 9, 'hk' : 10, 'ho' : 11,
    'hl' : 12, 'y' : 13, 'nj' : 15,
    'np' : 16, 'nl' : 17, 'b' : 18,
    'm' : 19, 'ml' : 20, 'l' : 21 };
  var initial_consonants = {
    'd' : 12, 'Q' : 9, 's' : 3,
    'r' : 1, 'R' : 2, 'e' : 4,
    'E' : 5, 'f' : 6, 'a' : 7,
    'q' : 8, 't' : 10, 'T' : 11,
    'w' : 13, 'W' : 14, 'c' : 15,
    'z' : 16, 'x' : 17, 'v' : 18,
    'g' : 19 };
  var final_consonants = {
    'fq' : 11, 'ft' : 12, 'x' : 25,
    'r' : 1, 'R' : 2, 'rt' : 3,
    's' : 4, 'sw' : 5, 'sg' : 6,
    'e' : 7, 'f' : 8, 'fr' : 9,
    'fa' : 10, 'fe' : 13, 'fv' : 14,
    'fg' : 15, 'a' : 16, 'q' : 17,
    'qt' : 18, 't' : 19, 'T' : 20,
    'd' : 21, 'w' : 22, 'c' : 23,
    'z' : 24, 'v' : 26, 'g' : 27 };

  var unichr = function(c) {
    if (!c) { c = 9785; }
    var uni = '"\\u' + c.toString(16)+'"';
    return eval(uni);
  };

  var isFinalConsonant = function(c) {
    return (final_consonants.hasOwnProperty(c));
  };
  var isInitialConsonant = function(c) {
    return (initial_consonants.hasOwnProperty(c));
  };
  var isVowel = function(c) {
    return (vowels.hasOwnProperty(c));
  };
  var isConsonant = function(c) {
    return (isInitialConsonant(c) || isFinalConsonant(c));
  };

  var singlejamo = function(ascii) {
    var compatibility_consonants = {
      'r' : 0x3131, 'R' : 0x3132, 's' : 0x3134, 'e' : 0x3137, 'E' : 0x3138,
      'f' : 0x3139, 'a' : 0x3141, 'q' : 0x3142, 'Q' : 0x3143, 't' : 0x3145,
      'T' : 0x3146, 'd' : 0x3147, 'w' : 0x3148, 'W' : 0x3149, 'c' : 0x314A,
      'z' : 0x314B, 'x' : 0x314C, 'v' : 0x314D, 'g' : 0x314E };
    var c;
    if (isConsonant(ascii)) {
      c = compatibility_consonants[ascii];
    } else if (isVowel(ascii)) {
      c = 0x314E + vowels[ascii];
    }
    return unichr(c);
  };

  var tochar = function(start, mid, end) {
    if (!start) {
      return "";
    } else if (!mid) {
      return singlejamo(start);
    }
    var lead = initial_consonants[start];
    var vowel = vowels[mid];
    var tail = end ? final_consonants[end] : 0;
    return unichr(tail + (vowel-1) * 28 + (lead-1) * 588 + 44032);
  };

  var word2hangeul = function(str) {
    var result = "";
    var lead, mid, end;
    var state = "start";
    var i = 0;
    while (true) {
      if (state === "start") {
        result += tochar(lead, mid, end);
        mid = (end = "");
        lead = str.substr(i,1);
        if (lead === "") {
          break;
        } else if (isInitialConsonant(lead)) {
          state = "vowel";
        }
        i += lead.length;
      } else if (state === "vowel") {
        if (isVowel(str.substr(i,2))) {
          mid = str.substr(i,2);
        } else if (isVowel(str.substr(i,1))) {
          mid = str.substr(i,1);
        } else {
          state = "start"; continue;
        }
        state = "finalConsonant";
        i += mid.length;
      } else if (state === "finalConsonant") {
        var nextchar2 = str.substr(i+2,1);
        var end2 = str.substr(i,2);
        var nextchar1 = str.substr(i+1,1);
        var end1 = str.substr(i,1);
        if (isFinalConsonant(end2) && (!isVowel(nextchar2) || nextchar2 === "")) {
          end = end2;
        } else if (isFinalConsonant(end1) && (!isVowel(nextchar1) || nextchar1 === "")) {
          end = end1;
        }
        i += end.length;
        state = "start";
      }
    }
    return result;
  };

  return { ascii2hangeul: function(str) {
      var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var result = "";
      var cur_str = "";
      var i, c;
      for (i = 0; i < str.length; i++) {
        c = str.charAt(i);
        if (alpha.indexOf(c) === -1) {
          result += word2hangeul(cur_str) + c;
          cur_str = "";
        } else {
          cur_str += c;
        }
      }
      result += word2hangeul(cur_str);
      return result;
    }
  };
}());

function refresh() {
  document.forms[0].hangeul.value = translator.ascii2hangeul(document.forms[0].ascii.value);
}
