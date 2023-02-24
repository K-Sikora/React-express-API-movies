const express = require('express');
const PORT = 8080;
const axios = require('axios')
const cors = require('cors');
require('dotenv').config()
const { request } = require('express');
const app = express();
app.use(cors())

app.get('/api/trending-week', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`)
    .then(response => {
    res.json(response.data)
    })
    .catch(err => {
    console.log(err)
  }) 
})

app.get('/api/search-movie', (req, res) => {
    axios.get(`
    https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${req.query.query}&page=1&include_adult=false`)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });


app.get('/api/movie/:id', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
    .then(response => {
    res.json(response.data)
    })
    .catch(err => {
      console.log(err)
  })
})
  



app.get('/api/tv/:id', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
    .then(response => {
    res.json(response.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  })
  
  
  app.get('/api/movie/keywords/:id', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/keywords?api_key=${process.env.API_KEY}`)
      .then(response => {
      res.json(response.data)
      })
      .catch(err => {
        console.log(err)
      }
      )
})

app.get('/api/tv/keywords/:id', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/keywords?api_key=${process.env.API_KEY}`)
    .then(response => {
      res.json(response.data)

    })
    .catch(err => {
      console.log(err)
    })
})
  


app.get('/api/movie/similar/:id', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/similar?api_key=${process.env.API_KEY}`)
    .then(response => {
      res.json(response.data)

    })
    .catch(err => {
      console.log(err)
    })
})
  

app.get('/api/tv/similar/:id', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/similar?api_key=${process.env.API_KEY}`)
    .then(response => {
      res.json(response.data)

    })
    .catch(err => {
      console.log(err)
    })
  })



app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
 })