import Axios from 'axios';

const axiosPost = (dataPost, url) =>
{
    return new Promise(
        function(resolve, reject) {
            let data = {
                debt: dataPost
            }

            Axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',  
                },
              })
            .then(function (response) {
                // handle success
                const data = response;
                resolve (data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                reject(error);
            })
            .then(function (error) {
                reject(error);
                // always executed
            });
        }
    );
} 

export { axiosPost };