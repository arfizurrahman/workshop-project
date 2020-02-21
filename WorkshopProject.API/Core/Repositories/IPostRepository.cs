using System.Collections.Generic;
using System.Threading.Tasks;
using WorkshopProject.API.Core.Models;

namespace WorkshopProject.API.Core.Repositories
{
    public interface IPostRepository
    {
        Task<Post> GetPost(int id);
        Task<IEnumerable<Post>> GetAllPosts();
        Task<IEnumerable<Post>> GetPostsByUserId(int id);
    }
}