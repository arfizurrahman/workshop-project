using AutoMapper;
using WorkshopProject.API.Core.Dtos;
using WorkshopProject.API.Core.Models;

namespace WorkshopProject.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserToRegisterDto, User>();
            CreateMap<UserForLoginDto, User>();
            CreateMap<User, UserToReturnDto>();
            CreateMap<PostToCreateDto, Post>();
            CreateMap<Post, PostToReturnDto>().ForMember(dest => dest.UserName, option =>
            {
                option.MapFrom(src => src.User.Name);
            });
        }
    }
}