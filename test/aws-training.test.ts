import {expect as expectCDK, haveResource, haveResourceLike, ResourcePart, SynthUtils} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import {Runtime} from "@aws-cdk/aws-lambda";
import {AwsTrainingStack} from '../lib/aws-training-stack';
import {EmailLambda, EmailLambdaProps} from "../lib/constructs/email-lambda";
import {synthesize} from "@aws-cdk/core/lib/private/synthesis";
import {ConstructNode, Fn, Reference, Resource, Stack} from "@aws-cdk/core";
import fn = jest.fn;
import {LogicalIDs} from "@aws-cdk/core/lib/private/logical-id";
import * as sub from "@aws-cdk/aws-sns-subscriptions";
import {PolicyStatement, AddToResourcePolicyResult, IGrantable, Grant} from '@aws-cdk/aws-iam';
import {CfnTopic, ITopic, ITopicSubscription, Topic} from "@aws-cdk/aws-sns";
import {IResource} from "@aws-cdk/core/lib/resource";
import { Metric } from '@aws-cdk/aws-cloudwatch';

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

        expectCDK(stack).to(haveResource("AWS::SNS::Subscription", {
            Protocol: "email",
            Endpoint: email
        }));
    });

    test('Function has topicArn as environment variable', () => {
        const stack = new cdk.Stack();
        const email = "someEmail";
        const uniqueId = 'SomeId';
        const topic = new Topic(stack, uniqueId);

        new EmailLambda(stack, 'testEmailLambda', {
            email,
            topic
        });

        expectCDK(stack).to(haveResource("AWS::Lambda::Function", {
            Environment: {
                Variables: {
                    TOPIC_ARN: {
                        Ref: stack.getLogicalId(topic.node.defaultChild as CfnTopic)
                    }
                }
            }
        }));

    });
});

