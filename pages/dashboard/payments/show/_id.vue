<template>
    <div class="px-3">
        <h1 class="my-4 leading">Payment: {{ payments.vt_ref }} </h1>
        <div class="container card mb-4">
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> First Name </p>
                    <span class="leadvalue"> {{ payments.userdata.firstname }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Last Name</p>
                    <span class="leadvalue">{{ payments.userdata.lastname }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Email</p>
                    <span class="leadvalue"> {{ payments.userdata.email }} </span>
                </div>
            </div>   
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Monify Account Name</p>
                    <span class="leadvalue"> {{ payments.userdata.monify_account_name }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Monify Account Number </p>
                    <span class="leadvalue">{{ payments.userdata.monify_account_number }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Monify Account Bank </p>
                    <span class="leadvalue">{{ payments.userdata.monify_bank }} </span>
                </div>
            </div> 
        </div>


        <div class="container card mb-4">
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Payment Type </p>
                    <span class="leadvalue"> {{ payments.payment_type }} </span>
                </div>
                <!-- <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Phone Number</p>
                    <span class="leadvalue" v-text="payments.phone_number"></span>
                </div> -->
                 <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext">Payment Reference </p>
                    <span class="leadvalue" v-text="payments.vt_ref"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Payment Completed</p>
                    <b-badge v-if="payments.completed == 'no'" variant="danger"> Not completed </b-badge>
                    <b-badge v-if="payments.completed == 'yes'" variant="success"> completed </b-badge>
                    <!-- <span class="leadvalue"> {{ payments.userdata.email }} </span> -->
                </div>
            </div>   
            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Amount </p>
                    <span class="leadvalue"> ₦{{ money_format(payments.amount) }} </span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Old Balance </p>
                    <span class="leadvalue">₦{{ money_format(payments.oldbalance) }}</span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> New Balance </p>
                    <span class="leadvalue">₦{{ money_format(payments.newbalance) }} </span>
                </div>
            </div> 

            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Airtime Type </p>
                    <span class="leadvalue" v-text="payments.airtime_type"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Biller Code </p>
                    <span class="leadvalue" v-text="payments.billercode"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Cabletv Type </p>
                    <span class="leadvalue" v-text="payments.cabletv_type"></span>
                </div>
            </div> 

            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Electricity Payments Type </p>
                    <span class="leadvalue" v-text="payments.electricity__payments_type"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Electricity Distributor </p>
                    <span class="leadvalue" v-text="payments.electricity_type"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Internet Type </p>
                    <span class="leadvalue" v-text="payments.internet_type"></span>
                </div>
            </div>

            <div class="row m-2 leadrow">
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Mobiledata Type </p>
                    <span class="leadvalue" v-text="payments.mobiledata_type"></span>
                </div>
                <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                    <p class="leadtext"> Phone Number </p>
                    <span class="leadvalue" v-text="payments.phone_number"></span>
                </div>
                <div v-if="payments.from_recuring != 'no'" class="col-md-4 col-xs-12 my-2 mb-2">
                    <p class="leadtext"> Internet Type </p>
                    <span class="leadvalue" v-text="payments.internet_type"></span>
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
            payments: null
        }
    },
    methods: {
        money_format(number) {
            return new Intl.NumberFormat().format(number)
        },
    },
    async asyncData({ params, $axios, redirect }) {
        const payments = await $axios.$post(`${process.env.baseUrl}admin/single/payment`,{id: params.id})
        // console.log(params.id)
        if (payments == null || payments.status == "error") {
            // return this.$route()
            redirect('/dashboard');
        }
      return { payments: payments.payment }
    }
}
</script>