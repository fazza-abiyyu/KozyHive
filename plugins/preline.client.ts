import { defineNuxtPlugin } from "#app";

// Optional third-party libraries
import $ from "jquery";
import _ from "lodash";
import noUiSlider from "nouislider";
import "datatables.net";
import "dropzone/dist/dropzone-min.js";
import * as VanillaCalendarPro from "vanilla-calendar-pro";

// Attach to window (only in client-side)
if (process.client) {
    window._ = _;
    window.$ = $;
    window.jQuery = $;
    window.DataTable = $.fn.dataTable;
    window.noUiSlider = noUiSlider;
    window.VanillaCalendarPro = VanillaCalendarPro;

    // Import Preline UI
    import("preline/dist").then(() => {
        if (window.HSStaticMethods?.autoInit) {
            window.HSStaticMethods.autoInit();
        }
    });
}

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        nuxtApp.hook("page:finish", () => {
            setTimeout(() => {
                if (window.HSStaticMethods?.autoInit) {
                    window.HSStaticMethods.autoInit();
                }
            });
        });
    }
});
