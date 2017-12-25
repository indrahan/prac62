using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.IO;

namespace prac62.Models
{
    public class MovieContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        //added constructor to provide the connection to the database as a service 
        public MovieContext(DbContextOptions<MovieContext> options) : base(options)
        {

        }


    }
    public class Movie
    {
        

        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Release { get; set; }
        public List<Actor> Actors { get; set; }
    }
    public class Actor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Birth { get; set; }
        public string Gender { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
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
