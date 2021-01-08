import Axios from 'axios';

export let axiosGet = function(url, id=0) {
    return new Promise (
        
        function(resolve, reject) {
            console.log("MY URL");
            console.log(url);
            if(id===0) {
                id="";
            }
            // Make a request for a user with a given ID
            Axios.get(url + '/' + id, {
                headers: {
                    'X-User-Token': localStorage.getItem('token'),
                    'X-User-Email': localStorage.getItem('email')
                }
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
            .then(function () {
                // always executed
            });
        }
    ); 
}