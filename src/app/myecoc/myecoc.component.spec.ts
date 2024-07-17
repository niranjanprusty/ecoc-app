import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyecocComponent } from './myecoc.component';

describe('MyecocComponent', () => {
  let component: MyecocComponent;
  let fixture: ComponentFixture<MyecocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyecocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyecocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
