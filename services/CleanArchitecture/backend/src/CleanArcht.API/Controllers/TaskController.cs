using CleanArcht.Application.Command;
using CleanArcht.Application.Handler;
using Microsoft.AspNetCore.Mvc;

namespace CleanArcht.API.Controllers;

[ApiController]
[Route("api/tasks")]
public class TaskController : ControllerBase
{
    private readonly CreateTaskHandler _createHandler;
    private readonly GetTasksHandler _getHandler;
    private readonly UpdateTaskHandler _updateHandler;

    public TaskController(
        CreateTaskHandler createHandler,
        GetTasksHandler getHandler,
        UpdateTaskHandler updateHandler)
    {
        _createHandler = createHandler;
        _getHandler = getHandler;
        _updateHandler = updateHandler;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTaskCommand command)
    {
        var id = await _createHandler.Handle(command);
        return Ok(id);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var tasks = await _getHandler.Handle();
        return Ok(tasks);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateTaskCommand command)
    {
        if (string.IsNullOrWhiteSpace(command.Status))
        {
            return BadRequest("Status cannot be null or empty.");
        }
        await _updateHandler.Handle(command.Id, command.Status);
        return Ok();
    }
    [HttpPut("{id}/assign")]
    public async Task<IActionResult> AssignTask(string id, UpdateTaskCommand request)
    {
        await _updateHandler.AssignTaskAsync(request.Id, request.UserId, request.Status);
        return Ok();
    }
}