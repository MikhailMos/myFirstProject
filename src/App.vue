<template>
  <div id="app">
    <form class="orderForm" action="" method="POST">
      <orderFormNomenclature class="orderForm__nomenclature"></orderFormNomenclature>
      <orderFormResult class="orderForm__result"></orderFormResult>
      <button class="orderForm__btn-remove">&#8594;</button>
    </form>
  </div>
</template>

<script>
  import orderFormNomenclature from './components/orderFormNomenclature.vue';
  import orderFormResult from './components/orderFormResult.vue'

  export default {
    name: 'app',
    components: {
      orderFormNomenclature,
      orderFormResult
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* margin-top: 60px; */
  }

  .orderForm {
      padding: 10px;
      min-height: 200px;
      border: 1px solid black;
      
      display: flex;
      justify-content: space-between;
  }

  .orderForm__nomenclature,
  .orderForm__result {
      width: 48%;
  }

  .orderForm__result {
      order: 1;
  }

  .orderForm__btn-remove {
      align-self: center;
  }
</style>
