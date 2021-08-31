<template>
    <div class="container mb-5">
        <h1 class="my-4 leading">View Customer </h1>
        <div class="row shadow-lg m-1 bg-white">
            <div class="col-md-12 col-xs-12 card py-2">
                <b-tabs content-class="mt-3">
                    <b-tab title="View" active>
                        <div class="row">
                            <div class="col-md-4 p-3 mb-5 bg-white">
                                <img v-if="userdata.profile_image == null"  class="profileimage" src="@/static/pp.png" :alt="`${userdata.firstname} ${userdata.lastname}`">
                                <img v-else :src="userdata.profile_image" class="profileimage" :alt="`${userdata.firstname} ${userdata.lastname}`">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 my-3">
                                <b-button size="sm" :to="`/dashboard/users/recuring/${userdata.id}`" class="m-1" variant="success">Recurings</b-button>
                                <b-button size="sm" :to="`/dashboard/users/transfer/${userdata.id}`" class="m-1" variant="info">Transfers</b-button>
                                <b-button size="sm" :to="`/dashboard/users/payment/${userdata.id}`" class="m-1" variant="primary">Payments</b-button>
                                <b-button size="sm" :to="`/dashboard/users/fund/${userdata.id}`" class="m-1" variant="warning">Funds</b-button>
                                <b-button size="sm" class="m-1" @click="banuser" variant="danger">{{ userdata.ban == "no" ? 
                                    "Ban" : "Unban" }} </b-button>
                                <b-button size="sm" class="m-1" @click="resendotp" variant="success">Resend OTP</b-button>
                            </div>
                        </div>
                        <div class="row m-2 leadrow">
                            <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                                <p class="leadtext"> First Name </p>
                                <span class="leadvalue"> {{ userdata.firstname }} </span>
                            </div>
                            <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                                <p class="leadtext">Last Name</p>
                                <span class="leadvalue">{{ userdata.lastname }}</span>
                            </div>
                            <div class="col-md-4 col-xs-12 my-2 mb-2">
                                <p class="leadtext"> Email</p>
                                <span class="leadvalue"> {{ userdata.email }} </span>
                            </div>
                        </div>

                        <div class="row m-2 leadrow">
                            <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                                <p class="leadtext"> Phone Number </p>
                                <span class="leadvalue"> {{ userdata.phone_number }} </span>
                            </div>
                            <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                                <p class="leadtext"> Virtual Account Number </p>
                                <span class="leadvalue">{{ userdata.account_number }}</span>
                            </div>
                            <div class="col-md-4 col-xs-12 my-2 mb-2">
                                <p class="leadtext"> Account Balance </p>
                                <span class="leadvalue"> ₦ {{ money_format(userdata.account_balance) }} </span>
                            </div>
                        </div>

                        <div class="row m-2 leadrow">
                            <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                                <p class="leadtext"> Monify Account Name</p>
                                <span class="leadvalue"> {{ userdata.monify_account_name }} </span>
                            </div>
                            <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                                <p class="leadtext"> Monify Account Number </p>
                                <span class="leadvalue">{{ userdata.monify_account_number }}</span>
                            </div>
                            <div class="col-md-4 col-xs-12 my-2 mb-2">
                                <p class="leadtext"> Monify Account Bank </p>
                                <span class="leadvalue">{{ userdata.monify_bank }} </span>
                            </div>
                        </div>

                        <div class="row m-2 leadrow">
                            <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                                <p class="leadtext"> BVN </p>
                                <span class="leadvalue">
                                    {{ userdata.kycverifications.bvn_number }}
                                    <a v-if="userdata.kycverifications.bvn_number != null">{{ userdata.kycverifications.bvn_number }}</a>
                                    <a v-else> None </a>
                                 </span>
                            </div>
                            <div class="col-md-4 col-xs-12 my-2 border-custom-right">
                                <p class="leadtext"> Utility Bill </p>
                                <span class="leadvalue">
                                    <a v-if="userdata.kycverifications.bill_image != null" target="_blank" :href="userdata.kycverifications.bill_image">View</a>
                                    <a v-else> None </a>
                                </span>
                            </div>
                            <div class="col-md-4 col-xs-12 my-2 mb-2">
                                <p class="leadtext"> Identification </p>
                                <span class="leadvalue">
                                    <a v-if="userdata.kycverifications.id_image != null" target="_blank" :href="userdata.kycverifications.id_image">View</a>
                                    <a v-else> None </a>
                                </span>
                            </div>
                        </div>

                    </b-tab>
                    <b-tab title="Edit">
                        <b-overlay :show="loading" rounded="sm">
                            <b-form @submit="onSubmit" class="editform">
                                <div class="row">
                                    <div class="col-md-6">
                                        <b-form-group label="Firstname" id="firstname">
                                            <b-form-input
                                            id="firstname"
                                            type="text"
                                            v-model="formdata.firstname"
                                            placeholder="First Name"
                                            required
                                            ></b-form-input>
                                        </b-form-group>
                                    </div>

                                    <div class="col-md-6">
                                        <b-form-group label="Lastname" id="lastname">
                                            <b-form-input
                                            id="lastname"
                                            type="text"
                                            v-model="formdata.lastname"
                                            placeholder="Last Name"
                                            required
                                            ></b-form-input>
                                        </b-form-group>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <b-form-group label="Email" id="email">
                                            <b-form-input
                                            id="email"
                                            type="email"
                                            v-model="formdata.email"
                                            placeholder="Email"
                                            required
                                            ></b-form-input>
                                        </b-form-group>
                                    </div>

                                    <div class="col-md-6">
                                        <b-form-group label="Phone Number" id="phone">
                                            <b-form-input
                                            id="phone"
                                            type="tel"
                                            v-model="formdata.phone_number"
                                            placeholder="Phone Number"
                                            required
                                            ></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-12">
                                        <b-form-group label="Account Balance (₦)" id="phone">
                                            <b-form-input
                                            id="phone"
                                            type="number"
                                            v-model="formdata.account_balance"
                                            placeholder="Account Balance"
                                            required
                                            ></b-form-input>
                                        </b-form-group>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <b-button size="md" class="float-right" type="submit" variant="primary">Submit</b-button>
                                    </div>
                                </div>
                            </b-form>    
                        </b-overlay>
                    </b-tab>
                    <!-- <b-tab title="Message">
                        <p>I'm a disabled tab!</p>
                    </b-tab> -->
                </b-tabs>
            </div>
        </div>   
    </div>
