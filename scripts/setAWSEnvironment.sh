#!/usr/bin/env sh
echo '*********************************************'
echo 'creating ~/.aws'
mkdir -p ~/.aws
echo 'preparing ~/.aws/credentials'
# ETL profiles/accounts:
printf "[wickes-sls]\naws_access_key_id=$AWS_KEY\naws_secret_access_key=$AWS_SECRET\n[wickes-sls-test]\nrole_arn=arn:aws:iam::459705047117:role/sts_serverless_lambda\nsource_profile=wickes-sls\n[wickes-sls-preprod]\nrole_arn=arn:aws:iam::459705047117:role/sts_serverless_lambda\nsource_profile=wickes-sls\n[wickes-sls-prod]\nrole_arn=arn:aws:iam::816307133091:role/sts_serverless_lambda\nsource_profile=wickes-sls\n" > ~/.aws/credentials
# Microservices profiles/accounts:
# printf "[wickes-sls]\naws_access_key_id=$AWS_KEY\naws_secret_access_key=$AWS_SECRET\n[wickes-sls-test]\nrole_arn=arn:aws:iam::524468479278:role/cross-account-serverless-test\nsource_profile=wickes-sls\n[wickes-sls-preprod]\nrole_arn=arn:aws:iam::128252518311:role/cross-account-serverless-preprod\nsource_profile=wickes-sls\n[wickes-sls-prod]\nrole_arn=arn:aws:iam::080040514609:role/cross-account-serverless-prod\nsource_profile=wickes-sls" > ~/.aws/credentials
echo '*********************************************'