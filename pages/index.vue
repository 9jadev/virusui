<template>
    <div class="row justify-content-center">
      <div class="col-md-4">
                <b-card class="form-card">
                    <h4 class="ml- authtext pl-3 pb-3">Login</h4>
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
                                        <b-form-invalid-feedback id="input-1-live-feedback"
                                        >This is a required field and must be
                                        email.</b-form-invalid-feedback
                                        >
                                       
                                    </b-form-group>
                                </div>
                            </div>
                            <p class="error" v-if="showerror"> {{ errordata }} </p>
                            <div class="row auth">
                                <div class="col-md-12">
                                <b-form-group
                                    id="password"
                                    label="Password"
                                    label-for="Password "
                                    class="relative"
                                >
                                    <EyeSvg
                                    class="icon absolute eye"
                                    @click.prevent="toggleInputType"
                                    />
                                    <b-form-input
                                    id="password"
                                    :type="inputType"
                                    placeholder="Password"
                                    v-model="formdata.password"
                                    required
                                    >
                                    <template #append>
                                        <b-input-group-text
                                        ><strong class="text-danger"
                                            >!</strong
                                        ></b-input-group-text
                                        >
                                    </template>
                                    </b-form-input>
                            
                                    <b-form-invalid-feedback id="input-1-live-feedback"
                                    >This is a required field and must be at least 8 characters.
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                </div>
                            </div>
                            <div class="text-right font-weight-bold">
                              <h5 class="font-weight-bold">  Forgot Password ? </h5>
                            </div>
                            <LoaderButton
                                :loading="disabled"
                                type="submit"
                                class="bold shadow d-flex align-items-center justify-content-center"
                                block
                                :disabled="disabled"
                                variant="primary"
                            >
                                Login now
                            </LoaderButton>
                        </b-container>
                    </b-form>
                </b-card> 
            </div>
    </div>
</template>

<script>
import LoaderButton from '~/components/LoaderButton'
import EyeSvg from '~/assets/svg/eye.svg?inline'
export default {
   
  components: {
    LoaderButton,
    EyeSvg
  },
  middleware({ store, redirect }) {
    if (store.state.auth.loggedIn) {
      return redirect("/dashboard");
    }
  },
  data () {
    return {
      inputType: 'password',
      errordata: null,
      showerror: false,
      formdata: {
        email: null,
        password: null,
      },
      disabled: false,
      fullPage: false
    }
  },
  methods: {

    toggleInputType () {
      this.inputType = this.inputType === 'text' ? 'password' : 'text'
    },
   
    async onSubmit () {
      console.log(this.formdata)
      this.disabled = true
      // if (this.$v.formdata.$anyError) {
      //   return
      // }
      this.errordata = null
        this.showerror = false
      try {
        let response = await this.$auth.loginWith('local', 
        { data: this.formdata}) 
        this.disabled = false

      }catch (err) { 
        this.errordata = err.response["data"]["errors"]["message"][0];
        this.showerror = true
        this.disabled = false
       }
    }

  } 
}
</script>

<style lang="scss" scoped>
  .error {
    color: red;
    font-size: 10px;
    font-weight: 900;
  }
</style>