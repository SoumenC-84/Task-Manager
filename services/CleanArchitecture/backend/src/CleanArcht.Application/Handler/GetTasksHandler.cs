using CleanArcht.Domain.Entities;
using CleanArcht.Domain.Interfaces;

namespace CleanArcht.Application.Handler;

public class GetTasksHandler
{
    private readonly ITaskRepository _repo;

    public GetTasksHandler(ITaskRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<TaskItem>> Handle()
    {
        return await _repo.GetAllAsync();
    }
}