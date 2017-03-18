using System.Collections.Generic;
using System.Web.Http;
using FloristNew.Models;
using FloristNew.Repositories.Interfaces;

namespace FloristNew.Controllers.API
{
    public class VatsController : ApiController
    {
        private readonly IVatRepository vatRepository;

        public VatsController(IVatRepository vatRepository)
        {
            this.vatRepository = vatRepository;
        }

        [System.Web.Http.HttpGet]
        public IEnumerable<VatModel> Get()
        {
            return this.vatRepository.GetVats();
        }

        [System.Web.Http.HttpPost]
        public PrimitiveContainer<bool> Add([FromBody] VatModel value)
        {
            return new PrimitiveContainer<bool> {Value = this.vatRepository.SaveVat(value)};
        }

        [System.Web.Http.HttpPost]
        public PrimitiveContainer<bool> Change([FromBody] VatModel value)
        {
            return new PrimitiveContainer<bool> { Value = this.vatRepository.SaveVat(value)};
        }

        [System.Web.Http.HttpPost]
        public PrimitiveContainer<bool> Remove([FromBody] int obj)
        {
            return new PrimitiveContainer<bool> { Value = this.vatRepository.DeleteVat(obj)};
        }
    }
}
