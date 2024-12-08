import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvertisorComponent } from './addvertisor.component';

describe('AddvertisorComponent', () => {
  let component: AddvertisorComponent;
  let fixture: ComponentFixture<AddvertisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddvertisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddvertisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
