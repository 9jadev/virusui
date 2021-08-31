<template>
<div>
    <h4>
        Present state
        <b-badge v-if="dataobj.product_toggle == '1'" variant="success">Activate</b-badge>
        <b-badge v-else variant="danger">Deactivate</b-badge>
    </h4>
    <b-form-group
        :label="`Toggle ${dataobj.product_name}`"
        label-for="Toggle Status "
        class="relative my-3"
    >
        <b-form-select id="page_number" v-model="dataobj.product_toggle" @change="togglestate" :options="statuslist" size="sm"></b-form-select>    
    </b-form-group>        
</div>
</template>
<script>

import swal from 'sweetalert';
export default {
    props: ["dataobj"],
    data () {
        return {
            // status: null,
            statuslist: [
                { value: '0', text: "Deactivate" },
                { value: '1', text: "Activate" }
            ]
        }
    },
    methods: {
        async togglestate () {
            await  swal("Notification", `Confirm toggle state of ${this.dataobj.product_name}`, "success").then((res) => {
                if (res == true) {
                    this.$axios.post(`${process.env.baseUrl}admin/products/toggle`,{"id": this.dataobj.id}).then((red) => {
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
                        $nuxt.$emit('customevent')
                    }).catch(() => {
                        this.$bvToast.toast('Error ocoured.', {
                            title: `Error`,
                            variant: 'danger',
                            solid: true
                        });
                    });   
                }
            })
        }
    },

}
</script>