import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStatusComponent } from './cart-status-component';

describe('CartStatusComponentComponent', () => {
  let component: CartStatusComponent;
  let fixture: ComponentFixture<CartStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
