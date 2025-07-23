import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadorSenhaForteComponent } from './validador-senha-forte.component';

describe('ValidadorSenhaForteComponent', () => {
  let component: ValidadorSenhaForteComponent;
  let fixture: ComponentFixture<ValidadorSenhaForteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidadorSenhaForteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidadorSenhaForteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
