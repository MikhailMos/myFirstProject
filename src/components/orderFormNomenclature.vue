<template>
    <div class="nomenclature-section">
        <select v-model="selectedCustomer" @change="selectedNomenclature()"  name="customers" id="customers" class="nomenclature__customers" >
            <!-- <option disabled selected>Выбирите покупателя...</option> -->
            <option v-for="item in arrCustomers" 
                    :key="item.id" 
                    :value="item"
            >{{ item.name + ' ' + item.surname }}</option>
        </select>
        <select v-model="selectedProducts" @change="selectedNomenclature()" name="products" id="products" class="nomenclature__products" multiple>
            <option v-for="item in dishes"
                    :key="item.id"
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
                this.$emit('select', { selectedCustomer: this.selectedCustomer, selectedProducts: this.selectedProducts });
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