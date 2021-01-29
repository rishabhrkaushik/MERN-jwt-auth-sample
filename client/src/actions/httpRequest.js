import Cookie from "js-cookie"

async function createGetRequest(requestPath) {
    const token =  Cookie.get("token") ? Cookie.get("token") : null;

    const response = await fetch(requestPath,
        {
            headers: {
                'x-access-token': token,
            }
        }
    );
    const body = await response.json();
    // if (response.status !== 200){
    //     throw Error(body.message);
    // }
    return body;
};

export {createGetRequest};

async function createPostRequest(requestPath, post, typeOfRequest='json'){
    const response = await fetch(requestPath, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    });
    var body = null;
    if(typeOfRequest === 'json'){
        body = await response.json();
    }
    else if(typeOfRequest === 'text'){
        body = await response.text();
    }
    return body;
};

export {createPostRequest};
