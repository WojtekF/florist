using System.Web.Http;
using System.Web.Mvc;
using FloristNew.Controllers.API;
using FloristNew.Core;
using FloristNew.Repositories;
using FloristNew.Repositories.Interfaces;
using Microsoft.Practices.Unity;
using Unity.Mvc4;

namespace FloristNew
{
    public static class Bootstrapper
    {
        public static void Initialise()
        {
            var container = BuildUnityContainer();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityResolver(container);
        }

        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<IVatRepository, VatRepository>();

            return container;
        }
    }
}