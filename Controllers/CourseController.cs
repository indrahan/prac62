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
    public class CoursesController : Controller
    {
        private readonly CourseContext _context;

        public CoursesController(CourseContext context)
        {
            _context = context;

            if (_context.Courses.Count() == 0)
            {
                Course c = new Course
                {
                    CourseCode = "INFANL02-6",
                    Subject = "Analyse",
                    Lectures = new List<Lecture>{
                        new Lecture { LectureCode = "Toolsupport",
                        Teacher = "Indra Han" },
                        new Lecture { LectureCode = "Unit testing",
                        Teacher = "Hossein Chamani" },
                        new Lecture { LectureCode = "Data combinatie test",
                        Teacher = "Greg Kartiko" },
                        new Lecture { LectureCode = "Elementary comparison test",
                        Teacher = "Stijn Kaman" }
}

                };
                Course c2 = new Course
                {
                    CourseCode = "INFDEV02-6",
                    Subject = "Development",
                    Lectures = new List<Lecture>{
                        new Lecture { LectureCode = "Intro, array, complexity",
                        Teacher = "Omar Ahmad" },
                        new Lecture { LectureCode = "Sorting algorithms",
                        Teacher = "Barry Allen" },
                        new Lecture { LectureCode = "List, stack, queue",
                        Teacher = "Iris Wells" },
                        new Lecture { LectureCode = "Hash tables",
                        Teacher = "Tom Stone" },
                        new Lecture { LectureCode = "Binary Trees",
                        Teacher = "Omar Ahmad" }
}

                };
                _context.Courses.Add(c);
                _context.Courses.Add(c2);
                _context.SaveChanges();
            }
        }


        [HttpGet("GetAll")]
        public Course[] GetAll()
        {
            var courses = from c in _context.Courses
                          let lectures = _context.Lectures.Where(l => l.CourseId == c.Id)
                          select new Course() { Id = c.Id, Lectures = lectures.ToList(), CourseCode = c.CourseCode, Subject = c.Subject };
            return courses.ToArray();
        }
        [HttpGet("GetCourse/{id}")]
        public IActionResult Get(int id)
        {
            var courses = from c in _context.Courses
                          where c.Id == id
                          let lectures = _context.Lectures.Where(l => l.CourseId == c.Id)
                          select new Course() { Id = c.Id, Lectures = lectures.ToList(), CourseCode = c.CourseCode, Subject = c.Subject };
            var course = courses.FirstOrDefault();
            if (course == null) return NotFound();
            return Ok(course);
        }
    }
}