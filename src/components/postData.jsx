import Axios from 'axios';

const axiosPost = (dataPost, url) =>
{
    return new Promise(
        function(resolve, reject) {
            console.log("CHECK URL");
            console.log(url);
            console.log("CHECK DATA");
            console.log(dataPost);
            Axios.post(url, dataPost, {
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