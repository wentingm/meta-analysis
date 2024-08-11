import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordSearchBarsComponent } from './keyword-search-bars.component';

describe('KeywordSearchBarsComponent', () => {
  let component: KeywordSearchBarsComponent;
  let fixture: ComponentFixture<KeywordSearchBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeywordSearchBarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeywordSearchBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
