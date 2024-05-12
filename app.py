from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import boto3
import os
import ast


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

# def test_01():
#     # Your test logic here
#     # For example, execute the knight_attack function and check if it returns the expected result
#     try:
#         assert knight_attack(8, 1, 1, 2, 2) == 2
#         return True
#     except AssertionError:
#         return False
# def test_02():
#     assert knight_attack(8, 1, 1, 2, 3) == 1
# def test_03():
#     assert knight_attack(8, 0, 3, 4, 2) == 3
# def test_04():
#     assert knight_attack(8, 0, 3, 5, 2) == 4
# def test_05():
#     assert knight_attack(24, 4, 7, 19, 20) == 10
# def test_06():
#     assert knight_attack(100, 21, 10, 0, 0) == 11
# def test_07():
#     assert knight_attack(3, 0, 0, 1, 2) == 1
# def test_08():
#     assert knight_attack(3, 0, 0, 1, 1) is None

def grade_py_file(file_conent):
    return {"grade": "100", "comments": "Excellent work!"}


def test(file_content):
    # Convert the file_content string into a Python AST (Abstract Syntax Tree)
    tree = ast.parse(file_content)
    # Find and execute the knight_attack function if it exists
    count_correct_ans = 0
    for node in tree.body:
        if isinstance(node, ast.FunctionDef) and node.name == "knight_attack":
            # Execute the function definition in a local namespace
            local_namespace = {}
            exec(compile(ast.Module([node]), filename="<ast>", mode="exec"), {}, local_namespace)
            # Get the knight_attack function from the local namespace
            knight_attack = local_namespace.get("knight_attack")
            if knight_attack:
                for nested_node in node.body:
                    if isinstance(nested_node, ast.FunctionDef) and nested_node.name == "bfs":
                        exec(compile(ast.Module([nested_node]), filename="<ast>", mode="exec"), {}, local_namespace)
                        break  # Stop searching for dfs function after finding it
                # Test the return value of the knight_attack function
                try:
                    assert knight_attack(8, 1, 1, 2, 2) == 2
                    count_correct_ans += 1
                    return True, "Test passed", count_correct_ans
                except AssertionError:
                    return False, "Test failed: knight_attack returned an unexpected value"
            else:
                return False, "Test failed: knight_attack function not found"


@app.route('/grade_s3_file_save_to_dynamodb',  methods=['GET', 'POST'])
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

    score = 0
    try:
        # Retrieve the object from S3
        obj = s3.get_object(Bucket=bucket_name, Key=filename)
        file_content = obj['Body'].read().decode('utf-8')

        grading_result = grade_py_file(file_content)
        print(type(file_content))
        # passed, comment, count_of_correctness = test(file_content)
        # if count_of_correctness >= 4:
        #     grade = 50
        
        # if count_of_correctness == 8:
        #     grade = 100

        # Save the grading result to DynamoDB
        score = str(score)
        print(f'grade is {score}')
        
        dynamodb.put_item(
            TableName='auto-grader-table',
            Item={
                'user': {'S': userid},
                'Filename': {'S': filename},
                'Grade': {'S': grading_result['grade']},
                'Comments': {'S': grading_result['comments']}
            }
            # Item={
            #     'user': {'S': userid},
            #     'Filename': {'S': filename},
            #     'Grade': {'S': score},
            #     # 'Comments': {'S': grading_result['comments']}
            # }
        )
        # return jsonify(grading_result)
        return jsonify({'comments': grading_result['comments'], 'grade': grading_result['grade']})
        # return Response(file_content, mimetype='text/plain')
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/test',  methods=['POST'])
def test():
    print("tesT!!!!")

# Run the Flask app
if __name__ == '__main__':
    # app.run(debug=True)
    app.run(debug=True, host='0.0.0.0', port=80)
