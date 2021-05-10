<template>
    <div class="basic-layout">
    <Menu/>

    <!-- El elemento Slot sera sustituido por el componente que le enviemos al laoyout -->
       <div class="ui container">
        <slot />
       </div>
    </div>
</template>

<script>
import Menu from "../components/Menu"
export default {
    name:"BasicLayout",
    components:{
        Menu,
    }
}
</script>

<style >

</style>