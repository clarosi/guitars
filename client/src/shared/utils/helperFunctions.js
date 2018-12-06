import axios from '../../axios/axiosGuitars';

export const axiosGetRequest = (url, actionType, data = null, defaultVal = null) => {
    const request = axios.get(url, data)
    .then(res => res.data)
    .catch(err => defaultVal ? defaultVal : err.response.data.error);

    return {
        type: actionType,
        payload: request
    };
};

export const axiosPostRequest = (url, actionType, data = null, prevData = [], defaultVal = null) => {
    const request = axios.post(url, data)
    .then(res => {
      return {
        data: res.data,
        prevData
      };
    })
    .catch(err => defaultVal ? defaultVal : err.response.data.error);

    return {
        type: actionType,
        payload: request
    };
};

export const validateFormElement = (element, formData = []) => {
  let result = [true, ''];

  if (element.validation.isValidEmail) {
    const valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(element.value);
    const msg = `${!valid ? 'Please enter valid email.' : ''}`;
    result = !valid ? [valid, msg] : result;
  }

  if (element.validation.confirm) {
    const valid = element.value.trim() === formData[element.validation.confirm].value;
    const msg = `${!valid ? 'Password didn\'t match.' : ''}`;
    result = !valid ? [valid, msg] : result;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const msg = `${!valid ? 'This field is required.' : ''}`;
    result = !valid ? [valid, msg] : result;
  }

  return result;
};

export const bindFormElementValue = (element, formData, value = '') => {
  const newFormData = {...formData};
  const newElement = {...newFormData[element.id]};
  //
  if (value === '') {
    if (newElement.config.type === 'number') {
      const regex = /^[0-9]*$/;
      if(regex.test(element.event.target.value) ) {
        newElement.value = element.event.target.value;
      }
      else {
        newElement.value = '';
      }
    }
    else {
      newElement.value = element.event.target.value;
    }
  }
  else {
    newElement.value = value;
  }
  //
  let result = validateFormElement(newElement, formData);
  newElement.isValid = result[0];
  newElement.validationMsg = result[1];
  newElement.isTouched = element.blur;
  //
  newFormData[element.id] = newElement;
  //
  return newFormData;
};

export const generateDataToSubmit = (formData) => {
  let dataToSubmit = {};

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value;
  }

  return dataToSubmit;
};

export const verifyFormIsValid = (formData) => {
  let formIsValid = true;

  for (let key in formData) {;
    formIsValid = formData[key].isValid && formIsValid;
  }

  return formIsValid;
};

export const populateOptionFields = (formData, arrayData, field) => {
  const newArray = [];
  const newFormData = Object.assign({}, formData);

  arrayData.forEach(item => {
    newArray.push({
      value: item._id,
      displayValue: item.name
    });
  });

  newFormData[field].config.options = newArray;
  return newFormData;
};

export const resetFormField = (formData) => {
  const newFormdata = Object.assign({}, formData);

  for (const key in newFormdata) {
    if (key === 'images')
      newFormdata[key].value = [];
    else
      newFormdata[key].value = '';
    newFormdata[key].isValid = false;
    newFormdata[key].isTouched = false;
    newFormdata[key].validationMsg = '';
  }

  return newFormdata;
};

export const getImage = (images) => {
  if (images.length > 0) {
    return images[0].url;
  }
  else {
    return '/images/image_not_available.png';
  }
};