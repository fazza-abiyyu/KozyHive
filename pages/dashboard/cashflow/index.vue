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
          Pengguna
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <DatatablesDataTable
          :title="'Daftar Pengajuan'"
          :fields="[
      { label: 'ID', key: 'id' },
      { label: 'NAMA', key: 'name' },
      { label: 'BANK', key: 'bank' },
      { label: 'NOMER REKENING', key: 'number' },
      { label: 'TIPE TRANSAKSI', key: 'type' },
      { label: 'TANGGAL DIBUAT', key: 'createdAt' },
      { label: 'JUMLAH', key: 'amount' },
      { label: 'STATUS', key: 'status' },
    ]"
          :data="properties"
          :perPage="pageSize"
          :totalPages="totalPages"
          :currentPage="currentPage"
          :prevPage="prevPage"
          :nextPage="nextPage"
          :isLoading="isLoading"
          :approve-action="true"
          :reject-action="true"
          @fetchData="(e) => handleChangeFetchData(e)"
          @approveData="(e) => handleApproveData(e)"
          @rejectData="(e) => handleRejectData(e)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const {handleError} = useErrorHandling();
import DashSidebar from "~/components/DashSidebar.vue";
const {$toast} = useNuxtApp();

// Menentukan metadata halaman
definePageMeta({
  layout: false // Menggunakan layout custom
});


const page = ref(1)
const limit = ref(10)
const totalPages = ref(1)
const currentPage = ref(1)
const nextPage = ref()
const prevPage = ref()
const propertiesData = ref([])
const isLoading = ref<boolean>(false)

const properties = computed(() => propertiesData.value)

const pageSize = limit

const fetchCashflow = async () => {
  try {
    isLoading.value = true
    const response: any = await useFetchApi(`/api/cashflow?page=${page.value}&limit=${pageSize.value}`);
    propertiesData.value = response?.data;
    totalPages.value = response?.meta?.totalPages;
    nextPage.value = response?.meta?.next;
    prevPage.value = response?.meta?.prev;

  } catch (e) {
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

const handleChangeFetchData = async (payload: { currentPage: number }) => {
  try {
    isLoading.value = true;
    const response: any = await useFetchApi(`/api/cashflow?page=${payload.currentPage}&limit=${pageSize.value}`);
    propertiesData.value = response?.data;
    totalPages.value = response?.meta?.totalPages;
    nextPage.value = response?.meta?.next;
    prevPage.value = response?.meta?.prev;
    currentPage.value = payload.currentPage;
    console.log("Current Page:", currentPage.value);
  } catch (e) {
    handleError(e);
  } finally {
    isLoading.value = false;
  }
};

const handleApproveData = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan, harap login ulang.");
    }

    await useFetchApi(`/api/cashflow/${id}/status`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "status": 'SUCCESS',
      })
    })
    propertiesData.value = propertiesData.value.filter((item: any) => item.id !== id)

    // Refresh halaman setelah update sukses

    setTimeout(() => {
      window.location.reload();
    }, 100);

    $toast('Berhasil mengubah status.', 'success');
  } catch (e) {
  }
}


const handleRejectData = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan, harap login ulang.");
    }

    await useFetchApi(`/api/cashflow/${id}/status`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "status": 'FAILED',
      })
    })
    propertiesData.value = propertiesData.value.filter((item: any) => item.id !== id)
    // Refresh halaman setelah update sukses

    setTimeout(() => {
      window.location.reload();
    }, 100);

    $toast('Berhasil mengubah status.', 'success');
  } catch (e) {
    $toast('Gagal mengubah status.', 'error');
  }
}

onMounted(async () => {
  await fetchCashflow()
})
</script>

<style scoped>

</style>