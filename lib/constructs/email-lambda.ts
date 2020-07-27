import * as cdk from '@aws-cdk/core';
import * as l from '@aws-cdk/aws-lambda';
import * as sns from '@aws-cdk/aws-sns';
import * as sub from "@aws-cdk/aws-sns-subscriptions";

export interface EmailLambdaProps {
    topic?: sns.Topic,
    email: string
}

export class EmailLambda {

    public readonly topic: sns.Topic;
    public readonly email: string;
    public readonly lambda: l.Function;

    constructor(scope: cdk.Construct, id: string, props: EmailLambdaProps) {

        this.email = props.email;
        this.topic = props.topic || new sns.Topic(scope, 'EmailLambdaTopic');

        this.lambda = new l.Function(scope, 'LambdaFunction', {
            runtime: l.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: l.Code.fromAsset("lib/lambdas"),
            environment: {
                TOPIC_ARN: this.topic.topicArn
            }
        });

        this.topic.addSubscription(new sub.EmailSubscription(props.email))
        this.topic.grantPublish(this.lambda)
    }
}