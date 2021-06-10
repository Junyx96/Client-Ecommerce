<template>
<BasicLayout>
    <h1>My Orders</h1>
    <h3 v-if="!orders">You don´t have orders</h3>
    <template v-if="orders"> 
        <div id="Orders">
        <button @click="makePDF">Dowload</button>
        <div class="order" v-for="order in orders" :key="order.id">
            <div class="header">
                <span class="date">{{ formDate(order.created_at)}}</span>
                <p>ID: {{order.id}}</p>
                <p>Total: {{order.totalPayment}} €</p>
            </div>
            <div class="products">
                <div class="product" v-for="product in order.data" :key="product.id">
                    <div>
                        <img 
                        class="ui image" 
                        :src="API_URL + product.image.url" 
                        :alt="product.name" />
                        <p>{{product.name}}</p>
                    </div>
                    <div>{{product.quantity}} x {{product.price}} €</div>
                </div>
            </div>
        </div>
        </div>
    </template>
</BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue"
import jwtDecode from "jwt-decode"
import moment from "moment"
import BasicLayout from "../layouts/BasicLayout"
import { getOrders } from "../api/order"
import { getTokenApi } from "../api/token"
import { API_URL } from "../utils/constants"

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
name: "Orders",
components: {
    BasicLayout,
},
methods: {
    makePDF() {
        window.html2canvas = html2canvas;
        var doc = new jsPDF("p", "pt", "a2");
        doc.html(document.querySelector("#Orders"), {
            callback: function(pdf) {
                pdf.save("myReceipt");
            }
        })
    }
},
setup() {
    let orders = ref(null);

    onMounted(async () => {
        const token = getTokenApi();
        const {id} = jwtDecode(token);
        const response = await getOrders(id);
        orders.value = response

        // console.log(response)
    });
        const formDate = (date) =>{
        return moment(date).format("L [at] LT")
        }
    return {
        orders,
        formDate,
        API_URL
    };
},
};
</script>

<style lang="scss" scoped>

#Orders{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: end;
    color: #2c3e50;
    margin-top: 0px;
    button{
        background-color: #41b883;
        color: #fff;
    }
}


.order{
    border: 1px solid #000;
    margin-bottom: 20px;
    margin-top: 40px;

    .header {
        background-color: #41b883;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;

        p {
            margin: 0;
        }

        span {
            position: relative;
            top: -30px;
            left: 0;
            font-size: 12px;
        }
    }

    .products {
        border-top: 1px solid #000;

        .product {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 30px;

            > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
        .ui.image {
            width: 100px;
        }
    }
}

</style>