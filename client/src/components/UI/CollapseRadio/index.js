import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';

class CollapseRadio extends Component {
    state = {
        open: false,
        value: 0
    };

    componentDidMount() {
        if (this.props.initState)
            this.setState({open: this.props.initState});
    }

    clickHandler = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    renderPriceHandler = () => (
        this.props.list ?
            this.props.list.map(item => (
                <FormControlLabel
                    key={item._id}
                    value={`${item._id}`}
                    control={<Radio />}
                    label={item.name}
                />
            ))
            :
           <LinearProgress />
    )

    radioChangeHandler = (event) => {
        this.props.filterHandler(event.target.value);
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem 
                        onClick={this.clickHandler}
                        style={{padding: '10px 23px 10px 0'}}
                    >
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        <FontAwesomeIcon 
                            icon={this.state.open ? faAngleUp : faAngleDown}
                            className="icon"
                        />
                    </ListItem>           
                    <Collapse
                        in={this.state.open}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            component="div"
                            disablePadding
                        >
                           <RadioGroup
                                aria-label={this.state.priceCategory}
                                name={this.state.priceCategory}
                                value={this.state.value}
                                onChange={this.radioChangeHandler}
                           >
                                {this.renderPriceHandler()}
                           </RadioGroup>
                        </List>
                    </Collapse>    
                </List>
            </div>
        );
    }
}

export default CollapseRadio;