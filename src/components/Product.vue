<template>
    <div class="ui card product"> 
        <div class="image"> 
            <img :src="API_URL + product.image.url" :alt="product.name" />
        </div>
        <div class="content">
            <div class="header">{{ product.name }}</div>
            <div class="description"> {{ product.price }} € </div>
        </div>
        <div class="ui button primary" v-on:click="showAlert" @click="addProductCart(product.id)"> Buy </div>
    </div>
</template>

<script>
import { API_URL } from "../utils/constants"
import { addProductCartApi } from "../api/cart"
import Swal from 'sweetalert2'

export default {
    name: "Product",
    props:{
        product: Object
    },
    setup(props) {

    const Swal = require('sweetalert2')

    const  showAlert = () =>{
    Swal.fire({
    icon: 'success',
    title: 'Product Add',
    showConfirmButton: false,
    timer:1000
    })
    };

        // console.log(props.product)
        const addProductCart = (idProduct) =>{
            addProductCartApi(idProduct)
        };

        return {
            API_URL,
            addProductCart,
            showAlert,
        };
    },
};
</script>

<style lang="scss" scoped>
.product {
    &:hover{
        .ui.button{
        min-height: 36px;
        }
    }

    .ui.button {
        max-height: 0;
        min-height: 0;
        overflow: hidden;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: min-height 0.6s ease;
    }
}
</style>