//'use strict';

var Promise = require('bluebird');
var express = require('express');
var request = require('request');
var router = express.Router();
// var triumphApiUnpromisified = require('../node_modules/triumph-be/apiClient');
// var triumphApi = Promise.promisifyAll(triumphApiUnpromisified);

/**
 * Requests a list of recent games from the /games endpoint using data from
 * the /summoner endpoint.
 *
 * @param  {Object} summonerData The data object from the summoner endpoint.
 * @return {Promise} A promise for an object that contains summoner and
 *                   match data.
 */
function requestRecentGames(summonerData) {
    var summonerId = summonerData.summonerId;
    var region = summonerData.region;
    var gameType = 'ranked';
    var limit = 10;

    return triumphApi.matchList(summonerId, region)
        .then(function (gameData) {
            return {
                summonerData: summonerData,
                gameData: gameData
            };
        }).catch(handleError);
}

/**
 * A higher-order function that displays a summoner page using information
 * gathered from the triumph-be API.
 *
 * @param  {Object} response The Express response object.
 * @return {Function} A function that renders the summoner page.
 */
function showPage(response) {
    return function (data) {
        triumphApi.getChampions(function(champions){
            response.render('summoner', {
                title: data.name,
                data: data,
                champions: champions
            });
        });

    };
}

function getChampions(callback){
    var champions = {}
    return request.get("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json",
    function (error, response, body) {
        let responseData = (typeof body === 'string') ? JSON.parse(body) : body;
        for (var championKey in responseData.data) {
            var champion = responseData["data"][championKey];
            champions[champion.key] = {
                "idName": champion.id,
                "displayName": champion.name,
                "id": champion.key
            }
        }
        return callback(champions);
    });
}

/**
 * A higher-order function that displays an error page using information
 * gathered from the triumph-be API.
 *
 * @param  {Object} response The Express response object.
 * @return {Function} A function that renders the error page.
 */
function handleError(response) {
    return function (data) {
        response.render('error', {
            message: data.errorMessage,
        });
    };
}

// GET '/'
router.get('/', function (req, res) {
    var path = req.path;
    res.locals.path = path;
    res.render('index', {
        title: 'Triumph.gg'
    });
});

// Get '/summoner/:region/:name'
router.get('/summoner/:region/:name', function (req, res) {
    var summonerName = req.params.name;
    var region = req.params.region;
    res.render('summoner', {
      title: "Mark",
      data: {
        name: "Summoner Name",
        rank: {
          tier: "platinum",
          division: "3"
        },
        matchSummaries: [{
          win: true,
          championName: "irelia",
          champion: {
            idName: "irelia"
          }
        }]

      },
      champions: {idName: "irelia" }
    });
});

router.get('/summoner/:region/:name/matchList', function (req, res) {
    var summonerName = req.params.name;
    var region = req.params.region;
    res.render('partials/matchSummary', {
        layout: false,
        game: result
    });
    triumphApi.matchListAsync(summonerName, region)
        .then(function (result) {
            res.render('partials/matchSummary', {
                layout: false,
                game: result
            });
        })
        .catch(handleError(res));
});


// Get '/faq'
router.get('/faq', function (req, res) {
    var path = req.path;
    res.locals.path = path;
    res.render('faq', {
        title: "Frequently Asked Questions",
    });
});

module.exports = router;
