//run database transaction once page has loaded 
var markers = [];
var localLat, localLng;
window.onload = function () {
    setTimeout(function () {
        document.getElementById('strapline').innerHTML = "Just a sec, we are finding  some places you will like...";
        // Host of your Neo4j installation
        const localLat = geoLocation[0];
        const localLng = geoLocation[1];
        console.log(localLat);
        console.log(localLng);
        const host = 'bolt://localhost:7687';

        // Create a driver to connect to the Neo4j database
        const driver = neo4j.v1.driver(host, neo4j.v1.auth.basic('neo4j', 'jodieedge'));

        // Create a session to execute the query.
        const session = driver.session();
        const query = 'MATCH (u:User)-[r:REVIEWED]->(rest:Restaurant)-[:WAS_RATED]->(rat:Rating), (rest:Restaurant)-[:LOCATED_IN]->(l:Location) WHERE exists (l.latitude) AND exists (l.longitude) AND DISTANCE(POINT(l), POINT({latitude:$lat, longitude:$lng}))<1000000 AND toFloat($curFunny)-0.2<=  toFloat(u.funny)/toFloat(u.review_count) <= toFloat($curFunny)+0.2 AND toFloat($curCool)-0.2 <= toFloat(u.cool)/toFloat(u.review_count)<= toFloat($curCool)+0.2 AND toFloat($curUseful)-0.2 <= toFloat(u.useful)/toFloat(u.review_count) <= toFloat($curUseful)+0.2 AND toInteger(rat.rated)>=3.5 RETURN DISTINCT u.name, rat.rated ,l.latitude as restaurantLatitude,l.longitude as restaurantLongitude,rest.name as restaurantName, rest.open as restaurantOpenings, l.address as address'
        var params = {
            lat: localLat,
            lng: localLng,
            "curFunny": 0.225, //preset user information - used to match up restaurants - current user funny score
            "curCool": 0.225, //present user information - used to match up restaurants - current user cool score
            "curUseful": 0.35 //preset user information - used to match up restaurants - current user useful score
        };

        session
            .run(query, params)
            .then((result) => {
                result.records.forEach(function (record) {
                    var lati = parseFloat(record._fields[2]);
                    var long = parseFloat(record._fields[3])
                    var name = (record._fields[4]);
                    var open = (record._fields[5]);
                    var address = (record._fields[6]);
                    var individualObject = {
                        coords: {
                            lat: lati,
                            lng: long
                        },
                        name: name,
                        open: open,
                        address: address
                    };
                    markers.push(individualObject);
                });
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(() => {
                session.close();
                driver.close();
            });
    }, 10000);


} 


//run database transaction to include category filter 
function dbCategory(){
    document.getElementById('strapline').innerHTML = "REFRESHING SEARCH! Just a sec, we are finding some places you will like...";
    setTimeout(function () {
        markers.length = 0
        // Host of your Neo4j installation
        var localLat = geoLocation[0];
        var localLng = geoLocation[1];
        console.log(localLat);
        console.log(localLng);
        var host = 'bolt://localhost:7687';

        // Create a driver to connect to the Neo4j database
        var driver = neo4j.v1.driver(host, neo4j.v1.auth.basic('neo4j', 'jodieedge'));

        // Create a session to execute the query.
        var session = driver.session();
        var query = 'MATCH (u:User)-[r:REVIEWED]->(rest:Restaurant)-[:WAS_RATED]->(rat:Rating), (c:Category)<-[:SPECIALISES_IN]-(rest:Restaurant)-[:LOCATED_IN]->(l:Location) WHERE exists (l.latitude) AND exists (l.longitude) AND DISTANCE(POINT(l), POINT({latitude:$lat, longitude:$lng}))<1000000 AND toFloat($curFunny)-0.2<=  toFloat(u.funny)/toFloat(u.review_count) <= toFloat($curFunny)+0.2 AND toFloat($curCool)-0.2 <= toFloat(u.cool)/toFloat(u.review_count)<= toFloat($curCool)+0.2 AND toFloat($curUseful)-0.2 <= toFloat(u.useful)/toFloat(u.review_count) <= toFloat($curUseful)+0.2 AND toInteger(rat.rated)>=3.5 AND c.type = $userCat RETURN DISTINCT u.name, rat.rated ,l.latitude as restaurantLatitude,l.longitude as restaurantLongitude,rest.name as restaurantName, rest.open as restaurantOpenings, l.address as address'
        var params = {
            lat: localLat,
            lng: localLng,
            "curFunny": 0.225, //preset user information - used to match up restaurants - current user funny score
            "curCool": 0.225, //present user information - used to match up restaurants - current user cool score
            "curUseful": 0.35, //preset user information - used to match up restaurants - current user useful score
            userCat:catOPt,
        };

        session
            .run(query, params)
            .then((result) => {
                result.records.forEach(function (record) {
                    var lati = parseFloat(record._fields[2]);
                    var long = parseFloat(record._fields[3])
                    var name = (record._fields[4]);
                    var open = (record._fields[5]);
                    var address = (record._fields[6]);
                    var individualObject = {
                        coords: {
                            lat: lati,
                            lng: long
                        },
                        name: name,
                        open: open,
                        address: address
                    };
                    markers.push(individualObject);
                });
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(() => {
                session.close();
                driver.close();
            });
    }, 10000);
    
} 


//run database transaction to include star filter 
function dbStars(){
    document.getElementById('strapline').innerHTML = "REFRESHING SEARCH! Just a sec, we are finding some places you will like...";
    setTimeout(function () {
        markers.length = 0
        // Host of your Neo4j installation
        var localLat = geoLocation[0];
        var localLng = geoLocation[1];
        console.log(localLat);
        console.log(localLng);
        var host = 'bolt://localhost:7687';

        // Create a driver to connect to the Neo4j database
        var driver = neo4j.v1.driver(host, neo4j.v1.auth.basic('neo4j', 'jodieedge'));

        // Create a session to execute the query.

        var session = driver.session();
        var query = 'MATCH (u:User)-[r:REVIEWED]->(rest:Restaurant)-[:WAS_RATED]->(rat:Rating), (c:Category)<-[:SPECIALISES_IN]-(rest:Restaurant)-[:LOCATED_IN]->(l:Location) WHERE exists (l.latitude) AND exists (l.longitude) AND DISTANCE(POINT(l), POINT({latitude:$lat, longitude:$lng}))<1000000 AND toFloat($curFunny)-0.2<=  toFloat(u.funny)/toFloat(u.review_count) <= toFloat($curFunny)+0.2 AND toFloat($curCool)-0.2 <= toFloat(u.cool)/toFloat(u.review_count)<= toFloat($curCool)+0.2 AND toFloat($curUseful)-0.2 <= toFloat(u.useful)/toFloat(u.review_count) <= toFloat($curUseful)+0.2 AND toInteger(rat.rated)>=toInteger($starOPt) RETURN DISTINCT u.name, rat.rated ,l.latitude as restaurantLatitude,l.longitude as restaurantLongitude,rest.name as restaurantName, rest.open as restaurantOpenings, l.address as address'
        var params = {
            lat: localLat,
            lng: localLng,
            "curFunny": 0.225, //preset user information - used to match up restaurants - current user funny score
            "curCool": 0.225, //present user information - used to match up restaurants - current user cool score
            "curUseful": 0.35, //preset user information - used to match up restaurants - current user useful score
            starOPt:starOPt
        };

        session
            .run(query, params)
            .then((result) => {
                result.records.forEach(function (record) {
                    var lati = parseFloat(record._fields[2]);
                    var long = parseFloat(record._fields[3])
                    var name = (record._fields[4]);
                    var open = (record._fields[5]);
                    var address = (record._fields[6]);
                    var individualObject = {
                        coords: {
                            lat: lati,
                            lng: long
                        },
                        name: name,
                        open: open,
                        address: address
                    };
                    markers.push(individualObject);
                });
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(() => {
                session.close();
                driver.close();
            });
    }, 10000);
    
} 

//run database transaction after submit is pressed 
function dbSearch(){
    document.getElementById('strapline').innerHTML = "REFRESHING SEARCH! Just a sec, we are finding some places you will like...";
    setTimeout(function () {
        markers.length = 0
        // Host of your Neo4j installation
        var localLat = geoLocation[0];
        var localLng = geoLocation[1];
        console.log(localLat);
        console.log(localLng);
        var host = 'bolt://localhost:7687';

        // Create a driver to connect to the Neo4j database
        var driver = neo4j.v1.driver(host, neo4j.v1.auth.basic('neo4j', 'jodieedge'));

        // Create a session to execute the query.

        var session = driver.session();
        var query = 'MATCH (u:User)-[r:REVIEWED]->(rest:Restaurant)-[:WAS_RATED]->(rat:Rating), (c:Category)<-[:SPECIALISES_IN]-(rest:Restaurant)-[:LOCATED_IN]->(l:Location) WHERE exists (l.latitude) AND exists (l.longitude) AND DISTANCE(POINT(l), POINT({latitude:$lat, longitude:$lng}))<1000000 AND toFloat($curFunny)-0.2<=  toFloat(u.funny)/toFloat(u.review_count) <= toFloat($curFunny)+0.2 AND toFloat($curCool)-0.2 <= toFloat(u.cool)/toFloat(u.review_count)<= toFloat($curCool)+0.2 AND toFloat($curUseful)-0.2 <= toFloat(u.useful)/toFloat(u.review_count) <= toFloat($curUseful)+0.2 AND toInteger(rat.rated)>=3.5 A RETURN DISTINCT u.name, rat.rated ,l.latitude as restaurantLatitude,l.longitude as restaurantLongitude,rest.name as restaurantName, rest.open as restaurantOpenings, l.address as address'
        var params = {
            lat: localLat,
            lng: localLng,
            "curFunny": 0.225, //preset user information - used to match up restaurants - current user funny score
            "curCool": 0.225, //present user information - used to match up restaurants - current user cool score
            "curUseful": 0.35, //preset user information - used to match up restaurants - current user useful score
        };

        session
            .run(query, params)
            .then((result) => {
                result.records.forEach(function (record) {
                    var lati = parseFloat(record._fields[2]);
                    var long = parseFloat(record._fields[3])
                    var name = (record._fields[4]);
                    var open = (record._fields[5]);
                    var address = (record._fields[6]);
                    var individualObject = {
                        coords: {
                            lat: lati,
                            lng: long
                        },
                        name: name,
                        open: open,
                        address: address
                    };
                    markers.push(individualObject);
                });
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(() => {
                session.close();
                driver.close();
            });
    }, 10000);
    
} 
