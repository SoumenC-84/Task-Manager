using UserService.Domain.Entities;
using UserService.Application.Interfaces;

namespace UserService.Application.Features.Users.Handlers;

public class GetAllUsersHandler
{
    private readonly IUserRepository _repository;

    public GetAllUsersHandler(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<User>> Handle()
    {
        return await _repository.GetAllAsync();
    }
    public async Task<int> HandleDbContextCount()
    {
        return await _repository.GetDbContextCount();
    }
}