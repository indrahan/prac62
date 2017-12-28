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
    public class LecturesController : Controller
    {
        private readonly CourseContext _context;

        public LecturesController(CourseContext context)
        {
            _context = context;
        }
        [HttpGet("GetAll")]
        public Lecture[] GetAll()
        {
            return _context.Lectures.ToArray();

        }
        [HttpGet("GetLecture/{id}")]
        public IActionResult GetActor(int id)
        {
            var lectures = from l in _context.Lectures
                         where l.Id == id
                         select l;
            var lecture = lectures.FirstOrDefault();
            if (lecture == null) return NotFound();
            return Ok(lecture);
        }
    }
}