using CleanArcht.Application.Command;
using CleanArcht.Domain.Entities;
using CleanArcht.Domain.Interfaces;

namespace CleanArcht.Application.Handler;

public class CreateTaskHandler
{
    private readonly ITaskRepository _repo;

    public CreateTaskHandler(ITaskRepository repo)
    {
        _repo = repo;
    }

    public async Task<Guid> Handle(CreateTaskCommand command)
    {
        if (string.IsNullOrWhiteSpace(command.Title))
        {
            throw new ArgumentException("Task title cannot be null or empty.", nameof(command.Title));
        }

        var task = new TaskItem(command.Title);
        await _repo.AddAsync(task);
        await _repo.SaveChangesAsync();

        return task.Id;
    }
}