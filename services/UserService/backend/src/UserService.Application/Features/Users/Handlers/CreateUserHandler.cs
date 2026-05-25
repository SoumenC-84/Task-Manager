using UserService.Domain.Entities;
using UserService.Application.Interfaces;
using UserService.Application.Features.Users.Commands;

namespace UserService.Application.Features.Users.Handlers;

public class CreateUserHandler
{
    private readonly IUserRepository _repository;

    public CreateUserHandler(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(CreateUserCommand command)
    {
        var existingUser = await _repository.GetByEmailAsync(command.Email);

        if (existingUser != null)
            throw new Exception("User already exists");

        var user = new User(
            command.FirstName,
            command.LastName,
            command.Email,
            int.Parse(command.Role));

        await _repository.AddAsync(user);
        await _repository.SaveChangesAsync();

        return user.Id;
    }
}