/**
 * Mocking client-server processing
 */

var NAME = ['Вася', 'Коля', 'Миша', 'Алексей', 'Иван', 'Григорий', 'Андрей'];
var SURNAME = ['Пупкин', 'Иванович', 'Никифоров', 'Тимофеев'];

var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var CustomerObject = function (id) {
    return {
        whenCreated: new Date(), 
        registeredDate: new Date(),
        lastVisitDate: new Date(),
        firstOrderDate: new Date(),
        anonymized: false,
        birthday: new Date(getRandom(1970, 2000), getRandom(1, 12), getRandom(1, 28)),
        comment: '',
        email: '',
        id: id,
        isDeleted: false,
        middleName: '',
        name: NAME[getRandom(0, NAME.length - 1)],
        phone: '',
        surname: SURNAME[getRandom(0, SURNAME.length - 1)]
    }
}

var arrCustomers = function () {
    var dataCustomers = new Array();
    var countCustomers = NAME.length + SURNAME.length;
    for (var i = 0; i < countCustomers; i++) {
        dataCustomers.push(CustomerObject("c0175e65-7251-d98d-a5d4-8a4f5ce918" + i));
    }

    return dataCustomers;
}

const _customers = arrCustomers();
  
  export default {
    getCustomers (cb) {
      setTimeout(() => cb(_customers), 100)
    },
  
    buyCustomers (customers, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
          ? cb()
          : errorCb()
      }, 100)
    }
  }