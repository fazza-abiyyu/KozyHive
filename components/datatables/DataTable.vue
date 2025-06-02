<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white rounded-xl space-y-4 border border-white">
  <!-- Header -->
    <div class="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center border-none">
    <h2 class="text-xl font-medium text-gray-800 w-full">{{ title }}</h2>
    </div>
    <!-- End Header -->

    <div class="h-full w-full mt-2 overflow-y-auto">
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="border border-white rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th v-for="(field, i) in fields" :key="i" scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    {{ field.label }}
                  </th>

                  <!-- Kolom Alat (Edit & Delete) -->
                  <th v-if="editAction || deleteAction || approveAction || rejectAction || activeAction || completedAction" scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase center flex items-center justify-center">
                   AKSI
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <!-- Render rows dynamically based on props.data -->
                <template v-if="isLoading">
                  <tr>
                    <td :colspan="fields.length"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      Memuat data...
                    </td>
                  </tr>
                </template>
                <template v-else-if="!isLoading && (data?.length ?? 0) > 0">
                  <tr v-for="(row, index) in data" :key="index">
                    <td v-for="field in fields" :key="field.key"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <!-- Gunakan getNestedValue untuk mengakses data nested -->
                      {{ getNestedValue(row, field.key) }}
                    </td>

                    <!-- Kolom Alat (Edit di Kiri, Delete di Kanan) -->
                    <td v-if="editAction || deleteAction || approveAction || rejectAction || activeAction || completedAction"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center justify-center gap-2">

                      <!-- Tombol Edit di Kiri -->
                      <router-link v-if="editAction" :to="getEditRoute(row)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.1665 3.33301H3.33317C2.89114 3.33301 2.46722 3.5086 2.15466 3.82116C1.8421 4.13372 1.6665 4.55765 1.6665 4.99967V16.6663C1.6665 17.1084 1.8421 17.5323 2.15466 17.8449C2.46722 18.1574 2.89114 18.333 3.33317 18.333H14.9998C15.4419 18.333 15.8658 18.1574 16.1783 17.8449C16.4909 17.5323 16.6665 17.1084 16.6665 16.6663V10.833" stroke="#24AB70" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.4165 2.0832C15.748 1.75168 16.1977 1.56543 16.6665 1.56543C17.1353 1.56543 17.585 1.75168 17.9165 2.0832C18.248 2.41472 18.4343 2.86436 18.4343 3.3332C18.4343 3.80204 18.248 4.25168 17.9165 4.5832L9.99984 12.4999L6.6665 13.3332L7.49984 9.99986L15.4165 2.0832Z" stroke="#24AB70" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </router-link>

                      <!-- Tombol Delete di Kanan -->
                      <button v-if="deleteAction" @click="handleDelete(row.id)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 5H17.5" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.8332 5V16.6667C15.8332 17.5 14.9998 18.3333 14.1665 18.3333H5.83317C4.99984 18.3333 4.1665 17.5 4.1665 16.6667V5" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.6665 5.00033V3.33366C6.6665 2.50033 7.49984 1.66699 8.33317 1.66699H11.6665C12.4998 1.66699 13.3332 2.50033 13.3332 3.33366V5.00033" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8.3335 9.16699V14.167" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M11.6665 9.16699V14.167" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>

                      <!-- Tombol terima Status di Kanan -->
                      <button v-if="approveAction" @click="handleApprove(row.id)">
                        <svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="44" height="24" rx="8" fill="#24AB70"/>
                          <path d="M30 6L19 17L14 12" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>

                      <!-- Tombol tolak Status di Kanan -->
                      <button v-if="rejectAction" @click="handleReject(row.id)">
                        <svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="44" height="24" rx="8" fill="#EF4444"/>
                          <path d="M28 6L16 18" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 6L28 18" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>

                      <!-- Tombol Aktif Status di Kanan -->
                      <button v-if="activeAction" @click="handleActive(row.id)">
                        <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="48" height="24" rx="8" fill="#2563EB"/>
                          <path d="M11.696 16H10.2983L13.4389 7.27273H14.9602L18.1009 16H16.7031L14.2358 8.85795H14.1676L11.696 16ZM11.9304 12.5824H16.4645V13.6903H11.9304V12.5824ZM20.4908 13.7798L20.4822 12.2244H20.7038L23.3118 9.45455H24.8373L21.8629 12.608H21.6626L20.4908 13.7798ZM19.3189 16V7.27273H20.593V16H19.3189ZM23.4524 16L21.1087 12.8892L21.9865 11.9986L25.0163 16H23.4524ZM29.114 9.45455V10.4773H25.5387V9.45455H29.114ZM26.4975 7.88636H27.7716V14.0781C27.7716 14.3253 27.8086 14.5114 27.8824 14.6364C27.9563 14.7585 28.0515 14.8423 28.1679 14.8878C28.2873 14.9304 28.4165 14.9517 28.5557 14.9517C28.658 14.9517 28.7475 14.9446 28.8242 14.9304C28.9009 14.9162 28.9606 14.9048 29.0032 14.8963L29.2333 15.9489C29.1594 15.9773 29.0543 16.0057 28.9179 16.0341C28.7816 16.0653 28.6111 16.0824 28.4066 16.0852C28.0713 16.0909 27.7588 16.0312 27.4691 15.9062C27.1793 15.7812 26.9449 15.5881 26.766 15.3267C26.587 15.0653 26.4975 14.7372 26.4975 14.3423V7.88636ZM30.5834 16V9.45455H31.8576V16H30.5834ZM31.2269 8.4446C31.0053 8.4446 30.8149 8.37074 30.6559 8.22301C30.4996 8.07244 30.4215 7.89347 30.4215 7.68608C30.4215 7.47585 30.4996 7.29687 30.6559 7.14915C30.8149 6.99858 31.0053 6.9233 31.2269 6.9233C31.4485 6.9233 31.6374 6.99858 31.7936 7.14915C31.9527 7.29687 32.0323 7.47585 32.0323 7.68608C32.0323 7.89347 31.9527 8.07244 31.7936 8.22301C31.6374 8.37074 31.4485 8.4446 31.2269 8.4446ZM36.7467 9.45455V10.4773H33.0479V9.45455H36.7467ZM34.0621 16V8.69602C34.0621 8.28693 34.1516 7.94744 34.3306 7.67756C34.5095 7.40483 34.7467 7.2017 35.0422 7.06818C35.3377 6.93182 35.6587 6.86364 36.0053 6.86364C36.261 6.86364 36.4797 6.88494 36.6615 6.92756C36.8433 6.96733 36.9783 7.00426 37.0663 7.03835L36.7681 8.0696C36.7084 8.05256 36.6317 8.03267 36.5379 8.00994C36.4442 7.98437 36.3306 7.97159 36.197 7.97159C35.8874 7.97159 35.6658 8.0483 35.5323 8.2017C35.4016 8.35511 35.3362 8.5767 35.3362 8.86648V16H34.0621Z" fill="white"/>
                        </svg>
                      </button>

                      <!-- Tombol Selesai Status di Kanan -->
                      <button v-if="completedAction" @click="handleCompleted(row.id)">
                        <svg width="62" height="24" viewBox="0 0 62 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="62" height="24" rx="8" fill="#24AB70"/>
                          <path d="M15.7188 9.56534C15.6733 9.16193 15.4858 8.84943 15.1562 8.62784C14.8267 8.40341 14.4119 8.29119 13.9119 8.29119C13.554 8.29119 13.2443 8.34801 12.983 8.46165C12.7216 8.57244 12.5185 8.72585 12.3736 8.92188C12.2315 9.11506 12.1605 9.33523 12.1605 9.58239C12.1605 9.78977 12.2088 9.96875 12.3054 10.1193C12.4048 10.2699 12.5341 10.3963 12.6932 10.4986C12.8551 10.598 13.0284 10.6818 13.2131 10.75C13.3977 10.8153 13.5753 10.8693 13.7457 10.9119L14.598 11.1335C14.8764 11.2017 15.1619 11.294 15.4545 11.4105C15.7472 11.527 16.0185 11.6804 16.2685 11.8707C16.5185 12.0611 16.7202 12.2969 16.8736 12.5781C17.0298 12.8594 17.108 13.196 17.108 13.5881C17.108 14.0824 16.9801 14.5213 16.7244 14.9048C16.4716 15.2884 16.1037 15.5909 15.6207 15.8125C15.1406 16.0341 14.5597 16.1449 13.8778 16.1449C13.2244 16.1449 12.6591 16.0412 12.1818 15.8338C11.7045 15.6264 11.331 15.3324 11.0611 14.9517C10.7912 14.5682 10.642 14.1136 10.6136 13.5881H11.9347C11.9602 13.9034 12.0625 14.1662 12.2415 14.3764C12.4233 14.5838 12.6548 14.7386 12.9361 14.8409C13.2202 14.9403 13.5312 14.9901 13.8693 14.9901C14.2415 14.9901 14.5724 14.9318 14.8622 14.8153C15.1548 14.696 15.3849 14.5312 15.5526 14.321C15.7202 14.108 15.804 13.8594 15.804 13.5753C15.804 13.3168 15.7301 13.1051 15.5824 12.9403C15.4375 12.7756 15.2401 12.6392 14.9901 12.5312C14.7429 12.4233 14.4631 12.3281 14.1506 12.2457L13.1193 11.9645C12.4205 11.7741 11.8665 11.4943 11.4574 11.125C11.0511 10.7557 10.848 10.267 10.848 9.65909C10.848 9.15625 10.9844 8.71733 11.2571 8.34233C11.5298 7.96733 11.8991 7.67614 12.3651 7.46875C12.831 7.25852 13.3565 7.15341 13.9418 7.15341C14.5327 7.15341 15.054 7.2571 15.5057 7.46449C15.9602 7.67188 16.3182 7.95739 16.5795 8.32102C16.8409 8.68182 16.9773 9.09659 16.9886 9.56534H15.7188ZM21.4602 16.1321C20.8153 16.1321 20.2599 15.9943 19.794 15.7188C19.331 15.4403 18.973 15.0497 18.7202 14.5469C18.4702 14.0412 18.3452 13.4489 18.3452 12.7699C18.3452 12.0994 18.4702 11.5085 18.7202 10.9972C18.973 10.4858 19.3253 10.0866 19.777 9.79972C20.2315 9.51278 20.7628 9.36932 21.3707 9.36932C21.74 9.36932 22.098 9.4304 22.4446 9.55256C22.7912 9.67472 23.1023 9.86648 23.3778 10.1278C23.6534 10.3892 23.8707 10.7287 24.0298 11.1463C24.1889 11.5611 24.2685 12.0653 24.2685 12.6591V13.1108H19.0653V12.1562H23.0199C23.0199 11.821 22.9517 11.5241 22.8153 11.2656C22.679 11.0043 22.4872 10.7983 22.24 10.6477C21.9957 10.4972 21.7088 10.4219 21.3792 10.4219C21.0213 10.4219 20.7088 10.5099 20.4417 10.6861C20.1775 10.8594 19.973 11.0866 19.8281 11.3679C19.6861 11.6463 19.615 11.9489 19.615 12.2756V13.0213C19.615 13.4588 19.6917 13.831 19.8452 14.1378C20.0014 14.4446 20.2187 14.679 20.4971 14.8409C20.7756 15 21.1008 15.0795 21.473 15.0795C21.7145 15.0795 21.9346 15.0455 22.1335 14.9773C22.3324 14.9062 22.5042 14.8011 22.6491 14.6619C22.794 14.5227 22.9048 14.3509 22.9815 14.1463L24.1875 14.3636C24.0909 14.7187 23.9176 15.0298 23.6676 15.2969C23.4204 15.5611 23.1094 15.767 22.7344 15.9148C22.3622 16.0597 21.9375 16.1321 21.4602 16.1321ZM27.0163 7.27273V16H25.7422V7.27273H27.0163ZM31.6115 16.1321C30.9666 16.1321 30.4112 15.9943 29.9453 15.7188C29.4822 15.4403 29.1242 15.0497 28.8714 14.5469C28.6214 14.0412 28.4964 13.4489 28.4964 12.7699C28.4964 12.0994 28.6214 11.5085 28.8714 10.9972C29.1242 10.4858 29.4765 10.0866 29.9282 9.79972C30.3828 9.51278 30.914 9.36932 31.522 9.36932C31.8913 9.36932 32.2492 9.4304 32.5958 9.55256C32.9424 9.67472 33.2535 9.86648 33.5291 10.1278C33.8046 10.3892 34.022 10.7287 34.1811 11.1463C34.3402 11.5611 34.4197 12.0653 34.4197 12.6591V13.1108H29.2166V12.1562H33.1711C33.1711 11.821 33.1029 11.5241 32.9666 11.2656C32.8302 11.0043 32.6385 10.7983 32.3913 10.6477C32.147 10.4972 31.86 10.4219 31.5305 10.4219C31.1725 10.4219 30.86 10.5099 30.593 10.6861C30.3288 10.8594 30.1242 11.0866 29.9794 11.3679C29.8373 11.6463 29.7663 11.9489 29.7663 12.2756V13.0213C29.7663 13.4588 29.843 13.831 29.9964 14.1378C30.1527 14.4446 30.37 14.679 30.6484 14.8409C30.9268 15 31.2521 15.0795 31.6242 15.0795C31.8657 15.0795 32.0859 15.0455 32.2848 14.9773C32.4836 14.9062 32.6555 14.8011 32.8004 14.6619C32.9453 14.5227 33.0561 14.3509 33.1328 14.1463L34.3387 14.3636C34.2421 14.7187 34.0688 15.0298 33.8188 15.2969C33.5717 15.5611 33.2606 15.767 32.8856 15.9148C32.5135 16.0597 32.0887 16.1321 31.6115 16.1321ZM40.7982 11.0526L39.6434 11.2571C39.5951 11.1094 39.5184 10.9687 39.4133 10.8352C39.311 10.7017 39.1718 10.5923 38.9957 10.5071C38.8195 10.4219 38.5994 10.3793 38.3352 10.3793C37.9744 10.3793 37.6732 10.4602 37.4318 10.6222C37.1903 10.7812 37.0695 10.9872 37.0695 11.2401C37.0695 11.4588 37.1505 11.6349 37.3124 11.7685C37.4744 11.902 37.7357 12.0114 38.0965 12.0966L39.1363 12.3352C39.7386 12.4744 40.1874 12.6889 40.4829 12.9787C40.7784 13.2685 40.9261 13.6449 40.9261 14.108C40.9261 14.5 40.8124 14.8494 40.5852 15.1562C40.3607 15.4602 40.0468 15.6989 39.6434 15.8722C39.2428 16.0455 38.7784 16.1321 38.2499 16.1321C37.517 16.1321 36.919 15.9759 36.4559 15.6634C35.9928 15.348 35.7087 14.9006 35.6036 14.321L36.8352 14.1335C36.9119 14.4545 37.0695 14.6974 37.3082 14.8622C37.5468 15.0241 37.8579 15.1051 38.2414 15.1051C38.659 15.1051 38.9928 15.0185 39.2428 14.8452C39.4928 14.669 39.6178 14.4545 39.6178 14.2017C39.6178 13.9972 39.5411 13.8253 39.3877 13.6861C39.2372 13.5469 39.0056 13.4418 38.6931 13.3707L37.5852 13.1278C36.9744 12.9886 36.5227 12.767 36.2301 12.4631C35.9403 12.1591 35.7954 11.7741 35.7954 11.3082C35.7954 10.9219 35.9034 10.5838 36.1193 10.294C36.3352 10.0043 36.6335 9.77841 37.0141 9.61648C37.3948 9.4517 37.8309 9.36932 38.3224 9.36932C39.0298 9.36932 39.5866 9.52273 39.9928 9.82955C40.3991 10.1335 40.6676 10.5412 40.7982 11.0526ZM44.2918 16.1449C43.8771 16.1449 43.5021 16.0682 43.1668 15.9148C42.8316 15.7585 42.566 15.5327 42.37 15.2372C42.1768 14.9418 42.0802 14.5795 42.0802 14.1506C42.0802 13.7812 42.1512 13.4773 42.2933 13.2386C42.4353 13 42.6271 12.8111 42.8685 12.6719C43.11 12.5327 43.3799 12.4276 43.6782 12.3565C43.9765 12.2855 44.2805 12.2315 44.5901 12.1946C44.9822 12.1491 45.3004 12.1122 45.5447 12.0838C45.789 12.0526 45.9665 12.0028 46.0773 11.9347C46.1881 11.8665 46.2435 11.7557 46.2435 11.6023V11.5724C46.2435 11.2003 46.1384 10.9119 45.9282 10.7074C45.7208 10.5028 45.4111 10.4006 44.9992 10.4006C44.5702 10.4006 44.2322 10.4957 43.985 10.6861C43.7407 10.8736 43.5717 11.0824 43.4779 11.3125L42.2805 11.0398C42.4225 10.642 42.6299 10.321 42.9026 10.0767C43.1782 9.82955 43.495 9.65057 43.8529 9.53977C44.2109 9.42614 44.5873 9.36932 44.9822 9.36932C45.2435 9.36932 45.5205 9.40057 45.8131 9.46307C46.1086 9.52273 46.3842 9.63352 46.6398 9.79545C46.8984 9.95739 47.11 10.1889 47.2748 10.4901C47.4396 10.7884 47.5219 11.1761 47.5219 11.6534V16H46.2776V15.1051H46.2265C46.1441 15.2699 46.0205 15.4318 45.8558 15.5909C45.691 15.75 45.4793 15.8821 45.2208 15.9872C44.9623 16.0923 44.6526 16.1449 44.2918 16.1449ZM44.5688 15.1222C44.9211 15.1222 45.2222 15.0526 45.4722 14.9134C45.7251 14.7741 45.9168 14.5923 46.0475 14.3679C46.181 14.1406 46.2478 13.8977 46.2478 13.6392V12.7955C46.2023 12.8409 46.1143 12.8835 45.9836 12.9233C45.8558 12.9602 45.7094 12.9929 45.5447 13.0213C45.3799 13.0469 45.2194 13.071 45.0631 13.0938C44.9069 13.1136 44.7762 13.1307 44.6711 13.1449C44.4239 13.1761 44.1981 13.2287 43.9935 13.3026C43.7918 13.3764 43.6299 13.483 43.5077 13.6222C43.3884 13.7585 43.3288 13.9403 43.3288 14.1676C43.3288 14.483 43.4452 14.7216 43.6782 14.8835C43.9111 15.0426 44.208 15.1222 44.5688 15.1222ZM49.279 16V9.45455H50.5532V16H49.279ZM49.9225 8.4446C49.7009 8.4446 49.5106 8.37074 49.3515 8.22301C49.1952 8.07244 49.1171 7.89347 49.1171 7.68608C49.1171 7.47585 49.1952 7.29687 49.3515 7.14915C49.5106 6.99858 49.7009 6.9233 49.9225 6.9233C50.1441 6.9233 50.333 6.99858 50.4893 7.14915C50.6484 7.29687 50.7279 7.47585 50.7279 7.68608C50.7279 7.89347 50.6484 8.07244 50.4893 8.22301C50.333 8.37074 50.1441 8.4446 49.9225 8.4446Z" fill="white"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td :colspan="fields.length"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                      Data Tidak Ditemukan
                    </td>
                  </tr>
                </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav class="flex items-center gap-x-1" aria-label="Pagination">
      <button type="button"
              class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Previous" :disabled="currentPage === 1" @click="changePage(prevPage, currentPage -1)">
        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span class="sr-only">Previous</span>
      </button>

      <div class="flex items-center gap-x-1">
        <span
            class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
          {{ currentPage }}
        </span>
        <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">of</span>
        <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">{{
            totalPages
          }}</span>
      </div>

      <button type="button"
              class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Next" @click="changePage(nextPage, currentPage + 1)" :disabled="currentPage === totalPages">
        <span class="sr-only">Next</span>
        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
    <!-- End Pagination -->
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce';
import { useRoute } from 'vue-router';

