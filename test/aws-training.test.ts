import {
    expect as expectCDK,
    haveResource,
    HaveResourceAssertion,
    haveResourceLike,
    ResourcePart
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import {Runtime} from "@aws-cdk/aws-lambda";
import {AwsTrainingStack} from '../lib/aws-training-stack';
import {EmailLambda} from "../lib/constructs/email-lambda";

describe('AWS Training Stack', () => {

    test('Lambda Function has a runtime of Node 12', () => {
        // given
        const app = new cdk.App();

        // when
        const stack = new AwsTrainingStack(app, 'MyTestStack', {
            email: "SomeEmail"
        });

        // then
        expectCDK(stack).to(haveResourceLike(
            "AWS::Lambda::Function",
            {Runtime: Runtime.NODEJS_12_X.toString()}
        ));
    });

    test('SNS Email Subscription', () => {
        // given
        const app = new cdk.App();
        const email = "testEmail"
        const stack = new AwsTrainingStack(app, 'TestStack', {
            email
        });

        expectCDK(stack).to(haveResource("AWS::SNS::Subscription",{
            Protocol: "email",
            Endpoint: email
        }));
    });


});





