using company_profile.Database;
using company_profile.Models;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;
using System;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
var context = new DBContext();
builder.Services.AddDbContext<DBContext>();
var isCreated = context.Database.EnsureCreated();
if (isCreated)
{
    context.Products.Add(new Product() { Name = "Asus", Description = "Laptop Asus", Quantity = 20 });
    context.Products.Add(new Product() { Name = "Oppo", Description = "Smartphone Oppo", Quantity = 50 });
    context.Services.Add(new Service() { Name = "Pembuatan Website", Description = "Pembuatan Website Perusahaan" });
    context.Services.Add(new Service() { Name = "Pembuatan Aplikasi Mobile", Description = "Pembuatan Aplikasi Mobile Perusahaan" });
    context.SaveChanges();
}


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000").AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// Add services to the container.
builder.Services.AddControllersWithViews();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseCors(MyAllowSpecificOrigins);

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
