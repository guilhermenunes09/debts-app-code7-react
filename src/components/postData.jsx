
import Axios from 'axios';

const axiosPost = (dataPost, url) =>
{
    new Promise(
        function(resolve, reject) {
            // Make a request for a user with a given ID

            let data = {
                debt: dataPost
            }

            Axios.post(url, data, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json',  
                },
              })
            .then(function (response) {
                // handle success
                const data = response.data;
                resolve (data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                reject(error);
            })
            .then(function (error) {
                console.log("Request Finished")
                reject(error);
                // always executed
            });
        }
    );
} 

export { axiosPost };