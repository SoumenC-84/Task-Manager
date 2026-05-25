using CleanArcht.Domain.Entities;

namespace CleanArcht.Domain.Interfaces;

public interface ITaskRepository
{
    Task AddAsync(TaskItem task);
    Task<List<TaskItem>> GetAllAsync();
    Task<TaskItem?> GetByIdAsync(Guid id);
    Task SaveChangesAsync();
    Task UpdateAsync(TaskItem task);
    Task AssignTaskAsync(Guid taskId, string userId);
}