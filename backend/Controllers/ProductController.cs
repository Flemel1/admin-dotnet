using company_profile.Database;
using company_profile.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace company_profile.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DBContext DBContext;

        public ProductController(DBContext DBContext)
        {
            this.DBContext = DBContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> Index()
        {
            var List = await DBContext.Products.ToListAsync();

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
        public async Task<ActionResult<Product>> GetProductById(int Id)
        {
            Product Product = await DBContext.Products.FindAsync(Id);

            if (User == null)
            {
                return NotFound();
            }
            else
            {
                return Product;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Product>> InsertProduct([FromForm] Product product)
        {
            var entity = new Product()
            {
                Name = product.Name,
                Description = product.Description,
                Quantity = product.Quantity,
            };
            DBContext.Products.Add(entity);
            await DBContext.SaveChangesAsync();
            return entity;
        }
        [HttpPut("{id}")]
        public async Task<HttpStatusCode> UpdateProduct(int id, [FromForm] Product Product)
        {
            Product entity = await DBContext.Products.FindAsync(id);
            entity.Name = Product.Name;
            entity.Description = Product.Description;
            entity.Quantity = Product.Quantity;
            DBContext.Products.Update(entity);
            await DBContext.SaveChangesAsync();
            return HttpStatusCode.OK;
        }

        [HttpDelete("{id}")]
        public async Task<HttpStatusCode> DeleteProduct(int id)
        {
            Product entity = await DBContext.Products.FindAsync(id);
            DBContext.Products.Remove(entity);
            await DBContext.SaveChangesAsync();
            return HttpStatusCode.OK;
        }
    }
}
