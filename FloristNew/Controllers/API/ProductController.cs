using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using FloristNew.Models;
using FloristNew.Models.Simplified;
using FloristNew.Repositories.Interfaces;

namespace FloristNew.Controllers.API
{
    [System.Web.Http.Route("api/products")]
    public class ProductController : ApiController
    {
        private readonly IProductsRepository productRepository;
        private readonly IVatRepository vatRepository;

        public ProductController(IProductsRepository productRepository, IVatRepository vatRepository)
        {
            this.productRepository = productRepository;
            this.vatRepository = vatRepository;
        }

        // GET: api/values
        [System.Web.Http.Route("")]
        [System.Web.Http.HttpGet]
        public IEnumerable<ProductModel> GetAllProducts()
        {
            return this.productRepository.GetAllProducts();
        }
        [System.Web.Http.Route("add")]
        [System.Web.Http.HttpPost]
        public void AddProduct([FromBody] ProductModel product)
        {
            product.Vat = this.vatRepository.GetSimplifiedVats().FirstOrDefault(v => v.Id == product.Vat.Id);
            this.productRepository.SaveProduct(product);
        }

        [System.Web.Http.Route("change")]
        [System.Web.Http.HttpPost]
        public void ChangeProduct([FromBody] ProductModel product)
        {
            this.productRepository.SaveProduct(product);
        }

        [System.Web.Http.Route("remove")]
        [System.Web.Http.HttpPost]
        public bool DelProduct([FromBody] int obj)
        {
            return this.productRepository.DeleteProduct(obj);
        }

        [System.Web.Http.Route("vats")]
        [System.Web.Http.HttpGet]
        public IEnumerable<SimplifiedVat> GetVats()
        {
            return this.vatRepository.GetSimplifiedVats();
        }
    }
}
