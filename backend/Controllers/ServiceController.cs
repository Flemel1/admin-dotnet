using company_profile.Database;
using company_profile.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace company_profile.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly DBContext DBContext;

        public ServiceController(DBContext DBContext)
        {
            this.DBContext = DBContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<Service>>> Index()
        {
            var List = await DBContext.Services.ToListAsync();

            if (List.Count < 0)
            {
                return NotFound();
            }
            else
            {
                return List;
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetProductById(int Id)
        {
            Service Service = await DBContext.Services.FindAsync(Id);

            if (User == null)
            {
                return NotFound();
            }
            else
            {
                return Service;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Service>> InsertProduct([FromForm] Service service)
        {
            var entity = new Service()
            {
                Name = service.Name,
                Description = service.Description
            };
            DBContext.Services.Add(entity);
            await DBContext.SaveChangesAsync();
            return entity;
        }
        [HttpPut("{id}")]
        public async Task<HttpStatusCode> UpdateProduct(int id, [FromForm] Service Service)
        {
            Service entity = await DBContext.Services.FindAsync(id);
            entity.Name = Service.Name;
            entity.Description = Service.Description;
            DBContext.Services.Update(entity);
            await DBContext.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        [HttpDelete("{id}")]
        public async Task<HttpStatusCode> DeleteProduct(int id)
        {
            Service entity = await DBContext.Services.FindAsync(id);
            DBContext.Services.Remove(entity);
            await DBContext.SaveChangesAsync();
            return HttpStatusCode.OK;
        }
    }
}
