using System.Collections.Generic;
using System.Linq;
using FloristNew.Models;
using FloristNew.Models.Simplified;
using FloristNew.Repositories.Interfaces;

namespace FloristNew.Repositories
{
    public class VatRepository : IVatRepository
    {
        private static List<VatModel> vats = new List<VatModel> {
            new VatModel(1, 0, "zwolniony"),
            new VatModel(2, 23, "23%"),
            new VatModel(3, 8, "8%") };

        public bool DeleteVat(int id)
        {
            var vat = vats.FirstOrDefault(v => v.Id == id && v.IsActive);
            if (vat != null)
            {
                vat.IsActive = false;
                return true;
            }
            return false;
        }

        public IEnumerable<SimplifiedVat> GetSimplifiedVats()
        {
            return vats.Select(v => new SimplifiedVat(v));
        }

        public VatModel GetVat(int id)
        {
            return vats.FirstOrDefault(v => v.IsActive && v.Id == id);
        }

        public IEnumerable<VatModel> GetVats()
        {
            return vats.Where(v => v.IsActive);
        }

        public bool SaveVat(VatModel model)
        {
            try
            {
                if (model.Id == 0)
                {
                    model.Id = vats.Count + 1;
                }
                else
                {
                    vats.Remove(vats.Single(v => v.Id == model.Id));
                }
                vats.Add(model);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
