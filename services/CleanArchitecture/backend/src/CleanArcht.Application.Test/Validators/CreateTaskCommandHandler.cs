using CleanArcht.Application.Command;
using CleanArcht.Domain.Entities;
using CleanArcht.Domain.Interfaces;

public class CreateTaskCommandHandler
{
    private readonly ITaskRepository _repository;

    public CreateTaskCommandHandler(ITaskRepository repository)
    {
        _repository = repository;
    }

    public async Task<TaskItem> Handle(CreateTaskCommand command)
    {
        var task = new TaskItem(command.Title == null ? "" : command.Title);


        await _repository.AddAsync(task);
        return task;
    }
}