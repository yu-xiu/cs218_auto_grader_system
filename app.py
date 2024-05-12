from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import boto3
import os


# Create a Flask app instance
app = Flask(__name__)
CORS(app)

aws_access_key_id = os.environ.get('REACT_APP_ACCESS_KEY_ID')
aws_secret_access_key = os.environ.get('REACT_APP_SECRET_KEY')
region_name = 'us-east-1'

# create a S3 client
s3 = boto3.client(
    's3',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)

# create a dynamodb account
dynamodb = boto3.client(
    'dynamodb',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name)

# root route for initial testing
@app.route('/')
def hello():
    return 'Hello, World!'


def grade_py_file(file_conent):
    return {"grade": "100", "comments": "Excellent work!"}


@app.route('/grade_s3_file_save_to_dynamodb',  methods=['GET'])
# get student's uploaded python solution from S3 bucket
def grade_s3_file_save_to_dynamodb():
    print('Getting file content')

    # Get the filename and username from the query parameters
    filename = request.args.get('filename')
    userid = request.args.get('username')

    print("Filename:", filename)
    print("Username:", userid)

    if not filename or not userid:
        return jsonify({'error': 'Filename or username not provided'}), 400


    bucket_name = 'autograder-bucket'

    try:
        # Retrieve the object from S3
        obj = s3.get_object(Bucket=bucket_name, Key=filename)
        file_content = obj['Body'].read().decode('utf-8')

        grading_result = grade_py_file(file_content)
        # Save the grading result to DynamoDB
        dynamodb.put_item(
            TableName='auto-grader-table',
            Item={
                'user': {'S': userid},
                'Filename': {'S': filename},
                'Grade': {'S': grading_result['grade']},
                'Comments': {'S': grading_result['comments']}
            }
        )
        return jsonify(grading_result)
        # return Response(file_content, mimetype='text/plain')
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# Run the Flask app
if __name__ == '__main__':
    # app.run(debug=True)
    app.run(debug=True, host='0.0.0.0', port=80)
