export const USERNAME_REGEX =
	/^(?=.{4,20}$)(?![_-])(?!.*[_-]{2})[a-zA-Z0-9-_]+(?<![_-])$/g;

export const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/g;
