var router = require('express').Router();

var fetch = require('node-fetch')

var baseUrl = "https://api.spacexdata.com/v3";

router.get('/', (req, res, next) => {
    res.send('Welcome to SpaceX API World!');
    res.end();
})

router.get('/allLaunches', (req, res) => {

    fetch(`${baseUrl}/launches`)
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        res.send(jsonData);
        res.end();
    })
    .catch(err => {
        res.send(err).status(400);
        res.end();
    })
} )

router.get('/launch/:id', (req, res) => {

    fetch(`${baseUrl}/launches/${req.params.id}`)
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        let D = {
            launchDetail: jsonData,
            launchPad: {}
        }
        if(jsonData.launch_site.site_id){
            fetch(`${baseUrl}/launchpads/${jsonData.launch_site.site_id}`)
            .then(result => {
                return result.json();
            })
            .then(jsonResult => {
                D.launchPad = jsonResult;
                res.send(D);
                res.end();
            })
        } else{
            D.launchPad = "Does not exist"
            res.send(D);
            res.end();
        }
    })
    .catch(err => {
        res.send(err).status(400);
        res.end();
    })
})

module.exports = router;