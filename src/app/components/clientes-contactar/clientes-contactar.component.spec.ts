import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesContactarComponent } from './clientes-contactar.component';

describe('ClientesContactarComponent', () => {
  let component: ClientesContactarComponent;
  let fixture: ComponentFixture<ClientesContactarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesContactarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesContactarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
