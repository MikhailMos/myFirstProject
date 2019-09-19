<template>
  <div id="app">
    <section v-if="errored">
        <p class="error-message">Извините, не удается получить данные, попробуйте обновить страницу чуть позже.</p>
    </section>
    
    <form ref="form" class="orderForm">
        <orderFormNomenclature
            class="orderForm__nomenclature"
            :arrCustomers="arrCustomers"
            :dishes="dishes"
            @select="getNomenclature"
        ></orderFormNomenclature>

        <orderFormResult class="orderForm__result" 
            @send-data="loadToServer"
            :arrProducts="sendDishes"
            :selectedIdCustomer="selectedNomenclature.selectedCustomer"
            :arrCustomers="arrCustomers"
        ></orderFormResult>
        <el-button class="orderForm__btn-remove el-icon-arrow-right" type="button" @click.prevent="onBtnCopyToResultClick()"></el-button>
    </form>
   
  </div>
</template>

<script>
    import dataDishes from './api/dataDishes.js'
    import dataCustomers from './api/dataCustomers.js'

    import orderFormNomenclature from './components/orderFormNomenclature.vue'
    import orderFormResult from './components/orderFormResult.vue'

    export default {
        name: 'app',
        data () {
            return {
                arrCustomers: null,
                dishes: null,
                errored: false,
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

            this.getData()
        },
        methods: {
            onBtnCopyToResultClick: function () {
                if (this.selectedNomenclature.selectedProducts) {
                    this.sendDishes.push(this.selectedNomenclature.selectedProducts);
                }
            },

            getNomenclature: function (obj) {
                return this.selectedNomenclature = obj;
            },

            loadToServer: function (data) {
                onSubmitClick(data);
            },

            getData: function () {
                fetch(SERV_IP + ':' + PORT + '/' + SAVE_ORDER)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return Promise.reject({status: response.status, data});
                        }
                    })
                    .then(result => {
                        this.dishes = result;
                    })
                    .catch(error => {
                        console.log('error:', error);
                        this.errored = true;
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
	const PORT = '9876';
	const SAVE_ORDER = 'getKDS_bydishes';

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

    .orderForm__btn-remove {
        align-self: center;
    }

    .error-message {
        padding: 20px 0;
        color: #ffffff;
        background-color: rgba(255, 0, 0, 0.7);
        text-align: center;
        border-radius: 5px;
    }
</style>
