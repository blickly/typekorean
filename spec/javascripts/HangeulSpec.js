describe("ascii2hangeul", function() {

  describe("for a single character", function() {

    describe("made of a single jamo", function() {

      it("should be able to print a single 자음", function() {
        expect(ascii2hangeul("r")).toEqual("ㄱ");
        //expect(ascii2hangeul("r")).toEqual("ᄀ");
        //var hangeul_consonants='ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ';
        /*
        var ascii_jamo = 'qwertyuiopasdfghjklzxcvbnmQWERTOP';
        var hangeul_jamo = 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅍㅠㅜㅡㅃㅉㄸㄲㅆㅒㅖ';

        var l = ascii_jamo.length;
        for (var i = 0; i < l; i++) {
          ascii = ascii_jamo.charAt(i);
          hangeul = hangeul_jamo.charAt(i);
          expect(ascii2hangeul(ascii)).toEqual(hangeul);
        }
        */
      });
    });

  });
});