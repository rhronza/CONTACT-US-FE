import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AppRestService} from './appRest.service';
import {SelectItem} from 'primeng/api';
import {CustomerRequest} from './types/CustomerRequest.type';
import {KindOfRequestDtoType} from './types/KindOfRequestDto.type';
import {CustomerRequestResponseType} from './types/CustomerRequestResponse.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor( readonly rest: AppRestService) {
  }
  form: FormGroup;
  wantedCharsAlphabetic: RegExp = /[a-zA-ZěščřžýáíéůúóďťňńĺľłĚŠČŘŽÝÁÍÉŮÚÓĎŤŇŃĹĽŁăâäąđëęîôöőüűćçńŕśşźţżĂÂÄĄĐËĘÎÔÖŐÜŰĆÇŃŔŚŞŹŢŻ]+$/;
  wantedCharsAlphanumeric: RegExp = /[0-9a-zA-ZěščřžýáíéůúóďťňńĺľłĚŠČŘŽÝÁÍÉŮÚÓĎŤŇŃĹĽŁăâäąđëęîôöőüűćçńŕśşźţżĂÂÄĄĐËĘÎÔÖŐÜŰĆÇŃŔŚŞŹŢŻ]+$/;
  textAreaMaxLength = 100;
  menuItems: SelectItem[];

  ngOnInit(): void {
    this.initForm();
    this.loadMenuItems();

  }

  private initForm(): void {
    this.form = new FormGroup( {
      kindOfRequestId: new FormControl(),
      policyNumber: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      requestMessage: new FormControl()
      }
    );
  }

  getRemainedCharsToMaximum(): number {
    const currentValue = this.form.get('requestMessage').value;
    return currentValue != null ? this.textAreaMaxLength- currentValue.length : this.textAreaMaxLength;
  }

  submit(): void {
    const requestBody: CustomerRequest = {
      kindOfRequestId : this.form.get('kindOfRequestId').value,
      policyNumber : this.form.get('policyNumber').value,
      name: this.form.get('name').value,
      surname: this.form.get('surname').value,
      requestMessage: this.form.get('requestMessage').value
    };
    this.rest.postRequest(requestBody).
    subscribe(
      (reponse: CustomerRequestResponseType) => {
        console.log('New request has id: ' + reponse.id);
      }
    );
  }

  private loadMenuItems(): void {
    this.rest.getMenuItems().
    subscribe(
      (response: KindOfRequestDtoType[]) => {
        this.menuItems = [];
        response.forEach( e => this.menuItems.push(this.convertToSelectItem(e)));
      },
      error => {
        console.log(error);
      }
    );
  }

  private convertToSelectItem(input: KindOfRequestDtoType): SelectItem {
    return {
      label: input.label,
      value: input.id,
      disabled: null,
      icon: null,
      styleClass: null,
      title: input.label
    };
  }
}
