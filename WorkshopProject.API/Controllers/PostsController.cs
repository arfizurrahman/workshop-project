using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkshopProject.API.Core.Dtos;
using WorkshopProject.API.Core.Models;
using WorkshopProject.API.Core.Repositories;

namespace WorkshopProject.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ICommonRepository _commonRepo;
        private readonly IPostRepository _postRepo;
        private readonly IMapper _mapper;
        public PostsController(ICommonRepository commonRepo,
            IPostRepository postRepo,
            IMapper mapper)
        {
            _commonRepo = commonRepo;
            _postRepo = postRepo;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetPost")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _postRepo.GetPost(id);
            if (post == null)
                return BadRequest("No post was found");
            var postToReturn = _mapper.Map<PostToReturnDto>(post);
            return Ok(postToReturn);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm] PostToCreateDto postToCreateDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var post = _mapper.Map<Post>(postToCreateDto);

            post.CreatedOn = DateTime.Now;
            post.UserId = userId;

            if (postToCreateDto.ImageFile.Length == 0)
                return BadRequest("No image was selected");

            post.ImageUrl = ImageToBase64(postToCreateDto.ImageFile);
            _commonRepo.Add(post);

            if (await _commonRepo.SaveAll())
            {
                var postToReturn = _mapper.Map<PostToReturnDto>(post);
                return CreatedAtRoute("GetPost", new { id = post.Id }, postToReturn);
            }

            throw new Exception("Couldn't create post");
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromForm]PostToCreateDto postToUpdateDto)
        {
            if (postToUpdateDto.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var postFromRepo = await _postRepo.GetPost(postToUpdateDto.Id);

            if (postFromRepo == null)
                return BadRequest("Post was not found");

            if (postToUpdateDto.ImageFile != null)
            {
                if (postToUpdateDto.ImageFile.Length > 0)
                    postFromRepo.ImageUrl = ImageToBase64(postToUpdateDto.ImageFile);
            }

            _mapper.Map(postToUpdateDto, postFromRepo);

            if (await _commonRepo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception("Couldn't edit post");
        }

        [HttpGet("GetPostsByUserId")]
        public async Task<IActionResult> GetPostsByUserId(int userId)
        {
            var postsFromRepo = await _postRepo.GetPostsByUserId(userId);

            var postsToReturn = _mapper.Map<IEnumerable<PostToReturnDto>>(postsFromRepo);

            return Ok(postsToReturn);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var postsFromRepo = await _postRepo.GetAllPosts();

            var postsToReturn = _mapper.Map<IEnumerable<PostToReturnDto>>(postsFromRepo);

            return Ok(postsToReturn);
        }

        private async Task<string> UploadeImage(IFormFile file)
        {
            try
            {
                var folderName = Path.Combine("Assets", "Images");
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                var uniqueFileName = $"IMG_{DateTime.Now.Ticks}.jpg";

                if (System.IO.File.Exists(Path.Combine(filePath, uniqueFileName)))
                {
                    System.IO.File.Delete(Path.Combine(filePath, uniqueFileName));
                }

                var dbPath = Path.Combine(folderName, uniqueFileName);

                using (var fileStream = new FileStream(Path.Combine(filePath, uniqueFileName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                return dbPath;
            }
            catch (Exception)
            {
                throw new Exception("Something went wrong");
            }
        }

        private string ImageToBase64(IFormFile img)
        {
            using (var ms = new MemoryStream())
            {
                img.CopyTo(ms);
                string base64String = Convert.ToBase64String(ms.ToArray());
                return base64String;
            }
        }
    }
}