<template>
<div>
    <div class="container my-2">
        <h1 class="my-4 leading"> Products Settings</h1>
        <b-overlay :show="tableloading" rounded="sm">
            <div class="row my-4 mx-2">
                <div class="col-md-12 p-4">
                    <div class="shadow-lg mb-5 row">
                        <div class="col-md-6 my-2 p-2" v-for="(product, index) in productlist" :key="index">
                           <Productblock :dataobj="product" />      
                        </div>

                    </div>

                </div>
            </div> 
        </b-overlay>              
    </div>
</div>
</template>
<script>
import Productblock from '~/components/dashboard/Productblock'
export default {
    layout: "dashboard",
    middleware: 'auth',
    data () {
        return  {
            tableloading: false,
            productlist: null,
            status: null,
            statuslist: [
                { value: '0', text: "Deactivate" },
                { value: '1', text: "Activate" }
            ]
        }
    },
    components: {
        Productblock
    },
    async asyncData({ $axios }) {
        const products = await $axios.$post(`${process.env.baseUrl}admin/products/list`)
      return { productlist: products.product }
    },
    created() {
        this.$nuxt.$on('customevent', () => {
            this.$nuxt.refresh()
        })
    }
}
</script>