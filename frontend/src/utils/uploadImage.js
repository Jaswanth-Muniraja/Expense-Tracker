import {API_PATHS} from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) =>{
    const fromData = new FormData();
    fromData.append('image', imageFile);
    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, fromData,{
            headers:{
                'Content-Type':'multipart/from-data',
            },
        });
        return response.data;
    }catch(error){
        console.error('Error Uploading the image.' ,error);
        throw error;
    }
}

export default uploadImage;