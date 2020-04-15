import * as cdk from '@aws-cdk/core';


// This is our AWS cloudformation Stack
// we know it is a stack because it extends cdk.Stack
export class AwsTrainingStack extends cdk.Stack {

  // The constructor takes a scope of cdk.Construct which is cdk.App in this case, but could be our own Construct that we define
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {

    // The super's constructor will do some boilerplate work for you, such as using the environment from the props (if they exist) to set the region or account number
    super(scope, id, props);

    // The code that defines your stack goes here
    
  }
}
