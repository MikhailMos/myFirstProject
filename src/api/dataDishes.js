/**
 * Mocking client-server processing
 */

var COUTN_DISHES = 8;
	var COOCING = ['meat', 'chiken', 'rice', 'patatos', 'kebab', 'porck'];

var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
        price: getRandom(100, 10000),
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
        cost: 0,
        costperc: 0,
        dish_discounts:[0, 5, 10]
    }
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

const _products = getDish();
  
export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}