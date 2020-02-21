using Microsoft.AspNetCore.Http;

namespace WorkshopProject.API.Core.Dtos
{
    public class PostToCreateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public IFormFile ImageFile { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
    }
}