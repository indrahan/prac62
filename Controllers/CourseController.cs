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
                        new Lecture { LectureCode = "INFANL02-Toolsupport",
                        Teacher = "Hossein Chamani" },
                        new Lecture { LectureCode = "INFANL02-Unit_testing",
                        Teacher = "Hossein Chamani" },
                        new Lecture { LectureCode = "INFANL02-Data_combinatie_Test",
                        Teacher = "Hossein Chamani" },
                        new Lecture { LectureCode = "INFANL02-Elementaire_vergelijkingstest",
                        Teacher = "Hossein Chamani" }
}

                };
                Course c2 = new Course
                {
                    CourseCode = "INFDEV02-6",
                    Subject = "Development",
                    Lectures = new List<Lecture>{
                        new Lecture { LectureCode = "INFDEV02-Algorithms",
                        Teacher = "Omar Ahmad" },
                        new Lecture { LectureCode = "INFDEV02-Binary_search",
                        Teacher = "Omar Ahmad" },
                        new Lecture { LectureCode = "INFDEV02-Insertion_sort",
                        Teacher = "Omar Ahmad" },
                        new Lecture { LectureCode = "INFDEV02-Merge_sort",
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
                          let lectures = _context.Lectures.Where(l => l.CourseId == l.Id)
                          select new Course() { Id = c.Id, Lectures = lectures.ToList(), CourseCode = c.CourseCode, Subject = c.Subject };
            return courses.ToArray();
        }
        [HttpGet("GetCourse/{id}")]
        public IActionResult Get(int id)
        {
            var courses = from c in _context.Courses
                          where c.Id == id
                          let lectures = _context.Lectures.Where(l => l.CourseId == l.Id)
                          select new Course() { Id = c.Id, Lectures = lectures.ToList(), CourseCode = c.CourseCode, Subject = c.Subject };
            var course = courses.FirstOrDefault();
            if (course == null) return NotFound();
            return Ok(course);
        }
    }
}