<template>
    <div class="nomenclature-section">
        <select v-model="selectedCustomer" @change="selectedNomenclature()"  name="customers" id="customers" class="nomenclature__customers" >
            <option value="0" disabled selected>Выберите покупателя...</option>
            <option v-for="(item, index) in arrCustomers"
                    v-if="!item.isDeleted"
                    :key="index" 
                    :value="item"
            >{{ item.name + ' ' + item.surname }}</option>
        </select>
        <select v-model="selectedProducts" @change="selectedNomenclature()" name="products" id="products" class="nomenclature__products" multiple>
            <option v-for="(item, index) in dishes"
                    v-if="!item.deleted"
                    :key="index"
                    :value="item"
            >{{ item.name }}</option>
        </select>
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
                        selectedCustomer: ((this.selectedCustomer) ? this.selectedCustomer : {}),
                        selectedProducts: ((this.selectedProducts) ? this.selectedProducts : {})
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

    .nomenclature__products {
        flex-grow: 1;
    }

    .lists__products {
        flex-grow: 1;
    }
</style>