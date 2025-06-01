<template xmlns="http://www.w3.org/1999/html">
  <DashSidebar/>

  <div class="w-full lg:ps-64">
    <!-- Header -->
    <div>
      <h2 class="p-4 sm:p-6 space-y-4 sm:space-y-6 text-xl font-medium text-gray-800 w-full">Pengajuan Penarikan</h2>
    </div>
    <!-- End Header -->
    <form @submit.prevent="handleSubmit">
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <!-- Nama -->
        <div class="grid sm:grid-cols-3">
          <label for="name" class="block text-sm font-medium mb-2 w-full">Nama</label>
          <input type="text" id="name"
                 v-model="name"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                 placeholder="Nama Lengkap Penerima">
        </div>

        <!-- Bank -->
        <div class="grid sm:grid-cols-3">
          <label for="bank" class="block text-sm font-medium mb-2 w-full">Bank</label>
          <input type="text" id="bank"
                 v-model="bank"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                 placeholder="Bank Tujuan">
        </div>

        <!-- Nomer Rekening -->
        <div class="grid sm:grid-cols-3">
          <label for="noRekening" class="block text-sm font-medium mb-2 w-full">No Rekening</label>
          <input type="text" id="noRekening"
                 v-model="noRekening"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                 placeholder="Nomer Rekening Tujuan">
        </div>

        <!-- Jumlah -->
        <div class="grid sm:grid-cols-3">
          <label for="amount" class="block text-sm font-medium mb-2 w-full">Jumlah</label>
          <input type="number" id="amount"
                 v-model="amount"
                 class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                 placeholder="Rp. ">
        </div>

        <!-- Jumlah -->
        <div class="grid sm:grid-cols-3">
            <label class="block text-large font-medium text-black mb-1">Total Saldo Tersedia :</label>
            <input
                type="text" v-model="totalAmount"
                class="col-span-2 py-3 px-4 block w-full border border-white rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" readonly/>
        </div>

        <!-- Submit Button -->
        <div class="space-x-3 self-end">
          <button type="submit"
                  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  :disabled="isLoading">
            Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useNuxtApp} from "#imports";
import useFetchApi from '~/composables/useFetchApi';
import { useRouter } from "vue-router";
import DashSidebar from "~/components/DashSidebar.vue";
import {Cashflow} from "~/server/models/Cashflow";
import {CashflowType} from "@prisma/client";

const router = useRouter();
const {$toast} = useNuxtApp();



const name = ref<string | null>(null); // Form input mapped to 'title'
const bank = ref<string | null>(null);
const noRekening = ref<string | null>(null);
const amount = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const clearForm = () => {
  name.value = null;
  bank.value = null;
  noRekening.value = null;
  amount.value = null;
};

const totalAmount = ref(0);

async function getTotalAmount() {
  isLoading.value = true;
  try {
    const { data } = await useFetchApi("/api/cashflow/total-amount", {
      method: "GET",
    });

    if (data && data.amount) {
      totalAmount.value = data.amount; // Pastikan nilai masuk ke dalam input
    }
  } catch (error) {
    console.error("Error mendapatkan total saldo:", error);
  } finally {
    isLoading.value = false;
  }
}

const handleSubmit = async () => {
  try {
    // Basic validation
    if (!name.value) {
      $toast('Nama Lengkap harus diisi.', 'error');
      return;
    }
    if (!bank.value) {
      $toast('Bank tidak boleh kosong.', 'error');
      return;
    }
    if (!amount.value) {
      $toast('Jumlah uang harus diisi.', 'error');
      return;
    }

    isLoading.value = true;

    // Transform data for API (map frontend fields to backend expected fields)
    const payload = {
      name: name.value,
      bank: bank.value,
      amount: amount.value,
      number: noRekening.value,
      type: CashflowType.CREDIT
    };

    // API call
    await useFetchApi('/api/cashflow', {
      method: 'POST',
      body: payload,
    });

    $toast('Data arus kas berhasil ditambahkan!', 'success');
    clearForm();
    router.push('/dashboard/cashflow');
  } catch (error) {
    $toast('Terjadi kesalahan pada server. Silakan coba lagi.', 'error');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getTotalAmount();
});
</script>

<style lang="css" scoped>
</style>