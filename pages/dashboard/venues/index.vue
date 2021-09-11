<template>
    <div class="container m-2">
        <h1 class="my-4 leading">Course </h1>
        <div class="row mx-2 my-4">
            List of all venues.
        </div>
        <b-overlay :show="tableloading" rounded="sm">
            <div class="row my-4">
                <div class="col-md-12 p-4">
                    <div class="shadow-lg mb-5 table-wrapper">
                        <div class="col-md-12">
                            <div class="row">
                                
                                <div class="offset-md-8 col-xs-12 col-md-4 my-3">
                                    <b-button size="sm" v-b-modal="'my-modal'" class="mx-1 float-right" variant="primary">create</b-button>  
                                    <b-modal hide-footer hide-header no-close-on-backdrop no-close-on-esc id="my-modal">
                                        <b-overlay :show="show" rounded="sm">
                                            <div class="m-4">

                                                <b-form @submit="onSubmit" @reset="onReset">
                                                    <b-form-group
                                                        id="input-group-1"
                                                        label="Venue Name:"
                                                        label-for="input-1"
                                                        description="A venue name is required"
                                                    >
                                                        <b-form-input
                                                        id="input-1"
                                                        v-model="venue.name"
                                                        type="text"
                                                        placeholder="Venue Name"
                                                        required
                                                        ></b-form-input>
                                                    </b-form-group>

                                                    <b-form-group
                                                        id="input-group-1"
                                                        label=" Venue Description:"
                                                        label-for="input-1"
                                                        description="A description is required"
                                                    >
                                                        <b-form-textarea
                                                            id="textarea"
                                                            v-model="venue.description"
                                                            placeholder="Venue Description"
                                                            rows="3"
                                                            max-rows="6"
                                                        ></b-form-textarea>

                                                    </b-form-group>

                                                    <div class="float-right">
                                                        <b-button type="submit" class="float-right" variant="primary">Submit</b-button>
                                                    </div>
                                                    <div class="float-left">
                                                        <b-button type="reset" class="float-left" variant="danger">Reset</b-button>
                                                    </div>
                                                </b-form>

                                            </div>
                                        </b-overlay>
                                    </b-modal>
                                </div>
                            </div>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Course Code</th>
                                    <th>Course Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="courses.length != 0">
                                <tr v-for="(course, index) in courses" :key="index">
                                    <th> {{ index+1 }} </th>
                                    <td> {{ course.name }} </td>
                                    <td> {{ course.description }} </td>
                                    <td>
                                        <b-button size="sm" variant="primary">More</b-button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4s" class="text-center"> 
                                        <span> No record. </span>
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
import Table from '~/components/dashboard/Table'
export default {
    layout: "dashboard",
    middleware: 'auth',
    data () {
        return  {
            show: false,
            tableloading: false,
            page_number: 10,
            courses: [],
            first_page_url: null,
            last_page_url: null,
            next_page_url: null,
            prev_page_url: null,
            to: null,
            from: null,
            total: null,
            venue: {
                name: "",
                description: ""
            }
        }
    },
    components: {
        Table
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            this.show = true
            this.$axios.post(`${process.env.baseUrl}venues/create`,this.venue).then((res) => {
                if (res.data.status == "success") {
                    this.$bvToast.toast(`${res.data.message}`, {
                        title: `Successfully`,
                        variant: 'success',
                        solid: true
                    })   
                }
                if (res.data.status == "error") {
                    this.$bvToast.toast(`${res.data.message}`, {
                        title: `Successfully`,
                        variant: 'danger',
                        solid: true
                    })   
                }
                this.show = false
                this.$bvModal.hide("my-modal");
                this.loaddata();
            }).catch((err) => {
                this.show = false
                this.$bvModal.hide("my-modal");
            });
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.venue.name = ''
            this.venue.description = ''
             this.$bvModal.hide("my-modal");
        },
        loaddata() {
            this.tableloading = true
            this.$axios.post(`${process.env.baseUrl}venues/all`,
                {'page_number': this.page_number}
            ).then((res) => {
                this.tableloading = false;
                console.log(res.data.venue)
                this.courses = res.data.venue.data
                this.first_page_url = res.data.venue.first_page_url
                this.last_page_url = res.data.venue.last_page_url
                this.next_page_url = res.data.venue.next_page_url
                this.prev_page_url = res.data.venue.prev_page_url
                this.to = res.data.venue.to
                this.from = res.data.venue.from
                this.total = res.data.venue.total
            }).catch((err)  => {
                this.tableloading = false;
            });
        }
    },
    created() {
        this.loaddata();
    }
}
</script>