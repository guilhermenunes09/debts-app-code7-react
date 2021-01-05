
import Axios from 'axios';

const axiosPost = (dataPost) =>
{
    new Promise(
        function(resolve, reject) {

            // Make a request for a user with a given ID
            Axios.post('http://localhost:3000/api/debts', {
                debt: dataPost, 
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