<template>
  <div class="nomenclature-section">
    <el-select
      v-model="selectedCustomer"
      placeholder="Выберите покупателя"
      @change="selectedNomenclature()"
      name="customers"
      id="customers"
      class="nomenclature__customers"
    >
      <el-option
        v-for="item in arrCustomers"
        v-show="!item.isDeleted"
        :key="item.id"
        :value="item.id"
        :label="`${item.name} ${item.surname}`"
      ></el-option>
    </el-select>
    <div class="nomenclature__products products">
      <el-tabs tab-position="left" style="min-height: 200px; min-weight: 50px;">
        <el-tab-pane v-for="group in groups" :key="group.id" :label="group.name">
          <ul class="products__list">
            <li
              v-for="(item, index) in dishes"
              v-show="item.grp_id === group.id"
              :key="index"
              :value="item"
              @click="selectedNomenclature(item)"
              class="products__item"
            >{{ item.name }} - цена {{ item.defaultSalePrice }}₽</li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderFormNomenclature",
    data() {
      return {
        selectedCustomer: "",
        selectedProducts: {}
      };
    },
    props: {
      arrCustomers: Array,
      groups: Array,
      dishes: Array
    },
    methods: {
      selectedNomenclature(item) {
        this.selectedProducts = item ? item : null;
        this.$emit("select", {
          selectedCustomer: this.selectedCustomer,
          selectedProducts: this.selectedProducts
        });
      }
    }
  };
</script>

<style scoped>
  .nomenclature-section {
    display: flex;
    flex-direction: column;
  }

  .nomenclature__customers {
    margin-bottom: 10px;
  }

  .nomenclature__products {
    font-family: "Times New Roman", Times, sans-serif;
    font-size: 14px;
    color: #606266;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    flex-grow: 1;
  }

  .nomenclature__products:hover {
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .nomenclature__products:hover {
    border-color: #c0c4cc;
  }

  .products,
  .products__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .products__item {
    margin: 5px;
    padding: 5px 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  .products__item:hover {
    color: #409eff;
    background-color: #f5f7fa;
  }

</style>
