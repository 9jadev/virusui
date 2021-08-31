<template>
    <div class="container m-2">
        <h1 class="my-4">Users</h1>

        <div class="row my-4">
            <div class="col-md-3">
                <div class="card shadow-lg mb-5 bg-white rounded">
                    <div class="card-body">
                        <div class="float-left">
                            <h2 class="card-title">Total User</h2>
                            <h3 class="card-subtitle mb-2">{{ total }}</h3>
                        </div>
                        <div class="float-right">
                            <b-icon font-scale="3.3" icon="person-fill" variant="primary" aria-hidden="true"></b-icon>
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
                            <div class="row">
                                <div class="col-md-4 col-xs-12">
                                    <div class="my-2 p-2">
                                        <b-form-group
                                            label="Search (email or phone number)"
                                            label-for="search"
                                            class="relative my-3"
                                        >
                                        <b-form-input v-model="search" @change="getusers" id="search" size="sm" placeholder="Search "></b-form-input>
                                        </b-form-group>  
                                            
                                    </div>
                                </div>
                                <div class="offset-md-4 col-xs-12 col-md-4">
                                    <div class="my-2 p-2">
                                        <b-form-group
                                            label="Page Number"
                                            label-for="search "
                                            class="relative my-3"
                                        >
                                            <b-form-select v-model="page_number" @change="getusers" id="page_number" :options="options" size="sm" class=""></b-form-select>    
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
                                    <th>Customer Email</th>
                                    <th>Customer Phone</th>
                                    <th>Customer VAN</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in users" :key="index">
                                    <th>{{ index+1 }}</th>
                                    <td>{{ user.firstname }} {{ user.lastname}}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.phone_number }}</td>
                                    <td> <h4> {{ user.account_number }} </h4></td>
                                    <td>
                                        <b-button :to="`/dashboard/users/${user.id}`" size="sm" variant="primary">More</b-button>
                                    </td>
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
        users: null,
        options: [
          { value: 10, text: '10 per page' },
          { value: 100, text: '100 per page' },
          { value: 200, text: '200 per page' },
          { value: 600, text: '600 per page' },
        ]
      }
    },
    methods: {
        getusers() {
            this.tableloading = true
            this.$axios.post(`${process.env.baseUrl}admins/users`,
                {'page_number': this.page_number, 'search_text': this.search}
            ).then((res) => {
                // console.log(res.data.users.data)
                this.users = res.data.users.data
                this.first_page_url = res.data.users.first_page_url
                this.last_page_url = res.data.users.last_page_url
                this.next_page_url = res.data.users.next_page_url
                this.prev_page_url = res.data.users.prev_page_url
                this.to = res.data.users.to
                this.total = res.data.users.total
                this.from = res.data.users.from
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
                this.users = res.data.users.data
                this.first_page_url = res.data.users.first_page_url
                this.last_page_url = res.data.users.last_page_url
                this.next_page_url = res.data.users.next_page_url
                this.prev_page_url = res.data.users.prev_page_url
                this.to = res.data.users.to
                this.total = res.data.users.total
                this.from = res.data.users.from
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
        this.getusers();
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