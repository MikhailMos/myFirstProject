<template>
    <div class="result-section">
        <select class="result-section__list" name="resultOrder" id="resultOrder" multiple
                v-model="selectedProductsForDel"
                @keyup.delete="delOption"
        >
            <option v-for="item in changeProducts()"
                    :key="item.id"
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
                selectedProductsForDel: [],
                selectedProducts: []
            }
        },
        methods: {
            changeProducts: function () {
                if (this.selectedProducts) {
                    if (this.resProducts) {
                        var noHas = this.selectedProducts.filter(el => {
                            return this.resProducts.indexOf(el) === -1;
                        });
                    }
                        
                    Array.prototype.push.apply(this.resProducts, 
                        (this.resProducts ? noHas : this.selectedProducts)
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
               
               if (this.resProducts.length === 0) {
                   textError = 'Продукт не выбран.';
               }

                if (textError) {
                   alert(textError);
               } else {
                   this.$emit('send-data', this.resProducts, this.sumProducts);
               } 
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