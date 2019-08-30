<template>
    <div class="result-section">
        <select class="result-section__list" name="resultOrder" id="resultOrder" multiple
                v-model="selectedProductsForDel"
                @keyup.delete="delOption"
        >
            <option v-for="(item, index) in resProducts"
                    :key="index"
                    :value="item"                    
            >{{ item.name }}</option>
        </select>
        <p class="result-section__sumStr">Сумма: {{ changeSum() }} руб.</p>
        <div class="wrapper_btn">
            <button class="result-section__submit" type="submit" 
                @click.prevent="submit"
                @keyup.enter.prevent="submit"
            >Отправить</button>
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
            selectedCustomer: Object,
            selectedProducts: Array
        },
        methods: {
            changeProducts: function () {
                if (this.selectedProducts) {
                        
                    Array.prototype.push.apply(this.resProducts, 
                        this.selectedProducts
                    );  
                    
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

               if (!this.selectedCustomer || !this.selectedCustomer.id) {
                    textError = 'Клиент не выбран.';
                }
               
               if (this.resProducts.length === 0) {
                   textError = (textError.length > 0) ? (textError + '\n' + 'Продукт не выбран.') : 'Продукт не выбран.';
               }

                if (textError) {
                   alert(textError);
               } else {
                   var data = new ObjPOST(this.selectedCustomer, this.resProducts, this.sumProducts);
                   this.$emit('send-data', data);
               } 
            }
        }
    }

    var ORGANIZATION_GUID = '00000000-0000-0000-0000-000000000000';
	var COMMENT_FROM_ORDER = 'test';
    var PERSON_COUNT = 1;
    
    var getRandom = function (min, max) {
		return Math.floor(Math.random() * (max - min) + min);
    }
    
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