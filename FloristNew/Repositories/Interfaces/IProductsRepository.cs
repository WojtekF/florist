using System.Collections.Generic;
using FloristNew.Models;

namespace FloristNew.Repositories.Interfaces
{
    public interface IProductsRepository
    {
        IEnumerable<ProductModel> GetAllProducts();
        ProductModel GetProduct(int id);
        void SaveProduct(ProductModel model);
        bool DeleteProduct(int id);
    }
}
