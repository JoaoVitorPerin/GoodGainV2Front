/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PerguntaDecisivaComponent } from './pergunta-decisiva.component';

describe('PerguntaDecisivaComponent', () => {
  let component: PerguntaDecisivaComponent;
  let fixture: ComponentFixture<PerguntaDecisivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerguntaDecisivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaDecisivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
