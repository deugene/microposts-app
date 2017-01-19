/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MicropostEditComponent } from './micropost-edit.component';

describe('MicropostEditComponent', () => {
  let component: MicropostEditComponent;
  let fixture: ComponentFixture<MicropostEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicropostEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicropostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
