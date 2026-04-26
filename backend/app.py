from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

_todos = []


@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(_todos)


@app.route('/api/todos', methods=['POST'])
def create_todo():
    text = request.json.get('text', '').strip()
    if not text:
        return jsonify({'error': 'text required'}), 400
    todo = {'id': str(uuid.uuid4()), 'text': text, 'completed': False}
    _todos.append(todo)
    return jsonify(todo), 201


@app.route('/api/todos/<todo_id>', methods=['PATCH'])
def update_todo(todo_id):
    for todo in _todos:
        if todo['id'] == todo_id:
            if 'completed' in request.json:
                todo['completed'] = bool(request.json['completed'])
            return jsonify(todo)
    return jsonify({'error': 'not found'}), 404


@app.route('/api/todos/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global _todos
    _todos = [t for t in _todos if t['id'] != todo_id]
    return '', 204


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)
