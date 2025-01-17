import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationPanelComponent } from './conversation-panel.component';

describe('ConversationPanelComponent', () => {
	let component: ConversationPanelComponent;
	let fixture: ComponentFixture<ConversationPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ConversationPanelComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ConversationPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
