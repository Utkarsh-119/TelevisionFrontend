import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProducerComponent } from './content-producer.component';

describe('ContentProducerComponent', () => {
  let component: ContentProducerComponent;
  let fixture: ComponentFixture<ContentProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentProducerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
