<template>
<BasicLayout>
  <h1> Estamos en login</h1>

  <router-link to="/register">Crear una cuenta</router-link>
</BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout"
export default {
    name:"Login",
    components:{
        BasicLayout,
    }
}
</script>

<style>

</style>