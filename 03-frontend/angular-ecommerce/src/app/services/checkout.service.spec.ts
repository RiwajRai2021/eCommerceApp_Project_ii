import { TestBed } from '@angular/core/testing';
import { Checkout } from '../components/checkout/checkout.component';



describe('Checkout', () => {
  let service: Checkout;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Checkout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
