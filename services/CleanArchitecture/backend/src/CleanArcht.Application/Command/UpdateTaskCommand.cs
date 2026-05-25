namespace CleanArcht.Application.Command;

public class UpdateTaskCommand
{
    public Guid Id { get; set; }
    public string? Status { get; set; }
    public string? UserId { get; set; }
}