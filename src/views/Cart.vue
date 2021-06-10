<template>
<BasicLayout>
    <h1>Cart</h1>
    <table class="ui celled table" v-if="products">
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.price }} €</td>
                <td style="text-align: center">
                    <i class="close icon" v-on:click="showAlert" @click="deleteAllProductCart(product.id)"></i>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Total: </td>
                <td colspan="2">{{getTotal()}} €</td>
            </tr>
        </tbody>
    </table>

    <button class="ui button primary fluid" @click="createOrder" v-if="products">
        Generate Order
    </button>
    <h3 v-if="!products">You have no items in your shopping cart</h3>
</BasicLayout>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router"
import jwtDecode from "jwt-decode";
import BasicLayout from "../layouts/BasicLayout";
import { getProductsCartApi, deleteAllProductCartApi, deleteCartApi } from "../api/cart";
import { createOrderApi } from "../api/order"
import { getTokenApi } from "../api/token"
import Swal from 'sweetalert2';

export default {
name: "Cart",
components: {
    BasicLayout,
},
setup()  {
    let products = ref(null);
    let reloadCart = ref(false);
    const router = useRouter();

    const Swal = require('sweetalert2')

    const  showAlert = () =>{
    Swal.fire({
    icon: 'error',
    title: 'Delete Item',
    showConfirmButton: false,
    })
    };

    watchEffect(async () => {
        reloadCart.value;
        const response = await getProductsCartApi();
        // console.log(response);
        products.value = response;
    });

    const getTotal = () => {
        let totalTemp = 0;

        products.value.forEach((product) => {
            totalTemp += product.price * product.quantity
        });
        return totalTemp.toFixed(2);
    };

    const  deleteAllProductCart = (idProduct) =>{
        deleteAllProductCartApi(idProduct);
        reloadCart.value = !reloadCart.value;
    };

    const createOrder = async () => {
        const token = getTokenApi(); 
        const {id} = jwtDecode(token);
        // console.log(id);
        
        const data = {
            user: id,
            totalPayment: getTotal(),
            data: products.value,
        };

        // console.log(data);
        try {
            const response = await createOrderApi(data);
            deleteCartApi();
            router.push("/orders");
            // console.log("order created")
        } catch (error) {
            console.log(error);
        };
    };

    return {
        products,
        getTotal,
        deleteAllProductCart,
        createOrder,
        showAlert,
    };
},
};
</script>

<style>

</style>