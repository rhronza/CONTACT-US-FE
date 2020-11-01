export class CustomerRequest {
  kindOfRequestId: number;
  policyNumber: number ; // Alphanumeric
  name: string; // OnlyLetter
  surname: string; // OnlyLetter
  requestMessage: string; // max length
}
