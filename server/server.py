from flask import Flask, request, jsonify
import util
app = Flask(__name__)

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations' : util.get_location_names()
    })
    response.headers.add('access-control-allow-origin', '*')
    return response

@app.route('/predict_house_price', methods =['POST'])
def predict_house_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bed = int(request.form['bed'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.price_prediction(total_sqft, bath, bed,location)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__" :
    print('starting server with flask')
    util.load_saved_artifacts()
    app.run()


