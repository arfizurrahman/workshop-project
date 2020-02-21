using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace WorkshopProject.API.Core.Models
{
    public class User : IdentityUser<int>
    {
        public string Name { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}