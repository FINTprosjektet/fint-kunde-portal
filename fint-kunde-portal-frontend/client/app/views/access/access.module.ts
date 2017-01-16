// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { LibSharedModule } from 'fint-shared-components';
import { AccessRoutes } from './access.routes';
import { ContactService } from './contacts.service';

// Components
import { AccessComponent } from './access.component';
import { GrantComponent } from './grant/grant.component';

@NgModule({
  declarations: [
    AccessComponent,
    GrantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LibSharedModule.forRoot(),
    RouterModule.forChild([...AccessRoutes])
  ],
  providers: [ ContactService ]
})
export class AccessModule { }
