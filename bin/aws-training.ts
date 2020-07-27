#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {AwsTrainingStack} from '../lib/aws-training-stack';
import {StackProps} from "@aws-cdk/core";

// cdk.App() is the app that is run when you invoke cdk deploy
// app is the parent which all our stacks will be attached to.
const app = new cdk.App();

// StackProps are used by classes that extend cdk.Stack to explicitly define cloudformation properties like what region or account
// this stack is being deployed to.
const stackProps: StackProps = {
    description: 'Aws Training Stack',
    env: {
        region: 'us-west-1'
    }
}

// A CDK project can manage multiple stacks and will automatically export and import variables in cloudformation which
// are defined in one stack that are used in another stack in this source code

// AwsTrainingStack is a stack that we are defining imported from '../lib/aws-training-stack'
// each stack attached to the App will create its own stack in cloudformation.
new AwsTrainingStack(app, 'AnAwsTrainingStack', {
    // Whatever email you choose will receive a subscription confirmation when you provision.
    email: 'some.email@email.com',
    stackProps
});
