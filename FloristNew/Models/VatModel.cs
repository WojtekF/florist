namespace FloristNew.Models
{
    public class VatModel : BaseModel
    {
        public VatModel(int id, int value, string name)
            : base(id)
        {
            this.Value = value;
            this.Name = name;
        }

        public int Value { get; set; }
        public string Name { get; set; }
    }
}