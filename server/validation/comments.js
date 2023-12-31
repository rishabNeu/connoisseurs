const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(data){
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text: '';
    
    if(!Validator.isLength(data.text, {min: 5, max: 300})){
        errors.text = 'Min post length is not reached';
    }
    
    if(Validator.isEmpty(data.text)){
        errors.text = 'Text is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};