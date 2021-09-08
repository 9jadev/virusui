<template>
    <div class="container m-2">
        <h1 class="my-4 leading">Time Table </h1>
        <div class="row my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam numquam dolores magni aspernatur, iure nam veritatis laudantium nostrum aliquid error, fuga, modi veniam esse corrupti molestias molestiae nesciunt et?
        </div>
     
    </div>
</template>
<script>
import Header from '~/components/Header'
export default {
    layout: "dashboard",
    middleware: 'auth',
    data () {
        return {
            customers: null,
            coustomer_amount: null,
            payments: null,
            payment_amount: null,
            transactions: null,
            transaction_amount: null,
            transfers: null,
            transfer_amount: null,
            funds: null,
            fund_amount: null,
            bill: null,
            idcard: null
        }
    },
    methods: {
        money_format(number) {
            return new Intl.NumberFormat().format(number)
        },
    },
    // async asyncData({ $axios }) {
    //     const customer = await $axios.$post(`${process.env.baseUrl}statistics/customer`)
    //     const coustomer_amount = await $axios.$post(`${process.env.baseUrl}statistics/customer/amount`)
    //     const payment = await $axios.$post(`${process.env.baseUrl}statistics/payment`)
       
    //     return { 
    //       customers: customer.cusomer_count,
    //       coustomer_amount: coustomer_amount.cusomer_accountbalance,
    //       payments: payment.cusomer_count,
    //     }
    // },
}
</script>