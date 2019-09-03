<template>
    <div class="result-section">
        <el-select class="result-section__list"
                name="resultOrder"
                id="resultOrder"
                placeholder=""
                multiple
                v-model="selectedProductsForDel"
                @keyup.delete="delOption"
        >
            <el-option v-for="(item, index) in resProducts"
                    :key="index"
                    :value="item.id"
                    :label="item.name"                    
            ></el-option>
        </el-select>
        <p class="result-section__sumStr">Сумма: {{ changeSum() }} руб.</p>
        <div class="wrapper_btn">
            <el-button class="result-section__submit" type="submit" 
                @click.prevent="submit"
                @keyup.enter.prevent="submit"
            >Отправить</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'orderFormResult',
        data () {
            return {
                sumProducts: Number,
                resProducts: [],
                selectedProductsForDel: []
            }
        },
        props: {
            selectedIdCustomer: String,
            selectedIdProducts: Array,
            dishes: Array,
            arrCustomers: Array
        },
        methods: {
            changeProducts: function () {
                if (this.selectedIdProducts) {
                    this.selectedIdProducts.forEach(id => {
                        var tempItem = this.dishes.find(item => item.id === id);
                        if (tempItem) {
                            this.resProducts.push(tempItem);
                        }
                    })
                        
                    this.changeSum();
                }

                return this.resProducts;
            },
            changeSum: function () {
                if (this.resProducts) {
                    var sum = 0;
                    this.resProducts.forEach(function (element) {                    
                        sum += element.cost;
                    });
                } else { sum = 0 }
                this.sumProducts = sum;
                return this.sumProducts;
            },
            delOption: function () {
                return this.resProducts = this.resProducts.filter(el => {
                    return this.selectedProductsForDel.indexOf(el) === -1;
                });
            },
            submit: function () {
               //проверка на заполненность
               var textError = '';

               if (!this.selectedIdCustomer) {
                    textError = 'Клиент не выбран.';
                }
               
               if (this.resProducts.length === 0) {
                   textError = (textError.length > 0) ? (textError + '\n' + 'Продукт не выбран.') : 'Продукт не выбран.';
               }

                if (textError) {
                   alert(textError);
               } else {
                   var currentCustomer = this.arrCustomers.find(el => el.id === this.selectedIdCustomer);
                   var data = new ObjPOST(currentCustomer, this.resProducts, this.sumProducts, this.getRandom(0, 10000));
                   this.$emit('send-data', data);
               } 
            }
        }
    }

    var ORGANIZATION_GUID = '00000000-0000-0000-0000-000000000000';
	var COMMENT_FROM_ORDER = 'test';
    var PERSON_COUNT = 1;
    
    var getAmount = function (id, arr) {
        return arr.filter(el => el.id === id).length;
    }

    var getProductsForData = function (arr) {
        var res = [];
        arr.forEach(function (item, index, thisArray) {
            var amount = getAmount(item.id, thisArray);
            if (!res.find(el => el.id === item.id)) {
                res.push(
                    {
                        "id": item.id,
                        "amount": amount,
                        "modifiers": []
                    }
                );
            }
        });
        return res;
    }

    var getDateToStr = function () {
		var date = new Date();
		var dateStr = date.toISOString().replace('T', ' ');
		return dateStr.substring(0, dateStr.length - 5);
	}

    var ObjPOST = function (customer, products, sum, idOrder) {
        return {
            "organization": ORGANIZATION_GUID,
            "customer": {
                "id": customer.id,
                "name": customer.name,
                "surName": customer.surname,
                "phone": customer.phone
            },
            "order": {
                "id": "" + idOrder,
                "externalId": "0000000000000000000000000",
                "date": getDateToStr(),
                "phone": customer.phone,
                "items": getProductsForData(products),
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
</script>

<style scoped>
    .result-section {
        display: flex;
        flex-direction: column;
    }

    .result-section__list {
        flex-grow: 1;
    }
    .result-section__sumStr,
    .wrapper_btn {
        text-align: right;
    }
</style>