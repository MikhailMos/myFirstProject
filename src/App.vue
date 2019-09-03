<template>
	<div id="app">
		<form class="orderForm">
            <orderFormNomenclature
                class="orderForm__nomenclature"
                :arrCustomers="arrCustomers"
                :dishes="dishes"
                @select="getNomenclature"
            ></orderFormNomenclature>
            <orderFormResult class="orderForm__result" 
                @send-data="loadToServer"
                :selectedIdProducts="selectedNomenclature.selectedProducts"
                :selectedIdCustomer="selectedNomenclature.selectedCustomer"
                :dishes="dishes"
                :arrCustomers="arrCustomers"
            ></orderFormResult>
            <el-button class="orderForm__btn-remove el-icon-arrow-right" type="button" @click.prevent="onBtnRemoveClick()"></el-button>
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
            onBtnRemoveClick: function () {
                if (this.selectedNomenclature.selectedProducts) {
                    this.$children[1].changeProducts();
                }
            },
            getNomenclature: function (obj) {
                return this.selectedNomenclature = obj;
            },
            loadToServer: function (data) {
                onSubmitClick(data);
            }
		}
	}

	var SERV_IP = 'http://127.0.0.0';
	var PORT = '8080';
	var SAVE_ORDER = 'order';

	var NAME = ['Вася', 'Коля', 'Миша', 'Алексей', 'Иван', 'Григорий', 'Андрей'];
	var SURNAME = ['Пупкин', 'Иванович', 'Никифоров', 'Тимофеев'];
	var COUTN_DISHES = 8;
	var COOCING = ['meat', 'chiken', 'rice', 'patatos', 'kebab'];
	
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
            alert('Запрос выполнен с запросом JSON', data);
		})
		.catch(function (error) {
            alert('Запрос не выполнен', error);
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
