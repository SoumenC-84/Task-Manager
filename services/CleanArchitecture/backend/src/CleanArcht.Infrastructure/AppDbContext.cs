using Microsoft.EntityFrameworkCore;
using CleanArcht.Domain.Entities;

namespace CleanArcht.Infrastructure;

public class AppDbContext : DbContext
{
    public DbSet<TaskItem> Tasks { get; set; } = null!;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
}