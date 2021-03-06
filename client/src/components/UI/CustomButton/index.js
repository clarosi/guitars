import React from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircularProgress from '@material-ui/core/CircularProgress';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const CustomButton = (props) => {
    const button = () => {
        let template = '';

        switch (props.type) {
            case 'link':
                template = (
                    <Link
                        to={props.linkTo}
                        className={!props.altClass ? 'link_default' : props.altClass}
                        {...props.addStyles}
                    >
                        {props.title}
                    </Link>
                )
                break;   
            case 'bag_link':
                template = (
                    <div className="bag_link"
                        onClick={() => {props.runAction()}}
                    >
                        {!props.isLoading ? <FontAwesomeIcon icon={faShoppingBag} /> : null}
                        {!props.isLoading ? 
                            props.text ? props.text : null
                            : <CircularProgress size={18} thickness={4} />
                        }
                    </div>
                )
                break;
            default:
                template = ''
                break;
        }

        return template;
    };

    return (
        <div className="my_link">
            {button()}
        </div>
    );
};

export default CustomButton;