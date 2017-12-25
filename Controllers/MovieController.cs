using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using prac62.Models;

namespace prac62.Controllers
{
    [Route("[controller]")]
    public class MoviesController : Controller
    {
        private readonly MovieContext _context;

        public MoviesController(MovieContext context)
        {
            _context = context;
        }
        
        [HttpGet("GetAll")]
        public Movie[] GetAll()
        {
            var movies = from m in _context.Movies
                         let actors = _context.Actors.Where(a => a.MovieId == m.Id)
                         select new Movie() { Id = m.Id, Actors = actors.ToList(), Title = m.Title, Release = m.Release };
            return movies.ToArray();
        }
        [HttpGet("GetMovie/{id}")]
        public IActionResult Get(int id)
        {
            var movies = from m in _context.Movies
            where m.Id == id
                         let actors = _context.Actors.Where(a => a.MovieId == m.Id)
                         select new Movie() { Id = m.Id, Actors = actors.ToList(), Title = m.Title, Release = m.Release };
            var movie = movies.FirstOrDefault();
            if(movie == null) return NotFound();
            return Ok(movie);
        }
    }
}