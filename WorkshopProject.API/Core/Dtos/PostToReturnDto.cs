using System;

namespace WorkshopProject.API.Core.Dtos
{
    public class PostToReturnDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UserName { get; set; }
    }
}