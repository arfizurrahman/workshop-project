using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkshopProject.API.Core.Models;
using WorkshopProject.API.Core.Repositories;

namespace WorkshopProject.API.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
    }
}