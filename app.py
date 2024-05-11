from flask import Flask

# Create a Flask app instance
app = Flask(__name__)

# root route for initial testing
@app.route('/')
def hello():
    return 'Hello, World!'

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
    # app.run(debug=True, host='0.0.0.0', port=80)
