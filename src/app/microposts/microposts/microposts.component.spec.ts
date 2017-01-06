/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MicropostsComponent } from './microposts.component';

describe('MicropostsComponent', () => {
  let component: MicropostsComponent;
  let fixture: ComponentFixture<MicropostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicropostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicropostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
