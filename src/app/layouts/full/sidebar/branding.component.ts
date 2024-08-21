import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding d-flex justify-content-center align-items-center">
    <img src="assets/images/logo.png" alt="logo" class="logo" style="width: 100px; height: 100px;">
    

    </div>
    <!--VERSION-->
    <div class="text-center text-black">
      
    </div>
    <hr class="my-0" />

  `,
})
export class BrandingComponent {
  constructor() {}
}
