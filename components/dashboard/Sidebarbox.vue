<template>
    <div>
        <div class="sidelayout">
            <div class="logo">
                <img src="@/static/Landscapelogo.png" alt="Billstonic">
            </div>
            <hr>
        </div>
        <div class="sidebox scrollable">
            
            <NuxtLink to="/dashboard" class="textunderline">
                <div class="sidenav my-3">
                    <div class="sideicon">
                        <b-icon font-scale="1.3" icon="house-fill" variant="primary" aria-hidden="true"></b-icon>
                    </div>
                    <div class="sidelink">
                        <span class="h5 text-center">Home</span>
                    </div>   
                </div>
            </NuxtLink>

            <NuxtLink to="/dashboard/courses" class="textunderline">
                <div class="sidenav my-3">
                    <div class="sideicon">
                        <b-icon font-scale="1.3" icon="bookmarks-fill" variant="primary" aria-hidden="true"></b-icon>
                    </div>
                    <div class="sidelink">
                        <span class="h5 text-center">Course</span>
                    </div>   
                </div>
            </NuxtLink>

            <NuxtLink to="/dashboard/venues" class="textunderline">
                <div class="sidenav my-3">
                    <div class="sideicon">
                        <b-icon font-scale="1.3" icon="cloud-download-fill" variant="primary" aria-hidden="true"></b-icon>
                    </div>
                    <div class="sidelink">
                        <span class="h5 text-center">Venues</span>
                    </div>   
                </div>
            </NuxtLink>

            

            <div v-b-toggle.payments class="sidenav mb-3">
                <div class="sideicon">
                    <b-icon font-scale="1.3" icon="credit-card-fill" variant="primary" aria-hidden="true"></b-icon>
                </div>
                <div class="sidelink">
                    <span class="h5 text-center">Payments</span>
                </div>   
            </div>

            <b-collapse id="payments">
                <NuxtLink to="/dashboard/payments/airtime" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink">
                            <span class="h5 text-center">Airtime</span>
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/dashboard/payments/buydata" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink">
                            <span class="h5 text-center">Data</span>
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/dashboard/payments/electricity" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink">
                            <span class="h5 text-center">Electricity</span>
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/dashboard/payments/payTv" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink">
                            <span class="h5 text-center">Pay Tv</span>
                        </div>
                    </div>
                </NuxtLink>
                 <NuxtLink to="/dashboard/transfers" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink">
                            <span class="h5 text-center">Transfer</span>
                        </div>
                    </div>
                </NuxtLink>
            </b-collapse>

            
        </div>
    </div>
</template>
