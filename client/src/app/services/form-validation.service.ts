import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

import { PASSWORD_REGEX, USERNAME_REGEX } from '@/utils/auth';

@Injectable({
	providedIn: 'root',
})
export class FormValidationService {
	username = Validators.compose([
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(20),
		Validators.pattern(USERNAME_REGEX),
	]) as ValidatorFn;

	email = Validators.compose([
		Validators.required,
		Validators.email,
	]) as ValidatorFn;

	password = Validators.compose([
		Validators.required,
		Validators.minLength(8),
		Validators.maxLength(20),
		Validators.pattern(PASSWORD_REGEX),
	]) as ValidatorFn;

	match =
		(fieldName: string): ValidatorFn =>
		(control) => {
			if (!control.parent) return null;

			const value = control.value;
			const otherValue = control.parent.get(fieldName)?.value;

			if (otherValue !== value) {
				return { mismatch: true };
			}

			return null;
		};
}
