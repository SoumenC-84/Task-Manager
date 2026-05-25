using UserService.Application.Interfaces;

public class UpdateUserHandler
{
    private readonly IUserRepository _repository;

    public UpdateUserHandler(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task Handle(UpdateUserCommand command)
    {
        var user = await _repository.GetByIdAsync(command.Id);

        if (user == null)
            throw new Exception("User not found");

        user.Update(
            command.FirstName,
            command.LastName,
            command.Email,
            int.Parse(command.Role));

        await _repository.UpdateAsync(user);
        await _repository.SaveChangesAsync();
    }
}