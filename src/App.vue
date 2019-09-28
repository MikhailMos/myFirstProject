<template>
  <div id="app">
    <section v-if="errored">
        <p class="error-message">{{ this.errorMessage }}</p>
    </section>
    
    <form ref="form" class="orderForm">
        <orderFormNomenclature
            class="orderForm__nomenclature"
            :arrCustomers="arrCustomers"
            :dishes="dishes"
            :groups="grpDishes"
            @select="getNomenclature"
        ></orderFormNomenclature>

        <orderFormResult class="orderForm__result" 
            @send-data="loadToServer"
            :arrProducts="sendDishes"
            :selectedIdCustomer="selectedNomenclature.selectedCustomer"
            :arrCustomers="arrCustomers"
        ></orderFormResult>
    </form>
   
  </div>
</template>

<script>
    // import dataDishes from './api/dataDishes.js'
    import dataCustomers from './api/dataCustomers.js'

    import orderFormNomenclature from './components/orderFormNomenclature.vue'
    import orderFormResult from './components/orderFormResult.vue'

    export default {
        name: 'app',
        data () {
            return {
                arrCustomers: null,
                grpDishes: null,
                dishes: null,
                errored: false,
                errorMessage: '',
                selectedNomenclature: {},
                sendDishes: []
            }
		},
		components: {
            orderFormNomenclature,
            orderFormResult
		},
		created () {
            // load MOK-data
            // dataDishes.getProducts(dish => {
            //     this.dishes = dish;
            // }),
            dataCustomers.getCustomers(customer => {
                this.arrCustomers = customer;
            }),
           
           this.getData('https://data-sibers.firebaseio.com/dish-group/productgroups.json', 'GRP_DISH')
           this.getData('https://data-sibers.firebaseio.com/dish-arr/0/dishes.json', 'DISH')

            // this.getData(SERV_IP + ':' + PORT + '/' + PATH_DISHES, 'grp_dishes')
            // this.getData(SERV_IP + ':' + PORT + '/' + PATH_DISHES, 'dishes')
            // this.getData(SERV_IP + ':' + PORT + '/' + PATH_CUSTOMERS, 'customers')
        },
        
        methods: {          

            getNomenclature: function (obj) {
                this.selectedNomenclature = obj;

                if (this.selectedNomenclature.selectedProducts) {
                    return this.sendDishes.push(this.selectedNomenclature.selectedProducts);
                }
            },

            loadToServer: function (data) {
                onSubmitClick(data);
            },

            getData: function (_url, flag) {
                let who = '';
                if (flag === 'GRP_DISH') {
                    who = 'группам Блюд';
                } else if (flag === 'GRP_DISH') {
                    who = 'Блюдам';
                } else {
                    who = 'Покупателям';
                }
                             
                fetch(_url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return Promise.reject({status: response.status, response});
                        }
                    })
                    .then(result => {
                        if (flag === 'GRP_DISH') {
                            let arr = [];
                            result.forEach(item => {
                                if (!item.deleted) {
                                    arr.push(item);
                                }
                            })
                            this.grpDishes = arr;
                            console.log(arr[0]);
                        } else if (flag === 'DISH') {
                            let arr = [];
                            result.forEach(item => {
                                if (item.type === flag && !item.deleted) {
                                    arr.push(item);
                                }
                            })
                            this.dishes = arr;
                            console.log(arr[0]);
                        } else {
                            this.arrCustomers = result;
                        }
                    })
                    .catch( () => {
                        this.errored = true;
                        this.errorMessage = 'Извините, не удается получить данные по ' + who + ', попробуйте обновить страницу чуть позже.';
                    })

                // axios
                //     .get(SERV_IP + ':' + PORT + '/' + SAVE_ORDER)
                //     .then(response => {
                //         console.log(response)
                //         if (response.status === 200) {
                //             this.dishes = response.data;
                //         } else {
                //             return Promise.reject({status: response.status, data});
                //         }
                //     })
                //     .catch(error => {
                //         console.log(error)
                //         this.errored = true;
                //     });
            }

        }
    }

    const SERV_IP = 'http://x.ksh.ru';
	const PORT = '2222';
	const PATH_DISHES = 'get_dishes2';
    const PATH_CUSTOMERS = 'getKDS_bycustomers';
    const SAVE_ORDER = 'save_order';

    // const axios = require('axios').default;
    
	const onSubmitClick = function (dataForm) {

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

    .orderForm__btn-copy {
        margin-left: 5px !important;
        margin-right: 5px !important;
        align-self: center;
    }

    .error-message {
        padding: 20px 0;
        font-size: 22px;
        color: #ffffff;
        background-color: rgba(255, 0, 0, 0.7);
        text-align: center;
        border-radius: 5px;
    }
</style>
