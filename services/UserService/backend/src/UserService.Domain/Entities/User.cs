using UserService.Domain.Enums;

namespace UserService.Domain.Entities;

public class User
{
    public Guid Id { get; private set; }

    public string? FirstName { get; private set; }

    public string? LastName { get; private set; }

    public string? Email { get; private set; }

    public int? Role { get; private set; }

    public UserStatus Status { get; private set; }

    public DateTime CreatedOn { get; private set; }

    private User()
    {
    }

    public User(
        string firstName,
        string lastName,
        string email,
        int role)
    {
        if (string.IsNullOrWhiteSpace(firstName))
            throw new Exception("First name is required");

        if (string.IsNullOrWhiteSpace(email))
            throw new Exception("Email is required");

        if (string.IsNullOrWhiteSpace(lastName))
            throw new Exception("Last name is required");

        Id = Guid.NewGuid();

        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Role = role;

        Status = UserStatus.Active;

        CreatedOn = DateTime.UtcNow;
    }

    public void Suspend()
    {
        Status = UserStatus.Suspended;
    }

    public void Deactivate()
    {
        Status = UserStatus.Inactive;
    }

    public void Update(string firstName, string lastName, string email, int v)
    {
        if (string.IsNullOrWhiteSpace(firstName))
            throw new Exception("First name is required");

        if (string.IsNullOrWhiteSpace(email))
            throw new Exception("Email is required");

        if (string.IsNullOrWhiteSpace(lastName))
            throw new Exception("Last name is required");

        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Role = v;
    }
}