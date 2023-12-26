using System.Web;
using System.Web.Optimization;

namespace Impulse
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));


            //........................For default...............
            bundles.Add(new ScriptBundle("~/bundles/icore_js").Include(
                "~/Scripts/js/bootstrap.min.js",
                "~/Scripts/js/demo/peity-demo.js",
                "~/Scripts/js/demo/sparkline-demo.js",
                "~/Scripts/js/inspinia.js",
                "~/Scripts/js/jquery-2.1.1.js",
                "~/Scripts/js/plugins/chartJs/Chart.min.js",
                "~/Scripts/js/plugins/flot/jquery.flot.js",
                "~/Scripts/js/plugins/flot/jquery.flot.pie.js",
                "~/Scripts/js/plugins/flot/jquery.flot.resize.js",
                "~/Scripts/js/plugins/flot/jquery.flot.spline.js",
                "~/Scripts/js/plugins/flot/jquery.flot.tooltip.min.js",
                "~/Scripts/js/plugins/gritter/jquery.gritter.min.js",
                "~/Scripts/js/plugins/jquery-ui/jquery-ui.min.js",
                "~/Scripts/js/plugins/metisMenu/jquery.metisMenu.js",
                "~/Scripts/js/plugins/pace/pace.min.js",
                "~/Scripts/js/plugins/peity/jquery.peity.min.js",
                "~/Scripts/js/plugins/slimscroll/jquery.slimscroll.min.js",
                "~/Scripts/js/plugins/sparkline/jquery.sparkline.min.js",
                "~/Scripts/js/plugins/toastr/toastr.min.js" ));

            bundles.Add(new ScriptBundle("~/bundles/assetsJS").Include(
                "~/assets/global/plugins/jquery.min.js",
                "~/assets/global/plugins/bootstrap/js/bootstrap.min.js",
                "~/assets/global/plugins/js.cookie.min.js",
                "~/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js",
                "~/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js",
                "~/assets/global/plugins/jquery.blockui.min.js",
                "~/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js",
                "~/assets/global/scripts/app.min.js",
                "~/assets/pages/scripts/lock.min.js"));

            bundles.Add(new StyleBundle("~/assets/assetsCSS").Include(
               "~/assets/global/plugins/font-awesome/css/font-awesome.min.css",
               "~/assets/global/plugins/simple-line-icons/simple-line-icons.min.css",
               "~/assets/global/plugins/bootstrap/css/bootstrap.min.css",
               "~/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css",
               "~/assets/global/css/components.min.css",
               "~/assets/global/css/plugins.min.css",
               "~/assets/pages/css/lock.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/icore_js1").Include(
               "~/Scripts/js/bootstrap.min.js",
               "~/Scripts/js/demo/peity-demo.js",
               "~/Scripts/js/demo/sparkline-demo.js",
               "~/Scripts/js/inspinia1.js",
               "~/Scripts/js/jquery-2.1.1.js",
               "~/Scripts/js/plugins/chartJs/Chart.min.js",
               "~/Scripts/js/plugins/flot/jquery.flot.js",
               "~/Scripts/js/plugins/flot/jquery.flot.pie.js",
               "~/Scripts/js/plugins/flot/jquery.flot.resize.js",
               "~/Scripts/js/plugins/flot/jquery.flot.spline.js",
               "~/Scripts/js/plugins/flot/jquery.flot.tooltip.min.js",
               "~/Scripts/js/plugins/gritter/jquery.gritter.min.js",
               "~/Scripts/js/plugins/jquery-ui/jquery-ui.min.js",
               "~/Scripts/js/plugins/metisMenu/jquery.metisMenu.js",
                //"~/Scripts/js/plugins/pace/pace.min.js",
               "~/Scripts/js/plugins/peity/jquery.peity.min.js",
               "~/Scripts/js/plugins/slimscroll/jquery.slimscroll.min.js",
               "~/Scripts/js/plugins/sparkline/jquery.sparkline.min.js",
               "~/Scripts/js/plugins/toastr/toastr.min.js"));



            bundles.Add(new StyleBundle("~/Content/icore_css").Include(
                "~/Content/css/bootstrap.min.css",
                "~/Content/font-awesome/css/font-awesome.css",
                "~/Content/css/plugins/toastr/toastr.min.css",
                "~/Scripts/js/plugins/gritter/jquery.gritter.css",
                "~/Content/css/animate.css",
                "~/Content/css/style.css"));
            //........................End default...............

            //........................For Plugin...............
            bundles.Add(new StyleBundle("~/Content/plugin_css").Include(
                   "~/Content/css/plugins/iCheck/custom.css",
                   "~/Content/css/plugins/chosen/chosen.css",
                   "~/Content/css/plugins/colorpicker/bootstrap-colorpicker.min.css",
                   "~/Content/css/plugins/cropper/cropper.min.css",
                   "~/Content/css/plugins/switchery/switchery.css",
                   "~/Content/css/plugins/jasny/jasny-bootstrap.min.css",
                   "~/Content/css/plugins/nouslider/jquery.nouislider.css",
                   "~/Content/css/plugins/datapicker/datepicker3.css",
                   "~/Content/css/plugins/ionRangeSlider/ion.rangeSlider.css",
                   "~/Content/css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css",
                   "~/Content/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css",
                   "~/Content/css/plugins/clockpicker/clockpicker.css",
                   "~/Content/css/plugins/daterangepicker/daterangepicker-bs3.css",
                   "~/Content/css/plugins/select2/select2.min.css",
                   "~/Content/css/plugins/touchspin/jquery.bootstrap-touchspin.min.css",
                   "~/Content/css/plugins/sweetalert/sweetalert.css",
                   "~/Content/css/plugins/dropzone/basic.css",
                   "~/Content/css/plugins/dropzone/dropzone.css",
                   "~/Content/css/plugins/jqGrid/ui.jqgrid.css",
                   "~/Content/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" ,
                   "~/Content/css/style.css"));

            bundles.Add(new ScriptBundle("~/bundles/plugin_js").Include(
                    "~/Scripts/js/plugins/slimscroll/jquery.slimscroll.min.js",
                    "~/Scripts/js/plugins/chosen/chosen.jquery.js",
                    "~/Scripts/js/plugins/jsKnob/jquery.knob.js",
                    "~/Scripts/js/plugins/jasny/jasny-bootstrap.min.js",
                    "~/Scripts/js/plugins/datapicker/bootstrap-datepicker.js",
                    "~/Scripts/js/plugins/nouslider/jquery.nouislider.min.js",
                    "~/Scripts/js/plugins/switchery/switchery.js",
                    "~/Scripts/js/plugins/ionRangeSlider/ion.rangeSlider.min.js",
                    "~/Scripts/js/plugins/iCheck/icheck.min.js",
                    "~/Scripts/js/plugins/metisMenu/jquery.metisMenu.js",
                    "~/Scripts/js/plugins/colorpicker/bootstrap-colorpicker.min.js",
                    "~/Scripts/js/plugins/clockpicker/clockpicker.js",
                    "~/Scripts/js/plugins/cropper/cropper.min.js",
                    "~/Scripts/js/plugins/fullcalendar/moment.min.js",
                    "~/Scripts/js/plugins/daterangepicker/daterangepicker.js",
                    "~/Scripts/js/plugins/select2/select2.full.min.js",
                    "~/Scripts/js/plugins/sweetalert/sweetalert.min.js",
                    "~/Scripts/js/plugins/dropzone/dropzone.js",
                    "~/Scripts/js/plugins/jqGrid/i18n/grid.locale-en.js",
                    "~/Scripts/js/plugins/jqGrid/jquery.jqGrid.min.js",
                    "~/Scripts/js/plugins/touchspin/jquery.bootstrap-touchspin.min.js"  ));

            //........................End Plugin...............

            //-----------Application js/css..............................
            bundles.Add(new ScriptBundle("~/bundles/icore_app_js").Include(
              "~/Scripts/App_js/framework/UserConfig.js",
              "~/Scripts/App_js/Common/APICall.js",
              "~/Scripts/App_js/Common/CommonFunctions.js",
              "~/Scripts/App_js/Common/CommonSearch.js",
              "~/Scripts/App_js/Common/JQGridFunctions.js"));
            //-----------End Application js/css----------------------------

        }
    }
}
