import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SearchComponent } from './components/search/search.component';
import { FallbackComponent } from './components/fallback/fallback.component';

@NgModule({
  declarations: [SearchComponent, FallbackComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [SearchComponent, FallbackComponent],
})
export class SharedModule {}
