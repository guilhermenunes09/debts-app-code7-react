import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export let axiosGet = function(url) {
    return new Promise (
        function(resolve, reject) {
            // Make a request for a user with a given ID
            Axios.get(url)
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
                console.log("Request Finished")
                // always executed
            });
        }); 
}