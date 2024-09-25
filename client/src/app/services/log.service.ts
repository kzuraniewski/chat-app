import { Injectable, isDevMode } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LogService {
	debug(message: string) {
		if (!isDevMode()) return;
		console.log(
			'%c[DEBUG]%c ' + message,
			'color: #90C4F9',
			'color: inherit',
		);
	}
}
