<template>
    <div class="result-section">
        <select class="result-section__list" name="resultOrder" id="resultOrder" multiple="multiple"></select>
        <p class="result-section__sumStr">Сумма: {{ resultSum }} руб.</p>
        <div class="wrapper_btn">
            <button class="result-section__submit" type="submit">Отправить</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'orderFormResult',
        data () {
            return {
                resultSum: 0
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