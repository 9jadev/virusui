<template>
    <div class="container m-2">
        <h1 class="my-4">Id Cards</h1>

        <!-- <div class="row my-4">
            <div class="col-md-3">
                <div class="card shadow-lg mb-5 bg-white rounded">
                    <div class="card-body">
                        <div class="float-left">
                            <h2 class="card-title">Total Transactions</h2>
                            <h3 class="card-subtitle mb-2">{{ total }}</h3>
                        </div>
                        <div class="float-right">
                            <b-icon font-scale="3.3" icon="clipboard-check" variant="primary" aria-hidden="true"></b-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <b-overlay :show="tableloading" rounded="sm">
            <div class="row my-4">
                <div class="col-md-12 p-4">
                    <div class="shadow-lg mb-5 table-wrapper">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4 col-xs-12">
                                    <div class="my-2 p-2">
                                       <span class="fontbold">Total: {{ to }}</span>     
                                    </div>
                                </div>
                                <div class="offset-md-4 col-xs-12 col-md-4">
                                    <div class="my-2 p-2">
                                        <b-form-group
                                            label="Page Number"
                                            label-for="search "
                                            class="relative my-3"
                                        >
                                            <b-form-select v-model="page_number" @change="getransactions" id="page_number" :options="options" size="sm" class=""></b-form-select>    
                                        </b-form-group>         
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Customer Name</th>
                                    <th>Preview</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="kycs.length != 0 && kycs != null">
                                <tr v-for="(transaction, index) in kycs" :key="index">
                                    <th>{{ index+1 }}</th>
                                    <td>{{ transaction.user.firstname }} {{ transaction.user.lastname}}</td>
                                    <td>  <b-link target="_blank" :href="transaction.id_image">View</b-link> </td>
                                    <td>
                                        <b-badge v-if="transaction.verify_id == '1'" variant="danger"> Verified </b-badge>
                                        <b-badge v-if="transaction.verify_id == '0'" variant="success"> Not Verified </b-badge>
                                        <b-badge v-if="transaction.verify_id == null" variant="warning"> Pending </b-badge>
                                    </td>
                                    <td>
                                        <b-button  size="sm" @click="confirmation(index)" variant="primary"> Confirm </b-button>
                                        <b-button  size="sm" @click="unconfirmation(index)" variant="primary"> Unconfirm </b-button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6" class="text-center"> <h3> No record... </h3> </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div class=" col-md-12">
                            <div class="float-left my-2 p-2">
                                <span class="fontbold"> {{ from }} of {{ to }}</span>                    
                            </div>
                            <div class="float-right my-2 p-2">
                                <b-button v-if="first_page_url != null" @click="getReceivedlink(first_page_url)" size="sm" class="mx-1" variant="primary">First</b-button>
                                <b-button @click="getReceivedlink(prev_page_url)" v-if="prev_page_url != null" size="sm" class="mx-1"  variant="primary">Previous</b-button>
                                <b-button @click="getReceivedlink(next_page_url)"  v-if="next_page_url != null" size="sm" class="mx-1" variant="primary">Next</b-button>
                                <b-button  @click="getReceivedlink(last_page_url)" v-if="last_page_url != null" size="sm" class="mx-1" variant="primary">Last</b-button>                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-overlay>

    </div>
</template>
<script>
import swal from 'sweetalert';
import Header from '~/components/Header'
import Table from '~/components/dashboard/Table'
export default {
    layout: "dashboard",
    middleware: 'auth',
    data() {
      return {
        page_number: 10,
        search: null,
        tableloading: false,
        first_page_url: null,
        last_page_url: null,
        next_page_url: null,
        prev_page_url: null,
        to: 0,
        from: null,
        total: null,
        kycs: [],
        options: [
          { value: 10, text: '10 per page' },
          { value: 100, text: '100 per page' },
          { value: 200, text: '200 per page' },
          { value: 600, text: '600 per page' },
        ]
      }
    },
    methods: {
        money_format(number) {
            return new Intl.NumberFormat().format(number)
        },
        unconfirmation(ids) {
              // console.log(ids)
            const iden = ids
            console.log(iden)
            let user = this.kycs[iden]
            console.log(user)
            swal("UnConfimation notice", `You are about to reject ${this.kycs[iden].user.firstname} ${this.kycs[iden].user.lastname} ID card.`, "info").then((re) => {
                if (re == true) {
                    this.tableloading = true
                    this.$axios.post(`${process.env.baseUrl}kycverification/admin/unconfirm/idcard`, {"id": user.id}).then((res) => {
                        if (res.data.status == "success") {
                            window.location.reload()
                        }
                        this.tableloading = false
                    }).catch((err) => {
                        this.tableloading = false
                        console.log(err)
                    });
                }
            })
        },
        confirmation(ids){
            // console.log(ids)
            const iden = ids
            console.log(iden)
            let user = this.kycs[iden]
            console.log(user)
            swal("Confimation notice", `You are about to confirm ${this.kycs[iden].user.firstname} ${this.kycs[iden].user.lastname} ID card.`, "info").then((re) => {
                if (re == true) {
                    this.tableloading = true
                    this.$axios.post(`${process.env.baseUrl}kycverification/admin/retrive/user/idcard`, {"id": user.id}).then((res) => {
                        if (res.data.status == "success") {
                            window.location.reload()
                        }
                        this.tableloading = false
                    }).catch((err) => {
                        this.tableloading = false
                        console.log(err)
                    });
                }
            })
            
        },

        getransactions() {
            this.tableloading = true
            this.$axios.post(`${process.env.baseUrl}kycverification/admin/retrive/idcard`,
                {'page_number': this.page_number, 'search_text': this.search}
            ).then((res) => {
                // console.log(res.data.users.data)
                this.kycs = res.data.kyc.data
                this.first_page_url = res.data.kyc.first_page_url
                this.last_page_url = res.data.kyc.last_page_url
                this.next_page_url = res.data.kyc.next_page_url
                this.prev_page_url = res.data.kyc.prev_page_url
                this.to = res.data.kyc.to
                this.total = res.data.kyc.total
                this.from = res.data.kyc.from
                // this.invoices = res.data.invoices
                // this.invoice = this.invoices[0];
                this.tableloading = false
            }).catch((err) => {
                this.tableloading = false
                console.log(err)
            });
        },
        getReceivedlink(url) {
            this.tableloading = true
            let newlink = url.replace('http:','https:');
            this.$axios.post(newlink,
                {'page_number': this.page_number, 'search_text': this.search}
            ).then((res) => {
                // console.log(res.data.users.data)
                this.kycs = res.data.kyc.data
                this.first_page_url = res.data.kyc.first_page_url
                this.last_page_url = res.data.kyc.last_page_url
                this.next_page_url = res.data.kyc.next_page_url
                this.prev_page_url = res.data.kyc.prev_page_url
                this.to = res.data.kyc.to
                this.total = res.data.kyc.total
                this.from = res.data.kyc.from
                // this.invoices = res.data.invoices
                // this.invoice = this.invoices[0];
                this.tableloading = false
            }).catch((err) => {
                this.tableloading = false
                console.log(err)
            });

        }
    },
    mounted() {
        this.getransactions();
    },
    components: {
        Table
    }
}
</script>
<style lang="scss" scoped>
    .fontbold {
        font-weight: bold;
    }
    .card {
        border-left: 5px solid $primary;
    }
    .card-title {
        color: $primary;
        font-weight: 700;
    }
    .card-subtitle {
        font-weight: bold;
    }
    .table-wrapper {
        width: inherit;
        padding-top: 12px;
        overflow-x: auto;
    }
</style>