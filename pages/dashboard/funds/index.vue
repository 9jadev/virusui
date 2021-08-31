<template>
    <div class="container m-2">
        <h1 class="my-4">Funds</h1>

        <div class="row my-4">
            <div class="col-md-3">
                <div class="card shadow-lg mb-5 bg-white rounded">
                    <div class="card-body">
                        <div class="float-left">
                            <h2 class="card-title">Total Funds</h2>
                            <h3 class="card-subtitle mb-2">{{ total }}</h3>
                        </div>
                        <div class="float-right">
                            <b-icon font-scale="3.3" icon="credit-card2-front-fill" variant="primary" aria-hidden="true"></b-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-overlay :show="tableloading" rounded="sm">
            <div class="row my-4">
                <div class="col-md-12 p-4">
                    <div class="shadow-lg mb-5 table-wrapper">
                        <div class="col-md-12">
                            <div class="offset-md-10 col-md-2 my-2 p-2">
                                <b-form-group
                                    label="Toggle Status"
                                    label-for="Toggle Status "
                                    class="relative my-3"
                                >
                                    <b-form-select v-model="status" @change="getransactions" id="page_number" :options="statuslist" size="sm"></b-form-select>    
                                </b-form-group>         
                            </div>
                            <div class="row">
                                <div class="col-md-3 col-xs-12">
                                    <div class="my-2 p-2">
                                        <b-form-group
                                            label="Search (references)"
                                            label-for="search"
                                            class="relative my-3"
                                        >
                                        <b-form-input v-model="search" @change="getransactions" id="search" size="sm" placeholder="Search "></b-form-input>
                                        </b-form-group>  
                                            
                                    </div>
                                </div>


                                <div class="col-md-3 col-xs-12">
                                    <div class="my-2 p-2">
                                        <b-form-group
                                            label="From Date"
                                            label-for="From date"
                                            class="relative my-3"
                                        >
                                        <b-form-input v-model="fromdate" @change="getransactions" type="date" id="fromdate" size="sm" placeholder="dd/mm/yyyy"></b-form-input>
                                        </b-form-group>  
                                            
                                    </div>
                                </div>
                                <div class="col-md-3 col-xs-12">
                                    <div class="my-2 p-2">
                                        <b-form-group
                                            label="To Date"
                                            label-for="To Date"
                                            class="relative my-3"
                                        >
                                        <b-form-input v-model="todate" @change="getransactions" type="date" id="todate" size="sm" placeholder="dd/mm/yyyy"></b-form-input>
                                        </b-form-group>  
                                            
                                    </div>
                                </div>

                                <div class="col-xs-12 col-md-3">
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
                                    <th>Amount</th>
                                    <th>Reference</th>
                                    <th>Payment Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="transactions.length != 0 || transactions != null">
                                <tr v-for="(transaction, index) in transactions" :key="index">
                                    <th>{{ index+1 }}</th>
                                    <td><b-link :to="`/dashboard/users/${transaction.user.id}`"> {{ transaction.user.firstname }} {{ transaction.user.lastname}} </b-link></td>
                                    <td> ₦ {{ money_format(transaction.amount) }}</td>
                                    <td>{{ transaction.reference }}</td>
                                    <td> <b-badge variant="success"> {{ transaction.funding_method }} </b-badge> </td>
                                    <td>
                                        <!-- <b-badge v-if="transaction.status == 'no'" variant="danger"> Not completed </b-badge> -->
                                        <b-badge v-if="transaction.status == 'complete'" variant="success"> completed </b-badge>
                                        <b-badge v-if="transaction.status != 'complete'" variant="danger"> Not completed </b-badge>
                                    </td>
                                    <td>
                                        <b-button  size="sm" :to="`/dashboard/funds/${transaction.id}`" variant="primary">More</b-button>
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
        to: null,
        from: null,
        total: null,
        status: 'complete',
        todate: null,
        fromdate: null,
        statuslist: [
            { value: null, text: "Not Completed" },
            { value: 'complete', text: "Completed" }
        ],
        transactions: [],
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
        getransactions() {
            this.tableloading = true
            this.$axios.post(`${process.env.baseUrl}funding/admin/listing`,
                {
                    'page_number': this.page_number,
                    'search_text': this.search,
                    'fromdate':  this.fromdate,
                    'todate': this.todate,
                    'status': this.status
                }
            ).then((res) => {
                // console.log(res.data.users.data)
                this.transactions = res.data.funds.data
                this.first_page_url = res.data.funds.first_page_url
                this.last_page_url = res.data.funds.last_page_url
                this.next_page_url = res.data.funds.next_page_url
                this.prev_page_url = res.data.funds.prev_page_url
                this.to = res.data.funds.to
                this.total = res.data.funds.total
                this.from = res.data.funds.from
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
                {
                    'page_number': this.page_number,
                    'search_text': this.search,
                    'fromdate':  this.fromdate,
                    'todate': this.todate,
                    'status': this.status
                }
            ).then((res) => {
                // console.log(res.data.users.data)
                this.transactions = res.data.funds.data
                this.first_page_url = res.data.funds.first_page_url
                this.last_page_url = res.data.funds.last_page_url
                this.next_page_url = res.data.funds.next_page_url
                this.prev_page_url = res.data.funds.prev_page_url
                this.to = res.data.funds.to
                this.total = res.data.funds.total
                this.from = res.data.funds.from
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