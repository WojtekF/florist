using System.Collections.Generic;
using FloristNew.Models;
using FloristNew.Models.Simplified;

namespace FloristNew.Repositories.Interfaces
{
    public interface IVatRepository
    {
        IEnumerable<VatModel> GetVats();
        VatModel GetVat(int id);
        bool SaveVat(VatModel model);
        bool DeleteVat(int id);
        IEnumerable<SimplifiedVat> GetSimplifiedVats();
    }
}
