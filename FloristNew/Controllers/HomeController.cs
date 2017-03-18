using System.Web.Mvc;

namespace FloristNew.Controllers
{
    [System.Web.Http.Route("")]
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public ActionResult Index()
        {
            return View();
        }
    }
}
