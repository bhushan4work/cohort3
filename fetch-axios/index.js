//fetch vs axios (both do the same thing)

//fetch
const { response } = require("express");
function main(){
    fetch("https://sum-server.100xdevs.com/todos") //fetch req returns a promise
       .then(async response => {
        //converts the res to json , if. we dont apply async await we get a promise instead of json data
        const toJson  = await response.json() ;
        console.log(toJson.todos);
    }) 
}

//axios
const axios = require("axios");
async function main(){
    //whatever req u hit here with help of this url from 'http dump' website gets printed on its website to check whats  getting printed
    const response = await fetch("https://sum- https://httpdump.app/dumps/326559d0-d4b4-4a08-9dc4-d9e65bd8e7f4.100xdevs.com/todos" , {
        method: "POST" ,
        body: {
            name: "bhushan",
            pass: "23243"
        },
        headers: {
            Authorization : "wolf123" 
        }
    });
    const toJson  = await response.json(); 
    console.log(toJson.todos); 
}
//way of writing above logic using axios
async function main(){
    const response = await axios.post("https://sum-server.100xdevs. https://httpdump.app/dumps/326559d0-d4b4-4a08-9dc4-d9e65bd8e7f4/todos" ,

        { //we hitting a post req & so this acts as body but for get or non-body req we'll remove this
        name: "bhushan",  
        pass: "23243"    
        } , 
        {
            headers: {
                Authorization : "wolf123" 
            }
        }
    );
    //axios automatically detects the requested data & change it which is json here so we dont do it manually
    console.log(response.data.todos);
}
 