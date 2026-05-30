using Microsoft.EntityFrameworkCore;
using UserService.Application.Interfaces;
using UserService.Domain.Entities;

namespace UserService.Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        await Task.Run(() => _context.Users.Update(user));
    }

    public async Task<int> GetDbContextCount()
    {
        try
        {
            Console.WriteLine("Attempting to count users in the database...");
            var count = await _context.Users.CountAsync();
            Console.WriteLine($"Counted {count} users in the database.");
            return count;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error counting users: {ex.Message}");
            throw;
        }

    }
}