</template>
<style lang="scss" scoped>
    .editform {
        width: 100%;
    }
    .leading {
        color: $primary;
        font-weight: bold;
    }
    .leadrow {
        // border-top: 1px solid $primary;
        border-bottom: 1px solid $primary;
    }
    .leadtext {
        font-weight: 800;
        margin-bottom: 0px;
    }
    .profileimage {
        height: 200px;
        width: 200px;
        z-index: 1;
        border-radius: 100%;
        border: 1px solid $primary;
    } 
</style>
<script>

import swal from 'sweetalert';
export default {
    layout: "dashboard",
    middleware: 'auth',
    data() {
        return {
            userdata: null,
            loading: null,
            formdata: {
                id: null,
                firstname: null,
                lastname: null,
                email: null,
                loading: false,
                phone_number:null,
                account_balance: null
            }
        }
    },
    methods: {
        money_format(number) {
            return new Intl.NumberFormat().format(number)
        },
        async onSubmit(event) {
            event.preventDefault()
            // alert(JSON.stringify(this.formdata))
            this.loading = true
            this.$axios.post(`${process.env.baseUrl}admins/edituser`, this.formdata).then((res) => {
                this.loading = false
                if (res.data.status == "error") {
                    this.$bvToast.toast(res.data.message, {
                        title: `Error`,
                        variant: 'error',
                        solid: true
                    });
                }

                if (res.data.status == "success") {
                    this.$bvToast.toast(res.data.message, {
                        title: `Successful`,
                        variant: 'success',
                        solid: true
                    });
                }
            }).catch((err) => {
                this.loading = false
                this.$bvToast.toast("Server error occoured.", {
                    title: `Error`,
                    variant: 'error',
                    solid: true
                });    
            });
        },
        async resendotp () {
            await swal("Notification", `Resent OTP for ${this.userdata.firstname} ${this.userdata.lastname}.`, "success").then((res) => {
                this.$axios.post(`${process.env.baseUrl}admin/user/verification/resend`,{"id": this.userdata.id}).then((red) => {
                    if (red.data.status == "error") {
                            this.$bvToast.toast(red.data.message, {
                                title: `Error`,
                                variant: 'danger',
                                solid: true
                            });
                        }

                        if (red.data.status == "success") {
                            this.$bvToast.toast(red.data.message, {
                                title: `Success`,
                                variant: 'success',
                                solid: true
                            });
                        }
                }).catch(() => {
                    this.$bvToast.toast('Error ocoured.', {
                        title: `Error`,
                        variant: 'danger',
                        solid: true
                    });
                });
            })
            
        },
        async banuser() {
            let ban = this.userdata.ban == 'no' ? `Are you sure you want to ban ${this.userdata.firstname} ${this.userdata.lastname}.` : `Are you sure you want to unban ${this.userdata.firstname} ${this.userdata.lastname}.`;
            await swal("Notification", ban, "success").then((res) => {
                if (res == true) {
                    // console.log(ban)
                    this.$axios.post(`${process.env.baseUrl}admin/user/ban`,{"id": this.userdata.id}).then((red) => {
                        this.loading = false
                        console.log(red.data.status)
                        if (red.data.status == "error") {
                            this.$bvToast.toast(res.data.message, {
                                title: `Error`,
                                variant: 'error',
                                solid: true
                            });
                        }

                        if (red.data.status == "success") {
                            this.$router.go()
                        }
                    }).catch((err) => {
                        this.loading = false
                        this.$bvToast.toast("Server error occoured.", {
                            title: `Error`,
                            variant: 'error',
                            solid: true
                        });    
                    });
                }
            });
        },
        assignformdata() {
            this.formdata.id = this.userdata.id
            this.formdata.firstname = this.userdata.firstname
            this.formdata.lastname = this.userdata.lastname
            this.formdata.email = this.userdata.email
            this.formdata.phone_number = this.userdata.phone_number
            this.formdata.account_balance = this.userdata.account_balance
        },
    },
    mounted() {
        this.assignformdata()
    },
    async asyncData({ params, $axios, redirect }) {
        const userdata = await $axios.$post(`${process.env.baseUrl}admins/user`,{id: params.id})
        if (userdata.user == null) {
            // return this.$route()
            redirect('/dashboard');
        }
      return { userdata: userdata.user }
    }
}
</script>