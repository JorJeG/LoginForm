var MyForm = {

  validate: function() {
    var arrayErrorField = [];
    var threeWordsReg = /^[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/;
    var emailReg = /.+@(ya.ru|yandex.ru|yandex.ua|yandex.by|yandex.kz|yandex.com)$/;
    var phoneReg = /^\+\d\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

    function sumDigit(string) {
      var sum = 0;
      for (var i = 0; i < string.length; i++) {
        if (!isNaN(string[i])) {
          sum += Number(string[i]);
        }
      }
      return (sum > 30 ? false : true);
    }

    if (!threeWordsReg.test(MyForm.getData().fio)) arrayErrorField.push('fio');
    if (!emailReg.test(MyForm.getData().email)) arrayErrorField.push('email');
    if (!phoneReg.test(MyForm.getData().phone) || !sumDigit(MyForm.getData().phone)) arrayErrorField.push('phone');

    return {
      'isValid': arrayErrorField.length !== 0 ? false : true,
      'errorFields': arrayErrorField
    }
  },

  getData: function() {
    var fioValue = document.getElementById('fio').value;
    var emailValue = document.getElementById('email').value;
    var phoneValue = document.getElementById('phone').value;
    return {
      'fio': fioValue,
      'email': emailValue,
      'phone': phoneValue
    }
  },
  submit: function() {
    var form = document.getElementById('myForm');
    //var submitBut = document.getElementById('submitButton');
    form.addEventListener("submit", function(event) {
      console.log("Hello");
      event.preventDefault();
    })
  }
}