const route = useRoute();
const getAddRoute = () => `${route.path}/add`;

const getEditRoute = (row: Record<string, any>) => {
  if ("owner" in row) {
    return `/dashboard/properties/edit/${row.id}`;
  } else if ("category" in row) {
    return `/cashflow/edit/${row.id}`;
  } else if ("email" in row) {
    return `/users/edit/${row.id}`;
  } else {
    return "/";
  }
};

// Define the props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array as () => Array<{ label: string; key: string }>,
    required: true,
  },
  data: {
    type: Array as () => Array<Record<string, any>>,
    required: true,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1
  },
  prevPage: {
    type: String,
    default: null,
  },
  nextPage: {
    type: String,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  addAction: {
    type: Boolean,
    default: false,
  },
  deleteAction: {
    type: Boolean,
    default: false,
  },
  editAction: {
    type: Boolean,
    default: false,
  },
  activeAction: {
    type: Boolean,
    default: false,
  },
  rejectAction: {
    type: Boolean,
    default: false,
  },
  approveAction: {
    type: Boolean,
    default: false,
  },
  completedAction: {
    type: Boolean,
    default: false,
  },
});


const emits = defineEmits(['fetchData', 'searchData', 'deleteData', 'activeData', 'rejectData', 'approveData', "completedData"]);
const searchText = ref('');

// Function to get the value of a nested key (e.g., 'user.profile.name')
const getNestedValue = (obj: Record<string, any>, key: string): any => {
  return key.split('.').reduce((acc, part) => acc?.[part], obj);
};

const changePage = (url: string, currentPage: number) => {
  const payload = { url, currentPage };
  emits('fetchData', payload)
}

const handleDelete = async (id: number) => {
  emits('deleteData', id)
}

const handleSearch = debounce(async () => {
  emits('searchData', searchText.value);
}, 500);

const handleActive = async (id: number) => {
  emits('activeData', id)
}

const handleReject = async (id: number) => {
  emits('rejectData', id)
}
const handleApprove = async (id: number) => {
  emits('approveData', id)
}
const handleCompleted = async (id: number) => {
  emits('completedData', id)
}
watch(searchText, handleSearch)
</script>
<style lang="css" scoped>
</style>