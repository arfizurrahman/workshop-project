using System.Threading.Tasks;
using WorkshopProject.API.Core.Models;

namespace WorkshopProject.API.Core.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUser(int id);
    }
}