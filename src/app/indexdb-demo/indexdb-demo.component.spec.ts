import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexdbDemoComponent } from './indexdb-demo.component';

describe('IndexdbDemoComponent', () => {
  let component: IndexdbDemoComponent;
  let fixture: ComponentFixture<IndexdbDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexdbDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexdbDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
