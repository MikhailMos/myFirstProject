<template>
    <div class="nomenclature-section">
        <el-select v-model="selectedCustomer" placeholder="Выберите покупателя" @change="selectedNomenclature()"  name="customers" id="customers" class="nomenclature__customers" >
            <el-option v-for="item in arrCustomers"
                    v-if="!item.isDeleted"
                    :key="item.id" 
                    :value="item.id"
                    :label="item.name + ' ' + item.surname"
            ></el-option>
        </el-select>
        <el-select v-model="selectedProducts" 
                    placeholder="Выберите блюдо" 
                    @change="selectedNomenclature()" 
                    name="products" id="products" 
                    class="nomenclature__products" multiple>
            <el-option v-for="(item, index) in dishes"
                    v-if="!item.deleted"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: 'orderFormNomenclature',
        data () {
            return {
                selectedCustomer: '',
                selectedProducts: []
            }
        },
        props: {
            arrCustomers: Array,
            dishes: Array
        },
        methods: {
            selectedNomenclature: function () {
                this.$emit('select', 
                    { 
                        selectedCustomer: this.selectedCustomer,
                        selectedProducts: ((this.selectedProducts) ? this.selectedProducts : [])
                    }
                );
            }
        }
    }
</script>

<style scoped>
    .nomenclature-section {
        display: flex;
        flex-direction: column;
    }

    .nomenclature__customers {
        margin-bottom: 10px;
    }

    .lists__products {
        flex-grow: 1;
    }
</style>