<template>
    <BasicLayout>
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "../layouts/BasicLayout";
import Product from "../components/Product"
import { getProductsCategory } from "../api/product";

export default {
    name: "Category",
    components: {
        BasicLayout,
        Product,
    },
    watch: {
        $route(to, from){
            // console.log(to.params.category);
            // console.log("Ruta cambiada");
            this.getProduts(to.params.category);
        },
    },
    setup() {
        let products = ref(null);
        const {params} = useRoute();

        onMounted(async () => {
            getProduts(params.category)
        });

        const getProduts = async (category) => {
            const response = await getProductsCategory(category);
            products.value = response;
            // console.log(response);
        }
        return {
            getProduts, 
            products 
            };
    },
};
</script>

<style>

</style>