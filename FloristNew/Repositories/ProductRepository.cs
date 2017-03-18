using System.Collections.Generic;
using System.Linq;
using FloristNew.Models;
using FloristNew.Models.Simplified;
using FloristNew.Repositories.Interfaces;

namespace FloristNew.Repositories
{
    public class ProductRepository : IProductsRepository
    {
        private static List<ProductModel> products = new List<ProductModel> {
            new ProductModel("sztuczna nasturcja", "kwiat", new SimplifiedVat(1,0), 1.22m, 1),
            new ProductModel("sztuczna piwonia", "kwiat", new SimplifiedVat(1,0), 1.55m, 2),
            new ProductModel("spray do kwiatów", "akcesoria kwiatowe", new SimplifiedVat(2,23), 3.56m, 3),
            new ProductModel("duża karta na 18 urodziny", "kartki okolicznościowe", new SimplifiedVat(3,8), 0.55m, 4)
        };

        public bool DeleteProduct(int id)
        {
            var product = products.FirstOrDefault(v => v.Id == id && v.IsActive);
            if (product != null)
            {
                product.IsActive = false;
                return true;
            }
            return false;
        }

        public IEnumerable<ProductModel> GetAllProducts()
        {
            return products.Where(p => p.IsActive);
        }

        public ProductModel GetProduct(int id)
        {
            return products.FirstOrDefault(p => p.IsActive && p.Id == id);
        }

        public void SaveProduct(ProductModel model)
        {
            products.Add(model);
        }
    }    
}
