<template>
    <div class="basic-layout">
    <Menu/>
    <!-- El elemento Slot sera sustituido por el componente que le enviemos al laoyout -->
       <div class="ui container">
        <slot />
       </div>
    </div>

    <Cart />
</template>

<script>
import Menu from "../components/Menu";
import Cart from "../components/Cart/Cart";

export default {
    name:"BasicLayout",
    components:{
        Menu,
        Cart,
    },
};
</script>

<style >

</style>