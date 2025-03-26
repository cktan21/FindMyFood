## Instructions
```bash
npm i
npm run start
```

### GET Credit
Place uuid in body:
```bash
{
    "uuid": "123"
}
```


### POST Credit (Create and Update)
Place uuid and creditAmount in body:
```bash
{
    "uuid": "123"
    creditAmount: 10.99
}
```

New README:
<h1>How to use</h1>

<h2>To get credits of a user</h2>

>https://personal-3mms7vqv.outsystemscloud.com/CreditMicroservice/rest/RESTAPI1/credit?UserId={UserId} (get request)

<h3>Sample Outputs</h3>

```json
{
    "message": "no credits",
    "statuscode": 250,
    "currentcredits": 0.0
}
or 
{
    "message": "successful",
    "statuscode": 200,
    "currentcredits": 10.0
}
```

<br>
<br>

<h2>To add credits of a user</h2>

>https://personal-3mms7vqv.outsystemscloud.com/CreditMicroservice/rest/RESTAPI1/credit?userid={userid}&credit={credit} (post request)

<h3>Sample Outputs</h3>

```json
{
    "message": "credits inserted",
    "statuscode": 250,
    "currentcredits": 10.0
}
or 
{
    "message": "credits updated",
    "statuscode": 200,
    "currentcredits": 20.0
}
```

<br>
<br>

<h2>To use credits of a user</h2>

>https://personal-3mms7vqv.outsystemscloud.com/CreditMicroservice/rest/RESTAPI1/credit?userid={userid}&credit={credit} (put request)

<h3>Sample Outputs</h3>

```json
{
    "message": "no credits",
    "statuscode": 404,
}
or 
{
    "message": "credits used",
    "statuscode": 200,
    "currentcredits": 15.0
}
or 
{
    "message": "insufficient credits",
    "statuscode": 250,
    "currentcredits": 1.0
}
```
