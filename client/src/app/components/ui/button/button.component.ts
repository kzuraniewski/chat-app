import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [NgClass],
	templateUrl: './button.component.html',
})
export class ButtonComponent {
	variant = input<ButtonVariant>('secondary');
}
