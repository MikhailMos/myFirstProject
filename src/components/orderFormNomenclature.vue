<template>
    <div class="nomenclature-section">
        <select name="customers" id="customers" class="nomenclature__customers">
            <option value=""></option>
        </select>
        <select name="products" id="products" class="nomenclature__products" multiple="multiple">
            <option value=""></option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'orderFormNomenclature'
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