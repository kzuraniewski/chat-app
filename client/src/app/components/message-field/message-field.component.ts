import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-message-field',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './message-field.component.html',
})
export class MessageFieldComponent {
	value = '';
	@Output() send = new EventEmitter<string>();

	submit() {
		this.send.emit(this.value);
	}
}
