describe("ascii2hangeul", function() {
  var ascii2hangeul = translator.ascii2hangeul;

  describe("for a single character", function() {

    describe("made of a single jamo", function() {

      it("should handle 'ㄱ'", function() {
        expect(ascii2hangeul('r')).toEqual('ㄱ');
      });

      it("should handle each individual jamos", function() {
        var ascii_jamo = 'qwertyuiopasdfghjklzxcvbnmQWERTOP';
        var hangeul_compatibility_jamo = 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡㅃㅉㄸㄲㅆㅒㅖ';

        var l = ascii_jamo.length;
        for (var i = 0; i < l; i++) {
          ascii = ascii_jamo.charAt(i);
          hangeul = hangeul_compatibility_jamo.charAt(i);
          expect(ascii2hangeul(ascii)).toEqual(hangeul);
        }
      });
    });

    describe("made of a consonant + vowel", function() {

      it("should handle '가'", function() {
        expect(ascii2hangeul('rk')).toEqual('가');
      });

      it("should handle '짜'", function() {
        expect(ascii2hangeul('Wk')).toEqual('짜');
      });

      it("should handle '의'", function() {
        expect(ascii2hangeul('dml')).toEqual('의');
      });

      it("should handle '뛰'", function() {
        expect(ascii2hangeul('Enl')).toEqual('뛰');
      });

    });

    describe("made of a consonant + vowel + ending consonant", function() {

      it("should handle '각'", function() {
        expect(ascii2hangeul('rkr')).toEqual('각');
      });

      it("should handle '짱'", function() {
        expect(ascii2hangeul('Wkd')).toEqual('짱');
      });

      it("should handle '황'", function() {
        expect(ascii2hangeul('ghkd')).toEqual('황');
      });

      it("should handle '뜅'", function() {
        expect(ascii2hangeul('Enld')).toEqual('뜅');
      });

      it("should handle '닭'", function() {
        expect(ascii2hangeul('ekfr')).toEqual('닭');
      });

      it("should handle '짦'", function() {
        expect(ascii2hangeul('Wkfa')).toEqual('짦');
      });

      it("should handle '홗'", function() {
        expect(ascii2hangeul('ghkrt')).toEqual('홗');
      });

      it("should handle '뛹'", function() {
        expect(ascii2hangeul('Enlfr')).toEqual('뛹');
      });

    });

  });

  describe("for a pair of characters", function() {

    describe("that are both well-formed", function() {
      it("should handle '가가'", function() {
        expect(ascii2hangeul('rkrk')).toEqual('가가');
      });

      it("should handle '닭이'", function() {
        expect(ascii2hangeul('ekfrdl')).toEqual('닭이');
      });

      it("should handle '닭과'", function() {
        expect(ascii2hangeul('ekfrrhk')).toEqual('닭과');
      });

      it("should handle '생과'", function() {
        expect(ascii2hangeul('todrhk')).toEqual('생과');
      });

      it("should handle '뛹쫢'", function() {
        expect(ascii2hangeul('EnlfrWhkfa')).toEqual('뛹쫢');
      });
    });

    describe("that have some single jamo", function() {
      it("should handle cases where there are two jamo", function() {
        expect(ascii2hangeul('zz')).toEqual('ㅋㅋ');
        expect(ascii2hangeul('gg')).toEqual('ㅎㅎ');
        expect(ascii2hangeul('nb')).toEqual('ㅜㅠ');
        expect(ascii2hangeul('dd')).toEqual('ㅇㅇ');
      });

      it("should handle cases where the jamo is at the end", function() {
        expect(ascii2hangeul('rkE')).toEqual('가ㄸ');
        expect(ascii2hangeul('rkfrr')).toEqual('갉ㄱ');
        expect(ascii2hangeul('ghkdt')).toEqual('황ㅅ');
      });

      it("should handle cases where the jamo is at the beginning", function() {
        expect(ascii2hangeul('zrk')).toEqual('ㅋ가');
        expect(ascii2hangeul('gdk')).toEqual('ㅎ아');
      });
    });


  });
});
