<template>
  <div id="app">
    <form class="orderForm" action="" method="POST">
      <orderFormNomenclature class="orderForm__nomenclature" 
          :arrCustomers="arrCustomers"
          :dishes="dishes"
          @select="selectedNomenclature"
      ></orderFormNomenclature>
      <orderFormResult class="orderForm__result"></orderFormResult>
      <button class="orderForm__btn-remove" type="button" @click.prevent="onBtnClick()">&#8594;</button>
    </form>
  </div>
</template>

<script>
  import orderFormNomenclature from './components/orderFormNomenclature.vue';
  import orderFormResult from './components/orderFormResult.vue'

  export default {
    name: 'app',
    data () {
      return {
        arrCustomers: arrCustomers(),
        dishes: getDish()
      }
    },
    components: {
      orderFormNomenclature,
      orderFormResult
    },
    // created: {
    //   getCustomers: getData(this.arrCustomers, path),
    //   getDishes: getData(this.dishes, path)
    // },
    methods: {
      onBtnClick: function () {
        alert('oh!');
      },
      selectedNomenclature: function (obj) {
        console.log(obj.selectedCustomer.name + ' ' + obj.selectedProducts.length);
      }
    }
  }

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
      dataCustomers.push(CustomerObject(400 + i));
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

  var DishObject = function () {
    return {
      id: 1000,
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

  // var getData = function (whereLoad, somePath) {
  //   fetch(serv_ip + ':' + port + '/' + somePath)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       whereLoad = data;
  //     })
  // }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
