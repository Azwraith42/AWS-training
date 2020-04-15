#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsTrainingStack } from '../lib/aws-training-stack';

// cdk.App() is the app that is run when you invoke cdk deploy
const app = new cdk.App();

// AwsTrainingStack is a stack that we are defining imported from '../lib/aws-training-stack'
// app is our parent which all our stacks we define below will be attached to. They will all be deployed via `cdk deploy`
new AwsTrainingStack(app, 'AwsTrainingStack');
