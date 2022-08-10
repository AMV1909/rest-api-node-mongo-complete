async function get() {
    const request = await fetch("/employees", {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'authorization': localStorage.token
        }
    })
    
    const  response = await request.json()
    
    console.log(response)
    
    response.forEach(element => {
        console.log(element)
    });
}
