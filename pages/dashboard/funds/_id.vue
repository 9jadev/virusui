<template>

    <div class="px-3">
        <h1 class="my-4 leading">Transfer: {{ fund.reference }} </h1>
        <div class="container card mb-4">
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> First Name </p>
                    <span class="leadvalue"> {{ fund.userdata.firstname }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Last Name</p>
                    <span class="leadvalue">{{ fund.userdata.lastname }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Email</p>
                    <span class="leadvalue"> {{ fund.userdata.email }} </span>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Monify Account Name</p>
                    <span class="leadvalue"> {{ fund.userdata.monify_account_name }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Monify Account Number </p>
                    <span class="leadvalue">{{ fund.userdata.monify_account_number }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Monify Account Bank </p>
                    <span class="leadvalue">{{ fund.userdata.monify_bank }} </span>
                </div>
            </div>
        </div>
        <div class="container my-2 card mb-4">
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Amount</p>
                    <span class="leadvalue"> ₦ {{ money_format(fund.amount) }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Old Balance</p>
                    <span class="leadvalue"> ₦ {{ money_format(fund.old_balance) }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext">Funding Method</p>
                    <span class="leadvalue">
                        <b-badge variant="success"> {{ fund.funding_method }} </b-badge> 
                    </span>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Completed </p>
                    <span class="leadvalue">
                        <b-badge v-if="fund.status == 'complete'" variant="success"> Yes </b-badge>
                        <b-badge v-else variant="danger"> No </b-badge>
                    </span>
                </div>
               
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    layout: "dashboard",
    middleware: 'auth',
    data() {
        return {
            fund: null
        }
    },
    methods: {
        money_format(number) {
            return new Intl.NumberFormat().format(number)
        },
    },
    async asyncData({ params, $axios, redirect }) {
        const fund = await $axios.$post(`${process.env.baseUrl}admin/single/fund`,{id: params.id})
        if (fund == null) {
            // return this.$route()
            redirect('/dashboard');
        }
      return { fund: fund.fund }
    }
}
</script>