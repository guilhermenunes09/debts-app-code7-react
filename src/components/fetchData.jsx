import Axios from 'axios';


export let axiosGet = function(url, id=0) {
    return new Promise (
        function(resolve, reject) {
            const headers = {
                'X-User-Token': localStorage.getItem('token'),
                'X-User-Email': localStorage.getItem('email')
            }
            if(id===0) {
                id="";
            }
            // Make a request for a user with a given ID
            Axios.get(url + '/' + id, {
                headers: headers
            })
            .then(function (response) {
                // handle success
                const data = response;
                resolve (data);
            })
            .catch(function (error) {
                // handle error
                resolve(error.response);
            })
            .then(function (response) {
                // always executed
            });
        }
    ); 
}