# Welcome to your CDK TypeScript project!

This is a CDK project written in Typescript with the intent of being an example project that can be used to demonstrate the usage of simple resources in AWS.

The CDK generates a template that is run with cloudformation to provision your stacks in AWS

## Useful links

* [AWS CDK Reference Documentation](https://docs.aws.amazon.com/cdk/api/latest/)
* [AWS Cloudformation Template Resource Documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)

## Useful files

* The `cdk.json` file tells the CDK Toolkit how to execute your app.
* The `jest.config.js` file tells jest how/where to run your tests
* The `package.json` file is your node configuration
* The `package-lock.json` file is your node continuous integration configuration
* The `tsconfig.json` file is your typescript configuration
* The `.npmignore` file tells npm what files to ignore in your project
* The `.gitignore` file tells git what files to ignore in your project

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## What are all these TypeScript files for?

`./bin/<app-name>.ts` is the entry point. If you consider the CDK project an app that creates and deploys a cloudformation template to AWS, then this is where the cdk app is defined.

`./lin/*.ts` are your stack definitions. If `bin/` holds the files that define the CDK app, `lib/` holds the files that define your stack(s).