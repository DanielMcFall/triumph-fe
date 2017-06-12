'use strict';
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var http = require("http");
/**
 * Gets champion data from static Riot API
 * @return {promise} - Object - promise for an object that contains an object with
 * champion ID's as keys.
 * "62": {
 *    "idName": "MonkeyKing",
 *    "displayName": "Wukong",
 *    "id": 62
 * }
**/
function getChampions(callback) {
    var champions = {};
    var getOptions = {
        url: "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json"
    };
    http.get("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json", function(res) {
    }).on("data", function(chunk) {
        console.log(chunk.toString());
    });
    return request.get(getOptions, function(error, response, body) {


    });
}

getChampions(function(data) {
    console.log(data);
});

module.exports.getChampions = getChampions;
