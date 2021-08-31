<template>
<div>
    <div class="container my-2">
        <h1 class="my-4 leading"> KYC Settings</h1>
        <b-overlay :show="tableloading" rounded="sm">
            <div class="row my-4 mx-2">
                <div class="col-md-12 p-4">
                    <div class="shadow-lg mb-5 row px-2">
                        <div class="col-md-6 my-2 p-2" v-for="(step, index) in steps" :key="index">
                            <Kycamount :dataobj="step" />
                        </div>
                    </div>
                </div>
            </div> 
        </b-overlay>              
    </div>
</div>
</template>
<script>
import Kycamount from '~/components/dashboard/Kycamount'
export default {
    layout: "dashboard",
    middleware: 'auth',
    data () {
        return {
            tableloading: false,
            steps: null
        }
    },
    components: {
        Kycamount
    },
    async asyncData({ $axios }) {
        const kycs = await $axios.$post(`${process.env.baseUrl}admin/kycsettings/list`)
        // console.log(kycs.steps)
      return { steps: kycs.steps }
    },
}
</script>