using Microsoft.EntityFrameworkCore;
using CleanArcht.Domain.Entities;
using CleanArcht.Domain.Interfaces;
using CleanArcht.Infrastructure;

namespace CleanArcht.Infrastructure.Repository;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(TaskItem task)
    {
        await _context.Tasks.AddAsync(task);
    }

    public async Task<List<TaskItem>> GetAllAsync()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task<TaskItem?> GetByIdAsync(Guid id)
    {
        return await _context.Tasks.FindAsync(id);
    }
    public Task UpdateAsync(TaskItem task)
    {
        _context.Tasks.Update(task);
        return Task.CompletedTask;
    }
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task AssignTaskAsync(Guid taskId, string userId)
    {
        await _context.SaveChangesAsync();
    }
}