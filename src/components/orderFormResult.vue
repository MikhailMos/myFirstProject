<template>
  <div class="result-section">
    <ul class="result-section__list list">
      <li v-for="(item, index) in addItem" :key="index" :value="item" class="list__item">
        {{ item.name }} кол-во: {{ item.count }}
        <el-input-number size="mini" v-model="item.count" :min="1" :max="99" class="list__input-number"></el-input-number>

        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          class="btn btn__delete"
          @click="delOption(item)"
        ></el-button>
      </li>
    </ul>
    <p class="result-section__sumStr">Сумма: {{ changeSum }} руб.</p>
    <div class="wrapper_btn">
      <el-button
        class="result-section__submit"
        type="primary"
        @click.prevent="submit"
        @keyup.enter.prevent="submit"
      >Отправить</el-button>
    </div>
  </div>
</template>

<script>
  import backend from '../api/backend.js';

  export default {
    name: "orderFormResult",
    data() {
      return {
        dishes: [],
        sumProducts: Number,
        hasError: false
      };
    },
    props: {
      selectedIdCustomer: String,
      selectProduct: Object,
      arrCustomers: Array
    },
    computed: {
      addItem() {
        if (this.selectProduct) {
          let itemIndex = this.dishes.indexOf(this.selectProduct);
          // //делаем копию объекта
          // let copyItem = Object.assign({}, this.selectProduct);

          if (itemIndex === -1) {
            this.dishes.push(this.selectProduct);
          } else {
            this.dishes[itemIndex].count++;
          }
          this.$emit("clearSelectProduct");
        }

        return this.dishes;
      },
      changeSum() {
        let sum = 0;
        if (this.dishes.length) {
          this.dishes.forEach(el => {
            sum += el.defaultSalePrice * el.count;
          });
        }
        this.sumProducts = sum;
        return this.sumProducts;
      }
    },
    methods: {

      delOption(item) {
        let i = this.dishes.indexOf(item);
        if (i !== -1) {
          // присваиваем значение по умолчанию
          this.dishes[i].count = 1;
          this.dishes.splice(i, 1);
        }
      },
      submit() {
        //проверка на заполненность

        if (!this.selectedIdCustomer) {
          this.openMessage(NO_SELECTED_CUSTOMER);
          this.hasError = true;
        } else {
          this.hasError = false;
        }

        if (this.dishes.length === 0) {
          this.openMessage(NO_SELECTED_DISHES);
          this.hasError = true;
        } else {
          this.hasError = false;
        }

        if (!this.hasError) {
          let currentCustomer = this.arrCustomers.find(
            el => el.id === this.selectedIdCustomer
          );
          let data = new backend.ObjPOST(
            currentCustomer,
            this.dishes,
            this.sumProducts,
            this.getRandom(0, 10000)
          );
          this.$emit("send-data", data);
        }
      },
      openMessage(msg) {
        this.$notify.error({
          title: "Ошибка",
          message: msg
        });
      }
    }
  };

  const NO_SELECTED_CUSTOMER = "Клиент не выбран!";
  const NO_SELECTED_DISHES = "Продукт не выбран!";
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
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    outline: 0;
    flex-grow: 1;
  }

  .result-section__list:hover {
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .result-section__list:hover {
    border-color: #c0c4cc;
  }

  .list {
    list-style: none;
    font-family: "Times New Roman", Times, sans-serif;
    font-size: 14px;
  }

  .list__item {
    margin: 0px 5px;
    padding: 5px 20px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list__item:hover,
  .list__item--focus {
    color: #409eff;
    background-color: #f5f7fa;
  }

  .result-section__sumStr,
  .wrapper_btn {
    text-align: right;
  }

  .list__input-number {
    margin-left: auto;
    margin-right: 10px;
  }
</style>
