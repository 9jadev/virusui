<template>
<div>
    <b-overlay :show="tableloading" rounded="sm">
        <b-form @submit.stop.prevent="submit">
            <b-form-group :label="`Step ${dataobj.step_value}`" :id="`for${dataobj.step_value}`">
                <b-form-input
                    id="amount"
                    type="number"
                    :value="dataobj.step_amount"
                    placeholder="Amount (₦)"
                    :min="1000"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success">Submit</b-button>
        </b-form>
    </b-overlay>
</div>
</template>
<script>
export default {
    props: ["dataobj"],
    data () {
        return {
            tableloading: false,
            amountobj: null
        }
    },
    created() {
        this.amountobj = this.dataobj.step_amount
    },
    methods: {
        async submit () {
            this.tableloading = true
            await this.$axios.post(`${process.env.baseUrl}admin/kycsettings/toggle`, 
                {
                    id: this.dataobj.id,
                    amount: this.amountobj
                }
            ).then((res) => {
                this.tableloading = false
                if (res.data.status == "error") {
                    this.$bvToast.toast(res.data.message, {
                        title: `Error`,
                        variant: 'danger',
                        solid: true
                    });
                }

                if (res.data.status == "success") {
                    this.$bvToast.toast(res.data.message, {
                        title: `Success`,
                        variant: 'success',
                        solid: true
                    });
                }
            }).catch(() => {
                this.tableloading = false
                this.$bvToast.toast('Error ocoured.', {
                    title: `Error`,
                    variant: 'danger',
                    solid: true
                });
            })
        }
    }
}
</script>