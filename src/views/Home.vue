<template>
  <BasicLayout>
      <div v-if="!login" class="cart-header">
        <h1>Welcome to your E-commerce</h1>
        <p>Our website offers many products you can buy in just a click</p>
      </div>
    <h1>Latest Products</h1>
    <div class="ui grid"> 
      <div 
      class="Sixten wide mobile eight wide tablet four wide computer column"
      v-for="product in products"
      :key="product.id"
      >
        <Product :product="product" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue"
import BasicLayout from "../layouts/BasicLayout"
import { getProducts } from "../api/product";
import Product from "../components/Product"
export default {
  name: 'Home',
  components: {
    BasicLayout,
    Product,
  },
  setup() {
    let products = ref(null);

    onMounted(async () =>{
      const response = await getProducts(20);
      // console.log(response)
      products.value = response
    });

    return{
      products,
    };
  },
};
</script>

<style lang="scss" scoped>
  .cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    border-bottom: 1px solid #000;
    padding: 10px 100px;
    color: #41b883;
}
</style>