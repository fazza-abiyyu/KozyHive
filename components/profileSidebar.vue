<template>
  <div id="hs-application-sidebar" class="hs-overlay [--auto-close:lg]
  hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform
  w-[260px] h-full hidden fixed inset-y-0 start-0 z-[60]
  bg-white border-e border-gray-200 p-4 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 top-[10%]"
       role="dialog" tabindex="-1" aria-label="Sidebar">
    <!-- Sidebar -->
    <div id="hs-application-sidebar" class="absolute bottom-0 left-0 w-[260px] h-full bg-white border-e border-gray-200 p-4">
      <div class="relative flex flex-col h-full max-h-full">
        <!-- Content -->
        <div class="h-full overflow-y-auto">
          <ul class="flex flex-col space-y-1">
            <li>
              <NuxtLink
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  to="/profile" active-class="bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_221012_2087)">
                    <path d="M10.0002 16.6668C13.6821 16.6668 16.6668 13.6821 16.6668 10.0002C16.6668 6.31826 13.6821 3.3335 10.0002 3.3335C6.31826 3.3335 3.3335 6.31826 3.3335 10.0002C3.3335 13.6821 6.31826 16.6668 10.0002 16.6668Z" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 10.6665C11.1046 10.6665 12 9.77107 12 8.6665C12 7.56193 11.1046 6.6665 10 6.6665C8.89543 6.6665 8 7.56193 8 8.6665C8 9.77107 8.89543 10.6665 10 10.6665Z" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.6665 15.7748V14.6668C6.6665 14.3132 6.80698 13.9741 7.05703 13.724C7.30708 13.474 7.64622 13.3335 7.99984 13.3335H11.9998C12.3535 13.3335 12.6926 13.474 12.9426 13.724C13.1927 13.9741 13.3332 14.3132 13.3332 14.6668V15.7748" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_221012_2087">
                      <rect width="16" height="16" fill="white" transform="translate(2 2)"/>
                    </clipPath>
                  </defs>
                </svg>
                Profile
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  to="/profile/history" active-class="bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.3335 9.33317L8.00016 4.6665" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.6667 9.33317L12 4.6665" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.3335 9.3335H16.6668" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.3335 9.3335L5.40016 14.2668C5.4625 14.5725 5.63006 14.8467 5.87369 15.0416C6.11731 15.2365 6.42157 15.3398 6.7335 15.3335H13.2668C13.8668 15.3335 14.4668 14.8668 14.6002 14.2668L15.7335 9.3335" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 9.3335L8.66667 15.3335" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5 12.3335H15" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.0002 9.3335L11.3335 15.3335" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Riwayat
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  to="/dashboard" active-class="bg-gray-100">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Dashboard
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
</script>

<style scoped>

</style>