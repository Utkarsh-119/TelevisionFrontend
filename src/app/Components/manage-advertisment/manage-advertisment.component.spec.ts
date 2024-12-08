import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdvertismentComponent } from './manage-advertisment.component';

describe('ManageAdvertismentComponent', () => {
  let component: ManageAdvertismentComponent;
  let fixture: ComponentFixture<ManageAdvertismentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAdvertismentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAdvertismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
