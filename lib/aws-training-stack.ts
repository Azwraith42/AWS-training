import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as sub from '@aws-cdk/aws-sns-subscriptions';
import * as l from '@aws-cdk/aws-lambda';
import {StackProps} from "@aws-cdk/core";
import {EmailLambda} from "./constructs/email-lambda";


export interface AwsTrainingStackProps {
  email: string,
  stackProps?: StackProps
}

// This is a definition for a AWS cloudformation Stack
export class AwsTrainingStack extends cdk.Stack {

  // The constructor takes a scope of cdk.Construct which is App in this case, but could be our own Construct if we want
  constructor(scope: cdk.Construct, id: string, props: AwsTrainingStackProps) {

    // The super's constructor will do some boilerplate work for you, such as using the environment from the props (if they exist) to set the region or account number
    super(scope, id, props.stackProps);

    // SNS is AWS's Simple Notification Service
    const topic = new sns.Topic(this, 'AwsTrainingTopic');

    /* A Lambda function
     The code used for the lambda function commonly comes from 3 different locations
     - Code.fromAsset()  lets you define code elsewhere in the project, which is what we will do here. This is advised
         because then you can have a test suite for your lambdas. You will need to run CDK bootstrap to create a bucket
         that the cdk will use to upload your code to make it available to cloudformation.
     - Code.fromInline() lets you define code inline here in the resource definition.
     - Code.fromBucket() lets you tell cloudformation what s3 bucket your code has been uploaded to in AWS. This is
         not suggested because then the cdk can't tell when the code changes when you deploy your stacks.
     */
    new EmailLambda(this, 'EmailLambda', {
      topic: topic,
      email: props.email
    });


  }
}
