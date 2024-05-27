from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/barcode_scanner_app'
mongo = PyMongo(app)

@app.route('/api/products/<code>', methods=['GET'])
def get_product(code):
    product = mongo.db.products.find_one({'code': code})
    if product:
        return jsonify(product), 200
    else:
        return jsonify({'message': 'Product not found'}), 404

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    product = {
        'code': data['code'],
        'name': data['name']
    }
    result = mongo.db.products.insert_one(product)
    return jsonify({'message': 'Product added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)
