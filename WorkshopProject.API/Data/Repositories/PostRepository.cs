using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkshopProject.API.Core.Models;
using WorkshopProject.API.Core.Repositories;

namespace WorkshopProject.API.Data.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;

        public PostRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Post>> GetAllPosts()
        {
            return await _context.Posts.Include(p => p.User).Where(p => !p.IsDeleted).OrderByDescending(p => p.CreatedOn).ToListAsync();
        }

        public async Task<Post> GetPost(int id)
        {
            return await _context.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        }

        public async Task<IEnumerable<Post>> GetPostsByUserId(int id)
        {
            return await _context.Posts.Include(p => p.User).Where(p => !p.IsDeleted && p.UserId == id).OrderByDescending(p => p.CreatedOn).ToListAsync();
        }
    }
}