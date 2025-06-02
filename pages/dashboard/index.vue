<template>
  <DashSidebar/>
    <!-- Breadcrumb -->
    <div
        class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
      <div class="flex items-center py-2">
        <!-- Navigation Toggle -->
        <button type="button"
                class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
                aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
          <span class="sr-only">Toggle Navigation</span>
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M15 3v18"/>
            <path d="m8 9 3 3-3 3"/>
          </svg>
        </button>
        <!-- End Navigation Toggle -->

        <!-- Breadcrumb -->
        <ol class="ms-3 flex items-center whitespace-nowrap">
          <li class="flex items-center text-sm text-gray-800">
            Aplikasi
            <svg class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 " width="16"
                 height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round"/>
            </svg>
          </li>
          <li class="text-sm font-semibold text-gray-800 truncate" aria-current="page">
            Dashboard
          </li>
        </ol>
        <!-- End Breadcrumb -->
      </div>
    </div>
    <!-- End Breadcrumb -->

    <div class="w-full lg:ps-64">
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div v-if="userRole === 'ADMIN'">
          <!--   Cards Stats   -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Pengguna
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Pengguna Aktif
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ dashboard.totalUsers }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Kost
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Kost
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ dashboard.totalProperties }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Transaksi
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Transaksi
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ dashboard.totalTransactions }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Pendapatan
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Pendapatan
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ stats.totalRevenue }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Transaksi Berhasil
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Transaksi Berhasil
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ stats.successfulTransactions }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Transaksi Gagal
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Transaksi Gagal
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ stats.failedTransactions }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->
          </div>
        </div>
        <div v-if="userRole === 'OWNER'">
          <!--   Cards Stats   -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Kost
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Kost
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ ownerDash?.totalProperties }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Pemesan
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Pemesan
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ ownerDash.totalBookings }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Transaksi
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Transaksi
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ ownerDash.totalTransactions }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Pendapatan
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Pendapatan
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ ownerStats.totalRevenue }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="flex flex-col bg-white border shadow-sm rounded-xl">
              <div class="p-4 md:p-5">
                <div class="flex items-center gap-x-2">
                  <p class="text-xs uppercase tracking-wide text-gray-500">
                    Total Transaksi Berhasil
                  </p>
                  <div class="hs-tooltip">
                    <div class="hs-tooltip-toggle">
                      <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      <span
                          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                          role="tooltip">
                      Total Transaksi Berhasil
                    </span>
                    </div>
                  </div>
                </div>

                <div class="mt-1 flex items-center gap-x-2">
                  <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                    {{ ownerStats.successfulTransactions }}
                  </h3>
                </div>
              </div>
            </div>
            <!-- End Card -->
          </div>
        </div>
      </div>
    </div>

</template>

<script setup lang="ts">
// Menentukan metadata halaman
definePageMeta({
  layout: false // Menggunakan layout custom
});

import DashSidebar from "~/components/DashSidebar.vue";

const userRole = useCookie('user.role').value;

const dashboardData = ref([])
const statsData = ref([])
const dashOwnerData = ref([])
const statsOwnerData = ref([])


const dashboard: any = computed(() => dashboardData.value)
const stats: any = computed(() => statsData.value)
const ownerDash: any = computed(() => dashOwnerData.value)
const ownerStats: any = computed(() => statsOwnerData.value)

const fetchDashboardData = async () => {
  try {
    const response: any = await useFetchApi('/api/admin/dashboard')
   dashboardData.value = response?.data
  } catch (e) {

  }
}


const fetchStatsData = async () => {
  try {
    const response: any = await useFetchApi('/api/admin/dashboard/stats')
    statsData.value = response?.data
  } catch (e) {

  }
}

const fetchOwnerDashData = async () => {
  try {
    const response: any = await useFetchApi('/api/dashboard/owner')
    dashOwnerData.value = response?.data
  } catch (e) {

  }
}

const fetchOwnerStatsData = async () => {
  try {
    const response: any = await useFetchApi('/api/dashboard/owner/stats')
    statsOwnerData.value = response?.data
  } catch (e) {

  }
}

onMounted(() => {
  fetchDashboardData()
  fetchStatsData()
  fetchOwnerDashData()
  fetchOwnerStatsData()
})
</script>