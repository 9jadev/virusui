<template>
<div>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <b-card class="form-card">
                <h4 class="ml- authtext pl-3 pb-3 text-center">Reset Password</h4>
                <b-alert variant="success" :show="successmessage != null"> {{ successmessage }}</b-alert>
                <b-alert variant="danger" :show="errormessage != null"> {{ errormessage }}</b-alert>
                <b-overlay :show="show" rounded="sm">
                    <b-form ref="formContainer" @submit.stop.prevent="onSubmit">
                        <b-container fluid>
                            <div class="row auth">
                                <div class="col-md-12">
                                    <b-form-group id="email" label="Email" label-for="email">
                                        <b-form-input
                                            id="email"
                                            type="text"
                                            placeholder="Email"
                                            v-model="formdata.email"
                                            required
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-12">
                                    <b-form-group id="password-form" label="New Password" label-for="password">
                                        <b-form-input
                                            id="password"
                                            type="text"
                                            placeholder="New Password"
                                            v-model="formdata.password"
                                            required
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-12">
                                    <b-form-group id="password-confirm" label="New Password Confirmation" label-for="passwordconfirm">
                                        <b-form-input
                                            id="passwordconfirm"
                                            type="text"
                                            placeholder="New Password Confirmation"
                                            v-model="formdata.password_confirmation"
                                            required
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-12">
                                    <b-button type="submit" block variant="primary">Submit</b-button>
                                </div>
                                <div class="col-md-12 my-2">
                                    <h5 class="text-center">Billstonic Password Reset.</h5>
                                </div>
                            </div>
                        </b-container>
                    </b-form>         
                </b-overlay>           
            </b-card> 
        </div>
    </div>           
</div>
</template>
<script>
export default {
    data () {
        return {
            show: false,
            successmessage: null,
            errormessage: null,
            error: null,
            formdata: {
                email: null,
                token: null,
                password: null,
                password_confirmation: null
            },
        }
    }, 
    methods: {
        async onSubmit () {
            this.show = true
            this.successmessage = null;
            this.errormessage = null;
            this.error = null;
            this.$axios.post(`${process.env.baseUrl}users/password/reset`,this.formdata).then((res) => {
                this.show = false
                console.log(res.status)
                if (res.status == 200) {
                    this.successmessage = res.data.message
                    console.log(res)
                }

                if (res.status == 422) {
                    this.errormessage = res.data.errror
                }
                
            }).catch((err) => {
                console.log(err.response.status)
                this.show = false
                if (err.response.status == 422) {
                    if (err.response.data.errors) {
                        this.error = err.response.data.errors
                    }
                    else {
                        this.errormessage = err.response.data.error
                    }
                }
                // this.successmessage = null
                // this.errormessage = null
            })
        }
    },
    created () {
        this.formdata.token = this.$route.params.token
        this.formdata.email = this.$route.params.email
    }
}
</script>