/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const axios = require('axios');
const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
  region: 'ap-northeast-2',
});
// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


app.post('/items/kakao', async function(req, res) {
  console.log('req.body:', JSON.stringify(req.body, null, 2));
  const { access_token } = req.body || {};
  const kakaoAuthUrl = 'https://kapi.kakao.com/v2/user/me';
  const kakaoAuthOptions = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const axiosRes = await axios.get(kakaoAuthUrl, kakaoAuthOptions);
  console.log('axios res:', axiosRes);
  const { status, data } = axiosRes;
  if (status > 200) {
    res.json({
      success: 'post call failed!',
      url: req.url,
      body: req.body,
      axiosRes: axiosRes.data,
    });
    return;
  }
 
  // How to confirm user in Cognito User Pools without verifying email or phone?
  // https://stackoverflow.com/questions/47361948/how-to-confirm-user-in-cognito-user-pools-without-verifying-email-or-phone
  const GroupName = 'kakao';
  const UserPoolId = '<aws_user_pools_id>';  // aws-exports.js의 "aws_user_pools_id"
  const ClientId = '<web_client_id>'; // aws-exports.js "aws_user_pools_web_client_id"
  const Username = 'kakao_' + data.id;
  const newUserParam = {
    ClientId,
    Username,
    Password: data.id.toString(),
    ClientMetadata: {
      UserPoolId,
      Username,
      GroupName,
    },
    UserAttributes: [
      {
        Name: 'email' /* required */,
        Value: data.kakao_account.email,
      },
      {
        Name: 'name' /* required */,
        Value: Username,
      },
    ],
  };
  const signUpRes = await cognitoidentityserviceprovider.signUp(newUserParam).promise();
  console.log('signUpRes', signUpRes);

  res.json({
    success: 'post call succeed!',
    url: req.url,
    body: req.body,
    signUpRes,
  });
});

app.listen(3000, function() {
    console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
