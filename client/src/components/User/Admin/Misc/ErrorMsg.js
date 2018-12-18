import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ErrorMsg = (props) => {
    return (
        <React.Fragment>
            <div>
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={props.submitFormHandler}
                >
                    {props.formSubmitting ?
                        <CircularProgress size={30} /> 
                        :
                        props.formType
                        }
                    </Button>
            </div>
            {props.formSuccessMsg ?
                <div 
                    className="success_label"
                    style={{color: '#4caf50'}}
                >{props.formSuccessMsg}</div>
                :
                null
            }
            {props.formHasError ?
                <div className="error_label">{props.formErrorMsg ? props.formErrorMsg : 'Please fill up all the required fields.'}</div>
                :
                null
            }
        </React.Fragment>
    );
};

export default ErrorMsg;