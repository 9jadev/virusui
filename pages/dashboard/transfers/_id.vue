<template>

    <div class="px-3">
        <h1 class="my-4 leading">Transfer: {{ transfer.reference }} </h1>
        <div class="container card mb-4">
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> First Name </p>
                    <span class="leadvalue"> {{ transfer.userdata.firstname }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Last Name</p>
                    <span class="leadvalue">{{ transfer.userdata.lastname }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Email</p>
                    <span class="leadvalue"> {{ transfer.userdata.email }} </span>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Phone Number  </p>
                    <span class="leadvalue"> {{ transfer.userdata.phone_number }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Account Number</p>
                    <span class="leadvalue"> {{ transfer.userdata.account_number }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Account Balance</p>
                    <span class="leadvalue">₦ {{ money_format(transfer.userdata.account_balance) }} </span>
                </div>
            </div>
        </div>


        <div class="container my-2 card mb-4">
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Bank Name </p>
                    <span class="leadvalue"> {{ transfer.bank_name }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Bank Account Name</p>
                    <span class="leadvalue"> {{ transfer.bank_account_name}} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Bank Account Number</p>
                    <span class="leadvalue"> {{ transfer.bank_account_number}} </span>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Bank Code </p>
                    <span class="leadvalue"> {{ transfer.bank_code }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Bank Source Account Number</p>
                    <span class="leadvalue"> {{ transfer.bank_source_account_number }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Status</p>
                    <b-badge v-if="transfer.completed" variant="success">Completed</b-badge>
                    <b-badge v-else variant="danger">Not Completed</b-badge>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Amount</p>
                    <span class="leadvalue">₦ {{ money_format(transfer.amount) }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> From Recuring</p>
                    <span v-if="transfer.recuring_id != null" class="leadvalue"> YES </span>
                    <span v-else class="leadvalue"> NO </span>
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
            transfer: null
        }
    },
    methods: {
        money_format(number) {
            return new Intl.NumberFormat().format(number)
        },
    },
    async asyncData({ params, $axios, redirect }) {
        const transfer = await $axios.$post(`${process.env.baseUrl}admin/single/transfer`,{id: params.id})
        if (transfer.transfer == null || transfer.transfer == []) {
            // return this.$route()
            redirect('/dashboard');
        }
        return { 
          transfer: transfer.transfer,
          userdata: null
        }
    }
}
</script>