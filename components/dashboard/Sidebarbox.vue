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

            <NuxtLink to="/dashboard/users" class="textunderline">
                <div class="sidenav mb-3">
                    <div class="sideicon">
                        <b-icon font-scale="1.3" icon="person-fill" variant="primary" aria-hidden="true"></b-icon>
                    </div>
                    <div class="sidelink">
                        <span class="h5 text-center">Users</span>
                    </div>   
                </div>
            </NuxtLink>

            <NuxtLink to="/dashboard/transactions" class="textunderline">
                <div class="sidenav mb-3">
                    <div class="sideicon">
                        <b-icon font-scale="1.3" icon="clipboard-check" variant="primary" aria-hidden="true"></b-icon>
                    </div>
                    <div class="sidelink">
                        <span class="h5 text-center">Transactions</span>
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

            <NuxtLink to="/dashboard/funds" class="textunderline">
                <div class="sidenav my-3">
                    <div class="sideicon">
                        <b-icon font-scale="1.3" icon="credit-card2-front-fill" variant="primary" aria-hidden="true"></b-icon>
                    </div>
                    <div class="sidelink">
                        <span class="h5 text-center">Funds</span>
                    </div>   
                </div>
            </NuxtLink>

            <NuxtLink to="/dashboard/recurings" class="textunderline">
                <div class="sidenav my-3">
                    <div class="sideicon">
                        <b-icon font-scale="1.3" icon="arrow-repeat" variant="primary" aria-hidden="true"></b-icon>
                    </div>
                    <div class="sidelink">
                        <span class="h5 text-center">Recuring</span>
                    </div>   
                </div>
            </NuxtLink>

            <div v-b-toggle.verification class="sidenav mb-3">
                <div class="sideicon">
                    <b-icon font-scale="1.3" icon="shield-fill-check" variant="primary" aria-hidden="true"></b-icon>
                </div>
                <div class="sidelink">
                    <span class="h5 text-center">Verification</span>
                </div>   
            </div>

            <b-collapse id="verification">
                <NuxtLink to="/dashboard/utility" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink">
                            <span class="h5 text-center">Utility</span>
                        </div>
                    </div>
                </NuxtLink>

                <NuxtLink to="/dashboard/idcard" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink"> 
                            <span class="h5 text-center">Id card</span>
                        </div>
                    </div>
                </NuxtLink>    

            </b-collapse>

            <div v-b-toggle.settings class="sidenav mb-3">
                <div class="sideicon">
                    <b-icon font-scale="1.3" icon="disc-fill" variant="primary" aria-hidden="true"></b-icon>
                </div>
                <div class="sidelink">
                    <span class="h5 text-center">Settings</span>
                </div>   
            </div>

            <b-collapse id="settings">
                <NuxtLink to="/dashboard/settings/products" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink">
                            <span class="h5 text-center">Products</span>
                        </div>
                    </div>
                </NuxtLink>

                <NuxtLink to="/dashboard/settings/kycs" class="textunderline">
                    <div class="sidenavsidebar mt-1">
                        <div class="sidelink"> 
                            <span class="h5 text-center">KYCS</span>
                        </div>
                    </div>
                </NuxtLink>    

            </b-collapse>
            
        </div>
    </div>
</template>
