using Newtonsoft.Json;

namespace FloristNew.Models.Simplified
{
    public class SimplifiedVat
    {
        public SimplifiedVat(VatModel model) : this(model.Id.Value, model.Value) { }
        [JsonConstructor]
        public SimplifiedVat(int id, int? value)
        {
            this.Id = id;
            this.Value = value;
        }

        public int Id { get; set; }
        public int? Value { get; set; }
    }
}
