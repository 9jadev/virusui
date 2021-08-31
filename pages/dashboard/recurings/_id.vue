<template>

    <div class="px-3">
        <h1 class="my-4 leading">Recuring: {{ recurings.reference }} </h1>
        <div class="container card mb-4">
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> First Name </p>
                    <span class="leadvalue"> {{ recurings.userdata.firstname }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Last Name</p>
                    <span class="leadvalue">{{ recurings.userdata.lastname }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Email</p>
                    <span class="leadvalue"> {{ recurings.userdata.email }} </span>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Monify Account Name</p>
                    <span class="leadvalue"> {{ recurings.userdata.monify_account_name }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Monify Account Number </p>
                    <span class="leadvalue">{{ recurings.userdata.monify_account_number }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Monify Account Bank </p>
                    <span class="leadvalue">{{ recurings.userdata.monify_bank }} </span>
                </div>
            </div>
        </div>
        <div class="container my-2 card mb-4">
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Bank</p>
                    <span class="leadvalue" v-text="recurings.bank"> </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Bank Account Name</p>
                    <span class="leadvalue" v-text="recurings.bank_account_name"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Bank Account Number</p>
                    <span class="leadvalue" v-text="recurings.bank_account_number"></span>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Bank Code </p>
                    <span class="leadvalue" v-text="recurings.bank_code"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Billers Code</p>
                    <span class="leadvalue" v-text="recurings.billerCode"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Completed</p>
                    <span class="leadvalue" v-text="recurings.completed"></span>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Phone Number</p>
                    <span class="leadvalue" v-text="recurings.phone_number"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Reference </p>
                    <span class="leadvalue" v-text="recurings.reference"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Service ID </p>
                    <span class="leadvalue" v-text="recurings.serviceID"></span>
                </div>
            </div>
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Payment Type</p>
                    <span class="leadvalue" v-text="recurings.payment_type"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Mobile Network </p>
                    <span class="leadvalue" v-text="recurings.mobile_network"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Date of execution </p>
                    <span class="leadvalue" v-text="recurings.date_of_execution"></span>
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
            recurings: null
        }
    },
    async asyncData({ params, $axios, redirect }) {
        const recurings = await $axios.$post(`${process.env.baseUrl}admin/single/recuring`,{id: params.id})
        if (recurings.recuring == null) {
            // return this.$route()
            redirect('/dashboard');
        }
      return { recurings: recurings.recuring }
    }
}
</script>