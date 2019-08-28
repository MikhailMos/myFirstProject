<template>
  <div id="app">
    <form class="orderForm">
      <orderFormNomenclature
        class="orderForm__nomenclature"
        :arrCustomers="arrCustomers"
        :dishes="dishes"
        @select="getNomenclature"
      ></orderFormNomenclature>
      <orderFormResult class="orderForm__result" @send-data="loadToServer"></orderFormResult>
      <button class="orderForm__btn-remove" type="button" @click.prevent="onBtnClick()">&#8594;</button>
    </form>
  </div>
</template>

<script>
  import orderFormNomenclature from './components/orderFormNomenclature.vue'
  import orderFormResult from './components/orderFormResult.vue'

  export default {
    name: 'app',
    data () {
      return {
        arrCustomers: arrCustomers(),
        dishes: getDish(),
        selectedNomenclature: {}
      }
    },
    components: {
      orderFormNomenclature,
      orderFormResult
    },
    // created: {
    //   getCustomers: getData(this.arrCustomers, get_clients),
    //   getDishes: getData(this.dishes, get_dishes)
    // },
    methods: {
      onBtnClick: function () {
        if (this.selectedNomenclature.selectedProducts) {
          this.$children[1].$data.selectedProducts = this.selectedNomenclature.selectedProducts;
        }
      },
      getNomenclature: function (obj) {
        return this.selectedNomenclature = obj;
      },
      loadToServer: function (resProducts, sum) {
        if (!this.selectedNomenclature.selectedCustomer) {
          alert('Клиент не выбран.');
        } else {
          var data = new ObjPOST(this.selectedNomenclature.selectedCustomer, getDataProducts(resProducts), sum);
          onSubmitClick(data);
        }
      }
    }
  }

  var SERV_IP = 'http://127.0.0.0';
  var PORT = '8080';
  var SAVE_ORDER = 'order';
  var ORGANIZATION_GUID = '00000000-0000-0000-0000-000000000000';
  var COMMENT_FROM_ORDER = 'test';
  var PERSON_COUNT = 1;

  var NAME = ['Вася', 'Коля', 'Миша', 'Алексей', 'Иван', 'Григорий', 'Андрей'];
  var SURNAME = ['Пупкин', 'Иванович', 'Никифоров', 'Тимофеев'];
  var COUTN_DISHES = 8;
  var COOCING = ['meat', 'chiken', 'rice', 'patatos', 'kebab'];
  var DATA_PRODUCT = {
    errorcode: 0,
    errorstring: '',
    params: ''
  }

  var arrCustomers = function () {
    var dataCustomers = new Array();
    var countCustomers = NAME.length + SURNAME.length;
    for (var i = 0; i < countCustomers; i++) {            
      dataCustomers.push(CustomerObject("c0175e65-7251-d98d-a5d4-8a4f5ce918" + i));
    }

    return dataCustomers;
  }

  var getDish = function () {
    var arrDishes = new Array;

    for (var i = 0; i < COUTN_DISHES; i++) {
      var tempObj = DishObject();
      tempObj.id = tempObj.id + i;
      tempObj.grp_id = tempObj.grp_id + i;
      arrDishes.push(tempObj);
    }

    return arrDishes;
  }

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  var getDateToStr = function () {
    var date = new Date();
    var dateStr = date.toISOString().replace('T', ' ');
    return dateStr.substring(0, dateStr.length - 5);
  }

  var getDataProducts = function (arr) {
    var result = [];
    arr.forEach(function (el) {
      var obj = {
            "id": el.id,
            "amount": "1",
            "modifiers": []
          };
      result.push(obj);
    });

    return result;
  }

  var DishObject = function () {
    return {
      id: 'ff9b5ea0-c702-4aad-848c-3b150ec38c4',
      grp_id: 2000,
      name: COOCING[getRandom(0, COOCING.length - 1)],
      color: 'rgb(' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ')',
      font_color: 'rgb(' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ')',
      type: 'dish',
      includedinsections: '',
      includedinmenu: true,
      img: 1010100101,
      deleted: false,
      price: 10.0,
      fat: 0,
      fiber: 1.1,
      carbs: 0.1,
      energy: 1.1,
      weight: 120,
      capacity: 0.6,
      allergen: 'atention',
      alkopercent: 0.01,
      stop_list: 0,
      category: 2222,
      description: 'it\'s delition',
      fullname: 'soup',
      fullnameenglish: 'soup',
      descriptionenglish: 'it\'s delitions',
      kitchenname: 'bla',
      inquickmenu: false,
      qrow: '',
      qcolumn: '',
      qpage: '',
      natsenka: 0,
      cost: 120,
      costperc: 0,
      dish_discounts:[0, 5, 10]
    }
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

  var ObjPOST = function (customer, products, sum) {
    return {
      "organization": ORGANIZATION_GUID,
      "customer": {
        "id": customer.id,
        "name": customer.name,
        "surName": customer.surname,
        "phone": customer.phone
      },
      "order": {
        "id": "" + getRandom(0, 10000),
        "externalId": "0000000000000000000000000",
        "date": getDateToStr(),
        "phone": customer.phone,
        "items": products,
        "isSelfService": false,
        "comment": COMMENT_FROM_ORDER,
        "personsCount": PERSON_COUNT,
        "address": {
          "city": "Санкт-Петербург",
          "home": "25",
          "comment": "константа Address_comment",
          "street": "Морской",
          "housing": "2",
          "apartment": "8"
        },
        "fullSum": sum,
        "paymentItems": [
          {
            "sum": sum,
            "paymentType": {
              "code": "CASH"
            },
          "isProcessedExternally": false
          }
        ]
      }
    }
  }

  // var getData = function (whereLoad, somePath) {
  //   fetch(SERV_IP + ':' + PORT + '/' + somePath)
  //     .then(function (response) {
  //         return response.json();
  //     })
  //     .then(function (data) {
  //       if (response.ok) {
  //         return data;
  //       } else {
  //         return Promise.reject({status: response.status, data});
  //       }
  //     })
  //     .then(function (result) {
  //       console.log('success:', result)
  //     })
  //     .catch(function (error) {
  //       console.log('error:', error)
  //     });
  // }

  var onSubmitClick = function (dataForm) {

    fetch(SERV_IP + ':' + PORT + '/' + SAVE_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    })
    .then(function (response) {  
      if (response.status >= 200 && response.status < 300) {  
        return Promise.resolve(response);
      } else {  
        return Promise.reject(new Error(response.statusText)); 
      }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Запрос выполнен с запросом JSON', data);
    })
    .catch(function (error) {
      console.log('Запрос не выполнен', error);
    });    
  };
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.orderForm {
  padding: 10px;
  min-height: 200px;
  border: 1px solid black;

  display: flex;
  justify-content: space-between;
}

.orderForm__nomenclature,
.orderForm__result {
  width: 48%;
}

.orderForm__result {
  order: 1;
}

.orderForm__btn-remove {
  align-self: center;
}
</style>
