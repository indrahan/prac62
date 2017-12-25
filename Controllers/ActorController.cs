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
    public class ActorsController : Controller
    {
        private readonly MovieContext _context;

        public ActorsController(MovieContext context)
        {
            _context = context;
        }
        [HttpGet("GetAll")]
        public Actor[] GetAll()
        {
            return _context.Actors.ToArray();

        }
        [HttpGet("GetActor/{id}")]
        public IActionResult GetActor(int id)
        {
            var actors = from a in _context.Actors
                         where a.Id == id
                         select a;
            var actor = actors.FirstOrDefault();
            if (actor == null) return NotFound();
            return Ok(actor);
        }
    }
}