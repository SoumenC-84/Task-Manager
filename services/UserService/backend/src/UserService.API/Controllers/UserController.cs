using Microsoft.AspNetCore.Mvc;
using UserService.Application.Features.Users.Commands;
using UserService.Application.Features.Users.Handlers;

namespace UserService.API.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly CreateUserHandler _createUserHandler;
    private readonly GetAllUsersHandler _getAllUsersHandler;
    private readonly UpdateUserHandler _updateUserHandler;

    public UserController(
        CreateUserHandler createUserHandler,
        GetAllUsersHandler getAllUsersHandler,
        UpdateUserHandler updateUserHandler)
    {
        _createUserHandler = createUserHandler;
        _getAllUsersHandler = getAllUsersHandler;
        _updateUserHandler = updateUserHandler;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateUserCommand command)
    {
        var id = await _createUserHandler.Handle(command);

        return Ok(id);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        Console.WriteLine("GetAll endpoint hit");
        var users = await _getAllUsersHandler.Handle();

        return Ok(users);
    }
    [HttpPut]
    public async Task<IActionResult> Update(UpdateUserCommand command)
    {
        Console.WriteLine("Update endpoint hit");
        await _updateUserHandler.Handle(command);
        return Ok(command);
    }
    [HttpGet("/message")]
    public IActionResult GetMessage()
    {
        return Ok("Hello, this is a test message!");
    }
}