using FloristNew.Models.Simplified;
using Newtonsoft.Json;

namespace FloristNew.Models
{
    public class ProductModel : BaseModel
    {
        public ProductModel(string name, string shortName, VatModel vatModel, int id, decimal grossPrice) : this(name, shortName, new SimplifiedVat(vatModel), grossPrice, id, true) { }

        [JsonConstructor]
        public ProductModel(string name, string shortName, SimplifiedVat vat, decimal grossPrice, int? id = null, bool isActive = true)
            : base(isActive, id)
        {
            this.Name = name;
            this.ShortName = shortName;
            this.Vat = vat;
            this.GrossPrice = grossPrice;
        }
        public string ShortName { get; set; }
        public string Name { get; set; }
        public decimal GrossPrice { get; set; }
        public SimplifiedVat Vat { get; set; }
    }
}
/***
 * Unable to find a constructor to use for type Florist.Models.ProductModel. A class should either have a default constructor, one constructor with arguments or a constructor marked with the JsonConstructor attribute. Path 'Name', line 2, position 10.
 * 
 */
