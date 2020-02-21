using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WorkshopProject.API.Core.Models;

namespace WorkshopProject.API.Data
{
    public class DataContext : IdentityUserContext<User, int, IdentityUserClaim<int>,
    IdentityUserLogin<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}