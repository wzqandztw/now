let PORT = "";
if(process.env.NODE_ENV==="development"){
    PORT = "http://localhost:8000"
}
export {PORT};