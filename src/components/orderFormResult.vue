<template>
    <div class="result-section">
        <ul class="result-section__list list">
            <li v-for="(item, index) in addItem"
                    :key="index"
                    :value="item"
                    class="list__item" 
            >
                {{ item.name }} кол-во: {{ item.count }}

                <el-input-number size="mini" v-model="item.count" :min="1" :max="99"></el-input-number>

                <el-button type="danger" icon="el-icon-delete" circle
                    class="btn btn__delete"
                    @click="delOption(item)"></el-button>                
            </li>
        </ul>
        <p class="result-section__sumStr">Сумма: {{ changeSum }} руб.</p>
        <div class="wrapper_btn">
            <el-button class="result-section__submit" type="primary" 
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
                dishes: [],
                sumProducts: Number
            }
        },
        props: {
            selectedIdCustomer: '',
            selectProduct: null,
            arrCustomers: null
        },
        computed: {
            addItem () {

                if (this.selectProduct) {
                    let itemIndex = this.dishes.indexOf(this.selectProduct);
                    // //делаем копию объекта
                    // let copyItem = Object.assign({}, this.selectProduct);

                    if (itemIndex === -1) {
                        this.dishes.push(this.selectProduct);                        
                    } else {
                        this.dishes[itemIndex].count++;
                    }
                    this.$emit('clearSelectProduct');

                    // return this.dishes;
                }
                
                return this.dishes;
            },
            changeSum () {
                let sum = 0;
                if (this.dishes.length) {
                    this.dishes.forEach(el => { sum += (el.defaultSalePrice * el.count) });
                }
                this.sumProducts = sum;
                return this.sumProducts;
            }
        },
        methods: {
            delOption (item) {
                let i = this.dishes.indexOf(item);
                if (i !== -1) {
                    // присваиваем значение по умолчанию
                    this.dishes[i].count = 1;
                    this.dishes.splice(i, 1);
                }

            },
            submit () {
               //проверка на заполненность
               var textError = {
                   errCustomer: '',
                   errDish: ''
               };

               if (!this.selectedIdCustomer) {
                    textError.errCustomer = 'Клиент не выбран!';
                }
               
               if (this.dishes.length === 0) {
                   textError.errDish = 'Продукт не выбран!';
               }

                if (textError.errCustomer || textError.errDish) {
                    if (textError.errCustomer) {
                        this.openMessage(textError.errCustomer);
                    }
                    if (textError.errDish) {
                        this.openMessage(textError.errDish);
                    }
               } else {
                   let currentCustomer = this.arrCustomers.find(el => el.id === this.selectedIdCustomer);
                   let data = new ObjPOST(currentCustomer, this.dishes, this.sumProducts, this.getRandom(0, 10000));
                   this.$emit('send-data', data);
               } 
            },
            openMessage (msg) {
                this.$notify.error({
                    title: 'Ошибка',
                    message: msg
                });
            }
        }
    }

    var ORGANIZATION_GUID = '00000000-0000-0000-0000-000000000000';
	var COMMENT_FROM_ORDER = 'test';
    var PERSON_COUNT = 1;
    
    var getProductsForData = function (arr) {
        var res = [];
        arr.forEach(function (item, index, thisArray) {
            if (!res.find(el => el.id === item.id)) {
                res.push(
                    {
                        "id": item.id,
                        "amount": item.count,
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
        margin: 0;
        padding: 0;        
        color: #606266;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        outline: 0;
        flex-grow: 1;
    }

    .result-section__list:hover {
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }

    .result-section__list:hover {
        border-color: #C0C4CC;
    }

    /* .result-section__list:focus {
        border-color: #409EFF;
    } */

    .list {
        list-style: none;
        font-family: 'Times New Roman', Times, sans-serif;
        font-size: 14px;
    }

    .list__item {
        margin: 0px 5px;
        padding: 5px 20px;
        border-radius: 4px;
        /* cursor: pointer; */
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .list__item:hover,
    .list__item--focus {
        font-size: 16px;
        color: #409EFF;
        background-color: #F5F7FA;
    }

    /* .btn__delete {
        display: none;
    }

    .list__item:hover .btn__delete {
        display: block;
    } */

    .result-section__sumStr,
    .wrapper_btn {
        text-align: right;
    }
</style>