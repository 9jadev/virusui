<template>
    <div class="container m-2">
        <h1 class="my-4 leading">Time Table </h1>
        <div class="row my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquam numquam dolores magni aspernatur, iure nam veritatis laudantium nostrum aliquid error, fuga, modi veniam esse corrupti molestias molestiae nesciunt et?
        </div>
        <b-overlay :show="tableloading" rounded="sm">
            <div class="row my-4">
                <div class="col-md-12 p-4">
                    <div class="shadow-lg mb-5 table-wrapper">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <b-form-select v-model="selectedlevel" @change="loaddata()" :options="leveloptions" style="height: 38px;" size="sm" class="mt-3"></b-form-select>
                                </div>
                                <div class="col-md-4">
                                    <b-form-select v-model="selecteddepartment" @change="loaddata()" :options="departmentoptions" style="height: 38px;" size="sm" class="mt-3"></b-form-select>
                                </div>
                                <div class="col-md-4">
                                    <b-button size="md" v-b-modal="'my-modal'" class="mx-1 mt-3 float-right" variant="primary">Add Timetable</b-button> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="offset-md-8 col-xs-12 col-md-4 my-3">
                                     
                                    <b-modal hide-footer hide-header no-close-on-backdrop no-close-on-esc size="xl" id="my-modal">
                                        <b-overlay :show="show" rounded="sm">
                                            <div class="m-4">
                                                <h2>Add timetable record.</h2>
                                                <b-form @submit="onSubmit" @reset="onReset">
                                                    <div class="row">
                                                        <div class="col-sm-6 form-group">
                                                            <b-form-select v-model="timetable.level" :options="leveloptions" style="height: 42px;" size="sm" class=""></b-form-select>
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <b-form-select v-model="timetable.department" :options="departmentoptions" style="height: 42px;" size="sm" class=""></b-form-select>
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <b-form-select v-model="timetable.day" :options="days" style="height: 42px;" size="sm" class=""></b-form-select>
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x78" placeholder="7AM to 8AM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x89" placeholder="8AM to 9AM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x910" placeholder="9AM to 10AM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x1011" placeholder="10AM to 11AM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x1112" placeholder="11AM to 12AM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x1201" placeholder="12PM to 01PM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x0102" placeholder="01PM to 02PM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x0203" placeholder="02PM to 03PM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-6 form-group">
                                                            <input type="text" v-model="timetable.x0304" placeholder="03PM to 04PM" class="form-control" required />
                                                        </div>
                                                        <div class="col-sm-12 form-group">
                                                            <input type="text" v-model="timetable.x0405" placeholder="04PM to 05PM" class="form-control" required />
                                                        </div>
                                                    </div>
                                                   
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
                                    <th>Day</th>
                                    <th>7AM to 8AM</th>
                                    <th>8AM to 9AM</th>
                                    <th>9AM to 10AM</th>
                                    <th>10AM to 11AM</th>
                                    <th>11AM to 12 PM</th>
                                    <th>12AM to 01 PM</th>
                                    <th> 1PM to 2PM</th>
                                    <th>2PM to 3PM</th>
                                    <th>3PM to 4PM</th>
                                    <th>4PM to 5PM</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="periods.length != 0">
                                <tr v-for="(period, index) in periods" :key="index">
                                    <th> {{ index+1 }} </th>
                                    <td> {{ period.day }} </td>
                                    <td> {{ period.x78 }} </td>
                                    <td> {{ period.x89 }} </td>
                                    <td> {{ period.x910 }} </td>
                                    <td> {{ period.x1011 }} </td>
                                    <td> {{ period.x1112 }} </td>
                                    <td> {{ period.x1201 }} </td>
                                    <td> {{ period.x0102 }} </td>
                                    <td> {{ period.x0203 }} </td>
                                    <td> {{ period.x0304 }} </td>
                                    <td> {{ period.x0405 }} </td>
                                    <!-- <td> {{ course.description }} </td> -->
                                    <td>
                                        <b-button size="sm" variant="primary">More</b-button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="13" class="text-center"> 
                                        <span> No record. </span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                       
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
            selectedlevel: 100,
            selecteddepartment: 'Computer Engineering',
            departmentoptions: [
                { value: null, text: 'Please select department' },
                { value: 'Computer Engineering', text: 'Computer Engineering' },
                { value: 'Electronics Engineering', text: 'Electronics Engineering' },
                { value: 'Mechanical Engineering', text: 'MEchanical Engineering' },
                { value: 'Chemical Engineering', text: 'Chemical Engineering' },
            ],
            days: [
                {
                    value: null, text: 'A day is required.'
                },
                {
                    value: 'Monday', text: 'Monday'
                },
                {
                    value: 'Tuesday', text: 'Tuesday'
                },
                {
                    value: 'Wednesday', text: 'Wednesday'
                },
                {
                    value: 'Thursday', text: 'Thursday'
                },
                {
                    value: 'Friday', text: 'Friday'
                }
            ],
            timetable: {
                "department": null,
                "level": null,
                "day": null,
                "x78": '',
                "x89": '',
                "x910": '',
                "x1011": '',
                "x1112": '',
                "x1201": '',
                "x0102": '',
                "x0203": '',
                "x0304": '',
                "x0405": ''
            },
            leveloptions: [
                { value: null, text: 'Please select level' },
                { value: 100, text: '100 level' },
                { value: 200, text: '200 level' },
                { value: 300, text: '300 level' },
                { value: 400, text: '400 level' },
                { value: 500, text: '500 level' }
            ],
            show: false,
            tableloading: false,
            periods: [],
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
            this.$axios.post(`${process.env.baseUrl}period/create`,this.timetable).then((res) => {
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
                this.timetable.department = null;
                this.timetable.day = null;
                this.timetable.level = null;
                this.timetable.x78 = '';
                this.timetable.x89 = '';
                this.timetable.x910 = '';
                this.timetable.x1011 = '';
                this.timetable.x1112 = '';
                this.timetable.x1201 = '';
                this.timetable.x0102 = '';
                this.timetable.x0203 = '';
                this.timetable.x0304 = '';
                this.timetable.x0405 = '';
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
            this.$axios.post(`${process.env.baseUrl}period/timetable`,
                {'department': this.selecteddepartment, "level": this.selectedlevel}
            ).then((res) => {
                this.tableloading = false;
                console.log(res.data.periods)
                this.periods = res.data.periods
              
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