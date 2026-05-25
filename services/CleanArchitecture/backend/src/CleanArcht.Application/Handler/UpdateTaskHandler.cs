using CleanArcht.Domain.Interfaces;
using CleanArcht.Domain.Entities;

namespace CleanArcht.Application.Handler;

public class UpdateTaskHandler
{
    private readonly ITaskRepository _repo;

    public UpdateTaskHandler(ITaskRepository repo)
    {
        _repo = repo;
    }

    public async Task Handle(Guid id, string status)
    {
        try
        {
            var task = await _repo.GetByIdAsync(id);
            if (task == null) return;
            if (status.ToUpper() == "DONE")
            {
                task.MarkComplete();
            }
            if (status.ToUpper() == "INPROGRESS")
            {
                task.MarkInProgress();
            }
            if (status.ToUpper() == "ASSIGNED")
            {
                task.MarkAssigned();
            }

            await _repo.UpdateAsync(task);
            await _repo.SaveChangesAsync();
        }
        catch (ArgumentException ex)
        {
            // Log the exception or handle it as needed
            throw new InvalidOperationException("Invalid status value provided.", ex);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it as needed
            throw new InvalidOperationException("An error occurred while updating the task.", ex);
        }

    }
    public async Task AssignTaskAsync(Guid taskId, string? userId, string? status)
    {
        var task = await _repo.GetByIdAsync(taskId);
        if (task == null) return;

        task.UserId = userId;
        task.Status = status;

        await _repo.UpdateAsync(task);
        await _repo.SaveChangesAsync();
    }
}