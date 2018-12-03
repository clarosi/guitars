import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import axios from '../../../axios/axiosGuitars';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadImageEndPoint, removeImageEndPoint } from '../../../shared/utils/endPointContants';
import { tokenName } from '../../../shared/utils/stringConstants';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUploader extends Component {
    constructor() {
        super();
        this.state = { 
            uploadedFiles: [],
            isUploading: false    
        }
    }

    static getDerivedStateFromProps(nextProp, prevState) {
        if (nextProp.reset)
            return prevState = {uploadedFiles: []}
        else
            return null;
    }

    onDropHandler = (file) => {
        this.setState({isUploading: true})
        let formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'}
        }
        formData.append('image', file[0]);

        const token = localStorage.getItem(tokenName);
        axios.post(`${uploadImageEndPoint}?token=${token}`, formData, config)
        .then(res => {
            this.setState({
                isUploading: false,
                uploadedFiles: [
                    ...this.state.uploadedFiles,
                    res.data
                ]
            }, () => {
                this.props.imagesHandler(this.state.uploadedFiles);
            });
        })
        .catch(err => {
            this.setState({isUploading: false});
        });
    }

    onRemoveImageHandler = (public_id) => {
        this.setState({isUploading: true});

        const token = localStorage.getItem(tokenName);
        axios.get(`${removeImageEndPoint}?token=${token}&public_id=${public_id}`)
        .then(res => {
            const currentUploadedFiles = Object.assign([], this.state.uploadedFiles);
            const newUploadedFiles = currentUploadedFiles.filter(item => (
                item.public_id !== public_id
            ))

            this.setState({
                uploadedFiles: newUploadedFiles,
                isUploading: false
            }, () => {
                 this.props.imagesHandler(newUploadedFiles);
            });
        })
        .catch(err => {
            this.setState({isUploading: false});
        });
    }

    renderUploadedImagesHandler = () => (
        this.state.uploadedFiles.map(item => (
            <div
                key={item.public_id}
                className="dropzone_box"
                onClick={() => this.onRemoveImageHandler(item.public_id)}
            >
                <div
                    className="wrap"
                    style={{background: `url(${item.url}) no-repeat`}}
                ></div>
            </div>
        ))
    )

    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <Dropzone
                            onDrop={(file) => this.onDropHandler(file)}
                            multiple={false}
                            className="dropzone_box"
                        >
                            <div className="wrap">
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </div>
                        </Dropzone>
                        {this.renderUploadedImagesHandler()}
                        {this.state.isUploading ?
                            <div
                                className="dropzone_box"
                                style={{
                                    textAlign: 'center',
                                    paddingTop: '60px'
                                }}
                            >
                                <CircularProgress />
                            </div>
                            : null
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default FileUploader;