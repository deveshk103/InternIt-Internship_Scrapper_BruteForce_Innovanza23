const { join } = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express")
server = express()
server.set('view engine','pug')

server.get("/",async (req,res)=>{
  try{
    let title, company, location, internD = [];
    for (let index = 3; index < 5; index++) {
      const url = `https://internshala.com/internships/page-${index}`;
      console.log(url);
    
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const listItems = $(".internship_meta");
  
      listItems.each((idx, el) => {
        title = $(el).find(".profile a").text();
        company = $(el).find(".company_name div a").text().trim();
        location = $(el).find("#location_names a").text();
        link = $(el).find(".profile a").attr("href");
      stipend = $(el).find(".stipend").text();
        if(!stipend){
          stipend = "Unpaid"
        }
          internD.push({
            title: `${title}`,
            company: `${company}`,
            location: `${location}`,
            stipend: `${stipend}`,
            link: `https://internshala.com/${link}`
          });
      });
    }
    res.render("homepage",{internD:internD})
  }catch(err){
    res.sendStatus(500)
    console.log(err)
  }
  
})

let port = 5000  || process.env.PORT;
server.listen(port,(err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log(`Listening on port number ${port}`)
  }
})


