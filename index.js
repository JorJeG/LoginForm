var MyForm = {

  validate: function() {
    var arrayErrorField = [],
        threeWordsReg = /^[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/,
        emailReg = /.+@(ya.ru|yandex.ru|yandex.ua|yandex.by|yandex.kz|yandex.com)$/,
        phoneReg = /^\+\d\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

    function sumDigit(string) {
      var sum = 0;
      for (var i = 0; i < string.length; i++) {
        if (!isNaN(string[i])) {
          sum += Number(string[i]);
        }
      }
      return (sum > 30 ? false : true);
    }

    if (!threeWordsReg.test(this.getData().fio)) {
      arrayErrorField.push('fio');
    }
    if (!emailReg.test(this.getData().email)) {
      arrayErrorField.push('email');
    }
    if (!phoneReg.test(this.getData().phone) || !sumDigit(this.getData().phone)) {
      arrayErrorField.push('phone');
    }

    return {
      'isValid': arrayErrorField.length !== 0 ? false : true,
      'errorFields': arrayErrorField
    }
  },

  getData: function() {
    var fioValue = document.getElementById('fio').value,
        emailValue = document.getElementById('email').value,
        phoneValue = document.getElementById('phone').value;

    return {
      'fio': fioValue,
      'email': emailValue,
      'phone': phoneValue
    }
  },

  setData: function(param) {
    document.getElementById('fio').value = param.fio;
    document.getElementById('email').value = param.email;
    document.getElementById('phone').value = param.phone;
  },

  submit: function() {
    var validateObject = this.validate();

    function ajaxRequest() {
      var request = new XMLHttpRequest();
      request.open("GET", document.getElementById('myForm').attributes['action'].textContent);
      request.onreadystatechange = function() {;
        if ((request.readyState === 4)) {
          var result = document.getElementById('resultContainer');
          var data = JSON.parse(request.responseText);
          if (data.status === 'success') {
            result.innerHTML = 'Success';
          } else if (data.status === 'error') {
            result.innerHTML = data.reason;
          } else if (data.status === 'progress') {
            setTimeout(ajaxRequest, data.timeout);
          }
          result.classList.add(data.status);
        }
      }
      request.send();
    }

    for(var key in this.getData()) {
      document.getElementById(key).classList.remove("error");
    }
    if (validateObject.isValid) {
      document.getElementById('submitButton').disabled = true;
      ajaxRequest();
    } else {
      for(var key in validateObject.errorFields) {
        document.getElementById(validateObject.errorFields[key]).classList.add("error");
      }
    }
  }
}
