import * as moment from "moment";

export class ConstructFormDataUtility {
  constructor() {}

  constructFormData(formData: any) {
    const entity = {
      productId: formData.productId,
      productName: formData.productName,
      productOwnerName: formData.productOwnerName,
      developers: new Array(),
      scrumMasterName: formData.scrumMasterName,
      startDate: moment(formData['startDate']).toDate(),
      methodology: formData.methodology.toLowerCase(),
    };
    formData.developers.forEach((x: any) => entity.developers.push(x['name']));
    return entity;
  }
}
