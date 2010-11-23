describe("ascii2hangeul", function() {

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
});
