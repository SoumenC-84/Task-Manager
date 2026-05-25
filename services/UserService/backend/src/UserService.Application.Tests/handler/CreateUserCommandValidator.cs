using FluentValidation;
using UserService.Application.Features.Users.Commands;

public class CreateUserCommandValidator
    : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty();

        RuleFor(x => x.Email)
            .EmailAddress();
    }
}