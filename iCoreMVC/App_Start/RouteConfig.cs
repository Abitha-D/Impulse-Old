using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Impulse
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                 name: "RecordSleepEvent",
                 url: "{controller}/{action}/{id}",
                 defaults: new { controller = "Home", action = "RecordSleepEvent", id = UrlParameter.Optional },
                 namespaces: new[] { "Impulse_Emp.Controllers" }
             );


            routes.MapRoute(
                name: "RecordWakeEvent",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "RecordWakeEvent", id = UrlParameter.Optional },
                namespaces: new[] { "Impulse_Emp.Controllers" }
             );

            routes.MapRoute(
                name: "GetSleepWakeTimes",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "GetSleepWakeTimes", id = UrlParameter.Optional },
                namespaces: new[] { "Impulse_Emp.Controllers" }
             );

            routes.MapRoute(
                name: "GetSleepWakeTimeswithoutClearEntry",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "GetSleepWakeTimes", id = UrlParameter.Optional },
                namespaces: new[] { "Impulse_Emp.Controllers" }
             );
        }
    }
}
