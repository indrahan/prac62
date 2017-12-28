using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.IO;

namespace prac62.Models
{
    public class CourseContext : DbContext
    {
        public DbSet<Course> Courses { get; set; }
        public DbSet<Lecture> Lectures { get; set; }
        //added constructor to provide the connection to the database as a service 
        public CourseContext(DbContextOptions<CourseContext> options) : base(options)
        {

        }


    }
    public class Course
    {
        

        public int Id { get; set; }
        public string CourseCode { get; set; }
        public string Subject { get; set; }
        public List<Lecture> Lectures { get; set; }
    }
    public class Lecture
    {
        public int Id { get; set; }
        public string LectureCode { get; set; }

        public string Teacher { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
    public class MyLoggerProvider : ILoggerProvider
    {
        public ILogger CreateLogger(string categoryName)
        {
            return new MyLogger();

        }
        public void Dispose() { }
        private class MyLogger : ILogger
        {
            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }
            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            {
                File.AppendAllText(@"C:\temp\log.txt", formatter(state, exception));
                Console.WriteLine(formatter(state, exception));
            }
            public IDisposable BeginScope<TState>(TState state)
            {
                return null;
            }
        }
    }
}
