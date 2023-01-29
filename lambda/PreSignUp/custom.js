/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  console.log('pre signup event', JSON.stringify(event, null, 2))
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;
  callback(null, event);
};
