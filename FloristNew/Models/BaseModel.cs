namespace FloristNew.Models
{
    public abstract class BaseModel
    {
        protected BaseModel() :this(true, null) { }
        protected BaseModel(bool isActive, int? id)
        {
            this.IsActive = isActive;
            this.Id = id;
        }

        protected BaseModel(int? id) : this(true, id)
        {
        }
        public bool IsActive { get; set; }
        public int? Id { get; set; }
    }
}