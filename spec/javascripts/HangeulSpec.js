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

  });
});
