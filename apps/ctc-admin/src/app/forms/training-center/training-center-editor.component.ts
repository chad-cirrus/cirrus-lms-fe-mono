import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Subject } from 'rxjs';
import { IAddressState } from '../../models/IAddressState';
import { CtcAdminService } from '../../app.service';

/**
 * Component for editing a training center.
 */
@Component({
  selector: 'cirrus-training-center-editor',
  templateUrl: './training-center-editor.component.html',
  styleUrls: ['./training-center-editor.component.scss'],
})
export class TrainingCenterEditorComponent implements OnInit {
  /**
   * Observable for the training center data.
   */
  @Input() trainingCenter$: Subject<ITrainingCenter> = new Subject<ITrainingCenter>();

  /**
   * Text to display on the submit button.
   */
  @Input() submitButtonText: string = 'Save';

  /**
   * The training center object.
   */
  trainingCenter: ITrainingCenter = {} as ITrainingCenter;

  /**
   * List of address states.
   */
  states: IAddressState[] = [];

  constructor(private ctcAdminService: CtcAdminService) {}

  /**
   * Form group for the training center form.
   */
  trainingCenterForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.pattern('\\d{5}(-\\d{4})?')]),
  });

  ngOnInit() {
    this.trainingCenter$.subscribe(data => {
      this.trainingCenter = data;
      this.loadTrainingCenter(data);
    });
    this.states = this.ctcAdminService.getStateList();
  }

  /**
   * Handles the form submission.
   */
  onSubmit() {
    if (this.trainingCenterForm.valid) {
      this.updateTrainingCenter();
      this.ctcAdminService.saveTrainingCenter(this.trainingCenter);
    }
  }

  /**
   * Loads the training center data into the form.
   * @param trainingCenter - The training center object.
   */
  loadTrainingCenter(trainingCenter: ITrainingCenter) {
    this.trainingCenterForm.setValue({
      phone: trainingCenter.phone,
      email: trainingCenter.primary_contact.email,
      website: trainingCenter.website,
      street: trainingCenter.shipping_address.street,
      city: trainingCenter.shipping_address.city,
      state: trainingCenter.shipping_address.state,
      zip: trainingCenter.shipping_address.postal_code,
    });
  }

  /**
   * Updates the training center object with the form values.
   */
  updateTrainingCenter() {
    this.trainingCenter.phone = this.trainingCenterForm.get('phone')?.value ?? '';
    this.trainingCenter.primary_contact.email = this.trainingCenterForm.get('email')?.value ?? '';
    this.trainingCenter.website = this.trainingCenterForm.get('website')?.value ?? '';
    this.trainingCenter.shipping_address.street = this.trainingCenterForm.get('street')?.value ?? '';
    this.trainingCenter.shipping_address.city = this.trainingCenterForm.get('city')?.value ?? '';
    this.trainingCenter.shipping_address.state = this.trainingCenterForm.get('state')?.value ?? '';
    this.trainingCenter.shipping_address.postal_code = this.trainingCenterForm.get('zip')?.value ?? '';
  }
}
